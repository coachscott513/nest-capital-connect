import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SellInvestmentProperty = () => {
  return (
    <>
      <Helmet>
        <title>Sell Your Investment Property in Albany | Quiet, Fast Options</title>
        <meta name="description" content="Sell your multi-unit, flip, or rental quickly. Investor buyers, off-market options, and full listing services." />
        <meta name="keywords" content="sell investment property albany, sell rental property albany, albany property valuation, investment property buyer albany" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Sell Your Investment Property in Albany — Quiet & Fast Options
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Whether you're exiting a flip, trading up via 1031, or offloading a tenant-occupied rental, we'll position your asset to the right buyers and minimize vacancy and disruption.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Your Selling Options</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>Quiet sale to our investor network</li>
                <li>Full-market MLS listing for top dollar</li>
                <li>Tenant-in-place sale to preserve cash-flow</li>
                <li>Contractor touch-ups and staging for premium pricing</li>
              </ul>

              <div className="my-8 text-center bg-muted/30 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-3">Request a Value & Exit Strategy</h3>
                <p className="text-muted-foreground mb-6 text-lg">Tell us the basics; we&apos;ll provide comps, buyer profile, and next steps.</p>
                <iframe
                  src="https://scottalvarez.remax.com/contact.php"
                  title="Sell Investment Property Contact Form"
                  className="w-full max-w-[700px] h-[600px] border-0 rounded-xl mx-auto shadow-lg"
                  loading="lazy"
                />
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

export default SellInvestmentProperty;
