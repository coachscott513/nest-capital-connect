-- Create town_ledger table for local news/intelligence feed
CREATE TABLE public.town_ledger (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL CHECK (category IN ('business', 'zoning', 'infrastructure', 'market', 'community')),
  icon TEXT,
  source_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_featured BOOLEAN DEFAULT false
);

-- Create index for efficient querying by town
CREATE INDEX idx_town_ledger_town_slug ON public.town_ledger(town_slug);
CREATE INDEX idx_town_ledger_published_at ON public.town_ledger(published_at DESC);

-- Enable RLS
ALTER TABLE public.town_ledger ENABLE ROW LEVEL SECURITY;

-- Allow public read access (news is public)
CREATE POLICY "Town ledger entries are publicly readable"
ON public.town_ledger
FOR SELECT
USING (true);

-- Create high_yield_assets table for investment properties
CREATE TABLE public.high_yield_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  address TEXT NOT NULL,
  price TEXT NOT NULL,
  property_type TEXT NOT NULL,
  cash_on_cash_return DECIMAL(5,2),
  cap_rate DECIMAL(5,2),
  units INTEGER DEFAULT 1,
  gross_rent TEXT,
  thumbnail_url TEXT,
  mls_id TEXT,
  is_active BOOLEAN DEFAULT true,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_high_yield_assets_town ON public.high_yield_assets(town_slug);
CREATE INDEX idx_high_yield_assets_active ON public.high_yield_assets(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE public.high_yield_assets ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "High yield assets are publicly readable"
ON public.high_yield_assets
FOR SELECT
USING (true);

-- Create local_voices table for business owner spotlights
CREATE TABLE public.local_voices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_photo_url TEXT,
  business_logo_url TEXT,
  origin_story TEXT,
  alpha_insight TEXT,
  growth_vision TEXT,
  primary_offering TEXT,
  website_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  display_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index
CREATE INDEX idx_local_voices_town ON public.local_voices(town_slug);

-- Enable RLS
ALTER TABLE public.local_voices ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Local voices are publicly readable"
ON public.local_voices
FOR SELECT
USING (true);

-- Insert sample Clifton Park ledger data
INSERT INTO public.town_ledger (town_slug, title, content, category, is_featured) VALUES
('clifton-park', 'New Tech Startup Hub Opens at Exit 9', 'A 15,000 sqft coworking space has opened, attracting remote workers and startups to the area.', 'business', true),
('clifton-park', 'Zoning Board Approves Mixed-Use Development', 'New mixed-use zoning approved for Route 146 corridor, allowing residential above retail.', 'zoning', false),
('clifton-park', 'School District Receives STEM Excellence Award', 'Shenendehowa schools recognized for top-tier STEM programs and college placement rates.', 'community', true),
('clifton-park', 'Exit 10 Interchange Improvements Announced', 'NYSDOT announces $12M improvement project to reduce congestion at Exit 10.', 'infrastructure', false),
('clifton-park', 'Q4 Market Report: Inventory Down 18%', 'Year-over-year active listings decline while median prices hold steady at $425K.', 'market', true);

-- Insert sample Clifton Park high yield asset
INSERT INTO public.high_yield_assets (town_slug, address, price, property_type, cash_on_cash_return, cap_rate, units, gross_rent, is_active, featured_order) VALUES
('clifton-park', '45 South Lake Ave', '$425,000', 'Duplex', 36.00, 8.20, 2, '$3,200/mo', true, 1),
('clifton-park', '128 Moe Road', '$575,000', 'Triplex', 28.50, 7.80, 3, '$4,800/mo', true, 2);

-- Insert sample Clifton Park local voices
INSERT INTO public.local_voices (town_slug, business_name, owner_name, origin_story, alpha_insight, growth_vision, primary_offering, is_verified, display_order) VALUES
('clifton-park', 'Clifton Park Coffee Co.', 'Maria Santos', 'Started roasting beans in my garage during COVID. Now serving 20+ local businesses.', 'The Exit 9 corridor is becoming a tech hub. Remote workers are driving demand for quality coffee shops.', 'Clifton Park is positioned to become the Capital Region''s premier suburb for young professionals.', 'Specialty coffee roasting & café', true, 1),
('clifton-park', 'Northway Fitness Studio', 'Jake Morrison', 'Former D1 athlete turned trainer. Opened Northway Fitness to bring boutique fitness to the suburbs.', 'Family demographics are shifting younger. More dual-income households with disposable income for fitness.', 'The town is investing in recreation infrastructure. Fitness businesses will thrive here.', 'Boutique fitness & personal training', true, 2);