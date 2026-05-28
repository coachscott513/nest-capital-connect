CREATE TABLE public.investment_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  lead_type text NOT NULL,
  property_address text,
  purchase_price numeric,
  estimated_rent numeric,
  notes text,
  source_page text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.investment_leads TO anon, authenticated;
GRANT ALL ON public.investment_leads TO service_role;

ALTER TABLE public.investment_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit investment leads"
  ON public.investment_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read investment leads"
  ON public.investment_leads
  FOR SELECT
  TO service_role
  USING (true);