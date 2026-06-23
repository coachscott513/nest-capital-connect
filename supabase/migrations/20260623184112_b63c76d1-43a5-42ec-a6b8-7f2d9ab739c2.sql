
-- =========================================================
-- ADMIN DASHBOARD + PARTNER DATABASE
-- =========================================================

-- ---------- TOWNS ----------
CREATE TABLE IF NOT EXISTS public.towns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  town_name text NOT NULL,
  town_slug text NOT NULL UNIQUE,
  county text,
  region text,
  town_tier text NOT NULL DEFAULT 'growth',
  founding_price numeric DEFAULT 39,
  future_price numeric DEFAULT 99,
  population_estimate integer,
  activity_score integer,
  property_count integer DEFAULT 0,
  residential_count integer DEFAULT 0,
  rental_count integer DEFAULT 0,
  multifamily_count integer DEFAULT 0,
  land_count integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.towns TO anon, authenticated;
GRANT ALL ON public.towns TO service_role;
ALTER TABLE public.towns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "towns_public_read" ON public.towns FOR SELECT USING (true);
CREATE POLICY "towns_admin_write" ON public.towns FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_towns_updated BEFORE UPDATE ON public.towns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- PARTNERS ----------
CREATE TABLE IF NOT EXISTS public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text,
  phone text,
  website text,
  category text NOT NULL DEFAULT 'agent',
  brokerage_or_company text,
  license_or_title text,
  profile_photo_url text,
  logo_url text,
  bio text,
  towns_served text[] DEFAULT '{}'::text[],
  social_facebook text,
  social_instagram text,
  social_linkedin text,
  social_tiktok text,
  social_youtube text,
  preferred_cta_label text,
  preferred_cta_url text,
  preferred_contact_email text,
  preferred_contact_phone text,
  status text NOT NULL DEFAULT 'prospect',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partners TO anon, authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
-- Public can read only "active" partners (used to display featured partners on town pages)
CREATE POLICY "partners_public_read_active" ON public.partners FOR SELECT USING (status = 'active');
CREATE POLICY "partners_admin_all" ON public.partners FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_partners_updated BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- PARTNER PLACEMENTS ----------
CREATE TABLE IF NOT EXISTS public.partner_placements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  town_id uuid REFERENCES public.towns(id) ON DELETE SET NULL,
  town_slug text,
  category text,
  placement_type text NOT NULL DEFAULT 'free_profile',
  tier text,
  monthly_price numeric DEFAULT 0,
  founding_rate_locked boolean DEFAULT false,
  start_date date,
  renewal_date date,
  status text NOT NULL DEFAULT 'pending',
  badge_text text,
  featured_position integer,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partner_placements TO anon, authenticated;
GRANT ALL ON public.partner_placements TO service_role;
ALTER TABLE public.partner_placements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "placements_public_read_active" ON public.partner_placements FOR SELECT USING (status = 'active');
CREATE POLICY "placements_admin_all" ON public.partner_placements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_placements_updated BEFORE UPDATE ON public.partner_placements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_placements_town_slug ON public.partner_placements(town_slug);
CREATE INDEX IF NOT EXISTS idx_placements_status ON public.partner_placements(status);

-- ---------- PARTNER INQUIRIES ----------
CREATE TABLE IF NOT EXISTS public.partner_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  phone text NOT NULL,
  profession_category text,
  towns_of_interest text[] DEFAULT '{}'::text[],
  interested_package text,
  website text,
  social_links jsonb,
  notes text,
  source_page text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partner_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.partner_inquiries TO authenticated;
GRANT ALL ON public.partner_inquiries TO service_role;
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inquiries_public_insert" ON public.partner_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_admin_read" ON public.partner_inquiries FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "inquiries_admin_update" ON public.partner_inquiries FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "inquiries_admin_delete" ON public.partner_inquiries FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_inquiries_updated BEFORE UPDATE ON public.partner_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- LISTINGS extra columns ----------
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS town_slug text,
  ADD COLUMN IF NOT EXISTS address_slug text,
  ADD COLUMN IF NOT EXISTS public_listing_url text,
  ADD COLUMN IF NOT EXISTS public_listing_url_approved boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS needs_agent_public_url boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS claim_status text DEFAULT 'unclaimed',
  ADD COLUMN IF NOT EXISTS is_indexable boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS listing_agent_name_internal text,
  ADD COLUMN IF NOT EXISTS listing_agent_email_internal text,
  ADD COLUMN IF NOT EXISTS listing_agent_phone_internal text,
  ADD COLUMN IF NOT EXISTS listing_brokerage_internal text;

-- ---------- LISTING_CLAIMS extra columns ----------
ALTER TABLE public.listing_claims
  ADD COLUMN IF NOT EXISTS property_listing_id uuid,
  ADD COLUMN IF NOT EXISTS property_address text,
  ADD COLUMN IF NOT EXISTS town_slug text,
  ADD COLUMN IF NOT EXISTS claimant_company text,
  ADD COLUMN IF NOT EXISTS claimant_role text,
  ADD COLUMN IF NOT EXISTS preferred_listing_url text;

-- Seed default towns
INSERT INTO public.towns (town_name, town_slug, town_tier, founding_price, future_price) VALUES
  ('Albany','albany','premium',79,199),
  ('Saratoga Springs','saratoga-springs','premium',79,199),
  ('Delmar / Bethlehem','delmar','premium',79,199),
  ('Clifton Park','clifton-park','premium',79,199),
  ('Loudonville','loudonville','premium',79,199),
  ('Niskayuna','niskayuna','premium',79,199),
  ('Guilderland','guilderland','premium',79,199),
  ('Colonie','colonie','premium',79,199),
  ('Troy','troy','premium',79,199),
  ('Schenectady','schenectady','premium',79,199),
  ('Lake George','lake-george','premium',79,199),
  ('Queensbury','queensbury','premium',79,199),
  ('Latham','latham','growth',39,99),
  ('Ballston Spa','ballston-spa','growth',39,99),
  ('Cohoes','cohoes','growth',39,99),
  ('Watervliet','watervliet','growth',39,99),
  ('East Greenbush','east-greenbush','growth',39,99),
  ('Glenmont','glenmont','growth',39,99),
  ('Voorheesville','voorheesville','growth',39,99),
  ('Mechanicville','mechanicville','growth',39,99),
  ('Glens Falls','glens-falls','growth',39,99),
  ('Scotia / Glenville','scotia-glenville','growth',39,99),
  ('Rotterdam','rotterdam','growth',39,99),
  ('Amsterdam','amsterdam','growth',39,99),
  ('South Colonie','south-colonie','growth',39,99),
  ('North Colonie','north-colonie','growth',39,99),
  ('Burnt Hills / Ballston Lake','burnt-hills-ballston-lake','growth',39,99),
  ('Stillwater','stillwater','growth',39,99),
  ('Halfmoon','halfmoon','growth',39,99),
  ('North Greenbush','north-greenbush','growth',39,99),
  ('Rensselaer','rensselaer','growth',39,99),
  ('Ravena','ravena','starter',20,49),
  ('Selkirk','selkirk','starter',20,49),
  ('Altamont','altamont','starter',20,49),
  ('Waterford','waterford','starter',20,49),
  ('Green Island','green-island','starter',20,49),
  ('Schuylerville','schuylerville','starter',20,49),
  ('Johnstown','johnstown','starter',20,49),
  ('Gloversville','gloversville','starter',20,49),
  ('Hudson Falls','hudson-falls','starter',20,49),
  ('Fort Edward','fort-edward','starter',20,49),
  ('Greenwich','greenwich','starter',20,49),
  ('Corinth','corinth','starter',20,49),
  ('Hoosick Falls','hoosick-falls','starter',20,49),
  ('Canajoharie','canajoharie','starter',20,49),
  ('Fonda / Fultonville','fonda-fultonville','starter',20,49),
  ('Middleburgh','middleburgh','starter',20,49),
  ('Cobleskill','cobleskill','starter',20,49),
  ('Warrensburg','warrensburg','starter',20,49),
  ('Ticonderoga','ticonderoga','starter',20,49),
  ('Bolton Landing','bolton-landing','specialty',39,149),
  ('Lake George Village','lake-george-village','specialty',39,149),
  ('Schroon Lake','schroon-lake','specialty',39,149),
  ('North Creek','north-creek','specialty',39,149),
  ('Johnsburg','johnsburg','specialty',39,149),
  ('Hadley','hadley','specialty',39,149),
  ('Northville','northville','specialty',39,149),
  ('Saranac Lake','saranac-lake','specialty',39,149),
  ('Catskill','catskill','specialty',39,149),
  ('Hudson','hudson','specialty',39,149),
  ('Windham','windham','specialty',39,149),
  ('Hunter','hunter','specialty',39,149),
  ('Greenville','greenville','specialty',39,149),
  ('New Lebanon','new-lebanon','specialty',39,149),
  ('Chatham','chatham','specialty',39,149),
  ('Kinderhook','kinderhook','specialty',39,149),
  ('Argyle','argyle','specialty',39,149),
  ('Granville','granville','specialty',39,149),
  ('Putnam','putnam','specialty',39,149),
  ('Fort Ann','fort-ann','specialty',39,149)
ON CONFLICT (town_slug) DO NOTHING;
