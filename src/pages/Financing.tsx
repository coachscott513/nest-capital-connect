import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Wallet, Users, Percent, PiggyBank, ClipboardCheck, ArrowRight, CheckCircle } from "lucide-react";

const Financing = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Mortgage & Financing Guide | Capital District NY</title>
        <meta name="description" content="Understand mortgage options, down payment assistance, and financing for first-time buyers and investors in Albany, Troy, and the Capital District." />
        <meta name="keywords" content="mortgage Capital District, home financing Albany, investor loans NY, first-time buyer mortgage, down payment assistance" />
        <link rel="canonical" href="https://capitaldistrictnest.com/financing" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-card border-b border-border px-[5%] py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mortgage & Financing Guide
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The right financing changes everything. This guide breaks down mortgage options, assistance programs, and how to position yourself for the best terms.
          </p>
        </div>
      </section>

      {/* Guide Coming Soon Banner */}
      <div className="bg-primary/5 border-b border-primary/20 px-[5%] py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-sm font-medium text-foreground">
            📘 Free Mortgage Options Guide Coming Soon — Join the List to Get It First.
          </span>
          <Link to="/vip-buyer-access" className="text-sm font-bold text-primary hover:underline">
            Join Now →
          </Link>
        </div>
      </div>

      {/* Section 1: Mortgage Types Explained */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Mortgage Types Explained Simply
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Not all mortgages are created equal. Here are the main options and when each makes sense:
          </p>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">Conventional Loans</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Most Common</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Standard mortgages not backed by the government. Require 3-20% down with good credit (620+). Best rates go to borrowers with 740+ scores and 20% down.
              </p>
              <p className="text-xs text-muted-foreground">Best for: Buyers with solid credit and savings who want competitive rates</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">FHA Loans</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Low Down Payment</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Government-backed loans with 3.5% down and flexible credit requirements (580+). Include mortgage insurance for the life of the loan unless you refinance.
              </p>
              <p className="text-xs text-muted-foreground">Best for: First-time buyers with limited savings or credit challenges</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">VA Loans</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Veterans Only</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Zero down payment, no PMI, competitive rates. Available to veterans, active duty, and qualifying spouses. One of the best loan products available.
              </p>
              <p className="text-xs text-muted-foreground">Best for: Anyone who qualifies — do not leave this benefit on the table</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground">USDA Loans</h3>
                <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">Rural Areas</span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                Zero down payment for rural and suburban properties. Income limits apply. Many Capital District towns outside city limits qualify.
              </p>
              <p className="text-xs text-muted-foreground">Best for: Buyers looking in Guilderland, Bethlehem, Brunswick, and similar areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: First-Time Buyer vs Investor Financing */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              First-Time Buyer vs. Investor Financing
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Financing rules differ significantly based on how you intend to use the property:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Owner-Occupied (Primary Residence)</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Lower down payments (3-5% possible)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Better interest rates (0.25-0.75% lower)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Access to FHA, VA, USDA programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Down payment assistance available</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">More flexible credit requirements</span>
                </li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Investment Property</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">15-25% down payment required</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Higher interest rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Stricter credit requirements (680+)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Cash reserves required (6+ months)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Rental income can help qualify</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-6">
            <p className="text-foreground font-semibold mb-2">House Hacking Strategy</p>
            <p className="text-muted-foreground text-sm">
              Buy a 2-4 unit property, live in one unit, rent the others. You get owner-occupied rates and terms while building an investment portfolio. This is one of the best wealth-building strategies for new investors.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: How Interest Rates Affect Affordability */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              How Interest Rates Affect Affordability
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Small rate changes have big impacts on your monthly payment and total cost:
          </p>
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <p className="font-bold text-foreground mb-4 text-center">$300,000 Loan Over 30 Years</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">6.0% Rate</p>
                <p className="text-xl font-bold text-foreground">$1,799/mo</p>
                <p className="text-xs text-muted-foreground mt-1">Total: $647K</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">6.5% Rate</p>
                <p className="text-xl font-bold text-foreground">$1,896/mo</p>
                <p className="text-xs text-muted-foreground mt-1">Total: $683K</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">7.0% Rate</p>
                <p className="text-xl font-bold text-foreground">$1,996/mo</p>
                <p className="text-xs text-muted-foreground mt-1">Total: $719K</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">7.5% Rate</p>
                <p className="text-xl font-bold text-foreground">$2,098/mo</p>
                <p className="text-xs text-muted-foreground mt-1">Total: $755K</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Rate vs. Price</p>
              <p className="text-sm text-muted-foreground">
                A 1% rate increase has the same payment impact as roughly 10% higher purchase price. Sometimes waiting for lower rates costs more than buying now.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-2">Refinancing Option</p>
              <p className="text-sm text-muted-foreground">
                If rates drop significantly after purchase, refinancing can lower your payment. The common advice: date the rate, marry the house.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Down Payment Options and Assistance */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Down Payment Options and Assistance
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            You do not always need 20% down. Here are the real minimums and assistance options:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-background border border-border rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-primary mb-2">3%</p>
              <p className="font-bold text-foreground mb-1">Conventional Min</p>
              <p className="text-xs text-muted-foreground">With PMI, 620+ credit</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-primary mb-2">3.5%</p>
              <p className="font-bold text-foreground mb-1">FHA Min</p>
              <p className="text-xs text-muted-foreground">580+ credit score</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 text-center">
              <p className="text-3xl font-bold text-primary mb-2">0%</p>
              <p className="font-bold text-foreground mb-1">VA/USDA</p>
              <p className="text-xs text-muted-foreground">If you qualify</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">SONYMA Down Payment Assistance</h3>
              <p className="text-muted-foreground text-sm">
                Up to $15,000 toward down payment and closing costs. Income limits apply but most Capital District buyers qualify. Can be combined with other programs.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Gift Funds</h3>
              <p className="text-muted-foreground text-sm">
                Family can gift down payment funds on most loan types. FHA allows 100% gift. Conventional requires you to contribute 5% on investment properties.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Seller Concessions</h3>
              <p className="text-muted-foreground text-sm">
                Sellers can contribute 3-6% toward your closing costs depending on loan type. This reduces cash needed at closing, freeing funds for down payment.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Employer Programs</h3>
              <p className="text-muted-foreground text-sm">
                State employees, healthcare workers, teachers, and others may have employer-sponsored homebuyer assistance. Check with your HR department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pre-Approval Checklist */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Pre-Approval Checklist
            </h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Gather these documents before applying for pre-approval. Having everything ready speeds up the process:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-3">Income Verification</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Last 2 years W-2s
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Last 30 days pay stubs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Last 2 years tax returns (if self-employed)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Social Security or pension award letters
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-3">Asset Documentation</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Last 2 months bank statements (all pages)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Investment account statements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  401k/retirement account statements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Gift letter (if using gift funds)
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-3">Identity & Residence</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Government-issued photo ID
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Social Security card or ITIN
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Current lease or mortgage statement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Proof of residence history (2 years)
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="font-bold text-foreground mb-3">Additional Items</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Divorce decree (if applicable)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Bankruptcy discharge papers (if applicable)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Explanation letters for credit issues
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Business docs (if self-employed)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-[5%] py-12 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What is the difference between pre-qualification and pre-approval?</h3>
              <p className="text-muted-foreground text-sm">
                Pre-qualification is a quick estimate based on self-reported information — it carries little weight with sellers. Pre-approval involves a full credit check, income verification, and documentation review. Always get pre-approved before house hunting; it shows sellers you are a serious, qualified buyer.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Should I choose a 15-year or 30-year mortgage?</h3>
              <p className="text-muted-foreground text-sm">
                A 15-year mortgage has lower interest rates and builds equity faster, but higher monthly payments. A 30-year mortgage offers lower payments and more flexibility. Most buyers choose 30-year for the payment flexibility, then make extra payments when possible.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">What is PMI and how do I avoid it?</h3>
              <p className="text-muted-foreground text-sm">
                Private Mortgage Insurance (PMI) protects the lender when you put less than 20% down. It typically costs 0.5-1% of the loan amount annually. To avoid PMI, put 20% down, use a VA loan (no PMI), or ask about lender-paid PMI options that trade slightly higher rates for no separate PMI payment.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Can I buy an investment property with less than 20% down?</h3>
              <p className="text-muted-foreground text-sm">
                Traditional investment property loans require 15-25% down. However, if you live in one unit of a 2-4 unit property (house hacking), you can use owner-occupied financing with as little as 3.5% down (FHA) or 5% (conventional). This is one of the best strategies for new investors.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">How much does one percentage point in interest rate affect my payment?</h3>
              <p className="text-muted-foreground text-sm">
                On a $300,000 loan, each 1% rate increase adds roughly $200/month to your payment. Over 30 years, that is $72,000 in additional interest. However, a 1% rate increase has roughly the same payment impact as a 10% higher purchase price — so timing the market on rates is not always beneficial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="px-[5%] py-16 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Talk to a Financing Expert
          </h2>
          <p className="text-muted-foreground mb-8">
            Get connected with lenders who specialize in Capital District purchases. We work with professionals who understand local programs, investor loans, and first-time buyer assistance.
          </p>
          <Link
            to="/vip-buyer-access"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
          >
            Connect With a Lender
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Multiple lender options
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              No obligation
            </span>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Financing;
