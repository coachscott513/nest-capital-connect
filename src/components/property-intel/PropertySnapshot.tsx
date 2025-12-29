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
    <section className="py-16 md:py-20 border-b border-report-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-10 text-center">
          Property Snapshot
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-report-card"
            >
              <item.icon className="w-6 h-6 text-report-muted mb-3" strokeWidth={1.5} />
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
