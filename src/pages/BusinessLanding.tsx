import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Sparkles, Wrench, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CALENDLY = "https://calendly.com/capitaldistrictnest/strategy";

const scrollToForm = () => {
  const el = document.getElementById("business-contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const CtaButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick || scrollToForm}
    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#0e0f12] bg-[#5eead4] hover:bg-white transition shadow-[0_10px_30px_-10px_rgba(94,234,212,0.5)]"
  >
    {children} <ArrowRight className="w-4 h-4" />
  </button>
);

const StatCard = ({ title, body }: { title: string; body: string }) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 hover:border-[#5eead4]/40 transition-colors">
    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-4">
      Proof point
    </p>
    <h3 className="text-2xl font-semibold tracking-tight text-white">{title}</h3>
    <p className="mt-3 text-sm text-white/65 leading-relaxed">{body}</p>
  </div>
);

const ServicePanel = ({
  num,
  icon: Icon,
  title,
  body,
}: {
  num: string;
  icon: typeof Sparkles;
  title: string;
  body: string;
}) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 md:p-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
    <div className="flex items-center gap-4 md:w-64 shrink-0">
      <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
        {num}
      </span>
      <Icon className="w-6 h-6 text-[#5eead4]" strokeWidth={1.5} />
    </div>
    <div>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-base text-white/70 leading-relaxed max-w-2xl">{body}</p>
    </div>
  </div>
);

const BusinessLanding = () => {
  const [form, setForm] = useState({ name: "", business: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.business.trim() || !form.phone.trim()) {
      toast.error("Please fill in name, business, and phone.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: form.name,
        email: null,
        phone: form.phone,
        message: `Business: ${form.business}\nSource: /business (Nest for Business — Book a Strategy Call)`,
        type: "business_strategy_call",
        lead_type: "business_owner",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Got it — Scott will reach out within one business day.");
    } catch (err: any) {
      console.error(err);
      toast.error("Couldn't submit. Please call/text 518-207-9348.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Nest for Business | AI, Automation & Local Search for Capital District Businesses</title>
        <meta
          name="description"
          content="Nest for Business wires AI, automation, and search visibility into your daily operations. Get found on Google and in ChatGPT answers — done with you, not dumped on you."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/business" />
        <meta property="og:title" content="Nest for Business — AI & Search Visibility for Capital District Businesses" />
        <meta property="og:description" content="Get your business found in Google and in AI answers. Done-with-you setup by the team behind Capital District Nest." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.capitaldistrictnest.com/business" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <CleanHeader />

      {/* HERO */}
      <section className="bg-[#0e0f12] text-white pt-24 pb-28 md:pt-32 md:pb-36 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-6 text-[#5eead4]">
            Nest for Business
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
            We built this site. It gets found by Google and ChatGPT.{" "}
            <span className="text-[#5eead4]">Yours can too.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl font-light text-white/70 max-w-3xl mx-auto">
            Nest for Business wires AI, automation, and search visibility directly into your
            daily operations — done with you, not dumped on you.
          </p>
          <div className="mt-10 flex justify-center">
            <CtaButton>Book a Free Strategy Call</CtaButton>
          </div>
        </div>
      </section>

      {/* PROOF PANEL */}
      <section className="bg-[#0B0F19] text-white py-24 md:py-28 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard
              title="Cited by ChatGPT"
              body="Capital District Nest appears in AI search answers when people ask about the region."
            />
            <StatCard
              title="Page 1 Rankings"
              body="We rank on page one for broad Capital District search terms — not just brand-name queries."
            />
            <StatCard
              title="Real Inbound Calls"
              body="Customers who found us through search, not paid ads. That's the whole system."
            />
          </div>
          <p className="mt-10 text-center text-sm md:text-base text-white/55 max-w-2xl mx-auto">
            This isn't theory. It's the exact system running the site you're on right now.
          </p>
        </div>
      </section>

      {/* WHAT WE ACTUALLY DO */}
      <section className="bg-[#0e0f12] text-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
            What we actually do
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-3xl">
            Three things. Done well. In your workflow.
          </h2>

          <div className="mt-14 space-y-5">
            <ServicePanel
              num="01"
              icon={Sparkles}
              title="AI & Search Visibility"
              body="Get your business found in Google AND in AI answers — ChatGPT, Gemini, Perplexity. We call it AEO: Answer Engine Optimization. The playbook we run on this site."
            />
            <ServicePanel
              num="02"
              icon={Wrench}
              title="Done-With-You Integration"
              body="We sit with you and wire the tools into your real workflow. No logins collecting dust, no dashboards you'll never open. If it doesn't fit how you actually work, it doesn't ship."
            />
            <ServicePanel
              num="03"
              icon={MapPin}
              title="Verified Local Partner Listing"
              body="Featured placement in the Capital District Nest directory, in front of people already searching locally for what you offer."
            />
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="bg-[#0B0F19] text-white py-24 md:py-28 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
            Who this is for
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05]">
            Contractors. Restaurants. Salons. Professional services. Retail.
          </h2>
          <p className="mt-8 text-xl md:text-2xl font-light text-white/70">
            If your customers are in the Capital District, this is built for you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["Contractors", "Restaurants", "Salons & Spas", "Professional Services", "Retail"].map(
              (label) => (
                <span
                  key={label}
                  className="px-4 py-2 rounded-full text-sm text-white/80 border border-white/15 bg-white/[0.04]"
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#0e0f12] text-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] max-w-3xl">
            Three steps. No fluff.
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Free Strategy Call",
                body: "We look at where your business shows up (and where it doesn't) and map what would actually move the needle.",
              },
              {
                num: "02",
                title: "Setup & Integration Session",
                body: "We sit down together and wire AI, automation, and search visibility into your day-to-day. You keep everything.",
              },
              {
                num: "03",
                title: "Monthly Optimization + Nest Listing",
                body: "Ongoing tuning as search and AI change, plus your verified placement inside the Capital District Nest directory.",
              },
            ].map((s) => (
              <div
                key={s.num}
                className="rounded-2xl border border-white/10 bg-[#1E2230] p-8"
              >
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-4">
                  Step {s.num}
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA + FORM */}
      <section
        id="business-contact"
        className="bg-[#0B0F19] text-white py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-5 text-[#5eead4]">
            Let's talk
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05]">
            Book a Free Strategy Call
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Drop your info and Scott will reach out within one business day.
          </p>
        </div>

        <div className="max-w-xl mx-auto mt-12">
          {submitted ? (
            <div className="rounded-2xl border border-[#5eead4]/40 bg-[#1E2230] p-10 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#5eead4] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold text-white">You're on the list.</h3>
              <p className="mt-3 text-white/70">
                We'll be in touch within one business day. Prefer to talk now? Call or text{" "}
                <a href="tel:+15185227265" className="text-[#5eead4] underline">
                  (518) 522-7265
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[#1E2230] p-8 space-y-5"
            >
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-white/60 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-white/10 text-white placeholder:text-white/30 focus:border-[#5eead4] focus:outline-none transition"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-white/60 mb-2">
                  Business name
                </label>
                <input
                  type="text"
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-white/10 text-white placeholder:text-white/30 focus:border-[#5eead4] focus:outline-none transition"
                  placeholder="Smith Contracting"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wide uppercase text-white/60 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-white/10 text-white placeholder:text-white/30 focus:border-[#5eead4] focus:outline-none transition"
                  placeholder="(518) 555-0100"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-[#0e0f12] bg-[#5eead4] hover:bg-white disabled:opacity-60 transition"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-white/45 text-center">
                Or call/text directly:{" "}
                <a href="tel:+15185227265" className="text-[#5eead4]">
                  (518) 522-7265
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessLanding;
