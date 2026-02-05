import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Phone, Search, X, Menu, Command } from "lucide-react";
import cdnLogo from "@/assets/cdn-logo.png";
import GlobalSearchCommand from "@/components/GlobalSearchCommand";

// Town data - All 11 Counties: Albany, Schenectady, Rensselaer, Saratoga, 
// Washington, Warren, Fulton, Montgomery, Greene, Schoharie + Boston Expansion
const towns = [
  { name: "Albany", slug: "albany" },
  { name: "Altamont", slug: "altamont" },
  { name: "Amsterdam", slug: "amsterdam" },
  // Greene County
  { name: "Athens", slug: "athens" },
  { name: "Averill Park", slug: "averill-park" },
  { name: "Ballston Spa", slug: "ballston-spa" },
  { name: "Brunswick", slug: "brunswick" },
  { name: "Cambridge", slug: "cambridge" },
  { name: "Canajoharie", slug: "canajoharie" },
  // Greene County
  { name: "Catskill", slug: "catskill" },
  { name: "Clifton Park", slug: "clifton-park" },
  // Schoharie County
  { name: "Cobleskill", slug: "cobleskill" },
  { name: "Cohoes", slug: "cohoes" },
  { name: "Colonie", slug: "colonie" },
  // Greene County
  { name: "Coxsackie", slug: "coxsackie" },
  { name: "Delmar", slug: "delmar" },
  { name: "East Greenbush", slug: "east-greenbush" },
  { name: "Fonda", slug: "fonda" },
  { name: "Glens Falls", slug: "glens-falls" },
  { name: "Gloversville", slug: "gloversville" },
  { name: "Green Island", slug: "green-island" },
  { name: "Greenwich", slug: "greenwich" },
  { name: "Guilderland", slug: "guilderland" },
  { name: "Hudson Falls", slug: "hudson-falls" },
  // Greene County
  { name: "Hunter", slug: "hunter" },
  { name: "Johnstown", slug: "johnstown" },
  { name: "Lake George", slug: "lake-george" },
  { name: "Latham", slug: "latham" },
  { name: "Loudonville", slug: "loudonville" },
  { name: "Malta", slug: "malta" },
  { name: "Mechanicville", slug: "mechanicville" },
  { name: "Menands", slug: "menands" },
  // Schoharie County
  { name: "Middleburgh", slug: "middleburgh" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "North Greenbush", slug: "north-greenbush" },
  { name: "Northville", slug: "northville" },
  { name: "Queensbury", slug: "queensbury" },
  { name: "Ravena", slug: "ravena" },
  { name: "Rensselaer", slug: "rensselaer" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Schaghticoke", slug: "schaghticoke" },
  { name: "Schenectady", slug: "schenectady" },
  // Schoharie County
  { name: "Schoharie", slug: "schoharie" },
  // Schoharie County
  { name: "Sharon Springs", slug: "sharon-springs" },
  { name: "Stillwater", slug: "stillwater" },
  { name: "Troy", slug: "troy" },
  { name: "Voorheesville", slug: "voorheesville" },
  { name: "Waterford", slug: "waterford" },
  { name: "Watervliet", slug: "watervliet" },
  // Greene County
  { name: "Windham", slug: "windham" },
  { name: "Wynantskill", slug: "wynantskill" },
].sort((a, b) => a.name.localeCompare(b.name));

// Yield Intelligence Platform - Investment Focused Navigation
const navItems = [
  {
    label: "Deals",
    dropdown: "deals",
  },
  {
    label: "Loan Types",
    href: "/loan-types",
  },
  {
    label: "Markets",
    dropdown: "towns",
  },
  {
    label: "Financing",
    href: "/vendor-hub",
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
      className={`absolute top-full mt-3 rounded-2xl p-5 min-w-72 z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 ${
        align === "right" ? "right-0" : "left-0"
      }`}
      style={{
        background: 'rgba(11, 11, 11, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 0 0.5px rgba(255, 255, 255, 0.1)'
      }}
    >
      {children}
    </div>
  );
};

const CleanHeader = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [townSearch, setTownSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
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

  return (
    <>
      {/* Desktop Header - Liquid Glass Floating Navigation */}
      <header 
        className="sticky top-0 z-[2000]"
        style={{
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(50px) saturate(200%)',
          WebkitBackdropFilter: 'blur(50px) saturate(200%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        <nav className="w-full px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo - Abstract Institutional Mark */}
            <Link to="/" className="flex items-center gap-4 group shrink-0" onClick={closeDropdowns}>
              {/* Data Nest Logo - Minimalist Horizontal Lines */}
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <filter id="tealGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Base line - Foundation */}
                  <rect x="8" y="28" width="24" height="2" fill="white"/>
                  {/* Middle line - Electric Teal Glow */}
                  <rect x="12" y="22" width="16" height="2" fill="#00F5FF" filter="url(#tealGlow)" className="drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]"/>
                  {/* Top line - Peak */}
                  <rect x="18" y="16" width="4" height="2" fill="white"/>
                </svg>
              </div>
              
              {/* Typography - Yield Intelligence Platform */}
              <div className="hidden sm:flex flex-col">
                <span className="text-[13px] font-extralight text-white tracking-[0.3em] uppercase">
                  Yield
                </span>
                <span className="text-[9px] text-primary tracking-[0.2em] uppercase font-medium">
                  Intelligence Platform
                </span>
              </div>
            </Link>

            {/* 7-Word Promise - Desktop Only */}
            <div className="hidden xl:flex items-center">
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-light border-l border-border/50 pl-6 ml-2">
                Know the deal before you buy
              </span>
            </div>

            {/* Desktop Navigation - Apple-Style Institutional */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.href ? (
                    // Direct link (no dropdown)
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.4em] font-[200] rounded-full transition-all duration-300 text-white/90 hover:text-primary hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    // Dropdown button
                    <button
                      onClick={() => toggleDropdown(item.dropdown!)}
                      className={`flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.4em] font-[200] rounded-full transition-all duration-300 ${
                        activeDropdown === item.dropdown
                          ? "text-primary bg-primary/20"
                          : "text-white/90 hover:text-primary hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          activeDropdown === item.dropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}

                  {/* Markets Dropdown (formerly Towns) */}
                  {item.dropdown === "towns" && (
                    <Dropdown isOpen={activeDropdown === "towns"} onClose={closeDropdowns}>
                      <div className="space-y-3">
                        <p className="text-xs uppercase text-muted-foreground tracking-widest">
                          Local intel for your deal analysis
                        </p>
                        <Link
                          to="/communities"
                          onClick={closeDropdowns}
                          className="block text-sm font-semibold text-primary hover:underline"
                        >
                          Browse All Markets →
                        </Link>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search markets..."
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

                  {/* Deals Dropdown - Analyzer First */}
                  {item.dropdown === "deals" && (
                    <Dropdown isOpen={activeDropdown === "deals"} onClose={closeDropdowns}>
                      <div className="space-y-4 w-72">
                        {/* Primary Tool - Isolated */}
                        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                          <p className="text-[10px] uppercase text-primary tracking-widest font-bold mb-2">PRIMARY TOOL</p>
                          <Link 
                            to="/analyzer" 
                            onClick={closeDropdowns} 
                            className="block text-lg font-semibold text-primary hover:underline"
                          >
                            Investment Analyzer →
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            Cash flow, returns, and financing scenarios
                          </p>
                        </div>

                        {/* Supporting Resources */}
                        <div className="space-y-1">
                          <Link to="/loan-types" onClick={closeDropdowns} className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors">
                            Loan Types Guide
                          </Link>
                          <Link to="/case-studies/177-lancaster-albany" onClick={closeDropdowns} className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors">
                            Sample Deal Report
                          </Link>
                          <Link to="/investor-tools" onClick={closeDropdowns} className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors">
                            Investor Tools
                          </Link>
                          <Link to="/rentals" onClick={closeDropdowns} className="block px-3 py-2 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors">
                            Income Properties
                          </Link>
                        </div>
                      </div>
                    </Dropdown>
                  )}
                </div>
              ))}

              {/* Prominent Analyzer CTA Button */}
              <Link
                to="/analyzer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 ml-4"
              >
                Analyze a Deal
              </Link>

              {/* Global Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.3em] font-[300] rounded-full transition-all duration-300 text-white/70 hover:text-primary hover:bg-white/10 border border-white/10 hover:border-primary/30 ml-2"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-normal ml-1">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-muted transition-colors text-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors text-foreground"
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
          </div>
        </nav>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu Overlay - Deep Space */}
      <div
        className={`fixed inset-0 bg-background z-[1999] pt-20 px-4 pb-8 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Deal Analysis - Primary CTA */}
          <div>
            <Link 
              to="/analyzer" 
              onClick={closeMobileMenu} 
              className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary/30"
            >
              🔥 Analyze a Deal
            </Link>
          </div>

          {/* Deals */}
          <div>
            <h3 className="text-xs uppercase text-[#00F5FF] font-bold tracking-widest mb-3">Deal Analysis</h3>
            <div className="space-y-2">
              <Link to="/analyzer" onClick={closeMobileMenu} className="block text-primary font-medium">
                Investment Analyzer →
              </Link>
              <Link to="/loan-types" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Loan Types Guide
              </Link>
              <Link to="/case-studies/177-lancaster-albany" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Sample Deal Report
              </Link>
              <Link to="/investor-tools" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Investor Tools
              </Link>
              <Link to="/rentals" onClick={closeMobileMenu} className="block text-foreground hover:text-primary">
                Rental Properties
              </Link>
            </div>
          </div>

          {/* Towns */}
          <div>
            <h3 className="text-xs uppercase text-[#6E6E73] font-bold tracking-widest mb-3">Towns</h3>
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

          {/* Partners */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Partners</h3>
            <div className="space-y-2">
              <Link to="/vendors" onClick={closeMobileMenu} className="block text-primary font-medium">
                View All Partners →
              </Link>
              <p className="text-xs text-muted-foreground">
                Mortgage • Legal • Insurance • Contractors
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-bold tracking-widest mb-3">Contact</h3>
            <a href="tel:+15186762347" className="flex items-center gap-2 text-foreground hover:text-primary">
              <Phone className="h-4 w-4" />
              (518) 676-2347
            </a>
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
