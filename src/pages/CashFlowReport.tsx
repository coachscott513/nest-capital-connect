import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CashFlowReport = () => {
  return (
    <>
      <Helmet>
        <title>Weekly Cash-Flow Report | Albany Investment Property Newsletter</title>
        <meta name="description" content="Subscribe to our free weekly cash-flow report. Get pre-analyzed investment properties, market trends, and ROI insights delivered to your inbox every week." />
        <meta name="keywords" content="albany investment newsletter, cash flow report albany, weekly property analysis, albany real estate investor report" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Weekly Cash-Flow Report — Free Investor Newsletter
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Every week, we send you pre-analyzed investment properties, market trends, and actionable insights for Albany County real estate investors.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">What's Inside Each Report</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>3-5 curated cash-flow properties (multi-units, flips, land)</li>
                <li>Cap rate & cash-on-cash return breakdowns</li>
                <li>Weekly rental market trends and inventory updates</li>
                <li>Financing tips, tax strategies, and local market insights</li>
              </ul>

              <div className="my-8 text-center bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Subscribe to the Free Weekly Investor Report</h3>
                <p className="text-muted-foreground mb-4">Join hundreds of investors tracking the Capital District market.</p>
                <iframe
                  src="YOUR_BOLDTRAIL_FORM_URL?tag=CDN_Report&campaign=Weekly_Report"
                  title="Cash Flow Report Signup"
                  className="w-full max-w-[640px] h-[520px] border-0 rounded-xl mx-auto"
                  loading="lazy"
                />
              </div>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Who Should Subscribe?</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Active investors tracking Albany County deals</li>
                <li>Out-of-state buyers looking for local intel</li>
                <li>First-time house-hackers exploring multi-units</li>
                <li>Anyone considering selling or trading up their portfolio</li>
              </ul>

              <nav className="flex flex-wrap gap-2 items-center mt-8 pt-6 border-t border-border text-sm">
                <a href="/albany-investment-properties" className="text-primary hover:underline">Investment</a>
                <span className="text-muted-foreground">·</span>
                <a href="/albany-multi-unit" className="text-primary hover:underline">Multi-Unit</a>
                <span className="text-muted-foreground">·</span>
                <a href="/albany-land" className="text-primary hover:underline">Land</a>
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

export default CashFlowReport;
