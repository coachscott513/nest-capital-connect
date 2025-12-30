import { PropertyIntelData } from "./types";

interface WhatYoureBuyingProps {
  data: PropertyIntelData;
  isUnlocked?: boolean;
}

const WhatYoureBuying = ({ data, isUnlocked = false }: WhatYoureBuyingProps) => {
  // Generate a compelling narrative based on property attributes
  const generateNarrative = () => {
    if (!isUnlocked) {
      return "This property presents a unique opportunity in a sought-after area, combining lifestyle appeal with long-term investment potential. The full narrative is available upon request.";
    }

    const narrativeParts: string[] = [];
    
    // Property type context
    if (data.acres >= 1) {
      narrativeParts.push(`This ${data.propertyType.toLowerCase()} offers ${data.acres} acres of land`);
    } else {
      narrativeParts.push(`This ${data.propertyType.toLowerCase()} in ${data.city}`);
    }

    // Size and configuration
    if (data.sqft >= 2500) {
      narrativeParts.push(`generous living space at ${data.sqft.toLocaleString()} square feet`);
    }

    // School district highlight
    if (data.schoolDistrict) {
      narrativeParts.push(`access to the ${data.schoolDistrict}`);
    }

    // Market position
    if (data.inventoryPressure === 'Low') {
      narrativeParts.push('entering a low-inventory market where competition among buyers is elevated');
    } else if (data.inventoryPressure === 'High') {
      narrativeParts.push('positioned in a buyer-favorable market with multiple options available');
    }

    return `${narrativeParts.join(', ')}. This combination of location, scale, and market timing warrants serious consideration for buyers prioritizing long-term value.`;
  };

  return (
    <section className="py-20 md:py-28 bg-report-bg">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-4 text-center">
          Section 2
        </p>
        
        <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3 text-center">
          What You're Actually Buying
        </h2>
        
        <p className="text-sm text-report-text-muted text-center mb-10 max-w-lg mx-auto">
          The story behind the listing
        </p>
        
        <div className="bg-report-card rounded-2xl shadow-[0_2px_12px_-2px_hsl(30_20%_20%/0.15)] border border-report-border p-8 md:p-10">
          <blockquote className="text-lg md:text-xl text-report-text-body leading-relaxed text-center italic">
            "{generateNarrative()}"
          </blockquote>
        </div>
        
        {!isUnlocked && (
          <p className="text-xs text-report-text-muted text-center mt-8 italic">
            Full property-specific narrative available after unlock
          </p>
        )}
      </div>
    </section>
  );
};

export default WhatYoureBuying;
