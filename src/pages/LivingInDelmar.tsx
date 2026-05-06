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

      {/* ============ 1. HERO — Glass Dashboard (no photo) ============ */}
      <section className="relative w-full overflow-hidden bg-white">
        {/* Soft ambient gradient + blurred shapes */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #f6fafa 55%, #eef4f5 100%)",
            }}
          />
          <div
            className="absolute -top-32 -right-24 w-[600px] h-[600px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, rgba(13,148,136,0.22) 0%, rgba(13,148,136,0) 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute top-1/2 -left-32 w-[480px] h-[480px] rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, rgba(99,179,237,0.18) 0%, rgba(99,179,237,0) 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-24 lg:pt-36 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* LEFT — copy */}
            <div className="lg:col-span-7">
              <motion.div
                {...fadeUp}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 px-4 py-1.5 mb-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]"
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
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-700">
                  Live · {weekLabel}
                </span>
              </motion.div>

              <motion.h1
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.05 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight text-neutral-900"
              >
                Delmar <span style={{ color: TEAL }}>This Week.</span>
              </motion.h1>

              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="mt-6 max-w-xl text-lg md:text-xl text-neutral-500 leading-relaxed font-light"
              >
                Real estate activity, local updates, and community highlights — refreshed every Friday.
              </motion.p>

              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                <a
                  href="#homes"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition shadow-[0_8px_24px_-8px_rgba(13,148,136,0.5)] hover:shadow-[0_12px_30px_-8px_rgba(13,148,136,0.6)] hover:-translate-y-0.5"
                  style={{ background: TEAL }}
                >
                  View New Listings <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#updates"
                  className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-white transition shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]"
                >
                  Get Weekly Updates
                </a>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition"
                >
                  <Phone className="w-4 h-4" /> Talk to Scott
                </a>
              </motion.div>
            </div>

            {/* RIGHT — glass preview cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[460px]">
                {/* Top card — This Week */}
                <motion.div
                  initial={{ opacity: 0, y: 30, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                  className="relative z-30 rounded-3xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    boxShadow:
                      "0 24px 60px -20px rgba(15,23,42,0.18), 0 1px 0 rgba(255,255,255,0.9) inset",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${TEAL}1A` }}
                      >
                        <Newspaper className="w-4 h-4" style={{ color: TEAL }} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
                          This Week
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          What changed in Delmar
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `${TEAL}14`, color: TEAL }}
                    >
                      LIVE
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { icon: HomeIcon, label: "3 closed", meta: "highest $485K" },
                      { icon: TrendingUp, label: "12 active", meta: "−15% in 60d" },
                      { icon: Sparkles, label: "Under $500K", meta: "multiple offers" },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between rounded-xl bg-white/60 border border-white/60 px-3 py-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <row.icon className="w-4 h-4" style={{ color: TEAL }} />
                          <span className="text-sm font-medium text-neutral-900">{row.label}</span>
                        </div>
                        <span className="text-xs text-neutral-500 font-light">{row.meta}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Bottom card — Market Snapshot */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 2 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="relative z-20 -mt-6 ml-6 sm:ml-12 rounded-3xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    boxShadow:
                      "0 24px 60px -20px rgba(15,23,42,0.16), 0 1px 0 rgba(255,255,255,0.9) inset",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${TEAL}1A` }}
                    >
                      <TrendingUp className="w-4 h-4" style={{ color: TEAL }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-500">
                        Delmar 12054
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">Market Snapshot</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Median", value: "$465K" },
                      { label: "Active", value: "12" },
                      { label: "DOM", value: "9d" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl bg-white/60 border border-white/60 p-2.5">
                        <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                          {m.label}
                        </p>
                        <p className="text-base font-bold text-neutral-900 mt-0.5 tracking-tight">
                          {m.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 1b. MARKET SNAPSHOT BAR ============ */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-2" style={{ color: TEAL }}>
                Delmar Market Snapshot
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                The numbers, right now.
              </h2>
            </div>
            <p className="text-xs text-neutral-400 font-light">{weekLabel}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Active Listings", value: "12" },
              { label: "Sold (30 days)", value: "8" },
              { label: "Median List", value: "$465K" },
              { label: "Avg Days on Market", value: "9" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl p-5 border border-neutral-100"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: "0 8px 30px -16px rgba(0,0,0,0.08)",
                }}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 font-semibold">
                  {m.label}
                </p>
                <p className="text-3xl font-bold text-neutral-900 mt-2 tracking-tight">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 2. LIVE FEED ============ */}
      <section id="feed" className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: TEAL }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: TEAL }} />
              </span>
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>
                This Week in Delmar · {weekLabel}
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              What actually changed this week.
            </h2>
            <p className="mt-5 text-lg text-neutral-500 font-light">
              Homes sold, market shifts, buyer behavior, and one local update — written by someone who works here every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveFeed.map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                {...fadeUp}
                className="group block rounded-2xl bg-neutral-50 hover:bg-white border border-transparent hover:border-neutral-200 p-7 transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)]"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${TEAL}14` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: TEAL }} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3">
                  {item.tag}
                </p>
                <h3 className="text-lg font-semibold text-neutral-900 leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] text-neutral-600 leading-relaxed font-light">
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
