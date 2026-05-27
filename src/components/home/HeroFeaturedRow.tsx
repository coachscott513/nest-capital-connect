import { Link } from "react-router-dom";
import { BadgeCheck, Phone, ArrowUpRight, Clock, MapPin } from "lucide-react";

/* =============================================================
   HERO FEATURED ROW — premium "Member Local Legend" cards
   embedded directly inside the hero glass surface, below the
   Omni-Search and trending pills. Stable single-image variant.
   ============================================================= */

type HeroSpotlight = {
  name: string;
  category: string;
  town: string;
  hoursToday: string;
  phone: string;
  image_url: string;
  to: string;
  ctaLabel: string;
};

const PLACEHOLDER_SCENIC =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80";

const HERO_SPOTLIGHTS: HeroSpotlight[] = [
  {
    name: "The Perfect Blend Café",
    category: "Café · Roastery",
    town: "Delmar, NY",
    hoursToday: "6:30 AM – 5:00 PM",
    phone: "(518) 439-0001",
    image_url:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1400&q=80",
    to: "/local?search=Perfect+Blend",
    ctaLabel: "View Café Menu",
  },
  {
    name: "McCarroll's The Village Butcher",
    category: "Butcher · Local Provisions",
    town: "Slingerlands, NY",
    hoursToday: "9:00 AM – 6:00 PM",
    phone: "(518) 439-9000",
    image_url:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1400&q=80",
    to: "/local?search=McCarroll",
    ctaLabel: "Connect Instantly",
  },
  {
    name: "Roux",
    category: "Restaurant · Modern Comfort",
    town: "Albany, NY",
    hoursToday: "5:00 PM – 10:00 PM",
    phone: "(518) 689-3434",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    to: "/local?search=Roux",
    ctaLabel: "View Dinner Menu",
  },
];

const FeaturedBadge = () => (
  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-[0.16em] uppercase text-white/90">
    <BadgeCheck className="w-3 h-3 text-[#5eead4]" />
    <span>Featured</span>
  </div>
);

const HeroCard = ({ business }: { business: HeroSpotlight }) => {
  const src = business.image_url || PLACEHOLDER_SCENIC;

  return (
    <article
      className="group relative rounded-2xl overflow-hidden text-left ring-1 ring-white/10 hover:ring-[#5eead4]/45 transition-all duration-500 hover:-translate-y-0.5"
      style={{
        background: "rgba(30, 34, 48, 0.7)",
        backdropFilter: "blur(12px) saturate(140%)",
        WebkitBackdropFilter: "blur(12px) saturate(140%)",
        boxShadow: "0 24px 60px -28px rgba(0,0,0,0.75)",
      }}
    >
      <Link
        to={business.to}
        className="block relative w-full h-36 sm:h-40 overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={src}
            alt={business.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_SCENIC;
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/30 to-transparent" />
        <FeaturedBadge />
      </Link>

      <div className="relative p-4 sm:p-5 flex flex-col gap-2.5">
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-white/45">
            {business.category}
          </p>
          <h3 className="mt-1 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug line-clamp-1">
            {business.name}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/55 font-light">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white/40" />
            <span>{business.town}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-white/40" />
            <span>{business.hoursToday}</span>
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Link
            to={business.to}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white text-[#0B0F19] text-[12.5px] font-semibold hover:opacity-90 transition"
          >
            <span>{business.ctaLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
            aria-label={`Call ${business.name}`}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {HERO_SPOTLIGHTS.map((business) => (
          <HeroCard key={business.name} business={business} />
        ))}
      </div>
    </div>
  );
};

export default HeroFeaturedRow;
