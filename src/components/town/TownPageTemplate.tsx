import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Globe,
  MapPin,
  Utensils,
  Store,
  CalendarDays,
  Wrench,
  Home as HomeIcon,
  Stethoscope,
  Plus,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import NeighborhoodGuide from "@/components/town/NeighborhoodGuide";
import type { LivingInTown } from "@/data/livingInTowns";
import { getTownOverride } from "@/data/townOverrides";
import {
  businesses as ALL_BUSINESSES,
  CATEGORY_GROUPS,
  type Business,
  type BusinessCategory,
} from "@/data/businesses";
import { weeklyFeed, type WeeklyFeedItem } from "@/data/weeklyFeed";
import { businessTelHref, isValidBusinessPhone } from "@/lib/businessContact";

/* =============================================================
   MASTER TOWN PAGE — Apple-style local discovery template.
   Used by /living-in/:slug for every town. Each section reads
   dynamic town context (town_name, town_slug, county, etc.) so
   the same template powers Delmar, Albany, Troy, Saratoga, …

   Locked brand: dark onyx canvas, teal accents, no blue.
   ============================================================= */

const TEAL = "#0d6e66";
const TEAL_DARK = "#5eead4";
const REMAX_BASE = "https://scottalvarez.remax.com/";
const contactStatusOf = (biz: Business) => (biz as any).contactStatus ?? (biz as any).contact_status ?? null;

interface Props {
  town: LivingInTown;
  beforeFooter?: React.ReactNode;
}

/* ---------- analytics ---------- */
function trackTown(event: string, payload: Record<string, unknown>) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}

/* ---------- category panel definitions ---------- */
interface CategoryPanel {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: (slug: string) => string;
  Icon: typeof Utensils;
  image: string;
}

const CAT_IMG = {
  dining: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  local: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=1400&q=80",
  events: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
  services: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=1400&q=80",
  homes: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
  health: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
};

const CATEGORY_PANELS: CategoryPanel[] = [
  {
    key: "restaurants",
    eyebrow: "Eat & Drink",
    title: "Restaurants & Taverns",
    body: "Dining, cafés, drinks, and neighborhood favorites.",
    cta: "Explore Dining",
    href: (s) => `/local?town=${s}&search=restaurant&category=restaurants`,
    Icon: Utensils,
    image: CAT_IMG.dining,
  },
  {
    key: "businesses",
    eyebrow: "Discover",
    title: "Local Businesses",
    body: "Shops, services, professionals, and local businesses.",
    cta: "Browse Businesses",
    href: (s) => `/local?town=${s}`,
    Icon: Store,
    image: CAT_IMG.local,
  },
  {
    key: "events",
    eyebrow: "This Week",
    title: "Events & Things To Do",
    body: "Community events, family activities, markets, and local happenings.",
    cta: "See Events",
    href: (s) => `/weekly?town=${s}`,
    Icon: CalendarDays,
    image: CAT_IMG.events,
  },
  {
    key: "services",
    eyebrow: "Home Services",
    title: "Contractors & Home Services",
    body: "Home improvement, repairs, maintenance, and trusted local service providers.",
    cta: "Find Services",
    href: (s) => `/local?town=${s}&search=contractor&category=home-services`,
    Icon: Wrench,
    image: CAT_IMG.services,
  },
  {
    key: "homes",
    eyebrow: "Homes",
    title: "Homes & Housing",
    body: "Explore homes, neighborhoods, housing resources, and local real estate guidance.",
    cta: "View Homes",
    href: () => `#homes`,
    Icon: HomeIcon,
    image: CAT_IMG.homes,
  },
  {
    key: "health",
    eyebrow: "Pros",
    title: "Health & Professional Services",
    body: "Healthcare, wellness, legal, finance, insurance, and local experts.",
    cta: "Explore Services",
    href: (s) => `/local?town=${s}&category=health-wellness`,
    Icon: Stethoscope,
    image: CAT_IMG.health,
  },
];

/* ---------- helpers ---------- */
const matchesTown = (b: Business, slug: string, townName: string) => {
  if (b.town === slug) return true;
  if (b.townLabel && b.townLabel.toLowerCase() === townName.toLowerCase()) return true;
  return false;
};

const isFoodCategory = (c: BusinessCategory) =>
  c === "Restaurant" || c === "Coffee" || c === "Bakery";

const isHomeServiceCategory = (c: BusinessCategory) =>
  CATEGORY_GROUPS["Home Services"].includes(c);

const matchesTownWeekly = (i: WeeklyFeedItem, slug: string, townName: string) => {
  if (i.scope === slug) return true;
  if (i.town && i.town.toLowerCase() === townName.toLowerCase()) return true;
  return false;
};

const EVENT_TYPES: WeeklyFeedItem["type"][] = [
  "event", "music", "sports", "dining", "family", "networking",
];

/* ---------- business card (compact, premium) ---------- */
const BizCard = ({
  biz,
  townSlug,
  townName,
  sourceLocation,
}: {
  biz: Business;
  townSlug: string;
  townName: string;
  sourceLocation: string;
}) => {
  const onClick = () =>
    trackTown("town_business_card_click", {
      town_name: townName,
      town_slug: townSlug,
      category: biz.category,
      business_slug: biz.slug,
      source_location: sourceLocation,
    });
  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/15 backdrop-blur-sm p-5 transition flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-1.5"
            style={{ color: TEAL_DARK }}
          >
            {biz.category}
          </p>
          <Link
            to={`/biz/${biz.slug}`}
            onClick={onClick}
            className="text-base font-semibold text-white tracking-[-0.005em] line-clamp-2 hover:text-[#5eead4] transition"
          >
            {biz.name}
          </Link>
          {biz.tagline && (
            <p className="mt-1.5 text-[13px] text-white/60 font-light leading-relaxed line-clamp-2">
              {biz.tagline}
            </p>
          )}
        </div>
        {biz.featured && (
          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-[3px] rounded-full border border-[#5eead4]/40 bg-[#5eead4]/10 text-[10px] font-medium tracking-[0.14em] uppercase text-[#5eead4]">
            <Sparkles className="w-2.5 h-2.5" /> Featured
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {isValidBusinessPhone(biz.phone, contactStatusOf(biz)) ? (
          <a
            href={businessTelHref(biz.phone, contactStatusOf(biz)) ?? undefined}
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[12px] font-medium text-white hover:bg-white/[0.1] transition"
          >
            <Phone className="w-3 h-3 text-[#5eead4]" /> Call Business
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[12px] font-medium text-white/45">
            <Phone className="w-3 h-3" /> Phone unavailable
          </span>
        )}
        {(biz.website || biz.website_url || biz.websiteUrl) && (
          <a
            href={(biz.website || biz.website_url || biz.websiteUrl) as string}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[12px] font-medium text-white hover:bg-white/[0.1] transition"
          >
            <Globe className="w-3 h-3 text-[#5eead4]" /> Website
          </a>
        )}
        {biz.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[12px] font-medium text-white hover:bg-white/[0.1] transition"
          >
            <MapPin className="w-3 h-3 text-[#5eead4]" /> Directions
          </a>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <Link
          to={`/biz/${biz.slug}`}
          onClick={onClick}
          className="inline-flex items-center gap-1 text-[12px] font-semibold text-white/80 hover:text-white transition"
        >
          View profile <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        {!biz.claimed && !biz.verified && (
          <Link
            to={`/claim-business?town=${townSlug}&business=${biz.slug}`}
            onClick={() =>
              trackTown("town_claim_business_click", {
                town_name: townName,
                town_slug: townSlug,
                category: biz.category,
                business_slug: biz.slug,
                source_location: `${sourceLocation}_card_claim`,
              })
            }
            className="text-[11px] font-medium text-white/45 hover:text-[#5eead4] transition"
          >
            Claim or update
          </Link>
        )}
      </div>
    </div>
  );
};

/* ---------- empty/recruitment state ---------- */
const EmptyCTA = ({
  headline,
  body,
  primary,
  secondary,
}: {
  headline: string;
  body: string;
  primary: { label: string; href: string; onClick?: () => void };
  secondary?: { label: string; href: string; onClick?: () => void };
}) => (
  <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm px-7 md:px-10 py-10 md:py-12 text-center">
    <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
      {headline}
    </h3>
    <p className="mt-3 text-white/65 font-light max-w-xl mx-auto leading-relaxed">{body}</p>
    <div className="mt-7 flex flex-wrap justify-center gap-2.5">
      <Link
        to={primary.href}
        onClick={primary.onClick}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: TEAL }}
      >
        {primary.label} <ArrowRight className="w-4 h-4" />
      </Link>
      {secondary && (
        <Link
          to={secondary.href}
          onClick={secondary.onClick}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/[0.08] transition"
        >
          {secondary.label}
        </Link>
      )}
    </div>
  </div>
);

/* ---------- the master template ---------- */
const TownPageTemplate = ({ town, beforeFooter }: Props) => {
  const o = getTownOverride(town.slug);
  const slug = town.slug;
  const name = town.townName;
  const url = `https://www.capitaldistrictnest.com/living-in/${slug}`;
  const heroImage = o.heroImage;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /* ----- dynamic data ----- */
  const townBiz = useMemo(
    () => ALL_BUSINESSES.filter((b) => matchesTown(b, slug, name)),
    [slug, name]
  );

  const featuredBiz = useMemo(
    () => townBiz.filter((b) => b.featured).slice(0, 6),
    [townBiz]
  );

  const restaurantBiz = useMemo(
    () => townBiz.filter((b) => isFoodCategory(b.category)).slice(0, 6),
    [townBiz]
  );

  const homeServicesBiz = useMemo(
    () => townBiz.filter((b) => isHomeServiceCategory(b.category)).slice(0, 6),
    [townBiz]
  );

  const townEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return weeklyFeed
      .filter((i) => EVENT_TYPES.includes(i.type))
      .filter((i) => matchesTownWeekly(i, slug, name))
      .filter((i) => {
        const end = i.endDate || i.startDate;
        if (!end) return true;
        return new Date(end + "T23:59:59") >= today;
      })
      .slice(0, 6);
  }, [slug, name]);

  const localUpdates = useMemo(
    () =>
      weeklyFeed
        .filter((i) => i.type === "news" || i.type === "development" || i.type === "business")
        .filter((i) => matchesTownWeekly(i, slug, name))
        .slice(0, 4),
    [slug, name]
  );

  /* ----- SEO ----- */
  const seoTitle = `Living in ${name}, NY | Capital District Nest`;
  const seoDescription = `Explore local businesses, restaurants, services, events, homes, and community updates in ${name}, NY on Capital District Nest.`;
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${name}, NY`,
    description: town.seoIntro,
    address: {
      "@type": "PostalAddress",
      addressLocality: name,
      addressRegion: "NY",
      postalCode: town.zip,
      addressCountry: "US",
    },
  };

  const submitEventHref = `/submit-event?town=${slug}`;
  const claimHref = `/claim-business?town=${slug}`;
  const premierHref = `/claim-business?town=${slug}&tier=premier`;
  const findMineHref = `/local?search=&town=${slug}`;
  const searchTownHref = `/local?town=${slug}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>
      </Helmet>

      <MainHeader />

      <main>
        {/* ═══════════ 1. CINEMATIC HERO ═══════════ */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroImage}
            alt={`${name}, NY`}
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,25,0.55) 0%, rgba(11,15,25,0.75) 55%, #0B0F19 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 30%, rgba(94,234,212,0.12), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-24 md:pb-36">
            <p
              className="text-[11px] font-semibold tracking-[0.32em] uppercase mb-6"
              style={{ color: TEAL_DARK }}
            >
              {name.toUpperCase()}, NY
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-[-0.04em] text-white leading-[1.02] max-w-4xl">
              Discover {name}.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 font-light max-w-2xl leading-relaxed">
              Restaurants, local businesses, events, services, homes, and community life in one
              Capital District discovery layer.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to={searchTownHref}
                onClick={() =>
                  trackTown("town_search_click", {
                    town_name: name,
                    town_slug: slug,
                    source_location: "town_hero",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                Search {name} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={claimHref}
                onClick={() =>
                  trackTown("town_claim_business_click", {
                    town_name: name,
                    town_slug: slug,
                    source_location: "town_hero",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                <Plus className="w-4 h-4" /> Add Your Business
              </Link>
              <a
                href="#homes"
                onClick={() =>
                  trackTown("town_homes_click", {
                    town_name: name,
                    town_slug: slug,
                    source_location: "town_hero_link",
                  })
                }
                className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white px-2 py-2 transition"
              >
                View Homes in {name} <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ 2. NEIGHBORHOOD GUIDE ═══════════ */}
        <NeighborhoodGuide townSlug={slug} townName={name} />

        {/* ═══════════ 3. APPLE-STYLE CATEGORY PANELS ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="mb-12 md:mb-16 max-w-3xl">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Explore {name}
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Everything happening in {name}.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light">
                Six ways to discover the people, places, and rhythm of {name} — all in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {CATEGORY_PANELS.map((p) => {
                const href = p.href(slug);
                const isAnchor = href.startsWith("#");
                const onClick = () => {
                  trackTown("town_category_tile_click", {
                    town_name: name,
                    town_slug: slug,
                    category: p.key,
                    source_location: "town_category_panels",
                  });
                  if (!isAnchor) {
                    trackTown("town_category_deeplink_click", {
                      town_name: name,
                      town_slug: slug,
                      category: p.key,
                      destination_url: href,
                      source_page: `/living-in/${slug}`,
                    });
                  }
                };
                const inner = (
                  <>
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-[1.04] transition duration-700"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(11,15,25,0.45) 0%, rgba(11,15,25,0.85) 70%, rgba(11,15,25,0.95) 100%)",
                      }}
                      aria-hidden
                    />
                    <div className="relative h-full p-8 md:p-10 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-3">
                        <p
                          className="inline-flex items-center px-2 py-[3px] rounded-full bg-white/[0.06] border border-white/15 text-[10px] font-semibold tracking-[0.18em] uppercase"
                          style={{ color: TEAL_DARK }}
                        >
                          {p.eyebrow}
                        </p>
                        <p.Icon className="w-4 h-4 text-white/45" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                        {p.title} in {name}.
                      </h3>
                      <p className="mt-2 text-sm md:text-[15px] text-white/65 font-light max-w-md leading-relaxed">
                        {p.body}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4] group-hover:text-white transition">
                        {p.cta} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </>
                );
                const cls =
                  "group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F1424] hover:border-white/20 transition aspect-[16/10] md:aspect-[16/9]";
                return isAnchor ? (
                  <a key={p.key} href={href} onClick={onClick} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link key={p.key} to={href} onClick={onClick} className={cls}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ 3. FEATURED LOCAL BUSINESSES ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-12">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Featured in {name}
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Local businesses, brought to life.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light">
                Featured profiles with photos, services, events, contact buttons, and shareable
                business pages.
              </p>
            </div>

            {featuredBiz.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {featuredBiz.map((b) => (
                  <BizCard
                    key={b.slug}
                    biz={b}
                    townSlug={slug}
                    townName={name}
                    sourceLocation="town_featured_partners"
                  />
                ))}
              </div>
            ) : (
              <EmptyCTA
                headline={`Featured ${name} placements are opening soon.`}
                body={`Local businesses can request a Premier Business Page or Featured Listing during the launch pilot.`}
                primary={{
                  label: "Request Featured Placement",
                  href: premierHref,
                  onClick: () =>
                    trackTown("town_featured_partner_click", {
                      town_name: name,
                      town_slug: slug,
                      source_location: "town_featured_empty_primary",
                    }),
                }}
                secondary={{
                  label: "Claim or Add Your Business",
                  href: claimHref,
                  onClick: () =>
                    trackTown("town_claim_business_click", {
                      town_name: name,
                      town_slug: slug,
                      source_location: "town_featured_empty_secondary",
                    }),
                }}
              />
            )}
          </div>
        </section>

        {/* ═══════════ 4. EVENTS IN THIS TOWN ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-12">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                This Week
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                This week in {name}.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light">
                Local events, dining specials, community happenings, family activities, and things
                to do nearby.
              </p>
            </div>

            {townEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {townEvents.map((ev, i) => (
                  <a
                    key={`${ev.title}-${i}`}
                    href={ev.cta?.href || "/weekly"}
                    target={ev.cta?.href && /^https?:/.test(ev.cta.href) ? "_blank" : undefined}
                    rel={ev.cta?.href && /^https?:/.test(ev.cta.href) ? "noopener noreferrer" : undefined}
                    onClick={() =>
                      trackTown("town_event_click", {
                        town_name: name,
                        town_slug: slug,
                        category: ev.type,
                        event_title: ev.title,
                        source_location: "town_events_grid",
                      })
                    }
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/15 p-6 transition flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-flex items-center px-2 py-[3px] rounded-full bg-[#5eead4]/10 border border-[#5eead4]/35 text-[10px] font-semibold tracking-[0.16em] uppercase"
                        style={{ color: TEAL_DARK }}
                      >
                        {ev.date}
                      </span>
                      {ev.time && (
                        <span className="text-[11px] text-white/55 font-medium tracking-wide">
                          {ev.time}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-[-0.01em] line-clamp-2">
                      {ev.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 font-light leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>
                    {(ev.venue || ev.town) && (
                      <p className="mt-3 text-[12px] text-white/50 inline-flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#5eead4]" />
                        {[ev.venue, ev.town].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5eead4] group-hover:text-white transition">
                      View Event <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <EmptyCTA
                headline={`Have an event in ${name}?`}
                body={`Restaurants, venues, schools, nonprofits, and local groups can submit events to be considered for Capital District Nest.`}
                primary={{
                  label: "Add Your Event",
                  href: submitEventHref,
                  onClick: () =>
                    trackTown("town_submit_event_click", {
                      town_name: name,
                      town_slug: slug,
                      source_location: "town_events_empty",
                    }),
                }}
              />
            )}
          </div>
        </section>

        {/* ═══════════ 5. RESTAURANTS & TAVERNS ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                  style={{ color: TEAL_DARK }}
                >
                  Eat & Drink
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                  Restaurants & taverns in {name}.
                </h2>
              </div>
              <Link
                to={`/local?town=${slug}&search=restaurant&category=restaurants`}
                onClick={() =>
                  trackTown("town_category_deeplink_click", {
                    town_name: name,
                    town_slug: slug,
                    category: "restaurants",
                    destination_url: `/local?town=${slug}&search=restaurant&category=restaurants`,
                    source_page: `/living-in/${slug}`,
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4] hover:text-white transition"
              >
                View all dining <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {restaurantBiz.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {restaurantBiz.map((b) => (
                  <BizCard
                    key={b.slug}
                    biz={b}
                    townSlug={slug}
                    townName={name}
                    sourceLocation="town_restaurants"
                  />
                ))}
              </div>
            ) : (
              <EmptyCTA
                headline={`Restaurants in ${name} are coming online.`}
                body={`If you run a restaurant, café, or tavern in ${name}, claim or add your listing to be featured here.`}
                primary={{ label: "Claim or Add Your Restaurant", href: claimHref }}
                secondary={{ label: "Browse Capital District Dining", href: "/local?group=Local%20Lifestyle" }}
              />
            )}
          </div>
        </section>

        {/* ═══════════ 6. CONTRACTORS & HOME SERVICES ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <p
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                  style={{ color: TEAL_DARK }}
                >
                  Home Services
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                  Contractors & home services near {name}.
                </h2>
              </div>
              <Link
                to={`/local?town=${slug}&search=contractor&category=home-services`}
                onClick={() =>
                  trackTown("town_category_deeplink_click", {
                    town_name: name,
                    town_slug: slug,
                    category: "home-services",
                    destination_url: `/local?town=${slug}&search=contractor&category=home-services`,
                    source_page: `/living-in/${slug}`,
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4] hover:text-white transition"
              >
                View all services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {homeServicesBiz.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {homeServicesBiz.map((b) => (
                  <BizCard
                    key={b.slug}
                    biz={b}
                    townSlug={slug}
                    townName={name}
                    sourceLocation="town_home_services"
                  />
                ))}
              </div>
            ) : (
              <EmptyCTA
                headline={`Trusted home pros in ${name} are being verified.`}
                body={`Contractors, plumbers, electricians, painters, HVAC, landscapers, and handyman pros — claim or add your business to be listed here.`}
                primary={{ label: "Claim or Add Your Business", href: claimHref }}
                secondary={{
                  label: "Browse Capital District Pros",
                  href: "/local?group=Home%20Services",
                }}
              />
            )}
          </div>
        </section>

        {/* ═══════════ 7. HOMES & HOUSING ═══════════ */}
        <section
          id="homes"
          className="relative bg-background border-t border-white/[0.06] py-20 md:py-28"
        >
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p
                  className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                  style={{ color: TEAL_DARK }}
                >
                  Homes
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                  Homes and neighborhoods in {name}.
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/65 font-light leading-relaxed">
                  Search homes, explore local housing resources, and request matching listings.
                  Real estate is one part of {name} — not the whole story.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={REMAX_BASE}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackTown("town_homes_click", {
                        town_name: name,
                        town_slug: slug,
                        category: "mls_open",
                        source_location: "town_homes_section",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                  >
                    Open Full MLS Search <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <Link
                    to={`/homes?town=${slug}&intent=matches`}
                    onClick={() =>
                      trackTown("town_homes_click", {
                        town_name: name,
                        town_slug: slug,
                        category: "matches_request",
                        source_location: "town_homes_section",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
                  >
                    Send Me Matching Homes
                  </Link>
                </div>
                <p className="mt-4 text-[12px] text-white/45 font-light">
                  Opens our MLS-powered home search in a new tab.
                </p>
              </div>

              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-white/[0.08]">
                <img
                  src={CAT_IMG.homes}
                  alt={`${name} homes`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,15,25,0.1) 0%, rgba(11,15,25,0.6) 100%)",
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ 8. LOCAL MEDIA / TOWN UPDATES ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-12">
              <p
                className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
                style={{ color: TEAL_DARK }}
              >
                Updates
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Local updates near {name}.
              </h2>
            </div>

            {localUpdates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {localUpdates.map((u, i) => (
                  <a
                    key={`${u.title}-${i}`}
                    href={u.external_article_url || u.original_url || "/weekly"}
                    target={u.external_article_url || u.original_url ? "_blank" : undefined}
                    rel={u.external_article_url || u.original_url ? "noopener noreferrer" : undefined}
                    className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/15 p-5 transition flex flex-col"
                  >
                    <p
                      className="text-[10px] font-semibold tracking-[0.18em] uppercase mb-2"
                      style={{ color: TEAL_DARK }}
                    >
                      {u.categoryBadgeOverride || u.type}
                    </p>
                    <h3 className="text-base font-semibold text-white tracking-[-0.005em] line-clamp-3">
                      {u.title}
                    </h3>
                    {u.summary && (
                      <p className="mt-2 text-[13px] text-white/60 font-light leading-relaxed line-clamp-3">
                        {u.summary}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-white/65 group-hover:text-white transition">
                      {u.source_name || "Read more"} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-6 py-10 text-center text-white/55 text-sm font-light">
                Local updates are being added.
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ 9. BUSINESS OWNER CTA ═══════════ */}
        <section className="relative isolate overflow-hidden bg-background border-t border-white/[0.06] py-20 md:py-28">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full blur-[180px] pointer-events-none"
            style={{ backgroundColor: "rgba(94,234,212,0.18)" }}
          />
          <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
            <p
              className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-5"
              style={{ color: TEAL_DARK }}
            >
              For Business Owners
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.05] text-white">
              Own a business in {name}?
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 font-light leading-relaxed">
              Your business may already be listed on Capital District Nest. Claim your profile,
              update your information, add photos, submit events, or request featured placement.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                to={findMineHref}
                onClick={() =>
                  trackTown("town_search_click", {
                    town_name: name,
                    town_slug: slug,
                    source_location: "town_owner_cta_find",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                Find My Business
              </Link>
              <Link
                to={claimHref}
                onClick={() =>
                  trackTown("town_claim_business_click", {
                    town_name: name,
                    town_slug: slug,
                    source_location: "town_owner_cta_claim",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition"
                style={{ backgroundColor: TEAL }}
              >
                Claim or Add Business <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={premierHref}
                onClick={() =>
                  trackTown("town_featured_partner_click", {
                    town_name: name,
                    town_slug: slug,
                    source_location: "town_owner_cta_premier",
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                <Sparkles className="w-4 h-4 text-[#5eead4]" /> Request Premier Profile
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ 10. SEO OVERVIEW ═══════════ */}
        <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <p
              className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ color: TEAL_DARK }}
            >
              About {name}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.025em] leading-[1.1] text-white">
              Living in {name}, NY
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/70 font-light leading-relaxed">
              {town.seoIntro ||
                `${name} is one of the Capital District's most recognized communities, known for local businesses, neighborhood dining, parks, schools, services, housing options, and easy access to the broader Albany region. Capital District Nest helps residents and visitors explore ${name} businesses, events, restaurants, services, homes, and local resources in one place.`}
            </p>
            {town.nearbyTowns && town.nearbyTowns.length > 0 && (
              <div className="mt-10">
                <p
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase mb-3 text-white/45"
                >
                  Nearby
                </p>
                <div className="flex flex-wrap gap-2">
                  {town.nearbyTowns.map((n) => (
                    <Link
                      key={n.slug}
                      to={`/living-in/${n.slug}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[12px] font-medium text-white/75 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition"
                    >
                      {n.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {beforeFooter}
      <Footer />
    </div>
  );
};

export default TownPageTemplate;
