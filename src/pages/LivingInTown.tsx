import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Phone } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import TownPageTemplate from "@/components/town/TownPageTemplate";
import { livingInTowns } from "@/data/livingInTowns";

interface LivingInTownProps {
  slugOverride?: string;
}

const toTownName = (slug: string) =>
  decodeURIComponent(slug || "town")
    .replace(/^living-in-/, "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const TownComingSoon = ({ slug }: { slug: string }) => {
  const townName = toTownName(slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{townName} Page Coming Soon | Capital District Nest</title>
        <meta
          name="description"
          content={`${townName} page coming soon. Browse all Capital District towns or talk to Scott Alvarez for local real estate guidance.`}
        />
        <link rel="canonical" href={`https://www.capitaldistrictnest.com/living-in/${slug}`} />
      </Helmet>

      <MainHeader />

      <main className="bg-white py-28 md:py-36 px-6 md:px-10">
        <section className="max-w-3xl mx-auto text-center">
          <p className="eyebrow-apple text-primary mb-5">Town Guide</p>
          <h1 className="h-hero text-foreground">{townName} page coming soon</h1>
          <p className="body-apple mt-7 max-w-2xl mx-auto text-foreground/65">
            We are building this town guide with local market insight, homes, businesses,
            and community updates. Scott can still help you explore {townName} today.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/communities" className="btn-primary-apple cta-arrow">
              Browse All Towns <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary-apple">
              <Phone className="w-4 h-4" /> Talk to Scott
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const LivingInTown = ({ slugOverride }: LivingInTownProps) => {
  const { townSlug = "", slug = "", townPath = "" } = useParams();
  const routeSlug = townSlug || slug || (townPath.startsWith("living-in-") ? townPath.replace(/^living-in-/, "") : "");
  const resolvedSlug = slugOverride ?? routeSlug;
  const town = livingInTowns[resolvedSlug];

  if (!town) return <TownComingSoon slug={resolvedSlug} />;

  return <TownPageTemplate town={town} />;
};

export default LivingInTown;
