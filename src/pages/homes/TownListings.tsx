import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink, Plus } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { getHomesTown, REMAX_SEARCH_URL } from "@/data/homesTowns";

const TownListings = () => {
  const { townSlug } = useParams<{ townSlug: string }>();
  const town = getHomesTown(townSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [townSlug]);

  if (!town) return <Navigate to="/homes" replace />;

  const title = `${town.name} Property Links & Listing Agents | Capital District Nest`;
  const description = `Browse ${town.name} property links, new listings, rentals, active listing agents, open houses, and local real estate resources on Capital District Nest.`;
  const canonical = `https://www.capitaldistrictnest.com/homes/listings/${town.slug}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${town.name} Listings — Capital District Nest`} />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <CleanHeader />

      {/* Hero */}
      <section className="px-[5%] pt-24 pb-12 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/homes#town-listings"
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All towns
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">
            {town.county.toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            {town.name} property links
          </h1>
          <p className="body-apple-dark max-w-2xl mb-6">
            New listings, rentals, open houses, and active listing agents in{" "}
            {town.name}. All links go direct to the listing source — contact
            the listing agent directly.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={REMAX_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-apple inline-flex items-center gap-2"
            >
              Search MLS for {town.name} <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to={`/homes/add-listing?town=${town.slug}`}
              className="btn-secondary-apple-dark inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Post {town.name} Listing
            </Link>
          </div>
        </div>
      </section>

      {/* New Listings */}
      <section className="px-[5%] py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            New listings in {town.name}
          </h2>
          <p className="text-sm text-white/55 mb-8">
            Direct property links from listing agents.
          </p>
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center">
            <div className="text-white/75 mb-2">
              {town.name} listings are being added.
            </div>
            <p className="text-sm text-white/55 mb-6 max-w-md mx-auto">
              Listing agents and property managers can post a direct link to
              their {town.name} property today.
            </p>
            <Link
              to={`/homes/add-listing?town=${town.slug}`}
              className="btn-primary-apple inline-flex"
            >
              Post {town.name} Listing
            </Link>
          </div>
        </div>
      </section>

      {/* Active Listing Agents */}
      <section className="px-[5%] py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Active listing agents in {town.name}
          </h2>
          <p className="text-sm text-white/55 mb-8">
            See which agents currently have listings in this market.
          </p>
          <div className="rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-8 text-center">
            <div className="text-lg font-semibold text-white mb-2">
              Want your agent card shown here?
            </div>
            <p className="text-sm text-white/65 mb-6 max-w-lg mx-auto">
              Featured {town.name} agents get priority placement, photo,
              brokerage, and social links on this page.
            </p>
            <Link
              to={`/claim-business?category=real-estate&tier=featured&town=${town.slug}`}
              className="btn-dark-cta inline-flex"
            >
              Request Featured Agent Placement
            </Link>
          </div>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

export default TownListings;
