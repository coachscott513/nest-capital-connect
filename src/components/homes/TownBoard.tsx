import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { HOMES_TOWNS } from "@/data/homesTowns";

type Props = {
  /** Optional counts keyed by town slug. Falls back to "Listings being added". */
  counts?: Record<string, { listings?: number; rentals?: number; agents?: number }>;
};

const TownBoard = ({ counts = {} }: Props) => {
  return (
    <section id="town-listings" className="px-[5%] py-20 bg-background border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow-apple text-[#5eead4] mb-3">TOWN LISTING BOARD</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Browse property links by town.
          </h2>
          <p className="body-apple-dark max-w-2xl mx-auto">
            Start with a town to see active property links, new listings,
            rentals, agents, and open houses.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {HOMES_TOWNS.map((t) => {
            const c = counts[t.slug] || {};
            const hasData =
              (c.listings ?? 0) + (c.rentals ?? 0) + (c.agents ?? 0) > 0;
            return (
              <Link
                key={t.slug}
                to={`/homes/listings/${t.slug}`}
                className="group block rounded-2xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/50 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#5eead4]" />
                    <span className="text-xs text-white/55">{t.county}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] transition" />
                </div>
                <div className="text-lg font-semibold text-white mb-2">{t.name}</div>
                {hasData ? (
                  <div className="text-xs text-white/65 space-y-0.5">
                    {c.listings ? <div>{c.listings} active listings</div> : null}
                    {c.rentals ? <div>{c.rentals} rentals</div> : null}
                    {c.agents ? <div>{c.agents} listing agents</div> : null}
                  </div>
                ) : (
                  <div className="text-xs text-white/45">Listings being added</div>
                )}
                <div className="mt-4 text-xs font-semibold text-[#5eead4]">
                  View {t.name} Listings →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TownBoard;
