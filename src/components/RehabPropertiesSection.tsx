import React, { useState } from 'react';
import { Hammer, Calculator, ClipboardCheck, Home } from 'lucide-react';
import RealEstateAnalyzer from './RealEstateAnalyzer';
import LeadCaptureForm from './LeadCaptureForm';

const RehabPropertiesSection = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const rehabServices = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
      title: "Property Assessment",
      description: "Comprehensive evaluation of distressed properties to identify renovation potential and costs.",
      details: ["Structural analysis", "Cost estimation", "Permit requirements", "Timeline planning"]
    },
    {
      icon: <Calculator className="w-8 h-8 text-primary" />,
      title: "Investment Analysis",
      description: "Detailed financial analysis to ensure profitable rehab investments.",
      details: ["Purchase price analysis", "Renovation cost estimates", "After repair value (ARV)", "ROI calculations"]
    },
    {
      icon: <Hammer className="w-8 h-8 text-primary" />,
      title: "Contractor Network",
      description: "Access to our vetted network of reliable contractors and tradespeople.",
      details: ["Licensed professionals", "Competitive pricing", "Quality workmanship", "Project management"]
    },
    {
      icon: <Home className="w-8 h-8 text-primary" />,
      title: "Exit Strategy Planning",
      description: "Strategic planning for maximum returns whether flipping or holding.",
      details: ["Market timing", "Staging services", "Rental conversion", "Sale optimization"]
    }
  ];

  return (
    <>
      <section id="rehab-properties" className="py-16 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Rehab & Renovation Properties
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform distressed properties into profitable investments. Our comprehensive rehab services 
              help you navigate every aspect of property renovation, from initial assessment to final sale or rental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {rehabServices.map((service, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3 text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Fix & Flip Loan Program */}
          <div className="bg-background border border-border rounded-lg p-6 md:p-10 mb-8">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                The <span className="text-primary">Fix & Flip</span> Loan Program
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground">
                Your pathway to successful real estate investments.
              </p>
            </div>

            {/* Quick Notes Section */}
            <div className="mb-8 md:mb-12 bg-primary/5 p-6 rounded-lg border border-primary/20">
              <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center">
                <svg className="w-7 h-7 mr-3 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
                Quick Notes
              </h4>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">Down Payment Structure:</strong> 20% down for your first project, 15% for the second, and just 10% down after that, based on the purchase price.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">Repair Cost Coverage:</strong> We can lend up to 100% of your repair costs, capped at 70% of the After Repair Value (ARV).
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">Fast Closing:</strong> Expect to close your deal in just 2-3 weeks, getting you started sooner.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">DIY Friendly:</strong> No need to hire a General Contractor; you can perform the work yourself.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">Interest-Only Loan:</strong> Enjoy an interest-only loan while you're completing your flip, keeping your carrying costs low.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">No Tax Returns Required:</strong> Streamlined application process without the need for tax returns.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <p>
                    <strong className="font-semibold text-foreground">LLC Purchase:</strong> You can conveniently purchase properties through an LLC.
                  </p>
                </li>
              </ul>
            </div>

            {/* Condensed Key Highlights */}
            <div className="bg-card p-8 rounded-lg border border-border mb-8">
              <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                🏠 Example: $80k Purchase → $200k ARV
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center bg-background p-4 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary">$41,000</div>
                  <div className="text-sm text-muted-foreground">Flip Profit</div>
                  <div className="text-xs text-muted-foreground">256% ROI</div>
                </div>
                <div className="text-center bg-background p-4 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary">$945/mo</div>
                  <div className="text-sm text-muted-foreground">Rental Cash Flow</div>
                  <div className="text-xs text-muted-foreground">71% Annual ROI</div>
                </div>
                <div className="text-center bg-background p-4 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary">$16,000</div>
                  <div className="text-sm text-muted-foreground">Down Payment</div>
                  <div className="text-xs text-muted-foreground">20% Required</div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
                >
                  {showDetailedBreakdown ? '📊 Hide' : '📊 View'} Full Spreadsheet Breakdown
                  <svg className={`w-4 h-4 transition-transform ${showDetailedBreakdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Detailed Spreadsheet Breakdown - Collapsible */}
            {showDetailedBreakdown && (
              <div className="bg-background p-8 rounded-lg border border-border mb-8">
                <h4 className="text-2xl font-bold text-center text-foreground mb-8">
                  📊 Complete Financial Breakdown Spreadsheet
                </h4>
                
                {/* Base Numbers Table */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold text-foreground mb-4 bg-card p-3 rounded">📋 Base Property Info</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-card">
                          <th className="border border-border p-3 text-left font-semibold text-foreground">Item</th>
                          <th className="border border-border p-3 text-right font-semibold text-foreground">Amount</th>
                          <th className="border border-border p-3 text-left font-semibold text-foreground">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Purchase Price</td>
                          <td className="border border-border p-3 text-right font-mono text-foreground">$80,000</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">Distressed property</td>
                        </tr>
                        <tr className="bg-card/50">
                          <td className="border border-border p-3 text-foreground">After Repair Value (ARV)</td>
                          <td className="border border-border p-3 text-right font-mono text-foreground">$200,000</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">Comparable sales</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Down Payment (20%)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">$16,000</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">Your cash investment</td>
                        </tr>
                        <tr className="bg-card/50">
                          <td className="border border-border p-3 text-foreground">Max Repair Loan</td>
                          <td className="border border-border p-3 text-right font-mono text-foreground">$60,000</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">Up to 70% ARV cap</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Flip Scenario Table */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold text-foreground mb-4 bg-primary/10 p-3 rounded">🔄 Flip Scenario (Sell)</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-primary/5">
                          <th className="border border-border p-3 text-left font-semibold text-foreground">Cost/Revenue Item</th>
                          <th className="border border-border p-3 text-right font-semibold text-foreground">Amount</th>
                          <th className="border border-border p-3 text-left font-semibold text-foreground">Calculation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Sale Price (ARV)</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">$200,000</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">Market value after repairs</td>
                        </tr>
                        <tr className="bg-card/50">
                          <td className="border border-border p-3 text-foreground">Total Project Cost</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($143,000)</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">$80k + $60k + $3k carrying costs</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Selling Costs (8%)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($16,000)</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">Realtor, title, taxes</td>
                        </tr>
                        <tr className="bg-primary/10 font-semibold">
                          <td className="border border-border p-3 text-foreground">Net Profit</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">$41,000</td>
                          <td className="border border-border p-3 text-sm text-muted-foreground">256% ROI on $16k down</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Rental Scenario Table */}
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-foreground mb-4 bg-primary/10 p-3 rounded">🏠 BRRRR Scenario (Hold as Rental)</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-primary/5">
                          <th className="border border-border p-3 text-left font-semibold text-foreground">Income/Expense Item</th>
                          <th className="border border-border p-3 text-right font-semibold text-foreground">Monthly</th>
                          <th className="border border-border p-3 text-right font-semibold text-foreground">Annual</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Rental Income</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">$2,400</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">$28,800</td>
                        </tr>
                        <tr className="bg-card/50">
                          <td className="border border-border p-3 text-foreground">Mortgage Payment</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($865)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($10,380)</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Property Taxes</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($250)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($3,000)</td>
                        </tr>
                        <tr className="bg-card/50">
                          <td className="border border-border p-3 text-foreground">Insurance</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($100)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($1,200)</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-3 text-foreground">Maintenance/Vacancy (10%)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($240)</td>
                          <td className="border border-border p-3 text-right font-mono text-destructive">($2,880)</td>
                        </tr>
                        <tr className="bg-primary/10 font-semibold">
                          <td className="border border-border p-3 text-foreground">Net Cash Flow</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">$945</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">$11,340</td>
                        </tr>
                        <tr className="bg-primary/20 font-bold">
                          <td className="border border-border p-3 text-foreground">Cash-on-Cash ROI</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">5.9%</td>
                          <td className="border border-border p-3 text-right font-mono text-primary">70.9%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground italic text-center">
                  *Calculations are estimates for illustration purposes. Actual results may vary based on market conditions, property condition, and other factors.
                </div>
              </div>
            )}
          </div>

          {/* Lead Capture Form */}
          <div className="mb-12 max-w-3xl mx-auto">
            <LeadCaptureForm 
              type="rehab"
              title="Get Free Rehab Property Analysis"
              description="Receive detailed ROI calculations and profit projections for any distressed property"
              buttonText="Get My Free Analysis"
            />
          </div>

          <div className="bg-background p-8 rounded-xl border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Rehab Property Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold mr-3 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Property Identification</h4>
                      <p className="text-muted-foreground text-sm">Find distressed properties with renovation potential</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold mr-3 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Financial Analysis</h4>
                      <p className="text-muted-foreground text-sm">Calculate costs, returns, and financing options</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold mr-3 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Renovation Management</h4>
                      <p className="text-muted-foreground text-sm">Oversee quality work within budget and timeline</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold mr-3 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-foreground">Exit Strategy</h4>
                      <p className="text-muted-foreground text-sm">Sell for profit or convert to rental property</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4 text-foreground">
                  Analyze Your Investment
                </h4>
                <p className="text-muted-foreground mb-6">
                  Use our BRRRR calculator to analyze your rehab investment potential and returns.
                </p>
                <button
                  onClick={() => setShowAnalyzer(!showAnalyzer)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
                >
                  {showAnalyzer ? 'Hide Calculator' : 'Analyze your Rehab'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Property Investment Analyzer - Full Width When Shown */}
      {showAnalyzer && (
        <section className="py-8 px-4 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto">
            <RealEstateAnalyzer />
          </div>
        </section>
      )}
    </>
  );
};

export default RehabPropertiesSection;
