import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Home as HomeIcon,
  Building2,
  Coffee,
  TrendingUp,
  GraduationCap,
  CalendarDays,
  Key,
  DoorOpen,
  Sparkles,
  MapPin,
  Flame,
} from "lucide-react";

/* =============================================================
   SPOTLIGHT SEARCH
   Apple Spotlight × Airbnb destination search × Bloomberg
   simplicity. The centerpiece of the homepage hero.

   - Floating frosted-glass panel, oversized, teal glow
   - Rotating intelligent placeholders
   - Quick Explore chips
   - On click → expandable panel with featured towns,
     trending searches, and "This Week In" rows
   - Esc / outside click closes
   ============================================================= */

const ROTATING_PLACEHOLDERS = [
  "Search Saratoga homes",
  "Investment properties in Troy",
  "Coffee shops in Delmar",
  "Homes near Shen schools",
  "Clifton Park neighborhoods",
  "Restaurants in Saratoga",
  "Multi-family under $500k",
  "Weekend events in Albany",
  "Lake George waterfront homes",
];

type ChipKey =
  | "homes"
  | "towns"
  | "businesses"
  | "investment"
  | "restaurants"
  | "schools"
  | "openhouses"
  | "rentals"
  | "events";

const CHIPS: { key: ChipKey; label: string; icon: any; to: string; query?: string }[] = [
  { key: "homes",       label: "Homes",            icon: HomeIcon,      to: "/homes-for-sale" },
  { key: "towns",       label: "Towns",            icon: MapPin,        to: "/communities" },
  { key: "businesses",  label: "Businesses",       icon: Building2,     to: "/local" },
  { key: "investment",  label: "Investment Deals", icon: TrendingUp,    to: "/analyze" },
  { key: "restaurants", label: "Restaurants",      icon: Coffee,        to: "/local?q=restaurant" },
  { key: "schools",     label: "Schools",          icon: GraduationCap, to: "/intelligence" },
  { key: "openhouses",  label: "Open Houses",      icon: DoorOpen,      to: "/homes-for-sale?status=open-house" },
  { key: "rentals",     label: "Rentals",          icon: Key,           to: "/rentals" },
  { key: "events",      label: "Weekend Events",   icon: CalendarDays,  to: "/#weekly-feed" },
];

const FEATURED_TOWNS = [
  { name: "Delmar",           median: "$470K", to: "/living-in/delmar" },
  { name: "Saratoga Springs", median: "$625K", to: "/living-in/saratoga-springs" },
  { name: "Albany",           median: "$245K", to: "/living-in/albany" },
  { name: "Troy",             median: "$265K", to: "/living-in/troy" },
  { name: "Clifton Park",     median: "$395K", to: "/living-in/clifton-park" },
  { name: "Schenectady",      median: "$215K", to: "/living-in/schenectady" },
];

const TRENDING_NOW = [
  { label: "Saratoga summer rentals",       to: "/rentals?town=saratoga-springs" },
  { label: "Delmar coffee shops",           to: "/local?q=coffee&town=delmar" },
  { label: "Clifton Park investment deals", to: "/analyze?q=clifton+park" },
  { label: "Albany open houses",            to: "/homes-for-sale?town=albany&status=open-house" },
  { label: "Multi-family under $500k",      to: "/analyze?q=multifamily+under+500k" },
];

const THIS_WEEK = [
  { label: "Live music in downtown Troy",        to: "/#weekly-feed" },
  { label: "Restaurant week · Clifton Park",     to: "/local?town=clifton-park" },
  { label: "New listings · Delmar (14 this week)", to: "/living-in/delmar" },
  { label: "Mohawk Harbor development update",   to: "/intelligence" },
];

/* Search routing — mirrors the hero's original priorities */
const KNOWN_TOWNS: { slug: string; aliases: string[] }[] = [
  { slug: "delmar",           aliases: ["delmar"] },
  { slug: "albany",           aliases: ["albany"] },
  { slug: "saratoga-springs", aliases: ["saratoga", "saratoga springs"] },
  { slug: "troy",             aliases: ["troy"] },
  { slug: "schenectady",      aliases: ["schenectady"] },
  { slug: "clifton-park",     aliases: ["clifton park", "clifton"] },
  { slug: "niskayuna",        aliases: ["niskayuna"] },
  { slug: "guilderland",      aliases: ["guilderland"] },
  { slug: "bethlehem",        aliases: ["bethlehem"] },
  { slug: "colonie",          aliases: ["colonie"] },
];
/* Intent classification — business/lifestyle vs property */
const BIZ_CATEGORY_MAP: { re: RegExp; category: string }[] = [
  { re: /\b(restaurants?|dining|food|eats?|eatery|pizza|pizzeria|bistro|diner|sushi|tacos?)\b/i, category: "restaurant" },
  { re: /\b(caf[eé]s?|coffee|espresso|roasters?)\b/i, category: "cafe" },
  { re: /\b(bars?|pubs?|brewery|breweries|taproom|cocktails?|wine bar)\b/i, category: "bar" },
  { re: /\b(boutiques?|shops?|shopping|stores?|retail)\b/i, category: "shop" },
  { re: /\b(events?|festivals?|live music|concerts?|things to do)\b/i, category: "events" },
  { re: /\b(contractors?|surveying|surveyors?|plumbers?|electricians?|hvac|roofers?|landscapers?|handyman)\b/i, category: "services" },
  { re: /\b(gyms?|yoga|pilates|fitness|salons?|spa|barber)\b/i, category: "wellness" },
  { re: /\b(bakery|bakeries|delis?|markets?|grocery|butcher)\b/i, category: "food" },
  { re: /\b(attorneys?|lawyers?|dentists?|doctors?|pediatricians?|vets?|veterinarians?)\b/i, category: "professional" },
];
const BIZ_RE = new RegExp(BIZ_CATEGORY_MAP.map((b) => b.re.source).join("|"), "i");

const PROPERTY_KEYWORDS = /\b(homes?|house|houses|condo|condos|townhouse|townhome|investment|multi[- ]?family|duplex|triplex|rent|rentals?|for sale|listing|mls|mls#|cap rate|cash flow|land|lot|acreage|acres?|sqft|bedroom|bed|bath)\b/i;
const MLS_RE = /\b(mls\s*#?\s*)?[a-z]?\d{5,8}\b/i;
const ADDRESS_RE = /\b\d{1,6}\s+[a-z0-9.'-]+\s+(st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard|ct|court|way|pl|place|ter|terrace|hwy|highway)\b/i;

function detectBizCategory(v: string): string | null {
  for (const { re, category } of BIZ_CATEGORY_MAP) if (re.test(v)) return category;
  return null;
}

function routeSearch(raw: string): string {
  const v = raw.trim().toLowerCase();
  if (!v) return "/communities";

  const townHit = KNOWN_TOWNS.find((t) => t.aliases.some((a) => v === a || v.includes(a)));
  const bizCategory = detectBizCategory(v);

  // Rule A — Business / lifestyle intent
  if (bizCategory) {
    if (townHit) {
      return `/living-in/${townHit.slug}?category=${encodeURIComponent(bizCategory)}#directory`;
    }
    return `/local?q=${encodeURIComponent(raw)}&category=${encodeURIComponent(bizCategory)}`;
  }

  // Bare biz keyword without our map (still lifestyle-ish)
  if (BIZ_RE.test(v) && townHit) {
    return `/living-in/${townHit.slug}#directory`;
  }

  // Rule B — Property intent (only with explicit property indicators)
  const isProperty = PROPERTY_KEYWORDS.test(v) || MLS_RE.test(v) || ADDRESS_RE.test(v);
  if (isProperty) {
    if (/\b(multi[- ]?family|duplex|triplex|investment|cap rate|cash flow)\b/i.test(v)) {
      return `/analyze?q=${encodeURIComponent(raw)}`;
    }
    if (/\b(land|lot|acreage|acres?)\b/i.test(v)) {
      return `/homes-for-sale?type=land&q=${encodeURIComponent(raw)}`;
    }
    if (/\b(rent|rentals?)\b/i.test(v)) {
      return townHit ? `/rentals?town=${townHit.slug}` : `/rentals?q=${encodeURIComponent(raw)}`;
    }
    return townHit
      ? `/homes-for-sale?town=${townHit.slug}&q=${encodeURIComponent(raw)}`
      : `/homes-for-sale?q=${encodeURIComponent(raw)}`;
  }

  // Town-only query → town guide (NOT external IDX)
  if (townHit) return `/living-in/${townHit.slug}`;

  // Ambiguous / unknown → safe internal hub, never an external broker frame
  return `/communities?q=${encodeURIComponent(raw)}`;
}

interface Props {
  /** Optional tag rendered above the input (e.g. "Explore the Capital District"). */
  eyebrow?: string;
}

export default function SpotlightSearch({ eyebrow }: Props) {
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [phIdx, setPhIdx] = useState(0);

  // Rotate placeholders only when the field is empty + closed
  useEffect(() => {
    if (open || q) return;
    const t = setInterval(() => setPhIdx((i) => (i + 1) % ROTATING_PLACEHOLDERS.length), 2600);
    return () => clearInterval(t);
  }, [open, q]);

  // Outside click + esc close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate(routeSearch(q));
  };

  const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setOpen(false);
      navigate(routeSearch(q));
    }
  };

  const placeholder = useMemo(
    () => ROTATING_PLACEHOLDERS[phIdx % ROTATING_PLACEHOLDERS.length],
    [phIdx]
  );

  return (
    <>
      {/* Dim/blur the page when expanded */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[6px]"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <div ref={wrapRef} className="relative z-50 mx-auto w-full max-w-3xl">
        {eyebrow && (
          <p className="mb-4 text-center text-[11px] md:text-xs font-semibold tracking-[0.32em] uppercase text-white/65">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#5eead4]" />
              {eyebrow}
            </span>
          </p>
        )}

        {/* Floating glass pill */}
        <motion.form
          onSubmit={onSubmit}
          initial={false}
          animate={{
            scale: open ? 1.015 : 1,
            boxShadow: open
              ? "0 60px 140px -40px rgba(0,0,0,0.85), 0 0 0 1px rgba(94,234,212,0.30), 0 0 80px -20px rgba(94,234,212,0.35)"
              : "0 40px 100px -40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12)",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center gap-3 rounded-[28px] bg-white/[0.08] backdrop-blur-2xl border border-white/15 pl-5 md:pl-7 pr-2 py-2.5 md:py-3"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
          }}
        >
          {/* Teal glow halo */}
          <div
            className="pointer-events-none absolute -inset-px rounded-[28px] opacity-60"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 50%, rgba(94,234,212,0.10), transparent 60%)",
            }}
            aria-hidden
          />

          <Search className="relative w-5 h-5 text-white/65 shrink-0" />

          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 140))}
              onFocus={() => setOpen(true)}
              onKeyDown={onKeyDownInput}
              placeholder=""
              className="w-full bg-transparent text-[16px] md:text-[19px] text-white placeholder:text-transparent focus:outline-none py-2 md:py-2.5 tracking-[-0.005em]"
              aria-label="Explore the Capital District"
            />
            {/* Animated rotating placeholder layer (only when empty) */}
            {!q && (
              <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={placeholder}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="block text-[16px] md:text-[19px] text-white/55 font-light tracking-[-0.005em] truncate"
                  >
                    {placeholder}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="relative shrink-0 inline-flex items-center gap-1.5 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-[#0e0f12] text-[13px] md:text-sm font-semibold hover:opacity-90 transition"
          >
            Explore <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        {/* Quick Explore chips */}
        <div className="relative mt-5 flex flex-wrap items-center justify-center gap-2">
          {CHIPS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.key}
                to={c.to}
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 hover:border-[#5eead4]/45 text-white/80 hover:text-white text-[12.5px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(94,234,212,0.45)]"
              >
                <Icon className="w-3.5 h-3.5 text-white/55 group-hover:text-[#5eead4] transition-colors" />
                {c.label}
              </Link>
            );
          })}
        </div>

        {/* Expanded spotlight panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 mt-4 rounded-[28px] border border-white/12 bg-[#0B0F19]/95 backdrop-blur-2xl shadow-[0_60px_140px_-40px_rgba(0,0,0,0.85)] overflow-hidden text-left"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Featured Towns */}
                <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-white/[0.06]">
                  <SectionLabel icon={MapPin} label="Featured towns" />
                  <ul className="mt-3 space-y-1">
                    {FEATURED_TOWNS.map((t) => (
                      <li key={t.name}>
                        <Link
                          to={t.to}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition group"
                        >
                          <span className="text-[14.5px] text-white/85 group-hover:text-white">
                            {t.name}
                          </span>
                          <span className="text-[12px] text-white/45 group-hover:text-[#5eead4]">
                            Median {t.median}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trending + This Week */}
                <div className="p-6 md:p-7 space-y-6">
                  <div>
                    <SectionLabel icon={Flame} label="Trending now" />
                    <ul className="mt-3 space-y-1">
                      {TRENDING_NOW.map((t) => (
                        <li key={t.label}>
                          <Link
                            to={t.to}
                            onClick={() => setOpen(false)}
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
                            onClick={() => setOpen(false)}
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
                <span className="inline-flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.05] text-white/65">↵</kbd>
                  to explore · <kbd className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.05] text-white/65">Esc</kbd> to close
                </span>
                <Link
                  to="/communities"
                  onClick={() => setOpen(false)}
                  className="text-[#5eead4] hover:text-white transition"
                >
                  Browse all towns →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function SectionLabel({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
      <Icon className="w-3 h-3" />
      {label}
    </p>
  );
}
