import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

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
    <footer className="bg-secondary/60 text-foreground">
      {/* Town Directory */}
      <div className="max-w-7xl mx-auto px-6 py-14 border-b border-border">
        <h3 className="text-xs font-medium text-muted-foreground mb-8 uppercase tracking-[0.15em]">
          Real Estate by County
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {Object.entries(townDirectory).map(([county, towns]) => (
            <div key={county}>
              <h4 className="text-[11px] font-medium text-muted-foreground/70 mb-2.5 uppercase tracking-wider">{county}</h4>
              <ul className="space-y-1.5">
                {towns.map((town) => (
                  <li key={town.slug}>
                    <Link to={`/towns/${town.slug}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-2">Capital District Nest</h3>
            <p className="text-sm text-muted-foreground font-light">Property intelligence for the Capital District.</p>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-[0.15em]">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+15186762347" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" /> (518) 676-2347
              </a>
              <a href="mailto:scott@capitaldistrictnest.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5" /> scott@capitaldistrictnest.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-[0.15em]">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link to="/intel/1999-ridge-road-queensbury-ny" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sample Report</Link></li>
              <li><Link to="/investor/nyc-to-albany-roi" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Investor Guides</Link></li>
              <li><Link to="/first-time-homebuyers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">First-Time Buyers</Link></li>
              <li><Link to="/dealdesk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Request Report</Link></li>
              <li><Link to="/site-index" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Site Index</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-[0.15em]">Partner</h4>
            <ul className="space-y-2.5">
              <li><Link to="/partner-auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Business Login</Link></li>
              <li><Link to="/claim-business" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Claim Your Story</Link></li>
            </ul>
            <h4 className="text-xs font-medium text-muted-foreground mb-3 mt-8 uppercase tracking-[0.15em]">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="https://dos.ny.gov/system/files/documents/2021/08/fairhousingnotice.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">NY Fair Housing</a></li>
              <li><Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
            © {new Date().getFullYear()} Capital District Nest. Scott Alvarez, Licensed Real Estate Salesperson.
            Each RE/MAX® Office is Independently Owned and Operated. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
