import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import ThisWeekCampaign from "@/components/home/ThisWeekCampaign";
import BuyingAndOwningHome from "@/components/home/BuyingAndOwningHome";
import PropertyHero from "@/components/home/PropertyHero";
import DecisionRail from "@/components/home/DecisionRail";
import PropertyIntelligenceChapter from "@/components/home/PropertyIntelligenceChapter";
import ClosingTeamChapter from "@/components/home/ClosingTeamChapter";
import HomeServicesRail from "@/components/home/HomeServicesRail";
import TownRail from "@/components/home/TownRail";
import TalkToScottChapter from "@/components/home/TalkToScottChapter";
import { localBusinessSchema } from "@/utils/seoSchemas";
import { getSearchRoute } from "@/lib/searchIntent";
import { trackGAEvent } from "@/components/GARouteTracker";

import heroTownsWide from "@/assets/hero-towns-wide.jpg";
import heroBusinessWide from "@/assets/hero-business-wide.jpg";
import heroDiscoveryWide from "@/assets/hero-discovery-wide.jpg";
import heroEventsWide from "@/assets/hero-events-wide.jpg";
import partnerRooseveltImg from "@/assets/partner-roosevelt.jpg";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE V2
   The Digital Front Door of the Capital District.
   Editorial. Confident. Uncluttered.
   Structure:
     1. Typographic hero
     2. Featured This Week (5 editorial cards)
     3. Explore the Capital District (4 gateways)
     4. Grow Your Business (Apple-style refined)
   ============================================================= */

// ─── HERO ────────────────────────────────────────────────────────────────────
// ─── HERO — OMNI-SEARCH FIRST ────────────────────────────────────────────────
const SEARCH_SUGGESTIONS = [
  "Delmar homes",
  "Troy restaurants",
  "Albany investment properties",
  "Saratoga events",
  "Plumbers near me",
  "Cafes in Bethlehem",
  "55+ communities",
  "Local contractors",
];

function SearchHero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (value: string) => {
    const query = value.trim();
    if (!query) return;
    trackGAEvent.searchSubmit({ query, source_location: "home_hero_omni" });
    navigate(getSearchRoute(query));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(q);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19]">
      {/* Ambient dark glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 25%, rgba(94,234,212,0.10), transparent 70%), radial-gradient(55% 65% at 20% 95%, rgba(13,110,102,0.16), transparent 75%), linear-gradient(180deg, #0B0F19 0%, #0A0D16 100%)",
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

      <div className="relative w-full min-h-[82svh] flex items-center">
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.42em] uppercase text-[#5eead4]/90">
              Capital District Nest
            </p>

            {/* h2, not h1 — the property hero above owns the page's single h1. */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 md:mt-12 text-[2.75rem] sm:text-6xl md:text-[6rem] lg:text-[6.75rem] font-semibold tracking-[-0.045em] leading-[0.95] text-white"
            >
              <span className="block">Search anything</span>
              <span className="block mt-1 md:mt-2 bg-gradient-to-r from-white via-white to-[#5eead4] bg-clip-text text-transparent">
                local.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 md:mt-10 text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-[1.55]"
            >
              Homes, businesses, towns, services, restaurants, events, and local
              insight across the Capital District.
            </motion.p>

            {/* Omni-search bar — the hero product */}
            <motion.form
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={onSubmit}
              role="search"
              aria-label="Search the Capital District"
              className="mt-10 md:mt-14 mx-auto w-full max-w-3xl"
            >
              <div
                className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/12 bg-white/[0.04] pl-4 sm:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
                style={{
                  backdropFilter: "blur(18px) saturate(140%)",
                  WebkitBackdropFilter: "blur(18px) saturate(140%)",
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                }}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white/60 shrink-0" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value.slice(0, 160))}
                  placeholder="Search homes, businesses, towns…"
                  className="flex-1 min-w-0 bg-transparent text-[15px] sm:text-lg text-white placeholder:text-white/45 focus:outline-none py-2 sm:py-2.5"
                  aria-label="Search the Capital District"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-[#0e0f12] text-[13px] sm:text-sm font-semibold hover:opacity-90 transition"
                >
                  Search
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Suggestion pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {SEARCH_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setQ(s);
                      submit(s);
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-white/12 bg-white/[0.03] text-[12.5px] sm:text-[13px] text-white/75 hover:text-white hover:border-[#5eead4]/40 hover:bg-white/[0.06] transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-10 text-[12.5px] text-white/45 font-light"
            >
              One search for the Capital District — homes, businesses, towns, and more.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}


// ─── CURRENTLY FEATURED ──────────────────────────────────────────────────────
type FeaturedCard = {
  eyebrow: string;
  title: string;
  copy: string;
  to: string;
  image?: string;
  span?: "large" | "small";
  badge?: string;
};

function FeaturedThisWeek() {
  const cards: FeaturedCard[] = [
    {
      eyebrow: "Business Spotlight",
      title: "Roosevelt Room",
      copy: "Dinner, craft cocktails, and live jazz in downtown Albany.",
      to: "/business/roosevelt-room",
      image: partnerRooseveltImg,
      span: "large",
      badge: "Spotlight Template",
    },
    {
      eyebrow: "Industrial Spotlight",
      title: "Cassone",
      copy: "Space when you need it — modular buildings, trailers, and storage across the Northeast.",
      to: "/business/cassone",
      image: heroBusinessWide,
      span: "large",
      badge: "Profile Preview",
    },
    {
      eyebrow: "Weekend Guide",
      title: "This week in the Capital District",
      copy: "Concerts, restaurant openings, farm markets, and family events.",
      to: "/weekly",
      image: heroEventsWide,
    },
    {
      eyebrow: "Neighborhood",
      title: "Living in Delmar",
      copy: "Schools, shops, and the quiet corners of Bethlehem.",
      to: "/living-in/delmar",
      image: heroTownsWide,
    },
    {
      eyebrow: "Homes",
      title: "Smart Home Search",
      copy: "Search by neighborhood, price, or investment potential.",
      to: "/homes/search",
      image: heroDiscoveryWide,
    },
  ];

  return (
    <section
      id="featured-this-week"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            Live Regional Discovery
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            What's moving this week.
          </h2>
        </motion.div>

        {/* 2 large cards + 3 smaller cards */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {cards.slice(0, 2).map((card, i) => (
            <FeaturedCardEl key={card.title} card={card} index={i} large />
          ))}
        </div>
        <div className="mt-6 md:mt-7 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {cards.slice(2).map((card, i) => (
            <FeaturedCardEl key={card.title} card={card} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCardEl({ card, index, large }: { card: FeaturedCard; index: number; large?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={card.to}
        className="group relative block rounded-[28px] overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-[#5eead4]/30 hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
      >
        <div className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
          {card.image && (
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            />
          )}
          {card.badge && (
            <span className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase bg-black/60 border border-white/20 text-white/90 backdrop-blur">
              {card.badge}
            </span>
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,25,0.15) 0%, rgba(11,15,25,0.55) 55%, rgba(11,15,25,0.92) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
              {card.eyebrow}
            </p>
            <h3 className={`mt-3 font-semibold tracking-[-0.02em] leading-[1.05] text-white ${large ? "text-3xl md:text-[2.5rem]" : "text-2xl md:text-3xl"}`}>
              {card.title}
            </h3>
            <p className={`mt-3 text-white/75 font-light leading-relaxed ${large ? "text-[15px] md:text-base max-w-md" : "text-[14px]"}`}>
              {card.copy}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
              Read
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── EXPLORE THE CAPITAL DISTRICT — 4 GATEWAYS ───────────────────────────────
function ExploreCapitalDistrict() {
  const cards = [
    {
      title: "Living Here",
      copy: "Neighborhoods, schools, parks, and everything that makes each town unique.",
      cta: "Explore Towns",
      to: "/communities",
      image: heroTownsWide,
    },
    {
      title: "Local Businesses",
      copy: "Editorial features on the restaurants, shops, contractors, and cafés that shape the region.",
      cta: "Browse Businesses",
      to: "/businesses",
      image: heroBusinessWide,
    },
    {
      title: "Homes",
      copy: "MLS-powered home search with neighborhood guides and market insights.",
      cta: "Search Homes",
      to: "/homes",
      image: heroDiscoveryWide,
    },
    {
      title: "What's Happening",
      copy: "Events, festivals, farm markets, and community happenings across the Capital District.",
      cta: "Explore Events",
      to: "/weekly",
      image: heroEventsWide,
    },
  ];

  return (
    <section
      id="explore-capital-district"
      className="relative w-full overflow-hidden bg-[#0E1220] border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            Browse Local Search Indexes
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            Explore by category.
          </h2>
        </motion.div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={card.to}
                className="group relative block rounded-[28px] overflow-hidden border border-black/[0.06] bg-white hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
              >
                <div className="relative aspect-[4/5] md:aspect-[16/11] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(11,15,25,0.15) 0%, rgba(11,15,25,0.55) 55%, rgba(11,15,25,0.92) 100%)",
                    }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                    <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[15px] md:text-base text-white/75 font-light leading-relaxed max-w-md">
                      {card.copy}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                      {card.cta}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BUSINESS CTA — TELL YOUR STORY ──────────────────────────────────────────
function BusinessCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]">
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            For Businesses
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            Tell your story here.
          </h2>
          <p className="mt-6 text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
            Join the businesses shaping the Capital District. Editorial coverage, curated placement, one trusted regional stage.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/for-businesses/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition"
            >
              Feature your business
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-white/[0.05] transition"
            >
              See Pricing
            </Link>
          </div>
          <p className="mt-8 text-xs text-white/40">
            Editorial coverage follows our{" "}
            <Link to="/editorial-policy" className="text-[#5eead4] hover:underline font-medium">
              standards
            </Link>
            . Sponsorship never buys editorial opinion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
const Index = () => {
  useEffect(() => {
    // no-op: reserved for future analytics hooks
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <SEOHead
        title="Capital District Nest | The Digital Front Door of the Capital District"
        description="Discover neighborhoods, local businesses, homes, and events across New York's Capital District — Albany, Saratoga Springs, Troy, Schenectady, and Delmar — through one trusted local platform."
        keywords="Capital District, local discovery, neighborhood guide Albany NY, Capital District real estate, Saratoga Springs, Troy NY, Schenectady, Delmar NY, local businesses"
        structuredData={[localBusinessSchema]}
      />

      <CleanHeader />

      {/* Chapter 1 — property-first entry */}
      <PropertyHero />
      {/* Chapter 2 — start with your decision */}
      <DecisionRail />
      {/* Chapter 3 — pressure-test the property */}
      <PropertyIntelligenceChapter />
      {/* Chapter 4 — the people around the transaction */}
      <ClosingTeamChapter />
      {/* Chapter 5 — before and after closing */}
      <HomeServicesRail />
      {/* Chapter 6 — where you buy */}
      <TownRail />
      {/* Chapter 7 — human close */}
      <TalkToScottChapter />

      {/* Existing local-discovery layer, preserved below the property flow */}
      <SearchHero />
      <ThisWeekCampaign />
      <ExploreCapitalDistrict />
      <FeaturedThisWeek />
      <BusinessCTA />
      <BuyingAndOwningHome />


      <Footer />
    </div>
  );
};

export default Index;
