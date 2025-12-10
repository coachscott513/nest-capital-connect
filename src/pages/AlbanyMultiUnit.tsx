import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Building2, TrendingUp, DollarSign, Wrench, Calculator, FileText, Percent, MapPin, Phone, Mail, CheckCircle, ExternalLink, MessageCircle, Check, Crown, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const IDX_URL = "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types[]=3&statuses[]=0&pak=county:g40_dre6kenh&sortby=listings.price+ASC&rtype=map";
const SCOTT_PHONE = "518-676-2347";
const SCOTT_PHONE_TEL = "+15186762347";

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
        <title>Albany Multi-Unit Market Report | 10–14% Cap Rates | Cash-Flow Deals</title>
        <meta name="description" content="Albany multi-unit investing: Real 10–14% cap rates, 15–30% cash-on-cash returns, $600–$1,800/mo net cash flow. Duplexes, triplexes & 4-units. Call Scott at 518-676-2347." />
        <meta name="keywords" content="albany multi family homes for sale, albany duplex for sale, albany triplex, albany investment property, albany county multi family, albany cap rate, albany cash flow" />
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
                  Albany Multi-Unit Market Report
                </h1>
                <p className="text-lg md:text-xl text-primary font-semibold mb-4">
                  Real 10–14% Cap Rates • 15–30% Cash-on-Cash Returns • Affordable Entry Prices
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Albany is one of the last remaining markets in the Northeast where investors can still buy multi-unit buildings that cash flow on Day 1 while delivering double-digit returns with manageable risk.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Demand remains stable from government employment, universities, hospitals, and long-term renters — creating an extremely reliable investment environment completely different from NYC, NJ, CT, or Boston.
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
                
                {/* Highlighted Phone Contact Block */}
                <div 
                  className="mt-6 mb-4 p-3 rounded-md mx-auto lg:mx-0 max-w-md"
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

        {/* WHY INVESTORS ARE MOVING CAPITAL TO ALBANY */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Why Investors Are Moving Their Capital to Albany
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Percent,
                  title: "10–14% Cap Rates (Real, Not Theoretical)",
                  description: "Well-underwritten buildings commonly deliver double-digit cap rates — extremely rare in coastal markets."
                },
                {
                  icon: TrendingUp,
                  title: "15–30% Cash-on-Cash Returns",
                  description: "With moderate purchase prices and strong rents, Albany multi-units routinely outperform downstate markets by 4–6×."
                },
                {
                  icon: DollarSign,
                  title: "Affordable Entry Prices",
                  description: "Duplexes: $220K–$300K • Triplexes: $260K–$360K • Fourplexes: $300K–$450K. Compared to NYC at $1M–$1.7M for similar buildings."
                },
                {
                  icon: Building2,
                  title: "Stable Tenant Demand",
                  description: "Anchored by State government, University at Albany & St. Rose, Albany Med & St. Peter's, Tech and bioscience sectors."
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

        {/* NYC → ALBANY ROI COMPARISON TABLE */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 font-playfair">
              NYC → Albany ROI Comparison
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Investors from NYC, NJ, CT, and Boston are shifting their buying power here for these exact reasons.
            </p>
            <div className="overflow-x-auto max-w-5xl mx-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Metric</th>
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">Albany Multi-Unit</th>
                    <th className="border border-border px-4 py-3 text-left text-foreground font-semibold">NYC Multi-Unit</th>
                    <th className="border border-border px-4 py-3 text-left text-primary font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-background">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Cap Rate</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">10–14%</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">2–4%</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">+8–10%</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Cash-on-Cash</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">15–30%</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">-5% to 5%</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">+20–35%</td>
                  </tr>
                  <tr className="bg-background">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Typical 3-Family Price</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">$260K–$360K</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">$1M–$1.7M</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Albany 70–80% cheaper</td>
                  </tr>
                  <tr className="bg-card">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Net Monthly Cash Flow</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">$600–$1,800</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">Negative–marginal</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Albany wins</td>
                  </tr>
                  <tr className="bg-background">
                    <td className="border border-border px-4 py-3 text-foreground font-medium">Property Taxes</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">Moderate</td>
                    <td className="border border-border px-4 py-3 text-muted-foreground">Very high</td>
                    <td className="border border-border px-4 py-3 text-primary font-semibold">+$8K–$15K savings</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* HOW TO KNOW IF A MULTI-UNIT IS A GOOD DEAL */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              How to Know If a Multi-Unit Is a Good Deal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: FileText,
                  title: "True Rent Roll vs. Market Rent",
                  description: "Many Albany buildings are under-rented. Market-adjusted rents alone can increase returns 20–40%."
                },
                {
                  icon: Calculator,
                  title: "Tax, Water, Sewer, Heating Audit",
                  description: "Listings often hide inefficiencies — we verify the real numbers."
                },
                {
                  icon: Wrench,
                  title: "CapEx & Renovation Budget",
                  description: "Small improvements can dramatically raise NOI and asset value."
                },
                {
                  icon: MapPin,
                  title: "Neighborhood-Level Sales Comps",
                  description: "Every neighborhood behaves differently — we analyze hyper-local data."
                }
              ].map((item, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FREE MULTI-UNIT INTELLIGENCE REPORT */}
        <section className="py-20 bg-primary/10 border-y border-border">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
              FREE Multi-Unit Intelligence Report
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Paste any property address — or Zillow link — and get a full investor-grade breakdown:
            </p>
            <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
              {[
                "Cap Rate (10–14% typical)",
                "Cash-on-Cash (15–30% typical)",
                "Rent Roll & Market Rent",
                "Tax & Utility Audit",
                "5-Year Projection"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-6">
              Free. No obligation. Real numbers — not guesses.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              asChild
            >
              <a href={`sms:${SCOTT_PHONE_TEL}`}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Text any address to {SCOTT_PHONE}
              </a>
            </Button>
          </div>
        </section>

        {/* RECENT ALBANY MULTI-UNIT DEALS WE ANALYZED */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4 font-playfair">
              Recent Albany Multi-Unit Deals We Analyzed
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              These are real examples of what investors achieve here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  location: "Pine Hills — 3-Family",
                  purchase: "$285,000",
                  rentRoll: "$3,150/mo",
                  capRate: "11.6%",
                  coc: "22%"
                },
                {
                  location: "Washington Ave Corridor — 4-Family",
                  purchase: "$325,000",
                  rentRoll: "$3,900/mo (projected)",
                  capRate: "12.4%",
                  coc: "28%"
                },
                {
                  location: "Schenectady — Duplex",
                  purchase: "$235,000",
                  rentRoll: "$2,400/mo",
                  capRate: "13.2%",
                  coc: "30%"
                }
              ].map((deal, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEST ALBANY NEIGHBORHOODS */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Best Albany Neighborhoods for Multi-Unit Investing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Pine Hills",
                  description: "High demand from university renters. Strong rent velocity."
                },
                {
                  name: "Center Square / Washington Park",
                  description: "Historic buildings, high appreciation, premium rents."
                },
                {
                  name: "Mansion District",
                  description: "Active redevelopment and long-term upside."
                },
                {
                  name: "Upper Washington Ave Corridor",
                  description: "Strong professional/graduate student renter base."
                },
                {
                  name: "Schenectady / Rotterdam Adjacent",
                  description: "Lower prices, excellent cash flow potential."
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
                VIP Investor Access (Off-Market + Pre-Market Deals)
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get early access to multi-families before Zillow or the MLS.
              </p>
              <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
                {[
                  "Verified rent rolls",
                  "True cap rate + cash flow",
                  "Heat, water, and tax audits",
                  "Off-market & pocket listings",
                  "Full P&L modeling"
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
              <p className="text-muted-foreground mt-4 text-sm">
                Receive weekly curated deals.
              </p>
            </div>
          </div>
        </section>

        {/* STRATEGY CALL CTA */}
        <section className="py-20 bg-card border-y border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
                  Schedule a 10-Minute Multi-Unit Strategy Call
                </h2>
                <p className="text-muted-foreground mb-6">
                  Talk directly with a Capital District investment specialist.
                </p>
                <p className="text-foreground font-medium mb-4">Ask about:</p>
                <ul className="space-y-2 mb-8">
                  {[
                    "Duplex/Triplex/Fourplex analysis",
                    "Neighborhood risk profiles",
                    "Cash flow projections",
                    "Turnkey vs. value-add",
                    "DSCR, FHA, and portfolio financing",
                    "Off-market opportunities"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background border border-border rounded-xl p-8 text-center">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Ready to Talk?</h3>
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
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
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg py-6"
                    asChild
                  >
                    <a href={`sms:${SCOTT_PHONE_TEL}`}>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Text Scott
                    </a>
                  </Button>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Schedule a call anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 font-playfair">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Do Albany multi-units actually cash flow?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — Albany is one of the few Northeast markets consistently delivering <strong className="text-primary">10–14% cap rates</strong> and <strong className="text-primary">15–30% cash-on-cash returns</strong>.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Are off-market deals available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes. VIP buyers receive them weekly.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Can you help analyze a deal?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Absolutely — this is our specialty. Text any address to {SCOTT_PHONE} for a free investor-grade analysis.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Is Albany stable long-term?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes. Government, universities, and healthcare anchor the rental market with extremely stable tenant demand.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5" className="bg-card border border-border rounded-xl px-6">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  Can out-of-state investors buy here?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  Yes — many of our clients invest remotely. We handle the local due diligence, property analysis, and coordination.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
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
