import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  Camera,
  BookOpen,
  Users,
  MapPin,
  Phone,
  RefreshCw,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { BUSINESS_CATEGORY_GROUPS } from "@/data/businessCategoryGroups";
import { BUSINESS_SPOTLIGHTS } from "@/data/businessSpotlights";
import { categoryToSlug } from "@/lib/categorySlug";

import imgRestaurants from "@/assets/category-restaurants.jpg";
import imgContractors from "@/assets/category-contractors.jpg";
import imgServices from "@/assets/category-services.jpg";
import imgWellness from "@/assets/wellness-fitness.jpg";
import imgRetail from "@/assets/category-retail.jpg";
import imgAuto from "@/assets/hero-business-wide.jpg";

import townAlbany from "@/assets/town-albany.jpg";
import townTroy from "@/assets/town-troy.jpg";
import townSaratoga from "@/assets/town-saratoga.jpg";
import townDelmar from "@/assets/town-delmar.jpg";
import townCliftonPark from "@/assets/town-clifton-park.jpg";
import townSchenectady from "@/assets/town-schenectady.jpg";

const GROUP_IMAGES: Record<string, string> = {
  "food-drink": imgRestaurants,
  "home-property": imgContractors,
  "professional-services": imgServices,
  "health-wellness": imgWellness,
  "automotive-transportation": imgAuto,
  "shopping-creative-community": imgRetail,
};

const DIFFERENTIATORS = [
  { icon: BookOpen, label: "Original Business Stories" },
  { icon: Users, label: "Owner Profiles" },
  { icon: Camera, label: "Local Photography" },
  { icon: MapPin, label: "Community Features" },
  { icon: Phone, label: "Direct Contact" },
  { icon: RefreshCw, label: "Updated by Real People" },
];

const TOWNS: { name: string; slug: string; image?: string }[] = [
  { name: "Albany", slug: "albany", image: townAlbany },
  { name: "Troy", slug: "troy", image: townTroy },
  { name: "Saratoga Springs", slug: "saratoga-springs", image: townSaratoga },
  { name: "Delmar", slug: "delmar", image: townDelmar },
  { name: "Clifton Park", slug: "clifton-park", image: townCliftonPark },
  { name: "Schenectady", slug: "schenectady", image: townSchenectady },
  { name: "Latham", slug: "latham" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Queensbury", slug: "queensbury" },
  { name: "Lake George", slug: "lake-george" },
  { name: "Hudson", slug: "hudson" },
  { name: "Greenville", slug: "greenville" },
];

const BusinessesHub = () => {
  const canonical = "https://www.capitaldistrictnest.com/businesses";
  const title = "Discover Local Businesses | Capital District Nest";
  const description =
    "Discover the businesses that make the Capital District worth living in — original stories, local favorites, trusted professionals, and exceptional places across Albany, Troy, Saratoga, Schenectady, Delmar, Clifton Park, and beyond.";

  const featured = BUSINESS_SPOTLIGHTS.slice(0, 6);

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
      <section className="relative px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-5">
            The Registry
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.03]">
            Discover the businesses that make the Capital District worth living in.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light">
            Original stories, local favorites, trusted professionals, and
            exceptional places across Albany, Troy, Saratoga, Schenectady,
            Delmar, Clifton Park, and beyond.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Browse by Category <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/local"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] text-sm font-semibold transition"
            >
              <Search className="w-4 h-4" /> Search Businesses
            </Link>
          </div>
        </div>

        {/* Differentiator strip */}
        <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-3 gap-x-4">
            {DIFFERENTIATORS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/85">
                <Icon className="w-4 h-4 text-[#5eead4] shrink-0" strokeWidth={1.75} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category — editorial photo tiles */}
      <section id="categories" className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                The Registry
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                Browse by Category
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm">
              Six pillars, dozens of categories. Every path leads to real local
              businesses — reviewed, photographed, and connected across the site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESS_CATEGORY_GROUPS.map((group) => {
              const firstCat = group.categories[0];
              const href = `/businesses/${categoryToSlug(firstCat)}`;
              const img = GROUP_IMAGES[group.id];
              return (
                <Link
                  key={group.id}
                  to={href}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/5] border border-white/[0.08] block"
                >
                  {img && (
                    <img
                      src={img}
                      alt={group.label}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4] mb-2">
                      {group.categories.length} categories
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.01em] leading-tight">
                      {group.label}
                    </h3>
                    <p className="mt-2 text-sm text-white/75 max-w-sm">{group.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#5eead4] transition">
                      Explore <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore by Town */}
      <section className="px-6 md:px-10 pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                By Place
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                Explore by Town
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm">
              Each town has its own guide — businesses, stories, and neighborhoods
              woven into a single place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TOWNS.map((t) => (
              <Link
                key={t.slug}
                to={`/living-in/${t.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-white/[0.08] block bg-white/[0.03]"
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0d6e66]/25 via-[#0B0F19] to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="relative z-10 h-full flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/70 group-hover:text-[#5eead4] transition">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Featured */}
      <section className="px-6 md:px-10 pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                Editorial
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                Recently Featured
              </h2>
            </div>
            <Link
              to="/stories"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#5eead4] transition"
            >
              View All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s) => {
              const isPublished = s.status === "published";
              const href = isPublished && s.profileRoute ? s.profileRoute : "/business-spotlight-intake";
              return (
                <Link
                  key={s.slug}
                  to={href}
                  className="group block rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-[#0d6e66]/50 transition"
                >
                  <div className="relative aspect-[4/3] bg-[#0d6e66]/10 overflow-hidden">
                    {s.heroImage ? (
                      <img
                        src={s.heroImage}
                        alt={s.businessName}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#0d6e66]/30 via-[#0B0F19] to-black" />
                    )}
                    {!isPublished && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase bg-black/60 border border-white/20 text-white/90 backdrop-blur">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/50">
                      {s.category} · {s.town}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-[#5eead4] transition">
                      {s.businessName}
                    </h3>
                    <p className="mt-2 text-sm text-white/65 line-clamp-3">{s.summary}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Owner CTA — Tell Your Story */}
      <section className="px-6 md:px-10 pb-24 pt-4">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-8 py-14">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
            For Business Owners
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
            Tell Your Story.
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Join the Capital District Nest community and create a beautiful
            business profile with photography, editorial storytelling, and
            direct connections to local residents.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/[0.1] text-sm font-semibold transition"
            >
              Claim Your Business
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
