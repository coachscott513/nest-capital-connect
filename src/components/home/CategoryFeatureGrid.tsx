import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


import imgRestaurants from "@/assets/category-restaurants.jpg";
import imgContractors from "@/assets/category-contractors.jpg";
import imgRealEstate from "@/assets/category-realestate.jpg";
import imgEvents from "@/assets/category-events.jpg";
import imgRetail from "@/assets/category-retail.jpg";
import imgServices from "@/assets/category-services.jpg";
import imgFinance from "@/assets/category-finance.jpg";

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
    headline: "Restaurants & Taverns",
    description: "Dining, drinks, cafés, and neighborhood favorites across the Capital District.",
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
    key: "health-wellness",
    headline: "Health & Wellness",
    description: "Healthcare, dental, fitness, mental health, and wellness providers across the region.",
    cta: "Explore Wellness",
    to: "/local?category=health-wellness",
    image: imgServices,
  },
  {
    key: "finance-legal",
    headline: "Mortgage, Legal & Finance",
    description: "Local lenders, attorneys, accountants, insurance providers, and financial professionals.",
    cta: "Explore Finance",
    to: "/finances",
    image: imgFinance,
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
  title = "Explore Local Life",
  subtitle = "Restaurants, services, homes, events, shops, and local experts across the Capital District.",
  tiles = DEFAULT_TILES,
  sourceLocation = "homepage_six_tile_grid",
}: Props) {
  const handleClick = (tile: CategoryTile) => {
    try {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "category_tile_click", {
          category_name: tile.headline,
          destination_url: tile.to,
          source_location: sourceLocation,
          page_path: window.location.pathname,
        });
      }
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
      <div className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            {eyebrow}
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            {title}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
                className="group relative block rounded-md overflow-hidden bg-[#11151f] h-[380px] sm:h-[440px] md:h-[520px] lg:h-[600px] transition-all duration-500"
              >
                <img
                  src={tile.image}
                  alt={tile.headline}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(11,15,25,0.55) 0%, rgba(11,15,25,0.20) 35%, rgba(11,15,25,0.20) 60%, rgba(11,15,25,0.85) 100%)",
                  }}
                  aria-hidden
                />

                <div className="relative h-full flex flex-col items-center text-center px-6 md:px-10 pt-10 md:pt-14">
                  <h3 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-semibold text-white tracking-[-0.03em] leading-[1.05] max-w-xl">
                    {tile.headline}
                  </h3>
                  <p className="mt-4 text-[15px] md:text-base text-white/80 font-light leading-relaxed max-w-md">
                    {tile.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#5eead4] group-hover:text-white transition">
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

