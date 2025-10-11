import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Building2, TrendingUp, DollarSign, Calendar } from "lucide-react";

const AlbanyInvestmentProperties = () => {
  return (
    <>
      <Helmet>
        <title>Albany Investment Properties For Sale | Cash-Flow Deals</title>
        <meta name="description" content="Find investment properties for sale in Albany County. Pre-analyzed cash-flow deals with ROI calculations. Multi-family, duplexes, and rental properties." />
        <meta name="keywords" content="albany investment properties, albany rental properties for sale, albany multi family homes, cash flow properties albany" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    Albany Investment Properties
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Get weekly cash-flow deals pre-analyzed with ROI calculations, neighborhood insights, and renovation estimates.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Cash-Flow Analysis</h3>
                        <p className="text-sm text-muted-foreground">Every property includes rental income projections and expense breakdowns</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">ROI Calculations</h3>
                        <p className="text-sm text-muted-foreground">See cap rates, cash-on-cash returns, and appreciation potential</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Weekly Updates</h3>
                        <p className="text-sm text-muted-foreground">Fresh deals every week before they hit the market</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <LeadCaptureForm 
                    type="investment"
                    title="Send me weekly cash-flow deals"
                    description="Get pre-analyzed investment properties with ROI calculations delivered every week"
                    buttonText="Send me weekly cash-flow deals"
                    boldtrailTag="CDN_Investment"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Property Types */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Investment Property Types</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-border rounded-lg">
                  <Building2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Multi-Family</h3>
                  <p className="text-muted-foreground">Duplexes, triplexes, and apartment buildings with strong rental demand</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <DollarSign className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Single-Family Rentals</h3>
                  <p className="text-muted-foreground">Turnkey and value-add opportunities in high-demand neighborhoods</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Commercial</h3>
                  <p className="text-muted-foreground">Mixed-use buildings and commercial properties in prime locations</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Start Receiving Deals Today</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join Albany County's most serious investors. Get exclusive access to off-market deals and pre-analyzed opportunities.
              </p>
              <LeadCaptureForm 
                type="investment"
                title="Send me weekly cash-flow deals"
                buttonText="Send me weekly cash-flow deals"
                boldtrailTag="CDN_Investment"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyInvestmentProperties;
