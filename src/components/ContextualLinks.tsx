import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface ContextualLink {
  text: string;
  href: string;
  external?: boolean;
  className?: string;
}

interface ContextualLinksProps {
  links: ContextualLink[];
  context: string;
}

const ContextualLinks = ({ links, context }: ContextualLinksProps) => {
  return (
    <div className="inline-flex flex-wrap gap-2 items-center">
      {links.map((link, index) => (
        <span key={index} className="contents">
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center text-accent hover:text-blue-800 hover:underline transition-colors ${link.className || ''}`}
            >
              {link.text}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          ) : (
            <Link
              to={link.href}
              className={`text-accent hover:text-blue-800 hover:underline transition-colors ${link.className || ''}`}
            >
              {link.text}
            </Link>
          )}
          {index < links.length - 1 && <span className="text-muted-foreground">•</span>}
        </span>
      ))}
    </div>
  );
};

// Predefined contextual link sets for different page types
export const investmentLinks: ContextualLink[] = [
  { text: "Albany Properties", href: "/towns/albany" },
  { text: "Troy Investments", href: "/towns/troy" },
  { text: "Financing Options", href: "/financing" },
  { text: "Rehab Opportunities", href: "/rehab-properties" }
];

export const rentalLinks: ContextualLink[] = [
  { text: "Investment Analysis", href: "/towns/albany" },
  { text: "Multi-Unit Properties", href: "/markets" },
  { text: "Financing Solutions", href: "/#financing" },
  { text: "Neighborhood Guide", href: "/communities" }
];

export const financingLinks: ContextualLink[] = [
  { text: "Investment Properties", href: "/markets" },
  { text: "Rehab Projects", href: "/rehab-properties" },
  { text: "Rental Opportunities", href: "/rentals" },
  { text: "Market Analysis", href: "/" }
];

export const neighborhoodLinks: ContextualLink[] = [
  { text: "Albany", href: "/towns/albany" },
  { text: "Troy", href: "/towns/troy" },
  { text: "Schenectady", href: "/towns/schenectady" },
  { text: "Saratoga Springs", href: "/towns/saratoga-springs" }
];

export default ContextualLinks;