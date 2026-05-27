import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search, MapPin, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  CATEGORY_GROUPS,
  type Business,
  type BusinessCategory,
} from "@/data/businesses";
import { BusinessDetailModal } from "@/components/local/BusinessDirectory";
import { useDbBusinesses } from "@/hooks/useDbBusinesses";

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
  const [openBiz, setOpenBiz] = useState<Business | null>(null);
  const { rows: liveBusinesses } = useDbBusinesses();
  const placeholder = useMemo(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)],
    [],
  );

  const featured = useMemo(() => {
    const promoted = liveBusinesses.filter((b) => b.featured);
    const filler = liveBusinesses.filter(
      (b) =>
        !b.featured &&
        (b.about || b.tagline) &&
        (b.category === "Coffee" ||
          b.category === "Restaurant" ||
          b.category === "Bakery" ||
          b.category === "Roofer"),
    );
    return [...promoted, ...filler].slice(0, 6);
  }, [liveBusinesses]);

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
            Popular Business Searches
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[1.0] text-white">
            What people search.
          </h2>
          <p className="mt-7 text-lg md:text-xl text-white/60 font-light leading-relaxed">
            The most-searched local businesses across the Capital District — restaurants,
            lenders, attorneys, coffee shops, contractors, and the independents residents actually use.

          </p>
        </motion.div>

        {/* Search bar */}
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
          <p className="text-[10.5px] font-semibold tracking-[0.32em] uppercase text-white/35 mb-3">
            Trending Database Indexes
          </p>
          <div className="flex items-end justify-between mb-7 flex-wrap gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-2 text-[#5eead4]">
                Featured Community Partners
              </p>
              <h3 className="text-2xl md:text-3xl font-mono font-semibold tracking-[-0.01em] text-white">
                QUERY: <span className="text-[#5eead4]">"Delmar Dining &amp; Trusted Trades"</span>
              </h3>
            </div>
            <Link
              to="/local"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/20 bg-white/[0.04] text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] hover:bg-white/[0.08] transition"
            >
              View Full Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((b) => (
              <button
                key={b.slug}
                type="button"
                onClick={() => setOpenBiz(b)}
                className={`group relative text-left rounded-2xl overflow-hidden bg-[#1E2230] border-0 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                  b.featured
                    ? "shadow-[0_22px_56px_-22px_rgba(201,164,73,0.18)] hover:ring-[#c9a449]/70 hover:shadow-[0_28px_64px_-20px_rgba(201,164,73,0.35)]"
                    : "hover:ring-[#5eead4]/60 hover:shadow-[0_22px_56px_-22px_rgba(94,234,212,0.30)]"
                }`}
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[700ms] group-hover:scale-110"
                    style={
                      b.image
                        ? { backgroundImage: `url(${b.image})` }
                        : { background: "linear-gradient(135deg, #0d6e66 0%, #0B0F19 100%)" }
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2230] via-[#1E2230]/30 to-transparent" />
                  {b.featured && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5eead4]/15 backdrop-blur text-[#5eead4] text-[10px] font-semibold uppercase tracking-wider border border-[#5eead4]/30">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5eead4]">
                    {b.category}
                  </p>
                  <h4 className="mt-1.5 text-lg font-semibold tracking-tight text-white leading-snug">
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
                  <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#5eead4]">
                    View profile <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Large centered directory CTA below cards */}
          <div className="mt-14 md:mt-16 flex flex-col items-center text-center gap-5">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: "#5eead4" }}>
              The Full Directory
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-white max-w-xl">
              Discover trusted local partners across the Capital District.
            </h3>
            <Link
              to="/local"
              className="group mt-2 inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-semibold border border-white/15 bg-white/[0.06] backdrop-blur-xl text-white hover:bg-white/[0.12] hover:border-[#5eead4]/50 hover:text-[#5eead4] transition-all shadow-[0_18px_50px_-20px_rgba(94,234,212,0.35)]"
            >
              Explore the full Capital District directory
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Business owner CTA — distinct from featured cards & directory button */}
        <div className="mt-16 md:mt-20 rounded-2xl border border-[#5eead4]/25 bg-gradient-to-br from-[#0d6e66]/15 via-[#1E2230] to-[#1E2230] p-7 md:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl border border-[#5eead4]/40 bg-[#5eead4]/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#5eead4]" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#5eead4] font-semibold">
                Business Owners
              </p>
              <h4 className="mt-1.5 text-xl md:text-2xl font-semibold tracking-tight text-white leading-tight">
                Own a local business?
              </h4>
              <p className="mt-2 text-sm md:text-[15px] text-white/65 font-light leading-relaxed">
                Claim your free profile and add photos, specials, events, and social links.
              </p>
            </div>
          </div>
          <Link
            to="/claim-business"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition shrink-0 self-start md:self-auto"
          >
            Claim Your Business <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer line */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-white/55">
          <p className="font-light">
            Local services across the Capital District — curated, not crowdsourced.
          </p>
        </div>
      </div>

      <BusinessDetailModal biz={openBiz} onClose={() => setOpenBiz(null)} all={liveBusinesses} />
    </section>
  );
};

export default SupportLocalSection;
