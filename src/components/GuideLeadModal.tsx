import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, Phone, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface GuideLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectPath: string;
  guideType: string;
}

const GuideLeadModal = ({ open, onOpenChange, redirectPath, guideType }: GuideLeadModalProps) => {
  const [formData, setFormData] = useState({ firstName: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to leads table
      const { error: dbError } = await supabase.from("leads").insert({
        name: formData.firstName,
        email: formData.email,
        phone: formData.phone || null,
        message: `Guide access request: ${guideType}`,
        type: guideType,
      });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Thanks — your guide is on the way. If you asked for help, Scott will reach out shortly.",
      });

      // Close modal and redirect
      onOpenChange(false);
      navigate(redirectPath);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Get the Free Guide</DialogTitle>
          <DialogDescription>
            Enter your details below and we'll unlock the full guide and market breakdown.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? "Unlocking..." : "Unlock the Guide"}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
          <Shield className="w-3 h-3" />
          <span>Free download. No spam. No obligation.</span>
        </div>

        {/* Live Contact Section */}
        <div className="pt-4 border-t border-border mt-4">
          <p className="text-sm text-muted-foreground text-center mb-3">
            Prefer to talk now?
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <a href="tel:5186762347">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button variant="outline" className="flex-1" asChild>
              <a href="sms:5186762347">
                <MessageSquare className="w-4 h-4 mr-2" />
                Text Scott
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideLeadModal;
