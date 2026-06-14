import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CalendarClock } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";

const OpenHouses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Open Houses This Week | Capital District Nest Homes</title>
        <meta
          name="description"
          content="Browse local Capital District open houses by town and listing agent."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes/open-houses" />
      </Helmet>
      <CleanHeader />

      <section className="px-[5%] pt-24 pb-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <Link to="/homes" className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Homes
          </Link>
          <CalendarClock className="w-10 h-10 text-[#5eead4] mx-auto mb-4" />
          <div className="eyebrow-apple text-[#5eead4] mb-3">OPEN HOUSES</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
            Open houses this week.
          </h1>
          <p className="body-apple-dark mb-6">
            Open houses are being added. Agents can submit open house links
            during launch.
          </p>
          <Link to="/homes/add-listing?type=open-house" className="btn-primary-apple inline-flex">
            Submit Open House
          </Link>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

export default OpenHouses;
