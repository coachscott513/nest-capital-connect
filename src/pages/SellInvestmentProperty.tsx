import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const SellInvestmentProperty = () => {
  return (
    <>
      <Helmet>
        <title>Sell Your Investment Property in Albany | Quiet, Fast Options</title>
        <meta name="description" content="Sell your multi-unit, flip, or rental quickly. Investor buyers, off-market options, and full listing services." />
        <meta name="keywords" content="sell investment property albany, sell rental property albany, albany property valuation, investment property buyer albany" />
        <link rel="canonical" href="https://capitaldistrictnest.com/sell-investment-property" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20 md:pt-24">
          <section className="py-12 px-4 bg-background">
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

              <nav className="flex flex-wrap gap-2 items-center mt-8 pt-6 border-t border-border text-sm">
                <a href="/albany-investment-properties" className="text-primary hover:underline">Investment</a>
                <span className="text-muted-foreground">·</span>
                <a href="/albany-multi-unit" className="text-primary hover:underline">Multi-Unit</a>
                <span className="text-muted-foreground">·</span>
                <a href="/cash-flow-report" className="text-primary hover:underline">Cash-Flow Report</a>
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
                  type="seller"
                  title="Contact us now"
                  description="We'll respond promptly with your best sale options."
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

export default SellInvestmentProperty;
