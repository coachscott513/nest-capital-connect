import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Share2, Phone, Video, Check, ArrowRight } from 'lucide-react';

interface UpgradeMenuProps {
  partnerId: string;
}

interface Subscription {
  subscription_type: 'live_social_stack' | 'priority_contact' | 'town_hero_video';
  is_active: boolean;
}

const upgrades = [
  {
    id: 'live_social_stack',
    name: 'Live Social Stack',
    description: 'Display your latest Instagram, Facebook, and Google reviews automatically updated on your profile.',
    price: '$20/mo',
    priceCents: 2000,
    icon: Share2,
    features: ['Auto-sync social feeds', 'Review aggregation', 'Engagement metrics'],
    recurring: true,
  },
  {
    id: 'priority_contact',
    name: 'Priority Contact Info',
    description: 'Put your phone and email front-and-center with a prominent CTA button.',
    price: '$10/mo',
    priceCents: 1000,
    icon: Phone,
    features: ['Highlighted contact card', 'Click-to-call button', 'Priority badge'],
    recurring: true,
  },
  {
    id: 'town_hero_video',
    name: 'Town Hero Video',
    description: 'A professionally produced 60-second spotlight video featuring your business.',
    price: '$150',
    priceCents: 15000,
    icon: Video,
    features: ['4K cinematic B-roll', 'Founder interview', 'Homepage placement'],
    recurring: false,
    badge: 'Pilot Pricing',
  },
];

const UpgradeMenu = ({ partnerId }: UpgradeMenuProps) => {
  const { toast } = useToast();
  const [activeSubscriptions, setActiveSubscriptions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, [partnerId]);

  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from('partner_subscriptions')
      .select('subscription_type, is_active')
      .eq('partner_id', partnerId)
      .eq('is_active', true);

    if (!error && data) {
      const active = new Set(data.map((s: Subscription) => s.subscription_type));
      setActiveSubscriptions(active);
    }
  };

  const handleUpgrade = async (upgradeId: string, priceCents: number) => {
    setLoading(upgradeId);

    // For now, create a pending subscription and notify
    const { error } = await supabase
      .from('partner_subscriptions')
      .insert({
        partner_id: partnerId,
        subscription_type: upgradeId as 'live_social_stack' | 'priority_contact' | 'town_hero_video',
        price_cents: priceCents,
        is_active: false, // Will be activated after payment
      });

    if (error) {
      toast({
        title: 'Request failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Upgrade requested!',
        description: 'We\'ll contact you to complete the setup.',
      });
    }

    setLoading(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Premium Enhancements</h2>
        <p className="text-muted-foreground mt-2">
          Upgrade your profile to stand out in the community
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {upgrades.map((upgrade) => {
          const Icon = upgrade.icon;
          const isActive = activeSubscriptions.has(upgrade.id);

          return (
            <Card
              key={upgrade.id}
              className={`border-border/50 bg-card/50 relative overflow-hidden transition-all ${
                isActive ? 'ring-2 ring-primary' : 'hover:border-primary/50'
              }`}
            >
              {upgrade.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    {upgrade.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{upgrade.name}</CardTitle>
                <CardDescription className="text-sm">
                  {upgrade.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  {upgrade.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-foreground">{upgrade.price}</span>
                    {upgrade.recurring && (
                      <span className="text-sm text-muted-foreground">/month</span>
                    )}
                  </div>

                  {isActive ? (
                    <Button disabled className="w-full" variant="secondary">
                      <Check className="w-4 h-4 mr-2" />
                      Active
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleUpgrade(upgrade.id, upgrade.priceCents)}
                      disabled={loading === upgrade.id}
                    >
                      {loading === upgrade.id ? 'Requesting...' : 'Get Started'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Questions about upgrades? Email us at{' '}
        <a href="mailto:scott@capitaldistrictnest.com" className="text-primary hover:underline">
          scott@capitaldistrictnest.com
        </a>
      </p>
    </div>
  );
};

export default UpgradeMenu;
