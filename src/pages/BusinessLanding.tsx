import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin,
  Search,
  MessageSquare,
  Sparkles,
  Wrench,
  CalendarCheck,
  FileText,
  Bot,
  Building2,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* =============================================================
   /business — Nest for Business
   Local visibility, profile upgrades, contact tools, automation.
   Apple-inspired dark surfaces. Consistent with global tokens.
   ============================================================= */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
    {children}
  </p>
);

const SectionHeader = ({
  eyebrow,
  headline,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  headline: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
}) => (
  <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
    {eyebrow && <div className="mb-5"><Eyebrow>{eyebrow}</Eyebrow></div>}
    <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
      {headline}
    </h2>
    {sub && (
      <p className="mt-6 text-base md:text-lg text-white/70 font-light leading-relaxed">
        {sub}
      </p>
    )}
  </div>
);

const Card = ({
  icon: Icon,
  title,
  body,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) => (
  <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-7 hover:border-[#5eead4]/40 transition">
    {Icon && <Icon className="w-5 h-5 text-[#5eead4] mb-4" />}
    <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
    <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
  </div>
);

const PrimaryBtn = ({
  to,
  href,
  onClick,
  children,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const cn =
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]";
  if (to) return <Link to={to} className={cn} onClick={onClick}>{children} <ArrowRight className="w-4 h-4" /></Link>;
  if (href) return <a href={href} className={cn} onClick={onClick}>{children} <ArrowRight className="w-4 h-4" /></a>;
  return <button onClick={onClick} className={cn}>{children} <ArrowRight className="w-4 h-4" /></button>;
};

const SecondaryBtn = ({
  to,
  href,
  onClick,
  children,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const cn =
    "inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.14] transition";
  if (to) return <Link to={to} className={cn} onClick={onClick}>{children}</Link>;
  if (href) return <a href={href} className={cn} onClick={onClick}>{children}</a>;
  return <button onClick={onClick} className={cn}>{children}</button>;
};

const HELP_OPTIONS = [
  "Claim my business",
  "Fix business information",
  "Featured profile",
  "Better profile/photos/services",
  "Quote or contact form",
  "Booking/calendar setup",
  "Auto-reply templates",
  "AI content help",
  "Workflow/business efficiency help",
  "Not sure",
];

const PRICING = [
  {
    name: "Free Profile",
    price: "$0",
    tag: "Basic presence in the Capital District Nest directory.",
    features: ["Business name", "Category", "Town", "Basic contact when available", "Claim option"],
    cta: { label: "Claim Free Profile", to: "/claim-business" },
  },
  {
    name: "Featured Local Profile",
    price: "$15",
    per: "/month",
    tag: "Priority visibility and a stronger business card.",
    features: ["Featured badge", "Better placement", "Profile photo/logo", "Website/social links", "Call/contact buttons", "Monthly profile updates"],
    cta: { label: "Become Featured", anchor: "#business-help" },
    highlight: true,
  },
  {
    name: "Local Growth Profile",
    price: "$49",
    per: "/month",
    tag: "For businesses that want a stronger local presence.",
    features: ["Enhanced business profile", "Service menu", "Photo gallery", "CTA buttons", "Quote or booking link", "Monthly updates", "Town/category visibility"],
    cta: { label: "Request Growth Profile", anchor: "#business-help" },
  },
  {
    name: "Automation Starter",
    price: "$99",
    per: " setup + $39/mo",
    tag: "Simple customer inquiry tools.",
    features: ["Intake or quote form", "Auto-reply template", "FAQ section", "Booking/contact workflow", "Monthly support/update"],
    cta: { label: "Request Automation Help", anchor: "#business-help" },
  },
  {
    name: "Business Efficiency Package",
    price: "From $199",
    tag: "One-time setup for businesses that need workflow cleanup.",
    features: ["Customer inquiry review", "Service description cleanup", "Response scripts", "AI prompt starter kit", "Follow-up process", "Basic workflow map"],
    cta: { label: "Request Business Help", anchor: "#business-help" },
  },
];

const BusinessLanding = () => {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    town: "",
    category: "",
    website: "",
    help: "",
    profileLink: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.business.trim()) {
      toast.error("Name, business, email, and phone are required.");
      return;
    }
    setSubmitting(true);
    try {
      const message = [
        `Business: ${form.business}`,
        form.town && `Town: ${form.town}`,
        form.category && `Category: ${form.category}`,
        form.website && `Website: ${form.website}`,
        form.help && `Help needed: ${form.help}`,
        form.profileLink && `Current profile: ${form.profileLink}`,
        form.notes && `Notes: ${form.notes}`,
        "Source: /business (Nest for Business — Request Business Help)",
      ].filter(Boolean).join("\n");

      const { error } = await supabase.from("leads").insert({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        type: "business_help_request",
        lead_type: "business_owner",
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Request received — we'll follow up shortly.");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't submit. Please call/text (518) 981-2248.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCn =
    "w-full px-4 py-3 rounded-lg bg-[#0B0F19] border border-white/10 text-white placeholder:text-white/30 focus:border-[#5eead4] focus:outline-none transition";
  const labelCn = "block text-xs font-semibold tracking-wide uppercase text-white/60 mb-2";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Nest for Business | Local Visibility & Business Tools · Capital District Nest</title>
        <meta
          name="description"
          content="Capital District Nest helps local businesses get found locally, respond faster, and run smoother — profile upgrades, contact tools, and simple automation."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/business" />
        <meta property="og:title" content="Nest for Business — Capital District Nest" />
        <meta property="og:description" content="Local search visibility, business profile upgrades, and simple automation for Capital District businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.capitaldistrictnest.com/business" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <CleanHeader />

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 30%, rgba(94,234,212,0.12), transparent 65%), radial-gradient(45% 60% at 15% 85%, rgba(13,110,102,0.18), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28 text-center">
          <Eyebrow>Local Search · AI Tools · Business Automation</Eyebrow>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#5eead4]/30 bg-[#5eead4]/[0.06] px-4 py-1.5 text-xs md:text-sm font-medium tracking-tight text-[#5eead4]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
            Your local AI growth partner.
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-[5rem] font-semibold tracking-[-0.045em] leading-[1.02] text-white">
            Get found locally.<br className="hidden sm:block" /> Respond faster.{" "}
            <span className="text-[#5eead4]">Run smoother.</span>
          </h1>
          <p className="mt-7 text-base md:text-xl text-white/75 font-light leading-relaxed max-w-3xl mx-auto">
            Capital District Nest helps local businesses improve visibility, claim and upgrade their profile, automate simple customer tasks, and use practical AI tools to save time.
          </p>
          <p className="mt-5 text-sm md:text-base text-white/55 max-w-2xl mx-auto">
            We're a local startup building better local search for the Capital District — helping residents discover businesses, services, events, homes, and community resources by town.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PrimaryBtn to="/claim-business">Claim Your Business</PrimaryBtn>
            <SecondaryBtn href="#business-help">Get Business Help</SecondaryBtn>
          </div>
        </div>
      </section>

      {/* MODERN TOOLS */}
      <section className="bg-[#0e0f12] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What we do"
            headline={<>Modern tools for <span className="text-[#5eead4]">local businesses.</span></>}
            sub="Most local businesses do not need more complicated software. They need better visibility, cleaner contact paths, and simple systems that save time."
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card icon={Search} title="Local Visibility" body="Show up inside Capital District Nest town pages, category searches, business cards, and local discovery pages." />
            <Card icon={Building2} title="Better Business Profiles" body="Claim your profile, correct contact information, add photos, services, website links, social links, hours, and calls to action." />
            <Card icon={MessageSquare} title="Customer Inquiry Tools" body="Add quote requests, appointment links, contact forms, booking links, FAQs, and simple customer intake." />
            <Card icon={Sparkles} title="Simple Automation" body="Use auto-replies, follow-up messages, AI-assisted content, review response templates, and workflow shortcuts." />
          </div>
        </div>
      </section>

      {/* HOW SEARCH IS CHANGING */}
      <section className="bg-[#0B0F19] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Why now"
            headline={<>Local customers search <span className="text-[#5eead4]">differently now.</span></>}
            sub={<>People are no longer only searching for a business name. They are asking for local services, nearby recommendations, town-specific options, and fast answers.<br />Capital District Nest is being built to help local businesses appear where these community searches begin.</>}
          />
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            <Card icon={MapPin} title="People search by town" body="Customers look for services in Delmar, Albany, Troy, Saratoga, Schenectady, Clifton Park, and surrounding communities." />
            <Card icon={MessageSquare} title="Customers want fast contact" body="If your phone, website, booking link, or service information is missing, customers move on." />
            <Card icon={Bot} title="AI search is changing discovery" body="Business information needs to be clean, structured, accurate, and easy for search engines and AI tools to understand." />
          </div>
        </div>
      </section>

      {/* BASIC vs ENHANCED */}
      <section className="bg-[#0e0f12] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Upgrade your profile"
            headline={<>Turn a basic listing into a <span className="text-[#5eead4]">real business profile.</span></>}
            sub="Your free profile gives you presence. Upgrades help customers understand, trust, and contact your business faster."
          />

          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8">
              <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/50 mb-4">Basic profile</div>
              <ul className="space-y-3 text-sm text-white/70">
                {["Business name","Category","Town","Basic contact if available","Unclaimed badge"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-br from-[#1E2230] to-[#0B0F19] p-8">
              <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-4">Enhanced profile</div>
              <ul className="grid grid-cols-1 gap-3 text-sm text-white/85">
                {["Logo or photo","Verified contact information","Service menu","Website and social links","Business hours","Quote request form","Booking link","Photo gallery","Featured placement","AI-friendly description","Customer CTA buttons"].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 text-center">
            <PrimaryBtn to="/claim-business">Claim or Upgrade Your Profile</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* BUSINESS HELP */}
      <section id="business-help" className="bg-[#0B0F19] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04] scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Business help"
            headline={<>Need help making your business <span className="text-[#5eead4]">easier to run?</span></>}
            sub="Capital District Nest can help local businesses organize customer inquiries, improve profile content, create simple forms, and use AI tools for everyday tasks."
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card icon={Wrench} title="Profile Cleanup" body="Fix incorrect contact information, improve your description, add service areas, photos, links, and customer CTAs." />
            <Card icon={FileText} title="Quote Request Forms" body="Create simple forms so customers can request estimates, appointments, or service information." />
            <Card icon={MessageSquare} title="Auto-Reply Templates" body="Set up simple response templates for missed calls, quote requests, emails, and social media messages." />
            <Card icon={Bot} title="AI Content Help" body="Use AI to write service descriptions, social posts, FAQs, review responses, and customer messages." />
            <Card icon={CalendarCheck} title="Booking / Calendar Setup" body="Add booking links, appointment requests, consultation forms, or callback scheduling." />
            <Card icon={Sparkles} title="Workflow Cleanup" body="Organize how customer inquiries come in, how you follow up, and how you track opportunities." />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[#0e0f12] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Packages"
            headline={<>Simple local business <span className="text-[#5eead4]">packages.</span></>}
            sub="Start free. Upgrade when you want more visibility, better contact tools, or hands-on help."
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl border p-7 flex flex-col ${
                  p.highlight
                    ? "border-[#5eead4]/40 bg-gradient-to-br from-[#1E2230] to-[#0B0F19]"
                    : "border-white/10 bg-[#1E2230]"
                }`}
              >
                <div className="text-sm font-semibold text-white tracking-tight">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-white tracking-tight">{p.price}</span>
                  {p.per && <span className="text-sm text-white/50">{p.per}</span>}
                </div>
                <p className="mt-3 text-sm text-white/65 leading-relaxed">{p.tag}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/75 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  {p.cta.to ? (
                    <Link
                      to={p.cta.to}
                      className="inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
                    >
                      {p.cta.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={p.cta.anchor}
                      className="inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full bg-white/[0.08] border border-white/20 text-white text-sm font-semibold hover:bg-white/[0.16] transition"
                    >
                      {p.cta.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-white/45">
            Pricing is editable and may be adjusted as packages evolve.
          </p>
        </div>
      </section>

      {/* BUILT FOR REAL BUSINESSES */}
      <section className="bg-[#0B0F19] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Who it's for" headline={<>Built for <span className="text-[#5eead4]">real local businesses.</span></>} />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card title="Contractor" body="Add services, quote request form, service areas, photos, and follow-up messages." />
            <Card title="Restaurant" body="Add menu links, hours, order/reservation buttons, social links, and event updates." />
            <Card title="Salon / Spa" body="Add booking link, service menu, photos, social links, and client FAQ." />
            <Card title="Nonprofit / Club" body="Fix contact info, add event links, membership info, donation links, and claim profile." />
            <Card title="Professional Service" body="Add consultation form, service descriptions, scheduling link, and local category visibility." />
            <Card title="Home Service" body="Add service areas, before/after photos, estimate request form, and response templates." />
          </div>
        </div>
      </section>

      {/* REQUEST BUSINESS HELP FORM */}
      <section id="business-contact" className="bg-[#0e0f12] py-24 md:py-32 px-6 md:px-10 border-t border-white/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>Request help</Eyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
            Request business help.
          </h2>
          <p className="mt-6 text-lg text-white/70 font-light">
            Tell us what you want to improve. We'll review your business profile and follow up with next steps.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-12">
          {submitted ? (
            <div className="rounded-2xl border border-[#5eead4]/40 bg-[#1E2230] p-10 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#5eead4] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold text-white">Thanks — we've got your request.</h3>
              <p className="mt-3 text-white/70">
                Capital District Nest received your request. We'll review your business profile and follow up with next steps.
                {" "}Prefer to talk now? Call or text{" "}
                <a href="tel:+15189812248" className="text-[#5eead4] underline">(518) 981-2248</a>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 md:p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCn}>Name *</label>
                  <input required className={inputCn} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
                </div>
                <div>
                  <label className={labelCn}>Business name *</label>
                  <input required className={inputCn} value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} placeholder="Smith Contracting" />
                </div>
                <div>
                  <label className={labelCn}>Email *</label>
                  <input required type="email" className={inputCn} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@business.com" />
                </div>
                <div>
                  <label className={labelCn}>Phone *</label>
                  <input required type="tel" className={inputCn} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(518) 555-0100" />
                </div>
                <div>
                  <label className={labelCn}>Town</label>
                  <input className={inputCn} value={form.town} onChange={(e) => setForm({ ...form, town: e.target.value })} placeholder="Delmar" />
                </div>
                <div>
                  <label className={labelCn}>Business category</label>
                  <input className={inputCn} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Contractor" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCn}>Website</label>
                  <input className={inputCn} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCn}>What do you need help with?</label>
                  <select
                    className={inputCn}
                    value={form.help}
                    onChange={(e) => setForm({ ...form, help: e.target.value })}
                  >
                    <option value="">Select an option…</option>
                    {HELP_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelCn}>Current profile link (if available)</label>
                  <input className={inputCn} value={form.profileLink} onChange={(e) => setForm({ ...form, profileLink: e.target.value })} placeholder="https://" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCn}>Notes</label>
                  <textarea rows={4} className={inputCn} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Anything else we should know" />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-white bg-[#0d6e66] hover:opacity-90 disabled:opacity-60 transition"
              >
                {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>) : (<>Request Business Help <ArrowRight className="w-4 h-4" /></>)}
              </button>
              <p className="text-xs text-white/45 text-center">
                Or call/text directly:{" "}
                <a href="tel:+15189812248" className="text-[#5eead4]">(518) 981-2248</a>
              </p>
            </form>
          )}
        </div>

        <p className="max-w-3xl mx-auto mt-14 text-xs text-white/45 text-center leading-relaxed">
          Capital District Nest is a local media, directory, advertising, and community search platform. Business profile upgrades, featured placements, and automation assistance are marketing and business-support services. Capital District Nest does not guarantee search rankings, leads, sales, or customer outcomes.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessLanding;
