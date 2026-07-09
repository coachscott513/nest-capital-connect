import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { MARKET_REPORTS } from "@/data/marketReports";

const BASE_URL = "https://www.capitaldistrictnest.com";

const fmtCurrency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const MarketReportsIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <SEOHead
        title="Capital District Market Reports & Housing Data | Capital District Nest"
        description="Real estate market reports for every Capital District town — median sale price, days on market, and inventory data for Albany, Saratoga Springs, Troy, Schenectady, Delmar and more."
        canonical={`${BASE_URL}/market-reports`}
      />

      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-tight hover:opacity-70">
            Capital District Nest
          </Link>
          <Link to="/" className="text-xs tracking-wide uppercase text-black/60 hover:text-black">
            Home
          </Link>
        </div>
      </header>

      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-16 max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-8">
          Market Reports
        </p>
        <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.95]">
          Capital District<br /><span className="text-black/40">Housing Data.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-black/70 font-light">
          Median sale price, days on market, and inventory data for every
          Capital District town. Open access. No forms. Just numbers.
        </p>
      </section>

      <section className="px-6 md:px-10 py-8 md:py-16 border-t border-black/10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-px bg-black/10 border border-black/10">
          {MARKET_REPORTS.map((r) => (
            <Link
              key={r.slug}
              to={`/market-reports/${r.slug}`}
              className="bg-white hover:bg-black hover:text-white transition-colors p-8 group"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-black/40 group-hover:text-white/60 mb-4">
                {r.county}
              </div>
              <div className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] flex items-center justify-between">
                {r.name}
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-6 flex items-baseline gap-6 text-sm">
                <div>
                  <div className="text-black/40 group-hover:text-white/50 text-xs uppercase tracking-wider mb-1">Median</div>
                  <div className="text-black group-hover:text-white font-semibold">{fmtCurrency(r.medianSalePrice)}</div>
                </div>
                <div>
                  <div className="text-black/40 group-hover:text-white/50 text-xs uppercase tracking-wider mb-1">Days on Market</div>
                  <div className="text-black group-hover:text-white font-semibold">{r.daysOnMarket}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 md:px-10 py-12 max-w-5xl mx-auto">
        <div className="text-xs text-black/50">
          © {new Date().getFullYear()} Capital District Nest · Market Reports
        </div>
      </footer>
    </div>
  );
};

export default MarketReportsIndex;
