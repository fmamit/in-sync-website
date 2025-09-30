-- Add thumbnail_url column to tutorials table
ALTER TABLE public.tutorials
ADD COLUMN IF NOT EXISTS thumbnail_url text;