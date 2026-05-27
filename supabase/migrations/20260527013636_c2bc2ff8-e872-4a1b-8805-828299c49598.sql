ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS google_place_id   TEXT,
  ADD COLUMN IF NOT EXISTS source_url        TEXT,
  ADD COLUMN IF NOT EXISTS last_synced_at    TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_verified_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS data_status       TEXT NOT NULL DEFAULT 'ok',
  ADD COLUMN IF NOT EXISTS business_status   TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS website_status    TEXT,
  ADD COLUMN IF NOT EXISTS needs_review      BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS region            TEXT NOT NULL DEFAULT 'capital-district';

CREATE OR REPLACE FUNCTION public.validate_business_status_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.business_status NOT IN ('active','temporarily_closed','permanently_closed','unknown') THEN
    RAISE EXCEPTION 'invalid business_status: %', NEW.business_status;
  END IF;

  IF NEW.source IS NOT NULL AND NEW.source NOT IN
     ('manual','csv_import','google_places','business_owner','admin_review','firecrawl','api_sync') THEN
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
$$;

DROP TRIGGER IF EXISTS trg_validate_business_status_fields ON public.businesses;
CREATE TRIGGER trg_validate_business_status_fields
BEFORE INSERT OR UPDATE ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.validate_business_status_fields();

-- Canonical external id: enforced unique when present
CREATE UNIQUE INDEX IF NOT EXISTS businesses_google_place_id_key
  ON public.businesses (google_place_id)
  WHERE google_place_id IS NOT NULL;

-- Fallback dedupe lookup (non-unique until known duplicates are cleaned up)
CREATE INDEX IF NOT EXISTS businesses_name_town_phone_fallback_idx
  ON public.businesses (lower(name), town_slug, phone)
  WHERE google_place_id IS NULL AND phone IS NOT NULL;

-- Region scoping for future markets
CREATE INDEX IF NOT EXISTS businesses_region_idx          ON public.businesses (region);
CREATE INDEX IF NOT EXISTS businesses_region_town_idx     ON public.businesses (region, town_slug);
CREATE INDEX IF NOT EXISTS businesses_region_category_idx ON public.businesses (region, category);

-- Admin / sync workflow indexes
CREATE INDEX IF NOT EXISTS businesses_needs_review_idx    ON public.businesses (needs_review) WHERE needs_review = true;
CREATE INDEX IF NOT EXISTS businesses_business_status_idx ON public.businesses (business_status) WHERE business_status <> 'active';
CREATE INDEX IF NOT EXISTS businesses_last_synced_idx     ON public.businesses (last_synced_at);
CREATE INDEX IF NOT EXISTS businesses_last_verified_idx   ON public.businesses (last_verified_at);