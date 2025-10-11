import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AlbanyInvestmentProperties = () => {
  return (
    <>
      <Helmet>
        <title>Albany Investment Properties | Cash-Flow Deals & ROI Analysis</title>
        <meta name="description" content="Find the best investment properties in Albany County. Multi-units, flips, and cash-flow deals—updated weekly." />
        <meta name="keywords" content="albany investment properties, albany rental properties for sale, albany multi family homes, cash flow properties albany" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Albany Investment Properties — Cash-Flow Deals Across the Capital District
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover profitable investment properties in Albany, Troy, Schenectady, and Saratoga. From turnkey rentals to rehab flips and multi-unit buildings, Capital District Nest helps you identify properties with strong ROI and long-term potential.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Why the Capital District Works for Investors</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Consistent rental demand (universities, hospitals, state government)</li>
                <li>Lower acquisition costs vs. downstate and Boston markets</li>
                <li>Attractive cash-on-cash returns and value-add opportunities</li>
                <li>Local contractor, lender, and property management networks</li>
              </ul>

              <div className="my-8 text-center bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Request Your Free Albany Investment Report</h3>
                <p className="text-muted-foreground mb-4">Weekly cash-flow property alerts + ROI breakdowns, straight to your inbox.</p>
                <iframe
                  src="YOUR_BOLDTRAIL_FORM_URL?tag=CDN_Investment&campaign=Cashflow_List"
                  title="Investment Leads"
                  className="w-full max-w-[640px] h-[520px] border-0 rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-3 mt-8">What You'll Receive</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Curated listings (multi-unit, flips, rentals, select land)</li>
                <li>Cash-on-cash estimates and rent comps</li>
                <li>Financing and rehab options tailored to your goals</li>
              </ul>

              <nav className="flex flex-wrap gap-2 items-center mt-8 pt-6 border-t border-border text-sm">
                <a href="/albany-multi-unit" className="text-primary hover:underline">Multi-Unit</a>
                <span className="text-muted-foreground">·</span>
                <a href="/albany-land" className="text-primary hover:underline">Land</a>
                <span className="text-muted-foreground">·</span>
                <a href="/cash-flow-report" className="text-primary hover:underline">Cash-Flow Report</a>
                <span className="text-muted-foreground">·</span>
                <a href="/sell-investment-property" className="text-primary hover:underline">Sell Investment</a>
              </nav>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyInvestmentProperties;
