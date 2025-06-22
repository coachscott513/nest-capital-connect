
-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create a new policy that truly allows anyone to insert leads
CREATE POLICY "Allow anonymous lead creation" 
  ON public.leads 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Also ensure we have a policy for reading leads (for admin purposes)
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;

CREATE POLICY "Authenticated users can view leads" 
  ON public.leads 
  FOR SELECT 
  TO authenticated
  USING (true);
