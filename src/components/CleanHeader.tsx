import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, X, Menu, Globe, Phone } from "lucide-react";
import GlobalSearchCommand from "@/components/GlobalSearchCommand";
import AnalystCard from "@/components/AnalystCard";

// Featured towns shown in the main nav. Keep tight + canonical.
const towns = [
  { name: "Delmar", slug: "delmar" },
  { name: "Albany", slug: "albany" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Troy", slug: "troy" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Colonie", slug: "colonie" },
  { name: "Guilderland", slug: "guilderland" },
  { name: "Bethlehem", slug: "bethlehem" },
];

const navItems: { label: string; href?: string; dropdown?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Towns", dropdown: "towns" },
  { label: "Homes", href: "/homes" },
  { label: "Local", href: "/local" },
  { label: "Analyze", href: "/analyze" },
  { label: "Contact", href: "/contact" },
];

const TEAL = "#0d6e66";
const REMAX_RED = "#DC1C2E";

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
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-3 p-5 min-w-72 z-[9999] dropdown-panel ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      {children}
    </div>
  );
};

const CleanHeader = () => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [townSearch, setTownSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setTownSearch("");
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  // Frosted on scroll, when a dropdown is open, or when mobile menu is open.
  const isFrosted = scrolled || activeDropdown !== null || mobileMenuOpen;

  return (
    <>
      <header className={`sticky top-0 z-[2000] nav-shell ${isFrosted ? "nav-frost" : "nav-transparent"}`}>
        <nav className="w-full max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Logo — circular teal dot + wordmark */}
            <Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeDropdowns}>
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
                style={{ backgroundColor: TEAL }}
              >
                CD
              </span>
              <span className="text-[15px] font-bold text-foreground tracking-tight hidden sm:inline">
                Capital District Nest
              </span>
            </Link>

            {/* Centered nav */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={closeDropdowns}
                      className="px-3 py-2 text-[14px] font-medium text-foreground/75 hover:text-foreground rounded-lg transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(item.dropdown!)}
                      className={`flex items-center gap-1 px-3 py-2 text-[14px] font-medium rounded-lg transition-colors whitespace-nowrap ${
                        activeDropdown === item.dropdown
                          ? "text-foreground"
                          : "text-foreground/75 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          activeDropdown === item.dropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {item.dropdown === "towns" && (
                    <Dropdown isOpen={activeDropdown === "towns"} onClose={closeDropdowns}>
                      <div className="space-y-3">
                        <Link
                          to="/communities"
                          onClick={closeDropdowns}
                          className="block text-sm font-semibold hover:underline"
                          style={{ color: TEAL }}
                        >
                          Browse all towns →
                        </Link>
                        <Link
                          to="/living-in-delmar"
                          onClick={closeDropdowns}
                          className="block text-sm font-medium text-foreground hover:opacity-80"
                        >
                          ★ Living in Delmar →
                        </Link>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search towns..."
                            value={townSearch}
                            onChange={(e) => setTownSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm bg-secondary/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/20"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-0.5 max-h-64 overflow-y-auto">
                          {filteredTowns.map((town) => (
                            <Link
                              key={town.slug}
                              to={`/towns/${town.slug}`}
                              onClick={closeDropdowns}
                              className="px-2 py-1.5 text-[13px] text-foreground hover:opacity-80 rounded transition-colors"
                            >
                              {town.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Dropdown>
                  )}
                </div>
              ))}
            </div>

            {/* Right cluster */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 whitespace-nowrap">
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex items-center justify-center w-9 h-9 rounded-full text-foreground/70 hover:text-foreground hover:bg-secondary/60 transition"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Analyze (compact) */}
              <Link
                to="/analyze"
                onClick={closeDropdowns}
                className="px-3 py-1.5 text-[13px] font-medium text-foreground/75 hover:text-foreground transition-colors"
              >
                Analyze
              </Link>

              {/* Talk to an Expert — primary pill */}
              <AnalystCard>
                <button className="lift-hover inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-foreground hover:bg-foreground/90">
                  Talk to an Expert
                </button>
              </AnalystCard>
            </div>

            {/* Mobile cluster */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary transition-colors"
              >
                <Search className="h-4 w-4 text-foreground" />
              </button>
              <a
                href="tel:+15185227265"
                aria-label="Call Scott"
                className="flex items-center justify-center w-9 h-9 rounded-full text-white"
                style={{ backgroundColor: REMAX_RED }}
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary transition-colors"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <GlobalSearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-[1999] pt-24 px-6 pb-8 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="space-y-1">
            {navItems
              .filter((i) => i.href)
              .map((item) => (
                <Link
                  key={item.label}
                  to={item.href!}
                  onClick={closeMobileMenu}
                  className="block py-3 text-foreground font-semibold text-lg border-b border-border/40"
                >
                  {item.label}
                </Link>
              ))}
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground font-medium tracking-[0.15em] uppercase mb-4">
              Explore
            </h3>
            <Link
              to="/communities"
              onClick={closeMobileMenu}
              className="block font-semibold mb-2 text-sm"
              style={{ color: TEAL }}
            >
              Browse all →
            </Link>
            <Link
              to="/living-in-delmar"
              onClick={closeMobileMenu}
              className="block text-foreground font-medium mb-3 text-sm"
            >
              ★ Living in Delmar →
            </Link>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search towns..."
                value={townSearch}
                onChange={(e) => setTownSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-secondary/50 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-0.5 mb-8">
              {filteredTowns.map((town) => (
                <Link
                  key={town.slug}
                  to={`/towns/${town.slug}`}
                  onClick={closeMobileMenu}
                  className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  {town.name}
                </Link>
              ))}
            </div>

            <AnalystCard>
              <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-foreground">
                Talk to an Expert
              </button>
            </AnalystCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanHeader;
