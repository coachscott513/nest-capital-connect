import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HOMES_TOWNS } from "@/data/homesTowns";

const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rental", label: "Rental" },
  { value: "multi_unit", label: "Multi-Unit" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "open-house", label: "Open House" },
  { value: "investor_deal", label: "Investor Deal" },
];

const schema = z.object({
  full_name: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(7, "Phone required").max(40),
  listing_type: z.string().min(1),
  address: z.string().trim().min(3, "Address required").max(255),
  town: z.string().min(1, "Town required"),
  price: z.string().trim().max(40).optional(),
  beds: z.string().trim().max(20).optional(),
  baths: z.string().trim().max(20).optional(),
  sqft: z.string().trim().max(20).optional(),
  property_type: z.string().trim().max(80).optional(),
  listing_url: z.string().trim().url("Valid URL required").max(500),
  brokerage: z.string().trim().max(160).optional(),
  notes: z.string().trim().max(1500).optional(),
  authorized: z.literal(true, {
    errorMap: () => ({ message: "Authorization required" }),
  }),
});

const AddListing = () => {
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    listing_type: params.get("type") || "sale",
    address: "",
    town: params.get("town") || "",
    price: "",
    beds: "",
    baths: "",
    sqft: "",
    property_type: "",
    listing_url: "",
    brokerage: "",
    notes: "",
    authorized: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChange = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = parsed.error.errors[0];
      toast({
        title: "Check your submission",
        description: first?.message || "Please review the form.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const townName =
        HOMES_TOWNS.find((t) => t.slug === parsed.data.town)?.name ||
        parsed.data.town;
      const message = [
        `=== Capital District Nest Homes — Listing Submission ===`,
        `Listing type: ${parsed.data.listing_type}`,
        `Address: ${parsed.data.address}`,
        `Town: ${townName}`,
        parsed.data.price ? `Price: ${parsed.data.price}` : null,
        parsed.data.beds ? `Beds: ${parsed.data.beds}` : null,
        parsed.data.baths ? `Baths: ${parsed.data.baths}` : null,
        parsed.data.sqft ? `Sqft: ${parsed.data.sqft}` : null,
        parsed.data.property_type ? `Type: ${parsed.data.property_type}` : null,
        `Listing URL: ${parsed.data.listing_url}`,
        parsed.data.brokerage ? `Brokerage: ${parsed.data.brokerage}` : null,
        parsed.data.notes ? `Notes: ${parsed.data.notes}` : null,
        `Authorized to advertise: yes`,
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await supabase.from("leads").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        type: "homes_listing_submission",
        lead_type: "listing_agent",
        origin_town: townName,
        location: parsed.data.address,
        message,
      });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      console.error(err);
      toast({
        title: "Submission failed",
        description: "Please try again or email team@capitaldistrictnest.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Post a Listing Link | Capital District Nest Homes</title>
        <meta
          name="description"
          content="Submit a direct property link, rental, or open house to Capital District Nest Homes."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes/add-listing" />
      </Helmet>

      <CleanHeader />

      <section className="px-[5%] pt-24 pb-12 border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/homes"
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Homes
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">POST LISTING LINK</div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Post a listing link.
          </h1>
          <p className="body-apple-dark">
            Add your property, rental, open house, or investment opportunity
            with a direct link back to your own page.
          </p>
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="max-w-3xl mx-auto">
          {done ? (
            <div className="rounded-2xl border border-[#5eead4]/40 bg-[#5eead4]/5 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#5eead4] mx-auto mb-3" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Submission received.
              </h2>
              <p className="text-sm text-white/65 mb-6 max-w-md mx-auto">
                Thanks — your listing is pending review. We'll reach out at the
                email you provided when it's published.
              </p>
              <Link to="/homes" className="btn-primary-apple inline-flex">
                Back to Homes
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-8 space-y-5"
            >
              <Field label="Listing type *">
                <select
                  required
                  value={form.listing_type}
                  onChange={(e) => onChange("listing_type", e.target.value)}
                  className="w-full bg-[#0B0F19] border border-white/15 rounded-md px-3 py-2 text-white"
                >
                  {LISTING_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Address *">
                  <Input
                    required
                    value={form.address}
                    onChange={(e) => onChange("address", e.target.value)}
                    placeholder="123 Main St"
                  />
                </Field>
                <Field label="Town *">
                  <select
                    required
                    value={form.town}
                    onChange={(e) => onChange("town", e.target.value)}
                    className="w-full bg-[#0B0F19] border border-white/15 rounded-md px-3 py-2 text-white"
                  >
                    <option value="">Select a town</option>
                    {HOMES_TOWNS.map((t) => (
                      <option key={t.slug} value={t.slug}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Field label="Price">
                  <Input value={form.price} onChange={(e) => onChange("price", e.target.value)} placeholder="$425,000" />
                </Field>
                <Field label="Beds">
                  <Input value={form.beds} onChange={(e) => onChange("beds", e.target.value)} placeholder="3" />
                </Field>
                <Field label="Baths">
                  <Input value={form.baths} onChange={(e) => onChange("baths", e.target.value)} placeholder="2" />
                </Field>
                <Field label="Sqft">
                  <Input value={form.sqft} onChange={(e) => onChange("sqft", e.target.value)} placeholder="1,850" />
                </Field>
              </div>

              <Field label="Property type">
                <Input
                  value={form.property_type}
                  onChange={(e) => onChange("property_type", e.target.value)}
                  placeholder="Single family / Multi-unit / Condo / Land"
                />
              </Field>

              <Field label="Listing URL *">
                <Input
                  required
                  type="url"
                  value={form.listing_url}
                  onChange={(e) => onChange("listing_url", e.target.value)}
                  placeholder="https://..."
                />
              </Field>

              <Field label="Brokerage / company">
                <Input
                  value={form.brokerage}
                  onChange={(e) => onChange("brokerage", e.target.value)}
                  placeholder="e.g. Coldwell Banker Prime Properties"
                />
              </Field>

              <div className="pt-2 border-t border-white/10">
                <div className="text-xs uppercase tracking-wider text-[#5eead4] mb-3">
                  Your contact
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Name *">
                    <Input
                      required
                      value={form.full_name}
                      onChange={(e) => onChange("full_name", e.target.value)}
                    />
                  </Field>
                  <Field label="Email *">
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => onChange("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone *">
                    <Input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => onChange("phone", e.target.value)}
                    />
                  </Field>
                </div>
              </div>

              <Field label="Notes">
                <Textarea
                  value={form.notes}
                  onChange={(e) => onChange("notes", e.target.value)}
                  rows={3}
                  placeholder="Open house times, special features, etc."
                />
              </Field>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.authorized}
                  onChange={(e) => onChange("authorized", e.target.checked as true)}
                  className="mt-1"
                />
                <span className="text-sm text-white/75">
                  I confirm that I am authorized to advertise this property and
                  that the link, image, and information submitted may be
                  displayed on Capital District Nest.
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary-apple w-full justify-center disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit for Review"}
              </button>
            </form>
          )}
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="text-xs font-medium text-white/75 mb-1.5">{label}</div>
    {children}
  </label>
);

export default AddListing;
