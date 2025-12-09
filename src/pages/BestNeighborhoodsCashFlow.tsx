import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, TrendingUp, Home, Building2, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const BestNeighborhoodsCashFlow = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Neighborhoods for Cash Flow in Albany, Troy & Schenectady",
    "author": {
      "@type": "Person",
      "name": "Scott Alvarez"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest"
    },
    "datePublished": "2025-01-01",
    "description": "Discover the best cash-flow neighborhoods in Albany, Troy, and Schenectady for real estate investors. Pine Hills, North Troy, and more."
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Best Neighborhoods for Cash Flow | Albany, Troy, Schenectady | Capital District Nest</title>
        <meta name="description" content="Find the best cash-flow neighborhoods in Albany, Troy, and Schenectady. Pine Hills, North Troy, Lansingburgh, and more high-ROI areas for investors." />
        <meta name="keywords" content="best neighborhoods Albany investing, Troy cash flow real estate, Schenectady investment properties, Pine Hills rentals, North Troy BRRRR, Capital District neighborhoods" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investor/best-neighborhoods-cash-flow-capital-district" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#022c22] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              NEIGHBORHOOD GUIDE
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Best Neighborhoods for Cash Flow
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Albany, Troy & Schenectady
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Not every block is equal. Some neighborhoods are built for high cap rates and strong rent growth, while others are better suited for long-term appreciation.
            </p>
          </div>
        </div>
      </section>

      {/* Albany Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <MapPin className="w-10 h-10 text-primary" />
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                1. Albany: Established Cash Flow + Stability
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">Pine Hills</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Strong demand from students and young professionals</li>
                    <li>• Mix of single-family and small multi-unit properties</li>
                    <li>• High rent turnover → frequent chance to adjust to market rates</li>
                  </ul>
                  <p className="text-foreground text-sm font-medium">
                    Good for: BRRRR strategies, student rentals, small multi-family.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">Center Square / Hudson Park</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Historic brownstones and row houses</li>
                    <li>• Walkable to downtown, Lark Street, and the Capitol</li>
                    <li>• Attractive to professionals and remote workers</li>
                  </ul>
                  <p className="text-foreground text-sm font-medium">
                    Good for: Long-term appreciation, premium rentals, mixed-use.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">Mansion District</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Older stock with strong character</li>
                    <li>• Value-add opportunities through renovation</li>
                    <li>• Proximity to state offices and downtown</li>
                  </ul>
                  <p className="text-foreground text-sm font-medium">
                    Good for: Investors comfortable with renovation and repositioning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Troy Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <TrendingUp className="w-10 h-10 text-primary" />
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                2. Troy: The Growth Engine of the Capital District
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">North Troy / Lansingburgh</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Some of the best cash-flow opportunities in the region</li>
                    <li>• Under-rented units with room to raise to market</li>
                    <li>• Many properties suitable for BRRRR</li>
                  </ul>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-foreground text-sm font-medium">
                      <strong>Why investors love it:</strong> Low acquisition prices + rising rents = high cap rates and strong cash-on-cash.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">Downtown Troy & Waterfront</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Coffee shops, restaurants, tech, and creative businesses</li>
                    <li>• Walkable lifestyle with river views</li>
                    <li>• New construction + renovated multi-units</li>
                  </ul>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-foreground text-sm font-medium">
                      <strong>Best for:</strong> Mixed-use, Airbnb (where allowed), and "live-work" type assets.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Schenectady Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Building2 className="w-10 h-10 text-primary" />
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                3. Schenectady: Affordability + Momentum
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">Union College Area & Downtown</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Strong student and young professional demand</li>
                    <li>• Walkable to Proctors, restaurants, and transit</li>
                    <li>• Renovated stock mixed with value-add deals</li>
                  </ul>
                  <p className="text-foreground text-sm font-medium">
                    Good for: Balanced appreciation and cash flow with a solid tenant base.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">Mont Pleasant, Hamilton Hill</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm mb-4">
                    <li>• Historically overlooked, now seeing investor attention</li>
                    <li>• Significant room to improve rents through renovation</li>
                    <li>• Some of the strongest cap rates in the market</li>
                  </ul>
                  <p className="text-foreground text-sm font-medium">
                    Good for: Experienced investors comfortable with management intensity and value-add.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes a Cash-Flow Neighborhood */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              4. What Makes a "Cash-Flow Neighborhood"?
            </h2>
            
            <Card className="bg-background/50 border-primary/20 mb-8">
              <CardContent className="p-8">
                <p className="text-foreground mb-6">When we evaluate neighborhoods, we look at:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Rent-to-price ratio',
                    'Local job anchors (hospitals, state jobs, colleges, logistics)',
                    'Crime and code enforcement trends',
                    'Rehab cost vs. ARV (after-repair value)',
                    'Tenant profile and demand stability'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-lg text-primary font-semibold">
                The sweet spot: Areas where rents are already solid, but prices haven't fully caught up yet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Matching Strategy */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              5. Matching Your Strategy to the Right Area
            </h2>
            
            <div className="space-y-6">
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">If you want maximum cash flow:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• North Troy / Lansingburgh</li>
                    <li>• Parts of Schenectady (triplexes, quads, small multi-units)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">If you want balance (cash flow + stability):</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Pine Hills</li>
                    <li>• Mansion District</li>
                    <li>• Union College / Downtown Schenectady</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-4">If you want appreciation with good income:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Center Square / Hudson Park</li>
                    <li>• Downtown Troy</li>
                    <li>• Saratoga Springs (as a separate play)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8">
              6. How We Help You Choose the Right Block
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              We don't just point you to a city—we help you choose the exact streets and assets that fit your:
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Budget', 'Risk tolerance', 'Financing type', 'Timeline'].map((item) => (
                <div key={item} className="px-4 py-3 bg-primary/10 rounded-lg text-center text-foreground font-medium">
                  {item}
                </div>
              ))}
            </div>

            <p className="text-foreground mb-6">For each potential deal, we can run:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Rent comps',
                'Neighborhood trend data',
                '5-year cap rate and appreciation assumptions',
                'Management and maintenance expectations'
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              7. Want a Neighborhood-Specific Shortlist?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">Tell us:</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              {['Your price range', 'Your down payment or available cash', 'Your preferred strategy'].map((item) => (
                <div key={item} className="px-4 py-3 bg-background/50 rounded-lg text-foreground text-sm">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-foreground mb-8">
              We'll send you a shortlist of target neighborhoods and property profiles that match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+15186762347" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: (518) 676-2347
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="sms:+15186762347?body=NEIGHBORHOODS%20-%20My%20budget%20is:" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Text "NEIGHBORHOODS"
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <LeadCaptureForm 
              type="investment"
              title="Get Your Neighborhood Strategy"
              description="Tell us your budget and goals for a custom neighborhood shortlist."
              buttonText="Send My Strategy"
            />
          </div>
        </div>
      </section>

      {/* More Investor Guides */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">More Investor Guides</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                to="/investor/albany-multi-unit-market" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">Albany Multi-Unit Market Report</h4>
                <p className="text-muted-foreground text-sm">Cap rates and rent trends for 2025.</p>
              </Link>
              <Link 
                to="/investor/nyc-to-albany-roi" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">NYC → Albany ROI Playbook</h4>
                <p className="text-muted-foreground text-sm">Why investors are moving upstate.</p>
              </Link>
              <Link 
                to="/investor/analyze-multifamily" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">How to Analyze Multi-Family</h4>
                <p className="text-muted-foreground text-sm">Step-by-step underwriting guide.</p>
              </Link>
              <Link 
                to="/investor/1031-nyc-to-albany" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">1031 Exchange Playbook</h4>
                <p className="text-muted-foreground text-sm">Tax-deferred investing strategy.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BestNeighborhoodsCashFlow;
