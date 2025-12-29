import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-3">Capital District Nest</h3>
            <p className="text-muted-foreground text-sm">
              Modern Real Estate for the Capital District & Boston.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:+15186762347" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                (518) 676-2347
              </a>
              <a 
                href="mailto:scott@capitaldistrictnest.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                scott@capitaldistrictnest.com
              </a>
              <p className="text-muted-foreground text-sm pt-2 border-t border-border mt-3">
                Affiliated with <span className="font-semibold text-foreground">RE/MAX</span>
              </p>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=300000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Multi-Family Under $300k in Albany NY
                </a>
              </li>
              <li>
                <a 
                  href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  All Multi-Family in Albany County NY
                </a>
              </li>
              <li>
                <a 
                  href="https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=300000&beds=0&baths=0&types%5B%5D=0&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&pak=county%3Ag40_dre6kenh&sortby=listings.price+ASC&rtype=map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Homes Under $300k in Albany County NY
                </a>
              </li>
              <li>
                <Link 
                  to="/investor/nyc-to-albany-roi" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Investor Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://dos.ny.gov/system/files/documents/2021/08/fairhousingnotice.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  NY Fair Housing Notice
                </a>
              </li>
              <li>
                <a 
                  href="https://dos.ny.gov/system/files/documents/2021/08/standardizedoperatingprocedures.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Standard Operating Procedures
                </a>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Disclaimer */}
      <div className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
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
