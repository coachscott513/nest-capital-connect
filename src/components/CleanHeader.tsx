import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X, Menu, Phone } from "lucide-react";
import GlobalSearchCommand from "@/components/GlobalSearchCommand";
import AnalystCard from "@/components/AnalystCard";
import cdnLogo from "@/assets/cdn-logo.jpeg";

const TEAL = "#0d6e66";

type NavMode = {
  label: string;
  mobileLabel: string;
  href?: string;
  action?: "focus-search";
  matchPaths?: string[];
};

// Top nav reads as search modes inside a local operating system,
// not a list of marketing pages.
const navModes: NavMode[] = [
  { label: "Discover", mobileLabel: "Discover Anything Local", action: "focus-search" },
  { label: "Homes", mobileLabel: "Homes", href: "/homes", matchPaths: ["/homes"] },
  { label: "Businesses", mobileLabel: "Businesses", href: "/businesses", matchPaths: ["/businesses", "/local"] },
  { label: "Communities", mobileLabel: "Communities", href: "/communities", matchPaths: ["/communities", "/living-in"] },
  { label: "Neighborhoods", mobileLabel: "Neighborhood Guides", href: "/neighborhoods", matchPaths: ["/neighborhoods"] },
  { label: "Stories", mobileLabel: "Stories", href: "/stories", matchPaths: ["/stories"] },
  { label: "What's Happening", mobileLabel: "What's Happening", href: "/weekly", matchPaths: ["/weekly"] },
  { label: "For Businesses", mobileLabel: "For Businesses", href: "/for-businesses", matchPaths: ["/for-businesses", "/business", "/pricing"] },
];

const CleanHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const focusOmniSearch = () => {
    const dispatch = () => window.dispatchEvent(new CustomEvent("omni-search:focus"));
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(dispatch, 400);
    } else {
      dispatch();
    }
  };

  const trackNavClick = (destination: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "event_nav_click", {
        destination,
        source_location: "main_navigation",
        page_path: location.pathname,
      });
    }
  };


  useEffect(() => {
    setMobileMenuOpen(false);
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

  const isActive = (mode: NavMode) => {
    if (!mode.matchPaths || mode.matchPaths.length === 0) return false;
    return mode.matchPaths.some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));
  };

  const handleModeClick = (mode: NavMode, e: React.MouseEvent) => {
    if (mode.action === "focus-search") {
      e.preventDefault();
      focusOmniSearch();
      return;
    }
    if (mode.href) {
      trackNavClick(mode.href);
    }
  };


  const isFrosted = scrolled || mobileMenuOpen;

  return (
    <>
      <header className={`sticky top-0 z-[2000] nav-shell ${isFrosted ? "nav-frost" : "nav-transparent"}`}>
        <nav className="w-full max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={cdnLogo}
                alt="Capital District Nest"
                className="w-9 h-9 rounded-full object-cover shadow-sm"
              />
              <span className="text-[15px] font-bold text-foreground tracking-tight hidden sm:inline">
                Capital District Nest
              </span>
            </Link>

            {/* Centered nav — search modes */}
            <div className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {navModes.map((mode) => {
                const active = isActive(mode);
                const isClaim = mode.label === "For Businesses";
                const baseCls =
                  "relative px-3 py-2 text-[13.5px] font-medium rounded-full transition-colors whitespace-nowrap";
                const stateCls = active
                  ? "text-foreground bg-white/[0.08]"
                  : "text-foreground/70 hover:text-foreground hover:bg-white/[0.05]";
                const claimCls = isClaim
                  ? "ml-1 text-[#5eead4] hover:text-white hover:bg-[#0d6e66]"
                  : "";

                const inner = (
                  <>
                    {mode.label}
                    {active && (
                      <span
                        className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-1 h-1 rounded-full"
                        style={{ backgroundColor: "#5eead4" }}
                      />
                    )}
                  </>
                );

                if (mode.action === "focus-search") {
                  return (
                    <button
                      key={mode.label}
                      onClick={(e) => handleModeClick(mode, e)}
                      className={`${baseCls} ${stateCls} ${claimCls}`}
                    >
                      {inner}
                    </button>
                  );
                }


                return (
                  <Link
                    key={mode.label}
                    to={mode.href!}
                    onClick={(e) => handleModeClick(mode, e)}
                    className={`${baseCls} ${stateCls} ${claimCls}`}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>

            {/* Right cluster */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 whitespace-nowrap">
              <button
                onClick={focusOmniSearch}
                aria-label="Focus the local search bar"
                className="flex items-center justify-center w-9 h-9 rounded-full text-foreground/70 hover:text-foreground hover:bg-white/[0.06] transition"
              >
                <Search className="h-4 w-4" />
              </button>

              <AnalystCard>
                <button className="lift-hover inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition-colors">
                  Request Intro
                </button>
              </AnalystCard>
            </div>

            {/* Mobile cluster */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={focusOmniSearch}
                aria-label="Focus the local search bar"
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <Search className="h-4 w-4 text-foreground" />
              </button>
              <a
                href="tel:+15185227265"
                aria-label="Call Scott"
                className="flex items-center justify-center w-9 h-9 rounded-full text-foreground/80 hover:text-foreground border border-white/15 hover:border-white/35 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md transition-colors"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <GlobalSearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile menu — premium glass sheet */}
      <div
        className={`fixed inset-0 z-[1999] pt-24 px-6 pb-10 overflow-y-auto transition-transform duration-300 ease-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(11, 15, 25, 0.96)",
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
        }}
      >
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-4">
          Search modes
        </p>
        <div className="space-y-1">
          {navModes.map((mode) => {
            const isClaim = mode.label === "For Businesses";
            const cls = `block w-full text-left py-3.5 px-1 text-[17px] font-medium border-b border-white/[0.06] transition-colors ${
              isClaim ? "text-[#5eead4]" : "text-white/90 hover:text-white"
            }`;

            if (mode.action === "focus-search") {
              return (
                <button
                  key={mode.label}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    setTimeout(() => handleModeClick(mode, e as unknown as React.MouseEvent), 50);
                  }}
                  className={cls}
                >
                  {mode.mobileLabel}
                </button>
              );
            }


            return (
              <Link
                key={mode.label}
                to={mode.href!}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (mode.href) trackNavClick(mode.href);
                }}
                className={cls}
              >
                {mode.mobileLabel}
              </Link>
            );

          })}

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3.5 px-1 text-[17px] font-medium text-white/90 hover:text-white border-b border-white/[0.06]"
          >
            About Capital District Nest
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-3.5 px-1 text-[17px] font-medium text-white/90 hover:text-white border-b border-white/[0.06]"
          >
            Contact
          </Link>
        </div>

        <div className="mt-8">
          <AnalystCard>
            <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md">
              Request Intro
            </button>
          </AnalystCard>
        </div>
      </div>
    </>
  );
};

export default CleanHeader;
