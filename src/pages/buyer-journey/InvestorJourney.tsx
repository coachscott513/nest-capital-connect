import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import FAQSection from "@/components/FAQSection";
import JourneyLeadMagnet from "@/components/JourneyLeadMagnet";
import { TrendingUp, CheckCircle, ArrowRight, BarChart3, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const investorFaqs = [
  {
    question: "What cap rate should I look for in Albany?",
    answer: "In the Capital District, strong investment properties typically have cap rates between 8-14%. Multi-family properties in Troy and Schenectady often achieve 10-14%, while Albany properties may be slightly lower at 8-10% due to higher property values. We help you analyze each deal to ensure the numbers make sense for your goals.",
  },
  {
    question: "How do I analyze cash flow on a multi-family property?",
    answer: "Cash flow analysis involves calculating gross rental income, subtracting vacancy (typically 5-8%), operating expenses (taxes, insurance, utilities, maintenance, management), and mortgage payments. We provide detailed P&L projections and help you verify rent rolls and expenses before you make an offer.",
  },
  {
    question: "Should I invest locally or out-of-state?",
    answer: "The Capital District offers compelling advantages for NYC, NJ, and CT investors: lower entry prices ($100k-$300k multi-families vs. $1M+ in metro areas), strong cash-on-cash returns (15-30%), growing rental demand, and manageable tenant laws. We specialize in helping out-of-area investors navigate local markets.",
  },
  {
    question: "What financing options work best for investment properties?",
    answer: "Investment properties typically require 20-25% down for conventional loans. We work with investor-friendly lenders who offer competitive rates for non-owner-occupied properties. DSCR loans, portfolio loans, and commercial financing are also options for experienced investors.",
  },
  {
    question: "How do I find off-market deals?",
    answer: "Off-market properties come through relationships, not websites. As your local investment team, we have connections with wholesalers, attorneys handling estates, and property managers. VIP investors get first access to these opportunities before they hit the MLS.",
  },
];

const InvestorJourney = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Investment Property Guide | Capital District Cash Flow Properties | Capital District Nest</title>
        <meta 
          name="description" 
          content="Build long-term wealth with Capital District investment properties. Get cash-flow analysis, deal comparisons, and investor-level insights for Albany, Troy, and Schenectady." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/buyer-journey/investor" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Investor Journey</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Build Wealth With Capital District Real Estate
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Get investor-level analysis on every property. We help you find deals that actually cash flow, with verified numbers and local expertise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/vip-buyer-access">
                  Get VIP Investor Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dealdesk">Analyze a Property</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-12 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              What Investors Get From Our Team
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-background border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Deal Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Full P&L projections, cap rate calculations, and 5-year return forecasts on any property you're considering.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Off-Market Access</h3>
                  <p className="text-sm text-muted-foreground">
                    First access to pre-market and off-market multi-family deals before they hit the MLS.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Verified Numbers</h3>
                  <p className="text-sm text-muted-foreground">
                    We verify rent rolls, tax records, and expense data. No guesses — just real numbers you can bank on.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Capital District Investment Market at a Glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">10-14%</div>
                <div className="text-sm text-muted-foreground">Typical Cap Rates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">$150k-$350k</div>
                <div className="text-sm text-muted-foreground">Multi-Family Entry</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">15-30%</div>
                <div className="text-sm text-muted-foreground">Cash-on-Cash</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">3-5%</div>
                <div className="text-sm text-muted-foreground">Annual Appreciation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="py-12 px-4 bg-background">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Get Our Free Investor Toolkit
              </h2>
              <p className="text-muted-foreground mb-6">
                Download our cash-flow analysis spreadsheet and Capital District investment guide. Learn exactly how we evaluate deals and what to look for in your next property.
              </p>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>Excel cash-flow calculator template</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>Neighborhood-by-neighborhood investment guide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <span>Due diligence checklist for multi-family</span>
                </li>
              </ul>
            </div>
            <JourneyLeadMagnet
              journeyType="investor"
              title="Free Investor Toolkit"
              description="Cash-flow spreadsheet + investment guide delivered to your inbox."
              benefits={[
                "Analyze deals like a pro",
                "Understand local market dynamics",
                "Avoid common investor mistakes",
              ]}
              downloadName="Investor Toolkit"
            />
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 px-4 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">Related Investor Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/investor/nyc-to-albany-roi" 
                className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-foreground">NYC → Albany ROI Playbook</span>
              </Link>
              <Link 
                to="/investor/albany-multi-unit-market" 
                className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-foreground">Albany Multi-Unit Market Report</span>
              </Link>
              <Link 
                to="/investor/analyze-multifamily" 
                className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-foreground">How to Analyze Multi-Family</span>
              </Link>
              <Link 
                to="/investor/best-neighborhoods-cash-flow-capital-district" 
                className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-foreground">Best Cash Flow Neighborhoods</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <FAQSection 
          faqs={investorFaqs}
          pageUrl="https://capitaldistrictnest.com/buyer-journey/investor"
        />

        {/* Final CTA */}
        <section className="py-12 px-4 bg-primary text-primary-foreground text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Building Wealth?</h2>
            <p className="mb-6 opacity-90">
              Get VIP access to off-market deals, cash-flow analysis, and investor-level support.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/vip-buyer-access">
                Get VIP Investor Access
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default InvestorJourney;
