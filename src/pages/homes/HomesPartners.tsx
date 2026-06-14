import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ArrowRight, Sparkles, MapPin, Building2, Crown, Star } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";

type Tier = {
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  icon: typeof Star;
  badge?: string;
};

const TIERS: Tier[] = [
  {
    name: "Free Profile",
    price: "$0",
    cadence: "always",
    tagline: "Basic presence in the Capital District Nest real estate directory.",
    features: [
      "Name or company",
      "Category & town visibility",
      "Basic contact link",
      "Website link",
    ],
    cta: { label: "Claim Free Profile", href: "/claim-business?category=real-estate" },
    icon: Star,
  },
  {
    name: "Featured Card",
    price: "$25",
    cadence: "per month",
    tagline: "Upgrade your local profile with a premium business card.",
    features: [
      "Photo or logo",
      "Phone, email, website",
      "Social media links",
      "Apple-style business card popup",
      "Featured badge",
      "Priority category placement",
    ],
    cta: { label: "Request Featured Card", href: "/claim-business?category=real-estate&tier=featured" },
    icon: Sparkles,
  },
  {
    name: "Town Spotlight",
    price: "$75",
    cadence: "per town / month",
    tagline: "Own stronger visibility in a specific town.",
    features: [
      "Featured placement on one town page",
      "Featured Partner badge",
      "Enhanced business card",
      "Priority in local services",
      "CTA buttons",
    ],
    cta: { label: "Request Town Spotlight", href: "/claim-business?category=real-estate&tier=town-spotlight" },
    icon: MapPin,
    featured: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Capital Region Core Market",
    price: "$199",
    cadence: "per month (launch)",
    tagline: "Visibility across Albany, Schenectady, Troy, and Saratoga Springs.",
    features: [
      "Placement across all four core markets",
      "Enhanced business card",
      "Category placement",
      "Rotating visibility inside /homes",
      "Social links & CTA buttons",
    ],
    cta: { label: "Request Core Market Package", href: "/claim-business?category=real-estate&tier=core-market" },
    icon: Building2,
  },
  {
    name: "Category Anchor Partner",
    price: "From $399",
    cadence: "per month",
    tagline: "Limited top placement for a major real estate service category.",
    features: [
      "Top category placement",
      "Regional visibility",
      "Featured sponsor position",
      "Town page placement",
      "/homes hub visibility",
    ],
    cta: { label: "Request Anchor Placement", href: "/claim-business?category=real-estate&tier=anchor" },
    icon: Crown,
  },
];

const CATEGORIES = [
  "Listing Agents",
  "Brokerages",
  "Mortgage & Lending",
  "Insurance",
  "Real Estate Attorneys",
  "Contractors",
  "Home Inspectors",
  "Property Management",
  "Appraisers",
  "Moving & Storage",
];

const TOWNS = [
  "Albany", "Schenectady", "Troy", "Saratoga Springs",
  "Delmar", "Clifton Park", "Colonie", "Niskayuna",
  "Guilderland", "Latham", "Queensbury", "Lake George",
];

const HomesPartners = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Capital District Nest Homes Partner Network | Local Real Estate Visibility</title>
        <meta
          name="description"
          content="Town-by-town real estate visibility for agents, brokerages, mortgage lenders, insurance agents, attorneys, contractors, inspectors, and property managers."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes/partners" />
      </Helmet>

      <CleanHeader />

      {/* HERO */}
      <section className="relative px-[5%] pt-28 pb-20 overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 30%, rgba(94,234,212,0.12), transparent 65%), radial-gradient(45% 60% at 80% 80%, rgba(13,110,102,0.18), transparent 70%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow-apple text-[#5eead4] mb-4">CAPITAL DISTRICT NEST HOMES PARTNER NETWORK</div>
          <h1 className="h-hero text-white mb-5">Real estate visibility by town.</h1>
          <p className="body-apple-dark max-w-3xl mx-auto mb-3">
            Get featured where local buyers, sellers, landlords, investors, and property
            owners are browsing property links and town real estate resources.
          </p>
          <p className="text-sm text-white/55 mb-10 max-w-3xl mx-auto">
            Available for agents, brokerages, mortgage lenders, insurance professionals,
            attorneys, contractors, inspectors, property managers, and local real estate
            service providers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#packages" className="btn-primary-apple">
              View Partner Packages <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/claim-business?category=real-estate"
              className="btn-secondary-apple-dark"
            >
              Claim Free Profile
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="packages" className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow-apple text-[#5eead4] mb-3">PARTNER PACKAGES</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
              Simple, town-specific visibility.
            </h2>
            <p className="body-apple-dark max-w-2xl mx-auto">
              Start free. Upgrade when you want enhanced placement in the towns that
              matter for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-2xl border p-6 flex flex-col ${
                    tier.featured
                      ? "border-[#5eead4]/60 bg-[#5eead4]/[0.06] shadow-[0_0_0_1px_rgba(94,234,212,0.2)]"
                      : "border-white/10 bg-[#1E2230]"
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#5eead4] text-[#0e0f12] text-[10px] font-bold tracking-wider">
                      {tier.badge}
                    </div>
                  )}
                  <Icon className="w-6 h-6 text-[#5eead4] mb-3" />
                  <div className="text-lg font-semibold text-white mb-1">{tier.name}</div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold text-white">{tier.price}</span>
                    {tier.cadence && (
                      <span className="text-xs text-white/55">/ {tier.cadence}</span>
                    )}
                  </div>
                  <p className="text-sm text-white/70 mb-4">{tier.tagline}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/75">
                        <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={tier.cta.href}
                    className={tier.featured ? "btn-primary-apple w-full justify-center" : "btn-secondary-apple-dark w-full justify-center"}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-white/45 text-center mt-6">
            Launch pricing. Subject to change. Category Anchor placement is limited per market.
          </p>
        </div>
      </section>

      {/* CATEGORIES + TOWNS */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow-apple text-[#5eead4] mb-3">CATEGORY TARGETING</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Real estate categories</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span key={c} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-sm text-white/85">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow-apple text-[#5eead4] mb-3">TOWN TARGETING</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Available towns</h3>
            <div className="flex flex-wrap gap-2">
              {TOWNS.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-sm text-white/85">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
            Serve buyers, sellers, landlords, or investors?
          </h2>
          <p className="body-apple-dark mb-6">
            Claim your free profile or request featured placement inside Capital District Nest Homes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/claim-business?category=real-estate" className="btn-primary-apple">
              Claim Free Profile
            </Link>
            <Link to="/claim-business?category=real-estate&tier=featured" className="btn-secondary-apple-dark">
              Request Featured Placement
            </Link>
          </div>
          <div className="text-xs text-white/55 mt-4">
            Capital District Nest is a local advertising and directory platform. We organize the local market. The inquiry goes to the listing source.
          </div>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

export default HomesPartners;
