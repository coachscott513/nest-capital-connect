import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HeroBand from "@/components/HeroBand";
import WeeklyFeed, { WeeklyNewsletterCTA } from "@/components/WeeklyFeed";
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
  { name: "Delmar",           sub: "Bethlehem · Suburban classic",   img: townDelmar,      to: "/living-in/delmar" },
  { name: "Albany",           sub: "Capital city · Urban revival",   img: townAlbany,      to: "/living-in/albany" },
  { name: "Saratoga Springs", sub: "Resort town · Racing & spas",    img: townSaratoga,    to: "/living-in/saratoga-springs" },
  { name: "Troy",             sub: "Riverfront · Historic collar",   img: townTroy,        to: "/living-in/troy" },
  { name: "Schenectady",      sub: "Stockade · Value & cash flow",   img: townSchenectady, to: "/living-in/schenectady" },
  { name: "Clifton Park",     sub: "Shen schools · Family suburb",   img: townCliftonPark, to: "/living-in/clifton-park" },
];

/* ========== Section 1 — CINEMATIC HERO ========== */
function CinematicHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative w-full min-h-[88vh] md:min-h-[92vh] flex items-center">
        <img
          src={heroCapital}
          alt="Aerial view of downtown Albany, New York with the Empire State Plaza, Hudson River, and Hudson Valley hills at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        {/* Soft directional gradient — keeps headline crisp without flattening the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/75 mb-6">
              Capital District · New York
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-semibold tracking-[-0.035em] leading-[0.98] text-white">
              Capital District<br />
              <span className="font-light text-white/85">Nest.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/85 max-w-xl font-light leading-relaxed">
              The weekly pulse of real estate, local businesses, and life in the Capital District.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#weekly-feed"
                className="inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(255,255,255,0.45)] transition"
              >
                What's Happening This Week <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/25 px-6 py-3 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:bg-white/15 transition"
              >
                Explore Towns
              </Link>
              <a
                href="#weekly-newsletter"
                className="inline-flex items-center gap-2 text-white/85 hover:text-white px-3 py-3 text-sm font-semibold underline-offset-4 hover:underline transition"
              >
                Get Alerts <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <p className="mt-8 text-xs font-medium tracking-wide text-white/55">
              Updated May 7, 2026
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ========== Town tile (rendered as children of Towns HeroBand) ========== */
function TownTile({
  name,
  sub,
  img,
  to,
}: { name: string; sub: string; img: string; to: string }) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-[24px] aspect-[4/5] md:aspect-[3/4] cta-arrow"
    >
      <img
        src={img}
        alt={name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{name}</h3>
        <p className="text-sm md:text-base text-white/85 mt-1 font-light">{sub}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/95 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Explore <ArrowRight className="w-3.5 h-3.5" />
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

  const fieldClass =
    "w-full bg-transparent text-[15px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/45 focus:outline-none appearance-none cursor-pointer";

  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
            Search Homes
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
            Search homes across the Capital District.
          </h2>
          <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
            Browse by town, price, and property type — straight from the live MLS feed.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] p-2.5 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-2"
        >
          <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Town</span>
            <select value={town} onChange={(e) => setTown(e.target.value)} className={fieldClass}>
              <option value="">All towns</option>
              <option value="albany">Albany</option>
              <option value="delmar">Delmar</option>
              <option value="saratoga-springs">Saratoga Springs</option>
              <option value="troy">Troy</option>
              <option value="schenectady">Schenectady</option>
              <option value="clifton-park">Clifton Park</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Price</span>
            <select value={price} onChange={(e) => setPrice(e.target.value)} className={fieldClass}>
              <option value="">Any price</option>
              <option value="0-300000">Under $300K</option>
              <option value="300000-500000">$300K – $500K</option>
              <option value="500000-750000">$500K – $750K</option>
              <option value="750000-1000000">$750K – $1M</option>
              <option value="1000000-">$1M+</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Type</span>
            <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
              <option value="">All types</option>
              <option value="single-family">Single-Family</option>
              <option value="multifamily">Multifamily</option>
              <option value="condo">Condo / Townhome</option>
              <option value="land">Land</option>
            </select>
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
          >
            <Search className="w-4 h-4" /> Search Homes
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#1d1d1f]/60">
          <span>Live MLS via RE/MAX</span>
          <span className="hidden sm:inline">·</span>
          <Link to="/homes-for-sale" className="text-[#0d6e66] font-semibold hover:underline inline-flex items-center gap-1">
            Browse all listings <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========== PAGE ========== */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Capital District Nest | Capital District Real Estate Intelligence"
        description="Explore homes, towns, and investment opportunities across New York's Capital District. Albany, Delmar, Saratoga, Troy, Schenectady — analyzed honestly."
        keywords="Capital District real estate, Albany homes, Delmar homes, Saratoga real estate, Troy investment property"
        structuredData={localBusinessSchema}
      />
      <CleanHeader />

      {/* 1 — CINEMATIC HERO */}
      <CinematicHero />

      {/* 2 — WHAT'S HAPPENING THIS WEEK (the weekly feed) */}
      <WeeklyFeed scope="region" />

      {/* 1.5 — MICRO-PROOF STRIP */}
      <section className="bg-white border-b border-foreground/[0.06]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 text-center sm:text-left">
          {[
            "Tracking 50+ properties weekly",
            "Featuring local businesses",
            "Updated every Friday",
          ].map((t) => (
            <p key={t} className="text-xs sm:text-[13px] font-medium text-[#1d1d1f]/65 inline-flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d6e66]" />
              {t}
            </p>
          ))}
        </div>
      </section>

      {/* 1.7 — START HERE */}
      <section className="bg-[#f5efe4] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
              Start Here
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
              New to the Capital District?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <Link
              to="/rentals"
              className="group block rounded-3xl bg-white p-9 md:p-10 border border-foreground/[0.06] hover:border-[#0d6e66]/25 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-18px_rgba(13,110,102,0.25)]"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-3">Renting</p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">Find a place to rent.</h3>
              <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
                Apartments, pricing, and move-in help across the region.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6e66]">
                Start Renting <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
            <Link
              to="/first-time-homebuyers"
              className="group block rounded-3xl bg-white p-9 md:p-10 border border-foreground/[0.06] hover:border-[#0d6e66]/25 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-18px_rgba(13,110,102,0.25)]"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-3">Buying</p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">Buy your first home.</h3>
              <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
                What you can afford, programs, and the next step.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6e66]">
                Start Buying <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — TOWNS · one unified split section (text + tile grid together) */}
      <section className="bg-white w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-[72px] md:py-[120px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT — narrative (sticky on desktop so it stays as you scan tiles) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 text-[#0d6e66]">
                Browse by Town
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-[#1d1d1f]">
                Start with<br />the town.
              </h2>
              <p className="mt-8 text-lg md:text-xl text-[#1d1d1f]/65 max-w-md font-light leading-relaxed">
                Explore Delmar, Albany, Saratoga, Troy, Schenectady, and Clifton Park —
                with local listings, market activity, and lifestyle insight.
              </p>
              <div className="cta-anchor">
                <Link to="/communities" className="btn-primary-apple cta-arrow">
                  Browse all towns <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — tile grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {TOWN_TILES.map((t) => (
                  <TownTile key={t.name} {...t} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 3 — ANALYZER · graphite + teal (DARK) */}
      <HeroBand
        mood="graphite"
        eyebrow="Analyze Any Property"
        headline={<>Know the numbers<br />before you make a move.</>}
        sub="Estimate monthly cost, taxes, cash flow, and investment potential before you offer — built for the Capital District market."
        ctaLabel="Analyze a property"
        ctaHref="/analyze"
        callouts={[
          { title: "Monthly payment", body: "Principal, interest, taxes, insurance, HOA — all in." },
          { title: "Taxes & insurance", body: "Capital District averages ~2.2% effective property tax." },
          { title: "Cash flow & cap rate", body: "Investor-grade math for 1–4 unit properties." },
        ]}
      />

      {/* 4 — SEARCH HOMES · clean Apple-style preview (LIGHT) */}
      <HomeSearchPreview />

      {/* 5 — MULTIFAMILY · dark + gold (DARK — the design reference) */}
      <HeroBand
        mood="dark-gold"
        eyebrow="Investment Properties"
        headline={<>Buying a 2–4 unit in Albany<br />is different.</>}
        sub="Multifamily isn't a single-family home with extra doors. Underwrite rent rolls, vacancy, and CapEx the way investors actually do."
        ctaLabel="Analyze a multifamily"
        ctaHref="/analyze/multifamily"
        callouts={[
          { title: "Rent roll & vacancy", body: "Real Capital Region rents, not Zillow Rent Estimate guesses." },
          { title: "CapEx reserves",    body: "Roof, mechanicals, tenant turnover — built into the numbers." },
          { title: "Financing fit",     body: "Conventional, FHA house-hack, DSCR, portfolio — what fits this deal." },
        ]}
      />

      {/* 6 — CATEGORY DESTINATIONS · light */}
      <section className="bg-[#f7f5f0] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#0d6e66" }}>
              Where to Start
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.05]">
              Pick your path.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              { title: "New Properties This Week", sub: "Fresh listings across the Capital District.", to: "/homes-for-sale" },
              { title: "Land for Sale",            sub: "Lots, acreage, and build sites.",             to: "/land-buyers" },
              { title: "Investment Properties",    sub: "2–4 unit, multifamily, and rentals.",         to: "/investment-properties" },
              { title: "First-Time Buyer Help",    sub: "Roadmap, programs, and what to expect.",      to: "/first-time-homebuyers" },
              { title: "Financing & Grants",       sub: "Loan types and down-payment assistance.",     to: "/financing" },
              { title: "Local Businesses & Vendors", sub: "Curated by town, not crowdsourced.",        to: "/living-in/delmar#local-favorites" },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="group relative block rounded-2xl bg-white p-7 md:p-8 border border-foreground/[0.06] hover:border-[#0d6e66]/25 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-18px_rgba(13,110,102,0.25)]"
              >
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm md:text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
                  {c.sub}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#0d6e66" }}>
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — WEEKLY NEWSLETTER CTA */}
      <WeeklyNewsletterCTA />

      <Footer />
    </div>
  );
};

export default Index;
