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
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import GuideLeadModal from "@/components/GuideLeadModal";

const SchenectadyCountyIntelligence = () => {
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Capital District Nest - Schenectady County Real Estate Intelligence",
    "description": "Sales, rentals, cash flow, and neighborhood trends for Schenectady County — built for buyers and investors who want real numbers.",
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

  return (
    <MainLayout>
      <SEOHead
        title="Schenectady County Real Estate Intelligence | Market Data & Investment Analysis"
        description="Sales, rentals, cash flow, and neighborhood trends for Schenectady County. Wall Street tools with Main Street soul. Get a free property intelligence report."
        keywords="Schenectady County real estate, Schenectady investment properties, Schenectady market data, Schenectady rental analysis, Schenectady County homes, Schenectady cash flow"
        canonical="https://capitaldistrictnest.com/schenectady-county-real-estate"
        structuredData={structuredData}
      />
      
        <main className="pt-20">
          {/* HERO SECTION */}
          <section className="py-20 md:py-28 px-4 relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
            
            <div className="max-w-5xl mx-auto text-center relative z-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                <span className="text-foreground">Schenectady County</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Real Estate Intelligence
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
                Sales, rentals, cash flow, and neighborhood trends — built for buyers and investors who want real numbers.
              </p>
              
              <p className="text-sm text-muted-foreground/70 mb-10">
                <span className="font-medium">Wall Street Tools. Main Street Soul.</span>
                <br />
                Powered by RE/MAX
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-base font-semibold"
                  onClick={() => setGuideModalOpen(true)}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Get a Free Property Intelligence Report
                </Button>
                <Link 
                  to="/schenectady-real-estate" 
                  className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                >
                  View the Schenectady Market Map
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* LIVE MARKET MAP SECTION */}
          <section className="py-16 px-4 bg-card/50 border-y border-border">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Live Market Map — Schenectady County
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore recent sales, active listings, and multi-family properties using verified local data.
                </p>
              </div>
              
              {/* Map Placeholder - V1 Static */}
              <div className="relative rounded-xl border border-border bg-muted/30 overflow-hidden">
                <div className="aspect-[16/9] flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg mb-6">
                      Interactive market map coming soon
                    </p>
                    {/* Map Legend Toggles */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm">Recent Sales</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm">Active Listings</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <span className="text-sm">Multi-Family</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span className="text-sm">Single-Family</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SCHENECTADY AT A GLANCE */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Schenectady County at a Glance
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold">$195K</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-foreground">Median Sale Price</p>
                    <p className="text-xs text-muted-foreground mt-1">Residential properties countywide</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Home className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold">$1,450</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-foreground">Average Rent (2–4 Units)</p>
                    <p className="text-xs text-muted-foreground mt-1">Based on verified local leases</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold">7–10%</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-foreground">Typical Cap Rate Range</p>
                    <p className="text-xs text-muted-foreground mt-1">Small residential multi-family</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-3xl font-bold">8–14%</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-foreground">Cash-on-Cash Range</p>
                    <p className="text-xs text-muted-foreground mt-1">Conservative leverage assumptions</p>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-8">
                Data sourced from local transactions and updated regularly.
              </p>
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

          {/* INVESTOR TOOLS */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Investor Tools & Analysis
              </h2>
              <p className="text-muted-foreground mb-10">
                Built by a Capital District investment team — not scraped estimates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="h-12 px-6"
                  onClick={() => setGuideModalOpen(true)}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Run a Property Analysis
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-6"
                  asChild
                >
                  <Link to="/schenectady-multi-unit">
                    <Home className="w-5 h-5 mr-2" />
                    View Recent Multi-Family Sales
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-6"
                  onClick={() => setGuideModalOpen(true)}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Request a Free Intelligence Report
                </Button>
              </div>
            </div>
          </section>

          {/* AUTHORITY / TRUST */}
          <section className="py-20 px-4 bg-card/50 border-t border-border">
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
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-2">
                  <span className="font-semibold text-foreground">Capital District Nest</span> — a tech-enabled real estate investment team.
                </p>
                <p className="text-sm text-muted-foreground">
                  Powered by RE/MAX.
                </p>
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="py-20 px-4">
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
