/**
 * PREVIEW ONLY — Ask Nest concierge intake.
 *
 * This is deliberately NOT a chatbot and NOT an auto-answering assistant.
 * It is a structured request form with a stated human turnaround. It never
 * claims a guaranteed answer, never invents a fact, and never implies the
 * business has replied.
 *
 * Privacy: the message and contact details go to a private request table via
 * the `submit-ask-nest` function. Only non-PII metadata reaches analytics.
 */
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { logEngagement } from "@/lib/engagement";
import { getVisitSessionId } from "@/lib/visitSession";
import { Loader2, X, CheckCircle2 } from "lucide-react";


export const ASK_NEST_REQUEST_TYPES = [
  { key: "verify_operating", label: "Check whether this business is still operating" },
  { key: "current_contact", label: "Get current contact details" },
  { key: "ask_about_service", label: "Ask whether they do a specific job" },
  { key: "find_similar", label: "Find a similar business nearby" },
  { key: "report_incorrect", label: "Report something that looks wrong" },
  { key: "real_estate_town", label: "Ask about this town for buying or renting" },
  { key: "other_local_help", label: "Something else local" },
] as const;

const DISCOVERY_OPTIONS = [
  { key: "google", label: "Google" },
  { key: "chatgpt", label: "ChatGPT" },
  { key: "other_ai_assistant", label: "Another AI assistant" },
  { key: "social_media", label: "Social media" },
  { key: "another_website", label: "Another website" },
  { key: "person_referral", label: "Someone told me" },
  { key: "already_knew", label: "I already knew the site" },
  { key: "other", label: "Something else" },
] as const;

export type AskNestContext = {
  business_slug?: string | null;
  business_id?: string | null;
  business_name?: string | null;
  town_slug?: string | null;
  service_intent?: string | null;
};

export default function AskNestDialog({
  open,
  onClose,
  context = {},
  defaultRequestType,
}: {
  open: boolean;
  onClose: () => void;
  context?: AskNestContext;
  defaultRequestType?: string;
}) {
  const [requestType, setRequestType] = useState(defaultRequestType ?? "verify_operating");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [discovery, setDiscovery] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const anonymousAllowed = requestType === "report_incorrect";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (message.trim().length < 2) {
      setError("Tell us what you'd like to know.");
      return;
    }
    if (!anonymousAllowed) {
      if (!name.trim()) {
        setError("Your name is required.");
        return;
      }
      if (!email.trim() && !phone.trim()) {
        setError("Add an email address or a phone number — either one is enough.");
        return;
      }
    }
    setSubmitting(true);
    const { data, error: fnError } = await supabase.functions.invoke("submit-ask-nest", {
      body: {
        request_type: requestType,
        business_slug: context.business_slug ?? null,
        town_slug: context.town_slug ?? null,
        service_intent: context.service_intent ?? null,
        message: message.trim(),
        contact_name: name.trim() || undefined,
        contact_email: email.trim() || undefined,
        contact_phone: phone.trim() || undefined,
        self_reported_discovery: discovery || undefined,
        session_id: getVisitSessionId() ?? undefined,
        company_website: honeypot,
      },
    });
    setSubmitting(false);
    if (fnError || !data?.ok) {
      setError("We could not send that just now. Please try again in a moment.");
      return;
    }
    // Analytics only — no message, no contact details.
    logEngagement(
      "ask_nest_submit",
      { business_slug: context.business_slug ?? null, business_id: context.business_id ?? null },
      { intent_category: requestType, surface: "ask_nest" },
      { town_slug: context.town_slug ?? null },
    );
    setDone(true);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-[#2D3748] bg-[#1E2230] p-6 sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#5eead4]">Ask Capital District Nest</p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {context.business_name ? `About ${context.business_name}` : "Ask about something local"}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1 text-white/50 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="mt-6 rounded-xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-5">
            <CheckCircle2 className="h-6 w-6 text-[#5eead4]" />
            <p className="mt-3 text-sm text-white">Your request is with a person on our team.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              We answer requests within one business day. We will tell you what we can confirm and what we
              cannot — we do not guess, and we do not answer on behalf of the business.
            </p>
            <button onClick={onClose} className="mt-4 text-sm font-medium text-[#5eead4] underline">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-4">
            <p className="rounded-lg border border-white/10 bg-black/20 p-3 text-xs leading-relaxed text-white/60">
              A person reads and answers this. It is not an automated assistant, and it does not contact the
              business on your behalf unless we tell you we have.
            </p>

            <Field label="What do you need?">
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-sm text-white"
              >
                {ASK_NEST_REQUEST_TYPES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Your question">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
                placeholder="Tell us exactly what you're trying to find out."
                className="w-full rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-sm text-white placeholder:text-white/30"
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-sm text-white"
                />
              </Field>
              <Field label="Phone">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  inputMode="tel"
                  className="w-full rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-sm text-white"
                />
              </Field>
            </div>

            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-sm text-white"
              />
            </Field>

            <Field label="How did you find us? (optional)">
              <select
                value={discovery}
                onChange={(e) => setDiscovery(e.target.value)}
                className="w-full rounded-lg border border-[#2D3748] bg-[#0B0F19] px-3 py-2 text-sm text-white"
              >
                <option value="">Prefer not to say</option>
                {DISCOVERY_OPTIONS.map((d) => (
                  <option key={d.key} value={d.key}>
                    {d.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-white/40">
                Stored as what you told us. It is kept separate from how our own measurement classifies the visit.
              </p>
            </Field>

            {error && <p className="text-sm text-red-300">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0d6e66] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Send to a person
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-[0.12em] text-white/45">{label}</span>
      {children}
    </label>
  );
}
