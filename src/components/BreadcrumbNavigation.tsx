import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
}

// Town name mapping for clean display
const townNameMap: Record<string, string> = {
  "delmar": "Delmar",
  "niskayuna": "Niskayuna",
  "voorheesville": "Voorheesville",
  "clifton-park": "Clifton Park",
  "saratoga-springs": "Saratoga Springs",
  "troy": "Troy",
  "schenectady": "Schenectady",
  "queensbury": "Queensbury",
  "amsterdam": "Amsterdam",
};

const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [
      { label: "Capital District Nest", href: "/" }
    ];

    if (pathname === "/") return crumbs;

    // Town pages - /towns/[town-name]
    const townMatch = pathname.match(/^\/towns\/(.+)/);
    if (townMatch) {
      const townSlug = townMatch[1];
      const townName = townNameMap[townSlug] || townSlug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
      crumbs.push({ label: townName, href: pathname });
      return crumbs;
    }

    // Legacy paths
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
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border py-3 px-4 md:px-[5%]">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 mr-2" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
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