import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calculator, Wallet, Sparkles } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { resolveHomesTown } from "@/data/homesTowns";
import { getTownBoard } from "@/data/townPropertyBoard";
import { usePreviewListings } from "@/hooks/usePreviewListings";
import PreviewListingsPanel from "@/components/homes/PreviewListingsPanel";
import FeaturedPropertyCard from "@/components/homes/FeaturedPropertyCard";
import { getFeaturedForTown } from "@/data/featuredProperties";

const TownListings = () => {
  const { city } = useParams<{ city?: string }>();
  const citySlug = city?.toLowerCase();
  const town = resolveHomesTown(citySlug);
  const board = useMemo(() => getTownBoard(citySlug), [citySlug]);
  const preview = usePreviewListings(citySlug);

  useEffect(() => { window.scrollTo(0, 0); }, [citySlug]);

  const isAllListings = !citySlug;
  const townName = town?.name ?? "Capital District";
  const townRouteSlug = town?.slug ?? citySlug ?? "capital-district";

  const title = isAllListings
    ? "Capital District Property Links & Real Estate Resources | Capital District Nest"
    : `${townName} Property Links & Real Estate Resources | Capital District Nest`;
  const description = isAllListings
    ? "Browse Capital District property link previews, rentals, multi-family properties, land, investment opportunities, and local real estate services on Capital District Nest."
    : `Browse ${townName} property link previews, rentals, multi-family properties, land, investment opportunities, and local real estate services on Capital District Nest.`;
  const canonical = isAllListings
    ? "https://www.capitaldistrictnest.com/homes/listings"
    : `https://www.capitaldistrictnest.com/homes/listings/${townRouteSlug}`;

  const all = preview.all;
  const byCat = preview.byCategory;
  const counts = {
    all: all.length,
    residential: byCat.residential?.length ?? 0,
    rental: byCat.rental?.length ?? 0,
    multi_family: byCat.multi_family?.length ?? 0,
    land: byCat.land?.length ?? 0,
  };

  const investmentRows = useMemo(
    () =>
      all.filter(
        (l) =>
          l.property_category === "multi_family" ||
          l.property_category === "land" ||
          (l.property_category === "residential" && (l.price ?? 0) > 0 && (l.price ?? 0) < 250000),
      ),
    [all],
  );

  const tabs = [
    { key: "all", label: `All (${counts.all})`, rows: all, category: undefined as string | undefined },
    { key: "residential", label: `Residential (${counts.residential})`, rows: byCat.residential ?? [], category: "residential" },
    { key: "rental", label: `Rentals (${counts.rental})`, rows: byCat.rental ?? [], category: "rental" },
    { key: "multi_family", label: `Multi-Family / Mixed-Use (${counts.multi_family})`, rows: byCat.multi_family ?? [], category: "multi_family" },
    { key: "land", label: `Land (${counts.land})`, rows: byCat.land ?? [], category: "land" },
    { key: "investment", label: `Investment (${investmentRows.length})`, rows: investmentRows, category: "investment" },
  ].filter((t) => t.key === "all" || t.rows.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <CleanHeader />

      {/* HERO */}
      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/homes#town-listings"
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All towns
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">
            {isAllListings ? "CAPITAL DISTRICT PROPERTY BOARD" : `${townName.toUpperCase()} PROPERTY BOARD`}
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            {isAllListings ? "Capital District Property Links" : `${townName} Property Links`}
          </h1>
          <p className="body-apple-dark max-w-2xl mb-3">
            Browse property link previews, rentals, multi-family properties,
            land, investment opportunities, and local real estate resources
            {isAllListings ? " across the Capital District." : ` in ${townName}.`}
          </p>
          <p className="text-sm text-white/55 max-w-2xl mb-8">
            Capital District Nest organizes local property links by town.
            Contact the listing source directly when a public link is provided.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <StatBlock label="Property link previews" value={counts.all || "Updating"} />
            <StatBlock label="Residential" value={counts.residential || "—"} />
            <StatBlock label="Multi-family / mixed-use" value={counts.multi_family || "—"} />
            <StatBlock label="Rentals" value={counts.rental || "—"} />
            <StatBlock label="Land" value={counts.land || "—"} />
          </div>
          {counts.all === 0 && (
            <p className="text-xs text-white/45">Property links being updated during launch.</p>
          )}
        </div>
      </section>

      {/* FEATURED PROPERTY BRIEFS */}
      {!isAllListings && getFeaturedForTown(townRouteSlug).length > 0 && (
        <section className="px-[5%] py-10 border-b border-white/10">
          <div className="max-w-6xl mx-auto space-y-5">
            {getFeaturedForTown(townRouteSlug).map((p) => (
              <FeaturedPropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* ANALYZER CTA */}
      <section className="px-[5%] py-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto rounded-2xl border border-[#5eead4]/25 bg-gradient-to-br from-[#5eead4]/8 to-[#1E2230] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="eyebrow-apple text-[#5eead4] mb-2">RUN THE NUMBERS</div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Analyze {isAllListings ? "a Local" : `a ${townName}`} Property
              </h2>
              <p className="text-sm text-white/70">
                Run quick numbers on {isAllListings ? "local" : townName} rentals, multi-units, mixed-use
                properties, and investment opportunities — or estimate the cash
                you actually need to buy.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Link
                to={isAllListings ? "/investment-analyzer" : `/investment-analyzer?town=${townRouteSlug}`}
                className="btn-primary-apple inline-flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" /> Analyze Property
              </Link>
              <Link
                to={isAllListings ? "/investment-analyzer?tab=first-time-buyer" : `/investment-analyzer?tab=first-time-buyer&town=${townRouteSlug}`}
                className="btn-secondary-apple-dark inline-flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" /> First-Time Buyer Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY BOARD */}
      <section className="px-[5%] py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              {isAllListings ? "Capital District property board" : `${townName} property board`}
            </h2>
            <p className="text-sm text-white/55">
              Property link previews · Listing source pending unless a public
              link has been confirmed.
            </p>
          </div>

          <Tabs defaultValue={tabs[0]?.key ?? "all"} className="w-full">
            <div className="overflow-x-auto -mx-2 px-2">
              <TabsList className="bg-[#1E2230] border border-white/10 inline-flex h-auto p-1 gap-1 whitespace-nowrap">
                {tabs.map((t) => (
                  <TabsTrigger
                    key={t.key}
                    value={t.key}
                    className="text-xs data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70"
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
                <TabsTrigger
                  value="services"
                  className="text-xs data-[state=active]:bg-[#5eead4] data-[state=active]:text-[#0B0F19] text-white/70"
                >
                  Local Services
                </TabsTrigger>
              </TabsList>
            </div>

            {tabs.map((t) => (
              <TabsContent key={t.key} value={t.key} className="mt-5">
                <PreviewListingsPanel
                  townName={townName}
                  townSlug={townRouteSlug}
                  listings={t.rows}
                  category={t.category}
                />
              </TabsContent>
            ))}

            <TabsContent value="services" className="mt-5">
              <LocalServices townName={townName} townSlug={townRouteSlug} services={board.services} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-[5%] py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6">
            <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-2">
              Connected to a property here?
            </div>
            <div className="text-xl font-semibold text-white mb-2">
              Claim {isAllListings ? "a local" : `a ${townName}`} listing link
            </div>
            <p className="text-sm text-white/70 mb-4">
              Listing agents and authorized representatives can confirm the
              listing source and add a preferred public listing URL.
            </p>
            <Link to="/homes/claim-listing" className="btn-primary-apple inline-flex">
              Claim Listing Link
            </Link>
          </div>
          <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-br from-[#5eead4]/10 to-[#1E2230] p-6">
            <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-2">
              For Real Estate Professionals
            </div>
            <div className="text-xl font-semibold text-white mb-2">
              Become {isAllListings ? "a Capital District" : `a ${townName}`} town partner
            </div>
            <p className="text-sm text-white/80 mb-4">
              Get featured inside the {isAllListings ? "Capital District" : townName} property board, buyer tools,
              and local real estate services categories.
            </p>
            <Link
              to={isAllListings ? "/homes/partners?intent=featured" : `/homes/partners?town=${townRouteSlug}&intent=featured`}
              className="btn-dark-cta inline-flex"
            >
              <Sparkles className="w-4 h-4" /> Request Featured Placement
            </Link>
          </div>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

const StatBlock = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] px-5 py-4">
    <div className="text-white font-semibold text-2xl">{value}</div>
    <div className="text-xs uppercase tracking-wider text-white/55 mt-1">
      {label}
    </div>
  </div>
);

const LocalServices = ({
  townName,
  townSlug,
  services,
}: {
  townName: string;
  townSlug: string;
  services: { name: string; category: string; href: string }[];
}) => {
  const CATEGORIES = [
    "Mortgage & Lending",
    "Insurance",
    "Real Estate Attorneys",
    "Contractors",
    "Home Inspectors",
    "Property Management",
    "Appraisers",
    "Moving & Storage",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-1">
          Local Real Estate Services in {townName}
        </h3>
        <p className="text-sm text-white/55">
          Find local professionals connected to buying, selling, investing,
          renting, and maintaining property.
        </p>
      </div>

      {services.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s) => (
            <Link
              key={s.name}
              to={s.href}
              className="rounded-2xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/40 transition-colors"
            >
              <div className="text-xs uppercase tracking-widest text-[#5eead4] mb-1">
                {s.category}
              </div>
              <div className="text-white font-medium">{s.name}</div>
            </Link>
          ))}
        </div>
      )}

      <div>
        <div className="text-xs uppercase tracking-wider text-white/55 mb-2">
          Service categories
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-sm text-white/85"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-br from-[#5eead4]/10 to-[#1E2230] p-6">
        <div className="text-lg font-semibold text-white mb-1">
          Serve buyers, sellers, landlords, or investors in {townName}?
        </div>
        <p className="text-sm text-white/75 mb-4">
          Get featured inside the {townName} local real estate services
          directory.
        </p>
        <Link
          to={`/homes/partners?town=${townSlug}`}
          className="btn-dark-cta inline-flex"
        >
          Request Featured Placement
        </Link>
      </div>
    </div>
  );
};

export default TownListings;
