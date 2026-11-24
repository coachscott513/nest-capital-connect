-- Run ONLY in an empty, disposable PostgreSQL database as its administrator.
-- This fixture tests the exact applied migration, never production records.
\set ON_ERROR_STOP on
CREATE ROLE anon;
CREATE ROLE authenticated;
CREATE ROLE service_role BYPASSRLS;
CREATE SCHEMA auth;
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');
CREATE TABLE public.user_roles (user_id uuid, role public.app_role);
CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
CREATE TABLE public.businesses (
  id integer PRIMARY KEY, description text, claimed_by_user_id uuid, is_claimed boolean,
  plan_tier text, is_featured boolean, featured_order integer,
  stripe_customer_id text, stripe_subscription_id text,
  subscription_status text, subscription_current_period_end timestamptz
);
GRANT SELECT, UPDATE ON public.businesses TO authenticated;
GRANT ALL ON public.businesses TO service_role;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
CREATE POLICY owners ON public.businesses FOR UPDATE TO authenticated
  USING (auth.uid() = claimed_by_user_id AND is_claimed = true);
CREATE POLICY business_reads ON public.businesses FOR SELECT TO authenticated USING (true);
CREATE POLICY admins ON public.businesses FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TABLE public.high_yield_assets (id integer, is_active boolean);
GRANT SELECT ON public.high_yield_assets TO anon, authenticated;
GRANT ALL ON public.high_yield_assets TO service_role;
ALTER TABLE public.high_yield_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "High yield assets are publicly readable"
  ON public.high_yield_assets FOR SELECT USING (true);

\ir ../../drizzle/migrations/0000_secure_selected_roles_business_billing_and_active_assets.sql

INSERT INTO public.user_roles VALUES ('22222222-2222-4222-8222-222222222222', 'admin');
INSERT INTO public.businesses VALUES (
  1, 'Original description', '11111111-1111-4111-8111-111111111111', true,
  'free_claimed', false, NULL, NULL, NULL, NULL, NULL
);
INSERT INTO public.high_yield_assets VALUES (1, true), (2, false), (3, NULL);

-- Administrator self-promotion is unavailable even with no existing admin.
DO $$ BEGIN
  IF has_function_privilege('anon', 'public.claim_first_admin()', 'EXECUTE')
    OR has_function_privilege('authenticated', 'public.claim_first_admin()', 'EXECUTE') THEN
    RAISE EXCEPTION 'Self-promotion remains callable';
  END IF;
END $$;
DELETE FROM public.user_roles;
SET ROLE service_role;
SELECT set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', false);
DO $$ BEGIN
  BEGIN
    PERFORM public.claim_first_admin();
    RAISE EXCEPTION 'Non-admin was able to claim administrator';
  EXCEPTION WHEN insufficient_privilege THEN NULL;
  END;
END $$;
RESET ROLE;
DO $$ BEGIN
  IF (SELECT count(*) FROM public.user_roles) <> 0 THEN
    RAISE EXCEPTION 'Claim inserted an administrator';
  END IF;
END $$;
INSERT INTO public.user_roles VALUES ('22222222-2222-4222-8222-222222222222', 'admin');
\echo PASS: first-user administrator self-promotion is blocked

-- Owners retain profile edits but cannot alter any paid-placement or billing field.
SET ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', false);
DO $$ DECLARE change text; affected integer; BEGIN
  UPDATE public.businesses SET description = 'Owner edited description' WHERE id = 1;
  GET DIAGNOSTICS affected = ROW_COUNT;
  IF affected <> 1 OR (SELECT description FROM public.businesses WHERE id=1) <> 'Owner edited description' THEN
    RAISE EXCEPTION 'Ordinary owner edit did not persist';
  END IF;
  FOREACH change IN ARRAY ARRAY[
    'plan_tier = ''premium_partner''', 'is_featured = true', 'featured_order = 1',
    'stripe_customer_id = ''customer-forged''', 'stripe_subscription_id = ''subscription-forged''',
    'subscription_status = ''active''', 'subscription_current_period_end = ''2027-01-01'''
  ] LOOP
    BEGIN
      EXECUTE 'UPDATE public.businesses SET ' || change || ' WHERE id = 1';
      RAISE EXCEPTION 'Owner changed protected field: %', change;
    EXCEPTION WHEN insufficient_privilege THEN NULL;
    END;
  END LOOP;
  IF (SELECT plan_tier FROM public.businesses WHERE id = 1) <> 'free_claimed'
    OR (SELECT is_featured FROM public.businesses WHERE id = 1) IS DISTINCT FROM false THEN
    RAISE EXCEPTION 'Owner granted paid placement';
  END IF;
END $$;
-- Administrators and trusted services retain authorized billing updates.
SELECT set_config('request.jwt.claim.sub', '22222222-2222-4222-8222-222222222222', false);
DO $$ BEGIN
  UPDATE public.businesses SET plan_tier='featured', is_featured=true, featured_order=1,
    stripe_customer_id='authorized', stripe_subscription_id='authorized',
    subscription_status='active', subscription_current_period_end='2027-01-01' WHERE id=1;
  IF (SELECT plan_tier FROM public.businesses WHERE id=1) <> 'featured' THEN
    RAISE EXCEPTION 'Authorized administrator update failed';
  END IF;
END $$;
RESET ROLE;
SET ROLE service_role;
SELECT set_config('request.jwt.claim.sub', '', false);
DO $$ BEGIN
  UPDATE public.businesses SET plan_tier='premium_partner' WHERE id=1;
  IF (SELECT plan_tier FROM public.businesses WHERE id=1) <> 'premium_partner' THEN
    RAISE EXCEPTION 'Trusted service update failed';
  END IF;
END $$;
RESET ROLE;
\echo PASS: owners cannot self-award paid placement; authorized updates still work

-- Both anonymous and authenticated public readers see only active assets.
SET ROLE anon;
DO $$ BEGIN
  IF (SELECT array_agg(id ORDER BY id) FROM public.high_yield_assets) IS DISTINCT FROM ARRAY[1] THEN
    RAISE EXCEPTION 'Anonymous read exposed inactive assets or hid active assets';
  END IF;
END $$;
RESET ROLE;
SET ROLE authenticated;
DO $$ BEGIN
  IF (SELECT array_agg(id ORDER BY id) FROM public.high_yield_assets) IS DISTINCT FROM ARRAY[1] THEN
    RAISE EXCEPTION 'Authenticated read exposed inactive assets or hid active assets';
  END IF;
END $$;
RESET ROLE;
\echo PASS: public investment assets exclude inactive and null-status records