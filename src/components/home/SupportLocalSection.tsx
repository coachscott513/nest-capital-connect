import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Search, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import {
  businesses as ALL,
  CATEGORY_GROUPS,
  type BusinessCategory,
} from "@/data/businesses";

const TOWN_CHIPS = [
  { name: "Delmar", slug: "delmar" },
  { name: "Albany", slug: "albany" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Troy", slug: "troy" },
];

const ALL_CATEGORIES: BusinessCategory[] = Object.values(
  CATEGORY_GROUPS,
).flat() as BusinessCategory[];

const PLACEHOLDERS = [
  "Mortgage lender",
  "Coffee shop",
  "Real estate attorney",
  "HVAC",
  "Roofer",
  "Restaurant in Delmar",
];

const SupportLocalSection = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");
  const placeholder = useMemo(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)],
    [],
  );

  const featured = useMemo(() => {
    const promoted = ALL.filter((b) => b.featured);
    const filler = ALL.filter(
      (b) =>
        !b.featured &&
        (b.about || b.tagline) &&
        (b.category === "Coffee" ||
          b.category === "Restaurant" ||
          b.category === "Bakery" ||
          b.category === "Roofer"),
    );
    return [...promoted, ...filler].slice(0, 6);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (town) params.set("town", town);
    if (category) params.set("category", category);
    const qs = params.toString();
    navigate(qs ? `/local?${qs}` : "/local");
  };

  return (
    <section className="bg-[#faf8f3] w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-[88px] md:py-[140px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 text-[#0d6e66]">
            Local Businesses
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.0] text-[#1d1d1f]">
            Support local.
          </h2>
          <p className="mt-7 text-lg md:text-xl text-[#1d1d1f]/65 font-light leading-relaxed">
            Discover restaurants, lenders, attorneys, coffee shops, contractors, and the
            independent businesses residents actually use across the Capital District.
          </p>
        </motion.div>

        {/* Search bar — large, equal weight to home search */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-14 rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_24px_60px_-22px_rgba(0,0,0,0.22)] p-3 md:p-3.5 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2"
        >
          <label className="flex items-center gap-3 px-5 py-4 md:py-5 rounded-xl bg-[#1d1d1f]/[0.03]">
            <Search className="w-5 h-5 text-[#0d6e66]" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 120))}
              placeholder={placeholder}
              className="w-full bg-transparent text-[16px] md:text-[17px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/45 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 px-5 py-3 md:py-3.5 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
              Town
            </span>
            <select
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#1d1d1f] focus:outline-none cursor-pointer"
            >
              <option value="">All towns</option>
              {TOWN_CHIPS.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 px-5 py-3 md:py-3.5 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-[16px] text-[#1d1d1f] focus:outline-none cursor-pointer"
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
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-7 py-5 md:py-6 rounded-xl text-white text-[15px] font-semibold hover:opacity-90 transition shadow-[0_12px_32px_-10px_rgba(13,110,102,0.55)] bg-[#0d6e66]"
          >
            <Search className="w-5 h-5" /> Search Businesses
          </button>
        </motion.form>

        {/* Town chips */}
        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#1d1d1f]/55 mr-1">
            Explore in
          </span>
          {TOWN_CHIPS.map((t) => (
            <Link
              key={t.slug}
              to={`/local?town=${t.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-white text-[#1d1d1f] border-[#1d1d1f]/15 hover:border-[#0d6e66]/40 hover:text-[#0d6e66] transition"
            >
              {t.name}
            </Link>
          ))}
        </div>

        {/* Featured row */}
        <div className="mt-14 md:mt-16">
          <div className="flex items-end justify-between mb-7 flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-2 text-[#0d6e66]">
                Featured Community Partners
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                Trusted across the Capital District.
              </h3>
            </div>
            <Link
              to="/local"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d6e66] hover:opacity-80 transition"
            >
              View the directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {featured.map((b) => (
              <Link
                key={b.slug}
                to={`/local?biz=${b.slug}`}
                className={`group text-left rounded-2xl bg-white border p-6 transition-all hover:-translate-y-0.5 ${
                  b.featured
                    ? "border-[#0d6e66]/25 shadow-[0_18px_48px_-22px_rgba(13,110,102,0.22)] hover:shadow-[0_24px_56px_-22px_rgba(13,110,102,0.32)]"
                    : "border-[#1d1d1f]/[0.08] hover:border-[#0d6e66]/30 hover:shadow-[0_18px_48px_-22px_rgba(13,110,102,0.18)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">
                    {b.category}
                  </p>
                  {b.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0d6e66] text-white text-[10px] font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-semibold tracking-tight text-[#1d1d1f] leading-snug">
                  {b.name}
                </h4>
                {b.townLabel && (
                  <p className="mt-1 text-xs text-[#1d1d1f]/55 inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {b.townLabel}
                  </p>
                )}
                <p className="mt-3 text-sm text-[#1d1d1f]/65 font-light leading-relaxed line-clamp-2">
                  {b.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0d6e66] group-hover:gap-2 transition-all">
                  View business <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm text-[#1d1d1f]/60">
          <p className="font-light">
            Local services across the Capital District — curated, not crowdsourced.
          </p>
          <Link
            to="/claim-business"
            className="inline-flex items-center gap-1.5 font-semibold text-[#0d6e66] hover:opacity-80 transition"
          >
            List your business <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupportLocalSection;
