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
    <section className="py-16 md:py-20 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-report-card rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border p-8 md:p-10">
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-4">
              Section 7
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3">
              What To Do Next
            </h2>

            <p className="text-sm text-report-text-muted mb-12 max-w-lg mx-auto">
              No sales pressure. Just help.
            </p>
          </header>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12">
            {actionButtons.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className="h-auto py-7 px-6 flex flex-col items-center gap-3 bg-report-section-light border-report-border text-report-text-headline hover:bg-report-card-alt rounded-2xl"
                >
                  <a href={action.href}>
                    <Icon className="w-6 h-6 text-report-text-muted" strokeWidth={1.5} />
                    <span className="text-sm font-medium">{action.label}</span>
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Request Another Address */}
          <div className="max-w-md mx-auto p-7 rounded-2xl bg-report-section-light border border-report-border">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-report-bg flex items-center justify-center border border-report-border/40">
                <Search className="w-5 h-5 text-report-text-muted" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-medium text-report-text-headline">
                  Request Intelligence on Another Property
                </h3>
                <p className="text-xs text-report-text-muted">
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
                className="bg-report-bg border-report-border/60 text-report-text-headline placeholder:text-report-text-muted rounded-xl text-sm h-11 flex-1"
              />
              <Button
                onClick={handleAddressRequest}
                disabled={isSubmittingAddress || !addressInput.trim()}
                className="bg-report-text-headline text-report-card hover:bg-report-text-headline/90 h-11 px-6 rounded-xl text-sm"
              >
                Request
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BuyerActions;
