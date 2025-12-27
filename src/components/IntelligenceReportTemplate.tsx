import { useState } from "react";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  FileCheck,
  Shield,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Home,
  DollarSign,
  Zap,
  ClipboardCheck,
  Send,
  Search,
  ChevronDown,
  BarChart3,
  TrendingUp,
  AlertCircle,
  MapPinned,
  History,
} from "lucide-react";

export interface PropertyData {
  address: string;
  yearBuilt: string;
  propertyType: string;
  lotSize: string;
  sewer: string;
  water: string;
  electric: string;
  fuel: string;
  heat: string;
  taxesTotal: string;
  countyTax: string;
  townTax: string;
  schoolTax: string;
  exemption: string;
  exemptionAmount: string;
  assessedLandValue: string;
  totalMarketValue: string;
  rprValueIndicator: string;
  rprConfidence: string;
  zoning: string;
  taxYear: string;
  structureNote?: string;
  // New deep intelligence fields
  assessmentType?: string;
  assessmentRatio?: string;
  equalizationRate?: string;
  totalAssessedValue?: string;
  taxInsight?: string;
  rprValueLow?: string;
  rprValueHigh?: string;
  rprInterpretation?: string;
  riskSignals?: { type: "positive" | "warning"; text: string }[];
  landUse?: string;
  zoningNote?: string;
  lastSaleDate?: string;
  lastSalePrice?: string;
  priorListings?: string;
}

interface IntelligenceReportTemplateProps {
  reportSlug: string;
  pageTitle: string;
  pageSubtitle?: string;
  propertyData: PropertyData;
  metaDescription?: string;
  canonicalUrl?: string;
}

const IntelligenceReportTemplate = ({
  reportSlug,
  pageTitle,
  pageSubtitle = "Investor-style facts + verified public record. Fast. Clear. Local.",
  propertyData,
  metaDescription,
  canonicalUrl,
}: IntelligenceReportTemplateProps) => {
  const [offerFormData, setOfferFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    planning: "",
    timeline: "",
    questions: "",
    company: "", // honeypot
  });
  const [isOfferSubmitting, setIsOfferSubmitting] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  const [searchFormData, setSearchFormData] = useState({
    address: "",
    name: "",
    email: "",
    phone: "",
    company: "", // honeypot
  });
  const [isSearchSubmitting, setIsSearchSubmitting] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (offerFormData.company) return; // honeypot

    setIsOfferSubmitting(true);
    try {
      const { error } = await supabase.from("intel_report_leads").insert({
        report_slug: `${reportSlug}-offer-ready`,
        full_name: offerFormData.fullName,
        email: offerFormData.email,
        phone: offerFormData.phone || null,
        page_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });

      if (error) throw error;

      setOfferSubmitted(true);
      toast({
        title: "Request Submitted",
        description: "We'll prepare your offer-ready package and be in touch soon.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOfferSubmitting(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchFormData.company) return; // honeypot

    setIsSearchSubmitting(true);
    try {
      const { error } = await supabase.from("intel_report_leads").insert({
        report_slug: "request-another-address",
        full_name: searchFormData.name,
        email: searchFormData.email,
        phone: searchFormData.phone || null,
        page_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });

      if (error) throw error;

      setSearchSubmitted(true);
      toast({
        title: "Request Submitted",
        description: "We'll send your intelligence report shortly.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearchSubmitting(false);
    }
  };

  const quickSnapshotItems = [
    { label: "Property Type (public record)", value: propertyData.propertyType },
    { label: "Year Built", value: propertyData.yearBuilt },
    { label: "Lot Size", value: propertyData.lotSize },
    { label: "Public Record Market Value", value: propertyData.totalMarketValue },
    { label: "Assessed Value (Land)", value: propertyData.assessedLandValue },
    { label: "Tax Year Shown", value: propertyData.taxYear },
    { label: "Total Taxes", value: propertyData.taxesTotal },
  ];

  const whatThisIncludes = [
    "Clear summary (no fluff)",
    "Land + tax snapshot",
    "Utilities + exemptions shown in record",
    "Value indicators + risk notes",
    "What to confirm before offering",
  ];

  const verifyChecklist = [
    "Confirm MLS description vs public record (structure type, square footage, utilities)",
    `Confirm zoning uses and buildability (${propertyData.zoning})`,
    "Verify well/septic (or feasibility if vacant/land)",
    "Confirm road frontage / access / easements",
    "Confirm survey / boundaries and any wetlands or restrictions",
    "Confirm tax status + exemptions",
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Capital District Nest</title>
        <meta
          name="description"
          content={metaDescription || `Intelligence report for ${propertyData.address}. Verified public record data, tax analysis, and buyer insights.`}
        />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Helmet>

      <MainHeader />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {pageTitle}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                {pageSubtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <FileCheck className="w-4 h-4" />
                  Verified Public Record
                </span>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <MapPin className="w-4 h-4" />
                  Land + Tax Snapshot
                </span>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Shield className="w-4 h-4" />
                  Buyer-Friendly Summary
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section A - Quick Snapshot */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <Home className="w-7 h-7 text-primary" />
                Quick Snapshot
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quickSnapshotItems.map((item, index) => (
                  <Card key={index} className="border-border bg-card">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-lg font-semibold text-foreground">{item.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {propertyData.structureNote && (
                <p className="text-sm text-muted-foreground mt-4 italic">
                  Note: {propertyData.structureNote}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section B - What This Report Includes */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ClipboardCheck className="w-7 h-7 text-primary" />
                What This Report Includes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {whatThisIncludes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section C - Plain-English Summary */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Plain-English Summary
              </h2>
              <Card className="border-border bg-card">
                <CardContent className="p-6 md:p-8">
                  <p className="text-muted-foreground leading-relaxed">
                    This property sits on roughly {propertyData.lotSize} in {propertyData.address.split(",").slice(1).join(",").trim()} with zoning noted as {propertyData.zoning} (per public record). Public record indicates a {propertyData.propertyType.toLowerCase()} property type. Taxes shown for {propertyData.taxYear} total {propertyData.taxesTotal}, with the majority allocated to County + Town + School. This report is designed to give you the "clean facts" fast — and highlight what to verify before making an offer.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section D - Taxes & Exemptions */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <DollarSign className="w-7 h-7 text-primary" />
                Taxes & Exemptions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">{propertyData.taxYear} Tax Breakdown (Public Record)</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">County</span>
                        <span className="text-foreground font-medium">{propertyData.countyTax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Town</span>
                        <span className="text-foreground font-medium">{propertyData.townTax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">School</span>
                        <span className="text-foreground font-medium">{propertyData.schoolTax}</span>
                      </div>
                      <div className="flex justify-between border-t border-border pt-3">
                        <span className="text-foreground font-semibold">Total</span>
                        <span className="text-foreground font-semibold">{propertyData.taxesTotal}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Exemptions (shown)</h3>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{propertyData.exemption}</span>
                      <span className="text-foreground font-medium">{propertyData.exemptionAmount}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Taxes can change with reassessments, exemptions, and municipal rate updates.
              </p>
            </div>
          </div>
        </section>

        {/* Section E - Utilities & Systems */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-7 h-7 text-primary" />
                Utilities & Systems
              </h2>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { label: "Sewer", value: propertyData.sewer },
                      { label: "Water", value: propertyData.water },
                      { label: "Electric", value: propertyData.electric },
                      { label: "Fuel", value: propertyData.fuel },
                      { label: "Heat", value: propertyData.heat },
                    ].map((item, index) => (
                      <div key={index} className="text-center">
                        <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground mt-4">
                Confirm utilities, well/septic condition, and service providers during due diligence.
              </p>
            </div>
          </div>
        </section>

        {/* Section F - Land & Value Indicators */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Land & Value Indicators
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Public Record Land Value</p>
                    <p className="text-3xl font-bold text-foreground">{propertyData.assessedLandValue}</p>
                  </CardContent>
                </Card>
                <Card className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Public Record Total Market Value</p>
                    <p className="text-3xl font-bold text-foreground">{propertyData.totalMarketValue}</p>
                  </CardContent>
                </Card>
              </div>
              {propertyData.rprValueIndicator && (
                <Card className="border-border bg-muted/30 mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <h3 className="font-semibold text-foreground">RPR Value Indicator</h3>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">
                      {propertyData.rprValueIndicator} 
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        (Confidence: {propertyData.rprConfidence})
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                      Automated valuation tools can be off — especially with rural land, mixed property types, or unique parcels.
                    </p>
                  </CardContent>
              </Card>
              )}
            </div>
          </div>
        </section>

        {/* Deep Intelligence Sections - Collapsible */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Deep Intelligence
                </h2>
                <p className="text-muted-foreground">
                  Expand sections below for investor-grade analysis
                </p>
              </div>

              {/* Tax & Assessment Intelligence */}
              <Collapsible>
                <Card className="border-border bg-card overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground text-left">
                          Tax & Assessment Intelligence
                        </h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="p-6 pt-0 border-t border-border">
                      {/* Cards Row */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Assessment Year</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.taxYear}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Assessment Type</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.assessmentType || "Full Market Value"}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Assessment Ratio</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.assessmentRatio || "100%"}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Equalization Rate</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.equalizationRate || "100%"}</p>
                        </div>
                      </div>

                      {/* Expanded Table */}
                      <div className="bg-muted/20 rounded-lg p-4 mb-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-muted-foreground">Land Assessed Value</span>
                            <span className="font-medium text-foreground">{propertyData.assessedLandValue}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-muted-foreground">Total Assessed Value</span>
                            <span className="font-medium text-foreground">{propertyData.totalAssessedValue || propertyData.totalMarketValue}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-muted-foreground">Full Market Value (Tax Basis)</span>
                            <span className="font-medium text-foreground">{propertyData.totalMarketValue}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground">Tax Jurisdictions</span>
                            <span className="font-medium text-foreground">County / Town / School</span>
                          </div>
                        </div>
                      </div>

                      {/* Insight Callout */}
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm text-foreground">
                          <strong>Insight:</strong> {propertyData.taxInsight || `This property is assessed at full market value with a ${parseFloat(propertyData.taxesTotal.replace(/[^0-9.-]+/g, "")) < 1000 ? "low" : "moderate"} total tax burden. Reassessments or exemption changes could impact future taxes.`}
                        </p>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Value & Market Intelligence (RPR) */}
              {propertyData.rprValueIndicator && (
                <Collapsible>
                  <Card className="border-border bg-card overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-semibold text-foreground text-left">
                            Value & Market Intelligence (RPR)
                          </h3>
                        </div>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="p-6 pt-0 border-t border-border">
                        {/* Confidence Meter */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Confidence Score</span>
                            <span className="text-sm font-medium text-foreground">{propertyData.rprConfidence}%</span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all"
                              style={{ width: `${propertyData.rprConfidence}%` }}
                            />
                          </div>
                        </div>

                        {/* Value Display */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {propertyData.rprValueLow && (
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <p className="text-xs text-muted-foreground mb-1">Low Estimate</p>
                              <p className="text-lg font-semibold text-muted-foreground">{propertyData.rprValueLow}</p>
                            </div>
                          )}
                          <div className={`bg-primary/10 rounded-lg p-4 text-center ${!propertyData.rprValueLow ? 'md:col-span-3' : ''}`}>
                            <p className="text-xs text-primary mb-1">RPR Estimated Value</p>
                            <p className="text-2xl font-bold text-primary">{propertyData.rprValueIndicator}</p>
                          </div>
                          {propertyData.rprValueHigh && (
                            <div className="bg-muted/30 rounded-lg p-4 text-center">
                              <p className="text-xs text-muted-foreground mb-1">High Estimate</p>
                              <p className="text-lg font-semibold text-muted-foreground">{propertyData.rprValueHigh}</p>
                            </div>
                          )}
                        </div>

                        {/* AI Interpretation */}
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground">
                              {propertyData.rprInterpretation || "RPR's automated model suggests a significantly higher theoretical value than public tax records. This often occurs with large land parcels or properties with redevelopment or use potential. Verification is recommended."}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )}

              {/* Risk & Verification Signals */}
              <Collapsible>
                <Card className="border-border bg-card overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground text-left">
                          Risk & Verification Signals
                        </h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="p-6 pt-0 border-t border-border">
                      <div className="space-y-3 mb-4">
                        {(propertyData.riskSignals || [
                          { type: "positive" as const, text: `Large acreage (${propertyData.lotSize})` },
                          { type: "warning" as const, text: `Public record lists ${propertyData.propertyType.toLowerCase()} structure` },
                          { type: "warning" as const, text: "Utilities not fully specified" },
                          { type: "warning" as const, text: "MLS description should be confirmed" },
                          { type: "warning" as const, text: `Zoning confirmation recommended (${propertyData.zoning})` },
                        ]).map((signal, index) => (
                          <div key={index} className="flex items-start gap-3">
                            {signal.type === "positive" ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                            )}
                            <span className="text-foreground">{signal.text}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Identifying these items early helps avoid surprises after contract.
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Land & Zoning Context */}
              <Collapsible>
                <Card className="border-border bg-card overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <MapPinned className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground text-left">
                          Land & Zoning Context
                        </h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="p-6 pt-0 border-t border-border">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Zoning Code</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.zoning}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Land Use</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.landUse || "Residential"}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Acreage</p>
                          <p className="text-lg font-semibold text-foreground">{propertyData.lotSize}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Build / Use</p>
                          <p className="text-lg font-semibold text-foreground">Confirm with Town</p>
                        </div>
                      </div>
                      <div className="bg-muted/20 border border-border rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          {propertyData.zoningNote || "Zoning and land use should be confirmed directly with the municipality before planning improvements or development."}
                        </p>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Historical Context */}
              <Collapsible>
                <Card className="border-border bg-card overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <button className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <History className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground text-left">
                          Historical Context
                        </h3>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="p-6 pt-0 border-t border-border">
                      {propertyData.lastSaleDate || propertyData.lastSalePrice ? (
                        <div className="space-y-3">
                          {propertyData.lastSaleDate && (
                            <div className="flex justify-between items-center py-2 border-b border-border">
                              <span className="text-muted-foreground">Last Sale Date</span>
                              <span className="font-medium text-foreground">{propertyData.lastSaleDate}</span>
                            </div>
                          )}
                          {propertyData.lastSalePrice && (
                            <div className="flex justify-between items-center py-2 border-b border-border">
                              <span className="text-muted-foreground">Last Sale Price</span>
                              <span className="font-medium text-foreground">{propertyData.lastSalePrice}</span>
                            </div>
                          )}
                          {propertyData.priorListings && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-muted-foreground">Prior Listings</span>
                              <span className="font-medium text-foreground">{propertyData.priorListings}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          No verified prior sale data found in public records.
                        </p>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* Section G - What To Verify */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ClipboardCheck className="w-7 h-7 text-primary" />
                What To Verify Before You Offer
              </h2>
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {verifyChecklist.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">{index + 1}</span>
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section H - Request Offer-Ready Package CTA */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-background">
                <CardContent className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Want the Offer-Ready Version?
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                      I'll verify the details and send a clean package including comps (if applicable), due diligence notes, and an offer strategy.
                    </p>
                  </div>

                  {offerSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Request Received!</h3>
                      <p className="text-muted-foreground">We'll prepare your offer-ready package and be in touch soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleOfferSubmit} className="space-y-4 max-w-md mx-auto">
                      <input
                        type="text"
                        name="company"
                        value={offerFormData.company}
                        onChange={(e) => setOfferFormData({ ...offerFormData, company: e.target.value })}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          required
                          value={offerFormData.fullName}
                          onChange={(e) => setOfferFormData({ ...offerFormData, fullName: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={offerFormData.email}
                          onChange={(e) => setOfferFormData({ ...offerFormData, email: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={offerFormData.phone}
                          onChange={(e) => setOfferFormData({ ...offerFormData, phone: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="planning">What are you planning?</Label>
                        <Select
                          value={offerFormData.planning}
                          onValueChange={(value) => setOfferFormData({ ...offerFormData, planning: value })}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary-home">Primary Home</SelectItem>
                            <SelectItem value="investment">Investment</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="not-sure">Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timeline">Timeline</Label>
                        <Select
                          value={offerFormData.timeline}
                          onValueChange={(value) => setOfferFormData({ ...offerFormData, timeline: value })}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="30-60">30–60 days</SelectItem>
                            <SelectItem value="60-120">60–120 days</SelectItem>
                            <SelectItem value="researching">Just Researching</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="questions">Questions or properties you want me to analyze?</Label>
                        <Textarea
                          id="questions"
                          value={offerFormData.questions}
                          onChange={(e) => setOfferFormData({ ...offerFormData, questions: e.target.value })}
                          className="bg-background border-border"
                          rows={3}
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={isOfferSubmitting}>
                        <Send className="w-4 h-4 mr-2" />
                        {isOfferSubmitting ? "Submitting..." : "Get Offer-Ready Package"}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        We only use your info to deliver your report and follow up with help. Never sold.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section I - Analyze Another Property */}
        <section className="py-12 md:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-border bg-card">
                <CardContent className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <Search className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Want Information on Another Property?
                    </h2>
                    <p className="text-muted-foreground">
                      Paste any address or Zillow/Realtor link
                    </p>
                  </div>

                  {searchSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Request Received!</h3>
                      <p className="text-muted-foreground">We'll send your intelligence report shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSearchSubmit} className="space-y-4 max-w-md mx-auto">
                      <input
                        type="text"
                        name="company"
                        value={searchFormData.company}
                        onChange={(e) => setSearchFormData({ ...searchFormData, company: e.target.value })}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <div>
                        <Label htmlFor="address">Property Address or Link *</Label>
                        <Input
                          id="address"
                          required
                          placeholder="123 Main St, Albany NY or paste a listing URL"
                          value={searchFormData.address}
                          onChange={(e) => setSearchFormData({ ...searchFormData, address: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="searchName">Name *</Label>
                        <Input
                          id="searchName"
                          required
                          value={searchFormData.name}
                          onChange={(e) => setSearchFormData({ ...searchFormData, name: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="searchEmail">Email *</Label>
                        <Input
                          id="searchEmail"
                          type="email"
                          required
                          value={searchFormData.email}
                          onChange={(e) => setSearchFormData({ ...searchFormData, email: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="searchPhone">Phone *</Label>
                        <Input
                          id="searchPhone"
                          type="tel"
                          required
                          value={searchFormData.phone}
                          onChange={(e) => setSearchFormData({ ...searchFormData, phone: e.target.value })}
                          className="bg-background border-border"
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={isSearchSubmitting}>
                        <Search className="w-4 h-4 mr-2" />
                        {isSearchSubmitting ? "Submitting..." : "Get My Free Intelligence Report"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs text-muted-foreground text-center">
                This is informational and not a substitute for inspections, surveys, zoning verification, or legal advice.
              </p>
            </div>
          </div>
        </section>

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border md:hidden z-50">
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              document.querySelector("#offer-ready-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Request Offer-Ready Package
          </Button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default IntelligenceReportTemplate;
