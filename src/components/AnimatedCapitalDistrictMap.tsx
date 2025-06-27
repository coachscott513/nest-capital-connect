
import React, { useEffect, useState } from 'react';

const AnimatedCapitalDistrictMap = () => {
  const [activeAreas, setActiveAreas] = useState<string[]>([]);

  const areas = [
    { 
      id: 'albany', 
      name: 'Albany', 
      cx: 180, 
      cy: 200, 
      color: '#3b82f6',
      delay: 0
    },
    { 
      id: 'troy', 
      name: 'Troy', 
      cx: 220, 
      cy: 150, 
      color: '#10b981',
      delay: 1000
    },
    { 
      id: 'schenectady', 
      name: 'Schenectady', 
      cx: 120, 
      cy: 180, 
      color: '#f59e0b',
      delay: 2000
    },
    { 
      id: 'saratoga', 
      name: 'Saratoga Springs', 
      cx: 200, 
      cy: 80, 
      color: '#ef4444',
      delay: 3000
    }
  ];

  useEffect(() => {
    const animateAreas = () => {
      // Randomly select 1-3 areas to light up
      const numberOfAreas = Math.floor(Math.random() * 3) + 1;
      const shuffledAreas = [...areas].sort(() => Math.random() - 0.5);
      const selectedAreas = shuffledAreas.slice(0, numberOfAreas).map(area => area.id);
      
      setActiveAreas(selectedAreas);
      
      // Clear after 2 seconds, then wait 1 second before next animation
      setTimeout(() => {
        setActiveAreas([]);
      }, 2000);
    };

    // Initial animation
    const initialTimeout = setTimeout(animateAreas, 500);
    
    // Repeat animation every 4 seconds
    const interval = setInterval(animateAreas, 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-center mb-4 text-slate-800">
        Capital District Region
      </h3>
      
      <div className="relative">
        <svg
          viewBox="0 0 320 280"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
        >
          {/* Background map outline */}
          <rect
            x="10"
            y="10"
            width="300"
            height="260"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="2"
            rx="8"
          />
          
          {/* Rivers and geographical features */}
          <path
            d="M 50 120 Q 100 140 150 160 Q 200 180 250 200 Q 280 210 300 220"
            stroke="#60a5fa"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
          
          <path
            d="M 180 50 Q 190 100 200 150 Q 210 200 220 250"
            stroke="#60a5fa"
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
                    r="25"
                    fill={area.color}
                    opacity="0.3"
                    className="animate-ping"
                  />
                  <circle
                    cx={area.cx}
                    cy={area.cy}
                    r="35"
                    fill={area.color}
                    opacity="0.2"
                    className="animate-ping"
                    style={{ animationDelay: '0.3s' }}
                  />
                </>
              )}
              
              {/* Main city circle */}
              <circle
                cx={area.cx}
                cy={area.cy}
                r="15"
                fill={activeAreas.includes(area.id) ? area.color : '#64748b'}
                stroke="white"
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
                y={area.cy + 35}
                textAnchor="middle"
                className={`text-xs font-medium transition-all duration-300 ${
                  activeAreas.includes(area.id) 
                    ? 'fill-slate-800 font-semibold' 
                    : 'fill-slate-600'
                }`}
              >
                {area.name}
              </text>
            </g>
          ))}
          
          {/* Decorative elements */}
          <circle cx="280" cy="40" r="8" fill="#fbbf24" opacity="0.8" />
          <text x="280" y="25" textAnchor="middle" className="text-xs fill-slate-600">
            ☀
          </text>
        </svg>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-600">
          Watch as different areas of the Capital District come alive
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {areas.map((area) => (
            <div
              key={area.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeAreas.includes(area.id) ? 'scale-125' : ''
              }`}
              style={{ backgroundColor: area.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCapitalDistrictMap;
