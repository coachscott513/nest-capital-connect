import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Banknote,
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
 * Role cards are neutral category destinations — they never point at one
 * selected or paid provider. Named professionals are a separate layer that
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
    to: "/homes/attorneys",
    action: "Browse attorneys",
    icon: Scale,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(148,163,184,0.20), transparent 62%), linear-gradient(135deg, #1B2233 0%, #0C1220 100%)",
  },
  {
    key: "inspection",
    title: "Home inspection",
    copy: "Condition inspections and specialty testing before a contingency expires.",
    to: "/homes/inspectors",
    action: "Browse inspectors",
    icon: ClipboardCheck,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(13,110,102,0.34), transparent 62%), linear-gradient(135deg, #0F2A26 0%, #0C1220 100%)",
  },
  {
    key: "insurance",
    title: "Insurance",
    copy: "Homeowner, landlord, and flood coverage quoted ahead of closing.",
    to: "/homes/insurance",
    action: "Browse insurance",
    icon: ShieldCheck,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(94,234,212,0.16), transparent 62%), linear-gradient(135deg, #142033 0%, #0C1220 100%)",
  },
  {
    key: "title",
    title: "Title & closing support",
    copy: "Title search, examination, and closing coordination where applicable.",
    to: "/closing-team",
    action: "How closing works",
    icon: FileSignature,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(201,164,73,0.18), transparent 62%), linear-gradient(135deg, #231F16 0%, #0C1220 100%)",
  },
  {
    key: "survey_appraisal",
    title: "Survey & appraisal",
    copy: "Included only where the property type and transaction actually require it.",
    to: "/closing-team",
    action: "When it applies",
    icon: Ruler,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(148,163,184,0.16), transparent 62%), linear-gradient(135deg, #171E2C 0%, #0C1220 100%)",
  },
  {
    key: "property_management",
    title: "Property management",
    copy: "Leasing, maintenance, and day-to-day operation after you own the property.",
    to: "/homes/property-management",
    action: "Browse property managers",
    icon: KeyRound,
    art: "radial-gradient(120% 140% at 8% 0%, rgba(13,110,102,0.26), transparent 62%), linear-gradient(135deg, #10222B 0%, #0C1220 100%)",
  },
];

const MIN_NAMED_PROVIDERS = 3;
const MIN_DISTINCT_ROLES = 3;

const ClosingTeamChapter = () => {
  const { members, loading } = useClosingTeam();

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
        className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-20 md:py-28"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
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
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
                  <div className="relative flex items-start gap-5 p-7 md:p-9">
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-white/12 bg-white/[0.06]"
                      aria-hidden
                    >
                      <Icon className="w-5 h-5 text-[#5eead4]" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                        {r.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] md:text-[15px] text-white/65 font-light leading-relaxed">
                        {r.copy}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                        {r.action}
                        <ArrowRight className="w-4 h-4" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
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

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
