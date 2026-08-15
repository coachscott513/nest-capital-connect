-- ---------- 1. Backfill import lineage (no invented identifiers) ----------
INSERT INTO public.business_sources
  (business_id, source_type, source_name, source_url, import_batch_id, external_id,
   captured_at, field_scope, confidence, state)
SELECT
  b.id,
  CASE
    WHEN b.source IN ('google_places','apify-google-places') THEN 'google_places'
    WHEN b.source = 'csv_import' THEN 'manual_import'
    WHEN b.source = 'manual' THEN 'founder_assert'
    ELSE 'unknown'
  END,
  b.source,
  b.source_url,
  b.import_batch_id,
  b.external_id,
  COALESCE(b.last_synced_at, b.created_at),
  ARRAY['name','address','phone','website','category']::text[],
  CASE
    WHEN b.source = 'manual' THEN 0.8
    WHEN b.source = 'csv_import' THEN 0.6
    ELSE 0.4
  END,
  'active'
FROM public.businesses b
WHERE NOT EXISTS (
  SELECT 1 FROM public.business_sources s WHERE s.business_id = b.id
);

-- Owner-claimed lineage layered on top where a real claim exists.
INSERT INTO public.business_sources
  (business_id, source_type, source_name, asserted_at, asserted_by,
   field_scope, confidence, state)
SELECT b.id, 'owner_claimed', 'owner claim', COALESCE(b.claimed_at, now()),
       b.claimed_by_user_id, ARRAY['*']::text[], 0.95, 'active'
FROM public.businesses b
WHERE b.is_claimed = true
  AND b.claimed_by_user_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM public.business_sources s
    WHERE s.business_id = b.id AND s.source_type = 'owner_claimed'
  );

-- ---------- 2. Seed controlled category mapping (original text preserved) ----------
INSERT INTO public.category_mapping (raw_category, canonical_group, canonical_category, canonical_service_slug, confidence, mapped_by, approved)
SELECT DISTINCT ON (lower(btrim(b.category)))
  btrim(b.category),
  'unmapped',
  btrim(b.category),
  NULL,
  0.0,
  'system_seed',
  false
FROM public.businesses b
WHERE b.category IS NOT NULL AND btrim(b.category) <> ''
ON CONFLICT (raw_category) DO NOTHING;

-- ---------- 3. Admin-only analytics views ----------
-- Each view self-guards with has_role so non-admins receive zero rows.

CREATE OR REPLACE VIEW public.v_business_cohorts
WITH (security_invoker = true) AS
SELECT
  b.id,
  b.slug,
  b.name,
  b.town_slug,
  b.category,
  b.eligibility_state,
  p.protection_tier,
  p.clicks_90d,
  p.impressions_90d,
  q.reason AS quarantine_reason,
  CASE
    WHEN q.business_id IS NOT NULL THEN 'REGISTRY_OR_QUARANTINE'
    WHEN p.protection_tier IN ('protected','founder_locked') THEN 'SEO_PROTECTED'
    WHEN p.protection_tier = 'opportunity' THEN 'OPPORTUNITY'
    ELSE 'REGISTRY_OR_QUARANTINE'
  END AS cohort,
  (b.phone IS NOT NULL AND btrim(b.phone) <> '')::int
    + (b.website IS NOT NULL AND btrim(b.website) <> '')::int
    + (b.address IS NOT NULL AND btrim(b.address) <> '')::int
    + (COALESCE(b.description, b.long_description) IS NOT NULL)::int
    + (b.hero_image_url IS NOT NULL)::int AS completeness_score
FROM public.businesses b
LEFT JOIN public.seo_protected_urls p ON p.business_id = b.id
LEFT JOIN LATERAL (
  SELECT f.business_id, f.reason
  FROM public.business_quarantine_flags f
  WHERE f.business_id = b.id AND f.status IN ('proposed','confirmed')
  LIMIT 1
) q ON true
WHERE public.has_role(auth.uid(), 'admin');

CREATE OR REPLACE VIEW public.v_data_health_summary
WITH (security_invoker = true) AS
SELECT
  count(*) AS total_records,
  count(*) FILTER (WHERE b.eligibility_state = 'registry_only') AS registry_only,
  count(*) FILTER (WHERE b.eligibility_state = 'verified_basic') AS verified_basic,
  count(*) FILTER (WHERE b.eligibility_state = 'claimed_enriched') AS claimed_enriched,
  count(*) FILTER (WHERE b.eligibility_state = 'editorial_featured') AS editorial_featured,
  count(*) FILTER (WHERE b.eligibility_state = 'quarantined') AS quarantined,
  count(*) FILTER (WHERE b.eligibility_state = 'suppressed') AS suppressed,
  count(*) FILTER (WHERE b.phone IS NULL OR btrim(b.phone) = '') AS missing_phone,
  count(*) FILTER (WHERE b.website IS NULL OR btrim(b.website) = '') AS missing_website,
  count(*) FILTER (WHERE b.address IS NULL OR btrim(b.address) = '') AS missing_address,
  count(*) FILTER (WHERE COALESCE(b.description, b.long_description) IS NULL) AS missing_description,
  count(*) FILTER (WHERE b.hours IS NULL) AS missing_hours,
  count(*) FILTER (WHERE b.hero_image_url IS NULL) AS missing_image,
  count(*) FILTER (WHERE b.town_slug = 'schenectady') AS schenectady_concentration,
  count(*) FILTER (WHERE EXISTS (SELECT 1 FROM public.business_sources s WHERE s.business_id = b.id)) AS with_provenance
FROM public.businesses b
WHERE public.has_role(auth.uid(), 'admin');

-- ---------- 4. Deterministic cleanup PREVIEWS (read-only, nothing committed) ----------

CREATE OR REPLACE VIEW public.v_preview_poi_candidates
WITH (security_invoker = true) AS
SELECT
  b.id, b.slug, b.name, b.town_slug, b.category, b.address,
  CASE
    WHEN b.name ~* '(^|[^a-z])usps([^a-z]|$)|united states postal' THEN 'usps_counter'
    WHEN b.name ~* 'ecoatm' THEN 'ecoatm_kiosk'
    WHEN b.name ~* 'cvs photo|walgreens photo|rite aid photo' THEN 'in_store_photo_counter'
    WHEN b.name ~* 'ups access point|the ups store drop|fedex onsite|fedex drop box|amazon hub|amazon locker' THEN 'carrier_access_point'
    WHEN b.name ~* 'moneygram|western union|coinstar|redbox' THEN 'hosted_counter'
    WHEN b.name ~* '(^|[^a-z])atm([^a-z]|$)|bitcoin atm|coinflip' THEN 'atm_or_kiosk'
    WHEN b.name ~* 'kiosk|vending|drop box|self-service' THEN 'kiosk_generic'
    ELSE 'other'
  END AS poi_signal,
  (p.id IS NOT NULL) AS seo_protected,
  COALESCE(p.protection_tier, 'none') AS protection_tier,
  COALESCE(p.clicks_90d, 0) AS clicks_90d,
  'flag_only__no_delete' AS planned_action
FROM public.businesses b
LEFT JOIN public.seo_protected_urls p ON p.business_id = b.id
WHERE public.has_role(auth.uid(), 'admin')
  AND b.name ~* '(^|[^a-z])usps([^a-z]|$)|united states postal|ecoatm|cvs photo|walgreens photo|rite aid photo|ups access point|fedex onsite|fedex drop box|amazon hub|amazon locker|moneygram|western union|coinstar|redbox|(^|[^a-z])atm([^a-z]|$)|bitcoin atm|coinflip|kiosk|vending|drop box|self-service';

CREATE OR REPLACE VIEW public.v_preview_town_mismatch
WITH (security_invoker = true) AS
SELECT
  b.id, b.slug, b.name, b.town_slug, b.town_name, b.city, b.address,
  regexp_replace(lower(btrim(b.city)), '[^a-z0-9]+', '-', 'g') AS city_slug,
  CASE
    WHEN b.city IS NOT NULL
     AND regexp_replace(lower(btrim(b.city)), '[^a-z0-9]+', '-', 'g') <> b.town_slug
     AND b.town_slug = 'schenectady' THEN 'suspicious_schenectady_default'
    ELSE 'town_city_conflict'
  END AS mismatch_type,
  (p.id IS NOT NULL) AS seo_protected,
  COALESCE(p.clicks_90d, 0) AS clicks_90d,
  'stage_correction__no_write' AS planned_action
FROM public.businesses b
LEFT JOIN public.seo_protected_urls p ON p.business_id = b.id
WHERE public.has_role(auth.uid(), 'admin')
  AND b.city IS NOT NULL AND btrim(b.city) <> ''
  AND b.town_slug IS NOT NULL
  AND regexp_replace(lower(btrim(b.city)), '[^a-z0-9]+', '-', 'g') <> b.town_slug;

CREATE OR REPLACE VIEW public.v_preview_duplicates
WITH (security_invoker = true) AS
WITH norm AS (
  SELECT
    b.id, b.slug, b.name, b.town_slug, b.address, b.phone, b.website,
    regexp_replace(lower(btrim(b.name)), '[^a-z0-9]+', '', 'g') AS name_key,
    regexp_replace(COALESCE(b.phone, ''), '[^0-9]', '', 'g') AS phone_key,
    regexp_replace(lower(COALESCE(b.address, '')), '[^a-z0-9]+', '', 'g') AS addr_key,
    lower(regexp_replace(COALESCE(b.website, ''), '^https?://(www\.)?([^/]+).*$', '\2')) AS domain_key
  FROM public.businesses b
),
groups AS (
  SELECT 'name_phone:' || name_key || ':' || phone_key AS group_key,
         'same_name_same_phone' AS match_reason, id, slug, name, town_slug, address
  FROM norm WHERE phone_key <> '' AND name_key <> ''
  UNION ALL
  SELECT 'address:' || addr_key, 'same_address', id, slug, name, town_slug, address
  FROM norm WHERE length(addr_key) > 8
  UNION ALL
  SELECT 'domain:' || domain_key, 'same_domain', id, slug, name, town_slug, address
  FROM norm WHERE domain_key <> ''
)
SELECT g.group_key, g.match_reason, g.id, g.slug, g.name, g.town_slug, g.address,
       count(*) OVER (PARTITION BY g.group_key) AS group_size,
       (p.id IS NOT NULL) AS seo_protected,
       'propose_merge_candidate__no_merge' AS planned_action
FROM groups g
LEFT JOIN public.seo_protected_urls p ON p.business_id = g.id
WHERE public.has_role(auth.uid(), 'admin')
  AND g.group_key IN (SELECT group_key FROM groups GROUP BY group_key HAVING count(*) > 1);

CREATE OR REPLACE VIEW public.v_preview_category_conflicts
WITH (security_invoker = true) AS
SELECT
  b.id, b.slug, b.name, b.category, b.subcategory, b.town_slug,
  CASE
    WHEN b.name ~* 'roofing|roofer' AND COALESCE(b.category,'') !~* 'roof|contract|home' THEN 'name_says_roofing'
    WHEN b.name ~* 'dental|dentist|orthodont' AND COALESCE(b.category,'') !~* 'dent|health|medical' THEN 'name_says_dental'
    WHEN b.name ~* '\m(law|attorney|esq|llp)\M' AND COALESCE(b.category,'') !~* 'law|legal|attorney' THEN 'name_says_legal'
    WHEN b.name ~* 'plumbing|plumber' AND COALESCE(b.category,'') !~* 'plumb|contract|home' THEN 'name_says_plumbing'
    WHEN b.name ~* 'landscap|lawn care' AND COALESCE(b.category,'') !~* 'landscap|lawn|home|contract' THEN 'name_says_landscaping'
    WHEN b.name ~* 'insurance' AND COALESCE(b.category,'') !~* 'insur|financ' THEN 'name_says_insurance'
    WHEN b.name ~* 'salon|barber|spa\M' AND COALESCE(b.category,'') !~* 'salon|barber|spa|beauty|wellness' THEN 'name_says_salon'
    ELSE NULL
  END AS conflict_signal,
  (p.id IS NOT NULL) AS seo_protected,
  'stage_category_correction__original_preserved' AS planned_action
FROM public.businesses b
LEFT JOIN public.seo_protected_urls p ON p.business_id = b.id
WHERE public.has_role(auth.uid(), 'admin')
  AND (
    (b.name ~* 'roofing|roofer' AND COALESCE(b.category,'') !~* 'roof|contract|home')
    OR (b.name ~* 'dental|dentist|orthodont' AND COALESCE(b.category,'') !~* 'dent|health|medical')
    OR (b.name ~* '\m(law|attorney|esq|llp)\M' AND COALESCE(b.category,'') !~* 'law|legal|attorney')
    OR (b.name ~* 'plumbing|plumber' AND COALESCE(b.category,'') !~* 'plumb|contract|home')
    OR (b.name ~* 'landscap|lawn care' AND COALESCE(b.category,'') !~* 'landscap|lawn|home|contract')
    OR (b.name ~* 'insurance' AND COALESCE(b.category,'') !~* 'insur|financ')
    OR (b.name ~* 'salon|barber|spa\M' AND COALESCE(b.category,'') !~* 'salon|barber|spa|beauty|wellness')
  );

REVOKE ALL ON public.v_business_cohorts, public.v_data_health_summary,
  public.v_preview_poi_candidates, public.v_preview_town_mismatch,
  public.v_preview_duplicates, public.v_preview_category_conflicts FROM anon;

GRANT SELECT ON public.v_business_cohorts, public.v_data_health_summary,
  public.v_preview_poi_candidates, public.v_preview_town_mismatch,
  public.v_preview_duplicates, public.v_preview_category_conflicts TO authenticated, service_role;