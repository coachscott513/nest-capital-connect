import { useState } from "react";
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
  Instagram,
  Facebook,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

interface LocalBusiness {
  name: string;
  description: string;
  website?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  googleMaps?: string;
  isPartner?: boolean;
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
          <p className="text-lg text-muted-foreground">
            Trusted local spots in {townName}
          </p>
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
                  <Card 
                    key={idx} 
                    className={`border transition-all hover:border-primary/30 ${
                      business.isPartner ? 'border-primary/50 bg-primary/5' : 'border-border'
                    }`}
                  >
                    <CardContent className="p-4">
                      {/* Partner Badge */}
                      {business.isPartner && (
                        <Badge 
                          variant="secondary" 
                          className="mb-2 bg-primary/20 text-primary border-0 text-xs"
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

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {business.website && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                            asChild
                          >
                            <a href={business.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Website
                            </a>
                          </Button>
                        )}
                        {business.phone && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 text-xs"
                            asChild
                          >
                            <a href={`tel:${business.phone}`}>
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </a>
                          </Button>
                        )}
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-1 ml-auto">
                          {business.instagram && (
                            <a 
                              href={business.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                            >
                              <Instagram className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>
                          )}
                          {business.facebook && (
                            <a 
                              href={business.facebook} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
                            >
                              <Facebook className="w-3.5 h-3.5 text-muted-foreground" />
                            </a>
                          )}
                          {business.googleMaps && (
                            <a 
                              href={business.googleMaps} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors text-xs font-bold text-muted-foreground"
                            >
                              G
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Claim/Edit Link */}
                      <div className="mt-3 pt-3 border-t border-border">
                        <Link 
                          to={`/claim-business?town=${townSlug}&category=${category.id}&name=${encodeURIComponent(business.name)}`}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          Claim / Edit / Remove
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
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
          <Button variant="outline" asChild>
            <Link to={`/claim-business?town=${townSlug}`}>
              Add Your Business to This Guide
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocalGuideSection;
