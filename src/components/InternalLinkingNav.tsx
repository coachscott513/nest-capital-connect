
const InternalLinkingNav = () => {
  const quickLinks = [
    { 
      title: "Albany Rentals", 
      href: "#albany-rentals",
      description: "Apartments & homes in NY's capital city"
    },
    { 
      title: "Troy Rentals", 
      href: "#troy-rentals",
      description: "Historic properties with modern amenities"
    },
    { 
      title: "Schenectady Rentals", 
      href: "#schenectady-rentals",
      description: "Affordable housing in a growing city"
    },
    { 
      title: "Saratoga Springs Rentals", 
      href: "#saratoga-rentals",
      description: "Premium properties in an elegant city"
    },
    { 
      title: "First-Time Buyers", 
      href: "#first-time-buyers",
      description: "Expert guidance for your first home purchase"
    },
    { 
      title: "Property Owners", 
      href: "#owners",
      description: "List and manage your rental properties"
    }
  ];

  return (
    <nav className="py-8 px-4 bg-slate-50 border-b" role="navigation" aria-label="Quick Navigation">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">
          Explore Capital District Real Estate Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center block"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <h3 className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 mb-1">
                {link.title}
              </h3>
              <p className="text-xs text-slate-600 leading-tight">
                {link.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default InternalLinkingNav;
