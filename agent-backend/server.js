require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Rate limiter: /api/agent only, 20 requests per IP per hour ---
const agentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// --- Supabase client (service role for backend operations) ---
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// --- Anthropic client ---
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// --- CORS: dynamic allowlist from ALLOWED_ORIGINS env var ---
const getAllowedOrigins = () => {
  const raw = process.env.ALLOWED_ORIGINS || 'in-sync.co.in,wa.in-sync.co.in';
  return raw.split(',').flatMap(domain => {
    const d = domain.trim();
    return [`https://${d}`, `http://${d}`, `https://www.${d}`, `http://www.${d}`];
  });
};

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, server-to-server, mobile apps)
    if (!origin) return callback(null, true);
    const allowed = getAllowedOrigins();
    if (allowed.includes(origin)) {
      return callback(null, true);
    }
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

app.use(express.json());

// --- Health endpoint ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Tool definitions for Claude ---
const tools = [
  {
    name: 'raise_ticket',
    description: 'Raise a support ticket for the user. Use this when the user reports a bug, an issue, a broken action, or wants to log a support request.',
    input_schema: {
      type: 'object',
      properties: {
        user_message: {
          type: 'string',
          description: 'The user\'s description of the issue'
        },
        category: {
          type: 'string',
          enum: ['bug', 'query', 'api_issue'],
          description: 'Category of the ticket: bug for broken functionality, query for general questions, api_issue for API-related problems'
        }
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
        service: {
          type: 'string',
          enum: ['whatsapp', 'supabase', 'backend'],
          description: 'Which service to check: whatsapp for WhatsApp/Exotel API, supabase for Supabase REST endpoints, backend for Azure-hosted backend APIs'
        }
      },
      required: ['service']
    }
  },
  {
    name: 'trigger_bug_fix',
    description: 'Trigger the automated bug fix pipeline. Use this ONLY when the user explicitly asks to fix or repair a broken action. Do NOT use this for new features or general queries.',
    input_schema: {
      type: 'object',
      properties: {
        issue: {
          type: 'string',
          description: 'Description of the broken action that needs to be fixed'
        }
      },
      required: ['issue']
    }
  }
];

// --- System prompt ---
const SYSTEM_PROMPT = `You are the In-Sync Service Agent. You are a support assistant embedded in a client portal.

You can ONLY perform these three actions:
1. RAISE A SUPPORT TICKET — when a user reports an issue, bug, or broken action
2. CHECK API HEALTH — when a user asks if a service (WhatsApp, Supabase, backend) is working
3. TRIGGER A BUG FIX — when a user explicitly asks to fix or repair a broken action

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

// --- Tool execution functions ---
async function executeRaiseTicket({ user_message, category }) {
  const { data, error } = await supabase
    .from('tickets')
    .insert({
      project_name: process.env.PROJECT_NAME || 'in-sync-website',
      user_message,
      category
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }
  return {
    success: true,
    ticket_id: data.ticket_id,
    status: data.status,
    category: data.category,
    created_at: data.created_at
  };
}

async function executeCheckHealth({ service }) {
  const results = {};

  if (service === 'whatsapp') {
    try {
      const start = Date.now();
      const authHeader = 'Basic ' + Buffer.from(
        `${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}`
      ).toString('base64');

      const response = await fetch(
        `https://${process.env.EXOTEL_SUBDOMAIN}/v2/accounts/${process.env.EXOTEL_SID}`,
        {
          method: 'GET',
          headers: { 'Authorization': authHeader },
          signal: AbortSignal.timeout(10000)
        }
      );
      const elapsed = Date.now() - start;

      results.whatsapp = {
        status: response.ok ? 'operational' : (response.status < 500 ? 'degraded' : 'down'),
        response_time_ms: elapsed,
        http_status: response.status
      };
    } catch (e) {
      results.whatsapp = { status: 'down', response_time_ms: null, error: e.message };
    }
  }

  if (service === 'supabase') {
    try {
      const start = Date.now();
      const response = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/tickets?select=count&limit=1`,
        {
          headers: {
            'apikey': process.env.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
          },
          signal: AbortSignal.timeout(10000)
        }
      );
      const elapsed = Date.now() - start;

      results.supabase = {
        status: response.ok ? 'operational' : 'down',
        response_time_ms: elapsed,
        http_status: response.status
      };
    } catch (e) {
      results.supabase = { status: 'down', response_time_ms: null, error: e.message };
    }
  }

  if (service === 'backend') {
    try {
      const start = Date.now();
      const response = await fetch(
        `http://localhost:${PORT}/api/health`,
        { signal: AbortSignal.timeout(5000) }
      );
      const elapsed = Date.now() - start;

      results.backend = {
        status: response.ok ? 'operational' : 'down',
        response_time_ms: elapsed,
        http_status: response.status
      };
    } catch (e) {
      results.backend = { status: 'down', response_time_ms: null, error: e.message };
    }
  }

  return results;
}

async function executeTriggerBugFix({ issue }) {
  // First create a ticket for tracking
  const ticketResult = await executeRaiseTicket({
    user_message: issue,
    category: 'bug'
  });

  if (!ticketResult.success) {
    return { success: false, error: 'Failed to create tracking ticket: ' + ticketResult.error };
  }

  // Trigger the bug fix pipeline via GitHub repository_dispatch
  const githubToken = process.env.GITHUB_PAT;
  const githubRepo = process.env.GITHUB_REPO || 'fmamit/in-sync-website';

  if (!githubToken) {
    return {
      success: true,
      ticket_id: ticketResult.ticket_id,
      pipeline_status: 'queued',
      note: 'Bug fix pipeline is not yet configured (GITHUB_PAT missing). Ticket has been created for manual follow-up.'
    };
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${githubRepo}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'bug-fix',
          client_payload: {
            ticket_id: ticketResult.ticket_id,
            project_name: process.env.PROJECT_NAME || 'in-sync-website',
            issue
          }
        }),
        signal: AbortSignal.timeout(15000)
      }
    );

    // GitHub returns 204 No Content on success
    return {
      success: true,
      ticket_id: ticketResult.ticket_id,
      pipeline_status: response.status === 204 ? 'triggered' : 'failed_to_trigger',
      http_status: response.status
    };
  } catch (e) {
    return {
      success: true,
      ticket_id: ticketResult.ticket_id,
      pipeline_status: 'failed_to_trigger',
      error: e.message
    };
  }
}

// --- WhatsApp OTP for admin auth ---
const otpStore = new Map(); // key -> { otp, expiresAt } or session token

async function sendWhatsAppOTP(to, otpCode) {
  const authHeader = 'Basic ' + Buffer.from(
    `${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}`
  ).toString('base64');

  const payload = {
    custom_data: to,
    whatsapp: {
      messages: [
        {
          from: process.env.WHATSAPP_NUMBER,
          to,
          content: {
            type: 'template',
            template: {
              name: 'otp',
              language: { code: 'en' },
              components: [
                {
                  type: 'body',
                  parameters: [{ type: 'text', text: otpCode }]
                },
                {
                  type: 'button',
                  sub_type: 'url',
                  index: '0',
                  parameters: [{ type: 'text', text: otpCode }]
                }
              ]
            }
          }
        }
      ]
    }
  };

  const response = await fetch(
    `https://${process.env.EXOTEL_SUBDOMAIN}/v2/accounts/${process.env.EXOTEL_SID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000)
    }
  );

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('WhatsApp OTP send failed:', response.status, body);
    throw new Error(`Exotel API returned ${response.status}`);
  }
  return response;
}

// POST /api/admin/request-otp — sends OTP to configured admin number
app.post('/api/admin/request-otp', async (req, res) => {
  const adminPhone = process.env.ADMIN_WHATSAPP;
  if (!adminPhone) {
    return res.status(500).json({ error: 'ADMIN_WHATSAPP not configured on the server.' });
  }

  // Rate-limit: max one OTP per 60 seconds
  const existing = otpStore.get(`otp:${adminPhone}`);
  if (existing && Date.now() - (existing.createdAt || 0) < 60000) {
    return res.status(429).json({ error: 'OTP already sent. Please wait before requesting again.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(`otp:${adminPhone}`, {
    otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + 5 * 60 * 1000,
    attempts: 0
  });

  try {
    await sendWhatsAppOTP(adminPhone, otp);
    const masked = adminPhone.slice(-4).padStart(adminPhone.length, '*');
    res.json({ success: true, masked_number: masked });
  } catch (e) {
    otpStore.delete(`otp:${adminPhone}`);
    console.error('OTP send error:', e.message);
    res.status(500).json({ error: 'Failed to send OTP via WhatsApp. Check server logs.' });
  }
});

// POST /api/admin/verify-otp — returns session token on success
app.post('/api/admin/verify-otp', (req, res) => {
  const adminPhone = process.env.ADMIN_WHATSAPP;
  const { otp } = req.body;

  if (!otp || typeof otp !== 'string') {
    return res.status(400).json({ error: 'OTP is required.' });
  }

  const stored = otpStore.get(`otp:${adminPhone}`);
  if (!stored || Date.now() > stored.expiresAt) {
    otpStore.delete(`otp:${adminPhone}`);
    return res.status(401).json({ error: 'OTP expired. Please request a new one.' });
  }

  // Limit brute-force attempts
  stored.attempts = (stored.attempts || 0) + 1;
  if (stored.attempts > 5) {
    otpStore.delete(`otp:${adminPhone}`);
    return res.status(429).json({ error: 'Too many attempts. Request a new OTP.' });
  }

  if (stored.otp !== otp) {
    return res.status(401).json({ error: 'Incorrect OTP. Please try again.' });
  }

  otpStore.delete(`otp:${adminPhone}`);

  // Issue a session token valid for 2 hours
  const token = Buffer.from(`${Date.now()}-${Math.random().toString(36)}`).toString('base64');
  otpStore.set(`session:${token}`, { expiresAt: Date.now() + 2 * 60 * 60 * 1000 });

  res.json({ success: true, token });
});

// --- Ticket status lookup (direct Supabase query, no tool needed) ---
async function lookupTicketStatus(ticketId) {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('ticket_id', ticketId)
    .single();

  if (error) return null;
  return data;
}

// --- Main agent endpoint ---
app.post('/api/agent', agentLimiter, async (req, res) => {
  try {
    const { message, conversation_history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required and must be a string' });
    }

    // Check if this is a ticket status query — extract ticket ID
    const ticketIdMatch = message.match(
      /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
    );

    let ticketContext = '';
    if (ticketIdMatch) {
      const ticket = await lookupTicketStatus(ticketIdMatch[1]);
      if (ticket) {
        ticketContext = `\n\n[TICKET LOOKUP RESULT for ${ticket.ticket_id}]: Status: ${ticket.status}, Category: ${ticket.category}, Created: ${ticket.created_at}, Message: "${ticket.user_message}", Assigned to: ${ticket.assigned_to || 'Unassigned'}`;
      } else {
        ticketContext = `\n\n[TICKET LOOKUP RESULT]: No ticket found with ID ${ticketIdMatch[1]}`;
      }
    }

    // Build messages array
    const messages = [
      ...conversation_history,
      { role: 'user', content: message + ticketContext }
    ];

    // Call Claude with tools
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools,
      messages
    });

    // Process tool calls in a loop
    while (response.stop_reason === 'tool_use') {
      const toolUseBlock = response.content.find(b => b.type === 'tool_use');
      if (!toolUseBlock) break;

      let toolResult;
      switch (toolUseBlock.name) {
        case 'raise_ticket':
          toolResult = await executeRaiseTicket(toolUseBlock.input);
          break;
        case 'check_health':
          toolResult = await executeCheckHealth(toolUseBlock.input);
          break;
        case 'trigger_bug_fix':
          toolResult = await executeTriggerBugFix(toolUseBlock.input);
          break;
        default:
          toolResult = { error: 'Unknown tool' };
      }

      // Continue conversation with tool result
      messages.push({ role: 'assistant', content: response.content });
      messages.push({
        role: 'user',
        content: [{
          type: 'tool_result',
          tool_use_id: toolUseBlock.id,
          content: JSON.stringify(toolResult)
        }]
      });

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools,
        messages
      });
    }

    // Extract text response
    const textBlock = response.content.find(b => b.type === 'text');
    const agentResponse = textBlock ? textBlock.text : 'I was unable to process your request. Please try again.';

    // Extract ticket_id if a ticket was created
    const allMessages = messages.filter(m => m.role === 'user' && Array.isArray(m.content));
    let ticketId = null;
    for (const msg of allMessages) {
      for (const block of msg.content) {
        if (block.type === 'tool_result' && block.content) {
          try {
            const parsed = JSON.parse(block.content);
            if (parsed.ticket_id) ticketId = parsed.ticket_id;
          } catch {}
        }
      }
    }

    res.json({
      response: agentResponse,
      ticket_id: ticketId
    });
  } catch (error) {
    console.error('Agent error:', error);
    res.status(500).json({
      error: 'An internal error occurred. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`In-Sync Agent backend running on port ${PORT}`);
  console.log(`Project: ${process.env.PROJECT_NAME || 'in-sync-website'}`);
});
