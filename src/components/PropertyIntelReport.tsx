import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import ReportHero from "./property-intel/ReportHero";
import PropertySnapshot from "./property-intel/PropertySnapshot";
import WhatYoureBuying from "./property-intel/WhatYoureBuying";
import FinancialReality from "./property-intel/FinancialReality";
import MarketPulse from "./property-intel/MarketPulse";
import ComparableSales from "./property-intel/ComparableSales";
import RiskOpportunitySummary from "./property-intel/RiskOpportunitySummary";
import LocationIntelligence from "./property-intel/LocationIntelligence";
import BuyerActions from "./property-intel/BuyerActions";
import ReportDisclosure from "./property-intel/ReportDisclosure";
import UnlockModal from "./property-intel/UnlockModal";
import Footer from "./Footer";

import { PropertyIntelData, LeadFormData } from "./property-intel/types";

interface PropertyIntelReportProps {
  data: PropertyIntelData;
  reportSlug: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
}

const PropertyIntelReport = ({
  data,
  reportSlug,
  metaTitle,
  metaDescription,
  canonicalUrl,
}: PropertyIntelReportProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>();

  // Check for stored unlock state
  useEffect(() => {
    const storedUnlock = localStorage.getItem(`intel-unlock-${reportSlug}`);
    if (storedUnlock) {
      const { unlocked, email } = JSON.parse(storedUnlock);
      setIsUnlocked(unlocked);
      setUserEmail(email);
    }
  }, [reportSlug]);

  const handleUnlockClick = () => {
    setShowModal(true);
  };

  const handleUnlockSubmit = async (formData: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("intel_report_leads").insert({
        report_slug: reportSlug,
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        page_url: window.location.href,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      });

      if (error) throw error;

      // Store unlock state
      localStorage.setItem(
        `intel-unlock-${reportSlug}`,
        JSON.stringify({ unlocked: true, email: formData.email })
      );

      setIsUnlocked(true);
      setUserEmail(formData.email);
      setShowModal(false);

      toast({
        title: "Report Unlocked",
        description: "You now have full access to the property intelligence.",
      });
    } catch (error) {
      console.error("Error unlocking report:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic meta based on locked/unlocked state
  const defaultTitle = isUnlocked 
    ? `${data.address}, ${data.city} ${data.state} — Property Intelligence Report`
    : `Sample Property Intelligence Report — Methodology Preview`;
  const defaultDescription = isUnlocked
    ? `Independent property intelligence for ${data.address}. Market analysis, comparable sales, tax data, and risk assessment.`
    : `See what a Property Intelligence Report includes. Market analysis, comparable sales, financial reality, and risk assessment.`;

  return (
    <>
      <Helmet>
        <title>{metaTitle || defaultTitle} | Capital District Nest</title>
        <meta name="description" content={metaDescription || defaultDescription} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={metaTitle || defaultTitle} />
        <meta property="og:description" content={metaDescription || defaultDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-report-bg">
        {/* HERO - Title & Basic Info */}
        <ReportHero data={data} onUnlockClick={handleUnlockClick} isUnlocked={isUnlocked} />

        {/* SECTION 1: Property Snapshot (FREE) */}
        <PropertySnapshot data={data} isUnlocked={isUnlocked} />
        
        {/* SECTION 2: What You're Actually Buying (FREE preview, full narrative gated) */}
        <WhatYoureBuying data={data} isUnlocked={isUnlocked} />
        
        {/* SECTION 3: Financial Reality (GATED) */}
        <FinancialReality data={data} isUnlocked={isUnlocked} />

        {/* GATE / UNLOCK CTA */}
        {!isUnlocked && (
          <section className="py-24 md:py-32 text-center bg-report-section-dark">
            <div className="container mx-auto px-4 max-w-xl">
              <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-9 h-9 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                Full Report Access
              </p>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4">
                Unlock Complete Intelligence
              </h3>
              <p className="text-sm text-white/50 mb-8 max-w-md mx-auto">
                Get full market context, comparable sales, tax analysis, upside & risk assessment, and next steps.
              </p>
              <button
                onClick={handleUnlockClick}
                className="bg-white text-report-section-dark px-10 py-4 rounded-full font-medium hover:bg-white/90 transition-all shadow-lg shadow-black/20"
              >
                Request Full Property Intelligence
              </button>
              <p className="text-xs text-white/40 mt-8 max-w-sm mx-auto italic">
                This is a preview of the Property Intelligence format.<br />
                Actual reports are generated per property upon request.
              </p>
            </div>
          </section>
        )}

        {/* GATED SECTIONS - Only show when unlocked */}
        {isUnlocked && (
          <>
            {/* SECTION 4: Market Context */}
            <MarketPulse data={data} isUnlocked={isUnlocked} />
            <ComparableSales data={data} />
            
            {/* SECTION 5: Upside & Risk */}
            <RiskOpportunitySummary data={data} />
            
            {/* SECTION 6: Location Intelligence */}
            <LocationIntelligence data={data} isUnlocked={isUnlocked} />
            
            {/* SECTION 7: What To Do Next */}
            <BuyerActions townName={data.city} userEmail={userEmail} />
            
            {/* SECTION 8: Disclosure */}
            <ReportDisclosure />
          </>
        )}

        {/* Unlock Modal */}
        <UnlockModal
          open={showModal}
          onOpenChange={setShowModal}
          onSubmit={handleUnlockSubmit}
          isSubmitting={isSubmitting}
        />
      </main>

      <Footer />
    </>
  );
};

export default PropertyIntelReport;
