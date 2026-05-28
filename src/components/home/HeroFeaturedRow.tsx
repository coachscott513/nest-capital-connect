import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Phone, ArrowUpRight, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { BusinessDetailModal } from "@/components/local/BusinessDirectory";
import { useFeaturedBusinesses } from "@/hooks/usePaginatedBusinesses";
import { hasRealBusinessMedia } from "@/lib/businessImages";
import type { Business } from "@/data/businesses";

/* =============================================================
   HERO FEATURED ROW
   Premium hero spotlights pulled from REAL featured businesses
   in the live directory. INTEGRITY RULES:
   - Never hardcode fake businesses with stock photos.
   - Only show the cinematic image header when the business has
     uploaded its own media.
   - If fewer than 3 truly Featured rows exist, fill remaining
     slots with "Available Placement" CTAs — never with ordinary
     listings labeled Featured.
   ============================================================= */

const cleanTelHref = (phone?: string | null) => {
  const digits = phone?.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
};

const FeaturedBadge = () => (
  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] font-semibold tracking-[0.16em] uppercase text-white/90">
    <BadgeCheck className="w-3 h-3 text-[#5eead4]" />
    <span>Featured</span>
  </div>
);

const HeroCard = ({ business, onOpen }: { business: Business; onOpen: (b: Business) => void }) => {
  const phoneHref = cleanTelHref(business.phone);
  const open = () => onOpen(business);
  const hasMedia = hasRealBusinessMedia(business);

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
      <button
        type="button"
        onClick={open}
        aria-label={`View ${business.name}`}
        className="block relative w-full h-36 sm:h-40 overflow-hidden text-left"
      >
        {hasMedia && business.image ? (
          <>
            <img
              src={business.image}
              alt={business.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/30 to-transparent" />
          </>
        ) : (
          <div
            className="absolute inset-0 flex items-end p-4"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, rgba(94,234,212,0.18) 0%, transparent 55%), linear-gradient(180deg, #10141F 0%, #0B0F19 100%)",
            }}
          >
            <div>
              <p className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-[#5eead4]">
                {business.category}
              </p>
              <p className="mt-1 text-[17px] font-semibold tracking-[-0.015em] text-white leading-tight line-clamp-2">
                {business.name}
              </p>
            </div>
          </div>
        )}
        <FeaturedBadge />
      </button>

      <div className="relative p-4 sm:p-5 flex flex-col gap-2.5">
        <div>
          <p className="text-[9.5px] uppercase tracking-[0.22em] font-semibold text-white/45">
            {business.category}
          </p>
          <h3 className="mt-1 text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug line-clamp-1">
            {business.name}
          </h3>
        </div>

        {business.townLabel && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/55 font-light">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-white/40" />
              <span>{business.townLabel}</span>
            </span>
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-white text-[#0B0F19] text-[12.5px] font-semibold hover:opacity-90 transition"
          >
            <span>View Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          {phoneHref && (
            <a
              href={phoneHref}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Call ${business.name}`}
              className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/85 hover:border-[#5eead4]/55 hover:text-[#5eead4] transition"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const AvailableCard = () => (
  <Link
    to="/pricing"
    className="group relative rounded-2xl overflow-hidden ring-1 ring-dashed ring-[#5eead4]/30 hover:ring-[#5eead4]/65 transition-all duration-500 hover:-translate-y-0.5 p-5 flex flex-col justify-between min-h-[260px]"
    style={{
      background:
        "radial-gradient(120% 80% at 0% 0%, rgba(94,234,212,0.10) 0%, transparent 55%), linear-gradient(180deg, rgba(30,34,48,0.7) 0%, rgba(11,15,25,0.7) 100%)",
      backdropFilter: "blur(12px) saturate(140%)",
      WebkitBackdropFilter: "blur(12px) saturate(140%)",
    }}
  >
    <div>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/30 text-[#5eead4] text-[10px] font-semibold uppercase tracking-[0.18em] w-fit">
        <Sparkles className="w-3 h-3" /> Available
      </span>
      <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.015em] text-white leading-tight">
        Featured spotlight open.
      </h3>
      <p className="mt-2 text-[12.5px] text-white/60 font-light leading-relaxed">
        Reserve one of the first hero positions in our Capital District pilot.
      </p>
    </div>
    <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5eead4]">
      Request placement <ArrowRight className="w-3.5 h-3.5" />
    </span>
  </Link>
);

const HeroFeaturedRow = () => {
  const [openBusiness, setOpenBusiness] = useState<Business | null>(null);
  const featured = useFeaturedBusinesses(3);
  const desktopPlacements = Math.max(0, 3 - featured.length);
  // Mobile: never stack more than 1 empty placement card.
  const mobilePlacements = Math.min(desktopPlacements, 1);

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

      {/* Mobile: featured + at most 1 placement card */}
      <div className="grid grid-cols-1 gap-5 mt-6 md:hidden">
        {featured.map((b) => (
          <HeroCard key={b.slug} business={b} onOpen={setOpenBusiness} />
        ))}
        {Array.from({ length: mobilePlacements }).map((_, i) => (
          <AvailableCard key={`open-m-${i}`} />
        ))}
      </div>

      {/* Desktop / tablet: up to 3 placement cards */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 mt-8">
        {featured.map((b) => (
          <HeroCard key={b.slug} business={b} onOpen={setOpenBusiness} />
        ))}
        {Array.from({ length: desktopPlacements }).map((_, i) => (
          <AvailableCard key={`open-d-${i}`} />
        ))}
      </div>

      <BusinessDetailModal
        biz={openBusiness}
        onClose={() => setOpenBusiness(null)}
        all={featured}
      />
    </div>
  );
};

export default HeroFeaturedRow;
