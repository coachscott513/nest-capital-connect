import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import ReportHero from "./property-intel/ReportHero";
import PropertySnapshot from "./property-intel/PropertySnapshot";
import LocationIntelligence from "./property-intel/LocationIntelligence";
import MarketPulse from "./property-intel/MarketPulse";
import UnlockModal from "./property-intel/UnlockModal";
import PricingIntelligence from "./property-intel/PricingIntelligence";
import ComparableSales from "./property-intel/ComparableSales";
import TaxOwnershipIntel from "./property-intel/TaxOwnershipIntel";
import RiskOpportunitySummary from "./property-intel/RiskOpportunitySummary";
import BuyerActions from "./property-intel/BuyerActions";
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

  const defaultTitle = `${data.address}, ${data.city} ${data.state} — Property Intelligence Report`;
  const defaultDescription = `Independent property intelligence for ${data.address}. Market analysis, comparable sales, tax data, and risk assessment.`;

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
        {/* Hero Section */}
        <ReportHero data={data} onUnlockClick={handleUnlockClick} />

        {/* FREE SECTIONS */}
        <PropertySnapshot data={data} />
        <LocationIntelligence data={data} />
        <MarketPulse data={data} />

        {/* GATE / UNLOCK */}
        {!isUnlocked && (
          <section className="py-20 text-center border-b border-report-border">
            <div className="container mx-auto px-4 max-w-xl">
              <div className="w-16 h-16 rounded-full bg-report-card flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-report-muted"
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
              <h3 className="text-2xl font-light text-report-fg mb-3">
                Continue Reading
              </h3>
              <p className="text-sm text-report-muted mb-8">
                See pricing context, comparable sales, tax analysis, and risk assessment.
              </p>
              <button
                onClick={handleUnlockClick}
                className="bg-report-fg text-report-bg px-8 py-4 rounded-full font-medium hover:bg-report-fg/90 transition-colors"
              >
                Unlock Full Report
              </button>
            </div>
          </section>
        )}

        {/* GATED SECTIONS - Only show when unlocked */}
        {isUnlocked && (
          <>
            <PricingIntelligence data={data} />
            <ComparableSales data={data} />
            <TaxOwnershipIntel data={data} />
            <RiskOpportunitySummary data={data} />
            <BuyerActions townName={data.city} userEmail={userEmail} />
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
