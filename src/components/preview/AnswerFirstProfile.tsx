/**
 * PREVIEW ONLY — not mounted on any public route.
 *
 * Fail-closed answer template. A registry_only record NEVER gets a definitive
 * sentence: we do not assert its category, service, town, hours or affiliation
 * as fact. Every displayed fact exposes its own state so the page cannot become
 * attractive to AI citation by sounding more certain than the evidence allows.
 */
import {
  ELIGIBILITY_LABELS,
  ELIGIBILITY_DESCRIPTIONS,
  SOURCE_TYPE_LABELS,
  FIELD_STATE_LABELS,
  RECORD_STATUS_LABELS,
  type EligibilityState,
  type FieldState,
  type RecordStatus,
} from "@/lib/constants/policy";

export type AnswerProfileInput = {
  id?: string | null;
  name: string;
  category?: string | null;
  subcategory?: string | null;
  town_name?: string | null;
  town_slug?: string | null;
  county?: string | null;
  state?: string | null;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  hours?: unknown;
  description?: string | null;
  long_description?: string | null;
  eligibility_state?: string | null;
  record_status?: string | null;
  source_types?: string[];
  last_verified_at?: string | null;
};

const EVIDENCE_BACKED: EligibilityState[] = [
  "verified_basic",
  "claimed_enriched",
  "editorial_featured",
];

export function isEvidenceBacked(state?: string | null): boolean {
  return EVIDENCE_BACKED.includes((state ?? "registry_only") as EligibilityState);
}

/**
 * Deterministic answer sentence.
 *
 * registry_only  -> hedged registry statement, no category / no service claim.
 * verified_basic+ -> direct sentence, built only from evidence-approved fields.
 */
export function buildAnswerSentence(b: AnswerProfileInput): string {
  const state = (b.eligibility_state ?? "registry_only") as EligibilityState;

  if (!isEvidenceBacked(state)) {
    const where = b.town_name ? ` associated with ${b.town_name}` : "";
    return `Capital District Nest has a registry entry for ${b.name}${where}. These details have not yet been independently verified.`;
  }

  const what = (b.subcategory || b.category || "").toLowerCase();
  const where = [b.town_name, b.county ? `${b.county} County` : null, b.state]
    .filter(Boolean)
    .join(", ");

  if (what && where) return `${b.name} is a ${what} in ${where}.`;
  if (what) return `${b.name} is a ${what} in the Capital District.`;
  if (where) return `${b.name} is a verified business listing in ${where}.`;
  return `${b.name} is a verified business listing on Capital District Nest.`;
}

/** State of an individual fact, derived from eligibility — never assumed. */
function fieldStateFor(value: unknown, eligibility: string | null | undefined): FieldState {
  if (value === null || value === undefined || value === "") return "unavailable";
  const state = (eligibility ?? "registry_only") as EligibilityState;
  if (state === "claimed_enriched") return "owner_confirmed";
  if (state === "verified_basic" || state === "editorial_featured") return "verified";
  return "imported_unverified";
}

const STATE_STYLES: Record<FieldState, string> = {
  verified: "border-[#5eead4]/40 text-[#5eead4]",
  owner_confirmed: "border-[#5eead4]/40 text-[#5eead4]",
  imported_unverified: "border-amber-400/40 text-amber-300",
  unavailable: "border-white/15 text-white/40",
};

function Fact({
  label,
  value,
  missing,
  state,
}: {
  label: string;
  value?: string | null;
  missing: string;
  state: FieldState;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">{label}</span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] ${STATE_STYLES[state]}`}>
          {FIELD_STATE_LABELS[state]}
        </span>
      </div>
      {value ? (
        <span className="text-sm text-white">{value}</span>
      ) : (
        <span className="text-sm italic text-white/40">{missing}</span>
      )}
    </div>
  );
}

export default function AnswerFirstProfile({ business }: { business: AnswerProfileInput }) {
  const state = (business.eligibility_state ?? "registry_only") as EligibilityState;
  const label = ELIGIBILITY_LABELS[state] ?? "Registry listing";
  const recordStatus = (business.record_status ?? "active") as RecordStatus;
  const evidenceBacked = isEvidenceBacked(state);

  // A description is only shown when the record is evidence-backed. An imported
  // blurb on a registry record is not a fact we are willing to publish.
  const summary = evidenceBacked
    ? business.long_description || business.description || null
    : null;

  const hours = business.hours && typeof business.hours === "object" ? business.hours : null;

  return (
    <article className="rounded-2xl border border-[#2D3748] bg-[#1E2230] p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#5eead4]/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#5eead4]">
          {label}
        </span>
        {recordStatus !== "active" && (
          <span className="rounded-full border border-amber-400/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-amber-300">
            {RECORD_STATUS_LABELS[recordStatus]}
          </span>
        )}
        {business.last_verified_at ? (
          <span className="text-[11px] text-white/45">
            Checked {new Date(business.last_verified_at).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-[11px] text-white/45">Never independently checked</span>
        )}
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{business.name}</h2>

      {/* Answer block — hedged for registry records, direct only when evidence supports it. */}
      <p className="mt-3 text-lg leading-relaxed text-white/85">{buildAnswerSentence(business)}</p>

      {summary ? (
        <p className="mt-3 text-sm leading-relaxed text-white/65">{summary}</p>
      ) : (
        <p className="mt-3 text-sm italic leading-relaxed text-white/40">
          {evidenceBacked
            ? "We have not published a description for this business yet. Nothing here is generated."
            : "We do not describe what this business does, because no source has confirmed it. Nothing here is generated."}
        </p>
      )}

      {!evidenceBacked && (
        <p className="mt-4 rounded-lg border border-amber-400/25 bg-amber-400/5 p-3 text-xs leading-relaxed text-amber-200/80">
          Registry entry. Category, services, hours and affiliation are deliberately not stated as
          fact on this page. The business can claim this listing to correct and confirm it.
        </p>
      )}

      <div className="mt-6 grid gap-x-8 md:grid-cols-2">
        <Fact
          label="Address"
          value={business.address}
          missing="Address not confirmed"
          state={fieldStateFor(business.address, business.eligibility_state)}
        />
        <Fact
          label="Phone"
          value={business.phone}
          missing="Phone not confirmed"
          state={fieldStateFor(business.phone, business.eligibility_state)}
        />
        <Fact
          label="Website"
          value={business.website}
          missing="No website on file"
          state={fieldStateFor(business.website, business.eligibility_state)}
        />
        <Fact
          label="Hours"
          value={hours && evidenceBacked ? "Published by the owner" : null}
          missing={hours ? "Hours on file are unverified — not published" : "Hours not published — we don't guess them"}
          state={hours && evidenceBacked ? "owner_confirmed" : "unavailable"}
        />
        <Fact
          label="Category"
          value={evidenceBacked ? business.subcategory || business.category : null}
          missing={
            business.category
              ? "Imported category held back until it is checked"
              : "No confirmed category"
          }
          state={evidenceBacked ? fieldStateFor(business.category, business.eligibility_state) : "unavailable"}
        />
        <Fact
          label="Municipality"
          value={business.town_name}
          missing="Municipality not confirmed"
          state={fieldStateFor(business.town_name, business.eligibility_state)}
        />
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">Where this came from</p>
        <p className="mt-2 text-sm text-white/70">{ELIGIBILITY_DESCRIPTIONS[state]}</p>
        {business.source_types && business.source_types.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {business.source_types.map((s) => (
              <li key={s} className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/60">
                {SOURCE_TYPE_LABELS[s] ?? s}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[12px] text-white/45">
          Own this business? Claiming it lets you replace anything above with your own details.
        </p>
      </div>
    </article>
  );
}
