import { useState } from "react";
import { TrendingUp, Percent, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CommandCenter from "@/components/CommandCenter";
import DueDiligenceEngine from "@/components/DueDiligenceEngine";
import AlphaListSection from "@/components/AlphaListSection";
import DealOfMonthSection from "@/components/DealOfMonthSection";
import StrategySessionSection from "@/components/StrategySessionSection";
import FinancingSection from "@/components/FinancingSection";
import CoverageAreaGrid from "@/components/CoverageAreaGrid";
import PropertyTypeGrid from "@/components/PropertyTypeGrid";

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
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('openCommandCenter'))}
            className="text-primary font-bold hover:underline"
          >
            Team →
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-muted-foreground/60">
          *Capital District Nest LLC is a specialized team of real estate professionals affiliated with RE/MAX. 
          Each office independently owned and operated.
        </p>
      </section>

      {/* Due Diligence Engine */}
      <DueDiligenceEngine />

      {/* Coverage Area Grid - SEO Linked */}
      <CoverageAreaGrid />

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
                <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
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

      {/* Investment Strategies Grid - SEO Linked */}
      <PropertyTypeGrid />

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

      {/* Capital Stack Financing Section */}
      <FinancingSection />

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

      </section>
      {/* Market Intelligence Section */}
      <section className="px-[5%] py-20 border-t border-border" style={{ backgroundColor: '#065F46' }}>
        <div className="text-center max-w-[800px] mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Market Pulse: <span className="text-[#10B981]">The Data Behind the Deal.</span>
          </h2>
          <p className="text-white/70 text-lg">Real-time insights from the Capital District investment landscape.</p>
        </div>

        {/* 3-Column Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Live Mortgage Rate */}
          <div className="group relative bg-[#022c22] border border-[#10B981] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            {/* Live Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-[#10B981] text-xs font-medium">Live Market Data</span>
            </div>
            
            <h3 className="text-white font-bold text-lg mb-2">30-Year Fixed Avg</h3>
            <p className="text-white/50 text-sm mb-6">National Rate Index</p>
            
            {/* Large Rate Display */}
            <div className="h-24 flex items-center justify-center gap-3 mb-6">
              <span className="text-5xl md:text-6xl font-black text-white">6.82%</span>
              {/* Rate Up Arrow (Red) - Change to TrendingDown and green when rates drop */}
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
            
            <p className="text-red-400 font-bold text-xl">+0.12% this week</p>
            
            {/* Hover Tooltip */}
            <div className="absolute inset-0 bg-[#022c22]/95 rounded-2xl p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <p className="text-white text-center text-sm leading-relaxed">
                <span className="font-bold text-[#10B981]">The 1% Rule:</span> For every 1% drop in rates, your buying power increases by ~10%. Lock in before the next Fed meeting.
              </p>
            </div>
          </div>

          {/* Card 2: Rent Velocity */}
          <div className="bg-[#022c22] border border-[#10B981] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <h3 className="text-white font-bold text-lg mb-2">Rent Velocity</h3>
            <p className="text-white/50 text-sm mb-6">Troy Rent Trends</p>
            
            {/* Two Vertical Bars */}
            <div className="h-24 flex items-end justify-center gap-8 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-12 bg-[#10B981]/50 rounded-t" style={{ height: '50%' }} />
                <span className="text-white/50 text-xs mt-2">2024</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 bg-[#10B981] rounded-t" style={{ height: '85%' }} />
                <span className="text-white/50 text-xs mt-2">2025</span>
              </div>
            </div>
            
            <p className="text-[#10B981] font-bold text-xl">Troy Rents +12%</p>
          </div>

          {/* Card 3: Alpha Spread */}
          <div className="bg-[#022c22] border border-[#10B981] rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <h3 className="text-white font-bold text-lg mb-2">Alpha Spread</h3>
            <p className="text-white/50 text-sm mb-6">Client Performance</p>
            
            {/* Large Gold Percentage */}
            <div className="h-24 flex items-center justify-center mb-6">
              <span className="text-5xl md:text-6xl font-black text-[#FFD700]">12.4%</span>
            </div>
            
            <p className="text-[#FFD700] font-bold text-xl">Avg. Client Cap Rate</p>
          </div>
        </div>
      </section>

      {/* Deal of the Month Section */}
      <DealOfMonthSection />

      {/* Alpha List Section */}
      <AlphaListSection />

      {/* Strategy Session Section */}
      <StrategySessionSection />

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
