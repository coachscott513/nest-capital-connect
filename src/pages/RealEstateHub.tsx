import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Home, Users, Banknote, Shield, Scale, Wrench, GraduationCap, Building2, Trees, KeyRound, Search, Star } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

/* =============================================================
   /real-estate — Capital District Real Estate & Housing Hub.
   Apple-style premium hub. Not just listings — a full ecosystem
   connecting homebuyers, sellers, investors, agents, lenders,
   insurance, attorneys, contractors, and housing resources.
   ============================================================= */

const MLS_URL = "/homes/search/albany";

type GTag = (...args: any[]) => void;

const track = (name: string, payload: Record<string, any>) => {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GTag }).gtag;
  if (typeof gtag === "function") gtag("event", name, payload);
};

interface CategoryPanel {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  text: string;
  cta: string;
  href: string;
  external?: boolean;
  trackCategory: string;
  destination: string;
}

const CATEGORY_PANELS: CategoryPanel[] = [
  {
    key: "homes",
    icon: Home,
    headline: "Homes for Sale",
    text: "Search active homes across the Capital District through our smart home search.",
    cta: "Open Smart Home Search",
    href: MLS_URL,
    external: false,
    trackCategory: "homes_for_sale",
    destination: MLS_URL,
  },

  {
    key: "agents",
    icon: Users,
    headline: "Real Estate Agents",
    text: "Find local agents, buyer specialists, listing experts, and neighborhood advisors.",
    cta: "Find Agents",
    href: "/local?category=real-estate",
    trackCategory: "real_estate_agents",
    destination: "/local?category=real-estate",
  },
  {
    key: "mortgage",
    icon: Banknote,
    headline: "Mortgage Lenders",
    text: "Connect with lenders for pre-approvals, low-down-payment options, and financing guidance.",
    cta: "Find Lenders",
    href: "/local?category=mortgage",
    trackCategory: "mortgage_lenders",
    destination: "/local?category=mortgage",
  },
  {
    key: "insurance",
    icon: Shield,
    headline: "Insurance Agencies",
    text: "Home, auto, landlord, flood, and investment property insurance providers.",
    cta: "Find Insurance",
    href: "/local?category=insurance",
    trackCategory: "insurance",
    destination: "/local?category=insurance",
  },
  {
    key: "attorneys",
    icon: Scale,
    headline: "Real Estate Attorneys",
    text: "Local attorneys for closings, title, contracts, and property transactions.",
    cta: "Find Attorneys",
    href: "/local?category=legal-services",
    trackCategory: "real_estate_attorneys",
    destination: "/local?category=legal-services",
  },
  {
    key: "contractors",
    icon: Wrench,
    headline: "Contractors & Home Services",
    text: "Renovation, repairs, inspections, HVAC, plumbing, roofing, landscaping, and more.",
    cta: "Find Contractors",
    href: "/local?category=contractors",
    trackCategory: "contractors",
    destination: "/local?category=contractors",
  },
  {
    key: "grants",
    icon: GraduationCap,
    headline: "First-Time Buyer Grants",
    text: "Explore grants, low-down-payment programs, FHA options, and buyer assistance.",
    cta: "Explore Buyer Help",
    href: "#buyer-resources",
    trackCategory: "buyer_grants",
    destination: "#buyer-resources",
  },
  {
    key: "investments",
    icon: Building2,
    headline: "Multi-Unit Investments",
    text: "Analyze rental properties, cash flow, cap rates, and investment opportunities.",
    cta: "Explore Investments",
    href: "/intelligence",
    trackCategory: "multi_unit_investments",
    destination: "/intelligence",
  },
  {
    key: "land",
    icon: Trees,
    headline: "Land & Rehab Properties",
    text: "Find land, rehab homes, fixer-uppers, and value-add opportunities.",
    cta: "Explore Opportunities",
    href: "/homes",
    trackCategory: "land_rehab",
    destination: "/homes",
  },
  {
    key: "property-management",
    icon: KeyRound,
    headline: "Property Management",
    text: "Find property managers, maintenance support, and rental resources.",
    cta: "Find Property Management",
    href: "/local?category=property-management",
    trackCategory: "property_management",
    destination: "/local?category=property-management",
  },
];

const EXPERT_CARDS: { label: string; href: string; category: string }[] = [
  { label: "Agents", href: "/local?category=real-estate", category: "agents" },
  { label: "Mortgage Lenders", href: "/local?category=mortgage", category: "mortgage" },
  { label: "Insurance Agencies", href: "/local?category=insurance", category: "insurance" },
  { label: "Attorneys", href: "/local?category=legal-services", category: "attorneys" },
  { label: "Contractors", href: "/local?category=contractors", category: "contractors" },
  { label: "Property Managers", href: "/local?category=property-management", category: "property_management" },
  { label: "Inspectors", href: "/local?category=home-inspection", category: "inspectors" },
  { label: "Appraisers", href: "/local?category=appraisal", category: "appraisers" },
];

const BUYER_RESOURCES = [
  "First-time buyer programs",
  "Low down payment options",
  "FHA loans",
  "VA loans",
  "Conventional loans",
  "Grant resources",
  "Pre-approval checklist",
];

const RealEstateHub = () => {
  useEffect(() => {
    track("real_estate_hub_view", {
      source_page: "/real-estate",
    });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Capital District Real Estate & Housing Hub",
    description:
      "Search homes, find real estate agents, mortgage lenders, insurance agencies, attorneys, contractors, grants, investment resources, and housing services across the Capital District.",
    url: "https://www.capitaldistrictnest.com/real-estate",
  };

  const handleMlsClick = (location: string) => {
    track("real_estate_mls_click", {
      source_page: "/real-estate",
      destination: MLS_URL,
      location,
    });
  };

  const handleCategoryClick = (p: CategoryPanel) => {
    track("real_estate_category_click", {
      category: p.trackCategory,
      source_page: "/real-estate",
      destination: p.destination,
    });
  };

  const handleBuyerHelpClick = (location: string) => {
    track("real_estate_buyer_help_click", {
      source_page: "/real-estate",
      destination: "#buyer-resources",
      location,
    });
  };

  const handleBusinessClaimClick = (destination: string, tier?: string) => {
    track("real_estate_business_claim_click", {
      source_page: "/real-estate",
      destination,
      category: "real-estate",
      tier: tier ?? "claim",
    });
  };

  return (
    <>
      <SEOHead
        title="Capital District Real Estate & Housing Resources | Capital District Nest"
        description="Search homes, find real estate agents, mortgage lenders, insurance agencies, attorneys, contractors, grants, investment resources, and housing services across the Capital District."
        canonical="https://www.capitaldistrictnest.com/real-estate"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-[#0B0F19] text-white">
        <CleanHeader />

        {/* HERO */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 70% 20%, rgba(94,234,212,0.10) 0%, rgba(11,15,25,0) 60%), radial-gradient(50% 60% at 20% 80%, rgba(13,110,102,0.18) 0%, rgba(11,15,25,0) 60%)",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-28 md:pt-36 pb-20 md:pb-28">
            <p className="eyebrow-apple text-[#5eead4] mb-6">REAL ESTATE & HOUSING</p>
            <h1 className="h-hero max-w-4xl">
              Homes, housing, and local experts across the Capital District.
            </h1>
            <p className="mt-8 max-w-2xl body-apple-dark text-white/70">
              Search homes, explore neighborhoods, connect with trusted local professionals, and
              discover resources for buying, selling, financing, investing, and improving property.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to={MLS_URL}
                onClick={() => handleMlsClick("hero_primary")}
                className="btn-dark-cta cta-arrow"
              >
                Search Albany Homes <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="#real-estate-experts"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition"
              >
                Find Local Experts
              </a>
              <a
                href="#buyer-resources"
                onClick={() => handleBuyerHelpClick("hero_tertiary")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition"
              >
                Get Buyer Help
              </a>
            </div>
          </div>
        </section>

        {/* CATEGORY PANELS */}
        <section className="bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="eyebrow-apple text-[#5eead4] mb-4">THE REAL ESTATE ROOM</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                Every part of the housing journey, in one place.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {CATEGORY_PANELS.map((p) => {
                const Icon = p.icon;
                const isExternal = !!p.external;
                const inner = (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#0d6e66]/15 border border-[#5eead4]/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#5eead4]" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#5eead4] transition" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
                      {p.headline}
                    </h3>
                    <p className="text-sm md:text-base text-white/65 leading-relaxed mb-8 min-h-[3.5rem]">
                      {p.text}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#5eead4]">
                      {p.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </>
                );

                const className =
                  "group block rounded-2xl bg-[#1E2230] border border-[#2D3748] hover:border-[#5eead4]/40 p-7 md:p-8 transition-all hover:translate-y-[-2px] hover:shadow-[0_20px_60px_-20px_rgba(94,234,212,0.25)]";

                return isExternal ? (
                  <a
                    key={p.key}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleCategoryClick(p)}
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={p.key}
                    to={p.href}
                    onClick={() => handleCategoryClick(p)}
                    className={className}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 1 — SEARCH HOMES */}
        <section className="border-t border-[#2D3748]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <p className="eyebrow-apple text-[#5eead4] mb-5">SEARCH HOMES</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                  Search homes across the Capital District.
                </h2>
                <p className="mt-6 body-apple-dark text-white/70 max-w-xl">
                  Open the Capital District Nest smart home search powered by RealScout, or tell us
                  what you are looking for and we'll help send matching listings.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={MLS_URL}
                    onClick={() => handleMlsClick("search_section")}
                    className="btn-dark-cta cta-arrow"
                  >
                    Open Smart Home Search <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact?type=homes_search_request&lead_type=buyer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition"
                  >
                    Send Me Matching Homes
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-[#1E2230] border border-[#2D3748] p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Search className="w-5 h-5 text-[#5eead4]" />
                    <span className="text-sm text-white/60 uppercase tracking-[0.18em]">
                      Live MLS Feed
                    </span>
                  </div>
                  <p className="text-lg text-white/85 leading-relaxed">
                    Full Capital District inventory — single-family, condos, multi-family, land,
                    and investment properties — updated in real time from the regional MLS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — REAL ESTATE EXPERTS */}
        <section id="real-estate-experts" className="border-t border-[#2D3748] bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <p className="eyebrow-apple text-[#5eead4] mb-5">LOCAL EXPERTS</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
              Local experts for every part of the real estate process.
            </h2>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {EXPERT_CARDS.map((c) => (
                <Link
                  key={c.label}
                  to={c.href}
                  onClick={() =>
                    track("real_estate_category_click", {
                      category: c.category,
                      source_page: "/real-estate",
                      destination: c.href,
                    })
                  }
                  className="group rounded-xl bg-[#1E2230] border border-[#2D3748] hover:border-[#5eead4]/40 p-6 transition flex flex-col justify-between min-h-[140px]"
                >
                  <span className="text-base md:text-lg font-semibold tracking-tight">
                    {c.label}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#5eead4]">
                    Browse <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — BUYER RESOURCES */}
        <section id="buyer-resources" className="border-t border-[#2D3748]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <p className="eyebrow-apple text-[#5eead4] mb-5">BUYER RESOURCES</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                  Buyer help, grants, and financing resources.
                </h2>
                <p className="mt-6 body-apple-dark text-white/70 max-w-md">
                  Explore the full range of programs available to first-time buyers, low-down-payment
                  options, and government-backed loans across the Capital District.
                </p>
                <Link
                  to="/contact?type=buyer_help_request"
                  onClick={() => handleBuyerHelpClick("buyer_resources_cta")}
                  className="mt-8 btn-dark-cta cta-arrow inline-flex"
                >
                  Ask About Buyer Programs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUYER_RESOURCES.map((r) => (
                    <div
                      key={r}
                      className="rounded-xl bg-[#1E2230] border border-[#2D3748] p-5 flex items-start gap-3"
                    >
                      <Star className="w-4 h-4 text-[#5eead4] mt-1 shrink-0" />
                      <span className="text-sm md:text-base text-white/85">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — INVESTMENT PROPERTY */}
        <section className="border-t border-[#2D3748] bg-[#0B0F19]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <p className="eyebrow-apple text-[#5eead4] mb-5">INVESTMENT PROPERTY</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
              Multi-unit and cash-flow property guidance.
            </h2>
            <p className="mt-6 body-apple-dark text-white/70 max-w-2xl">
              Explore rental income, cap rates, cash-on-cash returns, financing, and property
              analysis resources for Capital District investors.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/intelligence" className="btn-dark-cta cta-arrow">
                Explore Investment Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?type=investment_analysis_request&lead_type=investor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition"
              >
                Request Property Analysis
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 5 — BUSINESS OWNER CTA */}
        <section className="border-t border-[#2D3748]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="rounded-3xl bg-gradient-to-br from-[#1E2230] to-[#0d6e66]/15 border border-[#5eead4]/20 p-10 md:p-16">
              <p className="eyebrow-apple text-[#5eead4] mb-5">FOR LOCAL BUSINESSES</p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
                Serve homebuyers, sellers, or property owners?
              </h2>
              <p className="mt-6 body-apple-dark text-white/75 max-w-2xl">
                If you are a lender, insurance agent, attorney, contractor, property manager,
                inspector, or real estate service provider, your business can be listed on Capital
                District Nest.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/claim-business?category=real-estate"
                  onClick={() =>
                    handleBusinessClaimClick("/claim-business?category=real-estate", "claim")
                  }
                  className="btn-dark-cta cta-arrow"
                >
                  Claim Your Business <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/claim-business?tier=featured&category=real-estate"
                  onClick={() =>
                    handleBusinessClaimClick(
                      "/claim-business?tier=featured&category=real-estate",
                      "featured",
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[#5eead4] hover:text-[#5eead4] text-white text-sm font-medium tracking-tight transition"
                >
                  Request Featured Placement
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default RealEstateHub;
