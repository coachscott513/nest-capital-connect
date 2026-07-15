import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
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
import EditorialBreather from "@/components/EditorialBreather";
import { BUSINESS_CATEGORY_GROUPS } from "@/data/businessCategoryGroups";
import {
  BUSINESS_SPOTLIGHTS,
  SPOTLIGHT_LABEL_TEXT,
  type BusinessSpotlight,
  type SpotlightLabel,
} from "@/data/businessSpotlights";
import {
  PREVIEW_BUSINESSES,
  PREVIEW_LABEL_TEXT,
  type PreviewBusiness,
  type PreviewLabel,
  type PreviewGroup,
} from "@/data/previewBusinesses";
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
  { icon: BookOpen, label: "Original Stories" },
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

/* ---------- Shared status chip ---------- */
const chipClassFor = (label: SpotlightLabel) => {
  switch (label) {
    case "spotlight":
      return "border-[#5eead4]/60 text-[#5eead4] bg-[#5eead4]/5";
    case "preview":
      return "border-white/25 text-white/90 bg-white/[0.04]";
    case "coming_soon":
      return "border-white/10 text-white/60 bg-white/[0.02]";
    case "claim_available":
      return "border-[#c9a449]/60 text-[#c9a449] bg-[#c9a449]/5";
  }
};

const StatusChip = ({ label }: { label: SpotlightLabel }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase border backdrop-blur ${chipClassFor(
      label
    )}`}
  >
    {SPOTLIGHT_LABEL_TEXT[label]}
  </span>
);

/* ---------- Reusable business card ---------- */
const BusinessCard = ({ s }: { s: BusinessSpotlight }) => {
  const isLinkable = s.status === "published" && s.profileRoute;
  const href = isLinkable ? s.profileRoute! : "/business-spotlight-intake";
  return (
    <Link
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
        <div className="absolute top-3 left-3">
          <StatusChip label={s.label} />
        </div>
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
};
/* ---------- Preview chip + card ---------- */
const previewChipClass = (label: PreviewLabel) => {
  switch (label) {
    case "spotlight":
      return "border-[#5eead4]/60 text-[#5eead4] bg-[#5eead4]/5";
    case "owner_verified":
      return "border-[#c9a449]/60 text-[#c9a449] bg-[#c9a449]/5";
    case "owner_review_pending":
      return "border-white/25 text-white/85 bg-white/[0.04]";
    case "preview":
    default:
      return "border-white/15 text-white/75 bg-white/[0.03]";
  }
};

const PreviewChip = ({ label }: { label: PreviewLabel }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase border backdrop-blur ${previewChipClass(
      label
    )}`}
  >
    {PREVIEW_LABEL_TEXT[label]}
  </span>
);

const PreviewCard = ({ b }: { b: PreviewBusiness }) => {
  const href = b.customRoute ?? `/business/${b.slug}`;
  const claimHref = `/claim-business?slug=${encodeURIComponent(b.slug)}`;
  const displayCat = b.displayCategory ?? b.category;
  const canClaim = b.label !== "owner_verified";
  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-[#0d6e66]/50 transition">
      <Link to={href} className="block p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/50">
            {displayCat} · {b.town}
          </p>
          <PreviewChip label={b.label} />
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight group-hover:text-[#5eead4] transition">
          {b.name}
        </h3>
        <p className="mt-2 text-sm text-white/65 line-clamp-3">{b.summary}</p>
      </Link>
      <div className="px-5 pb-5 pt-1 flex items-center justify-between gap-3">
        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5eead4] hover:text-white transition"
        >
          Explore Profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        {canClaim && (
          <Link
            to={claimHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition"
          >
            Claim or Update
          </Link>
        )}
      </div>
    </article>
  );
};

const PREVIEW_GROUPS: PreviewGroup[] = [
  "Food & Drink",
  "Home & Property",
  "Professional Services",
  "Health & Wellness",
  "Retail & Lifestyle",
  "Nonprofit & Community",
];

/* ================================================================
   DISCOVER SHELF — Apple TV-style horizontal category browser.
   Each card occupies ~78vw and shows huge photography, a slogan,
   and one Explore CTA. Clicking lands on the category's editorial
   landing page, never a search grid.
   ================================================================ */
const DiscoverShelf = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.82), behavior: "smooth" });
  };

  return (
    <section
      id="discover"
      className="relative border-t border-white/[0.06] pt-20 md:pt-28 pb-24 md:pb-32 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10 md:mb-14 flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.32em] uppercase text-[#5eead4]">
            Discover
          </p>
          <h2 className="mt-3 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[0.98]">
            Fourteen ways
            <br className="hidden md:block" />
            <span className="text-white/85">to explore the Capital District.</span>
          </h2>
          <p className="mt-6 text-white/60 text-base md:text-lg font-light max-w-xl leading-relaxed">
            Not a directory. A collection of places worth knowing — presented one at a time,
            the way you'd flip through a great magazine.
          </p>
        </div>
        <div className="hidden md:flex gap-2 shrink-0">
          <button
            aria-label="Previous category"
            onClick={() => scrollByCard(-1)}
            className="w-12 h-12 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/[0.04] flex items-center justify-center transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            aria-label="Next category"
            onClick={() => scrollByCard(1)}
            className="w-12 h-12 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/[0.04] flex items-center justify-center transition"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-10 pl-6 md:pl-10 pr-6 md:pr-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {BUSINESS_CATEGORY_GROUPS.map((group) => {
          const firstCat = group.categories[0];
          const href = `/businesses/${categoryToSlug(firstCat)}`;
          const img = GROUP_IMAGES[group.id];
          return (
            <Link
              key={group.id}
              to={href}
              className="group snap-start shrink-0 relative w-[86vw] md:w-[72vw] lg:w-[78vw] xl:w-[1120px] aspect-[4/5] md:aspect-[16/10] rounded-[32px] overflow-hidden border border-white/[0.08] hover:border-white/25 transition"
            >
              {img && (
                <img
                  src={img}
                  alt={group.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition duration-[1200ms] group-hover:scale-[1.04]"
                />
              )}
              {/* Cinematic gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/60 via-transparent to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-16">
                <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.32em] uppercase text-[#5eead4]">
                  {group.label}
                </p>
                <h3 className="mt-4 md:mt-5 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] leading-[0.98] max-w-3xl">
                  {group.slogan}
                </h3>
                <div className="mt-8 md:mt-10 flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-white group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="text-white/50 text-xs md:text-sm">
                    {group.categories.length} categories
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Trailing spacer so the last card can scroll flush */}
        <div className="shrink-0 w-1" aria-hidden />
      </div>

      {/* Mobile hint */}
      <div className="md:hidden text-center text-xs text-white/40 mt-2 tracking-wider uppercase">
        Swipe to explore →
      </div>
    </section>
  );
};



const BusinessesHub = () => {
  const canonical = "https://www.capitaldistrictnest.com/businesses";
  const title = "Local Businesses | Capital District Nest";
  const description =
    "The businesses that make the Capital District worth living in — original stories, local favorites, and trusted professionals across Albany, Troy, Saratoga, Schenectady, Delmar, Clifton Park, and beyond.";

  const featured = BUSINESS_SPOTLIGHTS.filter(
    (s) => s.status === "published" || s.featured
  ).slice(0, 6);

  const recentlyAdded = [...BUSINESS_SPOTLIGHTS]
    .filter((s) => s.addedAt)
    .sort((a, b) => (b.addedAt! > a.addedAt! ? 1 : -1))
    .slice(0, 8);

  const [groupFilter, setGroupFilter] = useState<PreviewGroup | "All">("All");
  const [townFilter, setTownFilter] = useState<string>("All");

  const previewTowns = useMemo(
    () =>
      Array.from(new Set(PREVIEW_BUSINESSES.map((b) => b.town))).sort(),
    []
  );

  const visiblePreviews = useMemo(
    () =>
      PREVIEW_BUSINESSES.filter(
        (b) =>
          (groupFilter === "All" || b.categoryGroup === groupFilter) &&
          (townFilter === "All" || b.town === townFilter)
      ),
    [groupFilter, townFilter]
  );


  const rooseveltTemplate = BUSINESS_SPOTLIGHTS.find(
    (s) => s.slug === "the-roosevelt-room"
  );
  const cassonePreview = BUSINESS_SPOTLIGHTS.find((s) => s.slug === "cassone");

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

      {/* Hero — restrained typographic */}
      <section className="relative px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-5">
            Local Businesses
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-[1.03]">
            The businesses that make the Capital District worth living in.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light">
            Original stories, local favorites, and trusted professionals —
            organized so you can find them and connect with them directly.
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
      </section>

      {/* Currently Featured */}
      <section className="px-6 md:px-10 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                Editorial
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                Currently Featured
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm">
              Businesses we're currently highlighting — not a ranking, an
              editorial selection updated as we publish more stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((s) => (
              <BusinessCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      {/* =========================================================
          DISCOVER — Apple TV-style immersive category shelf.
          Horizontal, one big card at a time. No grid. No filters.
          Each category is a destination, not a directory tile.
          ========================================================= */}
      <DiscoverShelf />


      <EditorialBreather
        eyebrow="For Business"
        quote="Every town has a business worth writing about. We help you find them."
      />

      {/* Browse by Town */}
      <section className="px-6 md:px-10 pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                By Place
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                Browse by Town
              </h2>
            </div>
            <p className="text-white/60 max-w-md text-sm">
              Each town has its own guide — businesses, stories, and
              neighborhoods woven into a single place.
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
                  <h3 className="text-lg font-semibold tracking-tight">
                    {t.name}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/70 group-hover:text-[#5eead4] transition">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Business Previews */}
      <section
        id="founding-previews"
        className="px-6 md:px-10 pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
              Founding Business Previews
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
              Local businesses we're preparing to feature.
            </h2>
            <p className="mt-4 text-white/70">
              These profiles use verified public information and are awaiting
              owner review, approved media, and additional business details.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {(["All", ...PREVIEW_GROUPS] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGroupFilter(g as PreviewGroup | "All")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                    groupFilter === g
                      ? "border-[#5eead4] text-[#5eead4] bg-[#5eead4]/10"
                      : "border-white/15 text-white/70 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/40 mr-1">
                Town
              </span>
              <button
                onClick={() => setTownFilter("All")}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  townFilter === "All"
                    ? "border-white/40 text-white bg-white/[0.08]"
                    : "border-white/10 text-white/60 hover:text-white hover:border-white/25"
                }`}
              >
                All towns
              </button>
              {previewTowns.map((t) => (
                <button
                  key={t}
                  onClick={() => setTownFilter(t)}
                  className={`px-3 py-1 rounded-full text-xs border transition ${
                    townFilter === t
                      ? "border-white/40 text-white bg-white/[0.08]"
                      : "border-white/10 text-white/60 hover:text-white hover:border-white/25"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {visiblePreviews.length === 0 ? (
            <p className="text-white/50 text-sm">
              No previews match those filters yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visiblePreviews.map((b) => (
                <PreviewCard key={b.slug} b={b} />
              ))}
            </div>
          )}

          <p className="mt-8 text-xs text-white/45">
            Showing {visiblePreviews.length} of {PREVIEW_BUSINESSES.length}{" "}
            founding previews.
          </p>
        </div>
      </section>

      {/* Recently Added */}
      {recentlyAdded.length > 0 && (
        <section className="px-6 md:px-10 pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                  Fresh
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                  Recently Added
                </h2>
              </div>
              <p className="text-white/60 max-w-md text-sm">
                The newest business pages on Capital District Nest.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {recentlyAdded.map((s) => (
                <BusinessCard key={s.slug} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spotlight Templates & Profile Previews */}
      <section className="px-6 md:px-10 pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
              How Pages Work
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
              Spotlight Templates & Profile Previews.
            </h2>
            <p className="mt-4 text-white/70">
              Every business on Capital District Nest starts as one of two
              things. Here's exactly what each looks like — nothing hidden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooseveltTemplate && (
              <Link
                to={rooseveltTemplate.profileRoute!}
                className="group block rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-[#5eead4]/40 transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={rooseveltTemplate.heroImage}
                    alt={rooseveltTemplate.businessName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <StatusChip label="spotlight" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {rooseveltTemplate.businessName}
                  </h3>
                  <p className="mt-3 text-white/70">
                    This is what a full editorial Spotlight looks like —
                    original photography, story, and direct connection.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4]">
                    View the Spotlight <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )}

            {cassonePreview && (
              <Link
                to={cassonePreview.profileRoute!}
                className="group block rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] hover:border-white/25 transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0d6e66]/25 via-[#0B0F19] to-black">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-semibold tracking-tight text-white/80">
                      Cassone
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <StatusChip label="preview" />
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {cassonePreview.businessName}
                  </h3>
                  <p className="mt-3 text-white/70">
                    This is what an in-progress Profile Preview looks like —
                    drafted from public information, awaiting owner review.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    View the Preview <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Browse All Businesses */}
      <section className="px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/local"
            className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-[#0d6e66]/40 transition block px-8 py-14 md:px-14 md:py-20"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                  The Full Directory
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                  Browse all businesses.
                </h2>
                <p className="mt-4 text-white/70">
                  Search every business in the Capital District — restaurants,
                  contractors, healthcare, professional services, and more.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] group-hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition self-start md:self-auto">
                Open the Directory <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Owner CTA — Claim or complete your profile */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] px-8 py-14 md:py-16">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#5eead4]">
            For Business Owners
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
            Claim or complete your profile.
          </h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Own one of the businesses featured here? Claim your page. Not
            featured yet? Request a Spotlight and tell us your story.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d6e66] hover:bg-[#0d6e66]/90 text-white text-sm font-semibold transition"
            >
              Claim Your Business <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/business-spotlight-intake"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 hover:border-white/50 bg-white/[0.05] hover:bg-white/[0.1] text-sm font-semibold transition"
            >
              Request a Spotlight
            </Link>
          </div>
        </div>
      </section>

      {/* Quiet trust bar */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-5xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-3 gap-x-4">
            {DIFFERENTIATORS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs text-white/60"
              >
                <Icon
                  className="w-3.5 h-3.5 text-[#5eead4]/80 shrink-0"
                  strokeWidth={1.75}
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BusinessesHub;
