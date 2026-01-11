
-- Create enum for partner subscription types
CREATE TYPE public.partner_subscription_type AS ENUM ('live_social_stack', 'priority_contact', 'town_hero_video');

-- Create enum for referral project types
CREATE TYPE public.referral_project_type AS ENUM ('commercial', 'residential');

-- Create business_partners table to link auth users to local_voices businesses
CREATE TABLE public.business_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  local_voice_id UUID NOT NULL REFERENCES public.local_voices(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on business_partners
ALTER TABLE public.business_partners ENABLE ROW LEVEL SECURITY;

-- Policies for business_partners
CREATE POLICY "Users can view their own business partner record"
ON public.business_partners FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own business partner record"
ON public.business_partners FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business partner record"
ON public.business_partners FOR UPDATE
USING (auth.uid() = user_id);

-- Create partner_referrals table
CREATE TABLE public.partner_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.business_partners(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  project_type referral_project_type NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on partner_referrals
ALTER TABLE public.partner_referrals ENABLE ROW LEVEL SECURITY;

-- Policies for partner_referrals
CREATE POLICY "Partners can view their own referrals"
ON public.partner_referrals FOR SELECT
USING (
  partner_id IN (
    SELECT id FROM public.business_partners WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Partners can insert their own referrals"
ON public.partner_referrals FOR INSERT
WITH CHECK (
  partner_id IN (
    SELECT id FROM public.business_partners WHERE user_id = auth.uid()
  )
);

-- Create partner_subscriptions table
CREATE TABLE public.partner_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID NOT NULL REFERENCES public.business_partners(id) ON DELETE CASCADE,
  subscription_type partner_subscription_type NOT NULL,
  is_active BOOLEAN DEFAULT false,
  price_cents INTEGER NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on partner_subscriptions
ALTER TABLE public.partner_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for partner_subscriptions
CREATE POLICY "Partners can view their own subscriptions"
ON public.partner_subscriptions FOR SELECT
USING (
  partner_id IN (
    SELECT id FROM public.business_partners WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Partners can insert their own subscriptions"
ON public.partner_subscriptions FOR INSERT
WITH CHECK (
  partner_id IN (
    SELECT id FROM public.business_partners WHERE user_id = auth.uid()
  )
);

-- Add update trigger for business_partners
CREATE TRIGGER update_business_partners_updated_at
BEFORE UPDATE ON public.business_partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add policy for local_voices to allow partners to update their own business
CREATE POLICY "Partners can update their own local voice"
ON public.local_voices FOR UPDATE
USING (
  id IN (
    SELECT local_voice_id FROM public.business_partners WHERE user_id = auth.uid()
  )
);
