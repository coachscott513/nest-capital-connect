/**
 * PREVIEW ONLY — premium answer page candidate for the 20-page pilot.
 *
 * Fixed order: identity -> answer block -> what we can confirm -> what we
 * cannot -> contact panel -> "what people usually need" -> real-estate context
 * -> owner value preview.
 *
 * Hard rules encoded here:
 *  - No slug, title or canonical is changed by this component. It renders an
 *    existing record only.
 *  - Nothing is generated. Unverified facts stay visibly unverified.
 *  - No claim of guaranteed AI citation, placement or ranking is displayed.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Globe, MapPin, ShieldCheck, HelpCircle, Building2 } from "lucide-react";
import AskNestDialog from "@/components/preview/AskNestDialog";
import { logEngagement } from "@/lib/engagement";
import {
  ELIGIBILITY_LABELS,
  ELIGIBILITY_DESCRIPTIONS,
  RECORD_STATUS_LABELS,
  type EligibilityState,
  type RecordStatus,
} from "@/lib/constants/policy";
import { buildAnswerSentence, isEvidenceBacked, type AnswerProfileInput } from "@/components/preview/AnswerFirstProfile";

export type AnswerPageBusiness = AnswerProfileInput & {
  slug: string;
  readiness_state?: string | null;
};

const READINESS_LABELS: Record<string, string> = {
  identity_only: "Identity only",
  contact_ready: "Contact ready",
  service_ready: "Service ready",
  owner_confirmed: "Owner confirmed",
  editorially_enriched: "Editorially enriched",
  blocked_by_conflict: "Blocked by conflict",
};

export default function BusinessAnswerPage({ business }: { business: AnswerPageBusiness }) {
  const [askOpen, setAskOpen] = useState(false);
  const [askType, setAskType] = useState<string>("verify_operating");

  const eligibility = (business.eligibility_state ?? "registry_only") as EligibilityState;
  const recordStatus = (business.record_status ?? "active") as RecordStatus;
  const backed = isEvidenceBacked(eligibility);
  const blocked = recordStatus !== "active";

  const openAsk = (type: string) => {
    setAskType(type);
    setAskOpen(true);
    logEngagement(
      "ask_nest_open",
      { business_slug: business.slug, business_id: business.id ?? null },
      { intent_category: type, surface: "answer_page" },
      { town_slug: business.town_slug ?? null },
    );
  };

  const confirmed: string[] = [];
  const unconfirmed: string[] = [];
  const push = (label: string, value: unknown) =>
    (backed && value ? confirmed : unconfirmed).push(label);
  push("Business name", business.name);
  push("Municipality", business.town_name);
  push("Street address", business.address);
  push("Phone number", business.phone);
  push("Website", business.website);
  if (backed && business.hours) confirmed.push("Opening hours");
  else unconfirmed.push("Opening hours");
  if (backed && (business.subcategory || business.category)) confirmed.push("Category");
  else unconfirmed.push("Category");

  return (
    <article className="rounded-2xl border border-[#2D3748] bg-[#1E2230] p-6 md:p-8">
      {/* A. Identity ------------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#5eead4]/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#5eead4]">
          {ELIGIBILITY_LABELS[eligibility]}
        </span>
        {blocked && (
          <span className="rounded-full border border-amber-400/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-amber-300">
            {RECORD_STATUS_LABELS[recordStatus]}
          </span>
        )}
        {business.readiness_state && (
          <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/55">
            {READINESS_LABELS[business.readiness_state] ?? business.readiness_state}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">{business.name}</h1>
      <p className="mt-2 flex items-center gap-2 text-sm text-white/55">
        <MapPin className="h-4 w-4" />
        {[business.town_name, business.county ? `${business.county} County` : null, business.state]
          .filter(Boolean)
          .join(" · ") || "Municipality not confirmed"}
      </p>

      {/* B. Answer block --------------------------------------------------- */}
      <p className="mt-5 text-lg leading-relaxed text-white/85">{buildAnswerSentence(business)}</p>
      {blocked && (
        <p className="mt-3 rounded-lg border border-amber-400/25 bg-amber-400/5 p-3 text-sm leading-relaxed text-amber-200/85">
          There is an unresolved conflict on this record, so we are not presenting its details as current.
          We will say what we know and what we do not, rather than fill the gap.
        </p>
      )}

      {/* C/D. What we can and cannot confirm -------------------------------- */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[#5eead4]/20 bg-[#5eead4]/[0.04] p-4">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#5eead4]">
            <ShieldCheck className="h-3.5 w-3.5" /> What we can confirm
          </p>
          {confirmed.length ? (
            <ul className="mt-3 space-y-1.5 text-sm text-white/80">
              {confirmed.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm italic text-white/45">
              Nothing on this record has been independently checked yet.
            </p>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">What we cannot confirm yet</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/55">
            {unconfirmed.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-white/40">{ELIGIBILITY_DESCRIPTIONS[eligibility]}</p>
        </div>
      </div>

      {/* E. Contact panel — honest about staleness -------------------------- */}
      <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">Contact</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ContactRow
            icon={Phone}
            value={business.phone}
            missing="No phone number we are willing to publish"
            note={backed ? "Checked against a documented source." : "Imported from a public directory. Not verified."}
          />
          <ContactRow
            icon={Globe}
            value={business.website}
            missing="No website on file"
            note={backed ? "Checked against a documented source." : "Imported from a public directory. Not verified."}
          />
        </div>
        {!blocked && (
          <button
            onClick={() => openAsk("current_contact")}
            className="mt-4 text-sm font-medium text-[#5eead4] underline"
          >
            Ask us to confirm these details
          </button>
        )}
      </div>

      {/* F. What people usually need here ----------------------------------- */}
      <div className="mt-6">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">
          <HelpCircle className="mr-1 inline h-3.5 w-3.5" /> What people usually need here
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { key: "verify_operating", label: "Is this still open?" },
            { key: "ask_about_service", label: "Do they do this specific job?" },
            { key: "find_similar", label: "Find someone similar nearby" },
            { key: "report_incorrect", label: "Something here looks wrong" },
          ].map((a) => (
            <button
              key={a.key}
              onClick={() => openAsk(a.key)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-[#5eead4]/50 hover:text-white"
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* G. Real-estate context — relevant, never forced -------------------- */}
      {business.town_slug && (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/45">
            <Building2 className="h-3.5 w-3.5" /> Town context
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/65">
            Looking at {business.town_name ?? "this town"} because you are moving, buying or renting? That is a
            separate question from this business, and we keep it that way.
          </p>
          <Link
            to={`/living-in/${business.town_slug}`}
            onClick={() =>
              logEngagement(
                "town_context_click",
                { business_slug: business.slug },
                { surface: "answer_page" },
                { town_slug: business.town_slug ?? null },
              )
            }
            className="mt-3 inline-block text-sm font-medium text-[#5eead4] underline"
          >
            Read about living in {business.town_name ?? "this town"}
          </Link>
        </div>
      )}

      {/* H. Owner value preview — no ranking or citation promises ----------- */}
      <div className="mt-6 rounded-xl border border-[#c9a449]/25 bg-[#c9a449]/[0.05] p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[#c9a449]">Own this business?</p>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          Claiming this listing lets you confirm your hours, services and contact details, and replaces the
          hedged language above with facts you have stated yourself.
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-white/45">
          We cannot promise placement, citation or ranking in Google, ChatGPT or any AI assistant, and we do
          not sell it. Accurate, confirmed information is simply easier for people and assistants to use.
        </p>
        <Link
          to={`/claim-business?business=${encodeURIComponent(business.slug)}`}
          onClick={() =>
            logEngagement(
              "owner_value_preview_view",
              { business_slug: business.slug },
              { surface: "answer_page" },
            )
          }
          className="mt-3 inline-block rounded-full bg-[#0d6e66] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Claim this listing
        </Link>
      </div>

      <AskNestDialog
        open={askOpen}
        onClose={() => setAskOpen(false)}
        defaultRequestType={askType}
        context={{
          business_slug: business.slug,
          business_id: business.id ?? null,
          business_name: business.name,
          town_slug: business.town_slug ?? null,
        }}
      />
    </article>
  );
}

function ContactRow({
  icon: Icon,
  value,
  missing,
  note,
}: {
  icon: typeof Phone;
  value?: string | null;
  missing: string;
  note: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-sm text-white">
        <Icon className="h-4 w-4 text-white/45" />
        {value || <span className="italic text-white/40">{missing}</span>}
      </span>
      {value && <span className="pl-6 text-[11px] text-white/40">{note}</span>}
    </div>
  );
}
