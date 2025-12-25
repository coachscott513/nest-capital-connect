import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  CheckCircle2
} from "lucide-react";

type UserPath = "buyer" | "homeowner" | "investor" | "data" | null;

const Delmar = () => {
  const [selectedPath, setSelectedPath] = useState<UserPath>(null);

  const handlePathSelect = (path: UserPath) => {
    setSelectedPath(path);
    // Scroll to resources section
    setTimeout(() => {
      document.getElementById("path-resources")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetSelection = () => {
    setSelectedPath(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Recently sold data (example)
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
        <title>Delmar Real Estate — Made Simple | Capital District Nest</title>
        <meta 
          name="description" 
          content="Homes, prices, financing, and local insight for Delmar, NY — all in one place. Explore listings, market data, and buyer programs in Bethlehem's premier community." 
        />
        <meta 
          name="keywords" 
          content="Delmar real estate, Delmar homes for sale, Bethlehem Central Schools, Albany County real estate, Delmar NY, Capital District homes" 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/delmar" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative px-[5%] py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Bethlehem Central School District
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
            Delmar Real Estate<br />
            <span className="text-primary">Made Simple</span>
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

      {/* Guided Journey Deck */}
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
      <section className="px-[5%] py-16 md:py-20 bg-background">
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

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Want weekly Delmar updates delivered to your inbox?
            </p>
            <Button size="lg" asChild>
              <Link to="#join-nest">
                Get Weekly Delmar Updates
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Join the Delmar Nest */}
      <section id="join-nest" className="px-[5%] py-16 md:py-20 bg-background scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the Delmar Nest
            </h2>
            <p className="text-muted-foreground text-lg">
              Get local market updates, new listings, and buyer resources — no spam, just value.
            </p>
          </div>

          <LeadCaptureForm 
            type="report"
            title="Stay Connected"
            description="Enter your info below for personalized Delmar real estate updates."
            buttonText="Join the Nest"
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

      <Footer />
    </div>
  );
};

export default Delmar;
