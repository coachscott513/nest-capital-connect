-- Drop the existing constraint and add updated one with property_intelligence type
ALTER TABLE public.leads DROP CONSTRAINT leads_type_check;

ALTER TABLE public.leads ADD CONSTRAINT leads_type_check CHECK (type = ANY (ARRAY[
  'renter'::text, 
  'owner'::text, 
  'buyer'::text, 
  'seller'::text, 
  'newsletter'::text, 
  'niskayuna-homes'::text, 
  'troy-homes'::text, 
  'saratoga-homes'::text, 
  'clifton-park-homes'::text, 
  'schenectady-homes'::text, 
  'amsterdam-homes'::text, 
  'queensbury-homes'::text, 
  'voorheesville-homes'::text, 
  'delmar-homes'::text,
  'property_intelligence'::text
]));