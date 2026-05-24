import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import {
  Building2,
  Sparkles,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Music2,
  Calendar,
  Star,
  Handshake,
  Megaphone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TEAL = "#5eead4";

const initialState = {
  // Basic
  businessName: "",
  ownerName: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  town: "",
  // Socials
  instagram: "",
  facebook: "",
  tiktok: "",
  linkedin: "",
  youtube: "",
  // Details
  category: "",
  shortDescription: "",
  services: "",
  hours: "",
  // Growth interests (checkboxes)
  interestEvents: false,
  interestFeatured: false,
  interestRealEstate: false,
  interestPromotions: false,
};

const TownOptions = [
  "Delmar", "Albany", "Saratoga Springs", "Troy", "Schenectady",
  "Clifton Park", "Niskayuna", "Colonie", "Guilderland", "Other / Capital District",
];

const CategoryOptions = [
  "Restaurant", "Coffee", "Bakery", "Retail", "Wellness", "Gym", "Salon", "Pet", "Auto",
  "Mortgage Lender", "Bank/Credit Union", "Real Estate Attorney", "Insurance", "Home Inspector",
  "Contractor", "Roofer", "Plumber", "Electrician", "HVAC", "Landscaper", "Handyman", "Cleaner",
  "Accountant", "Financial Advisor", "Attorney", "Marketing", "Other",
];

const ClaimBusiness = () => {
  const [searchParams] = useSearchParams();
  const prefillBiz = searchParams.get("biz") || searchParams.get("name") || "";
  const prefillTown = searchParams.get("town") || "";

  const [form, setForm] = useState({
    ...initialState,
    businessName: prefillBiz,
    town: prefillTown
      ? prefillTown.charAt(0).toUpperCase() + prefillTown.slice(1).replace(/-/g, " ")
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName.trim() || !form.email.trim()) {
      toast.error("Business name and email are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const interests = [
        form.interestEvents && "Events",
        form.interestFeatured && "Featured placement",
        form.interestRealEstate && "Real estate partnerships",
        form.interestPromotions && "Promotions/specials",
      ].filter(Boolean).join(", ") || "None specified";

      const message = [
        `Business: ${form.businessName}`,
        form.category && `Category: ${form.category}`,
        form.town && `Town: ${form.town}`,
        form.address && `Address: ${form.address}`,
        form.phone && `Phone: ${form.phone}`,
        form.website && `Website: ${form.website}`,
        form.hours && `Hours: ${form.hours}`,
        form.shortDescription && `Description: ${form.shortDescription}`,
        form.services && `Services: ${form.services}`,
        (form.instagram || form.facebook || form.tiktok || form.linkedin || form.youtube) &&
          `Socials — IG:${form.instagram || "-"} | FB:${form.facebook || "-"} | TT:${form.tiktok || "-"} | LI:${form.linkedin || "-"} | YT:${form.youtube || "-"}`,
        `Interests: ${interests}`,
      ].filter(Boolean).join("\n");

      const { error } = await supabase.from("leads").insert({
        full_name: form.ownerName,
        email: form.email,
        phone: form.phone || null,
        message,
        type: "business_claim",
        origin_town: form.town || prefillTown || null,
        lead_type: "business_owner",
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error("Claim submit error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white">
        <Helmet>
          <title>Thanks — Capital District Nest</title>
        </Helmet>
        <MainHeader />
        <section className="pt-32 md:pt-40 pb-28 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div
              className="w-20 h-20 mx-auto mb-7 rounded-2xl border flex items-center justify-center"
              style={{ borderColor: `${TEAL}66`, background: `${TEAL}1a` }}
            >
              <Sparkles className="w-9 h-9" style={{ color: TEAL }} />
            </div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: TEAL }}>
              Received
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
              Thank you.
            </h1>
            <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
              Our team will personally review your profile and reach out to help build your
              Capital District Nest presence. No automated funnels — a real person from our
              team will be in touch shortly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/local"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition"
              >
                Browse the directory <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] hover:border-[#5eead4]/40 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back home
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
        <title>Join Capital District Nest | Curated Local Business Concierge</title>
        <meta
          name="description"
          content="Be considered for Capital District Nest — a curated, concierge platform elevating the Capital District's best local businesses."
        />
      </Helmet>

      <MainHeader />

      {/* HERO */}
      <section className="pt-28 md:pt-36 pb-14 px-6 md:px-10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(94,234,212,0.18) 0%, rgba(11,15,25,0) 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: TEAL }}>
            For Local Business Owners
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
            Let's build your Capital District profile.
          </h1>
          <p className="mt-6 text-lg text-white/65 font-light max-w-2xl mx-auto">
            Tell us about your business and our team will reach out to help create your profile.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 text-xs text-white/55">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <Handshake className="w-3.5 h-3.5" style={{ color: TEAL }} /> Concierge onboarding
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <Star className="w-3.5 h-3.5" style={{ color: TEAL }} /> Editorial profile
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]">
              <Megaphone className="w-3.5 h-3.5" style={{ color: TEAL }} /> Weekly pulse reach
            </span>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="pb-28 px-6 md:px-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto rounded-3xl bg-[#1E2230] border border-white/[0.08] p-7 md:p-10 space-y-10"
        >
          {/* SECTION: Basic */}
          <SectionBlock
            eyebrow="Section 01"
            title="Basic info"
            desc="Only your business name and email are required. Everything else helps us build your profile faster."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Business name" required>
                <input
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="e.g. The Perfect Blend"
                  required
                  className={inputCls}
                />
              </Field>
              <Field label="Your name">
                <input
                  value={form.ownerName}
                  onChange={(e) => update("ownerName", e.target.value)}
                  placeholder="Owner or contact"
                  className={inputCls}
                />
              </Field>
              <Field label="Email" required icon={<Mail className="w-4 h-4" />}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@business.com"
                  required
                  className={inputCls + " pl-10"}
                />
              </Field>
              <Field label="Phone" icon={<Phone className="w-4 h-4" />}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(518) 555-0123"
                  className={inputCls + " pl-10"}
                />
              </Field>
              <Field label="Website" icon={<Globe className="w-4 h-4" />}>
                <input
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://"
                  className={inputCls + " pl-10"}
                />
              </Field>
              <Field label="Town / City">
                <select
                  value={form.town}
                  onChange={(e) => update("town", e.target.value)}
                  className={inputCls + " cursor-pointer [&>option]:text-black"}
                >
                  <option value="">Select town</option>
                  {TownOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Street address" icon={<MapPin className="w-4 h-4" />}>
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="123 Main St"
                  className={inputCls + " pl-10"}
                />
              </Field>
            </div>
          </SectionBlock>

          {/* SECTION: Social */}
          <SectionBlock
            eyebrow="Section 02"
            title="Social media"
            desc="Optional. Add any platforms you actively maintain — we'll wire them into your profile."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Instagram" icon={<Instagram className="w-4 h-4" />}>
                <input value={form.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@handle or URL" className={inputCls + " pl-10"} />
              </Field>
              <Field label="Facebook" icon={<Facebook className="w-4 h-4" />}>
                <input value={form.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="facebook.com/..." className={inputCls + " pl-10"} />
              </Field>
              <Field label="TikTok" icon={<Music2 className="w-4 h-4" />}>
                <input value={form.tiktok} onChange={(e) => update("tiktok", e.target.value)} placeholder="@handle" className={inputCls + " pl-10"} />
              </Field>
              <Field label="LinkedIn" icon={<Linkedin className="w-4 h-4" />}>
                <input value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="linkedin.com/company/..." className={inputCls + " pl-10"} />
              </Field>
              <Field label="YouTube" icon={<Youtube className="w-4 h-4" />}>
                <input value={form.youtube} onChange={(e) => update("youtube", e.target.value)} placeholder="youtube.com/@..." className={inputCls + " pl-10"} />
              </Field>
            </div>
          </SectionBlock>

          {/* SECTION: Business details */}
          <SectionBlock
            eyebrow="Section 03"
            title="Business details"
            desc="Help us understand what you do. All optional — share what's easy."
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className={inputCls + " cursor-pointer [&>option]:text-black"}
                >
                  <option value="">Select category</option>
                  {CategoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Hours" icon={<Calendar className="w-4 h-4" />}>
                <input value={form.hours} onChange={(e) => update("hours", e.target.value)} placeholder="e.g. Mon–Fri 9a–5p" className={inputCls + " pl-10"} />
              </Field>
            </div>
            <Field label="Short description">
              <textarea
                value={form.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
                placeholder="One or two sentences about your business."
                rows={3}
                className={inputCls + " resize-none"}
              />
            </Field>
            <Field label="Services">
              <textarea
                value={form.services}
                onChange={(e) => update("services", e.target.value)}
                placeholder="Comma-separated list, e.g. Espresso, Pastries, Catering"
                rows={2}
                className={inputCls + " resize-none"}
              />
            </Field>
            <p className="text-xs text-white/45 leading-relaxed">
              Logo and photo uploads aren't required here — our team will collect them
              directly with you during onboarding, so you get the visual treatment right.
            </p>
          </SectionBlock>

          {/* SECTION: Growth interests */}
          <SectionBlock
            eyebrow="Section 04"
            title="What are you interested in?"
            desc="Optional. Just check what sounds relevant — we'll bring ideas, not invoices."
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <Check
                label="Local events & sponsorships"
                checked={form.interestEvents}
                onChange={(v) => update("interestEvents", v)}
              />
              <Check
                label="Featured placement on the platform"
                checked={form.interestFeatured}
                onChange={(v) => update("interestFeatured", v)}
              />
              <Check
                label="Real estate / new-resident partnerships"
                checked={form.interestRealEstate}
                onChange={(v) => update("interestRealEstate", v)}
              />
              <Check
                label="Promotions, specials & weekly feed"
                checked={form.interestPromotions}
                onChange={(v) => update("interestPromotions", v)}
              />
            </div>
          </SectionBlock>

          {/* Submit */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-7">
            <p className="text-xs text-white/55 max-w-md leading-relaxed">
              A real person from our team will review your submission and reach out personally.
              No automated drip sequences.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit for review"}
              {!isSubmitting && <ArrowUpRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
};

/* ─── primitives ─── */

const inputCls =
  "w-full bg-[#0B0F19] text-white placeholder:text-white/40 text-[15px] rounded-xl border border-white/10 px-4 py-3 focus:outline-none focus:border-[#5eead4]/50 transition";

const SectionBlock = ({
  eyebrow, title, desc, children,
}: { eyebrow: string; title: string; desc: string; children: React.ReactNode }) => (
  <div className="space-y-5">
    <div>
      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: TEAL }}>
        {eyebrow}
      </p>
      <h2 className="mt-1.5 text-2xl md:text-3xl font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mt-2 text-sm text-white/55 font-light max-w-xl">{desc}</p>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({
  label, required, icon, children,
}: { label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode }) => (
  <label className="block space-y-1.5">
    <span className="text-xs font-semibold text-white/70 inline-flex items-center gap-1.5">
      {label}
      {required && <span style={{ color: TEAL }}>*</span>}
    </span>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          {icon}
        </span>
      )}
      {children}
    </div>
  </label>
);

const Check = ({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`text-left px-4 py-3.5 rounded-xl border text-sm transition flex items-start gap-3 ${
      checked
        ? "border-[#5eead4]/50 bg-[#5eead4]/[0.08] text-white"
        : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
    }`}
  >
    <span
      className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
        checked ? "bg-[#5eead4] border-[#5eead4]" : "border-white/30"
      }`}
    >
      {checked && <CheckCircle className="w-3.5 h-3.5 text-[#0B0F19]" strokeWidth={3} />}
    </span>
    <span className="leading-snug">{label}</span>
  </button>
);

export default ClaimBusiness;
