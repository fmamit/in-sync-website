const { anthropic } = require('../shared/clients');
const { tools, SYSTEM_PROMPT, executeRaiseTicket, executeCheckHealth, executeTriggerBugFix, lookupTicketStatus } = require('../shared/tools');

module.exports = async function (context, req) {
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
    return;
  }

  try {
    const { message, conversation_history = [], attachments } = req.body || {};
    if (!message || typeof message !== 'string') {
      context.res = { status: 400, body: { error: 'message is required and must be a string' }, headers: { 'Content-Type': 'application/json' } };
      return;
    }

    // Ticket status lookup
    const ticketIdMatch = message.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
    let ticketContext = '';
    if (ticketIdMatch) {
      const ticket = await lookupTicketStatus(ticketIdMatch[1]);
      if (ticket) {
        ticketContext = `\n\n[TICKET LOOKUP RESULT for ${ticket.ticket_id}]: Status: ${ticket.status}, Category: ${ticket.category}, Created: ${ticket.created_at}, Message: "${ticket.user_message}", Assigned to: ${ticket.assigned_to || 'Unassigned'}`;
      } else {
        ticketContext = `\n\n[TICKET LOOKUP RESULT]: No ticket found with ID ${ticketIdMatch[1]}`;
      }
    }

    const messages = [...conversation_history, { role: 'user', content: message + ticketContext }];

    let response = await anthropic.messages.create({ model: 'claude-sonnet-4-6', max_tokens: 1024, system: SYSTEM_PROMPT, tools, messages });

    // Tool call loop
    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(b => b.type === 'tool_use');
      if (!toolUseBlock) break;

      let toolResult;
      switch (toolUseBlock.name) {
        case 'raise_ticket': {
          const ticketInput = { ...toolUseBlock.input };
          if (attachments && attachments.length > 0 && !ticketInput.attachments) ticketInput.attachments = attachments;
          toolResult = await executeRaiseTicket(ticketInput);
          break;
        }
        case 'check_health': toolResult = await executeCheckHealth(toolUseBlock.input); break;
        case 'trigger_bug_fix': toolResult = await executeTriggerBugFix(toolUseBlock.input); break;
        default: toolResult = { error: 'Unknown tool' };
      }

      messages.push({ role: 'assistant', content: response.content });
      messages.push({ role: 'user', content: [{ type: 'tool_result', tool_use_id: toolUseBlock.id, content: JSON.stringify(toolResult) }] });
      response = await anthropic.messages.create({ model: 'claude-sonnet-4-6', max_tokens: 1024, system: SYSTEM_PROMPT, tools, messages });
    }

    const textBlock = response.content.find(b => b.type === 'text');
    const agentResponse = textBlock ? textBlock.text : 'I was unable to process your request. Please try again.';

    // Extract ticket_id
    let ticketId = null;
    for (const msg of messages.filter(m => m.role === 'user' && Array.isArray(m.content))) {
      for (const block of msg.content) {
        if (block.type === 'tool_result' && block.content) {
          try { const parsed = JSON.parse(block.content); if (parsed.ticket_id) ticketId = parsed.ticket_id; } catch {}
        }
      }
    }

    context.res = { status: 200, body: { response: agentResponse, ticket_id: ticketId }, headers: { 'Content-Type': 'application/json' } };
  } catch (error) {
    context.log.error('Agent error:', error);
    context.res = { status: 500, body: { error: 'An internal error occurred. Please try again.' }, headers: { 'Content-Type': 'application/json' } };
  }
};
