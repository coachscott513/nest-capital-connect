import { Link } from "react-router-dom";
import { Home, Coffee, Calendar, TrendingDown, ArrowRight, Plus, Sparkles } from "lucide-react";
import { weeklyFeed, type WeeklyFeedType, type WeeklyFeedItem } from "@/data/weeklyFeed";

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
  eyebrow = "The Weekly Pulse",
  sub = "Events, openings, market shifts, and community moments — refreshed every Friday across the Capital District.",
  limit = 8,
  compact = false,
}: Props) => {
  const isRegion = scope === "region";

  // Region page: show region + cross-town items.
  // Town page: ONLY items explicitly scoped to that town (no cross-town bleed).
  let items: WeeklyFeedItem[] = weeklyFeed.filter((item) =>
    isRegion ? item.scope === "region" || item.scope === "all" : item.scope === scope,
  );

  // Town fallback so the section is never empty.
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
        town: townName,
      },
      {
        title: `${townName} market snapshot`,
        description: `Pricing, days on market, and demand trends for ${townName}.`,
        type: "market",
        date: "Updated weekly",
        scope,
        town: townName,
      },
      {
        title: `Local businesses in ${townName}`,
        description: `Restaurants, shops, and services worth knowing about in ${townName}.`,
        type: "business",
        date: "Updated weekly",
        scope,
        town: townName,
      },
      {
        title: `What's happening in ${townName}`,
        description: `Community events and seasonal happenings around ${townName}.`,
        type: "event",
        date: "Updated weekly",
        scope,
        town: townName,
      },
    ];
  }

  if (items.length === 0) return null;

  // Editorial hero = first item flagged featured, else first item in list.
  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i !== featured).slice(0, limit - 1);

  const FeaturedIcon = ICONS[featured.type];

  return (
    <section
      id="weekly-feed"
      className={
        compact
          ? "pt-6 md:pt-8 pb-16 md:pb-20 px-6 md:px-10 bg-[#0B0F19] border-b border-[#2D3748]"
          : "py-28 md:py-40 px-6 md:px-10 bg-[#0B0F19] border-y border-[#2D3748]"
      }
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={compact ? "mb-10 max-w-3xl" : "mb-16 max-w-3xl"}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0d6e66]/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5eead4] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
            Updated This Week
          </span>
          <p className="eyebrow-apple text-[#5eead4] mb-4">{eyebrow}</p>
          <h2
            className={
              compact
                ? "text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-white leading-[1.05]"
                : "text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-white leading-[1.02]"
            }
          >
            {title}
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/60 font-light leading-relaxed">
            {sub}
          </p>
        </div>

        {/* Editorial hero (left) + scrollable rail (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT — Editorial hero */}
          <article className="lg:col-span-7 group relative overflow-hidden rounded-3xl bg-[#1E2230] border border-[#2D3748] hover:border-[#0d6e66]/50 transition-all">
            {featured.image && (
              <div className="relative aspect-[16/10] lg:aspect-[16/11] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
                <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#0d6e66] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  <Sparkles className="w-3 h-3" /> Featured This Week
                </span>
              </div>
            )}
            <div className="p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0d6e66]/20">
                  <FeaturedIcon className="w-4.5 h-4.5 text-[#5eead4]" strokeWidth={1.75} />
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#5eead4]">
                  {LABELS[featured.type]}
                </span>
                {featured.town && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/60">
                      {featured.town}
                    </span>
                  </>
                )}
              </div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.025em] leading-[1.08]">
                {featured.title}
              </h3>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light leading-relaxed">
                {featured.description}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <span className="text-xs text-white/40 font-medium tracking-wide">
                  {featured.date}
                </span>
                {featured.cta && (
                  <a
                    href={featured.cta.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4] hover:text-white transition"
                  >
                    {featured.cta.label} <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* RIGHT — Scrollable rail */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/50">
                This Week's Pulse
              </span>
              <span className="text-[11px] text-white/40">{rest.length} updates</span>
            </div>
            <div
              className="flex flex-col gap-3 lg:max-h-[640px] lg:overflow-y-auto pr-2 -mr-2"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#2D3748 transparent" }}
            >
              {rest.map((item, i) => {
                const Icon = ICONS[item.type];
                return (
                  <article
                    key={i}
                    className="card-lift group relative bg-[#1E2230] border border-[#2D3748] rounded-2xl p-5 md:p-6 transition-all hover:border-[#0d6e66]/50"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#0d6e66]/20">
                        <Icon className="w-4.5 h-4.5 text-[#5eead4]" strokeWidth={1.75} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#5eead4]">
                            {LABELS[item.type]}
                          </span>
                          {item.town && (
                            <>
                              <span className="text-white/25 text-[10px]">·</span>
                              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/50">
                                {item.town}
                              </span>
                            </>
                          )}
                        </div>
                        <h4 className="text-base md:text-lg font-semibold text-white tracking-tight leading-snug">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-sm text-white/55 font-light leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                        <p className="mt-2.5 text-[11px] text-white/35 font-medium tracking-wide">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Community participation rail */}
        <div className="mt-14 md:mt-16 rounded-3xl bg-gradient-to-br from-[#1E2230] to-[#161A26] border border-[#2D3748] p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center">
            <div className="md:col-span-1">
              <p className="eyebrow-apple text-[#5eead4] mb-3">Community Infrastructure</p>
              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-[-0.02em] leading-tight">
                Put your event or business special on the weekly pulse.
              </h3>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/contact?intent=add-event"
                className="group flex items-center justify-between gap-4 rounded-2xl bg-[#0B0F19] border border-[#2D3748] px-5 py-5 hover:border-[#5eead4]/60 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d6e66]/25 flex-shrink-0">
                    <Plus className="w-5 h-5 text-[#5eead4]" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Add Your Event</p>
                    <p className="text-xs text-white/50">
                      Concerts, openings, charity, sports, kids
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
              </Link>
              <Link
                to="/contact?intent=promote-special"
                className="group flex items-center justify-between gap-4 rounded-2xl bg-[#0B0F19] border border-[#2D3748] px-5 py-5 hover:border-[#5eead4]/60 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d6e66]/25 flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-[#5eead4]" strokeWidth={2} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Promote a Business Special</p>
                    <p className="text-xs text-white/50">
                      Happy hour, brunch, grand opening, seminars
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter pill */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#weekly-newsletter"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Get the Capital District Weekly <ArrowRight className="w-4 h-4" />
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
