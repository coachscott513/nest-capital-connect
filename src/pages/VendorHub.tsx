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
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Vendor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  phone: string;
  website?: string;
  location: string;
  isVerified: boolean;
  badge?: string;
}

interface VendorCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  vendors: Vendor[];
}

const vendorCategories: VendorCategory[] = [
  {
    id: "mortgage",
    title: "Mortgage Specialists",
    subtitle: "Investment & Multifamily Lending",
    icon: <Building2 className="h-6 w-6" />,
    accentColor: "from-emerald-500/20 to-cyan-500/20",
    vendors: [
      {
        id: "m1",
        name: "Multifamily Lending Group",
        specialty: "2-4 Unit Investment Properties",
        description: "Specialized in DSCR loans and portfolio lending for Capital District investors.",
        phone: "(518) 555-0101",
        website: "https://example.com",
        location: "Clifton Park, NY",
        isVerified: true,
        badge: "Nest Preferred"
      },
      {
        id: "m2",
        name: "Capital Region Mortgage",
        specialty: "First-Time Investor Programs",
        description: "Low down payment options for house-hackers and new landlords.",
        phone: "(518) 555-0102",
        location: "Albany, NY",
        isVerified: true
      },
      {
        id: "m3",
        name: "Upstate Portfolio Lenders",
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
    vendors: [
      {
        id: "l1",
        name: "Capital District Closings",
        specialty: "Investment Property Transactions",
        description: "High-volume closings for flippers and buy-and-hold investors.",
        phone: "(518) 555-0201",
        website: "https://example.com",
        location: "Troy, NY",
        isVerified: true,
        badge: "Fast Closer"
      },
      {
        id: "l2",
        name: "Empire State Title & Escrow",
        specialty: "Title Insurance & 1031 Exchanges",
        description: "Comprehensive title services with investor-friendly timelines.",
        phone: "(518) 555-0202",
        location: "Clifton Park, NY",
        isVerified: true
      },
      {
        id: "l3",
        name: "Albany Law Associates",
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
    vendors: [
      {
        id: "i1",
        name: "Landlord Shield Insurance",
        specialty: "Multi-Unit Property Coverage",
        description: "Specialized coverage for 2-4 unit rental properties with loss of rent protection.",
        phone: "(518) 555-0301",
        website: "https://example.com",
        location: "Schenectady, NY",
        isVerified: true,
        badge: "Top Rated"
      },
      {
        id: "i2",
        name: "Empire Risk Management",
        specialty: "Umbrella & Liability Policies",
        description: "Portfolio-wide coverage for investors with multiple properties.",
        phone: "(518) 555-0302",
        location: "Clifton Park, NY",
        isVerified: true
      },
      {
        id: "i3",
        name: "Northeast Property Insurance",
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
    icon: <Building2 className="h-6 w-6" />,
    accentColor: "from-purple-500/20 to-pink-500/20",
    vendors: [
      {
        id: "c1",
        name: "Capital Region Renovations",
        specialty: "Multifamily Renovations",
        description: "Turn-key renovation services for investment properties with fixed-price contracts.",
        phone: "(518) 555-0401",
        website: "https://example.com",
        location: "Troy, NY",
        isVerified: true,
        badge: "Investor Favorite"
      },
      {
        id: "c2",
        name: "Upstate Property Managers",
        specialty: "Tenant Placement & Management",
        description: "Full-service property management for passive investors.",
        phone: "(518) 555-0402",
        location: "Albany, NY",
        isVerified: true
      },
      {
        id: "c3",
        name: "Quick Turn Contractors",
        specialty: "BRRRR & Fix-and-Flip",
        description: "Fast turnaround for time-sensitive investment projects.",
        phone: "(518) 555-0403",
        location: "Clifton Park, NY",
        isVerified: false
      }
    ]
  }
];

const VendorCard = ({ vendor, accentColor }: { vendor: Vendor; accentColor: string }) => {
  const isLocked = !vendor.isVerified;
  
  return (
    <div 
      className={`
        relative group rounded-2xl p-5 
        bg-gradient-to-br ${accentColor}
        backdrop-blur-xl border border-white/10
        transition-all duration-300
        ${isLocked ? "opacity-70" : "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"}
      `}
    >
      {/* Verified Badge */}
      {vendor.isVerified && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Verified</span>
          </div>
        </div>
      )}

      {/* Special Badge */}
      {vendor.badge && (
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary rounded-full border border-primary/30">
            {vendor.badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`${vendor.badge ? "mt-6" : ""}`}>
        <h4 className="text-lg font-semibold text-foreground mb-1">{vendor.name}</h4>
        <p className="text-xs text-primary font-medium mb-2">{vendor.specialty}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{vendor.description}</p>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3 w-3" />
          <span>{vendor.location}</span>
        </div>
      </div>

      {/* Actions */}
      <div className={`flex gap-2 ${isLocked ? "blur-[3px] pointer-events-none" : ""}`}>
        <Button 
          size="sm" 
          variant="outline"
          className="flex-1 h-9 text-xs bg-background/50 hover:bg-background/80 border-white/20"
          onClick={() => window.open(`tel:${vendor.phone}`, "_self")}
        >
          <Phone className="h-3.5 w-3.5 mr-1.5" />
          Call Now
        </Button>
        <Button 
          size="sm" 
          className="flex-1 h-9 text-xs bg-primary/90 hover:bg-primary"
          onClick={() => window.open(`sms:${vendor.phone}`, "_self")}
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
          Text
        </Button>
        {vendor.website && (
          <Button 
            size="sm" 
            variant="ghost"
            className="h-9 px-2 text-xs"
            onClick={() => window.open(vendor.website, "_blank")}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Locked Overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-2xl backdrop-blur-sm">
          <div className="text-center px-4">
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

const VendorHub = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vetted professionals for every stage of your investment journey. 
              Speed-to-close with one-tap connections.
            </p>
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
                    ? "border-primary/50 ring-2 ring-primary/20" 
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
                  <span className="text-xs text-primary font-medium">
                    {category.vendors.filter(v => v.isVerified).length} verified
                  </span>
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
    </MainLayout>
  );
};

export default VendorHub;
