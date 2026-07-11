import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { OFFICIAL_CATEGORIES } from "@/data/officialCategories";

type TeamMember = { name: string; title: string; bio: string };
type Plan = {
  plan_key: string;
  plan_name: string;
  description: string | null;
  monthly_price_cents: number;
  annual_price_cents: number;
  features: string[];
};

const AVAILABLE_BADGES = [
  "Owner Verified",
  "CDN Editorial",
  "Seasonally Updated",
  "Original Photography",
  "Video Available",
  "Reservations Available",
  "Private Events",
  "Locally Owned",
] as const;

const STEPS = [
  "Business",
  "Story",
  "Team",
  "Media",
  "Preview",
  "Plan",
  "Submit",
] as const;

const emptyForm = {
  // step 1
  businessName: "",
  contactName: "",
  category: "",
  town: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  instagram: "",
  facebook: "",
  reservationUrl: "",
  hours: "",
  // step 2
  storyOrigin: "",
  knownFor: "",
  firstTimer: "",
  seasonal: "",
  ownWords: "",
  // step 3
  team: [] as TeamMember[],
  // step 4
  photoUrls: [] as string[], // urls list (drag&drop = paste URLs for v1)
  photoDraft: "",
  logoUrl: "",
  reelUrl: "",
  videoUrl: "",
  // step 5-6
  badges: [] as string[],
  selectedPlan: "essential" as string,
  billing: "monthly" as "monthly" | "annual",
  // consent
  approved: false,
};

type Form = typeof emptyForm;

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0d6e66] transition";

const fmt = (cents: number) =>
  cents === 0 ? "$0" : `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

const Apply = () => {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const initialPlan = params.get("plan") || "essential";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ ...emptyForm, selectedPlan: initialPlan });
  const [plans, setPlans] = useState<Plan[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("subscription_plans")
        .select("plan_key, plan_name, description, monthly_price_cents, annual_price_cents, features")
        .eq("active", true)
        .eq("region_slug", "capital-district")
        .order("sort_order");
      if (data)
        setPlans(
          data.map((p: any) => ({
            ...p,
            features: Array.isArray(p.features) ? p.features : [],
          })),
        );
    })();
  }, []);

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!(form.businessName && form.contactName && form.email && form.phone);
      default:
        return true;
    }
  }, [step, form]);

  const next = () => {
    if (!canAdvance) {
      toast({
        title: "Missing fields",
        description: "Please complete the required fields.",
        variant: "destructive",
      });
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addPhoto = () => {
    const url = form.photoDraft.trim();
    if (!url) return;
    if (form.photoUrls.length >= 15) {
      toast({ title: "Photo limit reached", description: "Up to 15 photos.", variant: "destructive" });
      return;
    }
    set("photoUrls", [...form.photoUrls, url]);
    set("photoDraft", "");
  };

  const removePhoto = (i: number) =>
    set("photoUrls", form.photoUrls.filter((_, idx) => idx !== i));

  const addTeam = () =>
    set("team", [...form.team, { name: "", title: "", bio: "" }]);
  const updateTeam = (i: number, patch: Partial<TeamMember>) =>
    set(
      "team",
      form.team.map((m, idx) => (idx === i ? { ...m, ...patch } : m)),
    );
  const removeTeam = (i: number) =>
    set("team", form.team.filter((_, idx) => idx !== i));

  const toggleBadge = (b: string) =>
    set(
      "badges",
      form.badges.includes(b)
        ? form.badges.filter((x) => x !== b)
        : [...form.badges, b],
    );

  const submit = async () => {
    if (!form.approved) {
      toast({
        title: "Approval required",
        description: "Please confirm ownership of your submitted media.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("business_applications").insert({
      region_slug: "capital-district",
      status: "pending_editorial_review",
      selected_plan_key: form.selectedPlan,
      business_name: form.businessName,
      contact_name: form.contactName,
      category: form.category || null,
      town: form.town || null,
      address: form.address || null,
      phone: form.phone,
      email: form.email,
      website: form.website || null,
      instagram: form.instagram || null,
      facebook: form.facebook || null,
      reservation_url: form.reservationUrl || null,
      hours: form.hours || null,
      story_origin: form.storyOrigin || null,
      known_for: form.knownFor || null,
      first_timer: form.firstTimer || null,
      seasonal: form.seasonal || null,
      own_words: form.ownWords || null,
      team: form.team as any,
      photos: form.photoUrls,
      logo_url: form.logoUrl || null,
      reel_url: form.reelUrl || null,
      video_url: form.videoUrl || null,
      badges: form.badges as any,
      social: {
        instagram: form.instagram || null,
        facebook: form.facebook || null,
        reservation_url: form.reservationUrl || null,
      } as any,
      media: {
        logo_url: form.logoUrl || null,
        reel_url: form.reelUrl || null,
        video_url: form.videoUrl || null,
      } as any,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0 });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white">
        <Helmet>
          <title>Application Received | Capital District Nest</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <CleanHeader />
        <section className="px-6 md:px-10 pt-32 pb-32">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-14 h-14 text-[#5eead4] mx-auto mb-8" />
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Your story starts here.
            </h1>
            <p className="mt-6 text-white/70 leading-relaxed text-lg font-light">
              Your profile has been received. Every Capital District Nest feature
              is reviewed by our editorial team before publication to ensure
              quality and accuracy. We'll notify you when your profile is ready.
            </p>
            <div className="mt-10 flex justify-center gap-3">
              <Link
                to="/businesses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-sm font-semibold"
              >
                Browse businesses
              </Link>
              <Link
                to="/business/the-roosevelt-room"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold"
              >
                See a Featured profile <ArrowRight className="w-4 h-4" />
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
        <title>Get Started | Capital District Nest for Business</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <CleanHeader />

      {/* Progress */}
      <section className="px-6 md:px-10 pt-28 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#5eead4]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
              Step {step + 1} of {STEPS.length} · {STEPS[step]}
            </span>
          </div>
          <div className="h-1 w-full bg-white/[0.08] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0d6e66] transition-all"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-3xl mx-auto rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-10 backdrop-blur">
          {step === 0 && <StepBusiness form={form} set={set} />}
          {step === 1 && <StepStory form={form} set={set} />}
          {step === 2 && (
            <StepTeam
              form={form}
              addTeam={addTeam}
              updateTeam={updateTeam}
              removeTeam={removeTeam}
            />
          )}
          {step === 3 && (
            <StepMedia
              form={form}
              set={set}
              addPhoto={addPhoto}
              removePhoto={removePhoto}
              toggleBadge={toggleBadge}
            />
          )}
          {step === 4 && <StepPreview form={form} />}
          {step === 5 && <StepPlan form={form} set={set} plans={plans} />}
          {step === 6 && <StepSubmit form={form} set={set} />}

          <div className="mt-10 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button
                onClick={back}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.04] text-sm font-semibold"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button
                onClick={() => nav("/for-businesses")}
                className="text-sm text-white/50 hover:text-white/80"
              >
                Cancel
              </button>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 disabled:opacity-60 text-white text-sm font-semibold"
              >
                {submitting ? "Submitting…" : "Submit application"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ---------------- Steps ---------------- */

const StepHeader = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="mb-8">
    <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">{title}</h1>
    {sub && <p className="mt-3 text-white/60 leading-relaxed">{sub}</p>}
  </div>
);

const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
  <label className="block">
    <span className="block text-xs font-medium text-white/70 mb-1.5">
      {label} {required && <span className="text-[#5eead4]">*</span>}
    </span>
    {children}
  </label>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const StepBusiness = ({ form, set }: any) => (
  <>
    <StepHeader title="Business information" sub="The basics we'll use to build your profile." />
    <div className="space-y-4">
      <Grid>
        <Field label="Business name" required>
          <input required value={form.businessName} onChange={(e) => set("businessName", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Contact person" required>
          <input required value={form.contactName} onChange={(e) => set("contactName", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Email" required>
          <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Phone" required>
          <input required value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
            <option value="">Select…</option>
            {OFFICIAL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Town">
          <input value={form.town} onChange={(e) => set("town", e.target.value)} className={inputCls} placeholder="e.g. Troy" />
        </Field>
        <Field label="Address">
          <input value={form.address} onChange={(e) => set("address", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Website">
          <input value={form.website} onChange={(e) => set("website", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Instagram">
          <input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Facebook">
          <input value={form.facebook} onChange={(e) => set("facebook", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Reservation URL">
          <input value={form.reservationUrl} onChange={(e) => set("reservationUrl", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Hours">
          <input value={form.hours} onChange={(e) => set("hours", e.target.value)} className={inputCls} />
        </Field>
      </Grid>
    </div>
  </>
);

const StepStory = ({ form, set }: any) => (
  <>
    <StepHeader title="Tell your story" sub="Answer in your own voice — our editors will refine it." />
    <div className="space-y-4">
      <Field label="How did your business begin?">
        <textarea rows={3} value={form.storyOrigin} onChange={(e) => set("storyOrigin", e.target.value)} className={inputCls} />
      </Field>
      <Field label="What are you known for?">
        <textarea rows={3} value={form.knownFor} onChange={(e) => set("knownFor", e.target.value)} className={inputCls} />
      </Field>
      <Field label="What should every first-time visitor experience?">
        <textarea rows={3} value={form.firstTimer} onChange={(e) => set("firstTimer", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Anything seasonal or upcoming?">
        <textarea rows={2} value={form.seasonal} onChange={(e) => set("seasonal", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Describe your business in your own words.">
        <textarea rows={4} value={form.ownWords} onChange={(e) => set("ownWords", e.target.value)} className={inputCls} />
      </Field>
    </div>
  </>
);

const StepTeam = ({ form, addTeam, updateTeam, removeTeam }: any) => (
  <>
    <StepHeader
      title="Meet the team"
      sub="Optional. Owner, chef, manager, leadership — one sentence each."
    />
    <div className="space-y-4">
      {form.team.map((m: TeamMember, i: number) => (
        <div key={i} className="rounded-xl border border-white/[0.1] bg-white/[0.03] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4]">Team member {i + 1}</span>
            <button onClick={() => removeTeam(i)} className="text-white/40 hover:text-white/80">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <Grid>
            <Field label="Name"><input value={m.name} onChange={(e) => updateTeam(i, { name: e.target.value })} className={inputCls} /></Field>
            <Field label="Title"><input value={m.title} onChange={(e) => updateTeam(i, { title: e.target.value })} className={inputCls} /></Field>
          </Grid>
          <Field label="One-sentence bio">
            <input value={m.bio} onChange={(e) => updateTeam(i, { bio: e.target.value })} className={inputCls} />
          </Field>
        </div>
      ))}
      <button
        onClick={addTeam}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-dashed border-white/15 hover:border-white/30 text-sm text-white/70"
      >
        <Plus className="w-4 h-4" /> Add team member
      </button>
    </div>
  </>
);

const StepMedia = ({ form, set, addPhoto, removePhoto, toggleBadge }: any) => (
  <>
    <StepHeader title="Media" sub="Share up to 15 photo URLs, plus optional video and logo. We'll follow up for direct uploads if needed." />
    <div className="space-y-6">
      <div>
        <span className="block text-xs font-medium text-white/70 mb-2">Photos ({form.photoUrls.length}/15)</span>
        <div className="flex gap-2">
          <input
            value={form.photoDraft}
            onChange={(e) => set("photoDraft", e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addPhoto(); } }}
            placeholder="Paste photo URL"
            className={inputCls}
          />
          <button
            type="button"
            onClick={addPhoto}
            className="px-4 py-2.5 rounded-lg bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold"
          >
            Add
          </button>
        </div>
        {form.photoUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-3 md:grid-cols-5 gap-2">
            {form.photoUrls.map((url: string, i: number) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/[0.1] bg-white/[0.02]">
                <img src={url} alt="" className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.2")} />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Grid>
        <Field label="Logo URL"><input value={form.logoUrl} onChange={(e) => set("logoUrl", e.target.value)} className={inputCls} /></Field>
        <Field label="Instagram Reel URL"><input value={form.reelUrl} onChange={(e) => set("reelUrl", e.target.value)} className={inputCls} /></Field>
        <Field label="YouTube URL"><input value={form.videoUrl} onChange={(e) => set("videoUrl", e.target.value)} className={inputCls} /></Field>
      </Grid>

      <div>
        <span className="block text-xs font-medium text-white/70 mb-2">Editorial badges (only select what's true)</span>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_BADGES.map((b) => {
            const on = form.badges.includes(b);
            return (
              <button
                key={b}
                type="button"
                onClick={() => toggleBadge(b)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  on
                    ? "bg-[#0d6e66]/20 border-[#0d6e66]/50 text-[#5eead4]"
                    : "bg-white/[0.03] border-white/[0.1] text-white/70 hover:border-white/25"
                }`}
              >
                {on && <Check className="w-3 h-3 inline mr-1" />}
                {b}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </>
);

const StepPreview = ({ form }: { form: Form }) => {
  const hero = form.photoUrls[0];
  return (
    <>
      <StepHeader title="Preview your profile" sub="A live preview of your future Capital District Nest page." />
      <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0e0f12]">
        {/* Hero */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-[#0d6e66]/40 to-[#0e0f12]">
          {hero && <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            {form.category && (
              <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                {form.category}{form.town && ` · ${form.town}`}
              </span>
            )}
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
              {form.businessName || "Your business name"}
            </h2>
          </div>
        </div>
        <div className="p-6 md:p-8 space-y-6">
          {form.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.badges.map((b) => (
                <span key={b} className="px-2.5 py-1 rounded-full bg-[#0d6e66]/15 border border-[#0d6e66]/40 text-[10px] font-semibold tracking-wider uppercase text-[#5eead4]">
                  {b}
                </span>
              ))}
            </div>
          )}
          {(form.ownWords || form.storyOrigin) && (
            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4] mb-2">The Story</h3>
              <p className="text-white/75 leading-relaxed">{form.ownWords || form.storyOrigin}</p>
            </div>
          )}
          {form.knownFor && (
            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4] mb-2">Known For</h3>
              <p className="text-white/75 leading-relaxed">{form.knownFor}</p>
            </div>
          )}
          {form.firstTimer && (
            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4] mb-2">If it's your first time</h3>
              <p className="text-white/75 leading-relaxed">{form.firstTimer}</p>
            </div>
          )}
          {form.photoUrls.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {form.photoUrls.slice(1, 7).map((u, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-white/[0.03]">
                  <img src={u} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          {form.team.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#5eead4] mb-3">The Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {form.team.map((m, i) => (
                  <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <div className="font-semibold">{m.name || "Team member"}</div>
                    {m.title && <div className="text-xs text-[#5eead4] mt-0.5">{m.title}</div>}
                    {m.bio && <p className="text-sm text-white/65 mt-2 leading-relaxed">{m.bio}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="pt-4 flex flex-wrap gap-2 text-xs text-white/50">
            {form.phone && <span>📞 {form.phone}</span>}
            {form.website && <span>🌐 {form.website}</span>}
            {form.address && <span>📍 {form.address}</span>}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/50 text-center">
        Preview only. Our editorial team will polish photography, story, and layout before publication.
      </p>
    </>
  );
};

const StepPlan = ({ form, set, plans }: any) => {
  const source: Plan[] = plans.length
    ? plans
    : [
        { plan_key: "essential", plan_name: "Essential Registry", description: "Free profile.", monthly_price_cents: 0, annual_price_cents: 0, features: [] },
        { plan_key: "featured", plan_name: "Featured Partner", description: "Editorial Spotlight.", monthly_price_cents: 4900, annual_price_cents: 47900, features: [] },
      ];
  return (
    <>
      <StepHeader title="Choose your plan" sub="You can upgrade any time." />
      {source.some((p) => p.annual_price_cents > 0) && (
        <div className="inline-flex p-1 rounded-full border border-white/[0.1] bg-white/[0.03] mb-6">
          {(["monthly", "annual"] as const).map((b) => (
            <button
              key={b}
              onClick={() => set("billing", b)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize ${
                form.billing === b ? "bg-[#0d6e66] text-white" : "text-white/60"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {source.map((p) => {
          const active = form.selectedPlan === p.plan_key;
          const cents = form.billing === "annual" && p.annual_price_cents > 0 ? p.annual_price_cents : p.monthly_price_cents;
          return (
            <button
              key={p.plan_key}
              onClick={() => set("selectedPlan", p.plan_key)}
              className={`text-left rounded-2xl p-6 border transition ${
                active
                  ? "bg-[#0d6e66]/15 border-[#0d6e66]/60"
                  : "bg-white/[0.03] border-white/[0.08] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{p.plan_name}</h3>
                {active && <div className="w-5 h-5 rounded-full bg-[#0d6e66] flex items-center justify-center"><Check className="w-3 h-3" /></div>}
              </div>
              <div className="mt-2 text-3xl font-semibold tracking-[-0.02em]">
                {fmt(cents)}
                {cents > 0 && <span className="text-sm text-white/50 font-normal"> /{form.billing === "annual" ? "yr" : "mo"}</span>}
              </div>
              {p.description && <p className="mt-2 text-sm text-white/60">{p.description}</p>}
              {p.features.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/70">
                      <Check className="w-3.5 h-3.5 text-[#5eead4] mt-0.5 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

const StepSubmit = ({ form, set }: any) => (
  <>
    <StepHeader
      title="Ready to submit"
      sub="Our editorial team reviews every application before publication."
    />
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3 text-sm text-white/75">
      <div><span className="text-white/50">Business:</span> {form.businessName || "—"}</div>
      <div><span className="text-white/50">Category:</span> {form.category || "—"}</div>
      <div><span className="text-white/50">Town:</span> {form.town || "—"}</div>
      <div><span className="text-white/50">Plan:</span> {form.selectedPlan} ({form.billing})</div>
      <div><span className="text-white/50">Photos:</span> {form.photoUrls.length}</div>
      <div><span className="text-white/50">Team members:</span> {form.team.length}</div>
      <div><span className="text-white/50">Badges:</span> {form.badges.length ? form.badges.join(", ") : "—"}</div>
    </div>
    <label className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-white/[0.08] bg-white/[0.03]">
      <input
        type="checkbox"
        checked={form.approved}
        onChange={(e) => set("approved", e.target.checked)}
        className="mt-1"
      />
      <span className="text-sm text-white/80 leading-relaxed">
        I confirm that I own or have permission to provide the submitted photos,
        videos, logos, and business information for use by Capital District Nest.
      </span>
    </label>
    {form.selectedPlan !== "essential" && (
      <p className="mt-4 text-xs text-white/50">
        Featured Partner billing is set up after our editorial team reviews your submission — we'll send a secure checkout link when your profile is ready to go live.
      </p>
    )}
  </>
);

export default Apply;
