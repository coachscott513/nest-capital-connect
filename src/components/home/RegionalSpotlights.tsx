import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { BusinessDetailModal } from "@/components/local/BusinessDirectory";
import type { Business } from "@/data/businesses";

/* =============================================================
   REGIONAL SPOTLIGHTS — Member Local Legends
   Premium horizontal swipe carousel of hand-picked, fully-loaded
   "Model Profile" businesses. Sits directly under the Omni-Search
   to demonstrate the gold-standard layout that paid tiers unlock.
   ============================================================= */

type Spotlight = {
  name: string;
  category: string;
  town: string;
  tagline: string;
  phone: string;
  website: string;
  address: string;
  hours: string;
  status: "open" | "closing-soon" | "closed";
  gallery: string[];
  socials: { facebook?: string; instagram?: string };
  slug: string;
  menu_url?: string;
  ctaIntent?: "connect";
  accent: "gold" | "emerald";
};

const SPOTLIGHTS: Spotlight[] = [
  {
    name: "The Perfect Blend Café",
    category: "Café · Roastery",
    town: "Delmar",
    tagline:
      "Hand-pulled espresso, scratch pastries, and the unofficial morning office of Delmar.",
    phone: "(518) 439-0001",
    website: "https://theperfectblendcafe.com",
    address: "Delaware Ave, Delmar NY",
    hours: "Mon–Sat · 6:30a – 5p",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559496417-e7f25cb247cd?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    slug: "the-perfect-blend-cafe",
    accent: "emerald",
  },
  {
    name: "McCarroll's The Village Butcher",
    category: "Butcher · Local Provisions",
    town: "Slingerlands",
    tagline:
      "Three generations of dry-aged steaks, house sausage, and prepared dinners worth the line.",
    phone: "(518) 439-9000",
    website: "https://mccarrollsbutcher.com",
    address: "1465 New Scotland Rd, Slingerlands NY",
    hours: "Tue–Sat · 9a – 6p",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1551892589-865f69869476?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    slug: "mccarrolls-the-village-butcher",
    ctaIntent: "connect",
    accent: "gold",
  },
  {
    name: "Roux",
    category: "Restaurant · Modern Comfort",
    town: "Albany",
    tagline:
      "Wood-fired plates and a wine list quietly running the Capital Region's dinner scene.",
    phone: "(518) 689-3434",
    website: "https://rouxalbany.com",
    address: "Lark St, Albany NY",
    hours: "Wed–Sun · 5p – 10p",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    slug: "roux",
    accent: "gold",
  },
  {
    name: "Stewart's Shops Roastery",
    category: "Coffee · Maker",
    town: "Saratoga Springs",
    tagline:
      "The Capital District's hometown roaster — single-origin beans, ice cream, and Friday-night legends.",
    phone: "(518) 581-1200",
    website: "https://stewartsshops.com",
    address: "Broadway, Saratoga Springs NY",
    hours: "Daily · 5a – 11p",
    status: "open",
    gallery: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1400&q=80",
    ],
    socials: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
    },
    slug: "stewarts-shops-roastery",
    accent: "emerald",
  },
];

const safeUrl = (value?: string | null) => {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

const cleanTelHref = (phone?: string | null) => {
  const digits = phone?.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
};

// Card CTA is always "View Profile" → opens the shared BusinessDetailModal.
// Website / menu / directions live INSIDE the modal so behavior is consistent
// across homepage, search results, town pages, and category pages.

const toBusiness = (s: Spotlight): Business => ({
  slug: s.slug,
  name: s.name,
  town: s.town.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  townLabel: s.town,
  category: s.category.toLowerCase().includes("café") || s.category.toLowerCase().includes("coffee") ? "Coffee" : s.category.toLowerCase().includes("butcher") ? "Retail" : "Restaurant",
  tagline: s.tagline,
  phone: s.phone,
  website: s.website,
  address: s.address,
  hours: s.hours,
  image: s.gallery[0],
  gallery: s.gallery,
  socials: s.socials,
  featured: true,
});

const StatusDot = ({ status }: { status: Spotlight["status"] }) => {
  const color =
    status === "open"
      ? "#22c55e"
      : status === "closing-soon"
      ? "#facc15"
      : "#ef4444";
  const label =
    status === "open"
      ? "Open Now"
      : status === "closing-soon"
      ? "Closing Soon"
      : "Closed";
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
      <span className="relative flex w-1.5 h-1.5">
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-60"
          style={{ background: color }}
        />
        <span
          className="relative rounded-full w-1.5 h-1.5"
          style={{ background: color }}
        />
      </span>
      {label}
    </span>
  );
};

const SpotlightCard = ({ s, onOpen }: { s: Spotlight; onOpen: (s: Spotlight) => void }) => {
  const [idx, setIdx] = useState(0);
  const accent = s.accent === "gold" ? "#c9a449" : "#5eead4";
  const accentSoft =
    s.accent === "gold" ? "rgba(201,164,73,0.35)" : "rgba(94,234,212,0.35)";
  const phoneHref = cleanTelHref(s.phone);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % s.gallery.length),
      4500 + Math.random() * 1500,
    );
    return () => clearInterval(id);
  }, [s.gallery.length]);

  return (
    <article
      className="snap-center shrink-0 w-[86vw] sm:w-[420px] md:w-[460px] group relative rounded-[26px] overflow-hidden bg-[#13182A] border border-white/[0.06]"
      style={{ boxShadow: `0 30px 70px -30px ${accentSoft}` }}
    >
      {/* Animated accent border — razor-thin shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-70"
        style={{
          padding: 1,
          background: `linear-gradient(135deg, ${accent}55, transparent 35%, transparent 65%, ${accent}55)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Slideable photo gallery */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden">
        {s.gallery.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ease-out"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "scale(1.02)" : "scale(1)",
              transition:
                "opacity 1200ms ease-out, transform 6000ms ease-out",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13182A] via-[#13182A]/35 to-transparent" />

        {/* Verification badge — top right */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{
              background: accent,
              color: "#0B0F19",
              boxShadow: `0 6px 18px -4px ${accentSoft}`,
            }}
          >
            <BadgeCheck className="w-3 h-3" /> Member
          </span>
        </div>

        {/* Live status — top left */}
        <div className="absolute top-3.5 left-3.5">
          <StatusDot status={s.status} />
        </div>

        {/* Gallery dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {s.gallery.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setIdx(i);
              }}
              aria-label={`Show photo ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === idx ? 18 : 6,
                background:
                  i === idx ? accent : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="relative p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/55">
          {s.category} · {s.town}
        </p>
        <h3 className="mt-1.5 text-[22px] font-semibold tracking-tight text-white leading-snug">
          {s.name}
        </h3>
        <p className="mt-2.5 text-sm text-white/65 font-light leading-relaxed line-clamp-2">
          {s.tagline}
        </p>

        {/* Contact pills */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition"
              style={{
                background: "rgba(94,234,212,0.10)",
                border: "1px solid rgba(94,234,212,0.30)",
                color: "#5eead4",
              }}
            >
              <Phone className="w-3 h-3" /> Call
            </a>
          )}
          <a
            href={s.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-white/30 transition"
          >
            <Globe className="w-3 h-3" /> Website
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-white/30 transition"
          >
            <MapPin className="w-3 h-3" /> Directions
          </a>
          {s.socials.instagram && (
            <a
              href={s.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-white/30 transition"
            >
              <Instagram className="w-3 h-3" />
            </a>
          )}
          {s.socials.facebook && (
            <a
              href={s.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/15 text-[11px] text-white/80 hover:border-white/30 transition"
            >
              <Facebook className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/55">
            <Calendar className="w-3 h-3" /> {s.hours}
          </span>
          <button
            type="button"
            onClick={() => onOpen(s)}
            className="inline-flex items-center gap-1 text-sm font-semibold transition"
            style={{ color: accent }}
          >
            View Profile{" "}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
};

const RegionalSpotlights = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [openBusiness, setOpenBusiness] = useState<Business | null>(null);
  const modalBusinesses = SPOTLIGHTS.map(toBusiness);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="relative bg-[#0B0F19] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6 mb-9 md:mb-12 flex-wrap"
        >
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Featured Local Spotlights
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-white">
              The Local Pulse
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/60 font-light leading-relaxed">
              Hand-picked, fully-loaded profiles from the businesses defining the
              Capital District right now.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] transition flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:border-[#5eead4]/50 hover:text-[#5eead4] transition flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div
          ref={trackRef}
          className="-mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3"
        >
          {SPOTLIGHTS.map((s) => (
            <SpotlightCard key={s.name} s={s} onOpen={(spotlight) => setOpenBusiness(toBusiness(spotlight))} />
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-white/55 font-light">
            Want this layout for your business?{" "}
            <span className="text-white/80">Featured & Spotlight tiers unlock it.</span>
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a449] text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
          >
            Become a Featured Partner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <BusinessDetailModal biz={openBusiness} onClose={() => setOpenBusiness(null)} all={modalBusinesses} />
      </div>
    </section>
  );
};

export default RegionalSpotlights;
