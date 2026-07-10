import { useParams, Link, Navigate } from "react-router-dom";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import SEOHead from "@/components/SEOHead";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home as HomeIcon,
  Building2,
  Wallet,
  TrendingUp,
  Bell,
  MapPin,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { buyerTowns } from "@/data/buyerTownSearch";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-advanced-search": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & { "agent-encoded-id"?: string },
        HTMLElement
      >;
    }
  }
}

const AGENT_ID = "QWdlbnQtMzE2NTU3";
const DEFAULT_MAP_URL =
  "https://scottalvarez863.realscout.com/homesearch/map?geo_type=city&geo_id=3601000";

const BuyerTownSearch = () => {
  const { townSlug = "" } = useParams();
  const town = buyerTowns[townSlug.toLowerCase()];

  if (!town) {
    return <Navigate to="/homes" replace />;
  }

  const mapUrl = town.cityGeoId
    ? `https://scottalvarez863.realscout.com/homesearch/map?geo_type=city&geo_id=${town.cityGeoId}`
    : DEFAULT_MAP_URL;

  const title = `${town.name} NY Homes for Sale & Smart Search | Capital District Nest`;
  const description = `Search ${town.name} NY homes for sale with smart alerts, buyer tools, cash-to-buy estimates, property analysis, and local real estate resources from Capital District Nest.`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${town.name} NY Homes for Sale & Smart Search`,
    description: `Search ${town.name} NY homes for sale with smart alerts, local buyer tools, and Capital District Nest property resources.`,
    url: `https://www.capitaldistrictnest.com/homes/search/${town.slug}`,
  };

  const faqs = [
    {
      q: `How do I search homes for sale in ${town.name}, NY?`,
      a: `Use the ${town.name} search tool on Capital District Nest to browse current listings through the RealScout-powered search experience, then use local buyer tools to estimate costs and compare properties.`,
    },
    {
      q: `Can I search ${town.name} multi-family properties?`,
      a: `Yes. ${town.name} has single-family homes, condos, multi-family properties, and investment opportunities. Use the property type filters and the ${town.name} property board to explore options.`,
    },
    {
      q: `How much cash do I need to buy a home in ${town.name}?`,
      a: `Cash needed depends on purchase price, loan type, down payment, closing costs, seller credits, inspections, taxes, insurance, and lender requirements. Use the Cash to Buy tool for an estimate.`,
    },
    {
      q: `Can I get alerts for new ${town.name} listings?`,
      a: `Yes. Buyers can use smart search alerts to track new listings, price changes, and homes that match their criteria.`,
    },
    {
      q: `Is Capital District Nest a brokerage?`,
      a: `Capital District Nest is a local media, directory, advertising, and community search platform. Real estate searches and inquiries may connect users to licensed real estate professionals or external listing tools.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={title}
        description={description}
        keywords={`${town.name} NY homes for sale, homes for sale in ${town.name} NY, ${town.name} real estate, ${town.name} multi-family, ${town.name} condos, ${town.name} first-time buyer, buying a home in ${town.name} NY, living in ${town.name} NY`}
        structuredData={[webPageSchema, faqSchema]}
      />
      <MainHeader />

      <main>
        {/* Hero */}
        <section className="px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow-apple text-[#5eead4] mb-4">
              {town.name.toUpperCase()} NY HOME SEARCH
            </p>
            <h1 className="h-hero text-white mb-6">
              Search {town.name} NY homes for sale.
            </h1>
            <p className="body-apple text-white/70 max-w-2xl mx-auto mb-8">
              Browse {town.name} homes, condos, multi-family properties, and investment
              opportunities with smart search tools, local buyer resources, and Capital
              District Nest property intelligence.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#search">
                <Button size="lg" className="btn-primary-apple">
                  Start {town.name} Search
                </Button>
              </a>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="btn-secondary-apple">
                  <Bell className="w-4 h-4 mr-2" />
                  Get Smart Listing Alerts
                </Button>
              </a>
            </div>
            <p className="text-white/50 text-sm mt-6">
              Powered by RealScout search tools and Capital District Nest local market
              resources.
            </p>
          </div>
        </section>

        {/* Search widget card */}
        <section id="search" className="px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-10 shadow-xl">
              <div className="text-center mb-6">
                <p className="eyebrow-apple text-[#5eead4] mb-2">SEARCH {town.name.toUpperCase()}, NY</p>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Find your next home in {town.name}
                </h2>
              </div>
              <realscout-advanced-search agent-encoded-id={AGENT_ID}></realscout-advanced-search>
              <div className="mt-6 text-center">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "rgb(35, 93, 137)" }}
                >
                  Browse all {town.name}, NY listings →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Buying context */}
        <section className="px-6 py-20 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Buying in {town.name}, NY
            </h2>
            <p className="body-apple text-white/70 max-w-3xl mb-10">{town.intro}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: HomeIcon,
                  title: "Homes",
                  body: `Search single-family homes, townhomes, and residential properties in ${town.name} neighborhoods.`,
                },
                {
                  icon: Building2,
                  title: "Multi-Family",
                  body: "Explore two-family, three-family, four-unit, and mixed-use opportunities.",
                },
                {
                  icon: Wallet,
                  title: "First-Time Buyers",
                  body: "Estimate down payment, closing costs, seller credits, and monthly payment.",
                },
                {
                  icon: TrendingUp,
                  title: "Investors",
                  body: "Analyze rent potential, expenses, cash flow, cap rate, and cash-on-cash return.",
                },
              ].map((card) => (
                <Card key={card.title} className="bg-[#1E2230] border-white/10">
                  <CardContent className="p-6">
                    <card.icon className="w-6 h-6 text-[#5eead4] mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                    <p className="text-white/70 text-sm">{card.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Buyer tools */}
        <section className="px-6 py-20 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              {town.name} buyer tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Calculator,
                  title: `Analyze a ${town.name} Property`,
                  href: `/investment-analyzer?town=${town.slug}`,
                },
                {
                  icon: Wallet,
                  title: "Estimate Cash to Buy",
                  href: `/investment-analyzer?tab=first-time-buyer&town=${town.slug}`,
                },
                {
                  icon: HomeIcon,
                  title: `Browse ${town.name} Property Board`,
                  href: `/homes/listings/${town.slug}`,
                },
                {
                  icon: MapPin,
                  title: `Explore Living in ${town.name}`,
                  href: `/living-in/${town.slug}`,
                },
                {
                  icon: Building2,
                  title: "Find Local Real Estate Services",
                  href: `/homes/partners?town=${town.slug}`,
                },
              ].map((tool) => (
                <Link
                  key={tool.title}
                  to={tool.href}
                  className="group rounded-xl border border-white/10 bg-[#1E2230] p-6 hover:border-[#5eead4]/40 transition-colors"
                >
                  <tool.icon className="w-6 h-6 text-[#5eead4] mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{tool.title}</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Smart alerts */}
        <section className="px-6 py-20 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <Bell className="w-8 h-8 text-[#5eead4] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Get smarter {town.name} listing alerts.
            </h2>
            <p className="body-apple text-white/70 mb-8">
              Instead of checking listings manually, create smart search alerts for the
              homes, neighborhoods, price ranges, and property types you care about.
            </p>
            <ul className="text-white/70 text-left max-w-md mx-auto space-y-2 mb-8">
              <li>• New {town.name} listings</li>
              <li>• Price changes</li>
              <li>• Saved search updates</li>
              <li>• Homes matching your criteria</li>
              <li>• Buyer activity tracking</li>
            </ul>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-primary-apple">
                Create Smart Alerts
              </Button>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              {town.name} home search FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border border-white/10 bg-[#1E2230] p-5 group"
                >
                  <summary className="cursor-pointer text-white font-medium list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-[#5eead4] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-white/70 mt-3 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BuyerTownSearch;
