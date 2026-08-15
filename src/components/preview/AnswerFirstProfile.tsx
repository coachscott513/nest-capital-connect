/**
 * PREVIEW ONLY — not mounted on any public route.
 * Search/AI answer template for a business profile: an answerable summary,
 * explicit provenance, and honest gaps instead of invented content.
 */
import { ELIGIBILITY_LABELS, ELIGIBILITY_DESCRIPTIONS, SOURCE_TYPE_LABELS, type EligibilityState } from "@/lib/constants/policy";

export type AnswerProfileInput = {
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
  source_types?: string[];
  last_verified_at?: string | null;
};

/** Deterministic one-sentence answer built only from stored facts. */
export function buildAnswerSentence(b: AnswerProfileInput): string {
  const what = (b.subcategory || b.category || "local business").toLowerCase();
  const where = [b.town_name, b.county ? `${b.county} County` : null, b.state]
    .filter(Boolean)
    .join(", ");
  return where
    ? `${b.name} is a ${what} in ${where}.`
    : `${b.name} is a ${what} in the Capital District.`;
}

function Fact({ label, value, missing }: { label: string; value?: string | null; missing: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-3">
      <span className="text-[11px] uppercase tracking-[0.12em] text-white/45">{label}</span>
      {value ? (
        <span className="text-sm text-white">{value}</span>
      ) : (
        <span className="text-sm text-white/40 italic">{missing}</span>
      )}
    </div>
  );
}

export default function AnswerFirstProfile({ business }: { business: AnswerProfileInput }) {
  const state = (business.eligibility_state ?? "registry_only") as EligibilityState;
  const label = ELIGIBILITY_LABELS[state] ?? "Registry listing";
  const summary = business.long_description || business.description || null;
  const hours = business.hours && typeof business.hours === "object" ? business.hours : null;

  return (
    <article className="rounded-2xl border border-[#2D3748] bg-[#1E2230] p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#5eead4]/40 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#5eead4]">
          {label}
        </span>
        {business.last_verified_at && (
          <span className="text-[11px] text-white/45">
            Checked {new Date(business.last_verified_at).toLocaleDateString()}
          </span>
        )}
      </div>

      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white">{business.name}</h2>

      {/* Answer block — the sentence a search engine or assistant can lift verbatim. */}
      <p className="mt-3 text-lg leading-relaxed text-white/85">{buildAnswerSentence(business)}</p>
      {summary ? (
        <p className="mt-3 text-sm leading-relaxed text-white/65">{summary}</p>
      ) : (
        <p className="mt-3 text-sm leading-relaxed text-white/40 italic">
          We have not published a description for this business yet. Nothing here is generated.
        </p>
      )}

      <div className="mt-6 grid gap-x-8 md:grid-cols-2">
        <Fact label="Address" value={business.address} missing="Address not confirmed" />
        <Fact label="Phone" value={business.phone} missing="Phone not confirmed" />
        <Fact label="Website" value={business.website} missing="No website on file" />
        <Fact
          label="Hours"
          value={hours ? "Published by the owner" : null}
          missing="Hours not published — we don't guess them"
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
