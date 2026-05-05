import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const towns = [
  { name: "Albany", slug: "albany", x: 42, y: 58, size: "lg" },
  { name: "Troy", slug: "troy", x: 52, y: 42, size: "lg" },
  { name: "Schenectady", slug: "schenectady", x: 26, y: 50, size: "lg" },
  { name: "Saratoga Springs", slug: "saratoga-springs", x: 46, y: 18, size: "lg" },
  { name: "Clifton Park", slug: "clifton-park", x: 48, y: 32, size: "md" },
  { name: "Delmar", slug: "delmar", x: 40, y: 68, size: "md" },
  { name: "Guilderland", slug: "guilderland", x: 28, y: 62, size: "md" },
  { name: "East Greenbush", slug: "east-greenbush", x: 56, y: 56, size: "sm" },
  { name: "Queensbury", slug: "queensbury", x: 54, y: 10, size: "md" },
  { name: "Niskayuna", slug: "niskayuna", x: 34, y: 44, size: "sm" },
  { name: "Colonie", slug: "colonie", x: 38, y: 46, size: "sm" },
  { name: "Mechanicville", slug: "mechanicville", x: 52, y: 26, size: "sm" },
  { name: "Amsterdam", slug: "amsterdam", x: 10, y: 42, size: "sm" },
  { name: "Voorheesville", slug: "voorheesville", x: 26, y: 72, size: "sm" },
  { name: "Catskill", slug: "catskill", x: 48, y: 82, size: "sm" },
];

const dotSize = { lg: 14, md: 10, sm: 7 };
const glowSize = { lg: 44, md: 32, sm: 24 };

const BrandHero = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-center">
          
          {/* Left: Brand statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 lg:space-y-10"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Know the numbers before you buy.
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-foreground tracking-[-0.035em] leading-[1.02]">
              Capital District<br />Nest
            </h1>

            <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-lg font-light">
              A smarter way to explore real estate in New York's Capital District — with local intelligence for buyers, sellers, and investors.
            </p>

            <p className="text-sm text-foreground/45 max-w-md leading-relaxed">
              Not scraped estimates. Not generic national feeds.<br />
              Real local context, market insight, and property analysis built for this region.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Link
                to="/communities"
                className="inline-flex items-center justify-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-base hover:bg-foreground/85 transition-colors"
              >
                Explore the Capital District
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/analyze"
                className="inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground px-2 py-4 font-medium text-base transition-colors"
              >
                Analyze a Property →
              </Link>
            </div>
          </motion.div>

          {/* Right: Interactive map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-[620px] mx-auto">
              {/* Topographic contour rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="40" cy="50" rx="42" ry="40" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.35" opacity="0.28" />
                <ellipse cx="40" cy="50" rx="32" ry="30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.3" opacity="0.22" />
                <ellipse cx="40" cy="50" rx="22" ry="20" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.25" opacity="0.18" />
                {/* River line (Hudson) */}
                <path d="M 50 5 Q 52 20, 49 35 Q 46 50, 49 65 Q 52 80, 50 95" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.6" opacity="0.55" />
                {/* Mohawk */}
                <path d="M 5 45 Q 18 42, 32 46 Q 40 48, 49 45" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.45" />
              </svg>

              {/* Connection lines between major towns */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {[
                  [42, 58, 52, 42],   // Albany-Troy
                  [42, 58, 26, 50],   // Albany-Schenectady
                  [42, 58, 48, 32],   // Albany-Clifton Park
                  [48, 32, 46, 18],   // Clifton Park-Saratoga
                  [52, 42, 48, 32],   // Troy-Clifton Park
                  [42, 58, 40, 68],   // Albany-Delmar
                  [26, 50, 28, 62],   // Schenectady-Guilderland
                ].map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="hsl(var(--foreground))" strokeWidth="0.25" opacity="0.5"
                    strokeDasharray="1 1" />
                ))}
              </svg>

              {/* Town markers */}
              {towns.map((town) => {
                const isHovered = hovered === town.slug;
                const r = dotSize[town.size as keyof typeof dotSize];
                const glow = glowSize[town.size as keyof typeof glowSize];

                return (
                  <div
                    key={town.slug}
                    className="absolute cursor-pointer group"
                    style={{
                      left: `${town.x}%`,
                      top: `${town.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isHovered ? 20 : 10,
                    }}
                    onMouseEnter={() => setHovered(town.slug)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => navigate(`/towns/${town.slug}`)}
                  >
                    {/* Ambient glow */}
                    <div
                      className="absolute rounded-full transition-all duration-700"
                      style={{
                        width: glow,
                        height: glow,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: isHovered
                          ? 'radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 70%)'
                          : 'radial-gradient(circle, hsl(var(--accent) / 0.08), transparent 70%)',
                      }}
                    />

                    {/* Dot */}
                    <div
                      className="relative rounded-full transition-all duration-500"
                      style={{
                        width: r,
                        height: r,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: isHovered
                          ? 'hsl(var(--accent))'
                          : 'hsl(var(--foreground))',
                        opacity: isHovered ? 1 : town.size === 'lg' ? 1 : town.size === 'md' ? 0.85 : 0.7,
                        boxShadow: isHovered ? '0 0 14px hsl(var(--accent) / 0.5)' : '0 1px 3px hsl(var(--foreground) / 0.15)',
                      }}
                    />

                    {/* Label */}
                    <div
                      className="absolute whitespace-nowrap transition-all duration-500 pointer-events-none"
                      style={{
                        left: '50%',
                        top: `${r / 2 + 10}px`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <span
                        className="transition-all duration-500"
                        style={{
                          fontSize: isHovered ? 15 : town.size === 'lg' ? 13 : 11,
                          fontWeight: isHovered ? 600 : town.size === 'lg' ? 600 : 500,
                        color: 'hsl(var(--foreground))',
                        opacity: isHovered ? 1 : town.size === 'lg' ? 1 : town.size === 'md' ? 0.9 : 0.75,
                        letterSpacing: isHovered ? '-0.01em' : '0',
                        }}
                      >
                        {town.name}
                      </span>

                      {/* Tooltip on hover */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] text-accent font-medium mt-1 text-center"
                        >
                          View Insights →
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Ambient pulse on Albany */}
              <div
                className="absolute rounded-full animate-pulse"
                style={{
                  left: '42%',
                  top: '58%',
                  width: 48,
                  height: 48,
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, hsl(var(--accent) / 0.06), transparent 70%)',
                  animationDuration: '4s',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-center text-sm text-muted-foreground tracking-wide">
            Town-by-town local insight&ensp;·&ensp;Property intelligence for buyers, sellers & investors&ensp;·&ensp;Built for the Capital District
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandHero;
