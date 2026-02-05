-- Create analyzer_leads table for branded report lead capture
CREATE TABLE analyzer_leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  
  -- Contact info (lead capture)
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  user_type text NOT NULL,
  
  -- Property they analyzed
  property_address text,
  property_city text,
  property_state text,
  asking_price numeric,
  loan_type text,
  cap_rate numeric,
  monthly_cash_flow numeric,
  noi numeric,
  cash_to_close numeric,
  
  -- Branding info (white-label fields)
  branding_name text,
  branding_company text,
  branding_title text,
  branding_phone text,
  branding_email text,
  branding_website text,
  branding_nmls text,
  branding_company_nmls text,
  branding_license text,
  branding_brokerage text,
  has_custom_branding boolean DEFAULT false,
  
  -- Tracking
  report_sent boolean DEFAULT false,
  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

-- Enable Row Level Security
ALTER TABLE analyzer_leads ENABLE ROW LEVEL SECURITY;

-- Website visitors can insert leads
CREATE POLICY "Allow anonymous inserts" ON analyzer_leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Authenticated users can read leads (for admin dashboard)
CREATE POLICY "Authenticated users can read" ON analyzer_leads
  FOR SELECT TO authenticated
  USING (true);

-- Create indexes for fast lookups
CREATE INDEX idx_analyzer_leads_email ON analyzer_leads(email);
CREATE INDEX idx_analyzer_leads_created ON analyzer_leads(created_at DESC);
CREATE INDEX idx_analyzer_leads_type ON analyzer_leads(user_type);