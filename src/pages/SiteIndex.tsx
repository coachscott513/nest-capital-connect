import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

const towns = [
  { name: "Albany", slug: "albany" },
  { name: "Amsterdam", slug: "amsterdam" },
  { name: "Clifton Park", slug: "clifton-park" },
  { name: "Delmar", slug: "delmar" },
  { name: "Guilderland", slug: "guilderland" },
  { name: "Mechanicville", slug: "mechanicville" },
  { name: "Niskayuna", slug: "niskayuna" },
  { name: "Queensbury", slug: "queensbury" },
  { name: "Saratoga Springs", slug: "saratoga-springs" },
  { name: "Schenectady", slug: "schenectady" },
  { name: "Troy", slug: "troy" },
  { name: "Voorheesville", slug: "voorheesville" },
].sort((a, b) => a.name.localeCompare(b.name));

const SiteIndex = () => {
  return (
    <>
      <Helmet>
        <title>Site Index | Capital District Nest</title>
        <meta name="description" content="Complete site map for Capital District Nest - browse all pages for homes, rentals, investment properties, and market intelligence in the Capital District." />
      </Helmet>

      <CleanHeader />

      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Site Index</h1>
          <p className="text-muted-foreground mb-12">Complete directory of all pages on Capital District Nest.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Towns */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Towns</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/communities" className="text-primary hover:underline font-medium">
                    All Towns Overview
                  </Link>
                </li>
                {towns.map((town) => (
                  <li key={town.slug}>
                    <Link to={`/towns/${town.slug}`} className="text-foreground hover:text-primary">
                      {town.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Homes for Sale */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Homes for Sale</h2>
              <ul className="space-y-2">
                <li><Link to="/homes-for-sale" className="text-foreground hover:text-primary">All Homes</Link></li>
                <li><Link to="/delmar-homes-for-sale" className="text-foreground hover:text-primary">Delmar Homes</Link></li>
                <li><Link to="/niskayuna-homes-for-sale" className="text-foreground hover:text-primary">Niskayuna Homes</Link></li>
                <li><Link to="/clifton-park-homes-for-sale" className="text-foreground hover:text-primary">Clifton Park Homes</Link></li>
                <li><Link to="/saratoga-homes-for-sale" className="text-foreground hover:text-primary">Saratoga Homes</Link></li>
                <li><Link to="/troy-homes-for-sale" className="text-foreground hover:text-primary">Troy Homes</Link></li>
                <li><Link to="/schenectady-homes-for-sale" className="text-foreground hover:text-primary">Schenectady Homes</Link></li>
                <li><Link to="/queensbury-homes-for-sale" className="text-foreground hover:text-primary">Queensbury Homes</Link></li>
                <li><Link to="/amsterdam-homes-for-sale" className="text-foreground hover:text-primary">Amsterdam Homes</Link></li>
                <li><Link to="/voorheesville-homes-for-sale" className="text-foreground hover:text-primary">Voorheesville Homes</Link></li>
              </ul>
            </div>

            {/* Rentals */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Rentals</h2>
              <ul className="space-y-2">
                <li><Link to="/rentals" className="text-foreground hover:text-primary">Rentals Hub</Link></li>
                <li><Link to="/rentals/albany" className="text-foreground hover:text-primary">Albany Rentals</Link></li>
                <li><Link to="/rentals/schenectady" className="text-foreground hover:text-primary">Schenectady Rentals</Link></li>
                <li><Link to="/rentals/troy" className="text-foreground hover:text-primary">Troy Rentals</Link></li>
                <li><Link to="/rentals/saratoga" className="text-foreground hover:text-primary">Saratoga Rentals</Link></li>
              </ul>
            </div>

            {/* For Buyers */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">For Buyers</h2>
              <ul className="space-y-2">
                <li><Link to="/first-time-homebuyers" className="text-foreground hover:text-primary">First-Time Buyer Programs</Link></li>
                <li><Link to="/grants" className="text-foreground hover:text-primary">Grants & Down Payment Help</Link></li>
                <li><Link to="/buyer-journey/first-time-buyer" className="text-foreground hover:text-primary">First-Time Buyer Guide</Link></li>
                <li><Link to="/buyer-journey/financing" className="text-foreground hover:text-primary">Financing Journey</Link></li>
                <li><Link to="/communities" className="text-foreground hover:text-primary">Neighborhood Guides</Link></li>
                <li><Link to="/markets" className="text-foreground hover:text-primary">Market Trends</Link></li>
                <li><Link to="/vip-buyer-access" className="text-foreground hover:text-primary">VIP Buyer Access</Link></li>
              </ul>
            </div>

            {/* For Investors */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">For Investors</h2>
              <ul className="space-y-2">
                <li><Link to="/investor-tools" className="text-foreground hover:text-primary">Investor Tools</Link></li>
                <li><Link to="/albany-multi-unit" className="text-foreground hover:text-primary">Albany Multi-Unit Listings</Link></li>
                <li><Link to="/troy-multi-unit" className="text-foreground hover:text-primary">Troy Multi-Unit Listings</Link></li>
                <li><Link to="/schenectady-multi-unit" className="text-foreground hover:text-primary">Schenectady Multi-Unit Listings</Link></li>
                <li><Link to="/albany-land" className="text-foreground hover:text-primary">Land for Sale</Link></li>
                <li><Link to="/cash-flow-report" className="text-foreground hover:text-primary">Cash Flow Analyzer</Link></li>
              </ul>

              <h3 className="text-md font-medium text-foreground mt-6 mb-3">Market Reports</h3>
              <ul className="space-y-2">
                <li><Link to="/investor/albany-multi-unit-market" className="text-foreground hover:text-primary">Albany Multi-Unit Market</Link></li>
                <li><Link to="/investor/saratoga-multi-unit-market" className="text-foreground hover:text-primary">Saratoga Multi-Unit Market</Link></li>
                <li><Link to="/investor/fulton-montgomery-multi-unit-market" className="text-foreground hover:text-primary">Fulton & Montgomery Market</Link></li>
                <li><Link to="/investor/nyc-to-albany-roi" className="text-foreground hover:text-primary">NYC → Albany ROI Playbook</Link></li>
                <li><Link to="/investor/1031-nyc-to-albany" className="text-foreground hover:text-primary">1031 Exchange Playbook</Link></li>
                <li><Link to="/investor/analyze-multifamily" className="text-foreground hover:text-primary">How to Analyze Multi-Family</Link></li>
                <li><Link to="/investor/best-neighborhoods-cash-flow-capital-district" className="text-foreground hover:text-primary">Best Neighborhoods for Cash Flow</Link></li>
              </ul>
            </div>

            {/* Intelligence Reports */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Intelligence</h2>
              <ul className="space-y-2">
                <li><Link to="/reports/sample-property-intelligence" className="text-primary hover:underline font-medium">Sample Property Report</Link></li>
                <li><Link to="/dealdesk" className="text-foreground hover:text-primary">Request a Report</Link></li>
                <li><Link to="/intel/1999-ridge-road-queensbury-ny" className="text-foreground hover:text-primary">Ridge Road Intel Report</Link></li>
              </ul>

              <h3 className="text-md font-medium text-foreground mt-6 mb-3">Town Intelligence</h3>
              <ul className="space-y-2">
                <li><Link to="/intel/albany" className="text-foreground hover:text-primary">Albany Intelligence</Link></li>
                <li><Link to="/intel/delmar" className="text-foreground hover:text-primary">Delmar Intelligence</Link></li>
                <li><Link to="/intel/niskayuna" className="text-foreground hover:text-primary">Niskayuna Intelligence</Link></li>
                <li><Link to="/intel/troy" className="text-foreground hover:text-primary">Troy Intelligence</Link></li>
                <li><Link to="/intel/schenectady" className="text-foreground hover:text-primary">Schenectady Intelligence</Link></li>
                <li><Link to="/intel/saratoga" className="text-foreground hover:text-primary">Saratoga Intelligence</Link></li>
              </ul>
            </div>

            {/* About & Contact */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">About & Contact</h2>
              <ul className="space-y-2">
                <li><Link to="/dealdesk" className="text-foreground hover:text-primary">Contact / Deal Desk</Link></li>
                <li><Link to="/reviews" className="text-foreground hover:text-primary">Reviews</Link></li>
                <li><Link to="/blog" className="text-foreground hover:text-primary">Blog</Link></li>
                <li><Link to="/privacy-policy" className="text-foreground hover:text-primary">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Market Insights */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Market Insights</h2>
              <ul className="space-y-2">
                <li><Link to="/markets" className="text-foreground hover:text-primary">All Markets</Link></li>
                <li><Link to="/delmar-market-insights" className="text-foreground hover:text-primary">Delmar Market Insights</Link></li>
                <li><Link to="/schenectady-county-real-estate" className="text-foreground hover:text-primary">Schenectady County</Link></li>
                <li><Link to="/markets/albany-single-family-homes" className="text-foreground hover:text-primary">Albany Single Family</Link></li>
                <li><Link to="/markets/schenectady-single-family-homes" className="text-foreground hover:text-primary">Schenectady Single Family</Link></li>
                <li><Link to="/markets/troy-single-family-homes" className="text-foreground hover:text-primary">Troy Single Family</Link></li>
                <li><Link to="/markets/saratoga-springs-single-family-homes" className="text-foreground hover:text-primary">Saratoga Single Family</Link></li>
              </ul>
            </div>

            {/* Featured Listings */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">Featured Listings</h2>
              <ul className="space-y-2">
                <li><Link to="/listings/22-lavery-drive-delmar" className="text-foreground hover:text-primary">22 Lavery Drive, Delmar</Link></li>
                <li><Link to="/listings/1999-ridge-road-queensbury" className="text-foreground hover:text-primary">1999 Ridge Road, Queensbury</Link></li>
                <li><Link to="/listings/137a-elsmere-ave-delmar" className="text-foreground hover:text-primary">137A Elsmere Ave, Delmar</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SiteIndex;
