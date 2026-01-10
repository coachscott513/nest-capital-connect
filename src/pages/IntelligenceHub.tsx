import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Search, FileText, BookOpen, Home, Send, TrendingUp, Shield, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const IntelligenceHub = () => {
  const [searchAddress, setSearchAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDueDiligenceSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAddress.trim()) {
      toast.error("Please enter a property address");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: "Due Diligence Request",
        email: "pending@duediligence.com",
        message: `Property address requested: ${searchAddress}`,
        type: "due_diligence",
        lead_type: "intelligence_search"
      });

      if (error) throw error;

      toast.success("Request submitted! We'll prepare your intelligence report.");
      setSearchAddress("");
    } catch (error) {
      console.error("Error submitting search:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const intelligenceTiles = [
    {
      icon: FileText,
      title: "Sample Intelligence Report",
      description: "See a full 36% yield underwriting analysis. This is the 'Big Time' data depth that justifies premium partnerships.",
      link: "/reports/sample-property-intelligence",
      cta: "View Sample Report",
      highlight: true
    },
    {
      icon: BookOpen,
      title: "Investor Guides",
      description: "PDF resources covering all 5 counties in the Capital District. Market trends, cap rates, and neighborhood breakdowns.",
      link: "/investor-tools",
      cta: "Browse Guides"
    },
    {
      icon: Home,
      title: "First-Time Buyer Help",
      description: "Specialized data for entry-level home seekers. School districts, commute times, and 'Nest Score' rankings.",
      link: "/first-time-buyers",
      cta: "Get Started"
    },
    {
      icon: Send,
      title: "Request Property Report",
      description: "Submit any address in the Capital District. We'll deliver a full intelligence report within 24 hours.",
      link: "/dealdesk",
      cta: "Request Report"
    }
  ];

  const stats = [
    { value: "42", label: "Towns Covered" },
    { value: "5", label: "Counties" },
    { value: "24hr", label: "Report Turnaround" },
    { value: "100%", label: "Data-Driven" }
  ];

  return (
    <>
      <Helmet>
        <title>Intelligence Hub | Capital District Nest</title>
        <meta name="description" content="Access institutional-grade real estate intelligence for the Capital District. Sample reports, investor guides, and due diligence tools." />
      </Helmet>

      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[11px] uppercase tracking-[0.5em] text-primary font-medium mb-6">
                Institutional Intelligence
              </p>
              <h1 className="text-4xl md:text-6xl font-[200] tracking-tight text-foreground mb-6">
                Due Diligence.
                <br />
                <span className="text-primary">Delivered.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto mb-12">
                Access the same data-driven insights used by institutional investors. 
                Every property. Every town. Every metric that matters.
              </p>

              {/* Due Diligence Search Bar */}
              <form onSubmit={handleDueDiligenceSearch} className="max-w-2xl mx-auto">
                <div className="relative flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter any property address for due diligence..."
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                      className="pl-12 pr-4 py-6 text-base bg-muted/50 border-border rounded-full focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {isSubmitting ? "Submitting..." : "Analyze"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Free preliminary analysis. Full reports available within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-8 border-y border-border/50 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-[200] text-primary">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intelligence Tiles */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground mb-4">
                  Resources
                </p>
                <h2 className="text-3xl md:text-4xl font-[200] text-foreground">
                  Your Intelligence Arsenal
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {intelligenceTiles.map((tile) => (
                  <Link
                    key={tile.title}
                    to={tile.link}
                    className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                      tile.highlight 
                        ? "border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/50" 
                        : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`p-3 rounded-xl ${tile.highlight ? "bg-primary/20" : "bg-muted"}`}>
                        <tile.icon className={`h-6 w-6 ${tile.highlight ? "text-primary" : "text-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                          {tile.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {tile.description}
                        </p>
                        <span className="text-primary text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          {tile.cta}
                          <span className="text-lg">→</span>
                        </span>
                      </div>
                    </div>
                    {tile.highlight && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/20 px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-[200] text-foreground mb-12">
                Why Institutional Investors Choose Us
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Yield Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Cap rates, cash-on-cash returns, and rent-to-price ratios for every property.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Tax liens, flood zones, environmental concerns, and title issues flagged.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Local Intel</h3>
                  <p className="text-sm text-muted-foreground">
                    Neighborhood trends, school ratings, and development pipeline data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-[11px] uppercase tracking-[0.4em] text-primary mb-4">
                Get Started
              </p>
              <h2 className="text-3xl md:text-4xl font-[200] text-foreground mb-6">
                Ready to Make Data-Driven Decisions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Request your first property intelligence report today. 
                Full analysis delivered within 24 hours.
              </p>
              <Link to="/dealdesk">
                <Button size="lg" className="rounded-full px-10">
                  Request Intelligence Report
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default IntelligenceHub;
