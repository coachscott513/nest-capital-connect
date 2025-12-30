import { useState, useRef } from "react";
import { TrendingUp, MapPin, BarChart3, Home, Users, ArrowRight } from "lucide-react";
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
      { label: "Analyze an Address", sub: "/ Property Intel", href: "/dealdesk" },
      { label: "Request Intel Report", sub: "/ Full Analysis", href: "/dealdesk" },
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
      { label: "Contact", sub: "/ Get in Touch", href: "/dealdesk" },
      { label: "Blog", sub: "/ Articles", href: "/blog" },
    ],
  },
];

const footerLinks = [
  { label: "Start Live Chat", href: "#contact", highlight: true },
  { label: "VIP Access", href: "/vip-buyer-access" },
  { label: "Contact", href: "/dealdesk" },
];

const townHubs = [
  { name: "Delmar", href: "/delmar", description: "Bethlehem Central Schools" },
  { name: "Voorheesville", href: "/voorheesville-real-estate", description: "Rural character, top schools" },
  { name: "Clifton Park", href: "/clifton-park-real-estate", description: "Growing suburb, family-friendly" },
  { name: "Niskayuna", href: "/niskayuna-real-estate", description: "Top-rated schools" },
  { name: "Albany", href: "/albany-real-estate", description: "Capital city, diverse neighborhoods" },
  { name: "Troy", href: "/troy-real-estate", description: "Historic charm, RPI proximity" },
  { name: "Schenectady", href: "/schenectady-real-estate", description: "Revitalizing downtown" },
  { name: "Saratoga", href: "/saratoga-real-estate", description: "Racing, culture, upscale living" },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guideModal, setGuideModal] = useState<{ open: boolean; guideType: string; redirectPath: string }>({ open: false, guideType: "", redirectPath: "" });
  
  const buyerHubRef = useRef<HTMLDivElement>(null);
  const investorHubRef = useRef<HTMLDivElement>(null);
  const townSectionRef = useRef<HTMLDivElement>(null);
  const investorSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBuyerHub = () => {
    buyerHubRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInvestorHub = () => {
    investorHubRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTownSection = () => {
    townSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInvestorSection = () => {
    investorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                <div className="text-xs uppercase text-muted-foreground/50 font-extrabold tracking-widest mt-6 mb-3 first:mt-0">
                  {section.category}
                </div>
                
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

      {/* CLEAN HERO - Exactly as is */}
      <CleanHero />

      {/* ========================================== */}
      {/* SECTION 1: TOWN INTELLIGENCE HUBS (PRIMARY) */}
      {/* ========================================== */}
      <section ref={townSectionRef} id="town-intelligence" className="scroll-mt-24 px-[5%] py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Town Intelligence Hubs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Local market insight, updated regularly — built town by town.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {townHubs.map((town) => (
              <Link
                key={town.name}
                to={town.href}
                className="group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {town.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {town.description}
                </p>
                <div className="mt-3 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  View Intel <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/communities" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              View all Capital District towns <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 2: PROPERTY INTELLIGENCE */}
      {/* ========================================== */}
      <section className="px-[5%] py-16 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Home className="w-4 h-4" />
            <span>Property Analysis</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Get Intelligence on Any Address
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Submit an address. Receive a detailed property intelligence report — pricing, comps, risks, and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/dealdesk" 
              className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Request Property Intel
            </Link>
            <Link 
              to="/intel/1999-ridge-road-queensbury-ny" 
              className="inline-block border border-border text-foreground px-8 py-4 rounded-full font-bold hover:bg-card transition-colors"
            >
              View Sample Report
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 3: BUYER PATHS (Neutral) */}
      {/* ========================================== */}
      <section className="px-[5%] py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Buyer Resources
            </h2>
            <p className="text-muted-foreground">
              Clear guidance for every type of buyer in the Capital District.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First-Time Buyers */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-lg font-bold text-foreground mb-3">First-Time Buyers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                Grants, financing options, and step-by-step guidance for your first home purchase.
              </p>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "first-time-buyer", redirectPath: "/buyer-journey/first-time-buyer" })}
                className="inline-block bg-foreground text-background px-5 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform text-center"
              >
                Start Here
              </button>
            </div>

            {/* Land Buyers */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-lg font-bold text-foreground mb-3">Land Buyers</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                Zoning, utilities, build costs, and long-term potential — before you commit.
              </p>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "land-buyer", redirectPath: "/buyer-journey/land-buyer" })}
                className="inline-block bg-foreground text-background px-5 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform text-center"
              >
                Land Guide
              </button>
            </div>

            {/* Financing */}
            <div className="bg-card border border-border rounded-xl p-6 flex flex-col">
              <h3 className="text-lg font-bold text-foreground mb-3">Financing & Mortgages</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                Mortgage options, assistance programs, and how financing affects long-term costs.
              </p>
              <button 
                onClick={() => setGuideModal({ open: true, guideType: "financing", redirectPath: "/buyer-journey/financing" })}
                className="inline-block bg-foreground text-background px-5 py-3 rounded-full font-semibold text-sm hover:scale-105 transition-transform text-center"
              >
                Financing Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 4: WHY THIS PLATFORM EXISTS */}
      {/* ========================================== */}
      <section className="bg-muted/30 py-16 px-[5%] border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why This Platform Exists
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built on trust, accuracy, and local intelligence — not sales tactics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Review 1 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                "His communication skills are outstanding... He also referred us to an excellent mortgage banker and closing attorney."
              </p>
              <div className="text-sm">
                <span className="font-semibold text-foreground">Karen Lawson</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                "We put in an offer. Offer got accepted THAT night. Then we closed in 22 days!"
              </p>
              <div className="text-sm">
                <span className="font-semibold text-foreground">Scout Isabella Hoff</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">
                "By the end, Scott wasn't just my real estate agent — he became a friend."
              </p>
              <div className="text-sm">
                <span className="font-semibold text-foreground">jstickling0</span>
              </div>
            </div>
          </div>

          {/* Credibility Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Properties Analyzed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">RE/MAX</div>
              <div className="text-sm text-muted-foreground">Licensed Broker</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">Local</div>
              <div className="text-sm text-muted-foreground">Capital District Focus</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/reviews" className="text-primary font-semibold hover:underline text-sm">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION 5: INVESTOR INTELLIGENCE (OPTIONAL) */}
      {/* ========================================== */}
      <section ref={investorSectionRef} id="investor-intelligence" className="scroll-mt-24 px-[5%] py-16 md:py-20 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <BarChart3 className="w-4 h-4" />
              <span>Optional</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Investor Intelligence
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              For deeper cash-flow, multi-unit, and return analysis.
            </p>
          </div>

          {/* Investor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Multi-Unit Search */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Multi-Unit Properties</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Search 2-4 unit properties across Albany, Troy, and Schenectady with verified rental data.
              </p>
              <Link 
                to="/albany-multi-unit" 
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                Search Multi-Units <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Cash Flow Analysis */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Cash Flow Analysis</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Full P&L projections, cap rate calculations, and 5-year return modeling.
              </p>
              <Link 
                to="/investor-tools" 
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                View Investor Tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Market Reports */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Market Reports</h3>
              <p className="text-muted-foreground text-sm mb-4">
                In-depth analysis of multi-unit markets in Albany, Troy, Schenectady, and Saratoga.
              </p>
              <Link 
                to="/investor/albany-multi-unit-market" 
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                View Reports <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* VIP Access */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">VIP Investor Access</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Off-market deals, pre-market opportunities, and direct access to a local specialist.
              </p>
              <Link 
                to="/vip-buyer-access" 
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                Get VIP Access <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Investor Guides Collapsed */}
          <details className="bg-card border border-border rounded-xl p-6">
            <summary className="cursor-pointer font-bold text-foreground flex items-center justify-between">
              <span>Investor Guides & Playbooks</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link to="/investor/nyc-to-albany-roi" className="text-muted-foreground hover:text-primary text-sm">
                NYC → Albany ROI Playbook →
              </Link>
              <Link to="/investor/analyze-multifamily" className="text-muted-foreground hover:text-primary text-sm">
                How to Analyze Multi-Family →
              </Link>
              <Link to="/investor/1031-nyc-to-albany" className="text-muted-foreground hover:text-primary text-sm">
                1031 Exchange Playbook →
              </Link>
              <Link to="/investor/best-neighborhoods-cash-flow-capital-district" className="text-muted-foreground hover:text-primary text-sm">
                Best Neighborhoods for Cash Flow →
              </Link>
              <Link to="/troy-multi-unit" className="text-muted-foreground hover:text-primary text-sm">
                Troy Multi-Unit Report →
              </Link>
              <Link to="/schenectady-multi-unit" className="text-muted-foreground hover:text-primary text-sm">
                Schenectady Multi-Unit Report →
              </Link>
              <Link to="/investor/saratoga-multi-unit-market" className="text-muted-foreground hover:text-primary text-sm">
                Saratoga Multi-Unit Report →
              </Link>
              <Link to="/investor/fulton-montgomery-multi-unit-market" className="text-muted-foreground hover:text-primary text-sm">
                Fulton & Montgomery Report →
              </Link>
            </div>
          </details>
        </div>
      </section>

      {/* Coverage Area Grid - SEO Linked */}
      <CoverageAreaGrid />

      {/* ========================================== */}
      {/* SECTION 6: FINAL CTA (Soft) */}
      {/* ========================================== */}
      <section className="px-[5%] py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start with your town.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Go deeper only if you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToTownSection}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
            >
              <MapPin className="w-4 h-4" />
              Explore Towns
            </button>
            <button
              onClick={scrollToInvestorSection}
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-bold hover:bg-card transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              Investor Tools
            </button>
          </div>
        </div>
      </section>

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
        <p className="mt-2">Local market intelligence for the Capital District.</p>
      </footer>
    </div>
  );
};

export default Index;
