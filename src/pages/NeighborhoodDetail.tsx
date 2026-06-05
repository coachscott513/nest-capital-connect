import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Plus,
  Sparkles,
  Utensils,
  Coffee,
  ShoppingBag,
  Wrench,
  Calendar,
  Home,
  MapPin,
} from "lucide-react";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import CorridorStreetMap from "@/components/maps/CorridorStreetMap";
import { getCorridorData } from "@/data/corridors";
import {
  findNeighborhoodBySlug,
  getAllNeighborhoods,
  type MicroNeighborhood,
} from "@/data/neighborhoods";


const TEAL = "#5eead4";

function track(event: string, payload: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (a: string, b: string, c: Record<string, unknown>) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("event", event, { ...payload, page_path: window.location.pathname });
    }
  } catch { /* noop */ }
}




const NeighborhoodDetail = () => {
  const { slug = "" } = useParams();
  const n = findNeighborhoodBySlug(slug);

  useEffect(() => {
    if (!n) return;
    track("micro_neighborhood_view", {
      town_name: n.townName,
      town_slug: n.townSlug,
      neighborhood_name: n.name,
      neighborhood_slug: n.slug,
      source_page: "neighborhood_detail",
    });
  }, [n]);

  if (!n) {
    return <Navigate to="/neighborhoods" replace />;
  }

  const exploreBiz = `/local?town=${n.townSlug}&neighborhood=${n.slug}`;
  const exploreEvents = `/weekly?town=${n.townSlug}&neighborhood=${n.slug}`;
  const claim = `/claim-business?town=${n.townSlug}&neighborhood=${n.slug}`;
  const claimFeatured = `/claim-business?town=${n.townSlug}&neighborhood=${n.slug}&tier=featured`;
  const claimPremier = `/claim-business?town=${n.townSlug}&neighborhood=${n.slug}&tier=premier`;
  const submitEvent = `/submit-event?town=${n.townSlug}&neighborhood=${n.slug}`;

  const url = `https://www.capitaldistrictnest.com/neighborhoods/${n.slug}`;
  const title = `${n.name} ${n.townName}, NY | Capital District Nest`;
  const description = `Explore restaurants, taverns, cafés, shops, services, events, and local businesses on ${n.name} in ${n.townName}, NY.`;

  const others: MicroNeighborhood[] = getAllNeighborhoods()
    .filter((x) => x.slug !== n.slug && x.countySlug === n.countySlug)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>

      <MainHeader />

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,25,0.7) 0%, rgba(11,15,25,0.85) 60%, #0B0F19 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 30%, rgba(94,234,212,0.14), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28">
            <nav className="mb-6 text-xs text-white/60 flex flex-wrap items-center gap-1.5">
              <Link to="/neighborhoods" className="hover:text-white transition">Neighborhoods</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to={`/living-in/${n.townSlug}`} className="hover:text-white transition">{n.townName}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">{n.name}</span>
            </nav>
            <p className="text-[11px] font-semibold tracking-[0.32em] uppercase mb-6" style={{ color: TEAL }}>
              {n.townName.toUpperCase()} MICRO-DISTRICT
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-semibold tracking-[-0.04em] text-white leading-[1.02] max-w-4xl">
              Explore {n.name}.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 font-light max-w-3xl leading-relaxed">
              {n.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to={exploreBiz}
                onClick={() =>
                  track("micro_neighborhood_business_click", {
                    town_slug: n.townSlug, neighborhood_slug: n.slug,
                    source_page: "detail_hero", destination_url: exploreBiz,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                Explore Businesses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={exploreEvents}
                onClick={() =>
                  track("micro_neighborhood_event_click", {
                    town_slug: n.townSlug, neighborhood_slug: n.slug,
                    source_page: "detail_hero", destination_url: exploreEvents,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                View Events
              </Link>
              <Link
                to={claim}
                onClick={() =>
                  track("micro_neighborhood_claim_click", {
                    town_slug: n.townSlug, neighborhood_slug: n.slug,
                    source_page: "detail_hero", destination_url: claim,
                  })
                }
                className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white px-2 py-2 transition"
              >
                <Plus className="w-4 h-4" /> Claim Your Spot
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {n.tags.map((t) => (
                <span key={t} className="text-[10px] tracking-wide uppercase px-3 py-1.5 rounded-full border border-white/15 text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive corridor guide */}
        <section className="relative border-t border-white/[0.06] bg-background py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="max-w-3xl mb-10">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: TEAL }}>
                Interactive {n.name} Guide
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Walk the corridor.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light">
                Browse the businesses, services, and gathering spots along {n.name}. Featured partners are
                highlighted in teal — claim your spot to appear here.
              </p>
            </div>

            <CorridorStreetMap
              corridorName={n.name}
              cityName={n.townName}
              crossStreets={getCorridorData(n.slug).crossStreets}
              pins={getCorridorData(n.slug).pins}
              claimHref={claim}
              exploreHref={exploreBiz}
            />

          </div>
        </section>

        {/* Featured on */}
        <section className="relative border-t border-white/[0.06] bg-background py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: TEAL }}>
              Featured on {n.name}
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white max-w-3xl">
              Premium placements opening soon.
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/65 font-light max-w-3xl">
              Featured {n.name} placements are opening during the launch pilot. Local businesses can
              request a Featured Listing or Premier Business Page now.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={claimFeatured}
                onClick={() =>
                  track("micro_neighborhood_claim_click", {
                    town_slug: n.townSlug, neighborhood_slug: n.slug, tier: "featured",
                    source_page: "detail_featured", destination_url: claimFeatured,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
              >
                <Sparkles className="w-4 h-4" /> Request Featured Placement
              </Link>
              <Link
                to={claim}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Claim or Add Your Business
              </Link>
            </div>
          </div>
        </section>

        {/* Category grids — directory deep-links */}
        <section className="relative border-t border-white/[0.06] bg-background py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <CategoryCard
              icon={Utensils}
              title={`Eat & Drink on ${n.name}`}
              copy="Restaurants, taverns, bars, and cafés."
              href={`${exploreBiz}&search=restaurant&category=restaurants`}
            />
            <CategoryCard
              icon={Coffee}
              title="Coffee & Cafés"
              copy="Where the neighborhood starts the morning."
              href={`${exploreBiz}&search=coffee&category=coffee`}
            />
            <CategoryCard
              icon={ShoppingBag}
              title="Shops & Retail"
              copy="Boutiques, gifts, and indie retailers."
              href={`${exploreBiz}&search=shop&category=retail`}
            />
            <CategoryCard
              icon={Wrench}
              title="Services & Wellness"
              copy="Professional services, salons, fitness, and wellness."
              href={`${exploreBiz}&category=services`}
            />
            <CategoryCard
              icon={Calendar}
              title={`This Week on ${n.name}`}
              copy="Events, openings, and happenings."
              href={exploreEvents}
              cta="See Events"
            />
            <CategoryCard
              icon={Home}
              title={`Living Near ${n.name}`}
              copy={`Explore homes and apartments near ${n.name}.`}
              href="https://scottalvarez.remax.com/"
              external
              cta="Search Homes"
            />
          </div>
        </section>

        {/* Business owner CTA */}
        <section className="relative border-t border-white/[0.06] bg-background py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: TEAL }}>
                  For Business Owners
                </p>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                  Own a business on {n.name}?
                </h3>
                <p className="mt-3 text-white/65 font-light">
                  Your business can appear on the {n.name} Neighborhood Explorer with a profile, photos,
                  contact buttons, events, specials, and featured placement.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to={claim}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0B0F19] px-6 py-3 text-sm font-semibold hover:bg-[#5eead4] transition"
                >
                  <Plus className="w-4 h-4" /> Claim Your Spot
                </Link>
                <Link
                  to={claimPremier}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
                >
                  <Sparkles className="w-4 h-4" /> Request Premier Profile
                </Link>
                <Link
                  to={submitEvent}
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white px-2 py-3 transition"
                >
                  Submit Event
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO overview + related */}
        <section className="relative border-t border-white/[0.06] bg-background py-20 md:py-28">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2 max-w-3xl">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: TEAL }}>
                About {n.name}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.1] text-white">
                {n.name} {n.townName}, NY.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 font-light leading-relaxed">
                {n.description} Capital District Nest helps residents, visitors, and business owners
                discover {n.name} businesses, events, services, and local experiences in one place.
              </p>
            </div>

            {others.length > 0 && (
              <aside className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 md:p-7">
                <p className="text-[10px] font-semibold tracking-[0.28em] uppercase mb-4" style={{ color: TEAL }}>
                  More in {n.county}
                </p>
                <ul className="divide-y divide-white/[0.06]">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        to={`/neighborhoods/${o.slug}`}
                        className="flex items-center justify-between gap-3 py-3 group"
                      >
                        <span className="flex items-center gap-3 text-white/85 group-hover:text-white transition">
                          <Compass className="w-4 h-4" style={{ color: TEAL }} />
                          <span>
                            <span className="block">{o.name}</span>
                            <span className="block text-xs text-white/45">{o.townName}</span>
                          </span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

function CategoryCard({
  icon: Icon,
  title,
  copy,
  href,
  external,
  cta = "Explore",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  copy: string;
  href: string;
  external?: boolean;
  cta?: string;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between mb-5">
        <span className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/[0.04]">
          <Icon className="w-4 h-4" />
        </span>
        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition" />
      </div>
      <h3 className="text-xl font-semibold text-white tracking-[-0.02em]">{title}</h3>
      <p className="mt-2 text-sm text-white/65 font-light leading-relaxed">{copy}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:text-[#5eead4] transition">
        {cta} <ArrowRight className="w-4 h-4" />
      </span>
    </>
  );
  const cls = "group block rounded-3xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#5eead4]/40 transition p-7";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{content}</a>
  ) : (
    <Link to={href} className={cls}>{content}</Link>
  );
}

export default NeighborhoodDetail;
