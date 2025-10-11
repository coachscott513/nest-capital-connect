import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CashFlowReport = () => {
  return (
    <>
      <Helmet>
        <title>Albany Weekly Cash-Flow Report | Free Investor Hot Sheet</title>
        <meta name="description" content="Subscribe to Albany's weekly investor Hot Sheet. Cash-flow deals, rents, and ROI snapshots delivered free." />
        <meta name="keywords" content="albany investment newsletter, cash flow report albany, weekly property analysis, albany real estate investor report" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Albany Weekly Cash-Flow Report — Free Investor Hot Sheet
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Every week we highlight the strongest cash-flow opportunities across the Capital District, with rent comps, estimated repairs, and cash-on-cash snapshots. Join free below.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">What&apos;s Inside Each Issue</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Top 3 cash-flow deals (multi-unit, rental, or land play)</li>
                <li>Rent comps and conservative ROI estimates</li>
                <li>Notes on financing, grants, or rehab approaches</li>
              </ul>

              <div className="my-8 text-center bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Subscribe Free</h3>
                <p className="text-muted-foreground mb-4">Unsubscribe anytime. No spam — just high-signal opportunities.</p>
                <iframe
                  src="YOUR_BOLDTRAIL_FORM_URL?tag=CDN_Report&campaign=Cashflow_List"
                  title="Cash-Flow Report Leads"
                  className="w-full max-w-[640px] h-[520px] border-0 rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Latest Highlights</h2>
              <p className="text-muted-foreground mb-3">See our latest analysis and sample numbers:</p>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li><a href="/albany-investment-properties" className="text-primary hover:underline">Investment Properties</a></li>
                <li><a href="/albany-multi-unit" className="text-primary hover:underline">Multi-Unit Deals</a></li>
                <li><a href="/albany-land" className="text-primary hover:underline">Land Opportunities</a></li>
              </ul>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CashFlowReport;
