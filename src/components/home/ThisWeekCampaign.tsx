import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getCurrentCampaign } from "@/data/weeklyCampaigns";

/**
 * ThisWeekCampaign
 * Apple-style weekly editorial campaign shelf.
 * One immersive hero + horizontally scrolling supporting cards.
 * Rotates automatically each ISO week — no manual updates required.
 */
export default function ThisWeekCampaign() {
  const campaign = useMemo(() => getCurrentCampaign(), []);
  const railRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.85, 720);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section
      id="this-week"
      className="relative w-full overflow-hidden bg-[#0B0F19] border-t border-white/[0.06] scroll-mt-20"
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6 flex-wrap"
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5eead4]">
              Featured Industry of the Week
            </p>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
              {campaign.theme}.
            </h2>
          </div>
          <p className="text-[12.5px] text-white/45 font-light">
            A new industry every Monday.
          </p>

        </motion.div>

        {/* Immersive hero */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14"
        >
          <Link
            to={campaign.hero.to}
            className="group relative block rounded-[32px] overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-[#5eead4]/30 transition-all duration-500 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={campaign.hero.image}
                alt={campaign.hero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,15,25,0.15) 0%, rgba(11,15,25,0.55) 55%, rgba(11,15,25,0.94) 100%)",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 lg:p-20">
                <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.32em] uppercase text-[#5eead4]">
                  Featured Industry · {campaign.theme}
                </p>

                <h3 className="mt-4 md:mt-6 text-3xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.98] text-white max-w-4xl">
                  {campaign.hero.title}
                </h3>
                <p className="mt-5 md:mt-7 text-[15px] md:text-lg text-white/75 font-light leading-relaxed max-w-2xl">
                  {campaign.hero.copy}
                </p>
                <div className="mt-7 md:mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
                  {campaign.hero.cta}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Supporting shelf */}
        <div className="mt-10 md:mt-14">
          <div className="flex items-end justify-between mb-5">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white/60">
              The full ecosystem
            </p>

            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollBy(-1)}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition inline-flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollBy(1)}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] text-white hover:border-[#5eead4]/50 hover:text-[#5eead4] transition inline-flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={railRef}
            className="-mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            <div className="flex gap-5 md:gap-6 pb-4">
              {campaign.cards.map((c) => (
                <Link
                  key={c.title + c.eyebrow}
                  to={c.to}
                  className="group shrink-0 snap-start w-[78%] sm:w-[46%] md:w-[32%] lg:w-[26%] rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.02] hover:border-[#5eead4]/30 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(11,15,25,0.10) 0%, rgba(11,15,25,0.55) 60%, rgba(11,15,25,0.94) 100%)",
                      }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
                        {c.eyebrow}
                      </p>
                      <h4 className="mt-2 text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-[1.1] text-white">
                        {c.title}
                      </h4>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/80 group-hover:text-[#5eead4] group-hover:gap-2.5 transition-all">
                        Explore
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <p className="mt-4 text-[12px] text-white/40 md:hidden">Swipe to explore →</p>
        </div>
      </div>
    </section>
  );
}
