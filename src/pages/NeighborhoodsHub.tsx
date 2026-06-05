import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, MapPin, Compass, Plus, Sparkles } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  COUNTIES,
  getAllNeighborhoods,
  getNeighborhoodsByCounty,
  type MicroNeighborhood,
} from "@/data/neighborhoods";

const TEAL = "#5eead4";

function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

const NeighborhoodsHub = () => {
  const [params, setParams] = useSearchParams();
  const countyParam = params.get("county") ?? "all";
  const [county, setCounty] = useState(countyParam);

  useEffect(() => {
    setCounty(countyParam);
  }, [countyParam]);

  useEffect(() => {
    track("neighborhood_hub_view", { county });
  }, [county]);

  const list: MicroNeighborhood[] = useMemo(() => {
    if (county === "all") return getAllNeighborhoods();
    return getNeighborhoodsByCounty(county);
  }, [county]);

  const setCountyFilter = (slug: string) => {
    setCounty(slug);
    const next = new URLSearchParams(params);
    if (slug === "all") next.delete("county");
    else next.set("county", slug);
    setParams(next, { replace: true });
  };

  const title = "Capital District Neighborhood Explorer | Capital District Nest";
  const description =
    "Explore Capital District neighborhoods, streets, downtowns, business corridors, local businesses, events, restaurants, services, and town guides.";
  const url = "https://www.capitaldistrictnest.com/neighborhoods";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>

      <MainHeader />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 65% at 50% 25%, rgba(94,234,212,0.14), transparent 70%), radial-gradient(45% 60% at 10% 90%, rgba(13,110,102,0.18), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-16 md:pb-20">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.32em] uppercase" style={{ color: TEAL }}>
              <Compass className="w-3 h-3" /> Neighborhoods
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-[-0.04em] leading-[1.02] text-white max-w-5xl">
              Explore the Capital District by neighborhood, street, and district.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 font-light max-w-3xl leading-relaxed">
              From Lark Street and Downtown Troy to Broadway Saratoga and Four Corners Delmar, discover
              the local corridors that shape the region.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#featured-neighborhoods"
                onClick={() => track("neighborhood_nav_click", { source_page: "hub_hero", destination_url: "#featured-neighborhoods" })}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                View Featured Neighborhoods <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Browse Towns
              </Link>
              <Link
                to="/claim-business"
                onClick={() => track("micro_neighborhood_claim_click", { source_page: "hub_hero", destination_url: "/claim-business" })}
                className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white px-2 py-2 transition"
              >
                <Plus className="w-4 h-4" /> Add Your Business
              </Link>
            </div>
          </div>
        </section>

        {/* County selector */}
        <section className="relative border-t border-white/[0.06] bg-background">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCountyFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  county === "all"
                    ? "bg-[#5eead4] text-[#0B0F19] border-[#5eead4]"
                    : "bg-white/[0.04] text-white/75 border-white/15 hover:bg-white/10"
                }`}
              >
                All
              </button>
              {COUNTIES.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCountyFilter(c.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    county === c.slug
                      ? "bg-[#5eead4] text-[#0B0F19] border-[#5eead4]"
                      : "bg-white/[0.04] text-white/75 border-white/15 hover:bg-white/10"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhood grid */}
        <section id="featured-neighborhoods" className="relative border-t border-white/[0.06] bg-background py-16 md:py-24">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            {list.length === 0 ? (
              <p className="text-white/60">No neighborhoods configured for this county yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {list.map((n) => (
                  <Link
                    key={`${n.townSlug}-${n.slug}`}
                    to={`/neighborhoods/${n.slug}`}
                    onClick={() =>
                      track("neighborhood_card_click", {
                        town_name: n.townName,
                        town_slug: n.townSlug,
                        neighborhood_name: n.name,
                        neighborhood_slug: n.slug,
                        source_page: "neighborhoods_hub",
                        destination_url: `/neighborhoods/${n.slug}`,
                      })
                    }
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#5eead4]/40 transition p-7 min-h-[260px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/[0.04]">
                          <MapPin className="w-4 h-4" style={{ color: TEAL }} />
                        </span>
                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition" />
                      </div>
                      <p className="text-[10px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
                        {n.townName} · {n.county}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">{n.name}</h3>
                      <p className="mt-3 text-sm text-white/65 font-light leading-relaxed line-clamp-3">{n.description}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {n.tags.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] tracking-wide uppercase px-2 py-1 rounded-full border border-white/12 text-white/65">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTAs */}
        <section className="relative border-t border-white/[0.06] bg-background py-16 md:py-24">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: TEAL }}>
                For Business Owners
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                Own a business in one of these neighborhoods?
              </h3>
              <p className="mt-3 text-white/65 font-light">
                Claim your profile, submit events, add photos, and request featured placement inside a
                local neighborhood guide.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/claim-business"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                >
                  <Plus className="w-4 h-4" /> Claim Your Business
                </Link>
                <Link
                  to="/claim-business?tier=featured"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
                >
                  <Sparkles className="w-4 h-4" /> Request Featured Placement
                </Link>
                <Link
                  to="/submit-event"
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white px-2 py-3 transition"
                >
                  Submit Event
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: TEAL }}>
                Suggest a Neighborhood
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                Want to see your street or district added?
              </h3>
              <p className="mt-3 text-white/65 font-light">
                Tell us which local corridor, downtown, village center, or business district should be
                included next.
              </p>
              <div className="mt-6">
                <Link
                  to="/submit-event?intent=neighborhood-suggestion"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                >
                  Suggest a Neighborhood <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NeighborhoodsHub;
