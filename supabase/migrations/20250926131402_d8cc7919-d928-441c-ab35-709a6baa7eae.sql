-- Add meta tag fields to blogs table
ALTER TABLE public.blogs 
ADD COLUMN meta_description text,
ADD COLUMN meta_keywords text,
ADD COLUMN geo_region text DEFAULT 'IN',
ADD COLUMN geo_placename text DEFAULT 'India', 
ADD COLUMN geo_position text DEFAULT '20.5937;78.9629',
ADD COLUMN icbm text DEFAULT '20.5937, 78.9629';