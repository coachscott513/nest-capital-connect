import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Sparkles,
  BookOpen,
  MapPin,
  BarChart3,
  Wand2,
  ShieldCheck,
  Camera,
  Users,
  Star,
  QrCode,
  Phone,
  Instagram,
  Facebook,
  Compass,
  Globe,
  CheckCircle2,
  X,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { supabase } from "@/integrations/supabase/client";
import { useRegion } from "@/hooks/useRegion";

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
    plan_name: "Free Profile",
    description: "Claim your business and appear across the Nest.",
    monthly_price_cents: 0,
    annual_price_cents: 0,
    features: [
      "Claim your business",
      "Basic listing",
      "Community visibility",
      "Business directory",
      "Contact information",
      "Category placement",
    ],
    sort_order: 1,
  },
  {
    id: "featured",
    plan_key: "featured",
    plan_name: "Featured Partner",
    description: "Everything in Free, plus editorial storytelling and growth tools.",
    monthly_price_cents: 4900,
    annual_price_cents: 47900,
    features: [
      "Editorial feature",
      "Priority placement",
      "Stories",
      "Community collections",
      "Monthly analytics",
      "QR display card",
      "Owner verification",
      "Social promotion",
      "Priority updates",
      "AI business tools",
    ],
    sort_order: 2,
  },
];

const fmt = (cents: number) =>
  cents === 0 ? "$0" : `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;

const trustBadges = [
  "No Anonymous Reviews",
  "Original Editorial Features",
  "Built for Local Businesses",
  "Community Discovery",
  "Measurable Results",
  "Capital District Company",
];

const heroMontage = [
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85", label: "The Roosevelt Room" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85", label: "Iron Gate Café" },
  { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=2400&q=85", label: "Superior Merchandise" },
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2400&q=85", label: "Common Roots" },
];

const discoverySurfaces = [
  "Business Directory",
  "Town Guides",
  "Community Stories",
  "Neighborhood Pages",
  "Local Search",
  "Featured Collections",
];

const whyCards = [
  {
    icon: Compass,
    title: "Be Discovered",
    body: "Appear across town guides, neighborhood pages, category collections, and local search.",
    items: ["Town guides", "Neighborhood pages", "Category collections", "Community pages", "Local search"],
  },
  {
    icon: BookOpen,
    title: "Tell Your Story",
    body: "Beautiful editorial pages that showcase what makes your business unique.",
    items: ["Editorial writing", "Photo galleries", "Owner updates", "Social integration", "Functional CTAs"],
  },
  {
    icon: BarChart3,
    title: "Measure Results",
    body: "Track phone calls, website visits, directions, reservations, and customer engagement.",
    items: ["Phone calls", "Website visits", "Direction requests", "Reservations", "Social clicks", "QR scans"],
  },
  {
    icon: Wand2,
    title: "Grow Smarter",
    body: "Use AI tools, automation, and modern digital workflows to save time and improve customer communication.",
    items: ["Content help", "Customer replies", "Social ideas", "Automation", "Time saved"],
  },
];

const receiveItems = [
  { icon: BookOpen, label: "Premium business page" },
  { icon: Sparkles, label: "Editorial feature" },
  { icon: Users, label: "Community visibility" },
  { icon: Compass, label: "Business categories" },
  { icon: MapPin, label: "Town guides" },
  { icon: Star, label: "Featured collections" },
  { icon: Camera, label: "Stories" },
  { icon: Instagram, label: "Social promotion" },
  { icon: QrCode, label: "QR display card" },
  { icon: ShieldCheck, label: "Owner verification" },
  { icon: BarChart3, label: "Monthly analytics" },
  { icon: CheckCircle2, label: "Priority updates" },
  { icon: Wand2, label: "Future AI tools" },
];

const timeline = [
  "Claim your business.",
  "Tell your story.",
  "Upload photos.",
  "Preview your page.",
  "Our editorial team reviews it.",
  "Your page goes live.",
  "Watch your business grow.",
];

const faqs = [
  { question: "Do you publish reviews?", answer: "No. Capital District Nest does not publish anonymous public reviews or star ratings. We focus on original editorial features that introduce people to great local businesses." },
  { question: "Can I update my page?", answer: "Yes. Verified owners can update their profile, add photos, share updates, and expand their story through our editorial process." },
  { question: "Do I need a website?", answer: "No. Your Capital District Nest page can serve as your primary digital presence with contact buttons, gallery, story, map, and social links." },
  { question: "Can I upload photos?", answer: "Yes. You can upload your own professional photography, and our editorial team helps present it beautifully." },
  { question: "How do Featured Partners work?", answer: "Featured Partners receive an original editorial feature, priority placement across the Nest, monthly analytics, a QR display card, owner verification, and access to future AI business tools." },
  { question: "How are businesses selected?", answer: "Any local business can claim a free profile. Featured Partner spotlights are reviewed by our editorial team for accuracy before publishing." },
  { question: "Can I cancel?", answer: "Yes. You can cancel your Featured Partner subscription at any time. Your free profile remains active." },
  { question: "Will more AI tools be added?", answer: "Yes. We're building supportive AI tools for content, customer communication, and social presence — always in service of your story, never replacing it." },
];

const ForBusinesses = () => {
  const { region } = useRegion();
  const regionSlug = region?.slug ?? "capital-district";
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % heroMontage.length), 7000);
    return () => clearInterval(id);
  }, []);
    (async () => {
      const { data } = await supabase
        .from("subscription_plans")
        .select("id, plan_key, plan_name, description, monthly_price_cents, annual_price_cents, features, sort_order")
        .eq("active", true)
        .eq("region_slug", regionSlug)
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
  }, [regionSlug]);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>For Local Businesses | Capital District Nest</title>
        <meta
          name="description"
          content="Tell your story, grow your business, and become part of the Capital District's trusted local guide. Editorial storytelling, community discovery, and measurable engagement for local businesses."
        />
      </Helmet>
      <CleanHeader />

      {/* HERO */}
      <section className="relative px-6 md:px-10 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=85"
            alt="The Roosevelt Room — a featured Capital District business"
            className="w-full h-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/70 via-[#0B0F19]/85 to-[#0B0F19]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,110,102,0.22),_transparent_60%)]" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#5eead4]" />
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">
              For Local Businesses
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
            Tell your story.
            <br />
            Grow your business.
            <br />
            <span className="text-white/70">Become part of the Capital District's trusted local guide.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Capital District Nest helps local businesses connect with residents, homeowners, visitors, and newcomers through beautiful editorial storytelling, local discovery, measurable engagement, and modern business tools.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/for-businesses/apply"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Claim Your Free Business Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/business/the-roosevelt-room"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-sm font-semibold"
            >
              See a Featured Business
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-10 md:p-14">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
              Built locally. Focused locally.
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              We're building a trusted local platform that helps people discover great businesses — not another anonymous review website.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            {trustBadges.map((b) => (
              <div key={b} className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <CheckCircle2 className="w-4 h-4 text-[#5eead4] flex-shrink-0" />
                <span className="text-sm text-white/85">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="px-6 md:px-10 py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">Why Join</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Why businesses join Capital District Nest.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {whyCards.map(({ icon: Icon, title, body, items }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur p-8 md:p-10"
              >
                <div className="w-11 h-11 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#5eead4]" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-white/65 leading-relaxed">{body}</p>
                <ul className="mt-6 space-y-2">
                  {items.map((it) => (
                    <li key={it} className="flex items-center gap-2.5 text-sm text-white/75">
                      <Check className="w-4 h-4 text-[#5eead4]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="px-6 md:px-10 py-24 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] max-w-3xl mx-auto">
              We don't compete with your business.
              <br />
              <span className="text-white/60">We help people discover it.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Typical review sites</p>
              <ul className="space-y-3">
                {["Anonymous ratings", "Negative review focus", "Competing advertisements", "Lead diversion", "Algorithm chasing"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/60">
                    <X className="w-4 h-4 text-white/30" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[#0d6e66]/40 bg-gradient-to-b from-[#0d6e66]/15 to-white/[0.03] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-[#5eead4] mb-4">Capital District Nest</p>
              <ul className="space-y-3">
                {["Original stories", "Beautiful business pages", "Direct customer connections", "Community discovery", "Local storytelling", "Premium presentation"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/90">
                    <Check className="w-4 h-4 text-[#5eead4]" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* YOUR BUSINESS PAGE MOCKUP */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">Your Business Page</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Magazine-quality presentation.
            </h2>
          </div>
          <Link
            to="/business/the-roosevelt-room"
            className="group block rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-white/20 transition"
          >
            <div className="relative aspect-[16/9] bg-[#0e0f12]">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
                alt="Featured business page preview"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {["Hero", "Gallery", "Editorial", "Social", "Map", "Buttons", "Badges", "Known For", "Owner Verified", "Video", "Monthly Updates"].map((chip) => (
                    <span key={chip} className="text-[11px] px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">The Roosevelt Room</h3>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                    Explore the page <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* WHAT YOU'LL RECEIVE */}
      <section className="px-6 md:px-10 py-24 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">What You'll Receive</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Everything to grow with confidence.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {receiveItems.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-white/20 transition">
                <div className="w-9 h-9 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#5eead4]" />
                </div>
                <p className="text-sm font-medium text-white/90">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL VALUE */}
      <section className="px-6 md:px-10 py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
            One great customer can pay for everything.
          </h2>
          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Capital District Nest is designed to help you measure meaningful customer engagement — not vanity metrics.
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {[
              { icon: Phone, label: "Phone Calls" },
              { icon: Globe, label: "Website Visits" },
              { icon: BookOpen, label: "Reservations" },
              { icon: MapPin, label: "Direction Requests" },
              { icon: Instagram, label: "Social Visits" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <Icon className="w-5 h-5 text-[#5eead4] mx-auto mb-3" />
                <p className="text-xs text-white/70 font-medium">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-xs text-white/40">Illustrative example only. Results vary.</p>
        </div>
      </section>

      {/* EDITORIAL STANDARDS */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur p-10 md:p-14 text-center">
          <ShieldCheck className="w-8 h-8 text-[#5eead4] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">Built on trust.</h2>
          <div className="mt-6 space-y-3 text-white/70 leading-relaxed max-w-2xl mx-auto">
            <p>Every featured business is reviewed for accuracy.</p>
            <p>We do not publish anonymous public reviews.</p>
            <p>We do not fabricate stories. We verify public information.</p>
            <p>Business owners may update and expand their profiles through our editorial process.</p>
            <p className="text-white/90 pt-2 font-medium">Our mission is simple: help people discover exceptional local businesses.</p>
          </div>
        </div>
      </section>

      {/* FEATURED BUSINESS */}
      <section className="px-6 md:px-10 py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">Featured Business</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">See the standard.</h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Explore how Capital District Nest presents local businesses through premium editorial storytelling.
            </p>
          </div>
          <Link
            to="/business/the-roosevelt-room"
            className="group block rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition relative aspect-[21/9]"
          >
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85"
              alt="Roosevelt Room featured cover"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-10 md:p-16">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-3">Editorial Feature</p>
                <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em]">The Roosevelt Room</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                  Explore Roosevelt Room <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">Featured Partner</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">Grow with Capital District Nest.</h2>
            <div className="mt-8 inline-flex items-center rounded-full bg-white/[0.05] border border-white/[0.1] p-1">
              {(["monthly", "annual"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setBilling(k)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition ${
                    billing === k ? "bg-[#0d6e66] text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {k === "monthly" ? "Monthly" : "Annual · Save"}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {plans.map((p, i) => {
              const featured = i === 1;
              const price = billing === "annual" && p.annual_price_cents > 0 ? p.annual_price_cents : p.monthly_price_cents;
              const suffix = p.monthly_price_cents === 0 ? "" : billing === "annual" ? "/year" : "/month";
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
                  {p.description && (
                    <p className="mt-3 text-sm text-white/65 leading-relaxed">{p.description}</p>
                  )}
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold tracking-[-0.02em]">{fmt(price)}</span>
                    {suffix && <span className="text-white/50 text-sm">{suffix}</span>}
                  </div>
                  {billing === "annual" && p.monthly_price_cents > 0 && (
                    <p className="mt-1 text-xs text-[#5eead4]">
                      Save {fmt(p.monthly_price_cents * 12 - p.annual_price_cents)} vs monthly
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

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-10 py-24 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">How It Works</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">Seven simple steps.</h2>
          </div>
          <ol className="space-y-3">
            {timeline.map((step, i) => (
              <li key={step} className="flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                <div className="w-10 h-10 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center text-[#5eead4] font-semibold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-white/90 font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FUTURE DASHBOARD */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] px-3 py-1 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/20">
              Coming Soon
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              Your growth, at a glance.
            </h2>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-12 backdrop-blur">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: BarChart3, label: "Page views", value: "1,284" },
                { icon: Phone, label: "Calls", value: "48" },
                { icon: MapPin, label: "Directions", value: "112" },
                { icon: Globe, label: "Website clicks", value: "203" },
                { icon: BookOpen, label: "Reservations", value: "36" },
                { icon: QrCode, label: "QR scans", value: "89" },
                { icon: Instagram, label: "Instagram clicks", value: "154" },
                { icon: Facebook, label: "Facebook clicks", value: "72" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-4 h-4 text-[#5eead4]" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40">30d</span>
                  </div>
                  <p className="text-2xl font-semibold tracking-tight">{value}</p>
                  <p className="text-xs text-white/50 mt-1">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-xs text-white/40">Preview only. Owner dashboard rolling out to Featured Partners.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} pageUrl={pageUrl} />

      {/* FINAL CTA */}
      <section className="relative px-6 md:px-10 py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(13,110,102,0.25),_transparent_65%)]" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Your story deserves to be discovered.
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Join the growing community of local businesses helping define the Capital District.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/for-businesses/apply"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Claim Free Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/for-businesses/apply?plan=featured"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-sm font-semibold"
            >
              Become a Featured Partner
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForBusinesses;
