import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import FAQSection from "@/components/FAQSection";
import JourneyLeadMagnet from "@/components/JourneyLeadMagnet";
import { Wallet, CheckCircle, ArrowRight, Percent, Calculator, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const financingFaqs = [
  {
    question: "What's the difference between conventional and FHA loans?",
    answer: "Conventional loans typically require 620+ credit and 3-20% down, with no mortgage insurance if you put 20% down. FHA loans accept 580+ credit with 3.5% down (or 500+ with 10% down) but require mortgage insurance for the life of the loan. We help you compare total costs over time.",
  },
  {
    question: "How much house can I afford?",
    answer: "Lenders typically approve you for payments up to 28-36% of your gross income. But what you're approved for isn't always what you should spend. We help you calculate comfortable monthly payments including taxes, insurance, and maintenance — not just mortgage principal and interest.",
  },
  {
    question: "What are points, and should I pay them?",
    answer: "Points are upfront fees (1 point = 1% of loan amount) that buy down your interest rate. Paying points makes sense if you'll keep the loan long enough to recoup the cost through lower payments. We calculate your break-even point so you can decide if points are worth it.",
  },
  {
    question: "How do investor loans differ from owner-occupied mortgages?",
    answer: "Investment property loans typically require 20-25% down (vs. 3-5% for primary residence), have rates 0.5-0.75% higher, and stricter qualification standards. DSCR loans, which qualify based on property cash flow rather than personal income, are another option for investors.",
  },
  {
    question: "What down payment assistance programs are available?",
    answer: "New York offers SONYMA programs with low down payments and closing cost assistance. Local programs include Albany County's down payment grants, employer-assisted housing, and municipal first-time buyer incentives. We track all active programs and help you apply.",
  },
];

const loanTypes = [
  { name: "Conventional", down: "3-20%", credit: "620+", best: "Good credit, want to avoid PMI with 20% down" },
  { name: "FHA", down: "3.5%", credit: "580+", best: "Lower credit, smaller down payment" },
  { name: "VA", down: "0%", credit: "No min", best: "Veterans and active military" },
  { name: "USDA", down: "0%", credit: "640+", best: "Rural properties, income limits apply" },
  { name: "Investment/DSCR", down: "20-25%", credit: "660+", best: "Rental properties, qualify on property income" },
];

const FinancingJourney = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Mortgage & Financing Guide | Capital District Home Loans | Capital District Nest</title>
        <meta 
          name="description" 
          content="Explore mortgage options, down-payment assistance, and financing strategies for Albany-area home buyers and investors. Compare loans and find the right fit." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/buyer-journey/financing" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Financing Journey</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Financing That Works For You
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              The right financing can save you thousands. We break down mortgage options, assistance programs, and how financing impacts your long-term costs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/first-time-homebuyers">
                  See Assistance Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/grants">View Grant Options</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Loan Comparison Table */}
        <section className="py-12 px-4 bg-card">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Compare Loan Types
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Loan Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Down Payment</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Min Credit</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {loanTypes.map((loan, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium text-foreground">{loan.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{loan.down}</td>
                      <td className="py-3 px-4 text-muted-foreground">{loan.credit}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{loan.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Key Financing Concepts
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Percent className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Interest Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    Even 0.5% difference in rate can mean $20,000+ over the life of a loan. We help you shop rates and negotiate the best terms.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Calculator className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Total Cost of Ownership</h3>
                  <p className="text-sm text-muted-foreground">
                    Monthly payments are just part of the picture. We calculate taxes, insurance, maintenance, and true monthly costs.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Investment Financing</h3>
                  <p className="text-sm text-muted-foreground">
                    Rental property loans have different rules. DSCR loans let you qualify based on property income, not personal income.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="py-12 px-4 bg-background">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Get Your Free Mortgage Options Guide
              </h2>
              <p className="text-muted-foreground mb-6">
                Download our mortgage comparison chart and down payment assistance programs guide. Understand your options before you talk to a lender.
              </p>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Side-by-side loan comparison chart</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Complete list of NY assistance programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span>Monthly payment calculator template</span>
                </li>
              </ul>
            </div>
            <JourneyLeadMagnet
              journeyType="financing"
              title="Free Mortgage Guide"
              description="Loan comparison + assistance programs delivered to your inbox."
              benefits={[
                "Compare all loan options at a glance",
                "Find programs you qualify for",
                "Calculate true monthly costs",
              ]}
              downloadName="Mortgage Options Guide"
            />
          </div>
        </section>

        {/* Trusted Lenders */}
        <section className="py-12 px-4 bg-card border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              We Work With Trusted Lenders
            </h2>
            <p className="text-muted-foreground mb-6">
              We've vetted lenders who offer competitive rates, excellent service, and experience with all types of buyers — from first-timers to seasoned investors.
            </p>
            <Button asChild>
              <a 
                href="https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Meet Our Preferred Lender
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <FAQSection 
          faqs={financingFaqs}
          pageUrl="https://capitaldistrictnest.com/buyer-journey/financing"
        />

        {/* Final CTA */}
        <section className="py-12 px-4 bg-blue-600 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Pre-Approved?</h2>
            <p className="mb-6 opacity-90">
              We'll connect you with a lender who understands your goals and can get you the best terms.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/first-time-homebuyers">
                Start the Process
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default FinancingJourney;
