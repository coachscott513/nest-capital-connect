import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Phone, Search, X, Menu, Command } from "lucide-react";
import GlobalSearchCommand from "@/components/GlobalSearchCommand";

const towns = [
  { name: "Albany", slug: "albany" },
  { name: "Altamont", slug: "altamont" },
  { name: "Amsterdam", slug: "amsterdam" },
  { name: "Athens", slug: "athens" },
  { name: "Averill Park", slug: "averill-park" },
  { name: "Ballston Spa", slug: "ballston-spa" },
  { name: "Brunswick", slug: "brunswick" },
  { name: "Cambridge", slug: "cambridge" },
  { name: "Canajoharie", slug: "canajoharie" },
  { name: "Catskill", slug: "catskill" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Cobleskill", slug: "cobleskill" },
  { name: "Cohoes", slug: "cohoes" },
  { name: "Colonie", slug: "colonie" },
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
  { name: "Hunter", slug: "hunter" },
  { name: "Johnstown", slug: "johnstown" },
  { name: "Lake George", slug: "lake-george" },
  { name: "Latham", slug: "latham" },
  { name: "Loudonville", slug: "loudonville" },
  { name: "Malta", slug: "malta" },
  { name: "Mechanicville", slug: "mechanicville" },
  { name: "Menands", slug: "menands" },
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
  { name: "Schoharie", slug: "schoharie" },
  { name: "Sharon Springs", slug: "sharon-springs" },
  { name: "Stillwater", slug: "stillwater" },
  { name: "Troy", slug: "troy" },
  { name: "Voorheesville", slug: "voorheesville" },
  { name: "Waterford", slug: "waterford" },
  { name: "Watervliet", slug: "watervliet" },
  { name: "Windham", slug: "windham" },
  { name: "Wynantskill", slug: "wynantskill" },
].sort((a, b) => a.name.localeCompare(b.name));

const navItems = [
  { label: "Home", href: "/" },
  { label: "Analyze", href: "/analyze" },
  { label: "Towns", dropdown: "towns" },
  { label: "Markets", href: "/communities" },
  { label: "Buyers", href: "/first-time-homebuyers" },
  { label: "Investors", href: "/investor-tools" },
  { label: "South Florida", href: "/south-florida" },
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
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-full mt-3 rounded-2xl p-5 min-w-72 z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 bg-background border border-border shadow-lg ${
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

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setTownSearch("");
  }, [location.pathname]);

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
      <header className="sticky top-0 z-[2000] bg-background/85 backdrop-blur-xl border-b border-border">
        <nav className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" onClick={closeDropdowns}>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold text-foreground tracking-tight">
                  Capital District Nest
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Property Intelligence
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={closeDropdowns}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(item.dropdown!)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeDropdown === item.dropdown
                          ? "text-foreground bg-secondary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === item.dropdown ? "rotate-180" : ""}`} />
                    </button>
                  )}

                  {item.dropdown === "towns" && (
                    <Dropdown isOpen={activeDropdown === "towns"} onClose={closeDropdowns}>
                      <div className="space-y-3">
                        <p className="text-xs uppercase text-muted-foreground tracking-widest font-medium">Explore by Town</p>
                        <Link to="/communities" onClick={closeDropdowns} className="block text-sm font-semibold text-primary hover:underline">
                          Browse All Towns →
                        </Link>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Search towns..."
                            value={townSearch}
                            onChange={(e) => setTownSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-1 max-h-64 overflow-y-auto">
                          {filteredTowns.map((town) => (
                            <Link
                              key={town.slug}
                              to={`/towns/${town.slug}`}
                              onClick={closeDropdowns}
                              className="px-2 py-1.5 text-sm text-foreground hover:text-primary hover:bg-secondary rounded transition-colors"
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

              {/* CTA */}
              <Link
                to="/analyze"
                className="ml-4 px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                Analyze a Property
              </Link>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="ml-2 flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg border border-border hover:border-primary/30 transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-secondary text-[10px]">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-secondary transition-colors"
              >
                <Search className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                {mobileMenuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <GlobalSearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-[1999] pt-20 px-4 pb-8 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <Link to="/analyze" onClick={closeMobileMenu} className="block w-full bg-primary text-primary-foreground text-center py-4 rounded-xl font-semibold text-lg">
            Analyze a Property
          </Link>

          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-widest mb-3">Navigate</h3>
            <div className="space-y-2">
              <Link to="/" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">Home</Link>
              <Link to="/analyze" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">Analyze</Link>
              <Link to="/communities" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">Markets</Link>
              <Link to="/first-time-homebuyers" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">Buyers</Link>
              <Link to="/investor-tools" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">Investors</Link>
              <Link to="/south-florida" onClick={closeMobileMenu} className="block text-foreground hover:text-primary font-medium">South Florida</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-widest mb-3">Towns</h3>
            <Link to="/communities" onClick={closeMobileMenu} className="block text-primary font-medium mb-2">Browse All Towns →</Link>
            <div className="relative mb-3">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search towns..."
                value={townSearch}
                onChange={(e) => setTownSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-secondary border border-border rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {filteredTowns.map((town) => (
                <Link key={town.slug} to={`/towns/${town.slug}`} onClick={closeMobileMenu} className="px-2 py-1.5 text-sm text-foreground hover:text-primary">
                  {town.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase text-muted-foreground font-semibold tracking-widest mb-3">Contact</h3>
            <a href="tel:+15186762347" className="flex items-center gap-2 text-foreground hover:text-primary">
              <Phone className="h-4 w-4" /> (518) 676-2347
            </a>
          </div>

          <div className="border-t border-border pt-6">
            <Link to="/site-index" onClick={closeMobileMenu} className="block text-muted-foreground hover:text-foreground text-sm">Full Site Index</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanHeader;
