import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Shared homepage chapter wrapper with a horizontal snap rail,
 * mobile next-card peek, and desktop arrow controls.
 */
const ChapterRail = ({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  action,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "elevated";
  action?: ReactNode;
  children: ReactNode;
}) => {
  const scroller = useRef<HTMLDivElement | null>(null);
  const light = false;

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  const arrowClass = light
    ? "w-11 h-11 rounded-full border border-[#DFDCD4] bg-white text-[#14181F]/70 hover:text-[#14181F] hover:bg-[#F3F4F2] inline-flex items-center justify-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D6E66]/60"
    : "w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.1] inline-flex items-center justify-center transition";

  return (
    <section
      id={id}
      className={`relative w-full scroll-mt-24 border-t ${
        light
          ? "bg-[#FBFAF7] border-[#DFDCD4]"
          : tone === "elevated"
            ? "bg-[#0E1220] border-white/[0.06]"
            : "bg-[#0B0F19] border-white/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p
              className={`text-[11px] font-semibold tracking-[0.3em] uppercase ${
                light ? "text-[#0D6E66]" : "text-[#5eead4]"
              }`}
            >
              {eyebrow}
            </p>
            <h2
              className={`mt-4 text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.05] text-balance ${
                light ? "text-[#14181F]" : "text-white"
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`mt-4 text-[15px] md:text-lg font-light leading-relaxed ${
                  light ? "text-[#64748B]" : "text-white/65"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {action}
            <button
              type="button"
              aria-label={`Scroll ${title} left`}
              onClick={() => nudge(-1)}
              className={arrowClass}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label={`Scroll ${title} right`}
              onClick={() => nudge(1)}
              className={arrowClass}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>


        <div
          ref={scroller}
          className="mt-10 md:mt-14 -mx-5 sm:-mx-6 md:-mx-10 px-5 sm:px-6 md:px-10 flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
          <div className="shrink-0 w-1" aria-hidden />
        </div>
      </div>
    </section>
  );
};

export default ChapterRail;
