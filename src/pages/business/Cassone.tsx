import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  ArrowUpRight,
  ArrowRight,
  HardHat,
  GraduationCap,
  Stethoscope,
  Building2,
  Landmark,
  Container,
  ClipboardCheck,
  Info,
  Camera,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import { trackGAEvent } from "@/components/GARouteTracker";

/**
 * CASSONE — Capital District Nest Spotlight (flagship industrial showcase).
 * See mem://editorial/spotlight-page-states — this page is published in
 * `template` state. Editorial narrative summarizes verified public info in
 * our own words. No fabricated staff, quotes, awards, or project claims.
 * Imagery: abstract industrial backdrops only. Real photography and video
 * come in through the owner's official social channels (linked, not copied)
 * until Cassone approves media use.
 */

const BUSINESS = {
  slug: "cassone",
  name: "Cassone",
  tagline: "Temporary Space. Permanent Relationships.",
  category: "Modular Buildings, Office Trailers & Storage Solutions",
  region: "Northeast",
  applyUrl: "/for-businesses/apply?business=cassone",
};

// Official public channels — link out, do not embed protected imagery until approved.
const OFFICIAL = {
  website: "https://www.cassone.com",
  instagram: "https://www.instagram.com/cassonecompanies/",
  facebook: "https://www.facebook.com/CassoneCompanies/",
  youtube: "https://www.youtube.com/@cassonecompanies",
};

const TEAL = "#5eead4";
const GOLD = "#c9a449";

const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p
    className={`text-[11px] font-semibold tracking-[0.32em] uppercase ${className}`}
    style={{ color: TEAL }}
  >
    {children}
  </p>
);

const PendingChip = ({ children = "Pending owner verification" }: { children?: React.ReactNode }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.22em] uppercase border"
    style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)" }}
  >
    {children}
  </span>
);

/**
 * Industrial hero backdrop — engineered feel, not photographic.
 * Blueprint grid, dawn light, steel wash. Signals scale without faking a jobsite photo.
 */
const IndustrialBackdrop = ({ variant = "dawn" }: { variant?: "dawn" | "steel" | "night" }) => {
  const gradients =
    variant === "dawn"
      ? "radial-gradient(70% 60% at 15% 100%, rgba(201,164,73,0.28), transparent 60%), radial-gradient(60% 80% at 90% 10%, rgba(94,234,212,0.18), transparent 65%), linear-gradient(180deg, #05080f 0%, #0B0F19 55%, #0e1626 100%)"
      : variant === "night"
      ? "radial-gradient(60% 60% at 80% 20%, rgba(94,234,212,0.14), transparent 65%), linear-gradient(180deg, #05070d 0%, #0B0F19 100%)"
      : "radial-gradient(60% 60% at 20% 30%, rgba(148,163,184,0.16), transparent 65%), radial-gradient(50% 60% at 85% 80%, rgba(94,234,212,0.14), transparent 70%), linear-gradient(180deg, #0B0F19 0%, #0e1626 100%)";
  return (
    <>
      <div className="absolute inset-0" style={{ background: gradients }} />
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 85%)",
        }}
      />
      {/* Coarser structural grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,234,212,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(94,234,212,0.25) 1px, transparent 1px)",
          backgroundSize: "320px 320px",
        }}
      />
      {/* Horizon glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(201,164,73,0.08) 60%, rgba(11,15,25,0.9) 100%)",
        }}
      />
    </>
  );
};

const solutions = [
  {
    icon: HardHat,
    title: "Construction",
    line: "Jobsite offices, mobile trailers, and secure storage that keep major projects moving.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    line: "Portable classrooms and campus expansion buildings for schools navigating growth or renovation.",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    line: "Temporary medical space, testing facilities, and modular clinics on hospital and community sites.",
  },
  {
    icon: Building2,
    title: "Commercial",
    line: "Modular office complexes, warehouse extensions, and swing space for businesses in transition.",
  },
  {
    icon: Landmark,
    title: "Government",
    line: "Modular facilities supporting municipalities, first responders, and public infrastructure work.",
  },
  {
    icon: Container,
    title: "Storage",
    line: "Ground-level storage containers configured for jobsites, retail overflow, and long-term logistics.",
  },
];

const glanceStates = [
  "New York",
  "New Jersey",
  "Connecticut",
  "Pennsylvania",
  "Massachusetts",
];

const glanceSolutions = [
  "Construction",
  "Commercial",
  "Education",
  "Healthcare",
  "Government",
];

const serviceAreas = [
  "New York",
  "New Jersey",
  "Connecticut",
  "Massachusetts",
  "Pennsylvania",
  "Vermont",
  "New Hampshire",
  "Rhode Island",
  "Maine",
];

const reasons = [
  {
    title: "Decades of modular experience.",
    body: "A regional operator that has been sizing, delivering, and installing temporary space for generations of projects.",
  },
  {
    title: "Responsive delivery.",
    body: "Modular units, trailers, and containers moved to site with the logistics that construction and institutional timelines demand.",
  },
  {
    title: "Full range of solutions.",
    body: "From a single ground-level container to multi-unit modular offices and portable classrooms — one point of contact across the range.",
  },
  {
    title: "Built for the Northeast.",
    body: "Units and installations specified for the weather, jobsite conditions, and permitting realities of the region.",
  },
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
    "@type": ["Organization", "LocalBusiness"],
    name: BUSINESS.name,
    description:
      "Cassone provides modular buildings, office trailers, storage containers, and portable space solutions for construction, education, healthcare, commercial, and government projects across the Northeast.",
    areaServed: serviceAreas,
    url: OFFICIAL.website,
    sameAs: [OFFICIAL.instagram, OFFICIAL.facebook, OFFICIAL.youtube],
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <SEOHead
        title="Cassone | Modular Buildings, Office Trailers & Storage Solutions | Capital District Nest"
        description="Cassone provides modular buildings, office trailers, storage containers, and portable space solutions for construction, education, healthcare, commercial, and government projects across the Northeast. A Capital District Nest editorial Spotlight."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CleanHeader />

      {/* =========================== HERO =========================== */}
      <section className="relative w-full min-h-[100vh] overflow-hidden">
        <IndustrialBackdrop variant="dawn" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-20 md:pb-28 flex flex-col justify-end min-h-[100vh]">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Eyebrow>Capital District Nest · Spotlight</Eyebrow>
            <PendingChip>Spotlight Template</PendingChip>
          </div>

          <h1
            className="text-[64px] md:text-[168px] font-semibold tracking-[-0.055em] leading-[0.86]"
            style={{ textShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
          >
            Cassone
          </h1>

          <p className="mt-10 text-2xl md:text-4xl text-white font-light tracking-[-0.02em] max-w-4xl leading-[1.05]">
            Temporary Space.
            <span className="text-white/60"> Permanent Relationships.</span>
          </p>

          <p className="mt-8 max-w-2xl text-base md:text-lg text-white/65 font-light leading-relaxed">
            For over five decades, Cassone has provided modular buildings, office trailers, storage
            containers, and portable space solutions for businesses, construction sites, schools,
            healthcare organizations, and municipalities throughout the Northeast.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={OFFICIAL.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("website", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              Visit Cassone.com <ArrowUpRight className="h-4 w-4" />
            </a>
            <Link
              to={BUSINESS.applyUrl}
              onClick={() => track("owner_claim", "hero")}
              className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-md transition"
            >
              <ClipboardCheck className="h-4 w-4" /> Request Quote
            </Link>
          </div>

          <p className="mt-8 text-xs text-white/45 max-w-xl">
            This is Capital District Nest's editorial profile — not Cassone's official website.
            Verified public information summarized in our own words. Project photography, phone,
            and address are added after owner review.
          </p>
        </div>
      </section>

      {/* =========================== AT A GLANCE =========================== */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <Eyebrow>At a glance</Eyebrow>

          {/* Hero metric */}
          <div className="mt-12 md:mt-16">
            <div className="text-[96px] md:text-[168px] font-semibold tracking-[-0.055em] leading-[0.86]">
              50<span className="text-white/70">+</span>
            </div>
            <div className="mt-4 text-lg md:text-xl text-white/70 font-light tracking-tight">
              Years serving businesses across the Northeast.
            </div>
          </div>

          <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-4xl">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/40 font-medium">
                Serving
              </div>
              <div className="mt-6 h-px bg-white/10" />
              <ul className="mt-6 space-y-3">
                {glanceStates.map((s) => (
                  <li key={s} className="text-base md:text-lg text-white/85 font-light tracking-tight">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-white/40 font-medium">
                Solutions
              </div>
              <div className="mt-6 h-px bg-white/10" />
              <ul className="mt-6 space-y-3">
                {glanceSolutions.map((s) => (
                  <li key={s} className="text-base md:text-lg text-white/85 font-light tracking-tight">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== SOLUTIONS =========================== */}
      <section className="border-t border-white/[0.06] bg-gradient-to-b from-transparent to-white/[0.015]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <div className="max-w-3xl">
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              One partner. Every kind of temporary space.
            </h2>
            <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
              From a single storage container to a full modular campus — Cassone specifies,
              delivers, and installs across every major sector in the Northeast.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map(({ icon: Icon, title, line }) => (
              <a
                key={title}
                href={OFFICIAL.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("solution", title.toLowerCase())}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl aspect-[4/5] p-8 md:p-10 flex flex-col justify-between hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
              >
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  <IndustrialBackdrop variant="steel" />
                </div>
                <div className="relative z-10">
                  <div
                    className="h-14 w-14 rounded-2xl border border-white/15 flex items-center justify-center backdrop-blur-md"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <Icon className="h-6 w-6" style={{ color: TEAL }} />
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-[1.02]">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm md:text-base text-white/65 font-light leading-relaxed max-w-[26ch]">
                    {line}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== FROM THE FIELD =========================== */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>From the Field</Eyebrow>
              <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
                Latest deliveries. Latest installs. Live from Cassone.
              </h2>
              <p className="mt-6 text-lg text-white/60 font-light max-w-2xl leading-relaxed">
                Rather than copy protected imagery, this Spotlight links directly to Cassone's
                official social channels — the real, dated record of recent projects, jobsite
                deliveries, and finished modular installations.
              </p>
            </div>
            <div className="lg:col-span-5 text-sm text-white/50 lg:text-right">
              Official channels · Updated by Cassone
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Instagram,
                label: "Instagram",
                handle: "@cassonecompanies",
                href: OFFICIAL.instagram,
                body: "Recent project photos, on-site deliveries, and finished modular installations.",
              },
              {
                icon: Facebook,
                label: "Facebook",
                handle: "Cassone Companies",
                href: OFFICIAL.facebook,
                body: "Company updates, community involvement, and long-form project stories.",
              },
              {
                icon: Youtube,
                label: "YouTube",
                handle: "Cassone Companies",
                href: OFFICIAL.youtube,
                body: "Walkthroughs, capability videos, and modular building overviews.",
              },
            ].map(({ icon: Icon, label, handle, href, body }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("social", label.toLowerCase())}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="h-12 w-12 rounded-xl border border-white/15 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: TEAL }} />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/50 group-hover:text-white transition" />
                </div>
                <p className="mt-8 text-2xl font-semibold tracking-[-0.02em]">{label}</p>
                <p className="mt-1 text-sm text-white/50">{handle}</p>
                <p className="mt-5 text-sm text-white/60 font-light leading-relaxed">{body}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 flex items-start gap-4 max-w-3xl">
            <Camera className="h-5 w-5 mt-0.5 shrink-0" style={{ color: TEAL }} />
            <p className="text-sm text-white/60 leading-relaxed">
              A native gallery of approved Cassone photography will appear here once the company
              grants media rights to Capital District Nest. Until then, all imagery lives on the
              official channels above.
            </p>
          </div>
        </div>
      </section>

      {/* =========================== SERVING THE NORTHEAST =========================== */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <div className="max-w-3xl">
            <Eyebrow>Serving the Northeast</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              Regional coverage. Rooted in New York.
            </h2>
            <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
              Cassone's modular units, trailers, and containers are delivered across the Northeast
              from long-established regional operations.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white/85 border border-white/15 bg-white/[0.03]"
              >
                <MapPin className="h-3.5 w-3.5" style={{ color: TEAL }} /> {area}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <PendingChip>Specific yard and office locations pending owner verification</PendingChip>
          </div>
        </div>
      </section>

      {/* =========================== WHY ORGANIZATIONS CHOOSE CASSONE =========================== */}
      <section className="border-t border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <div className="max-w-3xl">
            <Eyebrow>Why organizations choose Cassone</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              Substance over slogans.
            </h2>
            <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
              Themes drawn from Cassone's verified public information. No anonymous reviews. No
              invented star ratings.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-14">
            {reasons.map((r, i) => (
              <div key={r.title} className="flex gap-6">
                <div
                  className="shrink-0 text-sm font-semibold tracking-[0.2em]"
                  style={{ color: GOLD }}
                >
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] leading-[1.1]">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-base text-white/60 font-light leading-relaxed">
                    {r.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== TIMELINE PLACEHOLDER =========================== */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-4xl">
            <Eyebrow>Company History</Eyebrow>
            <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              A timeline built on verified milestones.
            </h2>
            <p className="mt-6 text-lg text-white/60 font-light leading-relaxed">
              Founding date, expansions, ownership certifications, and market entries will populate
              this timeline once each milestone is confirmed with Cassone. In line with Capital
              District Nest editorial standards, we do not publish dates, awards, or credentials
              until they are verified.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex items-start gap-4">
              <Info className="h-5 w-5 mt-0.5" style={{ color: TEAL }} />
              <p className="text-sm text-white/65">
                Timeline entries pending owner verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== CONTACT / QUOTE =========================== */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-28 md:py-36">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
                Have a project? Start a conversation.
              </h2>
              <p className="mt-6 text-lg text-white/60 font-light leading-relaxed max-w-xl">
                For quotes, delivery, and specifications, reach Cassone directly through their
                official channels. Or send an intro through Capital District Nest and we'll route
                you to the right team.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={OFFICIAL.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("website", "contact")}
                  className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
                >
                  <Globe className="h-4 w-4" /> Visit Cassone.com
                </a>
                <Link
                  to="/contact"
                  onClick={() => track("intro", "contact")}
                  className="lift-hover inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white border border-white/25 bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-md transition"
                >
                  <Mail className="h-4 w-4" /> Route Through Nest
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {[
                { icon: Phone, label: "Phone", value: "Pending owner verification" },
                { icon: MapPin, label: "Headquarters", value: "Pending owner verification" },
                { icon: Globe, label: "Website", value: "cassone.com", href: OFFICIAL.website },
                { icon: Instagram, label: "Instagram", value: "@cassonecompanies", href: OFFICIAL.instagram },
                { icon: Facebook, label: "Facebook", value: "Cassone Companies", href: OFFICIAL.facebook },
                { icon: Youtube, label: "YouTube", value: "Cassone Companies", href: OFFICIAL.youtube },
              ].map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 hover:bg-white/[0.06] transition">
                    <div
                      className="h-11 w-11 rounded-xl border border-white/10 flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <Icon className="h-5 w-5" style={{ color: TEAL }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/45">
                        {label}
                      </p>
                      <p className="mt-1 text-base font-medium truncate">
                        {value}
                      </p>
                    </div>
                    {href && <ArrowUpRight className="h-4 w-4 text-white/40" />}
                  </div>
                );
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================== OWNER CTA =========================== */}
      <section className="border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-28 md:py-36">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] backdrop-blur-xl p-10 md:p-16 text-center">
            <Eyebrow className="!text-center">Own or manage Cassone?</Eyebrow>
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
              Complete the Spotlight with your official media.
            </h2>
            <p className="mt-6 text-lg text-white/65 font-light max-w-2xl mx-auto">
              Approve project photography, confirm headquarters and phone, and share the milestones
              behind five decades of temporary-space work. Capital District Nest publishes the
              editorial; you keep the assets.
            </p>
            <Link
              to={BUSINESS.applyUrl}
              onClick={() => track("owner_claim", "owner_cta")}
              className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
            >
              Complete This Spotlight <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cassone;
