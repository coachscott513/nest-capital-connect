import { Home, DollarSign, SquareStack, GraduationCap, Building2 } from "lucide-react";
import { PropertyIntelData } from "./types";

interface PropertySnapshotProps {
  data: PropertyIntelData;
}

const PropertySnapshot = ({ data }: PropertySnapshotProps) => {
  const items = [
    {
      icon: Home,
      label: "Status",
      value: data.status,
    },
    {
      icon: DollarSign,
      label: "Asking Price",
      value: `$${data.askingPrice.toLocaleString()}`,
    },
    {
      icon: SquareStack,
      label: "Price per Sq Ft",
      value: `$${data.pricePerSqFt.toLocaleString()}`,
    },
    {
      icon: GraduationCap,
      label: "School District",
      value: data.schoolDistrict,
    },
    {
      icon: Building2,
      label: "Municipality",
      value: data.municipality,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-report-section-light">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted text-center mb-3">
          At a Glance
        </p>
        <h2 className="text-3xl md:text-4xl font-light text-report-fg mb-12 text-center">
          Property Snapshot
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-report-section-muted border border-report-border/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-report-accent/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-report-accent" strokeWidth={1.5} />
              </div>
              <p className="text-xs uppercase tracking-wider text-report-muted mb-2">{item.label}</p>
              <p className="text-base md:text-lg font-medium text-report-fg">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySnapshot;
