import { MapPin, Car, GraduationCap, TrendingUp, Building } from "lucide-react";
import { PropertyIntelData } from "./types";

interface LocationIntelligenceProps {
  data: PropertyIntelData;
  isUnlocked?: boolean;
}

const LocationIntelligence = ({ data, isUnlocked = false }: LocationIntelligenceProps) => {
  const locationItems = [
    {
      icon: Car,
      label: "Commuting Access",
      value: data.commuteAccess || "Highway proximity, drive times to employment centers",
    },
    {
      icon: GraduationCap,
      label: "School District Context",
      value: data.schoolQuality || `${data.schoolDistrict} serves this area`,
    },
    {
      icon: Building,
      label: "Nearby Demand Drivers",
      value: data.demandDrivers?.join(", ") || "Employment centers, retail, healthcare",
    },
    {
      icon: TrendingUp,
      label: "Long-term Area Trajectory",
      value: data.areaTrajectory || data.areaContext || "Development trends and growth indicators",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-report-section-dark text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6 text-center">
          Section 6
        </p>
        
        <h2 className="text-2xl md:text-3xl font-light text-white mb-4 text-center">
          Location Intelligence
        </h2>
        
        <p className="text-sm text-white/50 text-center mb-10 max-w-lg mx-auto">
          Context that determines long-term value
        </p>
        
        {/* Map placeholder */}
        <div className="w-full h-48 rounded-2xl bg-white/5 flex items-center justify-center mb-10">
          <MapPin className="w-8 h-8 text-white/20" strokeWidth={1.5} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-report-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-report-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">{item.label}</p>
                  <p className="text-sm text-white/60">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LocationIntelligence;
