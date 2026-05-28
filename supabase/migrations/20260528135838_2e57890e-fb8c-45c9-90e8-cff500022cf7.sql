-- Bootstrap function: promotes the currently authenticated user to admin
-- ONLY if no admin exists yet. Idempotent and safe to call repeatedly.
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  admin_count int;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT count(*) INTO admin_count FROM public.user_roles WHERE role = 'admin';

  -- Already admin
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = uid AND role = 'admin') THEN
    RETURN 'already_admin';
  END IF;

  -- An admin already exists and it isn't you: refuse
  IF admin_count > 0 THEN
    RAISE EXCEPTION 'Admin already configured';
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (uid, 'admin'::app_role)
  ON CONFLICT DO NOTHING;

  RETURN 'granted';
END;
$$;

REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;