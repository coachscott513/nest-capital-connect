
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS plan_tier TEXT NOT NULL DEFAULT 'free_claimed',
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT,
  ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS businesses_stripe_subscription_id_key
  ON public.businesses (stripe_subscription_id)
  WHERE stripe_subscription_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS businesses_plan_tier_idx
  ON public.businesses (plan_tier);

CREATE INDEX IF NOT EXISTS businesses_subscription_status_idx
  ON public.businesses (subscription_status)
  WHERE subscription_status IS NOT NULL;

CREATE OR REPLACE FUNCTION public.validate_business_plan_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.plan_tier NOT IN ('free_claimed','featured','spotlight','premium_partner') THEN
    RAISE EXCEPTION 'invalid plan_tier: %', NEW.plan_tier;
  END IF;

  IF NEW.subscription_status IS NOT NULL AND NEW.subscription_status NOT IN
     ('active','trialing','past_due','canceled','unpaid','incomplete','incomplete_expired','paused') THEN
    RAISE EXCEPTION 'invalid subscription_status: %', NEW.subscription_status;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_business_plan_fields_trg ON public.businesses;
CREATE TRIGGER validate_business_plan_fields_trg
  BEFORE INSERT OR UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_business_plan_fields();
