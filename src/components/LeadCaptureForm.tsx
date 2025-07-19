import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { useAnalytics } from './AnalyticsTracker';

interface LeadCaptureFormProps {
  type: "investment" | "rental" | "rehab" | "multi-unit";
  title?: string;
  description?: string;
  buttonText?: string;
  variant?: "modal" | "inline" | "hero";
}

const LeadCaptureForm = ({ 
  type, 
  title, 
  description, 
  buttonText,
  variant = "inline" 
}: LeadCaptureFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    }
  };

  const content = getFormContent();
  const formTitle = title || content.defaultTitle;
  const formDescription = description || content.defaultDescription;
  const finalButtonText = buttonText || content.defaultButtonText;

  const submitContactForm = async (formData: any) => {
    try {
      const response = await fetch('https://akonlzlpbdoqmczidfwm.supabase.co/functions/v1/submit-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrb25semxwYmRvcW1jemlkZndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NTcxMjMsImV4cCI6MjA2NjEzMzEyM30.Aqc8YNgNPhnoKErL5FqnwHUnejVhuaRVGel9sm2PJHc`,
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message || null,
        type
      };

      const result = await submitContactForm(submissionData);

      if (result.success) {
        // Track lead form submission
        trackLeadFormSubmission(type, 'Capital District');
        
        // Track property inquiry with specific details
        trackPropertyInquiry(type, 'Capital District');

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
      }

    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or call us at (518) 555-0123",
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
                className="h-12 text-base"
              />
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
                className="h-12 text-base"
              />
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
                className="h-12 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {content.placeholder.replace("?", "")} (Optional)
              </label>
              <Textarea
                placeholder={content.placeholder}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="min-h-[80px] text-base resize-none"
              />
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