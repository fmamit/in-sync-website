-- Add publication_date column to blogs table
ALTER TABLE public.blogs 
ADD COLUMN publication_date DATE DEFAULT CURRENT_DATE;

-- Update existing blogs to use created_at as publication_date
UPDATE public.blogs 
SET publication_date = created_at::date 
WHERE publication_date IS NULL;