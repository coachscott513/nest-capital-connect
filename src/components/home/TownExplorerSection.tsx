import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Compass, Store, Home as HomeIcon, Sparkles } from "lucide-react";

const TEAL = "#5eead4";

type Status = "Live" | "Building" | "Coming Soon";

interface TownCard {
  name: string;
  href: string;
  tags: string;
  status: Status;
  disabled?: boolean;
}

const TOWNS: TownCard[] = [
  { name: "Albany", href: "/living-in/albany", tags: "Homes · Businesses · Local Guide", status: "Live" },
  { name: "Delmar", href: "/living-in/delmar", tags: "Town guide · Homes · Services", status: "Live" },
  { name: "Saratoga Springs", href: "/living-in/saratoga-springs", tags: "Dining · Retail · Homes", status: "Live" },
  { name: "Troy", href: "/living-in/troy", tags: "Restaurants · Shops · Homes", status: "Live" },
  { name: "Schenectady", href: "/living-in/schenectady", tags: "Businesses · Services · Homes", status: "Live" },
  { name: "Clifton Park", href: "/living-in/clifton-park", tags: "Suburban guide · Homes · Services", status: "Building" },
  { name: "Niskayuna", href: "/living-in/niskayuna", tags: "Homes · Services · Local guide", status: "Building" },
  { name: "Queensbury", href: "/living-in/queensbury", tags: "Regional guide · Businesses · Homes", status: "Building" },
  { name: "Guilderland", href: "/living-in/guilderland", tags: "Homes · Businesses · Services", status: "Building" },
  { name: "Lake George", href: "/communities", tags: "Seasonal guide · Homes · Businesses", status: "Coming Soon", disabled: true },
];

const statusStyles: Record<Status, string> = {
  Live: "border-[#5eead4]/40 bg-[#5eead4]/[0.08] text-[#5eead4]",
  Building: "border-amber-300/30 bg-amber-300/[0.06] text-amber-200/90",
  "Coming Soon": "border-white/15 bg-white/[0.04] text-white/60",
};

const TownExplorerSection = () => {
  return (
    <section
      id="town-explorer"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 60% at 20% 25%, rgba(94,234,212,0.10), transparent 65%), radial-gradient(45% 60% at 90% 90%, rgba(13,110,102,0.18), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* LEFT — editorial block */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 self-start">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: TEAL }}>
              <Compass className="w-3 h-3" /> Local Coverage
            </p>
            <h2 className="mt-5 text-[2.25rem] sm:text-5xl md:text-[3.5rem] font-semibold tracking-[-0.04em] leading-[1.02] text-white">
              Explore the Capital District{" "}
              <span className="text-[#5eead4]">by town.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/70 font-light leading-relaxed">
              Capital District Nest organizes local discovery around the places people actually search —
              Albany, Delmar, Saratoga, Troy, Schenectady, Clifton Park, and beyond.
            </p>
            <p className="mt-4 text-sm md:text-base text-white/55 font-light leading-relaxed">
              Each town page brings together local businesses, property links, services, guides, and community
              resources in one clean place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/communities"
                aria-label="Browse all Capital District towns"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 hover:-translate-y-0.5 transition shadow-[0_12px_32px_-12px_rgba(13,110,102,0.6)]"
              >
                Browse All Towns <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/local"
                aria-label="Search local businesses"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] backdrop-blur text-white border border-white/20 text-sm font-semibold hover:bg-white/[0.12] transition"
              >
                <Store className="w-4 h-4" /> Search Local Businesses
              </Link>
            </div>

            {/* Soft stats */}
            <dl className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              {[
                { k: "Growing", v: "Town coverage" },
                { k: "Thousands", v: "Of local businesses" },
                { k: "By town", v: "Homes & services" },
                { k: "Weekly", v: "New pages added" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <dt className="text-[10px] font-semibold tracking-[0.24em] uppercase text-white/50">{s.k}</dt>
                  <dd className="mt-1 text-sm text-white font-medium">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* RIGHT — town grid */}
          <div className="lg:col-span-7 xl:col-span-8">
            <p className="text-sm md:text-base text-white/60 font-light leading-relaxed mb-6">
              Start with a town. Discover what's nearby, what's open, what's listed, and what makes each community different.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TOWNS.map((t) => {
                const chip = statusStyles[t.status];
                const CardInner = (
                  <div className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#5eead4]/40 hover:-translate-y-0.5 transition p-5 sm:p-6 overflow-hidden">
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "radial-gradient(50% 60% at 20% 0%, rgba(94,234,212,0.10), transparent 70%)" }}
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-white/50">
                          <MapPin className="w-3.5 h-3.5" style={{ color: TEAL }} />
                          <span className="text-[10px] font-semibold tracking-[0.24em] uppercase">Capital District</span>
                        </div>
                        <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white truncate">
                          {t.name}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                          {t.tags}
                        </p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border ${chip}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {t.status}
                      </span>
                    </div>
                    <div className="relative mt-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-[#5eead4] transition">
                        {t.disabled ? "Preview" : "Explore"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                );

                return (
                  <li key={t.name}>
                    {t.disabled ? (
                      <Link
                        to={t.href}
                        aria-label={`Preview ${t.name}`}
                        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4] rounded-2xl"
                      >
                        {CardInner}
                      </Link>
                    ) : (
                      <Link
                        to={t.href}
                        aria-label={`Explore ${t.name}`}
                        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5eead4] rounded-2xl"
                      >
                        {CardInner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Secondary CTA strip */}
            <div className="mt-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">
                    Don't see your town yet?
                  </h3>
                  <p className="mt-2 text-sm text-white/60 font-light leading-relaxed max-w-lg">
                    Capital District Nest is expanding across the region. Request a town, claim a business, or suggest a local resource.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/20 text-white text-xs font-semibold hover:bg-white/[0.12] transition"
                  >
                    Suggest a Town
                  </Link>
                  <Link
                    to="/claim-business"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.06] border border-white/20 text-white text-xs font-semibold hover:bg-white/[0.12] transition"
                  >
                    Claim a Business
                  </Link>
                  <Link
                    to="/homes"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0d6e66] text-white text-xs font-semibold hover:opacity-90 transition"
                  >
                    <HomeIcon className="w-3.5 h-3.5" /> Explore Homes
                  </Link>
                </div>
              </div>
            </div>

            {/* Business owner note */}
            <div className="mt-5 rounded-2xl border border-[#5eead4]/20 bg-[#5eead4]/[0.04] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full flex items-center justify-center border border-[#5eead4]/30 bg-[#5eead4]/[0.08] shrink-0">
                  <Sparkles className="w-4 h-4" style={{ color: TEAL }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Own a local business in one of these towns?
                  </p>
                  <p className="mt-1 text-xs text-white/60 font-light leading-relaxed">
                    Get found locally with Capital District Nest.
                  </p>
                </div>
              </div>
              <Link
                to="/business"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#0B0F19] text-xs font-semibold hover:opacity-90 transition shrink-0"
              >
                See Business Tools <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TownExplorerSection;
