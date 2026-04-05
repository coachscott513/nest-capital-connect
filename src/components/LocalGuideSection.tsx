import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, 
  UtensilsCrossed, 
  Dumbbell, 
  Users, 
  Wrench,
  Briefcase,
  ExternalLink,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Star,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface LocalBusiness {
  name: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  googleMaps?: string;
  isPartner?: boolean;
  specialOffer?: string;
}

interface LocalGuideCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  businesses: LocalBusiness[];
}

interface LocalGuideSectionProps {
  townName: string;
  townSlug: string;
  categories?: LocalGuideCategory[];
}

// Default placeholder data for any town
const getDefaultCategories = (townName: string): LocalGuideCategory[] => [
  {
    id: "coffee",
    label: "Coffee",
    icon: <Coffee className="w-5 h-5" />,
    businesses: [
      { name: "Local Coffee Shop", description: `Popular morning spot in ${townName}` },
      { name: "Café & Bakery", description: "Fresh pastries and espresso drinks" }
    ]
  },
  {
    id: "restaurants",
    label: "Restaurants",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    businesses: [
      { name: "Local Eatery", description: `${townName}'s neighborhood favorite` },
      { name: "Fine Dining", description: "Upscale American cuisine" }
    ]
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: <Dumbbell className="w-5 h-5" />,
    businesses: [
      { name: "Local Gym", description: "Full-service fitness center" },
      { name: "Yoga Studio", description: "Classes for all levels" }
    ]
  },
  {
    id: "family",
    label: "Family & Kids",
    icon: <Users className="w-5 h-5" />,
    businesses: [
      { name: "Community Center", description: "Programs for all ages" },
      { name: "Kids Activities", description: "Classes and camps" }
    ]
  },
  {
    id: "home-services",
    label: "Home Services",
    icon: <Wrench className="w-5 h-5" />,
    businesses: [
      { name: "Local Plumber", description: "Trusted residential plumbing" },
      { name: "HVAC Services", description: "Heating & cooling experts" }
    ]
  },
  {
    id: "local-pros",
    label: "Local Pros",
    icon: <Briefcase className="w-5 h-5" />,
    businesses: [
      { name: "Preferred Lender", description: "Competitive mortgage rates" },
      { name: "Insurance Agent", description: "Home & auto coverage" }
    ]
  }
];

// Business Card Component - Standard vs Partner
const BusinessCard = ({ 
  business, 
  townSlug, 
  categoryId 
}: { 
  business: LocalBusiness; 
  townSlug: string; 
  categoryId: string;
}) => {
  const isPartner = business.isPartner;

  return (
    <Card 
      className={`border transition-all hover:shadow-md ${
        isPartner 
          ? 'border-[#00F5FF]/50 bg-gradient-to-br from-[#00F5FF]/5 to-transparent shadow-[0_0_20px_rgba(0,245,255,0.1)]' 
          : 'border-border hover:border-primary/30'
      }`}
    >
      <CardContent className="p-4">
        {/* Partner Badge */}
        {isPartner && (
          <Badge 
            className="mb-3 bg-[#00F5FF]/20 text-[#00F5FF] border-[#00F5FF]/30 hover:bg-[#00F5FF]/30"
          >
            <Star className="w-3 h-3 mr-1 fill-current" />
            Local Partner
          </Badge>
        )}

        {/* Business Name & Description */}
        <h4 className="font-semibold text-foreground mb-1">
          {business.name}
        </h4>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {business.description}
        </p>

        {/* STANDARD LISTING: Website only */}
        {!isPartner && (
          <>
            {business.website ? (
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8 text-xs w-full"
                asChild
              >
                <a href={business.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Visit Website
                </a>
              </Button>
            ) : (
              <div className="h-8 flex items-center justify-center text-xs text-muted-foreground">
                Website coming soon
              </div>
            )}

            {/* Verification CTA for listings */}
            <div className="mt-3 pt-3 border-t border-border">
              <Link 
                to={`/claim-business?town=${townSlug}&category=${categoryId}&name=${encodeURIComponent(business.name)}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <CheckCircle className="w-3 h-3" />
                Verify or Edit Details
              </Link>
            </div>
          </>
        )}

        {/* PARTNER LISTING: Full features unlocked */}
        {isPartner && (
          <>
            {/* Direct Contact Buttons */}
            <div className="flex gap-2 mb-3">
              {business.phone && (
                <Button 
                  size="sm" 
                  className="h-9 flex-1 bg-[#00F5FF] hover:bg-[#00F5FF]/90 text-foreground font-medium"
                  asChild
                >
                  <a href={`tel:${business.phone}`}>
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Call Now
                  </a>
                </Button>
              )}
              {business.email && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-9 flex-1 border-[#00F5FF]/50 text-[#00F5FF] hover:bg-[#00F5FF]/10"
                  asChild
                >
                  <a href={`mailto:${business.email}`}>
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Message
                  </a>
                </Button>
              )}
              {business.website && !business.phone && !business.email && (
                <Button 
                  size="sm" 
                  className="h-9 w-full bg-[#00F5FF] hover:bg-[#00F5FF]/90 text-foreground font-medium"
                  asChild
                >
                  <a href={business.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>

            {/* Social Row - Live Links */}
            <div className="flex items-center gap-2 mb-3">
              {business.website && (
                <a 
                  href={business.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center hover:bg-[#00F5FF]/20 hover:text-[#00F5FF] transition-colors"
                  title="Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {business.instagram && (
                <a 
                  href={business.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 hover:text-pink-400 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {business.facebook && (
                <a 
                  href={business.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center hover:bg-accent/20 hover:text-blue-400 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {business.googleMaps && (
                <a 
                  href={business.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm font-bold"
                  title="Google Business"
                >
                  G
                </a>
              )}
            </div>

            {/* Alpha Special - Offer Box */}
            {business.specialOffer && (
              <div className="p-3 rounded-lg border border-[#00F5FF]/30 bg-[#00F5FF]/5">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#00F5FF] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#00F5FF] uppercase tracking-wide mb-1">
                      Alpha Special
                    </p>
                    <p className="text-sm text-foreground">
                      {business.specialOffer}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Claim/Edit Link for Partners */}
            <div className="mt-3 pt-3 border-t border-[#00F5FF]/20">
              <Link 
                to={`/claim-business?town=${townSlug}&category=${categoryId}&name=${encodeURIComponent(business.name)}`}
                className="text-xs text-muted-foreground hover:text-[#00F5FF] transition-colors"
              >
                Manage Listing
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const LocalGuideSection = ({ townName, townSlug, categories }: LocalGuideSectionProps) => {
  const displayCategories = categories || getDefaultCategories(townName);

  return (
    <section className="px-[5%] py-16 md:py-20 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Local Guide
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Trusted local spots in {townName}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20">
            <Star className="w-4 h-4 text-[#00F5FF] fill-[#00F5FF]" />
            <span className="text-sm text-[#00F5FF]">
              Local Partners get featured placement & direct contact
            </span>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.label}
                </h3>
              </div>

              {/* Business Cards */}
              <div className="space-y-3">
                {category.businesses.map((business, idx) => (
                  <BusinessCard 
                    key={idx}
                    business={business}
                    townSlug={townSlug}
                    categoryId={category.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for Business Owners */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Own a business in {townName}?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to={`/claim-business?town=${townSlug}`}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Join Our Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalGuideSection;
