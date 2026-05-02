import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Home as HomeIcon,
  MapPin,
  Trees,
  Coffee,
  Users,
  ArrowRight,
  Briefcase,
  Calendar,
  Store,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import delmarHero from "@/assets/delmar-hero.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const LivingInDelmar = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Living in Delmar, NY | Homes, Schools & Lifestyle Guide</title>
        <meta
          name="description"
          content="Discover what it's like living in Delmar, NY — top-rated Bethlehem schools, walkable neighborhoods, homes for sale, and a quick commute to Albany."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/living-in-delmar" />
        <meta property="og:title" content="Living in Delmar, NY | Capital District Nest" />
        <meta
          property="og:description"
          content="Homes, lifestyle, schools, and everything you need to know about one of the Capital District's most sought-after communities."
        />
        <meta property="og:image" content={delmarHero} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Place",
          name: "Delmar, NY",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Delmar",
            addressRegion: "NY",
            addressCountry: "US",
          },
          description:
            "Delmar, NY is one of the most desirable places to live in the Capital District, located in the town of Bethlehem.",
        })}</script>
      </Helmet>

      <MainHeader />

      <main>
        {/* HERO */}
        <section className="relative min-h-[88vh] flex items-end overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${delmarHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />

          <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-foreground/70 mb-6">
                Bethlehem · Albany County · NY
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] leading-[0.95] text-foreground mb-8">
                Living in <span className="font-semibold">Delmar, NY</span>
              </h1>
              <p className="text-lg md:text-2xl text-foreground/70 font-light max-w-2xl leading-relaxed mb-10">
                Homes, lifestyle, schools, and everything you need to know about one of the
                Capital District's most sought-after communities.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-7 h-12 text-base">
                  <Link to="#homes">View Homes</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 h-12 text-base">
                  <Link to="#lifestyle">Explore the Area</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full px-7 h-12 text-base">
                  <Link to="/dealdesk">
                    Talk to a Local Expert <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
              The Capital District's Hometown
            </p>
            <p className="text-2xl md:text-3xl font-light text-foreground/85 leading-[1.5] tracking-tight">
              Delmar, NY is one of the most desirable places to live in the Capital District —
              just minutes from downtown Albany, anchored by top-rated schools, walkable
              neighborhoods, and a strong sense of community.
            </p>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed font-light">
              Whether you're searching for homes for sale in Delmar NY, relocating to the Albany
              area, or looking for a long-term investment, Delmar continues to be one of the most
              stable and attractive real estate markets in Upstate New York.
            </p>
          </motion.div>
        </section>

        {/* WHY DELMAR */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-muted/30 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="mb-16 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
                Why Delmar
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-[-0.03em]">
                Why People Choose Delmar
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {[
                { icon: GraduationCap, title: "Top-Rated Schools", body: "Bethlehem Central School District — consistently ranked among the best in the Capital Region." },
                { icon: HomeIcon, title: "Strong Property Values", body: "Quiet, residential streets with steady long-term appreciation and low inventory." },
                { icon: Briefcase, title: "10–15 Min to Albany", body: "An easy commute to downtown, government offices, and the region's biggest employers." },
                { icon: Coffee, title: "Walkable Village Feel", body: "Local shops, coffee, and restaurants along Delaware Avenue — everything within a short walk." },
                { icon: Trees, title: "Parks & Trails", body: "Elm Avenue Park, the rail trail, and tree-lined streets built for outdoor living." },
                { icon: Users, title: "True Community", body: "Farmers markets, school events, and neighbors who actually know each other." },
              ].map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="bg-background p-10"
                >
                  <Icon className="w-7 h-7 text-primary mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOMES FOR SALE */}
        <section id="homes" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
                  Homes for Sale
                </p>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-[-0.03em]">
                  Homes for Sale in Delmar, NY
                </h2>
                <p className="mt-4 text-lg text-muted-foreground font-light">
                  Browse current listings — single-family homes, townhomes, and new construction.
                </p>
              </div>
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/towns/delmar">
                  View Full Market Intelligence <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div {...fadeUp} className="rounded-3xl overflow-hidden border border-border shadow-xl">
              <iframe
                className="w-full h-[720px]"
                src="https://scottalvarez.remax.com/embedsmall.php"
                title="Delmar NY Homes for Sale"
                loading="lazy"
              />
            </motion.div>

            <div className="text-center mt-10">
              <Button asChild size="lg" className="rounded-full px-8">
                <a
                  href="https://scottalvarez.remax.com/index.php?advanced=1&display=Delmar&keywords=City%3DBethlehem&pak=city%3Ag30_drd64p0&sortby=listings.price+ASC&rtype=map"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All Delmar Homes <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* LIFESTYLE */}
        <section id="lifestyle" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-foreground text-background">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-background/60 mb-6">
                Lifestyle
              </p>
              <h2 className="text-4xl md:text-5xl font-light tracking-[-0.03em] leading-[1.05] mb-8">
                What it's like living in Delmar.
              </h2>
              <p className="text-lg md:text-xl text-background/75 leading-relaxed font-light">
                Delmar offers a quiet, suburban lifestyle while staying closely connected to
                Albany's business and cultural centers. Tree-lined streets, local parks, and a
                strong sense of community define daily life. Whether it's a morning walk through
                the neighborhood, coffee on Delaware Avenue, or an evening at a community event,
                Delmar gives you a consistent, comfortable place to call home.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img src={delmarHero} alt="Delmar NY tree-lined neighborhood" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </section>

        {/* THINGS TO DO */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp} className="mb-16 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
                Around Town
              </p>
              <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-[-0.03em]">
                Things to Do in Delmar
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Trees, title: "Parks & Trails", body: "Elm Ave Park, Henry Hudson Trail, and miles of quiet residential streets." },
                { icon: Calendar, title: "Markets & Events", body: "Bethlehem Farmers Market, summer concerts, and seasonal community festivals." },
                { icon: Store, title: "Boutique Shops", body: "Independent retailers and specialty stores along Delaware Avenue." },
                { icon: Coffee, title: "Cafés & Restaurants", body: "Local coffee shops, family-owned eateries, and a growing dining scene." },
              ].map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="p-8 rounded-2xl border border-border hover:border-primary/40 transition-colors"
                >
                  <Icon className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SCHOOLS + COMMUTE — split */}
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-muted/30 border-y border-border">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp}>
              <GraduationCap className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Education</p>
              <h2 className="text-3xl md:text-4xl font-light tracking-[-0.03em] mb-6">
                Schools in Delmar, NY
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Delmar is part of the highly regarded <strong className="text-foreground font-medium">Bethlehem Central School District</strong>, consistently ranked among the top districts in the Capital Region. Families relocate here for the academic performance, extracurricular depth, and overall quality of education.
              </p>
            </motion.div>

            <motion.div {...fadeUp}>
              <MapPin className="w-8 h-8 text-primary mb-6" strokeWidth={1.5} />
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">Location</p>
              <h2 className="text-3xl md:text-4xl font-light tracking-[-0.03em] mb-6">
                Commute & Location
              </h2>
              <ul className="space-y-3 text-lg text-muted-foreground font-light">
                <li>• 10–15 minutes to downtown Albany</li>
                <li>• Easy access to I-87, I-90, and Route 9W</li>
                <li>• Close to government offices and major employers</li>
                <li>• Convenient for professionals across the Capital District</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* WHAT'S HAPPENING */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
              Live Community Pulse
            </p>
            <h2 className="text-4xl md:text-6xl font-light text-foreground tracking-[-0.03em] leading-[1.05] mb-8">
              What's happening in Delmar.
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
              This is what makes us different from Zillow. Weekly updates on new businesses
              opening, local events, market shifts, and neighborhood highlights — straight from
              the people who actually live and work here.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              {["Weekly Updates", "New Openings", "Local Events", "Market Pulse"].map((label) => (
                <div key={label} className="p-6 rounded-2xl bg-muted/40 border border-border">
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-1">Updated weekly</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* WORK WITH EXPERT */}
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-primary/5 border-y border-primary/20">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-6">
              Work With a Local Expert
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-[-0.03em] leading-[1.05] mb-8">
              Buying or selling in Delmar? Get a real strategy.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
              From understanding pricing trends to navigating competitive offers, working with a
              local expert who knows Bethlehem block by block makes the difference.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
              <Link to="/dealdesk">
                Talk to Scott Alvarez <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-8 text-center">
              Explore Nearby
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Homes in Albany, NY", to: "/albany-homes-for-sale" },
                { label: "Bethlehem Communities", to: "/communities" },
                { label: "Glenmont Area", to: "/communities" },
                { label: "Capital District Real Estate", to: "/towns/delmar" },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/40 transition-colors text-sm font-medium text-foreground text-center"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LivingInDelmar;
