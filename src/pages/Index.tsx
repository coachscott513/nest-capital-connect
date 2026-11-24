import SEOHead from "@/components/SEOHead";
import MarketFeedHome from "@/components/feed/MarketFeedHome";
import {
  HOMEPAGE_ORGANIZATION_SCHEMA,
  HOMEPAGE_WEBSITE_SCHEMA,
} from "@/utils/seoSchemas";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Capital District Nest | Local Feed, Businesses & Market Resources"
        description="Explore Capital District, NY local updates with credited sources, town filters, business profiles, real estate search and financing resources."
        keywords="Capital District, local discovery, neighborhood guide Albany NY, Capital District real estate, Saratoga Springs, Troy NY, Schenectady, Delmar NY, local businesses"
        canonical="https://www.capitaldistrictnest.com/"
        structuredData={[
          HOMEPAGE_ORGANIZATION_SCHEMA,
          HOMEPAGE_WEBSITE_SCHEMA,
        ]}
      />

      <MarketFeedHome />
    </>
  );
};

export default Index;
