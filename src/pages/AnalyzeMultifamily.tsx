import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, DollarSign, TrendingUp, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureForm from '@/components/LeadCaptureForm';

const AnalyzeMultifamily = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Analyze a Multi-Family Property",
    "description": "Learn the exact underwriting framework used to evaluate 500+ properties per week for multi-family real estate investing.",
    "author": {
      "@type": "Person",
      "name": "Scott Alvarez"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest"
    },
    "step": [
      { "@type": "HowToStep", "name": "Gather Core Data", "text": "Collect purchase price, rent roll, market comps, taxes, utilities, insurance, vacancy assumptions, maintenance expenses, and CapEx forecast." },
      { "@type": "HowToStep", "name": "Run Income Formula", "text": "Calculate Gross Scheduled Income and Effective Gross Income after vacancy deductions." },
      { "@type": "HowToStep", "name": "Estimate Operating Expenses", "text": "Account for taxes, insurance, utilities, maintenance, and property management costs." },
      { "@type": "HowToStep", "name": "Calculate NOI", "text": "Determine Net Operating Income by subtracting operating expenses from effective gross income." },
      { "@type": "HowToStep", "name": "Calculate Cap Rate", "text": "Divide NOI by purchase price to determine the capitalization rate." }
    ]
  };

  const coreData = [
    'Purchase price',
    'Current rent roll',
    'Market rent comps',
    'Property taxes',
    'Utilities',
    'Insurance',
    'Vacancy assumptions',
    'Maintenance expenses',
    'CapEx forecast'
  ];

  const expenseRanges = [
    { item: 'Taxes', range: 'varies by county' },
    { item: 'Insurance', range: '$800–$2,200/yr per unit' },
    { item: 'Water/sewer', range: '$800–$1,800/yr' },
    { item: 'Heat', range: 'high cost if landlord-provided' },
    { item: 'Maintenance', range: '5–10% of rent' },
    { item: 'Property management', range: '8–10%' },
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>How to Analyze a Multi-Family Property | Step-by-Step Guide | Capital District Nest</title>
        <meta name="description" content="Learn the exact underwriting framework professional investors use to analyze multi-family properties. Calculate NOI, cap rate, and evaluate 500+ properties per week." />
        <meta name="keywords" content="analyze multi-family property, multi-family underwriting, calculate cap rate, NOI formula, real estate investment analysis, DSCR analysis" />
        <link rel="canonical" href="https://capitaldistrictnest.com/investor/analyze-multifamily" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-[#022c22] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-6">
              INVESTOR GUIDE
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How to Analyze a Multi-Family Property
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
              Step-by-Step Underwriting Guide
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn the exact underwriting framework we use to evaluate 500+ properties per week.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <p className="text-lg text-foreground leading-relaxed">
                  Investing in multi-family real estate isn't guesswork.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  A proper analysis requires understanding <strong className="text-foreground">income, expenses, rent potential, financing, and long-term appreciation.</strong>
                </p>
                <p className="text-lg text-primary font-semibold mt-4">
                  Here is the complete underwriting process used by professional investors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step 1: Gather Core Data */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">1</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                Gather the Core Data
              </h2>
            </div>
            
            <Card className="bg-background/50 border-primary/20">
              <CardContent className="p-8">
                <p className="text-foreground mb-6">You need:</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {coreData.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step 2: Income Formula */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">2</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                Run the Income Formula
              </h2>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-6 h-6 text-primary" />
                    <h3 className="font-playfair text-xl font-bold text-foreground">Gross Scheduled Income (GSI)</h3>
                  </div>
                  <p className="text-muted-foreground pl-9">
                    = Total potential rent if 100% occupied
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calculator className="w-6 h-6 text-primary" />
                    <h3 className="font-playfair text-xl font-bold text-foreground">Effective Gross Income (EGI)</h3>
                  </div>
                  <p className="text-muted-foreground pl-9">
                    = GSI – Vacancy <span className="text-primary">(generally 5–8%)</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Operating Expenses */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">3</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                Estimate Operating Expenses
              </h2>
            </div>
            
            <Card className="bg-background/50 border-primary/20">
              <CardContent className="p-8">
                <p className="text-foreground mb-6">Typical ranges:</p>
                <div className="space-y-4">
                  {expenseRanges.map((expense) => (
                    <div key={expense.item} className="flex justify-between items-center py-3 border-b border-muted/30 last:border-0">
                      <span className="text-foreground font-medium">{expense.item}</span>
                      <span className="text-primary font-semibold">{expense.range}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step 4: Calculate NOI */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">4</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                Calculate Net Operating Income (NOI)
              </h2>
            </div>
            
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    NOI = EGI – Operating Expenses
                  </p>
                </div>
                
                <p className="text-foreground mb-4">This is the foundation of:</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {['Cap rate', 'Negotiation', 'Appraisal', 'DSCR qualification'].map((item) => (
                    <div key={item} className="px-4 py-3 bg-background/50 rounded-lg text-center">
                      <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Step 5: Calculate Cap Rate */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">5</div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
                Calculate Cap Rate
              </h2>
            </div>
            
            <Card className="bg-primary/10 border-primary/30 mb-8">
              <CardContent className="p-8">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    Cap Rate = NOI ÷ Purchase Price
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-lg font-bold text-foreground mb-4">Capital District Averages</h3>
                  <p className="text-3xl font-bold text-primary">10-15% cap rate</p>
                </CardContent>
              </Card>

              <Card className="bg-muted/20 border-muted/30">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-lg font-bold text-foreground mb-4">NYC Comparison</h3>
                  <p className="text-3xl font-bold text-destructive">3–4% cap</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold text-foreground text-center mb-12">
              Quick Reference: The Underwriting Formula
            </h2>
            
            <Card className="bg-[#022c22] border-primary/30">
              <CardContent className="p-8">
                <div className="space-y-6 font-mono text-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">1.</span>
                    <span className="text-foreground">GSI = Total Potential Rent (100% occupied)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">2.</span>
                    <span className="text-foreground">EGI = GSI - Vacancy (5-8%)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">3.</span>
                    <span className="text-foreground">NOI = EGI - Operating Expenses</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">4.</span>
                    <span className="text-primary font-bold">Cap Rate = NOI ÷ Purchase Price</span>
                  </div>
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
              Want Us to Run the Numbers for You?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Text any property address to <strong className="text-primary">518-671-8048</strong> and we'll send you a complete analysis including:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {['NOI calculation', 'Cap rate analysis', 'Cash flow projection', 'DSCR qualification'].map((item) => (
                <div key={item} className="px-4 py-3 bg-background/50 rounded-lg text-foreground font-medium">
                  {item}
                </div>
              ))}
            </div>
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
              title="Request a Free Property Analysis"
              description="Send us any property address and we'll run the full underwriting analysis."
              buttonText="Analyze My Property"
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
                to="/investor/nyc-to-albany-roi" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">NYC → Albany Investor Playbook</h4>
                <p className="text-muted-foreground text-sm">Why downstate investors are moving upstate for 20-25% cash-on-cash returns.</p>
              </Link>
              <Link 
                to="/investor/albany-multi-unit-market" 
                className="block p-6 bg-background/50 border border-primary/20 rounded-lg hover:border-primary/40 transition-colors"
              >
                <h4 className="text-lg font-semibold text-foreground mb-2">Albany Multi-Unit Market Report 2025</h4>
                <p className="text-muted-foreground text-sm">Cap rates, rent trends, and investment outlook for the Capital District.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AnalyzeMultifamily;
