
CREATE TABLE public.listings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mls_number text UNIQUE,
  city text NOT NULL,
  county text,
  zipcode text,
  full_address text,
  masked_address text,
  street_number text,
  street_name text,
  list_price numeric,
  property_type text,
  property_type_code text,
  status text DEFAULT 'A',
  bedrooms integer,
  bathrooms numeric,
  sqft integer,
  units integer DEFAULT 1,
  year_built integer,
  annual_taxes numeric,
  days_on_market integer DEFAULT 0,
  list_date date,
  listing_agent text,
  agency text,
  photo_url text,
  remarks text,
  is_investment boolean DEFAULT false,
  cap_rate numeric,
  cash_flow_monthly numeric,
  gross_rent_monthly numeric,
  noi_annual numeric,
  dscr numeric,
  deal_score numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Public read access for active listings only
CREATE POLICY "Active listings are publicly readable"
  ON public.listings FOR SELECT
  USING (status = 'A');

-- Indexes for performance
CREATE INDEX idx_listings_city ON public.listings (city);
CREATE INDEX idx_listings_status ON public.listings (status);
CREATE INDEX idx_listings_investment ON public.listings (is_investment) WHERE is_investment = true;
CREATE INDEX idx_listings_deal_score ON public.listings (deal_score DESC) WHERE deal_score IS NOT NULL;
CREATE INDEX idx_listings_city_investment ON public.listings (city, is_investment, status);
