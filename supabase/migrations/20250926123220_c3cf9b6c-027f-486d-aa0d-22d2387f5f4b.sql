-- Assign admin role to the user a@in-sync.co.in
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'a@in-sync.co.in'
ON CONFLICT (user_id, role) DO NOTHING;