import SEOHead from "@/components/SEOHead";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const AlbanyRealEstate = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Capital District Nest - Albany Real Estate",
    "description": "Expert real estate analysis and investment opportunities in Albany, NY",
    "areaServed": {
      "@type": "City",
      "name": "Albany",
      "addressRegion": "NY"
    },
    "serviceType": ["Real Estate Analysis", "Investment Properties", "Rental Properties"],
    "url": "https://capitaldistrictnest.com/albany-real-estate"
  };

  return (
    <>
      <SEOHead
        title="Albany NY Real Estate Analysis & Investment Properties | Capital District Nest"
        description="Expert analysis of Albany NY real estate market, investment properties, and rental opportunities. Data-driven insights for Albany homes and multi-unit properties."
        keywords="Albany NY real estate, Albany investment properties, Albany rental properties, Albany home analysis, Albany NY housing market"
        canonical="https://capitaldistrictnest.com/albany-real-estate"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <BreadcrumbNavigation />
        <MainHeader />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Albany NY Real Estate Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Expert data-driven analysis of Albany real estate market, investment opportunities, and rental properties. 
                Get objective insights on every property before you buy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Latest Albany Analysis
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Albany Neighborhoods
                </Button>
              </div>
            </div>
          </section>

          {/* Why Invest in Albany Section */}
          <section className="py-16 px-4 bg-card border-y border-border">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why Invest in Albany Real Estate? <span className="text-primary">(2025 Market Outlook)</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Albany offers one of the most stable multi-family investment markets in New York State, 
                driven by two recession-resistant economic anchors: <strong className="text-foreground">State Government</strong> and <strong className="text-foreground">Healthcare</strong>.
              </p>

              <div className="space-y-8">
                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-3 text-primary">The "Albany Med" Effect</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With Albany Medical Center currently undertaking a <strong className="text-foreground">$25 million expansion</strong> of its 
                    emergency department (slated for 2026 completion), demand for workforce housing in the 
                    <strong className="text-foreground"> Park South and Pine Hills</strong> neighborhoods is surging. Medical residents, nurses, 
                    and hospital staff provide a reliable, high-credit-quality tenant base for duplex and triplex owners.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-3 text-primary">Stable Rents, Low Volatility</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unlike volatile coastal markets, Albany provides consistent cash flow. The massive state worker 
                    population ensures <strong className="text-foreground">low vacancy rates</strong>, while the "Championing Albany's Potential" (CAP) 
                    initiative is injecting <strong className="text-foreground">$400 million</strong> into downtown revitalization, driving long-term 
                    appreciation for buy-and-hold investors.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/30 p-6 rounded-xl">
                  <p className="text-lg font-semibold">
                    <span className="text-primary">Best For:</span> Buy-and-hold investors looking for 2-4 unit properties 
                    with steady cash flow and low vacancy risk.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Market Overview */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Albany Real Estate Market Overview</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Single Family Homes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Albany's historic neighborhoods offer diverse single-family options from Victorian homes 
                      in Center Square to modern builds in newer developments.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Investment Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Strong rental demand from state workers, college students, and medical professionals 
                      creates excellent cash flow opportunities in Albany.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Market Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Albany's stable government employment base and growing tech sector provide 
                      consistent real estate demand and appreciation potential.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Albany Neighborhoods */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Albany Neighborhoods</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Center Square", description: "Historic Victorian homes, walkable downtown" },
                  { name: "Pine Hills", description: "Student housing, multi-unit opportunities" },
                  { name: "Helderberg", description: "Family neighborhoods, suburban feel" },
                  { name: "Arbor Hill", description: "Emerging area, investment potential" }
                ].map((neighborhood) => (
                  <Card key={neighborhood.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{neighborhood.description}</CardDescription>
                      <Button variant="link" className="p-0 mt-2">
                        View Properties →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Albany Analysis */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recent Albany Property Analysis</h2>
              <div className="text-center">
                <p className="text-muted-foreground mb-8">
                  Daily analysis of Albany properties with data-driven insights, investment potential, 
                  and rental income projections.
                </p>
                <Button asChild size="lg">
                  <Link to="/blog">View All Albany Analysis</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Invest in Albany Real Estate?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get expert analysis on any Albany property before you buy. We provide objective, 
                data-driven insights to help you make informed investment decisions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow">
                  Get Property Analysis
                </Button>
                <Button variant="outline" size="lg">
                  Contact Our Team
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AlbanyRealEstate;