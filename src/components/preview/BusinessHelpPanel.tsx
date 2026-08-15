import { useState } from "react";
import { HelpCircle, Phone, MapPin, Clock, AlertTriangle, Check } from "lucide-react";
import { logEngagement } from "@/lib/engagement";

/**
 * PREVIEW ONLY — contextual business-help UX staged for founder approval.
 * Answers the three questions consumers actually ask on a profile, without
 * a generalized AI chatbot and without inventing facts we do not hold.
 */

export interface BusinessHelpInput {
  id?: string | null;
  slug?: string | null;
  name: string;
  phone?: string | null;
  address?: string | null;
  town_name?: string | null;
  hours?: unknown;
  eligibility_state?: string | null;
}

type Intent = "reach" | "location" | "hours" | "correction";

const INTENTS: { key: Intent; label: string; icon: typeof Phone }[] = [
  { key: "reach", label: "How do I reach them?", icon: Phone },
  { key: "location", label: "Where exactly are they?", icon: MapPin },
  { key: "hours", label: "When are they open?", icon: Clock },
  { key: "correction", label: "Something here is wrong", icon: AlertTriangle },
];

export default function BusinessHelpPanel({ business }: { business: BusinessHelpInput }) {
  const [active, setActive] = useState<Intent | null>(null);
  const [sent, setSent] = useState(false);

  const subject = { business_id: business.id ?? null, business_slug: business.slug ?? null };

  const open = (intent: Intent) => {
    setActive(intent);
    setSent(false);
    logEngagement("business_help_open", subject, { help_intent: intent });
  };

  const answer = (intent: Intent) => {
    switch (intent) {
      case "reach":
        return business.phone
          ? `Call ${business.phone}. We list only the number on record for ${business.name}.`
          : `We do not hold a verified phone number for ${business.name} yet. Request it below and we will ask the owner directly.`;
      case "location":
        return business.address
          ? `${business.address}${business.town_name ? `, ${business.town_name}, NY` : ""}.`
          : `We hold ${business.town_name ? `${business.town_name}, NY` : "the municipality"} but not a verified street address yet.`;
      case "hours":
        return business.hours
          ? "Hours on record are shown on this page. If they look stale, tell us and we will confirm with the owner."
          : `We do not publish hours for ${business.name} because we have not verified them.`;
      case "correction":
        return "Tell us what is wrong. Owner-supplied truth always overrides our records.";
    }
  };

  const submit = (intent: Intent) => {
    logEngagement(
      intent === "correction" ? "suggest_correction" : "business_information_request",
      subject,
      { help_intent: intent },
    );
    setSent(true);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="flex items-center gap-2 text-white/80">
        <HelpCircle className="h-4 w-4 text-teal-300" />
        <h3 className="text-sm font-semibold tracking-tight">Need something specific?</h3>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {INTENTS.map(({ key, label, icon: Icon }) => (
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
          <p className="text-sm leading-relaxed text-white/75">{answer(active)}</p>
          {sent ? (
            <p className="mt-3 flex items-center gap-2 text-xs font-medium text-teal-300">
              <Check className="h-3.5 w-3.5" /> Logged. We follow up with the owner, not with you.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => submit(active)}
              className="mt-3 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
            >
              {active === "correction" ? "Suggest a correction" : "Ask us to confirm this"}
            </button>
          )}
        </div>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-white/40">
        We never invent details. Anything unverified stays off the page until the owner or a primary source confirms it.
      </p>
    </div>
  );
}
