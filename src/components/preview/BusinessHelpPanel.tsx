import { useState } from "react";
import { HelpCircle, Phone, MapPin, Globe, AlertTriangle, Check, BadgeCheck, Sparkles } from "lucide-react";
import { logEngagement } from "@/lib/engagement";
import {
  ELIGIBILITY_LABELS,
  RECORD_STATUS_LABELS,
  type EligibilityState,
  type RecordStatus,
} from "@/lib/constants/policy";

/**
 * PREVIEW ONLY — contextual business-help UX staged for founder approval.
 *
 * Trust rules enforced here:
 *  - never implies Capital District Nest represents or speaks for the business;
 *  - always shows registry/verification state and source freshness;
 *  - never labels imported contact data "verified";
 *  - actions are tracked with the real business_id only (no synthetic ids).
 */

export interface BusinessHelpInput {
  id?: string | null;
  slug?: string | null;
  name: string;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  town_name?: string | null;
  hours?: unknown;
  eligibility_state?: string | null;
  record_status?: string | null;
  last_verified_at?: string | null;
}

const EVIDENCE_BACKED = new Set(["verified_basic", "claimed_enriched", "editorial_featured"]);

type Intent = "ask" | "website" | "call" | "directions" | "correction" | "claim";

export default function BusinessHelpPanel({ business }: { business: BusinessHelpInput }) {
  const [active, setActive] = useState<Intent | null>(null);
  const [sent, setSent] = useState(false);

  // Real business_id only. Without one we still render, but we do not log.
  const hasIdentity = !!business.id;
  const subject = { business_id: business.id ?? null, business_slug: business.slug ?? null };

  const eligibility = (business.eligibility_state ?? "registry_only") as EligibilityState;
  const recordStatus = (business.record_status ?? "active") as RecordStatus;
  const verified = EVIDENCE_BACKED.has(eligibility);

  const track = (event: string, intent: Intent) => {
    if (!hasIdentity) return;
    logEngagement(event, subject, { intent_type: intent });
  };

  const open = (intent: Intent) => {
    setActive(intent);
    setSent(false);
    track("business_help_open", intent);
  };

  const contactNote = verified
    ? "Checked against a documented source."
    : "Imported from a public directory. We have not verified it.";

  const actions: { key: Intent; label: string; icon: typeof Phone; show: boolean; href?: string }[] = [
    { key: "ask", label: "Ask Capital District Nest", icon: HelpCircle, show: true },
    { key: "website", label: "Visit website", icon: Globe, show: !!business.website, href: business.website ?? undefined },
    { key: "call", label: "Call", icon: Phone, show: !!business.phone, href: business.phone ? `tel:${business.phone}` : undefined },
    {
      key: "directions",
      label: "Directions",
      icon: MapPin,
      show: !!business.address,
      href: business.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${business.name} ${business.address}`,
          )}`
        : undefined,
    },
    { key: "correction", label: "Suggest a correction", icon: AlertTriangle, show: true },
    { key: "claim", label: "Own this business? Claim or update this profile", icon: BadgeCheck, show: true },
  ];

  const panelCopy = (intent: Intent) => {
    switch (intent) {
      case "ask":
        return `Tell us what you need to know about ${business.name} and we will ask them directly. We are an independent local index — we do not answer on their behalf.`;
      case "website":
        return `The website on file is ${business.website}. ${contactNote}`;
      case "call":
        return `The number on file is ${business.phone}. ${contactNote}`;
      case "directions":
        return `${business.address}${business.town_name ? `, ${business.town_name}, NY` : ""}. ${contactNote}`;
      case "correction":
        return "Tell us what is wrong. Owner-supplied operational facts carry the strongest weight; legal identity, licensing, public records and closures go through evidence review.";
      case "claim":
        return `Claiming ${business.name} lets the owner confirm hours, services, contact details and media. It never changes where the business ranks.`;
    }
  };

  const submit = (intent: Intent) => {
    const event =
      intent === "correction"
        ? "correction_started"
        : intent === "claim"
          ? "claim_started"
          : "business_information_request";
    track(event, intent);
    setSent(true);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Sparkles className="h-4 w-4 text-teal-300" />
        <h3 className="text-sm font-semibold tracking-tight text-white/90">
          Need more information about this business?
        </h3>
      </div>

      {/* Registry / verification + freshness state, always visible. */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${
            verified ? "border-teal-300/40 text-teal-300" : "border-amber-400/40 text-amber-300"
          }`}
        >
          {ELIGIBILITY_LABELS[eligibility]}
        </span>
        {recordStatus !== "active" && (
          <span className="rounded-full border border-amber-400/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-amber-300">
            {RECORD_STATUS_LABELS[recordStatus]}
          </span>
        )}
        <span className="text-[11px] text-white/40">
          {business.last_verified_at
            ? `Last checked ${new Date(business.last_verified_at).toLocaleDateString()}`
            : "Never independently checked"}
        </span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions
          .filter((a) => a.show)
          .map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => open(key)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition ${
                active === key
                  ? "border-teal-300/40 bg-teal-300/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-70" />
              {label}
            </button>
          ))}
      </div>

      {active && (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm leading-relaxed text-white/75">{panelCopy(active)}</p>

          {sent ? (
            <p className="mt-3 flex items-center gap-2 text-xs font-medium text-teal-300">
              <Check className="h-3.5 w-3.5" /> Logged. We follow up with the business, not with you.
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions.find((a) => a.key === active)?.href && (
                <a
                  href={actions.find((a) => a.key === active)!.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  onClick={() => track("business_information_request", active)}
                  className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
                >
                  {active === "call" ? "Call now" : active === "website" ? "Open website" : "Open in Maps"}
                </a>
              )}
              <button
                type="button"
                onClick={() => submit(active)}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/85 transition hover:border-white/40"
              >
                {active === "correction"
                  ? "Start a correction"
                  : active === "claim"
                    ? "Start a claim"
                    : "Ask us to confirm this"}
              </button>
            </div>
          )}
        </div>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-white/40">
        Capital District Nest is an independent local index. We do not represent this business, and we
        never invent details — anything unverified stays labelled as such until the owner or a primary
        source confirms it.
      </p>
    </div>
  );
}
