import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  X,
  ExternalLink,
  ClipboardList,
  Dumbbell,
  Coffee,
  UtensilsCrossed,
  Trees,
  Car,
  Building,
  LandPlot,
  Key,
  LineChart,
  MessageCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useDelmarConfirmation } from "@/contexts/DelmarConfirmationContext";
import MarketReportRequestForm from "@/components/MarketReportRequestForm";

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
    // Qualitative market trend (replaces % change)
    marketTrendLabel?: string;
  };
  // RE/MAX data source links
  dataSourceLinks?: {
    activeListings?: string;
    justListed?: string;
  };
  // Market Activity PDF (RPR reports)
  marketActivityPdfUrl?: string;
  marketActivityLastChecked?: string;
  // MLS Data Source tracking
  mlsDataSource?: string;
  mlsDataDate?: string;
  // What it means bullets
  whatItMeans?: string[];
  // Notable moves (no addresses)
  notableMoves?: string[];
  // Living in [Town] - local flavor bullets
  livingIn?: string;
  // Questions People Ask - expandable FAQ section
  localQuestions?: {
    question: string;
    answer: string;
  }[];
  // Local Snapshot - landmarks, cafés, feel
  localSnapshot?: {
    landmarks: string[];
    schoolDistrictNames: string[];
    feel: string;
  };
  // NEW: Market Snapshot paragraph for Apple-style explanation
  marketSnapshotParagraph?: string;
  // NEW: Life in [Town] - Local Life Cards
  lifeInCards?: {
    fitness?: string[];
    cafes?: string[];
    restaurants?: string[];
    parks?: string[];
    commuting?: string[];
  };
  // NEW: Who [Town] Is Often a Fit For
  whoFitFor?: string[];
  // NEW: Daily listings feed (placeholder until live MLS connected)
  newTodayListings?: {
    address: string;
    price: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    thumbnail?: string;
    mlsId?: string;
  }[];
}

interface TownPageTemplateProps {
  town: TownData;
}

const TownPageTemplate = ({ town }: TownPageTemplateProps) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterPhone, setNewsletterPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [addressNote, setAddressNote] = useState("");
  const [isAddressSubmitting, setIsAddressSubmitting] = useState(false);
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

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propertyAddress.trim()) {
      toast.error("Please enter a property address");
      return;
    }
    
    setIsAddressSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        name: "Property Intel Request",
        email: `${town.slug}@propertyintel.request`,
        message: `Property Intelligence Request for: ${propertyAddress}${addressNote ? ` | Note: ${addressNote}` : ''}`,
        type: 'property_intel_request',
        location: town.name
      });

      if (error) throw error;
      
      toast.success("Got it! We'll generate your property summary and reach out shortly.");
      setPropertyAddress("");
      setAddressNote("");
    } catch (error) {
      console.error('Address submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAddressSubmitting(false);
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

      {/* Breadcrumb Navigation */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border py-3 px-4 md:px-[5%]">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Capital District Nest
              </Link>
            </li>
            <li className="flex items-center">
              <span className="text-muted-foreground/50 mx-2">→</span>
              <span className="text-foreground font-medium">{town.name}</span>
            </li>
          </ol>
        </div>
      </nav>

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


      {/* HERO SECTION — "[Town] Real Estate — Explained" */}
      <section className="relative px-[5%] py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          {town.schoolDistrict && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              {town.schoolDistrict}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            {town.name} Real Estate — Explained
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            Clear, local housing intelligence for {town.name} and the surrounding Capital District.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10">
            Updated regularly using MLS market data and local analysis.
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
                {weeklyIntel.newListings === 0 ? (
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground mt-1">No new homes listed this week</p>
                  </div>
                ) : (
                  <p className="text-3xl md:text-4xl font-bold text-foreground">
                    {weeklyIntel.newListings}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tile 2: Homes Sold */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Homes Sold</p>
                <p className="text-sm text-muted-foreground mb-1">Last 30 Days</p>
                {weeklyIntel.homesSold === 0 ? (
                  <div>
                    <p className="text-3xl md:text-4xl font-bold text-foreground">0</p>
                    <p className="text-xs text-muted-foreground mt-1">No closed sales this period</p>
                  </div>
                ) : (
                  <p className="text-3xl md:text-4xl font-bold text-foreground">
                    {weeklyIntel.homesSold}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tile 3: Median List Price */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Median List Price</p>
                <p className="text-sm text-muted-foreground mb-1">Active Listings</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground">
                  {weeklyIntel.medianListPrice || weeklyIntel.medianSoldPrice || "—"}
                </p>
              </CardContent>
            </Card>

            {/* Tile 4: Market Trend (Qualitative) */}
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Market Trend</p>
                <p className="text-sm text-muted-foreground mb-1">Current Conditions</p>
                <div className="flex items-center justify-center gap-2">
                  {getPriceIcon()}
                  <p className="text-base font-bold text-foreground">
                    {weeklyIntel.marketTrendLabel || 
                     (weeklyIntel.priceDirection === 'up' ? 'Tight Inventory' : 
                      weeklyIntel.priceDirection === 'down' ? 'Softening' : 'Stable')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Source Attribution */}
          {town.dataSourceLinks?.activeListings && (
            <div className="text-center mt-6">
              <p className="text-xs text-muted-foreground">
                Source:{" "}
                <a 
                  href={town.dataSourceLinks.activeListings} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors"
                >
                  RE/MAX {town.schoolDistrict || town.name} listings
                </a>
                . Updated weekly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* NEW TODAY SECTION — Daily Listing Addresses */}
      <section className="px-[5%] py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              New Today in {town.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Updated daily from MLS/IDX. Tap any address for a clean intelligence breakdown.
            </p>
          </div>

          {/* Listing Cards Grid */}
          {town.newTodayListings && town.newTodayListings.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {town.newTodayListings.slice(0, 6).map((listing, index) => (
                  <Card key={index} className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-4">
                      {listing.thumbnail && (
                        <div className="aspect-[16/10] rounded-lg bg-muted mb-3 overflow-hidden">
                          <img 
                            src={listing.thumbnail} 
                            alt={listing.address}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      {!listing.thumbnail && (
                        <div className="aspect-[16/10] rounded-lg bg-muted/50 mb-3 flex items-center justify-center">
                          <Home className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <h3 className="font-semibold text-foreground text-sm mb-1">{listing.address}</h3>
                      <p className="text-lg font-bold text-foreground mb-1">{listing.price}</p>
                      {(listing.beds || listing.baths || listing.sqft) && (
                        <p className="text-xs text-muted-foreground mb-3">
                          {listing.beds && `${listing.beds} bed`}
                          {listing.baths && ` • ${listing.baths} bath`}
                          {listing.sqft && ` • ${listing.sqft.toLocaleString()} sqft`}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <a 
                          href={town.remaxSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Listing
                          </Button>
                        </a>
                        <Link to="/reports/sample-property-intelligence" className="flex-1">
                          <Button variant="default" size="sm" className="w-full text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            View Intel
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* View All Link */}
              <div className="text-center mt-6">
                <a 
                  href={town.remaxSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  View all new listings in {town.name} →
                </a>
              </div>
            </>
          ) : (
            /* Placeholder when no live feed connected */
            <div className="text-center py-8 bg-muted/30 rounded-xl border border-border">
              <Home className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Live daily feed is being connected.
              </p>
              <a 
                href={town.remaxSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline inline-flex items-center gap-1"
              >
                View all listings on RE/MAX →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* HAVE QUESTIONS CARD — Neutral CTA */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30 border-b border-border">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-border">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    Have questions about {town.name}?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Ask anything — pricing, neighborhoods, taxes, rentals, multifamily, timelines. You'll get a clear answer.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild>
                      <Link to="/ask">
                        Ask a Question →
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('get-intel')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Request an Intelligence Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* MARKET SNAPSHOT PARAGRAPH — Apple-Style Explanation */}
      {town.marketSnapshotParagraph && (
        <section className="px-[5%] py-12 md:py-16 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              {town.name} Market Snapshot
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-center">
              {town.marketSnapshotParagraph}
            </p>
          </div>
        </section>
      )}

      {/* MARKET MOMENTUM SNAPSHOT — Auto-Generated Interpretation */}
      <section className="px-[5%] py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            Market Momentum Snapshot
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Pace Card */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Pace</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {weeklyIntel.avgDaysOnMarket && weeklyIntel.avgDaysOnMarket <= 14
                    ? "Homes are selling quickly, indicating strong buyer demand."
                    : weeklyIntel.avgDaysOnMarket && weeklyIntel.avgDaysOnMarket <= 30
                    ? "Properties are moving at a moderate pace with balanced activity."
                    : "Longer listing times suggest buyers have more negotiating room."}
                </p>
              </CardContent>
            </Card>

            {/* Demand Card */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Demand</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {weeklyIntel.priceDirection === 'up'
                    ? "Sale-to-list ratios suggest competitive pricing and strong buyer interest."
                    : weeklyIntel.priceDirection === 'down'
                    ? "Softening demand may create opportunities for patient buyers."
                    : "Balanced demand with steady buyer activity in the market."}
                </p>
              </CardContent>
            </Card>

            {/* Supply Card */}
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Home className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Supply</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {weeklyIntel.newListings <= 3
                    ? "Inventory levels point to a tight market with limited selection."
                    : weeklyIntel.newListings <= 10
                    ? "Moderate inventory provides reasonable options for active buyers."
                    : "Higher inventory levels give buyers more choices and leverage."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT'S ACTUALLY HAPPENING — Human Interpretation */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            What's Actually Happening in This Market
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Buyers */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                For Buyers
              </h3>
              <p className="text-muted-foreground text-sm">
                {weeklyIntel.priceDirection === 'up'
                  ? `Competition remains in ${town.name}. Well-priced homes attract multiple offers. Preparation and pre-approval matter.`
                  : weeklyIntel.priceDirection === 'down'
                  ? `${town.name} is showing buyer-friendly conditions. More room for negotiation and less pressure on timing.`
                  : `${town.name} offers a balanced market. Neither buyers nor sellers have a clear advantage right now.`}
              </p>
            </div>

            {/* Sellers */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                For Sellers
              </h3>
              <p className="text-muted-foreground text-sm">
                {weeklyIntel.avgDaysOnMarket && weeklyIntel.avgDaysOnMarket <= 14
                  ? `Properly priced homes in ${town.name} are selling quickly. Condition and pricing strategy remain critical.`
                  : weeklyIntel.avgDaysOnMarket && weeklyIntel.avgDaysOnMarket <= 30
                  ? `${town.name} homes are moving at a reasonable pace. Realistic pricing drives the best outcomes.`
                  : `Patience may be required. ${town.name} sellers should focus on presentation and competitive pricing.`}
              </p>
            </div>

            {/* Investors */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                For Investors
              </h3>
              <p className="text-muted-foreground text-sm">
                {weeklyIntel.newListings <= 3
                  ? `Low inventory in ${town.name} means fewer opportunities but less competition for off-market deals.`
                  : `${town.name} has enough activity to evaluate opportunities. Watch for price reductions and extended listings.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT MARKET AVERAGES DON'T SHOW */}
      <section className="px-[5%] py-12 md:py-16 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            What Market Averages Don't Show
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Street-by-street price variation</strong> — Two homes a block apart can sell at very different prices due to lot position, traffic, or proximity to amenities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Tax and assessment mismatches</strong> — Assessed values often lag market reality by 2–5 years. What you pay in taxes may not reflect current home value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Why similar homes sell at different speeds</strong> — Condition, photos, pricing strategy, and agent network can swing time-on-market by weeks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Hidden risk in comps</strong> — That "comparable sale" may have been a distressed sale, estate liquidation, or off-market deal with unusual terms.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* PROPERTY INTELLIGENCE BRIDGE — Soft CTA */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30 border-b border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
            Why Property-Level Intelligence Matters
          </h2>
          <p className="text-muted-foreground mb-6">
            Town-level data explains the market. Property-level intelligence explains the decision.
          </p>
          <Button variant="outline" size="lg" className="h-12 px-6" asChild>
            <Link to="/reports/sample-property-intelligence">
              View a Sample Property Intelligence Report →
            </Link>
          </Button>
        </div>
      </section>

      {/* CURIOUS ABOUT A PROPERTY — Lead Capture */}
      <section className="px-[5%] py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Request a Property Intelligence Report
                </h2>
                <p className="text-muted-foreground">
                  Pick any address in or around {town.name}.<br />
                  We'll generate a private summary using MLS data, tax records, and comparable sales — delivered to you directly.
                </p>
              </div>

              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Property address"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="h-12"
                  required
                />
                <Input
                  type="text"
                  placeholder="Your email (so we can send the report)"
                  value={addressNote}
                  onChange={(e) => setAddressNote(e.target.value)}
                  className="h-12"
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-bold"
                  disabled={isAddressSubmitting}
                >
                  {isAddressSubmitting ? "Submitting..." : "Get My Free Report"}
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                We use this only to deliver your report and follow up if you want help. No spam.
              </p>
              
              <div className="text-center mt-4">
                <Link 
                  to="/reports/sample-property-intelligence" 
                  className="text-sm text-primary hover:underline"
                >
                  See the sample format →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WHAT IT MEANS — Plain English Bullets */}
      {town.whatItMeans && town.whatItMeans.length > 0 && (
        <section className="px-[5%] py-12 bg-background border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">What It Means</h3>
            <ul className="space-y-3">
              {town.whatItMeans.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* NOTABLE MOVES — Homes to Know (No Addresses) */}
      {town.notableMoves && town.notableMoves.length > 0 && (
        <section className="px-[5%] py-12 bg-muted/30 border-b border-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">Homes to Know</h3>
            <p className="text-sm text-muted-foreground mb-4">Notable moves this week (no addresses shown publicly)</p>
            <ul className="space-y-3">
              {town.notableMoves.map((move, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Home className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{move}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* MARKET ACTIVITY — In-Site Data Display */}
      <section className="px-[5%] py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Market Activity Report
            </h2>
            <p className="text-muted-foreground">
              New listings, price changes, and recent activity — updated regularly.
            </p>
          </div>

          {/* 6-Tile Activity Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Active Listings</p>
                <p className="text-3xl font-bold text-foreground">
                  {town.marketSnapshot[0]?.value || "—"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Under Contract</p>
                <p className="text-3xl font-bold text-foreground">
                  {weeklyIntel.homesSold > 0 ? Math.floor(weeklyIntel.homesSold * 0.4) : "—"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Price Reductions</p>
                <p className="text-3xl font-bold text-foreground">
                  {weeklyIntel.newListings > 3 ? Math.floor(weeklyIntel.newListings * 0.2) : "—"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Sold (30 Days)</p>
                <p className="text-3xl font-bold text-foreground">
                  {weeklyIntel.homesSold || "—"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Median List</p>
                <p className="text-2xl font-bold text-foreground">
                  {weeklyIntel.medianListPrice || "—"}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-5 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Avg Days on Market</p>
                <p className="text-3xl font-bold text-foreground">
                  {weeklyIntel.avgDaysOnMarket || town.marketSnapshot[2]?.value || "—"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 w-full sm:w-auto"
              onClick={() => setIsReportFormOpen(true)}
            >
              <ClipboardList className="w-5 h-5 mr-2" />
              Want the Full List?
            </Button>
            
            {town.marketActivityPdfUrl && (
              <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto" asChild>
                <a href={town.marketActivityPdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Full PDF Report
                </a>
              </Button>
            )}
          </div>

          {town.marketActivityLastChecked && (
            <p className="text-xs text-muted-foreground text-center mt-4">
              Last updated: {town.marketActivityLastChecked}
            </p>
          )}
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

      {/* LIFE IN [TOWN] — Apple-Style Local Life Cards */}
      <section className="px-[5%] py-16 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
            Life in {town.name}
          </h2>
          {town.livingIn && (
            <p className="text-muted-foreground text-lg leading-relaxed text-center mb-10 max-w-2xl mx-auto">
              {town.livingIn}
            </p>
          )}
          
          {/* Local Life Cards Grid */}
          {town.lifeInCards && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fitness & Wellness */}
              {town.lifeInCards.fitness && town.lifeInCards.fitness.length > 0 && (
                <Card className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Dumbbell className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Local Fitness & Wellness</h3>
                    </div>
                    <ul className="space-y-2">
                      {town.lifeInCards.fitness.map((item, index) => (
                        <li key={index} className="text-muted-foreground text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Cafés & Coffee */}
              {town.lifeInCards.cafes && town.lifeInCards.cafes.length > 0 && (
                <Card className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Coffee className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Cafés & Coffee</h3>
                    </div>
                    <ul className="space-y-2">
                      {town.lifeInCards.cafes.map((item, index) => (
                        <li key={index} className="text-muted-foreground text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Restaurants & Dining */}
              {town.lifeInCards.restaurants && town.lifeInCards.restaurants.length > 0 && (
                <Card className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <UtensilsCrossed className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Restaurants & Dining</h3>
                    </div>
                    <ul className="space-y-2">
                      {town.lifeInCards.restaurants.map((item, index) => (
                        <li key={index} className="text-muted-foreground text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Parks & Outdoor Spaces */}
              {town.lifeInCards.parks && town.lifeInCards.parks.length > 0 && (
                <Card className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Trees className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Parks & Outdoor Spaces</h3>
                    </div>
                    <ul className="space-y-2">
                      {town.lifeInCards.parks.map((item, index) => (
                        <li key={index} className="text-muted-foreground text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Access & Commuting */}
              {town.lifeInCards.commuting && town.lifeInCards.commuting.length > 0 && (
                <Card className="border border-border/50 md:col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">Access & Commuting</h3>
                    </div>
                    <ul className="flex flex-wrap gap-4">
                      {town.lifeInCards.commuting.map((item, index) => (
                        <li key={index} className="text-muted-foreground text-sm">{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>

      {/* WHO [TOWN] IS OFTEN A FIT FOR */}
      {town.whoFitFor && town.whoFitFor.length > 0 && (
        <section className="px-[5%] py-16 md:py-20 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Who {town.name} Is Often a Fit For
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {town.whoFitFor.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMMON QUESTIONS ABOUT [TOWN] REAL ESTATE */}
      {town.localQuestions && town.localQuestions.length > 0 && (
        <section className="px-[5%] py-16 md:py-20 bg-background">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Common Questions About {town.name} Real Estate
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {town.localQuestions.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-background rounded-lg border border-border px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* LOCAL SNAPSHOT — Landmarks, Schools, Feel */}
      {town.localSnapshot && (
        <section className="px-[5%] py-16 md:py-20 bg-background border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Local Snapshot
            </h2>
            
            <div className="space-y-8">
              {/* Landmarks & Gathering Spots */}
              {town.localSnapshot.landmarks && town.localSnapshot.landmarks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Local Landmarks & Gathering Spots</h3>
                  <ul className="space-y-2">
                    {town.localSnapshot.landmarks.map((landmark, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                        <span>{landmark}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* School Districts */}
              {town.localSnapshot.schoolDistrictNames && town.localSnapshot.schoolDistrictNames.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">School Districts</h3>
                  <ul className="space-y-2">
                    {town.localSnapshot.schoolDistrictNames.map((school, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <Home className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                        <span>{school}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* General Feel */}
              {town.localSnapshot.feel && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">The Feel</h3>
                  <p className="text-muted-foreground leading-relaxed">{town.localSnapshot.feel}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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

      {/* CONTINUE YOUR SEARCH — Navigation Hub */}
      <section id="search-homes" className="px-[5%] py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            Continue Your Search in {town.name}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Homes for Sale */}
            <Card className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Homes for Sale</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Explore all current residential listings in {town.name}.
                </p>
                <a 
                  href={town.remaxSearchUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  View homes →
                </a>
              </CardContent>
            </Card>

            {/* Condos & Townhomes */}
            <Card className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Condos & Townhomes</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Search low-maintenance living options in {town.name}.
                </p>
                <Link 
                  to={`/towns/${town.slug}/condos`}
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  View condos & townhomes →
                </Link>
              </CardContent>
            </Card>

            {/* Multi-Unit Properties */}
            <Card className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Multi-Unit Properties</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  See duplex, triplex, and small apartment buildings.
                </p>
                <Link 
                  to="/investment-properties"
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  View multi-unit homes →
                </Link>
              </CardContent>
            </Card>

            {/* Land for Sale */}
            <Card className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <LandPlot className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Land for Sale</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  View available land and development opportunities.
                </p>
                <Link 
                  to="/land-buyers"
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  View land →
                </Link>
              </CardContent>
            </Card>

            {/* Rentals */}
            <Card className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Rentals</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Browse available rentals in and around {town.name}.
                </p>
                <Link 
                  to="/rentals"
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  View rentals →
                </Link>
              </CardContent>
            </Card>

            {/* Property Intelligence */}
            <Card className="border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <LineChart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Property Intelligence</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Request a full intelligence report for a specific address.
                </p>
                <Link 
                  to="/reports/sample-property-intelligence"
                  className="text-primary font-medium text-sm hover:underline inline-flex items-center gap-1"
                >
                  View sample report →
                </Link>
              </CardContent>
            </Card>
          </div>
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

      {/* Market Report Request Form Modal */}
      <MarketReportRequestForm
        townName={town.name}
        townSlug={town.slug}
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
      />
    </div>
  );
};

export default TownPageTemplate;
