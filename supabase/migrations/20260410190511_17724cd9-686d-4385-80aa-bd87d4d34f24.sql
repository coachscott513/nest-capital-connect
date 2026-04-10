ALTER TABLE public.rentals 
ADD COLUMN IF NOT EXISTS latitude numeric,
ADD COLUMN IF NOT EXISTS longitude numeric,
ADD COLUMN IF NOT EXISTS property_sub_type text,
ADD COLUMN IF NOT EXISTS days_on_market integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS mls_number text,
ADD COLUMN IF NOT EXISTS listing_agent text,
ADD COLUMN IF NOT EXISTS remarks text;