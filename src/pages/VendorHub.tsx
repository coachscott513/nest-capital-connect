import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import SEOHead from "@/components/SEOHead";
import { 
  Building2, 
  Scale, 
  Shield, 
  Phone, 
  ExternalLink, 
  BadgeCheck,
  MessageCircle,
  ChevronRight,
  MapPin,
  Lock,
  Mail,
  Linkedin,
  Calendar,
  Star,
  HardHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Vendor {
  id: string;
  name: string;
  contactName: string;
  contactTitle: string;
  specialty: string;
  description: string;
  phone: string;
  email?: string;
  website?: string;
  linkedin?: string;
  location: string;
  isVerified: boolean;
  hasDirectExperience?: boolean;
  badge?: string;
  yearsInBusiness?: number;
  projectsCompleted?: number;
}

interface VendorCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  vendors: Vendor[];
}

const vendorCategories: VendorCategory[] = [
  {
    id: "mortgage",
    title: "Mortgage Specialists",
    subtitle: "Investment & Multifamily Lending",
    icon: <Building2 className="h-6 w-6" />,
    accentColor: "from-emerald-500/20 to-cyan-500/20",
    glowColor: "shadow-emerald-500/30",
    vendors: [
      {
        id: "m1",
        name: "Multifamily Lending Group",
        contactName: "Robert Chen",
        contactTitle: "Senior Loan Officer",
        specialty: "2-4 Unit Investment Properties",
        description: "Specialized in DSCR loans and portfolio lending for Capital District investors. Closed over $50M in investment properties last year alone.",
        phone: "(518) 555-0101",
        email: "rchen@mflg.com",
        website: "https://example.com",
        linkedin: "https://linkedin.com/in/example",
        location: "Clifton Park, NY",
        isVerified: true,
        hasDirectExperience: true,
        badge: "Nest Preferred",
        yearsInBusiness: 12,
        projectsCompleted: 340
      },
      {
        id: "m2",
        name: "Capital Region Mortgage",
        contactName: "Amanda Foster",
        contactTitle: "Investment Specialist",
        specialty: "First-Time Investor Programs",
        description: "Low down payment options for house-hackers and new landlords. Expert at navigating FHA and conventional products.",
        phone: "(518) 555-0102",
        email: "afoster@crmortgage.com",
        location: "Albany, NY",
        isVerified: true,
        hasDirectExperience: true,
        yearsInBusiness: 8
      },
      {
        id: "m3",
        name: "Upstate Portfolio Lenders",
        contactName: "David Morrison",
        contactTitle: "Portfolio Manager",
        specialty: "Portfolio & DSCR Loans",
        description: "Non-QM lending solutions for experienced investors.",
        phone: "(518) 555-0103",
        location: "Saratoga Springs, NY",
        isVerified: false
      }
    ]
  },
  {
    id: "legal",
    title: "Real Estate Attorneys",
    subtitle: "Closings & Entity Formation",
    icon: <Scale className="h-6 w-6" />,
    accentColor: "from-blue-500/20 to-indigo-500/20",
    glowColor: "shadow-blue-500/30",
    vendors: [
      {
        id: "l1",
        name: "Capital District Closings",
        contactName: "Jennifer Walsh",
        contactTitle: "Managing Partner",
        specialty: "Investment Property Transactions",
        description: "High-volume closings for flippers and buy-and-hold investors. Handles complex title issues and 1031 exchanges with precision.",
        phone: "(518) 555-0201",
        email: "jwalsh@cdclosings.com",
        website: "https://example.com",
        linkedin: "https://linkedin.com/in/example",
        location: "Troy, NY",
        isVerified: true,
        hasDirectExperience: true,
        badge: "Fast Closer",
        yearsInBusiness: 15,
        projectsCompleted: 520
      },
      {
        id: "l2",
        name: "Empire State Title & Escrow",
        contactName: "Michael Torres",
        contactTitle: "Title Officer",
        specialty: "Title Insurance & 1031 Exchanges",
        description: "Comprehensive title services with investor-friendly timelines.",
        phone: "(518) 555-0202",
        email: "mtorres@empirestate.com",
        location: "Clifton Park, NY",
        isVerified: true,
        yearsInBusiness: 10
      },
      {
        id: "l3",
        name: "Albany Law Associates",
        contactName: "Sarah Kim",
        contactTitle: "Associate Attorney",
        specialty: "LLC Formation & Asset Protection",
        description: "Entity structuring for real estate portfolios.",
        phone: "(518) 555-0203",
        location: "Albany, NY",
        isVerified: false
      }
    ]
  },
  {
    id: "insurance",
    title: "Insurance Providers",
    subtitle: "Landlord & Investor Policies",
    icon: <Shield className="h-6 w-6" />,
    accentColor: "from-amber-500/20 to-orange-500/20",
    glowColor: "shadow-amber-500/30",
    vendors: [
      {
        id: "i1",
        name: "Landlord Shield Insurance",
        contactName: "Thomas Grant",
        contactTitle: "Commercial Lines Agent",
        specialty: "Multi-Unit Property Coverage",
        description: "Specialized coverage for 2-4 unit rental properties with loss of rent protection. Expert at bundling policies for portfolio discounts.",
        phone: "(518) 555-0301",
        email: "tgrant@landlordshield.com",
        website: "https://example.com",
        location: "Schenectady, NY",
        isVerified: true,
        hasDirectExperience: true,
        badge: "Top Rated",
        yearsInBusiness: 18,
        projectsCompleted: 890
      },
      {
        id: "i2",
        name: "Empire Risk Management",
        contactName: "Lisa Crawford",
        contactTitle: "Risk Advisor",
        specialty: "Umbrella & Liability Policies",
        description: "Portfolio-wide coverage for investors with multiple properties.",
        phone: "(518) 555-0302",
        email: "lcrawford@empirerisk.com",
        location: "Clifton Park, NY",
        isVerified: true,
        yearsInBusiness: 7
      },
      {
        id: "i3",
        name: "Northeast Property Insurance",
        contactName: "Brian Miller",
        contactTitle: "Account Executive",
        specialty: "Builder's Risk & Rehab Coverage",
        description: "Coverage for properties under renovation or construction.",
        phone: "(518) 555-0303",
        location: "Saratoga Springs, NY",
        isVerified: false
      }
    ]
  },
  {
    id: "contractors",
    title: "Trusted Contractors",
    subtitle: "Renovation & Property Management",
    icon: <HardHat className="h-6 w-6" />,
    accentColor: "from-purple-500/20 to-pink-500/20",
    glowColor: "shadow-purple-500/30",
    vendors: [
      {
        id: "c1",
        name: "Capital Region Renovations",
        contactName: "Marcus Williams",
        contactTitle: "Owner & General Contractor",
        specialty: "Multifamily Renovations",
        description: "Turn-key renovation services for investment properties with fixed-price contracts. Known for on-time delivery and transparent budgeting.",
        phone: "(518) 555-0401",
        email: "mwilliams@capitalreno.com",
        website: "https://example.com",
        linkedin: "https://linkedin.com/in/example",
        location: "Troy, NY",
        isVerified: true,
        hasDirectExperience: true,
        badge: "Investor Favorite",
        yearsInBusiness: 14,
        projectsCompleted: 275
      },
      {
        id: "c2",
        name: "Upstate Property Managers",
        contactName: "Emily Nguyen",
        contactTitle: "Operations Director",
        specialty: "Tenant Placement & Management",
        description: "Full-service property management for passive investors.",
        phone: "(518) 555-0402",
        email: "enguyen@upstatepm.com",
        location: "Albany, NY",
        isVerified: true,
        yearsInBusiness: 6
      },
      {
        id: "c3",
        name: "Quick Turn Contractors",
        contactName: "James O'Brien",
        contactTitle: "Project Manager",
        specialty: "BRRRR & Fix-and-Flip",
        description: "Fast turnaround for time-sensitive investment projects.",
        phone: "(518) 555-0403",
        location: "Clifton Park, NY",
        isVerified: false
      }
    ]
  }
];

const VendorCard = ({ 
  vendor, 
  accentColor, 
  glowColor,
  onSelect 
}: { 
  vendor: Vendor; 
  accentColor: string; 
  glowColor: string;
  onSelect: () => void;
}) => {
  const isLocked = !vendor.isVerified;
  
  return (
    <div 
      onClick={!isLocked ? onSelect : undefined}
      className={`
        relative group rounded-2xl p-5 cursor-pointer
        bg-gradient-to-br ${accentColor}
        backdrop-blur-xl border border-white/10
        transition-all duration-300
        ${isLocked 
          ? "opacity-70" 
          : `hover:border-primary/30 hover:${glowColor} hover:shadow-lg`
        }
      `}
    >
      {/* Verified Badge with Direct Experience */}
      {vendor.isVerified && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full border backdrop-blur-sm ${
            vendor.hasDirectExperience 
              ? "bg-primary/30 border-primary/60 shadow-[0_0_15px_hsl(var(--primary)/0.5)]" 
              : "bg-emerald-500/20 border-emerald-500/40"
          }`}>
            <BadgeCheck className={`h-3.5 w-3.5 ${vendor.hasDirectExperience ? "text-primary" : "text-emerald-400"}`} />
            <span className={`text-[10px] font-bold uppercase tracking-wider ${vendor.hasDirectExperience ? "text-primary" : "text-emerald-300"}`}>
              {vendor.hasDirectExperience ? "Direct Experience" : "Verified"}
            </span>
          </div>
        </div>
      )}

      {/* Special Badge */}
      {vendor.badge && (
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary rounded-full border border-primary/30 flex items-center gap-1">
            <Star className="h-2.5 w-2.5 fill-primary" />
            {vendor.badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`${vendor.badge ? "mt-6" : ""}`}>
        <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {vendor.name}
        </h4>
        
        {/* Contact Name - Blurred if not verified */}
        <p className={`text-xs text-muted-foreground mb-2 ${isLocked ? "blur-[4px] select-none" : ""}`}>
          {vendor.contactName} • {vendor.contactTitle}
        </p>
        
        <p className="text-xs text-primary font-medium mb-2">{vendor.specialty}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{vendor.description}</p>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          <span>{vendor.location}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`flex gap-2 ${isLocked ? "blur-[3px] pointer-events-none" : ""}`}>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 h-9 text-xs bg-background/50 hover:bg-background/80 border-white/20"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${vendor.phone}`, "_self");
          }}
        >
          <Phone className="h-3.5 w-3.5 mr-1.5" />
          Call
        </Button>
        <Button 
          size="sm" 
          className="flex-1 h-9 text-xs bg-primary/90 hover:bg-primary"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          View Details
          <ChevronRight className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl backdrop-blur-sm">
          <div className="text-center px-4">
            <Lock className="h-5 w-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-2">Verification Pending</p>
            <Button size="sm" variant="outline" className="text-xs h-8">
              Request Verification
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const VendorDetailDrawer = ({ 
  vendor, 
  category,
  open, 
  onClose 
}: { 
  vendor: Vendor | null; 
  category: VendorCategory | null;
  open: boolean; 
  onClose: () => void;
}) => {
  if (!vendor || !category) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-black/70 backdrop-blur-[30px] border-l border-white/10 overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className={`
              inline-flex items-center justify-center w-8 h-8 rounded-lg
              bg-gradient-to-br ${category.accentColor} border border-white/20
            `}>
              {category.icon}
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{category.title}</span>
          </div>
          <SheetTitle className="text-2xl font-bold text-foreground">
            {vendor.name}
          </SheetTitle>
        </SheetHeader>

        {/* Verified Badge Hero */}
        {vendor.isVerified && vendor.hasDirectExperience && (
          <div className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Nest Verified: Direct Experience</p>
                <p className="text-xs text-muted-foreground">Personally vetted by Capital District Nest</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Person */}
        <div className="mb-6 p-5 bg-black/50 backdrop-blur-[25px] border border-white/10 rounded-2xl">
          <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Primary Contact</h4>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{vendor.contactName}</h3>
              <p className="text-sm text-primary">{vendor.contactTitle}</p>
            </div>
            {vendor.badge && (
              <span className="px-3 py-1 text-xs font-bold bg-primary/20 text-primary rounded-full border border-primary/30 flex items-center gap-1.5">
                <Star className="h-3 w-3 fill-primary" />
                {vendor.badge}
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        {(vendor.yearsInBusiness || vendor.projectsCompleted) && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {vendor.yearsInBusiness && (
              <div className="p-4 bg-black/50 backdrop-blur-[25px] border border-white/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-primary">{vendor.yearsInBusiness}</p>
                <p className="text-xs text-muted-foreground">Years in Business</p>
              </div>
            )}
            {vendor.projectsCompleted && (
              <div className="p-4 bg-black/50 backdrop-blur-[25px] border border-white/10 rounded-xl text-center">
                <p className="text-2xl font-bold text-primary">{vendor.projectsCompleted}+</p>
                <p className="text-xs text-muted-foreground">Projects Completed</p>
              </div>
            )}
          </div>
        )}

        {/* Specialty & Description */}
        <div className="mb-6 p-5 bg-black/50 backdrop-blur-[25px] border border-white/10 rounded-2xl">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Specialty</h4>
          <p className="text-primary font-medium mb-4">{vendor.specialty}</p>
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">About</h4>
          <p className="text-muted-foreground leading-relaxed">{vendor.description}</p>
        </div>

        {/* Location */}
        <div className="mb-6 p-4 bg-black/50 backdrop-blur-[25px] border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-foreground font-medium">{vendor.location}</p>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Connect</h4>
          
          <Button 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => window.open(`tel:${vendor.phone}`, "_self")}
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Now: {vendor.phone}
          </Button>

          <Button 
            variant="outline"
            className="w-full h-12 bg-background/50 hover:bg-background/80 border-white/20"
            onClick={() => window.open(`sms:${vendor.phone}`, "_self")}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Send Text Message
          </Button>

          {vendor.email && (
            <Button 
              variant="outline"
              className="w-full h-12 bg-background/50 hover:bg-background/80 border-white/20"
              onClick={() => window.open(`mailto:${vendor.email}`, "_blank")}
            >
              <Mail className="h-5 w-5 mr-2" />
              Email: {vendor.email}
            </Button>
          )}
        </div>

        {/* Social & Web Links */}
        {(vendor.website || vendor.linkedin) && (
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Online Presence</h4>
            
            {vendor.website && (
              <Button 
                variant="ghost"
                className="w-full justify-start h-11 bg-black/30 hover:bg-black/50 border border-white/10"
                onClick={() => window.open(vendor.website, "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-3 text-primary" />
                <span className="text-foreground">Visit Website</span>
              </Button>
            )}

            {vendor.linkedin && (
              <Button 
                variant="ghost"
                className="w-full justify-start h-11 bg-black/30 hover:bg-black/50 border border-white/10"
                onClick={() => window.open(vendor.linkedin, "_blank")}
              >
                <Linkedin className="h-4 w-4 mr-3 text-blue-400" />
                <span className="text-foreground">LinkedIn Profile</span>
              </Button>
            )}
          </div>
        )}

        {/* CTA Actions */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <Button 
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 text-primary-foreground font-bold shadow-lg shadow-primary/30"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Consultation
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Mention "Capital District Nest" for priority service
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const VendorHub = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory | null>(null);

  const handleSelectVendor = (vendor: Vendor, category: VendorCategory) => {
    setSelectedVendor(vendor);
    setSelectedCategory(category);
  };

  return (
    <MainLayout>
      <SEOHead 
        title="Vendor Intelligence Hub | Capital District Nest"
        description="Connect with verified mortgage specialists, attorneys, and insurance providers for your Capital District real estate investment."
        canonical="/vendors"
      />
      
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Institutional Partners</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Vendor Intelligence Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Vetted professionals for every stage of your investment journey. 
              Speed-to-close with one-tap connections.
            </p>
            
            {/* Legend */}
            <div className="inline-flex items-center gap-6 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                <span className="text-xs text-muted-foreground">Direct Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-muted-foreground">Verified Partner</span>
              </div>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {vendorCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className={`
                  relative p-6 rounded-2xl text-left
                  bg-gradient-to-br ${category.accentColor}
                  backdrop-blur-xl border transition-all duration-300
                  ${activeCategory === category.id 
                    ? `border-primary/50 ring-2 ring-primary/20 ${category.glowColor} shadow-lg` 
                    : "border-white/10 hover:border-white/20"
                  }
                `}
              >
                <div className={`
                  inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                  bg-gradient-to-br ${category.accentColor} border border-white/20
                `}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{category.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-primary font-medium">
                      {category.vendors.filter(v => v.isVerified).length} verified
                    </span>
                    {category.vendors.filter(v => v.hasDirectExperience).length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {category.vendors.filter(v => v.hasDirectExperience).length} direct exp.
                      </span>
                    )}
                  </div>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${
                    activeCategory === category.id ? "rotate-90" : ""
                  }`} />
                </div>
              </button>
            ))}
          </div>

          {/* Expanded Category */}
          {activeCategory && (
            <div className="mb-12 animate-in slide-in-from-top-4 duration-300">
              {vendorCategories
                .filter(cat => cat.id === activeCategory)
                .map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`
                        inline-flex items-center justify-center w-10 h-10 rounded-xl
                        bg-gradient-to-br ${category.accentColor} border border-white/20
                      `}>
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                        <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.vendors.map((vendor) => (
                        <VendorCard 
                          key={vendor.id} 
                          vendor={vendor} 
                          accentColor={category.accentColor}
                          glowColor={category.glowColor}
                          onSelect={() => handleSelectVendor(vendor, category)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* All Categories Collapsed View */}
          {!activeCategory && (
            <div className="text-center py-12 rounded-2xl bg-muted/30 border border-white/10 backdrop-blur-sm">
              <p className="text-muted-foreground mb-2">Select a category above to view verified vendors</p>
              <p className="text-xs text-muted-foreground/70">All partners are vetted for investor-friendly service</p>
            </div>
          )}

          {/* Become a Partner CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-foreground mb-2">Become a Verified Partner</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Get featured in the Capital District's premier investor network. 
                Connect with high-intent buyers and investors.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Apply for Verification
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Detail Drawer */}
      <VendorDetailDrawer 
        vendor={selectedVendor}
        category={selectedCategory}
        open={!!selectedVendor}
        onClose={() => {
          setSelectedVendor(null);
          setSelectedCategory(null);
        }}
      />
    </MainLayout>
  );
};

export default VendorHub;
