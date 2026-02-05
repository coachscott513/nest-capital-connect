import { useState, useEffect } from "react";
import { X, FileText, ChevronRight, ChevronDown, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BrandingData {
  displayName: string;
  companyName: string;
  title: string;
  businessPhone: string;
  businessEmail: string;
  website: string;
  nmls: string;
  companyNmls: string;
  license: string;
  brokerage: string;
}

interface AnalysisData {
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  askingPrice: number;
  loanType: string;
  capRate: number;
  monthlyCashFlow: number;
  noi: number;
  cashToClose: number;
}

interface BrandedReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePdf: (branding: BrandingData | null) => void;
  analysisData: AnalysisData;
}

const USER_TYPES = [
  "Property Investor",
  "First-Time Home Buyer",
  "Real Estate Agent",
  "Loan Officer / Mortgage Professional",
  "Just Browsing",
];

const STORAGE_KEY = "analyzerUser";

const BrandedReportModal = ({ isOpen, onClose, onGeneratePdf, analysisData }: BrandedReportModalProps) => {
  // Contact info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  
  // Branding section
  const [brandingExpanded, setBrandingExpanded] = useState(false);
  const [branding, setBranding] = useState<BrandingData>({
    displayName: "",
    companyName: "",
    title: "",
    businessPhone: "",
    businessEmail: "",
    website: "",
    nmls: "",
    companyNmls: "",
    license: "",
    brokerage: "",
  });
  
  // Form state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  
  // UTM params
  const [utmParams, setUtmParams] = useState({ source: "", medium: "", campaign: "" });

  // Load saved data and UTM params on mount
  useEffect(() => {
    // Parse UTM parameters
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      source: params.get("utm_source") || "",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
    });

    // Load saved user data
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setUserType(data.userType || "");
        setBranding({
          displayName: data.brandingName || "",
          companyName: data.brandingCompany || "",
          title: data.brandingTitle || "",
          businessPhone: data.brandingPhone || "",
          businessEmail: data.brandingEmail || "",
          website: data.brandingWebsite || "",
          nmls: data.brandingNmls || "",
          companyNmls: data.brandingCompanyNmls || "",
          license: data.brandingLicense || "",
          brokerage: data.brandingBrokerage || "",
        });
        setIsReturningUser(true);
      } catch (e) {
        console.error("Error loading saved data:", e);
      }
    }
  }, []);

  // Auto-expand branding for agents and LOs
  useEffect(() => {
    if (userType === "Real Estate Agent" || userType === "Loan Officer / Mortgage Professional") {
      setBrandingExpanded(true);
    }
  }, [userType]);

  // Pre-fill display name and business email when contact info changes
  useEffect(() => {
    if (!branding.displayName && fullName) {
      setBranding(prev => ({ ...prev, displayName: fullName }));
    }
    if (!branding.businessEmail && email) {
      setBranding(prev => ({ ...prev, businessEmail: email }));
    }
  }, [fullName, email]);

  // Format phone number as user types
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string, setter: (v: string) => void) => {
    setter(formatPhone(value));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName || fullName.length < 2) {
      newErrors.fullName = "Please enter your full name";
    } else if (/\d/.test(fullName)) {
      newErrors.fullName = "Name should not contain numbers";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (phone) {
      const digits = phone.replace(/\D/g, "");
      if (digits.length !== 10 && digits.length !== 11) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }
    
    if (!userType) {
      newErrors.userType = "Please select your role";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasCustomBranding = () => {
    return Object.values(branding).some(v => v.trim() !== "");
  };

  const handleSubmit = async () => {
    if (!validate()) {
      // Shake animation trigger (handled by CSS)
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Save to Supabase
      const { error } = await supabase.from("analyzer_leads").insert({
        full_name: fullName,
        email: email,
        phone: phone || null,
        user_type: userType,
        property_address: analysisData.propertyAddress,
        property_city: analysisData.propertyCity,
        property_state: analysisData.propertyState,
        asking_price: analysisData.askingPrice,
        loan_type: analysisData.loanType,
        cap_rate: analysisData.capRate,
        monthly_cash_flow: analysisData.monthlyCashFlow,
        noi: analysisData.noi,
        cash_to_close: analysisData.cashToClose,
        branding_name: branding.displayName || null,
        branding_company: branding.companyName || null,
        branding_title: branding.title || null,
        branding_phone: branding.businessPhone || null,
        branding_email: branding.businessEmail || null,
        branding_website: branding.website || null,
        branding_nmls: branding.nmls || null,
        branding_company_nmls: branding.companyNmls || null,
        branding_license: branding.license || null,
        branding_brokerage: branding.brokerage || null,
        has_custom_branding: hasCustomBranding(),
        source_url: window.location.href,
        utm_source: utmParams.source || null,
        utm_medium: utmParams.medium || null,
        utm_campaign: utmParams.campaign || null,
        report_sent: false,
      });

      if (error) {
        console.error("Error saving lead:", error);
        // Continue with PDF generation even if save fails
      }

      // Save to localStorage for returning visitors
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        fullName, email, phone, userType,
        brandingName: branding.displayName,
        brandingCompany: branding.companyName,
        brandingTitle: branding.title,
        brandingPhone: branding.businessPhone,
        brandingEmail: branding.businessEmail,
        brandingWebsite: branding.website,
        brandingNmls: branding.nmls,
        brandingCompanyNmls: branding.companyNmls,
        brandingLicense: branding.license,
        brandingBrokerage: branding.brokerage,
      }));

      // Generate PDF with branding
      onGeneratePdf(hasCustomBranding() ? branding : null);
      
      setIsSuccess(true);
      
      // Close modal after success
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 1500);
      
    } catch (err) {
      console.error("Error:", err);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isLoanOfficer = userType === "Loan Officer / Mortgage Professional";
  const isAgent = userType === "Real Estate Agent";

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
    >
      <div 
        className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-xl"
        style={{
          background: "#0f1729",
          border: "1px solid #1e3a5f",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Gold accent line */}
        <div className="h-[3px] bg-[#c9a84c]" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8a8a9e] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-[#00e5ff]" />
            <h2 className="text-xl font-bold text-white">
              {isReturningUser ? "Welcome back! Generate another report?" : "Get Your Investment Analysis"}
            </h2>
          </div>
          <p className="text-[#8a8a9e] text-sm mb-6">
            Enter your details below. Want your name and brand on the report? Fill in the optional fields.
          </p>
          
          {/* Section A: Your Information */}
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className={`w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e] transition-all ${
                  errors.fullName 
                    ? "border-red-500 focus:ring-red-500/20" 
                    : "border-[#2a3a58] focus:border-[#00e5ff] focus:ring-[#00e5ff]/20"
                }`}
                style={{
                  background: "#1a2a48",
                  border: `1px solid ${errors.fullName ? "#ef4444" : "#2a3a58"}`,
                }}
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e] transition-all"
                style={{
                  background: "#1a2a48",
                  border: `1px solid ${errors.email ? "#ef4444" : "#2a3a58"}`,
                }}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">
                Phone Number <span className="text-[#5a6a8e]">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value, setPhone)}
                placeholder="(518) 555-1234"
                className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e] transition-all"
                style={{
                  background: "#1a2a48",
                  border: `1px solid ${errors.phone ? "#ef4444" : "#2a3a58"}`,
                }}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
            
            {/* User Type */}
            <div>
              <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">
                I am a... <span className="text-red-400">*</span>
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm text-white transition-all appearance-none cursor-pointer"
                style={{
                  background: "#1a2a48",
                  border: `1px solid ${errors.userType ? "#ef4444" : "#2a3a58"}`,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235a6a8e'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "20px",
                }}
              >
                <option value="" className="bg-[#1a2a48]">Select your role...</option>
                {USER_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#1a2a48]">{type}</option>
                ))}
              </select>
              {errors.userType && <p className="text-red-400 text-xs mt-1">{errors.userType}</p>}
            </div>
          </div>
          
          {/* Section B: Brand This Report (Collapsible) */}
          <div className="mt-6 pt-6 border-t border-[#2a3a58]">
            <button
              onClick={() => setBrandingExpanded(!brandingExpanded)}
              className="flex items-center gap-2 text-[#00e5ff] text-sm font-medium hover:underline"
            >
              {brandingExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              ✨ Want your name & company on this report?
            </button>
            
            {(isAgent || isLoanOfficer) && brandingExpanded && (
              <p className="text-[#8a8a9e] text-xs mt-2 ml-6">
                Nice! Add your info below and it'll appear on the PDF header, footer, and contact sections.
              </p>
            )}
            
            {brandingExpanded && (
              <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
                {/* Display Name */}
                <div>
                  <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Display Name</label>
                  <input
                    type="text"
                    value={branding.displayName}
                    onChange={(e) => setBranding({ ...branding, displayName: e.target.value })}
                    placeholder="e.g., Joel S. Casso"
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                    style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                  />
                </div>
                
                {/* Company Name */}
                <div>
                  <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    value={branding.companyName}
                    onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                    placeholder="e.g., US Mortgage Corporation"
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                    style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                  />
                </div>
                
                {/* Title */}
                <div>
                  <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Your Title</label>
                  <input
                    type="text"
                    value={branding.title}
                    onChange={(e) => setBranding({ ...branding, title: e.target.value })}
                    placeholder="e.g., Branch Manager, Senior Agent"
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                    style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                  />
                </div>
                
                {/* Business Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Business Phone</label>
                    <input
                      type="tel"
                      value={branding.businessPhone}
                      onChange={(e) => handlePhoneChange(e.target.value, (v) => setBranding({ ...branding, businessPhone: v }))}
                      placeholder="Office or direct line"
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                      style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Business Email</label>
                    <input
                      type="email"
                      value={branding.businessEmail}
                      onChange={(e) => setBranding({ ...branding, businessEmail: e.target.value })}
                      placeholder="you@yourcompany.com"
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                      style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                    />
                  </div>
                </div>
                
                {/* Website */}
                <div>
                  <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Website URL</label>
                  <input
                    type="url"
                    value={branding.website}
                    onChange={(e) => setBranding({ ...branding, website: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                    style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                  />
                </div>
                
                {/* Loan Officer specific fields */}
                {isLoanOfficer && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">NMLS #</label>
                      <input
                        type="text"
                        value={branding.nmls}
                        onChange={(e) => setBranding({ ...branding, nmls: e.target.value })}
                        placeholder="e.g., 65174"
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                        style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Company NMLS #</label>
                      <input
                        type="text"
                        value={branding.companyNmls}
                        onChange={(e) => setBranding({ ...branding, companyNmls: e.target.value })}
                        placeholder="e.g., 3901"
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                        style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Agent specific fields */}
                {isAgent && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">License #</label>
                      <input
                        type="text"
                        value={branding.license}
                        onChange={(e) => setBranding({ ...branding, license: e.target.value })}
                        placeholder="Your state license number"
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                        style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[#b0b8cc] text-xs font-semibold mb-1">Brokerage</label>
                      <input
                        type="text"
                        value={branding.brokerage}
                        onChange={(e) => setBranding({ ...branding, brokerage: e.target.value })}
                        placeholder="e.g., RE/MAX Solutions"
                        className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-[#5a6a8e]"
                        style={{ background: "#1a2a48", border: "1px solid #2a3a58" }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Live Branding Preview */}
                <div 
                  className="mt-4 p-4 rounded-lg border-t-2 border-[#c9a84c]"
                  style={{ background: "#1a2a48" }}
                >
                  <p className="text-[#8a8a9e] text-[10px] uppercase tracking-wider mb-2">Report Preview</p>
                  <div className="text-white">
                    <p className="font-semibold">
                      {branding.displayName || "Your Name"}
                    </p>
                    {(branding.title || branding.nmls || branding.license) && (
                      <p className="text-[#c9a84c] text-sm">
                        {[
                          branding.title,
                          branding.nmls && `NMLS# ${branding.nmls}`,
                          branding.license && `Lic# ${branding.license}`
                        ].filter(Boolean).join(" | ")}
                      </p>
                    )}
                    {branding.companyName && (
                      <p className="text-sm">{branding.companyName}</p>
                    )}
                    {(branding.businessPhone || branding.businessEmail) && (
                      <p className="text-[#8a8a9e] text-xs mt-1">
                        {[branding.businessPhone, branding.businessEmail].filter(Boolean).join(" | ")}
                      </p>
                    )}
                  </div>
                  <p className="text-[#5a6a8e] text-xs mt-3 pt-2 border-t border-[#2a3a58]">
                    Powered by AnalyzeAnyDeal.com
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isSuccess}
              className={`w-full py-3 px-6 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isSuccess 
                  ? "bg-green-500 text-white" 
                  : isSubmitting 
                    ? "bg-[#00e5ff]/70 text-[#0a1628] cursor-not-allowed" 
                    : "bg-[#00e5ff] text-[#0a1628] hover:bg-[#00d4ee]"
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Done! Your report is ready.
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating your report...
                </>
              ) : (
                <>
                  {hasCustomBranding() ? "Generate My Branded Report →" : "Generate My Report →"}
                </>
              )}
            </button>
            
            <p className="text-[#6a6a7e] text-xs text-center mt-3">
              Free reports include "Powered by AnalyzeAnyDeal.com" branding.
            </p>
            <p className="text-[#6a6a7e] text-xs text-center">
              Want premium branding without the watermark? <span className="text-[#00e5ff] cursor-pointer hover:underline">Contact us.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandedReportModal;
