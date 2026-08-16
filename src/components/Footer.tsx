import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { useRegion } from '@/hooks/useRegion';
import RealEstateDisclosure from '@/components/RealEstateDisclosure';
import { analyzeAnyDealDestination } from '@/config/externalProducts';

import {
  GENERAL_EMAIL,
  MEDIA_EMAIL,
  BUSINESS_EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  PLATFORM_TAGLINE,
} from '@/config/contact';

const REAL_ESTATE_ROUTE_PREFIXES = [
  '/homes',
  '/homes-for-sale',
  '/rentals',
  '/investment',
  '/analyze',
  '/dealdesk',
  '/cash-flow-report',
  '/market-report',
  '/property',
  '/137a-elsmere',
  '/lavery-drive',
  '/ridge-road',
  '/lancaster-street',
  '/albany-multi-unit',
  '/troy-multi-unit',
  '/schenectady-multi-unit',
  '/albany-land',
  '/single-family-market',
  '/best-neighborhoods',
  '/first-time',
  '/buyer-',
  '/sell-investment',
];

const isRealEstateRoute = (pathname: string) =>
  REAL_ESTATE_ROUTE_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/') || pathname.startsWith(p));

const townDirectory = {
  "Albany County": [
    { name: "Albany", slug: "albany" },
    { name: "Altamont", slug: "altamont" },
    { name: "Cohoes", slug: "cohoes" },
    { name: "Colonie", slug: "colonie" },
    { name: "Delmar", slug: "delmar" },
    { name: "Guilderland", slug: "guilderland" },
    { name: "Latham", slug: "latham" },
    { name: "Loudonville", slug: "loudonville" },
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
    { name: "East Greenbush", slug: "east-greenbush" },
    { name: "Rensselaer", slug: "rensselaer" },
    { name: "Troy", slug: "troy" },
  ],
  "Saratoga County": [
    { name: "Ballston Spa", slug: "ballston-spa" },
    { name: "Clifton Park", slug: "clifton-park" },
    { name: "Halfmoon", slug: "halfmoon" },
    { name: "Malta", slug: "malta" },
    { name: "Mechanicville", slug: "mechanicville" },
    { name: "Saratoga Springs", slug: "saratoga-springs" },
    { name: "Wilton", slug: "wilton" },
  ],
  "Warren County": [
    { name: "Glens Falls", slug: "glens-falls" },
    { name: "Lake George", slug: "lake-george" },
    { name: "Queensbury", slug: "queensbury" },
  ],
} as const;

const linkBase =
  "text-[13px] text-white/70 hover:text-[#5eead4] transition-colors duration-200";
const headerBase =
  "text-[11px] font-semibold text-white/95 mb-4 uppercase tracking-[0.18em]";

const Footer = () => {
  const { pathname } = useLocation();
  const showRealEstateDisclosure = isRealEstateRoute(pathname);
  const { region } = useRegion();
  /** Shared Analyze Any Deal destination (internal `/analyze-any-deal` fallback today). */
  const dealDest = analyzeAnyDealDestination({ placement: "footer-homes" });

  return (
    <footer className="bg-[#05080F] text-white border-t border-white/[0.06]">
      {/* Main columns */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            {region.logo_url ? (
              <img
                src={region.logo_url}
                alt={`${region.name} logo`}
                className="h-8 w-auto mb-3"
                loading="lazy"
              />
            ) : null}
            <h3 className="text-lg font-semibold tracking-tight text-white mb-3">
              {region.name}
            </h3>
            <p className="text-[13px] text-white/70 font-light leading-relaxed max-w-xs">
              {region.tagline ?? PLATFORM_TAGLINE + '. An independent regional media and local discovery platform for New York\'s Capital District.'}
            </p>

            <div className="mt-6 space-y-2.5">
              <a href={PHONE_TEL} className="flex items-center gap-2 text-[13px] text-white/70 hover:text-[#5eead4] transition-colors">
                <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${GENERAL_EMAIL}`} className="flex items-center gap-2 text-[13px] text-white/70 hover:text-[#5eead4] transition-colors">
                <Mail className="h-3.5 w-3.5" /> {GENERAL_EMAIL}
              </a>
              <a href={`mailto:${MEDIA_EMAIL}`} className="flex items-center gap-2 text-[13px] text-white/70 hover:text-[#5eead4] transition-colors">
                <Mail className="h-3.5 w-3.5" /> {MEDIA_EMAIL}
              </a>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-2 text-[13px] text-white/70 hover:text-[#5eead4] transition-colors">
                <Mail className="h-3.5 w-3.5" /> {BUSINESS_EMAIL}
              </a>
            </div>
          </div>

          {/* Towns */}
          <div>
            <h4 className={headerBase}>Towns</h4>
            <ul className="space-y-2.5">
              <li><Link to="/living-in/delmar" className={linkBase}>Delmar</Link></li>
              <li><Link to="/living-in/albany" className={linkBase}>Albany</Link></li>
              <li><Link to="/living-in/saratoga-springs" className={linkBase}>Saratoga Springs</Link></li>
              <li><Link to="/living-in/troy" className={linkBase}>Troy</Link></li>
              <li><Link to="/living-in/schenectady" className={linkBase}>Schenectady</Link></li>
              <li><Link to="/living-in/clifton-park" className={linkBase}>Clifton Park</Link></li>
              <li><Link to="/communities" className="text-[13px] text-[#5eead4] hover:opacity-80 transition-opacity">All towns →</Link></li>
            </ul>
          </div>

          {/* Homes */}
          <div>
            <h4 className={headerBase}>Homes</h4>
            <ul className="space-y-2.5">
              <li><Link to="/homes/search" className={linkBase}>Search Homes</Link></li>
              <li><Link to="/homes/listings" className={linkBase}>Property Board</Link></li>
              <li><Link to="/investment-properties" className={linkBase}>Investment Properties</Link></li>
              <li><Link to="/first-time-homebuyers" className={linkBase}>First-Time Buyers</Link></li>
              <li>
                {dealDest.kind === "internal" ? (
                  <Link to={dealDest.to} className={linkBase}>Deal Calculator</Link>
                ) : (
                  <a href={dealDest.href} target="_blank" rel="noopener noreferrer" className={linkBase}>Deal Calculator</a>
                )}
              </li>

              <li><Link to="/analyze-any-property" className={linkBase}>Property Intelligence</Link></li>
              <li><Link to="/investment-analyzer" className={linkBase}>Analyze a Property</Link></li>

              <li><Link to="/rentals" className={linkBase}>Rentals</Link></li>
              <li><Link to="/dealdesk" className={linkBase}>Request Report</Link></li>
            </ul>
          </div>

          {/* Local */}
          <div>
            <h4 className={headerBase}>Local</h4>
            <ul className="space-y-2.5">
              <li><Link to="/local?q=restaurant" className={linkBase}>Restaurants</Link></li>
              <li><Link to="/local?q=contractor" className={linkBase}>Home Services</Link></li>
              <li><Link to="/local?category=Healthcare" className={linkBase}>Healthcare</Link></li>
              <li><Link to="/local?category=Dental" className={linkBase}>Dental</Link></li>
              <li><Link to="/local?q=attorney" className={linkBase}>Professional Services</Link></li>
              <li><Link to="/weekly" className={linkBase}>Events</Link></li>
              <li><Link to="/local" className="text-[13px] text-[#5eead4] hover:opacity-80 transition-opacity">All businesses →</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={headerBase}>Company</h4>
            <ul className="space-y-2.5">
              <li><Link to="/about-editorial" className={linkBase}>About Our Editorial Team</Link></li>
              <li><Link to="/contact" className={linkBase}>Contact</Link></li>
              <li><Link to="/for-businesses" className={linkBase}>For Local Businesses</Link></li>
              <li><Link to="/for-businesses/apply" className={linkBase}>Apply / Claim</Link></li>
              <li><Link to="/partner-auth" className={linkBase}>Business Login</Link></li>
              <li><Link to="/claim-business" className={linkBase}>Claim Business</Link></li>
              <li><Link to="/site-index" className={linkBase}>Site Index</Link></li>
              <li><Link to="/privacy-policy" className={linkBase}>Privacy</Link></li>
              <li>
                <a
                  href="https://dos.ny.gov/system/files/documents/2021/08/fairhousingnotice.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkBase}
                >
                  NY Fair Housing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Town directory by county */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-12">
          <h3 className="text-[11px] font-semibold text-white/95 mb-8 uppercase tracking-[0.18em]">
            Explore by County
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(townDirectory).map(([county, towns]) => (
              <div key={county}>
                <h4 className="text-[10px] font-semibold text-white/55 mb-3 uppercase tracking-[0.16em]">{county}</h4>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 md:block md:space-y-1.5">
                  {towns.map((town) => (
                    <li key={town.slug}>
                      <Link to={`/living-in/${town.slug}`} className="text-[12px] text-white/60 hover:text-[#5eead4] transition-colors">
                        {town.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Neutral platform legal strip — no brokerage identity here. */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 py-8 space-y-2">
          <p className="text-[11px] text-white/55 text-center leading-relaxed">
            © {new Date().getFullYear()} {region.name}. A local discovery, media, directory, advertising, and community search platform.
          </p>
          <p className="text-[11px] text-white/40 text-center leading-relaxed max-w-3xl mx-auto">
            Real estate tools and property searches may connect users with licensed real estate professionals and third-party listing providers. Equal Housing Opportunity.
          </p>
        </div>
      </div>

      {showRealEstateDisclosure && <RealEstateDisclosure />}
    </footer>
  );
};

export default Footer;
