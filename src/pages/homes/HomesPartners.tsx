import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Check,
  ArrowRight,
  Sparkles,
  MapPin,
  Building2,
  Crown,
  Star,
  Home,
  Briefcase,
  Hammer,
  Shield,
  Scale,
  Search,
  Truck,
  ClipboardCheck,
  Banknote,
  Building,
  Compass,
  Users,
  Globe2,
  LayoutGrid,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";

const WHY_LOCAL = [
  {
    icon: Users,
    title: "People search by community",
    body: "Buyers, sellers, renters, investors, and residents do not only search for listings. They search for towns, neighborhoods, schools, services, businesses, lifestyle, and local context.",
  },
  {
    icon: Globe2,
    title: "National portals are not local enough",
    body: "Large platforms are useful, but they are not built around the real texture of local communities. Capital District Nest is designed around the towns and neighborhoods people actually care about.",
  },
  {
    icon: MapPin,
    title: "Local professionals need local visibility",
    body: "Agents, lenders, insurance professionals, attorneys, contractors, inspectors, and property managers should be discoverable where local decisions are happening.",
  },
  {
    icon: Compass,
    title: "Real estate is part of the community journey",
    body: "Homes matter, but they are only one part of the local decision. Capital District Nest connects property search with town guides, local businesses, services, and community resources.",
  },
];

const BUILDING = [
  "Town and neighborhood discovery pages",
  "Local business directories",
  "Property link boards",
  "First-time buyer and investment tools",
  "Local service partner sections",
  "Community guides",
  "Local search pages organized by town",
  "Advertising opportunities for local professionals",
];

const PARTNER_GETS = [
  "Town-based visibility",
  "Featured partner card",
  "Local service category placement",
  "Contact buttons",
  "Website and social links",
  "Monthly updates",
  "Property link support when applicable",
  "Placement inside relevant community pages",
];

const WHO = [
  { icon: Home, label: "Real Estate Agents", value: "Become a featured real estate partner inside a local community search platform." },
  { icon: Building, label: "Brokerages", value: "Position your brokerage across multiple Capital District town pages." },
  { icon: Banknote, label: "Mortgage & Lending", value: "Get visibility near first-time buyer tools, affordability estimates, and town property boards." },
  { icon: Shield, label: "Insurance", value: "Show up where buyers, landlords, investors, and homeowners are researching property decisions." },
  { icon: Scale, label: "Real Estate Attorneys", value: "Appear near real estate decision points including buying, selling, investing, and closing-related resources." },
  { icon: Hammer, label: "Contractors", value: "Be discoverable by homeowners, buyers, landlords, and investors evaluating local properties." },
  { icon: ClipboardCheck, label: "Home Inspectors", value: "Reach buyers and investors as they move from browsing to evaluation." },
  { icon: Briefcase, label: "Property Managers", value: "Reach landlords, investors, and rental property owners by town." },
  { icon: Search, label: "Appraisers", value: "Appear inside investment, multi-family, and valuation-related resources." },
  { icon: Truck, label: "Moving & Storage", value: "Connect with relocators and new buyers moving into the Capital District." },
];

const TOWN_TIERS = [
  {
    name: "Starter Town",
    price: "$20",
    cadence: "month · founding rate",
    tagline: "For smaller or emerging local markets.",
    features: [
      "Featured town placement",
      "Agent or partner card",
      "Basic monthly updates",
      "Contact links",
      "Social links",
    ],
    icon: Star,
  },
  {
    name: "Growth Town",
    price: "$39",
    cadence: "month · founding rate",
    tagline: "For active suburban, commuter, or growing markets.",
    features: [
      "Featured town placement",
      "Enhanced profile card",
      "Monthly updates",
      "Property link support",
      "Contact / social links",
      "Category visibility",
    ],
    icon: MapPin,
    featured: true,
    badge: "MOST COMMON",
  },
  {
    name: "Premium Town",
    price: "$79",
    cadence: "month · founding rate",
    tagline: "For high-demand buyer, seller, investor, or relocation markets.",
    features: [
      "Premium town placement",
      "Enhanced partner card",
      "Monthly updates",
      "Property link support",
      "Featured badge",
      "Stronger visibility on town page",
    ],
    icon: Sparkles,
  },
  {
    name: "Core Market Package",
    price: "$199",
    cadence: "month · founding rate",
    tagline: "Visibility across Albany, Troy, Schenectady, and Saratoga Springs.",
    features: [
      "All four core markets",
      "Best for mortgage, insurance, attorneys",
      "Contractors, inspectors, PMs, brokerages",
      "Enhanced card + category visibility",
      "Monthly updates",
    ],
    icon: Building2,
  },
];

const CATEGORY_PRICING = [
  { name: "Featured Category Card", price: "$25", cadence: "month" },
  { name: "Town Service Spotlight", price: "$75", cadence: "month" },
  { name: "Core Market Service Package", price: "$199", cadence: "month" },
  { name: "Category Anchor Partner", price: "From $399", cadence: "month" },
];

const PREMIUM_TOWNS = [
  "Albany", "Saratoga Springs", "Delmar / Bethlehem", "Clifton Park",
  "Loudonville", "Niskayuna", "Guilderland", "Colonie",
  "Lake George", "Queensbury", "Troy", "Schenectady",
];
const GROWTH_TOWNS = [
  "Ballston Spa", "Latham", "Cohoes", "Watervliet", "East Greenbush",
  "Glenmont", "Voorheesville", "Mechanicville", "Glens Falls",
  "Amsterdam", "Scotia / Glenville", "Rotterdam",
];
const STARTER_TOWNS = [
  "Ravena", "Selkirk", "Altamont", "Waterford", "Green Island",
  "Stillwater", "Johnstown", "Gloversville", "Hudson Falls", "Schuylerville",
];

const HomesPartners = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const title = "Capital District Nest Homes Partner Network";
  const description =
    "Featured town placement for agents, brokerages, mortgage, insurance, attorneys, contractors, inspectors, property managers, and local real estate service providers.";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title} | Capital District Nest</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes/partners" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://www.capitaldistrictnest.com/homes/partners" />
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
          <div className="eyebrow-apple text-[#5eead4] mb-4">
            LOCAL STARTUP · LOCAL SEARCH · COMMUNITY DISCOVERY
          </div>
          <h1 className="h-hero text-white mb-5">
            Get featured where local searches begin.
          </h1>
          <p className="body-apple-dark max-w-3xl mx-auto mb-3">
            Capital District Nest is building a local search and community
            discovery platform for Capital District towns, homes, businesses,
            and services.
          </p>
          <p className="text-sm text-white/65 mb-8 max-w-3xl mx-auto">
            Founding partners can be featured inside relevant town pages,
            property boards, buyer tools, and local service categories.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Link to="/homes/partner-inquiry" className="btn-primary-apple">
              Request Partner Placement <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#pricing" className="btn-secondary-apple-dark">
              View Pricing
            </a>
          </div>
          <p className="text-xs text-white/50">
            Founding partner placements are opening by town and category during the pilot.
          </p>
        </div>
      </section>

      {/* ABOVE-THE-FOLD OFFER BOX */}
      <section className="px-[5%] py-12 border-b border-white/10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/[0.05] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="eyebrow-apple text-[#5eead4] mb-2">WHAT PARTNERS GET</div>
              <h2 className="text-xl md:text-2xl font-semibold text-white tracking-tight mb-4">
                A featured presence inside local search.
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {[
                  "Featured town or category placement",
                  "Premium partner card",
                  "Website, phone, and social links",
                  "Monthly updates",
                  "Local visibility inside Capital District Nest",
                  "Pilot pricing based on town/category",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/85">
                    <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 md:self-center">
              <Link to="/homes/partner-inquiry" className="btn-primary-apple whitespace-nowrap">
                Request Placement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT LOCALLY FOR LOCAL SEARCH */}
      <section className="px-[5%] py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow-apple text-[#5eead4] mb-3">
            A LOCAL SEARCH PLATFORM FOR CAPITAL DISTRICT COMMUNITIES
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
            Built locally for local search.
          </h2>
          <p className="body-apple-dark mb-4">
            Capital District Nest is a local startup focused on helping people
            search, discover, and understand Capital District towns,
            neighborhoods, businesses, homes, and services.
          </p>
          <p className="body-apple-dark mb-4">
            Before someone chooses an agent, lender, contractor, insurance
            provider, or local business, they usually start with a local
            question — what is this town like, what homes are available, who
            serves this area, what businesses are nearby, and what should I
            know before moving, buying, selling, renting, or investing.
          </p>
          <p className="body-apple-dark">
            Capital District Nest is being built to answer those questions
            locally. This is not a brokerage website. Not a national portal.
            Not a lead-resale machine. Not just a real estate directory.
          </p>
        </div>
      </section>

      {/* WHY LOCAL SEARCH MATTERS */}
      <section className="px-[5%] py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow-apple text-[#5eead4] mb-3">WHY LOCAL SEARCH MATTERS</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Local decisions deserve local infrastructure.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHY_LOCAL.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="rounded-2xl border border-white/10 bg-[#1E2230] p-6 hover:border-[#5eead4]/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#5eead4] mb-3" />
                  <div className="text-white font-semibold mb-2">{w.title}</div>
                  <div className="text-sm text-white/65 leading-relaxed">{w.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="px-[5%] py-20 border-b border-white/10">

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow-apple text-[#5eead4] mb-3">WHO THIS IS FOR</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              Built for local real estate professionals.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.label}
                  className="rounded-2xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#5eead4] mb-3" />
                  <div className="text-white font-semibold mb-1">{w.label}</div>
                  <div className="text-sm text-white/65">{w.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AGENT-SPECIFIC PRODUCT */}
      <section className="px-[5%] py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow-apple text-[#5eead4] mb-3">FOR AGENTS</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              Become a featured real estate partner inside a local community search platform.
            </h2>
            <p className="body-apple-dark mb-6">
              For agents, this means visibility before the consumer reaches a
              national portal. Your brand can appear on town pages, property
              boards, buyer tools, and local real estate resource sections
              connected to the communities you serve.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Featured placement on one town page",
                "Apple-style agent card (photo, brokerage, phone, website, social)",
                "Preferred CTA button + buyer/seller inquiry link",
                "Monthly page updates",
                "Active property link support when provided",
                '"Featured Local Real Estate Partner" badge',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/homes/partner-inquiry?category=agent"
              className="btn-primary-apple inline-flex"
            >
              Ask About a Town
            </Link>
          </div>

          {/* Premium agent page preview */}
          <div className="rounded-2xl border border-[#5eead4]/30 bg-gradient-to-br from-[#5eead4]/10 to-[#1E2230] p-6">
            <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#5eead4] mb-3">
              <Sparkles className="w-3 h-3" /> Featured Town Partner
            </div>
            <div className="text-lg font-semibold text-white mb-1">Your premium agent page</div>
            <p className="text-sm text-white/70 mb-4">
              A clean profile page connected to your featured town placement.
            </p>
            <div className="space-y-1.5 text-sm text-white/75">
              {[
                "Photo · name · brokerage · towns served",
                "Specialties · phone · email · website · social",
                "Buyer CTA · seller CTA",
                "Active property links when provided",
                "Home value request form",
              ].map((l) => (
                <div key={l} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#5eead4] mt-0.5 shrink-0" />
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/45 mt-4">
              Inquiries can route to your preferred contact method once your
              partner profile is configured.
            </p>
          </div>
        </div>
      </section>

      {/* TOWN TIER PRICING */}
      <section id="town-tiers" className="px-[5%] py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow-apple text-[#5eead4] mb-3">TOWN PRICING</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
              Town pricing is based on market activity.
            </h2>
            <p className="body-apple-dark max-w-2xl mx-auto">
              Every town is different. Pricing reflects population, property
              activity, search opportunity, local demand, and update volume.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOWN_TIERS.map((tier) => {
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
                    <span className="text-xs text-white/55">/ {tier.cadence}</span>
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
                    to={`/homes/partner-inquiry?package=${encodeURIComponent(tier.name)}`}
                    className={tier.featured ? "btn-primary-apple w-full justify-center" : "btn-secondary-apple-dark w-full justify-center"}
                  >
                    Request Placement
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-white/45 text-center mt-6">
            Founding rates are pilot rates. Early partners keep their founding
            rate during the pilot.
          </p>
        </div>
      </section>

      {/* TOWN EXAMPLES */}
      <section className="px-[5%] py-16 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow-apple text-[#5eead4] mb-3 text-center">TOWN TIER EXAMPLES</div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight text-center mb-10">
            How towns map to tiers.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <TownTierList title="Premium markets" towns={PREMIUM_TOWNS} accent />
            <TownTierList title="Growth markets" towns={GROWTH_TOWNS} />
            <TownTierList title="Starter markets" towns={STARTER_TOWNS} />
          </div>
        </div>
      </section>

      {/* CATEGORY PARTNER PRODUCT */}
      <section className="px-[5%] py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow-apple text-[#5eead4] mb-3">CATEGORY PARTNERS</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
              Category partner placements.
            </h2>
            <p className="body-apple-dark max-w-2xl mx-auto">
              Mortgage, insurance, attorneys, contractors, inspectors, and
              property managers can be featured inside local service categories
              across town pages and the Homes hub — visible where local
              property decisions are being made.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_PRICING.map((c) => (
              <div key={c.name} className="rounded-2xl border border-white/10 bg-[#1E2230] p-5">
                <div className="text-sm text-white/65 mb-1">{c.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-white">{c.price}</span>
                  <span className="text-xs text-white/55">/ {c.cadence}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/homes/partner-inquiry?category=category-partner" className="btn-secondary-apple-dark inline-flex">
              Ask About Category Placement
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE'RE BUILDING + WHAT PARTNERS GET */}
      <section className="px-[5%] py-20 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-8">
            <div className="eyebrow-apple text-[#5eead4] mb-3 flex items-center gap-2">
              <LayoutGrid className="w-3.5 h-3.5" /> WHAT WE'RE BUILDING
            </div>
            <h3 className="text-2xl font-semibold text-white tracking-tight mb-5">
              What Capital District Nest is building
            </h3>
            <ul className="space-y-2">
              {BUILDING.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/[0.04] p-8">
            <div className="eyebrow-apple text-[#5eead4] mb-3 flex items-center gap-2">
              <Crown className="w-3.5 h-3.5" /> WHAT PARTNERS GET
            </div>
            <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
              What partners get
            </h3>
            <p className="text-sm text-white/70 mb-5">
              Partners receive visibility inside a local search platform
              organized around the communities they serve.
            </p>
            <ul className="space-y-2">
              {PARTNER_GETS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-white/85">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="px-[5%] py-16 border-b border-white/10">

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
            Want to be featured in a town?
          </h2>
          <p className="body-apple-dark mb-6">
            Tell us your town, category, and preferred placement. We'll confirm
            availability during the pilot.
          </p>
          <Link to="/homes/partner-inquiry" className="btn-primary-apple inline-flex">
            Request Partner Placement
          </Link>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-[5%] py-20">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-8 md:p-12">
          <Crown className="w-8 h-8 text-[#5eead4] mx-auto mb-3" />
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
            Build your local presence before the market is crowded.
          </h2>
          <p className="body-apple-dark mb-6">
            Capital District Nest Homes is opening pilot placements across
            select Capital District towns and real estate categories.
          </p>
          <Link to="/homes/partner-inquiry" className="btn-primary-apple inline-flex">
            Request Placement
          </Link>
        </div>
      </section>

      <section className="px-[5%] pb-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] text-white/45 leading-relaxed text-center">
            Capital District Nest is a local media, directory, and advertising
            platform. Featured partner placements are advertising products.
            Capital District Nest does not represent buyers or sellers and does
            not participate in real estate transactions. Real estate
            professionals are responsible for their own licensing, advertising
            compliance, and client relationships.
          </p>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

const TownTierList = ({ title, towns, accent }: { title: string; towns: string[]; accent?: boolean }) => (
  <div className={`rounded-2xl border p-5 ${accent ? "border-[#5eead4]/30 bg-[#5eead4]/[0.04]" : "border-white/10 bg-[#1E2230]"}`}>
    <div className={`text-xs uppercase tracking-widest mb-3 ${accent ? "text-[#5eead4]" : "text-white/55"}`}>
      {title}
    </div>
    <div className="flex flex-wrap gap-1.5">
      {towns.map((t) => (
        <span
          key={t}
          className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-xs text-white/80"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

export default HomesPartners;
