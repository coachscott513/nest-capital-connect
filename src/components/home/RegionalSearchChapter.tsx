import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";
import { OFFICIAL_CATEGORIES } from "@/data/officialCategories";
import { categoryToSlug } from "@/lib/categorySlug";
import { resolveSearchIntent } from "@/lib/searchIntent";
import {
  regionalSearchModeSelect,
  regionalSearchSubmit,
  type SearchMode,
} from "@/lib/homeAnalytics";

/* =============================================================
   CHAPTER 2 — SEARCH THE CAPITAL DISTRICT
   One premium control, four truthful backends. Nothing here
   invents a universal index: each mode routes to the search
   surface that actually owns that data today.
     Homes      → the verified RealScout widget in the hero
     Businesses → the existing /local business graph
     Towns      → canonical /living-in town pages
     Services   → category + geography on /local
   ============================================================= */

const MODES: { key: SearchMode; label: string; placeholder: string; hint: string }[] = [
  {
    key: "homes",
    label: "Homes",
    placeholder: "City, town, neighborhood, or school",
    hint: "Live MLS results through our Capital District property search.",
  },
  {
    key: "businesses",
    label: "Businesses",
    placeholder: "Restaurant, contractor, dentist, shop…",
    hint: "Searches the Capital District business directory.",
  },
  {
    key: "towns",
    label: "Towns",
    placeholder: "Delmar, Troy, Saratoga Springs…",
    hint: "Opens the community guide for that town.",
  },
  {
    key: "services",
    label: "Services",
    placeholder: "Plumbing, roofing, landscaping…",
    hint: "Filters local providers by service category.",
  },
];

const TOWNS = CAPITAL_DISTRICT_COUNTIES.flatMap((c) => c.towns).sort(
  (a, b) => b.name.length - a.name.length,
);

const squish = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const findTown = (q: string) => {
  const n = squish(q);
  if (!n) return undefined;
  return TOWNS.find((t) => {
    const name = squish(t.name);
    return n === name || n.includes(name) || name.includes(n);
  });
};

const findCategory = (q: string) => {
  const n = squish(q);
  if (!n) return undefined;
  return OFFICIAL_CATEGORIES.find((c) => {
    const name = squish(c);
    return n === name || n.includes(name) || name.includes(n);
  });
};

const RegionalSearchChapter = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<SearchMode>("homes");
  const [q, setQ] = useState("");

  const activeMode = useMemo(() => MODES.find((m) => m.key === mode)!, [mode]);

  const selectMode = (next: SearchMode) => {
    if (next === mode) return;
    setMode(next);
    regionalSearchModeSelect(next);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const raw = q.trim();

    if (mode === "homes") {
      // Truthful behavior: the only verified live home search is the
      // RealScout widget already mounted in the hero. We focus it rather
      // than pretending a second index exists.
      regionalSearchSubmit({ mode, intentType: "realscout_widget", rawQuery: raw });
      const el = document.getElementById("property-search-widget");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector<HTMLInputElement>("input");
        window.setTimeout(() => input?.focus(), 700);
      } else {
        navigate("/homes");
      }
      return;
    }

    if (!raw) {
      navigate(mode === "towns" ? "/communities" : "/local");
      return;
    }

    if (mode === "towns") {
      const town = findTown(raw);
      regionalSearchSubmit({
        mode,
        intentType: town ? "town_match" : "town_browse",
        rawQuery: raw,
      });
      navigate(town ? `/living-in/${town.slug}` : "/communities");
      return;
    }

    if (mode === "services") {
      const category = findCategory(raw);
      const town = findTown(raw);
      const params = new URLSearchParams();
      if (category) params.set("category", categoryToSlug(category));
      else params.set("search", raw);
      if (town) params.set("town", town.name);
      regionalSearchSubmit({
        mode,
        intentType: category ? "service_category" : "service_freeform",
        rawQuery: raw,
      });
      navigate(`/local?${params.toString()}`);
      return;
    }

    // businesses — reuse the shipped intent resolver against the business graph
    const intent = resolveSearchIntent(raw);
    const route = intent.route.startsWith("/local")
      ? intent.route
      : `/local?search=${encodeURIComponent(raw)}`;
    regionalSearchSubmit({ mode, intentType: intent.type, rawQuery: raw });
    navigate(route);
  };

  return (
    <section
      id="search-the-capital-district"
      className="relative w-full overflow-hidden border-t border-white/[0.06] bg-surface-raised scroll-mt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(94,234,212,0.10), transparent 70%), radial-gradient(45% 50% at 10% 100%, rgba(13,110,102,0.14), transparent 75%)",
        }}
      />

      <div
        className="relative max-w-5xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.45em] uppercase text-text-quiet">
            One region. One place to start.
          </p>
          <h2 className="mt-6 text-[2.1rem] sm:text-5xl md:text-[3.75rem] tracking-[-0.04em] leading-[1.04] text-white text-balance">
            <span className="font-extralight text-text-bright">Search the </span>
            <span className="font-semibold">Capital District.</span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[17px] text-text-soft font-light leading-[1.65] max-w-2xl mx-auto">
            Homes, businesses, towns, and services — each mode searches the source
            that actually holds that information.
          </p>
        </motion.div>

        {/* Mode selector */}
        <div
          role="tablist"
          aria-label="Search mode"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {MODES.map((m) => {
            const isActive = m.key === mode;
            return (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectMode(m.key)}
                className={`min-h-[44px] px-5 rounded-full text-[13.5px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60 ${
                  isActive
                    ? "bg-white text-[#0B0F19]"
                    : "border border-white/12 bg-white/[0.04] text-white/75 hover:text-white hover:border-[#5eead4]/40"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Unified control */}
        <form
          onSubmit={submit}
          role="search"
          aria-label={`Search ${activeMode.label.toLowerCase()} in the Capital District`}
          className="mt-6 mx-auto w-full max-w-3xl"
        >
          <div
            className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/12 bg-white/[0.04] pl-4 sm:pl-6 pr-2 sm:pr-2.5 py-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            style={{
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            }}
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 shrink-0" aria-hidden />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 160))}
              placeholder={activeMode.placeholder}
              aria-label={activeMode.placeholder}
              autoComplete="off"
              className="flex-1 min-w-0 bg-transparent text-[15px] sm:text-[17px] text-white placeholder:text-white/45 focus:outline-none py-3"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-1.5 min-h-[44px] px-5 sm:px-6 rounded-full bg-white text-[#0B0F19] text-[13px] sm:text-sm font-semibold hover:opacity-90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
            >
              Search
              <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
          </div>

          <p className="mt-4 text-center text-[12.5px] text-white/45 font-light">
            {activeMode.hint}
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegionalSearchChapter;
