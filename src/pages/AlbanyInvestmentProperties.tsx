import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const AlbanyInvestmentProperties = () => {
  return (
    <>
      <Helmet>
        <title>Albany Investment Properties | Cash-Flow Deals & ROI Analysis</title>
        <meta name="description" content="Find the best investment properties in Albany County. Multi-units, flips, and cash-flow deals—updated weekly." />
        <meta name="keywords" content="albany investment properties, albany rental properties for sale, albany multi family homes, cash flow properties albany" />
        <link rel="canonical" href="https://capitaldistrictnest.com/albany-investment-properties" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20 md:pt-24">
          <section className="py-12 px-4 bg-background">
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

          <section className="py-12 text-center" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
            <div className="container mx-auto max-w-3xl px-4">
              <h2 className="text-3xl font-semibold mb-5">
                Still have Questions?
              </h2>
              <p className="text-lg mb-6">
                Let us know if there&apos;s anything we can help answer to make this important time stress-free.
              </p>
              <div className="max-w-md mx-auto">
                <LeadCaptureForm 
                  type="investment"
                  title="Contact us now"
                  description="We'll get back to you quickly about deals that fit your goals."
                  buttonText="Send message"
                />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyInvestmentProperties;
