import { ArrowRight, ArrowUpRight, Home, DollarSign, Coffee, Calendar, Building2, Receipt, FileText, GraduationCap, Trash2, Zap, Car, Shield, Star, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import type { LivingInTown, EssentialIcon, WeeklyUpdateType } from "@/data/livingInTowns";
import { businessTelHref, isValidBusinessPhone } from "@/lib/businessContact";

const TEAL = "#0d6e66";

const WEEKLY_ICONS: Record<WeeklyUpdateType, typeof Home> = {
  listings: Home,
  sold: DollarSign,
  business: Coffee,
  event: Calendar,
};
const WEEKLY_LABELS: Record<WeeklyUpdateType, string> = {
  listings: "New Listings",
  sold: "Just Sold",
  business: "Local Business",
  event: "This Week",
};

const ESSENTIAL_ICONS: Record<EssentialIcon, typeof Building2> = {
  townHall: Building2,
  tax: Receipt,
  permit: FileText,
  school: GraduationCap,
  trash: Trash2,
  utility: Zap,
  dmv: Car,
  safety: Shield,
};

interface Props {
  town: LivingInTown;
}

/* ───────── HERO ───────── */
export const TownHero = ({ town }: Props) => (
  <section className="bg-[#0e0f12] text-white">
    <div className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#5eead4] mb-6">
        Capital District · {town.county}
      </p>
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.0]">
        What's Happening<br />in {town.townName}.
      </h1>
      <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed">
        Real estate, local businesses, and community updates — refreshed weekly.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={town.listingSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0e0f12] px-7 py-3.5 rounded-full font-semibold hover:bg-white/90 transition"
        >
          View Homes in {town.townName} <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#weekly-newsletter"
          className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/15 transition"
        >
          Get Weekly Updates
        </a>
      </div>
      <p className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/55">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] animate-pulse" />
        Updated {town.updatedDate}
      </p>
    </div>
  </section>
);

/* ───────── WEEKLY UPDATES ───────── */
export const TownWeeklyUpdates = ({ town }: Props) => (
  <section className="bg-white py-24 md:py-32 px-6 md:px-10">
    <div className="max-w-6xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
          The Weekly Feed
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
          {town.townName} this week.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {town.weeklyUpdates.map((u, i) => {
          const Icon = WEEKLY_ICONS[u.type];
          return (
            <article
              key={i}
              className="card-lift relative bg-white border border-[#1d1d1f]/8 rounded-2xl p-8 md:p-10"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <span className="absolute top-5 right-5 inline-flex items-center rounded-full bg-[#0d6e66] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                This Week
              </span>
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0d6e66]/8">
                  <Icon className="w-5 h-5 text-[#0d6e66]" strokeWidth={1.75} />
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#0d6e66]">
                  {WEEKLY_LABELS[u.type]}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] tracking-tight leading-snug">
                {u.title}
              </h3>
              <p className="mt-3 text-base text-[#1d1d1f]/65 font-light leading-relaxed">
                {u.description}
              </p>
              <p className="mt-6 text-xs text-[#1d1d1f]/45 font-medium tracking-wide">{u.date}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* ───────── HOMES FOR SALE ───────── */
export const TownHomes = ({ town }: Props) => {
  const embed = town.listingEmbedUrl ?? town.listingSearchUrl;
  return (
    <section className="bg-[#f5efe4] py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
            Live MLS
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
            Homes for sale in {town.townName}.
          </h2>
          <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
            Search live listings — direct from the Capital Region MLS.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.18)]">
          <iframe
            src={embed}
            title={`${town.townName} Homes for Sale`}
            className="w-full h-[640px] border-0"
            loading="lazy"
          />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={town.listingSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Open full search <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#weekly-newsletter"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#0d6e66]/25 text-[#0d6e66] text-sm font-semibold hover:bg-[#0d6e66] hover:text-white hover:border-[#0d6e66] transition"
          >
            Get New Listings + Weekly Updates
          </a>
        </div>
      </div>
    </section>
  );
};

/* ───────── FEATURED THIS WEEK ───────── */
export const TownFeatured = ({ town }: Props) => {
  if (!town.featuredBusiness) return null;
  const f = town.featuredBusiness;
  const telHref = businessTelHref(f.phone);
  return (
    <section className="bg-white py-24 md:py-28 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
            Featured This Week
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
            One spotlight. One {town.townName} story.
          </h2>
        </div>
        <div className="rounded-3xl bg-[#0e0f12] text-white p-10 md:p-14 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#5eead4]/15 text-[#5eead4] mb-6">
            <Star className="w-3 h-3 fill-current" /> Featured
          </span>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/55 font-semibold mb-2">{f.category}</p>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">{f.name}</h3>
          <p className="mt-4 text-lg text-white/75 font-light leading-relaxed">{f.tagline}</p>
          {f.address && <p className="mt-6 text-sm text-white/55">{f.address}</p>}
          {isValidBusinessPhone(f.phone) && telHref ? (
            <a
              href={telHref}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0e0f12] text-sm font-semibold hover:bg-white/90 transition"
            >
              <Phone className="w-4 h-4" /> Call Business
            </a>
          ) : (
            <span className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white/55 text-sm font-semibold">
              <Phone className="w-4 h-4" /> Phone unavailable
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

/* ───────── EVENTS ───────── */
export const TownEvents = ({ town }: Props) => {
  if (!town.events?.length) return null;
  return (
    <section className="bg-[#f5efe4] py-24 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
            Community
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
            This week in {town.townName}.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {town.events.slice(0, 3).map((e, i) => (
            <article key={i} className="card-lift bg-white rounded-2xl p-8 border border-foreground/[0.06]">
              <div className="flex items-center gap-2 mb-4 text-[#0d6e66]">
                <Calendar className="w-4 h-4" />
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold">{e.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">{e.title}</h3>
              <p className="mt-2 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">{e.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────── START HERE ───────── */
export const TownStartHere = ({ town }: Props) => (
  <section className="bg-white py-24 md:py-28 px-6 md:px-10">
    <div className="max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
          Start Here
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
          New to {town.townName}?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <Link
          to="/rentals"
          className="group block rounded-3xl bg-[#f5efe4] p-9 md:p-10 border border-foreground/[0.06] hover:border-[#0d6e66]/25 transition-all hover:-translate-y-0.5"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-3">Renting</p>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
            Renting in {town.townName}.
          </h3>
          <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
            Apartments, pricing, and move-in help.
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6e66]">
            Start Renting <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
        <Link
          to="/first-time-homebuyers"
          className="group block rounded-3xl bg-[#f5efe4] p-9 md:p-10 border border-foreground/[0.06] hover:border-[#0d6e66]/25 transition-all hover:-translate-y-0.5"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66] mb-3">Buying</p>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
            Buy your first home in {town.townName}.
          </h3>
          <p className="mt-3 text-[15px] text-[#1d1d1f]/65 font-light leading-relaxed">
            What you can afford, programs, and the next step.
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6e66]">
            Start Buying <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  </section>
);

/* ───────── LOCAL ESSENTIALS ───────── */
export const TownEssentials = ({ town }: Props) => (
  <section className="bg-[#f5efe4] py-24 md:py-28 px-6 md:px-10">
    <div className="max-w-6xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
          Local Essentials
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
          Local Essentials in {town.townName}.
        </h2>
        <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
          Permits, taxes, schools, and official town resources.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {town.essentials.slice(0, 6).map((e) => {
          const Icon = ESSENTIAL_ICONS[e.icon];
          return (
            <a
              key={e.title}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-white p-7 md:p-8 border border-foreground/[0.06] hover:border-[#0d6e66]/25 transition-all hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)]"
            >
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0d6e66]/8 mb-5">
                <Icon className="w-5 h-5 text-[#0d6e66]" strokeWidth={1.75} />
              </span>
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#1d1d1f] inline-flex items-center gap-1.5">
                {e.title}
                <ArrowUpRight className="w-4 h-4 text-foreground/35 group-hover:text-[#0d6e66] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </h3>
              <p className="mt-2 text-[14px] text-[#1d1d1f]/60 font-light leading-relaxed">
                {e.description}
              </p>
            </a>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-14 flex flex-col items-center text-center">
        <p className="text-base md:text-lg text-[#1d1d1f]/70 font-light mb-5">
          Need help with this?
        </p>
        <a
          href="tel:+15185227265"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#DC1C2E] text-white font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(220,28,46,0.55)]"
        >
          <Phone className="w-4 h-4" /> Talk to Scott
        </a>
      </div>
    </div>
  </section>
);

/* ───────── EXPERT CTA ───────── */
export const TownExpertCTA = ({ town }: Props) => (
  <section className="bg-white py-24 md:py-28 px-6 md:px-10">
    <div className="max-w-3xl mx-auto text-center">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: TEAL }}>
        Local Expert
      </p>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-[1.05]">
        Talk to Scott Alvarez.
      </h2>
      <p className="mt-5 text-lg text-[#1d1d1f]/65 font-light">
        Local {town.townName} expert · Capital District Nest
      </p>
      <a
        href="tel:+15185227265"
        className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition"
      >
        <Phone className="w-4 h-4" /> (518) 522-7265
      </a>
    </div>
  </section>
);

/* ───────── NEARBY TOWNS ───────── */
export const TownNearby = ({ town }: Props) => {
  if (!town.nearbyTowns?.length) return null;
  return (
    <section className="bg-[#0e0f12] text-white py-20 md:py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#5eead4]">
          Nearby Towns
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] mb-10">
          Explore more of the Capital District.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {town.nearbyTowns.map((n) => (
            <Link
              key={n.slug}
              to={`/living-in-${n.slug}`}
              className="group block rounded-xl border border-white/10 px-4 py-4 hover:border-[#5eead4]/40 hover:bg-white/[0.04] transition"
            >
              <span className="text-sm font-semibold inline-flex items-center gap-1.5">
                {n.name}
                <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#5eead4] transition" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
