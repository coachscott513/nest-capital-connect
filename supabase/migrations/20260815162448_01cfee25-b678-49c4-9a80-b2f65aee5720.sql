CREATE OR REPLACE FUNCTION public.ask_nest_next_business_day(_from timestamptz DEFAULT now())
RETURNS timestamptz
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT CASE extract(isodow FROM _from)::int
    WHEN 5 THEN _from + interval '3 days'
    WHEN 6 THEN _from + interval '2 days'
    WHEN 7 THEN _from + interval '2 days'
    ELSE _from + interval '1 day'
  END
$$;

ALTER TABLE public.ask_nest_requests
  ALTER COLUMN due_at SET DEFAULT public.ask_nest_next_business_day(now());

UPDATE public.ask_nest_requests
SET due_at = public.ask_nest_next_business_day(created_at)
WHERE due_at <= created_at + interval '1 minute';

DELETE FROM public.ask_nest_requests
WHERE message IN ('rate limit probe', 'Acceptance test: hours look wrong.', 'Acceptance test: is the phone current?', 'Acceptance test: still open?');

DELETE FROM public.engagement_events
WHERE event_type = 'ask_nest_submit'
  AND created_at > now() - interval '2 hours';

DELETE FROM public.ask_nest_rate_limits WHERE window_start > now() - interval '2 hours';