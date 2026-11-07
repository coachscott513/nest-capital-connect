import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BusinessDirectory from "@/components/local/BusinessDirectory";
import LocalHero from "@/components/local/LocalHero";

const titleize = (s: string) =>
  s
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

const LocalPage = () => {
  const [params] = useSearchParams();
  const hasQuery = Array.from(params.keys()).length > 0;

  // Canonical ALWAYS points to clean /local. Filtered/query states are
  // marked noindex,follow so Google consolidates ranking signals on /local.
  const canonical = "https://www.capitaldistrictnest.com/local";
  const title = "Capital District Local Business Directory | Capital District Nest";
  const description =
    "Search local businesses, services, restaurants, professionals, contractors, and community resources across the Capital District.";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {hasQuery && <meta name="robots" content="noindex, follow" />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <CleanHeader />
      <LocalHero />
      <div id="directory">
        <BusinessDirectory />
      </div>
      <Footer />
    </div>
  );
};

export default LocalPage;
