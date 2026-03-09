-- Assign admin role to a@in-sync.co.in
INSERT INTO public.user_roles (user_id, role) 
VALUES ('b0d4e54e-c22f-4b41-865e-5b4960bbd2e9', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;