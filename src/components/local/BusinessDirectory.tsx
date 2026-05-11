import { useMemo, useState } from "react";
import {
  Search,
  Phone,
  Globe,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
  Instagram,
  Facebook,
  Linkedin,
  X as XIcon,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  businesses as ALL,
  CATEGORY_GROUPS,
  type Business,
  type BusinessCategory,
  type CategoryGroup,
} from "@/data/businesses";

const TEAL = "#0d6e66";

interface Props {
  /** Limit to a specific town slug (e.g. on town pages). */
  townSlug?: string;
  /** Title at the top of directory. */
  title?: string;
  /** Hide the hero block (for embedding inside a town page). */
  embedded?: boolean;
}

const TOWN_LIST = [
  { slug: "delmar", name: "Delmar" },
  { slug: "albany", name: "Albany" },
  { slug: "saratoga-springs", name: "Saratoga Springs" },
  { slug: "troy", name: "Troy" },
  { slug: "schenectady", name: "Schenectady" },
  { slug: "clifton-park", name: "Clifton Park" },
  { slug: "niskayuna", name: "Niskayuna" },
  { slug: "colonie", name: "Colonie" },
  { slug: "guilderland", name: "Guilderland" },
];

const ALL_CATEGORIES: BusinessCategory[] = Object.values(
  CATEGORY_GROUPS,
).flat() as BusinessCategory[];

const BusinessDirectory = ({ townSlug, title, embedded }: Props) => {
  const [q, setQ] = useState("");
  const [town, setTown] = useState(townSlug ?? "");
  const [category, setCategory] = useState<string>("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [hasPhone, setHasPhone] = useState(false);
  const [openBiz, setOpenBiz] = useState<Business | null>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL.filter((b) => {
      if (townSlug && b.town !== townSlug && b.town !== "capital-district")
        return false;
      if (town && b.town !== town) return false;
      if (category && b.category !== category) return false;
      if (featuredOnly && !b.featured) return false;
      if (hasWebsite && !b.website) return false;
      if (hasPhone && !b.phone) return false;
      if (!needle) return true;
      const hay = [
        b.name,
        b.category,
        b.subcategory,
        b.tagline,
        b.about,
        b.townLabel,
        ...(b.services ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [q, town, category, featuredOnly, hasWebsite, hasPhone, townSlug]);

  const featured = useMemo(
    () => ALL.filter((b) => b.featured && (!townSlug || b.town === "capital-district")),
    [townSlug],
  );

  const grouped = useMemo(() => {
    const map = new Map<CategoryGroup, Business[]>();
    for (const b of results) {
      const group = (Object.entries(CATEGORY_GROUPS) as [
        CategoryGroup,
        BusinessCategory[],
      ][]).find(([, cats]) => cats.includes(b.category))?.[0];
      if (!group) continue;
      if (!map.has(group)) map.set(group, []);
      map.get(group)!.push(b);
    }
    return map;
  }, [results]);

  return (
    <div className="bg-white">
      {/* HERO */}
      {!embedded && (
        <section className="bg-white pt-24 md:pt-32 pb-12 px-6 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
              Local Directory
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.02]">
              {title ?? "Find local businesses across the Capital District."}
            </h1>
            <p className="mt-6 text-lg text-[#1d1d1f]/65 font-light">
              Search restaurants, lenders, attorneys, contractors, home services, and local
              professionals by town.
            </p>
            <a
              href="/claim-business"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
            >
              <Sparkles className="w-4 h-4" /> Claim Your Business
            </a>
          </div>
        </section>
      )}

      {/* FEATURED PARTNERS */}
      {!embedded && featured.length > 0 && (
        <section className="bg-[#0e0f12] text-white py-16 md:py-20 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3 text-[#5eead4]">
                  Featured Partners
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                  Trusted across the Capital District.
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {featured.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setOpenBiz(b)}
                  className="text-left rounded-2xl bg-white/[0.04] border border-white/10 p-7 hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all"
                >
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5eead4]/15 text-[#5eead4] text-[10px] font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">{b.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">
                    {b.category}
                  </p>
                  <p className="mt-4 text-sm text-white/65 font-light leading-relaxed">
                    {b.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm text-[#5eead4]">
                    View details <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEARCH BAR */}
      <section className={embedded ? "px-0" : "bg-white pt-16 px-6 md:px-10"}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] p-2.5 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2">
            <label className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#1d1d1f]/[0.03]">
              <Search className="w-4 h-4 text-[#0d6e66]" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value.slice(0, 120))}
                placeholder="Search by name, service, keyword…"
                className="w-full bg-transparent text-[15px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/45 focus:outline-none"
              />
            </label>
            {!townSlug && (
              <label className="flex flex-col gap-1 px-4 py-2.5 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
                  Town
                </span>
                <select
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full bg-transparent text-[15px] text-[#1d1d1f] focus:outline-none cursor-pointer"
                >
                  <option value="">All towns</option>
                  {TOWN_LIST.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="flex flex-col gap-1 px-4 py-2.5 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
                Category
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-[15px] text-[#1d1d1f] focus:outline-none cursor-pointer"
              >
                <option value="">All categories</option>
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => {
                /* form is already reactive */
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
              style={{ backgroundColor: TEAL }}
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </div>

          {/* Filter chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1d1d1f]/55">
              <Filter className="w-3.5 h-3.5" /> Filters
            </span>
            <FilterChip active={featuredOnly} onClick={() => setFeaturedOnly((v) => !v)}>
              Featured only
            </FilterChip>
            <FilterChip active={hasWebsite} onClick={() => setHasWebsite((v) => !v)}>
              Has website
            </FilterChip>
            <FilterChip active={hasPhone} onClick={() => setHasPhone((v) => !v)}>
              Has phone
            </FilterChip>
            {(q || town || category || featuredOnly || hasWebsite || hasPhone) && (
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  if (!townSlug) setTown("");
                  setCategory("");
                  setFeaturedOnly(false);
                  setHasWebsite(false);
                  setHasPhone(false);
                }}
                className="ml-1 text-xs text-[#0d6e66] hover:underline font-semibold"
              >
                Clear all
              </button>
            )}
            <span className="ml-auto text-xs text-[#1d1d1f]/55">
              {results.length} result{results.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className={embedded ? "py-10" : "bg-white py-20 px-6 md:px-10"}>
        <div className="max-w-6xl mx-auto">
          {results.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-[#1d1d1f]/15 rounded-2xl">
              <p className="text-lg font-semibold text-[#1d1d1f]">
                No businesses found yet.
              </p>
              <p className="mt-2 text-sm text-[#1d1d1f]/60">
                Try another search, or help us grow the directory.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/claim-business"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  Suggest a business
                </a>
                <a
                  href="/claim-business"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-sm font-semibold text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
                >
                  Claim your business
                </a>
              </div>
            </div>
          ) : (
            [...grouped.entries()].map(([group, list]) => (
              <div key={group} className="mb-14 last:mb-0">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f] mb-6">
                  {group}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {list.map((b) => (
                    <BusinessCard key={b.slug} b={b} onOpen={() => setOpenBiz(b)} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CLAIM CTA */}
      {!embedded && (
        <section className="bg-[#0e0f12] text-white py-24 md:py-28 px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-5 text-[#5eead4]" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
              Own a Capital District business?
            </h2>
            <p className="mt-5 text-lg font-light text-white/65">
              Get listed on Capital District Nest and reach local buyers, sellers, renters, and
              homeowners.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/claim-business"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.6)]"
              >
                Claim Your Business
              </a>
              <a
                href="/claim-business?tier=featured"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
              >
                Become a Featured Partner
              </a>
            </div>
          </div>
        </section>
      )}

      {/* DETAIL MODAL */}
      <BusinessDetailModal biz={openBiz} onClose={() => setOpenBiz(null)} />
    </div>
  );
};

const FilterChip = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
      active
        ? "bg-[#0d6e66] text-white border-[#0d6e66]"
        : "bg-white text-[#1d1d1f] border-[#1d1d1f]/15 hover:border-[#0d6e66]/40 hover:text-[#0d6e66]"
    }`}
  >
    {children}
  </button>
);

const BusinessCard = ({ b, onOpen }: { b: Business; onOpen: () => void }) => (
  <button
    onClick={onOpen}
    className="text-left rounded-2xl bg-white border border-[#1d1d1f]/[0.08] p-7 hover:border-[#0d6e66]/30 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-18px_rgba(13,110,102,0.18)] transition-all flex flex-col"
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
        {b.category}
      </p>
      {b.featured && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0d6e66]/10 text-[#0d6e66] text-[10px] font-semibold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> Featured
        </span>
      )}
    </div>
    <h3 className="text-lg font-semibold tracking-tight text-[#1d1d1f] leading-snug">
      {b.name}
    </h3>
    {b.townLabel && (
      <p className="mt-1 text-xs text-[#1d1d1f]/55 inline-flex items-center gap-1">
        <MapPin className="w-3 h-3" /> {b.townLabel}
      </p>
    )}
    <p className="mt-3 text-sm text-[#1d1d1f]/65 font-light leading-relaxed line-clamp-3">
      {b.tagline}
    </p>
    <div className="mt-5 flex items-center gap-3 text-xs text-[#1d1d1f]/55">
      {b.phone && (
        <span className="inline-flex items-center gap-1">
          <Phone className="w-3 h-3" /> Phone
        </span>
      )}
      {b.website && (
        <span className="inline-flex items-center gap-1">
          <Globe className="w-3 h-3" /> Web
        </span>
      )}
    </div>
    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0d6e66]">
      View Details <ArrowUpRight className="w-3.5 h-3.5" />
    </span>
  </button>
);

const BusinessDetailModal = ({
  biz,
  onClose,
}: {
  biz: Business | null;
  onClose: () => void;
}) => (
  <Dialog open={!!biz} onOpenChange={(o) => !o && onClose()}>
    <DialogContent className="max-w-2xl p-0 overflow-hidden">
      {biz && (
        <>
          <DialogTitle className="sr-only">{biz.name}</DialogTitle>
          <DialogDescription className="sr-only">{biz.tagline}</DialogDescription>
          {biz.image && (
            <div
              className="h-44 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${biz.image})` }}
            />
          )}
          <div className="p-7 md:p-9">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
              {biz.category}
              {biz.townLabel && ` · ${biz.townLabel}`}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              {biz.name}
            </h2>
            <p className="mt-3 text-base text-[#1d1d1f]/70 font-light leading-relaxed">
              {biz.about ?? biz.tagline}
            </p>

            {biz.services && biz.services.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {biz.services.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#1d1d1f]/[0.05] text-[#1d1d1f]/75"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              {biz.phone && (
                <Info icon={<Phone className="w-4 h-4" />} label="Phone" value={biz.phone} />
              )}
              {biz.email && (
                <Info icon={<Mail className="w-4 h-4" />} label="Email" value={biz.email} />
              )}
              {biz.website && (
                <Info
                  icon={<Globe className="w-4 h-4" />}
                  label="Website"
                  value={biz.website.replace(/^https?:\/\//, "")}
                />
              )}
              {biz.address && (
                <Info icon={<MapPin className="w-4 h-4" />} label="Address" value={biz.address} />
              )}
              {biz.hours && (
                <Info icon={<Clock className="w-4 h-4" />} label="Hours" value={biz.hours} />
              )}
            </div>

            {biz.socials && (
              <div className="mt-6 flex items-center gap-2">
                {biz.socials.instagram && (
                  <SocialBtn href={biz.socials.instagram} Icon={Instagram} />
                )}
                {biz.socials.facebook && (
                  <SocialBtn href={biz.socials.facebook} Icon={Facebook} />
                )}
                {biz.socials.linkedin && (
                  <SocialBtn href={biz.socials.linkedin} Icon={Linkedin} />
                )}
                {biz.socials.twitter && <SocialBtn href={biz.socials.twitter} Icon={XIcon} />}
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-2">
              {biz.phone && (
                <a
                  href={`tel:${biz.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#DC1C2E] text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
              )}
              {biz.email && (
                <a
                  href={`mailto:${biz.email}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-sm font-semibold text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              )}
              {biz.website && (
                <a
                  href={biz.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  <Globe className="w-4 h-4" /> Website
                </a>
              )}
              {biz.address && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(biz.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#1d1d1f]/15 text-sm font-semibold text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
                >
                  <MapPin className="w-4 h-4" /> Directions
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-0.5 text-[#0d6e66]">{icon}</span>
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#1d1d1f]/55">
        {label}
      </p>
      <p className="text-sm text-[#1d1d1f]">{value}</p>
    </div>
  </div>
);

const SocialBtn = ({
  href,
  Icon,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#1d1d1f]/15 text-[#1d1d1f] hover:border-[#0d6e66]/40 hover:text-[#0d6e66] transition"
  >
    <Icon className="w-4 h-4" />
  </a>
);

export default BusinessDirectory;
