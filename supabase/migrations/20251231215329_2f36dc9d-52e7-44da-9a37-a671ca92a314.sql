-- Add market activity PDF fields to town_market_data table
ALTER TABLE public.town_market_data 
ADD COLUMN IF NOT EXISTS market_activity_pdf_url text,
ADD COLUMN IF NOT EXISTS market_activity_last_checked date;

-- Create market_report_leads table for the new lead form
CREATE TABLE IF NOT EXISTS public.market_report_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  buyer_type TEXT NOT NULL,
  address_to_analyze TEXT,
  town_slug TEXT NOT NULL,
  town_name TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.market_report_leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit leads
CREATE POLICY "Anyone can submit market report leads" 
ON public.market_report_leads 
FOR INSERT 
WITH CHECK (true);

-- Service role can read leads
CREATE POLICY "Service role can read market report leads" 
ON public.market_report_leads 
FOR SELECT 
USING (false);