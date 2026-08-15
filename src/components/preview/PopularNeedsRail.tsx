/**
 * PREVIEW ONLY — not mounted on any public route.
 *
 * Every card here maps to a recorded demand signal (see src/data/demandSignals.ts,
 * mirrored privately in public.demand_signals). No card is labelled
 * "demand-derived" unless a measured Search Console row backs it.
 *
 * This rail links into existing filtered surfaces only. It does NOT create thin
 * indexable service pages.
 */
import { ArrowUpRight } from "lucide-react";
import { DEMAND_SIGNALS, DEMAND_WINDOW, type DemandSignal } from "@/data/demandSignals";

export type PopularNeed = DemandSignal;
export const POPULAR_NEEDS = DEMAND_SIGNALS;

export default function PopularNeedsRail({
  needs = DEMAND_SIGNALS,
  showEvidence = false,
}: {
  needs?: DemandSignal[];
  /** Admin-only: reveals the private query mapping behind each label. */
  showEvidence?: boolean;
}) {
  return (
    <section className="py-10">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5eead4]">What people actually searched</p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Popular needs right now</h2>
        <p className="mt-2 max-w-xl text-sm text-white/60">
          Measured demand only, from {DEMAND_WINDOW.start} to {DEMAND_WINDOW.end}. Not who pays us,
          and not categories we assumed.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {needs.map((n) => (
          <a
            key={n.slug}
            href={n.href}
            rel="nofollow"
            className="group min-w-[230px] snap-start rounded-2xl border border-[#2D3748] bg-[#1E2230] p-5 transition-colors hover:border-[#5eead4]/50"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-base font-semibold text-white">{n.label}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-colors group-hover:text-[#5eead4]" />
            </div>
            <p className="mt-2 text-xs text-white/50">&ldquo;{n.intent}&rdquo;</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#5eead4]/80">
              {n.clicks} {n.clicks === 1 ? "click" : "clicks"} · {n.impressions} impressions
            </p>
            {showEvidence && (
              <ul className="mt-3 space-y-1 border-t border-white/10 pt-3">
                {n.evidenceQueries.map((q) => (
                  <li key={q} className="text-[11px] text-white/40">
                    {q}
                  </li>
                ))}
              </ul>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
