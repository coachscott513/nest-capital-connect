import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";

interface LoanTypeSection {
  id: string;
  header: string;
  goldSummary: string;
  body: string[];
  keyNumbers: { label: string; value: string }[];
  bestFor: string;
  buttonText: string;
}

const loanTypes: LoanTypeSection[] = [
  {
    id: "conventional",
    header: "Conventional Loans",
    goldSummary: "The standard. Flexible terms, no mortgage insurance at 20% down.",
    body: [
      "Conventional financing is the most straightforward path to investment property ownership. You choose your down payment — typically 5% to 25% — and lock in a fixed rate for 15 to 30 years. Put 20% or more down and you avoid private mortgage insurance entirely, keeping your monthly payment clean and predictable.",
      "For investors, conventional loans offer the best balance of low rates and flexibility. Most lenders will finance up to 10 investment properties under conventional guidelines, though terms tighten after your fourth. If you have strong credit and enough cash for 20% down, this is usually your best cost of capital.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "5-25% (20% avoids PMI)" },
      { label: "Typical Rate", value: "6.0-7.5%" },
      { label: "Term", value: "15, 20, 25, or 30 years" },
      { label: "PMI", value: "None at 80% LTV or below" },
    ],
    bestFor: "Investors with strong credit and 20%+ down who want the lowest long-term cost of capital.",
    buttonText: "Analyze with Conventional Financing",
  },
  {
    id: "fha",
    header: "FHA Loans",
    goldSummary: "3.5% down. Owner-occupant required. The house-hacker's best friend.",
    body: [
      "FHA loans let you buy with as little as 3.5% down — a fraction of what conventional requires. The trade-off is mortgage insurance: a 1.75% upfront premium financed into your loan and a monthly premium of roughly 0.55% per year on your base loan amount. Both are calculated automatically in our analyzer.",
      "The catch: FHA requires you to live in the property. But here's where it gets interesting for investors. Buy a 2-4 unit property, live in one unit, rent the others. You're getting investment property financing at owner-occupant rates with minimal cash down. Combined with a 6% seller concession, some buyers walk into a duplex for under $5,000 out of pocket.",
      "FHA is the single most powerful tool for first-time investors who want to house-hack their way into real estate. The analyzer calculates your upfront MIP, monthly MIP, and true cash-to-close after concessions — numbers most calculators skip entirely.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "3.5% minimum" },
      { label: "Typical Rate", value: "6.0-7.0%" },
      { label: "Upfront MIP", value: "1.75% (financed into loan)" },
      { label: "Monthly MIP", value: "~0.55%/year on base loan" },
      { label: "Seller Concession", value: "Up to 6%" },
    ],
    bestFor: "First-time investors and house-hackers buying 2-4 unit properties with minimal cash.",
    buttonText: "Analyze with FHA Financing",
  },
  {
    id: "fha-203k",
    header: "FHA 203(k) Rehab Loans",
    goldSummary: "Purchase price + renovation budget in one loan. Buy it, fix it, rent it.",
    body: [
      "The 203(k) lets you finance both the purchase and the renovation in a single mortgage. Find a property that needs work, estimate the rehab cost, add a contingency reserve, and the total gets rolled into your FHA loan. You're buying a property that might not qualify for standard financing and turning it into a performing asset — all with 3.5% down on the combined amount.",
      "This is the value-add investor's tool. The analyzer models the full picture: rehab cost with contingency, total loan amount including MIP on the combined figure, holding costs during the renovation period when you have no rental income, and the after-repair value so you can see your instant equity position once the work is done.",
      "203(k) loans are more complex than standard FHA — there are contractor requirements, draw schedules, and inspection milestones. But the financial leverage is unmatched. You're creating equity through renovation while financing the entire project at residential rates.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "3.5% on purchase + rehab" },
      { label: "Typical Rate", value: "6.25-7.25%" },
      { label: "MIP", value: "Same as standard FHA" },
      { label: "Rehab", value: "Financed into the loan" },
      { label: "Contingency", value: "Typically 10-20%" },
    ],
    bestFor: "Value-add investors buying properties that need renovation. House-hackers who want to buy below market and force appreciation.",
    buttonText: "Analyze with 203(k) Rehab Financing",
  },
  {
    id: "dscr",
    header: "DSCR Loans",
    goldSummary: "Qualify on the property's income, not yours. Built for investors.",
    body: [
      "Debt Service Coverage Ratio loans flip the underwriting model. Instead of qualifying based on your personal income, tax returns, and employment — the lender qualifies the property. If the property's net operating income covers the mortgage payment by a sufficient margin (typically 1.0x to 1.25x), the loan gets approved. Your personal debt-to-income ratio doesn't matter.",
      "This is how portfolio investors scale past the conventional loan limit. No income verification. No limit on the number of properties. The trade-off: higher rates (typically 7-8.5%), larger down payments (20-25% minimum), and often origination points and prepayment penalties. The analyzer factors all of these into your true cost of capital and cash-to-close.",
      "The analyzer also shows whether your deal qualifies: green if your DSCR exceeds 1.25x, yellow if it's marginal, red if it's below 1.0x. You'll know before you call the lender whether the property makes the cut.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "20-25% minimum" },
      { label: "Typical Rate", value: "7.0-8.5%" },
      { label: "Qualification", value: "Property income, not personal" },
      { label: "Origination", value: "0.5-2 points typical" },
      { label: "Prepayment Penalty", value: "1-5 years common" },
    ],
    bestFor: "Experienced investors scaling a portfolio. Self-employed buyers who can't easily document income. Anyone past the conventional loan limit.",
    buttonText: "Analyze with DSCR Financing",
  },
  {
    id: "va",
    header: "VA Loans",
    goldSummary: "Zero down. No monthly mortgage insurance. For those who served.",
    body: [
      "VA loans offer the most favorable terms available in real estate financing — zero down payment and no monthly mortgage insurance. The only cost is a one-time VA funding fee (2.15% for first use) that gets financed into the loan. For eligible veterans and active-duty service members, this means buying an investment property with almost no cash out of pocket.",
      "Like FHA, VA requires owner-occupancy — you need to live in one of the units. But the same house-hack strategy applies: buy a 2-4 unit property, live in one unit, rent the rest. With zero down and no MI, your monthly payment is significantly lower than any other financing option, which means stronger cash flow from day one.",
      "The analyzer calculates the funding fee, total loan amount, and shows you the true cash position — which for many VA buyers is just closing costs minus the seller concession.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "$0" },
      { label: "Typical Rate", value: "5.75-6.75%" },
      { label: "VA Funding Fee", value: "2.15% (first use, financed)" },
      { label: "Monthly MI", value: "None" },
      { label: "Seller Concession", value: "Up to 4%" },
    ],
    bestFor: "Veterans and active-duty service members buying their first investment property with a house-hack strategy.",
    buttonText: "Analyze with VA Financing",
  },
  {
    id: "hard-money",
    header: "Hard Money & Bridge Loans",
    goldSummary: "Short-term capital for flips, bridge deals, and fast closes.",
    body: [
      "Hard money loans are short-term, high-rate financing designed for speed and flexibility. Terms run 6 to 24 months with rates typically between 10-14% and 1-3 origination points. Most are interest-only, meaning your monthly payment is just the interest — no principal paydown. You're paying for speed and access, not long-term cost efficiency.",
      "Investors use hard money for fix-and-flip projects, bridge financing between purchase and permanent refinance, or deals that need to close faster than traditional lenders allow. The analyzer models interest-only payments, origination points, total project cost over the hold period, and — if you're flipping — your gross profit and ROI based on your exit price.",
      "Hard money isn't cheap. But when the deal math works — buy at $200K, put in $50K, sell at $350K — the cost of capital is a rounding error compared to the return. The analyzer shows you exactly where that line is.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "10-30%" },
      { label: "Typical Rate", value: "10-14%" },
      { label: "Term", value: "6-24 months" },
      { label: "Points", value: "1-3 origination" },
      { label: "Structure", value: "Usually interest-only" },
    ],
    bestFor: "Fix-and-flip investors. Bridge financing. Deals that need to close fast. Experienced investors with a clear exit strategy.",
    buttonText: "Analyze with Hard Money Financing",
  },
  {
    id: "cash",
    header: "Cash Purchase",
    goldSummary: "No financing, no debt service. The simplest math in real estate.",
    body: [
      "Paying cash eliminates the most complex part of investment analysis: the mortgage. No interest rate risk. No qualification hoops. No monthly debt service eating into your returns. Your cash flow is simply rent minus operating expenses. Your cap rate is your return.",
      "Cash buyers also move faster — no appraisal contingency, no lender timeline, no risk of financing falling through. In competitive markets, that speed wins deals. The analyzer strips out all financing fields and shows you the pure property economics: NOI, cap rate, and monthly cash flow without debt.",
      "The trade-off is obvious: you're tying up significant capital in a single asset. The analyzer helps you see whether that capital is better deployed in one cash deal or spread across multiple leveraged properties.",
    ],
    keyNumbers: [
      { label: "Down Payment", value: "100% (full purchase price)" },
      { label: "Rate", value: "N/A" },
      { label: "Monthly Mortgage", value: "$0" },
      { label: "Cash Required", value: "Purchase + Closing - Concession" },
    ],
    bestFor: "Investors with available capital who want maximum cash flow, fastest closing, and simplest deal structure.",
    buttonText: "Analyze with Cash",
  },
];

const LoanTypes = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Investment Property Loan Types | FHA, DSCR, 203(k), VA, Hard Money | Capital District Nest</title>
        <meta 
          name="description" 
          content="Compare 7 financing types for investment properties. FHA, conventional, 203(k) rehab, DSCR, VA, hard money, and cash. Learn which loan type fits your strategy and analyze any deal instantly." 
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/loan-types" />
      </Helmet>

      {/* Navigation */}
      <header 
        className="sticky top-0 z-[2000]"
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(50px) saturate(200%)',
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/yield" className="flex flex-col">
              <span className="text-lg font-bold text-white">Capital District Nest</span>
              <span className="text-xs text-primary tracking-wide">The Yield Intelligence Platform</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/yield" className="text-sm text-white/80 hover:text-white transition-colors">Home</Link>
              <Link to="/analyzer" className="text-sm text-primary font-semibold hover:text-primary/80 transition-colors">Analyzer</Link>
              <Link to="/loan-types" className="text-sm text-white hover:text-white transition-colors font-semibold">Loan Types</Link>
              <Link to="/yield#how-it-works" className="text-sm text-white/80 hover:text-white transition-colors">How It Works</Link>
              <Link to="/reports" className="text-sm text-white/80 hover:text-white transition-colors">Reports</Link>
              <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">About</Link>
            </div>

            <Link 
              to="/analyzer" 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold"
            >
              Open Analyzer
            </Link>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <section className="px-6 py-16 md:py-24 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Loan Types for Investment Properties
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every financing structure works differently. Here's what you need to know — and how the analyzer handles each one.
          </p>
        </div>
      </section>

      {/* Loan Type Sections */}
      {loanTypes.map((loan, index) => (
        <section 
          key={loan.id}
          id={loan.id}
          className={`px-6 py-16 md:py-20 ${index % 2 === 0 ? 'bg-background' : 'bg-card'} border-b border-border`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {loan.header}
            </h2>
            
            {/* Gold Summary */}
            <p className="text-lg text-primary font-medium mb-8">
              {loan.goldSummary}
            </p>

            {/* Body */}
            <div className="space-y-4 mb-8">
              {loan.body.map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Numbers Box */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Key Numbers</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {loan.keyNumbers.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Best For */}
            <p className="text-muted-foreground mb-8">
              <span className="text-primary font-semibold">Best For:</span> {loan.bestFor}
            </p>

            {/* CTA Button */}
            <Link 
              to="/analyzer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {loan.buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="px-6 py-20 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to run the numbers?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Pick any loan type. See the real math. Download the report.
          </p>
          <Link 
            to="/analyzer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
          >
            Open the Analyzer
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary border-t border-border px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Capital District Nest</h3>
              <p className="text-sm text-muted-foreground">The Yield Intelligence Platform</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/yield" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
              <Link to="/analyzer" className="text-primary hover:text-primary/80 transition-colors">Analyzer</Link>
              <Link to="/loan-types" className="text-muted-foreground hover:text-white transition-colors">Loan Types</Link>
              <Link to="/about" className="text-muted-foreground hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Scott Alvarez | RE/MAX Solutions</p>
              <p className="text-sm text-muted-foreground">518-522-7265</p>
              <p className="text-sm text-muted-foreground">2 Gold Street, Albany, NY</p>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              capitaldistrictnest.com — © {new Date().getFullYear()} Capital District Nest
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoanTypes;
