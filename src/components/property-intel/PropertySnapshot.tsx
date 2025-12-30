import { Home, DollarSign, Bed, Bath, Ruler, Trees, GraduationCap, Clock, Tag } from "lucide-react";
import { PropertyIntelData } from "./types";

interface PropertySnapshotProps {
  data: PropertyIntelData;
  isUnlocked?: boolean;
}

const PropertySnapshot = ({ data, isUnlocked = false }: PropertySnapshotProps) => {
  const snapshotItems = [
    {
      icon: DollarSign,
      label: "Asking Price",
      value: isUnlocked ? `$${data.askingPrice.toLocaleString()}` : "$XXX,XXX",
    },
    {
      icon: Bed,
      label: "Bedrooms",
      value: isUnlocked ? data.beds.toString() : "—",
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: isUnlocked ? data.baths.toString() : "—",
    },
    {
      icon: Ruler,
      label: "Sq Ft",
      value: isUnlocked ? data.sqft.toLocaleString() : "—",
    },
    {
      icon: Trees,
      label: "Acres",
      value: isUnlocked ? data.acres.toString() : "—",
    },
    {
      icon: Home,
      label: "Property Type",
      value: isUnlocked ? data.propertyType : "Single Family",
    },
    {
      icon: GraduationCap,
      label: "School District",
      value: isUnlocked ? data.schoolDistrict : "Example District",
    },
    {
      icon: Clock,
      label: "Days on Market",
      value: isUnlocked ? (data.daysOnMarket?.toString() || "—") : "—",
    },
    {
      icon: Tag,
      label: "Status",
      value: isUnlocked ? data.status : "Active",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-report-section-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted mb-6 text-center">
          Section 1
        </p>
        
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Property Snapshot
        </h2>
        
        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
          {snapshotItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl bg-report-section-muted border border-report-border/30"
              >
                <Icon className="w-5 h-5 text-report-accent mb-3" strokeWidth={1.5} />
                <p className="text-[10px] md:text-xs uppercase tracking-wider text-report-muted mb-1">{item.label}</p>
                <p className="text-sm md:text-lg font-medium text-report-fg">{item.value}</p>
              </div>
            );
          })}
        </div>
        
        {!isUnlocked && (
          <p className="text-xs text-report-muted text-center mt-8 italic">
            Sample data shown — unlock for actual property details
          </p>
        )}
      </div>
    </section>
  );
};

export default PropertySnapshot;
