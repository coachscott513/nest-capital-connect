import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Building2, Home, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const AlbanyMultiUnitMarket = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Albany Multi-Unit Market Report 2025: Cap Rates, Rent Trends, and Investment Outlook",
    "author": {
      "@type": "Person",
      "name": "Scott Alvarez"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest"
    },
    "datePublished": "2025-01-01",
    "description": "2025 Capital District multi-unit market report covering cap rates, rent trends, best neighborhoods, and investment outlook for Albany, Troy, Schenectady, and Saratoga."
  };

  const capRates = [
    { city: 'Albany', rate: '6–8%', color: 'text-primary' },
    { city: 'Troy', rate: '7–10%', color: 'text-primary' },
    { city: 'Schenectady', rate: '7–12%', note: '(fastest improving market)', color: 'text-primary' },
    { city: 'Saratoga Springs', rate: '5–7%', note: '(premium luxury market)', color: 'text-primary' },
  ];

  const rentGrowth = [
    { city: 'Troy', growth: '+12%' },
    { city: 'Schenectady', growth: '+9.1%' },
    { city: 'Albany', growth: '+6.5%' },
    { city: 'Saratoga', growth: '+5.8%' },
  ];

  const neighborhoods = {
    'Albany': ['Pine Hills', 'Center Square', 'Mansion District', 'New Scotland Ave'],
    'Troy': ['North Troy (BRRRR-friendly)', 'Lansingburgh', 'Downtown Waterfront Area'],
    'Schenectady': ['Union College Area', 'Mont Pleasant', 'Downtown Corridor'],
    'Saratoga': ['Geyser Crest', 'Downtown Saratoga Mixed-Use'],
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Albany Multi-Unit Market Report 2025 | Cap Rates & Rent Trends | Capital District Nest</title>
        <meta name="description" content="2025 Capital District multi-unit market report: 6-12% cap rates, 12% rent growth in Troy, best neighborhoods for investing in Albany, Troy, Schenectady, Saratoga." />
        <meta name="keywords" content="Albany multi-unit market, Capital District cap rates, Troy rent growth, Schenectady investment, Albany real estate 2025, multi-family investing NY" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investor/albany-multi-unit-market" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#022c22] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              2025 MARKET REPORT
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Albany Multi-Unit Market Report 2025
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Cap Rates, Rent Trends, and Investment Outlook for the Capital District
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Capital District has become New York's strongest cash-flow market, outperforming NYC, Long Island, and Westchester by a large margin.
            </p>
          </div>
        </div>
      </section>

      {/* Report Overview */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <p className="text-foreground mb-4">This report summarizes 2025 data, including:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Cap rate trends', 'Rent growth', 'Best neighborhoods', 'Property types performing best', 'Multi-unit demand', 'Investment outlook'].map((item) => (
                    <span key={item} className="px-3 py-2 bg-background rounded-lg text-muted-foreground text-sm">{item}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cap Rates Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              1. Current Cap Rates in the Capital District
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {capRates.map((item) => (
                <Card key={item.city} className="bg-background/50 border-primary/20 text-center">
                  <CardContent className="p-6">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-playfair text-xl font-bold text-foreground mb-2">{item.city}</h3>
                    <p className={`text-2xl font-bold ${item.color}`}>{item.rate}</p>
                    {item.note && <p className="text-sm text-muted-foreground mt-1">{item.note}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Card className="inline-block bg-muted/20 border-muted/30">
                <CardContent className="p-4">
                  <p className="text-muted-foreground">NYC average cap rate: <span className="text-destructive font-bold">3–4.5%</span></p>
                </CardContent>
              </Card>
              <p className="text-lg text-primary font-semibold mt-4">
                The Capital District consistently returns 2–3× more income per invested dollar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rent Growth Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              2. Rent Growth Overview
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">2024–2025 YoY Rental Growth</h3>
                  <div className="space-y-4">
                    {rentGrowth.map((item, index) => (
                      <div key={item.city} className="flex justify-between items-center py-2 border-b border-primary/20 last:border-0">
                        <span className="text-foreground font-medium">{item.city}</span>
                        <span className="text-primary font-bold text-xl">{item.growth}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-muted/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">Growth Drivers</h3>
                  <ul className="space-y-3">
                    {[
                      'High inbound migration',
                      'Remote workers leaving NYC',
                      'Tech job expansion',
                      'Student housing shortages',
                      'Government employment stability'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Best Neighborhoods */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              3. Best Neighborhoods for Multi-Unit Investing (2025)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(neighborhoods).map(([city, areas]) => (
                <Card key={city} className="bg-background/50 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-6 h-6 text-primary" />
                      <h3 className="font-playfair text-xl font-bold text-foreground">{city}</h3>
                    </div>
                    <ul className="space-y-2">
                      {areas.map((area) => (
                        <li key={area} className="text-muted-foreground pl-4 border-l-2 border-primary/30">
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              4. What Type of Properties Are Performing Best?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Home className="w-6 h-6 text-primary" />
                    <h3 className="font-playfair text-lg font-bold text-foreground">A. Small Multi-Units (Duplex–4 Plex)</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• High tenant demand</li>
                    <li>• Low maintenance</li>
                    <li>• Excellent BRRRR potential</li>
                    <li>• DSCR loan friendly</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h3 className="font-playfair text-lg font-bold text-foreground">B. Triplexes in Troy & Schenectady</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Highest cap rates in the region.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h3 className="font-playfair text-lg font-bold text-foreground">C. Mixed-Use in Albany & Troy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Retail + apartments = tax advantages + stable cashflow.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowUpRight className="w-6 h-6 text-primary" />
                    <h3 className="font-playfair text-lg font-bold text-foreground">D. Off-Market Value-Add Assets</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Under-rented, cosmetic updates = instant equity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Outlook */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              5. Investment Outlook for 2025–2026
            </h2>
            
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-8">
                <h3 className="font-playfair text-xl font-bold text-foreground mb-6">Forecast:</h3>
                <ul className="space-y-4">
                  {[
                    'Continued rent growth',
                    'High demand from NYC buyers',
                    'Limited supply of duplex/triplex units',
                    'Cap rate compression likely',
                    'Strong appreciation in Troy/Schenectady'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-primary/30">
                  <p className="text-lg text-primary font-semibold">
                    Conclusion: Buying now positions investors ahead of another cycle of price growth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-6">
              Request a Custom Multi-Unit Report
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Text any property address to <strong className="text-primary">518-676-2347</strong> for:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Rent comps', 'Cap rate forecast', 'DSCR analysis', 'Renovation budget modeling'].map((item) => (
                <div key={item} className="px-4 py-3 bg-background/50 rounded-lg text-foreground font-medium">
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+15186762347" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: (518) 676-2347
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="sms:+15186762347" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Text an Address
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
              type="report"
              title="Get the Full 2025 Market Report"
              description="Receive our comprehensive Capital District investment analysis."
              buttonText="Send Me the Report"
            />
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-playfair text-xl font-bold text-foreground mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/investor/nyc-to-albany-roi" className="text-primary hover:underline">NYC → Albany Playbook →</Link>
              <Link to="/investor/analyze-multifamily" className="text-primary hover:underline">How to Analyze Multi-Family →</Link>
              <Link to="/investor-tools" className="text-primary hover:underline">Investor Tools →</Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AlbanyMultiUnitMarket;
