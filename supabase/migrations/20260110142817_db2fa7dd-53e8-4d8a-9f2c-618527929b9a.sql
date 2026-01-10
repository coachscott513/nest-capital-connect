-- Create rentals table for the Rental Vault
CREATE TABLE public.rentals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  town_slug TEXT NOT NULL,
  address TEXT NOT NULL,
  rent_price INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms NUMERIC NOT NULL DEFAULT 1,
  sqft INTEGER,
  property_video_url TEXT,
  photos TEXT[],
  description TEXT,
  available_date DATE,
  pet_friendly BOOLEAN DEFAULT false,
  utilities_included BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;

-- Public read access for active rentals
CREATE POLICY "Active rentals are publicly readable"
ON public.rentals
FOR SELECT
USING (is_active = true);

-- Create rental_applications table for lead capture
CREATE TABLE public.rental_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_id UUID REFERENCES public.rentals(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  annual_income TEXT NOT NULL,
  move_in_date DATE NOT NULL,
  current_address TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rental_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit applications
CREATE POLICY "Anyone can submit rental applications"
ON public.rental_applications
FOR INSERT
WITH CHECK (true);

-- Service role can read applications
CREATE POLICY "Service role can read rental applications"
ON public.rental_applications
FOR SELECT
USING (false);

-- Add trigger for updated_at on rentals
CREATE TRIGGER update_rentals_updated_at
BEFORE UPDATE ON public.rentals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();