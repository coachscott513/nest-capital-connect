-- Create leads table for lead capture forms
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('renter', 'owner', 'buyer', 'seller')),
  location TEXT,
  bedrooms TEXT,
  price_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert leads (public contact form)
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Create properties table for real estate listings
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mls_id TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'NY',
  zip TEXT,
  price NUMERIC NOT NULL,
  beds INTEGER,
  baths NUMERIC,
  sqft INTEGER,
  latitude NUMERIC,
  longitude NUMERIC,
  photos TEXT[],
  status TEXT DEFAULT 'active',
  days_on_market INTEGER DEFAULT 0,
  boldtrail_url TEXT,
  description TEXT,
  property_type TEXT,
  year_built INTEGER,
  lot_size NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active properties (public listings)
CREATE POLICY "Anyone can view active properties"
ON public.properties
FOR SELECT
USING (status = 'active');

-- Create index for city-based queries
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_status ON public.properties(status);