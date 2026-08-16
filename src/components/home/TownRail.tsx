import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ChapterRail from "@/components/home/ChapterRail";
import { HOMES_TOWNS } from "@/data/homesTowns";
import { logEngagement } from "@/lib/engagement";

const PLACEMENT = "homepage-towns";

/**
 * Town rail. Links only to already-indexed `/towns/:slug` routes — no new
 * URL patterns and no changes to protected slugs.
 */
const TownRail = () => (
  <ChapterRail
    id="towns"
    eyebrow="Towns"
    title="Where you buy shapes everything that follows."
    subtitle="Taxes, school districts, commute, and housing stock differ street by street across the Capital District."
    tone="elevated"
    action={
      <Link
        to="/communities"
        onClick={() => logEngagement("town_open", {}, { source_location: PLACEMENT })}
        className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-white/15 bg-white/[0.04] text-white text-[13px] font-semibold hover:bg-white/[0.09] transition"
      >
        All towns
      </Link>
    }
  >
    {HOMES_TOWNS.map((t) => (
      <Link
        key={t.slug}
        to={`/towns/${t.slug}`}
        onClick={() =>
          logEngagement("town_open", {}, { source_location: PLACEMENT, town_slug: t.slug })
        }
        className="group snap-start shrink-0 w-[62vw] sm:w-[38vw] lg:w-[23%] rounded-[22px] border border-white/10 bg-white/[0.03] p-7 hover:border-[#5eead4]/40 transition-colors"
      >
        <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#5eead4]">
          {t.county}
        </p>
        <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.03em] text-white">{t.name}</h3>
        <p className="mt-2 text-[13.5px] text-white/55 font-light leading-relaxed">
          Local context, market signals, and what is happening this week.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-white/70 group-hover:text-[#5eead4] group-hover:gap-3 transition-all">
          Open <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    ))}
  </ChapterRail>
);

export default TownRail;
