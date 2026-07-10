import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Search, Home as HomeIcon, Palmtree } from "lucide-react";
import { buyerTowns } from "@/data/buyerTownSearch";

const NY_POPULAR = [
  "albany",
  "delmar",
  "saratoga-springs",
  "troy",
  "schenectady",
  "clifton-park",
  "guilderland",
  "niskayuna",
  "colonie",
  "queensbury",
  "lake-george",
];

const FL_POPULAR = [
  { name: "Jacksonville", note: "North Florida" },
  { name: "St. Augustine", note: "Historic coast" },
  { name: "Orlando", note: "Central Florida" },
  { name: "Tampa Area", note: "Gulf Coast" },
  { name: "Fort Myers Area", note: "Southwest FL" },
];

const SearchHub = () => {
  const nyTowns = NY_POPULAR.map((s) => buyerTowns[s]).filter(Boolean);

  const title = "Search Homes Smarter | Capital District Nest";
  const description =
    "Search homes across the Capital District, Upstate New York, and North & Central Florida. Choose a market, then a town, and explore listings with smart alerts and buyer tools.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Search Homes Smarter",
    description,
    url: "https://www.capitaldistrictnest.com/homes/search",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead title={title} description={description} structuredData={[schema]} />
      <MainHeader />

      <main>
        {/* Hero */}
        <section className="px-6 pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow-apple text-[#5eead4] mb-4">SMART HOME SEARCH</p>
            <h1 className="h-hero text-white mb-6">Search homes smarter.</h1>
            <p className="body-apple text-white/70 max-w-2xl mx-auto">
              Choose a market, pick a town, and explore listings inside the Capital
              District Nest experience — with smart alerts, buyer tools, and local context.
            </p>
          </div>
        </section>

        {/* Market picker */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="#ny"
              className="group rounded-2xl border border-white/10 bg-[#1E2230] p-8 hover:border-[#5eead4]/40 transition-colors"
            >
              <HomeIcon className="w-7 h-7 text-[#5eead4] mb-3" />
              <h2 className="text-xl font-semibold text-white mb-2">
                Capital District & Upstate New York
              </h2>
              <p className="text-white/70 text-sm mb-4">
                Albany, Saratoga, Troy, Schenectady, Delmar, Clifton Park and the
                surrounding Capital Region.
              </p>
              <span className="inline-flex items-center gap-1 text-[#5eead4] text-sm font-medium">
                Browse NY towns <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="#fl"
              className="group rounded-2xl border border-white/10 bg-[#1E2230] p-8 hover:border-[#5eead4]/40 transition-colors"
            >
              <Palmtree className="w-7 h-7 text-[#5eead4] mb-3" />
              <h2 className="text-xl font-semibold text-white mb-2">
                North & Central Florida
              </h2>
              <p className="text-white/70 text-sm mb-4">
                Jacksonville, St. Augustine, Orlando, Tampa, and Fort Myers area buyer
                markets.
              </p>
              <span className="inline-flex items-center gap-1 text-[#5eead4] text-sm font-medium">
                Browse FL markets <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </section>

        {/* NY towns */}
        <section id="ny" className="px-6 py-16 border-t border-white/10 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow-apple text-[#5eead4] mb-2">NEW YORK</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
              Popular New York searches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nyTowns.map((town) => (
                <Link
                  key={town.slug}
                  to={`/homes/search/${town.slug}`}
                  className="group rounded-xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-semibold">{town.name}</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] transition-colors" />
                  </div>
                  <span className="text-white/50 text-xs">{town.county}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FL towns */}
        <section id="fl" className="px-6 py-16 border-t border-white/10 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <p className="eyebrow-apple text-[#5eead4] mb-2">FLORIDA</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Popular Florida searches
            </h2>
            <p className="text-white/60 text-sm mb-8">
              Florida buyer search hubs are rolling out. In the meantime, reach out and
              we'll connect you with the right local search experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FL_POPULAR.map((m) => (
                <Link
                  key={m.name}
                  to="/south-florida"
                  className="group rounded-xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-semibold">{m.name}</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#5eead4] transition-colors" />
                  </div>
                  <span className="text-white/50 text-xs">{m.note}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 py-20 border-t border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <Search className="w-8 h-8 text-[#5eead4] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Start with Albany, our flagship search.
            </h2>
            <p className="body-apple text-white/70 mb-8">
              The most active Capital District Nest search experience — smart alerts,
              buyer tools, and full local context.
            </p>
            <Link to="/homes/search/albany">
              <Button size="lg" className="btn-primary-apple">
                <MapPin className="w-4 h-4 mr-2" />
                Search Albany Homes
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchHub;
