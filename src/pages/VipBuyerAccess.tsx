import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Check,
  Phone,
  Home,
  Building,
  FileText,
  Shield,
  MapPin,
  DollarSign,
  TrendingUp,
  User,
  MessageCircle
} from 'lucide-react';

const SCOTT_PHONE = "518-671-8048";
const SCOTT_PHONE_TEL = "+15186718048";

const VipBuyerAccess = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lookingFor: [] as string[],
    priceRange: '',
    preferredCities: [] as string[],
    timeline: ''
  });

  const scrollToForm = () => {
    document.getElementById('vip-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCityToggle = (city: string) => {
    setFormData(prev => ({
      ...prev,
      preferredCities: prev.preferredCities.includes(city)
        ? prev.preferredCities.filter(c => c !== city)
        : [...prev.preferredCities, city]
    }));
  };

  const handlePropertyTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(type)
        ? prev.lookingFor.filter(t => t !== type)
        : [...prev.lookingFor, type]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please enter your phone and email.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `VIP Investor Request\n\nLooking for: ${formData.lookingFor.join(', ')}\nPrice Range: ${formData.priceRange}\nPreferred Cities: ${formData.preferredCities.join(', ')}\nTimeline: ${formData.timeline}`,
          type: 'vip-investor',
          location: formData.preferredCities.join(', '),
          price_range: formData.priceRange
        }
      });

      if (error) throw error;

      toast({
        title: "Welcome to VIP Access!",
        description: "You'll receive deals within 24 hours or sooner.",
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        lookingFor: [],
        priceRange: '',
        preferredCities: [],
        timeline: ''
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const vipBenefits = [
    "Off-market & pre-market multi-unit deals",
    "Fully verified financials (rent, taxes, utilities, expenses)",
    "Neighborhood-level risk & ROI analysis",
    "Investor-grade P&L + 5-year projection",
    "Direct access to a specialist (no bots, no gatekeepers)"
  ];

  const whoItsFor = [
    "An NYC / NJ / CT investor looking for higher returns",
    "A first-time investor wanting expert guidance",
    "A serious buyer seeking 10–14% cap rates",
    "Someone tired of negative or break-even cash flow",
    "An investor who wants clear, accurate, transparent numbers",
    "Anyone ready to build a rental portfolio in Albany, Troy, or Schenectady"
  ];

  const whatYouGet = [
    {
      number: "1",
      title: "Off-Market & Pocket Listings",
      description: "Deals you won't find on Zillow, Realtor, or Redfin."
    },
    {
      number: "2",
      title: "Full P&L on Every Property",
      description: "You receive a real investor breakdown:",
      bullets: [
        "Cap rate (verified, not listing fluff)",
        "Cash-on-cash return",
        "NOI & expenses",
        "Market rent vs. current rent gaps"
      ]
    },
    {
      number: "3",
      title: "Tax & Utility Audit",
      description: "We verify:",
      bullets: [
        "Water & sewer",
        "Heat type & cost",
        "Taxes",
        "Insurance estimates"
      ],
      note: "This is the difference between a winner and a time bomb."
    },
    {
      number: "4",
      title: "Neighborhood Risk Profile",
      description: "Each property includes a summarized risk score for:",
      bullets: [
        "Tenant quality",
        "Rent stability",
        "Appreciation potential",
        "Renovation needs"
      ]
    },
    {
      number: "5",
      title: "Direct Access to an Expert",
      description: "You'll work directly with:",
      expert: {
        name: "Scott Alvarez",
        credentials: "Economics Degree, Investment Specialist",
        phone: SCOTT_PHONE
      }
    }
  ];

  const sampleDeals = [
    {
      location: "Albany – 3-Family (Under-rented)",
      price: "$285,000",
      rentRoll: "$3,150/mo",
      capRate: "11.6%",
      coc: "22%"
    },
    {
      location: "Troy – 4-Unit (Turnkey)",
      price: "$315,000",
      rentRoll: "$3,600/mo",
      capRate: "12.3%",
      coc: "19%",
      note: "Strong tenant base near RPI."
    },
    {
      location: "Schenectady – Duplex (High ROI)",
      price: "$235,000",
      rentRoll: "$2,400/mo",
      capRate: "13.2%",
      coc: "30%",
      note: "Best entry-level returns in the region."
    }
  ];

  const cityProfiles = [
    {
      name: "Albany",
      description: "Government, healthcare, colleges. Extremely stable renters.",
      highlight: "10–14% cap rates typical."
    },
    {
      name: "Troy",
      description: "RPI influence + redevelopment boom.",
      highlight: "Great for 3–4 units with strong appreciation."
    },
    {
      name: "Schenectady",
      description: "Best entry-level ROI in the region.",
      highlight: "Cash-on-cash 20–30% common."
    }
  ];

  const propertyTypes = [
    "Multi-unit (Duplex, 3–4 unit)",
    "Single-family rentals",
    "Fix & Flip",
    "BRRRR",
    "Turnkey rentals"
  ];

  const cities = ['Albany', 'Troy', 'Schenectady', 'Saratoga', 'Clifton Park'];

  return (
    <MainLayout>
      <Helmet>
        <title>VIP Investor Access | Off-Market Deals | Capital District Nest</title>
        <meta name="description" content="VIP investor access to off-market multi-unit deals in Albany, Troy, Schenectady & Saratoga. Get 10–14% cap rates, 15–30% cash-on-cash returns. Full P&L reports included." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-playfair">
            VIP Investor Access
          </h1>
          <p className="text-lg md:text-xl text-primary font-semibold mb-4">
            Off-Market Deals • Full P&L Reports • 10–14% Cap Rates • 15–30% Cash-on-Cash
          </p>
          <p className="text-muted-foreground mb-6">
            Albany • Troy • Schenectady • Saratoga
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Most great investment properties in the Capital District never hit Zillow or the MLS. They sell privately — to prepared buyers with the right team behind them.
          </p>
          
          {/* What you get */}
          <div className="bg-card/80 border border-border rounded-xl p-6 md:p-8 mb-8 max-w-2xl mx-auto text-left">
            <p className="text-foreground font-semibold mb-4 text-center">This VIP Access page gives you:</p>
            <ul className="space-y-3">
              {vipBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="text-primary font-semibold mt-6 text-center">
              Free. Fast. No pressure. Real numbers — not guesses.
            </p>
          </div>
          
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold rounded-full shadow-xl shadow-primary/30"
          >
            Get VIP Access
          </Button>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 font-playfair">
            🌎 Who This Is For
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            This works best if you are:
          </p>
          <div className="max-w-2xl mx-auto">
            <ul className="space-y-4">
              {whoItsFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center">
              <p className="text-foreground font-semibold">
                If that's you — this is your new home base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get as a VIP Investor */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-playfair">
            📈 What You Get as a VIP Investor
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {whatYouGet.map((item, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold">{item.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      {item.bullets && (
                        <ul className="space-y-2 mb-3">
                          {item.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-center gap-2 text-foreground text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.note && (
                        <p className="text-primary font-semibold text-sm italic">{item.note}</p>
                      )}
                      {item.expert && (
                        <div className="bg-primary/10 rounded-lg p-4 mt-3">
                          <p className="text-foreground font-semibold">{item.expert.name}</p>
                          <p className="text-muted-foreground text-sm">{item.expert.credentials}</p>
                          <a href={`tel:${SCOTT_PHONE_TEL}`} className="text-primary font-semibold hover:underline">
                            Call/text anytime: {item.expert.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Form Section */}
      <section id="vip-form" className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
                🔒 VIP Investor Intake Form
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell me what you want — I'll send you deals that match exactly.
              </p>
            </div>

            <Card className="bg-card border-primary/20 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="mt-1.5 bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="you@email.com"
                      required
                      className="mt-1.5 bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone <span className="text-destructive">*</span></Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(518) 555-1234"
                      required
                      className="mt-1.5 bg-background border-border"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-3 block">What type of properties are you looking for?</Label>
                    <div className="space-y-3">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={formData.lookingFor.includes(type)}
                            onCheckedChange={() => handlePropertyTypeToggle(type)}
                          />
                          <label htmlFor={type} className="text-sm text-foreground cursor-pointer">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground mb-3 block">Target cities (choose any)</Label>
                    <div className="flex flex-wrap gap-3">
                      {cities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCityToggle(city)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            formData.preferredCities.includes(city)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background border border-border text-foreground hover:border-primary'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="priceRange" className="text-foreground">Budget range</Label>
                    <Select 
                      value={formData.priceRange} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
                    >
                      <SelectTrigger className="mt-1.5 bg-background border-border">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="200k-350k">$200K–$350K</SelectItem>
                        <SelectItem value="350k-500k">$350K–$500K</SelectItem>
                        <SelectItem value="500k-1m">$500K–$1M</SelectItem>
                        <SelectItem value="1m-plus">$1M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timeline" className="text-foreground">Timeline</Label>
                    <Select 
                      value={formData.timeline} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger className="mt-1.5 bg-background border-border">
                        <SelectValue placeholder="When are you looking to buy?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="30-days">30 days</SelectItem>
                        <SelectItem value="90-days">90 days</SelectItem>
                        <SelectItem value="just-exploring">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-7 text-xl font-bold rounded-full shadow-xl shadow-primary/30"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit →'}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    You will receive deals within 24 hours or sooner.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample VIP Deals */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4 font-playfair">
            💰 Sample VIP Deals (Recent)
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            These are real examples of what VIP investors receive.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sampleDeals.map((deal, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">{deal.location}</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="text-foreground font-medium">{deal.price}</span>
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
                      <span className="text-muted-foreground">CoC:</span>
                      <span className="text-primary font-semibold">{deal.coc}</span>
                    </div>
                  </div>
                  {deal.note && (
                    <p className="text-muted-foreground text-sm mt-4 pt-4 border-t border-border italic">
                      {deal.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Cities Work */}
      <section className="py-16 md:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-playfair">
            🗺️ Why These Cities Work: Albany, Troy, Schenectady
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cityProfiles.map((city, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{city.name}</h3>
                  <p className="text-muted-foreground mb-3">{city.description}</p>
                  <p className="text-primary font-semibold">{city.highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Talk to an Investment Specialist */}
      <section className="py-16 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-playfair">
            📞 Talk to an Investment Specialist (Free)
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Want real, direct answers about deals, financing, tenants, neighborhoods, or ROI?
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
          <p className="text-foreground font-medium">
            You'll talk to me — not a bot.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-playfair">
            ❓ FAQ
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                Do these deals really cash flow?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Yes — Albany/Troy/Schenectady routinely deliver <strong className="text-primary">10–14% cap rates</strong> and <strong className="text-primary">15–30% cash-on-cash returns</strong>.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                Can you help run the numbers?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Yes. That's my specialty. Text any address to {SCOTT_PHONE} for a free investor-grade analysis.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                Are off-market deals real?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Yes — many multi-units never hit the MLS. VIP investors receive them weekly.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="bg-card border border-border rounded-xl px-6">
              <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                Can out-of-state investors buy here?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                Absolutely. Many of my clients invest remotely. We handle the local due diligence, property analysis, and coordination.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold rounded-full shadow-xl shadow-primary/30"
          >
            Get VIP Access Now
          </Button>
          <p className="text-muted-foreground mt-4">
            Prefer to talk?{' '}
            <a href={`tel:${SCOTT_PHONE_TEL}`} className="text-primary font-semibold hover:underline">
              Call
            </a>{' '}
            or{' '}
            <a href={`sms:${SCOTT_PHONE_TEL}`} className="text-primary font-semibold hover:underline">
              text Scott at {SCOTT_PHONE}
            </a>
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default VipBuyerAccess;
