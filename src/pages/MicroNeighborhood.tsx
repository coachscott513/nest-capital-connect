import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Compass, Plus, Sparkles } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { findNeighborhood, getNeighborhoodsForTown } from "@/data/neighborhoods";

const TEAL_DARK = "#5eead4";

function track(event: string, payload: Record<string, unknown>) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

const MicroNeighborhood = () => {
  const { townSlug = "", neighborhoodSlug = "" } = useParams();
  const n = findNeighborhood(townSlug, neighborhoodSlug);

  useEffect(() => {
    if (!n) return;
    track("micro_neighborhood_view", {
      town_name: n.townName,
      town_slug: n.townSlug,
      neighborhood_name: n.name,
      neighborhood_slug: n.slug,
      source_page: "micro_neighborhood",
    });
  }, [n]);

  if (!n) {
    return <Navigate to={`/living-in/${townSlug}`} replace />;
  }

  const exploreBiz = `/local?town=${n.townSlug}&neighborhood=${n.slug}`;
  const exploreEvents = `/weekly?town=${n.townSlug}&neighborhood=${n.slug}`;
  const claim = `/claim-business?town=${n.townSlug}&neighborhood=${n.slug}`;
  // Canonical points to the /neighborhoods/:slug hub page; this /living-in/ path is an alias.
  const url = `https://www.capitaldistrictnest.com/neighborhoods/${n.slug}`;

  const title = `${n.name} ${n.townName}, NY | Capital District Nest`;
  const description = `Explore restaurants, taverns, cafés, shops, services, events, and local businesses on ${n.name} in ${n.townName}, NY.`;

  const others = getNeighborhoodsForTown(n.townSlug).filter((x) => x.slug !== n.slug).slice(0, 6);

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
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,25,0.7) 0%, rgba(11,15,25,0.85) 60%, #0B0F19 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 30%, rgba(94,234,212,0.14), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28">
            <nav className="mb-6 text-xs text-white/60 flex flex-wrap items-center gap-1.5">
              <Link to={`/living-in/${n.townSlug}`} className="hover:text-white transition">
                {n.townName}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">{n.name}</span>
            </nav>
            <p
              className="text-[11px] font-semibold tracking-[0.32em] uppercase mb-6"
              style={{ color: TEAL_DARK }}
            >
              {n.townName.toUpperCase()} MICRO-DISTRICT
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-[-0.04em] text-white leading-[1.02] max-w-4xl">
              Explore {n.name}.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 font-light max-w-3xl leading-relaxed">
              {n.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to={exploreBiz}
                onClick={() =>
                  track("micro_neighborhood_business_click", {
                    town_name: n.townName,
                    town_slug: n.townSlug,
                    neighborhood_name: n.name,
                    neighborhood_slug: n.slug,
                    source_page: "micro_neighborhood_hero",
                    destination_url: exploreBiz,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                Explore Businesses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={exploreEvents}
                onClick={() =>
                  track("micro_neighborhood_event_click", {
                    town_name: n.townName,
                    town_slug: n.townSlug,
                    neighborhood_name: n.name,
                    neighborhood_slug: n.slug,
                    source_page: "micro_neighborhood_hero",
                    destination_url: exploreEvents,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                View Events
              </Link>
              <Link
                to={claim}
                onClick={() =>
                  track("micro_neighborhood_claim_click", {
                    town_name: n.townName,
                    town_slug: n.townSlug,
                    neighborhood_name: n.name,
                    neighborhood_slug: n.slug,
                    source_page: "micro_neighborhood_hero",
                    destination_url: claim,
                  })
                }
                className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white px-2 py-2 transition"
              >
                <Plus className="w-4 h-4" /> Claim Your Spot
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {n.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] tracking-wide uppercase px-3 py-1.5 rounded-full border border-white/15 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SEO OVERVIEW */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2 max-w-3xl">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                About {n.name}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                What makes {n.name} a destination in {n.townName}.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light leading-relaxed">
                {n.description} This guide is hand-curated by Capital District Nest as part of our
                regional discovery layer. As more local businesses claim their profiles and submit
                events, this corridor will get richer over time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={exploreBiz}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                >
                  Explore Businesses <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={claim}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
                >
                  <Sparkles className="w-4 h-4" /> Request Featured Placement
                </Link>
              </div>
            </div>

            {others.length > 0 && (
              <aside className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-7">
                <p
                  className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-4"
                  style={{ color: TEAL_DARK }}
                >
                  More in {n.townName}
                </p>
                <ul className="divide-y divide-white/[0.06]">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        to={`/living-in/${o.townSlug}/${o.slug}`}
                        className="flex items-center justify-between gap-3 py-3 group"
                      >
                        <span className="flex items-center gap-3 text-white/85 group-hover:text-white transition">
                          <Compass className="w-4 h-4" style={{ color: TEAL_DARK }} />
                          {o.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MicroNeighborhood;
