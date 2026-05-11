import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Sparkles } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import TrustedLocalPartners from "@/components/town/TrustedLocalPartners";

const TOWNS = [
  { name: "Delmar", slug: "delmar" },
  { name: "Albany", slug: "albany" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Troy", slug: "troy" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Colonie", slug: "colonie" },
  { name: "Guilderland", slug: "guilderland" },
];

const LocalPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Local Businesses Across the Capital District | Capital District Nest</title>
      <meta
        name="description"
        content="Trusted lenders, attorneys, restaurants, home services, and local partners — curated by town across the Capital District."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/local" />
    </Helmet>

    <CleanHeader />

    {/* HERO (LIGHT) */}
    <section className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
          Local
        </p>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.02]">
          Local businesses across the Capital District.
        </h1>
        <p className="mt-6 text-lg text-[#1d1d1f]/65 font-light">
          Trusted lenders, attorneys, restaurants, home services, and local partners — curated by town.
        </p>
      </div>
    </section>

    {/* FEATURED PARTNERS (DARK) */}
    <TrustedLocalPartners
      townName="Capital District"
      variant="dark"
      eyebrow="Featured Partners"
      headline="Featured local partners."
      sub="A curated set of lenders, attorneys, and local favorites we recommend across the region."
    />

    {/* BROWSE BY TOWN (LIGHT) */}
    <section className="bg-white py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
            Browse by Town
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
            Explore local businesses by town.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {TOWNS.map((t) => (
            <Link
              key={t.slug}
              to={`/living-in/${t.slug}`}
              className="group rounded-2xl bg-white border border-[#1d1d1f]/[0.08] p-7 hover:border-[#0d6e66]/30 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-18px_rgba(13,110,102,0.25)] transition-all"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-2">
                {t.name}
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                Trusted partners in {t.name}.
              </h3>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6e66]">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* CLAIM CTA (DARK) */}
    <section className="bg-[#0e0f12] text-white py-24 md:py-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <Sparkles className="w-6 h-6 mx-auto mb-5 text-[#5eead4]" />
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
          Are you a local business?
        </h2>
        <p className="mt-5 text-lg font-light text-white/65">
          Get featured across town pages and reach Capital District buyers and homeowners.
        </p>
        <Link
          to="/claim-business"
          className="mt-9 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)]"
        >
          Claim Your Business <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>

    <Footer />
  </div>
);

export default LocalPage;
