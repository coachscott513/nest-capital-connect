DROP POLICY IF EXISTS "Admins can manage businesses" ON public.businesses;

CREATE POLICY "Admins can manage businesses"
ON public.businesses
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));