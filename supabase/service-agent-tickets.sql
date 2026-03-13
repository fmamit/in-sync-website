-- ============================================
-- In-Sync Service Agent — Tickets Table
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- 1. Create the tickets table
CREATE TABLE public.tickets (
  ticket_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  user_message TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('bug', 'query', 'api_issue')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
  assigned_to TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tickets_updated_at
  BEFORE UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_tickets_updated_at();

-- 3. Row Level Security disabled as per build guide
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access to tickets" ON public.tickets
  FOR ALL USING (true) WITH CHECK (true);
