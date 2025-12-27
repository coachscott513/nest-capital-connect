import { useState, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import GuideLeadModal from "@/components/GuideLeadModal";
import SEOHead from "@/components/SEOHead";
import DueDiligenceEngine from "@/components/DueDiligenceEngine";
import AlphaListSection from "@/components/AlphaListSection";
import DealOfMonthSection from "@/components/DealOfMonthSection";
import StrategySessionSection from "@/components/StrategySessionSection";
import FinancingSection from "@/components/FinancingSection";
import CoverageAreaGrid from "@/components/CoverageAreaGrid";
import PropertyTypeGrid from "@/components/PropertyTypeGrid";
import QuickSearchBlock from "@/components/QuickSearchBlock";
import MultiUnitSearchSection from "@/components/MultiUnitSearchSection";
import StartHereDeck from "@/components/StartHereDeck";
import HomeBuyerHub from "@/components/HomeBuyerHub";
import InvestorHub from "@/components/InvestorHub";
import MarketMapSection from "@/components/MarketMapSection";
import CleanHero from "@/components/CleanHero";
import FeaturedListingBanner from "@/components/FeaturedListingBanner";
import HomepageEntrySections from "@/components/HomepageEntrySections";
import TownEntrySection from "@/components/TownEntrySection";
import GuidedDeck from "@/components/GuidedDeck";

const menuSections = [
  {
    category: "Home",
    items: [
      { label: "Home", sub: "/ Main", href: "/" },
    ],
  },
  {
    category: "Towns",
    items: [
      { label: "Delmar", sub: "/ Bethlehem Central", href: "/delmar" },
      { label: "Niskayuna", sub: "/ Top Schools", href: "/niskayuna-real-estate" },
      { label: "Voorheesville", sub: "/ Rural Character", href: "/voorheesville-real-estate" },
      { label: "Clifton Park", sub: "/ Growing Suburb", href: "/clifton-park-real-estate" },
      { label: "Albany", sub: "/ Capital City", href: "/albany-real-estate" },
      { label: "Troy", sub: "/ Collar City", href: "/troy-real-estate" },
      { label: "Schenectady", sub: "/ Electric City", href: "/schenectady-real-estate" },
      { label: "Saratoga", sub: "/ Springs", href: "/saratoga-real-estate" },
      { label: "Amsterdam", sub: "/ Opportunity", href: "/amsterdam-real-estate" },
    ],
  },
  {
    category: "Properties",
    items: [
      { label: "Featured Properties", sub: "/ Current Listings", href: "/homes-for-sale" },
      { label: "Analyze an Address", sub: "/ Property Intel", href: "/deal-desk" },
      { label: "Request Intel Report", sub: "/ Full Analysis", href: "/deal-desk" },
      { label: "Multi-Unit Listings", sub: "/ Investment", href: "/albany-multi-unit" },
      { label: "Land for Sale", sub: "/ Development", href: "/albany-land" },
    ],
  },
  {
    category: "Buyers & Investors",
    items: [
      { label: "Zero & Low Down Payment", sub: "/ Programs", href: "/grants" },
      { label: "Mortgage Assistance", sub: "/ Grants", href: "/first-time-homebuyers" },
      { label: "First-Time Buyer Guide", sub: "/ Start Here", href: "/buyer-journey/first-time-buyer" },
      { label: "Neighborhood Guides", sub: "/ Explore", href: "/communities" },
      { label: "Market Trends", sub: "/ Data & Stats", href: "/markets" },
      { label: "School District Insights", sub: "/ Education", href: "/delmar" },
      { label: "Investor Hub", sub: "/ Cash Flow Tools", href: "/investor-tools" },
      { label: "VIP Access", sub: "/ Off-Market Deals", href: "/vip-buyer-access" },
    ],
  },
  {
    category: "Investor Guides",
    items: [
      { label: "NYC → Albany ROI", sub: "/ Playbook", href: "/investor/nyc-to-albany-roi" },
      { label: "Albany Multi-Unit", sub: "/ Market Report", href: "/investor/albany-multi-unit-market" },
      { label: "Troy Multi-Unit", sub: "/ Market Report", href: "/troy-multi-unit" },
      { label: "Schenectady Multi-Unit", sub: "/ Market Report", href: "/schenectady-multi-unit" },
      { label: "Saratoga Multi-Unit", sub: "/ Market Report", href: "/investor/saratoga-multi-unit-market" },
      { label: "Fulton & Montgomery", sub: "/ Market Report", href: "/investor/fulton-montgomery-multi-unit-market" },
      { label: "Analyze Multi-Family", sub: "/ How-To Guide", href: "/investor/analyze-multifamily" },
      { label: "1031 Exchange", sub: "/ NYC → Albany", href: "/investor/1031-nyc-to-albany" },
      { label: "Best Neighborhoods", sub: "/ Cash Flow", href: "/investor/best-neighborhoods-cash-flow-capital-district" },
    ],
  },
  {
    category: "About",
    items: [
      { label: "What We Do", sub: "/ Our Mission", href: "/about" },
      { label: "How It Works", sub: "/ Process", href: "/communities" },
      { label: "Reviews", sub: "/ Testimonials", href: "/reviews" },
      { label: "Contact", sub: "/ Get in Touch", href: "/deal-desk" },
      { label: "Blog", sub: "/ Articles", href: "/blog" },
    ],
  },
];

const footerLinks = [
  { label: "Start Live Chat", href: "#contact", highlight: true },
  { label: "VIP Access", href: "/vip-buyer-access" },
  { label: "Contact", href: "/dealdesk" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideModal, setGuideModal] = useState<{ open: boolean; guideType: string; redirectPath: string }>({ open: false, guideType: "", redirectPath: "" });
  
  const buyerHubRef = useRef<HTMLDivElement>(null);
  const investorHubRef = useRef<HTMLDivElement>(null);
  const townSectionRef = useRef<HTMLDivElement>(null);
  const startHereDeckRef = useRef<HTMLDivElement>(null);

  const scrollToBuyerHub = () => {
    buyerHubRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInvestorHub = () => {
    investorHubRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTownSection = () => {
    townSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToStartHereDeck = () => {
    startHereDeckRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          menuOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
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

      {/* CLEAN HERO - New simplified hero */}
      <CleanHero />

      {/* PRIMARY ENTRY SECTIONS - Three clear paths */}
      <HomepageEntrySections 
        onTownClick={scrollToTownSection}
        onBuyerClick={scrollToStartHereDeck}
      />

      {/* START WITH YOUR TOWN - Town Intelligence Entry */}
      <div ref={townSectionRef} id="town-intelligence" className="scroll-mt-24">
        <TownEntrySection />
      </div>

      {/* FEATURED LISTING BANNER */}
      <FeaturedListingBanner />

      {/* GUIDED DECK - 3-Step Guided Experience */}
      <GuidedDeck />

      {/* START HERE DECK - Guided Onboarding (Original) */}
      <div ref={startHereDeckRef} id="start-here" className="scroll-mt-24">
        <StartHereDeck 
          onBuyerPathSelected={scrollToBuyerHub}
          onInvestorPathSelected={scrollToInvestorHub}
        />
      </div>

      {/* START HERE (INVESTORS) CTA BLOCK */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Start Here (Investors)
          </h2>
          <p className="text-lg text-primary font-semibold mb-4">
            Your Path to 10–14% Cap Rates & 15–30% Cash-on-Cash in the Capital District
          </p>
          <p className="text-muted-foreground mb-6">
            If you're an investor — especially from NYC, NJ, CT, or Boston — this is where you begin.
          </p>
          
          <div className="bg-background/50 border border-border rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
            <p className="text-foreground font-semibold mb-4 text-center">You'll receive:</p>
            <ul className="space-y-3">
              {[
                "Off-market & pre-market multi-unit deals",
                "Verified rent, tax, and utility data",
                "True cap rate & cash flow analysis",
                "Full P&L and 5-year projections",
                "Direct access to a Capital District investment specialist"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6">
            No bots. No generic MLS links. Real numbers — not guesses.
          </p>
          
          <Link 
            to="/vip-buyer-access" 
            className="inline-block bg-primary text-primary-foreground px-10 py-4 rounded-full font-extrabold hover:scale-105 transition-transform text-lg"
          >
            ➡️ Start Here: VIP Investor Access
          </Link>
        </div>
      </section>

      {/* Due Diligence Engine */}
      <DueDiligenceEngine />

      {/* Start Your Journey Section */}
      <section className="px-[5%] py-12 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-center">
            Start Your Journey With the Right Information
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Clear guidance, real numbers, and practical tools — built for every type of buyer in the Capital District.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - Investors */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-3">Investors</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Build long-term wealth with real data. We help investors analyze cash flow, compare opportunities, understand risk, and identify properties that actually make sense — locally and long term.
              </p>
              <ul className="text-muted-foreground text-xs space-y-1 mb-6 flex-1">
                <li>• Deal analysis & cash flow</li>
                <li>• Neighborhood investment guides</li>
                <li>• Off-market opportunities</li>
              </ul>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "investor", redirectPath: "/buyer-journey/investor" })}
                className="inline-block bg-foreground text-background px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform text-center"
              >
                Start Investing Here
              </button>
            </div>

            {/* Card 2 - First-Time Home Buyers */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-3">First-Time Home Buyers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                Buying your first home doesn't have to be overwhelming. We simplify grants, financing, monthly costs, and the buying process so you know exactly what to expect before you make a move.
              </p>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "first-time-buyer", redirectPath: "/buyer-journey/first-time-buyer" })}
                className="inline-block bg-foreground text-background px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform text-center"
              >
                First-Time Buyer Guide
              </button>
            </div>

            {/* Card 3 - Land Buyers */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-3">Land Buyers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                Land can be a smart investment — or a costly mistake. We help you understand zoning, utilities, build costs, resale value, and long-term potential before you buy.
              </p>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "land-buyer", redirectPath: "/buyer-journey/land-buyer" })}
                className="inline-block bg-foreground text-background px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform text-center"
              >
                Land Buyer Insights
              </button>
            </div>

            {/* Card 4 - Financing & Mortgages */}
            <div className="bg-background border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold text-foreground mb-3">Financing & Mortgages</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                Financing decisions impact everything. We break down mortgage options, assistance programs, investor vs. owner-occupied loans, and how financing affects long-term costs and returns.
              </p>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "financing", redirectPath: "/buyer-journey/financing" })}
                className="inline-block bg-foreground text-background px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform text-center"
              >
                Explore Financing Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOME BUYER HUB */}
      <div ref={buyerHubRef} id="buyer-hub" className="scroll-mt-24">
        <HomeBuyerHub />
      </div>

      {/* INVESTOR HUB */}
      <div ref={investorHubRef} id="investor-hub" className="scroll-mt-24">
        <InvestorHub />
      </div>

      {/* MARKET MAP SECTION */}
      <div id="market-maps" className="scroll-mt-24">
        <MarketMapSection />
      </div>

      {/* Multi-Unit Search Section */}
      <MultiUnitSearchSection />

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

      {/* Quick Search Block - IDX Links */}
      <QuickSearchBlock />

      {/* Investor Guides Section */}
      <section className="px-[5%] py-12 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-6">
            Investor Guides
          </h3>
          <div className="flex flex-col gap-3">
            <Link 
              to="/investor/nyc-to-albany-roi" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              NYC → Albany ROI Playbook →
            </Link>
            <Link 
              to="/investor/albany-multi-unit-market" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Albany Multi-Unit Market Report →
            </Link>
            <Link 
              to="/troy-multi-unit" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Troy Multi-Unit Market Report →
            </Link>
            <Link 
              to="/schenectady-multi-unit" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Schenectady Multi-Unit Market Report →
            </Link>
            <Link 
              to="/investor/saratoga-multi-unit-market" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Saratoga County Multi-Unit Report →
            </Link>
            <Link 
              to="/investor/fulton-montgomery-multi-unit-market" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Fulton & Montgomery Multi-Unit Report →
            </Link>
            <Link 
              to="/investor/analyze-multifamily" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              How to Analyze a Multi-Family Property →
            </Link>
            <Link 
              to="/investor/1031-nyc-to-albany" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              1031 Exchange Playbook (NYC → Albany) →
            </Link>
            <Link 
              to="/investor/best-neighborhoods-cash-flow-capital-district" 
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Best Neighborhoods for Cash Flow in the Capital District →
            </Link>
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
            alt="Professional Real Estate Investment Analysis Spreadsheet"
            className="rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] max-w-full h-auto"
          />
        </div>
      </section>

      {/* Strategy Session */}
      <StrategySessionSection />

      {/* Deal of the Month */}
      <DealOfMonthSection />

      {/* Alpha List */}
      <AlphaListSection />

      {/* Guide Lead Modal */}
      <GuideLeadModal
        open={guideModal.open}
        onOpenChange={(open) => setGuideModal({ ...guideModal, open })}
        guideType={guideModal.guideType}
        redirectPath={guideModal.redirectPath}
      />

      {/* Footer */}
      <footer className="px-[5%] py-12 text-center text-muted-foreground text-sm border-t border-border">
        <p>© 2025 Capital District Nest. Licensed Real Estate Broker.</p>
        <p className="mt-2">Providing VIP Service, Technology, and Professional Guidance.</p>
      </footer>
    </div>
  );
};

export default Index;