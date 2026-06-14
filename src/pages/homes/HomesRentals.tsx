import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ExternalLink } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { REMAX_SEARCH_URL, HOMES_TOWNS } from "@/data/homesTowns";

const HomesRentals = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Capital District Rentals | Capital District Nest Homes</title>
        <meta
          name="description"
          content="Browse Capital District rentals — apartments, houses, rooms, and rental property links by town."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes/rentals" />
      </Helmet>
      <CleanHeader />

      <section className="px-[5%] pt-24 pb-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <Link to="/homes" className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Homes
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">RENTALS</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Rentals across the Capital District.
          </h1>
          <p className="body-apple-dark mb-6">
            Apartments, houses, rooms, and rental property links by town. Use
            full MLS-powered search or post your rental link below.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={REMAX_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-apple inline-flex items-center gap-2"
            >
              Open Rentals Search <ExternalLink className="w-4 h-4" />
            </a>
            <Link to="/homes/add-listing?type=rental" className="btn-secondary-apple-dark">
              Post Rental Link
            </Link>
          </div>
        </div>
      </section>

      <section className="px-[5%] py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-6">Rentals by town</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {HOMES_TOWNS.map((t) => (
              <Link
                key={t.slug}
                to={`/homes/listings/${t.slug}`}
                className="rounded-xl border border-white/10 bg-[#1E2230] px-4 py-3 hover:border-[#5eead4]/50 transition text-white"
              >
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-white/55">{t.county}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

export default HomesRentals;
