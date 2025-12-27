import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  TrendingUp, 
  MapPin,
  BarChart3,
  Search,
  FileText,
  Mail,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface TownData {
  name: string;
  slug: string;
  schoolDistrict?: string;
  description: string;
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
  featuredProperty?: {
    image: string;
    address: string;
    link: string;
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

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{town.name} NY Real Estate Intelligence | Homes, Market Trends & Local Insights</title>
        <meta 
          name="description" 
          content={`${town.name} NY homes for sale, market activity, and local insights. Get data-driven real estate intelligence for ${town.name}.`}
        />
        <meta 
          name="keywords" 
          content={`${town.name} NY real estate, ${town.name} homes for sale, ${town.name} housing market, ${town.name} NY home prices`}
        />
        <link rel="canonical" href={`https://capitaldistrictnest.com/${town.slug}`} />
      </Helmet>

      <MainHeader />

      {/* HERO SECTION */}
      <section className="relative px-[5%] py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          {town.schoolDistrict && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {town.schoolDistrict}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            {town.name} Real Estate Intelligence
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Homes, market activity, and local insights — all built specifically for {town.name}, NY.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold w-full sm:w-auto"
              asChild
            >
              <Link to={`/${town.slug}-homes-for-sale`}>
                <Home className="w-5 h-5 mr-2" />
                View {town.name} Homes for Sale
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              asChild
            >
              <Link to="/dealdesk">
                Get the {town.name} Market Report
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 1 — Market Snapshot */}
      <section id="market-snapshot" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              Real-Time Data
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              📍 {town.name} Market Snapshot
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A real-time view of {town.name}'s housing market, updated regularly using verified local data.
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

      {/* SECTION 2 — Featured Property Intelligence */}
      {town.featuredProperty && (
        <section className="px-[5%] py-16 md:py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                🏡 Featured {town.name} Property Intelligence
              </h2>
              <p className="text-muted-foreground text-lg">
                See what a modern, data-driven property analysis looks like — far beyond a standard listing.
              </p>
            </div>

            <Card className="overflow-hidden border-2 border-primary/20">
              <div className="aspect-video bg-muted">
                <img 
                  src={town.featuredProperty.image} 
                  alt={town.featuredProperty.address}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {town.featuredProperty.address}
                </h3>
                <Button size="lg" asChild>
                  <Link to={town.featuredProperty.link}>
                    View Full Property Intelligence →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* SECTION 3 — Browse Homes */}
      <section id="search-homes" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🔍 Browse Homes for Sale in {town.name}
            </h2>
            <p className="text-muted-foreground text-lg">
              Search current {town.name} listings with clean, simple tools designed for real buyers.
            </p>
          </div>

          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                View All {town.name} Listings
              </h3>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Browse homes for sale in {town.name}. Updated daily with new listings.
              </p>
              <Button size="lg" className="h-14 px-8 text-lg font-bold" asChild>
                <Link to={`/${town.slug}-homes-for-sale`}>
                  <Search className="w-5 h-5 mr-2" />
                  Browse {town.name} Homes
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SECTION 4 — Local Insights */}
      <section className="px-[5%] py-16 md:py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              📊 {town.name} Local Insights
            </h2>
            <p className="text-muted-foreground text-lg">
              The kind of local intelligence that generic sites can't provide.
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-2">School District Overview</h3>
                <p className="text-muted-foreground">{town.localInsights.schoolOverview}</p>
              </CardContent>
            </Card>
            
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

      {/* SECTION 5 — Get Updates (Lead Capture) */}
      <section id="newsletter" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  📬 Get {town.name} Market Updates
                </h2>
                <p className="text-muted-foreground">
                  Get notable sales, new listings, and market changes for {town.name} — no spam, no sales pressure.
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

      {/* Recently Sold */}
      {town.recentlySold.length > 0 && (
        <section className="px-[5%] py-16 md:py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Recently Sold in {town.name}
              </h2>
              <p className="text-muted-foreground text-lg">
                See what homes are actually selling for in {town.name}.
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

      {/* SECTION 6 — Quiet Authority Footer CTA */}
      <section className="px-[5%] py-16 md:py-20 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            Looking for detailed intelligence on a specific property?
          </p>
          <Button size="lg" asChild>
            <Link to="/dealdesk">
              <FileText className="w-5 h-5 mr-2" />
              Request Property Intelligence →
            </Link>
          </Button>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="px-[5%] py-12 bg-muted/50 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Local Intelligence
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Real Data, No Guessing
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Agent-Neutral
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Capital District Nest. All rights reserved.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border md:hidden z-50">
        <Button 
          size="lg" 
          className="w-full h-14 font-bold text-lg"
          asChild
        >
          <Link to="/dealdesk">
            <FileText className="w-5 h-5 mr-2" />
            Get Property Intelligence
          </Link>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default TownPageTemplate;
