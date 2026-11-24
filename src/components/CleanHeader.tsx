import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X, Menu, ChevronRight, ArrowLeft, Phone } from "lucide-react";
import GlobalSearchCommand from "@/components/GlobalSearchCommand";
import cdnLogo from "@/assets/cdn-logo.jpeg";
import { Button } from "@/components/ui/button";

/* =============================================================
   CLEAN HEADER — V2 (Apple-style mega menu + iOS drill-down)
   The header is the first discovery surface of the platform.
   Desktop: hover a top-level word → a large editorial panel
   glides down with categorized links and a small feature card.
   Mobile: tap a top-level word → a full-screen dark sheet
   slides in, one category at a time, with a back arrow.
   ============================================================= */

// ─── Mega menu data ──────────────────────────────────────────────────────────
import { SECTION_DEFS, type MegaSection } from './publicNavigationData';
import PublicNavigation from './PublicNavigation';
import { isPublicPaletteRoute } from './PublicPalette';

/**
 * Directory-first navigation order. Existing sections are preserved (no indexed
 * route is removed) — only the hierarchy changes.
 */
const NAV_ORDER = [
  "discover",
  "businesses",
  "forbusiness",
  "homes",
  "analyze",
  "closingteam",
  "homeservices",
  "communities",
  "stories",
  "happening",
];

const SECTIONS: MegaSection[] = NAV_ORDER.map((k) =>
  SECTION_DEFS.find((s) => s.key === k),
).filter((s): s is MegaSection => Boolean(s));

/**
 * Desktop bar shows the primary property-decision hierarchy only.
 * Everything else stays reachable via the mobile menu and footer — no route
 * is removed.
 */
const DESKTOP_KEYS = [
  "discover",
  "businesses",
  "forbusiness",
  "homes",
  "communities",
];
const DESKTOP_SECTIONS: MegaSection[] = DESKTOP_KEYS.map((k) =>
  SECTIONS.find((s) => s.key === k),
).filter((s): s is MegaSection => Boolean(s));

// ─── Component ────────────────────────────────────────────────────────────────
const LegacyCleanHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MegaSection | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const openMega = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setHoverKey(key);
  };
  const closeMegaSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setHoverKey(null), 140);
  };

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setHoverKey(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setHoverKey(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isFrosted = scrolled || !!hoverKey || mobileOpen;
  const active = hoverKey ? SECTIONS.find((s) => s.key === hoverKey) ?? null : null;

  return (
    <>
      <header
        className={`sticky top-0 z-[2000] nav-shell ${isFrosted ? "nav-frost" : "nav-transparent"}`}
        onMouseLeave={closeMegaSoon}
      >
        <nav className="w-full max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0" onMouseEnter={closeMegaSoon}>
              <img
                src={cdnLogo}
                alt="Capital District Nest"
                className="w-9 h-9 rounded-full object-cover shadow-sm"
              />
              <span className="text-[15px] font-bold text-foreground tracking-tight hidden sm:inline">
                Capital District Nest
              </span>
            </Link>

            {/* Desktop nav — mega-menu triggers */}
            <div className="hidden xl:flex items-center gap-0.5 whitespace-nowrap">
              {DESKTOP_SECTIONS.map((s) => {
                const isActive = hoverKey === s.key;
                const routeActive = s.href
                  ? location.pathname === s.href || location.pathname.startsWith(s.href + "/")
                  : false;

                const content = (
                  <span
                    className={`relative px-3 py-2 text-[13.5px] font-medium rounded-full transition-colors ${
                      isActive || routeActive
                        ? "text-foreground bg-white/[0.08]"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                );

                return (
                  <div
                    key={s.key}
                    onMouseEnter={() => openMega(s.key)}
                    className="relative"
                  >
                    {s.href ? (
                      <Link to={s.href} onClick={() => setHoverKey(null)}>{content}</Link>
                    ) : (
                      <button type="button">{content}</button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right cluster */}
            <div className="hidden xl:flex items-center gap-2 shrink-0" onMouseEnter={closeMegaSoon}>
              <Button variant="ghost" size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="h-11 w-11 rounded-full text-foreground/70"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 min-h-11"><Link to="/claim-business">Claim your listing</Link></Button>
            </div>

            {/* Mobile cluster */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                <Search className="h-4 w-4 text-foreground" />
              </button>
              <a
                href="tel:+15189812248"
                aria-label="Call Capital District Nest"
                className="flex items-center justify-center w-9 h-9 rounded-full text-foreground/80 hover:text-foreground border border-white/15 bg-white/[0.04]"
              >
                <Phone className="h-4 w-4" strokeWidth={1.75} />
              </a>
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Desktop mega-menu panel */}
        <div
          className={`hidden xl:block absolute inset-x-0 top-full transition-all duration-300 ease-out ${
            active ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={() => active && openMega(active.key)}
          onMouseLeave={closeMegaSoon}
        >
          <div
            className="nest-mega-panel border-t border-white/[0.06]"
            style={{
              background: "rgba(11, 15, 25, 0.94)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
            }}
          >
            <div className="max-w-7xl mx-auto px-8 py-12">
              {active && (
                <div className="grid grid-cols-12 gap-10">
                  <div className={`${active.feature ? "col-span-8" : "col-span-12"} grid grid-cols-4 gap-8`}>
                    {active.columns.map((col) => (
                      <div key={col.title}>
                        <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-4">
                          {col.title}
                        </p>
                        <ul className="space-y-3">
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link
                                to={l.href}
                                onClick={() => setHoverKey(null)}
                                className="text-[18px] font-medium text-white/85 hover:text-white transition-colors tracking-[-0.01em]"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {active.feature && (
                    <Link
                      to={active.feature.href}
                      onClick={() => setHoverKey(null)}
                      className="col-span-4 group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 hover:border-[#5eead4]/40 transition-colors"
                    >
                      <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                        {active.feature.eyebrow}
                      </p>
                      <h3 className="mt-4 text-2xl font-semibold text-white tracking-[-0.02em] leading-tight">
                        {active.feature.title}
                      </h3>
                      <p className="mt-3 text-sm text-white/65 font-light leading-relaxed">
                        {active.feature.copy}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                        {active.feature.cta}
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <GlobalSearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile — full-screen iOS-style sheet with drill-down */}
      <div
        className={`nest-mobile-menu fixed inset-0 z-[1999] xl:hidden transition-transform duration-300 ease-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "rgba(11, 15, 25, 0.98)",
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
        }}
      >
        <div className="h-full flex flex-col pt-24 pb-10 px-6 overflow-y-auto">
          {/* Drill-down */}
          <div
            className={`transition-transform duration-300 ease-out ${
              mobileSection ? "-translate-x-full opacity-0 pointer-events-none absolute inset-x-6 top-24" : "translate-x-0 opacity-100"
            }`}
          >
            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-5">
              Explore
            </p>
            <ul className="space-y-1">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setMobileSection(s)}
                    className="w-full flex items-center justify-between py-4 border-b border-white/[0.08] text-left"
                  >
                    <span className="text-[22px] font-semibold text-white tracking-[-0.02em]">
                      {s.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-white/40" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3">
              <Link
                to="/for-businesses/apply"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-[#0B0F19] bg-[#5eead4]"
              >
                Get Featured
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/[0.04]"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Category detail */}
          <div
            className={`transition-transform duration-300 ease-out ${
              mobileSection ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none absolute inset-x-6 top-24"
            }`}
          >
            {mobileSection && (
              <>
                <button
                  onClick={() => setMobileSection(null)}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] mb-6"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <h2 className="text-[32px] font-semibold text-white tracking-[-0.03em] mb-8">
                  {mobileSection.label}
                </h2>
                {mobileSection.href && (
                  <Link
                    to={mobileSection.href}
                    onClick={() => setMobileOpen(false)}
                    className="block mb-6 text-[15px] font-semibold text-[#5eead4]"
                  >
                    Overview →
                  </Link>
                )}
                <div className="space-y-8">
                  {mobileSection.columns.map((col) => (
                    <div key={col.title}>
                      <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/50 mb-4">
                        {col.title}
                      </p>
                      <ul className="space-y-1">
                        {col.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              to={l.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-3 border-b border-white/[0.06] text-[18px] font-medium text-white/90"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function CleanHeader() {
  const {pathname}=useLocation();
  return isPublicPaletteRoute(pathname) ? <PublicNavigation/> : <LegacyCleanHeader/>;
}
