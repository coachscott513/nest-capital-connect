-- 1. Answerability readiness (derived, admin-only, no new stored score)
CREATE OR REPLACE VIEW public.v_business_answerability_readiness
WITH (security_invoker = true) AS
SELECT
  b.id AS business_id,
  b.slug,
  b.name,
  b.town_slug,
  b.town_name,
  b.eligibility_state,
  b.record_status,
  b.verification_status,
  b.seo_cohort,
  b.last_verified_at,
  (b.town_slug IS NOT NULL AND b.town_name IS NOT NULL) AS has_location_evidence,
  (b.phone IS NOT NULL AND b.phone <> '') AS has_phone,
  (b.website IS NOT NULL AND b.website <> '') AS has_website,
  ((b.instagram IS NOT NULL AND b.instagram <> '') OR (b.facebook IS NOT NULL AND b.facebook <> '')) AS has_social,
  (b.hours IS NOT NULL) AS has_hours_field,
  (b.category IS NOT NULL AND b.category <> '') AS has_category_field,
  (b.services IS NOT NULL AND jsonb_typeof(b.services) = 'array' AND jsonb_array_length(b.services) > 0) AS has_services_field,
  COALESCE(s.source_count, 0) AS source_count,
  COALESCE(s.authoritative_source_count, 0) AS authoritative_source_count,
  (spu.id IS NOT NULL) AS is_seo_protected,
  spu.protection_tier,
  CASE
    WHEN b.record_status <> 'active' OR COALESCE(b.quarantine_status, 'none') <> 'none' THEN 'blocked_by_conflict'
    WHEN b.eligibility_state = 'editorial_featured' THEN 'editorially_enriched'
    WHEN b.eligibility_state = 'claimed_enriched' THEN 'owner_confirmed'
    WHEN b.eligibility_state = 'verified_basic'
         AND COALESCE(s.authoritative_source_count, 0) > 0
         AND b.services IS NOT NULL AND jsonb_typeof(b.services) = 'array' AND jsonb_array_length(b.services) > 0
      THEN 'service_ready'
    WHEN b.eligibility_state = 'verified_basic'
         AND ((b.phone IS NOT NULL AND b.phone <> '') OR (b.website IS NOT NULL AND b.website <> ''))
      THEN 'contact_ready'
    ELSE 'identity_only'
  END AS readiness_state
FROM public.businesses b
LEFT JOIN (
  SELECT business_id,
         count(*) AS source_count,
         count(*) FILTER (
           WHERE evidence_state IN ('official_source','owner_asserted','staff_verified','public_record','editorial')
         ) AS authoritative_source_count
  FROM public.business_sources
  GROUP BY business_id
) s ON s.business_id = b.id
LEFT JOIN LATERAL (
  SELECT p.id, p.protection_tier
  FROM public.seo_protected_urls p
  WHERE p.business_id = b.id
  ORDER BY p.clicks_90d DESC NULLS LAST
  LIMIT 1
) spu ON true;

GRANT SELECT ON public.v_business_answerability_readiness TO authenticated;
GRANT SELECT ON public.v_business_answerability_readiness TO service_role;

-- 2. Pilot cohort (admin-only)
CREATE TABLE IF NOT EXISTS public.answerability_pilot_cohort (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
  url text NOT NULL,
  business_slug text,
  selection_bucket text NOT NULL CHECK (selection_bucket IN ('top_clicks','impressions_weak_ctr','strategic_category','fail_closed_example')),
  selection_reason text,
  clicks_90d integer DEFAULT 0,
  impressions_90d integer DEFAULT 0,
  ctr numeric,
  protection_tier text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.answerability_pilot_cohort TO authenticated;
GRANT ALL ON public.answerability_pilot_cohort TO service_role;
ALTER TABLE public.answerability_pilot_cohort ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage pilot cohort"
  ON public.answerability_pilot_cohort FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Ask Nest requests (PII lives here, never in engagement_events)
CREATE TABLE IF NOT EXISTS public.ask_nest_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL CHECK (request_type IN (
    'verify_operating','current_contact','ask_about_service','find_similar',
    'report_incorrect','real_estate_town','other_local_help'
  )),
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  business_slug text,
  town_slug text,
  service_intent text,
  message text,
  contact_name text,
  contact_email text,
  contact_phone text,
  self_reported_discovery text CHECK (self_reported_discovery IN (
    'google','chatgpt','other_ai_assistant','social_media','another_website',
    'person_referral','already_knew','other'
  )),
  technical_source_family text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','in_review','answered','routed_to_business','routed_to_real_estate','closed')),
  outcome_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.ask_nest_requests TO authenticated;
GRANT ALL ON public.ask_nest_requests TO service_role;
ALTER TABLE public.ask_nest_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read ask nest requests"
  ON public.ask_nest_requests FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update ask nest requests"
  ON public.ask_nest_requests FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS idx_ask_nest_requests_created ON public.ask_nest_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ask_nest_requests_business ON public.ask_nest_requests (business_id);

-- 4. New privacy-safe analytics event names
INSERT INTO public.engagement_event_types (event_type, is_active)
VALUES ('ask_nest_open', true), ('ask_nest_submit', true),
       ('owner_value_preview_view', true), ('town_context_click', true)
ON CONFLICT (event_type) DO NOTHING;