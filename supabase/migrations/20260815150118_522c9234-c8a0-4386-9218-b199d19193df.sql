-- ============ 1. Additive business fields (no overwrites) ============
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS seo_cohort text NOT NULL DEFAULT 'registry_candidate',
  ADD COLUMN IF NOT EXISTS eligibility_reason text,
  ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'unverified',
  ADD COLUMN IF NOT EXISTS verified_at timestamptz,
  ADD COLUMN IF NOT EXISTS verification_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS quarantine_status text NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS quarantine_reason text,
  ADD COLUMN IF NOT EXISTS merge_candidate_status text NOT NULL DEFAULT 'none';

CREATE INDEX IF NOT EXISTS idx_businesses_seo_cohort ON public.businesses (seo_cohort);
CREATE INDEX IF NOT EXISTS idx_businesses_eligibility_state ON public.businesses (eligibility_state);

-- ============ 2. Deterministic SEO cohort backfill (operational, not eligibility) ======
UPDATE public.businesses b
SET seo_cohort = 'seo_protected'
FROM public.seo_protected_urls p
WHERE p.business_id = b.id
  AND p.protection_tier IN ('founder_locked','protected')
  AND b.seo_cohort = 'registry_candidate';

UPDATE public.businesses b
SET seo_cohort = 'seo_opportunity'
FROM public.seo_protected_urls p
WHERE p.business_id = b.id
  AND p.protection_tier = 'opportunity'
  AND b.seo_cohort = 'registry_candidate';

UPDATE public.businesses b
SET seo_cohort = 'quarantine_candidate'
WHERE b.seo_cohort = 'registry_candidate'
  AND EXISTS (
    SELECT 1 FROM public.business_quarantine_flags f
    WHERE f.business_id = b.id AND f.status IN ('proposed','confirmed')
  );

UPDATE public.businesses
SET eligibility_reason = COALESCE(eligibility_reason,
  CASE WHEN eligibility_state = 'registry_only'
       THEN 'imported_registry_record__no_owner_verification'
       ELSE 'assigned_by_wave1_baseline' END);

-- ============ 3. Cohort summary view (admin only) ============
CREATE OR REPLACE VIEW public.v_cohort_counts
WITH (security_invoker = true) AS
SELECT
  count(*) AS total_records,
  count(*) FILTER (WHERE seo_cohort = 'seo_protected')        AS seo_protected,
  count(*) FILTER (WHERE seo_cohort = 'seo_opportunity')      AS seo_opportunity,
  count(*) FILTER (WHERE seo_cohort = 'registry_candidate')   AS registry_candidate,
  count(*) FILTER (WHERE seo_cohort = 'quarantine_candidate') AS quarantine_candidate,
  count(*) FILTER (WHERE eligibility_state = 'registry_only')      AS registry_only,
  count(*) FILTER (WHERE eligibility_state = 'verified_basic')     AS verified_basic,
  count(*) FILTER (WHERE eligibility_state = 'claimed_enriched')   AS claimed_enriched,
  count(*) FILTER (WHERE eligibility_state = 'editorial_featured') AS editorial_featured,
  count(*) FILTER (WHERE verification_status <> 'unverified')      AS verified_records,
  count(*) FILTER (WHERE quarantine_status <> 'none')              AS quarantined_records,
  count(*) FILTER (WHERE merge_candidate_status <> 'none')         AS merge_flagged_records
FROM public.businesses
WHERE public.has_role(auth.uid(), 'admin');

-- ============ 4. Taxonomy mapping preview (admin only, nothing published) ======
CREATE OR REPLACE VIEW public.v_preview_taxonomy_mapping
WITH (security_invoker = true) AS
WITH raw AS (
  SELECT COALESCE(NULLIF(btrim(b.category), ''), 'uncategorized') AS source_category,
         count(*) AS record_count
  FROM public.businesses b
  GROUP BY 1
)
SELECT
  r.source_category,
  r.record_count,
  CASE
    WHEN r.source_category ~* 'roof|plumb|hvac|electric|landscap|lawn|contract|remodel|clean|pest|window|floor|paint|garage|septic|excavat|masonry|fence|handyman|home' THEN 'Home & Property'
    WHEN r.source_category ~* 'restaurant|cafe|coffee|bar\M|brew|pizza|bakery|deli|food|dining|catering|winery|distiller' THEN 'Food & Drink'
    WHEN r.source_category ~* 'dent|medical|health|clinic|chiro|therap|salon|spa|barber|gym|fitness|yoga|wellness|optom|derma|veterin' THEN 'Health & Wellness'
    WHEN r.source_category ~* 'law|attorney|legal|account|cpa|tax|insur|mortgage|financ|real estate|market|consult|it services|engineer|architect' THEN 'Professional Services'
    WHEN r.source_category ~* 'auto|car|tire|mechanic|collision|towing|transport|truck|leasing|dealer' THEN 'Automotive & Transportation'
    WHEN r.source_category ~* 'school|child|daycare|tutor|education|university|college|camp' THEN 'Family & Education'
    WHEN r.source_category ~* 'shop|retail|store|boutique|gift|florist|grocer|jewel|apparel|book|pet' THEN 'Shopping & Local Life'
    WHEN r.source_category ~* 'nonprofit|church|charity|community|library|museum|government|municipal' THEN 'Community & Nonprofit'
    ELSE 'unmapped'
  END AS proposed_industry_group,
  m.canonical_group AS existing_mapped_group,
  m.canonical_category AS existing_mapped_category,
  COALESCE(m.approved, false) AS mapping_approved,
  CASE
    WHEN m.id IS NULL THEN 'needs_mapping'
    WHEN m.approved THEN 'approved'
    ELSE 'proposed'
  END AS review_state,
  'preview_only__no_label_published' AS planned_action
FROM raw r
LEFT JOIN public.category_mapping m
  ON lower(btrim(m.raw_category)) = lower(btrim(r.source_category))
WHERE public.has_role(auth.uid(), 'admin');

-- ============ 5. Aggregated demand summary (no raw events exposed) ======
CREATE OR REPLACE VIEW public.v_demand_summary
WITH (security_invoker = true) AS
SELECT
  e.traffic_source,
  e.event_type,
  count(*) AS events_28d,
  count(DISTINCT e.business_id) FILTER (WHERE e.business_id IS NOT NULL) AS businesses_touched
FROM public.engagement_events e
WHERE public.has_role(auth.uid(), 'admin')
  AND e.traffic_class = 'consumer'
  AND e.created_at > now() - interval '28 days'
GROUP BY 1, 2;

REVOKE ALL ON public.v_cohort_counts, public.v_preview_taxonomy_mapping, public.v_demand_summary FROM anon;
GRANT SELECT ON public.v_cohort_counts, public.v_preview_taxonomy_mapping, public.v_demand_summary TO authenticated, service_role;

-- ============ 6. New safe engagement events ============
INSERT INTO public.engagement_event_types (event_type, is_active, category, description) VALUES
  ('business_help_open',          true, 'engagement', 'Need-more-information panel opened on a business profile'),
  ('business_information_request',true, 'conversion', 'Visitor requested more information about a business (no message content stored)'),
  ('suggest_correction',          true, 'engagement', 'Visitor started a correction suggestion for a business record')
ON CONFLICT (event_type) DO NOTHING;