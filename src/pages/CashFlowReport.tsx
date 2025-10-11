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
        <link rel="canonical" href="https://capitaldistrictnest.com/cash-flow-report" />
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

              <div className="my-12 text-center">
                <span className="uppercase font-normal tracking-[0.125rem] text-sm text-muted-foreground block mb-4 relative after:content-[''] after:block after:mt-4 after:max-w-[100px] after:mx-auto after:h-[1px] after:bg-border">
                  Request Information
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold mb-5">
                  Subscribe Free
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[750px] mx-auto mb-8">
                  Unsubscribe anytime. No spam — just high-signal opportunities.
                </p>
                <div className="max-w-[800px] mx-auto">
                  <iframe
                    src="https://scottalvarez.remax.com/contact.php"
                    title="Cash Flow Report Subscription Form"
                    style={{ width: '100%', height: '700px', border: 'none' }}
                    scrolling="no"
                  />
                </div>
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
