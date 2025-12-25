import { useState } from "react";
import { Link } from "react-router-dom";

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
      { label: "VIP Access", sub: "/ Legends Only", href: "/vip-buyer-access" },
    ],
  },
  {
    category: "Network",
    items: [
      { label: "Insights", sub: "/ Market Intelligence", href: "/insights" },
      { label: "Community", sub: "/ Social", href: "/blog" },
      { label: "Learn", sub: "/ Education", href: "/communities" },
    ],
  },
  {
    category: "Towns",
    items: [
      { label: "Delmar", sub: "/ Bethlehem Central", href: "/delmar" },
      { label: "Schenectady County", sub: "/ Intelligence Hub", href: "/schenectady-county-real-estate" },
      { label: "Albany", sub: "/ Capital City", href: "/albany-real-estate" },
      { label: "Troy", sub: "/ Collar City", href: "/troy-real-estate" },
      { label: "Saratoga", sub: "/ Springs", href: "/saratoga-real-estate" },
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
];

const footerLinks = [
  { label: "Start Live Chat", href: "/dealdesk", highlight: true },
  { label: "Login", href: "/vip-buyer-access" },
  { label: "Support", href: "/dealdesk" },
];

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
    </>
  );
};

export default MainHeader;
