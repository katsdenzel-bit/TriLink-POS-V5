-- Create RLS policy for admin to manage plans only
CREATE POLICY "Admin can manage plans" 
ON public.plans 
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Update existing voucher management policies
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
CREATE POLICY "Admin can manage vouchers" 
ON public.vouchers 
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Create function to send SMS on voucher activation/deactivation
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