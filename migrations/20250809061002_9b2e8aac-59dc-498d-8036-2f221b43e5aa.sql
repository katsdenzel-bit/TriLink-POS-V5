-- Create default admin and staff users with proper roles
-- Note: In production, these users should change their passwords immediately

-- Insert default admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'admin@trilinkwireless.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"email": "admin@trilinkwireless.com", "first_name": "System", "last_name": "Administrator"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Insert staff user 1
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '22222222-2222-2222-2222-222222222222'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'staff1@trilinkwireless.com',
  crypt('staff123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"email": "staff1@trilinkwireless.com", "first_name": "Staff", "last_name": "Member 1"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Insert staff user 2
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '33333333-3333-3333-3333-333333333333'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'staff2@trilinkwireless.com',
  crypt('staff123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"email": "staff2@trilinkwireless.com", "first_name": "Staff", "last_name": "Member 2"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create profiles for the default users
INSERT INTO profiles (
  id,
  first_name,
  last_name,
  phone_number,
  mac_address
) VALUES 
(
  '11111111-1111-1111-1111-111111111111'::uuid,
  'System',
  'Administrator',
  '0771712356',
  '00:00:00:00:00:00'
),
(
  '22222222-2222-2222-2222-222222222222'::uuid,
  'Staff',
  'Member 1',
  '0771712356',
  '00:00:00:00:00:01'
),
(
  '33333333-3333-3333-3333-333333333333'::uuid,
  'Staff',
  'Member 2',
  '0771712356',
  '00:00:00:00:00:02'
) ON CONFLICT (id) DO NOTHING;

-- Assign roles
INSERT INTO user_roles (user_id, role) VALUES 
('11111111-1111-1111-1111-111111111111'::uuid, 'admin'),
('22222222-2222-2222-2222-222222222222'::uuid, 'staff'),
('33333333-3333-3333-3333-333333333333'::uuid, 'staff')
ON CONFLICT (user_id) DO NOTHING;

-- Create RLS policy for staff to manage plans (but only admin can alter them)
CREATE POLICY "Admin can manage plans" 
ON public.plans 
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Update existing voucher management policy to be more specific
DROP POLICY IF EXISTS "Staff can create vouchers" ON public.vouchers;
DROP POLICY IF EXISTS "Staff can update vouchers" ON public.vouchers;

CREATE POLICY "Staff can create vouchers" 
ON public.vouchers 
FOR INSERT 
WITH CHECK (get_user_role(auth.uid()) = ANY (ARRAY['admin'::text, 'staff'::text]));

CREATE POLICY "Staff can update voucher status" 
ON public.vouchers 
FOR UPDATE 
USING (get_user_role(auth.uid()) = ANY (ARRAY['admin'::text, 'staff'::text]));

-- Ensure admin has full control over everything
CREATE POLICY "Admin can manage everything" 
ON public.vouchers 
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Update the notification sending to track activation/deactivation
CREATE OR REPLACE FUNCTION public.send_activation_sms()
RETURNS TRIGGER AS $$
BEGIN
  -- Send SMS when voucher is activated
  IF NEW.is_active = true AND (OLD.is_active = false OR OLD.is_active IS NULL) THEN
    INSERT INTO public.notifications (
      user_id,
      phone_number,
      message,
      type,
      status
    ) 
    SELECT 
      NEW.user_id,
      p.phone_number,
      'TriLink Wireless: Your internet access has been activated. Code: ' || NEW.code || '. Enjoy unlimited browsing!',
      'activation',
      'pending'
    FROM public.profiles p 
    WHERE p.id = NEW.user_id AND p.phone_number IS NOT NULL;
  END IF;
  
  -- Send SMS when voucher is deactivated
  IF NEW.is_active = false AND OLD.is_active = true THEN
    INSERT INTO public.notifications (
      user_id,
      phone_number,
      message,
      type,
      status
    ) 
    SELECT 
      NEW.user_id,
      p.phone_number,
      'TriLink Wireless: Your internet access has been deactivated. Code: ' || NEW.code || '. Contact us for assistance.',
      'deactivation',
      'pending'
    FROM public.profiles p 
    WHERE p.id = NEW.user_id AND p.phone_number IS NOT NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for SMS notifications
DROP TRIGGER IF EXISTS voucher_activation_sms ON public.vouchers;
CREATE TRIGGER voucher_activation_sms
  AFTER UPDATE ON public.vouchers
  FOR EACH ROW
  EXECUTE FUNCTION public.send_activation_sms();