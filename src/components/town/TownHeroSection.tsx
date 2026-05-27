import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightSearch from "@/components/home/SpotlightSearch";


interface TownHeroSectionProps {
  townName: string;
  townSlug: string;
  schoolDistrict?: string;
  leadParagraph: string;
  countyInfo?: { name: string; path: string } | null;
  heroImage?: string;
  avgYield: string;
  marketVelocity: "High" | "Medium" | "Low";
  medianPrice?: number | null;
  activeListings?: number | null;
  avgDaysOnMarket?: number | null;
  nestScore: number;
  onSearchClick: () => void;
}

const TownHeroSection = ({
  townName,
  townSlug,
  schoolDistrict,
  leadParagraph,
  countyInfo,
  avgYield,
  marketVelocity,
  medianPrice,
  activeListings,
  avgDaysOnMarket,
  nestScore,
  onSearchClick,
}: TownHeroSectionProps) => {
  return (
    <section className="relative bg-background overflow-hidden">
      {/* Ambient glow — matches homepage */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full px-6 md:px-10 lg:px-16 pt-28 pb-12 md:pt-36 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5eead4] mb-6">
            {schoolDistrict || `${townName} · Capital District`}
          </p>

          <h1 className="text-[2.5rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.25rem] font-semibold tracking-[-0.04em] leading-[0.98] text-foreground">
            Search anything{" "}
            <span className="bg-gradient-to-r from-foreground via-foreground to-[#5eead4] bg-clip-text text-transparent">
              {townName}.
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-foreground/65 max-w-2xl mx-auto font-light leading-relaxed">
            {leadParagraph.substring(0, 180)}…
          </p>

          {/* Omni search + pills (same surface as the homepage) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 md:mt-12"
          >
            <SpotlightSearch />
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <button
              onClick={onSearchClick}
              className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
            >
              <Search className="w-4 h-4" />
              Search {townName} Homes
            </button>
            {countyInfo && (
              <Link
                to={countyInfo.path}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground px-2 py-3 font-medium transition-colors"
              >
                All {countyInfo.name} Spotlights <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* At-a-Glance Stats — clean borderless tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-16 border-t border-border">
          {[
            {
              label: "Median Sale Price",
              value: medianPrice ? `$${(medianPrice / 1000).toFixed(0)}K` : "—",
              sub: activeListings ? `${activeListings} active listings` : undefined,
            },
            {
              label: "School Rank",
              value: `${nestScore}/10`,
              sub: schoolDistrict || "District Data",
            },
            {
              label: "Market Velocity",
              value: avgDaysOnMarket ? `${avgDaysOnMarket}d` : "—",
              sub: marketVelocity === "High" ? "Fast-moving market" : marketVelocity === "Medium" ? "Moderate pace" : "Buyer's market",
            },
            {
              label: "Avg. Yield",
              value: avgYield,
              sub: "Cash-on-Cash Return",
            },
          ].map((stat, i) => (
            <div key={stat.label} className={`py-8 px-6 text-center ${i < 3 ? "border-r border-border" : ""}`}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-2">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
              {stat.sub && <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TownHeroSection;
