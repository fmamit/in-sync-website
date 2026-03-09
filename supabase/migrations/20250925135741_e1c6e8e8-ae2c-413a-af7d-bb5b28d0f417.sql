-- Create the blogs table with proper schema
CREATE TABLE public.blogs (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '/api/placeholder/400/250',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Blogs are viewable by everyone" 
ON public.blogs 
FOR SELECT 
USING (true);

-- Create policies for authenticated users to manage blogs
CREATE POLICY "Authenticated users can insert blogs" 
ON public.blogs 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blogs" 
ON public.blogs 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blogs" 
ON public.blogs 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER handle_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample blog data
INSERT INTO public.blogs (title, excerpt, content, author, category, read_time, tags, image_url) VALUES
(
  'AI-Powered CRM: The Future of Customer Relationship Management',
  'Discover how artificial intelligence is revolutionizing CRM systems and transforming customer interactions across industries.',
  'Artificial Intelligence is fundamentally changing how businesses manage customer relationships. Modern AI-powered CRM systems can predict customer behavior, automate routine tasks, and provide personalized experiences at scale. This transformation is helping companies increase efficiency while delivering better customer service.',
  'Rahul Sharma',
  'AI & Automation',
  '8 min read',
  ARRAY['AI', 'CRM', 'Automation', 'Technology'],
  '/api/placeholder/400/250'
),
(
  'WhatsApp Business API Integration Best Practices',
  'Learn how to effectively integrate WhatsApp Business API into your customer communication strategy for maximum engagement.',
  'WhatsApp Business API has become an essential tool for modern customer communication. This comprehensive guide covers best practices for implementation, common pitfalls to avoid, and strategies for maximizing engagement rates. Learn how to create automated workflows that feel personal and maintain compliance with WhatsApp policies.',
  'Priya Patel',
  'Communication',
  '6 min read',
  ARRAY['WhatsApp', 'API', 'Communication', 'Best Practices'],
  '/api/placeholder/400/250'
),
(
  'Building Scalable Sales Funnels with Marketing Automation',
  'A complete guide to creating sales funnels that convert prospects into customers using intelligent automation tools.',
  'Marketing automation has revolutionized how businesses nurture leads and convert prospects. This article explores proven strategies for building scalable sales funnels that adapt to customer behavior, optimize conversion rates, and reduce manual overhead. Discover the tools and techniques that leading companies use to automate their sales processes.',
  'Alex Johnson',
  'Sales & Marketing',
  '10 min read',
  ARRAY['Sales', 'Marketing', 'Automation', 'Conversion'],
  '/api/placeholder/400/250'
);