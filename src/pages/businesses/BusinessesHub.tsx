import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import {
  BUSINESS_CATEGORY_GROUPS,
} from "@/data/businessCategoryGroups";
import { categoryToSlug } from "@/lib/categorySlug";

const BusinessesHub = () => {
  const canonical = "https://www.capitaldistrictnest.com/businesses";
  const title = "Explore Local Businesses by Category | Capital District Nest";
  const description =
    "Discover restaurants, contractors, professional services, shops, healthcare providers, and community businesses across the Capital District.";

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CleanHeader />

      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-5">
            Local Business Discovery
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]">
            Explore local businesses by category.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light">
            Restaurants, contractors, professional services, shops, healthcare
            providers, and community businesses across the Capital District.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Browse Categories <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/local"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-semibold transition"
            >
              <Search className="w-4 h-4" /> Search Businesses
            </Link>
          </div>
        </div>
      </section>

      {/* Category groups */}
      <section id="categories" className="px-6 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto space-y-16">
          {BUSINESS_CATEGORY_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.id}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#0d6e66]/15 flex items-center justify-center text-[#5eead4] shrink-0">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {group.label}
                    </h2>
                    <p className="text-white/60 mt-1 max-w-2xl">{group.blurb}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {group.categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/businesses/${categoryToSlug(cat)}`}
                      className="group flex items-center justify-between px-4 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#0d6e66]/40 transition-all"
                    >
                      <span className="text-sm font-medium text-white/90 group-hover:text-white">
                        {cat}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#5eead4] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Owner CTA */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/[0.08] bg-white/[0.03] px-8 py-14">
          <Sparkles className="w-6 h-6 text-[#5eead4] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Own a business in the Capital District?
          </h2>
          <p className="text-white/65 mt-3 max-w-xl mx-auto">
            Claim your free profile, correct your information, or ask about a
            Capital District Nest Spotlight.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-semibold transition"
            >
              <CheckCircle className="w-4 h-4" /> Claim Your Business
            </Link>
            <Link
              to="/business-spotlight-intake"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Request a Spotlight <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessesHub;
