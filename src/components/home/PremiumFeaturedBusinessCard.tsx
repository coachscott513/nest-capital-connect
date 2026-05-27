import { ArrowUpRight, Phone, Globe, MapPin } from "lucide-react";
import type { Business } from "@/data/businesses";

/* =============================================================
   PremiumFeaturedBusinessCard
   Editorial luxury card used ONLY in the homepage
   "Featured Local Spotlights" row. Do not reuse for the
   standard business directory.
   ============================================================= */

type Props = {
  business: Business;
  onOpen: (b: Business) => void;
};

const CATEGORY_FALLBACKS: Record<string, string> = {
  Restaurant:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  Coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
  Cafe:
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1600&q=80",
  Bakery:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80",
  Butcher:
    "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1600&q=80",
  Roofer:
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1600&q=80",
  Contractor:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  "Real Estate":
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1600&q=80",
  "Real Estate Attorney":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
  "Mortgage Lender":
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
  "Bank/Credit Union":
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
};

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80";

const resolveImage = (b: Business): string => {
  if (b.image) return b.image;
  return CATEGORY_FALLBACKS[b.category] || DEFAULT_FALLBACK;
};

const buildMeta = (b: Business): string => {
  const town = b.townLabel || "Capital District";
  return `${town} · ${b.category} · Featured local business`;
};

const PremiumFeaturedBusinessCard = ({ business, onOpen }: Props) => {
  const image = resolveImage(business);
  const phoneHref = business.phone
    ? `tel:${business.phone.replace(/[^\d+]/g, "")}`
    : null;

  return (
    <article
      className="group relative flex flex-col overflow-hidden text-left transition-all duration-500 hover:-translate-y-1"
      style={{
        background: "rgba(30, 34, 48, 0.75)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "28px",
        minHeight: "300px",
        boxShadow:
          "0 30px 80px -30px rgba(0,0,0,0.75), 0 2px 10px -2px rgba(0,0,0,0.4)",
      }}
    >
      {/* Image header */}
      <button
        type="button"
        onClick={() => onOpen(business)}
        className="relative block w-full h-48 md:h-56 overflow-hidden"
        aria-label={`View ${business.name}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/40 to-transparent" />

        {/* Featured badge */}
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] shadow-[0_0_8px_rgba(94,234,212,0.8)]" />
          Featured
        </span>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
          {business.category}
        </p>
        <h3 className="mt-2 text-[19px] md:text-[21px] font-semibold tracking-[-0.01em] text-white leading-snug">
          {business.name}
        </h3>

        <p className="mt-2 text-[12px] text-white/55 inline-flex items-center gap-1.5 font-light">
          <MapPin className="w-3.5 h-3.5 text-white/40" />
          <span>{buildMeta(business)}</span>
        </p>

        {business.tagline && (
          <p className="mt-3 text-[14px] text-white/65 font-light leading-relaxed line-clamp-2">
            {business.tagline}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto pt-6 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onOpen(business)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-white/[0.92] backdrop-blur-xl text-[#0B0F19] text-[13px] font-semibold hover:bg-white transition-all shadow-[0_8px_24px_-8px_rgba(255,255,255,0.25)]"
          >
            View Profile <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {phoneHref && (
            <a
              href={phoneHref}
              aria-label={`Call ${business.name}`}
              className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] text-white/85 hover:border-[#5eead4]/55 hover:text-[#5eead4] hover:bg-white/[0.08] transition"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}

          {!phoneHref && business.website && (
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${business.name} website`}
              className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] text-white/85 hover:border-[#5eead4]/55 hover:text-[#5eead4] hover:bg-white/[0.08] transition"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default PremiumFeaturedBusinessCard;
