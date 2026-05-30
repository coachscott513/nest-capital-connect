import { ArrowRight, Search, MapPin, Sparkles, Newspaper, CalendarDays, Building2, Wallet, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import SpotlightSearch from "@/components/home/SpotlightSearch";
import RegionalSpotlights from "@/components/home/RegionalSpotlights";
import FloatingOmniSearch from "@/components/home/FloatingOmniSearch";
import { localBusinessSchema } from "@/utils/seoSchemas";

import townDelmar from "@/assets/town-delmar.jpg";
import townAlbany from "@/assets/town-albany.jpg";
import townSaratoga from "@/assets/town-saratoga.jpg";
import townTroy from "@/assets/town-troy.jpg";
import townSchenectady from "@/assets/town-schenectady.jpg";
import townCliftonPark from "@/assets/town-clifton-park.jpg";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE
   Apple-style cinematic sequence. 8 wide hero sections.
   Each section = one product moment. No card grids, no dense
   dashboards. Heavy interactive modules live on their own pages.
   ============================================================= */

const TOWN_TILES = [
  { name: "Delmar",           descriptor: "Tree-lined streets & local cafés", meta: "Bethlehem Schools",   median: "$542K", businesses: 18, img: townDelmar,      to: "/living-in/delmar" },
  { name: "Albany",           descriptor: "Capital energy & architecture",    meta: "Capital Region hub",  median: "$268K", businesses: 31, img: townAlbany,      to: "/living-in/albany" },
  { name: "Saratoga Springs", descriptor: "Historic charm & culture",         meta: "Saratoga Schools",    median: "$612K", businesses: 26, img: townSaratoga,    to: "/living-in/saratoga-springs" },
  { name: "Troy",             descriptor: "Brownstones & creativity",         meta: "Historic collar city", median: "$258K", businesses: 22, img: townTroy,        to: "/living-in/troy" },
  { name: "Schenectady",      descriptor: "Stockade · value & cash flow",     meta: "Investor activity",   median: "$215K", businesses: 14, img: townSchenectady, to: "/living-in/schenectady" },
  { name: "Clifton Park",     descriptor: "Family suburb · Shen schools",     meta: "Top-rated schools",   median: "$485K", businesses: 16, img: townCliftonPark, to: "/living-in/clifton-park" },
];

/* ============== Reusable Apple-style hero ============== */
type AppleHeroProps = {
  eyebrow: string;
  EyebrowIcon?: React.ComponentType<{ className?: string }>;
  headline: React.ReactNode;
  sub: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  /** Optional glow palette to differentiate sections subtly. */
  glow?: "teal" | "violet" | "amber" | "graphite";
  /** Optional below-fold content rendered inside the same dark canvas. */
  children?: React.ReactNode;
  className?: string;
};

const GLOW_BG: Record<NonNullable<AppleHeroProps["glow"]>, string> = {
  teal:
    "radial-gradient(55% 55% at 50% 35%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 15% 85%, rgba(13,110,102,0.18), transparent 70%), radial-gradient(40% 50% at 85% 15%, rgba(94,234,212,0.06), transparent 70%)",
  violet:
    "radial-gradient(55% 55% at 50% 30%, rgba(167,139,250,0.10), transparent 65%), radial-gradient(45% 60% at 80% 80%, rgba(94,234,212,0.10), transparent 70%)",
  amber:
    "radial-gradient(55% 55% at 50% 30%, rgba(201,168,76,0.10), transparent 65%), radial-gradient(45% 60% at 20% 80%, rgba(13,110,102,0.18), transparent 70%)",
  graphite:
    "radial-gradient(55% 55% at 50% 30%, rgba(255,255,255,0.05), transparent 65%), radial-gradient(45% 60% at 80% 80%, rgba(13,110,102,0.14), transparent 70%)",
};

function AppleHero({
  eyebrow,
  EyebrowIcon,
  headline,
  sub,
  primary,
  secondary,
  glow = "teal",
  children,
  className = "",
}: AppleHeroProps) {
  return (
    <section className={`relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: GLOW_BG[glow] }}
        aria-hidden
      />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            {EyebrowIcon && <EyebrowIcon className="w-3 h-3" />}
            {eyebrow}
          </p>
          <h2 className="mt-5 text-4xl sm:text-5xl md:text-[4rem] lg:text-[4.5rem] font-semibold tracking-[-0.035em] leading-[1.02] text-white">
            {headline}
          </h2>
          <p className="mt-6 md:mt-7 text-base md:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            {sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={primary.to}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
            >
              {primary.label} <ArrowRight className="w-4 h-4" />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.12] transition"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </motion.div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 md:mt-20"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ============== Hero 1 — Cinematic Search Hero ============== */
function CinematicHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 35%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 15% 85%, rgba(13,110,102,0.18), transparent 70%), radial-gradient(40% 50% at 85% 15%, rgba(94,234,212,0.06), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        aria-hidden
      />
      <div className="relative w-full min-h-[100svh] flex items-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-28 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-[2.5rem] sm:text-6xl md:text-[5.25rem] lg:text-[6.25rem] font-semibold tracking-[-0.045em] leading-[0.98] text-white">
              Search anything{" "}
              <span className="bg-gradient-to-r from-white via-white to-[#5eead4] bg-clip-text text-transparent">
                local.
              </span>
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              The digital front door of the Capital District — businesses, towns, events,
              services, media, homes, and local updates in one place.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-14"
            >
              <SpotlightSearch />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/local"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
              >
                Start Searching <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.12] transition"
              >
                Explore the Region
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============== Town tile (used inside Hero 6) ============== */
function TownTile({ name, descriptor, meta, median, businesses, img, to }: typeof TOWN_TILES[number]) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-[28px] aspect-[16/11] sm:aspect-[4/5] md:aspect-[3/4] bg-[#1E2230] ring-1 ring-transparent shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)] hover:ring-[#5eead4]/60 hover:shadow-[0_28px_72px_-22px_rgba(94,234,212,0.35)] transition-all duration-500"
    >
      <img
        src={img}
        alt={`${name}, NY — ${descriptor}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />
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
      </div>
    </Link>
  );
}

/* ============== Media source tile (Hero 4) ============== */
const MEDIA_SOURCES = [
  { name: "News10 / ABC",   tag: "ABC",      blurb: "Capital Region news, weather, and investigations." },
  { name: "WNYT / NBC",     tag: "NBC",      blurb: "Albany's NewsChannel 13 — politics, sports, local stories." },
  { name: "Spectrum News",  tag: "Spectrum", blurb: "Hyper-local coverage across the Capital District." },
];

function MediaSourceTile({ name, tag, blurb }: typeof MEDIA_SOURCES[number]) {
  return (
    <Link
      to="/media"
      className="group block rounded-2xl border border-white/10 bg-[#1E2230] hover:border-[#5eead4]/40 transition-all overflow-hidden"
    >
      <div className="aspect-[16/9] relative bg-gradient-to-br from-[#0B0F19] via-[#1E2230] to-[#0B0F19] flex items-center justify-center">
        <span className="text-[2.5rem] md:text-[3rem] font-semibold tracking-[-0.04em] text-white/90 group-hover:text-[#5eead4] transition">
          {tag}
        </span>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(94,234,212,0.08), transparent 70%)" }} />
      </div>
      <div className="p-5">
        <h3 className="text-base md:text-lg font-semibold text-white tracking-tight">{name}</h3>
        <p className="mt-1.5 text-sm text-white/60 font-light leading-snug">{blurb}</p>
      </div>
    </Link>
  );
}

/* ============== Hero 7 — Finances tile ============== */
const FINANCE_TILES = [
  { label: "Mortgages",         to: "/financing" },
  { label: "Business Banking",  to: "/financing" },
  { label: "Investing",         to: "/financial-console" },
  { label: "Tax Strategy",      to: "/financing" },
  { label: "Accounting",        to: "/financing" },
  { label: "Insurance",         to: "/financing" },
  { label: "Wealth Planning",   to: "/financial-console" },
  { label: "Request Intro",     to: "/contact?intent=finance-intro" },
];

/* ============== PAGE ============== */
const Index = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="Capital District Nest | Search Anything Local in the Capital District"
        description="Capital District Nest is the digital front door of the Capital District. Search local businesses, homes, restaurants, services, events, towns, and community updates in one place."
        keywords="Capital District, search anything local, local businesses Albany NY, Capital District restaurants, Capital District events, Capital District towns, Capital District homes, Saratoga, Troy NY, Schenectady"
        structuredData={localBusinessSchema}
      />
      <CleanHeader />
      <FloatingOmniSearch />

      {/* HERO 1 — Search anything local */}
      <CinematicHero />

      {/* HERO 2 — Live local discovery */}
      <AppleHero
        eyebrow="Live Local Discovery"
        EyebrowIcon={Sparkles}
        headline={<>Find what's happening <span className="text-[#5eead4]">around you.</span></>}
        sub="Restaurants, events, services, towns, media, and local businesses — updated across the Capital District."
        primary={{ label: "Use Near Me", to: "/local" }}
        secondary={{ label: "Browse Categories", to: "/local" }}
        glow="teal"
      />

      {/* HERO 3 — Featured local partners (rotating wide hero with selector pills) */}
      <AppleHero
        eyebrow="Featured Local Partners"
        EyebrowIcon={Search}
        headline={<>Local businesses, <span className="text-[#5eead4]">brought to life.</span></>}
        sub="Premium partner profiles with photos, events, menus, reservations, social links, and one-tap contact."
        primary={{ label: "View Featured Partners", to: "/local" }}
        secondary={{ label: "For Businesses", to: "/claim-business" }}
        glow="graphite"
      >
        <RegionalSpotlights />
      </AppleHero>

      {/* HERO 4 — Local media pulse */}
      <AppleHero
        eyebrow="Local Media Pulse"
        EyebrowIcon={Newspaper}
        headline={<>Today's local coverage, <span className="text-[#5eead4]">curated.</span></>}
        sub="Business openings, restaurants, development, sports, events, and neighborhood stories from trusted local sources."
        primary={{ label: "Watch Coverage", to: "/media" }}
        secondary={{ label: "View Local Media", to: "/media" }}
        glow="violet"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
          {MEDIA_SOURCES.map((m) => <MediaSourceTile key={m.name} {...m} />)}
        </div>
      </AppleHero>

      {/* HERO 5 — Plan the week */}
      <AppleHero
        eyebrow="This Week"
        EyebrowIcon={CalendarDays}
        headline={<>Plan the week <span className="text-[#5eead4]">in one place.</span></>}
        sub="Concerts, restaurant weeks, markets, openings, family events, networking, and local specials."
        primary={{ label: "See This Week", to: "/weekly" }}
        secondary={{ label: "Submit Event", to: "/contact?intent=add-event" }}
        glow="amber"
      />

      {/* HERO 6 — Every town, indexed */}
      <AppleHero
        eyebrow="Every Town, Indexed"
        EyebrowIcon={Compass}
        headline={<>Every town, <span className="text-[#5eead4]">indexed.</span></>}
        sub="Explore Delmar, Albany, Troy, Saratoga Springs, Clifton Park, Schenectady, and more through one local discovery layer."
        primary={{ label: "Browse Towns", to: "/communities" }}
        secondary={{ label: "Search Near Me", to: "/local" }}
        glow="teal"
      >
        <div className="sm:hidden -mx-5 px-5 flex flex-row overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-2">
          {TOWN_TILES.map((t) => (
            <div key={t.name} className="w-[85vw] flex-shrink-0 snap-center">
              <TownTile {...t} />
            </div>
          ))}
        </div>
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
          {TOWN_TILES.map((t) => <TownTile key={t.name} {...t} />)}
        </div>
      </AppleHero>

      {/* HERO 7 — Finances */}
      <AppleHero
        eyebrow="Finances"
        EyebrowIcon={Wallet}
        headline={<>Local financial help, <span className="text-[#5eead4]">connected.</span></>}
        sub="Mortgages, business banking, investing, tax strategy, accounting, insurance, and wealth planning from regional professionals."
        primary={{ label: "Explore Finances", to: "/financing" }}
        secondary={{ label: "Request Introduction", to: "/contact?intent=finance-intro" }}
        glow="graphite"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {FINANCE_TILES.map((t) => (
            <Link
              key={t.label}
              to={t.to}
              className="group flex items-center justify-between px-4 py-4 rounded-xl bg-[#1E2230] border border-white/10 hover:border-[#5eead4]/40 transition"
            >
              <span className="text-sm font-medium text-white/85 group-hover:text-white">{t.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/35 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition" />
            </Link>
          ))}
        </div>
      </AppleHero>

      {/* HERO 8 — Business owners */}
      <AppleHero
        eyebrow="For Local Business Owners"
        EyebrowIcon={Building2}
        headline={
          <>Your business is already searchable.<br className="hidden sm:block" />{" "}
            <span className="text-[#5eead4]">Now make it interactive.</span>
          </>
        }
        sub="Claim your profile, add photos, specials, events, social links, menus, booking options, and one-tap contact actions."
        primary={{ label: "Claim Your Profile", to: "/claim-business" }}
        secondary={{ label: "See Premium Options", to: "/pricing" }}
        glow="teal"
      />

      <Footer />
    </div>
  );
};

export default Index;
