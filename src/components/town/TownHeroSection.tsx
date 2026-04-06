import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";


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
      {/* Subtle ambient glow — matches homepage */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-28 pb-0 md:pt-40 md:pb-0 lg:pt-48 lg:pb-0">
        <div className="max-w-3xl">

          {/* LEFT — Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 lg:space-y-10"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              {schoolDistrict || `${townName} Intelligence`}
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-foreground tracking-[-0.035em] leading-[1.02]">
              {townName}
            </h1>

            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-lg font-light">
              {leadParagraph.substring(0, 180)}...
            </p>

            {countyInfo && (
              <Link
                to={countyInfo.path}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                See all {countyInfo.name} Spotlights <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <button
                onClick={onSearchClick}
                className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-base hover:bg-foreground/85 transition-colors"
              >
                <Search className="w-4 h-4" />
                Search {townName} Homes
              </button>
              <Link
                to="/dealdesk"
                className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground px-2 py-4 font-medium text-base transition-colors"
              >
                Request Property Intel →
              </Link>
            </div>
          </motion.div>

        </div>

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
