import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const AlbanyMultiUnit = () => {
  return (
    <>
      <Helmet>
        <title>Albany Multi-Family & Duplex Listings | High Cash Flow Opportunities</title>
        <meta name="description" content="Duplexes, triplexes, and small apartment buildings for sale in Albany County. ROI tools + weekly investor reports." />
        <meta name="keywords" content="albany multi unit properties, albany duplex for sale, albany triplex, albany apartment buildings" />
        <link rel="canonical" href="https://capitaldistrictnest.com/albany-multi-unit" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Albany Multi-Family & Duplex Investment Properties
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Explore duplexes, triplexes, and small apartment buildings across Albany County. Multi-unit homes can offer strong rental yields, steady cash-flow, and flexible financing options.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">What to Look For</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Separate utilities and updated mechanicals</li>
                <li>Documented rent rolls and tenant history</li>
                <li>Clear value-add (under-market rents, cosmetic updates)</li>
                <li>Local property management availability</li>
              </ul>

              <div className="py-12 text-center" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                <div className="container mx-auto max-w-3xl px-4">
                  <h2 className="text-3xl font-semibold mb-5">
                    Still have Questions?
                  </h2>
                  <p className="text-lg mb-6">
                    Let us know if there&apos;s anything we can help answer to make this important time stress-free.
                  </p>
                  <div className="max-w-md mx-auto">
                    <LeadCaptureForm 
                      type="multi-unit"
                      title="Contact us now"
                      description="Tell us your criteria and we’ll send matching multi-unit deals."
                      buttonText="Send message"
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Financing Options</h2>
              <p className="text-muted-foreground mb-6">
                From low-down owner-occupant financing to investor loans and portfolio products, we'll connect you with lenders that understand multi-family underwriting.
              </p>

              <nav className="flex flex-wrap gap-2 items-center mt-8 pt-6 border-t border-border text-sm">
                <a href="/albany-investment-properties" className="text-primary hover:underline">Investment</a>
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

export default AlbanyMultiUnit;
