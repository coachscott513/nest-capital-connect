
-- subscription_plans
CREATE TABLE public.subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_slug text NOT NULL DEFAULT 'capital-district',
  plan_name text NOT NULL,
  plan_key text NOT NULL,
  description text,
  monthly_price_cents integer NOT NULL DEFAULT 0,
  annual_price_cents integer NOT NULL DEFAULT 0,
  stripe_product_id text,
  stripe_monthly_price_id text,
  stripe_annual_price_id text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (region_slug, plan_key)
);
GRANT SELECT ON public.subscription_plans TO anon, authenticated;
GRANT ALL ON public.subscription_plans TO service_role;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone views active plans" ON public.subscription_plans
  FOR SELECT USING (active = true);
CREATE POLICY "Admins manage plans" ON public.subscription_plans
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_subscription_plans_updated
  BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- business_applications
CREATE TABLE public.business_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_slug text NOT NULL DEFAULT 'capital-district',
  status text NOT NULL DEFAULT 'pending_editorial_review',
  selected_plan_key text,
  -- business info
  business_name text NOT NULL,
  category text,
  town text,
  address text,
  phone text,
  email text NOT NULL,
  website text,
  instagram text,
  facebook text,
  reservation_url text,
  hours text,
  contact_name text,
  -- story
  story_origin text,
  known_for text,
  first_timer text,
  seasonal text,
  own_words text,
  -- structured
  team jsonb NOT NULL DEFAULT '[]'::jsonb,
  media jsonb NOT NULL DEFAULT '{}'::jsonb,
  badges jsonb NOT NULL DEFAULT '[]'::jsonb,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  social jsonb NOT NULL DEFAULT '{}'::jsonb,
  photos text[] NOT NULL DEFAULT '{}',
  logo_url text,
  video_url text,
  reel_url text,
  -- admin
  editorial_notes text,
  published_business_id uuid,
  submitted_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.business_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.business_applications TO authenticated;
GRANT ALL ON public.business_applications TO service_role;
ALTER TABLE public.business_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit applications" ON public.business_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view all applications" ON public.business_applications
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage applications" ON public.business_applications
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete applications" ON public.business_applications
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_business_applications_updated
  BEFORE UPDATE ON public.business_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- engagement_events
CREATE TABLE public.engagement_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_slug text NOT NULL DEFAULT 'capital-district',
  business_id uuid,
  business_slug text,
  event_type text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  user_agent text,
  referrer text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.engagement_events TO anon, authenticated;
GRANT SELECT ON public.engagement_events TO authenticated;
GRANT ALL ON public.engagement_events TO service_role;
ALTER TABLE public.engagement_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logs events" ON public.engagement_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view events" ON public.engagement_events
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX engagement_events_business_idx ON public.engagement_events(business_id, created_at DESC);
CREATE INDEX engagement_events_region_idx ON public.engagement_events(region_slug, created_at DESC);

-- Seed default plans for Capital District (Region #1)
INSERT INTO public.subscription_plans (region_slug, plan_key, plan_name, description, monthly_price_cents, annual_price_cents, features, sort_order)
VALUES
  ('capital-district', 'essential', 'Essential Registry', 'Free business profile in the Capital District Nest registry.', 0, 0,
    '["Business Profile","Contact Information","Google Maps","Category Listing","Community Discovery","Business Search"]'::jsonb, 1),
  ('capital-district', 'featured', 'Featured Partner', 'Editorial Spotlight, featured placement, and monthly analytics.', 4900, 47900,
    '["Everything in Essential","Spotlight Editorial","Featured Placement","Community Collections","QR Display Card","Monthly Analytics","Priority Updates","Owner Verification"]'::jsonb, 2);
