-- Fix critical security vulnerability in onboarding_applications table
-- Remove the overly permissive policy that allows any authenticated user to view all applications
DROP POLICY IF EXISTS "Authenticated users can view all onboarding applications" ON public.onboarding_applications;

-- Create a new policy that restricts access to only admin users
CREATE POLICY "Only admins can view onboarding applications" 
ON public.onboarding_applications 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Also restrict update access to admins only (previously any authenticated user could update)
DROP POLICY IF EXISTS "Authenticated users can update onboarding applications" ON public.onboarding_applications;

CREATE POLICY "Only admins can update onboarding applications" 
ON public.onboarding_applications 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Keep the insert policy as is since we want anyone to be able to submit applications
-- But add a policy for delete operations restricted to admins
CREATE POLICY "Only admins can delete onboarding applications" 
ON public.onboarding_applications 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'::app_role));