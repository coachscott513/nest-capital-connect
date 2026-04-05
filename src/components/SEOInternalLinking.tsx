import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Home, TrendingUp, Calculator, Building, ChartBar } from 'lucide-react';

// SEO Internal Linking Component - Enhances page authority and user navigation
// Following SEO best practices for internal link distribution

interface InternalLink {
  title: string;
  url: string;
  description: string;
  category: string;
  priority: number;
  keywords: string[];
}

interface SEOInternalLinkingProps {
  currentPage?: string;
  maxLinks?: number;
  showCategories?: boolean;
  className?: string;
}

const SEOInternalLinking: React.FC<SEOInternalLinkingProps> = ({
  currentPage = 'home',
  maxLinks = 6,
  showCategories = true,
  className = ''
}) => {
  // Comprehensive internal link structure for real estate website
  const allInternalLinks: InternalLink[] = [
    // Single-Family Home Market Pages
    {
      title: "Albany Single-Family Homes",
      url: "/markets/albany-single-family-homes",
      description: "Comprehensive guide to Albany's single-family home market with trends, neighborhoods, and buyer advice.",
      category: "Single-Family Homes",
      priority: 10,
      keywords: ["albany single family homes", "albany housing market", "albany home buying guide", "albany neighborhoods"]
    },
    {
      title: "Schenectady Single-Family Homes",
      url: "/markets/schenectady-single-family-homes",
      description: "In-depth analysis of Schenectady's single-family home market, prices, and neighborhood guide.",
      category: "Single-Family Homes",
      priority: 9,
      keywords: ["schenectady single family homes", "schenectady housing market", "schenectady home buying guide"]
    },
    {
      title: "Troy Single-Family Homes",
      url: "/markets/troy-single-family-homes",
      description: "Expert guide to Troy's single-family home market with current trends and neighborhood insights.",
      category: "Single-Family Homes",
      priority: 9,
      keywords: ["troy single family homes", "troy housing market", "troy home buying guide", "troy neighborhoods"]
    },
    {
      title: "Saratoga Springs Single-Family Homes",
      url: "/markets/saratoga-springs-single-family-homes",
      description: "Complete market analysis for Saratoga Springs single-family homes with pricing trends and neighborhoods.",
      category: "Single-Family Homes",
      priority: 8,
      keywords: ["saratoga springs single family homes", "saratoga housing market", "saratoga springs neighborhoods"]
    },
    {
      title: "Clifton Park Single-Family Homes",
      url: "/markets/clifton-park-single-family-homes",
      description: "Detailed guide to the Clifton Park single-family home market with school information and pricing trends.",
      category: "Single-Family Homes",
      priority: 7,
      keywords: ["clifton park single family homes", "clifton park real estate", "clifton park schools"]
    },
    
    // Real Estate Pages - Canonical /towns/ URLs
    {
      title: "Albany Real Estate",
      url: "/towns/albany",
      description: "Explore Albany's real estate market, neighborhoods, and investment opportunities.",
      category: "Real Estate",
      priority: 8,
      keywords: ["albany real estate", "albany homes", "albany properties", "albany ny real estate"]
    },
    {
      title: "Troy Real Estate",
      url: "/towns/troy",
      description: "Discover Troy's housing market, historic properties, and investment opportunities.",
      category: "Real Estate",
      priority: 7,
      keywords: ["troy real estate", "troy homes", "troy properties", "troy ny real estate"]
    },
    {
      title: "Schenectady Real Estate",
      url: "/towns/schenectady",
      description: "Learn about Schenectady's real estate market, neighborhoods, and property options.",
      category: "Real Estate",
      priority: 7,
      keywords: ["schenectady real estate", "schenectady homes", "schenectady properties", "schenectady ny real estate"]
    },
    {
      title: "Saratoga Springs Real Estate",
      url: "/towns/saratoga-springs",
      description: "Explore Saratoga Springs' premium real estate market and luxury properties.",
      category: "Real Estate",
      priority: 6,
      keywords: ["saratoga real estate", "saratoga springs real estate", "saratoga homes", "saratoga springs properties"]
    },
    
    // Markets Main Page
    {
      title: "Capital District Markets",
      url: "/markets",
      description: "Browse all single-family home market guides for the Capital District region.",
      category: "Markets",
      priority: 9,
      keywords: ["capital district real estate markets", "capital district home buying", "ny housing markets"]
    },
    
    // Location-based pages (rental-focused)
    {
      title: "Albany Rental Properties",
      url: "/#albany-rentals",
      description: "Discover quality rental properties in Albany's vibrant neighborhoods.",
      category: "Rentals",
      priority: 6,
      keywords: ["Albany rentals", "Albany properties", "Capital District housing"]
    },
    {
      title: "Troy Rental Listings",
      url: "/#troy-rentals", 
      description: "Find your perfect rental home in historic Troy, NY.",
      category: "Rentals",
      priority: 5,
      keywords: ["Troy rentals", "Troy NY housing", "Rensselaer County"]
    },
    {
      title: "Schenectady Housing Options",
      url: "/#schenectady-rentals",
      description: "Quality rental properties in Schenectady and surrounding areas.",
      category: "Rentals",
      priority: 5,
      keywords: ["Schenectady rentals", "Schenectady properties", "upstate NY"]
    },
    {
      title: "Saratoga Springs Rentals",
      url: "/#saratoga-rentals",
      description: "Premium rental properties in beautiful Saratoga Springs.",
      category: "Rentals",
      priority: 5,
      keywords: ["Saratoga rentals", "Saratoga Springs", "luxury rentals"]
    },
    
    // Service pages (medium to high SEO value)
    {
      title: "First-Time Buyer Program",
      url: "/#first-time-buyers",
      description: "Complete guide and assistance for first-time home buyers.",
      category: "Service",
      priority: 7,
      keywords: ["first time buyer", "home buying guide", "buyer assistance"]
    },
    {
      title: "Investment Property Opportunities",
      url: "/#investment-properties",
      description: "Profitable real estate investment opportunities in the Capital District.",
      category: "Service",
      priority: 7,
      keywords: ["investment properties", "real estate investing", "rental income"]
    },
    {
      title: "Property Rehabilitation Services",
      url: "/#rehab-properties",
      description: "Professional property rehab and renovation services.",
      category: "Service",
      priority: 6,
      keywords: ["property rehab", "home renovation", "fixer upper"]
    },
    {
      title: "Real Estate Financing Options",
      url: "/#financing",
      description: "Explore financing solutions for your real estate needs.",
      category: "Service",
      priority: 6,
      keywords: ["real estate financing", "mortgage options", "property loans"]
    },
    {
      title: "Property Owner Services",
      url: "/#owners",
      description: "Comprehensive property management and owner services.",
      category: "Service",
      priority: 5,
      keywords: ["property management", "landlord services", "rental management"]
    },
    
    // Resource pages (medium SEO value, good for expertise)
    {
      title: "Neighborhood Guides",
      url: "/#neighborhoods",
      description: "Detailed guides to Capital District neighborhoods and communities.",
      category: "Resource",
      priority: 6,
      keywords: ["neighborhood guide", "community information", "local amenities"]
    },
    {
      title: "Meet Our Team",
      url: "/#meet-the-team",
      description: "Get to know our experienced real estate professionals.",
      category: "Resource",
      priority: 4,
      keywords: ["real estate team", "agents", "property specialists"]
    },
    
    // Blog and Information
    {
      title: "Real Estate Blog",
      url: "/blog",
      description: "Latest market insights, property analyses, and real estate tips.",
      category: "Resource",
      priority: 7,
      keywords: ["real estate blog", "market insights", "property analysis", "real estate tips"]
    }
  ];

  // Filter links based on current page to avoid self-linking and prioritize relevant content
  const getRelevantLinks = (): InternalLink[] => {
    let filteredLinks = allInternalLinks.filter(link => 
      !link.url.includes(currentPage) && link.url !== `/#${currentPage}`
    );

    // Sort by priority (highest to lowest)
    filteredLinks.sort((a, b) => b.priority - a.priority);

    return filteredLinks.slice(0, maxLinks);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Rentals': return <Home className="h-4 w-4" />;
      case 'Single-Family Homes': return <Building className="h-4 w-4" />;
      case 'Real Estate': return <MapPin className="h-4 w-4" />;
      case 'Markets': return <ChartBar className="h-4 w-4" />;
      case 'Service': return <TrendingUp className="h-4 w-4" />;
      case 'Resource': return <Calculator className="h-4 w-4" />;
      default: return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Rentals': return 'bg-accent/15 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Single-Family Homes': return 'bg-emerald/15 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Real Estate': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'Markets': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Service': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Resource': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-secondary text-foreground dark:bg-primary dark:text-gray-200';
    }
  };

  const relevantLinks = getRelevantLinks();

  if (relevantLinks.length === 0) return null;

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Explore Related Content</h3>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relevantLinks.map((link, index) => (
            <div key={index} className="group">
              <Link
                to={link.url}
                className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md bg-card"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getCategoryIcon(link.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {link.title}
                      </h4>
                      {showCategories && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getCategoryColor(link.category)}`}
                        >
                          {link.category}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {link.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs text-primary group-hover:underline">
                        Learn more
                      </span>
                      <ArrowRight className="h-3 w-3 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* SEO-optimized keywords for search engines */}
        <div className="sr-only">
          <p>
            Related content: {relevantLinks.map(link => link.keywords.join(', ')).join(', ')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOInternalLinking;