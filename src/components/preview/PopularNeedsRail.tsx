/**
 * PREVIEW ONLY — not mounted on any public route.
 * Demand-led discovery rail: intent phrasing that mirrors how people actually
 * search ("near me" service needs), sourced from Search Console query families.
 */
import { ArrowUpRight } from "lucide-react";

export type PopularNeed = {
  label: string;
  intent: string;
  href: string;
  note?: string;
};

/** Seeded from the 90-day Search Console query baseline, not invented. */
export const POPULAR_NEEDS: PopularNeed[] = [
  { label: "House cleaning", intent: "cleaning services near me", href: "/local?q=cleaning", note: "Top query family" },
  { label: "Roofing", intent: "roofers near me", href: "/local?q=roofing" },
  { label: "Auto parts", intent: "auto parts near me", href: "/local?q=auto%20parts" },
  { label: "Notary", intent: "notary near me", href: "/local?q=notary" },
  { label: "Apartments", intent: "apartments for rent", href: "/rentals" },
  { label: "Dentists", intent: "dentist near me", href: "/local?q=dentist" },
  { label: "Plumbers", intent: "plumber near me", href: "/local?q=plumber" },
  { label: "Restaurants", intent: "places to eat near me", href: "/local?q=restaurants" },
];

export default function PopularNeedsRail({ needs = POPULAR_NEEDS }: { needs?: PopularNeed[] }) {
  return (
    <section className="py-10">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5eead4]">What people are looking for</p>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-white">Popular needs right now</h2>
        <p className="mt-2 max-w-xl text-sm text-white/60">
          Built from what people actually search in the Capital District — not from who pays us.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {needs.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="group min-w-[220px] snap-start rounded-2xl border border-[#2D3748] bg-[#1E2230] p-5 transition-colors hover:border-[#5eead4]/50"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-base font-semibold text-white">{n.label}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-colors group-hover:text-[#5eead4]" />
            </div>
            <p className="mt-2 text-xs text-white/50">&ldquo;{n.intent}&rdquo;</p>
            {n.note && <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-[#5eead4]/80">{n.note}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}
