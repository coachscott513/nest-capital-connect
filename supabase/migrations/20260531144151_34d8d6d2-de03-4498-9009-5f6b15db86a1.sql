-- Update the notify_new_lead trigger function to include the source table name
-- in the payload, then attach it to all lead-style tables so every lead-style
-- submission anywhere on the site sends an email notification.

CREATE OR REPLACE FUNCTION public.notify_new_lead()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'net'
AS $function$
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
      body := jsonb_build_object(
        'source_table', TG_TABLE_NAME,
        'record', to_jsonb(NEW)
      )
    );
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'notify_new_lead http_post failed for %.%: %', TG_TABLE_SCHEMA, TG_TABLE_NAME, SQLERRM;
  END;
  RETURN NEW;
END;
$function$;

-- Recreate the existing public.leads trigger (idempotent).
DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.leads;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

-- Attach the same trigger to all other lead-style tables.
DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.intel_report_leads;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.intel_report_leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.analyzer_leads;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.analyzer_leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.rental_applications;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.rental_applications
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.deal_desk_requests;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.deal_desk_requests
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.market_report_leads;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.market_report_leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();

DROP TRIGGER IF EXISTS trg_notify_new_lead ON public.investment_leads;
CREATE TRIGGER trg_notify_new_lead
  AFTER INSERT ON public.investment_leads
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_lead();