-- OTP sessions table for serverless agent backend
-- Stores OTP codes and session tokens (replaces in-memory Map)
CREATE TABLE IF NOT EXISTS public.otp_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('otp', 'session')),
  otp_code TEXT NOT NULL,
  attempts INT DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-cleanup expired sessions (optional - run periodically)
-- DELETE FROM public.otp_sessions WHERE expires_at < now();

-- RLS
ALTER TABLE public.otp_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access to otp_sessions" ON public.otp_sessions
  FOR ALL USING (true) WITH CHECK (true);
