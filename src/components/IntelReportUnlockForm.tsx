import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Unlock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface IntelReportUnlockFormProps {
  reportSlug: string;
  onUnlock: () => void;
}

const IntelReportUnlockForm = ({ reportSlug, onUnlock }: IntelReportUnlockFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "" // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check - if company field is filled, silently reject
    if (formData.company) {
      // Fake success to not alert spammers
      setTimeout(() => {
        onUnlock();
      }, 1000);
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("intel_report_leads").insert({
        report_slug: reportSlug,
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        page_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null
      });

      if (error) throw error;

      // Set localStorage for persistence
      localStorage.setItem(`intel_unlocked_${reportSlug}`, "true");
      
      toast.success("Report unlocked! Scroll down to view.");
      onUnlock();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/50 border border-border rounded-xl p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-foreground mb-2">
        Unlock Full Intelligence Report
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Enter your details to access the complete property analysis, including RPR and CRS reports.
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
          tabIndex={-1}
          autoComplete="off"
        />
        
        <div className="text-left">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
            required
            className="mt-1"
          />
        </div>

        <div className="text-left">
          <Label htmlFor="email" className="text-sm font-medium">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="mt-1"
          />
        </div>

        <div className="text-left">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(518) 555-1234"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6"
          size="lg"
        >
          {isSubmitting ? (
            "Unlocking..."
          ) : (
            <>
              <Unlock className="w-4 h-4 mr-2" />
              Unlock My Report
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          We use your information only to send the report you requested and to follow up about Capital District real estate. We never sell your information.
        </p>
      </form>
    </div>
  );
};

export default IntelReportUnlockForm;
