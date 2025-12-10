import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Bell, Building2, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SchenectadyMultiUnit = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("leads").insert({
        name: "Waitlist Signup",
        email: email,
        type: "schenectady-multi-unit-waitlist",
        message: "Interested in Schenectady Multi-Unit properties"
      });
      
      if (error) throw error;
      
      toast.success("You're on the list! We'll notify you when this page goes live.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Schenectady Multi-Unit Homes for Sale | Coming Soon</title>
        <meta name="description" content="Live duplex, triplex, and small apartment inventory in Schenectady County — updated daily. Perfect for BRRRR investors, first-time multi-unit buyers, and out-of-state capital." />
        <meta name="keywords" content="schenectady multi family homes for sale, schenectady duplex, schenectady triplex, schenectady investment property" />
        <link rel="canonical" href="https://capitaldistrictnest.com/schenectady-multi-unit" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Clock className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-playfair">
              Schenectady Multi-Unit Homes for Sale
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Live duplex, triplex, and small apartment inventory in Schenectady County — updated daily. 
              Perfect for BRRRR investors, first-time multi-unit buyers, and out-of-state capital.
            </p>

            {/* Waitlist Form */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmitting}>
                  <Bell className="w-4 h-4 mr-2" />
                  {isSubmitting ? "..." : "Notify Me"}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-3">
                Be the first to know when Schenectady multi-unit listings go live.
              </p>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-8">What You'll Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <Building2 className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Inventory</h3>
                <p className="text-sm text-muted-foreground">Updated every 15 minutes with new listings</p>
              </div>
              <div className="text-center p-6">
                <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Investor Reports</h3>
                <p className="text-sm text-muted-foreground">Cap rates, rent rolls, and cash flow analysis</p>
              </div>
              <div className="text-center p-6">
                <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Early Access</h3>
                <p className="text-sm text-muted-foreground">Get notified before anyone else</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-4">
              Looking for multi-units now?
            </p>
            <Button asChild size="lg">
              <a href="/albany-multi-unit">
                Browse Albany Multi-Units Instead
              </a>
            </Button>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default SchenectadyMultiUnit;
