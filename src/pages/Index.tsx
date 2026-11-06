import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import DirectoryEditorialHome from "@/components/home/DirectoryEditorialHome";
import {
  localBusinessSchema,
  HOMEPAGE_ORGANIZATION_SCHEMA,
  HOMEPAGE_WEBSITE_SCHEMA,
} from "@/utils/seoSchemas";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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

      <DirectoryEditorialHome />

      <Footer />
    </div>
  );
};

export default Index;
