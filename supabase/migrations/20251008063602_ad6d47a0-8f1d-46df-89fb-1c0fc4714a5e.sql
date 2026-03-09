-- Create demo_requests table to store all demo requests locally
CREATE TABLE public.demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  industry text NOT NULL,
  best_time_to_contact text NOT NULL,
  problem_description text NOT NULL,
  webhook_sent boolean DEFAULT false,
  webhook_sent_at timestamp with time zone,
  webhook_response jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit demo requests (public form)
CREATE POLICY "Anyone can submit demo requests"
  ON public.demo_requests
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only admins can view demo requests
CREATE POLICY "Only admins can view demo requests"
  ON public.demo_requests
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for automatic updated_at timestamp
CREATE TRIGGER handle_demo_requests_updated_at
  BEFORE UPDATE ON public.demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();