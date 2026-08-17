import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import ThisWeekCampaign from "@/components/home/ThisWeekCampaign";
import BuyingAndOwningHome from "@/components/home/BuyingAndOwningHome";
import PropertyHero from "@/components/home/PropertyHero";
import RegionalSearchChapter from "@/components/home/RegionalSearchChapter";
import BusinessesServicesChapter from "@/components/home/BusinessesServicesChapter";
import PropertyIntelligenceChapter from "@/components/home/PropertyIntelligenceChapter";
import ClosingTeamChapter from "@/components/home/ClosingTeamChapter";
import HomeServicesRail from "@/components/home/HomeServicesRail";
import TownRail from "@/components/home/TownRail";
import TalkToScottChapter from "@/components/home/TalkToScottChapter";
import {
  localBusinessSchema,
  HOMEPAGE_ORGANIZATION_SCHEMA,
  HOMEPAGE_WEBSITE_SCHEMA,
} from "@/utils/seoSchemas";

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
        canonical="https://www.capitaldistrictnest.com/"
        structuredData={[
          localBusinessSchema,
          HOMEPAGE_ORGANIZATION_SCHEMA,
          HOMEPAGE_WEBSITE_SCHEMA,
        ]}
      />

      <CleanHeader />

      {/* Chapter 1 — hero: what this is, one action */}
      <PropertyHero />
      {/* Chapter 2 — regional search, four modes */}
      <RegionalSearchChapter />
      {/* Chapter 3 — businesses and services */}
      <BusinessesServicesChapter />
      {/* Chapter 4 — property intelligence */}
      <PropertyIntelligenceChapter />
      {/* Chapter 5 — the closing team */}
      <ClosingTeamChapter />
      {/* Chapter 6 — home services, before and after closing */}
      <HomeServicesRail />
      <BuyingAndOwningHome />
      {/* Chapter 7 — towns and neighborhoods */}
      <TownRail />
      {/* Chapter 8 — this week in the Capital District */}
      <ThisWeekCampaign />
      <FeaturedThisWeek />
      {/* Chapter 9 — talk to a human */}
      <TalkToScottChapter />



      <Footer />
    </div>
  );
};

export default Index;
