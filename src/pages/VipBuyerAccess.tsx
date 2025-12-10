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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  TrendingUp, 
  FileText, 
  Shield, 
  Users, 
  Target,
  Check,
  Phone,
  Home,
  Building,
  DollarSign,
  Calendar
} from 'lucide-react';

const VipBuyerAccess = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lookingFor: '',
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
          message: `VIP Buyer Request\n\nLooking for: ${formData.lookingFor}\nPrice Range: ${formData.priceRange}\nPreferred Cities: ${formData.preferredCities.join(', ')}\nTimeline: ${formData.timeline}`,
          type: 'vip-buyer',
          location: formData.preferredCities.join(', '),
          price_range: formData.priceRange
        }
      });

      if (error) throw error;

      toast({
        title: "Welcome to VIP Access!",
        description: "We'll be in touch within 24 hours with hand-selected listings.",
      });

      setFormData({
        name: '',
        phone: '',
        email: '',
        lookingFor: '',
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

  const whatYouReceive = [
    {
      icon: Home,
      title: "Hand-Selected Listings",
      description: "Properties that match your exact criteria, delivered to your inbox."
    },
    {
      icon: FileText,
      title: "Full Financial Analysis",
      description: "Pro forma, rent roll projections, and ROI calculations on every property."
    },
    {
      icon: Building,
      title: "Off-Market Access",
      description: "Pocket listings and pre-market opportunities before they go public."
    },
    {
      icon: Phone,
      title: "Priority Support",
      description: "Direct access to Scott — call, text, or email anytime."
    }
  ];

  const testimonials = [
    {
      quote: "Scott sent me a triplex that wasn't even listed yet. I closed before anyone else even saw it.",
      author: "Mike R.",
      location: "Troy Investor"
    },
    {
      quote: "The financial breakdown on each property saved me hours of research. I knew exactly what I was buying.",
      author: "Sarah T.",
      location: "First-Time Buyer"
    },
    {
      quote: "I moved from Brooklyn and Scott found me a duplex that cash flows from day one. VIP access was worth it.",
      author: "James L.",
      location: "NYC to Albany Buyer"
    }
  ];

  const cities = ['Troy', 'Albany', 'Schenectady', 'Saratoga Springs', 'Clifton Park', 'Delmar', 'Amsterdam', 'Cohoes'];

  return (
    <MainLayout>
      <Helmet>
        <title>VIP Investor Access | Off-Market Deals | Capital District Nest</title>
        <meta name="description" content="VIP investor access to off-market multi-unit deals in Albany, Troy, Schenectady & Saratoga. Get 10–14% cap rates, 15–30% cash-on-cash returns. Full P&L reports included." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
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
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
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

      {/* What VIP Buyers Receive */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What VIP Buyers Receive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatYouReceive.map((item, index) => (
              <Card key={index} className="bg-card border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What VIP Buyers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card border-border/50">
                <CardContent className="p-6">
                  <p className="text-foreground text-lg italic mb-4">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <p className="font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Form Section */}
      <section id="vip-form" className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Become a VIP Buyer
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us what you're looking for. We'll send hand-selected listings + full financials.
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
                    <Label htmlFor="lookingFor" className="text-foreground">What are you looking for?</Label>
                    <Select 
                      value={formData.lookingFor} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, lookingFor: value }))}
                    >
                      <SelectTrigger className="mt-1.5 bg-background border-border">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary-residence">Primary Residence</SelectItem>
                        <SelectItem value="investment-property">Investment Property</SelectItem>
                        <SelectItem value="multi-unit">Multi-Unit (2-4 units)</SelectItem>
                        <SelectItem value="house-hack">House Hack (live in one, rent others)</SelectItem>
                        <SelectItem value="fix-and-flip">Fix & Flip</SelectItem>
                        <SelectItem value="land">Land / Development</SelectItem>
                        <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priceRange" className="text-foreground">Price Range</Label>
                    <Select 
                      value={formData.priceRange} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
                    >
                      <SelectTrigger className="mt-1.5 bg-background border-border">
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-150k">Under $150,000</SelectItem>
                        <SelectItem value="150k-250k">$150,000 - $250,000</SelectItem>
                        <SelectItem value="250k-400k">$250,000 - $400,000</SelectItem>
                        <SelectItem value="400k-600k">$400,000 - $600,000</SelectItem>
                        <SelectItem value="600k-plus">$600,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-foreground mb-3 block">Preferred Cities (select all that apply)</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {cities.map((city) => (
                        <div key={city} className="flex items-center space-x-2">
                          <Checkbox
                            id={city}
                            checked={formData.preferredCities.includes(city)}
                            onCheckedChange={() => handleCityToggle(city)}
                          />
                          <label
                            htmlFor={city}
                            className="text-sm text-foreground cursor-pointer"
                          >
                            {city}
                          </label>
                        </div>
                      ))}
                    </div>
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
                        <SelectItem value="asap">ASAP - Ready Now</SelectItem>
                        <SelectItem value="1-3-months">1-3 Months</SelectItem>
                        <SelectItem value="3-6-months">3-6 Months</SelectItem>
                        <SelectItem value="6-12-months">6-12 Months</SelectItem>
                        <SelectItem value="just-exploring">Just Exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-7 text-xl font-bold rounded-full shadow-xl shadow-primary/30"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get VIP Access Now'}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    No obligation. No spam. You get hand-selected properties and full analysis — fast.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">
            Prefer to talk?{' '}
            <a href="tel:+15186762347" className="text-primary font-semibold hover:underline">
              Call
            </a>{' '}
            or{' '}
            <a href="sms:+15186762347" className="text-primary font-semibold hover:underline">
              text Scott at 518-676-2347
            </a>
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default VipBuyerAccess;
