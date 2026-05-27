import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Phone, ArrowUpRight, Clock, MapPin } from "lucide-react";

/* =============================================================
   HERO FEATURED ROW — premium "Verified Local Legend" cards
   embedded directly inside the hero glass surface, below the
   Omni-Search and trending pills. 3-up on desktop, snap carousel
   on mobile. Glass canvas, micro photo carousel, anchored CTA.
   ============================================================= */

type HeroSpotlight = {
  name: string;
  category: string;
  town: string;
  hoursToday: string;
  phone: string;
  gallery: string[];
  to: string;
  ctaLabel: string;
};

const HERO_SPOTLIGHTS: HeroSpotlight[] = [
  {
    name: "The Perfect Blend Café",
    category: "Café · Roastery",
    town: "Delmar, NY",
    hoursToday: "6:30 AM – 5:00 PM",
    phone: "(518) 439-0001",
    gallery: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1400&q=80",
    ],
    to: "/local?search=Perfect+Blend",
    ctaLabel: "View Café Menu",
  },
  {
    name: "McCarroll's The Village Butcher",
    category: "Butcher · Local Provisions",
    town: "Slingerlands, NY",
    hoursToday: "9:00 AM – 6:00 PM",
    phone: "(518) 439-9000",
    gallery: [
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551892589-865f69869476?auto=format&fit=crop&w=1400&q=80",
    ],
    to: "/local?search=McCarroll",
    ctaLabel: "Connect Instantly",
  },
  {
    name: "Roux",
    category: "Restaurant · Modern Comfort",
    town: "Albany, NY",
    hoursToday: "5:00 PM – 10:00 PM",
    phone: "(518) 689-3434",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    ],
    to: "/local?search=Roux",
    ctaLabel: "View Dinner Menu",
  },
];

const HeroCard = ({ s, delay }: { s: HeroSpotlight; delay: number }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % s.gallery.length),
      4800 + delay * 600,
    );
    return () => clearInterval(id);
  }, [s.gallery.length, delay]);

  return (
    <article
      className="snap-center shrink-0 w-[82vw] sm:w-auto group relative rounded-2xl overflow-hidden text-left ring-1 ring-white/10 hover:ring-[#5eead4]/45 transition-all duration-500 hover:-translate-y-0.5"
      style={{
        background: "rgba(30, 34, 48, 0.7)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        boxShadow: "0 24px 60px -28px rgba(0,0,0,0.75)",
      }}
    >
      {/* Photo carousel */}
      <Link to={s.to} className="block relative h-36 sm:h-40 w-full overflow-hidden">
        {s.gallery.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "scale(1.04)" : "scale(1)",
              transition: "opacity 1100ms ease-out, transform 6000ms ease-out",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/30 to-transparent" />

        {/* Verified badge */}
        <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md border border-[#5eead4]/40 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5eead4]">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[#5eead4] animate-ping opacity-70" />
            <span className="relative rounded-full w-1.5 h-1.5 bg-[#5eead4]" />
          </span>
          Verified Local Legend
        </span>

        {/* Gallery dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {s.gallery.map((_, i) => (
            <span
              key={i}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === idx ? 14 : 5,
                background: i === idx ? "#5eead4" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      </Link>

      {/* Body */}
      <div className="relative p-4 sm:p-5 flex flex-col gap-2.5">
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-white/45">
            {s.category}
          </p>
          <h3 className="mt-1 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug line-clamp-1">
            {s.name}
          </h3>
        </div>

        {/* Micro stats */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/55 font-light">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white/40" /> {s.town}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-white/40" /> {s.hoursToday}
          </span>
        </div>

        {/* Anchored CTAs */}
        <div className="mt-2 flex items-center gap-2">
          <Link
            to={s.to}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white text-[#0B0F19] text-[12.5px] font-semibold hover:opacity-90 transition"
          >
            {s.ctaLabel} <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={`tel:${s.phone.replace(/[^\d+]/g, "")}`}
            aria-label={`Call ${s.name}`}
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/85 hover:border-[#5eead4]/55 hover:text-[#5eead4] transition"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};

const HeroFeaturedRow = () => {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="flex items-center justify-between mb-3 px-1">
        <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40">
          Featured Regional Spotlights
        </p>
        <Link
          to="/local"
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-[#5eead4] transition"
        >
          See all →
        </Link>
      </div>

      {/* Mobile: snap carousel · Desktop: 3-col grid */}
      <div className="sm:hidden -mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {HERO_SPOTLIGHTS.map((s, i) => (
          <HeroCard key={s.name} s={s} delay={i} />
        ))}
      </div>
      <div className="hidden sm:grid sm:grid-cols-3 gap-4">
        {HERO_SPOTLIGHTS.map((s, i) => (
          <HeroCard key={s.name} s={s} delay={i} />
        ))}
      </div>
    </div>
  );
};

export default HeroFeaturedRow;
