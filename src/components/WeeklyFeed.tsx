import { Home, Coffee, Calendar, TrendingDown, ArrowRight } from "lucide-react";
import { weeklyFeed, type WeeklyFeedType } from "@/data/weeklyFeed";

interface Props {
  /** "region" for homepage, or a town slug like "delmar". */
  scope: string;
  title?: string;
  eyebrow?: string;
  sub?: string;
  limit?: number;
  compact?: boolean;
}

const ICONS: Record<WeeklyFeedType, typeof Home> = {
  real_estate: Home,
  business: Coffee,
  event: Calendar,
  market: TrendingDown,
};

const LABELS: Record<WeeklyFeedType, string> = {
  real_estate: "Real Estate",
  business: "Local Business",
  event: "Event",
  market: "Market Shift",
};

const WeeklyFeed = ({
  scope,
  title = "What's Happening This Week",
  eyebrow = "The Weekly Feed",
  sub = "Real estate, local businesses, and community updates — refreshed every Friday.",
  limit = 6,
  compact = false,
}: Props) => {
  const isRegion = scope === "region";
  // Region page: show region + cross-town items.
  // Town page: ONLY items explicitly scoped to that town (no Delmar bleed via "all").
  let items = weeklyFeed.filter((item) =>
    isRegion ? item.scope === "region" || item.scope === "all" : item.scope === scope,
  );

  // Town fallback: if no curated items for this town yet, render neutral
  // town-named placeholders so the section still feels local (never empty).
  if (items.length === 0 && !isRegion) {
    const townName = scope
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
    items = [
      {
        title: `New listings across ${townName} this week`,
        description: `Fresh inventory and recent activity from across ${townName} and nearby neighborhoods.`,
        type: "real_estate",
        date: "Updated weekly",
        scope,
      },
      {
        title: `${townName} market snapshot`,
        description: `Pricing, days on market, and demand trends for ${townName}.`,
        type: "market",
        date: "Updated weekly",
        scope,
      },
      {
        title: `Local businesses in ${townName}`,
        description: `Restaurants, shops, and services worth knowing about in ${townName}.`,
        type: "business",
        date: "Updated weekly",
        scope,
      },
      {
        title: `What's happening in ${townName}`,
        description: `Community events and seasonal happenings around ${townName}.`,
        type: "event",
        date: "Updated weekly",
        scope,
      },
    ];
  }

  if (items.length === 0) return null;

  return (
    <section
      id="weekly-feed"
      className={
        compact
          ? "pt-6 md:pt-8 pb-16 md:pb-20 px-6 md:px-10 bg-[#F9FAFB] border-b border-[#1d1d1f]/[0.06]"
          : "py-28 md:py-40 px-6 md:px-10 bg-[#F9FAFB] border-y border-[#1d1d1f]/[0.06]"
      }
    >
      <div className="max-w-6xl mx-auto">
        <div className={compact ? "mb-10 max-w-3xl" : "mb-16 max-w-3xl"}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0d6e66]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d6e66] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d6e66] animate-pulse" />
            Updated This Week
          </span>
          <p className="eyebrow-apple text-[#0d6e66] mb-4">{eyebrow}</p>
          <h2 className={compact
            ? "text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]"
            : "text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.02]"
          }>
            {title}
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#1d1d1f]/65 font-light leading-relaxed">
            {sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {items.slice(0, limit).map((item, i) => {
            const Icon = ICONS[item.type];
            return (
              <article
                key={i}
                className="card-lift group relative bg-white border border-[#1d1d1f]/8 rounded-2xl p-8 md:p-10 transition-all"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                {i < 2 && (
                  <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-[#0d6e66] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    This Week
                  </span>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d6e66]/8">
                    <Icon className="w-5 h-5 text-[#0d6e66]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#0d6e66]">
                    {LABELS[item.type]}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-[#1d1d1f]/65 font-light leading-relaxed">
                  {item.description}
                </p>
                <p className="mt-6 text-xs text-[#1d1d1f]/45 font-medium tracking-wide">
                  {item.date}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#weekly-newsletter"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Get New Listings + Weekly Updates <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeeklyFeed;

export const WeeklyNewsletterCTA = () => (
  <section id="weekly-newsletter" className="py-24 md:py-32 px-6 md:px-10 bg-[#0e0f12]">
    <div className="max-w-2xl mx-auto text-center">
      <p className="eyebrow-apple text-[#5eead4] mb-4">Weekly Newsletter</p>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-white leading-[1.08]">
        Get the Capital District Weekly.
      </h2>
      <p className="mt-5 text-lg text-white/65 font-light">
        Listings. Market shifts. Local updates. Delivered every Sunday.
      </p>
      <form
        className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          required
          placeholder="you@email.com"
          className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#5eead4] focus:bg-white/15 transition"
        />
        <button
          type="submit"
          className="lift-hover inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white text-[#0e0f12] text-sm font-semibold hover:bg-white/95 transition"
        >
          Subscribe <ArrowRight className="w-4 h-4" />
        </button>
      </form>
      <p className="mt-4 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
    </div>
  </section>
);
