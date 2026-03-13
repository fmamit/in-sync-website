const { supabase } = require('../shared/clients');

module.exports = async function (context, req) {
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } };
    return;
  }

  const adminPhone = process.env.ADMIN_WHATSAPP;
  const { otp } = req.body || {};

  if (!otp || typeof otp !== 'string') {
    context.res = { status: 400, body: { error: 'OTP is required.' }, headers: { 'Content-Type': 'application/json' } };
    return;
  }

  // Fetch stored OTP from Supabase
  const { data: stored } = await supabase.from('otp_sessions').select('*').eq('phone', adminPhone).eq('type', 'otp').single();

  if (!stored || new Date(stored.expires_at) < new Date()) {
    if (stored) await supabase.from('otp_sessions').delete().eq('id', stored.id);
    context.res = { status: 401, body: { error: 'OTP expired. Please request a new one.' }, headers: { 'Content-Type': 'application/json' } };
    return;
  }

  // Brute-force protection
  const attempts = (stored.attempts || 0) + 1;
  if (attempts > 5) {
    await supabase.from('otp_sessions').delete().eq('id', stored.id);
    context.res = { status: 429, body: { error: 'Too many attempts. Request a new OTP.' }, headers: { 'Content-Type': 'application/json' } };
    return;
  }

  await supabase.from('otp_sessions').update({ attempts }).eq('id', stored.id);

  if (stored.otp_code !== otp) {
    context.res = { status: 401, body: { error: 'Incorrect OTP. Please try again.' }, headers: { 'Content-Type': 'application/json' } };
    return;
  }

  // OTP verified - clean up and issue session token
  await supabase.from('otp_sessions').delete().eq('id', stored.id);

  const token = Buffer.from(`${Date.now()}-${Math.random().toString(36)}`).toString('base64');
  await supabase.from('otp_sessions').insert({
    phone: adminPhone, type: 'session', otp_code: token,
    expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  });

  context.res = { status: 200, body: { success: true, token }, headers: { 'Content-Type': 'application/json' } };
};
