
-- BUSINESSES: extra social columns
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS tiktok text,
  ADD COLUMN IF NOT EXISTS linkedin text,
  ADD COLUMN IF NOT EXISTS x_url text;

-- BUSINESS SPECIALS
CREATE TABLE IF NOT EXISTS public.business_specials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE,
  town_slug text NOT NULL,
  town_name text,
  business_name text,
  category text,
  headline text NOT NULL,
  description text,
  cta_label text DEFAULT 'View Special',
  cta_url text,
  image_url text,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_business_specials_town ON public.business_specials(town_slug, is_active);
CREATE INDEX IF NOT EXISTS idx_business_specials_dates ON public.business_specials(start_date, end_date);

GRANT SELECT ON public.business_specials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_specials TO authenticated;
GRANT ALL ON public.business_specials TO service_role;

ALTER TABLE public.business_specials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active specials are publicly readable"
ON public.business_specials FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Service role can manage specials"
ON public.business_specials FOR ALL
TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Owners can manage their business specials"
ON public.business_specials FOR ALL
TO authenticated
USING (
  business_id IN (
    SELECT id FROM public.businesses
    WHERE claimed_by_user_id = auth.uid() AND is_claimed = true
  )
)
WITH CHECK (
  business_id IN (
    SELECT id FROM public.businesses
    WHERE claimed_by_user_id = auth.uid() AND is_claimed = true
  )
);

-- TOWN EVENTS
CREATE TABLE IF NOT EXISTS public.town_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  town_slug text NOT NULL,
  town_name text,
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  category text,
  venue_name text,
  address text,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  cta_label text DEFAULT 'View Event',
  cta_url text,
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_town_events_town ON public.town_events(town_slug, is_active);
CREATE INDEX IF NOT EXISTS idx_town_events_starts ON public.town_events(starts_at);

GRANT SELECT ON public.town_events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.town_events TO authenticated;
GRANT ALL ON public.town_events TO service_role;

ALTER TABLE public.town_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active events are publicly readable"
ON public.town_events FOR SELECT
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Service role can manage events"
ON public.town_events FOR ALL
TO service_role
USING (true) WITH CHECK (true);

CREATE POLICY "Owners can manage their business events"
ON public.town_events FOR ALL
TO authenticated
USING (
  business_id IN (
    SELECT id FROM public.businesses
    WHERE claimed_by_user_id = auth.uid() AND is_claimed = true
  )
)
WITH CHECK (
  business_id IN (
    SELECT id FROM public.businesses
    WHERE claimed_by_user_id = auth.uid() AND is_claimed = true
  )
);

-- updated_at triggers
CREATE TRIGGER trg_business_specials_updated
BEFORE UPDATE ON public.business_specials
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_town_events_updated
BEFORE UPDATE ON public.town_events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
