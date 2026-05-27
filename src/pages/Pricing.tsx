import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles, Star } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const TEAL = "#5eead4";
const GOLD = "#c9a449";

type Tier = {
  id: "free" | "featured" | "spotlight";
  name: string;
  price: string;
  cadence: string;
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
    name: "Free",
    price: "$0",
    cadence: "always",
    tagline: "Your listing is already live.",
    features: [
      "Standard directory placement",
      "Business name, address & category",
      "Phone number (click-to-call)",
      "Website link",
      "Business hours",
      "Google reviews & rating",
    ],
    cta: "Already Included",
    ctaHref: "/local",
    accent: "rgba(255,255,255,0.12)",
  },
  {
    id: "featured",
    name: "Featured",
    price: "$15",
    cadence: "per month",
    tagline: "Stand out across every town page.",
    features: [
      "Everything in Free",
      "Priority placement in search & directory",
      "“Featured” badge on every card",
      "10-photo gallery",
      "Long-form business description",
      "Social media showcase (Instagram, Facebook, TikTok, X, LinkedIn)",
    ],
    cta: "Upgrade to Featured",
    ctaHref: "mailto:scott@capitaldistrictnest.com?subject=Featured%20Tier%20%E2%80%93%20Capital%20District%20Nest",
    accent: TEAL,
    badge: "Most Popular",
    highlighted: true,
  },
  {
    id: "spotlight",
    name: "Spotlight",
    price: "$50",
    cadence: "per month",
    tagline: "Become the face of your town.",
    features: [
      "Everything in Featured",
      "Monthly feature in the Capital District Nest newsletter",
      "Social media shoutout across our channels",
      "Front-page town dashboard placement",
      "Event & special promotion across the weekly feed",
      "Priority concierge support",
    ],
    cta: "Unlock Spotlight",
    ctaHref: "mailto:scott@capitaldistrictnest.com?subject=Spotlight%20Tier%20%E2%80%93%20Capital%20District%20Nest",
    accent: GOLD,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Pricing | Local Business Solutions — Capital District Nest</title>
        <meta
          name="description"
          content="Free directory placement for every Capital District business. Upgrade to Featured ($15/mo) for priority placement, or Spotlight ($50/mo) for front-page town dashboards and newsletter features."
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
            Three tiers. One simple promise.
          </h1>
          <p className="mt-6 text-lg text-white/65 font-light max-w-2xl mx-auto">
            Every Capital District business is already searchable on Nest, for free. Upgrade only when
            you want to stand out, tell your story, and reach the residents looking for you each week.
          </p>
        </div>
      </section>

      {/* TIERS */}
      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((t) => (
            <article
              key={t.id}
              className={`relative rounded-3xl border bg-white/[0.03] backdrop-blur-xl p-8 md:p-9 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                t.highlighted
                  ? "border-[#5eead4]/45 shadow-[0_30px_70px_-25px_rgba(94,234,212,0.35)]"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {t.badge && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] text-[#0B0F19]"
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
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-semibold tracking-[-0.03em] text-white">
                    {t.price}
                  </span>
                  <span className="text-sm text-white/55">/ {t.cadence}</span>
                </div>
                <p className="mt-3 text-[15px] text-white/70 font-light leading-relaxed">
                  {t.tagline}
                </p>
              </header>

              <ul className="mt-8 space-y-3.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/80">
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
                className={`mt-10 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition ${
                  t.highlighted
                    ? "bg-white text-[#0B0F19] hover:opacity-90"
                    : t.id === "spotlight"
                    ? "text-[#0B0F19] hover:opacity-90"
                    : "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                }`}
                style={t.id === "spotlight" ? { background: GOLD } : undefined}
              >
                {t.id === "featured" && <Sparkles className="w-4 h-4" />}
                {t.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>

        {/* Trust line */}
        <p className="mt-12 text-center text-xs text-white/45 max-w-2xl mx-auto">
          Cancel anytime. No setup fees. Pricing locks in for life on your start date — even if rates change later.
        </p>
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
                q: "What does Featured actually unlock?",
                a: "Priority placement in directory results and town pages, a Featured badge on every card, a 10-photo gallery, long-form description, and a clean social media showcase.",
              },
              {
                q: "When does Spotlight make sense?",
                a: "Spotlight is for businesses that want to be the face of their town — newsletter features, social shoutouts, front-page placement on the town dashboard, and event promotion across the weekly feed.",
              },
              {
                q: "How do I get started?",
                a: "Email Scott directly at scott@capitaldistrictnest.com or call (518) 522-7265. We'll confirm your listing, collect your assets, and activate within 48 hours.",
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
