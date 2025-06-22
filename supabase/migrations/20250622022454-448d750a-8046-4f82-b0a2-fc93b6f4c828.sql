
-- Create a leads table to store rental search requests
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  type TEXT NOT NULL CHECK (type IN ('renter', 'owner', 'buyer', 'seller')),
  location TEXT,
  bedrooms TEXT,
  price_range TEXT,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL Security;

-- Create policies for leads access
CREATE POLICY "Anyone can create leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Admin users can view all leads (you can modify this based on your admin setup)
CREATE POLICY "Authenticated users can view leads" 
  ON public.leads 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Add index for better performance
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_type ON public.leads(type);
CREATE INDEX idx_leads_email ON public.leads(email);
