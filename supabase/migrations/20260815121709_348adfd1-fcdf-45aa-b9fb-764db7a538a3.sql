-- 1. Approved event registry -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.engagement_event_types (
  event_type text PRIMARY KEY,
  is_active boolean NOT NULL DEFAULT true,
  category text,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.engagement_event_types TO authenticated;
GRANT ALL ON public.engagement_event_types TO service_role;
ALTER TABLE public.engagement_event_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read event registry"
  ON public.engagement_event_types FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

INSERT INTO public.engagement_event_types (event_type, is_active, category, description) VALUES
  ('town_page_view',          true,  'view',       'Town intelligence page viewed'),
  ('continue_search_click',   true,  'navigation', 'Continue-search CTA clicked'),
  ('chat_open',               true,  'engagement', 'Live agent / chat opened'),
  ('contact_form_submit',     true,  'conversion', 'Contact form submitted (no form content stored)'),
  ('intelligence_report_view',true,  'view',       'Market / intelligence report viewed'),
  ('search_submit',           true,  'search',     'Search submitted (no raw query stored)'),
  ('search_zero_result',      true,  'search',     'Search returned zero results'),
  ('business_profile_view',   true,  'view',       'Resolved business profile rendered'),
  ('business_profile_open',   true,  'engagement', 'Business profile opened from a list/card'),
  ('business_contact_open',   true,  'engagement', 'Business contact panel opened'),
  ('call_click',              true,  'contact',    'Phone action tapped'),
  ('text_click',              true,  'contact',    'SMS action tapped'),
  ('email_click',             true,  'contact',    'Email action tapped'),
  ('website_click',           true,  'outbound',   'Business website tapped'),
  ('directions_click',        true,  'outbound',   'Directions tapped'),
  ('claim_profile_click',     true,  'conversion', 'Claim CTA clicked (NOT a completed claim)'),
  ('claim_started',           true,  'conversion', 'Claim form opened / started'),
  ('claim_submitted',         true,  'conversion', 'Claim form successfully submitted'),
  ('claim_verified',          false, 'conversion', 'RESERVED for the future verified-claim workflow'),
  ('pricing_click',           true,  'conversion', 'Pricing CTA clicked'),
  ('media_story_click',       true,  'media',      'Media story opened'),
  ('video_coverage_click',    true,  'media',      'Video coverage opened'),
  ('newsletter_signup',       true,  'conversion', 'Newsletter signup completed'),
  ('financial_intro_submit',  true,  'conversion', 'Financial intro request submitted')
ON CONFLICT (event_type) DO NOTHING;

-- 2. Structural hardening of engagement_events --------------------------------
ALTER TABLE public.engagement_events
  ADD COLUMN IF NOT EXISTS event_id uuid NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS event_schema_version smallint NOT NULL DEFAULT 2,
  ADD COLUMN IF NOT EXISTS town_slug text,
  ADD COLUMN IF NOT EXISTS service_slug text,
  ADD COLUMN IF NOT EXISTS route_path text,
  ADD COLUMN IF NOT EXISTS result_count integer,
  ADD COLUMN IF NOT EXISTS traffic_class text NOT NULL DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS referrer_host text,
  ADD COLUMN IF NOT EXISTS traffic_source text,
  ADD COLUMN IF NOT EXISTS device_class text,
  ADD COLUMN IF NOT EXISTS browser_family text,
  ADD COLUMN IF NOT EXISTS internal_test boolean NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS engagement_events_event_id_key
  ON public.engagement_events (event_id);

ALTER TABLE public.engagement_events
  DROP CONSTRAINT IF EXISTS engagement_events_event_type_fkey;
ALTER TABLE public.engagement_events
  ADD CONSTRAINT engagement_events_event_type_fkey
  FOREIGN KEY (event_type) REFERENCES public.engagement_event_types (event_type)
  ON UPDATE CASCADE;

ALTER TABLE public.engagement_events
  DROP CONSTRAINT IF EXISTS engagement_events_business_id_fkey;
ALTER TABLE public.engagement_events
  ADD CONSTRAINT engagement_events_business_id_fkey
  FOREIGN KEY (business_id) REFERENCES public.businesses (id) ON DELETE SET NULL;

ALTER TABLE public.engagement_events
  DROP CONSTRAINT IF EXISTS engagement_events_traffic_class_chk;
ALTER TABLE public.engagement_events
  ADD CONSTRAINT engagement_events_traffic_class_chk
  CHECK (traffic_class IN ('consumer','internal_test','bot','unknown'));

ALTER TABLE public.engagement_events
  DROP CONSTRAINT IF EXISTS engagement_events_device_class_chk;
ALTER TABLE public.engagement_events
  ADD CONSTRAINT engagement_events_device_class_chk
  CHECK (device_class IS NULL OR device_class IN ('mobile','tablet','desktop','unknown'));

COMMENT ON COLUMN public.engagement_events.user_agent IS
  'DEPRECATED (schema v1). Never written by the v2 ingestion path. Retained for rollback only; use device_class / browser_family.';
COMMENT ON COLUMN public.engagement_events.referrer IS
  'DEPRECATED (schema v1). Never written by the v2 ingestion path. Retained for rollback only; use referrer_host / traffic_source.';
COMMENT ON COLUMN public.engagement_events.business_slug IS
  'Display/reference context only. business_id is the canonical identity.';

-- Payload shape + size guard (trigger, not CHECK, so it stays restore-safe)
CREATE OR REPLACE FUNCTION public.validate_engagement_event()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF jsonb_typeof(NEW.metadata) <> 'object' THEN
    RAISE EXCEPTION 'engagement metadata must be a flat JSON object';
  END IF;
  IF length(NEW.metadata::text) > 2000 THEN
    RAISE EXCEPTION 'engagement metadata exceeds 2000 byte limit';
  END IF;
  IF EXISTS (
    SELECT 1 FROM jsonb_each(NEW.metadata) kv
    WHERE jsonb_typeof(kv.value) IN ('object','array')
  ) THEN
    RAISE EXCEPTION 'engagement metadata must not contain nested objects or arrays';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_engagement_event ON public.engagement_events;
CREATE TRIGGER trg_validate_engagement_event
  BEFORE INSERT OR UPDATE ON public.engagement_events
  FOR EACH ROW EXECUTE FUNCTION public.validate_engagement_event();

CREATE INDEX IF NOT EXISTS engagement_events_created_at_idx ON public.engagement_events (created_at DESC);
CREATE INDEX IF NOT EXISTS engagement_events_type_created_idx ON public.engagement_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS engagement_events_business_idx ON public.engagement_events (business_id, created_at DESC);
CREATE INDEX IF NOT EXISTS engagement_events_reporting_idx
  ON public.engagement_events (traffic_class, internal_test, created_at DESC);

-- 3. Lock down write access ---------------------------------------------------
DROP POLICY IF EXISTS "Anyone logs events" ON public.engagement_events;
REVOKE ALL ON public.engagement_events FROM anon;
REVOKE ALL ON public.engagement_events FROM authenticated;
GRANT SELECT ON public.engagement_events TO authenticated;  -- admin-only via RLS
GRANT ALL ON public.engagement_events TO service_role;

-- 4. Rate-limit state (server only, never exposed) -----------------------------
CREATE TABLE IF NOT EXISTS public.engagement_rate_limits (
  fingerprint text NOT NULL,
  bucket text NOT NULL,
  window_start timestamptz NOT NULL,
  hits integer NOT NULL DEFAULT 0,
  expires_at timestamptz NOT NULL DEFAULT now() + interval '48 hours',
  PRIMARY KEY (fingerprint, bucket, window_start)
);
GRANT ALL ON public.engagement_rate_limits TO service_role;
ALTER TABLE public.engagement_rate_limits ENABLE ROW LEVEL SECURITY;
-- intentionally no policies: unreachable by anon/authenticated

-- 5. Admin-safe aggregate reporting (security_invoker: admin RLS still applies)
DROP VIEW IF EXISTS public.engagement_daily_rollup;
CREATE VIEW public.engagement_daily_rollup
WITH (security_invoker = true) AS
SELECT
  date_trunc('day', e.created_at)::date AS day,
  e.event_type,
  e.region_slug,
  e.town_slug,
  e.business_id,
  e.business_slug,
  e.device_class,
  count(*)::bigint AS actions,
  count(*) FILTER (WHERE e.event_type = 'search_zero_result')::bigint AS zero_result_actions
FROM public.engagement_events e
WHERE e.traffic_class = 'consumer'
  AND e.internal_test = false
GROUP BY 1,2,3,4,5,6,7;

GRANT SELECT ON public.engagement_daily_rollup TO authenticated;

DROP VIEW IF EXISTS public.engagement_traffic_class_rollup;
CREATE VIEW public.engagement_traffic_class_rollup
WITH (security_invoker = true) AS
SELECT
  date_trunc('day', e.created_at)::date AS day,
  e.traffic_class,
  e.internal_test,
  count(*)::bigint AS actions
FROM public.engagement_events e
GROUP BY 1,2,3;

GRANT SELECT ON public.engagement_traffic_class_rollup TO authenticated;