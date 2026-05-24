import { TrendingUp, TrendingDown, ArrowRight, Sparkles, FileText, Building2, GraduationCap, Trees } from "lucide-react";

export interface WeeklyChangeItem {
  icon?: "up" | "down" | "new" | "permit" | "school" | "park" | "spark";
  label: string;
  detail?: string;
}

interface Props {
  townName: string;
  items: WeeklyChangeItem[];
  updatedLabel?: string; // e.g. "Updated 2 hours ago"
}

const TEAL_DARK = "#5eead4";

const IconFor = ({ k }: { k?: WeeklyChangeItem["icon"] }) => {
  const cls = "w-4 h-4";
  switch (k) {
    case "up":     return <TrendingUp className={cls} style={{ color: "#34d399" }} />;
    case "down":   return <TrendingDown className={cls} style={{ color: "#f87171" }} />;
    case "permit": return <FileText className={cls} style={{ color: TEAL_DARK }} />;
    case "school": return <GraduationCap className={cls} style={{ color: TEAL_DARK }} />;
    case "park":   return <Trees className={cls} style={{ color: TEAL_DARK }} />;
    case "new":    return <Building2 className={cls} style={{ color: TEAL_DARK }} />;
    default:       return <Sparkles className={cls} style={{ color: TEAL_DARK }} />;
  }
};

/**
 * "What Changed This Week" — minimal intelligence feed.
 * The addictive utility loop: weekly checkable diff of a town.
 */
export default function WhatChangedThisWeek({ townName, items, updatedLabel }: Props) {
  if (!items?.length) return null;

  return (
    <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10">
      {/* ambient bleed for cinematic flow */}
      <div
        className="absolute -top-32 right-1/4 w-[420px] h-[420px] rounded-full blur-[140px] pointer-events-none opacity-50"
        style={{ background: "rgba(94,234,212,0.10)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: TEAL_DARK }}
              >
                What Changed This Week
              </p>
              {updatedLabel && (
                <span className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-medium tracking-[0.14em] uppercase text-white/55">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-[#5eead4] opacity-60 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
                  </span>
                  {updatedLabel}
                </span>
              )}
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
              The {townName} diff.
            </h2>
            <p className="mt-4 text-base md:text-lg font-light text-white/60">
              Subtle shifts you'd only notice if you lived here — tracked weekly.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden divide-y divide-white/[0.06]">
          {items.map((it, i) => (
            <div
              key={`${it.label}-${i}`}
              className="group flex items-center gap-5 px-5 md:px-7 py-5 hover:bg-white/[0.04] transition"
            >
              <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03]">
                <IconFor k={it.icon} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] md:text-base font-medium text-white tracking-[-0.005em]">
                  {it.label}
                </p>
                {it.detail && (
                  <p className="mt-1 text-sm text-white/55 font-light">{it.detail}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-white/70 group-hover:translate-x-0.5 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
