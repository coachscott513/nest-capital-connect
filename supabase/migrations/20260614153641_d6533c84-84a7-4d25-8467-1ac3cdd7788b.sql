-- Allow public claim submissions + admin-only reads on listing_claims, and notify team on insert.
GRANT INSERT ON public.listing_claims TO anon, authenticated;
GRANT ALL ON public.listing_claims TO service_role;

-- Admin SELECT policy (existing has only INSERT). Restrict reads to service_role / admins.
DROP POLICY IF EXISTS "Admins can read listing claims" ON public.listing_claims;
CREATE POLICY "Admins can read listing claims"
  ON public.listing_claims
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Notify team when a new claim is submitted.
DROP TRIGGER IF EXISTS trg_listing_claims_notify ON public.listing_claims;
CREATE TRIGGER trg_listing_claims_notify
  AFTER INSERT ON public.listing_claims
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();