-- Create businesses table: the relational backbone for the Capital District discovery engine
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Identity
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  tagline TEXT,
  description TEXT,

  -- Location (relational keys to town/county system)
  town_slug TEXT NOT NULL,
  town_name TEXT,
  county TEXT,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'NY',
  zipcode TEXT,
  latitude NUMERIC,
  longitude NUMERIC,

  -- Classification
  category TEXT NOT NULL,
  subcategory TEXT,
  category_group TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Contact
  phone TEXT,
  email TEXT,
  website TEXT,
  instagram TEXT,
  facebook TEXT,
  google_maps_url TEXT,

  -- Media
  hero_image_url TEXT,
  logo_url TEXT,
  photos TEXT[] DEFAULT '{}',

  -- Editorial / Curation
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  is_trending BOOLEAN DEFAULT false,
  is_hidden_gem BOOLEAN DEFAULT false,
  is_editor_pick BOOLEAN DEFAULT false,
  editorial_note TEXT,

  -- Ownership / Claim system
  is_claimed BOOLEAN DEFAULT false,
  claimed_by_user_id UUID,
  claimed_at TIMESTAMP WITH TIME ZONE,

  -- Quality signals
  is_verified BOOLEAN DEFAULT false,
  rating NUMERIC,
  review_count INTEGER DEFAULT 0,
  hours JSONB,

  -- Ingestion tracking
  source TEXT DEFAULT 'manual',     -- 'csv' | 'manual' | 'scrape' | 'seed'
  import_batch_id TEXT,
  external_id TEXT,                  -- for dedupe across imports

  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  UNIQUE (slug, town_slug)
);

-- Indexes for the queries town pages + discovery rows will run constantly
CREATE INDEX idx_businesses_town_slug ON public.businesses (town_slug) WHERE is_active = true;
CREATE INDEX idx_businesses_county ON public.businesses (county) WHERE is_active = true;
CREATE INDEX idx_businesses_category ON public.businesses (category) WHERE is_active = true;
CREATE INDEX idx_businesses_category_group ON public.businesses (category_group) WHERE is_active = true;
CREATE INDEX idx_businesses_town_category ON public.businesses (town_slug, category) WHERE is_active = true;
CREATE INDEX idx_businesses_featured ON public.businesses (is_featured, featured_order) WHERE is_active = true AND is_featured = true;
CREATE INDEX idx_businesses_trending ON public.businesses (is_trending) WHERE is_active = true AND is_trending = true;
CREATE INDEX idx_businesses_tags ON public.businesses USING GIN (tags);
CREATE UNIQUE INDEX idx_businesses_external_id ON public.businesses (external_id) WHERE external_id IS NOT NULL;

-- Enable RLS
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Public can read active businesses
CREATE POLICY "Active businesses are publicly readable"
ON public.businesses
FOR SELECT
USING (is_active = true);

-- Service role manages ingestion (CSV uploads, scrapers, admin tools)
CREATE POLICY "Service role can insert businesses"
ON public.businesses
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update businesses"
ON public.businesses
FOR UPDATE
TO service_role
USING (true);

CREATE POLICY "Service role can delete businesses"
ON public.businesses
FOR DELETE
TO service_role
USING (true);

-- Claimed business owners can update their own listing
CREATE POLICY "Owners can update their claimed business"
ON public.businesses
FOR UPDATE
TO authenticated
USING (auth.uid() = claimed_by_user_id AND is_claimed = true);

-- Auto-update updated_at
CREATE TRIGGER update_businesses_updated_at
BEFORE UPDATE ON public.businesses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();