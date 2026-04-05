
import React, { useEffect, useState } from 'react';
import { MapPin, Users, TrendingUp } from 'lucide-react';

const AnimatedCapitalDistrictMap = () => {
  const [activeAreas, setActiveAreas] = useState<string[]>([]);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const areas = [
    { 
      id: 'albany', 
      name: 'Albany', 
      cx: 180, 
      cy: 220, 
      color: 'from-blue-400 to-blue-600',
      size: 18,
      population: '97K',
      properties: '2.3K'
    },
    { 
      id: 'troy', 
      name: 'Troy', 
      cx: 260, 
      cy: 160, 
      color: 'from-emerald-400 to-emerald-600',
      size: 16,
      population: '51K',
      properties: '1.8K'
    },
    { 
      id: 'schenectady', 
      name: 'Schenectady', 
      cx: 100, 
      cy: 190, 
      color: 'from-amber-400 to-orange-500',
      size: 16,
      population: '65K',
      properties: '1.9K'
    },
    { 
      id: 'saratoga', 
      name: 'Saratoga Springs', 
      cx: 220, 
      cy: 80, 
      color: 'from-rose-400 to-pink-600',
      size: 16,
      population: '28K',
      properties: '890'
    },
    { 
      id: 'clifton-park', 
      name: 'Clifton Park', 
      cx: 200, 
      cy: 140, 
      color: 'from-indigo-400 to-purple-600',
      size: 12,
      population: '36K',
      properties: '650'
    },
    { 
      id: 'colonie', 
      name: 'Colonie', 
      cx: 150, 
      cy: 170, 
      color: 'from-teal-400 to-cyan-600',
      size: 14,
      population: '85K',
      properties: '1.2K'
    },
    { 
      id: 'cohoes', 
      name: 'Cohoes', 
      cx: 220, 
      cy: 170, 
      color: 'from-violet-400 to-purple-600',
      size: 10,
      population: '17K',
      properties: '420'
    },
    { 
      id: 'guilderland', 
      name: 'Guilderland', 
      cx: 130, 
      cy: 250, 
      color: 'from-pink-400 to-rose-600',
      size: 12,
      population: '36K',
      properties: '680'
    }
  ];

  useEffect(() => {
    const animateAreas = () => {
      const numberOfAreas = Math.floor(Math.random() * 3) + 2;
      const shuffledAreas = [...areas].sort(() => Math.random() - 0.5);
      const selectedAreas = shuffledAreas.slice(0, numberOfAreas).map(area => area.id);
      
      setActiveAreas(selectedAreas);
      
      setTimeout(() => {
        setActiveAreas([]);
      }, 3000);
    };

    const initialTimeout = setTimeout(animateAreas, 1000);
    const interval = setInterval(animateAreas, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const getActiveArea = () => areas.find(area => area.id === hoveredArea);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Glassmorphism container */}
      <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent)] pointer-events-none"></div>
        
        <div className="relative p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
              Capital District Region
            </h3>
            <p className="text-muted-foreground text-lg">Interactive investment opportunities map</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Map SVG */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-white/5 p-6">
                <svg
                  viewBox="0 0 400 350"
                  className="w-full h-auto"
                  style={{ filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4))' }}
                >
                  {/* Enhanced background */}
                  <defs>
                    <radialGradient id="mapGradient" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <rect
                    x="20"
                    y="20"
                    width="360"
                    height="310"
                    fill="url(#mapGradient)"
                    stroke="rgba(148, 163, 184, 0.3)"
                    strokeWidth="1"
                    rx="16"
                  />
                  
                  {/* Stylized geographic lines */}
                  <path
                    d="M 60 140 Q 120 160 180 180 Q 240 200 300 220"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M 200 40 Q 210 120 220 180 Q 230 240 240 310"
                    stroke="rgba(16, 185, 129, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />

                  {/* City areas with modern design */}
                  {areas.map((area) => {
                    const isActive = activeAreas.includes(area.id);
                    const isHovered = hoveredArea === area.id;
                    
                    return (
                      <g key={area.id}>
                        {/* Animated rings for active areas */}
                        {isActive && (
                          <>
                            <circle
                              cx={area.cx}
                              cy={area.cy}
                              r={area.size + 20}
                              fill="none"
                              stroke="rgba(59, 130, 246, 0.4)"
                              strokeWidth="2"
                              className="animate-ping"
                            />
                            <circle
                              cx={area.cx}
                              cy={area.cy}
                              r={area.size + 35}
                              fill="none"
                              stroke="rgba(59, 130, 246, 0.2)"
                              strokeWidth="1"
                              className="animate-ping"
                              style={{ animationDelay: '0.5s' }}
                            />
                          </>
                        )}
                        
                        {/* Main city circle with gradient */}
                        <circle
                          cx={area.cx}
                          cy={area.cy}
                          r={area.size}
                          fill={isActive || isHovered ? "url(#cityGradient)" : "rgba(148, 163, 184, 0.4)"}
                          stroke={isActive || isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(148, 163, 184, 0.6)"}
                          strokeWidth={isActive || isHovered ? "3" : "1"}
                          className={`transition-all duration-500 cursor-pointer ${
                            isActive || isHovered ? 'filter-[url(#glow)]' : ''
                          }`}
                          style={{
                            transform: isActive || isHovered ? 'scale(1.2)' : 'scale(1)',
                            transformOrigin: `${area.cx}px ${area.cy}px`
                          }}
                          onMouseEnter={() => setHoveredArea(area.id)}
                          onMouseLeave={() => setHoveredArea(null)}
                        />
                        
                        {/* City name with enhanced typography */}
                        <text
                          x={area.cx}
                          y={area.cy + area.size + 25}
                          textAnchor="middle"
                          className={`text-xs font-semibold transition-all duration-300 ${
                            isActive || isHovered 
                              ? 'fill-white drop-shadow-lg' 
                              : 'fill-slate-300'
                          }`}
                          style={{
                            fontSize: area.size > 14 ? '12px' : '10px',
                            textShadow: isActive || isHovered ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                          }}
                        >
                          {area.name}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Enhanced compass */}
                  <g transform="translate(350, 290)">
                    <circle r="18" fill="rgba(30, 41, 59, 0.8)" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
                    <circle r="12" fill="none" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1" />
                    <text x="0" y="-6" textAnchor="middle" className="text-xs fill-blue-400 font-bold">N</text>
                    <text x="0" y="10" textAnchor="middle" className="text-xs fill-slate-400">S</text>
                    <text x="-8" y="2" textAnchor="middle" className="text-xs fill-slate-400">W</text>
                    <text x="8" y="2" textAnchor="middle" className="text-xs fill-slate-400">E</text>
                  </g>
                </svg>
              </div>
            </div>
            
            {/* Info Panel */}
            <div className="space-y-6">
              {/* Active area info */}
              {hoveredArea && getActiveArea() && (
                <div className="bg-background/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getActiveArea()?.color}`}></div>
                    <h4 className="text-xl font-bold text-white">{getActiveArea()?.name}</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">{getActiveArea()?.population}</p>
                      <p className="text-xs text-muted-foreground">Population</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-2xl font-bold text-white">{getActiveArea()?.properties}</p>
                      <p className="text-xs text-muted-foreground">Properties</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Stats Overview */}
              <div className="bg-background/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  Market Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Cities</span>
                    <span className="text-white font-semibold">{areas.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Active Listings</span>
                    <span className="text-white font-semibold">8.5K+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Investment Properties</span>
                    <span className="text-white font-semibold">1.2K+</span>
                  </div>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="text-center">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Explore Properties
                </button>
              </div>
            </div>
          </div>
          
          {/* Activity indicators */}
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {areas.slice(0, 6).map((area) => (
                <div
                  key={area.id}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    activeAreas.includes(area.id) 
                      ? `bg-gradient-to-r ${area.color} shadow-lg scale-125` 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  title={area.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCapitalDistrictMap;
