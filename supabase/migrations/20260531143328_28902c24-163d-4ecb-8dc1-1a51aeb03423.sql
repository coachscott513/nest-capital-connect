
-- Enable pg_net so triggers can call edge functions over HTTP
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Trigger function: fires an async HTTP POST to the notify-new-lead edge function.
-- Designed to NEVER block or fail the lead insert.
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  fn_url   text := 'https://hstoxhgsvzlnwmagxfho.supabase.co/functions/v1/notify-new-lead';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdG94aGdzdnpsbndtYWd4ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDcwMDIsImV4cCI6MjA4MDcyMzAwMn0.f7M0jSPjRBc0i4rUBDgCmdwg85ZT1DtuiYO0d6wAsVc';
BEGIN
  BEGIN
    PERFORM extensions.http_post(
      url := fn_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || anon_key,
        'apikey', anon_key
      ),
      body := jsonb_build_object('record', to_jsonb(NEW))
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify_new_lead http_post failed: %', SQLERRM;
  END;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.leads;
CREATE TRIGGER trg_notify_new_lead
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.notify_new_lead();
