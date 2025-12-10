import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, TrendingUp, DollarSign, Wrench, Calculator, FileText, Percent, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AlbanyMultiUnit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: "albany-multi-unit",
        message: `Property Type: ${formData.propertyType}\n\n${formData.message}`
      });
      
      if (error) throw error;
      
      toast.success("Report request sent! We'll be in touch within 24 hours.");
      setFormData({ name: "", email: "", phone: "", propertyType: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("investor-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Albany NY Multi-Family Homes for Sale | Duplexes, Triplexes & Investment Properties</title>
        <meta name="description" content="Updated daily. Live inventory for duplexes, triplexes, and income-producing multi-family properties in Albany County — ideal for investors, house hackers, and BRRRR buyers." />
        <meta name="keywords" content="albany multi family homes for sale, albany duplex for sale, albany triplex, albany investment property, albany county multi family" />
        <link rel="canonical" href="https://capitaldistrictnest.com/albany-multi-unit" />
      </Helmet>

      <main className="flex-grow">
        {/* BLOCK 1 — HERO SECTION */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png')] bg-cover bg-center opacity-20" />
          <div className="relative z-10 container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-playfair">
              Albany Multi-Unit Homes for Sale (Duplex, Triplex & 4-Units)
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Real-time inventory for Albany County investors. Updated every 15 minutes. 
              Clean numbers, cap rate breakdowns, and investor-ready insights powered by the Capital District Nest Team at RE/MAX.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <a href="https://scottjalvarez.boldtrail.com/results-gallery/?office=RENY03&propertytype=RES&minunits=2&status=1&searchtype=city&city=Albany&county=Albany" target="_blank" rel="noopener noreferrer">
                  View Multi-Family Listings
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                onClick={scrollToForm}
              >
                Request Albany Investor Report
              </Button>
            </div>
          </div>
        </section>

        {/* BLOCK 2 — IDX SEARCH BLOCK */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
              Search Albany Multi-Family Listings
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse all 2–4 unit properties currently listed for sale in Albany County.
            </p>
            <div className="bg-background/50 border border-border rounded-xl p-8 max-w-4xl mx-auto">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6"
                asChild
              >
                <a href="https://scottjalvarez.boldtrail.com/results-gallery/?office=RENY03&propertytype=RES&minunits=2&status=1&searchtype=city&city=Albany&county=Albany" target="_blank" rel="noopener noreferrer">
                  Open Full IDX Search →
                </a>
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Powered by RE/MAX Capital • Updated Every 15 Minutes
              </p>
            </div>
          </div>
        </section>

        {/* BLOCK 3 — MARKET REASONS SECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Why Investors Choose Albany
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Building2,
                  title: "Stable Rental Demand",
                  description: "Albany's tenant base is driven by state government, universities, and major medical employers — providing long-term rental stability."
                },
                {
                  icon: TrendingUp,
                  title: "Strong Cash Flow Potential",
                  description: "Duplexes and triplexes in neighborhoods like Pine Hills, Center Square, and New Scotland Ave deliver strong rent premiums and low vacancy."
                },
                {
                  icon: DollarSign,
                  title: "Affordable Entry Point",
                  description: "Compared to downstate markets, Albany offers lower acquisition costs with higher ROI potential and rising rents."
                },
                {
                  icon: Wrench,
                  title: "Value-Add Opportunities",
                  description: "Many Albany properties are under-market rented, making them ideal BRRRR candidates or cash-flow repositioning plays."
                }
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 4 — INVESTOR TOOLS SECTION */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Free Investor Tools Included With Every Albany Property
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Calculator,
                  title: "Cash Flow & Cap Rate Analysis",
                  description: "We calculate realistic income, expenses, NOI, cap rate, and cash-on-cash return — before you buy."
                },
                {
                  icon: FileText,
                  title: "Rent Roll Evaluation",
                  description: "Get side-by-side comparisons of actual vs. market rents with vacancy assumptions and local rent trends."
                },
                {
                  icon: Percent,
                  title: "Financing Optimization",
                  description: "Whether FHA 2–4 unit, DSCR, or portfolio loans — we model financing options to maximize ROI with minimal cash-to-close."
                }
              ].map((item, index) => (
                <div key={index} className="bg-background border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 5 — CALLOUT CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl md:text-2xl text-foreground mb-6 max-w-3xl mx-auto">
              Want the numbers on any Albany property?<br />
              <span className="text-muted-foreground">Get a full cash-flow breakdown, rent roll, and cap-rate analysis delivered directly to your inbox.</span>
            </p>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6"
              onClick={scrollToForm}
            >
              Send My Albany Investor Report
            </Button>
          </div>
        </section>

        {/* BLOCK 6 — LEAD FORM BLOCK */}
        <section id="investor-form" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 font-playfair">
              Get Your Personal Albany Investor Report
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Includes rent roll, P&L, cap rate, financing options, and off-market opportunities.
            </p>
            
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <Input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(518) 555-1234"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Types</label>
                <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="triplex">Triplex</SelectItem>
                    <SelectItem value="fourplex">Fourplex</SelectItem>
                    <SelectItem value="5plus">5+ Units</SelectItem>
                    <SelectItem value="brrrr">BRRRR Deals</SelectItem>
                    <SelectItem value="any">Any Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tell us what you're looking for</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Budget, neighborhoods, investment goals..."
                  rows={4}
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send My Report"}
              </Button>
            </form>
          </div>
        </section>

        {/* BLOCK 7 — NEIGHBORHOODS */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Top Albany Multi-Family Neighborhoods
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                "Pine Hills",
                "Center Square",
                "Sheridan Hollow",
                "Mansion District",
                "New Scotland Ave Corridor",
                "South End",
                "West Hill",
                "Arbor Hill"
              ].map((neighborhood, index) => (
                <div key={index} className="flex items-center gap-3 bg-background border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 8 — FAQ SECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Are multi-family homes in Albany a good investment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — Albany offers consistent rental demand, strong rent appreciation, and excellent value relative to larger NY markets. The state capital employment base provides stability that many other markets lack.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  What cap rate can I expect?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Most stabilized 2–4 unit buildings produce 7–10% cap rates. Value-add deals can reach 10–14% after repositioning with market-rate rents and strategic improvements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Can you provide cash-flow analysis before making an offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — every property gets a full rent roll, P&L, DSCR evaluation, and ROI projection. We provide investor-grade analysis so you can make data-driven decisions before committing.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Do you have off-market multi-family deals?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes. We analyze 500+ properties per week and send qualified buyers off-market opportunities before they hit the MLS. Join our VIP list to get early access.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* BLOCK 9 — FINAL CTA SECTION */}
        <section className="py-20 bg-primary/10 border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 font-playfair">
              Ready to Analyze Properties Like an Investor?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <a href="https://scottjalvarez.boldtrail.com/results-gallery/?office=RENY03&propertytype=RES&minunits=2&status=1&searchtype=city&city=Albany&county=Albany" target="_blank" rel="noopener noreferrer">
                  View Multi-Family Homes
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                onClick={scrollToForm}
              >
                Get Investor Report
              </Button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
              <a href="tel:+15186762347" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                (518) 676-2347
              </a>
              <a href="mailto:scott@capitaldistrictnest.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                scott@capitaldistrictnest.com
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border z-40">
        <Button 
          onClick={scrollToForm}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4"
        >
          Request Investor Report
        </Button>
      </div>
    </MainLayout>
  );
};

export default AlbanyMultiUnit;
