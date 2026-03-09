-- Create support_tickets table
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolution_working_hours NUMERIC(10,2),
  assigned_to TEXT,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for widget submissions)
CREATE POLICY "Allow public ticket creation" ON public.support_tickets
  FOR INSERT WITH CHECK (true);

-- Allow public read by ticket_number (for status checking)
CREATE POLICY "Allow public read by ticket number" ON public.support_tickets
  FOR SELECT USING (true);

-- Create index on ticket_number for fast lookups
CREATE INDEX idx_support_tickets_ticket_number ON public.support_tickets(ticket_number);
CREATE INDEX idx_support_tickets_email ON public.support_tickets(email);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON public.support_tickets(created_at);

-- Function to generate ticket number (TKT-YYYYMMDD-XXXX)
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TEXT AS $$
DECLARE
  today_str TEXT;
  seq_num INT;
  ticket_num TEXT;
BEGIN
  today_str := TO_CHAR(NOW(), 'YYYYMMDD');
  SELECT COUNT(*) + 1 INTO seq_num
  FROM public.support_tickets
  WHERE ticket_number LIKE 'TKT-' || today_str || '-%';
  ticket_num := 'TKT-' || today_str || '-' || LPAD(seq_num::TEXT, 4, '0');
  RETURN ticket_num;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate working hours (Mon-Fri, 9AM-6PM IST)
CREATE OR REPLACE FUNCTION calculate_working_hours(start_time TIMESTAMPTZ, end_time TIMESTAMPTZ)
RETURNS NUMERIC AS $$
DECLARE
  cur_ts TIMESTAMP;
  total_hours NUMERIC := 0;
  day_start TIME := '09:00:00';
  day_end TIME := '18:00:00';
  cur_date DATE;
  work_start TIMESTAMP;
  work_end TIMESTAMP;
  ist_start TIMESTAMP;
  ist_end TIMESTAMP;
BEGIN
  -- Convert to IST (UTC+5:30)
  ist_start := start_time AT TIME ZONE 'Asia/Kolkata';
  ist_end := end_time AT TIME ZONE 'Asia/Kolkata';

  cur_ts := ist_start;

  WHILE cur_ts < ist_end LOOP
    cur_date := cur_ts::DATE;

    -- Skip weekends (0=Sunday, 6=Saturday)
    IF EXTRACT(DOW FROM cur_date) NOT IN (0, 6) THEN
      work_start := cur_date + day_start;
      work_end := cur_date + day_end;

      -- Clamp to working hours
      IF cur_ts < work_start THEN
        cur_ts := work_start;
      END IF;

      IF cur_ts < work_end AND cur_ts >= work_start THEN
        IF ist_end < work_end THEN
          total_hours := total_hours + EXTRACT(EPOCH FROM (ist_end - cur_ts)) / 3600.0;
          EXIT;
        ELSE
          total_hours := total_hours + EXTRACT(EPOCH FROM (work_end - cur_ts)) / 3600.0;
        END IF;
      END IF;
    END IF;

    -- Move to next day 9 AM
    cur_ts := (cur_date + INTERVAL '1 day') + day_start;
  END LOOP;

  RETURN ROUND(total_hours, 2);
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-set updated_at and calculate resolution hours
CREATE OR REPLACE FUNCTION update_ticket_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  -- Calculate working hours when resolved
  IF NEW.status = 'resolved' AND OLD.status != 'resolved' THEN
    NEW.resolved_at = NOW();
    NEW.resolution_working_hours = calculate_working_hours(NEW.created_at, NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_ticket_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_ticket_updated_at();
