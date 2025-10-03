-- Add thumbnail_url and video_url columns to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS thumbnail_url text,
ADD COLUMN IF NOT EXISTS video_url text;