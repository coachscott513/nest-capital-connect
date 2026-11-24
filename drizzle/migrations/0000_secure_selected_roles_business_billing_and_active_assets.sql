CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access must be provisioned by an authorized operator' USING ERRCODE = '42501';
  END IF;
  RETURN 'already_admin';
END;
$function$;
REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO service_role;
COMMENT ON FUNCTION public.claim_first_admin() IS 'DEPRECATED: administrator roles require privileged provisioning; this function never grants a role.';

CREATE OR REPLACE FUNCTION public.protect_business_paid_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $function$
BEGIN
  IF ROW(NEW.plan_tier, NEW.is_featured, NEW.featured_order,
         NEW.stripe_customer_id, NEW.stripe_subscription_id,
         NEW.subscription_status, NEW.subscription_current_period_end)
     IS DISTINCT FROM
     ROW(OLD.plan_tier, OLD.is_featured, OLD.featured_order,
         OLD.stripe_customer_id, OLD.stripe_subscription_id,
         OLD.subscription_status, OLD.subscription_current_period_end)
     AND current_user NOT IN ('postgres', 'service_role')
     AND NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Only authorized administrators can change paid placement or billing' USING ERRCODE = '42501';
  END IF;
  RETURN NEW;
END;
$function$;
CREATE TRIGGER protect_business_paid_fields
BEFORE UPDATE ON public.businesses
FOR EACH ROW EXECUTE FUNCTION public.protect_business_paid_fields();

ALTER POLICY "High yield assets are publicly readable"
ON public.high_yield_assets
USING (is_active = true);