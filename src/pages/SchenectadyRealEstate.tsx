import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const SchenectadyRealEstate = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Capital District Nest - Schenectady Real Estate",
    "description": "Expert real estate analysis and investment opportunities in Schenectady, NY",
    "areaServed": {
      "@type": "City",
      "name": "Schenectady",
      "addressRegion": "NY"
    },
    "serviceType": ["Real Estate Analysis", "Investment Properties", "Rental Properties"],
    "url": "https://capitaldistrictnest.com/schenectady-real-estate"
  };

  return (
    <>
      <SEOHead
        title="Schenectady NY Real Estate Analysis & Investment Properties | Capital District Nest"
        description="Expert analysis of Schenectady NY real estate market, investment properties, and rental opportunities. Data-driven insights for Schenectady homes and multi-unit properties."
        keywords="Schenectady NY real estate, Schenectady investment properties, Schenectady rental properties, Schenectady home analysis, Schenectady NY housing market"
        canonical="https://capitaldistrictnest.com/schenectady-real-estate"
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
                Schenectady NY Real Estate Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Expert data-driven analysis of Schenectady real estate market, investment opportunities, and rental properties. 
                Discover the Electric City's affordable housing and emerging investment potential.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Latest Schenectady Analysis
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Schenectady Neighborhoods
                </Button>
              </div>
            </div>
          </section>

          {/* Market Overview */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Schenectady Real Estate Market Overview</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Affordable Housing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Schenectady offers some of the most affordable housing in the Capital District, 
                      with excellent value for first-time buyers and investors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      High Cash Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Strong rental demand from Union College students, GE employees, and young professionals 
                      creates excellent cash-on-cash returns for investors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Urban Renewal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Downtown revitalization efforts and new development projects are driving 
                      property appreciation in key Schenectady neighborhoods.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Schenectady Neighborhoods */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Schenectady Neighborhoods</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Downtown", description: "Urban renewal, new developments" },
                  { name: "Union College Area", description: "Student housing, rental demand" },
                  { name: "GE Realty Plot", description: "Historic district, family homes" },
                  { name: "Mont Pleasant", description: "Affordable housing, investment potential" }
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

          {/* Recent Schenectady Analysis */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recent Schenectady Property Analysis</h2>
              <div className="text-center">
                <p className="text-muted-foreground mb-8">
                  Daily analysis of Schenectady properties with data-driven insights, investment potential, 
                  and rental income projections for the Electric City market.
                </p>
                <Button asChild size="lg">
                  <Link to="/blog">View All Schenectady Analysis</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Invest in Schenectady Real Estate?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get expert analysis on any Schenectady property before you buy. We provide objective, 
                data-driven insights to help you capitalize on affordable investment opportunities.
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

export default SchenectadyRealEstate;