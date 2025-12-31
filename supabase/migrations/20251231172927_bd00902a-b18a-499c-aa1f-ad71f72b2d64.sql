-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for storing scraped market data per town
CREATE TABLE public.town_market_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  town_name TEXT NOT NULL,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Market statistics
  active_listings INTEGER DEFAULT 0,
  median_price NUMERIC,
  avg_price NUMERIC,
  min_price NUMERIC,
  max_price NUMERIC,
  avg_sqft INTEGER,
  avg_beds NUMERIC,
  avg_baths NUMERIC,
  avg_days_on_market INTEGER,
  
  -- Price ranges
  listings_under_300k INTEGER DEFAULT 0,
  listings_300k_500k INTEGER DEFAULT 0,
  listings_500k_750k INTEGER DEFAULT 0,
  listings_over_750k INTEGER DEFAULT 0,
  
  -- Property type breakdown
  single_family_count INTEGER DEFAULT 0,
  multi_family_count INTEGER DEFAULT 0,
  condo_count INTEGER DEFAULT 0,
  land_count INTEGER DEFAULT 0,
  
  -- Raw listings data (JSON array of properties)
  listings_data JSONB,
  
  -- Source URL used for scraping
  source_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on town_slug to keep latest data per town
CREATE UNIQUE INDEX idx_town_market_data_slug ON public.town_market_data(town_slug);

-- Enable RLS
ALTER TABLE public.town_market_data ENABLE ROW LEVEL SECURITY;

-- Public read access for market data (non-sensitive aggregate stats)
CREATE POLICY "Anyone can view town market data" 
ON public.town_market_data 
FOR SELECT 
USING (true);

-- Create updated_at trigger
CREATE TRIGGER update_town_market_data_updated_at
BEFORE UPDATE ON public.town_market_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();