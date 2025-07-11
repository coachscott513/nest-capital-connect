import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/" }
    ];

    if (pathname === "/") return crumbs;

    if (pathname.includes("rentals")) {
      crumbs.push({ label: "Rentals", href: "/rentals" });
    }
    
    if (pathname.includes("communities")) {
      crumbs.push({ label: "Communities", href: "/communities" });
      const cityMatch = pathname.match(/\/communities\/(.+)/);
      if (cityMatch) {
        const city = cityMatch[1].replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
        crumbs.push({ label: city, href: pathname });
      }
    }

    if (pathname.includes("investment-properties")) {
      crumbs.push({ label: "Investment Properties", href: "/investment-properties" });
    }

    if (pathname.includes("rehab-properties")) {
      crumbs.push({ label: "Rehab Properties", href: "/rehab-properties" });
    }

    if (pathname.includes("financing")) {
      crumbs.push({ label: "Financing", href: "/financing" });
    }

    if (pathname.includes("albany-rentals")) {
      crumbs.push({ label: "Albany Rentals", href: "/albany-rentals" });
    }

    if (pathname.includes("troy-rentals")) {
      crumbs.push({ label: "Troy Rentals", href: "/troy-rentals" });
    }

    if (pathname.includes("schenectady-rentals")) {
      crumbs.push({ label: "Schenectady Rentals", href: "/schenectady-rentals" });
    }

    if (pathname.includes("saratoga-rentals")) {
      crumbs.push({ label: "Saratoga Rentals", href: "/saratoga-rentals" });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-3 px-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
              )}
              {index === 0 && (
                <Home className="w-4 h-4 text-gray-500 mr-1" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNavigation;