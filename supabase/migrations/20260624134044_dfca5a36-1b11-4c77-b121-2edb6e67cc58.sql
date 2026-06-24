ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS contact_status text NOT NULL DEFAULT 'unknown',
  ADD COLUMN IF NOT EXISTS contact_notes text;

ALTER TABLE public.businesses
  DROP CONSTRAINT IF EXISTS businesses_contact_status_check;

ALTER TABLE public.businesses
  ADD CONSTRAINT businesses_contact_status_check
  CHECK (contact_status IN ('verified','needs_verification','missing','unverified','unknown'));

UPDATE public.businesses
SET contact_status = CASE
  WHEN nullif(trim(coalesce(phone, '')), '') IS NULL THEN 'missing'
  WHEN regexp_replace(coalesce(phone,''), '[^0-9]', '', 'g') IN ('5185227265','15185227265') THEN 'needs_verification'
  WHEN is_verified = true THEN 'verified'
  WHEN is_claimed = true THEN 'unverified'
  ELSE 'unknown'
END
WHERE contact_status = 'unknown'
   OR regexp_replace(coalesce(phone,''), '[^0-9]', '', 'g') IN ('5185227265','15185227265')
   OR nullif(trim(coalesce(phone, '')), '') IS NULL;