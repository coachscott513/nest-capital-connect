import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CommandCenter from "@/components/CommandCenter";

const markets = [
  "Albany", "Niskayuna", "Troy", "Schenectady", 
  "Saratoga", "Latham", "Clifton Park", "Rensselaer"
];

const menuSections = [
  {
    category: "Assets",
    items: [
      { label: "Invest", sub: "/ Standard Listings", href: "/investment-landing" },
      { label: "Markets", sub: "/ Crypto of Real Estate", href: "/markets" },
      { label: "Rentals", sub: "/ Retirement Income", href: "/rentals" },
      { label: "Commercial", sub: "/ Ventures", href: "/albany-multi-unit" },
      { label: "Land", sub: "/ Futures", href: "/albany-land" },
      { label: "Luxury", sub: "/ Gold Standard", href: "/homes-for-sale" },
    ],
  },
  {
    category: "Capital",
    items: [
      { label: "Financing", sub: "/ Banking & Loans", href: "/first-time-homebuyers" },
      { label: "Grants", sub: "/ Free Funding", href: "/grants" },
      { label: "Calculators", sub: "/ ROI Tools", href: "/investor-tools" },
      { label: "Forecasts", sub: "/ Market Predictions", href: "/delmar-market-insights" },
    ],
  },
  {
    category: "Strategies",
    items: [
      { label: "Flipping", sub: "/ Active Trading", href: "/sell-investment-property" },
      { label: "Strategies", sub: "/ Options & BRRRR", href: "/cash-flow-report" },
      { label: "VIP Access", sub: "/ Legends Only", href: "/auth" },
    ],
  },
  {
    category: "Network",
    items: [
      { label: "Community", sub: "/ Social", href: "/blog" },
      { label: "Learn", sub: "/ Education", href: "/communities" },
    ],
  },
];

const footerLinks = [
  { label: "Start Live Chat", href: "/first-time-homebuyers", highlight: true },
  { label: "Login", href: "/auth" },
  { label: "Support", href: "/contact" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | The Modern Real Estate Company"
        description="Real answers, right now. Get instant access to live, licensed agents who know the Capital District neighborhoods, schools, and market reality."
        keywords="real estate Albany NY, Capital District homes, Niskayuna real estate, Troy homes for sale, licensed real estate agent"
        canonical="https://capitaldistrictnest.com"
        ogImage="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
      />

      {/* Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background z-[1500] flex flex-col pt-24 px-5 md:px-10 pb-10 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="overflow-y-auto flex-1 pr-4 scrollbar-hide">
          <ul className="flex flex-col gap-2">
            {menuSections.map((section) => (
              <li key={section.category}>
                {/* Category Divider */}
                <div className="text-xs uppercase text-muted-foreground/50 font-extrabold tracking-widest mt-6 mb-3 first:mt-0">
                  {section.category}
                </div>
                
                {/* Menu Items */}
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group block text-foreground text-2xl md:text-4xl font-bold tracking-tight hover:text-primary hover:pl-4 transition-all py-1"
                  >
                    {item.label}
                    <span className="text-sm md:text-base text-muted-foreground/50 font-medium ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.sub}
                    </span>
                  </Link>
                ))}
              </li>
            ))}
          </ul>
          
          {/* Footer Links */}
          <div className="flex gap-5 mt-10 pt-8 border-t border-border">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-semibold ${
                  link.highlight ? "text-primary" : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-[2000] flex items-center justify-between px-5 md:px-10 h-20 bg-background/90 backdrop-blur-md border-b border-border">
        <Link to="/" className="font-extrabold text-lg md:text-xl tracking-tight uppercase">
          Capital District <span className="text-primary">Nest</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center gap-2 border px-4 py-2 rounded-full font-bold text-sm transition-all ${
            menuOpen
              ? "border-primary text-primary"
              : "border-foreground text-foreground hover:bg-foreground hover:text-background"
          }`}
        >
          {menuOpen ? (
            "Close"
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <div className="w-4 h-0.5 bg-current" />
                <div className="w-4 h-0.5 bg-current" />
              </div>
              Menu
            </>
          )}
        </button>
      </header>

      {/* Mission Control - The New Tagline Section */}
      <section className="text-center px-[5%] pt-20 pb-10 max-w-[900px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium leading-[1.1] tracking-tight mb-5">
          Wall Street Tools.<br />
          <strong className="text-primary font-medium">Main Street Soul.</strong>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8 max-w-[700px] mx-auto">
          The Capital District's premier tech-enabled investment team. 
          We are <strong className="text-foreground">The Capital District Nest Team at RE/MAX</strong>—a specialized group of Economists and Business Strategists 
          combining institutional-grade market data with white-glove local service.
        </p>

        {/* Trust Badges */}
        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {/* RE/MAX Badge - Special Styling */}
          <div className="flex items-center gap-2 border border-[#004ecc] text-foreground px-4 py-2 rounded-full text-sm font-semibold">
            <div className="w-1.5 h-1.5 bg-[#dc1c2e] rounded-full" />
            Powered by RE/MAX
          </div>
          
          {["Econ & Business Degrees", "Specialized Investment Team", "Local Experts"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 bg-border/50 text-muted-foreground px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              {badge}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link to="/markets" className="bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            View Market Data
          </Link>
          <Link to="/first-time-homebuyers" className="text-primary font-bold hover:underline">
            Chat with the Team →
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-muted-foreground/60">
          *Capital District Nest LLC is a specialized team of real estate professionals affiliated with RE/MAX. 
          Each office independently owned and operated.
        </p>
      </section>

      {/* Hero Section 1: VIP Experience */}
      <section className="flex flex-col lg:flex-row items-center px-[5%] py-16 lg:min-h-[600px] border-t border-border">
        <div className="flex-1 max-w-[550px] p-5">
          <div className="text-primary font-bold text-sm mb-3">VIP EXPERIENCE</div>
          <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5">
            Local knowledge.<br />Instant access.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            Whether you need to know the school district in Niskayuna or the zoning laws in Troy, 
            our team is ready. No bots. Just licensed professionals with degrees in Economics and Business.
          </p>
          <Link to="/first-time-homebuyers" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            Start Live Chat
          </Link>
        </div>
        <div className="flex-1 flex justify-center p-5">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-[450px] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Live Support • Avg Response 2m</div>
            <div className="bg-muted p-4 rounded-xl mb-3 text-foreground">
              "Can we see the multi-unit on State St today?"
            </div>
            <div className="bg-primary text-primary-foreground p-4 rounded-xl ml-auto w-fit">
              "Absolutely. I have the keys. I'll meet you there at 4pm."
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section 2: Purchasing Power (Reversed) */}
      <section className="flex flex-col lg:flex-row-reverse items-center px-[5%] py-16 lg:min-h-[600px] border-t border-border">
        <div className="flex-1 max-w-[550px] p-5">
          <div className="text-primary font-bold text-sm mb-3">PURCHASING POWER</div>
          <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5">
            Financing made<br />transparent.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            From FHA 3.5% down-payments to negotiating 6% seller concessions. 
            We unlock grants and creative financing to maximize your leverage.
          </p>
          <Link to="/grants" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            See Grant Eligibility
          </Link>
        </div>
        <div className="flex-1 flex justify-center p-5">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-[450px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-center">
            <div className="text-5xl md:text-6xl font-extrabold text-foreground leading-none">$30k</div>
            <div className="text-primary font-bold mt-3">Down Payment Grant</div>
            <hr className="border-0 border-t border-border my-5" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="font-semibold">6.1% Fixed</span>
            </div>
            <div className="flex justify-between text-sm mt-3">
              <span className="text-muted-foreground">Closing Costs</span>
              <span className="text-primary font-semibold">Covered (Seller)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section 3: Graduate Analysis */}
      <section className="flex flex-col lg:flex-row items-center px-[5%] py-16 lg:min-h-[600px] border-t border-border">
        <div className="flex-1 max-w-[550px] p-5">
          <div className="text-primary font-bold text-sm mb-3">INVESTOR TOOLS</div>
          <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5">
            Graduate-level<br />analysis.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            Investing isn't a guessing game. Our agents hold Bachelor's and Graduate degrees in Economics and Business.
            We run the Rent Rolls, calculate the ROI, and build the spreadsheets for you.
          </p>
          <Link to="/investor-tools" className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            View Investor Tools
          </Link>
        </div>
        <div className="flex-1 flex justify-center p-5">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-[500px] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="text-xl font-extrabold mb-5">Troy Triplex Analysis</div>
            <div className="flex justify-between py-4 border-b border-border">
              <span className="text-muted-foreground">Monthly Rent Roll</span>
              <span className="font-bold text-primary">$4,250</span>
            </div>
            <div className="flex justify-between py-4 border-b border-border">
              <span className="text-muted-foreground">Operating Expenses</span>
              <span className="font-bold text-red-500">-$1,100</span>
            </div>
            <div className="flex justify-between py-4 border-b border-border">
              <span className="text-muted-foreground">Est. Mortgage (7%)</span>
              <span className="font-bold text-red-500">-$2,100</span>
            </div>
            <div className="flex justify-between pt-5">
              <span className="text-xl">Net Cash Flow</span>
              <span className="font-bold text-primary text-2xl">+$1,050/mo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Managers Section */}
      <section className="px-[5%] py-20 bg-card/50 border-t border-border">
        {/* Section Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Not Agents. <span className="text-primary">Portfolio Managers.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Most brokerages hire salespeople. We hire Economists, Analysts, and Investors. 
            Our team doesn't just "show houses"—we navigate the complex regulatory landscape 
            of the Capital District so your asset performs from Day 1.
          </p>
        </div>

        {/* Investor Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-xl border border-border">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Cash Flow Modeling</h3>
            <p className="text-muted-foreground leading-relaxed">
              We build <strong className="text-foreground">complete rent roll projections</strong> with realistic expense ratios, vacancy assumptions, and cap rate analysis before you make an offer.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3">Market Comparables</h3>
            <p className="text-muted-foreground leading-relaxed">
              We pull <strong className="text-foreground">neighborhood-level data</strong>—recent sales, rental rates, and price trends—so you know exactly what a property is worth today and tomorrow.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl border border-border">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">ROI Projections</h3>
            <p className="text-muted-foreground leading-relaxed">
              From <strong className="text-foreground">CoC returns to IRR</strong>, we calculate your actual returns factoring in financing costs, rehab budgets, and realistic appreciation scenarios.
            </p>
          </div>
        </div>

        {/* Client Case Study */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden max-w-4xl mx-auto">
          <div className="p-8 md:p-10">
            <div className="uppercase text-primary font-extrabold tracking-widest text-sm mb-3">
              Client Case Study: The "Impossible" Triplex
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              From "Uninsurable" to 14% Cash Flow.
            </h3>

            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="text-muted-foreground text-sm uppercase tracking-wide">Acquisition</div>
                <div className="text-2xl font-bold">$145,000</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm uppercase tracking-wide">Rehab Grant</div>
                <div className="text-2xl font-bold text-primary">+$25,000</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm uppercase tracking-wide">Current Rent</div>
                <div className="text-2xl font-bold">$3,400/mo</div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              "I was looking at this property in Troy, but my bank said no because of the peeling paint and FHA rules. Scott and his team stepped in. They didn't just find a lender; 
              they secured a <strong className="text-foreground">Rehab Loan</strong> that covered the repairs and negotiated a <strong className="text-foreground">Seller Concession</strong> to pay my closing costs. 
              I walked in with $12k total out of pocket."
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-full" />
              <div>
                <div className="font-bold">Michael R.</div>
                <div className="text-muted-foreground text-sm">Investor • Westchester, NY</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="px-[5%] py-20 border-t border-border">
        <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-10 text-center">
          We cover the entire Capital District.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {markets.map((market) => (
            <div
              key={market}
              className="border border-border px-4 py-4 text-center rounded-lg cursor-pointer font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {market}
            </div>
          ))}
        </div>
      </section>

      {/* Command Center FAB */}
      <CommandCenter />

      {/* Footer */}
      <footer className="px-[5%] py-12 text-center text-muted-foreground text-sm border-t border-border">
        <p>© 2025 Capital District Nest. Licensed Real Estate Broker.</p>
        <p className="mt-2">Providing VIP Service, Technology, and Professional Guidance.</p>
      </footer>
    </div>
  );
};

export default Index;
