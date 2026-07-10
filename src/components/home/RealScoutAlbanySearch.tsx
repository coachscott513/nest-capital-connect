import type { DetailedHTMLProps, HTMLAttributes } from "react";

// Allow the RealScout custom element in JSX without converting it to a React component.
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

const RealScoutAlbanySearch = () => {
  return (
    <section className="py-16 px-6 bg-[#0B0F19]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="eyebrow-apple text-[#5eead4] mb-3">Search Albany, NY</p>
        <h2 className="h-hero text-white mb-4">Find your next home in Albany</h2>
        <p className="body-apple text-white/70 mb-8 max-w-xl mx-auto">
          Search active MLS listings across Albany, NY — filter by price, beds, and
          neighborhood.
        </p>

        <realscout-advanced-search agent-encoded-id="QWdlbnQtMzE2NTU3"></realscout-advanced-search>

        <div className="mt-8">
          <a
            href="https://scottalvarez863.realscout.com/homesearch/map?geo_type=city&geo_id=3601000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "rgb(35, 93, 137)" }}
          >
            Browse all Albany, NY listings →
          </a>
        </div>
      </div>
    </section>
  );
};

export default RealScoutAlbanySearch;
