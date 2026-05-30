import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Concert / Live Music",
  "Restaurant / Food",
  "Market / Pop-up",
  "Opening / Grand Opening",
  "Family / Kids",
  "Networking",
  "Fundraiser / Nonprofit",
  "Sports / Outdoors",
  "Arts / Culture",
  "Other",
];

const SubmitEvent = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const onFirstInteract = () => {
    if (started) return;
    setStarted(true);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "form_start", {
        event_category: "Lead Generation",
        form_name: "submit_event",
        source_location: "submit_event_page",
        page_path: window.location.pathname,
      });
    }
  };
  const [form, setForm] = useState({
    eventName: "",
    organization: "",
    category: CATEGORIES[0],
    town: "",
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    link: "",
    reservationLink: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    featured: false,
  });

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.eventName || !form.contactName || !form.contactEmail || !form.contactPhone) {
      toast({ title: "Missing info", description: "Name, email, and phone are required.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const message = [
      `EVENT SUBMISSION (pending review)`,
      `Event: ${form.eventName}`,
      `Org: ${form.organization}`,
      `Category: ${form.category}`,
      `Town: ${form.town}`,
      `Venue: ${form.venue}`,
      `Date: ${form.date} ${form.startTime}–${form.endTime}`,
      `Description: ${form.description}`,
      `Link: ${form.link}`,
      `Reservation: ${form.reservationLink}`,
      `Featured requested: ${form.featured ? "yes" : "no"}`,
    ].join("\n");

    const { error } = await supabase.from("leads").insert({
      full_name: form.contactName,
      email: form.contactEmail,
      phone: form.contactPhone,
      type: "event_submission",
      message,
      location: form.town,
      origin_town: form.town,
      lead_type: "event",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEOHead
        title="Submit a Local Event | Capital District Nest"
        description="Submit concerts, restaurant nights, markets, openings, fundraisers, and networking events to the Capital District Nest weekly feed."
      />
      <CleanHeader />

      <section className="relative w-full overflow-hidden border-t border-white/[0.06]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 25%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 80% 80%, rgba(13,110,102,0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 md:px-10 pt-28 pb-12 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">For Organizers</p>
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.05]">
            Put your event in front of <span className="text-[#5eead4]">the Capital District.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/70 font-light max-w-xl mx-auto">
            Submit concerts, restaurant nights, markets, openings, fundraisers, networking events, community events, and local specials.
          </p>
        </div>
      </section>

      <section className="relative max-w-3xl mx-auto px-5 sm:px-6 md:px-10 pb-32">
        {done ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#5eead4] mx-auto" />
            <h2 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">Your event has been submitted.</h2>
            <p className="mt-3 text-white/70">
              Want more visibility? Featured placements appear across the Capital District Nest weekly feed, town pages,
              and local discovery sections.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setDone(false);
                  setForm({ ...form, eventName: "", description: "", date: "", startTime: "", endTime: "" });
                }}
                className="px-6 py-3 rounded-full bg-white/[0.08] border border-white/20 text-sm font-semibold hover:bg-white/[0.16] transition"
              >
                Submit Another Event
              </button>
              <Link
                to="/contact?intent=featured-event"
                className="px-6 py-3 rounded-full bg-[#0d6e66] text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
              >
                Ask About Featured Placement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10 space-y-5"
          >
            <Field label="Event name *" value={form.eventName} onChange={(v) => update("eventName", v)} />
            <Field label="Business / organization" value={form.organization} onChange={(v) => update("organization", v)} />
            <div className="grid md:grid-cols-2 gap-5">
              <Select label="Category" value={form.category} options={CATEGORIES} onChange={(v) => update("category", v)} />
              <Field label="Town" value={form.town} onChange={(v) => update("town", v)} placeholder="Albany, Troy, Saratoga…" />
            </div>
            <Field label="Venue / address" value={form.venue} onChange={(v) => update("venue", v)} />
            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Date" type="date" value={form.date} onChange={(v) => update("date", v)} />
              <Field label="Start time" type="time" value={form.startTime} onChange={(v) => update("startTime", v)} />
              <Field label="End time" type="time" value={form.endTime} onChange={(v) => update("endTime", v)} />
            </div>
            <TextArea label="Description" value={form.description} onChange={(v) => update("description", v)} />
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Website / ticket link" value={form.link} onChange={(v) => update("link", v)} />
              <Field label="Reservation link" value={form.reservationLink} onChange={(v) => update("reservationLink", v)} />
            </div>
            <div className="border-t border-white/10 pt-5 grid md:grid-cols-3 gap-5">
              <Field label="Contact name *" value={form.contactName} onChange={(v) => update("contactName", v)} />
              <Field label="Contact email *" type="email" value={form.contactEmail} onChange={(v) => update("contactEmail", v)} />
              <Field label="Contact phone *" value={form.contactPhone} onChange={(v) => update("contactPhone", v)} />
            </div>
            <label className="flex items-start gap-3 text-sm text-white/75 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="mt-1 accent-[#5eead4]"
              />
              I would like this event considered for featured placement.
            </label>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-7 py-3.5 rounded-full bg-[#0d6e66] text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit Event"} <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/contact?intent=featured-event"
                className="px-6 py-3.5 rounded-full bg-white/[0.08] border border-white/20 text-sm font-semibold hover:bg-white/[0.16] transition"
              >
                Ask About Featured Placement
              </Link>
            </div>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
};

function Field({
  label, value, onChange, type = "text", placeholder,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wider uppercase text-white/60">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#5eead4] transition"
      />
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wider uppercase text-white/60">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#5eead4] transition"
      />
    </label>
  );
}

function Select({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold tracking-wider uppercase text-white/60">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#5eead4] transition"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0B0F19]">{o}</option>
        ))}
      </select>
    </label>
  );
}

export default SubmitEvent;
