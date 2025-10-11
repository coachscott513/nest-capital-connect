import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AlbanyLand = () => {
  return (
    <>
      <Helmet>
        <title>Albany Land for Sale | Build, Subdivide, or Hold Long-Term</title>
        <meta name="description" content="Find land in Albany County—buildable lots, rural acreage, and investor parcels with local zoning notes." />
        <meta name="keywords" content="albany land for sale, buildable lots albany, albany ny land, residential lots albany county" />
        <link rel="canonical" href="https://capitaldistrictnest.com/albany-land" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Albany Land for Sale — Build, Subdivide, or Hold Long-Term
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                From in-town lots to rural acreage, land plays a key role in Capital District portfolios. We help you assess zoning, utilities, soil tests, and resale potential before you commit.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Due Diligence Checklist</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Zoning/use, setbacks, and frontage</li>
                <li>Water/sewer or well/septic feasibility</li>
                <li>Soil/percolation tests and wetlands</li>
                <li>Subdivision or minor lot line adjustments</li>
              </ul>

              <div className="my-8 py-12 text-center">
                <span className="uppercase font-normal tracking-[0.125rem] text-sm text-muted-foreground block mb-4 relative after:content-[''] after:block after:mt-4 after:max-w-[100px] after:mx-auto after:h-[1px] after:bg-border">
                  Request Information
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold mb-5">
                  Get Albany Land Opportunities
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[750px] mx-auto mb-8">
                  Tell us your criteria and we&apos;ll send matching parcels + next steps.
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </div>

              <nav className="flex flex-wrap gap-2 items-center mt-8 pt-6 border-t border-border text-sm">
                <a href="/albany-investment-properties" className="text-primary hover:underline">Investment</a>
                <span className="text-muted-foreground">·</span>
                <a href="/albany-multi-unit" className="text-primary hover:underline">Multi-Unit</a>
                <span className="text-muted-foreground">·</span>
                <a href="/cash-flow-report" className="text-primary hover:underline">Cash-Flow Report</a>
              </nav>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyLand;
