import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  LayoutDashboard,
  MapPin,
  Megaphone,
  MessageSquare,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import rooseveltHero from "@/assets/roosevelt-room-hero.png.asset.json";
import cassoneHero from "@/assets/cassone-hero.jpg.asset.json";

const APPLY_URL = "/for-businesses/apply";
const PRICING_URL = "/pricing";

// Warm editorial white — Apple-style, never pure #fff.
const PAPER = "#F6F5F2";
const INK = "#0e0f12";
const TEAL = "#0d6e66";
const TEAL_ACCENT = "#0d6e66";

const trustBadges = [
  "Free profile available",
  "Editorial-first approach",
  "No anonymous reviews",
  "Functional business tools",
  "Built for local discovery",
  "Owner controlled profile",
];

/* ============================================================
   EDITORIAL SHOWCASE
   Replaces the four equal capability cards.
   Each entry is its own "product announcement" — one huge image,
   one sentence, one Learn More. Horizontally scrollable.
   ============================================================ */
const showcase = [
  {
    eyebrow: "Editorial Spotlight",
    title: "A page that finally does your business justice.",
    body: "Not a listing. A story. Photography, voice, and craft — presented the way great magazines present great brands.",
    href: "/business/the-roosevelt-room",
    cta: "See The Roosevelt Room",
    image: rooseveltHero.url,
    tone: "dark" as const,
  },
  {
    eyebrow: "Local Discovery",
    title: "Show up where your neighbors are already looking.",
    body: "Appear inside the Capital District's own answer engine — town guides, category pages, and weekly features people actually read.",
    href: "/local",
    cta: "Explore Local",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=85",
    tone: "dark" as const,
  },
  {
    eyebrow: "Built For Every Business",
    title: "From family restaurants to industrial suppliers.",
    body: "Whether you serve a table of two or a 400-unit job site, your spotlight speaks the language of your customer.",
    href: "/business/cassone",
    cta: "See Cassone",
    image: cassoneHero.url,
    tone: "dark" as const,
  },
  {
    eyebrow: "Owner Control",
    title: "You approve every word. Every photo. Every time.",
    body: "No anonymous reviews. No surprise edits. Your voice, verified — and yours to change when the business does.",
    href: APPLY_URL,
    cta: "Claim Your Profile",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
    tone: "dark" as const,
  },
];

const howItWorks = [
  { title: "Claim", body: "Create or claim your profile." },
  { title: "Share", body: "Answer a short questionnaire and upload photos." },
  { title: "Launch", body: "We publish your profile and continue building tools to help you grow." },
];

const upcomingFeatures = [
  { icon: BarChart3, label: "Monthly engagement reports" },
  { icon: Wand2, label: "AI writing assistant" },
  { icon: LayoutDashboard, label: "Business dashboard" },
  { icon: Megaphone, label: "Seasonal promotional tools" },
  { icon: MessageSquare, label: "Customer messaging tools" },
  { icon: CalendarDays, label: "Appointment automation" },
];

const faqs = [
  { question: "Do you publish reviews?", answer: "No. Capital District Nest does not publish anonymous public reviews or star ratings. We focus on original editorial features that introduce people to great local businesses." },
  { question: "Can I update my page?", answer: "Yes. Verified owners can update their profile, add photos, share updates, and expand their story through our editorial process." },
  { question: "Do I need a website?", answer: "No. Your Capital District Nest page can serve as your primary digital presence with contact buttons, gallery, story, map, and social links." },
  { question: "Can I upload photos?", answer: "Yes. You can upload your own photography, and our editorial team helps present it beautifully." },
  { question: "How are businesses selected?", answer: "Any local business can claim a free profile. Featured editorial profiles are reviewed by our team for accuracy before publishing." },
  { question: "Will more tools be added?", answer: "Yes. We're building supportive AI tools for content, customer communication, and analytics. New features will roll out to profiles as they become available." },
];

/* ============================================================
   Floating browser window — Apple-style product mockup.
   Shows a real Capital District Nest spotlight page (Roosevelt Room).
   ============================================================ */
const BrowserMockup = () => (
  <div className="relative">
    {/* Ambient glow behind the window */}
    <div
      className="absolute -inset-10 rounded-[48px] blur-3xl opacity-60 pointer-events-none"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 40%, rgba(13,110,102,0.18), transparent 70%), radial-gradient(50% 50% at 80% 90%, rgba(201,164,73,0.12), transparent 70%)",
      }}
    />
    <div
      className="relative rounded-[22px] overflow-hidden border border-black/10 bg-white"
      style={{ boxShadow: "0 40px 100px -20px rgba(14,15,18,0.35), 0 12px 30px -12px rgba(14,15,18,0.15)" }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.06] bg-[#FAFAF8]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <div className="flex-1 flex justify-center">
          <div className="text-[11px] tracking-tight text-black/50 px-3 py-1 rounded-md bg-black/[0.04]">
            capitaldistrictnest.com/business/the-roosevelt-room
          </div>
        </div>
      </div>
      {/* Content preview — the actual Roosevelt Room hero */}
      <div className="relative aspect-[4/3] bg-[#0B0F19] overflow-hidden">
        <img
          src={rooseveltHero.url}
          alt="Capital District Nest spotlight page for The Roosevelt Room"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/40 via-transparent to-[#0B0F19]/70" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
            Capital District Nest · Spotlight
          </p>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em]">
            The Roosevelt Room
          </h3>
          <p className="mt-1 text-xs md:text-sm text-white/75">North Greenbush, NY</p>
        </div>
      </div>
    </div>

    {/* Floating secondary card — Cassone peek */}
    <div
      className="hidden md:block absolute -bottom-10 -left-14 w-56 rounded-2xl overflow-hidden border border-black/10 bg-white rotate-[-4deg]"
      style={{ boxShadow: "0 30px 60px -20px rgba(14,15,18,0.35)" }}
    >
      <div className="aspect-[4/3] relative">
        <img src={cassoneHero.url} alt="Cassone spotlight preview" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/70 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 text-white">
          <p className="text-[9px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">Spotlight</p>
          <p className="text-sm font-semibold tracking-tight">Cassone</p>
        </div>
      </div>
    </div>
  </div>
);

const ForBusinesses = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>For Local Businesses | Capital District Nest</title>
        <meta
          name="description"
          content="Imagine your business presented with the care of a magazine feature. Capital District Nest builds editorial spotlights, local discovery, and owner-controlled profiles for Capital District businesses."
        />
      </Helmet>
      <CleanHeader />

      {/* =========================================================
          HERO — Apple-style, warm editorial white, split layout.
          Left: emotional copy + primary/secondary CTAs.
          Right: floating browser mockup showing a real spotlight.
          ========================================================= */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40 pb-24 md:pb-32 px-6 md:px-10"
        style={{ background: PAPER, color: INK }}
      >
        {/* Very subtle warm wash to keep it from feeling flat */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.5]"
          style={{
            background:
              "radial-gradient(70% 60% at 15% 20%, rgba(13,110,102,0.06), transparent 70%), radial-gradient(60% 60% at 100% 100%, rgba(201,164,73,0.06), transparent 70%)",
          }}
        />

        <div className="relative max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-center">
          {/* LEFT */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase" style={{ color: TEAL }}>
              For Local Businesses
            </p>
            <h1
              className="mt-6 text-[44px] md:text-[68px] lg:text-[80px] font-semibold tracking-[-0.04em] leading-[0.98]"
              style={{ color: INK }}
            >
              Imagine your business
              <br />
              <span style={{ color: TEAL }}>looking like this.</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl font-light leading-relaxed max-w-xl" style={{ color: "rgba(14,15,18,0.68)" }}>
              We don't create listings. We tell stories. A Capital District Nest spotlight
              is a magazine feature for your business — presented with the care your work
              deserves.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to={APPLY_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: TEAL, boxShadow: "0 12px 30px -12px rgba(13,110,102,0.55)" }}
              >
                Tell Your Story <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={PRICING_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition"
                style={{ color: INK, border: "1px solid rgba(14,15,18,0.15)" }}
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 text-[13px]" style={{ color: "rgba(14,15,18,0.55)" }}>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: TEAL }} /> Free profile available</div>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: TEAL }} /> Owner controlled</div>
              <span className="hidden md:block w-1 h-1 rounded-full bg-black/20" />
              <div className="hidden md:flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: TEAL }} /> No anonymous reviews</div>
            </div>
          </div>

          {/* RIGHT — floating browser window */}
          <div className="relative">
            <BrowserMockup />
          </div>
        </div>
      </section>

      {/* =========================================================
          QUOTE BAND — huge, light gray, Apple-esque.
          ========================================================= */}
      <section className="px-6 md:px-10 py-28 md:py-40" style={{ background: PAPER }}>
        <div className="max-w-5xl mx-auto text-center">
          <p
            className="text-[42px] md:text-[76px] lg:text-[92px] font-semibold tracking-[-0.045em] leading-[0.98]"
            style={{ color: "rgba(14,15,18,0.14)" }}
          >
            "We don't create listings.
            <br />
            We tell stories."
          </p>
        </div>
      </section>

      {/* =========================================================
          EDITORIAL SHOWCASE — replaces the four-card SaaS grid.
          Horizontally scrollable. Each slide is a "product announcement":
          one huge image, one sentence, one Learn More.
          ========================================================= */}
      <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 mb-10 md:mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
              The Showcase
            </p>
            <h2 className="mt-3 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.02]">
              One capability at a time.
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              aria-label="Previous"
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              aria-label="Next"
              onClick={() => scrollBy(1)}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-white/40 flex items-center justify-center transition"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 px-6 md:px-10 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {showcase.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="snap-start group relative shrink-0 w-[86vw] md:w-[62vw] lg:w-[720px] aspect-[4/5] md:aspect-[16/11] rounded-[28px] overflow-hidden border border-white/[0.08] hover:border-white/25 transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-[900ms] group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.05] max-w-xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-white/70 text-[15px] md:text-base font-light leading-relaxed max-w-lg">
                  {item.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/95 group-hover:gap-3 transition-all">
                  {item.cta} <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl px-6 py-6 md:px-10 md:py-7">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3">
            {trustBadges.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5eead4] flex-shrink-0" />
                <span className="text-[12px] md:text-[13px] font-medium text-white/85">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-10 py-24 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">How It Works</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">Three simple steps.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorks.map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8">
                <div className="w-10 h-10 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center text-[#5eead4] font-semibold text-sm mb-5">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-white/65 leading-relaxed text-[15px]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] px-3 py-1 rounded-full bg-[#5eead4]/10 border border-[#5eead4]/20">
              Coming Soon
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              What we're building next.
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto">
              Features we're actively developing. Available to profiles as they roll out.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {upcomingFeatures.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur p-6">
                <div className="w-9 h-9 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4 text-[#5eead4]" />
                </div>
                <p className="text-sm font-medium text-white/90">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={faqs} pageUrl={pageUrl} />

      {/* FINAL CTA */}
      <section className="relative px-6 md:px-10 py-32 overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(13,110,102,0.25),_transparent_65%)]" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[1.03]">
            Your business deserves more than a listing.
          </h2>
          <p className="mt-8 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Join the Capital District's growing collection of independently owned businesses, local stories, and trusted recommendations.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={APPLY_URL}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Tell Your Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={PRICING_URL}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition underline underline-offset-4 decoration-white/20"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForBusinesses;
