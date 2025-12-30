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
    <section className="py-20 md:py-28 bg-report-bg">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-report-card rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-4 text-center">
            Pricing Intelligence
          </h2>
          
          <p className="text-sm text-report-text-muted text-center mb-10 max-w-lg mx-auto">
            How this property compares to recent market behavior
          </p>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            {items.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${item.isHighlighted ? 'font-medium text-report-text-headline' : 'text-report-text-muted'}`}>
                    {item.label}
                  </span>
                  <span className={`text-sm ${item.isHighlighted ? 'font-medium text-report-text-headline' : 'text-report-text-muted'}`}>
                    ${item.value.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 bg-report-bg rounded-full overflow-hidden border border-report-border">
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
            <p className="text-sm text-report-text-muted text-center mt-8">
              This property is priced <span className="font-medium text-report-text-headline">{data.pricePosition.toLowerCase()}</span> the local median.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingIntelligence;
