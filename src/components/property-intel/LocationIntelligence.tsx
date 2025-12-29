import { Car, Store, GraduationCap, TreePine } from "lucide-react";
import { PropertyIntelData } from "./types";

interface LocationIntelligenceProps {
  data: PropertyIntelData;
}

const LocationIntelligence = ({ data }: LocationIntelligenceProps) => {
  const cards = [
    {
      icon: Car,
      title: "Commute Access",
      description: data.commuteAccess || "Direct access to major routes",
    },
    {
      icon: Store,
      title: "Nearby Services",
      description: data.nearbyServices?.join(", ") || "Local amenities within 5 miles",
    },
    {
      icon: GraduationCap,
      title: "School Quality",
      description: data.schoolQuality || `${data.schoolDistrict} District`,
    },
    {
      icon: TreePine,
      title: "Area Context",
      description: data.areaContext || "Residential neighborhood setting",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-report-section-dark">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 text-center mb-3">
          Neighborhood
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4 text-center">
          Location Intelligence
        </h2>
        
        <p className="text-sm text-white/50 text-center mb-12 max-w-lg mx-auto">
          Location characteristics often influence long-term value more than interior features.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-start gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-report-accent/20 flex items-center justify-center">
                <card.icon className="w-6 h-6 text-report-accent" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-medium text-white mb-1">{card.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationIntelligence;
