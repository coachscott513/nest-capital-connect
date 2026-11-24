CREATE OR REPLACE FUNCTION public.is_valid_public_email(_e text)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $$
  SELECT _e IS NOT NULL AND length(_e) BETWEEN 5 AND 254 AND _e ~ '^[^[:space:]@<>]+@[^[:space:]@<>]+\.[^[:space:]@<>]+$'
$$;
CREATE OR REPLACE FUNCTION public.is_valid_public_text(_t text, _min int, _max int)
RETURNS boolean LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $$
  SELECT CASE WHEN _t IS NULL THEN _min = 0 ELSE length(btrim(_t)) >= _min AND length(_t) <= _max END
$$;

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.analyzer_leads;
CREATE POLICY "Validated public analyzer leads" ON public.analyzer_leads FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(full_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(user_type,1,100) AND public.is_valid_public_text(phone,0,40)
  AND report_sent = false);

DROP POLICY IF EXISTS "Anyone can submit applications" ON public.business_applications;
CREATE POLICY "Validated public business applications" ON public.business_applications FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(business_name,1,200) AND public.is_valid_public_email(email)
  AND status = 'pending_editorial_review' AND published_business_id IS NULL AND editorial_notes IS NULL
  AND (submitted_by IS NULL OR submitted_by = auth.uid())
  AND public.is_valid_public_text(phone,0,40) AND public.is_valid_public_text(own_words,0,10000));

DROP POLICY IF EXISTS "Anyone can submit deal desk requests" ON public.deal_desk_requests;
CREATE POLICY "Validated public deal desk requests" ON public.deal_desk_requests FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(first_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(property_address,1,500) AND public.is_valid_public_text(strategy,1,200)
  AND public.is_valid_public_text(notes,0,5000));

DROP POLICY IF EXISTS "Anyone can submit intel report leads" ON public.intel_report_leads;
CREATE POLICY "Validated public intel report leads" ON public.intel_report_leads FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(full_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(report_slug,1,300) AND public.is_valid_public_text(phone,0,40));

DROP POLICY IF EXISTS "Anyone can submit investment leads" ON public.investment_leads;
CREATE POLICY "Validated public investment leads" ON public.investment_leads FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(full_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(phone,1,40) AND public.is_valid_public_text(lead_type,1,100)
  AND public.is_valid_public_text(notes,0,5000));

DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
CREATE POLICY "Validated public leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(full_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(type,1,100) AND public.is_valid_public_text(message,0,5000)
  AND public.is_valid_public_text(phone,0,40) AND assigned_agent_id IS NULL);

DROP POLICY IF EXISTS "Anyone can submit a listing claim" ON public.listing_claims;
CREATE POLICY "Validated public listing claims" ON public.listing_claims FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(claimant_name,1,200) AND public.is_valid_public_email(claimant_email)
  AND public.is_valid_public_text(claimant_phone,1,40) AND status IN ('new','pending')
  AND public.is_valid_public_text(message,0,5000));

DROP POLICY IF EXISTS "Anyone can submit market report leads" ON public.market_report_leads;
CREATE POLICY "Validated public market report leads" ON public.market_report_leads FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(full_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(buyer_type,1,100) AND public.is_valid_public_text(town_slug,1,200)
  AND public.is_valid_public_text(town_name,1,200) AND public.is_valid_public_text(phone,0,40));

DROP POLICY IF EXISTS "inquiries_public_insert" ON public.partner_inquiries;
CREATE POLICY "Validated public partner inquiries" ON public.partner_inquiries FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(phone,1,40) AND status = 'new'
  AND public.is_valid_public_text(notes,0,5000));

DROP POLICY IF EXISTS "Anyone can submit rental applications" ON public.rental_applications;
CREATE POLICY "Validated public rental applications" ON public.rental_applications FOR INSERT TO anon, authenticated
WITH CHECK (public.is_valid_public_text(full_name,1,200) AND public.is_valid_public_email(email)
  AND public.is_valid_public_text(annual_income,1,100) AND public.is_valid_public_text(phone,0,40)
  AND public.is_valid_public_text(message,0,5000));