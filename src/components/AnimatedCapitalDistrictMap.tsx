
import React, { useEffect, useState } from 'react';

const AnimatedCapitalDistrictMap = () => {
  const [activeAreas, setActiveAreas] = useState<string[]>([]);

  const areas = [
    // Major cities
    { 
      id: 'albany', 
      name: 'Albany', 
      cx: 180, 
      cy: 220, 
      color: '#93c5fd',
      size: 14
    },
    { 
      id: 'troy', 
      name: 'Troy', 
      cx: 240, 
      cy: 170, 
      color: '#86efac',
      size: 12
    },
    { 
      id: 'schenectady', 
      name: 'Schenectady', 
      cx: 120, 
      cy: 200, 
      color: '#fcd34d',
      size: 12
    },
    { 
      id: 'saratoga', 
      name: 'Saratoga Springs', 
      cx: 200, 
      cy: 100, 
      color: '#fca5a5',
      size: 12
    },
    // Additional cities and towns
    { 
      id: 'cohoes', 
      name: 'Cohoes', 
      cx: 210, 
      cy: 180, 
      color: '#c4b5fd',
      size: 8
    },
    { 
      id: 'watervliet', 
      name: 'Watervliet', 
      cx: 190, 
      cy: 190, 
      color: '#67e8f9',
      size: 6
    },
    { 
      id: 'rensselaer', 
      name: 'Rensselaer', 
      cx: 200, 
      cy: 240, 
      color: '#bef264',
      size: 8
    },
    { 
      id: 'colonie', 
      name: 'Colonie', 
      cx: 160, 
      cy: 180, 
      color: '#fdba74',
      size: 10
    },
    { 
      id: 'guilderland', 
      name: 'Guilderland', 
      cx: 140, 
      cy: 240, 
      color: '#f9a8d4',
      size: 8
    },
    { 
      id: 'rotterdam', 
      name: 'Rotterdam', 
      cx: 100, 
      cy: 220, 
      color: '#a5b4fc',
      size: 6
    },
    { 
      id: 'niskayuna', 
      name: 'Niskayuna', 
      cx: 140, 
      cy: 160, 
      color: '#5eead4',
      size: 6
    },
    { 
      id: 'ballston-spa', 
      name: 'Ballston Spa', 
      cx: 180, 
      cy: 120, 
      color: '#fcd34d',
      size: 6
    },
    { 
      id: 'mechanicville', 
      name: 'Mechanicville', 
      cx: 220, 
      cy: 140, 
      color: '#fca5a5',
      size: 5
    },
    { 
      id: 'hoosick-falls', 
      name: 'Hoosick Falls', 
      cx: 280, 
      cy: 120, 
      color: '#c4b5fd',
      size: 5
    },
    { 
      id: 'greenwich', 
      name: 'Greenwich', 
      cx: 260, 
      cy: 80, 
      color: '#86efac',
      size: 5
    },
    { 
      id: 'glens-falls', 
      name: 'Glens Falls', 
      cx: 240, 
      cy: 60, 
      color: '#67e8f9',
      size: 8
    }
  ];

  useEffect(() => {
    const animateAreas = () => {
      // Randomly select 2-5 areas to light up
      const numberOfAreas = Math.floor(Math.random() * 4) + 2;
      const shuffledAreas = [...areas].sort(() => Math.random() - 0.5);
      const selectedAreas = shuffledAreas.slice(0, numberOfAreas).map(area => area.id);
      
      setActiveAreas(selectedAreas);
      
      // Clear after 2.5 seconds, then wait 1.5 seconds before next animation
      setTimeout(() => {
        setActiveAreas([]);
      }, 2500);
    };

    // Initial animation
    const initialTimeout = setTimeout(animateAreas, 500);
    
    // Repeat animation every 5 seconds
    const interval = setInterval(animateAreas, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-slate-800 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center mb-6 text-slate-200">
        Capital District Region
      </h3>
      
      <div className="relative">
        <svg
          viewBox="0 0 400 350"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
        >
          {/* Background map outline */}
          <rect
            x="20"
            y="20"
            width="360"
            height="310"
            fill="#334155"
            stroke="#64748b"
            strokeWidth="2"
            rx="12"
          />
          
          {/* Rivers and geographical features */}
          <path
            d="M 60 140 Q 120 160 180 180 Q 240 200 300 220 Q 340 230 370 240"
            stroke="#475569"
            strokeWidth="4"
            fill="none"
            opacity="0.8"
          />
          
          <path
            d="M 200 40 Q 210 120 220 180 Q 230 240 240 310"
            stroke="#475569"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />

          <path
            d="M 100 80 Q 150 100 200 120 Q 250 140 300 160"
            stroke="#475569"
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />

          {/* City areas with animations */}
          {areas.map((area) => (
            <g key={area.id}>
              {/* Pulsing ring effect when active */}
              {activeAreas.includes(area.id) && (
                <>
                  <circle
                    cx={area.cx}
                    cy={area.cy}
                    r={area.size + 15}
                    fill={area.color}
                    opacity="0.4"
                    className="animate-ping"
                  />
                  <circle
                    cx={area.cx}
                    cy={area.cy}
                    r={area.size + 25}
                    fill={area.color}
                    opacity="0.3"
                    className="animate-ping"
                    style={{ animationDelay: '0.3s' }}
                  />
                </>
              )}
              
              {/* Main city circle */}
              <circle
                cx={area.cx}
                cy={area.cy}
                r={area.size}
                fill={activeAreas.includes(area.id) ? area.color : '#64748b'}
                stroke="#1e293b"
                strokeWidth="2"
                className={`transition-all duration-500 ${
                  activeAreas.includes(area.id) 
                    ? 'animate-pulse scale-110' 
                    : 'hover:scale-105'
                }`}
                style={{
                  filter: activeAreas.includes(area.id) 
                    ? `drop-shadow(0 0 12px ${area.color})` 
                    : 'none'
                }}
              />
              
              {/* City label */}
              <text
                x={area.cx}
                y={area.cy + area.size + 20}
                textAnchor="middle"
                className={`text-xs font-medium transition-all duration-300 ${
                  activeAreas.includes(area.id) 
                    ? 'fill-slate-200 font-semibold' 
                    : 'fill-slate-400'
                } ${area.size < 8 ? 'text-[10px]' : ''}`}
              >
                {area.name}
              </text>
            </g>
          ))}
          
          {/* Decorative elements */}
          <circle cx="350" cy="50" r="12" fill="#fbbf24" opacity="0.8" />
          <text x="350" y="35" textAnchor="middle" className="text-sm fill-amber-400">
            ☀
          </text>
          
          {/* Compass rose */}
          <g transform="translate(350, 290)">
            <circle r="15" fill="#475569" stroke="#64748b" strokeWidth="1" opacity="0.9" />
            <text x="0" y="-8" textAnchor="middle" className="text-xs fill-slate-300 font-semibold">N</text>
            <text x="0" y="12" textAnchor="middle" className="text-xs fill-slate-300 font-semibold">S</text>
            <text x="-8" y="3" textAnchor="middle" className="text-xs fill-slate-300 font-semibold">W</text>
            <text x="8" y="3" textAnchor="middle" className="text-xs fill-slate-300 font-semibold">E</text>
          </g>
        </svg>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-base text-slate-300 mb-4">
          Discover the diverse communities across New York's Capital District region
        </p>
        <div className="flex justify-center flex-wrap gap-2">
          {areas.slice(0, 8).map((area) => (
            <div
              key={area.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeAreas.includes(area.id) ? 'scale-125 shadow-lg' : ''
              }`}
              style={{ backgroundColor: area.color }}
              title={area.name}
            />
          ))}
        </div>
        <p className="text-sm text-slate-400 mt-2">
          {areas.length} communities and growing
        </p>
      </div>
    </div>
  );
};

export default AnimatedCapitalDistrictMap;
