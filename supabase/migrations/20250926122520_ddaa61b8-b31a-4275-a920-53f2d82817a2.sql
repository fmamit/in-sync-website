-- Assign admin role to the user once created
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Get the user ID by email
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'a@in-sync.co.in';
  
  -- Only proceed if user exists
  IF admin_user_id IS NOT NULL THEN
    -- Insert admin role if it doesn't exist
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END $$;