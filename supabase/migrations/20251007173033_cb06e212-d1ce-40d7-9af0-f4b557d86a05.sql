-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create policy for users to view their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for admins to manage all roles
CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing overly permissive policies on leads table
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.leads;

-- Create restrictive SELECT policy - only admins can view leads
CREATE POLICY "Only admins can view leads"
  ON public.leads
  FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Keep INSERT public for contact forms, but edge function should validate
-- Note: This allows public form submissions. Consider adding rate limiting in edge function.
CREATE POLICY "Anyone can submit leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Add policy for admins to update/delete leads
CREATE POLICY "Admins can update leads"
  ON public.leads
  FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
  ON public.leads
  FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));