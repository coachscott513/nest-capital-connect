import { Home, Building2, Wrench, TreePine, ArrowRight } from "lucide-react";

interface SearchCommandModulesProps {
  townName: string;
  townSlug: string;
  onSearchClick: (category: string) => void;
}

const MODULES = [
  {
    id: "residential",
    label: "Find a Nest",
    icon: Home,
    placeholderTemplate: (town: string) => `Find ${town} residential nests...`,
    description: "Single-family homes, condos & townhouses",
  },
  {
    id: "multi-unit",
    label: "Analyze Yields",
    icon: Building2,
    placeholderTemplate: (town: string) => `Analyze ${town} multi-unit yields...`,
    description: "2–4 unit & apartment buildings",
  },
  {
    id: "rehab",
    label: "Scout Rehabs",
    icon: Wrench,
    placeholderTemplate: (town: string) => `Scout ${town} fixer-upper opportunities...`,
    description: "Value-add & renovation plays",
  },
  {
    id: "land",
    label: "Acquire Land",
    icon: TreePine,
    placeholderTemplate: (town: string) => `Discover ${town} vacant parcels...`,
    description: "Vacant lots, acreage & development sites",
  },
];

const SearchCommandModules = ({ townName, townSlug, onSearchClick }: SearchCommandModulesProps) => {
  return (
    <section className="w-full px-[5%] py-16 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Left-aligned header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">
            Property Search
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            What are you looking for in {townName}?
          </h2>
        </div>

        {/* 2×2 Bento Grid on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => onSearchClick(mod.id)}
                className="group w-full text-left bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-foreground/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Icon + Category */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {mod.description}
                      </span>
                    </div>

                    {/* Bespoke placeholder text */}
                    <p className="text-sm text-muted-foreground mb-5 font-mono">
                      {mod.placeholderTemplate(townName)}
                    </p>
                  </div>
                </div>

                {/* Big action button — full width on mobile */}
                <div className="flex items-center justify-between bg-foreground text-background rounded-xl px-5 py-3.5 group-hover:bg-foreground/90 transition-colors">
                  <span className="text-sm font-bold tracking-wide uppercase">
                    {mod.label}
                  </span>
                  <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchCommandModules;
