
-- Add super_admin role to the user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('f7820f51-28fc-4535-bf22-f5623f530355', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;
