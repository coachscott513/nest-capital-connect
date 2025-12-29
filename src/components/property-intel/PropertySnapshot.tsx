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
    <section className="py-16 md:py-20 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Property Snapshot
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-report-card border border-report-border/50 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-report-accent/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 text-report-accent" strokeWidth={1.5} />
              </div>
              <p className="text-xs text-report-muted mb-1">{item.label}</p>
              <p className="text-sm md:text-base font-medium text-report-fg">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertySnapshot;
