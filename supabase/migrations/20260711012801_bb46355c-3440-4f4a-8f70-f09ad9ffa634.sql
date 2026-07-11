
-- 1. CREATE TABLE
CREATE TABLE public.regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  domain text,
  logo_url text,
  hero_image_url text,
  primary_color text NOT NULL DEFAULT '#0d6e66',
  secondary_color text NOT NULL DEFAULT '#c9a449',
  font_family text NOT NULL DEFAULT 'Inter',
  tagline text,
  default_hero_title text,
  default_hero_subtitle text,
  default_cta_label text,
  default_cta_href text,
  realscout_id text,
  partner_pricing jsonb NOT NULL DEFAULT '{}'::jsonb,
  launch_status text NOT NULL DEFAULT 'draft',
  sort_order int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. GRANTS
GRANT SELECT ON public.regions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.regions TO authenticated;
GRANT ALL ON public.regions TO service_role;

-- 3. RLS
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES
CREATE POLICY "Regions are publicly viewable"
  ON public.regions FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert regions"
  ON public.regions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update regions"
  ON public.regions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete regions"
  ON public.regions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. VALIDATION TRIGGER (launch_status)
CREATE OR REPLACE FUNCTION public.validate_region_fields()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.launch_status NOT IN ('draft','pilot','live','paused','archived') THEN
    RAISE EXCEPTION 'invalid launch_status: %', NEW.launch_status;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER regions_validate_fields
  BEFORE INSERT OR UPDATE ON public.regions
  FOR EACH ROW EXECUTE FUNCTION public.validate_region_fields();

-- 6. UPDATED_AT TRIGGER
CREATE TRIGGER regions_set_updated_at
  BEFORE UPDATE ON public.regions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. SEED: Region #1
INSERT INTO public.regions (
  slug, name, domain, tagline,
  primary_color, secondary_color, font_family,
  default_hero_title, default_hero_subtitle,
  default_cta_label, default_cta_href,
  launch_status, sort_order
) VALUES (
  'capital-district',
  'Capital District Nest',
  'www.capitaldistrictnest.com',
  'The digital front door of the Capital District.',
  '#0d6e66',
  '#c9a449',
  'Inter',
  'Capital District Nest',
  'The weekly pulse of real estate, local businesses, and life in the Capital District.',
  'What''s Happening This Week',
  '/#weekly-feed',
  'live',
  1
);
