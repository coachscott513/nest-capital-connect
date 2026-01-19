import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

// Complete town directory for SEO - 11 Counties
const townDirectory = {
  "Albany County": [
    { name: "Albany", slug: "albany" },
    { name: "Altamont", slug: "altamont" },
    { name: "Cohoes", slug: "cohoes" },
    { name: "Colonie", slug: "colonie" },
    { name: "Delmar", slug: "delmar" },
    { name: "Green Island", slug: "green-island" },
    { name: "Guilderland", slug: "guilderland" },
    { name: "Latham", slug: "latham" },
    { name: "Loudonville", slug: "loudonville" },
    { name: "Menands", slug: "menands" },
    { name: "Ravena", slug: "ravena" },
    { name: "Voorheesville", slug: "voorheesville" },
    { name: "Watervliet", slug: "watervliet" },
  ],
  "Schenectady County": [
    { name: "Niskayuna", slug: "niskayuna" },
    { name: "Rotterdam", slug: "rotterdam" },
    { name: "Schenectady", slug: "schenectady" },
  ],
  "Rensselaer County": [
    { name: "Averill Park", slug: "averill-park" },
    { name: "Brunswick", slug: "brunswick" },
    { name: "East Greenbush", slug: "east-greenbush" },
    { name: "North Greenbush", slug: "north-greenbush" },
    { name: "Rensselaer", slug: "rensselaer" },
    { name: "Schaghticoke", slug: "schaghticoke" },
    { name: "Troy", slug: "troy" },
    { name: "Wynantskill", slug: "wynantskill" },
  ],
  "Saratoga County": [
    { name: "Ballston Spa", slug: "ballston-spa" },
    { name: "Clifton Park", slug: "clifton-park" },
    { name: "Halfmoon", slug: "halfmoon" },
    { name: "Malta", slug: "malta" },
    { name: "Mechanicville", slug: "mechanicville" },
    { name: "Saratoga Springs", slug: "saratoga-springs" },
    { name: "Stillwater", slug: "stillwater" },
    { name: "Waterford", slug: "waterford" },
    { name: "Wilton", slug: "wilton" },
  ],
  "Warren County": [
    { name: "Glens Falls", slug: "glens-falls" },
    { name: "Lake George", slug: "lake-george" },
    { name: "Queensbury", slug: "queensbury" },
  ],
  "Washington County": [
    { name: "Cambridge", slug: "cambridge" },
    { name: "Greenwich", slug: "greenwich" },
    { name: "Hudson Falls", slug: "hudson-falls" },
  ],
  "Fulton County": [
    { name: "Gloversville", slug: "gloversville" },
    { name: "Johnstown", slug: "johnstown" },
    { name: "Northville", slug: "northville" },
  ],
  "Montgomery County": [
    { name: "Amsterdam", slug: "amsterdam" },
    { name: "Canajoharie", slug: "canajoharie" },
    { name: "Fonda", slug: "fonda" },
  ],
  "Greene County": [
    { name: "Athens", slug: "athens" },
    { name: "Catskill", slug: "catskill" },
    { name: "Coxsackie", slug: "coxsackie" },
    { name: "Hunter", slug: "hunter" },
    { name: "Windham", slug: "windham" },
  ],
  "Schoharie County": [
    { name: "Cobleskill", slug: "cobleskill" },
    { name: "Middleburgh", slug: "middleburgh" },
    { name: "Schoharie", slug: "schoharie" },
    { name: "Sharon Springs", slug: "sharon-springs" },
  ],
};

const Footer = () => {
  return (
    <footer 
      className="relative"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Town Directory for SEO */}
      <div 
        className="max-w-7xl mx-auto px-6 py-12"
        style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}
      >
        <h3 className="text-sm font-semibold text-white/90 mb-6 uppercase tracking-wide">
          Real Estate by County
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(townDirectory).map(([county, towns]) => (
            <div key={county}>
              <h4 className="text-xs font-semibold text-white/50 mb-2 uppercase tracking-wide">
                {county}
              </h4>
              <ul className="space-y-1">
                {towns.map((town) => (
                  <li key={town.slug}>
                    <Link
                      to={`/towns/${town.slug}`}
                      className="text-xs text-white/40 hover:text-primary transition-colors"
                    >
                      {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40 mt-6">
          Serving 52+ towns across the Capital District, Catskill Mountains, and beyond.
        </p>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Capital District Nest</h3>
            <p className="text-white/50 text-sm">
              Modern Real Estate for the Capital District & Boston.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wide">Contact</h4>
            <div className="space-y-3">
              <a 
                href="tel:+15186718048" 
                className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                (518) 671-8048
              </a>
              <a 
                href="mailto:scott@capitaldistrictnest.com" 
                className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-4 w-4" />
                scott@capitaldistrictnest.com
              </a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/intel/1999-ridge-road-queensbury-ny" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  Sample Intelligence Report
                </Link>
              </li>
              <li>
                <Link 
                  to="/investor/nyc-to-albany-roi" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  Investor Guides
                </Link>
              </li>
              <li>
                <Link 
                  to="/first-time-homebuyers" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  First-Time Buyer Help
                </Link>
              </li>
              <li>
                <Link 
                  to="/dealdesk" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  Request Property Report
                </Link>
              </li>
              <li>
                <Link 
                  to="/site-index" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  Full Site Index
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Partner Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wide">Partner Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/partner-auth" 
                  className="text-white/50 hover:text-primary transition-colors text-sm font-medium"
                >
                  Business Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/claim-business" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  Claim Your Story
                </Link>
              </li>
            </ul>
            
            <h4 className="text-sm font-semibold text-white/90 mb-4 mt-6 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://dos.ny.gov/system/files/documents/2021/08/fairhousingnotice.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  NY Fair Housing Notice
                </a>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-white/50 hover:text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Disclaimer */}
      <div 
        className="relative"
        style={{ 
          background: 'rgba(0, 0, 0, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)' 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-white/40 text-center leading-relaxed">
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