import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Building2, Users, BarChart3, Calculator } from "lucide-react";

const AlbanyMultiUnit = () => {
  return (
    <>
      <Helmet>
        <title>Albany Multi-Unit Properties | Duplexes, Triplexes & Apartments</title>
        <meta name="description" content="Find multi-unit properties for sale in Albany County. Duplexes, triplexes, and apartment buildings with ROI reports and rental analysis." />
        <meta name="keywords" content="albany multi unit properties, albany duplex for sale, albany triplex, albany apartment buildings" />
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
                    Albany Multi-Unit Properties
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Duplexes, triplexes, and apartment buildings with complete ROI analysis and rental market data.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">2-4 Unit Properties</h3>
                        <p className="text-sm text-muted-foreground">Duplexes and small multi-families perfect for FHA house-hacking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">5+ Unit Buildings</h3>
                        <p className="text-sm text-muted-foreground">Apartment buildings with strong rental demand and cash flow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">ROI Reports</h3>
                        <p className="text-sm text-muted-foreground">Detailed analysis including cap rates, NOI, and cash-on-cash returns</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <LeadCaptureForm 
                    type="multi-unit"
                    title="Request multi-unit listings + ROI report"
                    description="Get exclusive access to multi-family properties with complete financial analysis"
                    buttonText="Request multi-unit listings + ROI report"
                    boldtrailTag="CDN_MultiUnit"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Multi-Unit Properties?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-border rounded-lg">
                  <Calculator className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Better Cash Flow</h3>
                  <p className="text-muted-foreground">Multiple rental incomes offset vacancies and provide stronger returns</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <Building2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">FHA Financing Available</h3>
                  <p className="text-muted-foreground">Live in one unit while renters pay your mortgage (2-4 units)</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <BarChart3 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Economies of Scale</h3>
                  <p className="text-muted-foreground">Lower per-unit maintenance and management costs</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Get Your Multi-Unit ROI Report</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Receive detailed analysis on the best multi-family opportunities in Albany County.
              </p>
              <LeadCaptureForm 
                type="multi-unit"
                title="Request multi-unit listings + ROI report"
                buttonText="Request multi-unit listings + ROI report"
                boldtrailTag="CDN_MultiUnit"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyMultiUnit;
