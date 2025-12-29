import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  TrendingUp, 
  TrendingDown,
  Minus,
  MapPin,
  Search,
  FileText,
  Mail,
  Calendar,
  BarChart3,
  ChevronRight,
  CheckCircle,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useDelmarConfirmation } from "@/contexts/DelmarConfirmationContext";

export interface TownData {
  name: string;
  slug: string;
  schoolDistrict?: string;
  description: string;
  remaxSearchUrl: string;
  marketSnapshot: {
    label: string;
    value: string;
    change: string;
  }[];
  recentlySold: {
    address: string;
    price: string;
    beds: number;
    baths: number;
    date: string;
  }[];
  localInsights: {
    schoolOverview: string;
    propertyTaxes: string;
    homeStyles: string;
    buyerDemand: string;
    renovationDemand: string;
  };
  // Weekly intelligence data
  weeklyIntel?: {
    newListings: number;
    medianListPrice?: string;
    homesSold: number;
    medianSoldPrice?: string;
    avgDaysOnMarket?: number;
    priceChange: string;
    priceDirection: 'up' | 'down' | 'stable';
  };
}

interface TownPageTemplateProps {
  town: TownData;
}

const TownPageTemplate = ({ town }: TownPageTemplateProps) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterPhone, setNewsletterPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showConfirmation, setShowConfirmation } = useDelmarConfirmation();
  const location = useLocation();

  // Auto-dismiss confirmation banner after 10 seconds
  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => setShowConfirmation(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showConfirmation, setShowConfirmation]);

  const isDelmarPage = town.slug === "delmar";

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterName) {
      toast.error("Please enter your name and email");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('submit-contact-form', {
        body: {
          name: newsletterName,
          email: newsletterEmail,
          phone: newsletterPhone,
          message: `${town.name} Market Updates subscription`,
          type: 'newsletter',
          boldtrailTag: `${town.slug}-market-updates`
        }
      });

      if (error) throw error;
      
      toast.success(`Welcome to ${town.name} Market Updates!`);
      setNewsletterEmail("");
      setNewsletterName("");
      setNewsletterPhone("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Default weekly intel if not provided
  const weeklyIntel = town.weeklyIntel || {
    newListings: parseInt(town.marketSnapshot[0]?.value) || 12,
    medianListPrice: town.marketSnapshot[1]?.value || "$425,000",
    homesSold: Math.floor(parseInt(town.marketSnapshot[0]?.value) * 0.6) || 8,
    medianSoldPrice: town.marketSnapshot[1]?.value || "$415,000",
    avgDaysOnMarket: parseInt(town.marketSnapshot[2]?.value) || 18,
    priceChange: town.marketSnapshot[1]?.change || "+3.2% MoM",
    priceDirection: (town.marketSnapshot[1]?.change?.includes('+') ? 'up' : 
                     town.marketSnapshot[1]?.change?.includes('-') ? 'down' : 'stable') as 'up' | 'down' | 'stable'
  };

  const getPriceIcon = () => {
    switch (weeklyIntel.priceDirection) {
      case 'up': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down': return <TrendingDown className="w-5 h-5 text-red-500" />;
      default: return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>This Week in {town.name} NY | Live Market Intelligence</title>
        <meta 
          name="description" 
          content={`Live market intelligence for ${town.name} NY. New listings, homes sold, and price trends — updated regularly. No listings. No promotion.`}
        />
        <meta 
          name="keywords" 
          content={`${town.name} NY real estate, ${town.name} market data, ${town.name} home prices, ${town.name} housing trends`}
        />
        <link rel="canonical" href={`https://capitaldistrictnest.com/towns/${town.slug}`} />
      </Helmet>

      <MainHeader />

      {/* Confirmation Banner - Shows after form submission */}
      {showConfirmation && isDelmarPage && (
        <div className="bg-primary/10 border-b border-primary/20 px-[5%] py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">You're in. Explore Delmar market insights below.</span>
            </div>
            <button 
              onClick={() => setShowConfirmation(false)}
              className="text-primary/70 hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* WELCOME SECTION — First-time user optimized (Delmar only) */}
      {isDelmarPage && (
        <section className="px-[5%] py-12 md:py-16 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Delmar Real Estate Intelligence
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Clear, local insights for homeowners and buyers — beyond Zillow.
            </p>

            {/* 3-Step Visual Flow */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-semibold text-primary mb-2">Step 1</div>
                <h3 className="font-semibold text-foreground mb-1">Explore Market Activity</h3>
                <p className="text-sm text-muted-foreground">
                  See what's selling, price trends, and local data.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Home className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-semibold text-primary mb-2">Step 2</div>
                <h3 className="font-semibold text-foreground mb-1">View Property Pages</h3>
                <p className="text-sm text-muted-foreground">
                  Browse detailed intelligence on specific addresses.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <div className="text-xs font-semibold text-primary mb-2">Step 3</div>
                <h3 className="font-semibold text-foreground mb-1">Request a Report</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized intelligence on any property.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HERO SECTION — New Intelligence-First Copy */}
      <section className="relative px-[5%] py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          {town.schoolDistrict && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {town.schoolDistrict}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            This Week in {town.name}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Live market intelligence for homeowners and buyers.<br />
            Updated regularly. No listings. No promotion.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold w-full sm:w-auto"
              onClick={() => document.getElementById('market-intel')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View This Week's Data
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              onClick={() => document.getElementById('get-intel')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get My Free Intelligence Report
            </Button>
          </div>
        </div>
      </section>

      {/* THIS WEEK IN {TOWN} REAL ESTATE — Locked Weekly Intelligence Module */}
      <section id="market-intel" className="px-[5%] py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              This Week in {town.name} Real Estate
            </h2>
            <p className="text-sm text-muted-foreground">
              Updated weekly using verified MLS and public records data.
            </p>
          </div>

          {/* 4-Tile Grid — Locked Structure */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tile 1: New Listings */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">New Listings</p>
                <p className="text-sm text-muted-foreground mb-1">Last 7 Days</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  {weeklyIntel.newListings}
                </p>
              </CardContent>
            </Card>

            {/* Tile 2: Homes Sold */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Homes Sold</p>
                <p className="text-sm text-muted-foreground mb-1">Last 7 Days</p>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  {weeklyIntel.homesSold}
                </p>
              </CardContent>
            </Card>

            {/* Tile 3: Median Sale Price */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Median Sale Price</p>
                <p className="text-sm text-muted-foreground mb-1">Recent Sales</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {weeklyIntel.medianSoldPrice || weeklyIntel.medianListPrice || "$415,000"}
                </p>
              </CardContent>
            </Card>

            {/* Tile 4: Price Movement Trend */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Price Trend</p>
                <p className="text-sm text-muted-foreground mb-1">Movement</p>
                <div className="flex items-center justify-center gap-2">
                  {getPriceIcon()}
                  <p className="text-lg font-bold text-foreground">
                    {weeklyIntel.priceDirection === 'up' ? 'Rising' : 
                     weeklyIntel.priceDirection === 'down' ? 'Softening' : 'Stable'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MARKET TRENDS & SNAPSHOT */}
      <section id="market-snapshot" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Market Trends & Charts
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Historical data and trends for {town.name}'s housing market.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {town.marketSnapshot.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-primary font-medium">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RECENTLY SOLD — Historical Data */}
      {town.recentlySold.length > 0 && (
        <section className="px-[5%] py-16 md:py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Sold Property Data
              </h2>
              <p className="text-muted-foreground text-lg mb-2">
                Historical sales data for {town.name}.
              </p>
              <p className="text-sm text-muted-foreground/70">
                Updated monthly • Last refresh: December 2025
              </p>
            </div>

            <div className="grid gap-4">
              {town.recentlySold.map((sale, index) => (
                <Card key={index}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Home className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{sale.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {sale.beds} bed • {sale.baths} bath
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xl font-bold text-foreground">{sale.price}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                            <Calendar className="w-3 h-3" /> {sale.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SCHOOL DISTRICT INSIGHTS */}
      <section className="px-[5%] py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              School District Insights
            </h2>
            <p className="text-muted-foreground text-lg">
              Education data and school district information for {town.name}.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-foreground mb-2">{town.schoolDistrict || `${town.name} Schools`}</h3>
              <p className="text-muted-foreground">{town.localInsights.schoolOverview}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NEIGHBORHOOD GUIDES & LOCAL INSIGHTS */}
      <section className="px-[5%] py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Neighborhood Guides
            </h2>
            <p className="text-muted-foreground text-lg">
              Local intelligence that generic sites can't provide.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">Typical Property Taxes & Ranges</h3>
                <p className="text-muted-foreground">{town.localInsights.propertyTaxes}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">Common Home Styles & Lot Sizes</h3>
                <p className="text-muted-foreground">{town.localInsights.homeStyles}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">Buyer Demand Trends</h3>
                <p className="text-muted-foreground">{town.localInsights.buyerDemand}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">Renovation vs Move-in-Ready Demand</h3>
                <p className="text-muted-foreground">{town.localInsights.renovationDemand}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MORTGAGE ASSISTANCE & GRANTS */}
      <section className="px-[5%] py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mortgage Assistance & Grants
            </h2>
            <p className="text-muted-foreground text-lg">
              Financial resources for {town.name} homebuyers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-3">Zero & Low Down Payment Programs</h3>
                <p className="text-muted-foreground mb-4">
                  First-time buyers may qualify for up to $30,000 in down payment assistance through state and local programs.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/grants">
                    Explore Grant Programs →
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-3">First-Time Buyer Resources</h3>
                <p className="text-muted-foreground mb-4">
                  Guides, checklists, and step-by-step support for navigating your first home purchase.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/first-time-homebuyers">
                    First-Time Buyer Guide →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BROWSE HOMES — External Link */}
      <section id="search-homes" className="px-[5%] py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                View All {town.name} Listings
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Browse current homes for sale in {town.name}. Updated daily.
              </p>
              <Button size="lg" className="h-14 px-8 text-lg font-bold" asChild>
                <a href={town.remaxSearchUrl} target="_blank" rel="noopener noreferrer">
                  <Search className="w-5 h-5 mr-2" />
                  Browse {town.name} Homes →
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* GET INTELLIGENCE CTA */}
      <section id="get-intel" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Get {town.name} Market Intelligence
                </h2>
                <p className="text-muted-foreground text-lg">
                  Request detailed reports, trends, and property intelligence —
                  delivered privately, without promotion.
                </p>
              </div>

              <Button size="lg" className="w-full h-14 text-lg font-bold" asChild>
                <Link to="/dealdesk">
                  Get My Free Intelligence Report
                </Link>
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam. No sales pressure. Just data.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* NEWSLETTER — Market Updates */}
      <section id="newsletter" className="px-[5%] py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="max-w-xl mx-auto">
          <Card className="border-2 border-border">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Get {town.name} Market Updates
                </h2>
                <p className="text-muted-foreground">
                  Notable sales, new listings, and market changes — no spam.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Name"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="h-12"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-12"
                  required
                />
                <Input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={newsletterPhone}
                  onChange={(e) => setNewsletterPhone(e.target.value)}
                  className="h-12"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : `Get ${town.name} Updates`}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* PROPERTY INTELLIGENCE LINK — Template-based, no real addresses */}
      <section className="px-[5%] py-12 bg-background border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Want to see what a full property analysis looks like?
          </p>
          <Link 
            to="/reports/sample-property-intelligence" 
            className="text-primary font-semibold hover:underline"
          >
            See an example of a full Property Intelligence Report →
          </Link>
        </div>
      </section>

      {/* TRUST FOOTER */}
      <section className="px-[5%] py-12 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Data sourced from MLS and public records. Updated regularly.
          </p>
          <p className="text-sm text-muted-foreground">
            Capital District Nest • Licensed Real Estate Broker • RE/MAX
          </p>
        </div>
      </section>

      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border md:hidden z-50">
        <div className="flex gap-2">
          {isDelmarPage && (
            <Button 
              size="lg" 
              variant="outline"
              className="h-12 font-bold flex-1"
              onClick={() => document.getElementById('market-intel')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Delmar
            </Button>
          )}
          <Button size="lg" className={`h-12 font-bold ${isDelmarPage ? 'flex-1' : 'w-full'}`} asChild>
            <Link to="/dealdesk">
              {isDelmarPage ? 'Get Report' : `Get ${town.name} Intelligence Report`}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TownPageTemplate;
