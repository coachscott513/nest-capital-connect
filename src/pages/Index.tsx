import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BuyingAndOwningHome from "@/components/home/BuyingAndOwningHome";
import PropertyHero from "@/components/home/PropertyHero";
import RegionalSearchChapter from "@/components/home/RegionalSearchChapter";
import BusinessesServicesChapter from "@/components/home/BusinessesServicesChapter";
import PropertyIntelligenceChapter from "@/components/home/PropertyIntelligenceChapter";
import ClosingTeamChapter from "@/components/home/ClosingTeamChapter";
import TownsEventsStoriesChapter from "@/components/home/TownsEventsStoriesChapter";
import TalkToScottChapter from "@/components/home/TalkToScottChapter";
import {
  localBusinessSchema,
  HOMEPAGE_ORGANIZATION_SCHEMA,
  HOMEPAGE_WEBSITE_SCHEMA,
} from "@/utils/seoSchemas";

/* =============================================================
   CAPITAL DISTRICT NEST — HOMEPAGE (Global Flow / Premium UX v1)
   Eight chapters, one idea each, in a fixed narrative order:
     1. Property hero            5. Property Intelligence
     2. Search the region        6. Closing Team
     3. Businesses & Services    7. Towns, Events & Local Stories
        (incl. Home Services)    8. Talk to Scott
     4. Buy / Sell / Invest / Own
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
      {/* 7 — towns, events and local stories (consolidated) */}
      <TownsEventsStoriesChapter />
      {/* 8 — talk to a human */}
      <TalkToScottChapter />

      <Footer />
    </div>
  );
};

export default Index;
