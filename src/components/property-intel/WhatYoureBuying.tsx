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
    <section className="py-16 md:py-20 bg-report-bg">
      <div className="container mx-auto px-4 max-w-3xl">
        <article className="bg-report-card rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)] border border-report-border p-8 md:p-10">
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-4">
              Section 2
            </p>

            <h2 className="text-2xl md:text-3xl font-medium text-report-text-headline mb-3">
              What You're Actually Buying
            </h2>

            <p className="text-sm text-report-text-muted mb-10 max-w-lg mx-auto">
              The story behind the listing
            </p>
          </header>

          <div className="bg-report-section-light rounded-2xl border border-report-border p-8 md:p-10">
            <blockquote className="text-lg md:text-xl text-report-text-body leading-relaxed text-center italic">
              "{generateNarrative()}"
            </blockquote>
          </div>

          {!isUnlocked && (
            <p className="text-xs text-report-text-muted text-center mt-8 italic">
              Full property-specific narrative available after unlock
            </p>
          )}
        </article>
      </div>
    </section>
  );
};

export default WhatYoureBuying;
