import { MapPin, TrendingUp, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface Neighborhood {
  name: string;
  slug: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
  rentalLink: string;
  investmentLink: string;
  communityLink: string;
}

interface NeighborhoodCrossLinksProps {
  currentArea?: string;
  showAll?: boolean;
  layout?: 'grid' | 'horizontal';
  className?: string;
}

const NeighborhoodCrossLinks = ({ 
  currentArea, 
  showAll = false, 
  layout = 'grid',
  className = "" 
}: NeighborhoodCrossLinksProps) => {
  const neighborhoods: Neighborhood[] = [
    {
      name: "Albany",
      slug: "albany",
      description: "The vibrant capital with diverse neighborhoods and investment opportunities",
      highlights: ["State Government Hub", "Universities", "Growing Tech Sector"],
      icon: <Home className="w-5 h-5" />,
      rentalLink: "/albany-rentals",
      investmentLink: "/investment-properties#albany",
      communityLink: "/communities/albany"
    },
    {
      name: "Troy",
      slug: "troy",
      description: "Historic architecture meets modern revitalization efforts",
      highlights: ["Historic Districts", "RPI Campus", "Riverfront Development"],
      icon: <MapPin className="w-5 h-5" />,
      rentalLink: "/troy-rentals",
      investmentLink: "/investment-properties#troy",
      communityLink: "/communities/troy"
    },
    {
      name: "Schenectady",
      slug: "schenectady",
      description: "Affordable options in a city experiencing significant growth",
      highlights: ["Union College", "GE Heritage", "Revitalization Projects"],
      icon: <Users className="w-5 h-5" />,
      rentalLink: "/schenectady-rentals",
      investmentLink: "/investment-properties#schenectady",
      communityLink: "/communities/schenectady"
    },
    {
      name: "Saratoga Springs",
      slug: "saratoga",
      description: "Elegant community with culture, horse racing, and upscale living",
      highlights: ["Racing Season", "SPAC", "Historic Downtown"],
      icon: <TrendingUp className="w-5 h-5" />,
      rentalLink: "/saratoga-rentals",
      investmentLink: "/investment-properties#saratoga",
      communityLink: "/communities/saratoga"
    }
  ];

  const filteredNeighborhoods = showAll 
    ? neighborhoods 
    : neighborhoods.filter(n => n.slug !== currentArea?.toLowerCase());

  if (layout === 'horizontal') {
    return (
      <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
        <h4 className="text-lg font-semibold text-foreground mb-3">
          Explore Other Capital District Areas
        </h4>
        <div className="flex flex-wrap gap-2">
          {filteredNeighborhoods.map((neighborhood) => (
            <div key={neighborhood.slug} className="flex items-center space-x-2">
              <Link
                to={neighborhood.rentalLink}
                className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                {neighborhood.icon}
                <span className="ml-1">{neighborhood.name} Rentals</span>
              </Link>
              <Link
                to={neighborhood.investmentLink}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                Investments
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={`py-12 px-4 bg-card border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Explore All Capital District Communities
          </h3>
          <p className="text-muted-foreground">
            Discover investment and rental opportunities across our service areas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNeighborhoods.map((neighborhood) => (
            <div key={neighborhood.slug} className="bg-background rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {neighborhood.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  {neighborhood.name}
                </h4>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                {neighborhood.description}
              </p>
              
              <div className="mb-4">
                <h5 className="text-sm font-medium text-foreground/80 mb-2">Key Features:</h5>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {neighborhood.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <Link
                  to={neighborhood.rentalLink}
                  className="block w-full text-center px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  View {neighborhood.name} Rentals
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={neighborhood.investmentLink}
                    className="text-center px-2 py-1 border border-primary/30 text-primary rounded text-xs hover:bg-primary/10 transition-colors"
                  >
                    Investments
                  </Link>
                  <Link
                    to={neighborhood.communityLink}
                    className="text-center px-2 py-1 border border-border text-muted-foreground rounded text-xs hover:bg-muted transition-colors"
                  >
                    Community Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodCrossLinks;
