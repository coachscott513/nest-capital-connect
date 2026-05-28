CREATE OR REPLACE FUNCTION public.validate_business_status_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.business_status NOT IN ('active','temporarily_closed','permanently_closed','unknown') THEN
    RAISE EXCEPTION 'invalid business_status: %', NEW.business_status;
  END IF;

  IF NEW.source IS NOT NULL AND NEW.source NOT IN
     ('manual','csv_import','google_places','apify-google-places','business_owner','admin_review','firecrawl','api_sync') THEN
    RAISE EXCEPTION 'invalid source: %', NEW.source;
  END IF;

  IF NEW.data_status NOT IN ('ok','stale','needs_review','duplicate_suspected','archived') THEN
    RAISE EXCEPTION 'invalid data_status: %', NEW.data_status;
  END IF;

  IF NEW.website_status IS NOT NULL AND NEW.website_status NOT IN
     ('ok','redirect','broken','unknown') THEN
    RAISE EXCEPTION 'invalid website_status: %', NEW.website_status;
  END IF;

  RETURN NEW;
END;
$function$;