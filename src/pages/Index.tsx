import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
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
  { name: "Delmar",           descriptor: "Tree-lined suburban core",   meta: "Bethlehem Schools",        median: "$542K", businesses: 18, img: townDelmar,      to: "/living-in/delmar" },
  { name: "Albany",           descriptor: "Urban neighborhoods · revival", meta: "Capital Region hub",     median: "$268K", businesses: 31, img: townAlbany,      to: "/living-in/albany" },
  { name: "Saratoga Springs", descriptor: "Walkable downtown · historic", meta: "Saratoga Schools",         median: "$612K", businesses: 26, img: townSaratoga,    to: "/living-in/saratoga-springs" },
  { name: "Troy",             descriptor: "Riverfront brick & arts",     meta: "Historic collar city",     median: "$258K", businesses: 22, img: townTroy,        to: "/living-in/troy" },
  { name: "Schenectady",      descriptor: "Stockade · value & cash flow", meta: "Investor activity",       median: "$215K", businesses: 14, img: townSchenectady, to: "/living-in/schenectady" },
  { name: "Clifton Park",     descriptor: "Family suburb · Shen schools", meta: "Top-rated schools",       median: "$485K", businesses: 16, img: townCliftonPark, to: "/living-in/clifton-park" },
];

/* ========== Section 1 — CINEMATIC HERO ========== */
function CinematicHero() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (!v) return navigate("/local");
    navigate(`/local?q=${encodeURIComponent(v)}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative w-full min-h-[92vh] md:min-h-[96vh] flex items-center">
        <img
          src={heroCapital}
          alt="Capital District, New York — towns, neighborhoods, and local life"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/75 mb-6">
              The Digital Front Door of Upstate New York
            </p>
            <h1 className="text-[3.25rem] sm:text-7xl md:text-[6.25rem] lg:text-[7.25rem] font-semibold tracking-[-0.045em] leading-[0.94] text-white">
              Discover the<br />
              <span className="font-light text-white/90">Capital District.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/85 max-w-xl font-light leading-relaxed">
              Local businesses, neighborhoods, homes, restaurants, events, and the best of Upstate New York.
            </p>

            {/* Apple-style pill search */}
            <form
              onSubmit={onSearch}
              className="mt-9 max-w-xl flex items-center gap-2 bg-white/12 backdrop-blur-xl border border-white/25 rounded-full pl-5 pr-2 py-2 shadow-[0_18px_48px_-18px_rgba(0,0,0,0.55)]"
            >
              <Search className="w-4 h-4 text-white/70 shrink-0" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value.slice(0, 120))}
                placeholder="Search towns, restaurants, cafés, businesses, homes…"
                className="flex-1 bg-transparent text-[15px] text-white placeholder:text-white/55 focus:outline-none py-2"
                aria-label="Search the Capital District"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-[#0e0f12] text-[13px] font-semibold hover:opacity-90 transition"
              >
                Search
              </button>
            </form>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 bg-white text-[#0e0f12] px-7 py-3.5 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(255,255,255,0.55)] transition"
              >
                Explore Towns <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/local"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/25 px-6 py-3.5 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:bg-white/15 transition"
              >
                Explore Local Businesses
              </Link>
              <Link
                to="/homes-for-sale"
                className="inline-flex items-center gap-1.5 text-white/75 hover:text-white text-sm font-medium px-2 py-3.5 transition"
              >
                Search Homes <ArrowRight className="w-3.5 h-3.5" />
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

      {/* 2 — MICRO-PROOF STRIP */}
      <section className="bg-white border-b border-foreground/[0.06]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8 text-center sm:text-left">
          {[
            "52 towns · curated weekly",
            "Local businesses, neighborhoods & culture",
            "Homes, rentals & investment intelligence",
          ].map((t) => (
            <p key={t} className="text-xs sm:text-[13px] font-medium text-[#1d1d1f]/65 inline-flex items-center justify-center sm:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d6e66]" />
              {t}
            </p>
          ))}
        </div>
      </section>

      {/* 3 — TOWNS · the lead section */}
      <section className="bg-white w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-[72px] md:py-[120px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-28"
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6 text-[#0d6e66]">
                Explore Towns
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-[#1d1d1f]">
                Discover the<br />neighborhoods.
              </h2>
              <p className="mt-8 text-lg md:text-xl text-[#1d1d1f]/65 max-w-md font-light leading-relaxed">
                The streets, schools, cafés, and character that shape the Capital District —
                town by town.
              </p>
              <div className="cta-anchor">
                <Link to="/communities" className="btn-primary-apple cta-arrow">
                  Browse all towns <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
                {TOWN_TILES.map((t) => (
                  <TownTile key={t.name} {...t} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 — LOCAL BUSINESSES · core engagement layer */}
      <SupportLocalSection />

      {/* 5 — WHAT'S HAPPENING · weekly editorial pulse */}
      <WeeklyFeed scope="region" />

      {/* 6 — START HERE · onramps */}
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

      {/* 7 — REAL ESTATE · lowered, lifestyle-integrated */}
      <HomeSearchPreview />

      {/* 8 — INVESTMENT INTELLIGENCE · dark Bloomberg-meets-Apple */}
      <HeroBand
        mood="graphite"
        eyebrow="Investment Intelligence"
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

      <HeroBand
        mood="dark-gold"
        eyebrow="Multifamily"
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

      {/* 9 — CLAIM YOUR BUSINESS · elegant CTA */}
      <section className="relative bg-[#0e0f12] overflow-hidden">
        <div className="absolute inset-0 opacity-60 pointer-events-none"
             style={{
               background:
                 "radial-gradient(60% 80% at 20% 30%, rgba(13,110,102,0.35), transparent 60%), radial-gradient(50% 70% at 80% 70%, rgba(201,164,73,0.18), transparent 60%)",
             }}
        />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-6">
            For Local Business Owners
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02] text-white max-w-3xl mx-auto">
            Own a local business?
          </h2>
          <p className="mt-7 text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto leading-relaxed">
            Claim your free business profile and join the Capital District's fastest-growing
            local discovery platform.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 bg-white text-[#0e0f12] px-7 py-3.5 rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(255,255,255,0.45)] transition"
            >
              Claim Your Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/local"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/25 px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-white/15 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 10 — CATEGORY DESTINATIONS */}
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
              { title: "Local Businesses & Vendors", sub: "Curated by town, not crowdsourced.",        to: "/local" },
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

      {/* 11 — WEEKLY NEWSLETTER CTA */}
      <WeeklyNewsletterCTA />

      <Footer />
    </div>
  );
};

export default Index;
