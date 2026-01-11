import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Users, Send, Clock, CheckCircle } from 'lucide-react';
import { z } from 'zod';

interface ReferralWidgetProps {
  partnerId: string;
}

interface Referral {
  id: string;
  client_name: string;
  client_phone: string;
  project_type: 'commercial' | 'residential';
  status: string;
  created_at: string;
}

const referralSchema = z.object({
  client_name: z.string().min(2, 'Client name is required'),
  client_phone: z.string().min(10, 'Please enter a valid phone number'),
  project_type: z.enum(['commercial', 'residential']),
});

const ReferralWidget = ({ partnerId }: ReferralWidgetProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    project_type: 'residential' as 'commercial' | 'residential',
  });

  useEffect(() => {
    fetchReferrals();
  }, [partnerId]);

  const fetchReferrals = async () => {
    const { data, error } = await supabase
      .from('partner_referrals')
      .select('*')
      .eq('partner_id', partnerId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setReferrals(data as Referral[]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = referralSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    // Insert referral into database
    const { error: dbError } = await supabase
      .from('partner_referrals')
      .insert({
        partner_id: partnerId,
        client_name: formData.client_name,
        client_phone: formData.client_phone,
        project_type: formData.project_type,
      });

    if (dbError) {
      toast({
        title: 'Referral failed',
        description: dbError.message,
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Send email notification (call edge function)
    try {
      await supabase.functions.invoke('send-partner-referral', {
        body: {
          clientName: formData.client_name,
          clientPhone: formData.client_phone,
          projectType: formData.project_type,
          partnerId,
        },
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the whole operation if email fails
    }

    toast({
      title: 'Referral submitted!',
      description: 'Scott will reach out to your client shortly.',
    });

    setFormData({ client_name: '', client_phone: '', project_type: 'residential' });
    fetchReferrals();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Submit Referral Card */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>Refer a Client</CardTitle>
              <CardDescription>
                Send leads our way and earn referral credits
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                placeholder="John Smith"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              />
              {errors.client_name && (
                <p className="text-sm text-destructive">{errors.client_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="client_phone">Client Phone *</Label>
              <Input
                id="client_phone"
                type="tel"
                placeholder="(518) 555-1234"
                value={formData.client_phone}
                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              />
              {errors.client_phone && (
                <p className="text-sm text-destructive">{errors.client_phone}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Project Type *</Label>
              <RadioGroup
                value={formData.project_type}
                onValueChange={(value: 'commercial' | 'residential') => 
                  setFormData({ ...formData, project_type: value })
                }
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="residential" id="residential" />
                  <Label htmlFor="residential" className="cursor-pointer">Residential</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="commercial" id="commercial" />
                  <Label htmlFor="commercial" className="cursor-pointer">Commercial</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Sending...' : 'Send Referral'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Your Referrals</CardTitle>
          <CardDescription>
            Track the status of your submitted referrals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No referrals yet. Submit your first one above!
            </p>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{referral.client_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {referral.project_type === 'commercial' ? 'Commercial' : 'Residential'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={referral.status === 'pending' ? 'secondary' : 'default'}>
                      {referral.status === 'pending' ? (
                        <>
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {referral.status}
                        </>
                      )}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralWidget;
