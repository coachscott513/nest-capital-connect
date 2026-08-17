import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { businessCategoryClick } from "@/lib/homeAnalytics";

import imgRestaurants from "@/assets/category-restaurants.jpg";
import imgContractors from "@/assets/category-contractors.jpg";
import imgServices from "@/assets/category-services.jpg";
import imgRetail from "@/assets/category-retail.jpg";
import imgFinance from "@/assets/category-finance.jpg";
import imgRealEstate from "@/assets/category-realestate.jpg";

/* =============================================================
   CHAPTER 3 — BUSINESSES AND SERVICES
   Merges the former "Explore the Capital District" gateway grid
   and the standalone "Grow your business" CTA into one chapter.
   Every destination is an existing canonical category route —
   no business is auto-featured, ranked, or endorsed here.
   ============================================================= */

type Tile = {
  slug: string;
  title: string;
  copy: string;
  image: string;
  span: "wide" | "half" | "third";
};

const TILES: Tile[] = [
  {
    slug: "restaurant",
    title: "Restaurants & Food",
    copy: "Dining rooms, cafés, bakeries, and the kitchens that define each town.",
    image: imgRestaurants,
    span: "wide",
  },
  {
    slug: "construction",
    title: "Contractors & Trades",
    copy: "Builders, remodelers, and the crews that keep Capital District homes standing.",
    image: imgContractors,
    span: "half",
  },
  {
    slug: "healthcare",
    title: "Healthcare & Dental",
    copy: "Primary care, specialists, and dental practices across the region.",
    image: imgServices,
    span: "half",
  },
  {
    slug: "retail",
    title: "Shops & Retail",
    copy: "Independent storefronts, boutiques, and neighborhood mainstays.",
    image: imgRetail,
    span: "third",
  },
  {
    slug: "banking-and-finance",
    title: "Finance & Insurance",
    copy: "Lenders, advisors, and insurance professionals working locally.",
    image: imgFinance,
    span: "third",
  },
  {
    slug: "real-estate",
    title: "Real Estate & Property",
    copy: "Offices, managers, and the professionals behind local transactions.",
    image: imgRealEstate,
    span: "third",
  },
];

const spanClass = (span: Tile["span"]) =>
  span === "wide"
    ? "md:col-span-6 aspect-[16/9] md:aspect-[21/9]"
    : span === "half"
      ? "md:col-span-3 aspect-[4/3]"
      : "md:col-span-2 aspect-[4/3]";

const BusinessesServicesChapter = () => (
  <section
    id="businesses-and-services"
    className="relative w-full overflow-hidden border-t border-white/[0.06] bg-surface-canvas scroll-mt-24"
  >
    <div
      className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28"
      style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <p className="text-[10px] md:text-[11px] font-medium tracking-[0.45em] uppercase text-text-quiet">
          Businesses & Services
        </p>
        <h2 className="mt-5 text-3xl md:text-5xl tracking-[-0.035em] leading-[1.07] text-white text-balance">
          <span className="font-extralight text-text-bright">
            Thousands of Capital District businesses.
          </span>
          <span className="block font-semibold">One place to begin.</span>
        </h2>
        <p className="mt-5 text-[15px] md:text-[17px] text-text-soft font-light leading-relaxed">
          Browse by what you actually need. Categories are organized by role, not
          by who paid to appear.
        </p>
      </motion.div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6">
        {TILES.map((t, i) => (
          <motion.div
            key={t.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={spanClass(t.span).split(" ")[0]}
          >
            <Link
              to={`/businesses/${t.slug}`}
              onClick={() => businessCategoryClick(t.slug)}
              className="group relative block h-full rounded-[26px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#5eead4]/40 hover:-translate-y-1 transition-all duration-500 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
            >
              <div className={`relative overflow-hidden ${spanClass(t.span).split(" ").slice(1).join(" ")}`}>
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
                  <h3 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.03em] leading-[1.08] text-white">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[15px] text-white/75 font-light leading-relaxed max-w-md">
                    {t.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                    Browse
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
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
      <p className="mt-8 text-[13px] text-white/45 font-light leading-relaxed max-w-2xl">
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

export default BusinessesServicesChapter;
