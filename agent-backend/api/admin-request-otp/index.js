const { supabase } = require('../shared/clients');

async function sendWhatsAppOTP(to, otpCode) {
  const authHeader = 'Basic ' + Buffer.from(`${process.env.EXOTEL_API_KEY}:${process.env.EXOTEL_API_TOKEN}`).toString('base64');
  const payload = {
    custom_data: to,
    whatsapp: {
      messages: [{
        from: process.env.WHATSAPP_NUMBER,
        to,
        content: {
          type: 'template',
          template: {
            name: 'otp',
            language: { code: 'en' },
            components: [
              { type: 'body', parameters: [{ type: 'text', text: otpCode }] },
              { type: 'button', sub_type: 'url', index: '0', parameters: [{ type: 'text', text: otpCode }] }
            ]
          }
        }
      }]
    }
  };

  const response = await fetch(`https://${process.env.EXOTEL_SUBDOMAIN}/v2/accounts/${process.env.EXOTEL_SID}/messages`, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000)
  });

  if (!response.ok) throw new Error(`Exotel API returned ${response.status}`);
  return response;
}

module.exports = async function (context, req) {
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
    return;
  }

  const adminPhone = process.env.ADMIN_WHATSAPP;
  if (!adminPhone) {
    context.res = { status: 500, body: { error: 'ADMIN_WHATSAPP not configured.' }, headers: { 'Content-Type': 'application/json' } };
    return;
  }

  // Check rate limit via Supabase
  const { data: existing } = await supabase.from('otp_sessions').select('*').eq('phone', adminPhone).eq('type', 'otp').gte('created_at', new Date(Date.now() - 60000).toISOString()).limit(1);
  if (existing && existing.length > 0) {
    context.res = { status: 429, body: { error: 'OTP already sent. Please wait before requesting again.' }, headers: { 'Content-Type': 'application/json' } };
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP in Supabase (expires in 5 minutes)
  await supabase.from('otp_sessions').delete().eq('phone', adminPhone).eq('type', 'otp');
  await supabase.from('otp_sessions').insert({
    phone: adminPhone, type: 'otp', otp_code: otp, attempts: 0,
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
  });

  try {
    await sendWhatsAppOTP(adminPhone, otp);
    const masked = adminPhone.slice(-4).padStart(adminPhone.length, '*');
    context.res = { status: 200, body: { success: true, masked_number: masked }, headers: { 'Content-Type': 'application/json' } };
  } catch (e) {
    await supabase.from('otp_sessions').delete().eq('phone', adminPhone).eq('type', 'otp');
    context.log.error('OTP send error:', e.message);
    context.res = { status: 500, body: { error: 'Failed to send OTP via WhatsApp.' }, headers: { 'Content-Type': 'application/json' } };
  }
};
