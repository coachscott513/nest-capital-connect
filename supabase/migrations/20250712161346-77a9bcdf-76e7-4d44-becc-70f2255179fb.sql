-- Drop the existing check constraint
ALTER TABLE public.leads DROP CONSTRAINT leads_type_check;

-- Add a new check constraint that includes the form types
ALTER TABLE public.leads ADD CONSTRAINT leads_type_check 
CHECK (type = ANY (ARRAY['renter'::text, 'owner'::text, 'buyer'::text, 'seller'::text, 'investment'::text, 'rental'::text, 'rehab'::text, 'multi-unit'::text]));