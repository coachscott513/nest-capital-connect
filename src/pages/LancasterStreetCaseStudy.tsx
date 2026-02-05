import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReportPreviewShowcase from "@/components/ReportPreviewShowcase";
import { 
  FileText, 
  Home, 
  DollarSign, 
  MapPin, 
  Building, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Download,
  Calculator
} from "lucide-react";

const LancasterStreetCaseStudy = () => {
  const dealHighlights = [
    "Prime Center Square Albany — walkable, high rental demand",
    "Occupied units generating immediate income on day one",
    "Renovated upper unit with modern finishes & classic brick character",
    "Solid brick construction (1852) — historic, durable structure",
    "Conventional 20% down — no mortgage insurance, lower payment",
    "Basement apartment adds income diversification",
    "6.5% cap rate with $24,542 NOI supports long-term value",
    "No HOA fees — full control of your investment"
  ];

  return (
    <MainLayout>
      <Helmet>
        <title>177 Lancaster St Case Study | Investment Deal Analysis | Capital District Nest</title>
        <meta 
          name="description" 
          content="See how we analyzed a $374,999 Albany duplex: 6.5% cap rate, $149/mo cash flow, and house-hack potential. Full investment breakdown inside."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/case-studies/177-lancaster-albany" />
      </Helmet>

      {/* Hero */}
      <section className="px-[5%] py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary" className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Case Study
            </Badge>
            <Badge variant="outline">Center Square Albany</Badge>
            <Badge variant="outline">Duplex</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            177 Lancaster Street, Albany
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            A townhouse-style brick duplex in the heart of Center Square — renovated upper unit, 
            basement apartment, and immediate rental income. Here's the full deal breakdown.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="/assets/sample-investment-report.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/analyzer">
                <Calculator className="w-4 h-4 mr-2" />
                Analyze Your Deal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section className="px-[5%] py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Property Overview</h2>
          </div>

          <Card className="border-2 border-border">
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="font-semibold text-foreground">Townhouse-Style Brick Duplex</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Layout</p>
                      <p className="font-semibold text-foreground">3 BR, 2 Full + 1 Half BA | 1,806 SF + 630 SF Below</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold text-foreground">Center Square, Albany, NY 12210</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">List Price</p>
                      <p className="font-semibold text-foreground text-xl">$374,999</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gross Monthly Rent</p>
                      <p className="font-semibold text-foreground">$3,000/month</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year Built</p>
                      <p className="font-semibold text-foreground">1852 | Historic Brick</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-muted-foreground">
                  Classic townhouse-style brick duplex in the heart of Center Square. Renovated upper unit 
                  with modern finishes and classic feel. Basement apartment provides second income stream. 
                  High-demand, walkable neighborhood. Occupied units — immediate income on day one.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Unit Breakdown */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Unit Breakdown & Rent Roll</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Unit 1 — Upper</h3>
                  <Badge>Floors 1-2</Badge>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>2 BR / 1 Full + 1 Half BA</p>
                  <p className="text-2xl font-bold text-foreground">$1,800<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <p className="text-sm">Annual: $21,600</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">Unit 2 — Lower</h3>
                  <Badge variant="outline">Basement</Badge>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>1 BR / 1 Full BA</p>
                  <p className="text-2xl font-bold text-foreground">$1,200<span className="text-sm font-normal text-muted-foreground">/month</span></p>
                  <p className="text-sm">Annual: $14,400</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Gross Rent</p>
                <p className="text-2xl font-bold text-primary">$3,000<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Annual Gross</p>
                <p className="text-xl font-bold text-foreground">$36,000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investment Metrics */}
      <ReportPreviewShowcase showCTA={false} />

      {/* Financing Details */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Financing Details</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">Purchase & Loan</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purchase Price</span>
                    <span className="font-semibold text-foreground">$374,999</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Financing</span>
                    <span className="font-semibold text-foreground">Conv. 20% Down | 6.50% / 30 Yr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="font-semibold text-foreground">$75,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-semibold text-foreground">$299,999</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Closing Costs (3%)</span>
                    <span className="font-semibold text-foreground">$11,250</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Seller Concession (6%)</span>
                    <span className="font-semibold">($22,500)</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-medium text-foreground">Cash Required at Closing</span>
                    <span className="font-bold text-primary text-lg">$63,750</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-foreground mb-4">Monthly Cash Flow</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Monthly Rent</span>
                    <span className="font-semibold text-foreground">$3,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mortgage (P&I)</span>
                    <span className="font-semibold text-foreground">$1,896</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Taxes</span>
                    <span className="font-semibold text-foreground">$705</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-semibold text-foreground">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance Reserve</span>
                    <span className="font-semibold text-foreground">$100</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-border">
                    <span className="font-medium text-foreground">Monthly Cash Flow</span>
                    <span className="font-bold text-emerald-600 text-lg">$149</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-xs">
                    <span>Annual Cash Flow</span>
                    <span>$1,787</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* House Hack Option */}
      <section className="px-[5%] py-12 md:py-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/30 bg-primary/5">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Owner-Occupant House Hack</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Live in Unit 1, rent Unit 2 for $1,200/mo → <span className="font-semibold text-foreground">Effective housing cost: $1,651/mo</span> 
                (includes mortgage, taxes, insurance, maintenance)
              </p>
              <p className="text-sm text-muted-foreground">
                A renovated 2BR/1.5BA in Center Square Albany for $1,651/mo while building equity. Compare to renting at $1,800+/mo.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Deal Highlights */}
      <section className="px-[5%] py-12 md:py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Investment Highlights</h2>
          </div>

          <Card>
            <CardContent className="p-6 md:p-8">
              <ul className="grid md:grid-cols-2 gap-3">
                {dealHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-[5%] py-16 md:py-20 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Analyze Your Deal?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get the same level of analysis for any property. Rentals, rehabs, or land — 
            our analyzer breaks down the numbers that matter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/analyzer">
                Open the Analyzer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/assets/sample-investment-report.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download This Report
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LancasterStreetCaseStudy;
