import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { WeeklyNewsletterCTA } from "@/components/WeeklyFeed";
import BusinessCategoriesGrid from "@/components/town/BusinessCategoriesGrid";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";
import {
  TownHero,
  TownWeeklyUpdates,
  TownHomes,
  TownFeatured,
  TownEvents,
  TownStartHere,
  TownEssentials,
  TownExpertCTA,
  TownNearby,
} from "@/components/town/TownSections";
import { livingInTowns } from "@/data/livingInTowns";

interface LivingInTownProps {
  slugOverride?: string;
}

const LivingInTown = ({ slugOverride }: LivingInTownProps) => {
  const { slug: routeSlug = "" } = useParams();
  const slug = slugOverride ?? routeSlug;
  const town = livingInTowns[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!town) return <Navigate to="/communities" replace />;

  const url = `https://www.capitaldistrictnest.com/living-in-${town.slug}`;
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${town.townName}, NY`,
    description: town.seoIntro,
    address: {
      "@type": "PostalAddress",
      addressLocality: town.townName,
      addressRegion: "NY",
      postalCode: town.zip,
      addressCountry: "US",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is it like living in ${town.townName}, NY?`,
        acceptedAnswer: { "@type": "Answer", text: town.seoIntro },
      },
      {
        "@type": "Question",
        name: `What schools serve ${town.townName}?`,
        acceptedAnswer: { "@type": "Answer", text: `${town.townName} is part of the ${town.schoolDistrict}.` },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{town.seoTitle}</title>
        <meta name="description" content={town.seoDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={town.seoTitle} />
        <meta property="og:description" content={town.seoDescription} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <MainHeader />

      <TownHero town={town} />
      <TownWeeklyUpdates town={town} />
      <TownHomes town={town} />
      <TrustedLocalPartners townName={town.townName} />
      <BusinessCategoriesGrid townName={town.townName} />
      <TownFeatured town={town} />
      <TownEvents town={town} />
      <TownStartHere town={town} />
      <TownEssentials town={town} />
      <TownExpertCTA town={town} />
      <WeeklyNewsletterCTA />
      <TownNearby town={town} />

      <Footer />
    </div>
  );
};

export default LivingInTown;
