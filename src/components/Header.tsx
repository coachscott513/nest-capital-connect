import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-sm border-b border-blue-800/20 shadow-lg">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Logo and Site Name */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection('investment-properties')}
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            Investment Properties
          </button>
          <button
            onClick={() => scrollToSection('rehab-properties')}
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            Rehab Properties
          </button>
          <Link
            to="/rentals"
            className="text-white hover:text-blue-200 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Rentals & First-Time Buyers
          </Link>
          <div className="relative group">
            <button className="text-white hover:text-blue-200 transition-colors duration-200">
              Markets
            </button>
            <div className="absolute top-full left-0 bg-blue-800 rounded-md shadow-lg p-2 hidden group-hover:block min-w-48">
              <Link to="/albany-real-estate" className="block px-3 py-2 text-white hover:bg-blue-700 rounded">Albany</Link>
              <Link to="/troy-real-estate" className="block px-3 py-2 text-white hover:bg-blue-700 rounded">Troy</Link>
              <Link to="/schenectady-real-estate" className="block px-3 py-2 text-white hover:bg-blue-700 rounded">Schenectady</Link>
              <Link to="/saratoga-real-estate" className="block px-3 py-2 text-white hover:bg-blue-700 rounded">Saratoga</Link>
            </div>
          </div>
          <Link
            to="/blog"
            className="text-white hover:text-blue-200 transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <button
            onClick={() => scrollToSection('owners')}
            className="text-white hover:text-blue-200 transition-colors duration-200"
          >
            For Owners
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-white hover:text-blue-200 transition-colors duration-200"
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
              <button
                onClick={() => scrollToSection('investment-properties')}
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
              >
                Investment Properties
              </button>
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
                Rentals & First-Time Buyers
              </Link>
              <Link
                to="/blog"
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <button
                onClick={() => scrollToSection('owners')}
                className="text-white hover:text-blue-200 transition-colors duration-200 text-left"
              >
                For Owners
              </button>
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
