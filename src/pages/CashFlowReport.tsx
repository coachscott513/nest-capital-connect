import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { TrendingUp, DollarSign, BarChart3, Mail } from "lucide-react";

const CashFlowReport = () => {
  return (
    <>
      <Helmet>
        <title>Weekly Cash-Flow Report | Albany Investment Property Newsletter</title>
        <meta name="description" content="Subscribe to our free weekly cash-flow report. Get pre-analyzed investment properties, market trends, and ROI insights delivered to your inbox every week." />
        <meta name="keywords" content="albany investment newsletter, cash flow report albany, weekly property analysis, albany real estate investor report" />
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
                    Weekly Cash-Flow Report
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Free weekly investor insights with pre-analyzed properties, market trends, and cash-flow opportunities in Albany County.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Top 3 Investment Deals</h3>
                        <p className="text-sm text-muted-foreground">Hand-picked properties with the best cash-flow potential each week</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Market Analysis</h3>
                        <p className="text-sm text-muted-foreground">Rental trends, cap rates, and neighborhood insights</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">ROI Calculations</h3>
                        <p className="text-sm text-muted-foreground">Complete financial analysis for every featured property</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <LeadCaptureForm 
                    type="report"
                    title="Subscribe to free weekly investor insights"
                    description="Join 500+ investors receiving our weekly cash-flow report"
                    buttonText="Subscribe to free weekly investor insights"
                    boldtrailTag="CDN_Report"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">What's Included in Each Report</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-border rounded-lg">
                  <DollarSign className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Featured Properties</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ 3-5 pre-analyzed investment properties</li>
                    <li>✓ Cap rate and cash-on-cash return calculations</li>
                    <li>✓ Estimated renovation costs</li>
                    <li>✓ Rental income projections</li>
                  </ul>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <BarChart3 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ Weekly market trends and statistics</li>
                    <li>✓ Neighborhood hot spots</li>
                    <li>✓ Rental rate updates</li>
                    <li>✓ Days on market analysis</li>
                  </ul>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <Mail className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Investor Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ Financing strategies</li>
                    <li>✓ Tax optimization tips</li>
                    <li>✓ Property management insights</li>
                    <li>✓ Local market updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sample Report Preview */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Recent Report Highlights</h2>
              <div className="bg-card border rounded-lg p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">This Week's Top Deal</h3>
                    <p className="text-muted-foreground mb-3">123 Main St, Albany - Duplex</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="font-semibold">Price</div>
                        <div className="text-muted-foreground">$185,000</div>
                      </div>
                      <div>
                        <div className="font-semibold">Cap Rate</div>
                        <div className="text-primary font-semibold">8.2%</div>
                      </div>
                      <div>
                        <div className="font-semibold">Monthly Cash Flow</div>
                        <div className="text-primary font-semibold">$725</div>
                      </div>
                      <div>
                        <div className="font-semibold">CoC Return</div>
                        <div className="text-primary font-semibold">15.3%</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Market Insight</h4>
                    <p className="text-sm text-muted-foreground">
                      Multi-family inventory down 12% this month. Cap rates holding steady at 7-9% for well-maintained properties in established neighborhoods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Start Receiving Your Free Report</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of successful investors who rely on our weekly analysis to find the best deals in Albany County.
              </p>
              <LeadCaptureForm 
                type="report"
                title="Subscribe to free weekly investor insights"
                buttonText="Subscribe to free weekly investor insights"
                boldtrailTag="CDN_Report"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CashFlowReport;
