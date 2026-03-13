const { supabase } = require('./clients');

const tools = [
  {
    name: 'raise_ticket',
    description: 'Raise a support ticket for the user. Use this when the user reports a bug, an issue, a broken action, or wants to log a support request.',
    input_schema: {
      type: 'object',
      properties: {
        user_message: { type: 'string', description: "The user's description of the issue" },
        category: { type: 'string', enum: ['bug', 'query', 'api_issue'], description: 'Category of the ticket' },
        attachments: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, url: { type: 'string' }, type: { type: 'string' } } }, description: 'File attachments (screenshots/video URLs) provided by the user. Pass these through from the request if present.' }
      },
      required: ['user_message', 'category']
    }
  },
  {
    name: 'check_health',
    description: 'Check the health status of APIs and services. Use this when the user asks if a service is working, up, down, or wants a status check.',
    input_schema: {
      type: 'object',
      properties: {
        service: { type: 'string', enum: ['whatsapp', 'supabase', 'backend'], description: 'Which service to check' }
      },
      required: ['service']
    }
  },
  {
    name: 'trigger_bug_fix',
    description: 'Trigger the automated bug fix pipeline. Use this ONLY when the user explicitly asks to fix or repair a broken action.',
    input_schema: {
      type: 'object',
      properties: {
        issue: { type: 'string', description: 'Description of the broken action that needs to be fixed' }
      },
      required: ['issue']
    }
  }
];

const SYSTEM_PROMPT = `You are the In-Sync Service Agent. You are a support assistant embedded in a client portal.

You can ONLY perform these three actions:
1. RAISE A SUPPORT TICKET - when a user reports an issue, bug, or broken action
2. CHECK API HEALTH - when a user asks if a service (WhatsApp, Supabase, backend) is working
3. TRIGGER A BUG FIX - when a user explicitly asks to fix or repair a broken action

IMPORTANT - CONFIRMATION BEFORE ACTION:
When a user reports an issue or requests something, you MUST follow this flow:
1. FIRST, restate the issue in clear, plain English so the user knows exactly what you understood
2. Ask the user to confirm that your understanding is correct before proceeding
3. ONLY after the user confirms (says yes, correct, confirmed, go ahead, etc.) should you raise the ticket or trigger a fix
4. If the user corrects your understanding, update your summary and ask for confirmation again

Exception: Health checks do NOT require confirmation - run them immediately when asked.

For any request that is outside your scope (building features, changing data, writing code, general knowledge questions), you MUST:
1. FIRST restate what the user is asking for in plain English and confirm with them
2. After confirmation, raise a support ticket with category 'query' so the request is logged for human review
3. THEN explain politely that this is outside your scope and the request has been logged for the team to review

Users can attach up to 6 screenshots and 1 video to their messages. When attachments are present, acknowledge them and include them with the ticket. Attachment URLs will be passed through automatically when you raise a ticket.
When raising a ticket, always confirm the ticket ID to the user.
When checking health, report the status clearly (operational, degraded, or down) with response time.
When triggering a fix, confirm the pipeline has been triggered and provide the ticket ID for tracking.
For ticket status queries, look up the ticket by ID and report its current status.

Current portal: ${process.env.PROJECT_NAME || 'in-sync-website'}`;

async function executeRaiseTicket({ user_message, category, attachments }) {
  const insertData = { project_name: process.env.PROJECT_NAME || 'in-sync-website', user_message, category };
  if (attachments && attachments.length > 0) insertData.attachments = attachments;
  const { data, error } = await supabase
    .from('tickets')
    .insert(insertData)
    .select()
    .single();
  if (error) return { success: false, error: error.message };

  // Also log to CRM webhook
  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      await fetch(crmUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket_number: data.ticket_id,
          subject: user_message.slice(0, 100),
          description: user_message,
          category: category,
          priority: category === 'bug' ? 'high' : 'medium',
          status: 'new',
          resolution_notes: null,
          resolved_at: null,
          company_name: process.env.PROJECT_NAME || 'in-sync-website',
          contact_email: 'support@in-sync.co.in',
          source: 'service_agent',
          attachments: attachments || [],
          org_id: process.env.CRM_ORG_ID || null,
          created_by: process.env.CRM_CREATED_BY || null,
          contact_name: process.env.CRM_CREATED_BY_NAME || null
        }),
        signal: AbortSignal.timeout(10000)
      });
    } catch (e) {
      // CRM POST failure should not block ticket creation
      console.error('CRM webhook POST failed:', e.message);
    }
  }

  return { success: true, ticket_id: data.ticket_id, status: data.status, category: data.category, created_at: data.created_at };
}

async function executeCheckHealth({ service }) {
  const results = {};
  if (service === 'whatsapp') {
    try {
      const start = Date.now();
      const authHeader = 'Basic ' + Buffer.from(`${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}`).toString('base64');
      const response = await fetch(`https://${process.env.EXOTEL_SUBDOMAIN}/v2/accounts/${process.env.EXOTEL_SID}`, {
        method: 'GET', headers: { 'Authorization': authHeader }, signal: AbortSignal.timeout(10000)
      });
      results.whatsapp = { status: response.ok ? 'operational' : (response.status < 500 ? 'degraded' : 'down'), response_time_ms: Date.now() - start, http_status: response.status };
    } catch (e) { results.whatsapp = { status: 'down', response_time_ms: null, error: e.message }; }
  }
  if (service === 'supabase') {
    try {
      const start = Date.now();
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/tickets?select=count&limit=1`, {
        headers: { 'apikey': process.env.SUPABASE_ANON_KEY, 'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}` },
        signal: AbortSignal.timeout(10000)
      });
      results.supabase = { status: response.ok ? 'operational' : 'down', response_time_ms: Date.now() - start, http_status: response.status };
    } catch (e) { results.supabase = { status: 'down', response_time_ms: null, error: e.message }; }
  }
  if (service === 'backend') {
    results.backend = { status: 'operational', response_time_ms: 0, note: 'This response confirms the backend is running.' };
  }
  return results;
}

async function executeTriggerBugFix({ issue }) {
  const ticketResult = await executeRaiseTicket({ user_message: issue, category: 'bug' });
  if (!ticketResult.success) return { success: false, error: 'Failed to create tracking ticket: ' + ticketResult.error };

  const githubToken = process.env.GITHUB_PAT;
  const githubRepo = process.env.GITHUB_REPO || 'fmamit/in-sync-website';
  if (!githubToken) {
    return { success: true, ticket_id: ticketResult.ticket_id, pipeline_status: 'queued', note: 'Bug fix pipeline is not yet configured. Ticket created for manual follow-up.' };
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/dispatches`, {
      method: 'POST',
      headers: { 'Authorization': `token ${githubToken}`, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: 'bug-fix',
        client_payload: {
          ticket_id: ticketResult.ticket_id,
          project_name: process.env.PROJECT_NAME || 'in-sync-website',
          issue,
          crm_org_id: process.env.CRM_ORG_ID,
          crm_created_by: process.env.CRM_CREATED_BY,
          crm_created_by_name: process.env.CRM_CREATED_BY_NAME
        }
      }),
      signal: AbortSignal.timeout(15000)
    });
    return { success: true, ticket_id: ticketResult.ticket_id, pipeline_status: response.status === 204 ? 'triggered' : 'failed_to_trigger', http_status: response.status };
  } catch (e) {
    return { success: true, ticket_id: ticketResult.ticket_id, pipeline_status: 'failed_to_trigger', error: e.message };
  }
}

async function lookupTicketStatus(ticketId) {
  const { data, error } = await supabase.from('tickets').select('*').eq('ticket_id', ticketId).single();
  if (error) return null;
  return data;
}

module.exports = { tools, SYSTEM_PROMPT, executeRaiseTicket, executeCheckHealth, executeTriggerBugFix, lookupTicketStatus };
