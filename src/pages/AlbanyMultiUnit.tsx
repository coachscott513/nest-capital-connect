import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, TrendingUp, DollarSign, Wrench, Calculator, FileText, Percent, MapPin, Phone, Mail, CheckCircle, ExternalLink, MessageCircle, Check } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const IDX_URL = "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types[]=3&statuses[]=0&pak=county:g40_dre6kenh&sortby=listings.price+ASC&rtype=map";
const SCOTT_PHONE = "518-522-7265";
const SCOTT_PHONE_TEL = "+15185227265";

const AlbanyMultiUnit = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    investorType: "",
    priceRange: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email || "not provided",
        phone: formData.phone,
        type: "Investor – Albany Multi-Unit",
        message: `Investment Type: ${formData.investorType || "Not specified"}\nTarget Price Range: ${formData.priceRange || "Not specified"}`,
        location: "Albany",
        price_range: formData.priceRange || null
      });
      
      if (error) throw error;
      
      setIsSubmitted(true);
      toast.success("Got it! I'll text your custom list shortly.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const bulletPoints = [
    "BRRRR & value-add deals",
    "House hack opportunities",
    "Off-market alerts",
    "Fast rent-roll & expense analysis"
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>Albany Multi-Unit Homes for Sale | Duplexes, Triplexes & Cash-Flow Deals</title>
        <meta name="description" content="Get a weekly list of the best duplex, triplex, and 4-unit properties in Albany County — plus investor-style cash flow and rent roll breakdowns. Call or text Scott at 518-522-7265." />
        <meta name="keywords" content="albany multi family homes for sale, albany duplex for sale, albany triplex, albany investment property, albany county multi family" />
        <link rel="canonical" href="https://capitaldistrictnest.com/albany-multi-unit" />
      </Helmet>

      {/* Sticky Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground py-2 px-4 text-center">
        <a 
          href={`tel:${SCOTT_PHONE_TEL}`}
          className="inline-flex items-center gap-2 text-sm md:text-base font-medium hover:opacity-90 transition-opacity"
        >
          <Phone className="w-4 h-4" />
          <span>📞 Call or Text Scott — {SCOTT_PHONE}</span>
        </a>
      </div>

      <main className="flex-grow pt-10">
        {/* HERO + LEAD CAPTURE FORM */}
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-background to-primary/10">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png')] bg-cover bg-center opacity-10" />
          <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
            
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              {/* Left Column - Text */}
              <div className="text-center lg:text-left pt-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 font-playfair leading-tight">
                  Albany Multi-Unit & Cash-Flow Deals
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Get the weekly list of the best duplex, triplex, and 4-unit properties in Albany — plus simple cash-flow and rent-roll breakdowns.
                </p>
                
                {/* Bullet Points */}
                <ul className="space-y-3 mb-8 text-left mx-auto lg:mx-0 max-w-md">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Text Link */}
                <p className="text-muted-foreground">
                  Prefer to skip the form?{" "}
                  <a 
                    href={`sms:${SCOTT_PHONE_TEL}`}
                    className="text-primary font-semibold hover:underline"
                  >
                    Text Scott at {SCOTT_PHONE}
                  </a>
                </p>
                
                {/* Trust Indicators - Desktop Only */}
                <div className="hidden lg:flex flex-col gap-3 mt-10 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Why investors trust us:</p>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>500+ properties analyzed weekly</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>RE/MAX licensed • Capital District expert</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">
                {isSubmitted ? (
                  /* Success State */
                  <div className="text-center py-4">
                    <CheckCircle className="w-14 h-14 text-primary mx-auto mb-5" />
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-playfair">
                      Thanks — I'll text your list shortly.
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      In the meantime, browse current listings:
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 mb-4"
                      asChild
                    >
                      <a href={IDX_URL} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        View Current Albany Multi-Unit Listings
                      </a>
                    </Button>
                    <p className="text-muted-foreground">
                      Or call/text Scott now:{" "}
                      <a href={`tel:${SCOTT_PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                        {SCOTT_PHONE}
                      </a>
                    </p>
                  </div>
                ) : (
                  /* Form */
                  <>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 font-playfair text-center lg:text-left">
                      Get Your Custom Deal List
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6 text-center lg:text-left">
                      No spam — just quality multi-unit opportunities texted to you.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                        <Input 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                          className="bg-background"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                        <Input 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(518) 555-1234"
                          required
                          className="bg-background"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <Input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@email.com"
                          className="bg-background"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">What type of multi-unit are you targeting?</label>
                        <Select value={formData.investorType} onValueChange={(value) => setFormData({ ...formData, investorType: value })}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border z-50">
                            <SelectItem value="2-4-units">2–4 Units</SelectItem>
                            <SelectItem value="house-hack">House Hack</SelectItem>
                            <SelectItem value="brrrr">BRRRR</SelectItem>
                            <SelectItem value="1031-exchange">1031 Exchange</SelectItem>
                            <SelectItem value="just-looking">Just Looking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Target Price Range</label>
                        <Select value={formData.priceRange} onValueChange={(value) => setFormData({ ...formData, priceRange: value })}>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border border-border z-50">
                            <SelectItem value="under-150k">Under $150k</SelectItem>
                            <SelectItem value="150k-250k">$150k – $250k</SelectItem>
                            <SelectItem value="250k-400k">$250k – $400k</SelectItem>
                            <SelectItem value="400k-600k">$400k – $600k</SelectItem>
                            <SelectItem value="600k-plus">$600k+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 font-semibold mt-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Me the Deals"}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        I'll text you personally — no bots, no spam.
                      </p>
                    </form>
                  </>
                )}
              </div>
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
                <a href={IDX_URL} target="_blank" rel="noopener noreferrer">
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

        {/* BLOCK 5 — NEIGHBORHOODS */}
        <section className="py-20 bg-background">
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
                <div key={index} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{neighborhood}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLOCK 6 — FAQ SECTION */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Are multi-family homes in Albany a good investment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — Albany offers consistent rental demand, strong rent appreciation, and excellent value relative to larger NY markets. The state capital employment base provides stability that many other markets lack.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-background border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  What cap rate can I expect?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Most stabilized 2–4 unit buildings produce 7–10% cap rates. Value-add deals can reach 10–14% after repositioning with market-rate rents and strategic improvements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-background border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Can you provide cash-flow analysis before making an offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — every property gets a full rent roll, P&L, DSCR evaluation, and ROI projection. We provide investor-grade analysis so you can make data-driven decisions before committing.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-background border border-border rounded-xl px-6">
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

        {/* BLOCK 7 — FINAL CTA */}
        <section id="investor-report-cta" className="py-20 bg-primary/10 border-t border-border">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
              Get a Free Investor Report
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Receive a custom rent roll, cash-flow projection, rehab estimate (if needed), and ROI analysis for any property you're considering.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <a href={`tel:${SCOTT_PHONE_TEL}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call {SCOTT_PHONE}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <a href={`sms:${SCOTT_PHONE_TEL}`}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Text Scott
                </a>
              </Button>
            </div>
            <p className="text-muted-foreground">
              or email:{" "}
              <a href="mailto:scott@capitaldistrictnest.com" className="text-primary hover:underline">
                scott@capitaldistrictnest.com
              </a>
            </p>
          </div>
        </section>
      </main>
      
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-background/95 backdrop-blur-sm border-t border-border z-40">
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3"
            asChild
          >
            <a href={`tel:${SCOTT_PHONE_TEL}`}>
              <Phone className="w-4 h-4 mr-1" />
              Call
            </a>
          </Button>
          <Button 
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3"
            asChild
          >
            <a href={`sms:${SCOTT_PHONE_TEL}`}>
              <MessageCircle className="w-4 h-4 mr-1" />
              Text
            </a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbanyMultiUnit;
