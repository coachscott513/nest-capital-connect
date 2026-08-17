import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BuyingAndOwningHome from "@/components/home/BuyingAndOwningHome";
import PropertyHero from "@/components/home/PropertyHero";
import RegionalSearchChapter from "@/components/home/RegionalSearchChapter";
import BusinessesServicesChapter from "@/components/home/BusinessesServicesChapter";
import PropertyIntelligenceChapter from "@/components/home/PropertyIntelligenceChapter";
import ClosingTeamChapter from "@/components/home/ClosingTeamChapter";
import HomeServicesRail from "@/components/home/HomeServicesRail";
import TownsEventsStoriesChapter from "@/components/home/TownsEventsStoriesChapter";
import TalkToScottChapter from "@/components/home/TalkToScottChapter";
import {
  localBusinessSchema,
  HOMEPAGE_ORGANIZATION_SCHEMA,
  HOMEPAGE_WEBSITE_SCHEMA,
} from "@/utils/seoSchemas";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE (Global Flow / Premium UX v1)
   Nine chapters, one idea each, in a fixed narrative order:
     1. Property hero            6. Closing Team
     2. Search the region        7. Home Services
     3. Businesses & Services    8. Towns, Events & Local Stories
     4. Buy / Sell / Invest / Own
     5. Property Intelligence    9. Talk to Scott
   ============================================================= */

const Index = () => {
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

      {/* 1 — hero + live property search */}
      <PropertyHero />
      {/* 2 — regional search, four modes */}
      <RegionalSearchChapter />
      {/* 3 — businesses and services */}
      <BusinessesServicesChapter />
      {/* 4 — buy, sell, invest, own */}
      <BuyingAndOwningHome />
      {/* 5 — property intelligence */}
      <PropertyIntelligenceChapter />
      {/* 6 — the closing team */}
      <ClosingTeamChapter />
      {/* 7 — home services */}
      <HomeServicesRail />
      {/* 8 — towns, events and local stories (consolidated) */}
      <TownsEventsStoriesChapter />
      {/* 9 — talk to a human */}
      <TalkToScottChapter />

      <Footer />
    </div>
  );
};

export default Index;
