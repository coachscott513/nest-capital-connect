import { Link } from "react-router-dom";
import { Search, MapPin, ArrowRight } from "lucide-react";
import TownSpatialMap from "@/components/town/TownSpatialMap";
import delmarHeroImg from "@/assets/delmar-hero.jpg";

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

const TOWN_HEROES: Record<string, string> = {
  delmar: delmarHeroImg,
};

const TownHeroSection = ({
  townName,
  townSlug,
  schoolDistrict,
  leadParagraph,
  countyInfo,
  heroImage,
  avgYield,
  marketVelocity,
  medianPrice,
  activeListings,
  avgDaysOnMarket,
  nestScore,
  onSearchClick,
}: TownHeroSectionProps) => {
  const resolvedHero = TOWN_HEROES[townSlug] || heroImage || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-background">
      {/* Full-bleed cinematic background at reduced opacity */}
      <img
        src={resolvedHero}
        alt={`${townName} streetscape`}
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.25) saturate(0.6)", opacity: 0.4 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

      {/* Split-pane hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-0">
          {/* LEFT — Narrative */}
          <div className="mb-8 lg:mb-12">
            {schoolDistrict && (
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{schoolDistrict}</span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground leading-tight mb-6 tracking-tight">
              {townName} <span className="text-primary text-glow">Intelligence</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed body-airy">
              {leadParagraph.substring(0, 150)}...
            </p>

            {countyInfo && (
              <Link
                to={countyInfo.path}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 mb-6"
              >
                See all {countyInfo.name} Spotlights <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onSearchClick}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform glow-primary"
              >
                <Search className="w-5 h-5" />
                Search {townName} Homes
              </button>
              <Link
                to="/dealdesk"
                className="inline-flex items-center justify-center gap-2 glass border border-primary/30 text-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/20 transition-colors"
              >
                Request Property Intel
              </Link>
            </div>
          </div>

          {/* RIGHT — Spatial Intelligence Map */}
          <div className="hidden lg:block h-[420px] mb-0">
            <TownSpatialMap townSlug={townSlug} townName={townName} />
          </div>
        </div>

        {/* At-a-Glance Stats Overlay — borderless tiles at bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20 rounded-t-2xl overflow-hidden backdrop-blur-xl">
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
          ].map((stat) => (
            <div key={stat.label} className="bg-background/80 backdrop-blur-sm p-6 text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              {stat.sub && <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>}
            </div>
          ))}
        </div>

        {/* Mobile map — shown below stats on small screens */}
        <div className="lg:hidden mt-6 mb-8 h-[300px]">
          <TownSpatialMap townSlug={townSlug} townName={townName} zoom={13} />
        </div>
      </div>
    </section>
  );
};

export default TownHeroSection;
