import { ArrowRight, Home, Building, Calculator, Hammer } from "lucide-react";
import { Link } from "react-router-dom";

interface RelatedContent {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  category: string;
}

interface RelatedContentSuggestionsProps {
  currentPage: string;
  className?: string;
}

const RelatedContentSuggestions = ({ currentPage, className = "" }: RelatedContentSuggestionsProps) => {
  const allContent: RelatedContent[] = [
    {
      title: "Investment Properties",
      description: "Discover profitable multi-unit opportunities across the Capital District",
      href: "/investment-properties",
      icon: <Building className="w-5 h-5" />,
      category: "investment"
    },
    {
      title: "Rehab Properties",
      description: "Fix & flip opportunities with our proven loan program",
      href: "/rehab-properties",
      icon: <Hammer className="w-5 h-5" />,
      category: "investment"
    },
    {
      title: "Financing Solutions",
      description: "Expert guidance on investment property financing options",
      href: "/financing",
      icon: <Calculator className="w-5 h-5" />,
      category: "financing"
    },
    {
      title: "Albany Rentals",
      description: "Premium rental listings in Albany and surrounding areas",
      href: "/albany-rentals",
      icon: <Home className="w-5 h-5" />,
      category: "rental"
    },
    {
      title: "Troy Rentals",
      description: "Quality rentals in historic Troy with modern amenities",
      href: "/troy-rentals",
      icon: <Home className="w-5 h-5" />,
      category: "rental"
    },
    {
      title: "Schenectady Rentals",
      description: "Affordable rental options in diverse Schenectady communities",
      href: "/schenectady-rentals",
      icon: <Home className="w-5 h-5" />,
      category: "rental"
    },
    {
      title: "Saratoga Rentals",
      description: "Elegant rental properties in charming Saratoga Springs",
      href: "/saratoga-rentals",
      icon: <Home className="w-5 h-5" />,
      category: "rental"
    }
  ];

  const getRelatedContent = (page: string): RelatedContent[] => {
    const currentHref = page.toLowerCase().replace(" ", "-");
    
    // Filter out current page and return relevant suggestions
    const filtered = allContent.filter(content => !content.href.includes(currentHref));
    
    if (page.includes("rental") || page.includes("Rental")) {
      // For rental pages, show other rental areas and investment opportunities
      return filtered.filter(content => 
        content.category === "rental" || content.category === "investment"
      ).slice(0, 3);
    }
    
    if (page.includes("investment") || page.includes("Investment")) {
      // For investment pages, show financing and rental opportunities
      return filtered.filter(content => 
        content.category === "financing" || content.category === "rental"
      ).slice(0, 3);
    }
    
    if (page.includes("financing") || page.includes("Financing")) {
      // For financing pages, show investment opportunities
      return filtered.filter(content => 
        content.category === "investment" || content.category === "rental"
      ).slice(0, 3);
    }
    
    // Default: show a mix of all categories
    return [
      filtered.find(c => c.category === "investment"),
      filtered.find(c => c.category === "rental"),
      filtered.find(c => c.category === "financing")
    ].filter(Boolean) as RelatedContent[];
  };

  const relatedContent = getRelatedContent(currentPage);

  if (relatedContent.length === 0) return null;

  return (
    <section className={`py-12 px-4 bg-background border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            You Might Also Be Interested In
          </h3>
          <p className="text-muted-foreground">
            Explore more opportunities in the Capital District real estate market
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedContent.map((content, index) => (
            <Link
              key={content.href}
              to={content.href}
              className="group bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors text-primary">
                  {content.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {content.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {content.description}
                  </p>
                  <div className="flex items-center mt-3 text-primary text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedContentSuggestions;
