import { useState } from "react";
import { Search, BarChart3, Calculator, MessageSquare } from "lucide-react";
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
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);

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

  const actionButtons = [
    {
      icon: BarChart3,
      label: "Request Full CMA Breakdown",
      href: "/deal-desk",
    },
    {
      icon: Calculator,
      label: "Get Financing Scenarios",
      href: "/financing",
    },
    {
      icon: MessageSquare,
      label: "Ask a Local Expert",
      href: "/deal-desk",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-report-section-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted mb-6 text-center">
          Section 7
        </p>
        
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-4 text-center">
          What To Do Next
        </h2>
        
        <p className="text-sm text-report-muted text-center mb-10 max-w-lg mx-auto">
          No sales pressure. Just help.
        </p>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {actionButtons.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                asChild
                variant="outline"
                className="h-auto py-6 px-6 flex flex-col items-center gap-3 border-report-border text-report-fg hover:bg-report-card rounded-2xl"
              >
                <a href={action.href}>
                  <Icon className="w-6 h-6 text-report-muted" strokeWidth={1.5} />
                  <span className="text-sm font-medium">{action.label}</span>
                </a>
              </Button>
            );
          })}
        </div>
        
        {/* Request Another Address */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-report-card border border-report-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-report-border/50 flex items-center justify-center">
              <Search className="w-5 h-5 text-report-muted" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base font-medium text-report-fg">
                Request Intelligence on Another Property
              </h3>
              <p className="text-xs text-report-muted">
                Get this same analysis for any address
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter property address"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="bg-report-bg border-report-border text-report-fg rounded-xl text-sm h-11 flex-1"
            />
            <Button
              onClick={handleAddressRequest}
              disabled={isSubmittingAddress || !addressInput.trim()}
              className="bg-report-fg text-report-bg hover:bg-report-fg/90 h-11 px-6 rounded-xl text-sm"
            >
              Request
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyerActions;
