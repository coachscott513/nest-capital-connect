/**
 * TEMPLATE REPORT PAGE
 * 
 * Copy this file and replace the values below to create a new intelligence report.
 * 
 * Steps:
 * 1. Copy this file to a new file (e.g., src/pages/reports/NewPropertyReport.tsx)
 * 2. Update REPORT_SLUG to match your URL (e.g., "123-main-street-albany-ny")
 * 3. Update VALID_TOKEN for password-free share links
 * 4. Fill in all propertyData values from your PDFs
 * 5. Add the route to App.tsx
 */

import ReportPasswordGate from "@/components/ReportPasswordGate";
import IntelligenceReportTemplate, { PropertyData } from "@/components/IntelligenceReportTemplate";

// ============================================
// REPLACE THESE VALUES FOR EACH NEW REPORT
// ============================================

const REPORT_SLUG = "template"; // URL slug - e.g., "123-main-street-albany-ny"
const VALID_TOKEN = "TEMPLATE123"; // Token for password-free access via ?token=TEMPLATE123

const propertyData: PropertyData = {
  // Property basics
  address: "123 Main Street, City, NY", // Full address
  yearBuilt: "1990", // Year structure was built
  propertyType: "Single Family", // e.g., Single Family, Multi-Family, Mobile/Manufactured, Land
  lotSize: "0.5 Acres", // Lot size with units
  zoning: "R-1", // Zoning code from public record
  
  // Utilities
  sewer: "Public", // Public, Private, or Unknown
  water: "Public", // Public, Private, or Unknown
  electric: "Yes", // Yes, No, or Unknown
  fuel: "Natural Gas", // Natural Gas, Oil, Propane, Electric, or Unknown
  heat: "Forced Air", // Type of heating or Unknown
  
  // Taxes
  taxYear: "2024", // Year of tax data
  taxesTotal: "$5,000.00", // Total annual taxes
  countyTax: "$1,500.00", // County portion
  townTax: "$1,000.00", // Town portion
  schoolTax: "$2,500.00", // School portion
  
  // Exemptions
  exemption: "BASIC STAR", // Exemption name or "None"
  exemptionAmount: "$30,000", // Exemption value or "N/A"
  
  // Values
  assessedLandValue: "$50,000", // Land value from public record
  totalMarketValue: "$200,000", // Total market value from public record
  
  // RPR/AVM indicators (optional - leave empty string if not available)
  rprValueIndicator: "$225,000", // RPR estimated value
  rprConfidence: "85", // RPR confidence score (1-100)
  
  // Optional note about structure
  structureNote: "", // Leave empty if no special notes needed
};

// ============================================
// END OF VALUES TO REPLACE
// ============================================

const ReportTemplate = () => {
  return (
    <ReportPasswordGate reportSlug={REPORT_SLUG} validToken={VALID_TOKEN}>
      <IntelligenceReportTemplate
        reportSlug={REPORT_SLUG}
        pageTitle={`${propertyData.address} — Intelligence Report`}
        pageSubtitle="Investor-style facts + verified public record. Fast. Clear. Local."
        propertyData={propertyData}
        metaDescription={`Comprehensive property intelligence report for ${propertyData.address}. Verified public record, tax analysis, and buyer insights.`}
        canonicalUrl={`https://www.capitaldistrictnest.com/reports/${REPORT_SLUG}`}
      />
    </ReportPasswordGate>
  );
};

export default ReportTemplate;
