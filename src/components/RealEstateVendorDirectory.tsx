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
  DollarSign
} from "lucide-react";
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
        description: "Local mortgage experts with 25+ years serving the Capital District. Specializing in first-time buyers, investment properties, and complex financing.",
        specialty: "Mortgage & Home Loans",
        phone: "518-464-1100",
        website: "https://www.homesteadfunding.com",
        ctaLabel: "Get Pre-Approved",
        ctaUrl: "https://www.homesteadfunding.com/apply",
        isPreferred: true
      },
      {
        id: "broadview",
        name: "Broadview Federal Credit Union",
        category: "mortgage",
        description: "Member-owned credit union offering competitive mortgage rates and personalized service. Strong presence throughout the Capital Region.",
        specialty: "Credit Union Mortgages",
        phone: "518-456-3300",
        website: "https://www.broadviewfcu.com",
        ctaLabel: "Check Rates",
        ctaUrl: "https://www.broadviewfcu.com/mortgages",
        isPreferred: true
      },
      {
        id: "statefarm",
        name: "State Farm",
        category: "insurance",
        description: "Comprehensive homeowners insurance with local agents throughout the Capital District. Bundle home and auto for maximum savings.",
        specialty: "Homeowners Insurance",
        phone: "518-555-0100",
        website: "https://www.statefarm.com",
        ctaLabel: "Request a Quote",
        ctaUrl: "https://www.statefarm.com/get-a-quote",
        isPreferred: true
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
        description: "Capital District Nest operates under RE/MAX Solutions, bringing global reach with hyperlocal expertise. Full-service representation for buyers and sellers.",
        specialty: "Real Estate Brokerage",
        phone: "518-671-8048",
        website: "https://capitaldistrictnest.com",
        ctaLabel: "Schedule Consultation",
        ctaUrl: "tel:+15186718048",
        isPreferred: true
      },
      {
        id: "gillberg",
        name: "Gillberg Law",
        category: "attorney",
        description: "Real estate attorneys specializing in residential and investment property transactions. Title review, contract negotiation, and closing representation.",
        specialty: "Real Estate Law",
        phone: "518-555-0200",
        website: "https://gillberglaw.com",
        ctaLabel: "Request Consultation",
        ctaUrl: "https://gillberglaw.com/contact",
        isPreferred: true
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
        id: "inspector-placeholder",
        name: "Coming Soon",
        category: "inspector",
        description: "We're currently vetting home inspectors to add to our Preferred Partner network. Contact us for a personal recommendation based on your property type.",
        specialty: "Home Inspection",
        ctaLabel: "Request Recommendation",
        ctaUrl: "tel:+15186718048",
        isPreferred: false
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

const RealEstateVendorDirectory = () => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<VendorPhase | null>(null);

  const handleVendorClick = (vendor: Vendor, phase: VendorPhase) => {
    setSelectedVendor(vendor);
    setSelectedPhase(phase);
  };

  return (
    <section className="section-massive overflow-hidden relative isolate">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-[40px] pointer-events-none" />
      
      <div className="relative z-10 px-[4%] lg:px-[6%]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
            Trusted Team
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
            Your Real Estate Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light">
            Vetted professionals for every phase of your home purchase
          </p>
        </div>

        {/* Timeline Phases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
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
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-foreground truncate">
                                  {vendor.name}
                                </span>
                                {vendor.isPreferred && (
                                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold flex-shrink-0">
                                    <BadgeCheck className="w-3 h-3" />
                                    <span>Verified by Scott</span>
                                  </div>
                                )}
                              </div>
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
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a specific recommendation? Our team knows the best partners for your situation.
          </p>
          <a href="tel:+15186718048">
            <Button 
              size="lg"
              className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Speak with Scott
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
                
                {selectedVendor.isPreferred && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium">
                      Preferred Partner — Verified by Scott
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
