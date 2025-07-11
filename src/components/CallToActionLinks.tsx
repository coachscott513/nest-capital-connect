import { ArrowRight, Phone, Mail, Calculator, Search, Building } from "lucide-react";
import { Link } from "react-router-dom";

interface CTAAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  primary?: boolean;
  external?: boolean;
  onClick?: () => void;
}

interface CallToActionLinksProps {
  context: 'investment' | 'rental' | 'financing' | 'general';
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

const CallToActionLinks = ({ context, className = "", layout = 'horizontal' }: CallToActionLinksProps) => {
  const getContextualActions = (ctx: string): CTAAction[] => {
    const baseActions = [
      {
        title: "Contact Scott",
        description: "Speak with our expert directly",
        href: "tel:+15185227265",
        icon: <Phone className="w-5 h-5" />,
        external: true
      },
      {
        title: "Get Analysis",
        description: "Request property investment analysis",
        href: "#contact",
        icon: <Calculator className="w-5 h-5" />,
        onClick: () => {
          const element = document.getElementById('contact');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    ];

    switch (ctx) {
      case 'investment':
        return [
          {
            title: "View Properties",
            description: "Browse investment opportunities",
            href: "/investment-properties",
            icon: <Building className="w-5 h-5" />,
            primary: true
          },
          {
            title: "Financing Options",
            description: "Learn about loan programs",
            href: "/financing",
            icon: <Calculator className="w-5 h-5" />
          },
          ...baseActions
        ];
      
      case 'rental':
        return [
          {
            title: "Search Rentals",
            description: "Find your perfect rental",
            href: "/rentals",
            icon: <Search className="w-5 h-5" />,
            primary: true
          },
          {
            title: "View by Area",
            description: "Browse neighborhood options",
            href: "/communities",
            icon: <Building className="w-5 h-5" />
          },
          ...baseActions
        ];
      
      case 'financing':
        return [
          {
            title: "Investment Properties",
            description: "See what you can finance",
            href: "/investment-properties",
            icon: <Building className="w-5 h-5" />,
            primary: true
          },
          {
            title: "Rehab Projects",
            description: "Fix & flip loan program",
            href: "/rehab-properties",
            icon: <ArrowRight className="w-5 h-5" />
          },
          ...baseActions
        ];
      
      default:
        return [
          {
            title: "Start Investing",
            description: "Explore investment opportunities",
            href: "/investment-properties",
            icon: <Building className="w-5 h-5" />,
            primary: true
          },
          {
            title: "Find Rentals",
            description: "Browse available properties",
            href: "/rentals",
            icon: <Search className="w-5 h-5" />
          },
          ...baseActions
        ];
    }
  };

  const actions = getContextualActions(context);

  const renderAction = (action: CTAAction, index: number) => {
    const baseClasses = `group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
      action.primary 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
    }`;

    const content = (
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          action.primary 
            ? 'bg-white/20' 
            : 'bg-blue-100 group-hover:bg-blue-200'
        }`}>
          <div className={action.primary ? 'text-white' : 'text-blue-600'}>
            {action.icon}
          </div>
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${
            action.primary ? 'text-white' : 'text-gray-900 group-hover:text-blue-600'
          }`}>
            {action.title}
          </h4>
          <p className={`text-sm ${
            action.primary ? 'text-blue-100' : 'text-gray-600'
          }`}>
            {action.description}
          </p>
        </div>
        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
          action.primary ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
        }`} />
      </div>
    );

    if (action.external || action.href.startsWith('#') || action.href.startsWith('tel:') || action.href.startsWith('mailto:')) {
      return (
        <a
          key={index}
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          className={baseClasses}
          onClick={action.onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        key={index}
        to={action.href}
        className={baseClasses}
        onClick={action.onClick}
      >
        {content}
      </Link>
    );
  };

  if (layout === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {actions.map(renderAction)}
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
        {actions.map(renderAction)}
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {actions.map(renderAction)}
    </div>
  );
};

export default CallToActionLinks;