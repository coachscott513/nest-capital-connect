import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Compass, Sparkles } from "lucide-react";
import { COUNTIES, getFeaturedNeighborhoods } from "@/data/neighborhoods";
import RegionalDiscoveryMap from "@/components/maps/RegionalDiscoveryMap";

const TEAL = "#5eead4";

function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}


const FEATURED = getFeaturedNeighborhoods();

const NeighborhoodExplorer = () => {


  return (
    <section
      id="neighborhood-explorer"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]"
      onMouseEnter={() => track("homepage_neighborhood_explorer_view")}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 30%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 10% 90%, rgba(13,110,102,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-32">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: TEAL }}>
            <Compass className="w-3 h-3" /> Neighborhood Explorer
          </p>
          <h2 className="mt-5 text-[2.25rem] sm:text-5xl md:text-[4.25rem] font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            Discover the Capital District,{" "}
            <span className="text-[#5eead4]">neighborhood by neighborhood.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/70 font-light leading-relaxed">
            Explore towns, streets, business corridors, restaurants, events, services, and local favorites
            through an interactive local discovery map — from Lark Street to Broadway Saratoga to Downtown Troy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/neighborhoods"
              onClick={() => track("neighborhood_nav_click", { source_page: "homepage_explorer_primary", destination_url: "/neighborhoods" })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
            >
              Explore Neighborhoods <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/neighborhoods/lark-street"
              onClick={() => track("neighborhood_card_click", { neighborhood_slug: "lark-street", source_page: "homepage_explorer_lark_cta", destination_url: "/neighborhoods/lark-street" })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.12] transition"
            >
              Start with Lark Street
            </Link>
            <Link
              to="/claim-business"
              onClick={() => track("micro_neighborhood_claim_click", { source_page: "homepage_explorer", destination_url: "/claim-business" })}
              className="inline-flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white px-2 py-3 transition"
            >
              <Sparkles className="w-4 h-4" /> Add Your Business
            </Link>
          </div>
        </div>

        {/* Stylized interactive map */}
        <div className="mt-14 md:mt-20 grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />
            {/* Teal glow halo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(40% 45% at 45% 60%, rgba(94,234,212,0.12), transparent 70%)" }}
              aria-hidden
            />

            {/* Connecting lines between counties */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {[
                ["warren", "saratoga"],
                ["saratoga", "schenectady"],
                ["saratoga", "rensselaer"],
                ["schenectady", "albany"],
                ["albany", "rensselaer"],
              ].map(([a, b]) => {
                const pa = COUNTY_POS[a];
                const pb = COUNTY_POS[b];
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                    stroke="rgba(94,234,212,0.25)"
                    strokeWidth="0.25"
                    strokeDasharray="0.6 0.8"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {/* County pins */}
            {COUNTIES.map((c) => {
              const pos = COUNTY_POS[c.slug];
              if (!pos) return null;
              const isHover = hovered === c.slug;
              return (
                <Link
                  key={c.slug}
                  to={`/neighborhoods?county=${c.slug}`}
                  onMouseEnter={() => setHovered(c.slug)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() =>
                    track("homepage_neighborhood_map_click", {
                      county: c.slug,
                      source_page: "homepage_explorer_map",
                      destination_url: `/neighborhoods?county=${c.slug}`,
                    })
                  }
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <span className="relative flex items-center justify-center">
                    <span className={`absolute inline-flex h-10 w-10 rounded-full ${isHover ? "bg-[#5eead4]/40" : "bg-[#5eead4]/20"} animate-ping opacity-70`} />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5eead4] shadow-[0_0_18px_rgba(94,234,212,0.8)]" />
                  </span>
                  <span className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-[0.18em] uppercase transition ${isHover ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                    {c.name.replace(" County", "")}
                  </span>
                </Link>
              );
            })}

            {/* Hover tooltip card */}
            {hovered && (() => {
              const c = COUNTIES.find((x) => x.slug === hovered)!;
              return (
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-sm rounded-2xl border border-white/[0.10] bg-[#0B0F19]/95 backdrop-blur p-5 shadow-2xl">
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>{c.name}</p>
                  <p className="mt-2 text-sm text-white/80 font-light">{c.towns.slice(0, 5).join(" · ")}</p>
                  <p className="mt-3 text-xs text-white/55">
                    Featured: <span className="text-white/80">{c.featured.slice(0, 3).join(", ")}</span>
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#5eead4]">
                    Explore {c.name} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              );
            })()}
          </div>

          {/* County list (mobile-friendly) */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/55 mb-4">By County</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {COUNTIES.map((c) => (
                <Link
                  key={c.slug}
                  to={`/neighborhoods?county=${c.slug}`}
                  onClick={() => track("homepage_neighborhood_map_click", { county: c.slug, source_page: "homepage_explorer_list", destination_url: `/neighborhoods?county=${c.slug}` })}
                  onMouseEnter={() => setHovered(c.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#5eead4]/40 px-5 py-4 transition"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    <p className="mt-1 text-xs text-white/55 line-clamp-1">{c.featured.slice(0, 3).join(" · ")}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured neighborhood rail */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: TEAL }}>Start exploring</p>
              <h3 className="mt-3 text-2xl md:text-4xl font-semibold tracking-[-0.03em] text-white">Featured neighborhoods.</h3>
            </div>
            <Link
              to="/neighborhoods"
              onClick={() => track("neighborhood_nav_click", { source_page: "homepage_explorer_rail", destination_url: "/neighborhoods" })}
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-white/75 hover:text-white transition"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map((n) => (
              <Link
                key={n.slug}
                to={`/neighborhoods/${n.slug}`}
                onClick={() =>
                  track("neighborhood_card_click", {
                    town_name: n.townName,
                    town_slug: n.townSlug,
                    neighborhood_name: n.name,
                    neighborhood_slug: n.slug,
                    source_page: "homepage_explorer_featured",
                    destination_url: `/neighborhoods/${n.slug}`,
                  })
                }
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#5eead4]/40 transition p-7 min-h-[260px] flex flex-col justify-between"
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "radial-gradient(50% 60% at 30% 0%, rgba(94,234,212,0.10), transparent 70%)" }}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/[0.04]">
                      <MapPin className="w-4 h-4" style={{ color: TEAL }} />
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
                    {n.townName} · {n.county}
                  </p>
                  <h4 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">{n.name}</h4>
                  <p className="mt-3 text-sm text-white/65 font-light leading-relaxed line-clamp-3">
                    {n.description}
                  </p>
                </div>
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {n.tags.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] tracking-wide uppercase px-2 py-1 rounded-full border border-white/12 text-white/65">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="md:hidden mt-6">
            <Link
              to="/neighborhoods"
              onClick={() => track("neighborhood_nav_click", { source_page: "homepage_explorer_rail_mobile", destination_url: "/neighborhoods" })}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#5eead4]"
            >
              View all neighborhoods <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodExplorer;
