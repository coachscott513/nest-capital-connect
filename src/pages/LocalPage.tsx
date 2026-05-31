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
  const rawCategory = params.get("category") || params.get("q") || "";
  const category = rawCategory ? titleize(rawCategory) : "";

  const title = category
    ? `${category} in the Capital District | Capital District Nest`
    : "Local Businesses in the Capital District | Capital District Nest";
  const description = category
    ? `Browse local ${category} providers, businesses, services, and featured partners across the Capital District.`
    : "Browse local businesses, restaurants, services, and featured partners across Albany, Saratoga, Troy, Schenectady, and every Capital District town.";
  const canonical = category
    ? `https://www.capitaldistrictnest.com/local?category=${encodeURIComponent(rawCategory)}`
    : "https://www.capitaldistrictnest.com/local";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
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
