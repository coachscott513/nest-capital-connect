import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Building2, Shield, Users, Sparkles } from 'lucide-react';
import VerificationCenter from '@/components/partner/VerificationCenter';
import ReferralWidget from '@/components/partner/ReferralWidget';
import UpgradeMenu from '@/components/partner/UpgradeMenu';
import type { User } from '@supabase/supabase-js';

interface LocalVoice {
  id: string;
  business_name: string;
  owner_name: string;
  is_verified: boolean;
  origin_story: string | null;
  alpha_insight: string | null;
  growth_vision: string | null;
  primary_offering: string | null;
  website_url: string | null;
  town_slug: string;
}

interface BusinessPartner {
  id: string;
  user_id: string;
  local_voice_id: string;
  local_voice?: LocalVoice;
}

const PartnerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<BusinessPartner | null>(null);
  const [localVoice, setLocalVoice] = useState<LocalVoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/partner-auth');
        return;
      }
      setUser(session.user);
      await fetchPartnerData(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/partner-auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchPartnerData = async (userId: string) => {
    setLoading(true);
    
    // Fetch business partner record
    const { data: partnerData, error: partnerError } = await supabase
      .from('business_partners')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (partnerError) {
      console.error('Error fetching partner:', partnerError);
    }

    if (partnerData) {
      setPartner(partnerData);
      
      // Fetch associated local_voice
      const { data: voiceData } = await supabase
        .from('local_voices')
        .select('*')
        .eq('id', partnerData.local_voice_id)
        .maybeSingle();
      
      if (voiceData) {
        setLocalVoice(voiceData);
      }
    }

    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
    navigate('/partner-auth');
  };

  const handleVerificationUpdate = (updatedVoice: LocalVoice) => {
    setLocalVoice(updatedVoice);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Partner Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!partner ? (
          /* No business linked yet */
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              No Business Linked
            </h2>
            <p className="text-muted-foreground mb-8">
              Your account isn't linked to a business yet. Contact the Nest team to get your business profile set up.
            </p>
            <Button asChild>
              <a href="mailto:scott@capitaldistrictnest.com?subject=Link My Business to Partner Dashboard">
                Contact Support
              </a>
            </Button>
          </div>
        ) : (
          /* Dashboard Tabs */
          <Tabs defaultValue="verification" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
              <TabsTrigger value="verification" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Verify</span>
              </TabsTrigger>
              <TabsTrigger value="referrals" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Refer</span>
              </TabsTrigger>
              <TabsTrigger value="upgrades" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Upgrade</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="verification">
              <VerificationCenter 
                localVoice={localVoice} 
                partnerId={partner.id}
                onUpdate={handleVerificationUpdate}
              />
            </TabsContent>

            <TabsContent value="referrals">
              <ReferralWidget partnerId={partner.id} />
            </TabsContent>

            <TabsContent value="upgrades">
              <UpgradeMenu partnerId={partner.id} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default PartnerDashboard;
