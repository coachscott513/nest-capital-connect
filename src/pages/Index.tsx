import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HeroBand from "@/components/HeroBand";
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
  { name: "Delmar",           sub: "Bethlehem · Suburban classic",   img: townDelmar,      to: "/living-in-delmar" },
  { name: "Albany",           sub: "Capital city · Urban revival",   img: townAlbany,      to: "/albany-real-estate" },
  { name: "Saratoga Springs", sub: "Resort town · Racing & spas",    img: townSaratoga,    to: "/saratoga-real-estate" },
  { name: "Troy",             sub: "Riverfront · Historic collar",   img: townTroy,        to: "/troy-real-estate" },
  { name: "Schenectady",      sub: "Stockade · Value & cash flow",   img: townSchenectady, to: "/schenectady-real-estate" },
  { name: "Clifton Park",     sub: "Shen schools · Family suburb",   img: townCliftonPark, to: "/clifton-park-intelligence" },
];

/* ========== Section 1 — CINEMATIC HERO ========== */
function CinematicHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative w-full min-h-[88vh] md:min-h-[92vh] flex items-center">
        <img
          src={heroCapital}
          alt="Capital District of New York at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/75 mb-6">
              Capital District · New York
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-semibold tracking-[-0.035em] leading-[0.98] text-white">
              Capital District<br />
              <span className="font-light text-white/85">real estate intelligence.</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-white/85 max-w-2xl font-light leading-relaxed">
              Explore homes, towns, and investment opportunities across New York's
              Capital District — analyzed honestly.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/communities"
                className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Explore Towns <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/30 px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Analyze a Property
              </Link>
            </div>
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
      className="group relative block overflow-hidden rounded-[24px] aspect-[4/5] md:aspect-[3/4]"
    >
      <img
        src={img}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{name}</h3>
        <p className="text-sm md:text-base text-white/85 mt-1 font-light">{sub}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/95 opacity-0 group-hover:opacity-100 transition-opacity">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
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
        schemaData={localBusinessSchema}
      />
      <CleanHeader />

      {/* 1 — CINEMATIC HERO */}
      <CinematicHero />

      {/* 2 — TOWNS · cream + teal */}
      <HeroBand
        mood="cream"
        eyebrow="Browse by Town"
        headline={<>Start with the town.</>}
        sub="Explore Delmar, Albany, Saratoga, Troy, Schenectady, and Clifton Park — with local listings, market activity, and lifestyle insight."
        ctaLabel="Browse all towns"
        ctaHref="/communities"
        callouts={[
          { title: "Delmar this week", body: "New listings, pendings, and price activity in Bethlehem." },
          { title: "Saratoga lifestyle",  body: "Resort-town living with a year-round local economy." },
          { title: "Albany market activity", body: "Capital city momentum and neighborhood-level data." },
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {TOWN_TILES.map((t) => (
            <TownTile key={t.name} {...t} />
          ))}
        </div>
      </HeroBand>

      {/* 3 — ANALYZER · graphite + teal */}
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

      {/* 4 — MULTIFAMILY · dark + gold (the design reference) */}
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

      {/* 5 — SEARCH HOMES · sky + teal */}
      <HeroBand
        mood="sky"
        eyebrow="Search Homes"
        headline={<>Find homes across<br />the Capital District.</>}
        sub="Search by town, price, property type, and lifestyle — straight from the live MLS feed."
        ctaLabel="Search homes"
        ctaHref="/homes-for-sale"
        callouts={[
          { title: "By town",     body: "Albany, Delmar, Saratoga, Troy, Schenectady, Clifton Park, and more." },
          { title: "By strategy", body: "Single-family, multifamily, land, foreclosures, rentals." },
          { title: "Live MLS",    body: "Updated continuously from the Capital Region MLS via RE/MAX." },
        ]}
      />

      {/* 6 — LOCAL BUSINESSES · ivory + green */}
      <HeroBand
        mood="ivory"
        eyebrow="Local Businesses"
        headline={<>Local businesses,<br />by town.</>}
        sub="Restaurants, coffee shops, home services, and the professionals that shape each Capital District community."
        ctaLabel="Explore local businesses"
        ctaHref="/living-in-delmar#local-favorites"
        callouts={[
          { title: "Restaurants & cafés", body: "Where Delmar, Saratoga, and Troy actually go to eat." },
          { title: "Home services",       body: "Vetted contractors, inspectors, lenders, and attorneys." },
          { title: "Community partners",  body: "Schools, libraries, parks, and the people behind them." },
        ]}
      />

      {/* 7 — WEEKLY UPDATES · slate + gold */}
      <HeroBand
        mood="slate"
        eyebrow="Weekly Updates"
        headline={<>Get the Capital District,<br />weekly.</>}
        sub="Town updates, new listings, price movement, and local highlights — delivered every Sunday morning."
        ctaLabel="Get weekly updates"
        ctaHref="/dealdesk"
        callouts={[
          { title: "Town-by-town",   body: "Activity in Delmar, Albany, Saratoga, Troy, Schenectady, and more." },
          { title: "New listings",   body: "Just-listed homes that match your search." },
          { title: "Price movement", body: "Pendings, closings, and where the market is actually trading." },
        ]}
      />

      <Footer />
    </div>
  );
};

export default Index;
