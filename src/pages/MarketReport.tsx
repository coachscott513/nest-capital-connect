import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { trackGAEvent } from "@/components/GARouteTracker";

import { MARKET_REPORTS, getMarketReport } from "@/data/marketReports";
import NotFound from "./NotFound";

const BASE_URL = "https://www.capitaldistrictnest.com";

const fmtCurrency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const fmtSigned = (n: number, suffix = "%") =>
  `${n > 0 ? "+" : ""}${n.toFixed(1)}${suffix}`;

const trendClass = (n: number, invert = false) => {
  const good = invert ? n < 0 : n > 0;
  if (n === 0) return "text-black/50";
  return good ? "text-black" : "text-black/50";
};

const MarketReportPage = () => {
  const { town = "" } = useParams<{ town: string }>();
  const report = getMarketReport(town);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [town]);

  // Report consumption was previously untracked, so we had no signal on which
  // market reports are worth maintaining.
  useEffect(() => {
    if (report) trackGAEvent.intelligenceReportView("market_report", report.name);
  }, [report]);


  if (!report) return <NotFound />;

  const title = `${report.name} Real Estate Market Report & Housing Data | Capital District Nest`;
  const description = `${report.name}, NY real estate market report — median sale price ${fmtCurrency(
    report.medianSalePrice
  )}, ${report.daysOnMarket} days on market, ${report.activeInventory} active homes. Updated ${report.updated}.`;
  const canonical = `${BASE_URL}/market-reports/${report.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": `${report.name} Real Estate Market Report`,
    "url": canonical,
    "about": `${report.name}, NY housing market`,
    "datePublished": new Date().toISOString().slice(0, 10),
    "publisher": {
      "@type": "Organization",
      "name": "Capital District Nest",
      "url": BASE_URL,
    },
  };

  const rows = [
    {
      label: "Median Sale Price",
      value: fmtCurrency(report.medianSalePrice),
      change: fmtSigned(report.medianYoY),
      trend: trendClass(report.medianYoY),
    },
    {
      label: "Days on Market",
      value: `${report.daysOnMarket} days`,
      change: fmtSigned(report.domYoY, " days"),
      trend: trendClass(report.domYoY, true),
    },
    {
      label: "Active Inventory",
      value: `${report.activeInventory} homes`,
      change: fmtSigned(report.inventoryYoY),
      trend: trendClass(report.inventoryYoY),
    },
    {
      label: "Months of Supply",
      value: report.monthsOfSupply.toFixed(1),
      change: "",
      trend: "text-black/50",
    },
    {
      label: "Median $ / Sq Ft",
      value: fmtCurrency(report.medianPricePerSqft),
      change: "",
      trend: "text-black/50",
    },
    {
      label: "Sale-to-List Ratio",
      value: `${report.saleToListRatio.toFixed(1)}%`,
      change: "",
      trend: "text-black/50",
    },
  ];

  const otherTowns = MARKET_REPORTS.filter((r) => r.slug !== report.slug).slice(0, 8);

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        structuredData={structuredData}
      />

      {/* Minimal top bar */}
      <header className="border-b border-black/10">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-tight text-black hover:opacity-70">
            Capital District Nest
          </Link>
          <Link
            to="/market-reports"
            className="text-xs tracking-wide uppercase text-black/60 hover:text-black inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Reports
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-16 md:pb-24 max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-8">
          Market Report · {report.updated}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.045em] leading-[0.95] text-black">
          {report.name}
          <br />
          <span className="text-black/40">Housing Data.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-black/70 font-light">
          {report.summary}
        </p>
      </section>

      {/* Headline stat */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-black/10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-6">
              Median Sale Price
            </p>
            <p className="text-7xl md:text-8xl font-semibold tracking-[-0.04em] leading-none">
              {fmtCurrency(report.medianSalePrice)}
            </p>
            <p className="mt-6 text-sm text-black/60">
              {fmtSigned(report.medianYoY)} year-over-year · {report.county}
            </p>
          </div>
          <div className="md:pl-16 md:border-l border-black/10">
            <p className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-6">
              Days on Market
            </p>
            <p className="text-7xl md:text-8xl font-semibold tracking-[-0.04em] leading-none">
              {report.daysOnMarket}
            </p>
            <p className="mt-6 text-sm text-black/60">
              {fmtSigned(report.domYoY, " days")} vs. last year
            </p>
          </div>
        </div>
      </section>

      {/* Data table */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-black/10 max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-10">
          The Data
        </p>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-12 items-baseline py-6 md:py-8"
            >
              <div className="col-span-12 md:col-span-5 text-sm md:text-base text-black/60">
                {r.label}
              </div>
              <div className="col-span-8 md:col-span-5 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">
                {r.value}
              </div>
              <div className={`col-span-4 md:col-span-2 text-right text-sm md:text-base ${r.trend}`}>
                {r.change}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-black/40">
          Figures reflect {report.name}, {report.county} sales activity as of{" "}
          {report.updated}. Aggregated from regional MLS reporting. Snapshot
          data; not a comparative market analysis.
        </p>
      </section>

      {/* Other towns */}
      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-black/10 max-w-5xl mx-auto">
        <p className="text-[11px] tracking-[0.32em] uppercase text-black/50 mb-10">
          Other Towns
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {otherTowns.map((t) => (
            <Link
              key={t.slug}
              to={`/market-reports/${t.slug}`}
              className="bg-white hover:bg-black hover:text-white transition-colors p-6 group"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-black/40 group-hover:text-white/60 mb-3">
                {t.county.replace(" County", "")}
              </div>
              <div className="text-xl font-semibold tracking-tight flex items-center justify-between">
                {t.name}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3 text-sm text-black/60 group-hover:text-white/70">
                {fmtCurrency(t.medianSalePrice)}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 md:px-10 py-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-black/50">
          <div>
            © {new Date().getFullYear()} Capital District Nest · Market Reports
          </div>
          <div className="flex gap-6">
            <Link to="/market-reports" className="hover:text-black">All Reports</Link>
            <Link to="/" className="hover:text-black">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketReportPage;
