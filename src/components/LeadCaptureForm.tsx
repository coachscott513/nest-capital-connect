import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useAnalytics } from './AnalyticsTracker';
import { z } from 'zod';

// Validation schema
const leadFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().trim().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  message: z.string().trim().max(1000, 'Message must be less than 1000 characters').optional().or(z.literal(''))
});

interface LeadCaptureFormProps {
  type: "investment" | "rental" | "rehab" | "multi-unit" | "land" | "seller" | "report";
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: "modal" | "inline" | "hero";
  boldtrailTag?: string;
  onSuccess?: () => void;
}

const LeadCaptureForm = ({ 
  type, 
  title, 
  description, 
  buttonText,
  variant = "inline",
  boldtrailTag,
  onSuccess 
}: LeadCaptureFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { trackLeadFormSubmission, trackPropertyInquiry } = useAnalytics();

  const getFormContent = () => {
    switch (type) {
      case "investment":
        return {
          defaultTitle: "Get This Week's Top 3 Investment Deals",
          defaultDescription: "Exclusive access to underpriced properties with pre-calculated ROI",
          placeholder: "What's your ideal investment return?",
          defaultButtonText: "Send Me This Week's Deals",
          leadMagnet: "Free Investment Property Analysis + Weekly Deal Alerts"
        };
      case "multi-unit":
        return {
          defaultTitle: "Multi-Unit Property Deal Alert",
          defaultDescription: "Be first to know about new multi-family opportunities",
          placeholder: "What size property interests you most?",
          defaultButtonText: "Get Multi-Unit Alerts",
          leadMagnet: "Free Multi-Unit Investment Guide + Deal Alerts"
        };
      case "rehab":
        return {
          defaultTitle: "Free Rehab Property Analysis",
          defaultDescription: "Get instant ARV estimates and renovation cost breakdowns",
          placeholder: "Any specific areas or property types?",
          defaultButtonText: "Get My Free Analysis",
          leadMagnet: "Free Rehab Calculator + Flip Property Alerts"
        };
      case "rental":
        return {
          defaultTitle: "Premium Rental Listings",
          defaultDescription: "Access exclusive rentals 24-48 hours before they go public",
          placeholder: "What are your must-haves?",
          defaultButtonText: "Get Exclusive Access",
          leadMagnet: "Early Access to Premium Rentals"
        };
      case "land":
        return {
          defaultTitle: "Get Albany land opportunities",
          defaultDescription: "Receive new land listings with zoning details and development potential",
          placeholder: "What type of land are you looking for?",
          defaultButtonText: "Get Albany land opportunities",
          leadMagnet: "Land Listings + Development Analysis"
        };
      case "seller":
        return {
          defaultTitle: "Get my property valuation",
          defaultDescription: "Free property valuation and access to serious investors",
          placeholder: "Tell us about your property",
          defaultButtonText: "Get my property valuation",
          leadMagnet: "Free Property Valuation + Investor Network"
        };
      case "report":
        return {
          defaultTitle: "Subscribe to free weekly investor insights",
          defaultDescription: "Weekly cash-flow analysis, market trends, and new opportunities",
          placeholder: "What markets interest you most?",
          defaultButtonText: "Subscribe to free weekly investor insights",
          leadMagnet: "Weekly Investor Report + Market Analysis"
        };
    }
  };

  const content = getFormContent();
  const formTitle = title || content.defaultTitle;
  const formDescription = description || content.defaultDescription;
  const finalButtonText = buttonText || content.defaultButtonText;

  const submitContactForm = async (formData: any) => {
    try {
      // Use Supabase client to invoke edge function
      const { data, error } = await supabase.functions.invoke('submit-contact-form', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        return { success: true, data: data.data };
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Client-side validation
    try {
      leadFormSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please check your input and try again.",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message || null,
        type,
        boldtrailTag: boldtrailTag || `CDN_${type}`
      };

      const result = await submitContactForm(submissionData);

      if (result.success) {
        // Track lead form submission
        trackLeadFormSubmission(type, 'Capital District');
        
        // Track property inquiry with specific details
        trackPropertyInquiry(type, 'Capital District');

        // Track Google Ads conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-922988725/MCepCNv03PgaELXhjrgD',
            'value': 1.0,
            'currency': 'USD'
          });
        }

        toast({
          title: "Success! Check your email",
          description: "We'll send your first report within 15 minutes. Check your spam folder too!",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      }

    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or call us at (518) 671-8048",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardClass = variant === "hero" 
    ? "bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl max-w-md mx-auto" 
    : "bg-card border shadow-lg max-w-md mx-auto";

  return (
    <Card className={cardClass}>
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-2xl font-bold text-primary leading-tight">
          {formTitle}
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          {formDescription}
        </CardDescription>
        
        {/* Value Proposition */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <CheckCircle className="w-4 h-4" />
            {content.leadMagnet}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Essential Fields Only */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Name *
              </label>
              <Input
                type="text"
                placeholder="Your first name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className={`h-12 text-base ${validationErrors.name ? 'border-destructive' : ''}`}
              />
              {validationErrors.name && (
                <p className="text-sm text-destructive">{validationErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Email *
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className={`h-12 text-base ${validationErrors.email ? 'border-destructive' : ''}`}
              />
              {validationErrors.email && (
                <p className="text-sm text-destructive">{validationErrors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Phone (Optional)
              </label>
              <Input
                type="tel"
                placeholder="For faster responses"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`h-12 text-base ${validationErrors.phone ? 'border-destructive' : ''}`}
              />
              {validationErrors.phone && (
                <p className="text-sm text-destructive">{validationErrors.phone}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {content.placeholder.replace("?", "")} (Optional)
              </label>
              <Textarea
                placeholder={content.placeholder}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className={`min-h-[80px] text-base resize-none ${validationErrors.message ? 'border-destructive' : ''}`}
              />
              {validationErrors.message && (
                <p className="text-sm text-destructive">{validationErrors.message}</p>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground group"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                {finalButtonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
          
          {/* Trust & Security Signals */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                100% Secure
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                No Spam
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                Quick Response
              </div>
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground">
                ✓ We'll email your report within 15 minutes
              </p>
              <p className="text-xs text-muted-foreground">
                ✓ Your information is 100% private • <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span>
              </p>
              <p className="text-xs text-muted-foreground">
                ✓ Unsubscribe anytime with one click
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;