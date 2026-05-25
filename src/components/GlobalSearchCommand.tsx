import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, GraduationCap, Users, X, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";

// Shared town data for instant search.
const BASE_TOWNS = CAPITAL_DISTRICT_COUNTIES.flatMap((county) =>
  county.towns.map((town) => ({ ...town, county: county.name.replace(/ County$/, "") })),
).sort((a, b) => a.name.localeCompare(b.name));

// School districts for search
const SCHOOL_DISTRICTS = [
  { name: "Shenendehowa Central School District", slug: "clifton-park", type: "K-12" },
  { name: "Bethlehem Central School District", slug: "delmar", type: "K-12" },
  { name: "Niskayuna Central School District", slug: "niskayuna", type: "K-12" },
  { name: "Guilderland Central School District", slug: "guilderland", type: "K-12" },
  { name: "Saratoga Springs Central School District", slug: "saratoga-springs", type: "K-12" },
  { name: "Albany City School District", slug: "albany", type: "K-12" },
  { name: "Troy City School District", slug: "troy", type: "K-12" },
  { name: "Schenectady City School District", slug: "schenectady", type: "K-12" },
  { name: "University at Albany (SUNY)", slug: "albany", type: "University" },
  { name: "Rensselaer Polytechnic Institute (RPI)", slug: "troy", type: "University" },
  { name: "Union College", slug: "schenectady", type: "University" },
  { name: "Siena College", slug: "loudonville", type: "University" },
  { name: "SUNY Cobleskill", slug: "cobleskill", type: "University" },
  { name: "Hudson Valley Community College (HVCC)", slug: "troy", type: "Community College" },
  { name: "Schenectady County Community College", slug: "schenectady", type: "Community College" },
];

interface SearchResult {
  type: "town" | "business" | "school";
  name: string;
  subtitle: string;
  slug: string;
  icon: React.ReactNode;
}

type SearchTown = { name: string; slug: string; county: string };
type SearchBusiness = { id: string; name: string; town_slug: string; town_name: string | null; is_verified: boolean | null };

interface GlobalSearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearchCommand = ({ isOpen, onClose }: GlobalSearchCommandProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [businesses, setBusinesses] = useState<SearchBusiness[]>([]);
  const [dbTowns, setDbTowns] = useState<SearchTown[]>([]);
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load businesses on mount
  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoadingBusinesses(true);
      const [voices, directory] = await Promise.all([
        supabase
          .from("local_voices")
          .select("id, business_name, town_slug, is_verified")
          .order("display_order"),
        supabase
          .from("businesses")
          .select("id,name,town_slug,town_name,is_verified")
          .eq("is_active", true)
          .order("name", { ascending: true })
          .limit(2000),
      ]);
      
      const voiceRows: SearchBusiness[] = (voices.data ?? []).map((biz) => ({
        id: biz.id,
        name: biz.business_name,
        town_slug: biz.town_slug,
        town_name: null,
        is_verified: biz.is_verified,
      }));
      const directoryRows: SearchBusiness[] = (directory.data ?? []).map((biz) => ({
        id: biz.id,
        name: biz.name,
        town_slug: biz.town_slug,
        town_name: biz.town_name,
        is_verified: biz.is_verified,
      }));
      setBusinesses([...voiceRows, ...directoryRows]);

      const townMap = new Map<string, SearchTown>();
      for (const biz of directoryRows) {
        if (!biz.town_slug || biz.town_slug === "unknown") continue;
        const name = biz.town_name || biz.town_slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
        townMap.set(biz.town_slug, { name, slug: biz.town_slug, county: "Capital District" });
      }
      setDbTowns([...townMap.values()]);
      setIsLoadingBusinesses(false);
    };

    if (isOpen) {
      fetchBusinesses();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];
    const towns = [
      ...BASE_TOWNS,
      ...dbTowns.filter((town) => !BASE_TOWNS.some((base) => base.slug === town.slug)),
    ];

    // Search towns
    towns.forEach((town) => {
      if (
        town.name.toLowerCase().includes(lowerQuery) ||
        town.county.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "town",
          name: town.name,
          subtitle: `${town.county} County`,
          slug: town.slug,
          icon: <MapPin className="w-4 h-4 text-primary" />,
        });
      }
    });

    // Search schools
    SCHOOL_DISTRICTS.forEach((school) => {
      if (school.name.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "school",
          name: school.name,
          subtitle: school.type,
          slug: school.slug,
          icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
        });
      }
    });

    // Search businesses
    businesses.forEach((biz) => {
      if (biz.name.toLowerCase().includes(lowerQuery)) {
        const town = towns.find((t) => t.slug === biz.town_slug);
        searchResults.push({
          type: "business",
          name: biz.name,
          subtitle: town ? `${town.name}${biz.is_verified ? " • Verified" : ""}` : biz.town_slug,
          slug: biz.town_slug,
          icon: biz.is_verified ? (
            <Sparkles className="w-4 h-4 text-primary" />
          ) : (
            <Building2 className="w-4 h-4 text-muted-foreground" />
          ),
        });
      }
    });

    // Limit results
    setResults(searchResults.slice(0, 12));
    setSelectedIndex(0);
  }, [query, businesses, dbTowns]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(`/living-in/${result.slug}`);
    setQuery("");
    onClose();
  };

  const allTowns = [
    ...BASE_TOWNS,
    ...dbTowns.filter((town) => !BASE_TOWNS.some((base) => base.slug === town.slug)),
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-2xl p-0 overflow-hidden border-border"
        style={{
          background: "rgba(11, 11, 11, 0.98)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search towns, businesses, schools across 11 counties..."
            className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none"
            autoComplete="off"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoadingBusinesses && query && (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading...
            </div>
          )}

          {!query && !isLoadingBusinesses && (
            <div className="p-6 space-y-4">
              <p className="text-xs uppercase tracking-widest text-primary font-medium">Quick Access</p>
              <div className="grid grid-cols-2 gap-2">
                {["Albany", "Troy", "Schenectady", "Saratoga Springs", "Catskill", "Cobleskill"].map((town) => {
                  const t = allTowns.find((x) => x.name === town);
                  return t ? (
                    <button
                      key={t.slug}
                      onClick={() => handleSelect({ type: "town", name: t.name, subtitle: t.county, slug: t.slug, icon: null })}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors text-left"
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                      {t.name}
                    </button>
                  ) : null;
                })}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  Search across <span className="text-foreground font-medium">52+ towns</span>, <span className="text-foreground font-medium">local businesses</span>, and <span className="text-foreground font-medium">schools</span> in 11 counties.
                </p>
              </div>
            </div>
          )}

          {query && results.length === 0 && !isLoadingBusinesses && (
            <div className="p-8 text-center">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No results for "{query}"</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching for a town, business, or school</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.name}-${index}`}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-3 px-5 py-3 transition-colors text-left ${
                    selectedIndex === index ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                    {result.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${selectedIndex === index ? "text-primary" : "text-foreground"}`}>
                      {result.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1 rounded bg-muted/30">
                    {result.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px]">esc</kbd>
              Close
            </span>
          </div>
          <span className="text-primary">Nest Intelligence</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalSearchCommand;
