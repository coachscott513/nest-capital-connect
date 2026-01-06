import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone, Search, X, Menu } from "lucide-react";
import cdnLogo from "@/assets/cdn-logo.png";

// Town data for alphabetical listing
const towns = [
  { name: "Albany", slug: "albany" },
  { name: "Amsterdam", slug: "amsterdam" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Delmar", slug: "delmar" },
  { name: "Guilderland", slug: "guilderland" },
  { name: "Mechanicville", slug: "mechanicville" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Queensbury", slug: "queensbury" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Troy", slug: "troy" },
  { name: "Voorheesville", slug: "voorheesville" },
].sort((a, b) => a.name.localeCompare(b.name));

// Navigation structure
const navItems = [
  {
    label: "Towns",
    dropdown: "towns",
  },
  {
    label: "Buy",
    dropdown: "buy",
  },
  {
    label: "Rent",
    dropdown: "rent",
  },
  {
    label: "Invest",
    dropdown: "invest",
  },
  {
    label: "Intelligence",
    dropdown: "intelligence",
  },
  {
    label: "Contact",
    dropdown: "contact",
  },
];

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  align?: "left" | "right";
}

const Dropdown = ({ isOpen, onClose, children, align = "left" }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 bg-card border border-border rounded-lg shadow-xl p-4 min-w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      {children}
    </div>
  );
};

const CleanHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [townSearch, setTownSearch] = useState("");

  const filteredTowns = towns.filter((town) =>
    town.name.toLowerCase().includes(townSearch.toLowerCase())
  );

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setTownSearch("");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setTownSearch("");
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-[2000] bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={closeDropdowns}>
              <img src={cdnLogo} alt="Capital District Nest" className="h-10 md:h-12 w-auto" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium hidden sm:block group-hover:text-foreground transition-colors">
                Home
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => toggleDropdown(item.dropdown)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeDropdown === item.dropdown
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.dropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Towns Dropdown */}
                  {item.dropdown === "towns" && (
                    <Dropdown isOpen={activeDropdown === "towns"} onClose={closeDropdowns}>
                      <div className="space-y-3">
                        <Link
                          to="/communities"
                          onClick={closeDropdowns}
                          className="block text-sm font-semibold text-primary hover:underline"
                        >
                          Browse All Towns →
                        </Link>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search towns..."
                            value={townSearch}
                            onChange={(e) => setTownSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                          {filteredTowns.map((town) => (
                            <Link
                              key={town.slug}
                              to={`/towns/${town.slug}`}
                              onClick={closeDropdowns}
                              className="px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                            >
                              {town.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Dropdown>
                  )}

                  {/* Buy Dropdown */}
                  {item.dropdown === "buy" && (
                    <Dropdown isOpen={activeDropdown === "buy"} onClose={closeDropdowns}>
                      <div className="space-y-1">
                        <Link
                          to="/homes-for-sale"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Search Homes
                        </Link>
                        <Link
                          to="/first-time-homebuyers"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          First-Time Buyer Programs
                        </Link>
                        <Link
                          to="/grants"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Grants & Down Payment Help
                        </Link>
                      </div>
                    </Dropdown>
                  )}

                  {/* Rent Dropdown */}
                  {item.dropdown === "rent" && (
                    <Dropdown isOpen={activeDropdown === "rent"} onClose={closeDropdowns}>
                      <div className="space-y-1">
                        <Link
                          to="/rentals"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Rentals Hub
                        </Link>
                        <div className="border-t border-border my-2" />
                        <Link
                          to="/rentals/albany"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Albany Rentals
                        </Link>
                        <Link
                          to="/rentals/schenectady"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Schenectady Rentals
                        </Link>
                        <Link
                          to="/rentals/troy"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Troy Rentals
                        </Link>
                        <Link
                          to="/rentals/saratoga"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Saratoga Rentals
                        </Link>
                      </div>
                    </Dropdown>
                  )}

                  {/* Invest Dropdown */}
                  {item.dropdown === "invest" && (
                    <Dropdown isOpen={activeDropdown === "invest"} onClose={closeDropdowns}>
                      <div className="space-y-1">
                        <Link
                          to="/albany-multi-unit"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Multi-Family Search
                        </Link>
                        <Link
                          to="/investor-tools"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Investor Tools & Calculators
                        </Link>
                        <div className="border-t border-border my-2" />
                        <p className="px-3 py-1 text-xs text-muted-foreground uppercase tracking-wide font-semibold">
                          Market Reports
                        </p>
                        <Link
                          to="/investor/albany-multi-unit-market"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Albany Multi-Unit
                        </Link>
                        <Link
                          to="/troy-multi-unit"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Troy Multi-Unit
                        </Link>
                        <Link
                          to="/schenectady-multi-unit"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Schenectady Multi-Unit
                        </Link>
                        <Link
                          to="/investor/saratoga-multi-unit-market"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Saratoga Multi-Unit
                        </Link>
                      </div>
                    </Dropdown>
                  )}

                  {/* Intelligence Dropdown */}
                  {item.dropdown === "intelligence" && (
                    <Dropdown isOpen={activeDropdown === "intelligence"} onClose={closeDropdowns}>
                      <div className="space-y-1">
                        <Link
                          to="/reports/sample-property-intelligence"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                        >
                          View Sample Report →
                        </Link>
                        <Link
                          to="/dealdesk"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Request a Report
                        </Link>
                        <div className="border-t border-border my-2" />
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">How It Works</p>
                          <ol className="list-decimal list-inside space-y-1 text-xs">
                            <li>Submit any property address</li>
                            <li>We pull tax, comp, and risk data</li>
                            <li>Get your full report in 24 hours</li>
                          </ol>
                        </div>
                      </div>
                    </Dropdown>
                  )}

                  {/* Contact Dropdown */}
                  {item.dropdown === "contact" && (
                    <Dropdown isOpen={activeDropdown === "contact"} onClose={closeDropdowns} align="right">
                      <div className="space-y-3">
                        <a
                          href="tel:+15186762347"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          (518) 676-2347
                        </a>
                        <a
                          href="mailto:scott@capitaldistrictnest.com"
                          className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          scott@capitaldistrictnest.com
                        </a>
                        <div className="border-t border-border my-2" />
                        <Link
                          to="/dealdesk"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                        >
                          Submit an Address to Analyze
                        </Link>
                        <Link
                          to="/vip-buyer-access"
                          onClick={closeDropdowns}
                          className="block px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                        >
                          VIP Buyer Access →
                        </Link>
                      </div>
                    </Dropdown>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="h-4 w-4" />
                  Close
                </>
              ) : (
                <>
                  <Menu className="h-4 w-4" />
                  Menu
                </>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background z-[1999] pt-20 px-4 pb-8 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Towns */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Towns</h3>
            <Link to="/communities" onClick={closeMobileMenu} className="block text-primary font-medium mb-2">
              Browse All Towns →
            </Link>
            <div className="relative mb-3">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search towns..."
                value={townSearch}
                onChange={(e) => setTownSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-muted border border-border rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {filteredTowns.map((town) => (
                <Link
                  key={town.slug}
                  to={`/towns/${town.slug}`}
                  onClick={closeMobileMenu}
                  className="px-2 py-1.5 text-sm text-foreground hover:text-primary"
                >
                  {town.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Buy */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Buy</h3>
            <div className="space-y-2">
              <Link to="/homes-for-sale" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Search Homes
              </Link>
              <Link to="/first-time-homebuyers" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                First-Time Buyer Programs
              </Link>
              <Link to="/grants" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Grants & Down Payment Help
              </Link>
            </div>
          </div>

          {/* Rent */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Rent</h3>
            <div className="space-y-2">
              <Link to="/rentals" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">
                Rentals Hub
              </Link>
              <Link to="/rentals/albany" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Albany Rentals
              </Link>
              <Link to="/rentals/schenectady" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Schenectady Rentals
              </Link>
              <Link to="/rentals/troy" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Troy Rentals
              </Link>
              <Link to="/rentals/saratoga" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Saratoga Rentals
              </Link>
            </div>
          </div>

          {/* Invest */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Invest</h3>
            <div className="space-y-2">
              <Link to="/albany-multi-unit" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">
                Multi-Family Search
              </Link>
              <Link to="/investor-tools" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Investor Tools
              </Link>
              <Link to="/investor/albany-multi-unit-market" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Albany Multi-Unit Report
              </Link>
              <Link to="/troy-multi-unit" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Troy Multi-Unit Report
              </Link>
              <Link to="/schenectady-multi-unit" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Schenectady Multi-Unit Report
              </Link>
            </div>
          </div>

          {/* Intelligence */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Intelligence</h3>
            <div className="space-y-2">
              <Link to="/reports/sample-property-intelligence" onClick={closeMobileMenu} className="block text-primary font-medium">
                View Sample Report →
              </Link>
              <Link to="/dealdesk" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Request a Report
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Contact</h3>
            <div className="space-y-2">
              <a href="tel:+15186762347" className="flex items-center gap-2 text-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
                (518) 676-2347
              </a>
              <a href="mailto:scott@capitaldistrictnest.com" className="block text-foreground hover:text-primary">
                scott@capitaldistrictnest.com
              </a>
              <Link to="/dealdesk" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Submit an Address
              </Link>
              <Link to="/vip-buyer-access" onClick={closeMobileMenu} className="block text-primary font-medium">
                VIP Buyer Access →
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          <div className="border-t border-border pt-6 mt-6">
            <Link to="/site-index" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground text-sm">
              Full Site Index
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanHeader;
