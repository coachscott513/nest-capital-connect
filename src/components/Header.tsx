import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Home, Building2, Key, MapPin, FileText, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const towns = [
  { name: "Delmar", href: "/delmar-homes-for-sale", featured: true },
  { name: "Niskayuna", href: "/niskayuna-homes-for-sale" },
  { name: "Clifton Park", href: "/clifton-park-homes-for-sale" },
  { name: "Saratoga", href: "/saratoga-homes-for-sale" },
  { name: "Albany", href: "/albany-homes-for-sale" },
  { name: "Troy", href: "/troy-homes-for-sale" },
  { name: "Schenectady", href: "/schenectady-homes-for-sale" },
  { name: "Amsterdam", href: "/amsterdam-homes-for-sale" },
];

const searchOptions = [
  { 
    title: "Homes for Sale", 
    description: "Single-family homes across the Capital District",
    href: "/homes-for-sale",
    icon: Home
  },
  { 
    title: "Multi-Family / Investment", 
    description: "2-4 unit properties for investors",
    href: "/albany-multi-unit",
    icon: Building2
  },
  { 
    title: "Rentals", 
    description: "Available rental properties",
    href: "/rentals",
    icon: Key
  },
];

const guides = [
  { name: "First-Time Buyer Guide", href: "/buyer-journey/first-time-buyer" },
  { name: "Low Down Payment Programs", href: "/grants" },
  { name: "1031 Exchange Playbook", href: "/investor/1031-nyc-to-albany" },
  { name: "NYC → Albany ROI", href: "/investor/nyc-to-albany-roi" },
  { name: "Analyze Multi-Family", href: "/investor/analyze-multifamily" },
  { name: "Best Cash Flow Neighborhoods", href: "/investor/best-neighborhoods-cash-flow-capital-district" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 h-14" ref={dropdownRef}>
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png" 
            alt="Capital District Nest Logo" 
            className="h-8 w-8"
          />
          <span className="text-neutral-900 font-semibold text-base tracking-tight hidden sm:block">
            Capital District Nest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* Home */}
          <Link
            to="/"
            className="text-neutral-600 hover:text-neutral-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Home
          </Link>

          {/* Towns Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('towns')}
              className={`flex items-center text-sm font-medium px-3 py-2 transition-colors ${
                activeDropdown === 'towns' ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Towns
              <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'towns' ? 'rotate-180' : ''}`} />
            </button>
            
            {activeDropdown === 'towns' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-neutral-200/80 p-4 min-w-[280px] z-50">
                <div className="grid grid-cols-2 gap-1">
                  {towns.map((town) => (
                    <Link
                      key={town.name}
                      to={town.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        town.featured 
                          ? 'bg-blue-50 text-blue-700 font-medium hover:bg-blue-100' 
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {town.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-neutral-100 mt-3 pt-3">
                  <Link
                    to="/communities"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    <MapPin size={14} className="mr-1.5" />
                    View all towns →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Search Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('search')}
              className={`flex items-center text-sm font-medium px-3 py-2 transition-colors ${
                activeDropdown === 'search' ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Search
              <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'search' ? 'rotate-180' : ''}`} />
            </button>
            
            {activeDropdown === 'search' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-xl border border-neutral-200/80 p-3 min-w-[320px] z-50">
                <div className="space-y-1">
                  {searchOptions.map((option) => (
                    <Link
                      key={option.title}
                      to={option.href}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start p-3 rounded-lg hover:bg-neutral-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-100 group-hover:bg-blue-100 flex items-center justify-center mr-3 transition-colors">
                        <option.icon size={20} className="text-neutral-600 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">{option.title}</div>
                        <div className="text-xs text-neutral-500">{option.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Intelligence Report */}
          <Link
            to="/dealdesk"
            className="text-neutral-600 hover:text-neutral-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Intelligence Report
          </Link>

          {/* Investor Hub */}
          <Link
            to="/investor-tools"
            className="text-neutral-600 hover:text-neutral-900 px-3 py-2 text-sm font-medium transition-colors"
          >
            Investor Hub
          </Link>

          {/* Guides Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('guides')}
              className={`flex items-center text-sm font-medium px-3 py-2 transition-colors ${
                activeDropdown === 'guides' ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Guides
              <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'guides' ? 'rotate-180' : ''}`} />
            </button>
            
            {activeDropdown === 'guides' && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-neutral-200/80 p-2 min-w-[260px] z-50">
                {guides.map((guide) => (
                  <Link
                    key={guide.name}
                    to={guide.href}
                    onClick={() => setActiveDropdown(null)}
                    className="block px-3 py-2.5 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    {guide.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side: CTA + Mobile Menu */}
        <div className="flex items-center space-x-3">
          {/* Get Report CTA */}
          <Link
            to="/dealdesk"
            className="hidden sm:inline-flex items-center bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            Get Report
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-neutral-900 p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 bg-white z-40 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-lg font-medium text-neutral-900"
            >
              Home
            </Link>

            {/* Towns */}
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400 font-semibold mb-3">Towns</div>
              <div className="grid grid-cols-2 gap-2">
                {towns.map((town) => (
                  <Link
                    key={town.name}
                    to={town.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-lg text-sm ${
                      town.featured 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-neutral-700 bg-neutral-50'
                    }`}
                  >
                    {town.name}
                  </Link>
                ))}
              </div>
              <Link
                to="/communities"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-3 text-sm text-neutral-500"
              >
                View all towns →
              </Link>
            </div>

            {/* Search */}
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400 font-semibold mb-3">Search</div>
              <div className="space-y-2">
                {searchOptions.map((option) => (
                  <Link
                    key={option.title}
                    to={option.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 rounded-lg bg-neutral-50"
                  >
                    <option.icon size={20} className="text-neutral-600 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{option.title}</div>
                      <div className="text-xs text-neutral-500">{option.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <Link
                to="/dealdesk"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-neutral-900 font-medium"
              >
                <FileText size={18} className="mr-2" />
                Intelligence Report
              </Link>
              <Link
                to="/investor-tools"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-neutral-900 font-medium"
              >
                <TrendingUp size={18} className="mr-2" />
                Investor Hub
              </Link>
            </div>

            {/* Guides */}
            <div>
              <div className="text-xs uppercase tracking-wide text-neutral-400 font-semibold mb-3">Guides</div>
              <div className="space-y-2">
                {guides.map((guide) => (
                  <Link
                    key={guide.name}
                    to={guide.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm text-neutral-700 py-1.5"
                  >
                    {guide.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-6">
              <Link
                to="/dealdesk"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-neutral-900 text-white text-center py-3 rounded-full font-medium"
              >
                Get Report
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
