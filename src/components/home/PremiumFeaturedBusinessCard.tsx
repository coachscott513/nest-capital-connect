import { ArrowUpRight, Phone, MapPin } from "lucide-react";
import type { Business } from "@/data/businesses";
import { resolveBusinessImage, DEFAULT_BUSINESS_IMAGE } from "@/lib/businessImages";

/* =============================================================
   PremiumFeaturedBusinessCard
   Editorial luxury card used ONLY in the homepage
   "Featured Local Spotlights" row. Do not reuse for the
   standard business directory.

   Click behavior (LOCKED): primary CTA = "View Profile" which
   opens the shared BusinessDetailModal. Website / menu / phone
   live INSIDE the modal — never on the card itself, so every
   business card on the site behaves consistently.
   ============================================================= */

type Props = {
  business: Business;
  onOpen: (b: Business) => void;
};

const DEFAULT_FALLBACK = DEFAULT_BUSINESS_IMAGE;

const resolveImage = (b: Business): string => resolveBusinessImage(b);

const buildMeta = (b: Business): string => {
  const town = b.townLabel || "Capital District";
  return `${town} · ${b.category} · Featured local business`;
};

const cleanTelHref = (phone?: string | null) => {
  const digits = phone?.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
};

const PremiumFeaturedBusinessCard = ({ business, onOpen }: Props) => {
  const image = resolveImage(business);
  const phoneHref = cleanTelHref(business.phone);
  const handleProfileOpen = () => onOpen(business);

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
        onClick={handleProfileOpen}
        className="relative block w-full h-44 sm:h-48 md:h-56 overflow-hidden"
        aria-label={`View ${business.name}`}
      >
        <img
          src={image}
          alt={`${business.name} — ${business.category}`}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          width={800}
          height={448}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/40 to-transparent" />

        {/* Featured badge */}
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] shadow-[0_0_8px_rgba(94,234,212,0.8)]" />
          Featured
        </span>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
          {business.category}
        </p>
        <h3 className="mt-2 text-[17px] sm:text-[19px] md:text-[21px] font-semibold tracking-[-0.01em] text-white leading-snug">
          {business.name}
        </h3>

        <p className="mt-2 text-[12px] text-white/55 flex items-start gap-1.5 font-light">
          <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0 mt-[2px]" />
          <span className="leading-snug">{buildMeta(business)}</span>
        </p>

        {business.tagline && (
          <p className="mt-3 text-[14px] text-white/65 font-light leading-relaxed line-clamp-2">
            {business.tagline}
          </p>
        )}


        {/* Actions — always open the shared premium modal */}
        <div className="mt-auto pt-6 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleProfileOpen}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-white/[0.92] backdrop-blur-xl text-[#0B0F19] text-[13px] font-semibold hover:bg-white transition-all shadow-[0_8px_24px_-8px_rgba(255,255,255,0.25)]"
          >
            View Profile <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {phoneHref && (
            <a
              href={phoneHref}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Call ${business.name}`}
              className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] text-white/85 hover:border-[#5eead4]/55 hover:text-[#5eead4] hover:bg-white/[0.08] transition"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default PremiumFeaturedBusinessCard;
