import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Search } from "lucide-react";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const TOWNS = [
  { name: "Delmar", slug: "delmar" },
  { name: "Albany", slug: "albany" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Troy", slug: "troy" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Colonie", slug: "colonie" },
  { name: "Guilderland", slug: "guilderland" },
];

const REMAX_ALL = "https://scottalvarez.remax.com/";

const HomesPage = () => {
  const navigate = useNavigate();
  const [town, setTown] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (town) {
      navigate(`/living-in-${town}`);
      return;
    }
    const q = new URLSearchParams();
    if (price) q.set("price", price);
    if (type) q.set("type", type);
    window.open(`${REMAX_ALL}${q.toString() ? `?${q.toString()}` : ""}`, "_blank");
  };

  const fieldClass =
    "w-full bg-transparent text-[15px] text-[#1d1d1f] placeholder:text-[#1d1d1f]/45 focus:outline-none appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Search Homes Across the Capital District | Capital District Nest</title>
        <meta
          name="description"
          content="Browse active home listings across the Capital District by town, price, and property type — straight from the live MLS feed."
        />
        <link rel="canonical" href="https://www.capitaldistrictnest.com/homes" />
      </Helmet>

      <CleanHeader />

      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#0d6e66]">
              Homes
            </p>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.02]">
              Search homes across the Capital District.
            </h1>
            <p className="mt-6 text-lg text-[#1d1d1f]/65 font-light">
              Browse active listings by town, price, and property type.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-2xl bg-white border border-[#1d1d1f]/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.18)] p-2.5 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-2"
          >
            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Town</span>
              <select value={town} onChange={(e) => setTown(e.target.value)} className={fieldClass}>
                <option value="">All towns</option>
                {TOWNS.map((t) => (
                  <option key={t.slug} value={t.slug}>{t.name}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Price</span>
              <select value={price} onChange={(e) => setPrice(e.target.value)} className={fieldClass}>
                <option value="">Any price</option>
                <option value="0-300000">Under $300K</option>
                <option value="300000-500000">$300K – $500K</option>
                <option value="500000-750000">$500K – $750K</option>
                <option value="750000-1000000">$750K – $1M</option>
                <option value="1000000-">$1M+</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 px-4 py-3 rounded-xl hover:bg-[#1d1d1f]/[0.03] transition border-t md:border-t-0 md:border-l border-[#1d1d1f]/[0.06]">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#0d6e66]">Type</span>
              <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
                <option value="">All types</option>
                <option value="single-family">Single-Family</option>
                <option value="multifamily">Multifamily</option>
                <option value="condo">Condo / Townhome</option>
                <option value="land">Land</option>
              </select>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0d6e66] text-white text-sm font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
            >
              <Search className="w-4 h-4" /> Search Homes
            </button>
          </form>

          {/* Town shortcuts */}
          <div className="mt-12">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#1d1d1f]/55 text-center mb-5">
              Jump to a Town
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TOWNS.map((t) => (
                <Link
                  key={t.slug}
                  to={`/living-in-${t.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#1d1d1f]/10 text-sm text-[#1d1d1f] hover:border-[#0d6e66]/35 hover:text-[#0d6e66] transition"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href={REMAX_ALL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0d6e66] text-white font-semibold hover:opacity-90 transition shadow-[0_10px_30px_-10px_rgba(13,110,102,0.55)]"
            >
              Open Full MLS Search <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-xs text-[#1d1d1f]/55">Live MLS via RE/MAX</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomesPage;
