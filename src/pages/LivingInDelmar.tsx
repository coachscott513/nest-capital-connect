import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Bell,
  Coffee,
  Briefcase,
  Calendar,
  Home as HomeIcon,
  TrendingUp,
  Sparkles,
  Newspaper,
  Star,
  Mail,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
// Note: photo hero replaced with soft gradient + glass dashboard (Vision Pro style)

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const PHONE = "518-522-7265";
const PHONE_HREF = "tel:+15185227265";
const REMAX_DELMAR = "https://scottalvarez.remax.com/wide.php?city=Delmar";
const TEAL = "#0D9488";

const LivingInDelmar = () => {
  // Keep canonical URL in the address bar if SPA mounted at /app/living-in-delmar
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/app/living-in-delmar"
    ) {
      window.history.replaceState(
        null,
        "",
        "/living-in-delmar" + window.location.search + window.location.hash,
      );
    }
  }, []);

  // Newsletter
  const [signup, setSignup] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signup.name.trim() || !signup.email.trim() || !signup.phone.trim()) {
      toast({
        title: "All fields required",
        description: "Name, email, and phone are required to receive Delmar updates.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      full_name: signup.name.trim(),
      email: signup.email.trim(),
      phone: signup.phone.trim(),
      message: "Weekly Delmar updates signup — listings, local news, market updates every Friday.",
      type: "newsletter",
      origin_town: "Delmar",
      lead_type: "buyer",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "You're in.", description: "Watch your inbox Friday for the next Delmar update." });
  };

  // Auto "Week of" label
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekLabel = `Week of ${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;

  // Section 2: This Week in Delmar — 4 specific, high-signal updates
  const liveFeed = [
    {
      icon: HomeIcon,
      tag: "Homes Sold",
      title: "3 homes closed this week",
      body: "Highest sale: $485K on Roweland Ave. Two others closed within 1.8% of asking — both under contract in under 10 days.",
      href: "#homes",
    },
    {
      icon: TrendingUp,
      tag: "Market Shift",
      title: "Inventory dropped to 12 active homes",
      body: "Lowest active count in 60 days. Bethlehem supply continues to tighten heading into the back half of the season.",
      href: "#homes",
    },
    {
      icon: Sparkles,
      tag: "Buyer Trend",
      title: "Multiple offers returning under $500K",
      body: "Entry-level Delmar is the tightest bracket again. Well-priced homes are seeing 3+ offers within the first weekend.",
      href: "#homes",
    },
    {
      icon: Coffee,
      tag: "Local Update",
      title: "New café opening on Delaware Ave",
      body: "Another addition to the Four Corners corridor — opening expected next month. We'll post the date here first.",
      href: "#favorites",
    },
  ];

  // Section 4: Featured Local — 7 max (3 restaurants, 2 coffee, 2 home services)
  const favorites = [
    { kind: "Restaurant", name: "Four Corners Bistro", body: "Neighborhood dinner spot at the heart of Delmar.", icon: Coffee },
    { kind: "Restaurant", name: "Delaware Ave Kitchen", body: "Casual American along the main corridor.", icon: Coffee },
    { kind: "Restaurant", name: "Bethlehem Tavern", body: "Local pub with a steady weekend crowd.", icon: Coffee },
    { kind: "Coffee", name: "The Perfect Blend", body: "The morning ritual locals rely on.", icon: Coffee },
    { kind: "Coffee", name: "Daily Grind Delmar", body: "Quick stop for espresso and pastries.", icon: Coffee },
    { kind: "Home Services", name: "Bethlehem Home Pros", body: "Trusted contractors and inspectors.", icon: Briefcase },
    { kind: "Home Services", name: "Delmar Trades Co.", body: "Plumbing, electric, and seasonal home care.", icon: Briefcase },
  ];

  // Section 5: Events (3 max)
  const events = [
    { date: "Saturday · 9am", title: "Bethlehem Farmers Market", body: "Local produce, bakers, and makers at the Town Hall lot." },
    { date: "Thursday · 7pm", title: "Bethlehem Central Concert", body: "School music program performance — open to the community." },
    { date: "Sunday · 10am", title: "Albany County Rail Trail Walk", body: "Group walk along the Delmar segment of the rail trail." },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <Helmet>
        <title>Living in Delmar, NY | Weekly Real Estate & Local Updates</title>
        <meta
          name="description"
          content="Delmar Weekly: homes for sale, market updates, local businesses, and community events in Delmar, NY — refreshed every Friday."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/living-in-delmar" />
        <meta property="og:title" content="Living in Delmar, NY | Capital District Nest" />
        <meta
          property="og:description"
          content="Real estate, local businesses, and community updates in Delmar, NY — refreshed weekly."
        />
        <meta property="og:image" content="https://www.capitaldistrictnest.com/og-image-capital-district.jpg" />
        <meta property="og:url" content="https://www.capitaldistrictnest.com/living-in-delmar" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Delmar, NY",
          description:
            "Delmar is a hamlet in the town of Bethlehem in Albany County, New York, known for top-rated Bethlehem Central schools, quiet residential neighborhoods, and a short commute to downtown Albany.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Delmar",
            addressRegion: "NY",
            postalCode: "12054",
            addressCountry: "US",
          },
        })}</script>
      </Helmet>

      <MainHeader />

      {/* ============ 1. HERO — Layered Glass (Vision Pro depth) ============ */}
      <section className="relative w-full overflow-hidden">
        {/* Layer 1: ambient gradient */}
        <div aria-hidden className="absolute inset-0 -z-30">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #fdfdfb 0%, #f3f8f8 40%, #e8f1f2 75%, #f5eef0 100%)",
            }}
          />
        </div>

        {/* Layer 2: blurred floating blobs (depth + motion) */}
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute -top-40 -right-32 w-[720px] h-[720px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(13,148,136,0.32) 0%, rgba(13,148,136,0) 65%)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
            className="absolute top-1/3 -left-40 w-[560px] h-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,179,237,0.28) 0%, rgba(99,179,237,0) 65%)",
              filter: "blur(70px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(244,180,170,0.28) 0%, rgba(244,180,170,0) 65%)",
              filter: "blur(80px)",
            }}
          />
          {/* subtle noise / grain */}
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-32 lg:pt-36 lg:pb-40">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT — copy */}
            <div className="lg:col-span-6">
              <motion.div
                {...fadeUp}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(22px) saturate(180%)",
                  WebkitBackdropFilter: "blur(22px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 8px 24px -10px rgba(0,0,0,0.08)",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: TEAL }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: TEAL }}
                  />
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-neutral-700">
                  Live · {weekLabel}
                </span>
              </motion.div>

              <motion.h1
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 }}
                className="text-[3.5rem] md:text-7xl lg:text-[5.5rem] font-bold leading-[0.98] tracking-[-0.04em] text-neutral-900"
              >
                Delmar.
                <br />
                <span style={{ color: TEAL }}>This week.</span>
              </motion.h1>

              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="mt-7 max-w-md text-lg md:text-xl text-neutral-500 leading-relaxed font-light"
              >
                Listings, market shifts, and local intel — refreshed every Friday by someone who works here.
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <a
                  href="#homes"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition shadow-[0_12px_30px_-8px_rgba(13,148,136,0.55)] hover:shadow-[0_16px_40px_-8px_rgba(13,148,136,0.65)] hover:-translate-y-0.5"
                  style={{ background: TEAL }}
                >
                  View New Listings <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#updates"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:-translate-y-0.5 transition"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(22px) saturate(180%)",
                    WebkitBackdropFilter: "blur(22px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "0 8px 24px -10px rgba(0,0,0,0.08)",
                  }}
                >
                  Get Weekly Updates
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
                >
                  <Phone className="w-4 h-4" /> Talk to Scott
                </a>
              </motion.div>
            </div>

            {/* RIGHT — staggered floating glass cards */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-[520px] h-[520px] lg:h-[560px]">
                {/* Card 1 — Market Pulse (back / largest) */}
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: -3 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="absolute top-2 left-0 w-[78%] z-10 rounded-[28px] p-6"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(26px) saturate(180%)",
                    WebkitBackdropFilter: "blur(26px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.45)",
                    boxShadow:
                      "0 30px 80px -25px rgba(15,23,42,0.22), 0 1px 0 rgba(255,255,255,0.8) inset",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${TEAL}1A` }}
                      >
                        <TrendingUp className="w-4 h-4" style={{ color: TEAL }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-neutral-500">
                          Delmar 12054
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">Market Pulse</p>
                      </div>
                    </div>
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${TEAL}14`, color: TEAL }}
                    >
                      LIVE
                    </span>
                  </div>
                  <p className="text-[15px] font-medium text-neutral-900 leading-snug mb-4">
                    Inventory is tight. Demand is rising.
                  </p>
                  <div className="flex items-end gap-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Median</p>
                      <p className="text-2xl font-bold text-neutral-900 tracking-tight">$465K</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">Active</p>
                      <p className="text-2xl font-bold text-neutral-900 tracking-tight">12</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">DOM</p>
                      <p className="text-2xl font-bold text-neutral-900 tracking-tight">9d</p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 — This Week (middle / overlapping right) */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 2.5 }}
                  animate={{ opacity: 1, y: 0, rotate: 2.5 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  className="absolute top-[38%] right-0 w-[72%] z-20 rounded-[28px] p-5"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(28px) saturate(180%)",
                    WebkitBackdropFilter: "blur(28px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow:
                      "0 30px 80px -22px rgba(15,23,42,0.22), 0 1px 0 rgba(255,255,255,0.8) inset",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${TEAL}1A` }}
                    >
                      <Newspaper className="w-4 h-4" style={{ color: TEAL }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-neutral-500">
                        This Week
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">What changed</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { icon: HomeIcon, label: "3 homes closed", meta: "high $485K" },
                      { icon: Sparkles, label: "Multi-offers under $500K", meta: "returning" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5"
                        style={{
                          background: "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.5)",
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <row.icon className="w-4 h-4 shrink-0" style={{ color: TEAL }} />
                          <span className="text-[13px] font-medium text-neutral-900 truncate">{row.label}</span>
                        </div>
                        <span className="text-[11px] text-neutral-500 font-light shrink-0 ml-2">{row.meta}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card 3 — Insider Line (front / smallest, bottom) */}
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  className="absolute bottom-0 left-[8%] w-[68%] z-30 rounded-[24px] p-5"
                  style={{
                    background: "rgba(15,23,42,0.78)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                      "0 30px 70px -20px rgba(15,23,42,0.4), 0 1px 0 rgba(255,255,255,0.08) inset",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: TEAL }} />
                    <p className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>
                      Insider Line
                    </p>
                  </div>
                  <p className="text-[14px] text-white/90 font-light leading-relaxed">
                    Cleanly priced Bethlehem Central homes are moving in under two weekends.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1b. INSIGHT-LED MARKET SNAPSHOT ============ */}
      <section className="relative bg-white border-b border-neutral-100 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-20 right-0 w-[360px] h-[360px] rounded-full opacity-60 -z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(13,148,136,0.10) 0%, rgba(13,148,136,0) 70%)",
            filter: "blur(50px)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: TEAL }}>
                Delmar Market · {weekLabel}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-neutral-900 tracking-[-0.03em] leading-[1.02]">
                Inventory is tight.
                <br />
                <span className="text-neutral-400">Demand is rising.</span>
              </h2>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="lg:col-span-5 space-y-3"
            >
              {[
                { label: "Active homes", value: "12", note: "−15% in 60 days" },
                { label: "Closed (30d)", value: "8", note: "median $465K" },
                { label: "Avg days on market", value: "9", note: "down from 14" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between rounded-2xl px-5 py-4"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 12px 40px -20px rgba(0,0,0,0.10)",
                  }}
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-semibold">
                      {m.label}
                    </p>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">{m.note}</p>
                  </div>
                  <p className="text-3xl font-bold text-neutral-900 tracking-tight">{m.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ 2. LIVE FEED — Floating Glass, Broken Grid ============ */}
      <section id="feed" className="relative py-28 lg:py-36 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #f7faf9 60%, #ffffff 100%)",
            }}
          />
          <div
            className="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, rgba(13,148,136,0.14) 0%, rgba(13,148,136,0) 70%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-10 right-10 w-[420px] h-[420px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, rgba(244,180,170,0.18) 0%, rgba(244,180,170,0) 70%)",
              filter: "blur(70px)",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: TEAL }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: TEAL }} />
              </span>
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>
                This Week · {weekLabel}
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-neutral-900 leading-[1.02]">
              What actually
              <br />
              <span className="text-neutral-400">changed this week.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {liveFeed.map((item, i) => {
              const offsets = ["lg:translate-y-0", "lg:translate-y-10", "lg:-translate-y-4", "lg:translate-y-6"];
              const rotations = [-0.6, 0.8, -0.4, 0.5];
              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(22px) saturate(180%)",
                    WebkitBackdropFilter: "blur(22px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow:
                      "0 20px 60px -20px rgba(15,23,42,0.14), 0 1px 0 rgba(255,255,255,0.7) inset",
                    rotate: `${rotations[i % rotations.length]}deg`,
                  }}
                  className={`group block rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-20px_rgba(15,23,42,0.22)] ${offsets[i % offsets.length]}`}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: `${TEAL}14`,
                      boxShadow: `inset 0 0 0 1px ${TEAL}1F`,
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: TEAL }} />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 font-semibold mb-3">
                    {item.tag}
                  </p>
                  <h3 className="text-[1.35rem] font-semibold text-neutral-900 leading-[1.2] tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] text-neutral-600 leading-relaxed font-light">
                    {item.body}
                  </p>
                <span
                  className="inline-flex items-center gap-1 mt-5 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: TEAL }}
                >
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. REAL ESTATE ============ */}
      <section id="homes" className="py-24 lg:py-32 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-5" style={{ color: TEAL }}>
              Updated Daily
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Homes for Sale in Delmar — Updated Daily
            </h2>
            <p className="mt-5 text-lg text-neutral-500 font-light">
              These are the newest Delmar listings available right now — straight from live MLS feeds.
            </p>
          </motion.div>

          {/* Insider Line — what Zillow doesn't tell you */}
          <motion.div
            {...fadeUp}
            className="mb-8 rounded-2xl border-l-4 bg-white p-5 lg:p-6"
            style={{ borderColor: TEAL, boxShadow: "0 8px 30px -16px rgba(0,0,0,0.08)" }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: TEAL }}>
              Insider Line · {weekLabel}
            </p>
            <p className="text-base lg:text-lg text-neutral-800 font-light leading-relaxed">
              Most Delmar homes under $500K are getting multiple offers again this month. Anything priced cleanly in the Bethlehem Central district is moving in under two weekends.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: "0 20px 60px -20px rgba(0,0,0,0.12)" }}
          >
            <iframe
              title="Homes for Sale in Delmar, NY"
              src={REMAX_DELMAR}
              loading="lazy"
              className="w-full h-[680px] md:h-[780px] block border-0"
            />
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href={REMAX_DELMAR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition"
              style={{ background: TEAL }}
            >
              View All Listings <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#updates"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 transition"
            >
              <Bell className="w-4 h-4" /> Get Alerts
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============ 4. FEATURED LOCAL ============ */}
      <section id="favorites" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-5" style={{ color: TEAL }}>
              Local Favorites
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Delmar Favorites
            </h2>
            <p className="mt-5 text-lg text-neutral-500 font-light">
              The places locals actually go — restaurants, coffee, and trusted home services.
            </p>
          </motion.div>

          {/* Spotlight */}
          <motion.div
            {...fadeUp}
            className="mb-12 rounded-3xl p-8 lg:p-12 border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white"
            style={{ boxShadow: "0 12px 40px -16px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 fill-current" style={{ color: TEAL }} />
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>
                Delmar Spotlight · This Week
              </p>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Four Corners Bistro
            </h3>
            <p className="text-lg text-neutral-600 font-light max-w-2xl mb-6">
              The neighborhood dinner spot anchoring Delmar's Four Corners — seasonal menu, warm room, and one of the most consistent kitchens in Bethlehem.
            </p>
            <a
              href="tel:+15185227265"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition"
              style={{ background: TEAL }}
            >
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
          </motion.div>

          {/* 7 cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((f) => (
              <motion.div
                key={f.name}
                {...fadeUp}
                className="rounded-2xl bg-neutral-50 p-6 hover:bg-white hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.1)] transition-all"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${TEAL}14` }}
                >
                  <f.icon className="w-4 h-4" style={{ color: TEAL }} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2">
                  {f.kind}
                </p>
                <h4 className="text-lg font-semibold text-neutral-900 mb-1.5">{f.name}</h4>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. EVENTS ============ */}
      <section id="events" className="py-24 lg:py-32 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-5" style={{ color: TEAL }}>
              {weekLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              This Week in Delmar
            </h2>
            <p className="mt-5 text-lg text-neutral-500 font-light">
              Three things worth showing up for this week.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {events.map((e) => (
              <motion.div
                key={e.title}
                {...fadeUp}
                className="rounded-2xl bg-white p-7 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.1)] transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4" style={{ color: TEAL }} />
                  <p className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: TEAL }}>
                    {e.date}
                  </p>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2 leading-snug">{e.title}</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed">{e.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. EMAIL CAPTURE ============ */}
      <section id="updates" className="py-28 lg:py-36 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div {...fadeUp}>
            <div
              className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-8"
              style={{ background: `${TEAL}14` }}
            >
              <Mail className="w-6 h-6" style={{ color: TEAL }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Get Delmar Updates Every Friday
            </h2>
            <p className="mt-5 text-lg text-neutral-500 font-light">
              One short email. Three things every week:
            </p>
            <ul className="mt-6 inline-flex flex-col gap-2 text-left text-[15px] text-neutral-700 font-light">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} /> New Delmar listings</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} /> What sold and for how much</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} /> What changed locally this week</li>
            </ul>
          </motion.div>

          {submitted ? (
            <motion.div
              {...fadeUp}
              className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-left"
            >
              <p className="text-base font-semibold text-emerald-900">You're in.</p>
              <p className="mt-1.5 text-sm text-emerald-800 font-light">
                The next Delmar update lands in your inbox this Friday.
              </p>
            </motion.div>
          ) : (
            <motion.form
              {...fadeUp}
              onSubmit={handleSignup}
              className="mt-10 grid sm:grid-cols-3 gap-3 text-left"
            >
              <Input
                placeholder="Full name"
                value={signup.name}
                onChange={(e) => setSignup((s) => ({ ...s, name: e.target.value }))}
                className="h-12 rounded-xl border-neutral-200 bg-neutral-50 focus-visible:ring-2"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={signup.email}
                onChange={(e) => setSignup((s) => ({ ...s, email: e.target.value }))}
                className="h-12 rounded-xl border-neutral-200 bg-neutral-50 focus-visible:ring-2"
                required
              />
              <Input
                type="tel"
                placeholder="Phone"
                value={signup.phone}
                onChange={(e) => setSignup((s) => ({ ...s, phone: e.target.value }))}
                className="h-12 rounded-xl border-neutral-200 bg-neutral-50 focus-visible:ring-2"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="sm:col-span-3 mt-2 h-12 rounded-full text-white font-semibold text-sm transition disabled:opacity-60"
                style={{ background: TEAL }}
              >
                {submitting ? "Subscribing…" : "Subscribe to Delmar Weekly"}
              </button>
              <p className="sm:col-span-3 text-xs text-neutral-400 text-center font-light mt-1">
                Name, email, and phone required. Unsubscribe anytime.
              </p>
            </motion.form>
          )}
        </div>
      </section>

      {/* ============ 7. FOOTER CONTACT ============ */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: TEAL }}>
              Talk to a Local Expert
            </p>
            <p className="text-2xl font-semibold text-neutral-900">
              Scott Alvarez · Capital District Nest
            </p>
            <p className="text-sm text-neutral-500 font-light mt-1">
              Delmar · Bethlehem · Capital District, NY
            </p>
          </div>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition"
            style={{ background: TEAL }}
          >
            <Phone className="w-4 h-4" /> {PHONE}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LivingInDelmar;
