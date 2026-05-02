import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Search, X, Menu, Command } from "lucide-react";
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
  { label: "Rentals", href: "/rentals" },
  { label: "Buyers", href: "/first-time-homebuyers" },
  { label: "Investors", href: "/investor-tools" },
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
      className={`absolute top-full mt-3 rounded-2xl p-5 min-w-72 z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 bg-background shadow-[0_8px_40px_-12px_hsla(220,10%,30%,0.12)] ${
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
      <header className="sticky top-0 z-[2000] glass-nav border-b border-border/60">
        <nav className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0" onClick={closeDropdowns}>
              <span className="text-sm font-semibold text-foreground tracking-tight">
                Capital District Nest
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={closeDropdowns}
                      className="px-3.5 py-2 text-[13px] text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown(item.dropdown!)}
                      className={`flex items-center gap-1 px-3.5 py-2 text-[13px] rounded-lg transition-colors ${
                        activeDropdown === item.dropdown
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === item.dropdown ? "rotate-180" : ""}`} />
                    </button>
                  )}

                  {item.dropdown === "towns" && (
                    <Dropdown isOpen={activeDropdown === "towns"} onClose={closeDropdowns}>
                      <div className="space-y-3">
                        <Link to="/communities" onClick={closeDropdowns} className="block text-sm font-medium text-accent hover:underline">
                          Browse All Towns →
                        </Link>
                        <Link to="/living-in-delmar" onClick={closeDropdowns} className="block text-sm font-medium text-foreground hover:text-accent">
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
                              className="px-2 py-1.5 text-[13px] text-foreground hover:text-accent rounded transition-colors"
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

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="ml-3 flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground rounded-lg transition-colors"
              >
                <Search className="h-3.5 w-3.5" />
                <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-secondary text-[10px] text-muted-foreground">
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </button>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary transition-colors"
              >
                <Search className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        className={`fixed inset-0 bg-background z-[1999] pt-20 px-6 pb-8 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-8">
          <div className="space-y-1">
            {navItems.filter(i => i.href).map((item) => (
              <Link key={item.label} to={item.href!} onClick={closeMobileMenu} className="block py-3 text-foreground font-medium text-lg border-b border-border/40">
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className="text-xs text-muted-foreground font-medium tracking-[0.15em] uppercase mb-4">Towns</h3>
            <Link to="/communities" onClick={closeMobileMenu} className="block text-accent font-medium mb-2 text-sm">Browse All →</Link>
            <Link to="/living-in-delmar" onClick={closeMobileMenu} className="block text-foreground font-medium mb-3 text-sm">★ Living in Delmar →</Link>
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
            <div className="grid grid-cols-2 gap-0.5">
              {filteredTowns.map((town) => (
                <Link key={town.slug} to={`/towns/${town.slug}`} onClick={closeMobileMenu} className="px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                  {town.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanHeader;
