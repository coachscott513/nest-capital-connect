import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, DollarSign, Calendar, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const Exchange1031Playbook = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "1031 Exchange Playbook: Trade NYC Headaches for Albany Cash Flow",
    "author": {
      "@type": "Person",
      "name": "Scott Alvarez"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest"
    },
    "datePublished": "2025-01-01",
    "description": "Learn how NYC investors use 1031 exchanges to defer capital gains and reinvest into 20-25% ROI properties in Albany, Troy, and Schenectady."
  };

  const timelineSteps = [
    { step: 1, title: "Strategy Call", desc: "Review your NYC asset, equity, and goals." },
    { step: 2, title: "Valuation & Net Proceeds", desc: "Understand what you're working with." },
    { step: 3, title: "Lender & QI Setup", desc: "Connect with a 1031-qualified intermediary and lender." },
    { step: 4, title: "Upstate Deal Pipeline", desc: "Identify a shortlist of viable replacement properties." },
    { step: 5, title: "List & Sell NYC Asset", desc: "Coordinate timing with QI and closing." },
    { step: 6, title: "45-Day Identification", desc: "Lock in your Capital District targets." },
    { step: 7, title: "Offer & Inspection", desc: "We underwrite each deal like a portfolio manager." },
    { step: 8, title: "Closing & Stabilization", desc: "Stabilize rents, renovations, and management." },
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>1031 Exchange Playbook: NYC to Albany | Capital District Nest</title>
        <meta name="description" content="Use a 1031 exchange to sell low-yield NYC property and reinvest into 20-25% ROI properties in Albany, Troy, Schenectady. Defer capital gains tax legally." />
        <meta name="keywords" content="1031 exchange NYC to Albany, defer capital gains real estate, 1031 exchange Capital District, NYC landlord exit strategy, tax-deferred property exchange" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investor/1031-nyc-to-albany" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#022c22] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              TAX-DEFERRED STRATEGY
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              1031 Exchange Playbook
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Trade NYC Headaches for Albany Cash Flow
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sell low-yield NYC assets and reinvest into multiple higher-ROI properties in the Capital District — without paying capital gains tax today.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              If you own a rental property in New York City, you're probably feeling the squeeze:
            </p>
            <ul className="space-y-2 mb-6">
              {['Rising expenses', 'Rent regulations', 'Slow-growing net income'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 bg-destructive rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-lg text-foreground font-semibold">
              A 1031 Exchange lets you sell that low-yield asset and reinvest into multiple higher-ROI properties in the Capital District — <span className="text-primary">without paying capital gains tax today.</span>
            </p>
          </div>
        </div>
      </section>

      {/* What Is a 1031 Exchange */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8">
              1. What Is a 1031 Exchange?
            </h2>
            
            <Card className="bg-background/50 border-primary/20 mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  A 1031 Exchange is a section of the IRS code that allows you to:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Sell an investment property',
                    'Reinvest the proceeds into another investment property (or properties)',
                    'Defer capital gains tax'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <h3 className="font-playfair text-xl font-bold text-foreground mb-4">The Key Rules:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { rule: 'Like-Kind', desc: 'Investment real estate → investment real estate' },
                { rule: '45 Days', desc: 'To identify new properties' },
                { rule: '180 Days', desc: 'To close on replacement property(ies)' },
                { rule: 'Qualified Intermediary', desc: 'Funds must be held by a QI—you can\'t touch the money directly' },
              ].map((item) => (
                <Card key={item.rule} className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <span className="text-primary font-bold">{item.rule}:</span>
                    <span className="text-muted-foreground ml-2">{item.desc}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why NYC Landlords Are Exchanging */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              2. Why NYC Landlords Are Exchanging Into the Capital District
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-destructive/10 border-destructive/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">NYC Today</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• 3–5% cap rates</li>
                    <li>• Heavy regulation</li>
                    <li>• Rent-stabilized units</li>
                    <li>• High repair and labor costs</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">Capital District Today</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• 6–10% cap rates</li>
                    <li>• Less regulatory friction</li>
                    <li>• Better rent-to-price ratios</li>
                    <li>• Lower taxes and operating costs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-xl text-primary font-semibold">
                The same equity that earns you $30–40K/year in NYC can generate <span className="text-2xl font-bold">$150–250K/year</span> in the Capital District.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Exchange */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              3. Example: One NYC Building → Three Capital District Assets
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="bg-muted/20 border-muted/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">NYC Sale</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-muted/30">
                      <span className="text-muted-foreground">Sales price:</span>
                      <span className="text-foreground font-semibold">$1,200,000</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Net income:</span>
                      <span className="text-destructive font-semibold">$48,000/yr (~4% cap)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-foreground mb-6">1031 Into Capital District</h3>
                  <div className="space-y-3 text-foreground mb-4">
                    <div className="flex justify-between">
                      <span>Albany Triplex</span>
                      <span className="font-semibold">$350,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Troy 3-Unit</span>
                      <span className="font-semibold">$325,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Schenectady Duplex</span>
                      <span className="font-semibold">$275,000</span>
                    </div>
                    <div className="flex justify-between border-t border-primary/30 pt-3">
                      <span>Reserves/CapEx</span>
                      <span className="font-semibold">$250,000</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-primary/30">
                    <p className="text-primary font-bold">Combined potential net income: $210,000+/yr</p>
                    <p className="text-primary font-bold">Cash-on-cash returns: 20–25%+</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Buy */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-8">
              4. What You Can Buy With NYC Equity
            </h2>
            
            <Card className="bg-primary/5 border-primary/20 mb-8">
              <CardContent className="p-8">
                <p className="text-foreground mb-6">With the proceeds from a NYC property, you can often:</p>
                <ul className="space-y-3">
                  {[
                    'Own three to four buildings instead of one',
                    'Diversify across multiple cities (Albany, Troy, Schenectady, Saratoga)',
                    'Mix cash-flow assets (high cap rate) with appreciation assets (Saratoga, prime Albany)'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <p className="text-lg text-foreground">
              We help design the "Capital Stack" and acquisition plan so your exchange is:
              <strong className="text-primary"> fully compliant, cash-flow optimized, and diversified for risk management.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              5. 1031 Exchange Timeline: Step-by-Step
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {timelineSteps.map((item) => (
                <Card key={item.step} className="bg-background/50 border-primary/20">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Support */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
              6. How We Support 1031 Investors
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're not just "showing properties." We're building a <strong className="text-foreground">math-first repositioning plan.</strong>
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Deal sourcing in Albany, Troy, Schenectady, Saratoga',
                'Rent roll and P&L verification',
                'DSCR and financing scenarios',
                'Custom pro forma for each replacement property',
                'Coordination with your QI, attorney, and lender'
              ].map((item) => (
                <Card key={item} className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
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
              7. Ready to See What Your NYC Property Can Become?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">Send us:</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              {['The address of your current NYC property', 'Your approximate mortgage balance', 'Any known rental and expense info'].map((item) => (
                <div key={item} className="px-4 py-3 bg-background/50 rounded-lg text-foreground text-sm">
                  {item}
                </div>
              ))}
            </div>
            <p className="text-foreground mb-8">
              We'll model what a 1031 into the Capital District could look like.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+15186718048" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call: (518) 671-8048
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="sms:+15186718048" className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Text Your Address
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              You'll receive a free, no-obligation 1031 repositioning outline.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <LeadCaptureForm 
              type="investment"
              title="Request Your 1031 Strategy Call"
              description="Tell us about your NYC property and investment goals."
              buttonText="Get My 1031 Plan"
            />
          </div>
        </div>
      </section>

      {/* More Investor Guides */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">More Investor Guides</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/investor/nyc-to-albany-roi" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">NYC → Albany ROI Playbook</h4>
                <p className="text-muted-foreground text-sm">Why downstate investors are moving upstate for 20-25% returns.</p>
              </Link>
              <Link 
                to="/investor/albany-multi-unit-market" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">Albany Multi-Unit Market Report</h4>
                <p className="text-muted-foreground text-sm">Cap rates, rent trends, and investment outlook for 2025.</p>
              </Link>
              <Link 
                to="/investor/analyze-multifamily" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">How to Analyze Multi-Family</h4>
                <p className="text-muted-foreground text-sm">Step-by-step underwriting guide for investors.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Exchange1031Playbook;
