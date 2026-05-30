import { ArrowRight, Sparkles, Newspaper, CalendarDays, Building2, Wallet, Compass, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import SpotlightSearch from "@/components/home/SpotlightSearch";
import FloatingOmniSearch from "@/components/home/FloatingOmniSearch";
import { localBusinessSchema } from "@/utils/seoSchemas";

import heroTownsWide from "@/assets/hero-towns-wide.jpg";
import heroMediaWide from "@/assets/hero-media-wide.jpg";
import heroEventsWide from "@/assets/hero-events-wide.jpg";
import heroBusinessWide from "@/assets/hero-business-wide.jpg";
import heroFinanceWide from "@/assets/hero-finance-wide.jpg";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE
   Apple-style cinematic product launch page.
   Every section = ONE full-width feature hero. No card grids,
   no dense feeds. Interactive modules live on destination pages.
   ============================================================= */

/* ============== Reusable Apple-style cinematic hero ============== */
type AppleHeroProps = {
  eyebrow: string;
  EyebrowIcon?: React.ComponentType<{ className?: string }>;
  headline: React.ReactNode;
  sub: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  /** Optional full-bleed cinematic background image. */
  bgImage?: string;
  /** Overlay intensity for the background image. */
  overlay?: "soft" | "strong";
  /** Optional ambient color tint when no image. */
  glow?: "teal" | "violet" | "amber" | "graphite";
  /** Text alignment. Centered by default for Apple-style. */
  align?: "center" | "left";
  className?: string;
};

const GLOW_BG: Record<NonNullable<AppleHeroProps["glow"]>, string> = {
  teal:
    "radial-gradient(55% 55% at 50% 35%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 15% 85%, rgba(13,110,102,0.18), transparent 70%)",
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
  bgImage,
  overlay = "soft",
  glow = "teal",
  align = "center",
  className = "",
}: AppleHeroProps) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";
  // When using a background image, darken enough to keep text legible on dark theme
  const overlayGradient =
    overlay === "strong"
      ? "linear-gradient(to bottom, rgba(11,15,25,0.92) 0%, rgba(11,15,25,0.78) 45%, rgba(11,15,25,0.92) 100%)"
      : "linear-gradient(to bottom, rgba(11,15,25,0.82) 0%, rgba(11,15,25,0.55) 45%, rgba(11,15,25,0.88) 100%)";

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] ${className}`}
    >
      {bgImage ? (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: overlayGradient }}
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: GLOW_BG[glow] }}
          aria-hidden
        />
      )}

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 min-h-[80svh] md:min-h-[88svh] flex items-center py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-4xl ${alignClasses}`}
        >
          <p className={`inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase text-[#5eead4] ${align === "center" ? "justify-center" : ""}`}>
            {EyebrowIcon && <EyebrowIcon className="w-3 h-3" />}
            {eyebrow}
          </p>
          <h2 className="mt-6 text-[2.5rem] sm:text-5xl md:text-[4.5rem] lg:text-[5.25rem] font-semibold tracking-[-0.04em] leading-[1.0] text-white">
            {headline}
          </h2>
          <p className={`mt-7 text-base md:text-xl text-white/75 font-light leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
            {sub}
          </p>
          <div className={`mt-10 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
            <Link
              to={primary.to}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
            >
              {primary.label} <ArrowRight className="w-4 h-4" />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.08] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.16] transition"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </motion.div>
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
            <h1 className="text-[2.75rem] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-semibold tracking-[-0.045em] leading-[0.98] text-white">
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

      {/* HERO 2 — Find what's near you */}
      <AppleHero
        eyebrow="Live Local Discovery"
        EyebrowIcon={Sparkles}
        headline={<>Find what's <span className="text-[#5eead4]">near you.</span></>}
        sub="Restaurants, events, services, towns, media, and local businesses — updated across the Capital District."
        primary={{ label: "Use Near Me", to: "/local" }}
        secondary={{ label: "Browse Categories", to: "/local" }}
        glow="teal"
      />

      {/* HERO 3 — Local media pulse */}
      <AppleHero
        eyebrow="Local Media Pulse"
        EyebrowIcon={Newspaper}
        headline={<>Today's local coverage, <span className="text-[#5eead4]">curated.</span></>}
        sub="Business openings, restaurants, development, sports, events, and neighborhood stories from trusted local sources."
        primary={{ label: "Watch Coverage", to: "/media" }}
        secondary={{ label: "View Local Media", to: "/media" }}
        bgImage={heroMediaWide}
        overlay="strong"
      />

      {/* HERO 4 — Plan the week */}
      <AppleHero
        eyebrow="This Week"
        EyebrowIcon={CalendarDays}
        headline={<>Plan the week <span className="text-[#5eead4]">in one place.</span></>}
        sub="Concerts, restaurant weeks, markets, openings, family events, networking, and local specials."
        primary={{ label: "See This Week", to: "/weekly" }}
        secondary={{ label: "Submit Event", to: "/contact?intent=add-event" }}
        bgImage={heroEventsWide}
        overlay="soft"
      />

      {/* HERO 5 — Every town, indexed */}
      <AppleHero
        eyebrow="Every Town, Indexed"
        EyebrowIcon={Compass}
        headline={<>Every town, <span className="text-[#5eead4]">indexed.</span></>}
        sub="Explore Delmar, Albany, Troy, Saratoga Springs, Clifton Park, Schenectady, and more through one local discovery layer."
        primary={{ label: "Browse Towns", to: "/communities" }}
        secondary={{ label: "Search Near Me", to: "/local" }}
        bgImage={heroTownsWide}
        overlay="soft"
      />

      {/* HERO 6 — Local businesses, brought to life */}
      <AppleHero
        eyebrow="Featured Local Partners"
        EyebrowIcon={Store}
        headline={<>Local businesses, <span className="text-[#5eead4]">brought to life.</span></>}
        sub="Premium profiles with photos, events, menus, reservations, social links, and one-tap contact."
        primary={{ label: "View Featured Partners", to: "/local" }}
        secondary={{ label: "For Businesses", to: "/claim-business" }}
        bgImage={heroBusinessWide}
        overlay="soft"
      />

      {/* HERO 7 — Finances */}
      <AppleHero
        eyebrow="Finances"
        EyebrowIcon={Wallet}
        headline={<>Local financial help, <span className="text-[#5eead4]">connected.</span></>}
        sub="Mortgages, business banking, investing, tax strategy, accounting, insurance, and wealth planning from regional professionals."
        primary={{ label: "Explore Finances", to: "/financing" }}
        secondary={{ label: "Request Introduction", to: "/contact?intent=finance-intro" }}
        bgImage={heroFinanceWide}
        overlay="strong"
      />

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
