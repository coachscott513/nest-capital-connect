import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Private report contents live only on the server and are released after the
// server-held access password is verified. Nothing here ships in the public app.
const REPORTS: Record<string, unknown> = {
  "1999-ridge-road-queensbury-ny": {
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
  rprValueIndicator: "$179,900",
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
},
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const expected = Deno.env.get("REPORT_ACCESS_PASSWORD");
    if (!expected) return json({ error: "Report access is not configured" }, 503);
    const { reportSlug, password } = await req.json();
    if (typeof reportSlug !== "string" || typeof password !== "string" || password.length > 200) {
      return json({ error: "Invalid request" }, 400);
    }
    const report = REPORTS[reportSlug];
    if (!report || password !== expected) return json({ error: "Incorrect password" }, 403);
    return json({ propertyData: report }, 200);
  } catch {
    return json({ error: "Invalid request" }, 400);
  }
});
