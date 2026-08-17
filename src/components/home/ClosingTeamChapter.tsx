import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileSignature,
  KeyRound,
  Ruler,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useClosingTeam } from "@/components/property/useClosingTeam";
import { logEngagement } from "@/lib/engagement";
import { closingTeamRoleClick } from "@/lib/homeAnalytics";

const PLACEMENT = "homepage-closing-team";

/**
 * Closing Team chapter.
 *
 * Role cards are neutral destinations — never a selected or paid provider.
 * Where a real canonical business category exists it is used; the remaining
 * roles open an educational role state on /closing-team rather than any
 * provider-empty or partner-recruitment page. Named professionals are a separate layer that
 * stays hidden until at least three founder-approved providers exist across
 * at least three distinct roles.
 */
type Role = {
  key: string;
  title: string;
  copy: string;
  to: string;
  action: string;
  icon: LucideIcon;
  /** Art-led card wash. No photography of real people is invented. */
  art: string;
};

const ROLES: Role[] = [
  {
    key: "financing",
    title: "Financing",
    copy: "Lenders and mortgage professionals who quote, pre-approve, and underwrite.",
    to: "/financing",
    action: "See financing options",
    icon: Banknote,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(94,234,212,0.22), transparent 62%), linear-gradient(135deg, #10233A 0%, #0C1220 100%)",
  },
  {
    key: "attorney",
    title: "Real-estate attorneys",
    copy: "Contract review, negotiation of terms, and closing representation.",
    to: "/businesses/legal-services",
    action: "Browse local attorneys",
    icon: Scale,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(148,163,184,0.20), transparent 62%), linear-gradient(135deg, #1B2233 0%, #0C1220 100%)",
  },
  {
    key: "inspection",
    title: "Home inspection",
    copy: "Condition inspections and specialty testing before a contingency expires.",
    to: "/closing-team#inspection",
    action: "What inspection covers",
    icon: ClipboardCheck,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(13,110,102,0.34), transparent 62%), linear-gradient(135deg, #0F2A26 0%, #0C1220 100%)",
  },
  {
    key: "insurance",
    title: "Insurance",
    copy: "Homeowner, landlord, and flood coverage quoted ahead of closing.",
    to: "/businesses/insurance",
    action: "Browse local insurance",
    icon: ShieldCheck,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(94,234,212,0.16), transparent 62%), linear-gradient(135deg, #142033 0%, #0C1220 100%)",
  },
  {
    key: "title",
    title: "Title & closing support",
    copy: "Title search, examination, and closing coordination where applicable.",
    to: "/closing-team#title",
    action: "How closing works",
    icon: FileSignature,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(201,164,73,0.18), transparent 62%), linear-gradient(135deg, #231F16 0%, #0C1220 100%)",
  },
  {
    key: "survey_appraisal",
    title: "Survey & appraisal",
    copy: "Included only where the property type and transaction actually require it.",
    to: "/closing-team#survey-appraisal",
    action: "When it applies",
    icon: Ruler,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(148,163,184,0.16), transparent 62%), linear-gradient(135deg, #171E2C 0%, #0C1220 100%)",
  },
  {
    key: "property_management",
    title: "Property management",
    copy: "Leasing, maintenance, and day-to-day operation after you own the property.",
    to: "/businesses/property-management",
    action: "Browse property managers",
    icon: KeyRound,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(13,110,102,0.26), transparent 62%), linear-gradient(135deg, #10222B 0%, #0C1220 100%)",
  },
];

const MIN_NAMED_PROVIDERS = 3;
const MIN_DISTINCT_ROLES = 3;

const arrowClass =
  "w-10 h-10 rounded-full border border-white/12 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.09] inline-flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60";

const ClosingTeamChapter = () => {
  const { members, loading } = useClosingTeam();
  const rail = useRef<HTMLDivElement | null>(null);
  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  const distinctRoles = new Set(members.map((m) => m.role_category)).size;
  const showNamedRail =
    !loading &&
    members.length >= MIN_NAMED_PROVIDERS &&
    distinctRoles >= MIN_DISTINCT_ROLES;

  return (
    <section
      id="closing-team"
      className="relative w-full border-t border-white/[0.06] bg-surface-raised scroll-mt-24"
    >
      <div
        className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 md:py-20"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6"
        >
          <div className="max-w-3xl">
          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.45em] uppercase text-text-quiet">
            The Closing Team
          </p>
          <h2 className="mt-5 text-3xl md:text-5xl tracking-[-0.035em] leading-[1.07] text-white text-balance">
            <span className="font-extralight text-text-bright">
              The people who move the transaction forward.
            </span>
          </h2>
          <p className="mt-5 text-[15px] md:text-[17px] text-text-soft font-light leading-relaxed">
            Financing, legal review, inspection, insurance, and closing support —
            organized by the role each one plays, not by who paid to appear.
          </p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button type="button" aria-label="Scroll roles left" onClick={() => nudge(-1)} className={arrowClass}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" aria-label="Scroll roles right" onClick={() => nudge(1)} className={arrowClass}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div
          ref={rail}
          className="mt-9 md:mt-12 -mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="snap-start shrink-0 w-[80vw] sm:w-[52vw] lg:w-[38%]"
              >
                <Link
                  to={r.to}
                  onClick={() => {
                    closingTeamRoleClick(r.key);
                    logEngagement("closing_team_open", {}, {
                      source_location: PLACEMENT,
                      category_slug: r.key,
                    });
                  }}
                  className="group relative block h-full overflow-hidden rounded-[26px] border border-white/10 hover:border-[#5eead4]/40 hover:-translate-y-0.5 transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60"
                  style={{ background: r.art }}
                >
                  <div className="relative flex items-start gap-5 p-6 md:p-7">
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/12 bg-white/[0.06]"
                      aria-hidden
                    >
                      <Icon className="w-5 h-5 text-[#5eead4]" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[21px] md:text-[23px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                        {r.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] md:text-[15px] text-white/65 font-light leading-relaxed">
                        {r.copy}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                        {r.action}
                        <ArrowRight className="w-4 h-4" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          <div className="shrink-0 w-1" aria-hidden />
        </div>

        {/* Named professionals — a separate, founder-approved layer only. */}
        {showNamedRail && (
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/closing-team"
            onClick={() => logEngagement("closing_team_open", {}, { source_location: PLACEMENT })}
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.09] transition"
          >
            How the Closing Team works <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <span className="inline-flex items-center gap-2 text-[12.5px] text-white/45">
            <ShieldCheck className="w-4 h-4 text-[#5eead4]" aria-hidden />
            Inclusion is never sold and never buys rank.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ClosingTeamChapter;
