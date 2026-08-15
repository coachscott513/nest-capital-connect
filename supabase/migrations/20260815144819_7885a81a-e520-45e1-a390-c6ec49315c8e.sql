-- ============================================================
-- SPRINT 1: Intelligence Graph trust layer (additive only)
-- No business rows are deleted, merged, or re-slugged.
-- ============================================================

ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS eligibility_state text NOT NULL DEFAULT 'registry_only';

ALTER TABLE public.businesses
  DROP CONSTRAINT IF EXISTS businesses_eligibility_state_check;

ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_eligibility_state_check
  CHECK (eligibility_state IN (
    'registry_only','verified_basic','claimed_enriched',
    'editorial_featured','quarantined','suppressed'
  ));

CREATE INDEX IF NOT EXISTS businesses_eligibility_state_idx
  ON public.businesses (eligibility_state);

UPDATE public.businesses
   SET eligibility_state = 'claimed_enriched'
 WHERE is_claimed = true AND claimed_by_user_id IS NOT NULL;

UPDATE public.businesses
   SET eligibility_state = 'editorial_featured'
 WHERE is_editor_pick = true
   AND editorial_note IS NOT NULL
   AND length(btrim(editorial_note)) > 0
   AND eligibility_state = 'registry_only';

CREATE TABLE IF NOT EXISTS public.seo_protected_urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL UNIQUE,
  route_family text NOT NULL DEFAULT 'other',
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  business_slug text,
  clicks_28d integer NOT NULL DEFAULT 0,
  clicks_90d integer NOT NULL DEFAULT 0,
  impressions_28d integer NOT NULL DEFAULT 0,
  impressions_90d integer NOT NULL DEFAULT 0,
  ctr numeric,
  average_position numeric,
  protection_tier text NOT NULL DEFAULT 'opportunity',
  protection_reason text NOT NULL,
  protected_at timestamptz NOT NULL DEFAULT now(),
  source_window text NOT NULL,
  review_status text NOT NULL DEFAULT 'unreviewed',
  allow_slug_change boolean NOT NULL DEFAULT false,
  allow_noindex boolean NOT NULL DEFAULT false,
  allow_merge boolean NOT NULL DEFAULT false,
  reviewed_by uuid,
  reviewed_at timestamptz,
  notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT seo_protected_urls_tier_check
    CHECK (protection_tier IN ('protected','opportunity','founder_locked')),
  CONSTRAINT seo_protected_urls_review_check
    CHECK (review_status IN ('unreviewed','reviewed','released'))
);

CREATE INDEX IF NOT EXISTS seo_protected_urls_family_idx ON public.seo_protected_urls (route_family);
CREATE INDEX IF NOT EXISTS seo_protected_urls_tier_idx ON public.seo_protected_urls (protection_tier);
CREATE INDEX IF NOT EXISTS seo_protected_urls_slug_idx ON public.seo_protected_urls (business_slug);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_protected_urls TO authenticated;
GRANT ALL ON public.seo_protected_urls TO service_role;
ALTER TABLE public.seo_protected_urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage seo protection manifest"
  ON public.seo_protected_urls FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.business_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  source_type text NOT NULL,
  source_name text,
  source_url text,
  import_batch_id text,
  external_id text,
  captured_at timestamptz,
  asserted_at timestamptz NOT NULL DEFAULT now(),
  asserted_by uuid,
  field_scope text[] NOT NULL DEFAULT '{}',
  confidence numeric NOT NULL DEFAULT 0.5,
  raw_snapshot_ref text,
  raw_snapshot_hash text,
  state text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT business_sources_type_check CHECK (source_type IN (
    'google_places','manual_import','owner_claimed','editorial',
    'website_scrape','public_record','founder_assert','unknown'
  )),
  CONSTRAINT business_sources_state_check CHECK (state IN ('active','superseded','rejected')),
  CONSTRAINT business_sources_confidence_check CHECK (confidence >= 0 AND confidence <= 1)
);

CREATE INDEX IF NOT EXISTS business_sources_business_idx ON public.business_sources (business_id);
CREATE INDEX IF NOT EXISTS business_sources_type_idx ON public.business_sources (source_type);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_sources TO authenticated;
GRANT ALL ON public.business_sources TO service_role;
ALTER TABLE public.business_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage business sources"
  ON public.business_sources FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.business_corrections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  field_name text NOT NULL,
  value_before text,
  value_after text,
  evidence_type text NOT NULL DEFAULT 'unspecified',
  evidence_url text,
  evidence_note text,
  submitted_by uuid,
  submitter_role text NOT NULL DEFAULT 'anonymous',
  status text NOT NULL DEFAULT 'proposed',
  reviewer_id uuid,
  reviewer_decision text,
  decided_at timestamptz,
  effective_at timestamptz,
  batch_key text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT business_corrections_status_check CHECK (status IN (
    'proposed','staged','approved','applied','rejected','withdrawn'
  )),
  CONSTRAINT business_corrections_role_check CHECK (submitter_role IN (
    'anonymous','visitor','owner','editor','admin','system'
  ))
);

CREATE INDEX IF NOT EXISTS business_corrections_business_idx ON public.business_corrections (business_id);
CREATE INDEX IF NOT EXISTS business_corrections_status_idx ON public.business_corrections (status);
CREATE INDEX IF NOT EXISTS business_corrections_batch_idx ON public.business_corrections (batch_key);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_corrections TO authenticated;
GRANT ALL ON public.business_corrections TO service_role;
ALTER TABLE public.business_corrections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage corrections"
  ON public.business_corrections FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.business_correction_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  correction_id uuid NOT NULL REFERENCES public.business_corrections(id) ON DELETE CASCADE,
  action text NOT NULL,
  actor_id uuid,
  detail jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.business_correction_audit TO authenticated;
GRANT ALL ON public.business_correction_audit TO service_role;
ALTER TABLE public.business_correction_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read correction audit"
  ON public.business_correction_audit FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins write correction audit"
  ON public.business_correction_audit FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.business_quarantine_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  reason text NOT NULL,
  detail text,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence numeric NOT NULL DEFAULT 0.5,
  detected_by text NOT NULL DEFAULT 'system',
  status text NOT NULL DEFAULT 'proposed',
  reviewer_id uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT business_quarantine_reason_check CHECK (reason IN (
    'poi_not_independent_business','duplicate_candidate','town_mismatch',
    'category_conflict','malformed_identity','missing_minimum_identity',
    'reported_closed','source_unverifiable'
  )),
  CONSTRAINT business_quarantine_status_check CHECK (status IN (
    'proposed','confirmed','dismissed','resolved'
  )),
  CONSTRAINT business_quarantine_unique UNIQUE (business_id, reason)
);

CREATE INDEX IF NOT EXISTS business_quarantine_business_idx ON public.business_quarantine_flags (business_id);
CREATE INDEX IF NOT EXISTS business_quarantine_reason_idx ON public.business_quarantine_flags (reason);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_quarantine_flags TO authenticated;
GRANT ALL ON public.business_quarantine_flags TO service_role;
ALTER TABLE public.business_quarantine_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage quarantine flags"
  ON public.business_quarantine_flags FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.business_merge_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_key text NOT NULL,
  primary_business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
  duplicate_business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
  match_reason text NOT NULL,
  confidence numeric NOT NULL DEFAULT 0.5,
  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'proposed',
  reviewer_id uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT business_merge_reason_check CHECK (match_reason IN (
    'same_name_same_phone','same_address','same_domain','branch_group','fuzzy_name_town'
  )),
  CONSTRAINT business_merge_status_check CHECK (status IN ('proposed','confirmed','dismissed')),
  CONSTRAINT business_merge_pair_unique UNIQUE (primary_business_id, duplicate_business_id, match_reason)
);

CREATE INDEX IF NOT EXISTS business_merge_group_idx ON public.business_merge_candidates (group_key);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_merge_candidates TO authenticated;
GRANT ALL ON public.business_merge_candidates TO service_role;
ALTER TABLE public.business_merge_candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage merge candidates"
  ON public.business_merge_candidates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.category_mapping (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_category text NOT NULL UNIQUE,
  canonical_group text NOT NULL,
  canonical_category text NOT NULL,
  canonical_service_slug text,
  confidence numeric NOT NULL DEFAULT 0.7,
  mapped_by text NOT NULL DEFAULT 'system',
  approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.category_mapping TO authenticated;
GRANT SELECT ON public.category_mapping TO anon;
GRANT ALL ON public.category_mapping TO service_role;
ALTER TABLE public.category_mapping ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage category mapping"
  ON public.category_mapping FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can read approved category mapping"
  ON public.category_mapping FOR SELECT TO anon, authenticated
  USING (approved = true);