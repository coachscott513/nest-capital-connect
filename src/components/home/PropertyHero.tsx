import { useEffect, useRef, useState, type CSSProperties, type DetailedHTMLProps, type HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { REALSCOUT, analyzeAnyPropertyUrl } from "@/config/externalProducts";
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

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.div {...fade} className="text-center">
          <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.4em] uppercase text-[#5eead4]/90">
            Capital District Nest
          </p>

          <h1 className="mt-7 md:mt-9 text-[2.35rem] sm:text-5xl md:text-[4.25rem] font-semibold tracking-[-0.045em] leading-[1.02] text-white text-balance">
            Find the home.
            <span className="block">Understand the property.</span>
            <span className="block bg-gradient-to-r from-white via-white to-[#5eead4] bg-clip-text text-transparent">
              Build the right team.
            </span>
          </h1>

          <p className="mt-7 text-[15px] md:text-lg text-white/70 max-w-2xl mx-auto font-light leading-[1.6]">
            Search homes across the Capital District, pressure-test the property, and
            connect with the local professionals who help you buy, sell, invest,
            renovate, and own with confidence.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="#property-search-widget"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-white text-[#0B0F19] text-sm font-semibold hover:opacity-90 transition"
            >
              <Search className="w-4 h-4" /> Search homes
            </a>
            <a
              href={analyzeAnyPropertyUrl({ placement: PLACEMENT })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                logEngagement("property_analysis_click", {}, { source_location: PLACEMENT })
              }
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
              style={{ backgroundColor: "#0d6e66" }}
            >
              Analyze a property <ArrowRight className="w-4 h-4" />
            </a>
            <TalkToScottButton context={{ placement: PLACEMENT }} />
          </div>
        </motion.div>

        {/* Live property search — the hero product */}
        <div
          id="property-search-widget"
          ref={slotRef}
          className="mt-12 md:mt-16 scroll-mt-24 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-7 md:p-9 shadow-2xl"
          style={{
            boxShadow:
              "0 24px 70px -24px rgba(13,110,102,0.4), 0 0 0 1px rgba(94,234,212,0.08)",
          }}
        >
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#5eead4] mb-4 text-center">
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
