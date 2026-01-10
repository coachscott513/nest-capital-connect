-- Add new columns to leads table for origin tracking and agent assignment
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS origin_town TEXT,
ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'buyer',
ADD COLUMN IF NOT EXISTS assigned_agent_id UUID;

-- Rename 'name' to 'full_name' for clarity (if not already done)
-- First check if full_name exists, if not rename name
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'full_name') THEN
    ALTER TABLE public.leads RENAME COLUMN name TO full_name;
  END IF;
END $$;

-- Create index on origin_town for faster queries by town
CREATE INDEX IF NOT EXISTS idx_leads_origin_town ON public.leads(origin_town);

-- Create index on lead_type for filtering
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON public.leads(lead_type);

-- Create index on assigned_agent_id for agent queries
CREATE INDEX IF NOT EXISTS idx_leads_assigned_agent ON public.leads(assigned_agent_id);