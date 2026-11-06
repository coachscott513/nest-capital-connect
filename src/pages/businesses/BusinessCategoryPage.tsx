import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Link,
  useParams,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  MapPin,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { slugToCategory, categoryToSlug } from "@/lib/categorySlug";
import { findGroupForCategory } from "@/data/businessCategoryGroups";
import { spotlightsForCategory } from "@/data/businessSpotlights";
import { useDbBusinesses, townMatches } from "@/hooks/useDbBusinesses";
import { matchesOfficialCategory } from "@/data/officialCategories";

const TOWNS: { label: string; slug: string }[] = [
  { label: "Albany", slug: "albany" },
  { label: "Troy", slug: "troy" },
  { label: "Saratoga Springs", slug: "saratoga-springs" },
  { label: "Schenectady", slug: "schenectady" },
  { label: "Delmar", slug: "delmar" },
  { label: "Clifton Park", slug: "clifton-park" },
  { label: "Guilderland", slug: "guilderland" },
  { label: "Niskayuna", slug: "niskayuna" },
  { label: "Colonie", slug: "colonie" },
  { label: "Latham", slug: "latham" },
  { label: "Queensbury", slug: "queensbury" },
  { label: "Lake George", slug: "lake-george" },
];

const BusinessCategoryPage = () => {
  const { categorySlug = "" } = useParams();
  const [params] = useSearchParams();
  const townFilter = params.get("town") ?? "";

  const category = slugToCategory(categorySlug);
  if (!category) return <Navigate to="/businesses" replace />;

  const group = findGroupForCategory(category);
  const spotlights = spotlightsForCategory(category);
  const { rows, loading } = useDbBusinesses({ limit: 200 });

  const filtered = useMemo(() => {
    const inCategory = rows.filter((r) =>
      matchesOfficialCategory(
        {
          category: r.category,
          subcategory: r.subcategory,
          name: r.name,
          description: r.about,
          tags: r.tags,
        },
        category,
      ),
    );
    if (!townFilter) return inCategory;
    return inCategory.filter((r) => townMatches(r, townFilter));
  }, [rows, category, townFilter]);

  const relatedCategories = (group?.categories ?? [])
    .filter((c) => c !== category)
    .slice(0, 6);

  const canonicalBase = "https://www.capitaldistrictnest.com/businesses/";
  const canonical = `${canonicalBase}${categorySlug}`;
  const title = `Capital District ${category} | Capital District Nest`;
  const description = `Discover ${category.toLowerCase()} businesses across Albany, Troy, Saratoga, Schenectady, Delmar, and surrounding Capital District communities.`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {townFilter && <meta name="robots" content="noindex, follow" />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <CleanHeader />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/businesses"
            className="text-xs font-semibold tracking-[0.22em] uppercase text-primary hover:text-foreground transition"
          >
            ← All categories
          </Link>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.24em] uppercase text-primary">
            Capital District {category}
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-[-0.02em] leading-[1.05]">
            {category} to explore across the Capital District.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl font-light">
            Discover local {category.toLowerCase()} businesses, owner stories,
            and places worth knowing across Albany, Troy, Saratoga, Schenectady,
            Delmar, and surrounding communities.
          </p>
        </div>
      </section>

      {/* Spotlights */}
      {spotlights.length > 0 && (
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 mb-3">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">
                    Nest Spotlights
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Capital District Nest Spotlights
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  {spotlights.length === 1 ? "One local business" : "Local businesses"} we're currently
                  highlighting through original stories, approved media, and
                  local discovery content.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {spotlights.map((s) => {
                const href = s.profileRoute ?? "/business-spotlight-intake";
                const isLive = s.status === "published";
                return (
                  <Link
                    key={s.slug}
                    to={href}
                    className="group block rounded-2xl overflow-hidden border border-white/[0.08] bg-secondary hover:border-primary/50 transition-all"
                  >
                    <div className="relative aspect-[4/3] bg-primary/10 overflow-hidden">
                      {s.heroImage ? (
                        <img
                          src={s.heroImage}
                          alt={s.businessName}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-10 h-10 text-primary/40" />
                        </div>
                      )}
                      {s.hasVideo && (
                        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                          <Play className="w-4 h-4 text-foreground fill-white" />
                        </div>
                      )}
                      {!isLive && (
                        <div className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.18em] uppercase px-2 py-1 rounded-full bg-black/60 backdrop-blur text-primary">
                          In production
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground mb-2">
                        <span>{s.category}</span>
                        <span>•</span>
                        <span>{s.town}</span>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition">
                        {s.businessName}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {s.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                        {isLive ? "View Spotlight" : "Nominate a business"}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Directory */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Explore more local {category.toLowerCase()} businesses
              {townFilter && (
                <span className="text-muted-foreground font-normal"> in {townFilter.replace(/-/g, " ")}</span>
              )}
            </h2>
            {townFilter && (
              <Link
                to={`/businesses/${categorySlug}`}
                className="text-xs font-semibold text-primary hover:text-foreground"
              >
                Clear town filter
              </Link>
            )}
          </div>

          {loading ? (
            <div className="text-muted-foreground text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-secondary p-10 text-center">
              <p className="text-muted-foreground">
                No {category.toLowerCase()} businesses found
                {townFilter ? ` in ${townFilter.replace(/-/g, " ")}` : ""} yet.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Link
                  to="/claim-business"
                  className="text-xs font-semibold text-primary hover:text-foreground"
                >
                  Add your business →
                </Link>
                <Link
                  to="/local"
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Search the full directory →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.slice(0, 24).map((b) => (
                <div
                  key={b.slug}
                  className="rounded-xl border border-white/[0.08] bg-secondary p-5 hover:border-primary/40 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {b.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {b.category}
                        {b.townLabel ? ` • ${b.townLabel}` : ""}
                      </p>
                    </div>
                    {b.claimed && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                        Claimed
                      </span>
                    )}
                  </div>
                  {b.tagline && (
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {b.tagline}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/local?business=${encodeURIComponent(b.slug)}`}
                      className="text-xs font-semibold text-primary hover:text-foreground inline-flex items-center gap-1"
                    >
                      View Profile <ArrowRight className="w-3 h-3" />
                    </Link>
                    {b.website && (
                      <a
                        href={b.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        Website <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                to={`/local?category=${categorySlug}`}
                className="text-sm font-semibold text-primary hover:text-foreground inline-flex items-center gap-1"
              >
                See all {category.toLowerCase()} businesses in the directory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* By town */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Browse {category.toLowerCase()} businesses by town
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOWNS.map((t) => (
              <Link
                key={t.slug}
                to={`/businesses/${categorySlug}?town=${t.slug}`}
                className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary hover:bg-secondary border border-white/[0.06] hover:border-primary/40 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  {t.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related categories */}
      {relatedCategories.length > 0 && (
        <section className="px-6 md:px-10 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
              Related categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {relatedCategories.map((c) => (
                <Link
                  key={c}
                  to={`/businesses/${categoryToSlug(c)}`}
                  className="group flex items-center justify-between px-4 py-3 rounded-xl bg-secondary hover:bg-secondary border border-white/[0.06] hover:border-primary/40 transition"
                >
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    {c}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Owner CTA */}
      <section className="px-6 md:px-10 pb-24">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/[0.08] bg-secondary px-8 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Own a {category.toLowerCase()} business in this category?
          </h2>
          <p className="text-muted-foreground mt-3">
            Claim your free profile, correct your information, or ask about a
            Capital District Nest Spotlight.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/claim-business"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-border bg-secondary hover:bg-secondary text-sm font-semibold transition"
            >
              <CheckCircle className="w-4 h-4" /> Claim Your Business
            </Link>
            <Link
              to="/business-spotlight-intake"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition"
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

export default BusinessCategoryPage;
