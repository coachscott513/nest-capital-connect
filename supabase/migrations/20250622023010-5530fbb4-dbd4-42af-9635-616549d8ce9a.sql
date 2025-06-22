
-- Update the RLS policy to allow anyone to create leads (not just authenticated users)
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

CREATE POLICY "Anyone can create leads" 
  ON public.leads 
  FOR INSERT 
  WITH CHECK (true);

-- Keep the existing policy for viewing leads (only authenticated users can view)
-- This ensures lead data privacy while allowing public submissions
