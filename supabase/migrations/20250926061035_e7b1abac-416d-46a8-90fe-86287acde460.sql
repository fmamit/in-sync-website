-- Fix security warnings by setting search_path for functions

-- Update generate_application_id function with search_path
CREATE OR REPLACE FUNCTION public.generate_application_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  random_id TEXT;
BEGIN
  -- Generate a random 8-character alphanumeric ID
  SELECT upper(substr(md5(random()::text), 1, 8)) INTO random_id;
  RETURN 'APP-' || random_id;
END;
$$;

-- Update set_application_id function with search_path
CREATE OR REPLACE FUNCTION public.set_application_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.application_id IS NULL OR NEW.application_id = '' THEN
    NEW.application_id = public.generate_application_id();
  END IF;
  RETURN NEW;
END;
$$;