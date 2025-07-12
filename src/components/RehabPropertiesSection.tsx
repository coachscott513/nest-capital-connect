import React, { useState } from 'react';
import { Hammer, Calculator, ClipboardCheck, Home } from 'lucide-react';
import RealEstateAnalyzer from './RealEstateAnalyzer';
import LeadCaptureForm from './LeadCaptureForm';

const RehabPropertiesSection = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState(false);
  const rehabServices = [
    {
      icon: <ClipboardCheck className="w-8 h-8 text-blue-500" />,
      title: "Property Assessment",
      description: "Comprehensive evaluation of distressed properties to identify renovation potential and costs.",
      details: ["Structural analysis", "Cost estimation", "Permit requirements", "Timeline planning"]
    },
    {
      icon: <Calculator className="w-8 h-8 text-green-500" />,
      title: "Investment Analysis",
      description: "Detailed financial analysis to ensure profitable rehab investments.",
      details: ["Purchase price analysis", "Renovation cost estimates", "After repair value (ARV)", "ROI calculations"]
    },
    {
      icon: <Hammer className="w-8 h-8 text-orange-500" />,
      title: "Contractor Network",
      description: "Access to our vetted network of reliable contractors and tradespeople.",
      details: ["Licensed professionals", "Competitive pricing", "Quality workmanship", "Project management"]
    },
    {
      icon: <Home className="w-8 h-8 text-purple-500" />,
      title: "Exit Strategy Planning",
      description: "Strategic planning for maximum returns whether flipping or holding.",
      details: ["Market timing", "Staging services", "Rental conversion", "Sale optimization"]
    }
  ];

  return (
    <>
      <section id="rehab-properties" className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-800">
              Rehab & Renovation Properties
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Transform distressed properties into profitable investments. Our comprehensive rehab services 
              help you navigate every aspect of property renovation, from initial assessment to final sale or rental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {rehabServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  {service.icon}
                  <h3 className="text-xl font-semibold ml-3 text-slate-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-slate-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Fix & Flip Loan Program */}
          <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 border border-gray-200 mb-8">
            {/* Header Section */}
            <div className="text-center mb-8 md:mb-12">
              <h3 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-4 leading-tight">
                The <span className="text-green-600">Fix & Flip</span> Loan Program
              </h3>
              <p className="text-lg md:text-xl text-gray-600">
                Your pathway to successful real estate investments.
              </p>
            </div>

            {/* Quick Notes Section */}
            <div className="mb-8 md:mb-12 bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
              <h4 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 flex items-center">
                <svg className="w-7 h-7 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
                Quick Notes
              </h4>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">Down Payment Structure:</strong> 20% down for your first project, 15% for the second, and just 10% down after that, based on the purchase price.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">Repair Cost Coverage:</strong> We can lend up to 100% of your repair costs, capped at 70% of the After Repair Value (ARV).
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">Fast Closing:</strong> Expect to close your deal in just 2-3 weeks, getting you started sooner.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">DIY Friendly:</strong> No need to hire a General Contractor; you can perform the work yourself.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">Interest-Only Loan:</strong> Enjoy an interest-only loan while you're completing your flip, keeping your carrying costs low.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">No Tax Returns Required:</strong> Streamlined application process without the need for tax returns.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <p>
                    <strong className="font-semibold">LLC Purchase:</strong> You can conveniently purchase properties through an LLC.
                  </p>
                </li>
              </ul>
            </div>

            {/* Condensed Key Highlights */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg shadow-md border border-green-200 mb-8">
              <h4 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
                🏠 Example: $80k Purchase → $200k ARV
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600">$41,000</div>
                  <div className="text-sm text-gray-600">Flip Profit</div>
                  <div className="text-xs text-gray-500">256% ROI</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600">$945/mo</div>
                  <div className="text-sm text-gray-600">Rental Cash Flow</div>
                  <div className="text-xs text-gray-500">71% Annual ROI</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-purple-600">$16,000</div>
                  <div className="text-sm text-gray-600">Down Payment</div>
                  <div className="text-xs text-gray-500">20% Required</div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2"
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
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
                <h4 className="text-2xl font-bold text-center text-gray-800 mb-8">
                  📊 Complete Financial Breakdown Spreadsheet
                </h4>
                
                {/* Base Numbers Table */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold text-gray-700 mb-4 bg-gray-50 p-3 rounded">📋 Base Property Info</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left font-semibold">Item</th>
                          <th className="border border-gray-300 p-3 text-right font-semibold">Amount</th>
                          <th className="border border-gray-300 p-3 text-left font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">Purchase Price</td>
                          <td className="border border-gray-300 p-3 text-right font-mono">$80,000</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">Distressed property</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">After Repair Value (ARV)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono">$200,000</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">Comparable sales</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Down Payment (20%)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">$16,000</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">Your cash investment</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">Max Repair Loan</td>
                          <td className="border border-gray-300 p-3 text-right font-mono">$60,000</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">Up to 70% ARV cap</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Flip Scenario Table */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold text-gray-700 mb-4 bg-green-50 p-3 rounded">🔄 Flip Scenario (Sell)</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-green-100">
                          <th className="border border-gray-300 p-3 text-left font-semibold">Cost/Revenue Item</th>
                          <th className="border border-gray-300 p-3 text-right font-semibold">Amount</th>
                          <th className="border border-gray-300 p-3 text-left font-semibold">Calculation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">Sale Price (ARV)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-green-600">$200,000</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">Market value after repairs</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">Total Project Cost</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($143,000)</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">$80k + $60k + $3k carrying costs</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Selling Costs (8%)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($16,000)</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">Realtor, title, taxes</td>
                        </tr>
                        <tr className="bg-green-50 font-semibold">
                          <td className="border border-gray-300 p-3">Net Profit</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-green-700">$41,000</td>
                          <td className="border border-gray-300 p-3 text-sm text-gray-600">256% ROI on $16k down</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Rental Scenario Table */}
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-gray-700 mb-4 bg-blue-50 p-3 rounded">🏠 BRRRR Scenario (Hold as Rental)</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="border border-gray-300 p-3 text-left font-semibold">Income/Expense Item</th>
                          <th className="border border-gray-300 p-3 text-right font-semibold">Monthly</th>
                          <th className="border border-gray-300 p-3 text-right font-semibold">Annual</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">Rental Income</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-green-600">$2,400</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-green-600">$28,800</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">Mortgage Payment</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($865)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($10,380)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Property Taxes</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($250)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($3,000)</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">Insurance</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($100)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($1,200)</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Maintenance/Vacancy (10%)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($240)</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-red-600">($2,880)</td>
                        </tr>
                        <tr className="bg-blue-50 font-semibold">
                          <td className="border border-gray-300 p-3">Net Cash Flow</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-blue-700">$945</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-blue-700">$11,340</td>
                        </tr>
                        <tr className="bg-blue-100 font-bold">
                          <td className="border border-gray-300 p-3">Cash-on-Cash ROI</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-blue-800">5.9%</td>
                          <td className="border border-gray-300 p-3 text-right font-mono text-blue-800">70.9%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-xs text-gray-500 italic text-center">
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

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800">
                  Rehab Property Process
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Property Identification</h4>
                      <p className="text-slate-600 text-sm">Find distressed properties with renovation potential</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Financial Analysis</h4>
                      <p className="text-slate-600 text-sm">Calculate costs, returns, and financing options</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Renovation Management</h4>
                      <p className="text-slate-600 text-sm">Oversee quality work within budget and timeline</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold mr-3 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-slate-800">Exit Strategy</h4>
                      <p className="text-slate-600 text-sm">Sell for profit or convert to rental property</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-4 text-slate-800">
                  Analyze Your Investment
                </h4>
                <p className="text-slate-600 mb-6">
                  Use our BRRRR calculator to analyze your rehab investment potential and returns.
                </p>
                <button
                  onClick={() => setShowAnalyzer(!showAnalyzer)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
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
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <RealEstateAnalyzer />
          </div>
        </section>
      )}
    </>
  );
};

export default RehabPropertiesSection;