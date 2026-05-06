import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Bell, MapPin } from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import heroImg from "@/assets/delmar-hero-premium.jpg";
import { delmarBusinesses } from "@/data/businesses";

const PHONE = "518-522-7265";
const PHONE_HREF = "tel:+15185227265";
const REMAX_DELMAR = "https://scottalvarez.remax.com/wide.php?city=Delmar";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const stats = [
  { label: "Median Sale Price", value: "$465K" },
  { label: "Active Listings", value: "12 homes" },
  { label: "Avg. Days on Market", value: "9 days" },
];

const featured = [
  { addr: "Lavery Drive", price: "$525,000", beds: "4 bd · 2.5 ba · 2,300 sqft", href: "/lavery-drive-delmar" },
  { addr: "137A Elsmere Ave", price: "$389,000", beds: "3 bd · 2 ba · 1,650 sqft", href: "/137a-elsmere-ave" },
  { addr: "Browse all Delmar homes", price: "12 active", beds: "Updated daily", href: REMAX_DELMAR, external: true },
];

const events = [
  { when: "Saturdays · 9–1", what: "Delmar Farmers Market", where: "Bethlehem Middle School" },
  { when: "Year-round", what: "Bethlehem Public Library events", where: "451 Delaware Ave" },
  { when: "Summer", what: "Concerts at Elm Avenue Park", where: "Elm Ave Town Park" },
];

const LivingInDelmar = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/app/living-in-delmar") {
      window.history.replaceState(null, "", "/living-in-delmar" + window.location.search + window.location.hash);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Living in Delmar, NY | Homes, Market & Local Insight</title>
        <meta
          name="description"
          content="Homes for sale in Delmar, NY. Market trends, local businesses, schools and lifestyle in one of the Capital District's most desirable communities."
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/living-in-delmar" />
      </Helmet>

      <MainHeader />

      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Tree-lined street in Delmar, NY" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-32 md:pt-52 md:pb-40">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-5">
              Bethlehem · Albany County
            </p>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.035em] text-white leading-[1.02]">
              Living in Delmar, NY
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl font-light leading-relaxed">
              Homes, market trends, and local insight in one of the Capital District's most desirable communities.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={REMAX_DELMAR}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-foreground px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/90 transition"
              >
                View Homes <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#updates"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/30 px-7 py-3.5 rounded-full font-semibold text-base hover:bg-white/20 transition"
              >
                <Bell className="w-4 h-4" /> Get Weekly Updates
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-white px-5 py-3.5 font-semibold text-base hover:text-white/80 transition"
              >
                <Phone className="w-4 h-4" /> Talk to Scott
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. HOMES — top priority */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-10">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground">
              Homes for Sale in Delmar
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Live listings from the Capital Region MLS, updated continuously.
            </p>
          </motion.div>

          <div className="rounded-3xl overflow-hidden border border-border bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]">
            <iframe
              src={REMAX_DELMAR}
              title="Delmar Homes for Sale"
              className="w-full h-[720px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 3. MARKET SNAPSHOT */}
      <section className="py-24 px-6 bg-[#f7f7f8]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-sm font-semibold text-teal-600 tracking-widest uppercase mb-3">Market Snapshot</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground">
              Where the Delmar market is right now.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="bg-white rounded-[20px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <p className="text-sm font-medium text-muted-foreground mb-3">{s.label}</p>
                <p className="text-5xl font-semibold tracking-[-0.03em] text-foreground">{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-sm font-semibold text-teal-600 tracking-widest uppercase mb-4">About Delmar</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground mb-8">
              A walkable hamlet, ten minutes from Albany.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Delmar, in the Town of Bethlehem, is known for its top-ranked schools, quiet tree-lined streets, and an
              easy commute to downtown Albany. With a tight-knit Four Corners village center, parks, and one of the
              most respected school districts in the region, it remains one of the most sought-after places to live
              in the Capital District.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. FEATURED HOMES */}
      <section className="py-24 px-6 bg-[#f7f7f8]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold text-teal-600 tracking-widest uppercase mb-3">Featured</p>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground">
                Homes worth a closer look.
              </h2>
            </div>
            <a
              href={REMAX_DELMAR}
              target="_blank"
              rel="noreferrer"
              className="text-foreground font-semibold inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              See all listings <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((f, i) => {
              const Inner = (
                <div className="group bg-white rounded-[20px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all h-full flex flex-col">
                  <p className="text-sm font-medium text-muted-foreground">{f.beds}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{f.addr}</h3>
                  <p className="mt-4 text-3xl font-semibold text-foreground">{f.price}</p>
                  <span className="mt-auto pt-6 text-teal-600 font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    View details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              );
              return f.external ? (
                <motion.a
                  key={f.addr}
                  href={f.href}
                  target="_blank"
                  rel="noreferrer"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                >
                  {Inner}
                </motion.a>
              ) : (
                <motion.a
                  key={f.addr}
                  href={f.href}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                >
                  {Inner}
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LOCAL BUSINESSES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-sm font-semibold text-teal-600 tracking-widest uppercase mb-3">Local Favorites</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground">
              Where Delmar actually goes.
            </h2>
          </motion.div>

          <ul className="divide-y divide-border border-y border-border">
            {delmarBusinesses.map((b) => (
              <li key={b.slug} className="py-6 flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-foreground">{b.name}</h3>
                  <p className="mt-1 text-muted-foreground">{b.tagline}</p>
                  <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {b.address}
                  </p>
                </div>
                {b.phone && (
                  <a
                    href={`tel:${b.phone.replace(/[^\d+]/g, "")}`}
                    className="shrink-0 text-foreground font-medium hover:text-teal-600 transition whitespace-nowrap"
                  >
                    {b.phone}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. EVENTS */}
      <section className="py-24 px-6 bg-[#f7f7f8]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-sm font-semibold text-teal-600 tracking-widest uppercase mb-3">Community</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-foreground">
              What's happening around town.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <motion.div
                key={e.what}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="bg-white rounded-[20px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">{e.when}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{e.what}</h3>
                <p className="mt-2 text-muted-foreground">{e.where}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section id="updates" className="py-32 px-6 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
              Thinking about buying in Delmar?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-background/70 font-light">
              Talk to a local agent who lives and works in the Capital District.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <a
                href={REMAX_DELMAR}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-400 transition"
              >
                Schedule a Showing <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 bg-white text-foreground px-8 py-4 rounded-full font-semibold hover:bg-white/90 transition"
              >
                <Phone className="w-4 h-4" /> {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LivingInDelmar;
