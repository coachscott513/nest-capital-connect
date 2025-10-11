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
        <link rel="canonical" href="https://capitaldistrictnest.com/albany-investment-properties" />
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

              <div className="my-12 text-center">
                <span className="uppercase font-normal tracking-[0.125rem] text-sm text-muted-foreground block mb-4 relative after:content-[''] after:block after:mt-4 after:max-w-[100px] after:mx-auto after:h-[1px] after:bg-border">
                  Request Information
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold mb-5">
                  Get Your Free Albany Investment Report
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[750px] mx-auto mb-8">
                  Weekly cash-flow property alerts + ROI breakdowns, straight to your inbox.
                </p>
                <div className="max-w-[800px] mx-auto">
                  <iframe
                    src="https://scottalvarez.remax.com/contact.php"
                    title="Investment Property Contact Form"
                    style={{ width: '100%', height: '700px', border: 'none' }}
                    scrolling="no"
                  />
                </div>
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

          {/* Contact Section */}
          <section className="py-12 px-4 bg-primary/5">
            <div className="container mx-auto max-w-3xl text-center">
              <span className="uppercase font-normal tracking-wider text-sm text-muted-foreground block mb-4">
                Thinking of Selling?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                Get your home sold fast and for Top Dollar!
              </h2>
              <p className="text-lg text-muted-foreground max-w-[750px] mx-auto mb-8">
                Listing your home doesn&apos;t have to be stressful or overwhelming! You can count on great service with years of experience through each transaction. Contact me today to determine the next steps in fulfilling this rewarding experience.
              </p>
              <a 
                href="/#contact" 
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyInvestmentProperties;
