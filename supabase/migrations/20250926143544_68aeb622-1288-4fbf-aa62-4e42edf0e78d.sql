-- Create whitepapers table
CREATE TABLE public.whitepapers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'In-Sync Team',
  tags TEXT[] DEFAULT '{}',
  pages INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  pdf_url TEXT,
  thumbnail_url TEXT,
  file_size_mb DECIMAL,
  publication_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.whitepapers ENABLE ROW LEVEL SECURITY;

-- Create policies for whitepapers
CREATE POLICY "Whitepapers are viewable by everyone" 
ON public.whitepapers 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert whitepapers" 
ON public.whitepapers 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update whitepapers" 
ON public.whitepapers 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete whitepapers" 
ON public.whitepapers 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create storage buckets for whitepapers
INSERT INTO storage.buckets (id, name, public) VALUES ('whitepapers', 'whitepapers', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('whitepaper-thumbnails', 'whitepaper-thumbnails', true);

-- Create storage policies for whitepapers
CREATE POLICY "Whitepaper files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'whitepapers');

CREATE POLICY "Authenticated users can upload whitepapers" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'whitepapers' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update whitepapers" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'whitepapers' AND auth.role() = 'authenticated');

-- Create storage policies for whitepaper thumbnails
CREATE POLICY "Whitepaper thumbnails are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'whitepaper-thumbnails');

CREATE POLICY "Authenticated users can upload whitepaper thumbnails" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'whitepaper-thumbnails' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update whitepaper thumbnails" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'whitepaper-thumbnails' AND auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates on whitepapers
CREATE TRIGGER update_whitepapers_updated_at
BEFORE UPDATE ON public.whitepapers
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();