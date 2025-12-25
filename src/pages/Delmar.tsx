import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import DelmarMarketReport from "@/components/DelmarMarketReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  TrendingUp, 
  Building2, 
  BarChart3, 
  ArrowRight,
  DollarSign,
  Clock,
  Calendar,
  MapPin,
  Phone,
  CheckCircle2,
  Mail,
  FileText,
  GraduationCap,
  Search
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type UserPath = "buyer" | "homeowner" | "investor" | "data" | null;

const Delmar = () => {
  const [selectedPath, setSelectedPath] = useState<UserPath>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePathSelect = (path: UserPath) => {
    setSelectedPath(path);
    setTimeout(() => {
      document.getElementById("path-resources")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetSelection = () => {
    setSelectedPath(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

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
          phone: '',
          message: 'Delmar Nest Newsletter subscription',
          type: 'newsletter',
          boldtrailTag: 'delmar-nest-newsletter'
        }
      });

      if (error) throw error;
      
      toast.success("Welcome to the Delmar Nest!");
      setNewsletterEmail("");
      setNewsletterName("");
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Path content configurations
  const pathContent = {
    buyer: {
      title: "Buying a Home in Delmar",
      resources: [
        { label: "View Delmar Homes for Sale", href: "/delmar-homes-for-sale", icon: Home },
        { label: "Zero & Low Down Payment Programs", href: "/first-time-homebuyers", icon: DollarSign },
        { label: "Mortgage Assistance & Grants", href: "/grants", icon: CheckCircle2 },
        { label: "Bethlehem Central School Info", href: "/delmar-market-insights", icon: Building2 },
        { label: "Get Personalized Buyer Info", href: "/buyer-journey/first-time-buyer", icon: ArrowRight },
      ]
    },
    homeowner: {
      title: "What Is My Delmar Home Worth?",
      resources: [
        { label: "Recent Delmar Sales", href: "/delmar-market-insights", icon: TrendingUp },
        { label: "Top 10 Sales This Year", href: "/delmar-market-insights", icon: DollarSign },
        { label: "Price Trends & Analysis", href: "/delmar-market-insights", icon: BarChart3 },
        { label: "Get a Free Home Valuation", href: "/dealdesk", icon: Home },
      ]
    },
    investor: {
      title: "Investing in Delmar",
      resources: [
        { label: "Multi-Unit Properties", href: "/albany-multi-unit", icon: Building2 },
        { label: "Rent Estimates & Returns", href: "/investor/analyze-multifamily", icon: DollarSign },
        { label: "Cash Flow Calculator", href: "/investor-tools", icon: BarChart3 },
        { label: "Get a Free Intelligence Report", href: "/dealdesk", icon: ArrowRight },
      ]
    },
    data: {
      title: "Delmar Market Data",
      resources: [
        { label: "Market Trends & Charts", href: "/delmar-market-insights", icon: TrendingUp },
        { label: "Inventory & Days on Market", href: "/delmar-market-insights", icon: Clock },
        { label: "School District Rankings", href: "/delmar-market-insights", icon: Building2 },
        { label: "Demographics & Safety", href: "/delmar-market-insights", icon: MapPin },
      ]
    }
  };

  // Market snapshot data
  const marketSnapshot = [
    { label: "Median Price", value: "$475,000", change: "+4.2%" },
    { label: "Days on Market", value: "18", change: "-3 days" },
    { label: "YoY Change", value: "+5.8%", change: "appreciation" },
    { label: "Price Range", value: "$280K–$850K", change: "active" },
  ];

  // Recently sold data
  const recentlySold = [
    { address: "142 Elsmere Ave", price: "$425,000", beds: 3, baths: 2, date: "Dec 2024" },
    { address: "38 Fernbank Ave", price: "$512,000", beds: 4, baths: 2.5, date: "Dec 2024" },
    { address: "19 Greenleaf Dr", price: "$389,000", beds: 3, baths: 1.5, date: "Nov 2024" },
    { address: "85 Roweland Ave", price: "$445,000", beds: 4, baths: 2, date: "Nov 2024" },
    { address: "211 Murray Ave", price: "$525,000", beds: 4, baths: 2.5, date: "Nov 2024" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Delmar NY Real Estate | Homes for Sale & Market Trends (Updated)</title>
        <meta 
          name="description" 
          content="Explore Delmar NY homes for sale, recent sales, and live market data. Get a free intelligence report on any Delmar property." 
        />
        <meta 
          name="keywords" 
          content="Delmar NY real estate, Delmar homes for sale, Delmar housing market, Delmar NY home prices, Bethlehem Central School District homes" 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/delmar" />
      </Helmet>

      <MainHeader />

      {/* Hero Section */}
      <section className="relative px-[5%] py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Bethlehem Central School District
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            Delmar NY Real Estate & Homes for Sale
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            Homes, prices, financing, and local insight — all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg font-bold w-full sm:w-auto"
              asChild
            >
              <Link to="/delmar-homes-for-sale">
                <Home className="w-5 h-5 mr-2" />
                View Delmar Homes
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-14 px-8 text-lg font-semibold w-full sm:w-auto"
              asChild
            >
              <Link to="/dealdesk">
                Get My Delmar Report
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Start Here - Guided Entry Section */}
      <section className="px-[5%] py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Delmar Home Search the Smart Way
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Answer one question and I'll point you in the right direction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Button
              size="lg"
              className="h-16 text-lg font-semibold flex items-center justify-center gap-3"
              onClick={() => scrollToSection("search-homes")}
            >
              <Home className="w-5 h-5" />
              I'm Buying a Home in Delmar
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 text-lg font-semibold flex items-center justify-center gap-3 border-primary text-primary hover:bg-primary/10"
              onClick={() => scrollToSection("intelligence-report")}
            >
              <DollarSign className="w-5 h-5" />
              I'm an Investor / Analyzing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 text-lg font-semibold flex items-center justify-center gap-3"
              onClick={() => scrollToSection("market-snapshot")}
            >
              <BarChart3 className="w-5 h-5" />
              I Just Want Market Data
            </Button>
          </div>
        </div>
      </section>

      {/* What Are You Looking For Section */}
      <section id="start-here" className="px-[5%] py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What are you looking to do in Delmar?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select your path and we'll show you exactly what you need.
            </p>
          </div>

          {!selectedPath ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 - Homebuyer */}
              <Card 
                className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                onClick={() => handlePathSelect("buyer")}
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Home className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">I'm Buying in Delmar</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    Homes for sale, low/zero down programs, mortgage help, schools
                  </p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Resources <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>

              {/* Card 2 - Homeowner */}
              <Card 
                className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                onClick={() => handlePathSelect("homeowner")}
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">What Is My Home Worth?</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    Recent sales, top 10 sales, price trends, value insights
                  </p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Resources <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>

              {/* Card 3 - Investor */}
              <Card 
                className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                onClick={() => handlePathSelect("investor")}
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">I'm Exploring Investment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    2–4 units, rent estimates, example returns, free report
                  </p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Resources <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>

              {/* Card 4 - Data */}
              <Card 
                className="group cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                onClick={() => handlePathSelect("data")}
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">I Want the Data</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4">
                    Market trends, inventory, days on market, charts
                  </p>
                  <span className="text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Resources <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Path Resources */
            <div id="path-resources" className="scroll-mt-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-foreground">
                  {pathContent[selectedPath].title}
                </h3>
                <Button variant="ghost" onClick={resetSelection} className="text-muted-foreground">
                  ← Back to all paths
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pathContent[selectedPath].resources.map((resource, index) => (
                  <Link 
                    key={index} 
                    to={resource.href}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <resource.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {resource.label}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button size="lg" asChild>
                  <Link to="/dealdesk">
                    <Phone className="w-5 h-5 mr-2" />
                    Talk to a Local Expert
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Market Snapshot */}
      <section id="market-snapshot" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Delmar Market Snapshot
            </h2>
            <p className="text-muted-foreground text-lg">
              Key numbers buyers and sellers need — updated regularly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {marketSnapshot.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-primary font-medium">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Human paragraph for SEO */}
          <div className="max-w-3xl mx-auto mt-10 p-6 bg-muted/30 rounded-xl border border-border">
            <p className="text-muted-foreground leading-relaxed text-center">
              Delmar is not a one-price market. Homes can sell very differently depending on street, 
              school boundary, and condition. Online estimates often miss this. I review actual sales, 
              not just list prices, so buyers understand what a home is really worth before making an offer.
            </p>
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/delmar-market-insights">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Full Market Analytics
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Delmar Market Report (RPR PDF) */}
      <DelmarMarketReport />

      {/* Search Delmar Homes */}
      <section id="search-homes" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Search Delmar Homes
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse current listings in Bethlehem Central School District.
            </p>
          </div>

          {/* RE/MAX Search Embed */}
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-0">
              <div className="aspect-[16/10] min-h-[500px]">
                <iframe
                  title="Delmar Home Search"
                  src="https://www.albanyrealestate.net/search/results/quick/1/latlonbox/42.5685,42.6186,-73.8553,-73.7859/"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button size="lg" asChild>
              <Link to="/delmar-homes-for-sale">
                <Search className="w-5 h-5 mr-2" />
                View All Delmar Listings
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:518-676-2347">
                <Phone className="w-5 h-5 mr-2" />
                Call: 518-676-2347
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Intelligence Report CTA */}
      <section id="intelligence-report" className="px-[5%] py-16 md:py-20 bg-primary/5 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Free Property Analysis
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get a Free Intelligence Report on Any Delmar Property
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rent potential, taxes, cash flow, cap rate, and comparable sales — all in one personalized breakdown. 
            No bots. No generic MLS links. Real numbers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="h-14 px-10 text-lg font-bold w-full sm:w-auto"
              asChild
            >
              <Link to="/dealdesk">
                <FileText className="w-5 h-5 mr-2" />
                Get My Free Intelligence Report
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              or text any address to <a href="tel:518-676-2347" className="text-primary font-medium hover:underline">518-676-2347</a>
            </p>
          </div>
        </div>
      </section>

      {/* Buyer Tools */}
      <section className="px-[5%] py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Buyer Tools & Resources
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to buy smarter in Delmar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/first-time-homebuyers" className="group">
              <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Zero Down Programs</h3>
                  <p className="text-muted-foreground text-sm">
                    First-time buyer assistance, FHA, VA, and grant programs available in NY.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/grants" className="group">
              <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Mortgage Grants</h3>
                  <p className="text-muted-foreground text-sm">
                    NYS grants and down payment assistance you may qualify for.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/delmar-market-insights" className="group">
              <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">School District Info</h3>
                  <p className="text-muted-foreground text-sm">
                    Bethlehem Central School District rankings and boundary info.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Recently Sold */}
      <section className="px-[5%] py-16 md:py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recently Sold in Delmar
            </h2>
            <p className="text-muted-foreground text-lg">
              See what homes are actually selling for in your neighborhood.
            </p>
          </div>

          <div className="grid gap-4">
            {recentlySold.map((sale, index) => (
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

      {/* Delmar Nest Newsletter */}
      <section id="newsletter" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Delmar Nest Newsletter
                </h2>
                <p className="text-muted-foreground">
                  Weekly: homes sold, prices, and what it means for buyers.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="First name"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  className="h-12"
                  required
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="h-12"
                  required
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-12 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join the Delmar Nest"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join the Delmar Nest - Lead Capture */}
      <section id="join-nest" className="px-[5%] py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Personalized Delmar Help
            </h2>
            <p className="text-muted-foreground text-lg">
              Looking for something specific? Tell us about your search and we'll send relevant options.
            </p>
          </div>

          <LeadCaptureForm 
            type="report"
            title="Let's Talk Delmar"
            description="Enter your info below for personalized Delmar real estate updates."
            buttonText="Get Started"
          />
        </div>
      </section>

      {/* Trust Footer */}
      <section className="px-[5%] py-12 bg-muted/50 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Powered by RE/MAX
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Local Expertise
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Real Data, No Guessing
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
            Get Free Intelligence Report
          </Link>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Delmar;
