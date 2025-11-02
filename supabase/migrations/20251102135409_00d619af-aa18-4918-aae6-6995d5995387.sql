-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create properties table for real estate listings
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mls_id TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'NY',
  zip TEXT,
  price NUMERIC NOT NULL,
  beds INTEGER NOT NULL,
  baths NUMERIC NOT NULL,
  sqft INTEGER NOT NULL,
  lot_size TEXT,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  photos TEXT[] DEFAULT '{}',
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'sold')),
  days_on_market INTEGER DEFAULT 0,
  property_taxes NUMERIC,
  year_built INTEGER,
  property_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Public can view active listings
CREATE POLICY "Anyone can view active properties"
ON public.properties
FOR SELECT
USING (status = 'active' OR true);

-- Only admins can manage properties
CREATE POLICY "Admins can insert properties"
ON public.properties
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update properties"
ON public.properties
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete properties"
ON public.properties
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_properties_mls_id ON public.properties(mls_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_city ON public.properties(city);