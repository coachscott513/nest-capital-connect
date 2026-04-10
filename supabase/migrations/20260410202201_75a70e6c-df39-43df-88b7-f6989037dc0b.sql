
-- Add CHECK constraints to leads table
ALTER TABLE public.leads
  ADD CONSTRAINT check_leads_name_length CHECK (length(full_name) <= 200),
  ADD CONSTRAINT check_leads_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_leads_phone_length CHECK (length(phone) <= 50),
  ADD CONSTRAINT check_leads_message_length CHECK (length(message) <= 5000),
  ADD CONSTRAINT check_leads_type_length CHECK (length(type) <= 50),
  ADD CONSTRAINT check_leads_location_length CHECK (length(location) <= 500);

-- Add CHECK constraints to intel_report_leads table
ALTER TABLE public.intel_report_leads
  ADD CONSTRAINT check_intel_name_length CHECK (length(full_name) <= 200),
  ADD CONSTRAINT check_intel_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_intel_phone_length CHECK (length(phone) <= 50),
  ADD CONSTRAINT check_intel_slug_length CHECK (length(report_slug) <= 200);

-- Add CHECK constraints to market_report_leads table
ALTER TABLE public.market_report_leads
  ADD CONSTRAINT check_mrl_name_length CHECK (length(full_name) <= 200),
  ADD CONSTRAINT check_mrl_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_mrl_phone_length CHECK (length(phone) <= 50),
  ADD CONSTRAINT check_mrl_town_name_length CHECK (length(town_name) <= 200),
  ADD CONSTRAINT check_mrl_town_slug_length CHECK (length(town_slug) <= 200);

-- Add CHECK constraints to deal_desk_requests table
ALTER TABLE public.deal_desk_requests
  ADD CONSTRAINT check_ddr_name_length CHECK (length(first_name) <= 200),
  ADD CONSTRAINT check_ddr_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_ddr_address_length CHECK (length(property_address) <= 500),
  ADD CONSTRAINT check_ddr_strategy_length CHECK (length(strategy) <= 100),
  ADD CONSTRAINT check_ddr_notes_length CHECK (length(notes) <= 5000);

-- Add CHECK constraints to rental_applications table
ALTER TABLE public.rental_applications
  ADD CONSTRAINT check_ra_name_length CHECK (length(full_name) <= 200),
  ADD CONSTRAINT check_ra_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_ra_phone_length CHECK (length(phone) <= 50),
  ADD CONSTRAINT check_ra_income_length CHECK (length(annual_income) <= 100),
  ADD CONSTRAINT check_ra_message_length CHECK (length(message) <= 5000);

-- Add CHECK constraints to analyzer_leads table
ALTER TABLE public.analyzer_leads
  ADD CONSTRAINT check_al_name_length CHECK (length(full_name) <= 200),
  ADD CONSTRAINT check_al_email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT check_al_phone_length CHECK (length(phone) <= 50),
  ADD CONSTRAINT check_al_type_length CHECK (length(user_type) <= 100),
  ADD CONSTRAINT check_al_address_length CHECK (length(property_address) <= 500);

-- Add restrictive SELECT policy on leads table (service_role only)
CREATE POLICY "Service role can read leads"
  ON public.leads
  FOR SELECT
  TO service_role
  USING (true);
