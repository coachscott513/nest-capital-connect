import { useState } from "react";
import { Link } from "react-router-dom";
import cdnLogo from "@/assets/cdn-logo.png";

const menuSections = [
  {
    category: "Explore",
    items: [
      { label: "Home", sub: "/ Main", href: "/" },
      { label: "Towns", sub: "/ Local Markets", href: "/communities" },
      { label: "Rentals", sub: "/ Local Housing", href: "/rentals" },
      { label: "Intelligence Reports", sub: "/ Property Analysis", href: "/reports/sample-property-intelligence" },
      { label: "About", sub: "/ Our Story", href: "/blog" },
    ],
  },
  {
    category: "Learn",
    items: [
      { label: "First-Time Buyers", sub: "/ Programs & Guidance", href: "/first-time-homebuyers" },
      { label: "Grants", sub: "/ Free Funding", href: "/grants" },
      { label: "Market Insights", sub: "/ Analysis", href: "/delmar-market-insights" },
    ],
  },
  {
    category: "Invest",
    items: [
      { label: "Investment Properties", sub: "/ Opportunities", href: "/investment-landing" },
      { label: "Multi-Unit", sub: "/ Commercial", href: "/albany-multi-unit" },
      { label: "Land", sub: "/ Development", href: "/albany-land" },
    ],
  },
];

const footerLinks = [
  { label: "Start Live Chat", href: "/first-time-homebuyers", highlight: true },
  { label: "Login", href: "/auth" },
  { label: "Support", href: "/contact" },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
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
        <Link to="/" className="flex items-center">
          <img src={cdnLogo} alt="Capital District Nest" className="h-12 md:h-14 w-auto" />
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

      {/* Main Content */}
      {children}


      {/* Footer */}
      <footer className="px-[5%] py-12 text-center text-muted-foreground text-sm border-t border-border">
        <p>© 2025 Capital District Nest. Licensed Real Estate Broker.</p>
        <p className="mt-2">Providing VIP Service, Technology, and Professional Guidance.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
