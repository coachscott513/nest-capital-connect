import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CommandCenter from "@/components/CommandCenter";
import AlphaListSection from "@/components/AlphaListSection";
import DealOfMonthSection from "@/components/DealOfMonthSection";
import StrategySessionSection from "@/components/StrategySessionSection";
import FinancingSection from "@/components/FinancingSection";

const markets = [
  { name: "Albany", href: "/albany-real-estate" },
  { name: "Niskayuna", href: "/markets" },
  { name: "Troy", href: "/troy-real-estate" },
  { name: "Schenectady", href: "/schenectady-real-estate" },
  { name: "Saratoga", href: "/saratoga-real-estate" },
  { name: "Latham", href: "/markets" },
  { name: "Clifton Park", href: "/markets" },
  { name: "Rensselaer", href: "/markets" },
];

const propertyTypes = [
  { name: "Single Family Homes", href: "/homes-for-sale" },
  { name: "Rental Properties", href: "/rentals" },
  { name: "Land", href: "/albany-land" },
  { name: "Fix & Flip", href: "/sell-investment-property" },
  { name: "Commercial", href: "/albany-multi-unit" },
  { name: "Sell Your Home", href: "/sell-investment-property" },
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
  { label: "Start Live Chat", href: "#contact", highlight: true },
  { label: "Login", href: "/auth" },
  { label: "Support", href: "#contact" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Albany NY Real Estate | Capital District Nest | Homes, Investment & Land"
        description="Stop renting. Start owning. Capital District Nest connects buyers with $30k down-payment grants, off-market multi-family deals, and land in Albany, Troy, and Schenectady. Powered by RE/MAX."
        keywords="Albany NY Real Estate, Troy NY Home Grants, Schenectady Multi-Family, Capital District Investment Property, First Time Home Buyer Grants NY, Niskayuna Land for Sale, RE/MAX Capital District"
        canonical="https://capitaldistrictnest.com"
        ogImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        ogType="website"
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
          We are <strong className="text-foreground">The Capital District Nest Team at RE/MAX</strong>—a specialized team of business strategists.
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

      {/* Markets Grid */}
      <section className="px-[5%] py-20 border-t border-border">
        <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-10 text-center">
          We cover the entire Capital District.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {markets.map((market) => (
            <Link
              key={market.name}
              to={market.href}
              className="border border-border px-4 py-4 text-center rounded-lg cursor-pointer font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {market.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Bar - Reviews Section */}
      <section className="bg-muted/30 py-12 px-[5%] border-t border-border">
        <h3 className="text-center text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-8">
          Trusted by families in the Capital District
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Review 1 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">
              "Scott is an amazing realtor. His communication skills are outstanding... He also referred us to an excellent mortgage banker and closing attorney."
            </p>
            <div className="text-sm">
              <span className="font-semibold text-foreground">Karen Lawson</span>
              <span className="text-muted-foreground"> • Buy & Sell</span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">
              "We put in an offer. Offer got accepted THAT night. Then we closed in 22 days!!!! Scott is THAT good!"
            </p>
            <div className="text-sm">
              <span className="font-semibold text-foreground">Scout Isabella Hoff</span>
              <span className="text-muted-foreground"> • Pine Hills</span>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-4">
              "By the end, Scott wasn't just my real estate agent — he became a friend. Incredibly genuine and professional."
            </p>
            <div className="text-sm">
              <span className="font-semibold text-foreground">jstickling0</span>
              <span className="text-muted-foreground"> • Buyer & Seller</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link to="/reviews" className="text-primary font-semibold hover:underline text-sm">
            Read All Reviews →
          </Link>
        </div>
      </section>

      {/* Property Types Grid */}
      <section className="px-[5%] py-20 border-t border-border">
        <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-10 text-center">
          We specialize in every property type.
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {propertyTypes.map((type) => (
            <Link
              key={type.name}
              to={type.href}
              className="border border-border px-4 py-4 text-center rounded-lg cursor-pointer font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {type.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Market Analytics Section */}
      <section className="flex flex-col lg:flex-row items-center px-[5%] py-20 border-t border-border bg-muted/20">
        <div className="flex-1 max-w-[550px] p-5">
          <div className="text-primary font-bold text-sm mb-3 uppercase tracking-wider">Q4 2025 DATA</div>
          <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5 text-[hsl(220,50%,45%)]">
            The Economics of<br />Upstate Real Estate
          </h2>
          <p className="text-muted-foreground italic mb-4">
            Why accurate pricing matters more than ever in a tight inventory market.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Real estate isn't just about curb appeal; it's about supply and demand curves. In late 2025, the Capital District is experiencing a classic supply constraint. With inventory in Albany County down nearly 16% year-over-year and median sale prices stabilizing around $320,000, we are in a high-velocity market.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For sellers, this "Scarcity Premium" means homes priced correctly are seeing multiple offers within 15 days. For buyers, it means you need an agent who understands the data to win competitive bids without overpaying. I don't just guess the price; <strong className="text-foreground">I analyze the market fundamentals to secure your investment.</strong>
          </p>
        </div>
        <div className="flex-1 flex justify-center p-5">
          <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-[400px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-6 text-center">Capital District Market Snapshot</div>
            
            {/* Metric 1 */}
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <div className="text-4xl font-extrabold text-foreground">15</div>
                <div className="text-sm text-muted-foreground mt-1">Avg Days on Market</div>
              </div>
              <div className="flex items-center gap-1 text-primary font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Fast
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center justify-between py-4 border-b border-border">
              <div>
                <div className="text-4xl font-extrabold text-foreground">$320k</div>
                <div className="text-sm text-muted-foreground mt-1">Median Sales Price</div>
              </div>
              <div className="flex items-center gap-1 text-primary font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Stable
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center justify-between py-4">
              <div>
                <div className="text-4xl font-extrabold text-foreground">98.1%</div>
                <div className="text-sm text-muted-foreground mt-1">List-to-Sale Ratio</div>
              </div>
              <div className="flex items-center gap-1 text-primary font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Strong
              </div>
            </div>
          </div>
        </div>
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
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openCommandCenter'))}
            className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform cursor-pointer"
          >
            Start Live Chat
          </button>
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
          <img 
            src="/assets/wall-street-analysis.png" 
            alt="Investment Performance Analysis showing Projected Net Annual Cash Flow and Cash-on-Cash Return comparison"
            className="w-full max-w-[600px] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          />
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
            Most agents just "show houses." The Capital District Nest Team at RE/MAX is different—we navigate the complex regulatory landscape 
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

      {/* Media Hub Section */}
      <section className="px-[5%] py-20 bg-muted/40 border-t border-border">
        <div className="text-center max-w-[800px] mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Media Hub
          </h2>
          <p className="text-muted-foreground text-lg">Stories, insights, and behind-the-scenes from Capital District real estate.</p>
        </div>

        {/* Masonry Grid - 6 Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {[
            { title: "Market Analysis: Albany's Hottest Neighborhoods", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop", tall: true },
            { title: "First-Time Buyer Success Story", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop", tall: false },
            { title: "Investment Property Walkthrough", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&h=400&fit=crop", tall: false },
            { title: "Troy's Historic Victorian Revival", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop", tall: true },
            { title: "Grant Programs Explained", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop", tall: false },
            { title: "Multi-Family Investment Tips", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop", tall: false },
          ].map((post, i) => (
            <div 
              key={i} 
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                post.tall ? 'row-span-2 aspect-[3/4]' : 'aspect-[4/3]'
              }`}
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg leading-tight">{post.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Social Icons Row */}
        <div className="flex justify-center items-center gap-8 pt-8 border-t border-border/50">
          {/* TikTok */}
          <a href="https://www.tiktok.com/@capitaldistrictnest" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-10 h-10" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="https://www.youtube.com/@capitaldistrictnest" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-10 h-10" fill="#FF0000" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://www.facebook.com/capitaldistrictnest" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-10 h-10" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          {/* X (Twitter) */}
          <a href="https://twitter.com/capitaldistrictnest" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-9 h-9" fill="#ffffff" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/capitaldistrictnest" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-10 h-10" fill="#E4405F" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Deal of the Month Section */}
      <DealOfMonthSection />

      {/* Alpha List Section */}
      <AlphaListSection />

      {/* Strategy Session Section */}
      <StrategySessionSection />

      {/* Capital Stack Financing Section */}
      <FinancingSection />

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
