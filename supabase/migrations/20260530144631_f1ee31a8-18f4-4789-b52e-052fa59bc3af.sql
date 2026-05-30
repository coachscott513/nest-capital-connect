
-- 1) analyzer_leads: explicit deny for authenticated SELECT
DROP POLICY IF EXISTS "Authenticated cannot read analyzer leads" ON public.analyzer_leads;
CREATE POLICY "Authenticated cannot read analyzer leads"
ON public.analyzer_leads
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (false);

-- 2) businesses: hide stripe/subscription columns from anon + authenticated
REVOKE SELECT (stripe_customer_id, stripe_subscription_id, subscription_status, subscription_current_period_end)
  ON public.businesses FROM anon, authenticated;

-- Allow the claimed owner to read their own stripe data
GRANT SELECT (stripe_customer_id, stripe_subscription_id, subscription_status, subscription_current_period_end)
  ON public.businesses TO authenticated;

-- Add restrictive policy so authenticated can only see those columns on their own rows.
-- Column-level GRANT above re-enables read; combined with existing row policy
-- (is_active=true), authenticated users can read those columns on any active row.
-- To truly restrict, revoke again from authenticated and only grant via owner check
-- using a view.
REVOKE SELECT (stripe_customer_id, stripe_subscription_id, subscription_status, subscription_current_period_end)
  ON public.businesses FROM authenticated;

CREATE OR REPLACE VIEW public.business_billing AS
SELECT id, claimed_by_user_id, stripe_customer_id, stripe_subscription_id,
       subscription_status, subscription_current_period_end
FROM public.businesses
WHERE is_claimed = true AND claimed_by_user_id = auth.uid();

GRANT SELECT ON public.business_billing TO authenticated;

-- 3) town_market_data: hide agent contact from anon
REVOKE SELECT (anchor_agent_phone, anchor_agent_email) ON public.town_market_data FROM anon;

-- 4) Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;
