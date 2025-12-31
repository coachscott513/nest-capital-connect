import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    // Only scroll if we're on the home page
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-sm border-b border-blue-800/20 shadow-lg">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        {/* Logo, Site Name, and Phone */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png" 
              alt="Capital District Nest Logo" 
              className="h-10 w-10"
            />
            <span className="text-white font-semibold text-lg hidden sm:block">
              Capital District Nest
            </span>
          </Link>
          <a 
            href="tel:+15186762347" 
            className="hidden sm:flex items-center space-x-1.5 text-white/90 hover:text-white transition-colors text-sm"
          >
            <Phone size={14} />
            <span>(518) 676-2347</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <div className="relative group">
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
              Investment Properties
            </button>
            <div className="absolute top-full left-0 mt-1 bg-blue-800 rounded-lg shadow-xl p-2 hidden group-hover:block min-w-56 border border-blue-700/50 z-50">
              <Link to="/albany-multi-unit" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm font-semibold">Albany Multi-Units</Link>
              <Link to="/troy-multi-unit" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Troy Multi-Units</Link>
              <Link to="/schenectady-multi-unit" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Schenectady Multi-Units</Link>
              <div className="border-t border-blue-700 my-2"></div>
              <Link to="/investor-tools" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Investor Tools</Link>
              <Link to="/cash-flow-report" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Cash Flow Analyzer</Link>
            </div>
          </div>
          <button
            onClick={() => scrollToSection('rehab-properties')}
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
          >
            Rehab Properties
          </button>
          <Link
            to="/rentals"
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Rentals
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
          >
            First-Time Buyers
          </button>
          <div className="relative group">
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
              Markets
            </button>
            <div className="absolute top-full left-0 mt-1 bg-blue-800 rounded-lg shadow-xl p-2 hidden group-hover:block min-w-56 border border-blue-700/50">
              <Link to="/markets" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md font-semibold text-sm">All Markets</Link>
              <div className="border-t border-blue-700 my-2"></div>
              <div className="px-4 py-1 text-blue-300 text-xs font-semibold uppercase tracking-wide">County Intelligence</div>
              <Link to="/schenectady-county-real-estate" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm bg-blue-700/50">Schenectady County</Link>
              <div className="border-t border-blue-700 my-2"></div>
              <Link to="/delmar-market-insights" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Delmar Market Insights</Link>
              <Link to="/delmar-homes-for-sale" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Delmar Homes</Link>
              <Link to="/markets/albany-single-family-homes" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Albany Homes</Link>
              <Link to="/markets/schenectady-single-family-homes" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Schenectady Homes</Link>
              <Link to="/markets/troy-single-family-homes" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Troy Homes</Link>
              <Link to="/markets/saratoga-springs-single-family-homes" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Saratoga Homes</Link>
              <div className="border-t border-blue-700 my-2"></div>
              <Link to="/towns/albany" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Albany Real Estate</Link>
              <Link to="/towns/troy" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Troy Real Estate</Link>
              <Link to="/towns/schenectady" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Schenectady Real Estate</Link>
              <Link to="/towns/saratoga-springs" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Saratoga Real Estate</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium">
              Investor Guides
            </button>
            <div className="absolute top-full left-0 mt-1 bg-blue-800 rounded-lg shadow-xl p-2 hidden group-hover:block min-w-72 border border-blue-700/50 z-50">
              <Link to="/investor/nyc-to-albany-roi" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">NYC → Albany ROI Playbook</Link>
              <Link to="/investor/albany-multi-unit-market" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Albany Multi-Unit Market Report</Link>
              <Link to="/troy-multi-unit" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Troy Multi-Unit Market Report</Link>
              <Link to="/schenectady-multi-unit" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Schenectady Multi-Unit Market Report</Link>
              <Link to="/investor/saratoga-multi-unit-market" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Saratoga County Multi-Unit Report</Link>
              <Link to="/investor/fulton-montgomery-multi-unit-market" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Fulton & Montgomery Multi-Unit Report</Link>
              <div className="border-t border-blue-700 my-2"></div>
              <Link to="/investor/analyze-multifamily" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">How to Analyze a Multi-Family Property</Link>
              <Link to="/investor/1031-nyc-to-albany" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">1031 Exchange Playbook (NYC → Albany)</Link>
              <Link to="/investor/best-neighborhoods-cash-flow-capital-district" className="block px-4 py-2 text-white hover:bg-blue-700 rounded-md text-sm">Best Neighborhoods for Cash Flow</Link>
            </div>
          </div>
          <Link
            to="/insights"
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Insights
          </Link>
          <Link
            to="/blog"
            className="text-white hover:bg-white/10 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/vip-buyer-access"
            className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            VIP Access
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ml-2"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-600 p-4 md:hidden">
          <div className="flex flex-col space-y-4">
              <div className="text-white font-medium">Investment Properties</div>
              <div className="pl-4 flex flex-col space-y-2 mb-1">
                <Link
                  to="/albany-multi-unit"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Albany Multi-Units
                </Link>
                <Link
                  to="/troy-multi-unit"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Troy Multi-Units
                </Link>
                <Link
                  to="/schenectady-multi-unit"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schenectady Multi-Units
                </Link>
                <Link
                  to="/investor-tools"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Investor Tools
                </Link>
                <Link
                  to="/cash-flow-report"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cash Flow Analyzer
                </Link>
              </div>
              <button
                onClick={() => scrollToSection('rehab-properties')}
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
              >
                Rehab Properties
              </button>
              <Link
                to="/rentals"
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Rentals
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
              >
                First-Time Home Buyers
              </button>
              <Link
                to="/markets"
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Markets
              </Link>
              <div className="pl-4 flex flex-col space-y-2 mt-2 mb-1">
                <div className="text-blue-300 text-xs font-semibold uppercase tracking-wide pt-1">County Intelligence</div>
                <Link
                  to="/schenectady-county-real-estate"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schenectady County
                </Link>
                <div className="border-t border-blue-500/30 my-1"></div>
                <Link
                  to="/markets/albany-single-family-homes"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Albany Homes
                </Link>
                <Link
                  to="/markets/schenectady-single-family-homes"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schenectady Homes
                </Link>
                <Link
                  to="/markets/troy-single-family-homes"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Troy Homes
                </Link>
                <Link
                  to="/markets/saratoga-springs-single-family-homes"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saratoga Homes
                </Link>
              </div>
              <div className="text-white font-medium">Investor Guides</div>
              <div className="pl-4 flex flex-col space-y-2 mt-2 mb-1">
                <Link
                  to="/investor/nyc-to-albany-roi"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  NYC → Albany ROI Playbook
                </Link>
                <Link
                  to="/investor/albany-multi-unit-market"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Albany Multi-Unit Market Report
                </Link>
                <Link
                  to="/troy-multi-unit"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Troy Multi-Unit Market Report
                </Link>
                <Link
                  to="/schenectady-multi-unit"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Schenectady Multi-Unit Market Report
                </Link>
                <Link
                  to="/investor/saratoga-multi-unit-market"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saratoga County Multi-Unit Report
                </Link>
                <Link
                  to="/investor/fulton-montgomery-multi-unit-market"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fulton & Montgomery Multi-Unit Report
                </Link>
                <Link
                  to="/investor/analyze-multifamily"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How to Analyze a Multi-Family Property
                </Link>
                <Link
                  to="/investor/1031-nyc-to-albany"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  1031 Exchange Playbook (NYC → Albany)
                </Link>
                <Link
                  to="/investor/best-neighborhoods-cash-flow-capital-district"
                  className="text-white hover:text-blue-200 transition-colors duration-200 text-left text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Best Neighborhoods for Cash Flow
                </Link>
              </div>
              <Link
                to="/insights"
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Insights
              </Link>
              <Link
                to="/blog"
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/vip-buyer-access"
                className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md transition-colors duration-200 text-center font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                VIP Access
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
