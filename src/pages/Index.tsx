import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const navLinks = [
  { label: "Grants", href: "/grants" },
  { label: "Multi-Family", href: "/albany-multi-unit" },
  { label: "Commercial", href: "/albany-investment-properties" },
  { label: "Learn", href: "/investor-tools" },
];

const portfolioAssets = [
  {
    ticker: "TROY-DUP",
    description: "2 Units • Troy, NY",
    price: "$185k",
    bars: [40, 60, 50, 80, 95],
  },
  {
    ticker: "ALB-FIXR",
    description: "Project • Albany",
    price: "$65k",
    bars: [30, 40, 70, 60, 85],
  },
  {
    ticker: "NISK-LND",
    description: "3.5 Acres • Nisky",
    price: "$92k",
    bars: [20, 25, 30, 35, 40],
  },
];

const featureCards = [
  {
    icon: "💰",
    title: "Fix & Flip Loans",
    description: "Get up to 100% of rehab costs covered. Interest-only payments keep your cash flow positive.",
  },
  {
    icon: "🏗️",
    title: "Project Management",
    description: "Don't want to swing the hammer? Access our vetted contractor network directly in the app.",
  },
  {
    icon: "📊",
    title: "Live Market Data",
    description: "See real-time rental estimates and cap rates for every neighborhood in the Capital District.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Capital District Nest | Real Estate Investment Platform"
        description="Commission-free access to off-market deals in the Capital District. Multi-unit properties, fix & flip opportunities, and $30k grants available."
        keywords="investment properties Albany NY, multi-unit buildings Troy NY, fix and flip properties, real estate investment Capital District"
        canonical="https://capitaldistrictnest.com"
        ogImage="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png"
      />

      {/* Navigation */}
      <nav className="sticky top-0 z-[1000] flex items-center justify-between px-10 py-5 bg-background border-b border-transparent hover:border-border transition-colors">
        <Link to="/" className="text-foreground font-extrabold text-xl tracking-tight">
          CDN
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-foreground font-semibold text-sm hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          to="/first-time-homebuyers"
          className="bg-foreground text-background px-7 py-3 rounded-3xl font-extrabold text-sm hover:scale-105 transition-transform"
        >
          Start Investing
        </Link>
      </nav>

      {/* Hero Split Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] px-[8%] py-16 lg:py-0">
        {/* Hero Text */}
        <div className="flex-1 max-w-[600px] lg:pr-12 z-10 mb-12 lg:mb-0">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight mb-6">
            Investing for the<br />
            <span className="text-primary">99%</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10">
            Commission-free access to off-market deals in the Capital District.
            Get your first $30k grant today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/grants"
              className="bg-primary text-primary-foreground px-7 py-3 rounded-3xl font-extrabold text-sm hover:scale-105 transition-transform"
            >
              Get Your Free Stock
            </Link>
            <Link
              to="/investor-tools"
              className="bg-transparent border border-foreground text-foreground px-7 py-3 rounded-3xl font-extrabold text-sm hover:scale-105 transition-transform"
            >
              View Demo
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground/50">
            *Capital District Nest is a licensed real estate broker. Investments involve risk.
          </p>
        </div>

        {/* Phone Mockup */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-[340px] md:w-[380px] h-[680px] md:h-[750px] bg-card rounded-[40px] border-8 border-border relative overflow-hidden shadow-[0_0_60px_rgba(0,200,5,0.1)]">
            <div className="p-5">
              <div className="text-xl font-extrabold mb-1">Portfolio Value</div>
              <div className="text-3xl md:text-4xl font-extrabold text-primary border-b border-border pb-5 mb-5">
                $142,392.55{" "}
                <span className="text-base text-primary">+12.4%</span>
              </div>

              <div className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">
                Your Properties
              </div>

              {/* Asset Rows */}
              {portfolioAssets.map((asset) => (
                <div
                  key={asset.ticker}
                  className="flex items-center justify-between py-4 border-b border-border cursor-pointer hover:bg-muted hover:px-2.5 hover:rounded-lg transition-all"
                >
                  <div className="flex flex-col">
                    <span className="font-extrabold text-sm">{asset.ticker}</span>
                    <span className="text-xs text-muted-foreground">{asset.description}</span>
                  </div>
                  {/* Sparkline */}
                  <div className="flex items-end gap-0.5 w-24 h-8">
                    {asset.bars.map((height, i) => (
                      <div
                        key={i}
                        className="bg-primary w-[20%] rounded-sm"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="font-bold text-sm">{asset.price}</div>
                </div>
              ))}

              {/* Grant Notification */}
              <div className="mt-8 bg-muted p-4 rounded-lg border-l-[3px] border-primary">
                <div className="text-xs font-bold mb-1">NEW GRANT FOUND</div>
                <div className="text-xs text-muted-foreground">
                  You qualify for the Albany Rehab Program. Apply by Dec 31.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Light) */}
      <section className="px-[8%] py-20 bg-foreground text-background">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-10">
          Fractional investing,<br />full ownership.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="bg-[#f5f5f5] text-background p-10 rounded border border-transparent hover:border-primary transition-colors"
            >
              <div className="text-3xl mb-5">{card.icon}</div>
              <div className="text-xl font-bold mb-2.5">{card.title}</div>
              <div className="text-muted-foreground leading-relaxed">{card.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <Link
        to="/contact"
        className="fixed bottom-8 right-8 bg-primary text-primary-foreground px-8 py-4 rounded-full font-extrabold text-lg shadow-[0_10px_20px_rgba(0,200,5,0.3)] cursor-pointer z-[2000] flex items-center gap-2.5 hover:-translate-y-1 hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
        Live Help
      </Link>
    </div>
  );
};

export default Index;
