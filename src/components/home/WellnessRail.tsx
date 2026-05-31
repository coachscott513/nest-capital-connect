import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import imgFitness from "@/assets/wellness-fitness.jpg";
import imgBeauty from "@/assets/wellness-beauty.jpg";
import imgRecovery from "@/assets/wellness-recovery.jpg";
import imgDining from "@/assets/wellness-dining.jpg";
import imgCare from "@/assets/wellness-care.jpg";
import imgOutdoor from "@/assets/wellness-outdoor.jpg";

/* =============================================================
   WELLNESS RAIL
   Smaller Apple-style horizontal row (3-up desktop) directly
   beneath the large Endless Entertainment carousel. Auto-slide,
   pause on hover/touch, swipe on mobile.
   ============================================================= */

type WellnessCard = {
  key: string;
  tag: string;
  title: string;
  text: string;
  cta: string;
  to: string;
  image: string;
};

const CARDS: WellnessCard[] = [
  {
    key: "fitness",
    tag: "Fitness",
    title: "Move Better, Feel Better",
    text: "Local gyms, trainers, yoga, Pilates, and boutique fitness spaces.",
    cta: "Explore Fitness",
    to: "/local?category=fitness",
    image: imgFitness,
  },
  {
    key: "beauty",
    tag: "Beauty",
    title: "Skin, Beauty & Self-Care",
    text: "Med spas, salons, estheticians, skincare, and beauty providers.",
    cta: "Explore Beauty",
    to: "/local?category=beauty-and-personal-care",
    image: imgBeauty,
  },
  {
    key: "recovery",
    tag: "Recovery",
    title: "Recover, Recharge, Reset",
    text: "Massage, chiropractic, stretching, IV therapy, and recovery services.",
    cta: "Explore Recovery",
    to: "/local?category=healthcare",
    image: imgRecovery,
  },
  {
    key: "dining",
    tag: "Nutrition",
    title: "Healthy Local Favorites",
    text: "Juice bars, smoothie shops, clean eating, and wellness-focused cafés.",
    cta: "Explore Healthy Dining",
    to: "/local?category=food-and-beverage",
    image: imgDining,
  },
  {
    key: "care",
    tag: "Care",
    title: "Healthcare & Wellness Pros",
    text: "Dentists, therapy providers, medical offices, and local care teams.",
    cta: "Explore Care",
    to: "/local?category=healthcare",
    image: imgCare,
  },
  {
    key: "outdoor",
    tag: "Lifestyle",
    title: "Wellness Beyond the Gym",
    text: "Parks, trails, yoga events, walks, and healthy things to do nearby.",
    cta: "Explore Outdoors",
    to: "/weekly",
    image: imgOutdoor,
  },
];

function trackClick(card: WellnessCard) {
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "wellness_card_click", {
        wellness_tag: card.tag,
        wellness_title: card.title,
        destination_url: card.to,
        source_location: "homepage_wellness_rail",
        page_path: window.location.pathname,
      });
    }
  } catch {
    /* analytics best-effort */
  }
}

export default function WellnessRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = useCallback((idx: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = ((idx % CARDS.length) + CARDS.length) % CARDS.length;
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - 16,
      behavior: smooth ? "smooth" : "auto",
    });
    setActive(clamped);
  }, []);

  // Track which card is leading on scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const trackLeft = track.getBoundingClientRect().left;
        let bestIdx = 0;
        let bestDist = Infinity;
        Array.from(track.children).forEach((c, i) => {
          const r = (c as HTMLElement).getBoundingClientRect();
          const d = Math.abs(r.left - trackLeft - 16);
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

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % CARDS.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, scrollToIndex]);

  const go = (delta: number) => scrollToIndex(active + delta);

  return (
    <section
      id="wellness-rail"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.04]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => window.setTimeout(() => setPaused(false), 1500)}
    >
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-12 md:pt-16 pb-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
              Live Well
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              Health, Fitness & Wellness
            </h2>
            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70 font-light leading-relaxed">
              Gyms, studios, med spas, recovery, healthy dining, and wellness providers across the Capital District.
            </p>
          </div>
          <Link
            to="/local?category=healthcare"
            className="hidden md:inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-white/80 hover:text-[#5eead4] transition"
          >
            View all wellness <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/40 backdrop-blur border border-white/15 text-white hover:bg-black/60 transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/40 backdrop-blur border border-white/15 text-white hover:bg-black/60 transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 md:px-10 pb-14 pt-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>{`#wellness-rail ::-webkit-scrollbar{display:none}`}</style>

          {CARDS.map((card) => (
            <Link
              key={card.key}
              to={card.to}
              onClick={() => trackClick(card)}
              className="group relative flex-shrink-0 snap-start block overflow-hidden rounded-[10px] border border-white/[0.06] hover:border-white/15 transition-all duration-500
                w-[86%] sm:w-[60%] md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]
                h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]"
              aria-label={card.title}
            >
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                width={1280}
                height={720}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.45) 45%, rgba(11,15,25,0.10) 75%, rgba(11,15,25,0.35) 100%)",
                }}
                aria-hidden
              />
              <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full bg-white/[0.12] backdrop-blur border border-white/15 text-[10px] font-medium tracking-wide uppercase text-white/90">
                  {card.tag}
                </span>
                <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-[1.1] text-white">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[13px] md:text-sm text-white/75 font-light leading-snug line-clamp-2">
                  {card.text}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#5eead4] group-hover:text-white transition">
                  {card.cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
