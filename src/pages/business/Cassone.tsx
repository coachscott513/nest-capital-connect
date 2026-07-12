import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  ArrowUpRight,
  Hammer,
  Home,
  Wrench,
  Layers,
  Trees,
  Building2,
  DoorOpen,
  Bath,
  ChefHat,
  Camera,
  ClipboardCheck,
  Info,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { trackGAEvent } from "@/components/GARouteTracker";

/**
 * CASSONE — Capital District Nest Spotlight Template (Home Services)
 * See mem://editorial/spotlight-page-states — this page is published in
 * `template` state. All contact channels, imagery, projects, team, and
 * financing claims are pending owner verification. We do NOT fabricate
 * phone numbers, emails, addresses, or social handles.
 * Companion to the flagship Restaurant template (RooseveltRoom.tsx).
 */

const BUSINESS = {
  slug: "cassone",
  name: "Cassone",
  category: "Home Remodeling & Exterior Improvements",
  town: "Cohoes",
  county: "Albany County",
  region: "Capital District, NY",
  applyUrl: "/for-businesses/apply?business=cassone",
};

const TEAL = "#5eead4";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color: TEAL }}>
    {children}
  </p>
);

const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.03em] text-white leading-[1.05]">
      {title}
    </h2>
    {intro && <p className="mt-5 text-lg text-white/70 font-light leading-relaxed">{intro}</p>}
  </div>
);

const AbstractBackdrop = ({ variant = "default" }: { variant?: "default" | "warm" | "cool" }) => {
  const grads =
    variant === "warm"
      ? "radial-gradient(60% 60% at 20% 30%, rgba(201,164,73,0.18), transparent 65%), radial-gradient(50% 50% at 80% 70%, rgba(94,234,212,0.10), transparent 70%)"
      : variant === "cool"
      ? "radial-gradient(55% 55% at 70% 25%, rgba(94,234,212,0.20), transparent 65%), radial-gradient(60% 60% at 20% 80%, rgba(13,110,102,0.22), transparent 70%)"
      : "radial-gradient(60% 60% at 30% 25%, rgba(94,234,212,0.16), transparent 65%), radial-gradient(55% 55% at 75% 75%, rgba(201,164,73,0.12), transparent 70%)";
  return (
    <>
      <div className="absolute inset-0" style={{ background: "#0B0F19" }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div className="absolute inset-0" style={{ background: grads }} />
    </>
  );
};

const services = [
  { icon: Home, title: "Roofing", text: "Full roof replacement and repairs built for Northeast weather." },
  { icon: Layers, title: "Windows", text: "Energy-conscious window replacement for older Capital District homes." },
  { icon: DoorOpen, title: "Doors", text: "Entry, patio, and storm doors that lift curb appeal and comfort." },
  { icon: Building2, title: "Siding", text: "Exterior siding renewal that protects the envelope and refreshes the look." },
  { icon: ChefHat, title: "Kitchen Remodeling", text: "Full kitchen renovations designed around how a household actually lives." },
  { icon: Bath, title: "Bathroom Remodeling", text: "Bath renovations from refresh to full layout redesigns." },
  { icon: Trees, title: "Outdoor Living", text: "Decks, porches, and outdoor spaces that extend the season." },
  { icon: Wrench, title: "Commercial Services", text: "Remodeling and exterior work for local commercial properties on request." },
];

const serviceAreas = [
  { name: "Cohoes", href: "/living-in/cohoes" },
  { name: "Albany", href: "/living-in/albany" },
  { name: "Troy", href: "/living-in/troy" },
  { name: "Latham", href: "/living-in/latham" },
  { name: "Colonie", href: "/living-in/colonie" },
  { name: "Clifton Park", href: "/living-in/clifton-park" },
  { name: "Delmar", href: "/living-in/delmar" },
  { name: "East Greenbush", href: "/living-in/east-greenbush" },
  { name: "Saratoga Springs", href: "/living-in/saratoga-springs" },
];

const themes = [
  { title: "Range of remodeling services", text: "Interior and exterior projects handled by one local team, from roofing to full kitchens." },
  { title: "Long regional presence", text: "An established Capital District name that homeowners recognize when planning improvements." },
  { title: "Exterior expertise", text: "Roofing, windows, siding, and doors — the projects that shape both comfort and curb appeal." },
  { title: "Whole-home focus", text: "Same team for the projects that upgrade daily life inside the home." },
  { title: "Local communication", text: "A regional business, not a national franchise call center." },
];

const relatedCategories = [
  { label: "Architects", href: "/businesses/architect" },
  { label: "Interior Designers", href: "/businesses/interior-designer" },
  { label: "Landscapers", href: "/businesses/landscaper" },
  { label: "Plumbers", href: "/businesses/plumber" },
  { label: "Electricians", href: "/businesses/electrician" },
  { label: "Real Estate", href: "/homes" },
  { label: "Mortgage Lenders", href: "/businesses/mortgage-lender" },
  { label: "Insurance", href: "/businesses/insurance" },
];

const featuredIn = [
  { label: "Home Services Collection", href: "/home-services", live: true },
  { label: "Living in Cohoes", href: "/living-in/cohoes", live: true },
  { label: "Capital District Remodeling Guide", href: "#", live: false },
  { label: "Contractor Spotlight Series", href: "#", live: false },
  { label: "Homeowner Resources", href: "#", live: false },
];

const Cassone = () => {
  const track = (action: string, source: string) =>
    trackGAEvent.businessProfileOpen({
      business_slug: BUSINESS.slug,
      business_name: BUSINESS.name,
      source_location: `${action}::${source}`,
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor", "HomeAndConstructionBusiness"],
    name: BUSINESS.name,
    description:
      "Home remodeling and exterior improvements serving homeowners throughout the Capital District from Cohoes, New York.",
    areaServed: serviceAreas.map((s) => s.name),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cohoes",
      addressRegion: "NY",
      addressCountry: "US",
    },
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEOHead
        title="Cassone | Home Remodeling & Exterior Improvements | Cohoes, NY | Capital District Nest"
        description="Discover Cassone through Capital District Nest's editorial business profile featuring verified business information, services, project areas, and local discovery."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CleanHeader />

      {/* HERO */}
      <section className="relative w-full min-h-[92vh] overflow-hidden">
        <AbstractBackdrop variant="cool" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F19]" />
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-16 md:pb-24 flex flex-col justify-end min-h-[92vh]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl border border-white/20 bg-white/[0.06] backdrop-blur-md flex items-center justify-center">
              <Hammer className="h-6 w-6" style={{ color: TEAL }} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow>Capital District Nest · Spotlight</Eyebrow>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase border"
                  style={{ borderColor: `${TEAL}55`, color: TEAL, background: "rgba(94,234,212,0.06)" }}
                >
                  Spotlight Template
                </span>
              </div>
              <p className="text-white/70 text-sm mt-1">
                {BUSINESS.town} · {BUSINESS.county}, NY
              </p>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-semibold tracking-[-0.04em] leading-[0.95] max-w-4xl">
            Cassone
          </h1>
          <p className="mt-5 text-xl md:text-2xl text-white/80 font-light max-w-2xl">
            Home Remodeling &amp; Exterior Improvements
          </p>
          <p className="mt-3 text-lg text-white/65 font-light max-w-2xl">
            Serving homeowners throughout the Capital District from Cohoes, New York.
          </p>

          <p className="mt-6 text-sm text-white/55 max-w-2xl">
            This is Capital District Nest's editorial profile — not Cassone's official website.
            Contact channels, project imagery, and expanded details are added after owner review.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={BUSINESS.applyUrl}
              onClick={() => track("estimate", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              <ClipboardCheck className="h-4 w-4" /> Request Estimate
            </Link>

            {/* Contact channels shown as pending-verification chips.
                We do NOT fabricate a phone, email, address, or URLs. */}
            {(["Call", "Directions", "Website", "Email", "Instagram", "Facebook"] as const).map(
              (label) => {
                const Icon =
                  label === "Call"
                    ? Phone
                    : label === "Directions"
                    ? MapPin
                    : label === "Website"
                    ? Globe
                    : label === "Email"
                    ? Mail
                    : label === "Instagram"
                    ? Instagram
                    : Facebook;
                return (
                  <Link
                    key={label}
                    to={BUSINESS.applyUrl}
                    onClick={() => track(label.toLowerCase(), "hero_pending")}
                    className="lift-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white/85 border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] backdrop-blur-md transition"
                    title={`${label} — pending owner verification`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                    <span
                      className="ml-1 text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-white/15 text-white/55"
                    >
                      Pending
                    </span>
                  </Link>
                );
              },
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {[
              "Capital District Nest Editorial",
              "Locally Established",
              "Estimate Available",
              "Project Gallery Pending",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide border border-white/15 bg-white/[0.03] text-white/75"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL INTRO */}
      <section className="px-6 md:px-10 py-24 md:py-32 max-w-4xl mx-auto">
        <Eyebrow>Capital District Nest Spotlight</Eyebrow>
        <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02]">
          Building better homes across the Capital District.
        </h2>
        <div className="mt-10 space-y-6 text-lg md:text-xl text-white/75 font-light leading-relaxed">
          <p>
            From a base in Cohoes, Cassone works on the projects that most define how a home
            actually lives — roofing that stands up to Northeast winters, windows and siding that
            change how a house feels from the street, and kitchens and baths that quietly reshape
            everyday routines.
          </p>
          <p>
            The scope is a familiar one for homeowners across the Capital District. Older housing
            stock, mixed neighborhoods, and long seasons put real demands on roofs, exteriors, and
            interior systems. Local remodelers who understand that context are worth knowing before
            a project ever starts.
          </p>
          <p>
            Capital District Nest is publishing this Spotlight as an editorial profile —
            summarized in our own words, based on verified public information. When Cassone is
            ready, we can add approved project photography, service detail, and financing information
            directly from the business.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Services"
            title="What Cassone works on."
            intro="Modular service cards adapted for a home services Spotlight. Restaurants use menu modules; contractors use these."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 hover:bg-white/[0.06] transition"
              >
                <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                  <Icon className="h-5 w-5" style={{ color: TEAL }} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{text}</p>
                <Link
                  to={BUSINESS.applyUrl}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-white/70 hover:text-white"
                >
                  Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER + PROJECT GALLERY (pending) */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Before & After"
            title="See the transformation."
            intro="A dedicated before/after gallery will live here once Cassone approves real project imagery. We do not publish stock or invented remodeling projects."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/5]"
              >
                <AbstractBackdrop variant={i === 2 ? "warm" : "cool"} />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <Camera className="h-6 w-6 text-white/40" />
                  <p className="mt-3 text-sm font-semibold text-white/70">
                    Project Gallery Coming Soon
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Editorial template imagery · Project photography pending owner approval
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Proudly Serving"
            title="Homes across the Capital District."
            intro="Explore the towns Cassone works in — each links to the Capital District Nest guide for that community."
          />
          <div className="mt-12 flex flex-wrap gap-3">
            {serviceAreas.map((a) => (
              <Link
                key={a.name}
                to={a.href}
                className="lift-hover inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white/85 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] transition"
              >
                <MapPin className="h-3.5 w-3.5" style={{ color: TEAL }} /> {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY HOMEOWNERS CHOOSE CASSONE */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Editorial Notes"
            title="Why homeowners consider Cassone."
            intro="Themes drawn from verified public information. Not a review score, not anonymous testimonials."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {themes.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCING (omitted body, note only — verified public info required) */}
      <section className="px-6 md:px-10 py-16 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex items-start gap-4">
          <Info className="h-5 w-5 mt-0.5" style={{ color: TEAL }} />
          <div>
            <p className="text-sm font-semibold">Financing options</p>
            <p className="mt-1 text-sm text-white/65">
              Financing options will be published here once verified with the business.
            </p>
          </div>
        </div>
      </section>

      {/* REQUEST ESTIMATE CTA */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.02]">
            Ready to start your next project?
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={BUSINESS.applyUrl}
              onClick={() => track("estimate", "cta")}
              className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              <ClipboardCheck className="h-4 w-4" /> Request Estimate
            </Link>
            <Link
              to={BUSINESS.applyUrl}
              onClick={() => track("website", "cta_pending")}
              className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <Globe className="h-4 w-4" /> Visit Website
            </Link>
            <Link
              to={BUSINESS.applyUrl}
              onClick={() => track("call", "cta_pending")}
              className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <Phone className="h-4 w-4" /> Call
            </Link>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM — intentionally hidden per no-fabricated-content policy */}

      {/* FEATURED IN */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Featured In" title="Where Cassone shows up on Capital District Nest." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredIn.map((f) => (
              <Link
                key={f.label}
                to={f.live ? f.href : "#"}
                onClick={(e) => {
                  if (!f.live) e.preventDefault();
                }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition ${
                  f.live ? "hover:bg-white/[0.06]" : "opacity-70 cursor-default"
                }`}
              >
                <p className="text-lg font-semibold tracking-tight">{f.label}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
                  {f.live ? "Explore" : "Coming Soon"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN YOUR PROJECT */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: ClipboardCheck, label: "Request an Estimate", href: BUSINESS.applyUrl },
            { icon: Phone, label: "Call (pending verification)", href: BUSINESS.applyUrl },
            { icon: Globe, label: "Website (pending verification)", href: BUSINESS.applyUrl },
            { icon: MapPin, label: "Directions (pending verification)", href: BUSINESS.applyUrl },
            { icon: Info, label: "Business Hours (pending verification)", href: BUSINESS.applyUrl },
            { icon: Mail, label: "Contact via Capital District Nest", href: "/contact" },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              to={href}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition flex items-center gap-4"
            >
              <div className="h-11 w-11 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center">
                <Icon className="h-5 w-5" style={{ color: TEAL }} />
              </div>
              <span className="text-sm font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* RELATED HOME SERVICES */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Related Businesses"
            title="Local trades and partners near this project."
          />
          <div className="mt-12 flex flex-wrap gap-3">
            {relatedCategories.map((c) => (
              <Link
                key={c.label}
                to={c.href}
                className="lift-hover inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white/85 border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] transition"
              >
                {c.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OWNER CTA */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl p-10 md:p-14 text-center">
          <Eyebrow>Own or manage Cassone?</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
            Help us complete this profile.
          </h2>
          <p className="mt-5 text-lg text-white/70 font-light">
            Verify your contact channels, upload approved project photography, share recent
            transformations, and tell the story of the business in your own words.
          </p>
          <Link
            to={BUSINESS.applyUrl}
            onClick={() => track("owner_claim", "owner_cta")}
            className="mt-10 inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
          >
            Complete This Profile <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cassone;
