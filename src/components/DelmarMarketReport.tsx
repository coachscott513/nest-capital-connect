import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { FileText, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const REPORT_URL = "https://www.narrpr.com/reports-v2/6817b29a-44d8-4221-a604-05c717acee81/pdf";

const DelmarMarketReport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-market-report', {
        body: {
          name: name.trim(),
          email: email.trim(),
          market: "Delmar",
          reportUrl: REPORT_URL
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Check your inbox for the Delmar Market Report!");
    } catch (error) {
      console.error('Market report submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Delmar Market Activity (Updated Every 48 Hours)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A short summary of recent pricing, sales volume, and days on market in Delmar.
          </p>
        </div>

        {/* Form or Thank You */}
        <Card className="max-w-lg mx-auto p-8 border-2 border-primary/20 bg-background">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Get the Full Delmar Market Report
                </h3>
                <p className="text-sm text-muted-foreground">
                  Enter your info and I'll send it straight to your inbox.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    First Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 h-12"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 h-12"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Me the Delmar Market Report
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Report Sent!
              </h3>
              <p className="text-muted-foreground mb-6">
                Check your inbox for the Delmar Market Report PDF with recent sales, pricing trends, and market activity.
              </p>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-foreground">
                  <strong>Want a property-specific breakdown?</strong>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Text any address to{" "}
                  <a href="tel:518-676-2347" className="text-primary font-semibold hover:underline">
                    518-676-2347
                  </a>{" "}
                  for a custom analysis.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Contact Note */}
        {!isSubmitted && (
          <p className="text-center text-sm text-muted-foreground mt-8">
            Want the fastest answer on one address? Text it to{" "}
            <a href="tel:518-676-2347" className="text-primary font-medium hover:underline">
              518-676-2347
            </a>
            .
          </p>
        )}

        {/* Secondary CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/dealdesk">
              <Phone className="w-5 h-5 mr-2" />
              Get a Free Intelligence Report
            </Link>
          </Button>
        </div>

        {/* SEO Copy */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-muted-foreground text-center leading-relaxed text-sm">
            This Delmar market report updates every 48 hours and reflects current pricing, 
            recent sales, and local trends. If you want a property-specific breakdown 
            (rent potential, taxes, cash flow, cap rate, and comps), request a{" "}
            <Link to="/dealdesk" className="text-primary font-medium hover:underline">
              Free Intelligence Report
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default DelmarMarketReport;
