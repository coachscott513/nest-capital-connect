import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock, Users, Award } from 'lucide-react';
import { z } from 'zod';

// Validation schema for grants form
const grantsFormSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(100, "First name too long"),
  last_name: z.string().trim().min(1, "Last name is required").max(100, "Last name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().regex(/^[0-9+\-\s()]+$/, "Invalid phone number").max(20, "Phone number too long"),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code").max(10),
  target_area: z.string().min(1, "Target area is required"),
  ftb: z.string().min(1, "First-time buyer status is required"),
  occupancy_primary: z.string().min(1, "Occupancy status is required"),
  household_size: z.string().min(1, "Household size is required"),
  income_band: z.string().min(1, "Income band is required"),
  credit_band: z.string().min(1, "Credit band is required"),
  funds_band: z.string().min(1, "Funds on hand is required"),
  debts_band: z.string().min(1, "Debt payments is required"),
  target_price: z.string().min(1, "Target price is required"),
  timeline: z.string().min(1, "Timeline is required"),
  esig: z.string().trim().min(3, "E-signature must be at least 3 characters"),
  // Optional fields
  veteran: z.string().optional(),
  course: z.string().optional(),
  other_assistance: z.string().optional(),
  referral: z.string().optional(),
  sms_opt_in: z.string().optional(),
});

const GrantsAssistantWidget = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // NOTE: Replace with your actual Zapier webhook URL
  const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID";
  const DEFAULT_UPLOAD_LINK = "https://your-upload-link.com";
  const DEFAULT_CALENDLY_LINK = "https://calendly.com/your-link/15min";

  const updateField = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field when user updates it
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
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
    
    // Validate all form data using zod
    try {
      const validatedData = grantsFormSchema.parse(formData);
      
      setIsSubmitting(true);

      const submissionData = {
        ...validatedData,
        source: 'CDN Grants Assistant (Web)',
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
      };

      // Check if webhook URL is still the placeholder
      if (ZAPIER_WEBHOOK_URL.includes('YOUR_WEBHOOK_ID')) {
        toast({
          title: "Configuration Error",
          description: "The grants assistant is not yet configured. Please contact support.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors', // Zapier webhooks require no-cors
        body: JSON.stringify(submissionData)
      });

      // With no-cors mode, we can't check response status
      setShowSuccess(true);
      toast({
        title: "Success!",
        description: "Your NY Grants Plan is on the way. Check your email and text."
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Convert zod errors to a format we can display
        const errors: Record<string, string> = {};
        err.errors.forEach(error => {
          if (error.path.length > 0) {
            errors[error.path[0] as string] = error.message;
          }
        });
        setValidationErrors(errors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors and try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "We had trouble submitting your info. Please try again or contact us directly.",
          variant: "destructive"
        });
      }
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
                    maxLength={100}
                    value={formData.first_name || ''}
                    onChange={(e) => updateField('first_name', e.target.value)}
                    autoComplete="given-name"
                    aria-invalid={!!validationErrors.first_name}
                  />
                  {validationErrors.first_name && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.first_name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name*</Label>
                  <Input
                    id="last_name"
                    required
                    maxLength={100}
                    value={formData.last_name || ''}
                    onChange={(e) => updateField('last_name', e.target.value)}
                    autoComplete="family-name"
                    aria-invalid={!!validationErrors.last_name}
                  />
                  {validationErrors.last_name && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.last_name}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Mobile (OK to text)*</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    maxLength={20}
                    placeholder="555-555-5555"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    aria-invalid={!!validationErrors.phone}
                  />
                  {validationErrors.phone && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.phone}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    maxLength={255}
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    autoComplete="email"
                    aria-invalid={!!validationErrors.email}
                  />
                  {validationErrors.email && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">Current ZIP Code*</Label>
                  <Input
                    id="zip"
                    required
                    maxLength={10}
                    placeholder="12345"
                    value={formData.zip || ''}
                    onChange={(e) => updateField('zip', e.target.value)}
                    aria-invalid={!!validationErrors.zip}
                  />
                  {validationErrors.zip && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.zip}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="target_area">Target Buy Area*</Label>
                  <Select required value={formData.target_area || ''} onValueChange={(v) => updateField('target_area', v)}>
                    <SelectTrigger id="target_area" aria-invalid={!!validationErrors.target_area}>
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
                  {validationErrors.target_area && (
                    <p className="text-sm text-destructive mt-1">{validationErrors.target_area}</p>
                  )}
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
                  <Label htmlFor="target_price">Target purchase price*</Label>
                  <Select required value={formData.target_price || ''} onValueChange={(v) => updateField('target_price', v)}>
                    <SelectTrigger id="target_price">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<$150k">&lt;$150k</SelectItem>
                      <SelectItem value="$150–$199k">$150–$199k</SelectItem>
                      <SelectItem value="$200–$249k">$200–$249k</SelectItem>
                      <SelectItem value="$250–$299k">$250–$299k</SelectItem>
                      <SelectItem value="$300–$349k">$300–$349k</SelectItem>
                      <SelectItem value="$350–$399k">$350–$399k</SelectItem>
                      <SelectItem value="$400k+">$400k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeline">When do you plan to buy?*</Label>
                  <Select required value={formData.timeline || ''} onValueChange={(v) => updateField('timeline', v)}>
                    <SelectTrigger id="timeline">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0–3 months">0–3 months</SelectItem>
                      <SelectItem value="3–6 months">3–6 months</SelectItem>
                      <SelectItem value="6–12 months">6–12 months</SelectItem>
                      <SelectItem value="12+ months">12+ months</SelectItem>
                      <SelectItem value="Just exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="other_assistance">Already working with another lender or grant program?</Label>
                <Select value={formData.other_assistance || ''} onValueChange={(v) => updateField('other_assistance', v)}>
                  <SelectTrigger id="other_assistance">
                    <SelectValue placeholder="Select…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Not sure">Not sure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="referral">How did you hear about us?</Label>
                <Input
                  id="referral"
                  maxLength={200}
                  value={formData.referral || ''}
                  onChange={(e) => updateField('referral', e.target.value)}
                  placeholder="Friend, Google, Facebook, etc."
                />
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="button" onClick={nextStep}>Next</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* STEP 5: Consent & Signature */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Consent & E-Signature</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-md text-sm space-y-2">
                <p>
                  By submitting this form, I consent to Capital District Real Estate contacting me via call, text, or email at the information provided (including automated messages). I understand:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>This is a request for information, not an application.</li>
                  <li>Grants and programs have income/credit/property requirements.</li>
                  <li>I may be connected with approved lenders or programs in my area.</li>
                  <li>I can revoke consent at any time.</li>
                </ul>
              </div>

              <div>
                <Label htmlFor="esig">Type your full name to e-sign and submit*</Label>
                <Input
                  id="esig"
                  required
                  minLength={3}
                  maxLength={200}
                  value={formData.esig || ''}
                  onChange={(e) => updateField('esig', e.target.value)}
                  placeholder="John Doe"
                  aria-invalid={!!validationErrors.esig}
                />
                {validationErrors.esig && (
                  <p className="text-sm text-destructive mt-1">{validationErrors.esig}</p>
                )}
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit & Get My Plan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
};

export default GrantsAssistantWidget;
