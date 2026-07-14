
-- 1. outreach_campaigns
CREATE TABLE public.outreach_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  segment text,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  template text,
  notes text,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.outreach_campaigns TO authenticated;
GRANT ALL ON public.outreach_campaigns TO service_role;
ALTER TABLE public.outreach_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage campaigns" ON public.outreach_campaigns
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_outreach_campaigns_updated_at
  BEFORE UPDATE ON public.outreach_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. tracked_links
CREATE TABLE public.tracked_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  destination_url text NOT NULL,
  label text,
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  campaign_id uuid REFERENCES public.outreach_campaigns(id) ON DELETE SET NULL,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  is_active boolean NOT NULL DEFAULT true,
  click_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_tracked_links_slug ON public.tracked_links(slug);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tracked_links TO authenticated;
GRANT ALL ON public.tracked_links TO service_role;
ALTER TABLE public.tracked_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage tracked links" ON public.tracked_links
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_tracked_links_updated_at
  BEFORE UPDATE ON public.tracked_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. link_clicks
CREATE TABLE public.link_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES public.tracked_links(id) ON DELETE CASCADE,
  slug text NOT NULL,
  campaign_id uuid REFERENCES public.outreach_campaigns(id) ON DELETE SET NULL,
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  region_id uuid REFERENCES public.regions(id) ON DELETE SET NULL,
  recipient_email_hash text,
  user_agent text,
  device text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  ip_hash text,
  country text,
  is_bot boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_link_clicks_link_id ON public.link_clicks(link_id);
CREATE INDEX idx_link_clicks_campaign_id ON public.link_clicks(campaign_id);
CREATE INDEX idx_link_clicks_created_at ON public.link_clicks(created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.link_clicks TO authenticated;
GRANT ALL ON public.link_clicks TO service_role;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read clicks" ON public.link_clicks
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- 4. outreach_recipients
CREATE TABLE public.outreach_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES public.outreach_campaigns(id) ON DELETE CASCADE,
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  business_name text,
  email text,
  email_hash text,
  status text NOT NULL DEFAULT 'sent',
  interest_score integer NOT NULL DEFAULT 0,
  first_click_at timestamptz,
  last_seen_at timestamptz,
  click_count integer NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, email_hash)
);
CREATE INDEX idx_outreach_recipients_campaign ON public.outreach_recipients(campaign_id);
CREATE INDEX idx_outreach_recipients_score ON public.outreach_recipients(interest_score DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.outreach_recipients TO authenticated;
GRANT ALL ON public.outreach_recipients TO service_role;
ALTER TABLE public.outreach_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage recipients" ON public.outreach_recipients
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_outreach_recipients_updated_at
  BEFORE UPDATE ON public.outreach_recipients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
