import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Home, DollarSign, Calculator, ClipboardList, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";

const FirstTimeHomeBuyers = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>First-Time Home Buyer Guide | Capital District NY</title>
        <meta name="description" content="Everything first-time home buyers need to know about buying in Albany, Troy, and Schenectady. Grants, down-payment assistance, monthly costs, and the step-by-step process." />
        <meta name="keywords" content="first-time home buyer Albany, NY home buyer grants, down payment assistance Capital District, buying first home Troy NY" />
        <link rel="canonical" href="https://capitaldistrictnest.com/first-time-home-buyers" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-card border-b border-border px-[5%] py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            First-Time Home Buyer Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Buying your first home is exciting — and overwhelming. This guide breaks down everything you need to know, from grants and financing to monthly costs and common mistakes to avoid.
          </p>
        </div>
      </section>

      {/* Guide Coming Soon Banner */}
      <div className="bg-primary/5 border-b border-primary/20 px-[5%] py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-sm font-medium text-foreground">
            📘 Free First-Time Buyer Checklist Coming Soon — Join the List to Get It First.
          </span>
          <Link to="/vip-buyer-access" className="text-sm font-bold text-primary hover:underline">
            Join Now →
          </Link>
        </div>
      </div>

      {/* Section 1: What First-Time Buyers Should Know */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              What First-Time Buyers Should Know Before Starting
            </h2>
          </div>
          <div className="prose prose-lg text-muted-foreground">
            <p className="mb-4">
              The Capital District is one of the most affordable homeownership markets in the Northeast. But affordability does not mean simplicity. Before you start browsing listings, you need clarity on three things:
            </p>
            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="font-bold text-foreground mb-2">Your Budget Reality</p>
                <p className="text-sm text-muted-foreground">
                  What you qualify for and what you can comfortably afford are not the same. Banks approve based on debt ratios; you should buy based on lifestyle.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="font-bold text-foreground mb-2">Your Timeline</p>
                <p className="text-sm text-muted-foreground">
                  The average home purchase takes 45-60 days from accepted offer to closing. Add 2-4 weeks for searching. Plan accordingly.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5">
                <p className="font-bold text-foreground mb-2">Your Priorities</p>
                <p className="text-sm text-muted-foreground">
                  Location, size, condition, price — you rarely get all four. Know which two matter most before you start.
                </p>
              </div>
            </div>
            <p>
              The buyers who succeed are the ones who do homework before house hunting. This guide gives you that foundation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Grants and Down-Payment Assistance */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Grants and Down-Payment Assistance Overview
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            New York offers some of the best first-time buyer programs in the country. Many buyers in the Capital District qualify for $10,000-$30,000 or more in assistance.
          </p>
          <div className="space-y-4">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">SONYMA Down Payment Assistance</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Up to $15,000 for down payment and closing costs. Available statewide for buyers meeting income limits. Can be combined with other programs.
              </p>
              <p className="text-xs text-primary">Income limits vary by county — most Capital District buyers qualify</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">HomeFirst Down Payment Assistance (NYC Residents)</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Up to $100,000 for NYC residents buying in qualifying areas. The Capital District is a popular destination for NYC buyers using this program.
              </p>
              <p className="text-xs text-primary">Forgivable after 10-15 years of ownership</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Local City Programs</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Albany, Troy, and Schenectady each offer additional assistance for buyers purchasing within city limits. Programs change annually — we stay current on what is available.
              </p>
              <p className="text-xs text-primary">Often $5,000-$20,000 in additional assistance</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Employer Assistance Programs</h3>
              <p className="text-muted-foreground text-sm mb-3">
                State employees, healthcare workers, and educators often qualify for additional down payment help. Check with HR — many buyers miss this.
              </p>
              <p className="text-xs text-primary">Can stack with state and local programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Monthly Payment Breakdown */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Monthly Payment Breakdown Explained
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Your mortgage payment is just one piece. Here is what actually makes up your monthly housing cost:
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <p className="font-bold text-foreground mb-4 text-center">Example: $250,000 Home with 5% Down</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-2xl font-bold text-foreground">$1,420</p>
                <p className="text-xs text-muted-foreground mt-1">Principal & Interest</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-2xl font-bold text-foreground">$520</p>
                <p className="text-xs text-muted-foreground mt-1">Property Taxes</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-2xl font-bold text-foreground">$125</p>
                <p className="text-xs text-muted-foreground mt-1">Insurance</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-2xl font-bold text-foreground">$180</p>
                <p className="text-xs text-muted-foreground mt-1">PMI</p>
              </div>
            </div>
            <div className="border-t border-border mt-6 pt-6 text-center">
              <p className="text-3xl font-bold text-primary">$2,245/month</p>
              <p className="text-sm text-muted-foreground mt-1">Total Monthly Payment (PITI + PMI)</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">What is PMI?</p>
              <p className="text-sm text-muted-foreground">
                Private Mortgage Insurance protects the lender when you put less than 20% down. It drops off once you reach 20% equity. Typically 0.5-1% of loan amount annually.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Why Taxes Vary So Much</p>
              <p className="text-sm text-muted-foreground">
                Property taxes in the Capital District range from $15 to $45 per $1,000 of assessed value. A $250K home might cost $3,750/year in one town and $11,250 in another.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Step-by-Step Buying Process */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Step-by-Step Buying Process
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Get Pre-Approved (Not Pre-Qualified)",
                description: "A pre-approval is a full credit and income review. It tells sellers you are serious and gives you a real budget. Takes 1-3 days."
              },
              {
                step: "2",
                title: "Define Your Search Criteria",
                description: "Location, size, condition, price — pick your priorities. Be realistic about tradeoffs. Share this with your agent before touring homes."
              },
              {
                step: "3",
                title: "Tour Properties Strategically",
                description: "See 5-10 homes to calibrate. Take notes. Do not fall in love on day one. Compare neighborhoods, not just kitchens."
              },
              {
                step: "4",
                title: "Make an Offer",
                description: "Your agent will help you determine a competitive price based on recent sales and market conditions. Expect negotiation."
              },
              {
                step: "5",
                title: "Home Inspection",
                description: "Non-negotiable. Budget $400-$600 for a thorough inspection. This is where you learn what is really going on with the property."
              },
              {
                step: "6",
                title: "Negotiate Repairs or Credits",
                description: "Based on inspection findings, you may ask the seller to fix issues, reduce price, or provide closing credits."
              },
              {
                step: "7",
                title: "Final Loan Approval & Appraisal",
                description: "The lender orders an appraisal to confirm value. Final underwriting reviews everything. Takes 2-3 weeks."
              },
              {
                step: "8",
                title: "Closing Day",
                description: "Sign documents, wire funds, get keys. You are officially a homeowner. The whole process typically takes 45-60 days."
              }
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-background border border-border rounded-xl p-5">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">{item.step}</span>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Common Mistakes */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Common First-Time Buyer Mistakes
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Buying at the Top of Your Budget</p>
              <p className="text-sm text-muted-foreground">
                Just because you qualify for $350K does not mean you should spend it. Leave room for life, savings, and unexpected expenses.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Skipping the Home Inspection</p>
              <p className="text-sm text-muted-foreground">
                Never. A $500 inspection can save you from a $50,000 foundation problem. Always get one, even in competitive markets.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Ignoring Closing Costs</p>
              <p className="text-sm text-muted-foreground">
                Budget 2-5% of the purchase price for closing costs. On a $250K home, that is $5,000-$12,500 in addition to your down payment.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Making Big Purchases Before Closing</p>
              <p className="text-sm text-muted-foreground">
                Do not buy a car, open new credit cards, or make large purchases after pre-approval. Lenders recheck your credit before closing.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Focusing Only on the House</p>
              <p className="text-sm text-muted-foreground">
                The neighborhood matters as much as the property. Research schools, commute times, and future development plans.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Not Shopping Mortgage Rates</p>
              <p className="text-sm text-muted-foreground">
                A 0.25% rate difference saves thousands over 30 years. Get quotes from at least 3 lenders before committing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How much do I need for a down payment as a first-time buyer?</h3>
              <p className="text-muted-foreground text-sm">
                First-time buyers can put down as little as 3% with conventional loans or 3.5% with FHA loans. Many Capital District buyers qualify for SONYMA assistance (up to $15,000) and local programs that can cover most or all of the down payment. VA and USDA loans offer 0% down for qualifying buyers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What credit score do I need to buy a home?</h3>
              <p className="text-muted-foreground text-sm">
                FHA loans accept scores as low as 580 with 3.5% down. Conventional loans typically require 620+, with the best rates going to borrowers with 740+ scores. If your score is below 620, many lenders offer credit counseling to help you qualify within 6-12 months.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How long does it take to buy a house from start to finish?</h3>
              <p className="text-muted-foreground text-sm">
                The typical timeline is 45-60 days from accepted offer to closing. Add 2-4 weeks for house hunting before that. Getting pre-approved first is essential — it takes 1-3 days and shows sellers you are serious. The entire process from pre-approval to keys usually takes 2-3 months.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What are closing costs and how much should I expect?</h3>
              <p className="text-muted-foreground text-sm">
                Closing costs include lender fees, title insurance, attorney fees, prepaid taxes, and insurance. Budget 2-5% of the purchase price. On a $250,000 home, that is $5,000-$12,500. Sellers can sometimes contribute toward closing costs, and some assistance programs cover them.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Should I buy now or wait for prices or rates to drop?</h3>
              <p className="text-muted-foreground text-sm">
                Timing the market is difficult. While waiting, you continue paying rent and miss building equity. If rates drop significantly after purchase, you can refinance. The Capital District has historically stable prices with modest appreciation — waiting rarely provides dramatic savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="px-[5%] py-16 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Get the First-Time Buyer Guide
          </h2>
          <p className="text-muted-foreground mb-8">
            Download our complete checklist with grant information, lender recommendations, and a timeline to keep you on track from pre-approval to closing.
          </p>
          <Link
            to="/vip-buyer-access"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Get the Free Guide
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Free download
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No spam
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Updated for 2025
            </span>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FirstTimeHomeBuyers;
