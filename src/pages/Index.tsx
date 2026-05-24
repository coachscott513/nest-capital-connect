import { useState, useEffect } from "react";
import { ArrowRight, Search, Calendar, Home as HomeIcon, Coffee, TrendingUp, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HeroBand from "@/components/HeroBand";
import WeeklyFeed, { WeeklyNewsletterCTA } from "@/components/WeeklyFeed";
import SupportLocalSection from "@/components/home/SupportLocalSection";
import { localBusinessSchema } from "@/utils/seoSchemas";

import heroCapital from "@/assets/hero-capital-district.jpg";
import townDelmar from "@/assets/town-delmar.jpg";
import townAlbany from "@/assets/town-albany.jpg";
import townSaratoga from "@/assets/town-saratoga.jpg";
import townTroy from "@/assets/town-troy.jpg";
import townSchenectady from "@/assets/town-schenectady.jpg";
import townCliftonPark from "@/assets/town-clifton-park.jpg";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE
   Apple-style hero band system. Each section = its own product
   moment with its own color mood. No white card grids.
   ============================================================= */

const TOWN_TILES = [
  { name: "Delmar",           descriptor: "Tree-lined streets & local cafés", meta: "Bethlehem Schools",   median: "$542K", businesses: 18, img: townDelmar,      to: "/living-in/delmar" },
  { name: "Albany",           descriptor: "Capital energy & architecture",    meta: "Capital Region hub",  median: "$268K", businesses: 31, img: townAlbany,      to: "/living-in/albany" },
  { name: "Saratoga Springs", descriptor: "Historic charm & culture",         meta: "Saratoga Schools",    median: "$612K", businesses: 26, img: townSaratoga,    to: "/living-in/saratoga-springs" },
  { name: "Troy",             descriptor: "Brownstones & creativity",         meta: "Historic collar city", median: "$258K", businesses: 22, img: townTroy,        to: "/living-in/troy" },
  { name: "Schenectady",      descriptor: "Stockade · value & cash flow",     meta: "Investor activity",   median: "$215K", businesses: 14, img: townSchenectady, to: "/living-in/schenectady" },
  { name: "Clifton Park",     descriptor: "Family suburb · Shen schools",     meta: "Top-rated schools",   median: "$485K", businesses: 16, img: townCliftonPark, to: "/living-in/clifton-park" },
];

const ROTATING_HEADLINES = [
  "Discover the Capital District.",
  "The Capital District's Digital Front Door.",
  "Local culture, business & neighborhoods.",
  "Where the Capital District lives.",
];

const ROTATING_PLACEHOLDERS = [
  "Search Delmar homes",
  "Search Saratoga homes",
  "Search Troy homes",
  "Search Albany homes",
  "Find a Delmar café",
  "Find a Troy restaurant",
];

/* Known towns for search priority routing */
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
  { slug: "voorheesville",    aliases: ["voorheesville"] },
  { slug: "queensbury",       aliases: ["queensbury"] },
];

const BIZ_KEYWORDS = /\b(caf[eé]|coffee|restaurant|pizza|attorney|lawyer|shop|bar|gym|salon|bakery|brewery|contractor|plumber|electrician|dentist|doctor|spa|yoga)\b/i;
const INVESTMENT_KEYWORDS = /\b(investment|multi[- ]?family|duplex|cap rate|cash flow|rental)\b/i;
const LAND_KEYWORDS = /\b(land|lot|acreage)\b/i;

/**
 * Search routing priority:
 *   1. Exact town match           → /living-in/:slug (or /local scoped to town if biz keyword present)
 *   2. Business/service keywords  → /local?q=
 *   3. Investment keywords        → /analyze?q=
 *   4. Land keywords              → /homes-for-sale?type=land&q=
 *   5. Fallback                   → /homes-for-sale?q=
 */
function routeSearch(raw: string): string {
  const v = raw.trim().toLowerCase();
  if (!v) return "/communities";
  const townHit = KNOWN_TOWNS.find((t) => t.aliases.some((a) => v === a || v.startsWith(a + " ")));
  if (townHit) {
    if (BIZ_KEYWORDS.test(v)) return `/local?q=${encodeURIComponent(raw)}&town=${townHit.slug}`;
    return `/living-in/${townHit.slug}`;
  }
  if (BIZ_KEYWORDS.test(v))        return `/local?q=${encodeURIComponent(raw)}`;
  if (INVESTMENT_KEYWORDS.test(v)) return `/analyze?q=${encodeURIComponent(raw)}`;
  if (LAND_KEYWORDS.test(v))       return `/homes-for-sale?type=land&q=${encodeURIComponent(raw)}`;
  return `/homes-for-sale?q=${encodeURIComponent(raw)}`;
}

const TRENDING_SEARCHES = [
  { label: "Delmar homes",             to: "/living-in/delmar" },
  { label: "Saratoga restaurants",     to: "/local?q=restaurant&town=saratoga-springs" },
  { label: "Clifton Park contractors", to: "/local?q=contractor&town=clifton-park" },
  { label: "Albany investment",        to: "/analyze?q=albany+investment" },
  { label: "Troy cafés",               to: "/local?q=cafe&town=troy" },
];

/* ========== Section 1 — CINEMATIC HERO ========== */
function CinematicHero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [phIdx, setPhIdx] = useState(0);
  const [hlIdx, setHlIdx] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setPhIdx((i) => (i + 1) % ROTATING_PLACEHOLDERS.length), 2800);
    const b = setInterval(() => setHlIdx((i) => (i + 1) % ROTATING_HEADLINES.length), 5200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(routeSearch(q));
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative w-full min-h-[100vh] flex items-center">
        <img
          src={heroCapital}
          alt="Capital District, New York — towns, neighborhoods, and local life"
          className="absolute inset-0 w-full h-full object-cover scale-[1.03]"
          style={{ filter: "grayscale(100%) contrast(1.08) brightness(0.95)" }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/85" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="text-[11px] md:text-xs font-semibold tracking-[0.32em] uppercase text-white/65 mb-8">
              The Digital Front Door of the Capital District
            </p>

            <h1 className="relative text-[2.5rem] sm:text-6xl md:text-[5.5rem] lg:text-[7rem] font-semibold tracking-[-0.045em] leading-[0.98] text-white">
              <motion.span
                key={hlIdx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {ROTATING_HEADLINES[hlIdx]}
              </motion.span>
            </h1>

            <p className="mt-8 text-base md:text-xl text-white/75 max-w-2xl mx-auto font-light leading-relaxed">
              Explore local businesses, neighborhoods, homes, restaurants, events,
              and the best of Upstate New York.
            </p>

            {/* Apple-style single pill search */}
            <motion.form
              onSubmit={onSearch}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 md:mt-14 mx-auto max-w-2xl flex items-center gap-2 bg-white/[0.10] backdrop-blur-2xl border border-white/20 rounded-full pl-6 pr-2 py-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] hover:bg-white/[0.13] hover:border-white/30 transition-all duration-500"
            >
              <Search className="w-4 h-4 text-white/60 shrink-0" />
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value.slice(0, 120))}
                  placeholder="Search anything local… (e.g., Delmar homes, Troy cafés, corporate events)"
                  className="w-full bg-transparent text-[15px] md:text-base text-white placeholder:text-white/55 focus:outline-none py-2.5 truncate"
                  aria-label="Search the Capital District"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 inline-flex items-center gap-1.5 px-5 md:px-6 py-2.5 rounded-full bg-white text-[#0e0f12] text-[13px] font-semibold hover:opacity-90 transition"
              >
                Search <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.form>

            {/* Trending searches — teaches users what the search can do */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[12px] text-white/55"
            >
              <span className="uppercase tracking-[0.2em] text-[10px] text-white/40 mr-1">Trending</span>
              {TRENDING_SEARCHES.map((t, i) => (
                <span key={t.label} className="inline-flex items-center gap-2">
                  <Link to={t.to} className="hover:text-white transition underline-offset-4 hover:underline">
                    {t.label}
                  </Link>
                  {i < TRENDING_SEARCHES.length - 1 && <span className="w-0.5 h-0.5 rounded-full bg-white/25" />}
                </span>
              ))}
            </motion.div>


            {/* Primary CTAs — Towns + Local Business */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0e0f12] text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(255,255,255,0.5)] transition"
              >
                Explore Towns <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/local"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur text-white border border-white/25 text-sm font-semibold hover:bg-white/15 transition"
              >
                Explore Local Businesses
              </Link>
            </motion.div>

            {/* Secondary, quieter */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-white/55">
              <Link to="/homes-for-sale" className="hover:text-white transition inline-flex items-center gap-1">
                Search homes <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <Link to="/analyze" className="hover:text-white transition">
                Run the numbers
              </Link>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <Link to="/claim-business" className="hover:text-white transition">
                Claim your business
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ========== Cinematic town tile ========== */
function TownTile({
  name,
  descriptor,
  meta,
  median,
  businesses,
  img,
  to,
}: {
  name: string;
  descriptor: string;
  meta: string;
  median: string;
  businesses: number;
  img: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-[28px] aspect-[16/11] sm:aspect-[4/5] md:aspect-[3/4] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] hover:shadow-[0_28px_72px_-28px_rgba(0,0,0,0.55)] transition-shadow duration-500"
    >
      <img
        src={img}
        alt={`${name}, NY — ${descriptor}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

      {/* Top-right pill: business count */}
      <div className="absolute top-5 right-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-[11px] font-semibold tracking-wide border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4]" />
          {businesses} local businesses
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
        <h3 className="text-2xl md:text-[2rem] font-semibold tracking-[-0.02em] leading-tight">{name}</h3>
        <p className="text-sm md:text-[15px] text-white/85 mt-1.5 font-light leading-snug">{descriptor}</p>

        <div className="mt-4 flex items-center gap-3 text-[12px] text-white/75">
          <span>{meta}</span>
          <span className="w-1 h-1 rounded-full bg-white/35" />
          <span>Median <strong className="font-semibold text-white">{median}</strong></span>
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/95 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Explore {name} <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

/* ========== Section 4 — APPLE-STYLE SEARCH PREVIEW ========== */
function HomeSearchPreview() {
  const navigate = useNavigate();
  const [town, setTown] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (town) q.set("town", town);
    if (price) q.set("price", price);
    if (type) q.set("type", type);
    const qs = q.toString();
    navigate(`/homes-for-sale${qs ? `?${qs}` : ""}`);
  };




  const fieldClassDark =
    "w-full bg-transparent text-[15px] text-white placeholder:text-white/45 focus:outline-none appearance-none cursor-pointer";

  return (
    <section className="bg-[#0B0F19] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#5eead4]">
            Search Homes
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-white leading-[1.05]">
            Search homes across the Capital District.
          </h2>
          <p className="mt-5 text-lg text-white/60 font-light">
            Browse by town, price, and property type — straight from the live MLS feed.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl bg-[#1E2230] border border-[#2D3748] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] p-2.5 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-2"
        >
          <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">Town</span>
            <select value={town} onChange={(e) => setTown(e.target.value)} className={fieldClassDark}>
              <option value="" className="bg-[#1E2230]">All towns</option>
              <option value="albany" className="bg-[#1E2230]">Albany</option>
              <option value="delmar" className="bg-[#1E2230]">Delmar</option>
              <option value="saratoga-springs" className="bg-[#1E2230]">Saratoga Springs</option>
              <option value="troy" className="bg-[#1E2230]">Troy</option>
              <option value="schenectady" className="bg-[#1E2230]">Schenectady</option>
              <option value="clifton-park" className="bg-[#1E2230]">Clifton Park</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition border-t md:border-t-0 md:border-l border-[#2D3748]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">Price</span>
            <select value={price} onChange={(e) => setPrice(e.target.value)} className={fieldClassDark}>
              <option value="" className="bg-[#1E2230]">Any price</option>
              <option value="0-300000" className="bg-[#1E2230]">Under $300K</option>
              <option value="300000-500000" className="bg-[#1E2230]">$300K – $500K</option>
              <option value="500000-750000" className="bg-[#1E2230]">$500K – $750K</option>
              <option value="750000-1000000" className="bg-[#1E2230]">$750K – $1M</option>
              <option value="1000000-" className="bg-[#1E2230]">$1M+</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition border-t md:border-t-0 md:border-l border-[#2D3748]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClassDark}>
              <option value="" className="bg-[#1E2230]">All types</option>
              <option value="single-family" className="bg-[#1E2230]">Single-Family</option>
              <option value="multifamily" className="bg-[#1E2230]">Multifamily</option>
              <option value="condo" className="bg-[#1E2230]">Condo / Townhome</option>
              <option value="land" className="bg-[#1E2230]">Land</option>
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)]"
          >
            <Search className="w-4 h-4" /> Search Homes
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/55">
          <span>Live MLS via RE/MAX</span>
          <span className="hidden sm:inline">·</span>
          <Link to="/homes-for-sale" className="text-[#5eead4] font-semibold hover:underline inline-flex items-center gap-1">
            Browse all listings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========== PAGE ========== */
/* =============================================================
   CAPITAL DISTRICT INTELLIGENCE
   Single consolidated onramp — replaces "New to the Capital
   District?" + "Pick your path" with one tabbed editorial block.
   ============================================================= */
type IntelTab = {
  id: string;
  label: string;
  icon: typeof Calendar;
  headline: string;
  ctaVerb: string; // verb shown on each card link
  // Optional prominent action pill rendered next to the headline
  inlineAction?: { label: string; to: string };
  // Optional asymmetrical full-width banner shown above the card grid
  focusBanner?: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaTo: string;
  };
  items: { title: string; sub: string; to: string }[];
};

const INTEL_TABS: IntelTab[] = [
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    headline: "What's happening this week, this weekend, this season.",
    ctaVerb: "Browse",
    inlineAction: { label: "+ Submit Regional Event", to: "/contact?intent=add-event" },
    items: [
      { title: "This week's pulse",       sub: "Festivals, concerts, openings, markets.", to: "/#weekly-feed" },
      { title: "Explore towns & culture", sub: "Town-by-town happenings across the region.",   to: "/communities" },
      { title: "Venues & organizers",     sub: "Proctors, MVP Arena, SPAC, local series.",      to: "/local?q=venue" },
      { title: "Promote a special",       sub: "Happy hour, brunch, grand opening, seminars.",  to: "/contact?intent=promote-special" },
    ],
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: HomeIcon,
    headline: "Homes, rentals, land, and the next move — all in one place.",
    ctaVerb: "Explore",
    inlineAction: { label: "Mortgage & Financing Options", to: "/financing" },
    items: [
      { title: "Homes for sale",            sub: "Fresh listings across the Capital District.",    to: "/homes-for-sale" },
      { title: "Rentals",                   sub: "Apartments, houses, and move-in help.",          to: "/rentals" },
      { title: "Land for sale",             sub: "Lots, acreage, and build sites.",                to: "/land-buyers" },
      { title: "Market heatmap",            sub: "Median price, days-on-market, YoY by town.",     to: "/market-insights" },
      { title: "Mortgage & Grants Portal",  sub: "Loan types and local down-payment assistance.",  to: "/financing" },
      { title: "First-time buyer help",     sub: "Roadmap, programs, and what to expect.",         to: "/first-time-homebuyers" },
    ],
  },
  {
    id: "local",
    label: "Local Businesses",
    icon: Coffee,
    headline: "The cafés, shops, lenders, and trades that make the region work.",
    ctaVerb: "Browse",
    focusBanner: {
      eyebrow: "For business owners",
      title: "Claim Your Free Digital Profile",
      body: "Get on the Capital District's pulse — verified listing, photos, hours, and direct leads. Free for local owners.",
      ctaLabel: "Claim Your Profile",
      ctaTo: "/claim-business",
    },
    items: [
      { title: "Browse the directory",    sub: "Curated by town, not crowdsourced.",              to: "/local" },
      { title: "Restaurants & cafés",     sub: "Eat local — by neighborhood.",                    to: "/local?q=restaurant" },
      { title: "Trades & services",       sub: "Contractors, plumbers, electricians, more.",      to: "/local?q=contractor" },
      { title: "Promote a special",       sub: "Happy hour, brunch, grand opening, seminars.",    to: "/contact?intent=promote-special" },
    ],
  },
  {
    id: "investing",
    label: "Investing",
    icon: TrendingUp,
    headline: "Where the region's next chapter is being written — backed by math.",
    ctaVerb: "Open",
    inlineAction: { label: "Run Local Underwriting Tools", to: "/analyze" },
    items: [
      { title: "Run the numbers",              sub: "Cash flow, cap rate, DSCR, all-in monthly cost.",         to: "/analyze" },
      { title: "Calculate Local Cap Rates",    sub: "Live market caps by town and asset class.",               to: "/analyze?metric=cap-rate" },
      { title: "Multifamily intelligence",     sub: "2–4 unit underwriting the way investors actually do it.", to: "/analyze/multifamily" },
      { title: "Investment properties",        sub: "Active deals scored by cash flow and yield.",             to: "/investment-properties" },
      { title: "Best cash-flow neighborhoods", sub: "Where rent-to-price still works.",                        to: "/best-neighborhoods-cash-flow" },
      { title: "View Cash Flow Metrics",       sub: "Sample reports + deal-by-deal breakdowns.",               to: "/cash-flow-report" },
    ],
  },
  {
    id: "neighborhoods",
    label: "Neighborhoods",
    icon: MapPin,
    headline: "Streets, schools, and character — town by town.",
    ctaVerb: "Visit",
    items: [
      { title: "Explore all towns",       sub: "52 towns, curated weekly.",                    to: "/communities" },
      { title: "Living in Delmar",        sub: "Tree-lined streets, Bethlehem schools, cafés.", to: "/living-in/delmar" },
      { title: "Living in Saratoga",      sub: "Historic charm, culture, top schools.",        to: "/living-in/saratoga-springs" },
      { title: "Living in Troy",          sub: "Brownstones, RPI, downtown creativity.",       to: "/living-in/troy" },
    ],
  },
];

function CapitalDistrictIntelligence() {
  const [active, setActive] = useState(INTEL_TABS[0].id);
  const tab = INTEL_TABS.find((t) => t.id === active) ?? INTEL_TABS[0];

  return (
    <section className="bg-[#0B0F19] py-24 md:py-36 px-6 md:px-10 border-t border-[#2D3748]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 text-[#5eead4]">
            Capital District Intelligence
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.04]">
            Explore the region.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/60 font-light leading-relaxed">
            One front door. Every way in — events, real estate, local businesses, investing,
            and the neighborhoods that make the Capital District feel like home.
          </p>
        </div>

        {/* Tab rail */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-12 border-b border-[#2D3748] pb-2">
          {INTEL_TABS.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`group inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#0d6e66] text-white shadow-[0_10px_28px_-12px_rgba(13,110,102,0.6)]"
                    : "bg-transparent text-white/55 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10"
        >
          <div className="lg:col-span-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-[-0.02em] leading-snug">
              {tab.headline}
            </h3>
            {tab.inlineAction && (
              <Link
                to={tab.inlineAction.to}
                className="btn-dark-teal-outline mt-6"
              >
                {tab.inlineAction.label}
              </Link>
            )}
          </div>

          <div className="lg:col-span-8 space-y-5 md:space-y-6">
            {/* Asymmetrical focus banner (e.g. Claim Your Profile) */}
            {tab.focusBanner && (
              <div className="relative overflow-hidden rounded-2xl border border-[#0d6e66]/40 bg-gradient-to-br from-[#0d6e66]/15 via-[#0B0F19] to-[#0B0F19] p-6 md:p-8">
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#0d6e66]/20 blur-3xl pointer-events-none" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  <div className="max-w-xl">
                    <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5eead4] mb-2">
                      {tab.focusBanner.eyebrow}
                    </p>
                    <h4 className="text-xl md:text-2xl font-semibold text-white tracking-[-0.01em]">
                      {tab.focusBanner.title}
                    </h4>
                    <p className="mt-2 text-sm md:text-base text-white/65 font-light leading-relaxed">
                      {tab.focusBanner.body}
                    </p>
                  </div>
                  <Link
                    to={tab.focusBanner.ctaTo}
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#0d6e66] text-white hover:bg-[#0d6e66]/90 transition-colors shadow-[0_10px_28px_-10px_rgba(13,110,102,0.7)]"
                  >
                    {tab.focusBanner.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {tab.items.map((c) => (
                <Link
                  key={c.title}
                  to={c.to}
                  className="group relative block rounded-2xl bg-[#1E2230] p-6 md:p-7 border border-[#2D3748] hover:border-[#0d6e66]/60 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-18px_rgba(13,110,102,0.4)]"
                >
                  <h4 className="text-base md:text-lg font-semibold tracking-tight text-white">
                    {c.title}
                  </h4>
                  <p className="mt-2 text-sm text-white/60 font-light leading-relaxed">
                    {c.sub}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5eead4]">
                    {tab.ctaVerb} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const Index = () => {

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="Capital District Nest | Capital District Real Estate Intelligence"
        description="Explore homes, towns, and investment opportunities across New York's Capital District. Albany, Delmar, Saratoga, Troy, Schenectady — analyzed honestly."
        keywords="Capital District real estate, Albany homes, Delmar homes, Saratoga real estate, Troy investment property"
        structuredData={localBusinessSchema}
      />
      <CleanHeader />

      {/* 1 — CINEMATIC HERO */}
      <CinematicHero />

      {/* 2 — B2B CONVERSION · Claim Your Business (flywheel CTA, directly under hero) */}
      <section className="relative bg-[#0B0F19] overflow-hidden border-b border-[#2D3748]">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 80% at 20% 30%, rgba(13,110,102,0.35), transparent 60%), radial-gradient(50% 70% at 80% 70%, rgba(94,234,212,0.12), transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-6">
            For Local Business Owners
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-white max-w-3xl mx-auto">
            Own a local business?
          </h2>
          <p className="mt-7 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Claim your free business profile and join the Capital District's fastest-growing
            local discovery platform.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 bg-[#0d6e66] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(13,110,102,0.6)] transition"
            >
              Claim Your Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/local"
              className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur text-white border border-white/20 px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>



      {/* 2 — MICRO-PROOF STRIP */}
      <section className="bg-[#0B0F19] border-b border-[#2D3748]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 text-center sm:text-left">
          {[
            "52 towns · curated weekly",
            "Local businesses, neighborhoods & culture",
            "Homes, rentals & investment intelligence",
          ].map((t) => (
            <p key={t} className="text-xs sm:text-[13px] font-medium text-white/60 inline-flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4]" />
              {t}
            </p>
          ))}
        </div>
      </section>

      {/* 3 — TOWNS · centered editorial grid */}
      <section className="bg-[#0B0F19] w-full">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-[88px] md:py-[140px]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 text-[#5eead4]">
              Explore Towns
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-white">
              Discover the neighborhoods.
            </h2>
            <p className="mt-7 text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
              The streets, schools, cafés, and character that shape the Capital District —
              town by town.
            </p>
            <div className="cta-anchor mt-9 flex justify-center">
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
              >
                Browse all towns <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Mobile: horizontal swipe carousel — first card in focus, next peeks from the right */}
            <div className="sm:hidden -mx-6 px-6 flex flex-row overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-2">
              {TOWN_TILES.map((t) => (
                <div key={t.name} className="w-[85vw] flex-shrink-0 snap-center">
                  <TownTile {...t} />
                </div>
              ))}
            </div>
            {/* Tablet/Desktop: symmetrical centered grid */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
              {TOWN_TILES.map((t) => (
                <TownTile key={t.name} {...t} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 — LOCAL BUSINESSES · core engagement layer */}
      <SupportLocalSection />

      {/* 5 — WHAT'S HAPPENING · weekly editorial pulse */}
      <WeeklyFeed scope="region" />

      {/* 6 — CAPITAL DISTRICT INTELLIGENCE · single consolidated tabbed onramp */}
      <CapitalDistrictIntelligence />


      {/* 7 — REAL ESTATE · lowered, lifestyle-integrated */}
      <HomeSearchPreview />

      {/* 8 — INVEST IN THE CAPITAL DISTRICT · emotional, then analytical */}
      <HeroBand
        mood="graphite"
        eyebrow="Invest in the Capital District"
        headline={<>Where the region's<br />next chapter is being written.</>}
        sub="Major infrastructure, multifamily demand, and small-business growth are reshaping Albany, Schenectady, Troy, and Saratoga. See where the numbers — and the neighborhoods — are heading."
        ctaLabel="Run the numbers"
        ctaHref="/analyze"
        callouts={[
          { title: "Development & growth", body: "NanoTech expansion, Mohawk Harbor, downtown Albany rebuild." },
          { title: "Multifamily demand",   body: "2–4 unit rents up, vacancy near historic lows region-wide." },
          { title: "Investor-grade math",  body: "Underwrite cash flow, cap rate, and DSCR before you offer." },
        ]}
      />



      {/* 11 — WEEKLY NEWSLETTER CTA */}
      <WeeklyNewsletterCTA />

      <Footer />
    </div>
  );
};

export default Index;
