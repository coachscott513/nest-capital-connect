import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Sparkles, Star, Crown, Video, Camera, Share2, QrCode } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const TEAL = "#5eead4";
const GOLD = "#c9a449";
const PLATINUM = "#e5e4e2";

type Tier = {
  id: "free" | "featured" | "premier" | "spotlight";
  name: string;
  price: string;
  cadence: string;
  setup?: string;
  tagline: string;
  features: string[];
  cta: string;
  ctaHref: string;
  accent: string;
  badge?: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    id: "free",
    name: "Free Listing",
    price: "$0",
    cadence: "always",
    tagline: "Basic directory presence — already live for every Capital District business.",
    features: [
      "Business name, category & town",
      "Phone with click-to-call",
      "Website link",
      "Basic search visibility",
    ],
    cta: "Review Your Listing",
    ctaHref: "/claim-business?tier=free",
    accent: "rgba(255,255,255,0.55)",
  },
  {
    id: "featured",
    name: "Featured Listing",
    price: "$15",
    cadence: "per month",
    tagline: "The simple upgrade — better visibility across search and town pages.",
    features: [
      "Everything in Free",
      "Featured badge",
      "Priority placement in category & town search",
      "Larger card in search results",
      "Basic description",
      "Basic photo / logo",
    ],
    cta: "Get Featured",
    ctaHref: "/claim-business?tier=featured",
    accent: TEAL,
    badge: "Easy Yes",
  },
  {
    id: "premier",
    name: "Premier Business Page",
    price: "$25",
    cadence: "per month",
    setup: "+ $25 one-time setup",
    tagline: "A full business page that works like a mini website inside Nest.",
    features: [
      "Everything in Featured",
      "Full business profile page",
      "Photos & logo gallery",
      "Services list",
      "Long-form business description",
      "Call, text, email & website buttons",
      "Request a Quote / contact button",
      "Shareable profile link",
      "Events & specials submission",
      "Basic ongoing updates included",
    ],
    cta: "Build My Business Page",
    ctaHref: "/claim-business?tier=premier",
    accent: TEAL,
    badge: "Most Popular",
    highlighted: true,
  },
  {
    id: "spotlight",
    name: "Spotlight Partner",
    price: "$50",
    cadence: "per month",
    tagline: "Premium visibility for businesses that want more local attention.",
    features: [
      "Everything in Premier",
      "Higher category & town placement",
      "Featured partner card",
      "Local Pulse mention",
      "Events & specials promotion",
      "Newsletter / homepage section consideration",
    ],
    cta: "Request Spotlight",
    ctaHref: "/claim-business?tier=spotlight",
    accent: GOLD,
  },
];


const addOns = [
  { name: "Premium Video Production", price: "$150", icon: Video, desc: "Cinematic 60-second showcase, edited & delivered." },
  { name: "Professional On-Site Photo Shoot", price: "$100", icon: Camera, desc: "Editorial photography of your space & team." },
  { name: "Social Media Content Pack", price: "$50", icon: Share2, desc: "10 ready-to-post assets sized for every platform." },
  { name: "QR Code In-Store Display Kit", price: "$25", icon: QrCode, desc: "Printed table tents driving customers to your Nest profile." },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Pricing | Local Business Solutions — Capital District Nest</title>
        <meta
          name="description"
          content="Free directory listing for every Capital District business. Featured Business Page $25 setup + $25/mo, Spotlight $50/mo, Anchor Partner $100–150/mo (application-based)."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/pricing" />
      </Helmet>

      <CleanHeader />

      {/* HERO */}
      <section className="relative px-6 md:px-10 pt-24 md:pt-32 pb-16 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 0%, rgba(94,234,212,0.16) 0%, rgba(11,15,25,0) 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: TEAL }}>
            Local Business Solutions
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02] text-white">
            Free to be listed. $15 to stand out. $25 for a full business page.
          </h1>
          <p className="mt-6 text-lg text-white/65 font-light max-w-2xl mx-auto">
            Every Capital District business is already searchable on Nest, for free. Upgrade to a
            Featured Listing for better visibility, or to a Premier Business Page that works like a
            mini website inside Nest.
          </p>
        </div>

      </section>

      {/* TIERS */}
      <section className="px-6 md:px-10 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {tiers.map((t) => (
            <article
              key={t.id}
              className={`relative rounded-3xl border bg-white/[0.03] backdrop-blur-xl p-7 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                t.highlighted
                  ? "border-[#5eead4]/45 shadow-[0_30px_70px_-25px_rgba(94,234,212,0.35)]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {t.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B0F19] whitespace-nowrap"
                  style={{ background: t.accent }}
                >
                  <Star className="w-3 h-3 fill-current" /> {t.badge}
                </span>
              )}

              <header>
                <p
                  className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-3"
                  style={{ color: t.accent }}
                >
                  {t.name}
                </p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-white">
                    {t.price}
                  </span>
                  <span className="text-sm text-white/55">/ {t.cadence}</span>
                </div>
                {t.setup && (
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: t.accent }}>
                    {t.setup}
                  </p>
                )}
                <p className="mt-3 text-[14px] text-white/70 font-light leading-relaxed min-h-[42px]">
                  {t.tagline}
                </p>
              </header>

              <ul className="mt-7 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[13.5px] text-white/80">
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: t.accent }}
                      strokeWidth={2.5}
                    />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={t.ctaHref}
                className={`mt-8 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-[13px] font-semibold transition ${
                  t.highlighted
                    ? "bg-white text-[#0B0F19] hover:opacity-90"
                    : t.id === "spotlight"
                    ? "text-[#0B0F19] hover:opacity-90"
                    : "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                }`}
                style={t.id === "spotlight" ? { background: GOLD } : undefined}
              >
                {(t.id === "featured" || t.id === "premier") && <Sparkles className="w-4 h-4" />}
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>

        {/* ANCHOR — application strip */}
        <div className="max-w-7xl mx-auto mt-6">
          <article
            className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.02] backdrop-blur-xl p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-7"
          >
            <span
              className="absolute -top-3 left-7 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
              style={{ background: PLATINUM, color: "#0B0F19" }}
            >
              <Crown className="w-3 h-3" /> Enterprise · Anchor Partner
            </span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-white">
                  $100–$150
                </span>
                <span className="text-sm text-white/55">/ month · application-based</span>
              </div>
              <p className="mt-3 text-[15px] text-white/75 font-light leading-relaxed max-w-2xl">
                Own your category or become a major local sponsor. Everything in Spotlight, plus
                homepage hero rotation, category sponsorship, town sponsorship, competitor lockout
                where available, custom campaigns, and concierge setup.
              </p>
            </div>
            <a
              href="/claim-business?tier=anchor"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap hover:opacity-90 transition"
              style={{ background: PLATINUM, color: "#0B0F19" }}
            >
              <Crown className="w-4 h-4" /> Apply as Anchor Partner
              <ArrowRight className="w-4 h-4" />
            </a>
          </article>
        </div>

        <p className="mt-12 text-center text-xs text-white/45 max-w-2xl mx-auto">
          Cancel anytime. The one-time $25 setup on Premier Business Page covers the manual profile build. Monthly pricing locks in for life on your start date — even if rates change later.
        </p>

      </section>


      {/* ADD-ONS */}
      <section className="border-t border-white/[0.06] px-6 md:px-10 py-20 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4" style={{ color: GOLD }}>
              One-Time Business Accelerators
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white">
              Bolt-on production services.
            </h2>
            <p className="mt-4 text-white/60 font-light">
              Studio-grade assets, delivered by our team. Add to any tier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((a) => {
              const Icon = a.icon;
              return (
                <article
                  key={a.name}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-white/20 hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(201,164,73,0.12)", color: GOLD }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white leading-tight">{a.name}</h3>
                  <p className="mt-2 text-[13px] text-white/55 font-light leading-relaxed">{a.desc}</p>
                  <div className="mt-5 flex items-baseline justify-between">
                    <span className="text-2xl font-semibold tracking-[-0.02em] text-white">{a.price}</span>
                    <a
                      href={`/claim-business?addon=${encodeURIComponent(a.name)}`}
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] hover:opacity-70 transition"
                      style={{ color: GOLD }}
                    >
                      Add →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-6 md:px-10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-semibold tracking-[0.26em] uppercase mb-4 text-center" style={{ color: TEAL }}>
            Common Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white text-center">
            Straight answers, no fine print.
          </h2>

          <div className="mt-12 space-y-6">
            {[
              {
                q: "Do I have to pay to appear on Capital District Nest?",
                a: "No. Every legitimate Capital District business is already indexed for free with name, address, phone, website, hours, and category. You only pay when you want to stand out.",
              },
              {
                q: "What does Spotlight unlock that Featured doesn't?",
                a: "Spotlight stacks on top of a Featured Business Page with higher category and town placement, specials and events promotion, an unlimited photo gallery, newsletter spotlights, and priority review for homepage placement. Featured already gives you the full polished profile page — Spotlight is for businesses that want maximum local visibility.",
              },
              {
                q: "What is the Anchor tier and why is it limited?",
                a: "Anchor is a category sponsorship — one business per category, per town. You own the homepage hero rotation, the “Plumbers sponsored by…” banner, and lock your top competitors out of that placement. Apply early; once a category is claimed for your town, it's gone.",
              },
              {
                q: "How do I get started?",
                a: "Email Scott directly at team@capitaldistrictnest.com or call/text 518-207-9348. We'll confirm your listing, collect your assets, and activate within 48 hours.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 open:border-white/20 transition"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-base md:text-lg font-medium text-white">{item.q}</span>
                  <span
                    className="ml-4 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/70 group-open:rotate-45 transition-transform"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm md:text-[15px] text-white/65 font-light leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="border-t border-white/[0.06] px-6 md:px-10 py-24 md:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-8 h-8 mx-auto mb-6" style={{ color: TEAL }} />
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] text-white">
            Ready to upgrade?
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/65 leading-relaxed">
            Talk to Scott directly — no forms, no funnels. We'll get you live this week.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:scott@capitaldistrictnest.com?subject=Local%20Business%20Solutions%20%E2%80%93%20Capital%20District%20Nest"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
            >
              Email Scott <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+15185227265"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.04] text-white text-sm font-semibold hover:bg-white/[0.08] transition"
            >
              Call (518) 522-7265
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
