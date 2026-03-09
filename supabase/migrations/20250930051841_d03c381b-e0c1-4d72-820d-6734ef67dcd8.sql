-- Create tutorials table
CREATE TABLE public.tutorials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL DEFAULT 'Video Tutorial',
  duration text NOT NULL DEFAULT '30 minutes',
  level text NOT NULL DEFAULT 'Beginner',
  category text NOT NULL,
  video_count integer DEFAULT 1,
  video_url text,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc', now())
);

-- Enable Row Level Security
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Tutorials are viewable by everyone"
ON public.tutorials
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert tutorials"
ON public.tutorials
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update tutorials"
ON public.tutorials
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete tutorials"
ON public.tutorials
FOR DELETE
USING (auth.role() = 'authenticated');

-- Create trigger for automatic updated_at timestamp
CREATE TRIGGER handle_tutorials_updated_at
BEFORE UPDATE ON public.tutorials
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial sample data
INSERT INTO public.tutorials (title, description, type, duration, level, category, video_count, tags, video_url) VALUES
('Getting Started with In-Sync CRM', 'Complete beginner''s guide to setting up and using In-Sync CRM for your business.', 'Video Series', '45 minutes', 'Beginner', 'Setup & Configuration', 8, ARRAY['Getting Started', 'Setup', 'Basic Features'], '#'),
('Advanced Sales Pipeline Management', 'Learn to create sophisticated sales pipelines, set up automation, and track performance metrics.', 'Interactive Guide', '30 minutes', 'Advanced', 'Sales Management', 1, ARRAY['Sales Pipeline', 'Automation', 'Analytics'], '#'),
('WhatsApp Integration Step-by-Step', 'Detailed tutorial on integrating WhatsApp Business API with your In-Sync CRM system.', 'Written Tutorial', '20 minutes', 'Intermediate', 'Integrations', 0, ARRAY['WhatsApp', 'Integration', 'API Setup'], '#'),
('Field Force Management Best Practices', 'Comprehensive guide to managing field teams using GPS tracking, mobile CRM, and performance analytics.', 'Video Tutorial', '35 minutes', 'Intermediate', 'Field Management', 1, ARRAY['Field Force', 'GPS', 'Mobile CRM'], '#'),
('Customer Data Analytics Deep Dive', 'Master customer data analytics to uncover insights and drive business growth through data-driven decisions.', 'Video Series', '60 minutes', 'Advanced', 'Analytics', 12, ARRAY['Analytics', 'Data', 'Business Intelligence', 'Reporting'], '#'),
('Automation Workflows for Beginners', 'Learn to create simple yet powerful automation workflows to streamline your business processes.', 'Interactive Tutorial', '25 minutes', 'Beginner', 'Automation', 1, ARRAY['Automation', 'Workflows', 'Process', 'Efficiency'], '#'),
('Mobile CRM Usage Guide', 'Complete guide to using In-Sync mobile CRM app for field sales, customer visits, and remote work.', 'Video Tutorial', '40 minutes', 'Beginner', 'Mobile App', 1, ARRAY['Mobile', 'App', 'Field Sales', 'Remote Work'], '#');