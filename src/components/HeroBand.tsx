import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * HeroBand — full-width, Apple-style product hero band.
 * Modeled on the "Buying a 2-4 Unit in Albany Is Different" section.
 * Each instance is a different color "mood" so adjacent sections feel distinct.
 *
 * Layout: 2-column. Left = oversized headline + sub + single CTA.
 * Right = 3 vertical-rule callouts.
 */

export type HeroMood =
  | "graphite"      // near-black + electric teal (Analyzer)
  | "dark-gold"     // deep charcoal/navy + gold (Investment / Multifamily)
  | "forest"        // deep forest green + gold/teal (Delmar / Town pages)
  | "cream"         // warm beige + teal (Towns)
  | "clay"          // muted clay/taupe + cream (Rentals)
  | "sky"           // soft blue-gray + teal (Buyers / Search)
  | "ivory"         // soft ivory + muted green (Local Businesses)
  | "white"         // pure white + teal (breathing room / break)
  | "slate";        // dark slate + gold (Weekly Updates)

interface Callout {
  title: string;
  body?: string;
}

interface HeroBandProps {
  eyebrow?: string;
  headline: ReactNode;
  sub?: string;
  ctaLabel: string;
  ctaHref: string;
  ctaExternal?: boolean;
  callouts?: Callout[];
  mood: HeroMood;
  children?: ReactNode; // optional content rendered below the band (e.g. tile grid, IDX embed)
}

const MOODS: Record<
  HeroMood,
  {
    bg: string;          // tailwind classes or inline style
    text: string;
    sub: string;
    eyebrow: string;
    rule: string;        // vertical accent line color
    accent: string;      // accent text (callout titles)
    btnBg: string;
    btnText: string;
    btnHover: string;
  }
> = {
  graphite: {
    bg: "bg-[#0e0f12]",
    text: "text-white",
    sub: "text-white/65",
    eyebrow: "text-[#5eead4]",
    rule: "bg-[#5eead4]",
    accent: "text-[#5eead4]",
    btnBg: "bg-[#5eead4]",
    btnText: "text-[#0e0f12]",
    btnHover: "hover:bg-[#7df0dd]",
  },
  "dark-gold": {
    bg: "bg-[#16181d]",
    text: "text-white",
    sub: "text-white/70",
    eyebrow: "text-[#e9b949]",
    rule: "bg-[#e9b949]",
    accent: "text-[#e9b949]",
    btnBg: "bg-[#e9b949]",
    btnText: "text-[#16181d]",
    btnHover: "hover:bg-[#f0c768]",
  },
  forest: {
    bg: "bg-[#0f2a23]",
    text: "text-white",
    sub: "text-white/70",
    eyebrow: "text-[#e9c97a]",
    rule: "bg-[#e9c97a]",
    accent: "text-[#e9c97a]",
    btnBg: "bg-[#e9c97a]",
    btnText: "text-[#0f2a23]",
    btnHover: "hover:bg-[#f1d693]",
  },
  cream: {
    bg: "bg-[#f5efe4]",
    text: "text-[#1d1d1f]",
    sub: "text-[#1d1d1f]/65",
    eyebrow: "text-[#0d6e66]",
    rule: "bg-[#0d6e66]",
    accent: "text-[#0d6e66]",
    btnBg: "bg-[#0d6e66]",
    btnText: "text-white",
    btnHover: "hover:bg-[#0a5d57]",
  },
  clay: {
    bg: "bg-[#9b6f5c]",
    text: "text-white",
    sub: "text-white/80",
    eyebrow: "text-[#fdf3e4]",
    rule: "bg-[#fdf3e4]",
    accent: "text-[#fdf3e4]",
    btnBg: "bg-[#fdf3e4]",
    btnText: "text-[#5c3e30]",
    btnHover: "hover:bg-white",
  },
  sky: {
    bg: "bg-[#e8eef4]",
    text: "text-[#0f1f33]",
    sub: "text-[#0f1f33]/65",
    eyebrow: "text-[#0d6e66]",
    rule: "bg-[#0d6e66]",
    accent: "text-[#0d6e66]",
    btnBg: "bg-[#0f1f33]",
    btnText: "text-white",
    btnHover: "hover:bg-[#1a3654]",
  },
  ivory: {
    bg: "bg-[#faf6ee]",
    text: "text-[#1d1d1f]",
    sub: "text-[#1d1d1f]/65",
    eyebrow: "text-[#5d7a4f]",
    rule: "bg-[#5d7a4f]",
    accent: "text-[#5d7a4f]",
    btnBg: "bg-[#5d7a4f]",
    btnText: "text-white",
    btnHover: "hover:bg-[#4a6440]",
  },
  white: {
    bg: "bg-white",
    text: "text-[#1d1d1f]",
    sub: "text-[#1d1d1f]/65",
    eyebrow: "text-[#0d6e66]",
    rule: "bg-[#0d6e66]",
    accent: "text-[#0d6e66]",
    btnBg: "bg-[#0d6e66]",
    btnText: "text-white",
    btnHover: "hover:bg-[#0a5d57]",
  },
  slate: {
    bg: "bg-[#1a2530]",
    text: "text-white",
    sub: "text-white/70",
    eyebrow: "text-[#e9b949]",
    rule: "bg-[#e9b949]",
    accent: "text-[#e9b949]",
    btnBg: "bg-[#e9b949]",
    btnText: "text-[#1a2530]",
    btnHover: "hover:bg-[#f0c768]",
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const HeroBand = ({
  eyebrow,
  headline,
  sub,
  ctaLabel,
  ctaHref,
  ctaExternal,
  callouts = [],
  mood,
  children,
}: HeroBandProps) => {
  const m = MOODS[mood];
  const isExternal = ctaExternal || /^https?:\/\//.test(ctaHref);

  // Pick the locked button class based on mood (light vs dark surface)
  const isDark = ["graphite", "dark-gold", "forest", "clay", "slate"].includes(mood);
  const ctaClass = isDark ? "btn-dark-cta" : "btn-primary-apple";

  const Cta = isExternal ? (
    <a href={ctaHref} target="_blank" rel="noreferrer" className={`${ctaClass} cta-arrow`}>
      {ctaLabel} <ArrowRight className="w-4 h-4" />
    </a>
  ) : (
    <Link to={ctaHref} className={`${ctaClass} cta-arrow`}>
      {ctaLabel} <ArrowRight className="w-4 h-4" />
    </Link>
  );

  return (
    <section className={`${m.bg} ${m.text} w-full`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 section-apple">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT — narrative */}
          <motion.div {...fadeUp} className="lg:col-span-7">
            {eyebrow && (
              <p className={`eyebrow-apple mb-6 ${m.eyebrow}`}>
                {eyebrow}
              </p>
            )}
            <h2 className="h-hero">
              {headline}
            </h2>
            {sub && (
              <p className={`mt-8 max-w-xl ${isDark ? "body-apple-dark" : "body-apple"}`}>
                {sub}
              </p>
            )}
            <div className="cta-anchor">{Cta}</div>
          </motion.div>

          {/* RIGHT — 3 vertical-rule callouts */}
          {callouts.length > 0 && (
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="lg:col-span-5 space-y-8 lg:pt-4"
            >
              {callouts.slice(0, 3).map((c) => (
                <div key={c.title} className="flex gap-5">
                  <div className={`w-px shrink-0 ${m.rule} opacity-80`} />
                  <div>
                    <h3 className={`text-lg md:text-xl font-semibold tracking-tight ${m.accent}`}>
                      {c.title}
                    </h3>
                    {c.body && (
                      <p className={`mt-2 text-sm md:text-base leading-relaxed ${m.sub}`}>
                        {c.body}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {children && <div className="mt-16 md:mt-24">{children}</div>}
      </div>
    </section>
  );
};

export default HeroBand;
