-- =====================================================================
-- Wave 1 completion: eligibility vs record_status, evidence-based
-- provenance, demand signals registry, controlled traffic sources.
-- Additive + corrective. No rows deleted, no public behavior changed.
-- =====================================================================

-- 1. RECORD STATUS (operational) separated from ELIGIBILITY (content quality)
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS record_status text NOT NULL DEFAULT 'active';

UPDATE public.businesses
   SET record_status = 'quarantined'
 WHERE eligibility_state = 'quarantined';
UPDATE public.businesses
   SET record_status = 'suppressed'
 WHERE eligibility_state = 'suppressed';
UPDATE public.businesses
   SET eligibility_state = 'registry_only'
 WHERE eligibility_state IN ('quarantined','suppressed');

ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_eligibility_state_check;
ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_eligibility_state_check
  CHECK (eligibility_state = ANY (ARRAY['registry_only','verified_basic','claimed_enriched','editorial_featured']));

ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_record_status_check;
ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_record_status_check
  CHECK (record_status = ANY (ARRAY['active','quarantined','suppressed','reported_closed','merged']));

CREATE INDEX IF NOT EXISTS idx_businesses_record_status ON public.businesses (record_status);

COMMENT ON COLUMN public.businesses.eligibility_state IS
  'Content-quality contract only: registry_only | verified_basic | claimed_enriched | editorial_featured.';
COMMENT ON COLUMN public.businesses.record_status IS
  'Operational record state: active | quarantined | suppressed | reported_closed | merged. Never a quality signal.';

-- 2. EVIDENCE STATE replaces arbitrary numeric confidence
ALTER TABLE public.business_sources
  ADD COLUMN IF NOT EXISTS evidence_state text NOT NULL DEFAULT 'unknown';

ALTER TABLE public.business_sources DROP CONSTRAINT IF EXISTS business_sources_evidence_state_check;
ALTER TABLE public.business_sources
  ADD CONSTRAINT business_sources_evidence_state_check
  CHECK (evidence_state = ANY (ARRAY['imported_unverified','official_source','owner_asserted','staff_verified','public_record','editorial','unknown']));

UPDATE public.business_sources SET evidence_state = CASE source_type
  WHEN 'google_places'  THEN 'imported_unverified'
  WHEN 'manual_import'  THEN 'imported_unverified'
  WHEN 'website_scrape' THEN 'imported_unverified'
  WHEN 'owner_claimed'  THEN 'owner_asserted'
  WHEN 'public_record'  THEN 'public_record'
  WHEN 'editorial'      THEN 'editorial'
  WHEN 'founder_assert' THEN 'staff_verified'
  ELSE 'unknown' END;

-- Retire the un-measured backfilled confidence numbers.
ALTER TABLE public.business_sources ALTER COLUMN confidence DROP NOT NULL;
ALTER TABLE public.business_sources ALTER COLUMN confidence DROP DEFAULT;
UPDATE public.business_sources SET confidence = NULL WHERE confidence IS NOT NULL;
COMMENT ON COLUMN public.business_sources.confidence IS
  'UNASSESSED. Reserved for a future measured resolver. Never displayed as a quality score and never used for ranking or eligibility. Backfilled heuristics were nulled in Wave 1.';
COMMENT ON COLUMN public.business_sources.evidence_state IS
  'Controlled source authority: imported_unverified | official_source | owner_asserted | staff_verified | public_record | editorial | unknown.';

CREATE INDEX IF NOT EXISTS idx_business_sources_evidence_state ON public.business_sources (evidence_state);

-- 3. DEMAND SIGNALS registry (private, admin-only)
CREATE TABLE IF NOT EXISTS public.demand_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  need_label text NOT NULL,
  need_slug text NOT NULL,
  source text NOT NULL,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  window_start date,
  window_end date,
  evidence_note text,
  example_queries text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT demand_signals_source_check CHECK (source = ANY (ARRAY['search_console','first_party_zero_result','first_party_action'])),
  CONSTRAINT demand_signals_unique UNIQUE (need_slug, source, window_start, window_end)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.demand_signals TO authenticated;
GRANT ALL ON public.demand_signals TO service_role;

ALTER TABLE public.demand_signals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage demand signals" ON public.demand_signals;
CREATE POLICY "Admins manage demand signals" ON public.demand_signals
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. CONTROLLED TRAFFIC SOURCE VALUES
UPDATE public.engagement_events SET traffic_source = 'internal_test' WHERE traffic_source = 'internal';
ALTER TABLE public.engagement_events DROP CONSTRAINT IF EXISTS engagement_events_traffic_source_chk;
ALTER TABLE public.engagement_events
  ADD CONSTRAINT engagement_events_traffic_source_chk
  CHECK (traffic_source IS NULL OR traffic_source = ANY (ARRAY['organic_search','direct','social','ai_assistant','referral','internal_test','bot','unknown']));

INSERT INTO public.engagement_event_types (event_type, is_active)
VALUES ('correction_started', true)
ON CONFLICT (event_type) DO UPDATE SET is_active = true;

-- 5. DATA HEALTH VIEW — eligibility mix + record_status mix, admin gated
DROP VIEW IF EXISTS public.v_data_health_summary;
CREATE VIEW public.v_data_health_summary AS
 SELECT count(*) AS total_records,
    count(*) FILTER (WHERE eligibility_state = 'registry_only') AS registry_only,
    count(*) FILTER (WHERE eligibility_state = 'verified_basic') AS verified_basic,
    count(*) FILTER (WHERE eligibility_state = 'claimed_enriched') AS claimed_enriched,
    count(*) FILTER (WHERE eligibility_state = 'editorial_featured') AS editorial_featured,
    count(*) FILTER (WHERE record_status = 'active') AS status_active,
    count(*) FILTER (WHERE record_status = 'quarantined') AS status_quarantined,
    count(*) FILTER (WHERE record_status = 'suppressed') AS status_suppressed,
    count(*) FILTER (WHERE record_status = 'reported_closed') AS status_reported_closed,
    count(*) FILTER (WHERE record_status = 'merged') AS status_merged,
    count(*) FILTER (WHERE phone IS NULL OR btrim(phone) = '') AS missing_phone,
    count(*) FILTER (WHERE website IS NULL OR btrim(website) = '') AS missing_website,
    count(*) FILTER (WHERE address IS NULL OR btrim(address) = '') AS missing_address,
    count(*) FILTER (WHERE COALESCE(description, long_description) IS NULL) AS missing_description,
    count(*) FILTER (WHERE hours IS NULL) AS missing_hours,
    count(*) FILTER (WHERE hero_image_url IS NULL) AS missing_image,
    count(*) FILTER (WHERE town_slug = 'schenectady') AS schenectady_concentration,
    count(*) FILTER (WHERE (EXISTS (SELECT 1 FROM public.business_sources s WHERE s.business_id = b.id))) AS with_provenance,
    count(*) FILTER (WHERE (SELECT count(DISTINCT s2.source_type) FROM public.business_sources s2 WHERE s2.business_id = b.id) >= 2) AS two_source_coverage
   FROM public.businesses b
  WHERE public.has_role(auth.uid(), 'admin');

GRANT SELECT ON public.v_data_health_summary TO authenticated;