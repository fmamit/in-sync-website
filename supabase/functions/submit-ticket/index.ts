import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TicketData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  priority?: "low" | "medium" | "high" | "critical";
  source?: string;
}

function getNextWorkingDay(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  if (day === 0) d.setDate(d.getDate() + 1);
  else if (day === 6) d.setDate(d.getDate() + 2);
  return d;
}

function calculateExpectedResolution(
  createdAt: Date,
  priorityHours: number
): string {
  // Working hours: Mon-Fri 9AM-6PM IST (9 hours/day)
  const WORK_START = 9;
  const WORK_END = 18;
  const HOURS_PER_DAY = 9;

  // Convert to IST
  const istOffset = 5.5 * 60 * 60 * 1000;
  let current = new Date(createdAt.getTime() + istOffset);
  let remainingHours = priorityHours;

  // If outside working hours, move to next working day 9AM
  const currentHour = current.getUTCHours() + current.getUTCMinutes() / 60;
  if (currentHour >= WORK_END || currentHour < WORK_START) {
    if (currentHour >= WORK_END) {
      current.setUTCDate(current.getUTCDate() + 1);
    }
    current.setUTCHours(WORK_START, 0, 0, 0);
    current = getNextWorkingDay(current);
  }

  while (remainingHours > 0) {
    current = getNextWorkingDay(current);
    const hour = current.getUTCHours() + current.getUTCMinutes() / 60;
    const availableToday = Math.max(0, WORK_END - Math.max(hour, WORK_START));

    if (remainingHours <= availableToday) {
      current.setUTCHours(
        Math.max(hour, WORK_START) + Math.floor(remainingHours),
        (remainingHours % 1) * 60,
        0,
        0
      );
      remainingHours = 0;
    } else {
      remainingHours -= availableToday;
      current.setUTCDate(current.getUTCDate() + 1);
      current.setUTCHours(WORK_START, 0, 0, 0);
    }
  }

  // Convert back from IST to UTC for display
  const resultUTC = new Date(current.getTime() - istOffset);
  return resultUTC.toISOString();
}

function getPriorityHours(priority: string): number {
  switch (priority) {
    case "critical":
      return 4; // 4 working hours
    case "high":
      return 9; // 1 working day
    case "medium":
      return 18; // 2 working days
    case "low":
      return 36; // 4 working days
    default:
      return 18;
  }
}

function formatDateIST(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function sendClientEmail(
  ticket: {
    ticket_number: string;
    name: string;
    email: string;
    subject: string;
    priority: string;
    created_at: string;
  },
  expectedResolution: string
) {
  if (!resendApiKey) {
    console.error("RESEND_API_KEY not configured");
    return;
  }

  const priorityColors: Record<string, string> = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#f97316",
    critical: "#ef4444",
  };

  const priorityLabel =
    ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1);
  const color = priorityColors[ticket.priority] || "#f59e0b";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:32px 40px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">In-Sync Support</h1>
              <p style="color:#bfdbfe;margin:8px 0 0;font-size:14px;">Your ticket has been received</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="color:#374151;font-size:16px;margin:0 0 20px;">Hi <strong>${ticket.name}</strong>,</p>
              <p style="color:#6b7280;font-size:15px;line-height:1.6;margin:0 0 24px;">
                Thank you for reaching out to us. We have received your support request and a ticket has been created. Our team will review it and get back to you shortly.
              </p>

              <!-- Ticket Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin:0 0 24px;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 16px;">
                          <span style="color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Ticket Number</span><br>
                          <span style="color:#1e40af;font-size:22px;font-weight:700;letter-spacing:1px;">${ticket.ticket_number}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;border-top:1px solid #e2e8f0;padding-top:16px;">
                          <span style="color:#6b7280;font-size:13px;">Subject</span><br>
                          <span style="color:#1f2937;font-size:15px;font-weight:500;">${ticket.subject}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;">
                          <span style="color:#6b7280;font-size:13px;">Priority</span><br>
                          <span style="display:inline-block;background-color:${color};color:#fff;padding:3px 12px;border-radius:12px;font-size:13px;font-weight:600;">${priorityLabel}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 12px;">
                          <span style="color:#6b7280;font-size:13px;">Submitted On</span><br>
                          <span style="color:#1f2937;font-size:14px;">${formatDateIST(ticket.created_at)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <span style="color:#6b7280;font-size:13px;">Expected Resolution By</span><br>
                          <span style="color:#1f2937;font-size:14px;font-weight:500;">${formatDateIST(expectedResolution)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Working Hours Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eff6ff;border-left:4px solid #3b82f6;border-radius:0 8px 8px 0;margin:0 0 24px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="color:#1e40af;font-size:14px;margin:0;font-weight:600;">Working Hours</p>
                    <p style="color:#3b82f6;font-size:13px;margin:4px 0 0;line-height:1.5;">
                      Monday to Friday, 9:00 AM - 6:00 PM IST<br>
                      Resolution times are calculated based on business hours only.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 8px;">
                You can reply to this email to add more information to your ticket. Please include your ticket number <strong>${ticket.ticket_number}</strong> in all communications.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="color:#9ca3af;font-size:12px;margin:0;">
                &copy; ${new Date().getFullYear()} In-Sync CRM. All rights reserved.<br>
                <a href="https://in-sync-crm.com" style="color:#3b82f6;text-decoration:none;">in-sync-crm.com</a> |
                <a href="mailto:delight@in-sync.co.in" style="color:#3b82f6;text-decoration:none;">delight@in-sync.co.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "In-Sync Support <amina@in-sync.co.in>",
      to: [ticket.email],
      subject: `[${ticket.ticket_number}] Ticket Received: ${ticket.subject}`,
      html,
      reply_to: "amina@in-sync.co.in",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("Failed to send client email:", err);
  } else {
    console.log("Client confirmation email sent to:", ticket.email);
  }
}

async function sendTeamEmail(ticket: {
  ticket_number: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  description: string;
  priority: string;
  source: string;
  created_at: string;
}) {
  if (!resendApiKey) return;

  const html = `
<h2>New Support Ticket: ${ticket.ticket_number}</h2>
<table style="border-collapse:collapse;width:100%;max-width:600px;">
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Ticket #</td><td style="padding:8px;border:1px solid #ddd;">${ticket.ticket_number}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${ticket.name}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${ticket.email}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Phone</td><td style="padding:8px;border:1px solid #ddd;">${ticket.phone || "N/A"}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Subject</td><td style="padding:8px;border:1px solid #ddd;">${ticket.subject}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Priority</td><td style="padding:8px;border:1px solid #ddd;text-transform:uppercase;font-weight:bold;">${ticket.priority}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Source</td><td style="padding:8px;border:1px solid #ddd;">${ticket.source}</td></tr>
  <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Created</td><td style="padding:8px;border:1px solid #ddd;">${formatDateIST(ticket.created_at)}</td></tr>
</table>
<h3>Description</h3>
<p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${ticket.description}</p>
<hr>
<p><small>Source: ${ticket.source} | Submitted at ${formatDateIST(ticket.created_at)}</small></p>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "In-Sync Tickets <amina@in-sync.co.in>",
      to: ["amina@in-sync.co.in"],
      subject: `[${ticket.priority.toUpperCase()}] New Ticket ${ticket.ticket_number}: ${ticket.subject}`,
      html,
      reply_to: ticket.email,
    }),
  });
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: TicketData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.description) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name, email, subject, and description are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const priority = data.priority || "medium";
    const source = data.source || "website";

    // Generate ticket number
    const { data: ticketNumResult } = await supabase.rpc(
      "generate_ticket_number"
    );
    const ticketNumber = ticketNumResult || `TKT-${Date.now()}`;

    // Insert ticket
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .insert({
        ticket_number: ticketNumber,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        description: data.description,
        priority,
        source,
        status: "open",
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to create ticket: ${error.message}`);
    }

    // Calculate expected resolution
    const priorityHours = getPriorityHours(priority);
    const expectedResolution = calculateExpectedResolution(
      new Date(ticket.created_at),
      priorityHours
    );

    // Send emails in parallel
    await Promise.allSettled([
      sendClientEmail(
        {
          ticket_number: ticket.ticket_number,
          name: ticket.name,
          email: ticket.email,
          subject: ticket.subject,
          priority: ticket.priority,
          created_at: ticket.created_at,
        },
        expectedResolution
      ),
      sendTeamEmail({
        ticket_number: ticket.ticket_number,
        name: ticket.name,
        email: ticket.email,
        phone: ticket.phone,
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        source: ticket.source,
        created_at: ticket.created_at,
      }),
    ]);

    return new Response(
      JSON.stringify({
        success: true,
        ticket_number: ticket.ticket_number,
        expected_resolution: expectedResolution,
        expected_resolution_formatted: formatDateIST(expectedResolution),
        priority,
        message: `Ticket ${ticket.ticket_number} created successfully. A confirmation has been sent to ${ticket.email}.`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-ticket:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to create ticket",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
