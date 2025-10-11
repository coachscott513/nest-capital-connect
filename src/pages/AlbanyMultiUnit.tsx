import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

              <div className="my-8 py-12 text-center">
                <span className="uppercase font-normal tracking-[0.125rem] text-sm text-muted-foreground block mb-4 relative after:content-[''] after:block after:mt-4 after:max-w-[100px] after:mx-auto after:h-[1px] after:bg-border">
                  Request Information
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold mb-5">
                  Get Multi-Unit Listings + Cash-Flow Analysis
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[750px] mx-auto mb-8">
                  We&apos;ll send you the best-performing multi-unit deals weekly.
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
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
