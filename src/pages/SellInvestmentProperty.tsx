import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { DollarSign, Users, TrendingUp, Award } from "lucide-react";

const SellInvestmentProperty = () => {
  return (
    <>
      <Helmet>
        <title>Sell Your Investment Property Albany | Fast Cash Offers</title>
        <meta name="description" content="Sell your investment property in Albany County. Get a free valuation, access to serious investors, and fast cash offers. Multi-family and rental property specialists." />
        <meta name="keywords" content="sell investment property albany, sell rental property albany, albany property valuation, investment property buyer albany" />
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
                    Sell Your Investment Property
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Get a free property valuation and connect with serious investors ready to make cash offers.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Free Property Valuation</h3>
                        <p className="text-sm text-muted-foreground">Get a detailed analysis of your property's market value and rental income potential</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Access to Serious Investors</h3>
                        <p className="text-sm text-muted-foreground">We have a database of active buyers looking for investment properties</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Fast Cash Offers</h3>
                        <p className="text-sm text-muted-foreground">Close in as little as 7-14 days with our investor network</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <LeadCaptureForm 
                    type="seller"
                    title="Get my property valuation"
                    description="Receive a detailed valuation report and connect with serious investors"
                    buttonText="Get my property valuation"
                    boldtrailTag="CDN_Seller"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Why Sell With Us */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Sell Your Investment Property With Us?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-border rounded-lg">
                  <Award className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Investment Property Experts</h3>
                  <p className="text-muted-foreground">We specialize in multi-family and rental properties - we know what investors want</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Pre-Qualified Buyers</h3>
                  <p className="text-muted-foreground">Our investor network is actively looking for properties like yours</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <TrendingUp className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Maximum Value</h3>
                  <p className="text-muted-foreground">We market to investors who understand cap rates and cash flow</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Sell?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get your free property valuation and see what serious investors will pay for your property.
              </p>
              <LeadCaptureForm 
                type="seller"
                title="Get my property valuation"
                buttonText="Get my property valuation"
                boldtrailTag="CDN_Seller"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SellInvestmentProperty;
