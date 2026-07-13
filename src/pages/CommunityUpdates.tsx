import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Megaphone, ShieldCheck, Send } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import CommunityUpdateCard from "@/components/community/CommunityUpdateCard";
import {
  getAllCommunityUpdates,
  getTownSlugsWithUpdates,
  communityUpdates,
} from "@/data/communityUpdates";

const TEAL_DARK = "#5eead4";

const CommunityUpdates = () => {
  const all = useMemo(() => getAllCommunityUpdates(), []);
  const townSlugs = useMemo(() => getTownSlugsWithUpdates(), []);
  const townNameBySlug = useMemo(() => {
    const m = new Map<string, string>();
    communityUpdates.forEach((u) => m.set(u.townSlug, u.townName));
    return m;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Capital District Community Updates | Capital District Nest</title>
        <meta
          name="description"
          content="Official town, village, mayor, and community organization updates across the Capital District — parks, projects, road work, libraries, senior programs, farmers markets, and public safety notices."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/community-updates" />
        <meta property="og:title" content="Capital District Community Updates" />
        <meta
          property="og:description"
          content="One trusted place for residents to follow official community information across the Capital District."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <CleanHeader />

      {/* HERO — dark */}
      <section className="relative isolate overflow-hidden bg-background border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-16 md:pb-24">
          <p
            className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-5 inline-flex items-center gap-2"
            style={{ color: TEAL_DARK }}
          >
            <Megaphone className="w-3.5 h-3.5" /> Community Updates
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-white max-w-3xl">
            One trusted place for community information across the Capital District.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
            Official town announcements, mayor and supervisor updates, park
            improvements, road work, farmers markets, library news, senior and
            youth programs, public safety notices, and volunteer opportunities —
            alongside the businesses, homes, and stories of every town.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {townSlugs.map((slug) => (
              <Link
                key={slug}
                to={`/community-updates/${slug}`}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-[13px] font-medium text-white/85 hover:text-white hover:bg-white/[0.08] hover:border-white/25 transition"
              >
                {townNameBySlug.get(slug) ?? slug}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT EDITORIAL BAND — feed */}
      <section className="bg-[#F5F3EE] border-y border-black/[0.06] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 text-[#0d6e66]">
                Latest across the region
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-[#0B0F19]">
                Recent community updates
              </h2>
            </div>
            <p className="text-sm text-neutral-600 max-w-sm">
              Curated by Capital District Nest. Verified badges appear once a
              municipality or organization joins as an official contributor.
            </p>
          </div>

          {all.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {all.map((u) => (
                <div key={u.id} className="flex flex-col">
                  <CommunityUpdateCard update={u} variant="light" />
                  <Link
                    to={`/community-updates/${u.townSlug}`}
                    className="mt-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] hover:text-[#0B0F19]"
                  >
                    {u.townName} →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-600">No community updates yet.</p>
          )}
        </div>
      </section>

      {/* CONTRIBUTOR CTA — dark */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="rounded-2xl border border-[#5eead4]/25 bg-gradient-to-br from-[#5eead4]/[0.08] to-white/[0.02] p-8 md:p-12">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-[#5eead4]" />
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
                For Municipalities & Community Organizations
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
              Publish official updates directly to your town's page.
            </h2>
            <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
              Capital District Nest is building a verified contributor program
              for towns, villages, libraries, chambers of commerce, school
              districts, and parks departments. Verified accounts submit
              updates through the same shared publishing platform used by local
              businesses — the same digital front door for every community.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#5eead4] text-[#0B0F19] font-semibold text-sm hover:bg-white transition-colors"
            >
              <Send className="w-4 h-4" /> Request Contributor Access
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityUpdates;
