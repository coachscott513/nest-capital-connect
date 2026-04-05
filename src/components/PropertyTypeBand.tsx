import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const tiles = [
  {
    name: 'Land',
    slug: '/land-buyers',
    description: 'Build, invest, or explore development potential.',
    accent: 'hsl(var(--accent) / 0.08)',
    accentHover: 'hsl(var(--accent) / 0.14)',
    featured: false,
    motif: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <path d="M0 220 Q100 180 200 200 Q300 220 400 190" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 240 Q80 210 180 225 Q280 240 400 215" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M0 260 Q120 235 220 250 Q320 265 400 240" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M0 200 Q60 175 160 185 Q260 195 400 170" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <path d="M0 280 Q140 260 240 270 Q340 280 400 260" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    name: 'Single Family',
    slug: '/single-family-market',
    description: 'Find homes for everyday living, long-term value, and neighborhood fit.',
    accent: 'hsl(var(--foreground) / 0.04)',
    accentHover: 'hsl(var(--foreground) / 0.07)',
    featured: false,
    motif: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <path d="M160 200 L200 160 L240 200" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x="165" y="200" width="70" height="50" fill="none" stroke="currentColor" strokeWidth="1" rx="1" />
        <rect x="185" y="220" width="18" height="30" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="210" y="208" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <line x1="140" y1="250" x2="260" y2="250" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    name: 'Multi-Unit',
    slug: '/albany-multi-unit',
    description: 'Analyze income potential, house hacks, and investment performance.',
    accent: 'hsl(var(--accent) / 0.10)',
    accentHover: 'hsl(var(--accent) / 0.18)',
    featured: true,
    motif: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <rect x="155" y="170" width="90" height="80" fill="none" stroke="currentColor" strokeWidth="1.5" rx="2" />
        <rect x="160" y="180" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="185" y="180" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="210" y="180" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="160" y="202" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="185" y="202" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="210" y="202" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="160" y="224" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="185" y="224" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <rect x="210" y="224" width="18" height="14" fill="none" stroke="currentColor" strokeWidth="0.8" rx="1" />
        <line x1="135" y1="250" x2="265" y2="250" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    name: 'Rentals',
    slug: '/rentals',
    description: 'Explore rental opportunities across the Capital District.',
    accent: 'hsl(var(--foreground) / 0.04)',
    accentHover: 'hsl(var(--foreground) / 0.07)',
    featured: false,
    motif: (
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <rect x="165" y="175" width="30" height="75" fill="none" stroke="currentColor" strokeWidth="1" rx="2" />
        <rect x="200" y="190" width="35" height="60" fill="none" stroke="currentColor" strokeWidth="1.2" rx="2" />
        <rect x="170" y="185" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <rect x="170" y="200" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <rect x="170" y="215" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <rect x="207" y="200" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <rect x="220" y="200" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <rect x="207" y="215" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <rect x="220" y="215" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="0.6" rx="1" />
        <line x1="150" y1="250" x2="250" y2="250" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    ),
  },
];

const PropertyTypeBand = () => {
  return (
    <section className="py-28 md:py-36 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">
            Property Types
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.08] mb-8">
            Explore the Capital District<br className="hidden md:block" /> by property type
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            From land and single-family homes to multi-unit investments and rentals, start where your search begins.
          </p>
        </div>

        {/* Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiles.map((tile) => (
            <Link
              key={tile.slug}
              to={tile.slug}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
                ${tile.featured
                  ? 'ring-1 ring-accent/20 shadow-lg shadow-accent/5 hover:shadow-xl hover:shadow-accent/10'
                  : 'hover:shadow-lg hover:shadow-foreground/5'
                }
              `}
              style={{
                background: tile.accent,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = tile.accentHover;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = tile.accent;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Abstract motif */}
              <div className="text-foreground">{tile.motif}</div>

              {/* Content */}
              <div className="relative z-10 p-8 pt-32 md:pt-40 flex flex-col justify-end min-h-[280px] md:min-h-[340px]">
                {tile.featured && (
                  <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-accent/10 text-accent mb-4">
                    Top Strategy
                  </span>
                )}
                <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                  {tile.name}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  {tile.description}
                </p>
                <div className="flex items-center text-muted-foreground group-hover:text-accent transition-colors duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeBand;
