import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Download, Shield, Phone, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SmsConsent from "@/components/SmsConsent";
import { useAuth } from "@/contexts/AuthContext";
import VerifiedEmailGate from "@/components/VerifiedEmailGate";

interface JourneyLeadMagnetProps {
  journeyType: "investor" | "first-time" | "land" | "financing";
  title: string;
  description: string;
  benefits: string[];
  downloadName: string;
}

const JourneyLeadMagnet = ({ 
  journeyType, 
  title, 
  description, 
  benefits,
  downloadName 
}: JourneyLeadMagnetProps) => {
  const [formData, setFormData] = useState({ firstName: "", phone: "" });
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !user.email_confirmed_at) return;
    setIsSubmitting(true);

    try {
      // Save to leads table
      const { error: dbError } = await supabase.from("leads").insert({
        full_name: formData.firstName,
        email: user.email,
        phone: formData.phone || null,
        message: `Lead magnet request: ${downloadName}`,
        type: journeyType,
        lead_type: journeyType === "investor" ? "investor" : "buyer",
        sms_consent: smsConsent,
      });

      if (dbError) throw dbError;

      // Send segmented email
      const { error: emailError } = await supabase.functions.invoke("send-journey-email", {
        body: {
          firstName: formData.firstName,
          phone: formData.phone || null,
          journeyType,
          sms_consent: smsConsent,
        },
      });

      if (emailError) throw emailError;

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Check your inbox for your free resource.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "We couldn't submit this right now",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Thanks!</h3>
          <p className="text-muted-foreground mb-4">
            Your guide is on the way. If you asked for help, an agent will reach out shortly.
          </p>
          <p className="text-sm text-muted-foreground">
            Didn't receive it? Check your spam folder or contact us directly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>

        <VerifiedEmailGate>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email address"
              aria-label="Confirmed account email"
              value={user?.email || ""}
              readOnly
              required
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="Phone number (optional)"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12"
            />
          </div>
          <SmsConsent checked={smsConsent} onCheckedChange={setSmsConsent} id="journey-lead-magnet-sms-consent" />
          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Get the Free Guide"}
          </Button>
        </form>
        </VerifiedEmailGate>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Free download. No spam. No obligation.</span>
        </div>

        {/* Live Contact Section */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Prefer to talk it through first?
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <a href="tel:5185227265">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="sms:5185227265">
                <MessageSquare className="w-4 h-4 mr-2" />
                Text for Help
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyLeadMagnet;
