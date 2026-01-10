import { TrendingUp, Gauge, Zap } from "lucide-react";

const InstitutionalHeader = () => {
  const indicators = [
    { 
      label: "Regional Alpha", 
      value: "+2.4%", 
      color: "text-green-400",
      icon: TrendingUp
    },
    { 
      label: "Nest Score", 
      value: "94 / 100", 
      color: "text-primary",
      icon: Gauge
    },
    { 
      label: "Market Velocity", 
      value: "High", 
      color: "text-primary",
      icon: Zap
    },
  ];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* Cinematic Breathing Line from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/40 to-primary/60" />
      </div>

      {/* Main Content */}
      <div className="pt-40 pb-16 px-[5%]">
        <div className="max-w-7xl mx-auto">
          {/* Ultra-light Institutional Title */}
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl text-foreground uppercase leading-tight"
              style={{ 
                fontWeight: 100, 
                letterSpacing: '0.5em' 
              }}
            >
              Capital District <span className="text-primary text-glow">: Alpha</span>
            </h2>
            <p 
              className="mt-4 text-xs md:text-sm text-muted-foreground uppercase font-light"
              style={{ letterSpacing: '0.3em' }}
            >
              [ Regional Intelligence Dashboard ]
            </p>
          </div>

          {/* 3-Column Bento Indicator Bar */}
          <div 
            className="mx-auto max-w-4xl rounded-2xl border border-border/50 overflow-hidden"
            style={{
              background: 'rgba(11, 11, 11, 0.8)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
            }}
          >
            <div className="grid grid-cols-3 divide-x divide-border/30">
              {indicators.map((indicator) => (
                <div key={indicator.label} className="px-6 py-8 text-center">
                  <div className="flex justify-center mb-3">
                    <indicator.icon className={`w-5 h-5 ${indicator.color} opacity-70`} />
                  </div>
                  <p 
                    className="text-[10px] text-muted-foreground uppercase tracking-[0.25em] font-light mb-2"
                  >
                    {indicator.label}
                  </p>
                  <p className={`text-xl md:text-2xl font-[100] tracking-wide ${indicator.color}`}>
                    {indicator.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Teal Pulse Line Bridge to Town Cards */}
      <div className="flex justify-center pb-8">
        <div className="w-px h-24 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
      </div>
    </section>
  );
};

export default InstitutionalHeader;
