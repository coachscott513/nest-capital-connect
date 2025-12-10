import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Building2, DollarSign, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const NycToAlbanyPlaybook = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "NYC → Albany Investor Playbook: Why Downstate Investors Are Moving Upstate for 15–30% ROI",
    "author": {
      "@type": "Person",
      "name": "Scott Alvarez"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest"
    },
    "datePublished": "2025-01-01",
    "description": "Learn why NYC landlords are repositioning capital to the Capital District for 15-30% cash-on-cash returns vs 3-5% in NYC."
  };

  return (
    <MainLayout>
      <Helmet>
        <title>NYC to Albany Investor Playbook | 20-25% ROI Strategy | Capital District Nest</title>
        <meta name="description" content="NYC landlords are moving capital upstate for 15-30% cash-on-cash returns. Learn how to reposition from 3-5% NYC cap rates to 10-14% Capital District returns." />
        <meta name="keywords" content="NYC to Albany investment, upstate NY real estate, Capital District investing, 1031 exchange Albany, NYC landlord exit strategy, Albany ROI, Troy investment properties" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investor/nyc-to-albany-roi" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#022c22] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              INVESTOR PLAYBOOK
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NYC → Albany Investor Playbook
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Why Downstate Investors Are Moving Upstate for 15–30% Cash-on-Cash Returns
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              New York City landlords are facing the tightest investment margins in decades. Meanwhile, the Capital District is delivering 15–30% annualized returns with $600–$1,800/mo net cash flow per property.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Between rent stabilization laws, soft rent growth, and high operational costs, many multifamily buildings in NYC are generating <strong className="text-primary">3–5% annual returns</strong>—before surprises.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Meanwhile, just 150 miles north, the Capital District (Albany, Troy, Schenectady, Saratoga) is delivering <strong className="text-primary">15–30% annualized cash-on-cash returns</strong> with 10–14% cap rates, lower barriers to entry and significantly higher rent-to-value ratios.
            </p>
            <p className="text-lg text-foreground font-semibold mt-6">
              This guide explains why the shift is happening and how NYC landlords are repositioning into higher-performing assets.
            </p>
          </div>
        </div>
      </section>

      {/* Cap Rate Comparison */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              1. NYC Cap Rates vs. Capital District Cap Rates
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* NYC Card */}
              <Card className="bg-destructive/10 border-destructive/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-8 h-8 text-destructive" />
                    <h3 className="font-playfair text-2xl font-bold text-foreground">NYC: 3–5% Cap Rate</h3>
                  </div>
                  <p className="text-muted-foreground italic mb-4">(on a good day)</p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      High taxes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      High maintenance costs
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      Strict regulation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      Rent-stabilized tenant base
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      Expensive repairs/labor
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-destructive rounded-full"></span>
                      Slower appreciation
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Capital District Card */}
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <h3 className="font-playfair text-2xl font-bold text-foreground">Capital District: 10–14% Cap Rate</h3>
                  </div>
                  <p className="text-primary font-semibold mb-4">(with 15–30% CoC returns • $600–$1,800/mo net cash flow)</p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Lower acquisition prices
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Higher rent ratios
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Lower expenses
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Strong government & student tenant base
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Strong demand in Albany, Troy, Schenectady
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Faster cash flow stabilization
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Example Trade */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              2. Example: The NYC → Albany Trade
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* NYC Example */}
              <Card className="bg-muted/20 border-muted/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">NYC Multi-Unit Example</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-muted/30">
                      <span className="text-muted-foreground">Market value:</span>
                      <span className="text-foreground font-semibold">$1,000,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-muted/30">
                      <span className="text-muted-foreground">Net income:</span>
                      <span className="text-foreground font-semibold">$40,000/yr (4% cap)</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Cash-on-cash return:</span>
                      <span className="text-destructive font-bold">3–5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Albany Strategy */}
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">Albany Reinvestment Strategy</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-primary/20">
                      <span className="text-muted-foreground">Sell:</span>
                      <span className="text-foreground font-semibold">$1M</span>
                    </div>
                    <div className="py-2 border-b border-primary/20">
                      <span className="text-muted-foreground block mb-2">Buy:</span>
                      <ul className="space-y-1 text-foreground text-sm">
                        <li>• Triplex in Albany: $300k</li>
                        <li>• Duplex in Troy: $250k</li>
                        <li>• 3-unit in Schenectady: $200k</li>
                        <li>• Reserve: $250k for renovation/upgrades</li>
                      </ul>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-primary/20">
                      <span className="text-muted-foreground">Combined return:</span>
                      <span className="text-primary font-bold">$220,000/yr net</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Cash-on-cash return:</span>
                      <span className="text-primary font-bold text-xl">15–30%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-xl text-primary font-semibold">
                It's not unusual for owners to <span className="text-2xl font-bold">5× their annual income</span> by moving capital north.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Outperforming */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              3. Why the Capital District Is Outperforming
            </h2>
            
            <div className="space-y-8">
              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">A. Lower Prices → Higher ROI</h3>
                  <p className="text-muted-foreground">
                    A $1M building in NYC often rents for $8,000–$12,000/month.<br />
                    <span className="text-foreground font-semibold">In Albany, the same $1M buys 3–4 buildings generating $12,000–16,000/month.</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">B. Strong Tenant Demand</h3>
                  <p className="text-muted-foreground mb-4">Driven by:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Government workers', 'Hospitals', 'Colleges', 'Tech growth (GlobalFoundries, Regeneron, Amazon)', 'State agencies'].map((item) => (
                      <span key={item} className="px-3 py-2 bg-primary/10 text-foreground rounded-lg text-sm">{item}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background/50 border-primary/20">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-primary mb-4">C. Flexible Landlord Environment</h3>
                  <p className="text-muted-foreground">
                    New York State laws apply, but <strong className="text-foreground">NOT the burdensome city-level regulations.</strong>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Consider */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              4. Who Should Consider Repositioning?
            </h2>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg text-foreground mb-6">This strategy is ideal for:</p>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    'NYC landlords tired of low returns',
                    'Owners of stabilized or underperforming buildings',
                    'Investors approaching retirement',
                    'Investors planning a 1031 Exchange',
                    'Landlords wanting less stress and more cashflow'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              5. How We Help Investors Transition
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {[
                'ROI modeling',
                'P&L projections',
                'Rent roll verification',
                'DSCR qualification',
                'Tax & utility audits',
                'Off-market opportunities',
                'Full 1031 coordination'
              ].map((item) => (
                <Card key={item} className="bg-background/50 border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </CardContent>
                </Card>
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
              Get a Free NYC → Albany ROI Strategy Call
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Paste any address into our search bar or text it to <strong className="text-primary">518-676-2347</strong> to receive:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['Cash flow forecasts', 'Cap rate analysis', 'Renovation cost models', 'Neighborhood trends'].map((item) => (
                <div key={item} className="px-4 py-3 bg-background/50 rounded-lg text-foreground font-medium">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xl text-primary font-semibold mb-8">
              → Ready to see if your NYC building qualifies for a 15–30% ROI swap?
            </p>
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
              type="investment"
              title="Request Your Free ROI Analysis"
              description="Tell us about your current NYC holdings and investment goals."
              buttonText="Get My Strategy Call"
            />
          </div>
        </div>
      </section>

      {/* More Investor Guides */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">More Investor Guides</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link 
                to="/investor/albany-multi-unit-market" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">Albany Multi-Unit Market Report 2025</h4>
                <p className="text-muted-foreground text-sm">Cap rates, rent trends, and investment outlook for the Capital District.</p>
              </Link>
              <Link 
                to="/investor/analyze-multifamily" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">How to Analyze a Multi-Family Property</h4>
                <p className="text-muted-foreground text-sm">Step-by-step underwriting guide used by professional investors.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default NycToAlbanyPlaybook;
