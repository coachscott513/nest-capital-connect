import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Home, TrendingUp, Calculator } from 'lucide-react';

// SEO Internal Linking Component - Enhances page authority and user navigation
// Following SEO best practices for internal link distribution

interface InternalLink {
  title: string;
  url: string;
  description: string;
  category: 'location' | 'service' | 'resource' | 'tool';
  priority: 'high' | 'medium' | 'low';
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
    // Location-based pages (high SEO value for local searches)
    {
      title: "Albany Rental Properties",
      url: "/#albany-rentals",
      description: "Discover quality rental properties in Albany's vibrant neighborhoods",
      category: 'location',
      priority: 'high',
      keywords: ['Albany rentals', 'Albany properties', 'Capital District housing']
    },
    {
      title: "Troy Rental Listings",
      url: "/#troy-rentals", 
      description: "Find your perfect rental home in historic Troy, NY",
      category: 'location',
      priority: 'high',
      keywords: ['Troy rentals', 'Troy NY housing', 'Rensselaer County']
    },
    {
      title: "Schenectady Housing Options",
      url: "/#schenectady-rentals",
      description: "Quality rental properties in Schenectady and surrounding areas",
      category: 'location',
      priority: 'high',
      keywords: ['Schenectady rentals', 'Schenectady properties', 'upstate NY']
    },
    {
      title: "Saratoga Springs Rentals",
      url: "/#saratoga-rentals",
      description: "Premium rental properties in beautiful Saratoga Springs",
      category: 'location',
      priority: 'high',
      keywords: ['Saratoga rentals', 'Saratoga Springs', 'luxury rentals']
    },
    
    // Service pages (medium to high SEO value)
    {
      title: "First-Time Buyer Program",
      url: "/#first-time-buyers",
      description: "Complete guide and assistance for first-time home buyers",
      category: 'service',
      priority: 'high',
      keywords: ['first time buyer', 'home buying guide', 'buyer assistance']
    },
    {
      title: "Investment Property Opportunities",
      url: "/#investment-properties",
      description: "Profitable real estate investment opportunities in the Capital District",
      category: 'service',
      priority: 'high',
      keywords: ['investment properties', 'real estate investing', 'rental income']
    },
    {
      title: "Property Rehabilitation Services",
      url: "/#rehab-properties",
      description: "Professional property rehab and renovation services",
      category: 'service',
      priority: 'medium',
      keywords: ['property rehab', 'home renovation', 'fixer upper']
    },
    {
      title: "Real Estate Financing Options",
      url: "/#financing",
      description: "Explore financing solutions for your real estate needs",
      category: 'service',
      priority: 'medium',
      keywords: ['real estate financing', 'mortgage options', 'property loans']
    },
    {
      title: "Property Owner Services",
      url: "/#owners",
      description: "Comprehensive property management and owner services",
      category: 'service',
      priority: 'medium',
      keywords: ['property management', 'landlord services', 'rental management']
    },
    
    // Resource pages (medium SEO value, good for expertise)
    {
      title: "Neighborhood Guides",
      url: "/#neighborhoods",
      description: "Detailed guides to Capital District neighborhoods and communities",
      category: 'resource',
      priority: 'medium',
      keywords: ['neighborhood guide', 'community information', 'local amenities']
    },
    {
      title: "Meet Our Team",
      url: "/#meet-the-team",
      description: "Get to know our experienced real estate professionals",
      category: 'resource',
      priority: 'low',
      keywords: ['real estate team', 'agents', 'property specialists']
    }
  ];

  // Filter links based on current page to avoid self-linking and prioritize relevant content
  const getRelevantLinks = (): InternalLink[] => {
    let filteredLinks = allInternalLinks.filter(link => 
      !link.url.includes(currentPage) && link.url !== `/#${currentPage}`
    );

    // Sort by priority and category relevance
    filteredLinks.sort((a, b) => {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const categoryWeight = { location: 4, service: 3, resource: 2, tool: 1 };
      
      const scoreA = priorityWeight[a.priority] + categoryWeight[a.category];
      const scoreB = priorityWeight[b.priority] + categoryWeight[b.category];
      
      return scoreB - scoreA;
    });

    return filteredLinks.slice(0, maxLinks);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'location': return <MapPin className="h-4 w-4" />;
      case 'service': return <Home className="h-4 w-4" />;
      case 'resource': return <TrendingUp className="h-4 w-4" />;
      case 'tool': return <Calculator className="h-4 w-4" />;
      default: return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'location': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'service': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'resource': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'tool': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
              <a 
                href={link.url}
                className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 hover:shadow-md"
                title={`Visit ${link.title} - ${link.description}`}
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
              </a>
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