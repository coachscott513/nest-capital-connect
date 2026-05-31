import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { weeklyFeed, type WeeklyFeedItem } from "@/data/weeklyFeed";

import evAlive from "@/assets/event-alive-at-five.jpg";
import evTroy from "@/assets/event-troy-market.jpg";
import evSaratoga from "@/assets/event-saratoga-concerts.jpg";
import evJazz from "@/assets/event-live-jazz.jpg";
import evPlaza from "@/assets/event-empire-plaza.jpg";
import evDelmar from "@/assets/event-delmar-dining.jpg";
import evFoodWine from "@/assets/event-food-wine.jpg";
import evFamily from "@/assets/event-family-weekend.jpg";

/* =============================================================
   /weekly — Premium Apple-style events discovery page.
   Cinematic dark hero, filter chips, image-forward cards with
   prominent date badges. Matches the homepage Endless
   Entertainment surface so users never drop into a plain list.
   ============================================================= */

const FALLBACK_IMAGES = [
  evAlive, evTroy, evSaratoga, evJazz, evPlaza, evDelmar, evFoodWine, evFamily,
];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type FilterKey =
  | "all"
  | "music"
  | "dining"
  | "family"
  | "market"
  | "festival"
  | "sports"
  | "nightlife"
  | "community";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "music", label: "Live Music" },
  { key: "dining", label: "Dining" },
  { key: "family", label: "Family" },
  { key: "market", label: "Markets" },
  { key: "festival", label: "Festivals" },
  { key: "sports", label: "Sports" },
  { key: "nightlife", label: "Nightlife" },
  { key: "community", label: "Community" },
];

interface EventCard {
  key: string;
  title: string;
  description: string;
  category: string;
  filterKey: FilterKey;
  town?: string;
  venue?: string;
  time?: string;
  dateLabel: string;
  dateBadge: { top: string; bottom: string };
  image: string;
  href: string;
}

function categorize(item: WeeklyFeedItem): { category: string; filter: FilterKey } {
  const t = item.type;
  if (t === "music") return { category: "Live Music", filter: "music" };
  if (t === "dining") return { category: "Dining", filter: "dining" };
  if (t === "family") return { category: "Family", filter: "family" };
  if (t === "sports") return { category: "Sports", filter: "sports" };
  if (t === "networking") return { category: "Community", filter: "community" };
  if (t === "event") {
    const title = (item.title + " " + item.description).toLowerCase();
    if (title.includes("market") || title.includes("farmers")) {
      return { category: "Market", filter: "market" };
    }
    if (title.includes("festival") || title.includes("broadway") || title.includes("concert")) {
      return { category: "Festival", filter: "festival" };
    }
    if (title.includes("brunch") || title.includes("bar") || title.includes("tavern") || title.includes("party")) {
      return { category: "Nightlife", filter: "nightlife" };
    }
    return { category: "Community", filter: "community" };
  }
  return { category: "Community", filter: "community" };
}

function dateBadge(item: WeeklyFeedItem): { top: string; bottom: string } {
  if (item.startDate) {
    const d = new Date(item.startDate + "T12:00:00");
    if (!isNaN(d.getTime())) {
      return {
        top: MONTHS[d.getMonth()],
        bottom: String(d.getDate()),
      };
    }
  }
  // Fallback: try to parse "Jun 4" style label
  const label = item.date || "";
  return { top: label.split(" ")[0]?.toUpperCase() || "TBD", bottom: label.split(" ")[1] || "" };
}

function trackCardClick(ev: EventCard) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "event_card_click", {
        event_title: ev.title,
        event_category: ev.category,
        event_location: ev.venue || ev.town || "",
        event_date: ev.dateLabel,
        source_location: "weekly_events_page",
        page_path: window.location.pathname,
      });
    }
  } catch { /* noop */ }
}

function trackAddEventClick(source: string) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "add_event_click", {
        source_location: source,
        page_path: window.location.pathname,
      });
    }
  } catch { /* noop */ }
}

function trackFilterClick(filter: string) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "weekly_filter_click", {
        filter,
        page_path: window.location.pathname,
      });
    }
  } catch { /* noop */ }
}

const EVENT_TYPES: WeeklyFeedItem["type"][] = [
  "event", "music", "sports", "dining", "family", "networking",
];

const WeeklyPulse = () => {
  const [filter, setFilter] = useState<FilterKey>("all");

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
        const { category, filter: f } = categorize(i);
        return {
          key: `${i.title}-${idx}`,
          title: i.title,
          description: i.description,
          category,
          filterKey: f,
          town: i.town,
          venue: i.venue,
          time: i.time,
          dateLabel: i.date,
          dateBadge: dateBadge(i),
          image: i.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
          href: i.cta?.href || "#",
        };
      })
      .sort((a, b) => {
        const am = MONTHS.indexOf(a.dateBadge.top);
        const bm = MONTHS.indexOf(b.dateBadge.top);
        if (am !== bm) return am - bm;
        return parseInt(a.dateBadge.bottom || "0") - parseInt(b.dateBadge.bottom || "0");
      });
  }, []);

  const visible = filter === "all" ? events : events.filter((e) => e.filterKey === filter);

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="Events Across the Capital District | Capital District Nest"
        description="Live music, festivals, markets, dining events, family activities, and things to do across the Capital District."
      />
      <CleanHeader />

      <main className="pt-24">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, rgba(94,234,212,0.07), transparent 60%), radial-gradient(40% 60% at 100% 100%, rgba(13,110,102,0.10), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative max-w-5xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-5">
              This Week
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-white leading-[1.02]">
              Events Across the Capital&nbsp;District
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Live music, festivals, markets, dining events, family activities,
              and things to do across the region.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#events-grid"
                className="inline-flex items-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-white transition"
              >
                View This Week <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/submit-event"
                onClick={() => trackAddEventClick("weekly_hero")}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Add Your Event
              </Link>
            </div>
          </div>
        </section>

        {/* ACTION BAR */}
        <section className="relative border-b border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-white/80 text-sm md:text-base">
              Browse this week's events across the Capital District.
            </p>
            <Link
              to="/submit-event"
              onClick={() => trackAddEventClick("weekly_action_bar")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5eead4] hover:text-white transition"
            >
              Add Your Event <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FILTERS */}
        <section className="relative">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-8 md:pt-10">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => {
                      setFilter(f.key);
                      trackFilterClick(f.key);
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition border ${
                      active
                        ? "bg-[#5eead4] text-[#0B0F19] border-[#5eead4]"
                        : "bg-white/[0.04] text-white/80 border-white/10 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* EVENTS GRID */}
        <section id="events-grid" className="relative">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-10 md:py-14">
            {visible.length === 0 ? (
              <div className="text-center py-20 text-white/60">
                No events in this category right now. Check back soon.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {visible.map((ev) => (
                  <Link
                    key={ev.key}
                    to={ev.href}
                    onClick={() => trackCardClick(ev)}
                    className="group relative block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0F1424] hover:border-white/15 transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(11,15,25,0.85) 0%, rgba(11,15,25,0.25) 55%, rgba(11,15,25,0.1) 100%)",
                        }}
                        aria-hidden
                      />

                      {/* Date badge */}
                      <div className="absolute top-4 left-4 flex flex-col items-center justify-center w-[68px] rounded-xl bg-[#0B0F19]/85 backdrop-blur border border-white/15 py-2 shadow-lg">
                        <span className="text-[11px] font-semibold tracking-[0.18em] text-[#5eead4]">
                          {ev.dateBadge.top}
                        </span>
                        <span className="text-2xl font-semibold text-white leading-none mt-1">
                          {ev.dateBadge.bottom || "—"}
                        </span>
                      </div>

                      {/* Category badge */}
                      <span className="absolute top-4 right-4 inline-flex items-center px-3 py-1 rounded-full bg-white/[0.12] backdrop-blur border border-white/15 text-[11px] font-medium tracking-wide uppercase text-white">
                        {ev.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-7">
                      <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-snug text-white group-hover:text-[#5eead4] transition">
                        {ev.title}
                      </h3>
                      <p className="mt-3 text-sm md:text-[15px] text-white/70 font-light leading-relaxed line-clamp-3">
                        {ev.description}
                      </p>

                      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70">
                        {(ev.venue || ev.town) && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#5eead4]" />
                            {[ev.venue, ev.town].filter(Boolean).join(" · ")}
                          </span>
                        )}
                        {ev.time && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#5eead4]" />
                            {ev.time}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#5eead4] group-hover:text-white transition">
                        View Event
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ADD EVENT CTA */}
        <section className="relative border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-5">
              Contribute
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.035em] text-white leading-[1.05]">
              Hosting something local?
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Restaurants, venues, businesses, schools, nonprofits, and community
              organizations can submit events to be considered for Capital
              District Nest.
            </p>
            <div className="mt-8">
              <Link
                to="/submit-event"
                onClick={() => trackAddEventClick("weekly_bottom_cta")}
                className="inline-flex items-center gap-2 rounded-full bg-[#5eead4] text-[#0B0F19] px-7 py-3.5 text-sm font-semibold hover:bg-white transition"
              >
                Add Your Event <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WeeklyPulse;
