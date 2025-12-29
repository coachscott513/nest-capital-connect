import { PropertyIntelData } from "./types";

interface PricingIntelligenceProps {
  data: PropertyIntelData;
}

const PricingIntelligence = ({ data }: PricingIntelligenceProps) => {
  const maxValue = Math.max(
    data.askingPrice,
    data.medianSold12Mo || 0,
    data.medianActive || 0
  );

  const getBarWidth = (value: number) => `${(value / maxValue) * 100}%`;

  const items = [
    {
      label: "Subject Property",
      value: data.askingPrice,
      isHighlighted: true,
    },
    {
      label: "Median Sold (12 mo)",
      value: data.medianSold12Mo || 0,
    },
    {
      label: "Median Active",
      value: data.medianActive || 0,
    },
  ];

  return (
    <section className="py-16 md:py-20 border-b border-report-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-4 text-center">
          Pricing Intelligence
        </h2>
        
        <p className="text-sm text-report-muted text-center mb-10 max-w-lg mx-auto">
          How this property compares to recent market behavior
        </p>
        
        <div className="space-y-6 max-w-2xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${item.isHighlighted ? 'font-medium text-report-fg' : 'text-report-muted'}`}>
                  {item.label}
                </span>
                <span className={`text-sm ${item.isHighlighted ? 'font-medium text-report-fg' : 'text-report-muted'}`}>
                  ${item.value.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-report-card rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    item.isHighlighted ? 'bg-report-accent' : 'bg-report-border'
                  }`}
                  style={{ width: getBarWidth(item.value) }}
                />
              </div>
            </div>
          ))}
        </div>
        
        {data.pricePosition && (
          <p className="text-sm text-report-muted text-center mt-8">
            This property is priced <span className="font-medium text-report-fg">{data.pricePosition.toLowerCase()}</span> the local median.
          </p>
        )}
      </div>
    </section>
  );
};

export default PricingIntelligence;
