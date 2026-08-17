import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { businessCategoryClick } from "@/lib/homeAnalytics";
import { logEngagement } from "@/lib/engagement";

import imgRestaurants from "@/assets/category-restaurants.jpg";
import imgContractors from "@/assets/category-contractors.jpg";
import imgServices from "@/assets/category-services.jpg";
import imgRetail from "@/assets/category-retail.jpg";
import imgFinance from "@/assets/category-finance.jpg";
import imgRealEstate from "@/assets/category-realestate.jpg";

/* =============================================================
   CHAPTER 3 — BUSINESSES AND SERVICES
   One primary discovery rail (canonical business categories) plus
   one compact category-access treatment that now also carries the
   Home Services destinations formerly shown as a separate chapter.
   Every destination is an existing canonical route — no business is
   auto-featured, ranked, or endorsed here.
   ============================================================= */

const HOME_SERVICES_PLACEMENT = "homepage-home-services";

type Tile = { slug: string; title: string; copy: string; image: string };

const TILES: Tile[] = [
  {
    slug: "restaurant",
    title: "Restaurants & Food",
    copy: "Dining rooms, cafés, bakeries, and the kitchens that define each town.",
    image: imgRestaurants,
  },
  {
    slug: "construction",
    title: "Contractors & Trades",
    copy: "Builders, remodelers, and the crews that keep Capital District homes standing.",
    image: imgContractors,
  },
  {
    slug: "healthcare",
    title: "Healthcare & Dental",
    copy: "Primary care, specialists, and dental practices across the region.",
    image: imgServices,
  },
  {
    slug: "retail",
    title: "Shops & Retail",
    copy: "Independent storefronts, boutiques, and neighborhood mainstays.",
    image: imgRetail,
  },
  {
    slug: "banking-and-finance",
    title: "Finance & Insurance",
    copy: "Lenders, advisors, and insurance professionals working locally.",
    image: imgFinance,
  },
  {
    slug: "real-estate",
    title: "Real Estate & Property",
    copy: "Offices, managers, and the professionals behind local transactions.",
    image: imgRealEstate,
  },
];

/** Canonical `/local?category=<slug>` deep links, unchanged from the
 *  former Home Services chapter. The full set stays on /home-services. */
const HOME_SERVICES = [
  { slug: "cleaning-services", label: "Cleaning & clean-outs" },
  { slug: "landscaping", label: "Landscaping & tree service" },
  { slug: "construction", label: "Contractors & repairs" },
  { slug: "home-improvement", label: "Handyman & home improvement" },
  { slug: "roofing", label: "Roofing" },
  { slug: "hvac", label: "HVAC" },
  { slug: "plumbing", label: "Plumbing" },
  { slug: "electrician", label: "Electrical" },
  { slug: "property-management", label: "Property management" },
];

const arrowClass =
  "w-10 h-10 rounded-full border border-white/12 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.09] inline-flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60";

const BusinessesServicesChapter = () => {
  const rail = useRef<HTMLDivElement | null>(null);
  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section
      id="businesses-and-services"
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-surface-canvas scroll-mt-24"
    >
      <div
        className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 md:py-20"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] md:text-[11px] font-medium tracking-[0.45em] uppercase text-text-quiet">
              Businesses &amp; Services
            </p>
            <h2 className="mt-4 text-3xl md:text-[2.9rem] tracking-[-0.035em] leading-[1.07] text-white text-balance">
              <span className="font-extralight text-text-bright">
                Thousands of Capital District businesses.
              </span>
              <span className="block font-semibold">One place to begin.</span>
            </h2>
            <p className="mt-4 text-[15px] md:text-[16.5px] text-text-soft font-light leading-relaxed">
              Browse by what you actually need. Categories are organized by role,
              not by who paid to appear.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button type="button" aria-label="Scroll categories left" onClick={() => nudge(-1)} className={arrowClass}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" aria-label="Scroll categories right" onClick={() => nudge(1)} className={arrowClass}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Primary discovery rail — one visual system, landscape cards */}
        <div
          ref={rail}
          className="mt-9 md:mt-12 -mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {TILES.map((t) => (
            <Link
              key={t.slug}
              to={`/businesses/${t.slug}`}
              onClick={() => businessCategoryClick(t.slug)}
              className="group relative snap-start shrink-0 w-[78vw] sm:w-[52vw] lg:w-[38%] rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#5eead4]/40 transition-all duration-500 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={t.image}
                  alt=""
                  loading="lazy"
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,15,25,0.18) 0%, rgba(11,15,25,0.6) 55%, rgba(11,15,25,0.94) 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h3 className="text-2xl md:text-[1.9rem] font-semibold tracking-[-0.03em] leading-[1.08] text-white">
                    {t.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] text-white/75 font-light leading-relaxed max-w-md">
                    {t.copy}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                    Browse
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className="shrink-0 w-1" aria-hidden />
        </div>

        {/* Compact category access — includes Home Services destinations */}
        <div className="mt-10 md:mt-12 rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="text-[10px] font-medium tracking-[0.42em] uppercase text-[#5eead4]">
              Home &amp; property services
            </p>
            <Link
              to="/home-services"
              onClick={() =>
                logEngagement("home_services_open", {}, { source_location: HOME_SERVICES_PLACEMENT })
              }
              className="text-[13px] font-semibold text-white/70 hover:text-white transition"
            >
              All Home Services →
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {HOME_SERVICES.map((c) => (
              <Link
                key={c.slug}
                to={`/local?category=${c.slug}`}
                onClick={() =>
                  logEngagement("home_service_category_click", {}, {
                    source_location: HOME_SERVICES_PLACEMENT,
                    category_slug: c.slug,
                  })
                }
                className="inline-flex items-center min-h-[40px] px-4 rounded-full border border-white/12 bg-white/[0.04] text-[13px] font-medium text-white/80 hover:text-white hover:border-[#5eead4]/40 hover:bg-white/[0.08] transition"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/local"
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-white text-[#0B0F19] text-[13px] font-semibold hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
          >
            Search the full directory <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border border-white/15 bg-white/[0.04] text-white text-[13px] font-semibold hover:bg-white/[0.09] transition"
          >
            All categories
          </Link>
        </div>

        {/* Owner entry — one quiet line, not a competing chapter. */}
        <p className="mt-6 text-[13px] text-white/45 font-light leading-relaxed max-w-2xl">
          Own a business here?{" "}
          <Link to="/for-businesses" className="text-[#5eead4] font-medium hover:underline">
            See how listings work
          </Link>{" "}
          or{" "}
          <Link to="/claim-business" className="text-[#5eead4] font-medium hover:underline">
            claim your page
          </Link>
          . Editorial coverage follows our{" "}
          <Link to="/editorial-policy" className="text-[#5eead4] font-medium hover:underline">
            standards
          </Link>
          , and sponsorship never buys editorial opinion or organic rank.
        </p>
      </div>
    </section>
  );
};

export default BusinessesServicesChapter;
