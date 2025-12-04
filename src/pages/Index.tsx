import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import CommandCenter from "@/components/CommandCenter";

const menuSections = [
  {
    category: "Assets",
    items: [
      { label: "Invest", sub: "/ Standard Listings", href: "/investment-landing" },
      { label: "Markets", sub: "/ Albany, Troy, MA", href: "/markets" },
      { label: "Rentals", sub: "/ Retirement Income", href: "/rentals" },
    ],
  },
  {
    category: "Capital",
    items: [
      { label: "Financing", sub: "/ Banking & Loans", href: "/first-time-homebuyers" },
      { label: "Grants", sub: "/ Free Funding", href: "/grants" },
      { label: "Calculators", sub: "/ ROI Tools", href: "/investor-tools" },
    ],
  },
  {
    category: "Network",
    items: [
      { label: "VIP List", sub: "/ Off-Market", href: "/auth" },
      { label: "Stewardship", sub: "/ Asset Care", href: "/first-time-homebuyers" },
      { label: "Support", sub: "/ Live Agent", href: "/first-time-homebuyers" },
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
        title="Capital District Nest | Team at RE/MAX"
        description="Wall Street Tools. Main Street Soul. The Capital District's premier tech-enabled investment team combining institutional-grade market data with white-glove local service."
        keywords="real estate Albany NY, Capital District homes, investment property, Troy homes for sale, licensed real estate agent"
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

      {/* Mission Control */}
      <section className="text-center px-[5%] pt-20 pb-10 max-w-[900px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-medium leading-[1.1] tracking-tight mb-5">
          Wall Street Tools.<br />
          <strong className="text-primary font-medium">Main Street Soul.</strong>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-8 max-w-[700px] mx-auto">
          The Capital District's premier tech-enabled investment team. 
          We are <strong className="text-foreground">The Capital District Nest Team at RE/MAX</strong>—a specialized group of Economists and Business Strategists.
        </p>

        <div className="flex justify-center gap-3 flex-wrap mb-12">
          {["Powered by RE/MAX", "Econ Degrees", "Fiduciary"].map((badge) => (
            <div key={badge} className="flex items-center gap-2 bg-border/50 text-muted-foreground px-4 py-2 rounded-full text-sm font-semibold border border-border">
              {badge}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link to="/markets" className="bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform">
            Chat with the Team
          </Link>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/60">
          *Capital District Nest LLC is a specialized team affiliated with RE/MAX. Each office independently owned and operated.
        </p>
      </section>

      {/* Choose Your Path - Fork in the Road */}
      <section className="px-[5%] py-20 border-t border-border">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Choose your <span className="text-primary">Path.</span>
          </h2>
          <p className="text-muted-foreground text-lg">Select your goal. Get the specific tools you need.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          <Link 
            to="/grants" 
            className="bg-card p-8 rounded-xl border border-border hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group"
          >
            <div className="text-3xl mb-4">💸</div>
            <h3 className="text-xl font-bold mb-3">Free Funding</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Send me the <strong className="text-foreground">2025 Grant Application PDF</strong> and eligible neighborhood list.
            </p>
            <div className="text-primary font-bold group-hover:translate-x-1 transition-transform">Get Application →</div>
          </Link>

          <Link 
            to="/auth" 
            className="bg-card p-8 rounded-xl border border-border hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group"
          >
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-bold mb-3">VIP Off-Market</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              I have capital ready. I want "Coming Soon" inventory before Zillow.
            </p>
            <div className="text-primary font-bold group-hover:translate-x-1 transition-transform">Join VIP List →</div>
          </Link>

          <Link 
            to="/investor-tools" 
            className="bg-card p-8 rounded-xl border border-border hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group"
          >
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Deal Analysis</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              I found a property. I need a <strong className="text-foreground">Wall Street Pro-Forma</strong> to check the math.
            </p>
            <div className="text-primary font-bold group-hover:translate-x-1 transition-transform">Start Analysis →</div>
          </Link>
        </div>
      </section>

      {/* Portfolio Managers - Operational Excellence */}
      <section className="px-[5%] py-20 border-t border-border">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          <div className="flex-1">
            <div className="text-primary font-bold text-sm mb-3 uppercase tracking-wide">Operational Excellence</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5">
              Not Agents.<br />Portfolio Managers.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              Most offices hire salespeople. We hire Strategists. 
              We don't just "show homes"—we identify assets that outperform the market.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="bg-border/50 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0">📈</div>
                <div>
                  <div className="text-foreground font-bold">Hidden Value ID</div>
                  <div className="text-muted-foreground text-sm">Finding underpriced assets before the market sees them.</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-border/50 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0">💵</div>
                <div>
                  <div className="text-foreground font-bold">Cash Flow Engineering</div>
                  <div className="text-muted-foreground text-sm">Optimizing rent rolls to maximize your Cap Rate.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden border border-border h-[300px] relative group">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Analytics dashboard" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Asset Stewardship Section */}
      <section className="px-[5%] py-20 border-t border-border bg-card/30">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 max-w-6xl mx-auto">
          <div className="flex-1">
            <div className="text-primary font-bold text-sm mb-3 uppercase tracking-wide">Client Exclusive Perk</div>
            <h2 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight mb-5">
              We Don't Just Sell.<br />We Steward.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-6">
              Most agents disappear at closing. We stay.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              <strong className="text-foreground">The Nest Stewardship Program:</strong> For our VIP clients (including our Massachusetts investors), we handle the headaches for free.
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li>✅ We coordinate repairs & pest inspections.</li>
              <li>✅ We triage tenant calls & complaints.</li>
              <li>✅ We lease-up vacancies (1 month rent fee).</li>
            </ul>
            <p className="text-sm text-muted-foreground/70">
              *We act as your boots-on-the-ground partner, not a generic property management co.
            </p>
          </div>
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden border border-border h-[300px] relative group">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Keys handover" 
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Buyer Requirements Ticker */}
      <section className="px-[5%] py-20 border-t border-border">
        <div className="text-center max-w-[800px] mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            We have the <span className="text-primary">Demand.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We manage a private VIP list of cash-ready investors from NYC and Boston.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden max-w-[800px] mx-auto">
          <div className="bg-muted/50 px-6 py-4 font-bold border-b border-border flex justify-between items-center">
            <span>🎯 LIVE BUYER REQUIREMENTS</span>
            <span className="text-primary text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              ACTIVE NOW
            </span>
          </div>
          <div className="divide-y divide-border">
            <div className="flex justify-between items-center px-6 py-4">
              <div>
                <div className="font-bold">#NY-402</div>
                <div className="text-sm text-muted-foreground">Troy / Center Sq</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">$450k Cash</div>
              </div>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <div>
                <div className="font-bold">#MA-118</div>
                <div className="text-sm text-muted-foreground">Schenectady Multi</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">$225k Rehab</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/sell-investment-property" 
            className="bg-foreground text-background px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform inline-block"
          >
            Get Cash Offer Analysis
          </Link>
        </div>
      </section>

      {/* Capital District Coverage */}
      <section className="px-[5%] py-20 border-t border-border text-center">
        <h2 className="text-xl text-muted-foreground font-semibold mb-8">
          We cover the entire Capital District
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {["Albany", "Niskayuna", "Troy", "Schenectady", "Saratoga", "Latham"].map((city) => (
            <span 
              key={city} 
              className="border border-border px-5 py-2.5 rounded-full text-muted-foreground"
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Command Center FAB */}
      <CommandCenter />

      {/* Footer */}
      <footer className="px-[5%] py-12 text-center text-muted-foreground text-sm border-t border-border">
        <p>© 2025 Capital District Nest Team at RE/MAX. All rights reserved.</p>
        <p className="mt-2">Licensed in New York & Massachusetts.</p>
      </footer>
    </div>
  );
};

export default Index;
