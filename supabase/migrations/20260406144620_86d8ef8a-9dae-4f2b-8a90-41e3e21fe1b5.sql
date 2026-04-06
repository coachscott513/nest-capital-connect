
-- Fix 1: Restrict analyzer_leads SELECT to service_role only (not all authenticated users)
DROP POLICY IF EXISTS "Authenticated users can read" ON public.analyzer_leads;
CREATE POLICY "Service role can read analyzer leads"
ON public.analyzer_leads
FOR SELECT
TO service_role
USING (true);

-- Fix 2: Restrict partner_subscriptions INSERT to service_role only (prevent self-issued subscriptions)
DROP POLICY IF EXISTS "Partners can insert their own subscriptions" ON public.partner_subscriptions;
CREATE POLICY "Service role can create subscriptions"
ON public.partner_subscriptions
FOR INSERT
TO service_role
WITH CHECK (true);
