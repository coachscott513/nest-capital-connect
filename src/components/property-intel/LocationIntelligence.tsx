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
    <section className="py-16 md:py-20 bg-report-card-alt">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-4 text-center">
          Location Intelligence
        </h2>
        
        <p className="text-sm text-report-muted text-center mb-10 max-w-lg mx-auto">
          Location characteristics often influence long-term value more than interior features.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 rounded-2xl bg-report-card border border-report-border/50 shadow-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-report-accent/10 flex items-center justify-center">
                <card.icon className="w-5 h-5 text-report-accent" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-report-fg mb-1">{card.title}</h3>
                <p className="text-sm text-report-muted">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationIntelligence;
