import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackGAEvent } from "@/components/GARouteTracker";

import imgRestaurants from "@/assets/category-restaurants.jpg";
import imgContractors from "@/assets/category-contractors.jpg";
import imgRealEstate from "@/assets/category-realestate.jpg";
import imgEvents from "@/assets/category-events.jpg";
import imgRetail from "@/assets/category-retail.jpg";
import imgServices from "@/assets/category-services.jpg";

/* =============================================================
   CATEGORY FEATURE GRID
   Apple-style 2x3 premium tile section. Reusable across regions
   and town pages — configurable via the `tiles` prop. Mobile
   stacks vertically (no horizontal carousel).
   ============================================================= */

export type CategoryTile = {
  key: string;
  headline: string;
  description: string;
  cta: string;
  to: string;
  image: string;
};

const DEFAULT_TILES: CategoryTile[] = [
  {
    key: "restaurants",
    headline: "Restaurants & Bars",
    description: "Find the places locals love for dining, drinks, and everyday favorites.",
    cta: "Explore Dining",
    to: "/local?category=restaurant",
    image: imgRestaurants,
  },
  {
    key: "contractors",
    headline: "Contractors & Home Services",
    description: "Discover trusted local contractors, home improvement pros, and essential service providers.",
    cta: "Explore Contractors",
    to: "/local?category=home-services",
    image: imgContractors,
  },
  {
    key: "real-estate",
    headline: "Real Estate & Housing",
    description: "Browse homes, housing resources, local agents, lenders, and real estate services.",
    cta: "Explore Housing",
    to: "/homes",
    image: imgRealEstate,
  },
  {
    key: "events",
    headline: "Events & Things To Do",
    description: "See what's happening locally, from community events to entertainment and seasonal favorites.",
    cta: "Explore Events",
    to: "/weekly",
    image: imgEvents,
  },
  {
    key: "retail",
    headline: "Shopping & Retail",
    description: "Shop local and discover boutiques, retail favorites, specialty stores, and everyday essentials.",
    cta: "Explore Retail",
    to: "/local?category=retail",
    image: imgRetail,
  },
  {
    key: "services",
    headline: "Health, Wellness & Professional Services",
    description: "Find wellness providers, local experts, healthcare, dental, financial, legal, and professional services.",
    cta: "Explore Services",
    to: "/local?category=professional-services",
    image: imgServices,
  },
];

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  tiles?: CategoryTile[];
  sourceLocation?: string;
};

export default function CategoryFeatureGrid({
  eyebrow = "Browse by Category",
  title = "Explore the Capital District by Category",
  subtitle = "Find restaurants, contractors, real estate services, events, shopping, healthcare, wellness, and professional services across the region.",
  tiles = DEFAULT_TILES,
  sourceLocation = "homepage_six_tile_grid",
}: Props) {
  const handleClick = (tile: CategoryTile) => {
    try {
      trackGAEvent.custom?.("category_tile_click", {
        category_name: tile.headline,
        destination_url: tile.to,
        source_location: sourceLocation,
        page_path: typeof window !== "undefined" ? window.location.pathname : "/",
      });
    } catch {
      /* analytics is best-effort */
    }
  };

  return (
    <section
      id="category-discovery"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 0%, rgba(94,234,212,0.06), transparent 60%), radial-gradient(40% 50% at 100% 100%, rgba(13,110,102,0.10), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.035em] leading-[1.05] text-white">
            {title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {tiles.map((tile, idx) => (
            <motion.div
              key={tile.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={tile.to}
                onClick={() => handleClick(tile)}
                className="group relative block rounded-[28px] overflow-hidden border border-white/[0.08] bg-[#11151f] min-h-[360px] md:min-h-[420px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] hover:border-[#5eead4]/40 hover:shadow-[0_40px_100px_-30px_rgba(94,234,212,0.25)] transition-all duration-500"
              >
                <img
                  src={tile.image}
                  alt={tile.headline}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,15,25,0.96) 0%, rgba(11,15,25,0.75) 38%, rgba(11,15,25,0.35) 70%, rgba(11,15,25,0.20) 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(80% 60% at 50% 100%, rgba(94,234,212,0.15), transparent 70%)",
                  }}
                  aria-hidden
                />

                <div className="relative h-full flex flex-col justify-end p-7 md:p-8">
                  <h3 className="text-2xl md:text-[1.75rem] font-semibold text-white tracking-[-0.02em] leading-[1.1]">
                    {tile.headline}
                  </h3>
                  <p className="mt-3 text-[14.5px] md:text-[15px] text-white/75 font-light leading-relaxed max-w-md">
                    {tile.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:text-white transition">
                    {tile.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
