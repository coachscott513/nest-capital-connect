import { ArrowUpRight, Calendar } from "lucide-react";

export interface WeekendItem {
  day: string;        // "Sat", "Sun", "Fri"
  time?: string;      // "9 AM"
  category: string;   // "Farmers Market"
  title: string;
  location?: string;
  image?: string;
  href?: string;
}

interface Props {
  townName: string;
  items: WeekendItem[];
}

const TEAL_DARK = "#5eead4";

/**
 * "This Weekend in [Town]" — exactly 5 curated cards in an editorial mosaic.
 * Habit-forming weekly utility loop.
 */
export default function ThisWeekendIn({ townName, items }: Props) {
  if (!items?.length) return null;
  const top = items.slice(0, 5);

  return (
    <section className="relative bg-background border-t border-white/[0.06] py-20 md:py-24 px-6 md:px-10">
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[160px] pointer-events-none opacity-40"
        style={{ background: "rgba(13,110,102,0.18)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <p
                className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                style={{ color: TEAL_DARK }}
              >
                This Weekend
              </p>
              <span className="inline-flex items-center gap-1.5 px-2 py-[3px] rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-medium tracking-[0.14em] uppercase text-white/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5eead4]" />
                Trending in {townName}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-white">
              This weekend in {townName}.
            </h2>
            <p className="mt-4 text-base md:text-lg font-light text-white/60">
              Five things worth leaving the house for.
            </p>
          </div>
          <Calendar className="hidden md:block w-6 h-6 shrink-0" style={{ color: TEAL_DARK }} />
        </div>

        {/* Editorial mosaic: 1 large feature + 4 stacked */}
        <div className="grid md:grid-cols-12 gap-4">
          {/* Hero feature */}
          {top[0] && (
            <a
              href={top[0].href ?? "#"}
              className="group relative md:col-span-7 rounded-3xl overflow-hidden border border-white/[0.08] aspect-[4/3] md:aspect-auto md:min-h-[460px] bg-card/40"
            >
              {top[0].image && (
                <img
                  src={top[0].image}
                  alt={top[0].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.03] group-hover:opacity-90 transition duration-700"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.18em] uppercase border"
                    style={{ color: TEAL_DARK, borderColor: `${TEAL_DARK}55`, background: `${TEAL_DARK}14` }}
                  >
                    {top[0].day}{top[0].time ? ` · ${top[0].time}` : ""}
                  </span>
                  <span className="text-[11px] text-white/60 uppercase tracking-[0.18em] font-medium">
                    {top[0].category}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-white leading-[1.1]">
                  {top[0].title}
                </h3>
                {top[0].location && (
                  <p className="mt-2 text-sm text-white/65 font-light">{top[0].location}</p>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/85">
                  Plan it <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
            </a>
          )}

          {/* 4 stacked cards */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
            {top.slice(1, 5).map((it, i) => (
              <a
                key={`${it.title}-${i}`}
                href={it.href ?? "#"}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/15 backdrop-blur-sm p-3.5 transition"
              >
                {it.image && (
                  <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="inline-flex items-center px-2 py-[2px] rounded-full text-[9px] font-semibold tracking-[0.16em] uppercase"
                      style={{ color: TEAL_DARK, background: `${TEAL_DARK}14` }}
                    >
                      {it.day}{it.time ? ` · ${it.time}` : ""}
                    </span>
                    <span className="text-[9px] text-white/45 uppercase tracking-[0.14em] font-medium truncate">
                      {it.category}
                    </span>
                  </div>
                  <p className="text-[15px] font-semibold text-white tracking-[-0.005em] truncate">
                    {it.title}
                  </p>
                  {it.location && (
                    <p className="mt-0.5 text-xs text-white/50 font-light truncate">{it.location}</p>
                  )}
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-white/30 group-hover:text-white/80 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
