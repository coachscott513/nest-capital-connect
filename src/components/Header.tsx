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
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png" 
            alt="Capital District Nest Logo" 
            className="h-12 w-12"
          />
        </div>

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
