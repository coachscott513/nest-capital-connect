import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { localBusinessSchema } from "@/utils/seoSchemas";

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
function EditorialHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19]">
      {/* Subtle editorial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(94,234,212,0.08), transparent 70%), radial-gradient(50% 60% at 20% 90%, rgba(13,110,102,0.14), transparent 75%), linear-gradient(180deg, #0B0F19 0%, #0A0D16 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
        aria-hidden
      />

      <div className="relative w-full min-h-[100svh] flex items-center">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 md:px-10 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.42em] uppercase text-[#5eead4]/90">
              Capital District Nest
            </p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-14 text-[3rem] sm:text-6xl md:text-[6rem] lg:text-[7.25rem] font-semibold tracking-[-0.045em] leading-[0.95] text-white"
            >
              <span className="block">The Capital District.</span>
              <span className="block mt-2 md:mt-3 bg-gradient-to-r from-white via-white to-[#5eead4] bg-clip-text text-transparent">
                Beautifully organized.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 md:mt-14 text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-[1.5]"
            >
              Discover neighborhoods. Explore local businesses. Search homes.
              Experience the Capital District through one trusted local platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 md:mt-16 flex flex-col items-center gap-6"
            >
              <a
                href="#featured-this-week"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("featured-this-week")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#0d6e66] text-white text-[15px] font-semibold hover:bg-[#0d6e66]/90 hover:-translate-y-0.5 transition-all shadow-[0_20px_50px_-20px_rgba(94,234,212,0.5)]"
              >
                Explore
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <p className="text-[13px] text-white/50 font-light">
                Own a local business?{" "}
                <Link
                  to="/for-businesses"
                  className="text-white/75 hover:text-[#5eead4] underline underline-offset-4 decoration-white/20 hover:decoration-[#5eead4]/60 transition-colors"
                >
                  Grow Your Business →
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Soft scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden>
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
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
            Featured This Week
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            The stories worth your time.
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
      className="relative w-full overflow-hidden bg-[#0A0D16] border-t border-white/[0.05] scroll-mt-20"
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
            Four ways in
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            Explore the Capital District.
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
                className="group relative block rounded-[28px] overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-[#5eead4]/30 hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
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

// ─── GROW YOUR BUSINESS ──────────────────────────────────────────────────────
function GrowYourBusiness() {
  const features = [
    { title: "Editorial Spotlight", body: "A long-form, photography-led profile of your business." },
    { title: "Local Search", body: "Show up in town and category searches across the platform." },
    { title: "Website Review", body: "A practical audit of what's working and what to fix." },
    { title: "Google Business Review", body: "Sharpen the profile most customers see first." },
    { title: "SEO Foundation", body: "Structured schema, clean URLs, and the technical baseline." },
    { title: "Customer Inquiry Tools", body: "Quote forms, booking links, and one-tap contact." },
    { title: "Automation", body: "Simple workflows so the small stuff runs itself." },
    { title: "Content Help", body: "AI-assisted copy, replies, and FAQs — reviewed by editors." },
    { title: "Business Spotlight", body: "Featured placement across the Nest editorial surface." },
    { title: "Business Dashboard", body: "Track profile performance and leads.", soon: true },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            For Business
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            Tell your story.<br />Grow your business.
          </h2>
          <p className="mt-7 text-lg text-white/65 font-light max-w-2xl leading-relaxed">
            Capital District Nest gives regional businesses editorial coverage,
            local visibility, and modern tools — all in one place.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/for-businesses/apply"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition"
            >
              Apply for a Spotlight
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition"
            >
              See Pricing
            </Link>
          </div>
        </motion.div>

        {/* Horizontal scrolling feature rail */}
        <div className="mt-16 md:mt-20 -mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 pb-4" style={{ minWidth: "min-content" }}>
            {features.map((f) => (
              <div
                key={f.title}
                className="shrink-0 w-[280px] md:w-[320px] rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-[#5eead4]/30 hover:bg-white/[0.05] transition"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                    Capability
                  </p>
                  {f.soon && (
                    <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/50 border border-white/15 rounded-full px-2 py-0.5">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white tracking-[-0.02em]">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-white/65 font-light leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-white/40">
          Coverage follows our{" "}
          <Link to="/editorial-policy" className="text-[#5eead4] hover:underline">
            editorial standards
          </Link>
          . Sponsorship never buys editorial opinion.
        </p>
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

      <EditorialHero />
      <FeaturedThisWeek />
      <ExploreCapitalDistrict />
      <GrowYourBusiness />

      <Footer />
    </div>
  );
};

export default Index;
