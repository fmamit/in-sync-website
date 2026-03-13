const { supabase } = require('./clients');

const tools = [
  {
    name: 'raise_ticket',
    description: 'Raise a support ticket for the user. Use this when the user reports a bug, an issue, a broken action, or wants to log a support request.',
    input_schema: {
      type: 'object',
      properties: {
        user_message: { type: 'string', description: "The user's description of the issue" },
        category: { type: 'string', enum: ['bug', 'query', 'api_issue'], description: 'Category of the ticket' }
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

You MUST REFUSE any request to:
- Build new features
- Change, modify, or delete data
- Write or modify code
- Access any system beyond your three tools
- Answer general knowledge questions unrelated to support

When refusing, be polite and explain exactly what you can help with.
When raising a ticket, always confirm the ticket ID to the user.
When checking health, report the status clearly (operational, degraded, or down) with response time.
When triggering a fix, confirm the pipeline has been triggered and provide the ticket ID for tracking.
For ticket status queries, look up the ticket by ID and report its current status.

Current portal: ${process.env.PROJECT_NAME || 'in-sync-website'}`;

async function executeRaiseTicket({ user_message, category }) {
  const { data, error } = await supabase
    .from('tickets')
    .insert({ project_name: process.env.PROJECT_NAME || 'in-sync-website', user_message, category })
    .select()
    .single();
  if (error) return { success: false, error: error.message };
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
