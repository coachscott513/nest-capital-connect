import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Trees,
  Coffee,
  Users,
  ArrowRight,
  Calendar,
  Store,
  Phone,
  TrendingUp,
  Home as HomeIcon,
  Briefcase,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import delmarHero from "@/assets/delmar-hero-premium.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const PHONE = "518-522-7265";
const PHONE_HREF = "tel:+15185227265";
const REMAX_DELMAR =
  "https://scottalvarez.remax.com/wide.php?city=Delmar";

const LivingInDelmar = () => {
  // History API rewrite: if React mounted at /app/living-in-delmar (because
  // the static SEO HTML bounced real browsers there), put the canonical URL
  // back in the address bar so the user stays on /living-in-delmar.
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

  const snapshot = [
    { label: "Minutes to Albany", value: "10–15", note: "Easy daily commute", icon: MapPin },
    { label: "School District", value: "Bethlehem Central", note: "Top-rated K–12", icon: GraduationCap },
    { label: "Lifestyle", value: "Suburban", note: "Walkable & established", icon: Trees },
    { label: "Market Feel", value: "Competitive", note: "Stable, low turnover", icon: TrendingUp },
  ];

  const whyDelmar = [
    { title: "Bethlehem Central Schools", body: "One of the strongest public school districts in the Capital Region — the dominant driver of long-term value." },
    { title: "Quiet Residential Streets", body: "Tree-lined neighborhoods, sidewalks, and a true sense of community block by block." },
    { title: "Strong Property Values", body: "Stable appreciation, low foreclosure rates, and limited annual turnover." },
    { title: "Easy Albany Commute", body: "10–15 minutes to the State Capitol, Empire State Plaza, and Albany Med." },
    { title: "Walkable Local Shops", body: "Delaware Avenue and Four Corners anchor day-to-day life with restaurants and cafés." },
    { title: "Parks & Trails", body: "Elm Avenue Park, the Albany County Rail Trail, and quick access to Thacher State Park." },
  ];

  const lifestyleCards = [
    { title: "Restaurants & Cafés", body: "Local dining and coffee shops along Delaware Avenue and Four Corners.", icon: Coffee },
    { title: "Parks & Trails", body: "Elm Avenue Park, the Albany County Rail Trail, and Bethlehem outdoor access.", icon: Trees },
    { title: "Shopping & Services", body: "Small businesses, professional services, and convenient everyday shopping.", icon: Store },
    { title: "Community Life", body: "Farmers markets, school events, library programming, and seasonal town activities.", icon: Users },
  ];

  const happenings = [
    { tag: "Listings", title: "New Delmar Listings This Week", body: "Fresh on-market homes across Bethlehem Central school zones." },
    { tag: "Spotlight", title: "Local Business Spotlight", body: "A neighborhood favorite worth knowing along Delaware Avenue." },
    { tag: "Sales", title: "Recent Delmar Home Sales", body: "What's actually closing — and at what price." },
    { tag: "Events", title: "Community Events", body: "Farmers market, library programming, and seasonal happenings." },
    { tag: "Market", title: "Bethlehem Market Update", body: "Inventory, days-on-market, and pricing trends for the wider town." },
  ];

  const featured = [
    { kind: "Restaurant Spotlight", body: "A go-to for dinner along Delaware Avenue.", icon: Coffee },
    { kind: "Coffee Shop Spotlight", body: "The morning ritual locals rely on.", icon: Coffee },
    { kind: "Home Services", body: "Trusted contractors, inspectors, and trades.", icon: Briefcase },
    { kind: "Local Professional", body: "Attorneys, lenders, and service pros who know Bethlehem.", icon: Users },
  ];

  const nearby = [
    { slug: "albany", label: "Living in Albany, NY" },
    { slug: "guilderland", label: "Living in Guilderland, NY" },
    { slug: "voorheesville", label: "Living in Voorheesville, NY" },
    { slug: "niskayuna", label: "Living in Niskayuna, NY" },
    { slug: "troy", label: "Living in Troy, NY" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-neutral-900">
      <Helmet>
        <title>Living in Delmar, NY | Homes, Schools & Lifestyle Guide | Capital District Nest</title>
        <meta
          name="description"
          content="Living in Delmar, NY: top-rated Bethlehem Central schools, walkable neighborhoods, homes for sale, things to do, and a 10-minute commute to Albany. Local guide from Capital District Nest."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/living-in-delmar" />
        <meta property="og:title" content="Living in Delmar, NY | Capital District Nest" />
        <meta
          property="og:description"
          content="Homes, lifestyle, schools, and everything you need to know about one of the Capital District's most sought-after communities."
        />
        <meta property="og:image" content={delmarHero} />
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
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Town of Bethlehem, Albany County, New York",
          },
        })}</script>
      </Helmet>

      <MainHeader />

      {/* 1. HERO */}
      <section className="relative w-full">
        <div className="absolute inset-0 -z-10">
          <img
            src={delmarHero}
            alt="Tree-lined residential street in Delmar, NY at golden hour"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-40 pb-32 lg:pt-56 lg:pb-44 text-white">
          <motion.p
            {...fadeUp}
            className="text-xs lg:text-sm uppercase tracking-[0.25em] text-white/85 mb-6"
          >
            Capital District Nest · Local Guide
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Living in Delmar, NY
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-white/90 leading-relaxed"
          >
            Homes, schools, lifestyle, and local insight for one of the Capital District's most desirable communities.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#homes-for-sale"
              className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition"
            >
              View Homes in Delmar <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#delmar-guide"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/20 transition"
            >
              Explore the Delmar Guide
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[#0d6e6e] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#0a5959] transition"
            >
              <Phone className="w-4 h-4" /> Talk to a Local Expert
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. QUICK SNAPSHOT */}
      <section className="bg-[#FAFAF7] border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-16 lg:-mt-24 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 rounded-2xl overflow-hidden shadow-xl">
            {snapshot.map((s) => (
              <div key={s.label} className="bg-white p-6 lg:p-8">
                <s.icon className="w-5 h-5 text-[#0d6e6e] mb-4" />
                <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-2">{s.label}</p>
                <p className="text-xl lg:text-2xl font-semibold text-neutral-900 leading-tight">{s.value}</p>
                <p className="text-sm text-neutral-600 mt-1">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTRODUCTION */}
      <section id="delmar-guide" className="py-24 lg:py-32 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.p
            {...fadeUp}
            className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6"
          >
            The Delmar Guide
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900 mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            One of the Capital District's most sought-after suburbs.
          </motion.h2>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="space-y-5 text-lg text-neutral-700 leading-relaxed">
            <p>
              Delmar, NY is one of the most sought-after suburbs in the Capital District, located in the town of Bethlehem in Albany County just minutes from downtown Albany. Known for its strong schools, tree-lined streets, walkable neighborhoods, and stable property values, Delmar continues to attract buyers who want suburban comfort without losing access to the city.
            </p>
            <p>
              If you are searching for <strong>homes for sale in Delmar NY</strong>, researching <strong>Delmar NY real estate</strong>, or deciding whether <strong>living in Delmar NY</strong> is the right fit, this guide brings together local lifestyle insight, homes, schools, commute information, market trends, and community highlights in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. HOMES FOR SALE — Delmar-filtered RE/MAX embed */}
      <section id="homes-for-sale" className="py-24 lg:py-32 bg-white border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Live Listings</p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Homes for Sale in Delmar, NY
            </h2>
            <p className="mt-5 text-lg text-neutral-600">
              Browse current Delmar listings and explore homes in one of the Capital District's most consistently desirable residential markets.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: "0 24px 60px -24px rgba(0,0,0,0.18)" }}
          >
            <iframe
              title="Homes for Sale in Delmar, NY"
              src={REMAX_DELMAR}
              loading="lazy"
              className="w-full h-[720px] md:h-[820px] block border-0"
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
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition"
            >
              View All Delmar Homes <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/intelligence"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
            >
              Get New Listing Alerts
            </Link>
          </motion.div>

          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="mt-10 max-w-3xl text-neutral-600 leading-relaxed">
            The Delmar NY real estate market includes established single-family homes, updated colonials, mid-century properties, and quiet residential neighborhoods near schools, parks, and local shops. Because Delmar has strong demand and limited turnover, well-priced homes often move quickly.
          </motion.p>
        </div>
      </section>

      {/* 5. WHY PEOPLE CHOOSE DELMAR */}
      <section className="py-24 lg:py-32 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Why Delmar</p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Why People Choose Delmar.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200">
            {whyDelmar.map((w) => (
              <div key={w.title} className="bg-white p-8 lg:p-10">
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{w.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT IT'S LIKE LIVING IN DELMAR */}
      <section className="py-24 lg:py-32 bg-white border-y border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.p {...fadeUp} className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Lifestyle</motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900 mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What It's Like Living in Delmar.
          </motion.h2>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="space-y-5 text-lg text-neutral-700 leading-relaxed">
            <p>
              Living in Delmar offers a quieter pace than downtown Albany while keeping work, restaurants, schools, parks, and daily conveniences close by. The community has a mature, established feel, with tree-lined streets, neighborhood sidewalks, local businesses, and an active community calendar.
            </p>
            <p>
              Delmar is especially attractive to buyers who want a strong school district, a stable residential market, and a location that still feels connected to the larger Capital District.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. EXPLORE DELMAR — lifestyle cards */}
      <section className="py-24 lg:py-32 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Explore</p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Explore Delmar.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lifestyleCards.map((c) => (
              <motion.div
                key={c.title}
                {...fadeUp}
                className="bg-white border border-neutral-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <c.icon className="w-6 h-6 text-[#0d6e6e] mb-5" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{c.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SCHOOLS */}
      <section className="py-24 lg:py-32 bg-white border-y border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.p {...fadeUp} className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Schools</motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900 mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Schools in Delmar, NY.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-lg text-neutral-700 leading-relaxed mb-10">
            Delmar is served by the <strong>Bethlehem Central School District</strong>, one of the strongest public school districts in the Capital Region. For many buyers, school quality is one of the biggest reasons they focus their home search in Delmar and the surrounding Bethlehem area.
          </motion.p>
          <motion.a
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[#0d6e6e] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#0a5959] transition"
          >
            Ask About Delmar School Zones <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* 9. COMMUTE */}
      <section className="py-24 lg:py-32 bg-[#FAFAF7]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.p {...fadeUp} className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Commute & Location</motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900 mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Commute from Delmar to Albany.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-lg text-neutral-700 leading-relaxed">
            Delmar is located roughly 10–15 minutes from downtown Albany, making it convenient for professionals working near the State Capitol, Empire State Plaza, Albany Medical Center, SUNY Albany, and other major employment centers. Access to nearby highways also makes it easy to reach Guilderland, Slingerlands, Glenmont, Troy, Saratoga, and the wider Capital District.
          </motion.p>
        </div>
      </section>

      {/* 10. WHAT'S HAPPENING */}
      <section className="py-24 lg:py-32 bg-white border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">This Week</p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What's Happening in Delmar.
            </h2>
            <p className="mt-5 text-lg text-neutral-600">
              Local updates, businesses, community news, market movement, and neighborhood highlights.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {happenings.map((h) => (
              <motion.article
                key={h.title}
                {...fadeUp}
                className="group bg-[#FAFAF7] border border-neutral-200 rounded-2xl p-8 hover:border-[#0d6e6e] transition-colors"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0d6e6e] mb-4">{h.tag}</p>
                <h3 className="font-serif text-xl text-neutral-900 mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {h.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{h.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FEATURED BUSINESSES */}
      <section className="py-24 lg:py-32 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Local Network</p>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Featured in Delmar.
            </h2>
            <p className="mt-5 text-lg text-neutral-600">
              Local businesses, restaurants, services, and professionals that help make Delmar one of the Capital District's strongest communities.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((f) => (
              <motion.div key={f.kind} {...fadeUp} className="bg-white border border-neutral-200 rounded-2xl p-8">
                <f.icon className="w-6 h-6 text-[#0d6e6e] mb-5" />
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">{f.kind}</p>
                <p className="text-neutral-700 text-sm leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-10">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 text-[#0d6e6e] font-medium hover:underline"
            >
              Own a local business in Delmar? Request to be featured. <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 12. ANALYZER CTA */}
      <section className="py-24 lg:py-32 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.p {...fadeUp} className="text-xs uppercase tracking-[0.25em] text-[#5fd4d4] mb-6">Property Intelligence</motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Thinking About a Home in Delmar?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-lg text-white/75 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Before you make an offer, understand the numbers. Capital District Nest helps buyers compare monthly payment, taxes, estimated cash flow, neighborhood strength, and long-term value.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="flex flex-wrap justify-center gap-3">
            <Link
              to="/analyze-home"
              className="inline-flex items-center gap-2 rounded-full bg-white text-neutral-900 px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition"
            >
              Analyze a Delmar Property <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/intelligence"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/30 text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/20 transition"
            >
              Request a Property Report
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 13. WORK WITH SCOTT */}
      <section className="py-24 lg:py-32 bg-white border-y border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.p {...fadeUp} className="text-xs uppercase tracking-[0.25em] text-[#0d6e6e] mb-6">Work With a Local Expert</motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-neutral-900 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Buying or Selling in Delmar?
          </motion.h2>
          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-lg text-neutral-700 leading-relaxed mb-10">
            Delmar is a competitive market where pricing, timing, and neighborhood knowledge matter. Whether you are buying your first home, selling a property, or evaluating an investment, Capital District Nest gives you local insight before you make a move.
          </motion.p>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[#0d6e6e] text-white px-7 py-3.5 text-sm font-semibold hover:bg-[#0a5959] transition"
            >
              <Phone className="w-4 h-4" /> Talk to Scott Alvarez
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
            >
              Call / Text: {PHONE}
            </a>
          </motion.div>
        </div>
      </section>

      {/* 14. EXPLORE NEARBY — internal link graph */}
      <section className="py-20 bg-[#FAFAF7]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.h2 {...fadeUp} className="font-serif text-2xl md:text-3xl text-neutral-900 mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Explore Nearby
          </motion.h2>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }} className="flex flex-wrap gap-3">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                to={`/living-in-${n.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm text-neutral-900 hover:border-[#0d6e6e] hover:text-[#0d6e6e] transition"
              >
                {n.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
            <Link
              to="/homes-for-sale"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm text-neutral-900 hover:border-[#0d6e6e] hover:text-[#0d6e6e] transition"
            >
              Capital District Homes for Sale <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/investment-properties"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm text-neutral-900 hover:border-[#0d6e6e] hover:text-[#0d6e6e] transition"
            >
              Capital District Investment Properties <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LivingInDelmar;
