import { Helmet } from "react-helmet";
import MainLayout from "@/components/MainLayout";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const FirstTimeHomebuyers = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Albany First-Time Home Buyer Grants & Low-Down Programs</title>
        <meta name="description" content="See every Albany-area grant, low-down, and first-time buyer option. Check eligibility in minutes." />
        <meta name="keywords" content="albany first time home buyer, albany down payment assistance, albany fha loans, albany grants" />
        <link rel="canonical" href="https://capitaldistrictnest.com/first-time-buyer-programs-albany" />
      </Helmet>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Albany First-Time Home Buyer
            </h1>
            <p className="text-xl text-muted-foreground">
              Grants & Low-Down Programs
            </p>
          </div>
        </section>

        <section className="py-12 px-4 bg-background">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Unlock down-payment help, reduced rates, and closing cost assistance available in Albany County. We&apos;ll match you with the right lender and program, then guide your purchase from search to keys.
            </p>

            <h2 className="text-2xl font-semibold mb-3 mt-8 text-foreground">Programs We Track</h2>
            <ul className="list-disc ml-5 space-y-2 text-muted-foreground mb-6">
              <li>State and local down-payment assistance grants</li>
              <li>FHA, VA, USDA, SONYMA, and lender credits</li>
              <li>Seller concessions and inspection credits strategies</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3 mt-8 text-foreground">Next Steps</h2>
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

        <section className="py-12 text-center bg-card border-t border-border">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-semibold mb-5 text-foreground">
              Still have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Let us know if there&apos;s anything we can help answer to make this important time stress-free.
            </p>
            <div className="max-w-md mx-auto">
              <LeadCaptureForm 
                type="investment"
                title="Get help now"
                description="Ask about grants, low-down options, and your next steps."
                buttonText="Contact us now"
              />
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default FirstTimeHomebuyers;
