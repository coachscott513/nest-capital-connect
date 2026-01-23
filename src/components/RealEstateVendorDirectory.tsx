import { useState } from "react";
import { 
  Building2, 
  Shield, 
  Scale, 
  Search, 
  BadgeCheck, 
  Phone, 
  ExternalLink,
  Home,
  ClipboardCheck,
  DollarSign,
  Star,
  MapPin,
  Award,
  FileCheck,
  Calendar
} from "lucide-react";
import NestVerifiedBadge from "./NestVerifiedBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Vendor {
  id: string;
  name: string;
  logo?: string;
  category: "mortgage" | "insurance" | "broker" | "attorney" | "inspector";
  description: string;
  specialty: string;
  phone?: string;
  website?: string;
  ctaLabel: string;
  ctaUrl?: string;
  isPreferred: boolean;
  badgeLabel?: "Approved" | "Recommended";
}

interface VendorPhase {
  id: string;
  phase: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  vendors: Vendor[];
}

interface RealEstateVendorDirectoryProps {
  townSlug?: string;
}

// Featured Partner: Courtney B. Parish (Mortgage)
const featuredMortgagePartner = {
  name: "Courtney B. Parish",
  title: "Branch Manager",
  nmls: "NMLS# 56395",
  company: "Homestead Funding Corp.",
  tagline: "Your Local Catskill & Capital District Mortgage Expert",
  bio: "With nearly 20 years of experience, Courtney combines passion and expertise to help our clients achieve homeownership. Her personalized approach and deep knowledge of the Capital District market have earned her over 570 five-star reviews.",
  phone: "(518) 527-3650",
  address: "175 Water Street, Suite 5, Catskill, NY 12414",
  applyUrl: "https://www.homesteadfunding.com/loan-originators/courtney-b-parish",
  reviewCount: 570,
  yearsExperience: 20,
  homeTown: "catskill"
};

// Featured Partner: Rob Field (Insurance)
const featuredInsurancePartner = {
  name: "Rob Field",
  title: "State Farm Agent",
  company: "State Farm Insurance",
  tagline: "15+ Years of Dedicated Service in the Capital District",
  bio: "Rob and his team specialize in personalized protection plans for home, auto, and business. With a 5-star reputation and a deep commitment to the Albany community, they are our top choice for safeguarding your new home.",
  phone: "(518) 389-2886",
  address: "431 New Scotland Ave, Albany, NY 12208",
  quoteUrl: "https://robfieldinsurance.com/",
  reviewCount: 560,
  yearsExperience: 15,
  homeTown: "albany",
  highlight: "Chairman's Circle Qualifier"
};

// Featured Partner: Greg Sanchez (Home Inspector) - EXCLUSIVE
const featuredInspectorPartner = {
  name: "Greg Sanchez",
  title: "Certified Home Inspector",
  company: "Sanchez Home Inspections",
  tagline: "The Inspection Expert | 26+ Years Protecting Capital District Buyers",
  bio: "With over 26 years of structural and environmental assessment experience, Greg is the Capital District's most trusted home inspector. As a 32-year Voorheesville resident, he brings unmatched local knowledge to every inspection—from historic Albany row homes to modern Saratoga builds.",
  phone: "(518) 788-3435",
  address: "Voorheesville, NY 12186",
  portalUrl: "https://www.certifiedhomeinspections.biz/",
  qualificationsUrl: "https://www.certifiedhomeinspections.biz/",
  yearsExperience: 26,
  yearsResident: 32,
  homeTown: "voorheesville",
  licenses: [
    { type: "NYS Home Inspector", number: "#16000010955" },
    { type: "NYS Mold Assessor", number: "#01317" }
  ],
  specialties: ["Structural Assessment", "Environmental Testing", "Mold Inspection", "Radon Testing"],
  nestAdvantage: "Nest clients receive priority scheduling and a dedicated walk-through call"
};

const vendorPhases: VendorPhase[] = [
  {
    id: "getting-ready",
    phase: 1,
    title: "Getting Ready",
    subtitle: "The Money & Protection",
    icon: DollarSign,
    accentColor: "text-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.3)",
    vendors: [
      {
        id: "homestead",
        name: "Homestead Funding",
        category: "mortgage",
        description: "A premier local lender known for personalized service and a deep understanding of the Capital District market. Homestead Funding provides the speed and reliability our clients need to win in today's competitive environment.",
        specialty: "Mortgage & Home Loans",
        phone: "(518) 527-3650",
        website: "https://www.homesteadfunding.com",
        ctaLabel: "Get Pre-Approved",
        ctaUrl: "https://www.homesteadfunding.com/loan-originators/courtney-b-parish",
        isPreferred: true,
        badgeLabel: "Approved"
      },
      {
        id: "broadview",
        name: "Broadview Federal Credit Union",
        category: "mortgage",
        description: "Member-owned credit union offering competitive mortgage rates and personalized service. Strong presence throughout the Capital Region with a commitment to community banking.",
        specialty: "Credit Union Mortgages",
        phone: "(518) 451-0633",
        website: "https://www.broadviewfcu.com",
        ctaLabel: "Meet Christie Hoyt",
        ctaUrl: "https://www.broadviewfcu.com/personal/home-lending-solutions/meet-the-mortgage-team/christie-hoyt/",
        isPreferred: true,
        badgeLabel: "Approved"
      }
    ]
  },
  {
    id: "search-offer",
    phase: 2,
    title: "The Search & Offer",
    subtitle: "The Experts",
    icon: Search,
    accentColor: "text-primary",
    glowColor: "rgba(0, 255, 255, 0.3)",
    vendors: [
      {
        id: "remax",
        name: "RE/MAX Solutions",
        category: "broker",
        description: "The backbone of our local real estate practice. RE/MAX Solutions combines global reach with unmatched local knowledge to deliver results for every buyer and seller we represent.",
        specialty: "Real Estate Brokerage",
        phone: "(518) 676-2347",
        website: "https://capitaldistrictnest.com",
        ctaLabel: "Contact an Agent",
        ctaUrl: "tel:+15186762347",
        isPreferred: true,
        badgeLabel: "Recommended"
      },
      {
        id: "gillberg",
        name: "Gillberg Law",
        category: "attorney",
        description: "Specializing in local real estate law, Gillberg Law ensures every transaction is handled with precision and care. They are our top choice for protecting our clients' interests from contract to closing.",
        specialty: "Real Estate Law",
        phone: "(518) 739-3444",
        website: "https://www.gillberglaw.com",
        ctaLabel: "Meet Gustaf Gillberg",
        ctaUrl: "https://www.gillberglaw.com/staff/gustaf-gillberg/",
        isPreferred: true,
        badgeLabel: "Recommended"
      }
    ]
  },
  {
    id: "due-diligence",
    phase: 3,
    title: "Due Diligence",
    subtitle: "The Check-up",
    icon: ClipboardCheck,
    accentColor: "text-amber-400",
    glowColor: "rgba(251, 191, 36, 0.3)",
    vendors: [
      {
        id: "statefarm",
        name: "State Farm - Rob Field",
        category: "insurance",
        description: "Providing comprehensive home and property protection, Rob Field and his team offer the reliable coverage and local expertise that Capital District homeowners trust. 560+ five-star reviews.",
        specialty: "Homeowners Insurance",
        phone: "(518) 389-2886",
        website: "https://robfieldinsurance.com",
        ctaLabel: "Get a Quote",
        ctaUrl: "https://robfieldinsurance.com/",
        isPreferred: true,
        badgeLabel: "Approved"
      },
      {
        id: "sanchez-inspections",
        name: "Greg Sanchez",
        category: "inspector",
        description: "26+ years of structural and environmental assessment experience. NYS Licensed Home Inspector & Mold Assessor. 32-year Voorheesville resident with unmatched local knowledge.",
        specialty: "Home Inspection",
        phone: "(518) 788-3435",
        website: "https://www.certifiedhomeinspections.biz/",
        ctaLabel: "Book Inspection",
        ctaUrl: "https://www.certifiedhomeinspections.biz/",
        isPreferred: true,
        badgeLabel: "Approved"
      }
    ]
  }
];

const categoryIcons: Record<string, React.ElementType> = {
  mortgage: Building2,
  insurance: Shield,
  broker: Home,
  attorney: Scale,
  inspector: ClipboardCheck
};

const categoryLabels: Record<string, string> = {
  mortgage: "Mortgage",
  insurance: "Insurance",
  broker: "Broker",
  attorney: "Attorney",
  inspector: "Inspector"
};

const RealEstateVendorDirectory = ({ townSlug }: RealEstateVendorDirectoryProps) => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<VendorPhase | null>(null);

  const handleVendorClick = (vendor: Vendor, phase: VendorPhase) => {
    setSelectedVendor(vendor);
    setSelectedPhase(phase);
  };

  // Flatten all vendors for horizontal display
  const allVendors = vendorPhases.flatMap(phase => 
    phase.vendors.map(vendor => ({ ...vendor, phase }))
  );

  // Determine if this is Courtney's home town (Mortgage)
  const isMortgageLocalBranch = townSlug?.toLowerCase() === featuredMortgagePartner.homeTown;
  const mortgagePartnerLabel = isMortgageLocalBranch ? "Local Branch Manager" : "Regional Approved Partner";

  // Determine Rob's label based on location (Insurance)
  const insuranceHomeTowns = ["albany"];
  const insuranceRegionalTowns = ["bethlehem", "guilderland", "troy"];
  const isInsuranceAnchor = townSlug?.toLowerCase() === featuredInsurancePartner.homeTown;
  const isInsuranceRegional = insuranceRegionalTowns.includes(townSlug?.toLowerCase() || "");
  const insurancePartnerLabel = isInsuranceAnchor 
    ? "Anchor Partner" 
    : isInsuranceRegional 
      ? "Premier Regional Partner" 
      : "Recommended Partner";

  // Determine Greg's label based on location (Inspector) - EXCLUSIVE
  const inspectorLocalTowns = ["voorheesville", "altamont", "guilderland", "new-scotland"];
  const inspectorRegionalTowns = ["delmar", "bethlehem", "albany", "colonie"];
  const isInspectorLocal = townSlug?.toLowerCase() === featuredInspectorPartner.homeTown;
  const isInspectorRegional = inspectorLocalTowns.includes(townSlug?.toLowerCase() || "") || 
                               inspectorRegionalTowns.includes(townSlug?.toLowerCase() || "");
  const inspectorPartnerLabel = isInspectorLocal 
    ? "32-Year Local Resident" 
    : isInspectorRegional 
      ? "Exclusive Partner" 
      : "Preferred Partner";
  return (
    <section className="py-16 md:py-20 overflow-hidden relative isolate">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[40px] pointer-events-none" />
      
      <div className="relative z-10 px-4 md:px-[4%] lg:px-[6%]">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <NestVerifiedBadge size="lg" />
          </div>
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            Preferred Partner Network
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-foreground tracking-tight mb-4">
            Your Real Estate Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light mb-3">
            Exclusive professionals for every phase of your home purchase
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto">
            Only one partner per category • Priority scheduling for Nest clients
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED PARTNER SPOTLIGHT - Courtney B. Parish
        ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(52, 211, 153, 0.1) 100%)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              boxShadow: "0 0 40px rgba(52, 211, 153, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            {/* Premium Badge Banner */}
            <div className="bg-gradient-to-r from-emerald-500/20 via-emerald-400/10 to-emerald-500/20 px-6 py-3 border-b border-emerald-400/20">
              <div className="flex items-center justify-center gap-3">
                <Award className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 tracking-wider uppercase">
                  Approved Mortgage Partner
                </span>
                <Award className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Left: Avatar & Quick Stats */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    {/* Avatar Placeholder with Glow */}
                    <div 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-400/30 to-emerald-600/20"
                      style={{
                        boxShadow: "0 0 30px rgba(52, 211, 153, 0.4)",
                        border: "2px solid rgba(52, 211, 153, 0.5)"
                      }}
                    >
                      <Building2 className="w-12 h-12 md:w-14 md:h-14 text-emerald-400" />
                    </div>
                    
                    {/* Local/Regional Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isMortgageLocalBranch ? 'bg-emerald-500/30 border-emerald-400/50' : 'bg-primary/20 border-primary/30'} border`}>
                      <MapPin className={`w-3.5 h-3.5 ${isMortgageLocalBranch ? 'text-emerald-400' : 'text-primary'}`} />
                      <span className={`text-xs font-semibold ${isMortgageLocalBranch ? 'text-emerald-400' : 'text-primary'}`}>
                        {mortgagePartnerLabel}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-bold text-lg">{featuredMortgagePartner.reviewCount}+</span>
                        </div>
                        <span className="text-xs text-muted-foreground">5-Star Reviews</span>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div>
                        <span className="font-bold text-lg text-foreground">{featuredMortgagePartner.yearsExperience}</span>
                        <span className="text-xs text-muted-foreground block">Years Exp.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 space-y-4">
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                      {featuredMortgagePartner.name}
                    </h3>
                    <p className="text-emerald-400 font-medium">
                      {featuredMortgagePartner.title} | {featuredMortgagePartner.nmls}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {featuredMortgagePartner.company}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="text-lg text-foreground/90 font-light italic border-l-2 border-emerald-400/50 pl-4">
                    "{featuredMortgagePartner.tagline}"
                  </p>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredMortgagePartner.bio}
                  </p>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400/70" />
                    <span>{featuredMortgagePartner.address}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a 
                      href={featuredMortgagePartner.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        className="w-full h-12 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    </a>
                    <a 
                      href={`tel:${featuredMortgagePartner.phone.replace(/[^0-9]/g, '')}`}
                      className="flex-1"
                    >
                      <Button 
                        variant="outline"
                        className="w-full h-12 text-base font-semibold border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {featuredMortgagePartner.phone}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED PARTNER SPOTLIGHT - Rob Field (Insurance)
        ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-10 md:mb-14"
        >
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(251, 191, 36, 0.1) 100%)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(251, 191, 36, 0.3)",
              boxShadow: "0 0 40px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            {/* Premium Badge Banner */}
            <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 px-6 py-3 border-b border-amber-400/20">
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400 tracking-wider uppercase">
                  Recommended Insurance Partner
                </span>
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Left: Avatar & Quick Stats */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    {/* Avatar Placeholder with Glow */}
                    <div 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-400/30 to-amber-600/20"
                      style={{
                        boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)",
                        border: "2px solid rgba(251, 191, 36, 0.5)"
                      }}
                    >
                      <Shield className="w-12 h-12 md:w-14 md:h-14 text-amber-400" />
                    </div>
                    
                    {/* Location Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isInsuranceAnchor ? 'bg-amber-500/30 border-amber-400/50' : isInsuranceRegional ? 'bg-amber-400/20 border-amber-400/40' : 'bg-primary/20 border-primary/30'} border`}>
                      <MapPin className={`w-3.5 h-3.5 ${isInsuranceAnchor || isInsuranceRegional ? 'text-amber-400' : 'text-primary'}`} />
                      <span className={`text-xs font-semibold ${isInsuranceAnchor || isInsuranceRegional ? 'text-amber-400' : 'text-primary'}`}>
                        {insurancePartnerLabel}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-bold text-lg">{featuredInsurancePartner.reviewCount}+</span>
                        </div>
                        <span className="text-xs text-muted-foreground">5-Star Reviews</span>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div>
                        <span className="font-bold text-lg text-foreground">{featuredInsurancePartner.yearsExperience}+</span>
                        <span className="text-xs text-muted-foreground block">Years Exp.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 space-y-4">
                  {/* Name & Title */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                      {featuredInsurancePartner.name}
                    </h3>
                    <p className="text-amber-400 font-medium">
                      {featuredInsurancePartner.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {featuredInsurancePartner.company}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="text-lg text-foreground/90 font-light italic border-l-2 border-amber-400/50 pl-4">
                    "{featuredInsurancePartner.tagline}"
                  </p>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredInsurancePartner.bio}
                  </p>

                  {/* Highlight Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-medium text-amber-400">{featuredInsurancePartner.highlight}</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400/70" />
                    <span>{featuredInsurancePartner.address}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a 
                      href={featuredInsurancePartner.quoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        className="w-full h-12 text-base font-semibold bg-amber-500 hover:bg-amber-600 text-black"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Get a Personal Price Plan
                      </Button>
                    </a>
                    <a 
                      href={`tel:${featuredInsurancePartner.phone.replace(/[^0-9]/g, '')}`}
                      className="flex-1"
                    >
                      <Button 
                        variant="outline"
                        className="w-full h-12 text-base font-semibold border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {featuredInsurancePartner.phone}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED PARTNER SPOTLIGHT - Greg Sanchez (Home Inspector) - EXCLUSIVE
        ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10 md:mb-14"
        >
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0, 255, 255, 0.12) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 255, 255, 0.08) 100%)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(0, 255, 255, 0.25)",
              boxShadow: "0 0 50px rgba(0, 255, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)"
            }}
          >
            {/* Premium Badge Banner - EXCLUSIVE */}
            <div className="bg-gradient-to-r from-cyan-500/15 via-cyan-400/5 to-cyan-500/15 px-6 py-3 border-b border-cyan-400/20">
              <div className="flex items-center justify-center gap-4">
                <NestVerifiedBadge size="sm" showText={false} />
                <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">
                  Exclusive Inspection Partner
                </span>
                <NestVerifiedBadge size="sm" showText={false} />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Left: Avatar & Quick Stats */}
                <div className="flex-shrink-0 w-full md:w-auto">
                  <div className="flex flex-col items-center md:items-start gap-4">
                    {/* Avatar with Glow */}
                    <div 
                      className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400/20 to-cyan-600/10"
                      style={{
                        boxShadow: "0 0 35px rgba(0, 255, 255, 0.35)",
                        border: "2px solid rgba(0, 255, 255, 0.4)"
                      }}
                    >
                      <ClipboardCheck className="w-12 h-12 md:w-14 md:h-14 text-cyan-400" />
                    </div>
                    
                    {/* Location Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isInspectorLocal ? 'bg-cyan-500/30 border-cyan-400/50' : isInspectorRegional ? 'bg-cyan-400/20 border-cyan-400/40' : 'bg-primary/20 border-primary/30'} border`}>
                      <MapPin className={`w-3.5 h-3.5 ${isInspectorLocal || isInspectorRegional ? 'text-cyan-400' : 'text-primary'}`} />
                      <span className={`text-xs font-semibold ${isInspectorLocal || isInspectorRegional ? 'text-cyan-400' : 'text-primary'}`}>
                        {inspectorPartnerLabel}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4 text-center">
                      <div>
                        <span className="font-bold text-lg text-foreground">{featuredInspectorPartner.yearsExperience}</span>
                        <span className="text-xs text-muted-foreground block">Years Exp.</span>
                      </div>
                      <div className="w-px bg-white/10" />
                      <div>
                        <span className="font-bold text-lg text-foreground">{featuredInspectorPartner.yearsResident}</span>
                        <span className="text-xs text-muted-foreground block">Years Local</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 space-y-4">
                  {/* Name & Title */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                        {featuredInspectorPartner.name}
                      </h3>
                      <NestVerifiedBadge size="md" />
                    </div>
                    <p className="text-cyan-400 font-medium">
                      {featuredInspectorPartner.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {featuredInspectorPartner.company}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="text-lg text-foreground/90 font-light italic border-l-2 border-cyan-400/50 pl-4">
                    "{featuredInspectorPartner.tagline}"
                  </p>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredInspectorPartner.bio}
                  </p>

                  {/* License Badges */}
                  <div className="flex flex-wrap gap-2">
                    {featuredInspectorPartner.licenses.map((license, idx) => (
                      <div 
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/25"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-medium text-cyan-300">
                          {license.type}: {license.number}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Nest Advantage Callout */}
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.4) 100%)",
                      border: "1px solid rgba(0, 255, 255, 0.15)"
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-semibold text-cyan-400 block mb-1">The Nest Advantage</span>
                        <span className="text-sm text-muted-foreground">{featuredInspectorPartner.nestAdvantage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400/70" />
                    <span>{featuredInspectorPartner.address}</span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a 
                      href={featuredInspectorPartner.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        className="w-full h-12 text-base font-semibold bg-cyan-500 hover:bg-cyan-600 text-black"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Inspection
                      </Button>
                    </a>
                    <a 
                      href={featuredInspectorPartner.qualificationsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button 
                        variant="outline"
                        className="w-full h-12 text-base font-semibold border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Qualifications
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {allVendors.map((vendor, index) => {
              const CategoryIcon = categoryIcons[vendor.category];
              const phase = vendor.phase;
              
              return (
                <motion.button
                  key={vendor.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleVendorClick(vendor, phase)}
                  className="flex-shrink-0 w-[160px] snap-start text-left p-4 rounded-2xl transition-all duration-300"
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(25px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Icon */}
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${phase.accentColor}`}
                    style={{
                      background: `linear-gradient(135deg, ${phase.glowColor}, transparent)`,
                      boxShadow: `0 0 15px ${phase.glowColor}`
                    }}
                  >
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    {vendor.isPreferred && vendor.badgeLabel && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold mb-2">
                        <BadgeCheck className="w-3 h-3" />
                        <span>{vendor.badgeLabel}</span>
                      </div>
                    )}
                    <span className="block font-semibold text-foreground text-sm leading-tight mb-1">
                      {vendor.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {vendor.specialty}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Scroll hint */}
          <p className="text-center text-xs text-muted-foreground mt-2">
            ← Swipe to see all partners →
          </p>
        </div>

        {/* Desktop: 3-Column Phase Layout */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
          {vendorPhases.map((phase, phaseIndex) => {
            const PhaseIcon = phase.icon;
            
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: phaseIndex * 0.1 }}
                className="relative"
              >
                {/* Phase Card */}
                <div 
                  className="relative rounded-3xl overflow-hidden h-full"
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(25px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Phase Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-4 mb-3">
                      <div 
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${phase.accentColor}`}
                        style={{
                          background: `linear-gradient(135deg, ${phase.glowColor}, transparent)`,
                          boxShadow: `0 0 20px ${phase.glowColor}`
                        }}
                      >
                        <PhaseIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Phase {phase.phase}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground">
                          {phase.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground font-light">
                      {phase.subtitle}
                    </p>
                  </div>

                  {/* Vendors */}
                  <div className="p-4 space-y-3">
                    {phase.vendors.map((vendor) => {
                      const CategoryIcon = categoryIcons[vendor.category];
                      
                      return (
                        <button
                          key={vendor.id}
                          onClick={() => handleVendorClick(vendor, phase)}
                          className="w-full text-left p-4 rounded-2xl transition-all duration-300 group hover:scale-[1.02]"
                          style={{
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.08)"
                          }}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div 
                              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${phase.accentColor} group-hover:scale-110 transition-transform`}
                              style={{
                                background: `linear-gradient(135deg, ${phase.glowColor}, transparent)`
                              }}
                            >
                              <CategoryIcon className="w-5 h-5" />
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {vendor.isPreferred && vendor.badgeLabel && (
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold mb-1">
                                  <BadgeCheck className="w-3 h-3" />
                                  <span>{vendor.badgeLabel}</span>
                                </div>
                              )}
                              <span className="block font-semibold text-foreground">
                                {vendor.name}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {vendor.specialty}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-muted-foreground text-sm md:text-base mb-4">
            Need a specific recommendation? Our team knows the best partners for your situation.
          </p>
          <a href="tel:+15186718048">
            <Button 
              size="lg"
              className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact an Agent
            </Button>
          </a>
        </div>
      </div>

      {/* Vendor Detail Sheet */}
      <Sheet open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <SheetContent 
          side="right" 
          className="w-full sm:max-w-lg border-l border-white/10 overflow-y-auto"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(30px)"
          }}
        >
          {selectedVendor && selectedPhase && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedPhase.accentColor}`}
                    style={{
                      background: `linear-gradient(135deg, ${selectedPhase.glowColor}, transparent)`,
                      boxShadow: `0 0 25px ${selectedPhase.glowColor}`
                    }}
                  >
                    {(() => {
                      const CategoryIcon = categoryIcons[selectedVendor.category];
                      return <CategoryIcon className="w-7 h-7" />;
                    })()}
                  </div>
                  <div>
                    <SheetTitle className="text-2xl font-semibold text-foreground">
                      {selectedVendor.name}
                    </SheetTitle>
                    <p className={`text-sm ${selectedPhase.accentColor}`}>
                      {categoryLabels[selectedVendor.category]}
                    </p>
                  </div>
                </div>
                
                {selectedVendor.isPreferred && selectedVendor.badgeLabel && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium">
                      {selectedVendor.badgeLabel} Partner
                    </span>
                  </div>
                )}
              </SheetHeader>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    About
                  </h4>
                  <p className="text-foreground/90 leading-relaxed">
                    {selectedVendor.description}
                  </p>
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  {/* Primary CTA */}
                  {selectedVendor.ctaUrl && (
                    <a 
                      href={selectedVendor.ctaUrl}
                      target={selectedVendor.ctaUrl.startsWith("tel:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        className="w-full h-12 text-base font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${selectedPhase.glowColor}, transparent)`,
                          boxShadow: `0 0 20px ${selectedPhase.glowColor}`
                        }}
                      >
                        {selectedVendor.ctaLabel}
                      </Button>
                    </a>
                  )}

                  {/* Phone */}
                  {selectedVendor.phone && (
                    <a href={`tel:${selectedVendor.phone.replace(/\D/g, "")}`} className="block">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {selectedVendor.phone}
                      </Button>
                    </a>
                  )}

                  {/* Website */}
                  {selectedVendor.website && (
                    <a 
                      href={selectedVendor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </a>
                  )}
                </div>

                {/* Trust Note */}
                {selectedVendor.isPreferred && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground italic">
                      "I've worked with {selectedVendor.name} on multiple transactions. 
                      They deliver reliable service and understand the Capital District market."
                    </p>
                    <p className="text-xs text-primary mt-2 font-medium">
                      — Scott Alvarez, Capital District Nest
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default RealEstateVendorDirectory;
