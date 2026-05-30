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
import { getSearchRoute } from "@/lib/searchIntent";

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
  "Search Delmar restaurants, Albany homes, Troy contractors, Saratoga events…",
  "Search Delmar restaurants, Albany homes, Troy contractors, Saratoga events…",
];

// Curated prompt pills — each fires the omni-search using its label as the query
const PROMPT_PILLS: { label: string; query: string; to?: string }[] = [
  { label: "Delmar homes",             query: "Delmar homes" },
  { label: "Albany restaurants",       query: "Albany restaurants" },
  { label: "Troy contractors",         query: "Troy contractors" },
  { label: "Saratoga events",          query: "Saratoga events" },
  { label: "Finances",                  query: "finances", to: "/finances" },
  { label: "Mortgage lenders",         query: "mortgage lenders" },
  { label: "Plumbers near me",         query: "plumbers" },
  { label: "55+ communities",          query: "55+ communities" },
];

// Route override for special verticals (finance) before falling back to intent parser
function resolveRoute(query: string): string {
  const q = query.trim().toLowerCase();
  if (/\b(finance|finances|financial)\b/.test(q)) return "/finances";
  if (/\b(events?|weekly|things to do)\b/.test(q)) return "/weekly";
  return getSearchRoute(query);
}


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

  // Listen for "focus the omni-search" requests from anywhere (e.g. header search icon)
  useEffect(() => {
    const onFocusRequest = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        inputRef.current?.focus();
        setOpen(true);
      }, 350);
    };
    window.addEventListener("omni-search:focus", onFocusRequest);
    return () => window.removeEventListener("omni-search:focus", onFocusRequest);
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate(resolveRoute(q));
  };

  const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setOpen(false);
      navigate(resolveRoute(q));
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
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <div ref={wrapRef} className="relative z-50 mx-auto w-full max-w-4xl">
        {eyebrow && (
          <p className="mb-4 text-center text-[11px] md:text-xs font-semibold tracking-[0.32em] uppercase text-white/65">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#5eead4]" />
              {eyebrow}
            </span>
          </p>
        )}

        {/* Grouped search bar + suggestions panel */}
        <div className="relative">
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
            className="relative flex items-center gap-2 sm:gap-3 rounded-[36px] bg-white/[0.12] backdrop-blur-2xl border border-white/20 pl-4 sm:pl-6 md:pl-8 pr-1.5 sm:pr-2 md:pr-3 py-2 sm:py-2.5 md:py-3"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
            }}
          >
            {/* Teal glow halo */}
            <div
              className="pointer-events-none absolute -inset-px rounded-[32px] opacity-60"
              style={{
                background:
                  "radial-gradient(120% 100% at 50% 50%, rgba(94,234,212,0.12), transparent 60%)",
              }}
              aria-hidden
            />

            <Search className="relative w-5 h-5 md:w-6 md:h-6 text-white/70 shrink-0" />

            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value.slice(0, 140))}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDownInput}
                placeholder=""
                className="w-full min-w-0 bg-transparent text-[17px] md:text-[22px] text-white placeholder:text-transparent focus:outline-none py-3.5 md:py-4 tracking-[-0.005em]"
                aria-label="Search the Capital District"
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
                      className="block text-[13px] sm:text-[15px] md:text-[18px] text-white/55 font-light tracking-[-0.005em] whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                    >
                      {placeholder}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )}
            </div>

            <button
              type="submit"
              aria-label="Search"
              className="relative shrink-0 inline-flex items-center justify-center gap-1.5 h-11 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 rounded-full bg-white text-[#0e0f12] text-[13px] md:text-[15px] font-semibold hover:opacity-90 transition shadow-[0_8px_24px_-8px_rgba(255,255,255,0.4)]"
            >
              <Search className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Search</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
            </button>
          </motion.form>

          {/* Expanded spotlight panel — anchored directly under the search bar */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.99 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-0 right-0 mt-3 z-50 rounded-[24px] border border-white/15 bg-[#0B0F19]/98 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden text-left max-h-[70vh] overflow-y-auto"
              >
                <PanelContent setOpen={setOpen} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Curated search prompts — collapse when spotlight is open */}
        <motion.div
          animate={{ opacity: open ? 0 : 1, y: open ? -6 : 0, pointerEvents: open ? "none" : "auto" }}
          transition={{ duration: 0.2 }}
          className="relative mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {PROMPT_PILLS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setQ(p.query);
                setOpen(false);
                navigate(p.to ?? resolveRoute(p.query));
              }}
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 hover:border-[#5eead4]/45 text-white/85 hover:text-white text-[12.5px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_rgba(94,234,212,0.45)]"
            >
              <Search className="w-3 h-3 text-white/45 group-hover:text-[#5eead4] transition-colors" />
              {p.label}
            </button>
          ))}
        </motion.div>



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
