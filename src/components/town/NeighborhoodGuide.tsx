import { Link } from "react-router-dom";
import { ArrowRight, Compass, Plus, Sparkles } from "lucide-react";
import { getNeighborhoodsForTown, type MicroNeighborhood } from "@/data/neighborhoods";

const TEAL_DARK = "#5eead4";

function track(event: string, payload: Record<string, unknown>) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

interface Props {
  townSlug: string;
  townName: string;
}

const NeighborhoodGuide = ({ townSlug, townName }: Props) => {
  const neighborhoods = getNeighborhoodsForTown(townSlug);
  const hasData = neighborhoods.length > 0;

  return (
    <section
      className="relative bg-background border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="neighborhood-guide-heading"
      onMouseEnter={() =>
        track("neighborhood_guide_view", { town_name: townName, town_slug: townSlug })
      }
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(94,234,212,0.08), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p
            className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: TEAL_DARK }}
          >
            Neighborhood Guide
          </p>
          <h2
            id="neighborhood-guide-heading"
            className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white"
          >
            Discover your neighborhood.
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/65 font-light">
            Explore the streets, blocks, business districts, restaurants, services, events, and
            local favorites that give {townName} its identity.
          </p>
        </div>

        {hasData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {neighborhoods.map((n) => (
              <NeighborhoodCard key={n.slug} n={n} />
            ))}
          </div>
        ) : (
          <EmptyState townSlug={townSlug} townName={townName} />
        )}

        {/* Business owner CTA */}
        <div className="mt-14 md:mt-20 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: TEAL_DARK }}
              >
                For Business Owners
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                Own a business in one of these neighborhoods?
              </h3>
              <p className="mt-3 text-white/65 font-light">
                Claim your profile, add photos, submit events, and request featured placement
                inside your local neighborhood guide.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/claim-business?town=${townSlug}`}
                onClick={() =>
                  track("micro_neighborhood_claim_click", {
                    town_name: townName,
                    town_slug: townSlug,
                    source_page: "neighborhood_guide",
                    destination_url: `/claim-business?town=${townSlug}`,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                <Plus className="w-4 h-4" /> Claim Your Business
              </Link>
              <Link
                to={`/claim-business?town=${townSlug}&tier=featured`}
                onClick={() =>
                  track("micro_neighborhood_claim_click", {
                    town_name: townName,
                    town_slug: townSlug,
                    source_page: "neighborhood_guide_featured",
                    destination_url: `/claim-business?town=${townSlug}&tier=featured`,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                <Sparkles className="w-4 h-4" /> Request Featured Placement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NeighborhoodCard = ({ n }: { n: MicroNeighborhood }) => {
  const href = `/living-in/${n.townSlug}/${n.slug}`;
  return (
    <Link
      to={href}
      onClick={() =>
        track("neighborhood_card_click", {
          town_name: n.townName,
          town_slug: n.townSlug,
          neighborhood_name: n.name,
          neighborhood_slug: n.slug,
          source_page: "neighborhood_guide",
          destination_url: href,
        })
      }
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-7 hover:border-[#5eead4]/40 hover:bg-white/[0.05] transition-all"
    >
      {n.imageUrl && (
        <div
          className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity"
          style={{
            backgroundImage: `url(${n.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,15,25,0.2) 0%, rgba(11,15,25,0.85) 100%)",
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/[0.04]">
            <Compass className="w-4 h-4" style={{ color: TEAL_DARK }} />
          </div>
          <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition" />
        </div>
        <p
          className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-2"
          style={{ color: TEAL_DARK }}
        >
          {n.townName}
        </p>
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white mb-2">
          {n.name}
        </h3>
        <p className="text-sm text-white/65 font-light leading-relaxed mb-5 line-clamp-3">
          {n.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {n.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-wide uppercase px-2 py-1 rounded-full border border-white/12 text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:text-[#5eead4] transition">
          Explore {n.name} <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

const EmptyState = ({ townSlug, townName }: { townSlug: string; townName: string }) => (
  <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-10 md:p-14 text-center">
    <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
      Neighborhood guides are being added for {townName}.
    </h3>
    <p className="mt-4 text-white/65 font-light max-w-2xl mx-auto">
      Capital District Nest is mapping local streets, business districts, and neighborhood
      corridors across the region.
    </p>
    <div className="mt-7 flex flex-wrap justify-center gap-3">
      <Link
        to={`/submit-event?intent=neighborhood-suggestion&town=${townSlug}`}
        className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
      >
        Suggest a Neighborhood
      </Link>
      <Link
        to={`/claim-business?town=${townSlug}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
      >
        Add Your Business
      </Link>
    </div>
  </div>
);

export default NeighborhoodGuide;
