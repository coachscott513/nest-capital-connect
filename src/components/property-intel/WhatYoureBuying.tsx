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
    <section className="py-16 md:py-20 bg-report-section-light">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted mb-6 text-center">
          Section 2
        </p>
        
        <h2 className="text-2xl md:text-3xl font-light text-report-fg mb-8 text-center">
          What You're Actually Buying
        </h2>
        
        <blockquote className="text-lg md:text-xl text-report-fg/80 leading-relaxed text-center italic">
          "{generateNarrative()}"
        </blockquote>
        
        {!isUnlocked && (
          <p className="text-xs text-report-muted text-center mt-6 italic">
            Full property-specific narrative available after unlock
          </p>
        )}
      </div>
    </section>
  );
};

export default WhatYoureBuying;
