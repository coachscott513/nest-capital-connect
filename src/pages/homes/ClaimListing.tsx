import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import { supabase } from "@/integrations/supabase/client";

const ClaimListing = () => {
  const [params] = useSearchParams();
  const mlsParam = params.get("mls") ?? "";
  const townParam = params.get("town") ?? "";
  const agentParam = params.get("agent") ?? "";

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    claimant_name: "",
    claimant_email: "",
    claimant_phone: "",
    requested_public_url: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.claimant_name || !form.claimant_email || !form.claimant_phone) {
      setError("Name, email, and phone are required.");
      return;
    }
    setSubmitting(true);
    const { error: insertError } = await supabase.from("listing_claims").insert({
      mls_number: mlsParam || null,
      agent_slug: agentParam || null,
      town_slug: townParam || null,
      claimant_name: form.claimant_name,
      claimant_email: form.claimant_email,
      claimant_phone: form.claimant_phone,
      requested_public_url: form.requested_public_url || null,
      preferred_listing_url: form.requested_public_url || null,
      message: form.message || null,
      status: "new",
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setDone(true);
  }

  const title = "Claim Listing Link | Capital District Nest";
  const description = "Listing agents and brokerages can claim a property link preview, add the preferred public listing URL, and request a featured agent card.";
  const canonical = "https://www.capitaldistrictnest.com/homes/claim-listing";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <CleanHeader />

      <section className="px-[5%] pt-24 pb-10 border-b border-white/10">
        <div className="max-w-2xl mx-auto">
          <Link
            to={townParam ? `/homes/listings/${townParam}` : "/homes"}
            className="inline-flex items-center gap-1 text-sm text-white/65 hover:text-[#5eead4] mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to property board
          </Link>
          <div className="eyebrow-apple text-[#5eead4] mb-3">CLAIM LISTING LINK</div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Are you the listing agent?
          </h1>
          <p className="body-apple-dark mb-2">
            This property link is currently in preview status. Claim this listing to add your
            preferred public listing URL, agent card, photo, contact information, and social links.
          </p>
          {mlsParam && (
            <p className="text-sm text-white/55">
              MLS reference: <span className="text-white/85">#{mlsParam}</span>
            </p>
          )}
        </div>
      </section>

      <section className="px-[5%] py-12">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <div className="rounded-2xl border border-[#5eead4]/40 bg-[#5eead4]/10 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#5eead4] mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-white mb-2">Claim submitted</h2>
              <p className="text-white/75 mb-6">
                Thanks — we'll review your claim and route the property link to your preferred URL.
              </p>
              <Link
                to={townParam ? `/homes/listings/${townParam}` : "/homes"}
                className="btn-primary-apple inline-flex"
              >
                Back to property board
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-8 space-y-4">
              <Field label="Your name *">
                <input
                  required
                  value={form.claimant_name}
                  onChange={(e) => setForm({ ...form, claimant_name: e.target.value })}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-[#5eead4]/60 outline-none"
                />
              </Field>
              <Field label="Email *">
                <input
                  required
                  type="email"
                  value={form.claimant_email}
                  onChange={(e) => setForm({ ...form, claimant_email: e.target.value })}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-[#5eead4]/60 outline-none"
                />
              </Field>
              <Field label="Phone *">
                <input
                  required
                  type="tel"
                  value={form.claimant_phone}
                  onChange={(e) => setForm({ ...form, claimant_phone: e.target.value })}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-[#5eead4]/60 outline-none"
                />
              </Field>
              <Field label="Preferred public listing URL" hint="The page we should link the 'View Original Listing' button to.">
                <input
                  type="url"
                  placeholder="https://"
                  value={form.requested_public_url}
                  onChange={(e) => setForm({ ...form, requested_public_url: e.target.value })}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-[#5eead4]/60 outline-none"
                />
              </Field>
              <Field label="Anything else?">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#0B0F19] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:border-[#5eead4]/60 outline-none"
                />
              </Field>
              {error && <div className="text-sm text-[#DC1C2E]">{error}</div>}
              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary-apple inline-flex">
                  {submitting ? "Submitting…" : "Claim Listing Link"}
                </button>
                <Link to="/claim-business?category=real-estate&tier=featured" className="btn-secondary-apple-dark inline-flex">
                  Request Featured Placement
                </Link>
              </div>
            </form>
          )}

          <div className="mt-10">
            <HomesDisclaimer />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Field = ({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="text-sm text-white/85 mb-1.5">{label}</div>
    {hint && <div className="text-xs text-white/50 mb-1.5">{hint}</div>}
    {children}
  </label>
);

export default ClaimListing;
