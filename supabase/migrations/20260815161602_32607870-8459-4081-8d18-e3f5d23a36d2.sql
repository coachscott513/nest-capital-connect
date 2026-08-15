-- ============================================================
-- 1. FREEZE COHORTS (pilot + matched control), immutable
-- ============================================================
ALTER TABLE public.answerability_pilot_cohort
  ADD COLUMN IF NOT EXISTS cohort_role text NOT NULL DEFAULT 'pilot',
  ADD COLUMN IF NOT EXISTS canonical_url text,
  ADD COLUMN IF NOT EXISTS snapshot_window text,
  ADD COLUMN IF NOT EXISTS average_position numeric,
  ADD COLUMN IF NOT EXISTS town_slug text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS eligibility_state text,
  ADD COLUMN IF NOT EXISTS record_status text,
  ADD COLUMN IF NOT EXISTS readiness_state text,
  ADD COLUMN IF NOT EXISTS frozen boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS frozen_at timestamptz;

ALTER TABLE public.answerability_pilot_cohort
  DROP CONSTRAINT IF EXISTS answerability_pilot_cohort_role_check;
ALTER TABLE public.answerability_pilot_cohort
  ADD CONSTRAINT answerability_pilot_cohort_role_check
  CHECK (cohort_role IN ('pilot','control'));

-- Backfill the snapshot facts for the existing 20 pilot rows.
UPDATE public.answerability_pilot_cohort c
SET canonical_url    = 'https://www.capitaldistrictnest.com/biz/' || COALESCE(c.business_slug, ''),
    snapshot_window  = COALESCE(spu.source_window, 'gsc_90d'),
    average_position = spu.average_position,
    town_slug        = b.town_slug,
    category         = b.category,
    eligibility_state= b.eligibility_state,
    record_status    = b.record_status,
    readiness_state  = r.readiness_state,
    protection_tier  = COALESCE(c.protection_tier, spu.protection_tier)
FROM public.businesses b
LEFT JOIN LATERAL (
  SELECT p.source_window, p.average_position, p.protection_tier
  FROM public.seo_protected_urls p
  WHERE p.business_id = b.id
  ORDER BY p.clicks_90d DESC NULLS LAST LIMIT 1
) spu ON true
LEFT JOIN public.v_business_answerability_readiness r ON r.business_id = b.id
WHERE b.id = c.business_id AND c.frozen = false;

-- Matched control cohort: 20 highest-impression /biz/* protected URLs
-- that are NOT in the pilot, paired by impression rank.
ALTER TABLE public.answerability_pilot_cohort
  DROP CONSTRAINT IF EXISTS answerability_pilot_cohort_selection_bucket_check;
ALTER TABLE public.answerability_pilot_cohort
  ADD CONSTRAINT answerability_pilot_cohort_selection_bucket_check
  CHECK (selection_bucket IN ('top_clicks','impressions_weak_ctr','strategic_category','fail_closed_example','control_matched'));

INSERT INTO public.answerability_pilot_cohort
  (business_id, url, business_slug, selection_bucket, selection_reason,
   clicks_90d, impressions_90d, ctr, protection_tier, cohort_role,
   canonical_url, snapshot_window, average_position, town_slug, category,
   eligibility_state, record_status, readiness_state)
SELECT b.id,
       p.url,
       b.slug,
       'control_matched',
       'Matched control: impression-rank pair #' || cand.rn ||
       ' against the pilot page of the same rank. Not modified during the experiment.',
       p.clicks_90d, p.impressions_90d, p.ctr, p.protection_tier, 'control',
       'https://www.capitaldistrictnest.com/biz/' || b.slug,
       COALESCE(p.source_window, 'gsc_90d'),
       p.average_position, b.town_slug, b.category,
       b.eligibility_state, b.record_status, r.readiness_state
FROM (
  SELECT p.id, row_number() OVER (ORDER BY p.impressions_90d DESC NULLS LAST, p.clicks_90d DESC NULLS LAST) AS rn
  FROM public.seo_protected_urls p
  WHERE p.route_family = '/biz/*'
    AND p.business_id IS NOT NULL
    AND p.business_id NOT IN (SELECT business_id FROM public.answerability_pilot_cohort WHERE business_id IS NOT NULL)
) cand
JOIN public.seo_protected_urls p ON p.id = cand.id
JOIN public.businesses b ON b.id = p.business_id
LEFT JOIN public.v_business_answerability_readiness r ON r.business_id = b.id
WHERE cand.rn <= 20
  AND NOT EXISTS (SELECT 1 FROM public.answerability_pilot_cohort x WHERE x.cohort_role = 'control');

UPDATE public.answerability_pilot_cohort
SET frozen = true, frozen_at = COALESCE(frozen_at, now())
WHERE frozen = false;

CREATE OR REPLACE FUNCTION public.protect_frozen_cohort()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.frozen THEN
      RAISE EXCEPTION 'answerability_pilot_cohort row % is frozen and cannot be deleted', OLD.id;
    END IF;
    RETURN OLD;
  END IF;
  IF OLD.frozen THEN
    RAISE EXCEPTION 'answerability_pilot_cohort row % is frozen and cannot be modified', OLD.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_frozen_cohort ON public.answerability_pilot_cohort;
CREATE TRIGGER trg_protect_frozen_cohort
BEFORE UPDATE OR DELETE ON public.answerability_pilot_cohort
FOR EACH ROW EXECUTE FUNCTION public.protect_frozen_cohort();

-- ============================================================
-- 2. FIELD-LEVEL EVIDENCE + READINESS
-- ============================================================
CREATE OR REPLACE VIEW public.v_business_field_evidence AS
SELECT s.business_id,
       bool_or(s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS has_authoritative_source,
       bool_or('phone'    = ANY (s.field_scope) AND s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS phone_evidenced,
       bool_or('website'  = ANY (s.field_scope) AND s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS website_evidenced,
       bool_or('address'  = ANY (s.field_scope) AND s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS address_evidenced,
       bool_or('category' = ANY (s.field_scope) AND s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS category_evidenced,
       bool_or('services' = ANY (s.field_scope) AND s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS services_evidenced,
       bool_or(s.evidence_state = 'owner_asserted') AS owner_asserted,
       bool_or(s.evidence_state = 'editorial')      AS editorial_evidence,
       count(*)                                     AS source_count,
       count(*) FILTER (WHERE s.evidence_state = ANY (ARRAY['official_source','owner_asserted','staff_verified','public_record','editorial'])) AS authoritative_source_count,
       max(s.asserted_at)                           AS last_asserted_at
FROM public.business_sources s
GROUP BY s.business_id;

DROP VIEW IF EXISTS public.v_business_answerability_readiness;
CREATE VIEW public.v_business_answerability_readiness AS
SELECT b.id AS business_id,
       b.slug, b.name, b.town_slug, b.town_name,
       b.eligibility_state, b.record_status, b.verification_status, b.seo_cohort,
       b.last_verified_at,
       (b.town_slug IS NOT NULL AND b.town_name IS NOT NULL) AS has_location_evidence,
       (b.phone IS NOT NULL AND b.phone <> '')     AS has_phone,
       (b.website IS NOT NULL AND b.website <> '') AS has_website,
       ((b.instagram IS NOT NULL AND b.instagram <> '') OR (b.facebook IS NOT NULL AND b.facebook <> '')) AS has_social,
       (b.hours IS NOT NULL)                        AS has_hours_field,
       (b.category IS NOT NULL AND b.category <> '') AS has_category_field,
       (b.services IS NOT NULL AND jsonb_typeof(b.services) = 'array' AND jsonb_array_length(b.services) > 0) AS has_services_field,
       COALESCE(fe.source_count, 0)                 AS source_count,
       COALESCE(fe.authoritative_source_count, 0)   AS authoritative_source_count,
       COALESCE(fe.phone_evidenced, false)          AS phone_evidenced,
       COALESCE(fe.website_evidenced, false)        AS website_evidenced,
       COALESCE(fe.services_evidenced, false)       AS services_evidenced,
       COALESCE(fe.owner_asserted, false)           AS owner_asserted,
       (spu.id IS NOT NULL)                         AS is_seo_protected,
       spu.protection_tier,
       CASE
         WHEN b.record_status <> 'active' OR COALESCE(b.quarantine_status,'none') <> 'none' THEN 'blocked_by_conflict'
         WHEN b.eligibility_state = 'editorial_featured' THEN 'editorially_enriched'
         WHEN b.eligibility_state = 'claimed_enriched' OR COALESCE(fe.owner_asserted,false) THEN 'owner_confirmed'
         WHEN (b.services IS NOT NULL AND jsonb_typeof(b.services) = 'array' AND jsonb_array_length(b.services) > 0)
              AND COALESCE(fe.services_evidenced,false)
              AND ((b.phone IS NOT NULL AND b.phone <> '' AND COALESCE(fe.phone_evidenced,false))
                OR (b.website IS NOT NULL AND b.website <> '' AND COALESCE(fe.website_evidenced,false)))
           THEN 'service_ready'
         WHEN (b.phone IS NOT NULL AND b.phone <> '' AND COALESCE(fe.phone_evidenced,false))
           OR (b.website IS NOT NULL AND b.website <> '' AND COALESCE(fe.website_evidenced,false))
           THEN 'contact_ready'
         ELSE 'identity_only'
       END AS readiness_state
FROM public.businesses b
LEFT JOIN public.v_business_field_evidence fe ON fe.business_id = b.id
LEFT JOIN LATERAL (
  SELECT p.id, p.protection_tier
  FROM public.seo_protected_urls p
  WHERE p.business_id = b.id
  ORDER BY p.clicks_90d DESC NULLS LAST LIMIT 1
) spu ON true;

GRANT SELECT ON public.v_business_field_evidence TO authenticated, service_role;
GRANT SELECT ON public.v_business_answerability_readiness TO authenticated, service_role;

-- ============================================================
-- 3. ASK NEST — data minimization + workflow + retention
-- ============================================================
ALTER TABLE public.ask_nest_requests
  ADD COLUMN IF NOT EXISTS read_at timestamptz,
  ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS resolved_at timestamptz,
  ADD COLUMN IF NOT EXISTS closed_at timestamptz,
  ADD COLUMN IF NOT EXISTS due_at timestamptz NOT NULL DEFAULT (now() + interval '1 day'),
  ADD COLUMN IF NOT EXISTS outcome text,
  ADD COLUMN IF NOT EXISTS pii_purged_at timestamptz;

ALTER TABLE public.ask_nest_requests
  DROP CONSTRAINT IF EXISTS ask_nest_requests_status_check;
ALTER TABLE public.ask_nest_requests
  ADD CONSTRAINT ask_nest_requests_status_check
  CHECK (status IN ('new','in_review','awaiting_business','resolved','closed','spam'));

ALTER TABLE public.ask_nest_requests
  DROP CONSTRAINT IF EXISTS ask_nest_requests_outcome_check;
ALTER TABLE public.ask_nest_requests
  ADD CONSTRAINT ask_nest_requests_outcome_check
  CHECK (outcome IS NULL OR outcome IN ('confirmed','could_not_confirm','corrected','referred_to_business','no_response_needed','spam'));

-- Minimization: name + at least one contact method; corrections may be anonymous.
ALTER TABLE public.ask_nest_requests ALTER COLUMN contact_email DROP NOT NULL;
ALTER TABLE public.ask_nest_requests ALTER COLUMN contact_phone DROP NOT NULL;
ALTER TABLE public.ask_nest_requests ALTER COLUMN contact_name  DROP NOT NULL;

ALTER TABLE public.ask_nest_requests
  DROP CONSTRAINT IF EXISTS ask_nest_requests_contact_minimization;
ALTER TABLE public.ask_nest_requests
  ADD CONSTRAINT ask_nest_requests_contact_minimization CHECK (
    request_type = 'report_incorrect'
    OR (
      contact_name IS NOT NULL AND length(btrim(contact_name)) > 0
      AND (
        (contact_email IS NOT NULL AND length(btrim(contact_email)) > 0)
        OR (contact_phone IS NOT NULL AND length(btrim(contact_phone)) > 0)
      )
    )
    OR pii_purged_at IS NOT NULL
  );

CREATE OR REPLACE VIEW public.v_ask_nest_queue AS
SELECT r.id, r.request_type, r.business_slug, r.town_slug, r.status, r.outcome,
       r.assigned_to, r.created_at, r.read_at, r.reviewed_at, r.resolved_at,
       r.closed_at, r.due_at, r.technical_source_family, r.self_reported_discovery,
       (r.read_at IS NULL) AS unread,
       (r.status NOT IN ('resolved','closed','spam') AND now() > r.due_at) AS overdue
FROM public.ask_nest_requests r;

GRANT SELECT ON public.v_ask_nest_queue TO authenticated, service_role;

-- Documented retention/deletion path: contact details and message text are
-- erased 180 days after a request is closed/resolved; analytics rows are
-- unaffected because they never contained PII.
CREATE OR REPLACE FUNCTION public.purge_ask_nest_pii(retention_days integer DEFAULT 180)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE affected integer;
BEGIN
  UPDATE public.ask_nest_requests
  SET contact_name = NULL, contact_email = NULL, contact_phone = NULL,
      message = NULL, pii_purged_at = now()
  WHERE pii_purged_at IS NULL
    AND status IN ('resolved','closed','spam')
    AND COALESCE(closed_at, resolved_at, updated_at) < now() - make_interval(days => retention_days);
  GET DIAGNOSTICS affected = ROW_COUNT;
  RETURN affected;
END;
$$;

REVOKE ALL ON FUNCTION public.purge_ask_nest_pii(integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.purge_ask_nest_pii(integer) TO service_role;

-- Abuse protection for the concierge intake (separate from engagement limits).
CREATE TABLE IF NOT EXISTS public.ask_nest_rate_limits (
  fingerprint text NOT NULL,
  window_start timestamptz NOT NULL DEFAULT date_trunc('hour', now()),
  hits integer NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL DEFAULT now() + interval '2 hours',
  PRIMARY KEY (fingerprint, window_start)
);
GRANT ALL ON public.ask_nest_rate_limits TO service_role;
ALTER TABLE public.ask_nest_rate_limits ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. EXPERIMENT MEASUREMENT
-- ============================================================
CREATE TABLE IF NOT EXISTS public.answer_pilot_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cohort_role text NOT NULL CHECK (cohort_role IN ('pilot','control')),
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
  business_slug text,
  phase text NOT NULL CHECK (phase IN ('baseline','post_launch')),
  window_start date NOT NULL,
  window_end date NOT NULL,
  metric text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (cohort_role, business_id, phase, window_start, window_end, metric)
);

GRANT SELECT ON public.answer_pilot_metrics TO authenticated;
GRANT ALL ON public.answer_pilot_metrics TO service_role;
ALTER TABLE public.answer_pilot_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read pilot metrics" ON public.answer_pilot_metrics;
CREATE POLICY "Admins read pilot metrics" ON public.answer_pilot_metrics
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS trg_answer_pilot_metrics_updated ON public.answer_pilot_metrics;
CREATE TRIGGER trg_answer_pilot_metrics_updated
BEFORE UPDATE ON public.answer_pilot_metrics
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();