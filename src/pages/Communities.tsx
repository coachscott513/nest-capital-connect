import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import RealEstateSchema from '@/components/RealEstateSchema';
import { 
  MapPin, TrendingUp, Building2, Mountain, Castle, 
  BarChart3, Shield, CheckCircle2, ChevronRight, 
  Landmark, Users, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

// County data with towns and stats
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
    name: "Rensselaer County",
    slug: "rensselaer",
    landmark: "RPI Campus",
    avgYield: "8.4%",
    velocity: "Value",
    towns: [
      { name: "Troy", slug: "troy", verified: true },
      { name: "East Greenbush", slug: "east-greenbush", verified: false },
      { name: "Brunswick", slug: "brunswick", verified: false },
      { name: "Schodack", slug: "schodack", verified: false },
      { name: "North Greenbush", slug: "north-greenbush", verified: false },
    ],
    isPrimary: true,
    category: "core"
  },
  {
    name: "Schenectady County",
    slug: "schenectady",
    landmark: "Proctors Theatre",
    avgYield: "9.1%",
    velocity: "Opportunity",
    towns: [
      { name: "Schenectady", slug: "schenectady", verified: true },
      { name: "Niskayuna", slug: "niskayuna", verified: true },
      { name: "Rotterdam", slug: "rotterdam", verified: false },
      { name: "Glenville", slug: "glenville", verified: false },
      { name: "Scotia", slug: "scotia", verified: false },
    ],
    isPrimary: true,
    category: "core"
  },
  {
    name: "Warren County",
    slug: "warren",
    landmark: "Lake George",
    avgYield: "6.5%",
    velocity: "Resort",
    towns: [
      { name: "Queensbury", slug: "queensbury", verified: true },
      { name: "Glens Falls", slug: "glens-falls", verified: false },
      { name: "Lake George", slug: "lake-george", verified: false },
      { name: "Bolton Landing", slug: "bolton-landing", verified: false },
    ],
    isPrimary: false,
    category: "adirondack"
  },
  {
    name: "Washington County",
    slug: "washington",
    landmark: "Hudson Valley Farmland",
    avgYield: "7.8%",
    velocity: "Rural",
    towns: [
      { name: "Greenwich", slug: "greenwich", verified: false },
      { name: "Cambridge", slug: "cambridge", verified: false },
      { name: "Fort Edward", slug: "fort-edward", verified: false },
      { name: "Salem", slug: "salem", verified: false },
    ],
    isPrimary: false,
    category: "adirondack"
  },
  {
    name: "Columbia County",
    slug: "columbia",
    landmark: "Hudson River Valley",
    avgYield: "5.2%",
    velocity: "Luxury",
    towns: [
      { name: "Hudson", slug: "hudson", verified: false },
      { name: "Chatham", slug: "chatham", verified: false },
      { name: "Kinderhook", slug: "kinderhook", verified: false },
      { name: "Claverack", slug: "claverack", verified: false },
    ],
    isPrimary: false,
    category: "hudson"
  },
  {
    name: "Montgomery County",
    slug: "montgomery",
    landmark: "Mohawk Valley Heritage",
    avgYield: "10.2%",
    velocity: "Deep Value",
    towns: [
      { name: "Amsterdam", slug: "amsterdam", verified: true },
      { name: "Canajoharie", slug: "canajoharie", verified: false },
      { name: "Fonda", slug: "fonda", verified: false },
      { name: "Fort Plain", slug: "fort-plain", verified: false },
    ],
    isPrimary: false,
    category: "mohawk"
  },
  {
    name: "Fulton County",
    slug: "fulton",
    landmark: "Great Sacandaga Lake",
    avgYield: "9.5%",
    velocity: "Lakefront",
    towns: [
      { name: "Gloversville", slug: "gloversville", verified: false },
      { name: "Johnstown", slug: "johnstown", verified: false },
      { name: "Mayfield", slug: "mayfield", verified: false },
      { name: "Northville", slug: "northville", verified: false },
    ],
    isPrimary: false,
    category: "mohawk"
  },
  {
    name: "Greene County",
    slug: "greene",
    landmark: "Catskill Mountains",
    avgYield: "6.8%",
    velocity: "Mountain",
    towns: [
      { name: "Catskill", slug: "catskill", verified: false },
      { name: "Coxsackie", slug: "coxsackie", verified: false },
      { name: "Windham", slug: "windham", verified: false },
      { name: "Hunter", slug: "hunter", verified: false },
      { name: "Athens", slug: "athens", verified: false },
    ],
    isPrimary: false,
    category: "catskill"
  },
  {
    name: "Schoharie County",
    slug: "schoharie",
    landmark: "Howe Caverns",
    avgYield: "8.9%",
    velocity: "Heritage",
    towns: [
      { name: "Schoharie", slug: "schoharie", verified: false },
      { name: "Cobleskill", slug: "cobleskill", verified: false },
      { name: "Middleburgh", slug: "middleburgh", verified: false },
      { name: "Sharon Springs", slug: "sharon-springs", verified: false },
    ],
    isPrimary: false,
    category: "catskill"
  },
];

const velocityColors: Record<string, string> = {
  "Hot": "bg-red-500/20 text-red-400 border-red-500/30",
  "Premium": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Value": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Opportunity": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Resort": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Rural": "bg-green-500/20 text-green-400 border-green-500/30",
  "Luxury": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Deep Value": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Lakefront": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "Mountain": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Heritage": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
};

const Communities = () => {
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  
  const primaryCounties = countyData.filter(c => c.isPrimary);
  const expansionCounties = countyData.filter(c => !c.isPrimary);
  
  const filteredCounties = showVerifiedOnly 
    ? countyData.filter(c => c.towns.some(t => t.verified))
    : countyData;

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
        {/* Dark Mode Command Center */}
        <div className="bg-slate-950 min-h-screen">
          
          {/* Hero Command Center Header */}
          <section className="relative py-20 px-4 overflow-hidden">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="relative max-w-7xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                  <Landmark className="w-4 h-4 text-primary" />
                  <span className="text-sm text-white/70 font-medium">Regional Command Center</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  11-County Intelligence Network
                </h1>
                
                <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                  Institutional-grade market intelligence across New York's Capital District. 
                  From the Catskills to the Adirondacks.
                </p>
                
                {/* Global Stats Bar */}
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">11</div>
                    <div className="text-sm text-white/50">Counties</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{totalTowns}+</div>
                    <div className="text-sm text-white/50">Towns</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400">{verifiedTowns}</div>
                    <div className="text-sm text-white/50">Verified Anchors</div>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">7.8%</div>
                    <div className="text-sm text-white/50">Avg. Yield</div>
                  </div>
                </div>
                
                {/* Intelligence Toggle */}
                <button
                  onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    showVerifiedOnly 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {showVerifiedOnly ? 'Showing Verified Anchors Only' : 'Show Verified Anchors Only'}
                </button>
              </motion.div>
            </div>
          </section>
          
          {/* Primary Hub Cities - Visual Cards */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Building2 className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">Primary Market Hubs</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {primaryCounties.map((county, index) => (
                  <motion.div
                    key={county.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                  >
                    {/* Darkened landmark overlay area */}
                    <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%)] bg-[size:20px_20px]" />
                      <Castle className="w-12 h-12 text-white/20" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{county.name}</h3>
                          <p className="text-sm text-white/50">{county.landmark}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${velocityColors[county.velocity]}`}>
                          {county.velocity}
                        </span>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 mb-4 py-3 border-y border-white/10">
                        <div>
                          <div className="text-lg font-bold text-emerald-400">{county.avgYield}</div>
                          <div className="text-xs text-white/40">Avg. Yield</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <div className="text-lg font-bold text-white">{county.towns.length}</div>
                          <div className="text-xs text-white/40">Towns</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <div className="text-lg font-bold text-primary">{county.towns.filter(t => t.verified).length}</div>
                          <div className="text-xs text-white/40">Verified</div>
                        </div>
                      </div>
                      
                      {/* Town Links */}
                      <div className="space-y-2">
                        {county.towns.slice(0, 4).map(town => (
                          <Link
                            key={town.slug}
                            to={`/towns/${town.slug}`}
                            className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/town"
                          >
                            <span className="text-sm text-white/80 group-hover/town:text-white transition-colors">
                              {town.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {town.verified && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              )}
                              <ChevronRight className="w-4 h-4 text-white/30 group-hover/town:text-primary transition-colors" />
                            </div>
                          </Link>
                        ))}
                        {county.towns.length > 4 && (
                          <div className="text-xs text-white/40 text-center pt-2">
                            +{county.towns.length - 4} more towns
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Expansion Counties Grid */}
          <section className="py-16 px-4 bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Mountain className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">Expansion Territory</h2>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  7 Counties
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {expansionCounties.map((county, index) => (
                  <motion.div
                    key={county.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{county.name}</h3>
                        <p className="text-xs text-white/40">{county.landmark}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${velocityColors[county.velocity]}`}>
                        {county.velocity}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4 py-2 border-y border-white/10">
                      <div>
                        <div className="text-sm font-bold text-emerald-400">{county.avgYield}</div>
                        <div className="text-xs text-white/40">Yield</div>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div>
                        <div className="text-sm font-bold text-white">{county.towns.length}</div>
                        <div className="text-xs text-white/40">Towns</div>
                      </div>
                    </div>
                    
                    {/* Compact Town List */}
                    <div className="flex flex-wrap gap-1.5">
                      {county.towns.map(town => (
                        <Link
                          key={town.slug}
                          to={`/towns/${town.slug}`}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-white/70 hover:text-white transition-colors"
                        >
                          {town.name}
                          {town.verified && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Intelligence CTA */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="relative bg-gradient-to-br from-primary/20 to-blue-500/10 border border-primary/30 rounded-3xl p-8 md:p-12 text-center overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <span className="text-sm text-white/70 font-medium">Premium Intelligence</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Underwrite Any Property
                  </h2>
                  <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                    Access institutional-grade analysis on any address in our 11-county network. 
                    Rent comps, cap rates, and neighborhood intelligence.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      to="/deal-desk"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                    >
                      <Shield className="w-5 h-5" />
                      Request Premium Underwrite
                    </Link>
                    <Link
                      to="/investment-properties"
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                    >
                      <TrendingUp className="w-5 h-5" />
                      View Active Opportunities
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Region Breakdown Footer */}
          <section className="py-16 px-4 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Core Markets</h4>
                  <ul className="space-y-2">
                    <li><Link to="/albany-homes-for-sale" className="text-white/70 hover:text-white transition-colors">Albany</Link></li>
                    <li><Link to="/saratoga-homes-for-sale" className="text-white/70 hover:text-white transition-colors">Saratoga</Link></li>
                    <li><Link to="/troy-homes-for-sale" className="text-white/70 hover:text-white transition-colors">Troy</Link></li>
                    <li><Link to="/schenectady-homes-for-sale" className="text-white/70 hover:text-white transition-colors">Schenectady</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Adirondack</h4>
                  <ul className="space-y-2">
                    <li><Link to="/towns/queensbury" className="text-white/70 hover:text-white transition-colors">Queensbury</Link></li>
                    <li><Link to="/towns/glens-falls" className="text-white/70 hover:text-white transition-colors">Glens Falls</Link></li>
                    <li><Link to="/towns/lake-george" className="text-white/70 hover:text-white transition-colors">Lake George</Link></li>
                    <li><Link to="/towns/greenwich" className="text-white/70 hover:text-white transition-colors">Greenwich</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Catskill Region</h4>
                  <ul className="space-y-2">
                    <li><Link to="/towns/catskill" className="text-white/70 hover:text-white transition-colors">Catskill</Link></li>
                    <li><Link to="/towns/windham" className="text-white/70 hover:text-white transition-colors">Windham</Link></li>
                    <li><Link to="/towns/cobleskill" className="text-white/70 hover:text-white transition-colors">Cobleskill</Link></li>
                    <li><Link to="/towns/sharon-springs" className="text-white/70 hover:text-white transition-colors">Sharon Springs</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Mohawk Valley</h4>
                  <ul className="space-y-2">
                    <li><Link to="/amsterdam-homes-for-sale" className="text-white/70 hover:text-white transition-colors">Amsterdam</Link></li>
                    <li><Link to="/towns/gloversville" className="text-white/70 hover:text-white transition-colors">Gloversville</Link></li>
                    <li><Link to="/towns/johnstown" className="text-white/70 hover:text-white transition-colors">Johnstown</Link></li>
                    <li><Link to="/towns/hudson" className="text-white/70 hover:text-white transition-colors">Hudson</Link></li>
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
