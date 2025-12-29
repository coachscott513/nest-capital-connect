import { useState } from "react";
import { Search, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface BuyerActionsProps {
  townName: string;
  userEmail?: string;
}

const BuyerActions = ({ townName, userEmail }: BuyerActionsProps) => {
  const [addressInput, setAddressInput] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState(userEmail || "");
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleAddressRequest = async () => {
    if (!addressInput.trim()) return;
    
    setIsSubmittingAddress(true);
    try {
      const { error } = await supabase.from("intel_report_leads").insert({
        report_slug: "request-another-address",
        full_name: userEmail ? "Returning User" : "Anonymous",
        email: userEmail || "pending@collection.com",
        page_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We'll prepare your intelligence report shortly.",
      });
      setAddressInput("");
    } catch (error) {
      console.error("Error submitting address request:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingAddress(false);
    }
  };

  const handleNewsletterSignup = async () => {
    if (!newsletterEmail.trim()) return;
    
    setIsSubmittingNewsletter(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: "Newsletter Subscriber",
        email: newsletterEmail,
        message: `Weekly intelligence subscription for ${townName}`,
        type: "newsletter",
      });

      if (error) throw error;

      toast({
        title: "Subscribed",
        description: `You'll receive weekly intelligence for ${townName}.`,
      });
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          What's Next?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Request Another Address */}
          <div className="p-6 rounded-2xl bg-report-card text-center">
            <div className="w-12 h-12 rounded-full bg-report-border/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-5 h-5 text-report-muted" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-medium text-report-fg mb-2">
              Run Another Report
            </h3>
            <p className="text-xs text-report-muted mb-4">
              Get intelligence on a different property
            </p>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="bg-report-bg border-report-border text-report-fg rounded-xl text-sm h-10"
              />
              <Button
                onClick={handleAddressRequest}
                disabled={isSubmittingAddress || !addressInput.trim()}
                className="w-full bg-report-fg text-report-bg hover:bg-report-fg/90 h-10 rounded-xl text-sm"
              >
                Request Report
              </Button>
            </div>
          </div>
          
          {/* Weekly Newsletter */}
          <div className="p-6 rounded-2xl bg-report-card text-center">
            <div className="w-12 h-12 rounded-full bg-report-border/50 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-5 h-5 text-report-muted" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-medium text-report-fg mb-2">
              Weekly Intelligence
            </h3>
            <p className="text-xs text-report-muted mb-4">
              Get weekly market updates for {townName}
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-report-bg border-report-border text-report-fg rounded-xl text-sm h-10"
              />
              <Button
                onClick={handleNewsletterSignup}
                disabled={isSubmittingNewsletter || !newsletterEmail.trim()}
                variant="outline"
                className="w-full border-report-border text-report-fg hover:bg-report-card h-10 rounded-xl text-sm"
              >
                Subscribe
              </Button>
            </div>
          </div>
          
          {/* Request Guidance */}
          <div className="p-6 rounded-2xl bg-report-card text-center">
            <div className="w-12 h-12 rounded-full bg-report-border/50 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-5 h-5 text-report-muted" strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-medium text-report-fg mb-2">
              Professional Guidance
            </h3>
            <p className="text-xs text-report-muted mb-4">
              Questions about this property or market?
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-report-border text-report-fg hover:bg-report-card h-10 rounded-xl text-sm"
            >
              <a href="/deal-desk">Start Conversation</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerActions;
