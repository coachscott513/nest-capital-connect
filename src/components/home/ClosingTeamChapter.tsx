import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useClosingTeam, CLOSING_TEAM_CATEGORIES } from "@/components/property/useClosingTeam";
import { logEngagement } from "@/lib/engagement";

const PLACEMENT = "homepage-closing-team";

/**
 * Quiet Closing Team chapter.
 * Renders only founder-approved members. When none exist it renders a truthful
 * category preview instead of an invented carousel.
 */
const ClosingTeamChapter = () => {
  const { members, loading } = useClosingTeam();

  // Honest conditional behavior: with zero approved providers the homepage
  // chapter collapses entirely rather than reserving an empty section.
  // It returns automatically the moment an approved provider exists.
  if (loading || members.length === 0) return null;

  return (
    <section
      id="closing-team"
      className="relative w-full bg-[#0E1220] border-t border-white/[0.06] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
            The Closing Team
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-white text-balance">
            The people who help move the transaction forward.
          </h2>
          <p className="mt-5 text-[15px] md:text-lg text-white/65 font-light leading-relaxed">
            Financing, legal review, inspection, insurance, and closing support —
            organized by the role each one plays, not by who paid to appear.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLOSING_TEAM_CATEGORIES.map((c) => (
            <div
              key={c.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-[17px] font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-[14px] text-white/60 font-light leading-relaxed">{c.copy}</p>
            </div>
          ))}
        </div>

        {!loading && members.length === 0 && (
          <p className="mt-8 text-[13.5px] text-white/55 max-w-3xl leading-relaxed">
            No providers have been approved for the Closing Team yet. Nothing is
            listed here until a real, named professional is reviewed and approved,
            with any relationship disclosed in plain language.
          </p>
        )}

        {members.length > 0 && (
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"
                onClick={() =>
                  logEngagement("closing_team_provider_open", {}, {
                    source_location: PLACEMENT,
                    category_slug: m.role_category,
                  })
                }
              >
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                  {m.role_category}
                </p>
                <p className="mt-2 text-[17px] font-semibold text-white">
                  {m.partner?.company || m.partner?.name || "Provider"}
                </p>
                {m.service_area && (
                  <p className="mt-1 text-[13px] text-white/55">{m.service_area}</p>
                )}
                {m.relationship_disclosure && (
                  <p className="mt-3 text-[12px] text-white/45 leading-relaxed">
                    {m.relationship_disclosure}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/closing-team"
            onClick={() => logEngagement("closing_team_open", {}, { source_location: PLACEMENT })}
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.09] transition"
          >
            How the Closing Team works <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="inline-flex items-center gap-2 text-[12.5px] text-white/45">
            <ShieldCheck className="w-4 h-4 text-[#5eead4]" />
            Inclusion is never sold and never buys rank.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ClosingTeamChapter;
