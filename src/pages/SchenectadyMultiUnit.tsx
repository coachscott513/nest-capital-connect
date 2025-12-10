import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, DollarSign, Users, MapPin, Phone, CheckCircle, ExternalLink, MessageCircle, Check, Crown, Percent } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const IDX_URL = "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady&min=0&max=100000000&beds=0&baths=0&types[]=3&statuses[]=0&sortby=listings.price+ASC&rtype=map";
const SCOTT_PHONE = "518-676-2347";
const SCOTT_PHONE_TEL = "+15186762347";

const SchenectadyMultiUnit = () => {
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
        type: "Investor – Schenectady Multi-Unit",
        message: `Investment Type: ${formData.investorType || "Not specified"}\nTarget Price Range: ${formData.priceRange || "Not specified"}`,
        location: "Schenectady",
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

  return (
    <MainLayout>
      <Helmet>
        <title>Schenectady Multi-Unit Market Report | 11–14% Cap Rates | Best Entry-Level ROI</title>
        <meta name="description" content="Schenectady multi-unit investing: Real 11–14% cap rates, 20–30% cash-on-cash returns. Highest ROI market in the Capital District. Call Scott at 518-676-2347." />
        <meta name="keywords" content="schenectady multi family homes for sale, schenectady duplex for sale, schenectady triplex, schenectady investment property, schenectady cap rate" />
        <link rel="canonical" href="https://capitaldistrictnest.com/schenectady-multi-unit" />
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
                  Schenectady Multi-Unit Market Report
                </h1>
                <p className="text-lg md:text-xl text-primary font-semibold mb-2">
                  Real 11–14% Cap Rates • 20–30% Cash-on-Cash Returns
                </p>
                <p className="text-lg text-primary font-semibold mb-4">
                  Highest ROI Market in the Capital District
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Schenectady offers some of the strongest investment performance in the entire Northeast. Lower acquisition prices combined with strong rental demand create exceptional cash flow opportunities.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Ideal for first-time investors and BRRRR buyers looking for maximum returns.
                </p>
                
                {/* Highlighted Phone Contact Block */}
                <div 
                  className="mt-6 mb-6 p-3 rounded-md mx-auto lg:mx-0 max-w-md"
                  style={{ backgroundColor: '#dff7df' }}
                >
                  <p className="text-center lg:text-left" style={{ color: '#000' }}>
                    <span className="font-bold">Call/Text Scott directly: </span>
                    <a 
                      href={`tel:${SCOTT_PHONE_TEL}`}
                      className="font-bold hover:underline"
                      style={{ color: '#000' }}
                    >
                      {SCOTT_PHONE}
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">
                {isSubmitted ? (
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
                        View Current Schenectady Multi-Unit Listings
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
                  <>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 font-playfair text-center lg:text-left">
                      Get Your Custom Deal List
                    </h2>
                    <p className="text-muted-foreground text-sm mb-6 text-center lg:text-left">
                      No spam — just quality Schenectady multi-unit opportunities texted to you.
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

        {/* WHY INVESTORS ARE TARGETING SCHENECTADY */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Why Investors Are Targeting Schenectady
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Percent,
                  title: "11–14% Cap Rates (Best in the Region)",
                  description: "High rent-to-price ratios drive reliable and consistent returns."
                },
                {
                  icon: TrendingUp,
                  title: "20–30% Cash-on-Cash Returns",
                  description: "ROI that outperforms Albany & Troy by 4–10% on average."
                },
                {
                  icon: DollarSign,
                  title: "Affordable Entry Prices",
                  description: "Duplex: $200K–$260K • Triplex: $230K–$300K • Fourplex: $275K–$350K+"
                },
                {
                  icon: Users,
                  title: "Strong Rent Demand",
                  description: "Driven by Ellis Hospital, Union College, GE & Tech Corridor, and long-term tenant populations."
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

        {/* NYC → SCHENECTADY ROI COMPARISON TABLE */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 font-playfair">
              NYC → Schenectady ROI Comparison
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Schenectady delivers some of the highest ROI in the entire Northeast.
            </p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Metric</th>
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Schenectady</th>
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">NYC</th>
                    <th className="border border-border px-4 py-3 text-left text-primary font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-background">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Cap Rate</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">11–14%</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">2–4%</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Schenectady +8–10%</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Cash-on-Cash</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">20–30%</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">-5% to +5%</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Schenectady +25–35%</td>
                  </tr>
                  <tr className="bg-background">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Duplex Price</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">$200K–$260K</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">$800K–$1.1M</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Schenectady 75% cheaper</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Cash Flow</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">$600–$1,800/mo</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">Often negative</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Clear winner</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RECENT SCHENECTADY DEALS WE ANALYZED */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 font-playfair">
              Recent Schenectady Deals We Analyzed
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              Real examples of what investors achieve in Schenectady.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  location: "Mont Pleasant — Duplex",
                  purchase: "$235,000",
                  rentRoll: "$2,400/mo",
                  capRate: "13.2%",
                  coc: "30%"
                },
                {
                  location: "Union College Zone — Triplex",
                  purchase: "$285,000",
                  rentRoll: "$3,300/mo",
                  capRate: "12.8%",
                  coc: "24%"
                },
                {
                  location: "Downtown — 4-Unit",
                  purchase: "$310,000",
                  rentRoll: "$3,800/mo",
                  capRate: "12.0%",
                  coc: "20%"
                }
              ].map((deal, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4">{deal.location}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Purchase:</span>
                        <span className="text-foreground font-medium">{deal.purchase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rent Roll:</span>
                        <span className="text-foreground font-medium">{deal.rentRoll}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cap Rate:</span>
                        <span className="text-primary font-semibold">{deal.capRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cash-on-Cash:</span>
                        <span className="text-primary font-semibold">{deal.coc}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* BEST SCHENECTADY NEIGHBORHOODS */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Best Schenectady Neighborhoods for Investors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Union College / GE Zone",
                  description: "Premium tenants + consistent demand."
                },
                {
                  name: "Downtown / Jay Street",
                  description: "Walkable urban core, strong appreciation."
                },
                {
                  name: "Mont Pleasant / Hamilton Hill",
                  description: "Highest cash flow in the area — BRRRR-friendly."
                },
                {
                  name: "Rotterdam Adjacent",
                  description: "Low taxes + suburban demand."
                }
              ].map((neighborhood, index) => (
                <div key={index} className="bg-background border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{neighborhood.name}</h3>
                      <p className="text-muted-foreground text-sm">{neighborhood.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VIP INVESTOR ACCESS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
                VIP Investor Access — Schenectady Deals
              </h2>
              <p className="text-foreground mb-4">VIP Members get:</p>
              <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
                {[
                  "Off-market multi-units",
                  "Rent verification",
                  "Full P&L modeling",
                  "Value-add analysis",
                  "5-year projections",
                  "BRRRR-ready opportunities"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                asChild
              >
                <a href="/vip-buyer-access">
                  <Crown className="w-5 h-5 mr-2" />
                  Join VIP Multi-Unit Buyers
                </a>
              </Button>
              
              <p className="text-foreground mt-6">
                <span className="font-semibold">Call/Text Scott: </span>
                <a href={`tel:${SCOTT_PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                  {SCOTT_PHONE}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* FREE SCHENECTADY MULTI-UNIT INTELLIGENCE REPORT */}
        <section className="py-20 bg-primary/10 border-y border-border">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
              Free Schenectady Multi-Unit Intelligence Report
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Paste any Schenectady property address and receive:
            </p>
            <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
              {[
                "Cap Rate (11–14%)",
                "Cash-on-Cash ROI (20–30%)",
                "Market rent projections",
                "Utility & expense verification",
                "5-year investment model"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              asChild
            >
              <a href={`sms:${SCOTT_PHONE_TEL}`}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Text any property: {SCOTT_PHONE}
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Schenectady FAQ
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Why is ROI highest here?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Lower entry prices + stable rents = unmatched cash flow.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Good for first-time investors?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  One of the best beginner-friendly markets in the Northeast.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Is the city improving?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — GE, Union College, downtown revitalization continue to push rents upward.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default SchenectadyMultiUnit;
