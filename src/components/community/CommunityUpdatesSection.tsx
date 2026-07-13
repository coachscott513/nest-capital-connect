import { Link } from "react-router-dom";
import { ArrowRight, Megaphone } from "lucide-react";
import { getCommunityUpdatesByTown } from "@/data/communityUpdates";
import CommunityUpdateCard from "./CommunityUpdateCard";

const TEAL_DARK = "#5eead4";

interface Props {
  townSlug: string;
  townName: string;
  /** Cap the number of cards shown inline on a town page. */
  limit?: number;
}

/**
 * Town-page Community Updates module.
 * Dark editorial band matching the rest of TownPageTemplate.
 * Renders nothing until at least one update exists — no empty state noise.
 */
export const CommunityUpdatesSection = ({ townSlug, townName, limit = 3 }: Props) => {
  const updates = getCommunityUpdatesByTown(townSlug).slice(0, limit);

  return (
    <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14 flex-wrap">
          <div className="max-w-2xl">
            <p
              className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 inline-flex items-center gap-2"
              style={{ color: TEAL_DARK }}
            >
              <Megaphone className="w-3.5 h-3.5" /> Community Updates
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
              What's happening in {townName}
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/65 font-light leading-relaxed">
              Official announcements, community projects, and civic programs — a
              trusted place for residents to stay informed alongside local
              businesses, homes, and events.
            </p>
          </div>
          <Link
            to={`/community-updates/${townSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-[#5eead4] transition-colors"
          >
            All {townName} updates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {updates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {updates.map((u) => (
              <CommunityUpdateCard key={u.id} update={u} variant="dark" />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 text-center">
            <p className="text-white/70 text-sm md:text-base">
              No community updates published for {townName} yet.
            </p>
            <p className="text-white/45 text-xs mt-2">
              Municipalities and community organizations can request a verified
              contributor account to publish here.
            </p>
            <Link
              to="/community-updates"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#5eead4] hover:text-white transition-colors"
            >
              Browse regional updates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityUpdatesSection;
