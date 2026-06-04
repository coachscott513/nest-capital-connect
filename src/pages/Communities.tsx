import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  Plus,
  Search,
  CalendarPlus,
} from "lucide-react";
import MainLayout from "@/components/MainLayout";
import SEOHead from "@/components/SEOHead";
import {
  CAPITAL_DISTRICT_COUNTIES,
  type CDCounty as County,
  type CDTown as Town,
} from "@/data/capitalDistrictCounties";

/* =============================================================
   /communities — Apple-style Town Discovery Hub.
   Cinematic hero, featured town tiles, search, county sections,
   and business-owner CTA. Locked brand: dark onyx + teal.
   ============================================================= */

const COUNTIES = CAPITAL_DISTRICT_COUNTIES;
const TEAL = "#5eead4";

interface FeaturedTownTile {
  slug: string;
  name: string;
  county: string;
  hook: string;
  image: string;
}

const FEATURED_TOWNS: FeaturedTownTile[] = [
  {
    slug: "delmar",
    name: "Delmar",
    county: "Albany County",
    hook: "Bethlehem Central schools, walkable Four Corners, family-first.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "albany",
    name: "Albany",
    county: "Albany County",
    hook: "Capital city — Empire State Plaza, historic neighborhoods, urban energy.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "troy",
    name: "Troy",
    county: "Rensselaer County",
    hook: "Collar City — riverfront, RPI, brick-and-iron downtown revival.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "saratoga-springs",
    name: "Saratoga Springs",
    county: "Saratoga County",
    hook: "Race course, SPAC, Broadway — the region's destination town.",
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "schenectady",
    name: "Schenectady",
    county: "Schenectady County",
    hook: "Electric City — Stockade district, Proctors, GE legacy.",
    image:
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "clifton-park",
    name: "Clifton Park",
    county: "Saratoga County",
    hook: "Shenendehowa schools, suburban hub between Albany and Saratoga.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "niskayuna",
    name: "Niskayuna",
    county: "Schenectady County",
    hook: "Top-rated schools, established residential, Mohawk River frontage.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "colonie",
    name: "Colonie",
    county: "Albany County",
    hook: "Suburban Albany — retail corridors, parks, commuter sweet spot.",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1400&q=80",
  },
];

const track = (event: string, payload: Record<string, unknown> = {}) => {
  try {
    const w = window as unknown as {
      gtag?: (a: string, b: string, c: Record<string, unknown>) => void;
    };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch {
    /* noop */
  }
};

const Communities = () => {
  const [openCounty, setOpenCounty] = useState<string | null>(COUNTIES[0].name);
  const [query, setQuery] = useState("");
  const totalTowns = COUNTIES.reduce((a, c) => a + c.towns.length, 0);

  const filteredCounties = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTIES;
    return COUNTIES.map((c) => {
      const countyHit = c.name.toLowerCase().includes(q);
      const towns = c.towns.filter(
        (t) => countyHit || t.name.toLowerCase().includes(q)
      );
      return { ...c, towns };
    }).filter((c) => c.towns.length > 0);
  }, [query]);

  return (
    <>
      <SEOHead
        title="Capital District Communities | Town Discovery Hub"
        description={`Explore ${totalTowns}+ Capital District towns — restaurants, businesses, events, services, homes, and local life across Albany, Saratoga, Rensselaer, and Schenectady counties.`}
        canonical="https://www.capitaldistrictnest.com/communities"
      />

      <MainLayout>
        <div className="min-h-screen bg-background text-foreground">
          {/* ═══════════ 1. CINEMATIC HERO ═══════════ */}
          <section className="relative isolate overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 25%, rgba(94,234,212,0.12), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-semibold tracking-[0.32em] uppercase mb-6"
                style={{ color: TEAL }}
              >
                Towns
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-[-0.04em] leading-[1.02] max-w-4xl"
              >
                Explore the Capital District by town.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 max-w-2xl text-lg md:text-xl text-white/75 font-light leading-relaxed"
              >
                Discover restaurants, businesses, events, services, homes, and local resources
                across the region's {totalTowns} towns and neighborhoods.
              </motion.p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#town-search"
                  onClick={(e) => {
                    e.preventDefault();
                    track("communities_search_click", { source_location: "hero" });
                    document.getElementById("town-search")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                >
                  <Search className="w-4 h-4" /> Search Towns
                </a>
                <a
                  href="#all-towns"
                  onClick={(e) => {
                    e.preventDefault();
                    track("communities_view_all_click", { source_location: "hero" });
                    document.getElementById("all-towns")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
                >
                  View All Towns <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ═══════════ 2. FEATURED TOWN TILES ═══════════ */}
          <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-24">
            <div className="max-w-[1600px] mx-auto px-6 md:px-10">
              <div className="max-w-3xl mb-12">
                <p
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                  style={{ color: TEAL }}
                >
                  Featured Towns
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                  Eight towns to start with.
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/65 font-light">
                  The Capital District's most-searched towns — each with its own restaurants,
                  businesses, events, and homes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {FEATURED_TOWNS.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/living-in/${t.slug}`}
                    onClick={() =>
                      track("communities_featured_town_click", {
                        town_name: t.name,
                        town_slug: t.slug,
                        source_location: "featured_tiles",
                      })
                    }
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F1424] hover:border-white/20 transition aspect-[4/5]"
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-[1.04] transition duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11,15,25,0.2) 0%, rgba(11,15,25,0.85) 70%, rgba(11,15,25,0.96) 100%)",
                      }}
                      aria-hidden
                    />
                    <div className="relative h-full p-6 md:p-7 flex flex-col justify-end">
                      <p
                        className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-2"
                        style={{ color: TEAL }}
                      >
                        {t.county}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                        {t.name}
                      </h3>
                      <p className="mt-2 text-[13px] text-white/65 font-light leading-relaxed line-clamp-3">
                        {t.hook}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5eead4] group-hover:text-white transition">
                        Explore {t.name} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ═══════════ 3. TOWN SEARCH BAR ═══════════ */}
          <section
            id="town-search"
            className="relative bg-background border-t border-white/[0.06] py-16 md:py-20"
          >
            <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL }}
              >
                Find Your Town
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-white mb-7">
                Search by town, county, or neighborhood.
              </h2>
              <label className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/15 bg-white/[0.04] focus-within:border-[#5eead4]/50 transition">
                <Search className="w-5 h-5 text-[#5eead4] shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value.slice(0, 80))}
                  placeholder="Try Delmar, Saratoga, Rensselaer County…"
                  className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-xs text-white/55 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </label>
              {query.trim() && (
                <p className="mt-3 text-sm text-white/55">
                  {filteredCounties.reduce((a, c) => a + c.towns.length, 0)} matches
                </p>
              )}
            </div>
          </section>

          {/* ═══════════ 4. ALL TOWNS BY COUNTY ═══════════ */}
          <section
            id="all-towns"
            className="relative bg-background border-t border-white/[0.06] py-20 md:py-24"
          >
            <div className="max-w-[1600px] mx-auto px-6 md:px-10">
              <div className="max-w-3xl mb-12">
                <p
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                  style={{ color: TEAL }}
                >
                  Every Town. One Front Door.
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                  All {totalTowns} communities, by county.
                </h2>
              </div>

              {filteredCounties.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
                  <p className="text-white/70">No towns match "{query}".</p>
                </div>
              ) : (
                <>
                  {/* DESKTOP: 2-col county grid */}
                  <div className="hidden md:grid md:grid-cols-2 gap-x-10 gap-y-14">
                    {filteredCounties.map((c, idx) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <CountyHeader county={c} />
                        <ul className="divide-y divide-white/10 border-t border-b border-white/10">
                          {c.towns.map((t) => (
                            <TownRow key={t.slug} town={t} county={c.name} />
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  {/* MOBILE: accordion */}
                  <div className="md:hidden space-y-3">
                    {filteredCounties.map((c) => {
                      const isOpen = openCounty === c.name || !!query.trim();
                      return (
                        <div
                          key={c.name}
                          className="rounded-2xl border border-white/10 overflow-hidden"
                          style={{ background: "#1E2230" }}
                        >
                          <button
                            onClick={() =>
                              setOpenCounty(isOpen ? null : c.name)
                            }
                            className="w-full flex items-center justify-between px-5 py-4 text-left"
                          >
                            <div>
                              <div className="text-base font-semibold text-white">
                                {c.name}
                              </div>
                              <div className="text-[11px] text-white/55 mt-0.5">
                                {c.landmark}
                              </div>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-white/60 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <ul className="divide-y divide-white/10 border-t border-white/10">
                              {c.towns.map((t) => (
                                <TownRow key={t.slug} town={t} county={c.name} />
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ═══════════ 5. BUSINESS OWNER CTA ═══════════ */}
          <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
            <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL }}
              >
                For Local Businesses
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Own a business in one of these towns?
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/70 font-light leading-relaxed">
                Claim your profile, add your business, or submit local events to Capital District
                Nest. Concierge onboarding — a real person from our team will help.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/claim-business"
                  onClick={() =>
                    track("communities_claim_business_click", {
                      source_location: "footer_cta",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                >
                  <Plus className="w-4 h-4" /> Add Your Business
                </Link>
                <Link
                  to="/submit-event"
                  onClick={() =>
                    track("communities_submit_event_click", {
                      source_location: "footer_cta",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] text-white px-6 py-3 text-sm font-semibold hover:bg-white/[0.08] transition"
                >
                  <CalendarPlus className="w-4 h-4" /> Submit Event
                </Link>
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
};

const CountyHeader = ({ county }: { county: County }) => (
  <div className="mb-4 flex items-start justify-between gap-4">
    <div>
      <p
        className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-2"
        style={{ color: TEAL }}
      >
        County
      </p>
      <h3 className="text-2xl font-semibold tracking-tight text-white">{county.name}</h3>
      <p className="text-sm text-white/55 mt-1 flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5" />
        {county.landmark}
      </p>
    </div>
    <span className="text-xs text-white/45 mt-2">{county.towns.length} towns</span>
  </div>
);

const TownRow = ({ town, county }: { town: Town; county: string }) => (
  <li>
    <Link
      to={`/living-in/${town.slug}`}
      onClick={() =>
        track("communities_town_row_click", {
          town_name: town.name,
          town_slug: town.slug,
          county,
          source_location: "all_towns_list",
        })
      }
      className="group flex items-center justify-between px-4 md:px-2 py-4 hover:bg-white/[0.04] transition-colors"
    >
      <span className="text-[15px] md:text-base font-semibold text-white">{town.name}</span>
      <div className="flex items-center gap-4">
        <span className="text-xs md:text-sm text-white/55 tabular-nums">
          Median {town.median}
        </span>
        <ChevronRight
          className="w-4 h-4 transition-all group-hover:translate-x-0.5"
          style={{ color: "rgba(94,234,212,0.7)" }}
        />
      </div>
    </Link>
  </li>
);

export default Communities;
