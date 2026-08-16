import { useEffect, useRef, useState, type CSSProperties, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { REALSCOUT } from "@/config/externalProducts";
import { TalkToScottButton } from "@/components/property/TalkToScott";
import { logEngagement } from "@/lib/engagement";

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

const PLACEMENT = "homepage-hero";

/**
 * Property Decision Hero.
 * The dominant interactive product is live property search via the verified
 * RealScout configuration already present in the project. The widget is
 * mounted only once the hero is in view, behind a fixed-height premium
 * skeleton, so it cannot shift layout or block LCP.
 */
const PropertyHero = () => {
  const reduce = useReducedMotion();
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [mountWidget, setMountWidget] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Mount the third-party widget lazily.
  useEffect(() => {
    const el = slotRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMountWidget(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMountWidget(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Detect whether the custom element actually upgraded.
  useEffect(() => {
    if (!mountWidget) return;
    let done = false;
    const check = () => {
      if (done) return;
      if (typeof customElements !== "undefined" && customElements.get("realscout-advanced-search")) {
        done = true;
        setReady(true);
        logEngagement("property_search_open", {}, { source_location: PLACEMENT });
      }
    };
    check();
    const interval = window.setInterval(check, 400);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      if (!done) setFailed(true);
    }, 8000);
    return () => {
      done = true;
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [mountWidget]);

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F19]" id="property-search">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 18%, rgba(94,234,212,0.10), transparent 70%), radial-gradient(55% 65% at 12% 100%, rgba(13,110,102,0.18), transparent 75%), linear-gradient(180deg, #0B0F19 0%, #090C14 100%)",
        }}
      />

      <div
        className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24"
        style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
      >
        <motion.div {...fade} className="text-center">
          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.45em] uppercase text-[#64748B]">
            Capital District Property Intelligence
          </p>

          <h1 className="mt-8 md:mt-10 text-[2.3rem] sm:text-5xl md:text-[4rem] tracking-[-0.035em] leading-[1.06] text-white text-balance">
            <span className="block font-extralight text-[#E2E8F0]">Find the property.</span>
            <span className="block font-semibold">Know if the deal works.</span>
            <span className="block font-light text-[#E2E8F0]">Build the right team.</span>
          </h1>

          <p className="mt-8 text-[15px] md:text-[17px] text-[#94A3B8] max-w-xl mx-auto font-light leading-[1.65]">
            Search live homes across the Capital District, understand the financial
            reality behind the listing, and connect with the local professionals who
            help move the decision forward.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#property-search-widget"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-white text-[#0B0F19] text-[13px] font-semibold tracking-wide hover:opacity-90 transition"
            >
              <Search className="w-4 h-4" /> Search live homes
            </a>
            <Link
              to="/analyze-any-deal"
              onClick={() =>
                logEngagement("property_analysis_click", {}, {
                  source_location: PLACEMENT,
                  intent_type: "buying",
                  product_type: "analyze_any_deal",
                })
              }
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full text-white text-[13px] font-semibold tracking-wide transition hover:opacity-90"
              style={{ backgroundColor: "#0d6e66" }}
            >
              Analyze any deal <ArrowRight className="w-4 h-4" />
            </Link>
            <TalkToScottButton context={{ placement: PLACEMENT }} />
          </div>
        </motion.div>

        {/* Live property search — the hero product */}
        <div
          id="property-search-widget"
          ref={slotRef}
          className="mt-14 md:mt-20 scroll-mt-24 rounded-[24px] border border-white/[0.07] p-5 sm:p-7 md:p-8"
          style={{
            background: "linear-gradient(180deg, #13161E 0%, #1A1D26 100%)",
            boxShadow: "0 24px 70px -32px rgba(0,0,0,0.7)",
          }}
        >
          <p className="text-[10px] font-medium tracking-[0.45em] uppercase text-[#64748B] mb-5 text-center">
            Live property search
          </p>

          <div className="min-h-[168px] flex items-center justify-center">
            {!mountWidget || (!ready && !failed) ? (
              <div className="w-full max-w-2xl animate-pulse space-y-3" aria-hidden>
                <div className="h-12 rounded-full bg-white/[0.06]" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-10 rounded-xl bg-white/[0.05]" />
                  <div className="h-10 rounded-xl bg-white/[0.05]" />
                  <div className="h-10 rounded-xl bg-white/[0.05]" />
                </div>
              </div>
            ) : failed ? (
              <div className="text-center">
                <p className="text-white/70 text-sm mb-4">
                  The property search tool didn't load. You can open it directly.
                </p>
                <a
                  href={REALSCOUT.albanyMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    logEngagement("realscout_search_click", {}, {
                      source_location: PLACEMENT,
                      search_type: "fallback_map",
                    })
                  }
                  className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-white text-[#0B0F19] text-sm font-semibold"
                >
                  Open property search <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : null}

            {mountWidget && !failed && (
              <div className={ready ? "w-full flex justify-center" : "sr-only"}>
                <realscout-advanced-search
                  agent-encoded-id={REALSCOUT.agentEncodedId}
                  style={
                    {
                      // Brand lock: RealScout defaults to blue. Force teal.
                      "--rs-as-button-text-color": "#ffffff",
                      "--rs-as-background-color": "#ffffff",
                      "--rs-as-button-color": "#0d6e66",
                      "--rs-as-widget-width": "100%",
                    } as CSSProperties
                  }
                ></realscout-advanced-search>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={REALSCOUT.capitalDistrictMapUrl ?? REALSCOUT.albanyMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                logEngagement("realscout_search_click", {}, {
                  source_location: PLACEMENT,
                  search_type: "map_link",
                })
              }
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] hover:gap-3 transition-all"
            >
              {REALSCOUT.capitalDistrictMapUrl
                ? "Browse the Capital District map"
                : "Browse the Albany map view"}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="hidden sm:block w-px h-4 bg-white/15" aria-hidden />
            <Link
              to="/homes"
              className="text-[13px] font-semibold text-white/70 hover:text-white transition"
            >
              All home resources
            </Link>
          </div>

          <p className="mt-5 text-center text-[11.5px] leading-relaxed text-white/45 max-w-2xl mx-auto">
            Property search is powered by RealScout on live MLS data. The map view
            linked above is currently scoped to the City of Albany. Looking for
            businesses, towns, or services instead? Use the site search in the
            navigation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyHero;
