import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Flame,
  CalendarDays,
  UtensilsCrossed,
  Wrench,
  Stethoscope,
  Smile,
  Briefcase,
  Scissors,
  Dumbbell,
  Car,
  Home as HomeIcon,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* =============================================================
   CAPITAL DISTRICT DISCOVERY CONSOLE
   Permanent homepage section directly below the hero search.
   Two-column premium split panel — broad local discovery
   (not real estate heavy). Counts pulled live from the
   businesses table; missing counts are hidden cleanly.
   ============================================================= */

type CategoryRow = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  /** Patterns matched (case-insensitive) against category, subcategory, name. */
  patterns: string[];
  /** Word for the count, e.g. "listings", "providers", "offices". */
  unit: string;
};

const CATEGORIES: CategoryRow[] = [
  {
    key: "food-drink",
    label: "Food & Drink",
    icon: UtensilsCrossed,
    to: "/local?category=Restaurant",
    patterns: ["restaurant", "cafe", "café", "coffee", "bakery", "bar", "pub", "pizz", "deli", "diner", "eatery", "brewery", "bistro"],
    unit: "listings",
  },
  {
    key: "home-services",
    label: "Home Services",
    icon: Wrench,
    to: "/local?category=Home%20Service",
    patterns: ["contractor", "plumb", "electric", "hvac", "landscap", "roof", "clean", "handyman", "painter", "remodel"],
    unit: "listings",
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: Stethoscope,
    to: "/local?category=Healthcare",
    patterns: ["healthcare", "medical", "clinic", "doctor", "physician", "urgent care", "chiropract", "physical therapy", "pediatric", "dermatolog"],
    unit: "providers",
  },
  {
    key: "dental",
    label: "Dental",
    icon: Smile,
    to: "/local?category=Dental",
    patterns: ["dental", "dentist", "orthodont", "endodont", "periodont"],
    unit: "offices",
  },
  {
    key: "professional",
    label: "Professional Services",
    icon: Briefcase,
    to: "/local?category=Attorney",
    patterns: ["attorney", "lawyer", "legal", "accountant", "cpa", "financial advisor", "insurance", "marketing", "mortgage", "consult"],
    unit: "providers",
  },
  {
    key: "beauty",
    label: "Beauty & Personal Care",
    icon: Scissors,
    to: "/local?category=Salon",
    patterns: ["salon", "barber", "nail", "hair", "beauty", "lash", "brow", "skincare"],
    unit: "listings",
  },
  {
    key: "fitness",
    label: "Fitness & Wellness",
    icon: Dumbbell,
    to: "/local?category=Gym",
    patterns: ["gym", "fitness", "crossfit", "yoga", "pilates", "wellness", "massage", "spa", "studio"],
    unit: "studios",
  },
  {
    key: "automotive",
    label: "Automotive",
    icon: Car,
    to: "/local?category=Auto",
    patterns: ["auto", "mechanic", "tire", "car wash", "oil change", "collision", "dealer"],
    unit: "shops",
  },
  {
    key: "real-estate",
    label: "Real Estate",
    icon: HomeIcon,
    to: "/real-estate",
    patterns: [], // Real estate lives in its own vertical — no business count.
    unit: "towns",
  },
  {
    key: "events",
    label: "Events",
    icon: PartyPopper,
    to: "/weekly",
    patterns: [], // Events come from the weekly feed, not the directory.
    unit: "this week",
  },
];

const TRENDING_NOW: { label: string; to: string }[] = [
  { label: "Delmar coffee shops",          to: "/local?q=coffee&town=delmar" },
  { label: "Troy contractors",             to: "/local?q=contractor&town=troy" },
  { label: "Albany restaurants",           to: "/local?q=restaurant&town=albany" },
  { label: "Saratoga events",              to: "/weekly" },
  { label: "Clifton Park dentists",        to: "/local?q=dentist&town=clifton-park" },
  { label: "Schenectady cleaning services",to: "/local?q=cleaning&town=schenectady" },
  { label: "Mortgage lenders",             to: "/local?q=mortgage" },
  { label: "55+ communities",              to: "/local?q=55%2B" },
];

const THIS_WEEK: { label: string; to: string }[] = [
  { label: "Live music in downtown Troy",        to: "/weekly" },
  { label: "Restaurant week · Clifton Park",     to: "/weekly" },
  { label: "New business openings",              to: "/weekly" },
  { label: "Weekend events",                     to: "/weekly" },
  { label: "Featured town updates",              to: "/communities" },
  { label: "Local specials & promotions",        to: "/local" },
];

/* Count businesses matching any of the given patterns (case-insensitive,
   matched against category, subcategory, and name). */
async function countCategory(patterns: string[]): Promise<number | null> {
  if (!patterns.length) return null;
  const escape = (v: string) => v.replace(/[%,()]/g, " ").trim();
  const clauses = patterns
    .flatMap((p) => {
      const safe = escape(p);
      return [
        `category.ilike.%${safe}%`,
        `subcategory.ilike.%${safe}%`,
        `name.ilike.%${safe}%`,
      ];
    })
    .join(",");
  const { count, error } = await supabase
    .from("businesses")
    .select("id", { count: "exact", head: true })
    .or(clauses);
  if (error) return null;
  return count ?? null;
}

export default function DiscoveryConsole() {
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries = await Promise.all(
        CATEGORIES.map(async (c) => [c.key, await countCategory(c.patterns)] as const),
      );
      if (cancelled) return;
      const next: Record<string, number | null> = {};
      for (const [k, v] of entries) next[k] = v;
      setCounts(next);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative px-[5%] py-16 md:py-20 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow + title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10 text-center"
        >
          <p className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-[0.32em] uppercase text-[#5eead4]">
            <Sparkles className="w-3 h-3" />
            Search the region
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground">
            Capital District <span className="text-[#5eead4]">Discovery Console</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/65 max-w-2xl mx-auto font-light">
            The digital front door of the Capital District — businesses, towns, events,
            services, and community discovery in one searchable local platform.
          </p>
        </motion.div>

        {/* Split panel */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[28px] border border-white/12 bg-[#0B0F19]/95 backdrop-blur-2xl shadow-[0_60px_140px_-40px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* LEFT — Browse Local Categories */}
            <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-white/[0.06]">
              <SectionLabel icon={MapPin} label="Browse local categories" />
              <ul className="mt-3 space-y-1">
                {CATEGORIES.map((c, idx) => {
                  const Icon = c.icon;
                  const n = counts[c.key];
                  // Mobile: cap to top 6 categories. Desktop: show all.
                  const mobileHidden = idx >= 6 ? "hidden md:flex" : "flex";
                  return (
                    <li key={c.key}>
                      <Link
                        to={c.to}
                        className={`${mobileHidden} items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition group`}
                      >
                        <span className="inline-flex items-center gap-3 min-w-0">
                          <Icon className="w-4 h-4 text-white/55 group-hover:text-[#5eead4] transition" />
                          <span className="text-[14.5px] text-white/85 group-hover:text-white truncate">
                            {c.label}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-2 shrink-0">
                          {typeof n === "number" && n > 0 && (
                            <span className="text-[12px] text-white/45 group-hover:text-[#5eead4]">
                              {n.toLocaleString()} {c.unit}
                            </span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* Mobile-only: jump to full category index */}
              <Link
                to="/local"
                className="md:hidden mt-3 inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-[#5eead4] hover:text-white transition"
              >
                View All Categories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* RIGHT — Trending + This Week */}
            <div className="p-6 md:p-7 space-y-6">
              <div>
                <SectionLabel icon={Flame} label="What people are searching" />
                <ul className="mt-3 space-y-1">
                  {TRENDING_NOW.map((t) => (
                    <li key={t.label}>
                      <Link
                        to={t.to}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.05] transition group"
                      >
                        <span className="text-[14px] text-white/80 group-hover:text-white">
                          {t.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionLabel icon={CalendarDays} label="This week in the Capital District" />
                <ul className="mt-3 space-y-1">
                  {THIS_WEEK.map((t) => (
                    <li key={t.label}>
                      <Link
                        to={t.to}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/[0.05] transition group"
                      >
                        <span className="text-[14px] text-white/80 group-hover:text-white">
                          {t.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 md:px-7 py-3.5 border-t border-white/[0.06] bg-white/[0.02] text-[11.5px] text-white/45">
            <span>One searchable local platform · Capital District</span>
            <Link
              to="/local"
              className="text-[#5eead4] hover:text-white transition"
            >
              Open full directory →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionLabel({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <p className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
      <Icon className="w-3 h-3" />
      {label}
    </p>
  );
}
