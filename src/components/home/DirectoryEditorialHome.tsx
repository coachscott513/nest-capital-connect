import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import PropertyHero from "@/components/home/PropertyHero";
import { CAPITAL_DISTRICT_COUNTIES } from "@/data/capitalDistrictCounties";
import { homeDirectorySearch } from "@/lib/homeDirectorySearch";
import { regionalSearchSubmit } from "@/lib/homeAnalytics";
import regionalPhoto from "@/assets/town-troy.jpg";
import localPhoto from "@/assets/local-hero-mainstreet.jpg";
import ownersPhoto from "@/assets/category-services.jpg";
import propertyPhoto from "@/assets/town-albany.jpg";
import servicesPhoto from "@/assets/hero-finance-wide.jpg";

const towns = CAPITAL_DISTRICT_COUNTIES.flatMap((county) => county.towns);
const categories = ["Restaurant", "Coffee", "Retail", "Contractor", "Healthcare", "Dental", "Attorney", "Accountant", "Marketing"];

const features = [
  {
    id: "discover-businesses", number: "01", eyebrow: "Discover Local Businesses",
    title: "Your next favorite.\nCloser than you think.",
    copy: "Neighborhood restaurants. Independent shops. The people who make this place feel like home.",
    cta: "Explore the directory", to: "/local", image: localPhoto,
    links: [{ label: "Business spotlights", to: "/businesses" }, { label: "Explore towns", to: "/communities" }],
  },
  {
    id: "grow-business", number: "02", eyebrow: "Start or Grow a Business",
    title: "A local idea.\nA bigger possibility.",
    copy: "Build your presence, find professional support, and connect your business with the region around it.",
    cta: "Find business support", to: "/business", image: ownersPhoto,
    links: [{ label: "For business owners", to: "/for-businesses" }, { label: "Claim or update a listing", to: "/claim-business" }],
  },
  {
    id: "buy-sell-invest", number: "03", eyebrow: "Buy, Sell or Invest",
    title: "Make your next move\na considered one.",
    copy: "Explore real estate, run the numbers on commercial and multifamily properties, and find local business advisors.",
    cta: "Explore property investing", to: "/investment-properties", image: propertyPhoto,
    links: [{ label: "Commercial analysis", to: "/analyze/commercial" }, { label: "Multifamily analysis", to: "/analyze/multifamily" }, { label: "Selling a property", to: "/sell-investment-property" }],
  },
  {
    id: "business-services", number: "04", eyebrow: "Business Services",
    title: "Good businesses\ndon’t grow alone.",
    copy: "Websites, branding, marketing, accounting, and legal support. Find the right people for what comes next.",
    cta: "Find local professionals", to: "/professional-services", image: servicesPhoto,
    links: [{ label: "Marketing services", to: "/local?search=marketing" }, { label: "Business advisors", to: "/local?search=business+consultant" }],
  },
];

export default function DirectoryEditorialHome() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    regionalSearchSubmit({ mode: "businesses", intentType: "directory_search", rawQuery: query.trim() });
    navigate(homeDirectorySearch(query, town, category));
  };

  return (
    <main id="main-content" className="nest-editorial-home">
      <section className="nest-discovery-hero relative isolate overflow-hidden" aria-labelledby="discovery-title">
        <img src={regionalPhoto} alt="Historic brick buildings along the waterfront in Troy, New York" className="absolute inset-0 -z-20 h-full w-full object-cover" fetchPriority="high" />
        <div className="nest-hero-shade absolute inset-0 -z-10" />
        <div className="nest-editorial-inner relative">
          <p className="eyebrow-apple text-accent">Capital District Nest</p>
          <h1 id="discovery-title" className="h-hero nest-display mt-6 max-w-4xl">Discover more of<br className="hidden sm:block" /> the Capital District.</h1>
          <p className="nest-intro mt-6 max-w-xl text-foreground/80">Local businesses. New possibilities.<br />One place to begin.</p>

          <form onSubmit={submit} role="search" aria-label="Search the local business directory" className="mt-9 max-w-4xl">
            <div className="nest-directory-search flex items-center gap-3 rounded-full p-2 pl-5 sm:pl-7">
              <Search className="hidden h-6 w-6 shrink-0 sm:block" aria-hidden="true" />
              <label htmlFor="homepage-directory-query" className="sr-only">Business name, service, or keyword</label>
              <input id="homepage-directory-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a business, service, or place" className="min-w-0 flex-1 bg-transparent py-3 text-base sm:text-lg focus:outline-none" />
              <Button type="submit" className="btn-primary-apple nest-search-submit"><Search aria-hidden="true" /><span>Search</span></Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="nest-filter-field flex items-center gap-2 rounded-full px-4">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
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
            </div>
          </form>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
            {["Restaurants", "Coffee", "Home services"].map((label, index) => <Link key={label} to={index === 2 ? "/home-services" : homeDirectorySearch(index === 0 ? "restaurant" : "coffee")} className="nest-inline-link inline-flex min-h-11 items-center gap-2">{label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}
          </div>
        </div>
        <a href="#discover-businesses" className="nest-hero-next flex items-center gap-3 text-sm text-foreground/80">There’s more here <ChevronDown className="h-4 w-4" /></a>
      </section>

      {features.map((feature, index) => (
        <section id={feature.id} key={feature.id} className={`nest-editorial-feature relative isolate overflow-hidden ${index % 2 ? "nest-feature-right" : ""}`} aria-labelledby={`${feature.id}-title`}>
          <img src={feature.image} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="nest-feature-shade absolute inset-0 -z-10" />
          <div className="nest-editorial-inner">
            <Reveal className="nest-feature-copy">
              <div className="flex items-center gap-4"><span className="text-sm text-accent">{feature.number}</span><p className="eyebrow-apple text-foreground/80">{feature.eyebrow}</p></div>
              <h2 id={`${feature.id}-title`} className="h-section nest-display mt-6 whitespace-pre-line">{feature.title}</h2>
              <p className="nest-intro mt-6 max-w-lg text-foreground/80">{feature.copy}</p>
              <div className="cta-anchor"><Button asChild className="btn-dark-cta cta-arrow"><Link to={feature.to}>{feature.cta}<ArrowRight /></Link></Button></div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{feature.links.map((link) => <Link key={link.to} to={link.to} className="nest-inline-link inline-flex min-h-11 items-center gap-2 text-sm">{link.label}<ArrowUpRight className="h-3.5 w-3.5 shrink-0" /></Link>)}</div>
              {index === 2 && <Link to="/homes" className="nest-inline-link mt-2 inline-flex min-h-11 items-center gap-2 text-sm">Search live homes<ArrowRight className="h-4 w-4" /></Link>}
              {index === 3 && <a href="https://coachonemedia.com" target="_blank" rel="noopener noreferrer" className="nest-inline-link mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-foreground/70">Digital services by Coach One Media<ArrowUpRight className="h-3.5 w-3.5" /><span className="sr-only"> (opens in a new tab)</span></a>}
            </Reveal>
          </div>
        </section>
      ))}

      <div className="nest-home-resources bg-surface-deep">
        <div className="nest-editorial-inner py-12">
          <details className="nest-live-search">
            <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 text-lg font-medium"><span>Looking for a home? Search live with RealScout.</span><ChevronDown className="h-5 w-5 shrink-0" /></summary>
            <PropertyHero embedded />
          </details>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-sm">
            {[{ label: "Events & stories", to: "/weekly" }, { label: "Property intelligence", to: "/analyze-any-property" }, { label: "Closing team", to: "/closing-team" }, { label: "Contact", to: "/contact" }].map((link) => <Link key={link.to} to={link.to} className="nest-inline-link inline-flex min-h-11 items-center gap-2">{link.label}<ArrowUpRight className="h-3.5 w-3.5" /></Link>)}
          </div>
        </div>
      </div>
    </main>
  );
}