import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Clock, Plus, AlertCircle, X } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { weeklyFeed, type WeeklyFeedItem } from "@/data/weeklyFeed";


import heroBg from "@/assets/events-room-hero.jpg";
import evAlive from "@/assets/event-alive-at-five.jpg";
import evTroy from "@/assets/event-troy-market.jpg";
import evSaratoga from "@/assets/event-saratoga-concerts.jpg";
import evJazz from "@/assets/event-live-jazz.jpg";
import evPlaza from "@/assets/event-empire-plaza.jpg";
import evDelmar from "@/assets/event-delmar-dining.jpg";
import evFoodWine from "@/assets/event-food-wine.jpg";
import evFamily from "@/assets/event-family-weekend.jpg";

/* =============================================================
   /weekly — Capital District Events Room.
   Apple TV-style cinematic hero + featured event + horizontal
   content rails grouped by topic. Premium streaming feel.
   ============================================================= */

const FALLBACK_IMAGES = [
  evAlive, evTroy, evSaratoga, evJazz, evPlaza, evDelmar, evFoodWine, evFamily,
];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

type RailKey =
  | "featured"
  | "music"
  | "dining"
  | "markets"
  | "family"
  | "sports"
  | "business"
  | "upcoming";

type FilterKey = "all" | RailKey;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all",      label: "All" },
  { key: "featured", label: "Featured" },
  { key: "music",    label: "Live Music" },
  { key: "dining",   label: "Dining" },
  { key: "markets",  label: "Markets" },
  { key: "family",   label: "Family" },
  { key: "sports",   label: "Sports" },
  { key: "business", label: "Business" },
  { key: "upcoming", label: "Upcoming" },
];

type LinkKind = "ticket" | "reservation" | "official" | "source" | "internal" | "pending";

interface LinkState {
  kind: LinkKind;
  label: string;
  href: string;          // "#" for pending
  external: boolean;
  pending: boolean;
}

interface EventCard {
  key: string;
  title: string;
  description: string;
  category: string;
  rails: RailKey[];
  town?: string;
  venue?: string;
  time?: string;
  dateLabel: string;
  dateBadge: { top: string; bottom: string };
  image: string;
  href: string;
  isFeatured?: boolean;
  link: LinkState;
  needsVerification: boolean;
  startISO?: string;
  endISO?: string;
}

function resolveLink(item: WeeklyFeedItem): LinkState {
  const isExternal = (u?: string) => !!u && /^https?:\/\//i.test(u);
  if (isExternal(item.ticket_url))
    return { kind: "ticket", label: "Tickets", href: item.ticket_url!, external: true, pending: false };
  if (isExternal(item.reservation_url))
    return { kind: "reservation", label: "Reservations", href: item.reservation_url!, external: true, pending: false };
  if (isExternal(item.official_url))
    return { kind: "official", label: "View Event", href: item.official_url!, external: true, pending: false };
  if (isExternal(item.source_url) || isExternal(item.external_article_url) || isExternal(item.original_url)) {
    const href = (item.source_url || item.external_article_url || item.original_url)!;
    return { kind: "source", label: "View Details", href, external: true, pending: false };
  }
  if (item.cta?.href && /^https?:\/\//i.test(item.cta.href))
    return { kind: "official", label: item.cta.label || "View Event", href: item.cta.href, external: true, pending: false };
  if (item.cta?.href && item.cta.href !== "#" && !item.cta.href.startsWith("#"))
    return { kind: "internal", label: item.cta.label || "View Details", href: item.cta.href, external: false, pending: false };
  return { kind: "pending", label: "Details Coming Soon", href: "#", external: false, pending: true };
}


function classify(item: WeeklyFeedItem): { category: string; rails: RailKey[] } {
  const t = item.type;
  const text = `${item.title} ${item.description}`.toLowerCase();
  const rails: RailKey[] = [];

  if (t === "music") {
    rails.push("music");
    if (/night|bar|tavern|club/.test(text)) rails.push("music");
    return { category: "Live Music", rails: ["music"] };
  }
  if (t === "dining") {
    rails.push("dining");
    if (/jazz|live music|wine/.test(text)) rails.push("music");
    return { category: "Dining", rails };
  }
  if (t === "sports") return { category: "Sports", rails: ["sports"] };
  if (t === "family") return { category: "Family", rails: ["family"] };
  if (t === "networking") return { category: "Business & Networking", rails: ["business"] };
  if (t === "event") {
    if (/market|farmers/.test(text)) return { category: "Market", rails: ["markets"] };
    if (/festival|broadway|concert|series/.test(text)) return { category: "Festival", rails: ["markets", "music"] };
    if (/brunch|restaurant|tasting|dinner/.test(text)) return { category: "Dining", rails: ["dining"] };
    if (/family|kids|children|school|park/.test(text)) return { category: "Family", rails: ["family"] };
    return { category: "Community", rails: ["family"] };
  }
  return { category: "Community", rails: ["family"] };
}

function dateBadge(item: WeeklyFeedItem): { top: string; bottom: string } {
  if (item.startDate) {
    const d = new Date(item.startDate + "T12:00:00");
    if (!isNaN(d.getTime())) {
      return { top: MONTHS[d.getMonth()], bottom: String(d.getDate()) };
    }
  }
  const label = item.date || "";
  return {
    top: label.split(" ")[0]?.toUpperCase() || "TBD",
    bottom: label.split(" ")[1]?.replace(/[^0-9]/g, "") || "",
  };
}

function gtag(name: string, payload: Record<string, unknown>) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", name, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

const EVENT_TYPES: WeeklyFeedItem["type"][] = [
  "event", "music", "sports", "dining", "family", "networking",
];

/* ---------- Horizontal Rail ---------- */

interface RailProps {
  id: string;
  title: string;
  subtitle?: string;
  events: EventCard[];
  size?: "lg" | "md";
  onPending: (ev: EventCard, sourceLocation: string) => void;
}

const Rail = ({ id, title, subtitle, events, size = "lg", onPending }: RailProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);


  if (!events.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amt = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amt, behavior: "smooth" });
  };

  const cardW =
    size === "lg"
      ? "w-[78vw] sm:w-[58vw] md:w-[420px] lg:w-[460px]"
      : "w-[70vw] sm:w-[44vw] md:w-[320px] lg:w-[340px]";
  const aspect = size === "lg" ? "aspect-[16/10]" : "aspect-[16/10]";

  return (
    <section id={id} className="relative py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-5 md:mb-6">
          <div>
            <h2 className="text-2xl md:text-[28px] font-semibold tracking-[-0.02em] text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 text-sm md:text-[15px] text-white/55 font-light">
                {subtitle}
              </p>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={`Scroll ${title} left`}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:bg-white/[0.1] hover:text-white transition flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={`Scroll ${title} right`}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:bg-white/[0.1] hover:text-white transition flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="overflow-x-auto snap-x snap-mandatory scroll-pl-6 md:scroll-pl-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-4 md:gap-5 px-6 md:px-10 pb-2">
          {events.map((ev) => {
            const sourceLocation = `rail_${id}`;
            const trackCard = () => {
              gtag("event_card_click", {
                event_title: ev.title,
                event_category: ev.category,
                event_date: ev.dateLabel,
                event_location: ev.venue || ev.town || "",
                link_state: ev.link.kind,
                source_location: sourceLocation,
              });
              if (ev.link.external) {
                gtag("event_external_link_click", {
                  event_title: ev.title,
                  event_category: ev.category,
                  event_date: ev.dateLabel,
                  event_location: ev.venue || ev.town || "",
                  link_state: ev.link.kind,
                  source_location: sourceLocation,
                });
              }
            };

            const cardInner = (
              <div className={`relative ${aspect} overflow-hidden rounded-xl bg-[#0F1424] border border-white/[0.06] group-hover:border-white/20 transition`}>
                <img
                  src={ev.image}
                  alt={ev.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.35) 55%, rgba(11,15,25,0.05) 100%)",
                  }}
                  aria-hidden
                />

                {/* Date badge */}
                <div className="absolute top-3 left-3 flex flex-col items-center justify-center w-[58px] rounded-lg bg-[#0B0F19]/85 backdrop-blur border border-white/15 py-1.5 shadow-lg">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-[#5eead4]">
                    {ev.dateBadge.top}
                  </span>
                  <span className="text-xl font-semibold text-white leading-none mt-0.5">
                    {ev.dateBadge.bottom || "—"}
                  </span>
                </div>

                {/* Category */}
                <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-1 rounded-full bg-black/45 backdrop-blur border border-white/15 text-[10px] font-medium tracking-wider uppercase text-white">
                  {ev.category}
                </span>

                {/* Bottom title block */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  {ev.needsVerification && (
                    <span className="inline-flex items-center gap-1 mb-2 px-2 py-[3px] rounded-full bg-[#5eead4]/12 border border-[#5eead4]/35 text-[10px] font-medium tracking-[0.14em] uppercase text-[#5eead4]">
                      <AlertCircle className="w-3 h-3" /> Details being confirmed
                    </span>
                  )}
                  <h3 className="text-base md:text-lg font-semibold tracking-[-0.01em] text-white leading-snug line-clamp-2">
                    {ev.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white/75">
                    {(ev.venue || ev.town) && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#5eead4]" />
                        {[ev.venue, ev.town].filter(Boolean).join(" · ")}
                      </span>
                    )}
                    {ev.time && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#5eead4]" />
                        {ev.time}
                      </span>
                    )}
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${ev.link.pending ? "text-white/70" : "text-[#5eead4]"}`}>
                      {ev.link.label} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );

            const className = `group snap-start shrink-0 ${cardW} block text-left`;

            if (ev.link.pending) {
              return (
                <button
                  key={ev.key}
                  type="button"
                  onClick={() => {
                    trackCard();
                    onPending(ev, sourceLocation);
                  }}
                  className={className}
                >
                  {cardInner}
                </button>
              );
            }
            if (ev.link.external) {
              return (
                <a
                  key={ev.key}
                  href={ev.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackCard}
                  className={className}
                >
                  {cardInner}
                </a>
              );
            }
            return (
              <Link key={ev.key} to={ev.link.href} onClick={trackCard} className={className}>
                {cardInner}
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* ---------- Page ---------- */

const TOWN_FILTERS = [
  "All", "Albany", "Troy", "Schenectady", "Saratoga Springs",
  "Delmar", "Clifton Park", "Cohoes", "Latham",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const WeeklyPulse = () => {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [townFilter, setTownFilter] = useState<string>("All");
  const [pendingEvent, setPendingEvent] = useState<EventCard | null>(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  useEffect(() => {
    gtag("seven_day_schedule_view", { source_page: "/weekly" });
  }, []);



  const openPending = (ev: EventCard, sourceLocation: string) => {
    setPendingEvent(ev);
    gtag("event_details_pending_click", {
      event_title: ev.title,
      event_category: ev.category,
      event_date: ev.dateLabel,
      event_location: ev.venue || ev.town || "",
      link_state: ev.link.kind,
      source_location: sourceLocation,
    });
  };

  const events: EventCard[] = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return weeklyFeed
      .filter((i) => EVENT_TYPES.includes(i.type))
      .filter((i) => {
        const end = i.endDate || i.startDate;
        if (!end) return true;
        return new Date(end + "T23:59:59") >= today;
      })
      .map((i, idx) => {
        const { category, rails } = classify(i);
        const allRails: RailKey[] = i.featured ? ["featured", ...rails] : rails;
        const link = resolveLink(i);
        return {
          key: `${i.title}-${idx}`,
          title: i.title,
          description: i.description,
          category,
          rails: Array.from(new Set(allRails)),
          town: i.town,
          venue: i.venue,
          time: i.time,
          dateLabel: i.date,
          dateBadge: dateBadge(i),
          image: i.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
          href: link.href,
          isFeatured: i.featured,
          link,
          needsVerification: !!i.needs_verification || i.event_status === "pending_verification" || link.pending,
          startISO: i.startDate,
          endISO: i.endDate || i.startDate,
        };
      });
  }, []);

  // Rails
  const byRail = (k: RailKey) => events.filter((e) => e.rails.includes(k));
  const featured = useMemo(() => {
    const f = events.find((e) => e.isFeatured && e.image) || events[0];
    return f;
  }, [events]);

  const upcoming = useMemo(() => {
    // Beyond next 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() + 7);
    return events
      .filter((e) => {
        // Use badge to approximate; if month/day parseable, compare
        const m = MONTHS.indexOf(e.dateBadge.top);
        const d = parseInt(e.dateBadge.bottom || "0");
        if (m < 0 || !d) return false;
        const dt = new Date(today.getFullYear(), m, d);
        return dt >= cutoff;
      });
  }, [events]);

  const townMatch = (e: EventCard) => {
    if (townFilter === "All") return true;
    const hay = `${e.town || ""} ${e.venue || ""}`.toLowerCase();
    return hay.includes(townFilter.toLowerCase());
  };

  const categoryMatch = (e: EventCard) => {
    if (filter === "all") return true;
    if (filter === "featured") return !!e.isFeatured;
    if (filter === "upcoming") return upcoming.includes(e);
    return e.rails.includes(filter as RailKey);
  };

  const sevenDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return {
        index: i,
        iso: `${yyyy}-${mm}-${dd}`,
        date: d,
        label: i === 0 ? "Today" : DAY_NAMES[d.getDay()],
        monthLabel: MONTH_SHORT[d.getMonth()],
        dayNum: d.getDate(),
      };
    });
  }, []);

  const eventsForDay = (iso: string) =>
    events
      .filter(townMatch)
      .filter(categoryMatch)
      .filter((e) => {
        if (!e.startISO) return false;
        const end = e.endISO || e.startISO;
        return iso >= e.startISO && iso <= end;
      });

  const selectedDay = sevenDays[selectedDayIdx] || sevenDays[0];
  const selectedDayEvents = eventsForDay(selectedDay.iso);


  const rails: { key: RailKey; title: string; subtitle: string; events: EventCard[] }[] = [
    { key: "featured", title: "Featured This Week",       subtitle: "Hand-picked by Capital District Nest.",                       events: byRail("featured").filter(townMatch) },
    { key: "music",    title: "Live Music & Nightlife",   subtitle: "Concerts, jazz, comedy, and evening events.",                 events: byRail("music").filter(townMatch) },
    { key: "dining",   title: "Food, Drink & Dining",     subtitle: "Restaurant nights, tastings, brunches, and openings.",        events: byRail("dining").filter(townMatch) },
    { key: "markets",  title: "Markets & Festivals",      subtitle: "Farmers markets, street fairs, and seasonal celebrations.",   events: byRail("markets").filter(townMatch) },
    { key: "family",   title: "Family & Community",       subtitle: "Family-friendly outings and neighborhood happenings.",        events: byRail("family").filter(townMatch) },
    { key: "sports",   title: "Sports & Local Competition", subtitle: "Local games, races, and athletic events across the region.", events: byRail("sports").filter(townMatch) },
    { key: "business", title: "Business & Networking",    subtitle: "Chambers, meetups, and professional gatherings.",             events: byRail("business").filter(townMatch) },
    { key: "upcoming", title: "Upcoming Events",          subtitle: "Coming up beyond this week.",                                 events: upcoming.filter(townMatch) },
  ];


  const visibleRails =
    filter === "all" ? rails : rails.filter((r) => r.key === filter);

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="Events Across the Capital District | Capital District Nest"
        description="The Capital District events room — live music, festivals, markets, dining events, family activities, sports, and things to do across the region."
      />
      <CleanHeader />

      <main>
        {/* ===== CINEMATIC HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(11,15,25,0.45) 0%, rgba(11,15,25,0.7) 55%, #0B0F19 100%)",
              }}
              aria-hidden
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 40%, rgba(94,234,212,0.10), transparent 70%)",
              }}
              aria-hidden
            />
          </div>

          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-36">
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#5eead4] mb-5">
              This Week
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-[-0.04em] text-white leading-[1.02] max-w-4xl">
              Events Across the Capital&nbsp;District
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 font-light max-w-2xl leading-relaxed">
              Live music, festivals, markets, dining events, sports, family
              activities, nightlife, and local happenings across the region.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#seven-day-schedule"
                onClick={(e) => {
                  e.preventDefault();
                  gtag("view_this_week_click", { source_page: "/weekly" });
                  const el = document.getElementById("seven-day-schedule");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                View This Week <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/submit-event"
                onClick={() => gtag("add_event_click", { source_location: "events_room_hero" })}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                <Plus className="w-4 h-4" /> Add Your Event
              </Link>
            </div>
          </div>
        </section>

        {/* ===== TOP FEATURED EVENT ===== */}
        {featured && (() => {
          const f = featured;
          const trackFeatured = () => {
            gtag("event_card_click", {
              event_title: f.title,
              event_category: f.category,
              event_date: f.dateLabel,
              event_location: f.venue || f.town || "",
              link_state: f.link.kind,
              source_location: "featured_hero",
            });
            if (f.link.external) {
              gtag("event_external_link_click", {
                event_title: f.title,
                event_category: f.category,
                event_date: f.dateLabel,
                event_location: f.venue || f.town || "",
                link_state: f.link.kind,
                source_location: "featured_hero",
              });
            }
          };
          const inner = (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 md:hidden"
                  style={{ background: "linear-gradient(to top, rgba(11,15,25,0.7), transparent 60%)" }}
                  aria-hidden
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-4">
                  Featured · {f.category}
                </p>
                {f.needsVerification && (
                  <span className="inline-flex items-center gap-1 mb-3 px-2.5 py-1 rounded-full bg-[#5eead4]/12 border border-[#5eead4]/35 text-[10px] font-medium tracking-[0.14em] uppercase text-[#5eead4] self-start">
                    <AlertCircle className="w-3 h-3" /> Details being confirmed
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
                  {f.title}
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/70 font-light leading-relaxed">
                  {f.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#5eead4]" />
                    {f.dateLabel}{f.time ? ` · ${f.time}` : ""}
                  </span>
                  {(f.venue || f.town) && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#5eead4]" />
                      {[f.venue, f.town].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-5 py-2.5 text-sm font-semibold group-hover:bg-white transition">
                    {f.link.label} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );
          const wrapperCls = "group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F1424] hover:border-white/20 transition text-left w-full";
          return (
            <section className="relative -mt-12 md:-mt-20 z-10">
              <div className="max-w-[1600px] mx-auto px-6 md:px-10">
                {f.link.pending ? (
                  <button type="button" onClick={() => { trackFeatured(); openPending(f, "featured_hero"); }} className={wrapperCls}>{inner}</button>
                ) : f.link.external ? (
                  <a href={f.link.href} target="_blank" rel="noopener noreferrer" onClick={trackFeatured} className={wrapperCls}>{inner}</a>
                ) : (
                  <Link to={f.link.href} onClick={trackFeatured} className={wrapperCls}>{inner}</Link>
                )}
              </div>
            </section>
          );
        })()}


        {/* ===== FILTER CHIPS ===== */}
        <section className="relative pt-14 md:pt-20">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="flex items-end justify-between gap-6 mb-5">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-3">
                  Browse the Room
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] text-white">
                  Pick a vibe
                </h2>
              </div>
              <Link
                to="/submit-event"
                onClick={() => gtag("add_event_click", { source_location: "events_room_filters" })}
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[#5eead4] hover:text-white transition"
              >
                <Plus className="w-4 h-4" /> Add Your Event
              </Link>
            </div>
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setFilter(f.key);
                      gtag("weekly_filter_click", { filter: f.key });
                      gtag("schedule_filter_click", { selected_category: f.key, selected_town: townFilter, source_page: "/weekly" });
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition border ${
                      active
                        ? "bg-white text-[#0B0F19] border-white"
                        : "bg-white/[0.04] text-white/80 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Town chips */}
            <div className="mt-4 flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TOWN_FILTERS.map((t) => {
                const active = townFilter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTownFilter(t);
                      gtag("weekly_town_filter_click", { town: t });
                      gtag("schedule_filter_click", { selected_category: filter, selected_town: t, source_page: "/weekly" });
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition border ${
                      active
                        ? "bg-[#5eead4] text-[#0B0F19] border-[#5eead4]"
                        : "bg-white/[0.04] text-white/80 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </section>


        {/* ===== 7-DAY SCHEDULE ===== */}
        <section id="seven-day-schedule" className="relative pt-16 md:pt-24 scroll-mt-24">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-4">
                This Week
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-white leading-[1.05]">
                Your next seven days in the Capital District.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light leading-relaxed">
                Browse concerts, markets, dining events, community gatherings, sports,
                nightlife, and things to do by day.
              </p>
            </div>

            {/* Day selector */}
            <div className="mt-10 flex gap-2.5 md:gap-3 overflow-x-auto pb-3 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {sevenDays.map((d) => {
                const active = selectedDayIdx === d.index;
                const count = eventsForDay(d.iso).length;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    onClick={() => {
                      setSelectedDayIdx(d.index);
                      gtag("schedule_day_click", {
                        selected_day: d.iso,
                        selected_town: townFilter,
                        selected_category: filter,
                        source_page: "/weekly",
                      });
                    }}
                    className={`shrink-0 w-[96px] md:w-[112px] rounded-2xl px-4 py-4 text-left border transition ${
                      active
                        ? "bg-white text-[#0B0F19] border-white shadow-[0_8px_30px_rgba(94,234,212,0.18)]"
                        : "bg-white/[0.04] text-white border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className={`text-[10px] font-semibold tracking-[0.22em] uppercase ${active ? "text-[#0B0F19]/70" : "text-[#5eead4]"}`}>
                      {d.label}
                    </div>
                    <div className={`mt-1 text-2xl md:text-[28px] font-semibold tracking-tight ${active ? "text-[#0B0F19]" : "text-white"}`}>
                      {d.monthLabel} {d.dayNum}
                    </div>
                    <div className={`mt-1 text-[11px] font-medium ${active ? "text-[#0B0F19]/60" : "text-white/55"}`}>
                      {count > 0 ? `${count} event${count === 1 ? "" : "s"}` : "—"}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Day events */}
            <div className="mt-8 md:mt-10">
              {selectedDayEvents.length === 0 ? (
                <div className="rounded-2xl border border-white/[0.08] bg-[#0F1424] p-8 md:p-12 text-center">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white">
                    No featured events listed yet for this day.
                  </h3>
                  <p className="mt-3 text-white/65 font-light">
                    Know about something happening locally? Submit it to Capital District Nest.
                  </p>
                  <Link
                    to="/submit-event"
                    onClick={() => gtag("add_event_click", { source_location: "seven_day_empty" })}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-5 py-2.5 text-sm font-semibold hover:bg-white transition"
                  >
                    <Plus className="w-4 h-4" /> Add Your Event
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4 md:gap-5 md:grid-cols-2">
                  {selectedDayEvents.map((ev) => {
                    const trackOpen = () => {
                      gtag("schedule_event_click", {
                        selected_day: selectedDay.iso,
                        selected_town: townFilter,
                        selected_category: filter,
                        event_title: ev.title,
                        event_date: ev.dateLabel,
                        link_state: ev.link.kind,
                        source_page: "/weekly",
                      });
                    };
                    const ctaLabel = ev.link.pending ? "Details Being Confirmed" : ev.link.label;
                    const inner = (
                      <div className="flex gap-4 p-4 md:p-5 rounded-2xl border border-white/[0.08] bg-[#0F1424] hover:border-white/25 transition h-full">
                        <div className="relative w-[100px] md:w-[140px] shrink-0 aspect-[4/5] md:aspect-[4/5] rounded-xl overflow-hidden">
                          <img src={ev.image} alt={ev.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                          <div className="absolute top-2 left-2 flex flex-col items-center justify-center w-[44px] rounded-md bg-[#0B0F19]/85 backdrop-blur border border-white/15 py-1">
                            <span className="text-[9px] font-semibold tracking-[0.18em] text-[#5eead4]">{ev.dateBadge.top}</span>
                            <span className="text-base font-semibold text-white leading-none mt-0.5">{ev.dateBadge.bottom || "—"}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col">
                          <span className="inline-flex self-start items-center px-2 py-[3px] rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-medium tracking-wider uppercase text-white/80">
                            {ev.category}
                          </span>
                          <h3 className="mt-2 text-base md:text-lg font-semibold tracking-[-0.01em] text-white leading-snug line-clamp-2">
                            {ev.title}
                          </h3>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-white/65">
                            {ev.time && (
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#5eead4]" /> {ev.time}
                              </span>
                            )}
                            {(ev.venue || ev.town) && (
                              <span className="inline-flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#5eead4]" />
                                {[ev.venue, ev.town].filter(Boolean).join(" · ")}
                              </span>
                            )}
                          </div>
                          {ev.description && (
                            <p className="mt-2 text-[13px] text-white/55 font-light line-clamp-2">
                              {ev.description}
                            </p>
                          )}
                          <div className="mt-auto pt-3">
                            <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${ev.link.pending ? "text-white/70" : "text-[#5eead4]"}`}>
                              {ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                    if (ev.link.pending) {
                      return (
                        <button key={ev.key} type="button" onClick={() => { trackOpen(); openPending(ev, "seven_day_schedule"); }} className="text-left">
                          {inner}
                        </button>
                      );
                    }
                    if (ev.link.external) {
                      return (
                        <a key={ev.key} href={ev.link.href} target="_blank" rel="noopener noreferrer" onClick={trackOpen} className="block">
                          {inner}
                        </a>
                      );
                    }
                    return (
                      <Link key={ev.key} to={ev.link.href} onClick={trackOpen} className="block">
                        {inner}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm font-medium text-white/55 hover:text-white transition"
              >
                ↑ Back to top
              </button>
            </div>
          </div>
        </section>

        {/* ===== RAILS ===== */}
        <div className="pt-2 md:pt-4 pb-8 md:pb-12">
          {visibleRails.map((r) => (
            <Rail
              key={r.key}
              id={`rail-${r.key}`}
              title={r.title}
              subtitle={r.subtitle}
              events={r.events}
              size={r.key === "featured" ? "lg" : "md"}
              onPending={openPending}
            />
          ))}

          {visibleRails.every((r) => r.events.length === 0) && (
            <div className="max-w-3xl mx-auto px-6 md:px-10 py-20 text-center text-white/60">
              Nothing in this category right now. Try another filter or check back soon.
            </div>
          )}
        </div>

        {/* ===== MID ADD-EVENT BAND ===== */}
        <section className="relative border-y border-white/[0.06] bg-[#0F1424]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-2">
                Contribute
              </p>
              <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] text-white">
                Hosting a concert, market, fundraiser, or restaurant night?
              </h3>
              <p className="mt-2 text-white/65 text-sm md:text-base font-light max-w-xl">
                Submit your event to be considered for the Capital District Events Room.
              </p>
            </div>
            <Link
              to="/submit-event"
              onClick={() => gtag("add_event_click", { source_location: "events_room_midband" })}
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Your Event
            </Link>
          </div>
        </section>

        {/* ===== SEO COPY ===== */}
        <section className="relative border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-20">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-4">
              Discover the Capital District
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-white leading-[1.1]">
              Things to do in the Capital District
            </h2>
            <div className="mt-6 space-y-4 text-base md:text-[17px] text-white/70 font-light leading-relaxed">
              <p>
                From live music in downtown Albany to farmers markets in Troy, summer concerts
                in Saratoga Springs, family weekends in Delmar, and restaurant nights across
                Clifton Park and Schenectady — the Capital District is full of things to do
                every week of the year.
              </p>
              <p>
                Capital District Nest curates local concerts, festivals, dining events,
                community markets, sports, networking nights, and family activities so you
                can find what is happening near you. Browse by category or by town, save the
                ones you love, and share them with friends and neighbors.
              </p>
              <p>
                Hosting an event? Submit a concert, restaurant night, market, fundraiser, or
                community gathering and we will feature it in the Capital District Events Room.
              </p>
            </div>
          </div>
        </section>

        {/* ===== BOTTOM CTA ===== */}

        <section className="relative">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-5">
              The Events Room
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-white leading-[1.05]">
              Built by neighbors, for neighbors.
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Restaurants, venues, businesses, schools, nonprofits, and community
              organizations can submit events to Capital District Nest.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/submit-event"
                onClick={() => gtag("add_event_click", { source_location: "events_room_bottom" })}
                className="inline-flex items-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-7 py-3.5 text-sm font-semibold hover:bg-white transition"
              >
                <Plus className="w-4 h-4" /> Add Your Event
              </Link>
              <Link
                to="/local"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition"
              >
                Explore Local Businesses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===== PENDING EVENT MODAL ===== */}
      {pendingEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0F19]/80 backdrop-blur-sm"
          onClick={() => setPendingEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pending-event-title"
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0F1424] p-7 md:p-9 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPendingEvent(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] transition flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5eead4]/12 border border-[#5eead4]/35 text-[10px] font-medium tracking-[0.16em] uppercase text-[#5eead4]">
              <AlertCircle className="w-3 h-3" /> Pending Verification
            </span>
            <h3 id="pending-event-title" className="mt-4 text-2xl md:text-[28px] font-semibold tracking-[-0.025em] text-white leading-tight">
              Event details being confirmed.
            </h3>
            <p className="mt-1.5 text-sm md:text-base text-white/65 font-light">
              {pendingEvent.title}
            </p>
            <p className="mt-5 text-sm md:text-[15px] text-white/70 font-light leading-relaxed">
              We&rsquo;re currently confirming details for this event. If you are the organizer,
              venue, or business connected to this event, you can submit the official link,
              flyer, ticket page, or event details.
            </p>
            <div className="mt-7 flex flex-col gap-2.5">
              <Link
                to="/submit-event"
                onClick={() => {
                  gtag("event_submit_details_click", {
                    event_title: pendingEvent.title,
                    event_category: pendingEvent.category,
                    event_date: pendingEvent.dateLabel,
                    event_location: pendingEvent.venue || pendingEvent.town || "",
                    link_state: pendingEvent.link.kind,
                    source_location: "pending_modal",
                  });
                  setPendingEvent(null);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-5 py-3 text-sm font-semibold hover:bg-white transition"
              >
                Submit Event Details <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/submit-event?intent=update"
                onClick={() => setPendingEvent(null)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Suggest an Update
              </Link>
              <Link
                to="/weekly"
                onClick={() => setPendingEvent(null)}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/65 hover:text-white px-5 py-2 transition"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WeeklyPulse;
