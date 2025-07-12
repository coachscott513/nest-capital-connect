import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const SaratogaRealEstate = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Capital District Nest - Saratoga Real Estate",
    "description": "Expert real estate analysis and investment opportunities in Saratoga Springs, NY",
    "areaServed": {
      "@type": "City",
      "name": "Saratoga Springs",
      "addressRegion": "NY"
    },
    "serviceType": ["Real Estate Analysis", "Investment Properties", "Rental Properties"],
    "url": "https://capitaldistrictnest.com/saratoga-real-estate"
  };

  return (
    <>
      <SEOHead
        title="Saratoga Springs NY Real Estate Analysis & Investment Properties | Capital District Nest"
        description="Expert analysis of Saratoga Springs NY real estate market, luxury homes, and investment properties. Data-driven insights for Saratoga's premium market."
        keywords="Saratoga Springs NY real estate, Saratoga investment properties, Saratoga luxury homes, Saratoga Springs home analysis, Saratoga NY housing market"
        canonical="https://capitaldistrictnest.com/saratoga-real-estate"
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
                Saratoga Springs NY Real Estate Analysis
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Expert data-driven analysis of Saratoga Springs real estate market, luxury homes, and investment properties. 
                Navigate the Spa City's premium market with confidence and insight.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Latest Saratoga Analysis
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Saratoga Neighborhoods
                </Button>
              </div>
            </div>
          </section>

          {/* Market Overview */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Saratoga Springs Real Estate Market Overview</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Luxury Market
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Saratoga Springs offers some of the finest luxury homes in the Capital District, 
                      from historic mansions to modern estates near the racetrack.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Tourism Economy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Strong seasonal tourism and racing season create unique short-term rental opportunities 
                      and consistent property value appreciation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Premium Appreciation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Saratoga's limited inventory, desirable location, and cultural attractions 
                      drive consistent long-term appreciation for quality properties.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Featured Saratoga Neighborhoods */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Featured Saratoga Springs Neighborhoods</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Downtown Historic", description: "Victorian mansions, walkable luxury" },
                  { name: "East Side", description: "Family neighborhoods, excellent schools" },
                  { name: "Near Race Track", description: "Seasonal rentals, tourism proximity" },
                  { name: "Skidmore Area", description: "Student housing, investment potential" }
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

          {/* Recent Saratoga Analysis */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recent Saratoga Property Analysis</h2>
              <div className="text-center">
                <p className="text-muted-foreground mb-8">
                  Daily analysis of Saratoga Springs properties with data-driven insights, investment potential, 
                  and market dynamics for the Spa City's premium real estate market.
                </p>
                <Button asChild size="lg">
                  <Link to="/blog">View All Saratoga Analysis</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Invest in Saratoga Springs Real Estate?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get expert analysis on any Saratoga property before you buy. We provide objective, 
                data-driven insights to help you navigate the luxury market with confidence.
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

export default SaratogaRealEstate;