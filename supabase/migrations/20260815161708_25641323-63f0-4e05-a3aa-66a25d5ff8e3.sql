ALTER TABLE public.engagement_events
  ADD COLUMN IF NOT EXISTS session_id uuid;

CREATE INDEX IF NOT EXISTS engagement_events_session_created_idx
  ON public.engagement_events (session_id, created_at);

ALTER TABLE public.ask_nest_requests
  ADD COLUMN IF NOT EXISTS session_id uuid,
  ADD COLUMN IF NOT EXISTS first_touch_source text,
  ADD COLUMN IF NOT EXISTS first_touch_evidence text;

ALTER TABLE public.ask_nest_requests
  DROP CONSTRAINT IF EXISTS ask_nest_requests_first_touch_evidence_check;
ALTER TABLE public.ask_nest_requests
  ADD CONSTRAINT ask_nest_requests_first_touch_evidence_check
  CHECK (first_touch_evidence IS NULL OR first_touch_evidence IN ('server_session_lookup','server_referer_only','unavailable'));