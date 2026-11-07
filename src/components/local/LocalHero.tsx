import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, Building2 } from "lucide-react";
import heroImg from "@/assets/local-hero-mainstreet.jpg";
import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";
import { normalizeLocalSearch } from "@/lib/redundantGeoSearch";

const CHIPS = [
  { label: "Restaurants & Taverns", q: "Restaurant" },
  { label: "Contractors", q: "Contractor" },
  { label: "Healthcare", q: "Healthcare" },
  { label: "Dental", q: "Dental" },
  { label: "Wellness", q: "Wellness" },
  { label: "Finance", q: "Financial Advisor" },
  { label: "Real Estate", q: "Real Estate" },
  { label: "Auto", q: "Auto" },
];

const track = (action: string, payload: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      source_location: "local_hero",
      page_path: window.location.pathname,
      ...payload,
    });
  }
};

const scrollToDirectory = () => {
  const el = document.getElementById("directory");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ALL_TOWNS = CAPITAL_DISTRICT_COUNTIES.flatMap((c) => c.towns);

const titleize = (value: string) =>
  value
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** Resolve a `town` query value (slug or display name) to its real label. */
const townLabel = (raw: string) => {
  const norm = raw.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const match = ALL_TOWNS.find(
    (t) => t.slug === norm || t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === norm,
  );
  return match?.name ?? titleize(raw);
};

const LocalHero = () => {
  const [params] = useSearchParams();
  const town = params.get("town")?.trim() ?? "";
  const category = params.get("category")?.trim() ?? "";
  const search = normalizeLocalSearch(params.get("search") ?? params.get("q") ?? "", Boolean(town));
  const isFiltered = Boolean(town || category || search);

  /* ── Filtered state: a compact, premium town/category header ──
     One eyebrow, one H1, one line of subcopy, then results.       */
  if (isFiltered) {
    const place = town ? townLabel(town) : "";
    const cat = category ? titleize(category) : "";
    const heading = cat
      ? `${cat} in ${place || "the Capital District"}`
      : place
        ? `Businesses & services in ${place}`
        : "Local businesses & services";

    return (
      <section className="relative w-full overflow-hidden border-b border-white/[0.06] bg-[#0B0F19]">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 60% at 50% 0%, rgba(94,234,212,0.09), transparent 70%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-24 md:pt-32 pb-8 md:pb-12">
          <p className="text-[10px] font-medium tracking-[0.42em] uppercase text-[#5eead4]">
            Local directory
          </p>
          <h1 className="mt-5 text-[2rem] sm:text-4xl md:text-[3.25rem] font-extralight tracking-[-0.04em] leading-[1.06] text-white text-balance max-w-3xl">
            {heading}
          </h1>
          <p className="mt-4 text-[15px] md:text-[16.5px] font-light leading-[1.6] text-white/55 max-w-xl">
            Find local businesses, home services, professionals and everyday
            essentials.
          </p>
          {search && (
            <p className="mt-4 text-[12.5px] font-light text-white/40">
              Matching “{search}”
            </p>
          )}
        </div>
      </section>
    );
  }

  /* ── Unfiltered /local: the full editorial entry point ── */
  return (
    <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
      {/* Cinematic background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover opacity-[0.55]"
          width={1920}
          height={1080}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,15,25,0.55) 0%, rgba(11,15,25,0.75) 55%, #0B0F19 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 20%, rgba(94,234,212,0.10), transparent 65%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-32 md:pt-40 pb-14 md:pb-20 text-center">
        <p className="text-[10px] font-medium tracking-[0.42em] uppercase text-[#5eead4]">
          Local directory
        </p>
        <h1 className="mt-5 text-4xl sm:text-5xl md:text-[4rem] font-extralight tracking-[-0.04em] leading-[1.04] text-white">
          Discover local businesses.
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
          Restaurants, contractors, healthcare, finance, real estate services,
          and local experts across the Capital District.
        </p>

        <div className="mt-9 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              track("local_hero_cta_click", { cta: "search_businesses" });
              scrollToDirectory();
            }}
            className="inline-flex items-center gap-2 min-h-[44px] px-7 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
          >
            <Search className="w-4 h-4" /> Search Businesses
          </button>
          <Link
            to="/claim-business"
            onClick={() => track("local_hero_cta_click", { cta: "claim_business" })}
            className="inline-flex items-center gap-2 min-h-[44px] px-7 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            <Building2 className="w-4 h-4" /> Claim Your Business
          </Link>
        </div>

        {/* Category chips */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
          {CHIPS.map((c) => (
            <Link
              key={c.label}
              to={`/local?category=${encodeURIComponent(c.q)}`}
              onClick={() => track("local_hero_chip_click", { category: c.label })}
              className="px-4 py-2 rounded-full text-xs md:text-sm font-medium text-white/75 border border-white/12 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 transition"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Owner CTA strip */}
      <div className="relative border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-[#5eead4]">
              For Owners
            </p>
            <p className="mt-1 text-white font-light text-base md:text-lg tracking-[-0.01em]">
              Own a local business? Claim, update, or feature your profile.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                track("local_hero_cta_click", { cta: "find_my_business" });
                scrollToDirectory();
              }}
              className="min-h-[44px] px-5 rounded-full text-xs md:text-sm font-semibold text-white border border-white/12 bg-white/[0.04] hover:bg-white/[0.09] transition"
            >
              Find My Business
            </button>
            <Link
              to="/claim-business"
              onClick={() => track("local_hero_cta_click", { cta: "claim_business_strip" })}
              className="inline-flex items-center min-h-[44px] px-5 rounded-full text-xs md:text-sm font-semibold text-white border border-white/12 bg-white/[0.04] hover:bg-white/[0.09] transition"
            >
              Claim Profile
            </Link>
            <Link
              to="/pricing"
              onClick={() => track("local_hero_cta_click", { cta: "featured_placement" })}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-5 rounded-full text-xs md:text-sm font-semibold bg-[#c9a449] text-[#0B0F19] hover:opacity-90 transition"
            >
              Request Featured Placement <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalHero;
