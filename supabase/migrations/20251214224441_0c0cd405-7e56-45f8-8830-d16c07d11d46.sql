-- Create deal_desk_requests table for Investor Snapshot submissions
CREATE TABLE public.deal_desk_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  property_address TEXT NOT NULL,
  strategy TEXT NOT NULL,
  notes TEXT,
  agreed_to_updates BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.deal_desk_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (form submissions)
CREATE POLICY "Anyone can submit deal desk requests"
ON public.deal_desk_requests
FOR INSERT
WITH CHECK (true);

-- Only allow reading own submissions (by email match in future auth)
CREATE POLICY "Service role can read all deal desk requests"
ON public.deal_desk_requests
FOR SELECT
USING (false);