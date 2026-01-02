import { useState } from "react";
import { Link } from "react-router-dom";

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
      { label: "Delmar", sub: "/ Bethlehem Central", href: "/towns/delmar" },
      { label: "Niskayuna", sub: "/ Top Schools", href: "/towns/niskayuna" },
      { label: "Voorheesville", sub: "/ Rural Character", href: "/towns/voorheesville" },
      { label: "Clifton Park", sub: "/ Shenendehowa", href: "/towns/clifton-park" },
      { label: "Saratoga Springs", sub: "/ Racing & Culture", href: "/towns/saratoga-springs" },
      { label: "Troy", sub: "/ Collar City", href: "/towns/troy" },
      { label: "Schenectady", sub: "/ Electric City", href: "/towns/schenectady" },
      { label: "Queensbury", sub: "/ Lake George Area", href: "/towns/queensbury" },
      { label: "Amsterdam", sub: "/ Opportunity Zone", href: "/towns/amsterdam" },
    ],
  },
  {
    category: "Properties",
    items: [
      { label: "Featured Properties", sub: "/ Current Listings", href: "/homes-for-sale" },
      { label: "Rentals", sub: "/ Capital District", href: "/rentals" },
      { label: "Sample Property Intelligence", sub: "/ See What's Included", href: "/reports/sample-property-intelligence" },
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
      { label: "School District Insights", sub: "/ Education", href: "/towns/delmar" },
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
  { label: "Start Live Chat", href: "/dealdesk", highlight: true },
  { label: "VIP Access", href: "/vip-buyer-access" },
  { label: "Contact", href: "/dealdesk" },
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
        <Link 
          to="/" 
          className="group flex flex-col items-start cursor-pointer transition-opacity hover:opacity-90"
        >
          <span className="font-extrabold text-lg md:text-xl tracking-tight uppercase flex items-center gap-1">
            Capital District <span className="text-primary">Nest</span>
          </span>
          <span className="text-muted-foreground/60 text-[10px] uppercase tracking-widest font-medium">
            Home
          </span>
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