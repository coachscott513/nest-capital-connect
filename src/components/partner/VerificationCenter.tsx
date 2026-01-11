import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, CheckCircle, AlertCircle, Pencil } from 'lucide-react';
import { z } from 'zod';

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

interface VerificationCenterProps {
  localVoice: LocalVoice | null;
  partnerId: string;
  onUpdate: (voice: LocalVoice) => void;
}

const storySchema = z.object({
  origin_story: z.string().min(50, 'Please share at least 50 characters about your origin story'),
  alpha_insight: z.string().min(20, 'Share a brief market insight (at least 20 characters)'),
  growth_vision: z.string().min(20, 'Describe your growth vision (at least 20 characters)'),
  primary_offering: z.string().min(10, 'What is your primary offering?'),
  website_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

const VerificationCenter = ({ localVoice, partnerId, onUpdate }: VerificationCenterProps) => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    origin_story: localVoice?.origin_story || '',
    alpha_insight: localVoice?.alpha_insight || '',
    growth_vision: localVoice?.growth_vision || '',
    primary_offering: localVoice?.primary_offering || '',
    website_url: localVoice?.website_url || '',
  });

  if (!localVoice) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardContent className="py-12 text-center">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No business profile found.</p>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = storySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from('local_voices')
      .update({
        origin_story: formData.origin_story,
        alpha_insight: formData.alpha_insight,
        growth_vision: formData.growth_vision,
        primary_offering: formData.primary_offering,
        website_url: formData.website_url || null,
        is_verified: true,
      })
      .eq('id', localVoice.id)
      .select()
      .single();

    if (error) {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      toast({
        title: 'Profile verified!',
        description: 'Your story is now live on the town page.',
      });
      onUpdate(data);
      setEditing(false);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Status Card */}
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>{localVoice.business_name}</CardTitle>
                <CardDescription>Owned by {localVoice.owner_name}</CardDescription>
              </div>
            </div>
            <Badge variant={localVoice.is_verified ? 'default' : 'secondary'}>
              {localVoice.is_verified ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Pending
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!localVoice.is_verified && !editing ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your Story is Blurred
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Complete your founder story to get verified and unblur your profile on the public town page.
              </p>
              <Button size="lg" onClick={() => setEditing(true)}>
                <Pencil className="w-4 h-4 mr-2" />
                Verify My Story
              </Button>
            </div>
          ) : localVoice.is_verified && !editing ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Your story is live and visible to the community
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-muted-foreground text-xs">Origin Story</Label>
                  <p className="text-foreground">{localVoice.origin_story}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Market Insight</Label>
                  <p className="text-foreground">{localVoice.alpha_insight}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground text-xs">Growth Vision</Label>
                  <p className="text-foreground">{localVoice.growth_vision}</p>
                </div>
              </div>

              <Button variant="outline" onClick={() => setEditing(true)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Story
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* Edit Form */}
      {editing && (
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Tell Your Story</CardTitle>
            <CardDescription>
              Share your founder journey to connect with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="origin_story">Origin Story *</Label>
                <Textarea
                  id="origin_story"
                  placeholder="How did you start this business? What inspired you?"
                  rows={4}
                  value={formData.origin_story}
                  onChange={(e) => setFormData({ ...formData, origin_story: e.target.value })}
                />
                {errors.origin_story && (
                  <p className="text-sm text-destructive">{errors.origin_story}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="alpha_insight">Market Insight *</Label>
                <Textarea
                  id="alpha_insight"
                  placeholder="What unique insight do you have about the local market?"
                  rows={3}
                  value={formData.alpha_insight}
                  onChange={(e) => setFormData({ ...formData, alpha_insight: e.target.value })}
                />
                {errors.alpha_insight && (
                  <p className="text-sm text-destructive">{errors.alpha_insight}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="growth_vision">Growth Vision *</Label>
                <Textarea
                  id="growth_vision"
                  placeholder="Where do you see your business in 5 years?"
                  rows={3}
                  value={formData.growth_vision}
                  onChange={(e) => setFormData({ ...formData, growth_vision: e.target.value })}
                />
                {errors.growth_vision && (
                  <p className="text-sm text-destructive">{errors.growth_vision}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary_offering">Primary Offering *</Label>
                <Input
                  id="primary_offering"
                  placeholder="e.g., Custom Home Renovations, Legal Services"
                  value={formData.primary_offering}
                  onChange={(e) => setFormData({ ...formData, primary_offering: e.target.value })}
                />
                {errors.primary_offering && (
                  <p className="text-sm text-destructive">{errors.primary_offering}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL</Label>
                <Input
                  id="website_url"
                  type="url"
                  placeholder="https://yourbusiness.com"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                />
                {errors.website_url && (
                  <p className="text-sm text-destructive">{errors.website_url}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit for Verification'}
                </Button>
                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerificationCenter;
