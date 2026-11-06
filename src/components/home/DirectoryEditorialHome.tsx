import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Search, ChevronDown, Pause, Play } from "lucide-react";
import PropertyHero from "@/components/home/PropertyHero";
import SplitHero from "@/components/brand/SplitHero";
import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";
import { homeDirectorySearch } from "@/lib/homeDirectorySearch";
import { regionalSearchSubmit } from "@/lib/homeAnalytics";
import regionalPhoto from "@/assets/town-troy.jpg";
import restaurantsPhoto from "@/assets/category-restaurants.jpg";
import retailPhoto from "@/assets/category-retail.jpg";
import contractorsPhoto from "@/assets/category-contractors.jpg";
import carePhoto from "@/assets/wellness-care.jpg";
import ownersPhoto from "@/assets/category-services.jpg";
import propertyPhoto from "@/assets/town-albany.jpg";
import servicesPhoto from "@/assets/hero-finance-wide.jpg";

const towns = CAPITAL_DISTRICT_COUNTIES.flatMap((county) => county.towns);
const categories = ["Restaurant", "Coffee", "Retail", "Contractor", "Healthcare", "Dental", "Attorney", "Accountant", "Marketing"];
const phrases = ["a great dinner", "a trusted contractor", "a new favorite shop", "a local dentist", "the right advisor"];

const explorer = [
  { key: "eat", label: "Eat & drink", headline: "Find your next favorite table.", copy: "Restaurants, cafés and bars across the region.", to: homeDirectorySearch("restaurant"), cta: "Browse restaurants", image: restaurantsPhoto, alt: "A table set at a local restaurant" },
  { key: "shop", label: "Shop local", headline: "Independent shops, close to home.", copy: "Boutiques, makers and neighborhood stores.", to: homeDirectorySearch("retail"), cta: "Browse shops", image: retailPhoto, alt: "Goods displayed in a local shop" },
  { key: "home", label: "Home services", headline: "Help for every project at home.", copy: "Contractors, trades and home pros in the Capital District.", to: "/home-services", cta: "Find home services", image: contractorsPhoto, alt: "A contractor at work" },
  { key: "care", label: "Health & care", headline: "Care that’s close by.", copy: "Healthcare, dental and wellness providers near you.", to: homeDirectorySearch("healthcare"), cta: "Browse care providers", image: carePhoto, alt: "A calm wellness care setting" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const fn = () => setReduced(mq.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function FeatureExplorer() {
  const [active, setActive] = useState(0);
  const item = explorer[active];
  return (
    <div className="nest-explorer">
      <div className="nest-explorer-tabs" role="tablist" aria-label="Explore by category">
        {explorer.map((e, i) => (
          <button key={e.key} type="button" role="tab" id={`explore-tab-${e.key}`} aria-selected={i === active} aria-controls="explore-panel" onClick={() => setActive(i)} className="nest-explorer-tab">
            {e.label}
          </button>
        ))}
      </div>
      <div id="explore-panel" role="tabpanel" aria-labelledby={`explore-tab-${item.key}`} className="nest-explorer-panel">
        <div key={item.key} className="nest-swap">
          <img src={item.image} alt={item.alt} loading="lazy" />
          <div className="nest-explorer-caption">
            <p className="nest-explorer-headline">{item.headline}</p>
            <p className="nest-explorer-copy">{item.copy}</p>
            <Link to={item.to} className="nest-explorer-cta">{item.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DirectoryEditorialHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");
  const [phrase, setPhrase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const reduced = usePrefersReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (reduced || paused || searchActive) return;
    const t = window.setInterval(() => setPhrase((p) => (p + 1) % phrases.length), 2800);
    return () => window.clearInterval(t);
  }, [reduced, paused, searchActive]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    regionalSearchSubmit({ mode: "businesses", intentType: "directory_search", rawQuery: query.trim() });
    navigate(homeDirectorySearch(query, town, category));
  };

  return (
    <main id="main-content" className="nest-editorial-home">
      <section className="nest-discovery-hero relative isolate overflow-hidden" aria-labelledby="discovery-title">
        <img src={regionalPhoto} alt="Historic brick buildings along the waterfront in Troy, New York" className="nest-hero-photo absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
        <div className="nest-hero-shade absolute inset-0 -z-10" />
        <div className="nest-shell relative">
          <p className="nest-eyebrow nest-eyebrow--on-photo nest-rise">Capital District Nest</p>
          <h1 id="discovery-title" className="nest-display-hero mt-5 max-w-4xl nest-rise">Discover more of<br className="hidden sm:block" /> the Capital District.</h1>
          <p className="nest-hero-rotator mt-5 nest-rise">
            <span className="sr-only">Find restaurants, contractors, shops, dentists and advisors near you.</span>
            <span aria-hidden="true">Find{" "}
              <span className="nest-rotator-slot"><span key={phrase} className={reduced ? "" : "nest-rotator-word"}>{phrases[phrase]}.</span></span>
            </span>
            {!reduced && (
              <button type="button" onClick={() => setPaused((p) => !p)} className="nest-rotator-toggle" aria-label={paused ? "Play changing examples" : "Pause changing examples"}>
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            )}
          </p>

          <form ref={formRef} onSubmit={submit} onFocus={() => setSearchActive(true)} onBlur={(e) => { if (!formRef.current?.contains(e.relatedTarget as Node)) setSearchActive(false); }} role="search" aria-label="Search the local business directory" className="nest-search-card mt-9 max-w-4xl nest-rise nest-rise--late">
            <div className="nest-directory-search flex items-center gap-3 rounded-full p-2 pl-5 sm:pl-7">
              <Search className="hidden h-6 w-6 shrink-0 sm:block" aria-hidden="true" />
              <label htmlFor="homepage-directory-query" className="sr-only">Business name, service, or keyword</label>
              <input id="homepage-directory-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a business, service, or place" className="min-w-0 flex-1 bg-transparent py-3 text-base sm:text-lg focus:outline-none" />
              <button type="submit" className="nest-btn nest-search-submit"><Search className="h-4 w-4" aria-hidden="true" /><span>Search</span></button>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <div className="nest-filter-field flex items-center gap-2 rounded-full px-4">
                <MapPin className="h-4 w-4 shrink-0 nest-blue" aria-hidden="true" />
                <label htmlFor="homepage-town" className="sr-only">Location</label>
                <select id="homepage-town" value={town} onChange={(event) => setTown(event.target.value)} className="min-h-12 min-w-0 bg-transparent text-sm focus:outline-none">
                  <option value="">All locations</option>
                  {towns.map((place) => <option key={place.slug} value={place.slug}>{place.name}</option>)}
                </select>
              </div>
              <div className="nest-filter-field rounded-full px-4">
                <label htmlFor="homepage-category" className="sr-only">Business category</label>
                <select id="homepage-category" value={category} onChange={(event) => setCategory(event.target.value)} className="min-h-12 max-w-full bg-transparent text-sm focus:outline-none">
                  <option value="">All categories</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 text-sm">
                {["Restaurants", "Coffee", "Home services"].map((label, index) => <Link key={label} to={index === 2 ? "/home-services" : homeDirectorySearch(index === 0 ? "restaurant" : "coffee")} className="nest-chip-link">{label}<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>)}
              </div>
            </div>
          </form>
        </div>
        <a href="#discover-businesses" className="nest-hero-next">There’s more here <ChevronDown className="h-4 w-4" /></a>
      </section>

      <SplitHero
        id="discover-businesses"
        tone="ice"
        eyebrow="Discover Local Businesses"
        title="Find your next favorite."
        lead="Search thousands of Capital District businesses — restaurants, shops, services and more."
        cta={{ label: "Explore the directory", to: "/local" }}
        links={[{ label: "Business spotlights", to: "/businesses" }, { label: "Explore towns", to: "/communities" }]}
        media={<FeatureExplorer />}
      />

      <SplitHero
        id="grow-business"
        eyebrow="Start or Grow a Business"
        title="Give your business a next chapter."
        lead="Claim your free listing, get found locally and connect with support to grow."
        cta={{ label: "Find business support", to: "/business" }}
        links={[{ label: "For business owners", to: "/for-businesses" }, { label: "Claim or update a listing", to: "/claim-business" }]}
        image={{ src: ownersPhoto, alt: "A local business owner at work" }}
      />

      <SplitHero
        id="buy-sell-invest"
        tone="ice"
        eyebrow="Buy, Sell or Invest in Real Estate"
        title="Make your next move."
        lead="Explore homes and investment property, and run the numbers on multifamily and commercial deals."
        cta={{ label: "Explore property investing", to: "/investment-properties" }}
        links={[{ label: "Search live homes", to: "/homes" }, { label: "Multifamily analysis", to: "/analyze/multifamily" }, { label: "Selling a property", to: "/sell-investment-property" }]}
        image={{ src: propertyPhoto, alt: "Downtown Albany, New York" }}
      />

      <SplitHero
        id="business-services"
        eyebrow="Business Services"
        title="The right help. Right here."
        lead="Find local pros for websites, branding, marketing, accounting and legal support."
        cta={{ label: "Find local professionals", to: "/professional-services" }}
        links={[{ label: "Marketing services", to: "/local?search=marketing" }, { label: "Business advisors", to: "/local?search=business+consultant" }, { label: "Digital services by Coach One Media", to: "https://coachonemedia.com", external: true }]}
        image={{ src: servicesPhoto, alt: "Professionals reviewing plans together" }}
      />

      <div className="nest-home-resources">
        <div className="nest-shell py-12">
          <details className="nest-live-search">
            <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 text-lg font-normal"><span>Looking for a home? Search live with RealScout.</span><ChevronDown className="h-5 w-5 shrink-0" /></summary>
            <PropertyHero embedded />
          </details>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t pt-6 text-sm nest-hairline">
            {[{ label: "Events & stories", to: "/weekly" }, { label: "Property intelligence", to: "/analyze-any-property" }, { label: "Closing team", to: "/closing-team" }, { label: "Contact", to: "/contact" }].map((link) => <Link key={link.to} to={link.to} className="nest-quiet-link">{link.label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}
          </div>
        </div>
      </div>
    </main>
  );
}
