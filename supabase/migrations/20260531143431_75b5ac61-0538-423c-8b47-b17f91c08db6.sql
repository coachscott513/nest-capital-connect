
CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, net
AS $$
DECLARE
  fn_url   text := 'https://hstoxhgsvzlnwmagxfho.supabase.co/functions/v1/notify-new-lead';
  anon_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzdG94aGdzdnpsbndtYWd4ZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNDcwMDIsImV4cCI6MjA4MDcyMzAwMn0.f7M0jSPjRBc0i4rUBDgCmdwg85ZT1DtuiYO0d6wAsVc';
BEGIN
  BEGIN
    PERFORM net.http_post(
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

REVOKE EXECUTE ON FUNCTION public.notify_new_lead() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.notify_new_lead() TO service_role, postgres;
