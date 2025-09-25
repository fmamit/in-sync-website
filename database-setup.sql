-- Blog Persistence Database Setup
-- Run this SQL in your Supabase SQL Editor to create the blogs table

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'In-Sync Team',
  category TEXT NOT NULL DEFAULT 'General',
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '/api/placeholder/400/250',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS (Row Level Security)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow everyone to read blogs
CREATE POLICY "Allow public read access to blogs" ON public.blogs
  FOR SELECT USING (true);

-- Allow authenticated users to insert blogs
CREATE POLICY "Allow authenticated users to insert blogs" ON public.blogs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blogs
CREATE POLICY "Allow authenticated users to update blogs" ON public.blogs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blogs
CREATE POLICY "Allow authenticated users to delete blogs" ON public.blogs
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial blog data
INSERT INTO public.blogs (title, excerpt, content, author, category, read_time, tags, image_url) VALUES
(
  'AI-Powered CRM: The Future of Customer Relationship Management',
  'Discover how artificial intelligence is revolutionizing CRM systems and transforming customer interactions across industries.',
  '<h2>Introduction</h2><p>Artificial Intelligence is reshaping the customer relationship management landscape, bringing unprecedented capabilities to businesses of all sizes. In this comprehensive guide, we''ll explore how AI-powered CRM systems are transforming the way companies interact with their customers.</p><h2>Key Benefits of AI in CRM</h2><p>The integration of artificial intelligence into CRM systems provides numerous advantages including enhanced customer insights, improved sales forecasting, and automated task management.</p>',
  'Rahul Sharma',
  'AI & Automation',
  '8 min read',
  ARRAY['AI', 'CRM', 'Automation', 'Technology'],
  '/api/placeholder/400/250'
),
(
  'WhatsApp Business API Integration Best Practices',
  'Learn how to effectively integrate WhatsApp Business API into your customer communication strategy for maximum engagement.',
  '<h2>Getting Started</h2><p>WhatsApp Business API provides a powerful platform for customer communication. This guide covers best practices for integration, compliance requirements, and optimization strategies.</p><h2>Implementation Strategy</h2><p>Successful WhatsApp API integration requires careful planning, proper setup, and ongoing optimization to ensure maximum customer engagement.</p>',
  'Priya Patel',
  'Communication',
  '6 min read',
  ARRAY['WhatsApp', 'API', 'Communication', 'Best Practices'],
  '/api/placeholder/400/250'
),
(
  'Field Force Management in the Digital Age',
  'Explore modern approaches to field force management and how GPS tracking and mobile CRM are changing the game.',
  '<h2>Modern Field Force Challenges</h2><p>Managing field teams in today''s digital landscape requires new tools and approaches. GPS tracking, mobile CRM, and real-time communication are transforming how organizations manage their field workforce.</p><h2>Technology Solutions</h2><p>Digital tools are revolutionizing field force management through improved tracking, communication, and performance analytics.</p>',
  'Amit Kumar',
  'Field Force',
  '10 min read',
  ARRAY['Field Force', 'GPS', 'Mobile CRM', 'Management'],
  '/api/placeholder/400/250'
);