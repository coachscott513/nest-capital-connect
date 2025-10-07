import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock, Users, Award } from 'lucide-react';

const GrantsAssistantWidget = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID";
  const DEFAULT_UPLOAD_LINK = "https://your-upload-link.com";
  const DEFAULT_CALENDLY_LINK = "https://calendly.com/your-link/15min";

  const updateField = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.esig || formData.esig.trim().length < 3) {
      toast({
        title: "Error",
        description: "Please type your full name for the e-signature.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      source: 'CDN Grants Assistant (Web)',
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
    };

    try {
      const res = await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!res.ok) throw new Error('Webhook error');

      setShowSuccess(true);
      toast({
        title: "Success!",
        description: "Your NY Grants Plan is on the way. Check your email and text."
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "We had trouble submitting your info. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / 5) * 100;

  if (showSuccess) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
              Thanks! Your NY Grants Plan is on the way.
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Check your email and text for your personalized plan and upload link. You can also upload docs and book a call now:
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild>
                <a href={DEFAULT_UPLOAD_LINK} target="_blank" rel="noopener noreferrer">
                  Upload Documents
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={DEFAULT_CALENDLY_LINK} target="_blank" rel="noopener noreferrer">
                  Book 15-min Call
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto" id="grants-assistant">
      <header className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-3">
          New York Homebuyer Grants & Down-Payment Assistance
        </h2>
        <p className="text-lg text-muted-foreground mb-4">
          Find out what you qualify for in ~3 minutes. We'll match programs in the Capital District and across NY, send a personalized plan, and help with next steps.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Equal Housing Opportunity</span>
          <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Private & Secure</span>
          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Local Experts</span>
          <span className="flex items-center gap-1"><Award className="w-4 h-4" /> No Cost to Check</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Contact & Location */}
        {currentStep === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name*</Label>
                  <Input
                    id="first_name"
                    required
                    value={formData.first_name || ''}
                    onChange={(e) => updateField('first_name', e.target.value)}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name*</Label>
                  <Input
                    id="last_name"
                    required
                    value={formData.last_name || ''}
                    onChange={(e) => updateField('last_name', e.target.value)}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Mobile (OK to text)*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="555-555-5555"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">Current ZIP Code*</Label>
                  <Input
                    id="zip"
                    required
                    maxLength={10}
                    value={formData.zip || ''}
                    onChange={(e) => updateField('zip', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="target_area">Target Buy Area*</Label>
                  <Select required value={formData.target_area || ''} onValueChange={(v) => updateField('target_area', v)}>
                    <SelectTrigger id="target_area">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Albany County">Albany County</SelectItem>
                      <SelectItem value="Rensselaer County">Rensselaer County</SelectItem>
                      <SelectItem value="Schenectady County">Schenectady County</SelectItem>
                      <SelectItem value="Saratoga County">Saratoga County</SelectItem>
                      <SelectItem value="Other NY County">Other NY County</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms_opt_in"
                  checked={formData.sms_opt_in === 'true'}
                  onCheckedChange={(checked) => updateField('sms_opt_in', checked ? 'true' : 'false')}
                />
                <Label htmlFor="sms_opt_in" className="font-normal">
                  OK to text me updates about my eligibility and next steps
                </Label>
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={nextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 2: Buyer Profile */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Buyer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ftb">First-time homebuyer?*</Label>
                  <Select required value={formData.ftb || ''} onValueChange={(v) => updateField('ftb', v)}>
                    <SelectTrigger id="ftb">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                      <SelectItem value="I owned, but not in the last 3 years">I owned, but not in the last 3 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="occupancy_primary">Will you live in the home as your primary residence for ≥ 1 year?*</Label>
                  <Select required value={formData.occupancy_primary || ''} onValueChange={(v) => updateField('occupancy_primary', v)}>
                    <SelectTrigger id="occupancy_primary">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="household_size">Household size*</Label>
                  <Select required value={formData.household_size || ''} onValueChange={(v) => updateField('household_size', v)}>
                    <SelectTrigger id="household_size">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8+">8+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="veteran">Veteran / Active Duty?</Label>
                  <Select value={formData.veteran || ''} onValueChange={(v) => updateField('veteran', v)}>
                    <SelectTrigger id="veteran">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="course">Homebuyer education course?</Label>
                <Select value={formData.course || ''} onValueChange={(v) => updateField('course', v)}>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Need referral">Need referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="button" onClick={nextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 3: Finances */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Finances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="income_band">Annual household income (before tax)*</Label>
                  <Select required value={formData.income_band || ''} onValueChange={(v) => updateField('income_band', v)}>
                    <SelectTrigger id="income_band">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<$50k">&lt;$50k</SelectItem>
                      <SelectItem value="$50–$74k">$50–$74k</SelectItem>
                      <SelectItem value="$75–$99k">$75–$99k</SelectItem>
                      <SelectItem value="$100–$124k">$100–$124k</SelectItem>
                      <SelectItem value="$125–$149k">$125–$149k</SelectItem>
                      <SelectItem value="$150k+">$150k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="credit_band">Estimated credit score*</Label>
                  <Select required value={formData.credit_band || ''} onValueChange={(v) => updateField('credit_band', v)}>
                    <SelectTrigger id="credit_band">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<580">&lt;580</SelectItem>
                      <SelectItem value="580–619">580–619</SelectItem>
                      <SelectItem value="620–659">620–659</SelectItem>
                      <SelectItem value="660–699">660–699</SelectItem>
                      <SelectItem value="700–739">700–739</SelectItem>
                      <SelectItem value="740+">740+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="funds_band">Funds on hand for down payment/closing*</Label>
                  <Select required value={formData.funds_band || ''} onValueChange={(v) => updateField('funds_band', v)}>
                    <SelectTrigger id="funds_band">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="$0–$2,499">$0–$2,499</SelectItem>
                      <SelectItem value="$2,500–$7,499">$2,500–$7,499</SelectItem>
                      <SelectItem value="$7,500–$14,999">$7,500–$14,999</SelectItem>
                      <SelectItem value="$15,000–$24,999">$15,000–$24,999</SelectItem>
                      <SelectItem value="$25,000+">$25,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="debts_band">Monthly debt payments*</Label>
                  <Select required value={formData.debts_band || ''} onValueChange={(v) => updateField('debts_band', v)}>
                    <SelectTrigger id="debts_band">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<$250">&lt;$250</SelectItem>
                      <SelectItem value="$250–$499">$250–$499</SelectItem>
                      <SelectItem value="$500–$749">$500–$749</SelectItem>
                      <SelectItem value="$750–$999">$750–$999</SelectItem>
                      <SelectItem value="$1,000+">$1,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="gift_funds">Any gift funds expected?</Label>
                <Select value={formData.gift_funds || ''} onValueChange={(v) => updateField('gift_funds', v)}>
                  <SelectTrigger id="gift_funds">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="button" onClick={nextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 4: Property Intent */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Property Intent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property_type">Property type*</Label>
                  <Select required value={formData.property_type || ''} onValueChange={(v) => updateField('property_type', v)}>
                    <SelectTrigger id="property_type">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single-family">Single-family</SelectItem>
                      <SelectItem value="2-unit">2-unit</SelectItem>
                      <SelectItem value="3-unit">3-unit</SelectItem>
                      <SelectItem value="4-unit">4-unit</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                      <SelectItem value="Co-op">Co-op</SelectItem>
                      <SelectItem value="Manufactured on owned land">Manufactured on owned land</SelectItem>
                      <SelectItem value="Manufactured on leased land">Manufactured on leased land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price_band">Estimated price range*</Label>
                  <Select required value={formData.price_band || ''} onValueChange={(v) => updateField('price_band', v)}>
                    <SelectTrigger id="price_band">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<$175k">&lt;$175k</SelectItem>
                      <SelectItem value="$175–$249k">$175–$249k</SelectItem>
                      <SelectItem value="$250–$349k">$250–$349k</SelectItem>
                      <SelectItem value="$350–$449k">$350–$449k</SelectItem>
                      <SelectItem value="$450–$599k">$450–$599k</SelectItem>
                      <SelectItem value="$600k+">$600k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="timeline">When are you hoping to buy?*</Label>
                <Select required value={formData.timeline || ''} onValueChange={(v) => updateField('timeline', v)}>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0–3 months">0–3 months</SelectItem>
                    <SelectItem value="3–6 months">3–6 months</SelectItem>
                    <SelectItem value="6–12 months">6–12 months</SelectItem>
                    <SelectItem value="12+ months">12+ months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rehab">Rehab or energy upgrades needed?</Label>
                <Select value={formData.rehab || ''} onValueChange={(v) => updateField('rehab', v)}>
                  <SelectTrigger id="rehab">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Light">Light</SelectItem>
                    <SelectItem value="Extensive / 203k-style">Extensive / 203k-style</SelectItem>
                    <SelectItem value="Energy efficiency focus">Energy efficiency focus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="button" onClick={nextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 5: Consent & Submit */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Consent & Submit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                By submitting, you agree to be contacted by Capital District Nest by phone/SMS/email. We are an Equal Housing Opportunity company and not a government agency. Program terms change; final eligibility is set by lenders/administrators.
              </p>
              
              <div>
                <Label htmlFor="esig">E-signature (type full name)*</Label>
                <Input
                  id="esig"
                  required
                  placeholder="Type your full legal name"
                  value={formData.esig || ''}
                  onChange={(e) => updateField('esig', e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Get My Eligibility Plan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>

      <footer className="mt-6 text-center text-sm text-muted-foreground">
        Capital District Nest • Equal Housing Opportunity • © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default GrantsAssistantWidget;
