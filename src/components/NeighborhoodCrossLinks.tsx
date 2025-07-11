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
      <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Explore Other Capital District Areas
        </h4>
        <div className="flex flex-wrap gap-2">
          {filteredNeighborhoods.map((neighborhood) => (
            <div key={neighborhood.slug} className="flex items-center space-x-2">
              <Link
                to={neighborhood.rentalLink}
                className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
              >
                {neighborhood.icon}
                <span className="ml-1">{neighborhood.name} Rentals</span>
              </Link>
              <Link
                to={neighborhood.investmentLink}
                className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
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
    <section className={`py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Explore All Capital District Communities
          </h3>
          <p className="text-gray-600">
            Discover investment and rental opportunities across our service areas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNeighborhoods.map((neighborhood) => (
            <div key={neighborhood.slug} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {neighborhood.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {neighborhood.name}
                </h4>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {neighborhood.description}
              </p>
              
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {neighborhood.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <Link
                  to={neighborhood.rentalLink}
                  className="block w-full text-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View {neighborhood.name} Rentals
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={neighborhood.investmentLink}
                    className="text-center px-2 py-1 border border-blue-200 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors"
                  >
                    Investments
                  </Link>
                  <Link
                    to={neighborhood.communityLink}
                    className="text-center px-2 py-1 border border-gray-200 text-gray-600 rounded text-xs hover:bg-gray-50 transition-colors"
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