
-- First, completely drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can view leads" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create a simple, permissive insert policy for everyone (anon and authenticated)
CREATE POLICY "Enable insert for all users" ON public.leads
FOR INSERT 
WITH CHECK (true);

-- Create a select policy for authenticated users only (for admin purposes)
CREATE POLICY "Enable read access for authenticated users only" ON public.leads
FOR SELECT 
TO authenticated
USING (true);

-- Ensure RLS is enabled
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
