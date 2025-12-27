-- Create table for intel report leads
CREATE TABLE public.intel_report_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  report_slug TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE public.intel_report_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to submit leads (insert only)
CREATE POLICY "Anyone can submit intel report leads"
ON public.intel_report_leads
FOR INSERT
WITH CHECK (true);

-- Service role can read all leads (for admin purposes)
CREATE POLICY "Service role can read intel report leads"
ON public.intel_report_leads
FOR SELECT
USING (false);