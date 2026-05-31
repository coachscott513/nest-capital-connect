import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import evAlive from "@/assets/event-alive-at-five.jpg";
import evTroy from "@/assets/event-troy-market.jpg";
import evSaratoga from "@/assets/event-saratoga-concerts.jpg";
import evJazz from "@/assets/event-live-jazz.jpg";
import evPlaza from "@/assets/event-empire-plaza.jpg";
import evDelmar from "@/assets/event-delmar-dining.jpg";
import evFoodWine from "@/assets/event-food-wine.jpg";
import evFamily from "@/assets/event-family-weekend.jpg";

/* =============================================================
   ENDLESS ENTERTAINMENT
   Apple-TV style cinematic carousel. One large centered card,
   peek of adjacent slides on each side. Horizontal swipe on
   mobile. Header eyebrow + subtle "View all events" link.
   ============================================================= */

type FeaturedEvent = {
  key: string;
  category: string;
  title: string;
  subtitle: string;
  meta: string;
  to: string;
  image: string;
};

const EVENTS: FeaturedEvent[] = [
  {
    key: "alive-at-five",
    category: "Live Music",
    title: "Alive at Five",
    subtitle: "Live music in downtown Albany all summer long.",
    meta: "Thursday · 5:00 PM · Albany",
    to: "/weekly",
    image: evAlive,
  },
  {
    key: "troy-market",
    category: "Market",
    title: "Troy Waterfront Farmers Market",
    subtitle: "Local food, makers, coffee, flowers, and weekend energy in downtown Troy.",
    meta: "Saturday · 9:00 AM · Troy",
    to: "/weekly",
    image: evTroy,
  },
  {
    key: "saratoga-concerts",
    category: "Concerts",
    title: "Saratoga Summer Concert Series",
    subtitle: "Outdoor music and summer nights in one of the Capital Region's favorite destinations.",
    meta: "This Week · Saratoga Springs",
    to: "/weekly",
    image: evSaratoga,
  },
  {
    key: "live-jazz",
    category: "Dining & Music",
    title: "Live Jazz at Roosevelt Room",
    subtitle: "Cocktails, dinner, and live jazz in a refined downtown setting.",
    meta: "Friday & Saturday · Albany",
    to: "/weekly",
    image: evJazz,
  },
  {
    key: "empire-plaza",
    category: "Community",
    title: "Empire State Plaza Events",
    subtitle: "Food, music, cultural events, and seasonal gatherings in the heart of Albany.",
    meta: "This Week · Albany",
    to: "/weekly",
    image: evPlaza,
  },
  {
    key: "delmar-dining",
    category: "Dining",
    title: "Delmar Restaurant Week",
    subtitle: "Local dining specials, neighborhood favorites, and places to try this week.",
    meta: "This Week · Delmar",
    to: "/weekly",
    image: evDelmar,
  },
  {
    key: "food-wine",
    category: "Food & Drink",
    title: "Capital Region Food & Wine Night",
    subtitle: "Tastings, local menus, cocktails, and a night out across the region.",
    meta: "Saturday Evening · Capital District",
    to: "/weekly",
    image: evFoodWine,
  },
  {
    key: "family-weekend",
    category: "Family",
    title: "Family Weekend in the Capital District",
    subtitle: "Parks, markets, community events, and kid-friendly things to do nearby.",
    meta: "Saturday & Sunday · Regionwide",
    to: "/weekly",
    image: evFamily,
  },
];

function trackClick(ev: FeaturedEvent) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "event_card_click", {
        event_title: ev.title,
        event_category: ev.category,
        event_location: ev.meta,
        destination_url: ev.to,
        source_location: "homepage_endless_entertainment",
        page_path: window.location.pathname,
      });
    }
  } catch {
    /* analytics best-effort */
  }
}

export default function EndlessEntertainment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Scroll active slide into centered position
  const scrollToIndex = useCallback((idx: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(EVENTS.length - 1, idx));
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    const trackRect = track.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const offset =
      card.offsetLeft - (trackRect.width - cardRect.width) / 2;
    track.scrollTo({ left: offset, behavior: smooth ? "smooth" : "auto" });
    setActive(clamped);
  }, []);

  // Detect which slide is centered on scroll (for dots + autosnap state)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackRect = track.getBoundingClientRect();
        const center = trackRect.left + trackRect.width / 2;
        let bestIdx = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((c, i) => {
          const r = (c as HTMLElement).getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const d = Math.abs(cx - center);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });
        setActive(bestIdx);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Center first card on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => scrollToIndex(0, false));
    return () => cancelAnimationFrame(id);
  }, [scrollToIndex]);

  // Autoplay — slow, infinite, pause on hover / interaction
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % EVENTS.length;
        scrollToIndex(next);
        return next;
      });
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused, scrollToIndex]);

  const go = (delta: number) => scrollToIndex(active + delta);

  return (
    <section
      id="endless-entertainment"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 1500)}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(94,234,212,0.05), transparent 60%), radial-gradient(40% 60% at 0% 100%, rgba(13,110,102,0.10), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-6 md:pb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
              This Week
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
              Endless Entertainment
            </h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-white/70 font-light leading-relaxed">
              Live music, festivals, markets, dining events, and things to do across the Capital District.
            </p>
          </div>
          <Link
            to="/weekly"
            className="hidden md:inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/80 hover:text-[#5eead4] transition"
          >
            View all events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous event"
          onClick={() => go(-1)}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/40 backdrop-blur border border-white/15 text-white hover:bg-black/60 transition disabled:opacity-30"
          disabled={active === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next event"
          onClick={() => go(1)}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-black/40 backdrop-blur border border-white/15 text-white hover:bg-black/60 transition disabled:opacity-30"
          disabled={active === EVENTS.length - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[12%] sm:px-[10%] md:px-[12%] lg:px-[14%] pb-12 pt-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>{`#endless-entertainment ::-webkit-scrollbar{display:none}`}</style>

          {EVENTS.map((ev, idx) => {
            const isActive = idx === active;
            return (
              <Link
                key={ev.key}
                to={ev.to}
                onClick={() => trackClick(ev)}
                className={`group relative flex-shrink-0 snap-center block overflow-hidden rounded-xl border border-white/[0.06] transition-all duration-500
                  w-[88%] sm:w-[82%] md:w-[76%] lg:w-[72%] xl:w-[68%]
                  h-[360px] sm:h-[440px] md:h-[520px] lg:h-[600px]
                  ${isActive ? "opacity-100 scale-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]" : "opacity-55 scale-[0.97]"}`}
                aria-label={ev.title}
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.55) 35%, rgba(11,15,25,0.15) 65%, rgba(11,15,25,0.45) 100%)",
                  }}
                  aria-hidden
                />

                <div className="relative h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
                  <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-white/[0.12] backdrop-blur border border-white/15 text-[11px] font-medium tracking-wide uppercase text-white/90">
                    {ev.category}
                  </span>
                  <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.05] text-white max-w-2xl">
                    {ev.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] md:text-base text-white/80 font-light leading-relaxed">
                    {ev.subtitle}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="text-sm text-white/70">{ev.meta}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5eead4] group-hover:text-white transition">
                      View Event <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 pb-16 md:pb-20">
          {EVENTS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-[#5eead4]" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
