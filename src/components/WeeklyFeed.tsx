import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Coffee,
  Calendar,
  TrendingDown,
  ArrowRight,
  Plus,
  Sparkles,
  Music,
  Trophy,
  UtensilsCrossed,
  Building2,
  Users,
  Briefcase,
  MapPin,
  Clock,
  Flame,
  Newspaper,
  ExternalLink,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import { weeklyFeed, type WeeklyFeedType, type WeeklyFeedItem } from "@/data/weeklyFeed";
import LocalVideoModal, { isTrustedEmbedUrl } from "./LocalVideoModal";

interface Props {
  /** "region" for homepage, or a town slug like "delmar". */
  scope: string;
  title?: string;
  eyebrow?: string;
  sub?: string;
  limit?: number;
  compact?: boolean;
}

const ICONS: Record<WeeklyFeedType, LucideIcon> = {
  real_estate: Home,
  business: Coffee,
  event: Calendar,
  market: TrendingDown,
  music: Music,
  sports: Trophy,
  dining: UtensilsCrossed,
  development: Building2,
  family: Users,
  networking: Briefcase,
  news: Newspaper,
};

const LABELS: Record<WeeklyFeedType, string> = {
  real_estate: "Real Estate",
  business: "Local Business",
  event: "Event",
  market: "Market Shift",
  music: "Music",
  sports: "Sports",
  dining: "Food & Drink",
  development: "Development",
  family: "Family",
  networking: "Networking",
  news: "Local News",
};

type FilterKey =
  | "all"
  | "events"
  | "dining"
  | "sports"
  | "real_estate"
  | "development"
  | "music"
  | "family"
  | "networking";

const FILTERS: { key: FilterKey; label: string; match: (t: WeeklyFeedType) => boolean }[] = [
  { key: "all", label: "All", match: () => true },
  { key: "events", label: "Events", match: (t) => t === "event" },
  { key: "dining", label: "Dining", match: (t) => t === "dining" },
  { key: "sports", label: "Sports", match: (t) => t === "sports" },
  { key: "real_estate", label: "Real Estate", match: (t) => t === "real_estate" || t === "market" },
  { key: "development", label: "Development", match: (t) => t === "development" },
  { key: "music", label: "Music", match: (t) => t === "music" },
  { key: "family", label: "Family", match: (t) => t === "family" },
  { key: "networking", label: "Networking", match: (t) => t === "networking" },
];

const WeeklyFeed = ({
  scope,
  title = "What's Happening This Week",
  eyebrow = "The Weekly Pulse",
  sub = "Events, openings, market shifts, and community moments — refreshed every Friday across the Capital District.",
  limit = 24,
  compact = false,
}: Props) => {
  const isRegion = scope === "region";
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeVideo, setActiveVideo] = useState<WeeklyFeedItem | null>(null);

  const hasPlayableVideo = (i: WeeklyFeedItem) =>
    !!(i.has_video && i.video_embed_url && isTrustedEmbedUrl(i.video_embed_url));

  // Today at local midnight, for freshness filtering.
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const isLive = (item: WeeklyFeedItem) => {
    const end = item.endDate ?? item.startDate;
    if (!end) return true; // evergreen
    const endDate = new Date(`${end}T23:59:59`);
    return endDate.getTime() >= today.getTime();
  };

  const daysUntil = (item: WeeklyFeedItem): number | null => {
    if (!item.startDate) return null;
    const s = new Date(`${item.startDate}T00:00:00`);
    return Math.round((s.getTime() - today.getTime()) / 86_400_000);
  };

  /** "Tonight" / "This weekend" / "Starts Friday" / "Trending now" */
  const freshnessBadge = (item: WeeklyFeedItem): string | null => {
    const d = daysUntil(item);
    if (d === null) return "Trending now";
    if (d < 0) {
      // already started but still live (multi-day)
      return "Happening now";
    }
    if (d === 0) return "Tonight";
    const dow = new Date(`${item.startDate}T00:00:00`).getDay(); // 0=Sun..6=Sat
    if (d <= 2 && (dow === 5 || dow === 6 || dow === 0)) return "This weekend";
    if (d <= 7) {
      const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dow];
      return `Starts ${dayName}`;
    }
    return null;
  };

  const allItems: WeeklyFeedItem[] = useMemo(() => {
    const scoped = weeklyFeed.filter((item) =>
      isRegion ? item.scope === "region" || item.scope === "all" : item.scope === scope,
    );
    // Drop expired
    const live = scoped.filter(isLive);
    // Sort: upcoming events first by soonest start, evergreen after
    return live.slice().sort((a, b) => {
      const da = daysUntil(a);
      const db = daysUntil(b);
      if (da === null && db === null) return 0;
      if (da === null) return 1;
      if (db === null) return -1;
      const sa = da < 0 ? 0 : da;
      const sb = db < 0 ? 0 : db;
      return sa - sb;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegion, scope, today]);

  // Town fallback so the section is never empty.
  const items: WeeklyFeedItem[] = useMemo(() => {
    if (allItems.length > 0) return allItems;
    if (isRegion) return [];
    const townName = scope
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");
    return [
      {
        title: `New listings across ${townName} this week`,
        description: `Fresh inventory and recent activity from across ${townName}.`,
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
        title: `What's happening in ${townName}`,
        description: `Community events and seasonal happenings around ${townName}.`,
        type: "event",
        date: "Updated weekly",
        scope,
        town: townName,
      },
    ];
  }, [allItems, isRegion, scope]);

  // Featured selection:
  // 1. Explicitly featured + still live
  // 2. Soonest upcoming live event/music/sports/family/dining
  // 3. First live item in the sorted pool
  const pickFeatured = (): WeeklyFeedItem | null => {
    if (items.length === 0) return null;
    const explicit = items.find((i) => i.featured);
    if (explicit) return explicit;
    const eventy: WeeklyFeedType[] = ["event", "music", "sports", "family", "dining"];
    const upcoming = items.find(
      (i) => eventy.includes(i.type) && i.startDate && (daysUntil(i) ?? 0) >= 0,
    );
    return upcoming ?? items[0];
  };
  const featured = pickFeatured();

  if (!featured) return null;

  const pool = items.filter((i) => i !== featured);

  const activeFilter = FILTERS.find((f) => f.key === filter)!;
  const filtered = pool.filter((i) => activeFilter.match(i.type)).slice(0, limit);

  // Count for each filter pill
  const counts: Record<FilterKey, number> = FILTERS.reduce((acc, f) => {
    acc[f.key] = pool.filter((i) => f.match(i.type)).length;
    return acc;
  }, {} as Record<FilterKey, number>);

  const todayCount = pool.length;
  const updatedLabel = "Updated 2 hours ago";

  const FeaturedIcon = ICONS[featured.type];
  const featuredBadge = freshnessBadge(featured);

  return (
    <section
      id="weekly-feed"
      className={
        compact
          ? "pt-6 md:pt-8 pb-16 md:pb-20 px-6 md:px-10 bg-[#0B0F19] border-b border-[#2D3748]"
          : "py-24 md:py-32 px-6 md:px-10 bg-[#0B0F19] border-y border-[#2D3748]"
      }
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0d6e66]/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5eead4] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
              {updatedLabel}
            </span>
            <p className="eyebrow-apple text-[#5eead4] mb-3">{eyebrow}</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.025em] text-white leading-[1.05]">
              {title}
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/60 font-light leading-relaxed">
              {sub}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold">
            <span className="inline-flex items-center gap-2 text-[#5eead4]">
              <Flame className="w-3.5 h-3.5" /> Trending this weekend
            </span>
            <span className="text-white/45">{todayCount} updates live</span>
          </div>
        </div>

        {/* Filter pills */}
        {isRegion && (
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = f.key === filter;
              const c = counts[f.key];
              if (c === 0 && f.key !== "all") return null;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all backdrop-blur-md ${
                    active
                      ? "bg-[#0d6e66] text-white border border-[#5eead4]/60 shadow-[0_0_20px_-4px_rgba(94,234,212,0.5)]"
                      : "bg-white/[0.04] text-white/70 border border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                  }`}
                >
                  {f.label}
                  <span
                    className={`text-[10px] font-bold tabular-nums ${active ? "text-white/85" : "text-white/40"}`}
                  >
                    {c}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* MAIN GRID — 40 / 60 */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8">
          {/* LEFT 40% — Editorial hero */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <article className="group relative overflow-hidden rounded-3xl bg-[#1E2230] border border-[#2D3748] hover:border-[#0d6e66]/50 transition-all">
              {featured.image && (
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/30 to-transparent" />
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#0d6e66] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    <Sparkles className="w-3 h-3" /> {featuredBadge ?? "Featured this week"}
                  </span>
                </div>
              )}
              <div className="p-7 md:p-9">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0d6e66]/20">
                    <FeaturedIcon className="w-4 h-4 text-[#5eead4]" strokeWidth={1.75} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#5eead4]">
                    {featured.categoryBadgeOverride ?? LABELS[featured.type]}
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
                <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-[-0.02em] leading-[1.1]">
                  {featured.title}
                </h3>
                <p className="mt-4 text-[15px] text-white/70 font-light leading-relaxed">
                  {featured.summary ?? featured.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {featured.date}
                  </span>
                  {featured.time && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {featured.time}
                    </span>
                  )}
                  {featured.venue && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {featured.venue}
                    </span>
                  )}
                  {featured.source_name && (
                    <span className="inline-flex items-center gap-1.5 text-white/55">
                      <Newspaper className="w-3.5 h-3.5" /> via {featured.source_name}
                    </span>
                  )}
                </div>
                {hasPlayableVideo(featured) ? (
                  <button
                    type="button"
                    onClick={() => setActiveVideo(featured)}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#5eead4]/50 bg-[#0d6e66]/15 px-4 py-2 text-sm font-semibold text-[#5eead4] hover:bg-[#0d6e66]/30 hover:text-white transition"
                  >
                    <PlayCircle className="w-4 h-4" /> Watch Coverage
                  </button>
                ) : featured.original_url ? (
                  <a
                    href={featured.external_article_url ?? featured.original_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#2D3748] bg-[#0B0F19] px-4 py-2 text-sm font-semibold text-[#5eead4] hover:border-[#5eead4]/60 hover:text-white transition"
                  >
                    {featured.cta?.label ?? "Read Full Coverage"} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  featured.cta && (
                    <a
                      href={featured.cta.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4] hover:text-white transition"
                    >
                      {featured.cta.label} <ArrowRight className="w-4 h-4" />
                    </a>
                  )
                )}
              </div>
            </article>


            {/* Premium engagement CTAs (stacked under hero on desktop) */}
            {isRegion && (
              <div className="grid grid-cols-1 gap-4">
                <Link
                  to="/contact?intent=add-event"
                  className="group relative overflow-hidden rounded-2xl border border-[#5eead4]/40 bg-gradient-to-br from-[#0d6e66]/15 via-[#1E2230] to-[#1E2230] p-6 transition-all hover:border-[#5eead4]/70 hover:shadow-[0_0_30px_-8px_rgba(94,234,212,0.4)]"
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#5eead4]/10 blur-2xl" />
                  <div className="relative flex items-start gap-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0d6e66]/30 border border-[#5eead4]/30 flex-shrink-0">
                      <Plus className="w-5 h-5 text-[#5eead4]" strokeWidth={2} />
                    </span>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-white">Add Your Event</p>
                      <p className="mt-1 text-xs text-white/55 leading-relaxed">
                        Concerts. Sports. Fundraisers. Openings. Get featured across the Capital District.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5eead4] group-hover:gap-2.5 transition-all">
                        Submit Event <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/contact?intent=promote-special"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1E2230] p-6 transition-all hover:border-[#5eead4]/50"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0d6e66]/25 flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-[#5eead4]" strokeWidth={2} />
                    </span>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-white">Promote a Local Special</p>
                      <p className="mt-1 text-xs text-white/55 leading-relaxed">
                        Happy hours, brunches, networking, launches, seasonal menus, community nights.
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5eead4] group-hover:gap-2.5 transition-all">
                        Promote Special <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT 60% — Live feed */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/50">
                Live across the Capital District
              </span>
              <span className="text-[11px] text-white/40">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:max-h-[1100px] lg:overflow-y-auto pr-2 -mr-2 content-start"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#2D3748 transparent" }}
            >
              {filtered.map((item, i) => {
                const Icon = ICONS[item.type];
                const playable = hasPlayableVideo(item);
                const isNews = !!item.original_url;
                const Wrapper: any = playable ? "button" : isNews ? "a" : "article";
                const wrapperProps = playable
                  ? { type: "button", onClick: () => setActiveVideo(item) }
                  : isNews
                  ? {
                      href: item.external_article_url ?? item.original_url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};
                return (
                  <Wrapper
                    key={i}
                    {...wrapperProps}
                    className="card-lift group relative block text-left w-full bg-[#1E2230] border border-[#2D3748] rounded-2xl p-5 transition-all hover:border-[#0d6e66]/50 hover:bg-[#222637]"
                  >
                    {playable && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/70 border border-[#5eead4]/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] font-semibold text-[#5eead4]">
                        <PlayCircle className="w-3 h-3" /> Video
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0d6e66]/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-[#5eead4]">
                        <Icon className="w-3 h-3" strokeWidth={2} />
                        {item.categoryBadgeOverride ?? LABELS[item.type]}
                      </span>
                      {item.town && (
                        <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/55">
                          <MapPin className="w-3 h-3" /> {item.town}
                        </span>
                      )}
                    </div>
                    <h4 className="text-[15px] md:text-base font-semibold text-white tracking-tight leading-snug">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-[13px] text-white/55 font-light leading-relaxed line-clamp-2">
                      {item.summary ?? item.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/45">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </span>
                      {item.time && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.time}
                        </span>
                      )}
                      {item.venue && (
                        <span className="inline-flex items-center gap-1 text-white/50">
                          · {item.venue}
                        </span>
                      )}
                      {item.source_name && (
                        <span className="inline-flex items-center gap-1 text-white/55">
                          <Newspaper className="w-3 h-3" /> via {item.source_name}
                        </span>
                      )}
                    </div>
                    {(playable || isNews) && (
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#5eead4] group-hover:text-white transition">
                        {playable ? (
                          <>
                            <PlayCircle className="w-3.5 h-3.5" /> Watch Coverage
                          </>
                        ) : (
                          <>
                            Read Full Coverage <ExternalLink className="w-3 h-3" />
                          </>
                        )}
                      </span>
                    )}
                  </Wrapper>
                );
              })}
              {filtered.length === 0 && (
                <div className="sm:col-span-2 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-white/50">
                  Nothing in this category this week. Try another filter.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter pill */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#weekly-newsletter"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Get the Capital District Weekly <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <LocalVideoModal
        open={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title ?? ""}
        embedUrl={activeVideo?.video_embed_url}
        sourceName={activeVideo?.source_name}
        articleUrl={activeVideo?.external_article_url ?? activeVideo?.original_url}
        town={activeVideo?.town}
        category={activeVideo?.categoryBadgeOverride ?? (activeVideo ? LABELS[activeVideo.type] : undefined)}
      />
    </section>
  );
};

export default WeeklyFeed;

export const WeeklyNewsletterCTA = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value?.trim() ?? "";
    if (!email || !email.includes("@")) return;
    const emailDomain = email.split("@")[1] || undefined;
    trackGAEvent.newsletterSignup({
      source_location: "weekly_newsletter_cta",
      // @ts-expect-error allow extra context
      email_domain: emailDomain,
      // @ts-expect-error allow extra context
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
    form.reset();
  };
  return (
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
          onSubmit={onSubmit}
        >
          <input
            type="email"
            name="email"
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
};
