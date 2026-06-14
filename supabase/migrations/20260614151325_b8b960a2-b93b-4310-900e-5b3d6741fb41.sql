
-- ============ property_listings ============
CREATE TABLE public.property_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mls_number text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'preview',
  claim_status text NOT NULL DEFAULT 'unclaimed',
  source_type text NOT NULL DEFAULT 'market_data_import',
  is_featured boolean NOT NULL DEFAULT false,
  is_indexable boolean NOT NULL DEFAULT false,
  needs_agent_public_url boolean NOT NULL DEFAULT true,
  public_listing_url text,
  address text NOT NULL,
  address_slug text NOT NULL,
  city text,
  town_slug text,
  county text,
  school_district text,
  price numeric,
  property_category text,
  property_subtype text,
  beds integer,
  baths numeric,
  sqft integer,
  acres numeric,
  year_built integer,
  days_on_market integer,
  listing_contract_date date,
  agent_name text,
  agent_slug text,
  agent_phone text,
  agent_email text,
  agent_website text,
  brokerage_name text,
  brokerage_slug text,
  raw jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_property_listings_town ON public.property_listings(town_slug);
CREATE INDEX idx_property_listings_category ON public.property_listings(property_category);
CREATE INDEX idx_property_listings_agent ON public.property_listings(agent_slug);
CREATE INDEX idx_property_listings_brokerage ON public.property_listings(brokerage_slug);
CREATE INDEX idx_property_listings_status ON public.property_listings(status);

GRANT SELECT ON public.property_listings TO anon, authenticated;
GRANT ALL ON public.property_listings TO service_role;
ALTER TABLE public.property_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view non-archived property listings"
  ON public.property_listings FOR SELECT
  USING (status <> 'archived');

CREATE TRIGGER trg_property_listings_updated_at
  BEFORE UPDATE ON public.property_listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ listing_agents ============
CREATE TABLE public.listing_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  brokerage_name text,
  brokerage_slug text,
  phone text,
  email text,
  website text,
  photo_url text,
  social_facebook text,
  social_instagram text,
  social_linkedin text,
  claim_status text NOT NULL DEFAULT 'unclaimed',
  is_featured boolean NOT NULL DEFAULT false,
  active_count integer NOT NULL DEFAULT 0,
  towns text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_listing_agents_brokerage ON public.listing_agents(brokerage_slug);
GRANT SELECT ON public.listing_agents TO anon, authenticated;
GRANT ALL ON public.listing_agents TO service_role;
ALTER TABLE public.listing_agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view listing agents"
  ON public.listing_agents FOR SELECT USING (true);
CREATE TRIGGER trg_listing_agents_updated_at
  BEFORE UPDATE ON public.listing_agents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ listing_brokerages ============
CREATE TABLE public.listing_brokerages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  office_phone text,
  office_email text,
  office_website text,
  active_count integer NOT NULL DEFAULT 0,
  agent_count integer NOT NULL DEFAULT 0,
  towns text[] DEFAULT '{}',
  claim_status text NOT NULL DEFAULT 'unclaimed',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.listing_brokerages TO anon, authenticated;
GRANT ALL ON public.listing_brokerages TO service_role;
ALTER TABLE public.listing_brokerages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view listing brokerages"
  ON public.listing_brokerages FOR SELECT USING (true);
CREATE TRIGGER trg_listing_brokerages_updated_at
  BEFORE UPDATE ON public.listing_brokerages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ listing_claims ============
CREATE TABLE public.listing_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mls_number text,
  agent_slug text,
  claimant_name text NOT NULL,
  claimant_email text NOT NULL,
  claimant_phone text NOT NULL,
  requested_public_url text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.listing_claims TO anon, authenticated;
GRANT ALL ON public.listing_claims TO service_role;
ALTER TABLE public.listing_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a listing claim"
  ON public.listing_claims FOR INSERT WITH CHECK (true);
CREATE TRIGGER trg_listing_claims_updated_at
  BEFORE UPDATE ON public.listing_claims
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
