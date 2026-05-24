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
    <section className="bg-[#0B0F19] w-full border-t border-[#2D3748]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-[88px] md:py-[140px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5 text-[#5eead4]">
            Local Businesses
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.0] text-white">
            Support local.
          </h2>
          <p className="mt-7 text-lg md:text-xl text-white/60 font-light leading-relaxed">
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
          className="mt-12 md:mt-14 rounded-2xl bg-[#1E2230] border border-[#2D3748] shadow-[0_24px_60px_-22px_rgba(0,0,0,0.6)] p-3 md:p-3.5 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] gap-2"
        >
          <label className="flex items-center gap-3 px-5 py-4 md:py-5 rounded-xl bg-white/[0.04]">
            <Search className="w-5 h-5 text-[#5eead4]" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 120))}
              placeholder={placeholder}
              className="w-full bg-transparent text-[16px] md:text-[17px] text-white placeholder:text-white/45 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 px-5 py-3 md:py-3.5 rounded-xl hover:bg-white/[0.04] transition border-t md:border-t-0 md:border-l border-[#2D3748]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
              Town
            </span>
            <select
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className="w-full bg-transparent text-[16px] text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#1E2230]">All towns</option>
              {TOWN_CHIPS.map((t) => (
                <option key={t.slug} value={t.slug} className="bg-[#1E2230]">
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 px-5 py-3 md:py-3.5 rounded-xl hover:bg-white/[0.04] transition border-t md:border-t-0 md:border-l border-[#2D3748]">
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-[16px] text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#1E2230]">All categories</option>
              {ALL_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#1E2230]">
                  {c}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-7 py-5 md:py-6 rounded-xl text-white text-[15px] font-semibold hover:opacity-90 transition shadow-[0_12px_32px_-10px_rgba(13,110,102,0.6)] bg-[#0d6e66]"
          >
            <Search className="w-5 h-5" /> Search Businesses
          </button>
        </motion.form>

        {/* Town chips */}
        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-white/50 mr-1">
            Explore in
          </span>
          {TOWN_CHIPS.map((t) => (
            <Link
              key={t.slug}
              to={`/local?town=${t.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-white/[0.04] text-white border-[#2D3748] hover:border-[#0d6e66]/70 hover:text-[#5eead4] transition"
            >
              {t.name}
            </Link>
          ))}
        </div>

        {/* Featured row */}
        <div className="mt-14 md:mt-16">
          <div className="flex items-end justify-between mb-7 flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-2 text-[#5eead4]">
                Featured Community Partners
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white">
                Trusted across the Capital District.
              </h3>
            </div>
            <Link
              to="/local"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5eead4] hover:opacity-80 transition"
            >
              View the directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {featured.map((b) => (
              <Link
                key={b.slug}
                to={`/local?biz=${b.slug}`}
                className={`group text-left rounded-2xl bg-[#1E2230] border p-6 transition-all hover:-translate-y-0.5 ${
                  b.featured
                    ? "border-[#0d6e66]/50 shadow-[0_18px_48px_-22px_rgba(13,110,102,0.4)] hover:shadow-[0_24px_56px_-22px_rgba(13,110,102,0.55)]"
                    : "border-[#2D3748] hover:border-[#0d6e66]/60 hover:shadow-[0_18px_48px_-22px_rgba(13,110,102,0.35)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
                    {b.category}
                  </p>
                  {b.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0d6e66] text-white text-[10px] font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-semibold tracking-tight text-white leading-snug">
                  {b.name}
                </h4>
                {b.townLabel && (
                  <p className="mt-1 text-xs text-white/50 inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {b.townLabel}
                  </p>
                )}
                <p className="mt-3 text-sm text-white/60 font-light leading-relaxed line-clamp-2">
                  {b.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#5eead4] group-hover:gap-2 transition-all">
                  View business <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-sm text-white/55">
          <p className="font-light">
            Local services across the Capital District — curated, not crowdsourced.
          </p>
          <Link
            to="/claim-business"
            className="inline-flex items-center gap-1.5 font-semibold text-[#5eead4] hover:opacity-80 transition"
          >
            List your business <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SupportLocalSection;
