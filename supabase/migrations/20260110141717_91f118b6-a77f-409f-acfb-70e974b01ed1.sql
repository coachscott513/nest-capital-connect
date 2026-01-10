-- Add new columns to town_market_data for the regional monopoly system
ALTER TABLE public.town_market_data 
ADD COLUMN IF NOT EXISTS hero_landmark TEXT,
ADD COLUMN IF NOT EXISTS nest_score INTEGER DEFAULT 5 CHECK (nest_score >= 1 AND nest_score <= 10),
ADD COLUMN IF NOT EXISTS target_yield DECIMAL(5,2),
ADD COLUMN IF NOT EXISTS anchor_agent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS anchor_agent_name TEXT,
ADD COLUMN IF NOT EXISTS anchor_agent_photo TEXT,
ADD COLUMN IF NOT EXISTS anchor_agent_phone TEXT,
ADD COLUMN IF NOT EXISTS anchor_agent_email TEXT,
ADD COLUMN IF NOT EXISTS region_category TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_town_market_data_active ON public.town_market_data(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_town_market_data_region ON public.town_market_data(region_category);