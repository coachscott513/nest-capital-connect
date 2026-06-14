import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  
  Home,
  Building2,
  Trees,
  TrendingUp,
  CalendarClock,
  Plus,
} from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import TownBoard from "@/components/homes/TownBoard";
import HomesServicesGrid from "@/components/homes/HomesServicesGrid";
import HomesDisclaimer from "@/components/homes/HomesDisclaimer";
import AnalyzePropertyHero from "@/components/homes/AnalyzePropertyHero";
import { HOMES_TOWNS } from "@/data/homesTowns";

const MULTI_UNIT = [
  { label: "Multi-Unit Income Properties", icon: Building2, href: "/homes/listings?type=multi_unit" },
  { label: "Land & Lots", icon: Trees, href: "/homes/listings?type=land" },
  { label: "Investor Deals", icon: TrendingUp, href: "/homes/listings?type=investor_deal" },
  { label: "Commercial / Mixed-Use", icon: Building2, href: "/homes/listings?type=commercial" },
];

const HomesHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Capital District Homes, Rentals & Property Links | Capital District Nest</title>
        <meta
          name="description"
          content="Browse homes, rentals, multi-units, land, open houses, listing agents, and local real estate services across the Capital District with direct property links."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes" />
        <meta property="og:title" content="Capital District Nest Homes" />
        <meta property="og:url" content="https://www.capitaldistrictnest.com/homes" />
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
            CAPITAL DISTRICT NEST HOMES
          </div>
          <h1 className="h-hero text-white mb-5">
            New town listings across the Capital District.
          </h1>
          <p className="body-apple-dark max-w-3xl mx-auto mb-3">
            Capital District Nest organizes local property links, listing
            agents, brokerages, rentals, open houses, and real estate services
            by town.
          </p>
          <p className="text-sm text-white/55 mb-10">
            We organize the local market. The inquiry goes to the listing source.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#town-listings" className="btn-primary-apple">
              Browse Town Listings <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/homes/add-listing" className="btn-secondary-apple-dark inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Submit Listing Link
            </Link>
          </div>
        </div>
      </section>

      {/* INVESTMENT ANALYZER HERO */}
      <AnalyzePropertyHero browseHref="/homes/listings?type=investment" />

      {/* TOWN LISTING BOARD */}
      <TownBoard />


      {/* NEW LISTINGS BY TOWN — preview rail */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow-apple text-[#5eead4] mb-3">NEW LISTINGS BY TOWN</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
              Fresh local property links grouped by town.
            </h2>
            <p className="body-apple-dark max-w-2xl mx-auto">
              Property submissions are opening to listing agents across the
              region. Open a town to see direct links to the listing source.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {HOMES_TOWNS.slice(0, 8).map((t) => (
              <Link
                key={t.slug}
                to={`/homes/listings/${t.slug}`}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] text-sm text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RENTALS */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="eyebrow-apple text-[#5eead4] mb-3">RENTALS</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
              Rentals across the Capital District.
            </h2>
            <p className="body-apple-dark mb-6">
              Apartments, houses, rooms, and rental property links by town.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/homes/rentals" className="btn-primary-apple">
                Browse Rentals
              </Link>
              <Link to="/homes/add-listing?type=rental" className="btn-secondary-apple-dark">
                Post Rental Link
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#1E2230] p-6">
            <div className="text-xs text-[#5eead4] font-semibold mb-2">
              RENTAL LINKS BY TOWN
            </div>
            <div className="text-xl font-semibold text-white mb-2">
              Albany & Capital District Rentals
            </div>
            <p className="text-sm text-white/65 mb-4">
              Apartments, townhomes, and single-family rentals — submitted by
              landlords, property managers, and listing agents.
            </p>
            <Link
              to="/homes/rentals"
              className="btn-dark-cta inline-flex items-center gap-2"
            >
              Browse Rental Links
            </Link>
          </div>
        </div>
      </section>

      {/* OPEN HOUSES */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <CalendarClock className="w-10 h-10 text-[#5eead4] mx-auto mb-4" />
          <div className="eyebrow-apple text-[#5eead4] mb-3">OPEN HOUSES</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            Open houses this week.
          </h2>
          <p className="body-apple-dark mb-6">
            Open houses are being added. Agents can submit open house links
            during launch.
          </p>
          <Link
            to="/homes/add-listing?type=open-house"
            className="btn-primary-apple inline-flex"
          >
            Submit Open House
          </Link>
        </div>
      </section>

      {/* MULTI-UNIT / INVESTMENT */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow-apple text-[#5eead4] mb-3">INVESTMENT</div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
              Multi-units and investment properties.
            </h2>
            <p className="body-apple-dark max-w-2xl mx-auto">
              Explore duplexes, triplexes, four-families, mixed-use properties,
              and investor opportunities.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MULTI_UNIT.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                to={href}
                className="rounded-2xl border border-white/10 bg-[#1E2230] p-5 hover:border-[#5eead4]/50 transition"
              >
                <Icon className="w-6 h-6 text-[#5eead4] mb-3" />
                <div className="text-sm font-semibold text-white">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <HomesServicesGrid />

      {/* SUBMIT LINK CTA — replaces the legacy IDX outbound */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <Home className="w-10 h-10 text-[#5eead4] mx-auto mb-4" />
          <div className="eyebrow-apple text-[#5eead4] mb-3">PROPERTY LINKS</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">
            A neutral, town-by-town board of property links.
          </h2>
          <p className="body-apple-dark mb-6">
            Capital District Nest does not represent buyers or sellers. Listing
            agents, brokerages, landlords, and property managers may submit
            their preferred public listing link.
          </p>
          <Link
            to="/homes/add-listing"
            className="btn-primary-apple inline-flex items-center gap-2"
          >
            Submit Listing Link
          </Link>
        </div>
      </section>

      {/* POST LISTING CTA */}
      <section className="px-[5%] py-20 bg-background border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-[#5eead4]/30 bg-[#5eead4]/5 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
            Are you a listing agent, landlord, or property manager?
          </h2>
          <p className="body-apple-dark mb-6">
            Submit a direct link to your listing page. Visitors click through to
            your own page — not a competing lead form.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/homes/add-listing" className="btn-primary-apple">
              Post Listing Link
            </Link>
            <Link
              to="/homes/partners"
              className="btn-secondary-apple-dark"
            >
              View Partner Packages
            </Link>
          </div>
          <div className="text-xs text-white/55 mt-4">
            Free during launch. Featured agent cards and priority placement available.
          </div>
        </div>
      </section>

      <HomesDisclaimer />
      <Footer />
    </div>
  );
};

export default HomesHub;
