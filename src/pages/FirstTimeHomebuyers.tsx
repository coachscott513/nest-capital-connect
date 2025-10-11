import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";

const FirstTimeHomebuyers = () => {
  return (
    <>
      <Helmet>
        <title>Albany First-Time Home Buyer Grants & Low-Down Programs</title>
        <meta name="description" content="See every Albany-area grant, low-down, and first-time buyer option. Check eligibility in minutes." />
        <meta name="keywords" content="albany first time home buyer, albany down payment assistance, albany fha loans, albany grants" />
        <link rel="canonical" href="https://capitaldistrictnest.com/first-time-buyer-programs-albany" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <HeroSection />
        
        <main className="flex-grow">
          <section className="py-8 px-4">
            <div className="max-w-[1000px] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Albany First-Time Home Buyer — Grants & Low-Down Programs
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Unlock down-payment help, reduced rates, and closing cost assistance available in Albany County. We&apos;ll match you with the right lender and program, then guide your purchase from search to keys.
              </p>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Programs We Track</h2>
              <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
                <li>State and local down-payment assistance grants</li>
                <li>FHA, VA, USDA, SONYMA, and lender credits</li>
                <li>Seller concessions and inspection credits strategies</li>
              </ul>

              <div className="my-8 py-12 text-center">
                <span className="uppercase font-normal tracking-[0.125rem] text-sm text-muted-foreground block mb-4 relative after:content-[''] after:block after:mt-4 after:max-w-[100px] after:mx-auto after:h-[1px] after:bg-border">
                  Request Information
                </span>
                <h2 className="text-3xl md:text-[2.5rem] font-bold mb-5">
                  Check My Eligibility
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-[750px] mx-auto mb-8">
                  Answer a few questions and we&apos;ll send your best program options.
                </p>
                <a
                  href="/#contact"
                  className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
              </div>

              <h2 className="text-2xl font-semibold mb-3 mt-8">Next Steps</h2>
              <p className="text-muted-foreground mb-6">
                Get pre-approved, set your budget, and browse homes using our live search (top of homepage). We&apos;ll line up tours and negotiate the best terms.
              </p>

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

export default FirstTimeHomebuyers;