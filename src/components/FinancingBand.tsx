import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const floatingCards = [
  { label: 'Low Down Payment', x: '8%', y: '18%', rotate: '-3deg', delay: '0s' },
  { label: 'First-Time Buyer', x: '72%', y: '12%', rotate: '2deg', delay: '0.5s' },
  { label: 'Multi-Unit Financing', x: '4%', y: '62%', rotate: '-1.5deg', delay: '1s' },
  { label: 'Investment Property', x: '76%', y: '58%', rotate: '1.5deg', delay: '1.5s' },
  { label: 'Affordability', x: '18%', y: '82%', rotate: '-2deg', delay: '0.3s' },
  { label: 'Pre-Approval Strategy', x: '62%', y: '80%', rotate: '2.5deg', delay: '0.8s' },
];

const FinancingBand = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-background overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, hsl(var(--accent) / 0.04), transparent)',
        }}
      />

      {/* Floating financing cards — decorative */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingCards.map((card) => (
          <div
            key={card.label}
            className="absolute animate-fade-in"
            style={{
              left: card.x,
              top: card.y,
              transform: `rotate(${card.rotate})`,
              animationDelay: card.delay,
              animationFillMode: 'both',
            }}
          >
            <div className="px-5 py-3 rounded-2xl bg-secondary/60 border border-border/40 shadow-sm">
              <span className="text-xs font-medium text-muted-foreground tracking-wide whitespace-nowrap">
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">
          Financing Intelligence
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.08] mb-8">
          A clearer way to think<br className="hidden md:block" /> about financing
        </h2>
        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-xl mx-auto mb-5">
          From first-time buyers to investment property shoppers, understand your options before you make a move.
        </p>
        <p className="text-base text-muted-foreground/80 font-light leading-relaxed max-w-lg mx-auto mb-12">
          Explore down payment paths, pre-approval strategy, affordability, and financing options designed to help you move forward with confidence in the Capital District.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/financing"
            className="inline-flex items-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
          >
            Explore Financing Options <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+15186762347"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
          >
            <Phone className="w-4 h-4" /> Talk Through Your Options
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinancingBand;
