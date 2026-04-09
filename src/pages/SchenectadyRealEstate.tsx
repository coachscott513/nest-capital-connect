import SEOHead from "@/components/SEOHead";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import BreadcrumbNavigation from "@/components/BreadcrumbNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, DollarSign, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the median home price in Schenectady NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The median list price in Schenectady NY is approximately $279,900 as of April 2026, with active inventory averaging 20 days on market."
        }
      },
      {
        "@type": "Question",
        "name": "Is Schenectady NY a good place to invest in rental property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Schenectady offers some of the Capital District's strongest rental yields, with duplexes available from $209,000 and multi-family properties generating cap rates in the 5-8% range. The city's proximity to Union College and Ellis Hospital creates consistent rental demand."
        }
      },
      {
        "@type": "Question",
        "name": "How fast are homes selling in the Stockade District Schenectady?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Properties in desirable Schenectady neighborhoods including the Stockade District are going under contract in 20-25 days on average as of 2026, reflecting strong buyer demand."
        }
      }
    ]
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      <div className="min-h-screen bg-background">
        <BreadcrumbNavigation />
        <MainHeader />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Know Schenectady. Master your deal.
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Expert guides for families. Hard math for investors. Zero noise.
              </p>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-10">
                Schenectady is the region's #2 migration destination. With a $230k median list price and a new $7M tech hub coming to Niskayuna, the yield potential here is unmatched.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow" asChild>
                  <Link to="/analyze">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Run the Numbers
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/towns/schenectady">
                    <MapPin className="w-5 h-5 mr-2" />
                    Explore Schenectady Neighborhoods
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Market Overview */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Schenectady Real Estate — Vetted Local Insights</h2>
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
                      <Button variant="link" className="p-0 mt-2" asChild>
                        <Link to="/towns/schenectady">View Properties →</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Schenectady Analysis + Internal Link to /analyze */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Recent Schenectady Property Analysis</h2>
              <div className="text-center">
                <p className="text-muted-foreground mb-8">
                  Daily analysis of Schenectady properties with investor intel, cash flow projections, 
                  and rental income estimates for the Electric City market.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link to="/blog">View All Schenectady Analysis</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/analyze">Analyze a Schenectady Deal →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ / AEO Section */}
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Schenectady Real Estate — Investor Intel</h2>
              <p className="text-center text-muted-foreground mb-10">
                Answers to the most common questions about buying and investing in Schenectady, NY.
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="price">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    What is the median home price in Schenectady NY?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    The median list price in Schenectady NY is approximately <strong>$279,900</strong> as of April 2026, 
                    with active inventory averaging <strong>20 days</strong> on market.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="investing">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    Is Schenectady NY a good place to invest in rental property?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Schenectady offers some of the Capital District's strongest rental yields, with duplexes available 
                    from <strong>$209,000</strong> and multi-family properties generating cap rates in the <strong>5–8% range</strong>. 
                    The city's proximity to Union College and Ellis Hospital creates consistent rental demand. 
                    <Link to="/analyze" className="text-primary hover:underline ml-1">Run the numbers on a Schenectady deal →</Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="stockade">
                  <AccordionTrigger className="text-lg font-semibold text-left">
                    How fast are homes selling in the Stockade District Schenectady?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Properties in desirable Schenectady neighborhoods including the Stockade District are going 
                    under contract in <strong>20–25 days</strong> on average as of 2026, reflecting strong buyer demand.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Invest in Schenectady Real Estate?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get vetted local insights on any Schenectady property before you buy. We provide objective, 
                data-driven analysis to help you capitalize on affordable investment opportunities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary-glow" asChild>
                  <Link to="/analyze">Run the Numbers</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Contact Our Team</Link>
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
