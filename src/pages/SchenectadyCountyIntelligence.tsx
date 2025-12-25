import SEOHead from "@/components/SEOHead";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Home, 
  BarChart3,
  FileText,
  Building2,
  CheckCircle2,
  ArrowRight,
  Users,
  Search,
  Phone,
  ChevronDown,
  Clock,
  Briefcase,
  LineChart
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import GuideLeadModal from "@/components/GuideLeadModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SchenectadyCountyIntelligence = () => {
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  
  // Refs for smooth scrolling
  const homebuyerRef = useRef<HTMLDivElement>(null);
  const investorRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Capital District Nest - Schenectady County Real Estate Intelligence",
    "description": "Live listings, sold data, investment metrics, and buyer programs — all organized in one place.",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Schenectady County",
      "addressRegion": "NY"
    },
    "serviceType": ["Real Estate Analysis", "Investment Properties", "Market Intelligence"],
    "url": "https://capitaldistrictnest.com/schenectady-county-real-estate"
  };

  const neighborhoods = [
    {
      name: "Stockade",
      description: "Historic demand. Limited inventory. Strong long-term appreciation with stable rental income."
    },
    {
      name: "Upper Union Street",
      description: "Consistent duplex demand. Walkable areas. Reliable tenant base."
    },
    {
      name: "Mont Pleasant",
      description: "Entry-level pricing. Higher yield potential. Requires careful property selection."
    },
    {
      name: "GE Realty Plot",
      description: "Historic district. Family-oriented. Steady appreciation in tree-lined streets."
    }
  ];

  const deckCards = [
    {
      icon: Home,
      title: "Buying a Home",
      description: "Explore homes, affordability tools, and low- or zero-down payment options available in Schenectady County.",
      cta: "View Homebuyer Tools",
      ref: homebuyerRef,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Briefcase,
      title: "Investing in Property",
      description: "Analyze multi-unit properties, cap rates, rent rolls, and real cash-flow opportunities.",
      cta: "View Investment Data",
      ref: investorRef,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Search,
      title: "Research the Market",
      description: "See sold prices, trends, and neighborhood-level data to understand where the market is heading.",
      cta: "View Market Trends",
      ref: marketRef,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
    },
    {
      icon: Phone,
      title: "Talk to a Local Expert",
      description: "Get direct answers from a Capital District investment specialist.",
      cta: "Free 10-Minute Strategy Call",
      href: "/strategy",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    }
  ];

  return (
    <MainLayout>
      <SEOHead
        title="Schenectady County Real Estate — Made Simple | Market Data & Investment Analysis"
        description="Live listings, sold data, investment metrics, and buyer programs — all organized in one place. Get a free property intelligence report."
        keywords="Schenectady County real estate, Schenectady investment properties, Schenectady market data, Schenectady rental analysis, Schenectady County homes, Schenectady cash flow"
        canonical="https://capitaldistrictnest.com/schenectady-county-real-estate"
        structuredData={structuredData}
      />
      
      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">Schenectady County Real Estate</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                — Made Simple
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Live listings, sold data, investment metrics, and buyer programs — all organized in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base font-semibold"
                onClick={() => document.getElementById('deck-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Here (30 seconds)
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="h-14 px-8 text-base font-semibold"
                asChild
              >
                <Link to="/schenectady-real-estate">
                  Browse All Properties
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* DECK SECTION - GUIDED ENTRY */}
        <section id="deck-section" className="py-16 px-4 bg-card/50 border-y border-border scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What are you looking to do in Schenectady County?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose your path — we'll guide you to exactly what matters.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {deckCards.map((card, index) => (
                <Card 
                  key={index}
                  className="border-border/50 bg-card hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => card.ref ? scrollToSection(card.ref) : null}
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                    {card.href ? (
                      <Link to={card.href}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {card.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {card.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* HOMEBUYER SECTION */}
        <section ref={homebuyerRef} className="py-20 px-4 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
                <Home className="w-4 h-4" />
                For Homebuyers
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Buying a Home in Schenectady County
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to make a confident home purchase — from affordability tools to neighborhood insights.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Zero & Low Down Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    USDA, FHA, VA, and state-specific programs for qualified buyers.
                  </p>
                  <Link to="/grants" className="text-primary text-sm font-medium hover:underline">
                    View Programs →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Users className="w-5 h-5 text-primary" />
                    First-Time Buyer Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step roadmap from pre-approval to closing.
                  </p>
                  <Link to="/buyer-journey/first-time-buyer" className="text-primary text-sm font-medium hover:underline">
                    Start Your Journey →
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    Neighborhood Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    School districts, safety, and walkability for each area.
                  </p>
                  <Link to="/schenectady-homes-for-sale" className="text-primary text-sm font-medium hover:underline">
                    Explore Neighborhoods →
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/buyer-journey/first-time-buyer">
                  Get Personalized Buyer Info
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* VISUAL MAP SECTION */}
        <section ref={mapRef} id="map" className="py-16 px-4 bg-card/50 border-y border-border scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Live Schenectady County Property Map
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Visualize what's for sale, what's selling, and where opportunities exist — updated daily.
              </p>
            </div>
            
            <div className="relative rounded-xl border border-border bg-muted/30 overflow-hidden">
              <div className="aspect-[16/9] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg mb-2">
                    Interactive market map coming soon
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-6">
                    Click any property to view pricing, unit count, and local insights.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm">Active Listings</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Sold (Last 12 Months)</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-sm">Multi-Unit Properties</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm">Single-Family Homes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARKET SNAPSHOT SECTION */}
        <section ref={marketRef} className="py-20 px-4 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                <LineChart className="w-4 h-4" />
                Market Data
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Schenectady County Market Snapshot
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Key numbers buyers and investors need — without the noise.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">$195K</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">Median Home Price</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Home className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">$1,450</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">Average Rent (2–4 Units)</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">7–10%</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">Typical Investor Cap Rate</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">$85K</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">Price Per Unit (Multi-Family)</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">28</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground">Days on Market (Average)</p>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-8">
              Numbers reflect recent market activity and local data sources — not national averages.
            </p>
          </div>
        </section>

        {/* PROPERTY BROWSING SECTION - ACCORDION */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Browse Schenectady County Properties
              </h2>
              <p className="text-muted-foreground">
                Find exactly what you're looking for.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="multi-unit" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    Schenectady Multi-Unit Properties
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <p className="text-muted-foreground mb-4">
                    Duplexes, triplexes, and small apartment buildings.
                  </p>
                  <Button asChild>
                    <Link to="/schenectady-multi-unit">
                      View Multi-Units
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="single-family" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-primary" />
                    Schenectady Single-Family Homes
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <p className="text-muted-foreground mb-4">
                    Owner-occupied homes and first-time buyer opportunities.
                  </p>
                  <Button asChild>
                    <Link to="/schenectady-homes-for-sale">
                      View Homes
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="all-listings" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-primary" />
                    All Active Listings
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <p className="text-muted-foreground mb-4">
                    All residential listings across Schenectady County.
                  </p>
                  <Button asChild>
                    <Link to="/schenectady-real-estate">
                      View All Listings
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* INVESTOR SECTION */}
        <section ref={investorRef} className="py-20 px-4 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                <Briefcase className="w-4 h-4" />
                For Investors
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Investor Intelligence Tools
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Go beyond list prices. Understand real returns before making an offer.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Free Tools */}
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    Free Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Market stats", "Listing details", "Price history", "Neighborhood trends"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* VIP Tools */}
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    Advanced Intelligence (VIP)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {["Full P&L analysis", "Rent roll breakdowns", "Cash-flow projections", "Deal scoring & offer strategy"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="h-14 px-8"
                onClick={() => setGuideModalOpen(true)}
              >
                <FileText className="w-5 h-5 mr-2" />
                Get a Free Intelligence Report
              </Button>
            </div>
          </div>
        </section>

        {/* NEIGHBORHOOD SNAPSHOTS */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Neighborhood Snapshots
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Each neighborhood behaves differently. These are high-level patterns investors should understand.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoods.map((neighborhood) => (
                <Card 
                  key={neighborhood.name} 
                  className="border-border/50 bg-card hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-primary" />
                      {neighborhood.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {neighborhood.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* STRATEGY CALL SECTION */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/3">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6">
              <Phone className="w-4 h-4" />
              Talk to an Expert
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              10-Minute Strategy Call (Free)
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Speak directly with a Capital District real estate investment specialist about Schenectady County.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10 text-left">
              {[
                "Multi-unit investing in Schenectady",
                "First-time buyer programs",
                "Cash-flow expectations",
                "Offer strategy"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="h-14 px-10" asChild>
              <Link to="/strategy">
                Schedule Your Free Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* AUTHORITY / TRUST */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Built for Real Decisions
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                "Local data, not national averages",
                "Verified rent rolls & expenses",
                "Clear P&L, cap rate, and cash flow math",
                "Designed for confident offers"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-muted-foreground mb-2">
                <span className="font-semibold text-foreground">Capital District Nest</span> — Local expertise. Institutional-grade data.
              </p>
              <p className="text-sm text-muted-foreground">
                Powered by RE/MAX
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 px-4 bg-card/50 border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make a Move?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get a free property intelligence report on any Schenectady County address. 
              Real numbers. No fluff.
            </p>
            <Button 
              size="lg" 
              className="h-14 px-10 text-base font-semibold"
              onClick={() => setGuideModalOpen(true)}
            >
              Get Your Free Report
            </Button>
          </div>
        </section>
      </main>

      {/* Lead Capture Modal */}
      <GuideLeadModal
        open={guideModalOpen}
        onOpenChange={setGuideModalOpen}
        redirectPath="/schenectady-county-real-estate"
        guideType="Schenectady County Intelligence Report"
      />
    </MainLayout>
  );
};

export default SchenectadyCountyIntelligence;
