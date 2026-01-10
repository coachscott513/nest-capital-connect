import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F7] border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">Capital District Nest</h3>
            <p className="text-[#6E6E73] text-sm">
              Modern Real Estate for the Capital District & Boston.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] mb-4 uppercase tracking-wide">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:+15186762347" 
                className="flex items-center gap-2 text-[#6E6E73] hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                (518) 676-2347
              </a>
              <a 
                href="mailto:scott@capitaldistrictnest.com" 
                className="flex items-center gap-2 text-[#6E6E73] hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                scott@capitaldistrictnest.com
              </a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] mb-4 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/intel/1999-ridge-road-queensbury-ny" 
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  Sample Intelligence Report
                </Link>
              </li>
              <li>
                <Link 
                  to="/investor/nyc-to-albany-roi" 
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  Investor Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/first-time-homebuyers" 
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  First-Time Buyer Help
                </Link>
              </li>
              <li>
                <Link 
                  to="/dealdesk" 
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  Request Property Report
                </Link>
              </li>
              <li>
                <Link 
                  to="/site-index" 
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  Full Site Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#1D1D1F] mb-4 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://dos.ny.gov/system/files/documents/2021/08/fairhousingnotice.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  NY Fair Housing Notice
                </a>
              </li>
              <li>
                <a 
                  href="https://dos.ny.gov/system/files/documents/2021/08/standardizedoperatingprocedures.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  Standard Operating Procedures
                </a>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-[#6E6E73] hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Disclaimer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-[#6E6E73] text-center leading-relaxed">
            © {new Date().getFullYear()} Capital District Nest. Scott Alvarez is a Licensed Real Estate Salesperson. 
            Capital District Nest is a team name. Each RE/MAX® Office is Independently Owned and Operated. 
            Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
