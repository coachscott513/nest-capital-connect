import ReportPasswordGate from "@/components/ReportPasswordGate";
import IntelligenceReportTemplate, { PropertyData } from "@/components/IntelligenceReportTemplate";

const REPORT_SLUG = "1999-ridge-road-queensbury-ny";
const VALID_TOKEN = "RIDGE1999";

const propertyData: PropertyData = {
  address: "1999 RIDGE RD, Queensbury, NY",
  yearBuilt: "1957",
  propertyType: "Mobile/Manufactured",
  lotSize: "3.67 Acres",
  sewer: "Private",
  water: "Private",
  electric: "Yes",
  fuel: "Unknown",
  heat: "Unknown",
  taxesTotal: "$514.97",
  countyTax: "$144.11",
  townTax: "$25.52",
  schoolTax: "$345.34",
  exemption: "BASIC STAR",
  exemptionAmount: "$30,000",
  assessedLandValue: "$37,100",
  totalMarketValue: "$53,000",
  rprValueIndicator: "$278,000",
  rprConfidence: "90",
  zoning: "RR-3A",
  taxYear: "2021",
  structureNote: "Some public records describe a small manufactured home structure; MLS listing may differ. We verify details upon request.",
  // Deep intelligence data
  assessmentType: "Full Market Value",
  assessmentRatio: "100%",
  equalizationRate: "100%",
  totalAssessedValue: "$53,000",
  taxInsight: "This property is assessed at full market value with a low total tax burden. Reassessments or exemption changes could impact future taxes.",
  rprInterpretation: "RPR's automated model suggests a significantly higher theoretical value than public tax records. This often occurs with large land parcels or properties with redevelopment or use potential. Verification is recommended.",
  landUse: "Residential",
  zoningNote: "Zoning and land use should be confirmed directly with the municipality before planning improvements or development.",
  riskSignals: [
    { type: "positive", text: "Large acreage (3.67 acres)" },
    { type: "warning", text: "Public record lists manufactured/mobile structure" },
    { type: "warning", text: "Utilities not fully specified" },
    { type: "warning", text: "MLS description should be confirmed" },
    { type: "warning", text: "Zoning confirmation recommended (RR-3A)" },
  ],
};

const RidgeRoadIntelligenceReport = () => {
  return (
    <ReportPasswordGate reportSlug={REPORT_SLUG} validToken={VALID_TOKEN}>
      <IntelligenceReportTemplate
        reportSlug={REPORT_SLUG}
        pageTitle="1999 Ridge Rd, Queensbury, NY — Intelligence Report"
        pageSubtitle="Investor-style facts + verified public record. Fast. Clear. Local."
        propertyData={propertyData}
        metaDescription="Comprehensive property intelligence report for 1999 Ridge Road, Queensbury NY. Verified public record, tax analysis, and buyer insights."
        canonicalUrl="https://www.capitaldistrictnest.com/reports/1999-ridge-road-queensbury-ny"
      />
    </ReportPasswordGate>
  );
};

export default RidgeRoadIntelligenceReport;
