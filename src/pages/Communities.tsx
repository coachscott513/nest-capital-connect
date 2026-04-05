import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import RealEstateSchema from '@/components/RealEstateSchema';
import { 
  MapPin, TrendingUp, Building2, 
  BarChart3, Shield, CheckCircle2, ChevronRight, 
  Landmark, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const countyData = [
  {
    name: "Albany County",
    slug: "albany",
    landmark: "Empire State Plaza",
    avgYield: "7.2%",
    velocity: "Hot",
    towns: [
      { name: "Delmar", slug: "delmar", verified: true },
      { name: "Guilderland", slug: "guilderland", verified: true },
      { name: "Colonie", slug: "colonie", verified: false },
      { name: "Bethlehem", slug: "bethlehem", verified: false },
      { name: "Voorheesville", slug: "voorheesville", verified: true },
      { name: "Loudonville", slug: "loudonville", verified: false },
      { name: "Altamont", slug: "altamont", verified: false },
    ],
    isPrimary: true,
    category: "core"
  },
  {
    name: "Saratoga County",
    slug: "saratoga",
    landmark: "Saratoga Race Course",
    avgYield: "5.8%",
    velocity: "Premium",
    towns: [
      { name: "Saratoga Springs", slug: "saratoga-springs", verified: true },
      { name: "Clifton Park", slug: "clifton-park", verified: true },
      { name: "Ballston Spa", slug: "ballston-spa", verified: false },
      { name: "Malta", slug: "malta", verified: false },
      { name: "Halfmoon", slug: "halfmoon", verified: false },
      { name: "Mechanicville", slug: "mechanicville", verified: true },
    ],
    isPrimary: true,
    category: "core"
  },
  {
    name: "Schenectady County",
    slug: "schenectady",
    landmark: "Proctors Theatre",
    avgYield: "8.4%",
    velocity: "Value",
    towns: [
      { name: "Schenectady", slug: "schenectady", verified: true },
      { name: "Niskayuna", slug: "niskayuna", verified: true },
      { name: "Rotterdam", slug: "rotterdam", verified: false },
      { name: "Scotia", slug: "scotia", verified: false },
      { name: "Glenville", slug: "glenville", verified: false },
    ],
    isPrimary: true,
    category: "core"
  },
  {
    name: "Rensselaer County",
    slug: "rensselaer",
    landmark: "RPI Campus",
    avgYield: "9.1%",
    velocity: "Hot",
    towns: [
      { name: "Troy", slug: "troy", verified: true },
      { name: "East Greenbush", slug: "east-greenbush", verified: false },
      { name: "Brunswick", slug: "brunswick", verified: false },
      { name: "Schodack", slug: "schodack", verified: false },
    ],
    isPrimary: true,
    category: "core"
  },
  {
    name: "Warren County",
    slug: "warren",
    landmark: "Lake George",
    avgYield: "6.5%",
    velocity: "Scenic",
    towns: [
      { name: "Queensbury", slug: "queensbury", verified: true },
      { name: "Glens Falls", slug: "glens-falls", verified: false },
      { name: "Lake George", slug: "lake-george", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
  {
    name: "Washington County",
    slug: "washington",
    landmark: "Greenwich Farmland",
    avgYield: "7.8%",
    velocity: "Rural",
    towns: [
      { name: "Greenwich", slug: "greenwich", verified: false },
      { name: "Cambridge", slug: "cambridge", verified: false },
      { name: "Fort Edward", slug: "fort-edward", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
  {
    name: "Montgomery County",
    slug: "montgomery",
    landmark: "Erie Canal Heritage",
    avgYield: "10.2%",
    velocity: "Value",
    towns: [
      { name: "Amsterdam", slug: "amsterdam", verified: true },
      { name: "Canajoharie", slug: "canajoharie", verified: false },
      { name: "Fort Plain", slug: "fort-plain", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
  {
    name: "Fulton County",
    slug: "fulton",
    landmark: "Adirondack Gateway",
    avgYield: "9.5%",
    velocity: "Value",
    towns: [
      { name: "Gloversville", slug: "gloversville", verified: false },
      { name: "Johnstown", slug: "johnstown", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
  {
    name: "Columbia County",
    slug: "columbia",
    landmark: "Hudson Arts District",
    avgYield: "5.2%",
    velocity: "Scenic",
    towns: [
      { name: "Hudson", slug: "hudson", verified: false },
      { name: "Chatham", slug: "chatham", verified: false },
      { name: "Kinderhook", slug: "kinderhook", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
  {
    name: "Schoharie County",
    slug: "schoharie",
    landmark: "Historic Valley",
    avgYield: "8.1%",
    velocity: "Rural",
    towns: [
      { name: "Cobleskill", slug: "cobleskill", verified: false },
      { name: "Sharon Springs", slug: "sharon-springs", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
  {
    name: "Greene County",
    slug: "greene",
    landmark: "Catskill Mountains",
    avgYield: "6.8%",
    velocity: "Mountain",
    towns: [
      { name: "Catskill", slug: "catskill", verified: false },
      { name: "Windham", slug: "windham", verified: false },
      { name: "Hunter", slug: "hunter", verified: false },
    ],
    isPrimary: false,
    category: "expansion"
  },
];

const velocityColors: Record<string, string> = {
  "Hot": "bg-red-50 text-red-600 border-red-200",
  "Premium": "bg-amber-50 text-amber-700 border-amber-200",
  "Value": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Scenic": "bg-sky-50 text-sky-700 border-sky-200",
  "Rural": "bg-orange-50 text-orange-700 border-orange-200",
  "Mountain": "bg-teal-50 text-teal-700 border-teal-200",
  "Heritage": "bg-indigo-50 text-indigo-700 border-indigo-200",
};

const Communities = () => {
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  const primaryCounties = countyData.filter(c => c.isPrimary);
  const expansionCounties = countyData.filter(c => !c.isPrimary);
  
  const totalTowns = countyData.reduce((acc, c) => acc + c.towns.length, 0);
  const verifiedTowns = countyData.reduce((acc, c) => acc + c.towns.filter(t => t.verified).length, 0);

  return (
    <>
      <SEOHead 
        title="Regional Command Center | 11-County Capital District Intelligence | Capital District Nest"
        description="Access institutional-grade real estate intelligence across 11 counties and 52+ towns in New York's Capital District. County-by-county market analysis, yield data, and investment opportunities."
        keywords="Capital District real estate, Albany County homes, Saratoga real estate, multi-county investment, NY property market, regional real estate intelligence"
        canonical="https://capitaldistrictnest.com/communities"
      />
      <RealEstateSchema type="agent" />
      
      <MainLayout>
        <div className="bg-background min-h-screen">
          
          {/* Hero */}
          <section className="relative py-24 md:py-32 px-6 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative max-w-5xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6">
                  Regional Command Center
                </p>
                
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight leading-[1.05]">
                  11-County Intelligence<br className="hidden md:block" /> Network
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                  Institutional-grade market intelligence across New York's Capital District. 
                  From the Catskills to the Adirondacks.
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-10">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">11</div>
                    <div className="text-sm text-muted-foreground mt-1">Counties</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">{totalTowns}+</div>
                    <div className="text-sm text-muted-foreground mt-1">Towns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{verifiedTowns}</div>
                    <div className="text-sm text-muted-foreground mt-1">Verified Anchors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">7.8%</div>
                    <div className="text-sm text-muted-foreground mt-1">Avg. Yield</div>
                  </div>
                </div>
                
                {/* Filter */}
                <button
                  onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    showVerifiedOnly 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-secondary text-muted-foreground border border-border hover:bg-muted'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {showVerifiedOnly ? 'Showing Verified Only' : 'Show Verified Anchors Only'}
                </button>
              </motion.div>
            </div>
          </section>
          
          {/* Primary Market Hubs */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-2xl font-bold text-foreground">Primary Market Hubs</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {primaryCounties.map((county, index) => {
                  const towns = showVerifiedOnly ? county.towns.filter(t => t.verified) : county.towns;
                  if (showVerifiedOnly && towns.length === 0) return null;
                  
                  return (
                    <motion.div
                      key={county.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      {/* County header */}
                      <div className="mb-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{county.name}</h3>
                            <p className="text-sm text-muted-foreground">{county.landmark}</p>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${velocityColors[county.velocity]}`}>
                            {county.velocity}
                          </span>
                        </div>
                        
                        {/* Stats row */}
                        <div className="flex items-center gap-5 py-3 border-b border-border">
                          <div>
                            <div className="text-lg font-bold text-green-600">{county.avgYield}</div>
                            <div className="text-xs text-muted-foreground">Avg. Yield</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-foreground">{county.towns.length}</div>
                            <div className="text-xs text-muted-foreground">Towns</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-accent">{county.towns.filter(t => t.verified).length}</div>
                            <div className="text-xs text-muted-foreground">Verified</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Town links */}
                      <div className="space-y-1">
                        {towns.slice(0, 5).map(town => (
                          <Link
                            key={town.slug}
                            to={`/towns/${town.slug}`}
                            className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-secondary transition-colors group/town"
                          >
                            <span className="text-sm text-foreground/80 group-hover/town:text-foreground transition-colors">
                              {town.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {town.verified && (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              )}
                              <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover/town:text-accent transition-colors" />
                            </div>
                          </Link>
                        ))}
                        {towns.length > 5 && (
                          <p className="text-xs text-muted-foreground text-center pt-2">
                            +{towns.length - 5} more towns
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
          
          {/* Expansion Counties */}
          <section className="py-16 px-6 bg-secondary/50">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-2xl font-bold text-foreground">Expansion Territory</h2>
                <span className="px-3 py-1 bg-secondary text-muted-foreground rounded-full text-sm font-medium border border-border">
                  7 Counties
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {expansionCounties.map((county, index) => {
                  const towns = showVerifiedOnly ? county.towns.filter(t => t.verified) : county.towns;
                  if (showVerifiedOnly && towns.length === 0) return null;
                  
                  return (
                    <motion.div
                      key={county.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{county.name}</h3>
                          <p className="text-xs text-muted-foreground">{county.landmark}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${velocityColors[county.velocity]}`}>
                          {county.velocity}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4 py-2 border-b border-border">
                        <div>
                          <div className="text-sm font-bold text-green-600">{county.avgYield}</div>
                          <div className="text-xs text-muted-foreground">Yield</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">{county.towns.length}</div>
                          <div className="text-xs text-muted-foreground">Towns</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {towns.map(town => (
                          <Link
                            key={town.slug}
                            to={`/towns/${town.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-background hover:bg-muted rounded-lg text-xs text-foreground/70 hover:text-foreground transition-colors border border-border/50"
                          >
                            {town.name}
                            {town.verified && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-24 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Premium Intelligence
                </p>
                
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
                  Underwrite Any Property
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                  Access institutional-grade analysis on any address in our 11-county network. 
                  Rent comps, cap rates, and neighborhood intelligence.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/deal-desk"
                    className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold transition-all hover:opacity-90"
                  >
                    <Shield className="w-5 h-5" />
                    Request Premium Underwrite
                  </Link>
                  <Link
                    to="/investment-properties"
                    className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground px-6 py-4 font-medium transition-colors"
                  >
                    View Active Opportunities
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Region Links */}
          <section className="py-16 px-6 border-t border-border">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Core Markets</h4>
                  <ul className="space-y-2.5">
                    <li><Link to="/albany-homes-for-sale" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Albany</Link></li>
                    <li><Link to="/saratoga-homes-for-sale" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Saratoga</Link></li>
                    <li><Link to="/troy-homes-for-sale" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Troy</Link></li>
                    <li><Link to="/schenectady-homes-for-sale" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Schenectady</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Adirondack</h4>
                  <ul className="space-y-2.5">
                    <li><Link to="/towns/queensbury" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Queensbury</Link></li>
                    <li><Link to="/towns/glens-falls" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Glens Falls</Link></li>
                    <li><Link to="/towns/lake-george" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Lake George</Link></li>
                    <li><Link to="/towns/greenwich" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Greenwich</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Catskill Region</h4>
                  <ul className="space-y-2.5">
                    <li><Link to="/towns/catskill" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Catskill</Link></li>
                    <li><Link to="/towns/windham" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Windham</Link></li>
                    <li><Link to="/towns/cobleskill" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Cobleskill</Link></li>
                    <li><Link to="/towns/sharon-springs" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Sharon Springs</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Mohawk Valley</h4>
                  <ul className="space-y-2.5">
                    <li><Link to="/amsterdam-homes-for-sale" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Amsterdam</Link></li>
                    <li><Link to="/towns/gloversville" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Gloversville</Link></li>
                    <li><Link to="/towns/johnstown" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Johnstown</Link></li>
                    <li><Link to="/towns/hudson" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Hudson</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </MainLayout>
    </>
  );
};

export default Communities;
