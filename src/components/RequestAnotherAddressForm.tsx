import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const RequestAnotherAddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    company: "" // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.company) {
      setIsSubmitted(true);
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.address.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("intel_report_leads").insert({
        report_slug: "request-another-address",
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        page_url: `${window.location.href}?requested_address=${encodeURIComponent(formData.address)}`,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Request submitted! We'll prepare your report soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h4 className="text-xl font-semibold text-foreground mb-2">Request Received!</h4>
        <p className="text-muted-foreground">
          We'll prepare your intelligence report and send it to your email within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 border border-border rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-xl font-semibold text-foreground">Request Another Address</h4>
      </div>
      <p className="text-muted-foreground mb-6">
        Want an intelligence report on a different property? Enter the address below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <Label htmlFor="address" className="text-sm font-medium">
            Property Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="123 Main St, Albany, NY 12203"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reqName" className="text-sm font-medium">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="reqName"
              type="text"
              placeholder="Your name"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="reqEmail" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="reqEmail"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="reqPhone" className="text-sm font-medium">
            Phone <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="reqPhone"
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
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Request Intelligence Report"}
        </Button>
      </form>
    </div>
  );
};

export default RequestAnotherAddressForm;
