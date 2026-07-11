import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { OFFICIAL_CATEGORIES } from "@/data/officialCategories";

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  category: string;
  town: string;
  website: string;
  instagram: string;
  facebook: string;
  reservationUrl: string;
  hours: string;
  story: string;
  knownFor: string;
  firstTimer: string;
  seasonal: string;
  team: string;
  mediaUrl: string;
  approved: boolean;
}

const empty: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  category: "",
  town: "",
  website: "",
  instagram: "",
  facebook: "",
  reservationUrl: "",
  hours: "",
  story: "",
  knownFor: "",
  firstTimer: "",
  seasonal: "",
  team: "",
  mediaUrl: "",
  approved: false,
};

const SpotlightIntake = () => {
  const [form, setForm] = useState<FormState>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.approved) {
      toast({
        title: "Approval required",
        description: "Please confirm ownership of the submitted media.",
        variant: "destructive",
      });
      return;
    }
    if (!form.businessName || !form.contactName || !form.email || !form.phone) {
      toast({
        title: "Missing fields",
        description: "Business name, contact, email, and phone are required.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("partner_inquiries").insert({
      name: form.contactName,
      company: form.businessName,
      email: form.email,
      phone: form.phone,
      profession_category: form.category || null,
      towns_of_interest: form.town ? [form.town] : null,
      interested_package: "spotlight_intake",
      website: form.website || null,
      social_links: {
        instagram: form.instagram || null,
        facebook: form.facebook || null,
        reservation_url: form.reservationUrl || null,
        media_url: form.mediaUrl || null,
      },
      notes: [
        form.story && `STORY: ${form.story}`,
        form.knownFor && `KNOWN FOR: ${form.knownFor}`,
        form.firstTimer && `FIRST-TIMER: ${form.firstTimer}`,
        form.seasonal && `SEASONAL: ${form.seasonal}`,
        form.team && `TEAM: ${form.team}`,
        form.hours && `HOURS: ${form.hours}`,
        `APPROVAL: user confirmed ownership of media on ${new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
      source_page: "/business-spotlight-intake",
      status: "new",
    });
    setSubmitting(false);
    if (error) {
      toast({
        title: "Submission failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
  };

  const title = "Nominate a Business Spotlight | Capital District Nest";
  const description =
    "Submit your business for a Capital District Nest Spotlight — a premium editorial profile built from your story, media, and community.";

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white">
        <Helmet>
          <title>{title}</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <CleanHeader />
        <section className="px-6 md:px-10 pt-32 pb-32">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-12 h-12 text-[#5eead4] mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Thank you.
            </h1>
            <p className="text-white/70 mt-4 leading-relaxed">
              Capital District Nest will create an original draft Spotlight
              using the information and media provided. The business will have
              an opportunity to review core factual information before
              publication.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                to="/businesses"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-sm font-semibold"
              >
                Browse businesses
              </Link>
              <Link
                to="/business/the-roosevelt-room"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold"
              >
                See a sample Spotlight <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <CleanHeader />

      <section className="px-6 md:px-10 pt-24 pb-16 md:pt-32">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d6e66]/15 border border-[#0d6e66]/30 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#5eead4]" />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
              Spotlight Intake
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
            Nominate a business for a Capital District Nest Spotlight.
          </h1>
          <p className="mt-5 text-lg text-white/70 font-light">
            Share the story, the details, and your approved media. We'll do the
            editorial, design, and publishing. First reviews happen with the
            business before anything goes live.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24">
        <form
          onSubmit={onSubmit}
          className="max-w-3xl mx-auto space-y-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-10"
        >
          <Fieldset title="Business & contact">
            <Grid>
              <Field label="Business name *">
                <input
                  required
                  value={form.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Contact person *">
                <input
                  required
                  value={form.contactName}
                  onChange={(e) => set("contactName", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Email *">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Phone *">
                <input
                  required
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select…</option>
                  {OFFICIAL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Town">
                <input
                  value={form.town}
                  onChange={(e) => set("town", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Troy"
                />
              </Field>
            </Grid>
          </Fieldset>

          <Fieldset title="Your story">
            <Field label="Business story">
              <textarea
                rows={4}
                value={form.story}
                onChange={(e) => set("story", e.target.value)}
                className={inputCls}
                placeholder="How the business started, what it stands for, who it's for."
              />
            </Field>
            <Field label="What are you known for?">
              <textarea
                rows={3}
                value={form.knownFor}
                onChange={(e) => set("knownFor", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="What should a first-time visitor order, try, or expect?">
              <textarea
                rows={3}
                value={form.firstTimer}
                onChange={(e) => set("firstTimer", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Seasonal events, specials, or updates">
              <textarea
                rows={2}
                value={form.seasonal}
                onChange={(e) => set("seasonal", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Team members to feature">
              <textarea
                rows={2}
                value={form.team}
                onChange={(e) => set("team", e.target.value)}
                className={inputCls}
                placeholder="Names, titles, short bios."
              />
            </Field>
          </Fieldset>

          <Fieldset title="Links & media">
            <Grid>
              <Field label="Website">
                <input
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Reservation / booking URL">
                <input
                  value={form.reservationUrl}
                  onChange={(e) => set("reservationUrl", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Instagram">
                <input
                  value={form.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Facebook">
                <input
                  value={form.facebook}
                  onChange={(e) => set("facebook", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Hours">
                <input
                  value={form.hours}
                  onChange={(e) => set("hours", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Video / Reel URL">
                <input
                  value={form.mediaUrl}
                  onChange={(e) => set("mediaUrl", e.target.value)}
                  className={inputCls}
                />
              </Field>
            </Grid>
            <p className="text-xs text-white/50">
              Photo uploads will be requested after your intake is reviewed so
              we can package them at the right resolution.
            </p>
          </Fieldset>

          <label className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <input
              type="checkbox"
              checked={form.approved}
              onChange={(e) => set("approved", e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-white/80 leading-relaxed">
              I confirm that I own or have permission to provide the submitted
              photos, videos, logos, and business information for use by
              Capital District Nest.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 disabled:opacity-60 text-white text-sm font-semibold transition"
          >
            {submitting ? "Submitting…" : "Submit Spotlight nomination"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0d6e66]";

const Fieldset = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="block text-xs font-medium text-white/70 mb-1.5">{label}</span>
    {children}
  </label>
);

export default SpotlightIntake;
