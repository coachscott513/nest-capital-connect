import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { HOMES_TOWNS } from "@/data/homesTowns";
import { getCurrentCampaign } from "@/data/weeklyCampaigns";
import { logEngagement } from "@/lib/engagement";

import heroTownsWide from "@/assets/hero-towns-wide.jpg";
import heroBusinessWide from "@/assets/hero-business-wide.jpg";
import heroDiscoveryWide from "@/assets/hero-discovery-wide.jpg";
import heroEventsWide from "@/assets/hero-events-wide.jpg";
import partnerRooseveltImg from "@/assets/partner-roosevelt.jpg";

const PLACEMENT = "homepage-towns-events-stories";

type StoryCard = { eyebrow: string; title: string; to: string; image: string };

/**
 * CHAPTER 8 — TOWNS, EVENTS & LOCAL STORIES
 *
 * Consolidation of three former homepage chapters (Towns rail, This Week
 * campaign, Currently Featured) into a single editorial chapter. Every
 * destination previously linked from those chapters is still linked here,
 * so no canonical route lost a homepage entry point.
 */
const useRail = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };
  return { ref, nudge };
};

const arrowClass =
  "w-10 h-10 rounded-full border border-white/12 bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.09] inline-flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]/60";

const TownsEventsStoriesChapter = () => {
  const campaign = useMemo(() => getCurrentCampaign(), []);
  const towns = useRail();
  const stories = useRail();

  const storyCards: StoryCard[] = useMemo(
    () => [
      {
        eyebrow: "Business Spotlight",
        title: "Roosevelt Room",
        to: "/business/roosevelt-room",
        image: partnerRooseveltImg,
      },
      {
        eyebrow: "Industrial Spotlight",
        title: "Cassone",
        to: "/business/cassone",
        image: heroBusinessWide,
      },
      {
        eyebrow: "Weekend Guide",
        title: "This week in the Capital District",
        to: "/weekly",
        image: heroEventsWide,
      },
      {
        eyebrow: "Neighborhood",
        title: "Living in Delmar",
        to: "/living-in/delmar",
        image: heroTownsWide,
      },
      {
        eyebrow: "Homes",
        title: "Smart home search",
        to: "/homes/search",
        image: heroDiscoveryWide,
      },
      ...campaign.cards.map((c) => ({
        eyebrow: c.eyebrow,
        title: c.title,
        to: c.to,
        image: c.image,
      })),
    ],
    [campaign],
  );

  return (
    <section
      id="towns-events-stories"
      className="relative w-full scroll-mt-24 border-t border-white/[0.06] bg-[#0E1220]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-20 pb-20 md:pt-28 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] md:text-[11px] font-medium tracking-[0.42em] uppercase text-[#5eead4]">
              Towns, events &amp; local stories
            </p>
            <h2 className="mt-5 text-[2rem] md:text-[3.25rem] font-extralight tracking-[-0.04em] leading-[1.06] text-white text-balance">
              Where you buy shapes{" "}
              <span className="font-semibold">everything that follows.</span>
            </h2>
            <p className="mt-5 text-[15px] md:text-[16.5px] font-light leading-[1.65] text-white/55">
              Town guides, this week around the region, and the local stories worth
              reading.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Link
              to="/communities"
              onClick={() => logEngagement("town_open", {}, { source_location: PLACEMENT })}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-white/12 bg-white/[0.04] text-white text-[13px] font-medium hover:bg-white/[0.09] transition"
            >
              All towns
            </Link>
            <button type="button" aria-label="Scroll towns left" onClick={() => towns.nudge(-1)} className={arrowClass}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" aria-label="Scroll towns right" onClick={() => towns.nudge(1)} className={arrowClass}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Towns rail */}
        <div
          ref={towns.ref}
          className="mt-10 md:mt-14 -mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {HOMES_TOWNS.map((t) => (
            <Link
              key={t.slug}
              to={`/towns/${t.slug}`}
              onClick={() =>
                logEngagement("town_open", {}, { source_location: PLACEMENT, town_slug: t.slug })
              }
              className="group snap-start shrink-0 w-[52vw] sm:w-[30vw] lg:w-[18%] rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-7 hover:border-[#5eead4]/35 transition-colors"
            >
              <p className="text-[10px] font-medium tracking-[0.24em] uppercase text-[#5eead4]/80">
                {t.county}
              </p>
              <h3 className="mt-3 text-[20px] font-medium tracking-[-0.03em] text-white">
                {t.name}
              </h3>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/55 group-hover:text-[#5eead4] group-hover:gap-2.5 transition-all">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
          <div className="shrink-0 w-1" aria-hidden />
        </div>

        {/* This week — one immersive feature */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20"
        >
          <Link
            to={campaign.hero.to}
            className="group relative block rounded-[28px] overflow-hidden border border-white/[0.07] hover:border-[#5eead4]/30 transition-all duration-500"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/7] md:aspect-[21/8] overflow-hidden">
              <img
                src={campaign.hero.image}
                alt={campaign.hero.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,15,25,0.15) 0%, rgba(11,15,25,0.6) 60%, rgba(11,15,25,0.94) 100%)",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 md:p-14">
                <p className="text-[10px] font-medium tracking-[0.32em] uppercase text-[#5eead4]">
                  This week · {campaign.theme}
                </p>
                <h3 className="mt-4 text-2xl sm:text-4xl md:text-[3.25rem] font-extralight tracking-[-0.04em] leading-[1.04] text-white max-w-3xl">
                  {campaign.hero.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#5eead4] group-hover:gap-3 transition-all">
                  {campaign.hero.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Local stories rail */}
        <div className="mt-12 md:mt-16 flex items-end justify-between gap-4">
          <p className="text-[10px] md:text-[11px] font-medium tracking-[0.32em] uppercase text-white/50">
            Local stories
          </p>
          <div className="hidden md:flex items-center gap-2">
            <button type="button" aria-label="Scroll stories left" onClick={() => stories.nudge(-1)} className={arrowClass}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" aria-label="Scroll stories right" onClick={() => stories.nudge(1)} className={arrowClass}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={stories.ref}
          className="mt-5 -mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {storyCards.map((c) => (
            <Link
              key={c.to + c.title}
              to={c.to}
              className="group shrink-0 snap-start w-[76%] sm:w-[44%] md:w-[30%] lg:w-[23%] rounded-[24px] overflow-hidden border border-white/[0.07] hover:border-[#5eead4]/30 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
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
                  <p className="text-[10px] font-medium tracking-[0.24em] uppercase text-[#5eead4]">
                    {c.eyebrow}
                  </p>
                  <h4 className="mt-2.5 text-[20px] md:text-[22px] font-medium tracking-[-0.025em] leading-[1.12] text-white">
                    {c.title}
                  </h4>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/70 group-hover:text-[#5eead4] group-hover:gap-2.5 transition-all">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className="shrink-0 w-1" aria-hidden />
        </div>

        {/* Mobile-only chapter actions */}
        <div className="mt-8 flex md:hidden flex-wrap gap-3">
          <Link
            to="/communities"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-white/12 bg-white/[0.04] text-white text-[13px] font-medium"
          >
            All towns
          </Link>
          <Link
            to="/weekly"
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-white/12 bg-white/[0.04] text-white text-[13px] font-medium"
          >
            This week
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TownsEventsStoriesChapter;
