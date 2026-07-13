import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Megaphone } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import CommunityUpdateCard from "@/components/community/CommunityUpdateCard";
import {
  getCommunityUpdatesByTown,
  communityUpdates,
} from "@/data/communityUpdates";
import { findTownInDirectory } from "@/data/capitalDistrictCounties";

const TEAL_DARK = "#5eead4";

const titleize = (slug: string) =>
  slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

const CommunityUpdatesTown = () => {
  const { townSlug = "" } = useParams();
  const slug = townSlug.toLowerCase();

  const updates = useMemo(() => getCommunityUpdatesByTown(slug), [slug]);
  const directory = findTownInDirectory(slug);
  const nameFromData =
    communityUpdates.find((u) => u.townSlug === slug)?.townName;
  const townName = nameFromData ?? directory?.name ?? titleize(slug || "town");

  const title = `${townName} Community Updates | Capital District Nest`;
  const description = `Official ${townName} announcements, community projects, road work, library and park news, farmers markets, and public safety notices — all in one place.`;
  const canonical = `https://www.capitaldistrictnest.com/community-updates/${slug}`;

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

      <section className="relative bg-background border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-14 md:pb-20">
          <Link
            to="/community-updates"
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All community updates
          </Link>
          <p
            className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 inline-flex items-center gap-2"
            style={{ color: TEAL_DARK }}
          >
            <Megaphone className="w-3.5 h-3.5" /> {townName} · Community Updates
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white max-w-3xl">
            What's happening in {townName}.
          </h1>
          <p className="mt-5 text-lg text-white/70 font-light leading-relaxed max-w-2xl">
            Official announcements, community projects, and civic programs
            published for {townName} residents.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/living-in/${slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/25 transition"
            >
              Explore {townName} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {updates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {updates.map((u) => (
                <CommunityUpdateCard key={u.id} update={u} variant="dark" />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 md:p-14 text-center max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                No {townName} updates published yet.
              </h2>
              <p className="mt-3 text-white/65 text-sm md:text-base">
                Capital District Nest is inviting {townName} town officials,
                library staff, and community organizations to publish verified
                updates through our shared platform.
              </p>
              <Link
                to="/community-updates"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#5eead4] hover:text-white"
              >
                Browse regional updates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityUpdatesTown;
