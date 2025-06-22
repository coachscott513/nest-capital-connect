
-- First, let's completely reset the RLS policies for the leads table
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create a comprehensive policy that allows both anonymous and authenticated users to insert
CREATE POLICY "Public can insert leads" 
  ON public.leads 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Create a policy for authenticated users to view leads
CREATE POLICY "Authenticated can view leads" 
  ON public.leads 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
