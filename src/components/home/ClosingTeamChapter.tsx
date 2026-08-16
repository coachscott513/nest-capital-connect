import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useClosingTeam, CLOSING_TEAM_CATEGORIES } from "@/components/property/useClosingTeam";
import { logEngagement } from "@/lib/engagement";

const PLACEMENT = "homepage-closing-team";

/* Soft-neutral chapter — ink text, teal structure. */
const SOFT = "#F3F4F2";
const INK = "#14181F";
const SLATE = "#64748B";
const HAIRLINE = "#DFDCD4";
const TEAL = "#0D6E66";

/**
 * Quiet Closing Team chapter.
 * Renders only founder-approved members. When none exist it renders a truthful
 * category preview instead of an invented carousel.
 */
const ClosingTeamChapter = () => {
  const { members, loading } = useClosingTeam();

  return (
    <section
      id="closing-team"
      className="relative w-full scroll-mt-24 border-t"
      style={{ background: SOFT, borderTopColor: HAIRLINE, fontFamily: "'Manrope', system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: TEAL }}>
            The Closing Team
          </p>
          <h2
            className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance"
            style={{ color: INK }}
          >
            The people who help move the transaction forward.
          </h2>
          <p className="mt-5 text-[15px] md:text-lg font-light leading-relaxed" style={{ color: SLATE }}>
            Financing, legal review, inspection, insurance, and closing support —
            organized by the role each one plays, not by who paid to appear.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLOSING_TEAM_CATEGORIES.map((c) => (
            <div
              key={c.key}
              className="rounded-2xl border bg-white p-6"
              style={{ borderColor: HAIRLINE }}
            >
              <h3 className="text-[17px] font-semibold" style={{ color: INK }}>{c.title}</h3>
              <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: SLATE }}>{c.copy}</p>
            </div>
          ))}
        </div>

        {!loading && members.length === 0 && (
          <p className="mt-8 text-[13.5px] max-w-3xl leading-relaxed" style={{ color: SLATE }}>
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
                className="rounded-2xl border bg-white p-6"
                style={{ borderColor: HAIRLINE }}
                onClick={() =>
                  logEngagement("closing_team_provider_open", {}, {
                    source_location: PLACEMENT,
                    category_slug: m.role_category,
                  })
                }
              >
                <p className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: TEAL }}>
                  {m.role_category}
                </p>
                <p className="mt-2 text-[17px] font-semibold" style={{ color: INK }}>
                  {m.partner?.company || m.partner?.name || "Provider"}
                </p>
                {m.service_area && (
                  <p className="mt-1 text-[13px]" style={{ color: SLATE }}>{m.service_area}</p>
                )}
                {m.relationship_disclosure && (
                  <p className="mt-3 text-[12px] leading-relaxed" style={{ color: SLATE }}>
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
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border bg-white text-sm font-semibold transition hover:bg-[#FBFAF7]"
            style={{ borderColor: HAIRLINE, color: INK }}
          >
            How the Closing Team works <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="inline-flex items-center gap-2 text-[12.5px]" style={{ color: SLATE }}>
            <ShieldCheck className="w-4 h-4" style={{ color: TEAL }} />
            Inclusion is never sold and never buys rank.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ClosingTeamChapter;
