import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  Scale, 
  Shield, 
  HardHat,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  BadgeCheck,
  MapPin,
  ChevronRight,
  ArrowRight,
  Star,
  Linkedin,
  Calendar
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

// Featured vendors - top verified from each category
const featuredVendors: VendorCategory[] = [
  {
    id: "mortgage",
    title: "Finance",
    subtitle: "Investment Lending",
    icon: <Building2 className="h-5 w-5" />,
    accentColor: "from-emerald-500/20 to-cyan-500/20",
    glowColor: "shadow-emerald-500/30",
    vendors: [
      {
        id: "m1",
        name: "Multifamily Lending Group",
        contactName: "Robert Chen",
        contactTitle: "Senior Loan Officer",
        specialty: "2-4 Unit Investment Properties",
        description: "Specialized in DSCR loans and portfolio lending for Capital District investors.",
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
      }
    ]
  },
  {
    id: "legal",
    title: "Legal",
    subtitle: "Closings & Entity",
    icon: <Scale className="h-5 w-5" />,
    accentColor: "from-blue-500/20 to-indigo-500/20",
    glowColor: "shadow-blue-500/30",
    vendors: [
      {
        id: "l1",
        name: "Capital District Closings",
        contactName: "Jennifer Walsh",
        contactTitle: "Managing Partner",
        specialty: "Investment Property Transactions",
        description: "High-volume closings for flippers and buy-and-hold investors.",
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
      }
    ]
  },
  {
    id: "insurance",
    title: "Insurance",
    subtitle: "Landlord Policies",
    icon: <Shield className="h-5 w-5" />,
    accentColor: "from-amber-500/20 to-orange-500/20",
    glowColor: "shadow-amber-500/30",
    vendors: [
      {
        id: "i1",
        name: "Landlord Shield Insurance",
        contactName: "Thomas Grant",
        contactTitle: "Commercial Lines Agent",
        specialty: "Multi-Unit Property Coverage",
        description: "Specialized coverage for 2-4 unit rental properties with loss of rent protection.",
        phone: "(518) 555-0301",
        email: "tgrant@landlordshield.com",
        website: "https://example.com",
        location: "Schenectady, NY",
        isVerified: true,
        hasDirectExperience: true,
        badge: "Top Rated",
        yearsInBusiness: 18,
        projectsCompleted: 890
      }
    ]
  },
  {
    id: "contractors",
    title: "Construction",
    subtitle: "Renovations",
    icon: <HardHat className="h-5 w-5" />,
    accentColor: "from-purple-500/20 to-pink-500/20",
    glowColor: "shadow-purple-500/30",
    vendors: [
      {
        id: "c1",
        name: "Capital Region Renovations",
        contactName: "Marcus Williams",
        contactTitle: "Owner & General Contractor",
        specialty: "Multifamily Renovations",
        description: "Turn-key renovation services for investment properties with fixed-price contracts.",
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
      }
    ]
  }
];

const ProfessionalNetwork = () => {
  const [selectedVendor, setSelectedVendor] = useState<{ vendor: Vendor; category: VendorCategory } | null>(null);

  return (
    <section className="section-massive overflow-hidden relative isolate">
      {/* Liquid Glass Background Layer */}
      <div className="absolute inset-0 z-0 bg-primary/50 backdrop-blur-[40px] pointer-events-none" />
      
      <div className="relative z-10 px-[2%] lg:px-[3%]">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">Vetted Network</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-6">
            Professional Network
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto body-airy font-light">
            Vetted real estate services we've worked with directly
          </p>
        </div>

        {/* 4-Column Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featuredVendors.map((category) => {
            const vendor = category.vendors[0];
            
            return (
              <div
                key={category.id}
                onClick={() => setSelectedVendor({ vendor, category })}
                className={`
                  relative group rounded-3xl p-6 cursor-pointer
                  bg-gradient-to-br ${category.accentColor}
                  backdrop-blur-[30px] border border-white/10
                  transition-all duration-300
                  hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]
                  hover:scale-[1.02]
                `}
              >
                {/* Nest Vetted Badge */}
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-sm bg-primary/30 border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      Nest Vetted
                    </span>
                  </div>
                </div>

                {/* Category Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    inline-flex items-center justify-center w-10 h-10 rounded-xl
                    bg-gradient-to-br ${category.accentColor} border border-white/20
                  `}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                  </div>
                </div>

                {/* Vendor Info */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {vendor.name}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground">
                    {vendor.contactName} • {vendor.contactTitle}
                  </p>
                  
                  {vendor.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary rounded-full border border-primary/30">
                      <Star className="h-2.5 w-2.5 fill-primary" />
                      {vendor.badge}
                    </span>
                  )}

                  <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{vendor.location}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-5">
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
                    variant="outline"
                    className="flex-1 h-9 text-xs bg-background/50 hover:bg-background/80 border-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`sms:${vendor.phone}`, "_self");
                    }}
                  >
                    <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                    Text
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Partners Link */}
        <div className="text-center mt-12">
          <Link 
            to="/vendors"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View Full Vendor Directory
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Vendor Detail Sheet */}
      <Sheet open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-primary/70 backdrop-blur-[30px] border-l border-white/10 overflow-y-auto">
          {selectedVendor && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`
                    inline-flex items-center justify-center w-8 h-8 rounded-lg
                    bg-gradient-to-br ${selectedVendor.category.accentColor} border border-white/20
                  `}>
                    {selectedVendor.category.icon}
                  </div>
                  <span className="text-sm text-muted-foreground">{selectedVendor.category.title}</span>
                </div>
                <SheetTitle className="text-2xl text-foreground">{selectedVendor.vendor.name}</SheetTitle>
                
                {/* Nest Vetted Badge */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-sm bg-primary/30 border-primary/60">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Nest Vetted: Direct Experience
                    </span>
                  </div>
                </div>
              </SheetHeader>

              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Contact</h4>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">{selectedVendor.vendor.contactName}</p>
                    <p className="text-sm text-muted-foreground">{selectedVendor.vendor.contactTitle}</p>
                  </div>
                </div>

                {/* Stats */}
                {(selectedVendor.vendor.yearsInBusiness || selectedVendor.vendor.projectsCompleted) && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedVendor.vendor.yearsInBusiness && (
                      <div className="p-4 rounded-xl bg-background/5 border border-white/10">
                        <p className="text-2xl font-bold text-primary">{selectedVendor.vendor.yearsInBusiness}</p>
                        <p className="text-xs text-muted-foreground">Years in Business</p>
                      </div>
                    )}
                    {selectedVendor.vendor.projectsCompleted && (
                      <div className="p-4 rounded-xl bg-background/5 border border-white/10">
                        <p className="text-2xl font-bold text-primary">{selectedVendor.vendor.projectsCompleted}+</p>
                        <p className="text-xs text-muted-foreground">Projects Completed</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">About</h4>
                  <p className="text-muted-foreground">{selectedVendor.vendor.description}</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="h-12"
                    onClick={() => window.open(`tel:${selectedVendor.vendor.phone}`, "_self")}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-12"
                    onClick={() => window.open(`sms:${selectedVendor.vendor.phone}`, "_self")}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  {selectedVendor.vendor.email && (
                    <Button 
                      variant="outline"
                      className="h-12"
                      onClick={() => window.open(`mailto:${selectedVendor.vendor.email}`, "_blank")}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  )}
                  {selectedVendor.vendor.website && (
                    <Button 
                      variant="outline"
                      className="h-12"
                      onClick={() => window.open(selectedVendor.vendor.website, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Website
                    </Button>
                  )}
                  {selectedVendor.vendor.linkedin && (
                    <Button 
                      variant="outline"
                      className="h-12"
                      onClick={() => window.open(selectedVendor.vendor.linkedin, "_blank")}
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  )}
                </div>

                {/* Schedule Consultation CTA */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Schedule a Consultation</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Connect directly with {selectedVendor.vendor.contactName.split(" ")[0]} to discuss your project.
                      </p>
                      <Button 
                        size="sm"
                        onClick={() => window.open(`tel:${selectedVendor.vendor.phone}`, "_self")}
                      >
                        Schedule Now
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default ProfessionalNetwork;
