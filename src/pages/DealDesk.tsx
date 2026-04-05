import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, FileText, TrendingUp, DollarSign, Shield, Clock, Zap, Map, AlertTriangle, ArrowRight, X } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Valid email is required"),
  propertyAddress: z.string().min(1, "Property address or listing link is required"),
  strategy: z.string().min(1, "Please select a strategy"),
  notes: z.string().optional(),
  agreedToUpdates: z.boolean().refine(val => val === true, "You must agree to receive updates"),
});


type FormData = z.infer<typeof formSchema>;

const DealDesk = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      propertyAddress: "",
      strategy: "",
      notes: "",
      agreedToUpdates: false,
    },
  });


  // Scroll to top on page load (unless coming with #free-reports hash)
  useEffect(() => {
    if (location.hash === "#free-reports") {
      setTimeout(() => {
        document.getElementById("free-reports")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { error: emailError } = await supabase.functions.invoke("send-dealdesk-emails", {
        body: {
          firstName: data.firstName,
          email: data.email,
          propertyAddress: data.propertyAddress,
          strategy: data.strategy,
          notes: data.notes || null,
        },
      });

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast({
        title: "Request received!",
        description: "Check your email for confirmation.",
      });
      navigate("/dealdesk/thanks");
    } catch (error) {
      console.error("Error submitting deal desk request:", error);
      toast({
        title: "Submission failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFreeReports = () => {
    document.getElementById("free-reports")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Capital Deal Desk | Investor Snapshots</title>
        <meta name="description" content="Get same-day investor intelligence on any property. Paste any address and receive a comprehensive Investor Snapshot from Capital Deal Desk." />
        <link rel="canonical" href="https://capitaldealdesk.com" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-transparent" />
          <div className="container mx-auto max-w-5xl relative z-10">
            <p className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4">
              Expert Tools. Friendly Service.
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Paste any address.<br />
              <span className="text-emerald-400">See if the numbers work.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Property insights by Capital District Nest. NY focus, nationwide available.
            </p>
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-foreground font-semibold px-8 py-6 text-lg"
            >
              Get My Snapshot
            </Button>
          </div>
        </section>

        {/* Intake Form */}
        <section id="intake-form" className="py-16 px-4 bg-[#111111]">
          <div className="container mx-auto max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Request Your <span className="text-emerald-400">Investor Snapshot</span>
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">First Name *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Your first name"
                          className="bg-[#1a1a1a] border-border text-white placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="you@email.com"
                          className="bg-[#1a1a1a] border-border text-white placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Property Address or Listing Link *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="123 Main St, Albany NY or Zillow/Redfin URL"
                          className="bg-[#1a1a1a] border-border text-white placeholder:text-muted-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="strategy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Investment Strategy *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#1a1a1a] border-border text-white">
                            <SelectValue placeholder="Select your strategy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#1a1a1a] border-border">
                          <SelectItem value="cash-flow">Cash Flow</SelectItem>
                          <SelectItem value="dscr">DSCR</SelectItem>
                          <SelectItem value="house-hack">House Hack</SelectItem>
                          <SelectItem value="value-add">Value-Add</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Any additional context about your investment goals..."
                          className="bg-[#1a1a1a] border-border text-white placeholder:text-muted-foreground min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreedToUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-border data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-muted-foreground text-sm font-normal">
                          I agree to receive my Snapshot and Deal Desk updates by email. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-foreground font-semibold py-6 text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Get My Snapshot"}
                </Button>
              </form>
            </Form>
          </div>
        </section>

        {/* What You Receive */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What You Receive in a <span className="text-emerald-400">Snapshot</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: FileText, text: "Property facts + neighborhood map" },
                { icon: DollarSign, text: "Tax/assessment reality check" },
                { icon: TrendingUp, text: "Comps + market pulse (where available)" },
                { icon: AlertTriangle, text: "Key risks + what to verify next" },
                { icon: ArrowRight, text: "Clear next steps" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#111111] rounded-lg border border-border">
                  <item.icon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Not an appraisal. Verify rent roll/expenses with seller or agent.
            </p>
          </div>
        </section>

        {/* What's Included (detailed) */}
        <section className="py-16 px-4 bg-[#111111]">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              What's Included in Your <span className="text-emerald-400">Investor Snapshot</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: TrendingUp, text: "Pro forma cash flow analysis with realistic assumptions" },
                { icon: DollarSign, text: "Estimated rents based on local market comps" },
                { icon: FileText, text: "Tax & utility cost estimates" },
                { icon: CheckCircle, text: "Cap rate and cash-on-cash projections" },
                { icon: Shield, text: "Neighborhood risk assessment" },
                { icon: Zap, text: "Quick take: buy, pass, or dig deeper" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#0a0a0a] rounded-lg border border-border">
                  <item.icon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Intelligence Reports */}
        <section id="free-reports" className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-emerald-400">Get Your Free Intelligence Report</span>
            </h2>
            <div className="bg-gradient-to-br from-emerald-950/50 to-[#0a0a0a] border border-emerald-800/50 rounded-xl p-8 md:p-12">
              <p className="text-2xl font-semibold text-emerald-400 mb-4">
                100% Free & Personalized
              </p>
              <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  Same-day delivery on most requests
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  Personalized analysis for your property
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  No payment required — just request it
                </li>
              </ul>
              <Button 
                onClick={scrollToForm}
                className="bg-emerald-500 hover:bg-emerald-600 text-foreground font-semibold px-8"
              >
                Request Your Free Report
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ & Disclaimers */}
        <section className="py-16 px-4 bg-[#111111]">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  q: "Is this an appraisal?",
                  a: "No. The Investor Snapshot is an informational analysis tool, not a licensed appraisal. It's designed to help you make faster, smarter investment decisions."
                },
                {
                  q: "How accurate are the rent and expense estimates?",
                  a: "We use current market data and local comps. However, always verify rent rolls and expenses with the seller or property manager before making an offer."
                },
                {
                  q: "Can you analyze properties outside New York?",
                  a: "Yes. While our expertise is NY-focused, we can provide Snapshots nationwide. For out-of-state properties, we'll connect you with a local agent if needed."
                },
                {
                  q: "How quickly will I receive my Snapshot?",
                  a: "Most Snapshots are delivered same-day during business hours. All reports are free and personalized."
                },
              ].map((faq, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm mt-12">
              Not investment advice. Always conduct your own due diligence. Referrals to local agents provided when appropriate.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <a 
              href="https://capitaldealdesk.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              capitaldealdesk.com
            </a>
            <p className="text-muted-foreground text-sm mt-2">
              A Capital District Nest product
            </p>
          </div>
        </footer>
      </div>

    </>
  );
};

export default DealDesk;
