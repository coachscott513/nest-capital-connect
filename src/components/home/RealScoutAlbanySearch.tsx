import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Bell, Wallet, Calculator, ArrowRight } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "realscout-advanced-search": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & { "agent-encoded-id"?: string },
        HTMLElement
      >;
    }
  }
}

const MAP_URL =
  "https://scottalvarez863.realscout.com/homesearch/map?geo_type=city&geo_id=3601000";

const RealScoutAlbanySearch = () => {
  return (
    <section id="albany-home-search" className="relative bg-[#0B0F19] border-t border-white/[0.06] py-16 md:py-24 px-4 sm:px-6 scroll-mt-24">
      {/* soft teal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 30%, rgba(94,234,212,0.10), transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="eyebrow-apple text-[#5eead4] mb-3">ALBANY HOME SEARCH</p>
        <h2 className="h-hero text-white mb-4">
          Search Albany homes with smarter alerts.
        </h2>
        <p className="body-apple text-white/70 mb-3 max-w-2xl mx-auto">
          Browse current Albany listings, save searches, and get notified when homes
          match your criteria.
        </p>
        <p className="text-white/55 text-sm max-w-2xl mx-auto mb-10">
          Use Capital District Nest for local context, buyer tools, and Albany property
          resources — then search current listings through the RealScout-powered search
          tool.
        </p>

        {/* Premium glass wrapper around the RealScout widget */}
        <div
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-8 md:p-10 shadow-2xl"
          style={{
            boxShadow:
              "0 20px 60px -20px rgba(13,110,102,0.35), 0 0 0 1px rgba(94,234,212,0.08)",
          }}
        >
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-4">
            Live MLS Search · Albany, NY
          </p>

          <div className="flex justify-center">
            <realscout-advanced-search agent-encoded-id="QWdlbnQtMzE2NTU3"></realscout-advanced-search>
          </div>

          <p className="text-white/50 text-xs mt-5">
            Powered by RealScout. Search runs on live MLS data — Capital District Nest
            surrounds it with the local intelligence layer.
          </p>

          {/* CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0d6e66" }}
            >
              Browse all Albany listings <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/investment-analyzer?tab=first-time-buyer&town=albany"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] transition"
            >
              <Wallet className="w-4 h-4 text-[#5eead4]" /> Estimate Cash to Buy
            </Link>
            <Link
              to="/investment-analyzer?town=albany"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] transition"
            >
              <Calculator className="w-4 h-4 text-[#5eead4]" /> Analyze Albany Property
            </Link>
          </div>
        </div>

        {/* 3 mini cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-left">
          {[
            {
              icon: Bell,
              title: "Smart Alerts",
              body: "Track new Albany listings and price changes that match your search.",
            },
            {
              icon: Wallet,
              title: "Cash to Buy",
              body: "Estimate down payment, closing costs, seller credits, and monthly payment.",
            },
            {
              icon: Calculator,
              title: "Property Analysis",
              body: "Run numbers on Albany homes, multi-units, rentals, and investment properties.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#5eead4]/40 transition-colors"
            >
              <c.icon className="w-5 h-5 text-[#5eead4] mb-2" />
              <h3 className="text-white font-semibold mb-1">{c.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* SEO-friendly paragraph */}
        <p className="text-white/55 text-sm mt-8 max-w-3xl mx-auto leading-relaxed">
          Albany offers single-family homes, condos, multi-family properties, historic
          homes, downtown apartments, and investment opportunities. Capital District Nest
          helps buyers search Albany listings while also exploring local neighborhoods,
          property tools, and town-level resources.
        </p>
      </div>
    </section>
  );
};

export default RealScoutAlbanySearch;
