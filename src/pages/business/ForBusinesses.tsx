import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Sparkles, BookOpen, MapPin, Wand2 } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type Plan = {
  id: string;
  plan_key: string;
  plan_name: string;
  description: string | null;
  monthly_price_cents: number;
  annual_price_cents: number;
  features: string[];
  sort_order: number;
};

const fallbackPlans: Plan[] = [
  {
    id: "essential",
    plan_key: "essential",
    plan_name: "Essential Registry",
    description: "Free business profile in the Capital District Nest registry.",
    monthly_price_cents: 0,
    annual_price_cents: 0,
    features: [
      "Business Profile",
      "Contact Information",
      "Google Maps",
      "Category Listing",
      "Community Discovery",
      "Business Search",
    ],
    sort_order: 1,
  },
  {
    id: "featured",
    plan_key: "featured",
    plan_name: "Featured Partner",
    description: "Editorial Spotlight, featured placement, and monthly analytics.",
    monthly_price_cents: 4900,
    annual_price_cents: 47900,
    features: [
      "Everything in Essential",
      "Spotlight Editorial",
      "Featured Placement",
      "Community Collections",
      "QR Display Card",
      "Monthly Analytics",
      "Priority Updates",
      "Owner Verification",
    ],
    sort_order: 2,
  },
];

const fmt = (cents: number) =>
  cents === 0 ? "$0" : `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

const ForBusinesses = () => {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("subscription_plans")
        .select("id, plan_key, plan_name, description, monthly_price_cents, annual_price_cents, features, sort_order")
        .eq("active", true)
        .eq("region_slug", "capital-district")
        .order("sort_order");
      if (data && data.length) {
        setPlans(
          data.map((p: any) => ({
            ...p,
            features: Array.isArray(p.features) ? p.features : [],
          })),
        );
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>For Businesses | Capital District Nest</title>
        <meta
          name="description"
          content="Join the Capital District's curated guide to exceptional local businesses. Beautiful editorial storytelling — no anonymous reviews, no algorithm chasing."
        />
      </Helmet>
      <CleanHeader />

      {/* HERO */}
      <section className="relative px-6 md:px-10 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(13,110,102,0.18),_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#5eead4]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
              Capital District Nest for Business
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
            Tell your story.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Join the Capital District's curated guide to exceptional local businesses.
            No anonymous reviews. No algorithm chasing. No crowded directories. Just
            beautiful editorial storytelling that helps local residents discover great
            businesses.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/for-businesses/apply"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/business/the-roosevelt-room"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-sm font-semibold"
            >
              View a Featured Business
            </Link>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: BookOpen, title: "Own your story", body: "Magazine-quality business profiles built around your story instead of anonymous ratings." },
            { icon: MapPin, title: "Reach local residents", body: "Be discovered by people exploring neighborhoods, communities, restaurants, contractors, and local businesses." },
            { icon: Wand2, title: "Easy setup", body: "One guided questionnaire. Upload your favorite photos. Our editorial team handles the rest." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur">
              <div className="w-10 h-10 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-[#5eead4]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="px-6 md:px-10 py-24 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
            We believe local businesses deserve better.
          </h2>
          <div className="mt-8 space-y-4 text-white/70 text-lg leading-relaxed font-light">
            <p>Capital District Nest is not a review website.</p>
            <p>We don't publish anonymous ratings. We don't reward outrage.</p>
            <p>
              We create beautiful editorial features that introduce people to the
              businesses shaping our communities.
            </p>
            <p className="text-white/50 text-sm pt-4">
              Every published feature is reviewed for quality and accuracy before going live.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
              Plans
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Simple, honest pricing.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {plans.map((p, i) => {
              const featured = i === 1;
              return (
                <div
                  key={p.id}
                  className={`rounded-3xl p-8 md:p-10 border backdrop-blur relative ${
                    featured
                      ? "bg-gradient-to-b from-[#0d6e66]/20 to-white/[0.03] border-[#0d6e66]/40"
                      : "bg-white/[0.03] border-white/[0.08]"
                  }`}
                >
                  {featured && (
                    <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-[#0d6e66] text-white text-[10px] font-semibold tracking-[0.18em] uppercase">
                      Recommended
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold tracking-tight">{p.plan_name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold tracking-[-0.02em]">
                      {fmt(p.monthly_price_cents)}
                    </span>
                    {p.monthly_price_cents > 0 && (
                      <span className="text-white/50 text-sm">/month</span>
                    )}
                  </div>
                  {p.annual_price_cents > 0 && (
                    <p className="mt-1 text-xs text-white/50">
                      or {fmt(p.annual_price_cents)} annually
                    </p>
                  )}
                  {p.description && (
                    <p className="mt-4 text-sm text-white/65 leading-relaxed">
                      {p.description}
                    </p>
                  )}
                  <ul className="mt-6 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check className="w-4 h-4 text-[#5eead4] mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/for-businesses/apply?plan=${p.plan_key}`}
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold transition ${
                      featured
                        ? "bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white"
                        : "border border-white/20 hover:border-white/40 bg-white/[0.04]"
                    }`}
                  >
                    {featured ? "Become a Featured Partner" : "Claim Free Profile"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SHOW THE STANDARD */}
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              See what's possible.
            </h2>
          </div>
          <Link
            to="/business/the-roosevelt-room"
            className="group block rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#0d6e66]/10 via-white/[0.02] to-white/[0.04] hover:border-white/20 transition"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
                  Featured Spotlight
                </span>
                <h3 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                  The Roosevelt Room
                </h3>
                <p className="mt-4 text-white/65 leading-relaxed">
                  A full editorial feature — story, photography, what to order, the
                  team, and the details. This is what a Featured Partner profile
                  looks like on Capital District Nest.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                  View feature <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="relative min-h-[280px] md:min-h-[380px] bg-[#0e0f12]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Featured business spotlight preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                  loading="lazy"
                />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForBusinesses;
