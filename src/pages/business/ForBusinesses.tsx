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
  Compass,
  CheckCircle2,
  MessageSquare,
  CalendarDays,
  LayoutDashboard,
  Megaphone,
  Users,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

const APPLY_URL = "/for-businesses/apply";

const trustBadges = [
  "Free profile available",
  "Editorial-first approach",
  "No anonymous reviews",
  "Functional business tools",
  "Built for local discovery",
  "Owner controlled profile",
];

// Real Capital District neighborhood & storefront photography — used as
// ambient background only. No captions imply any business participates
// that has not actually joined the platform.
const heroBackdrop = [
  { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85", label: "Downtown Albany, NY" },
  { src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=85", label: "Historic Troy, NY" },
  { src: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=2400&q=85", label: "Saratoga Springs, NY" },
  { src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85", label: "Delmar, NY" },
];

const outcomeCards = [
  {
    icon: Compass,
    title: "Be Discovered",
    body: "Appear in local searches, community guides and editorial collections.",
  },
  {
    icon: BookOpen,
    title: "Tell Your Story",
    body: "A professional editorial profile that highlights what makes your business unique.",
  },
  {
    icon: BarChart3,
    title: "Measure Results",
    body: "Receive engagement reports as new analytics become available.",
    future: true,
  },
  {
    icon: Wand2,
    title: "Grow Smarter",
    body: "Access practical AI tools and business resources designed to save time.",
  },
];

const differentCards = [
  {
    icon: BookOpen,
    title: "We Tell Stories",
    body: "Instead of anonymous ratings, we create editorial profiles that help customers understand what makes your business special.",
  },
  {
    icon: MapPin,
    title: "We Focus Local",
    body: "Everything is built specifically for the Capital District — and eventually every Nest region across the country.",
  },
  {
    icon: ShieldCheck,
    title: "You Stay In Control",
    body: "Claim your profile, update your information, and help shape how your business is presented.",
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

const ForBusinesses = () => {
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % heroBackdrop.length), 7000);
    return () => clearInterval(id);
  }, []);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>For Local Businesses | Capital District Nest</title>
        <meta
          name="description"
          content="Capital District Nest helps local businesses build a beautiful online presence, connect with local customers, and simplify everyday marketing through practical tools and thoughtful editorial."
        />
      </Helmet>
      <CleanHeader />

      {/* HERO */}
      <section className="relative px-6 md:px-10 pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {heroBackdrop.map((s, i) => (
            <img
              key={s.src + i}
              src={s.src}
              alt={s.label}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
                i === heroIdx ? "opacity-20" : "opacity-0"
              }`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/70 via-[#0B0F19]/85 to-[#0B0F19]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,110,102,0.22),_transparent_60%)]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#5eead4]">
            For Local Businesses
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1]">
            <Sparkles className="w-3.5 h-3.5 text-[#5eead4]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/85">
              Your Local AI Growth Partner
            </span>
          </div>
          <h1 className="mt-10 text-5xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.035em] leading-[1.0]">
            Get Discovered.
            <br />
            <span className="text-[#5eead4]">Tell Your Story.</span>
            <br />
            <span className="text-white/85">Grow Smarter.</span>
          </h1>
          <p className="mt-10 text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Capital District Nest helps local businesses build a beautiful online presence, connect with local customers, and simplify everyday marketing through practical tools and thoughtful editorial.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={APPLY_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Claim Your Free Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/business/the-roosevelt-room"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] text-sm font-semibold"
            >
              See a Featured Business
            </Link>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="px-6 md:px-10 py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">Outcomes</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              What joining is really about.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {outcomeCards.map(({ icon: Icon, title, body, future }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur p-8"
              >
                <div className="w-11 h-11 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#5eead4]" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-white/65 leading-relaxed text-[15px]">{body}</p>
                {future && (
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#5eead4]/80">
                    Coming Soon
                  </p>
                )}
              </div>
            ))}
          </div>
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

      {/* WHY WE'RE DIFFERENT */}
      <section className="px-6 md:px-10 py-24 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              We're building something different.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {differentCards.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur p-8"
              >
                <div className="w-11 h-11 rounded-full bg-[#0d6e66]/20 border border-[#0d6e66]/40 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#5eead4]" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 text-white/65 leading-relaxed text-[15px]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EXAMPLE — Roosevelt Room only */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4]">Featured Business</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
              The Roosevelt Room
            </h2>
            <p className="mt-3 text-white/60">North Greenbush, New York</p>
            <p className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed">
              Modern American dining in an intimate setting with seasonal menus, handcrafted cocktails, and warm hospitality.
            </p>
          </div>
          <Link
            to="/business/the-roosevelt-room"
            className="group block rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition relative aspect-[21/9]"
          >
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=85"
              alt="The Roosevelt Room — North Greenbush, NY"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center p-10 md:p-16">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5eead4] mb-3">Editorial Feature</p>
                <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em]">The Roosevelt Room</h3>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                  Explore the Feature <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
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

      {/* COMING SOON — future roadmap */}
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
              Claim Your Free Profile <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelectorAll("h2");
                el.forEach((h) => {
                  if (h.textContent?.includes("Three simple steps")) {
                    h.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                });
              }}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition underline underline-offset-4 decoration-white/20"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForBusinesses;
