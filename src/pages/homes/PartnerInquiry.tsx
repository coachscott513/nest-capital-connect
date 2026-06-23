import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Check } from "lucide-react";
import { z } from "zod";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  "Agent",
  "Brokerage",
  "Mortgage",
  "Insurance",
  "Attorney",
  "Contractor",
  "Inspector",
  "Property Management",
  "Appraiser",
  "Moving / Storage",
  "Other",
];

const PACKAGES = [
  "Free Profile",
  "Featured Card",
  "Town Partner",
  "Core Market Package",
  "Category Sponsor",
  "Not sure",
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(40),
  category: z.string().min(1, "Select a category"),
  towns: z.string().trim().max(300).optional().or(z.literal("")),
  pkg: z.string().min(1, "Select a package"),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  social: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const PartnerInquiry = () => {
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const initialPkg = useMemo(() => {
    const p = params.get("package");
    return p && PACKAGES.includes(p) ? p : "";
  }, [params]);

  const initialCategory = useMemo(() => {
    const c = params.get("category");
    if (!c) return "";
    if (c === "agent") return "Agent";
    if (c === "category-partner") return "Other";
    return "";
  }, [params]);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: initialCategory,
    towns: params.get("town") ?? "",
    pkg: initialPkg,
    website: "",
    social: "",
    notes: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        variant: "destructive",
        title: "Please check the form",
        description: parsed.error.issues[0]?.message ?? "Some fields are invalid.",
      });
      return;
    }
    setSubmitting(true);
    const townsArray = (parsed.data.towns ?? "")
      .split(/[,;\n]/)
      .map((t) => t.trim())
      .filter(Boolean);
    const { error } = await supabase.from("partner_inquiries").insert({
      name: parsed.data.name,
      company: parsed.data.company || null,
      email: parsed.data.email,
      phone: parsed.data.phone,
      profession_category: parsed.data.category,
      towns_of_interest: townsArray,
      interested_package: parsed.data.pkg,
      website: parsed.data.website || null,
      social_links: parsed.data.social ? { raw: parsed.data.social } : null,
      notes: parsed.data.notes || null,
      source_page: "/homes/partner-inquiry",
      status: "new",
    });
    setSubmitting(false);
    if (error) {
      toast({ variant: "destructive", title: "Could not submit", description: error.message });
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Partner Inquiry — Capital District Nest Homes</title>
        <meta
          name="description"
          content="Request featured placement inside Capital District Nest Homes town property boards, buyer tools, and local real estate service categories."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes/partner-inquiry" />
      </Helmet>

      <CleanHeader />

      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <Link to="/homes/partners" className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6">
            <ArrowLeft className="w-4 h-4" /> Partner overview
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">PARTNER INQUIRY</div>
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-3">
            Request founding partner placement.
          </h1>
          <p className="body-apple-dark">
            Tell us your category, town, and preferred placement. Capital
            District Nest will confirm availability during the pilot.
          </p>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <div className="rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/[0.06] p-8 text-center">
              <Check className="w-10 h-10 text-[#5eead4] mx-auto mb-3" />
              <h2 className="text-2xl font-semibold text-white mb-2">Thank you.</h2>
              <p className="text-white/75 max-w-md mx-auto">
                Capital District Nest will review your request and follow up
                with next steps.
              </p>
              <Link to="/homes" className="btn-secondary-apple-dark inline-flex mt-6">
                Back to Homes
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-8 space-y-5">
              <Field label="Name" required><Input value={form.name} onChange={set("name")} /></Field>
              <Field label="Company"><Input value={form.company} onChange={set("company")} /></Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email" required><Input type="email" value={form.email} onChange={set("email")} /></Field>
                <Field label="Phone" required><Input type="tel" value={form.phone} onChange={set("phone")} /></Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Profession category" required>
                  <Select value={form.category} onChange={set("category")}>
                    <option value="">Select…</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Select>
                </Field>
                <Field label="Interested package" required>
                  <Select value={form.pkg} onChange={set("pkg")}>
                    <option value="">Select…</option>
                    {PACKAGES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </Select>
                </Field>
              </div>
              <Field label="Towns of interest" hint="e.g. Albany, Saratoga Springs">
                <Input value={form.towns} onChange={set("towns")} />
              </Field>
              <Field label="Website"><Input value={form.website} onChange={set("website")} placeholder="https://…" /></Field>
              <Field label="Social links" hint="One per line or comma-separated">
                <Textarea value={form.social} onChange={set("social")} rows={2} />
              </Field>
              <Field label="Notes"><Textarea value={form.notes} onChange={set("notes")} rows={4} /></Field>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary-apple w-full justify-center disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Request Placement"}
              </button>
              <p className="text-[11px] text-white/45 text-center">
                Capital District Nest is a local advertising and directory
                platform. Featured partner placements are advertising products.
              </p>
            </form>
          )}
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

const Field = ({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-sm text-white/80 mb-1 inline-block">
      {label}{required && <span className="text-[#5eead4]"> *</span>}
    </span>
    {children}
    {hint && <span className="text-[11px] text-white/45 mt-1 block">{hint}</span>}
  </label>
);

const baseInput = "w-full rounded-md bg-[#0B0F19] border border-white/15 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#5eead4]/60 focus:outline-none focus:ring-1 focus:ring-[#5eead4]/30";

const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={baseInput} />;
const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} className={baseInput} />;
const Select = (p: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={baseInput} />;

export default PartnerInquiry;
