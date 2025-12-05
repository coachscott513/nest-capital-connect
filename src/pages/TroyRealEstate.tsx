import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const TroyRealEstate = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Capital District Nest - Troy Real Estate",
    "description": "Expert real estate analysis and investment opportunities in Troy, NY",
    "areaServed": {
      "@type": "City",
      "name": "Troy",
      "addressRegion": "NY"
    },
    "serviceType": ["Real Estate Analysis", "Investment Properties", "Rental Properties"],
    "url": "https://capitaldistrictnest.com/troy-real-estate"
  };

  return (
    <>
      <SEOHead
        title="Troy NY Real Estate Analysis & Investment Properties | Capital District Nest"
        description="Expert analysis of Troy NY real estate market, investment properties, and rental opportunities. Data-driven insights for Troy homes and multi-unit properties."
        keywords="Troy NY real estate, Troy investment properties, Troy rental properties, Troy home analysis, Troy NY housing market"
        canonical="https://capitaldistrictnest.com/troy-real-estate"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <BreadcrumbNavigation />
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Troy NY Real Estate Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Expert data-driven analysis of Troy real estate market, investment opportunities, and rental properties. 
                Discover the hidden gems in the Collar City's evolving neighborhoods.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Latest Troy Analysis
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Troy Neighborhoods
                </Button>
              </div>
            </div>
          </section>

          {/* Why Invest in Troy Section */}
          <section className="py-16 px-4 bg-card border-y border-border">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why Invest in Troy, NY? <span className="text-primary">(The "Brooklyn of the North")</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Troy has rapidly evolved into the Capital District's hottest appreciation play. Known as the 
                <strong className="text-foreground"> "Brooklyn of the North"</strong> for its walkable Victorian downtown and Hudson River 
                waterfront, Troy offers a unique mix of student housing demand and luxury rental potential.
              </p>

              <div className="space-y-8">
                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-3 text-primary">The RPI Student Housing Engine</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Home to <strong className="text-foreground">Rensselaer Polytechnic Institute (RPI)</strong> and Russell Sage College, Troy has a 
                    perpetual shortage of quality off-campus housing. With RPI enrolling over <strong className="text-foreground">7,000 students</strong>, 
                    multi-family properties near "The Hill" and downtown consistently command premium rents per bedroom, 
                    often exceeding <strong className="text-foreground">1% Rule benchmarks</strong>.
                  </p>
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-3 text-primary">Historic Appreciation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    While Albany offers stability, Troy offers <strong className="text-foreground">growth</strong>. The median home price in Troy has risen 
                    <strong className="text-foreground"> ~5.4% year-over-year (2025)</strong>, outpacing many surrounding suburbs. Investors are finding 
                    success converting distressed Victorian homes into high-end apartments for young professionals 
                    commuting to Albany or working remotely.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/30 p-6 rounded-xl">
                  <p className="text-lg font-semibold">
                    <span className="text-primary">Best For:</span> BRRRR (Buy, Rehab, Rent, Refinance, Repeat) investors 
                    and those seeking value-add flips in a high-appreciation market.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Market Overview */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Troy Real Estate Market Overview</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Historic Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Troy's rich architectural heritage offers unique Victorian and Federal-style homes 
                      with modern renovation opportunities in historic districts.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      RPI Student Housing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Strong rental demand from RPI students and faculty creates consistent cash flow 
                      opportunities, especially in multi-unit properties near campus.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Revitalization Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Troy's downtown revitalization and tech sector growth are driving increased 
                      property values and investment opportunities throughout the city.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Troy Neighborhoods */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Troy Neighborhoods</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Downtown Troy", description: "Historic district, walkable, dining scene" },
                  { name: "Lansingburgh", description: "Affordable housing, family neighborhoods" },
                  { name: "South Troy", description: "Near RPI, student housing demand" },
                  { name: "Oakwood Cemetery Area", description: "Quiet residential, historic homes" }
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

          {/* Recent Troy Analysis */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recent Troy Property Analysis</h2>
              <div className="text-center">
                <p className="text-muted-foreground mb-8">
                  Daily analysis of Troy properties with data-driven insights, investment potential, 
                  and rental income projections for the Collar City market.
                </p>
                <Button asChild size="lg">
                  <Link to="/blog">View All Troy Analysis</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Invest in Troy Real Estate?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get expert analysis on any Troy property before you buy. We provide objective, 
                data-driven insights to help you capitalize on Troy's growing market.
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

export default TroyRealEstate;