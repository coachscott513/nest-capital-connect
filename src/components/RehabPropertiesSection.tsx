import React, { useState } from 'react';
import { Hammer, Calculator, ClipboardCheck, Home } from 'lucide-react';
import RealEstateAnalyzer from './RealEstateAnalyzer';

const RehabPropertiesSection = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
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

            {/* Example Section - Base Calculations */}
            <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200 mb-8">
              <h4 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 flex items-center">
                <svg className="w-7 h-7 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                Example Scenario - Base Calculations
              </h4>
              <div className="space-y-4 text-lg text-gray-700">
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Purchase Price:</span>
                  <span className="font-bold text-blue-700">$80,000</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">After Repair Value (ARV):</span>
                  <span className="font-bold text-blue-700">$200,000</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Required Down Payment (20%):</span>
                  <span className="font-bold text-green-700">$16,000</span>
                  <span className="text-sm text-gray-500">($80,000 * 0.20)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Maximum Repairs Available (up to 70% of ARV):</span>
                  <span className="font-bold text-green-700">$60,000</span>
                  <span className="text-sm text-gray-500">(Calculated as $200,000 * 0.70 = $140,000. Total loan needed $80,000 (purchase) + $60,000 (repairs) = $140,000, which fits the 70% ARV cap.)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Approximate Monthly Carrying Costs (Interest-Only during flip):</span>
                  <span className="font-bold text-red-600">$500</span>
                </div>
              </div>
            </div>

            {/* One-Time Sale Scenario */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 mb-8">
              <h4 className="text-xl md:text-2xl font-bold text-blue-700 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
                One-Time Sale Scenario (Flip)
              </h4>
              <div className="space-y-4 text-lg text-gray-700">
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Total Project Cost:</span>
                  <span className="font-bold text-gray-800">$143,000</span>
                  <span className="text-sm text-gray-500">(Purchase $80k + Repairs $60k + 6 months Carrying Costs $3k)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Selling Costs (e.g., 8% of ARV):</span>
                  <span className="font-bold text-red-600">$16,000</span>
                  <span className="text-sm text-gray-500">($200,000 * 0.08)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">One-Time Sale Profit (at ARV):</span>
                  <span className="font-bold text-green-700">$41,000</span>
                  <span className="text-sm text-gray-500">($200,000 ARV - $143,000 Project Cost - $16,000 Selling Costs)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Cash on Cash Return (Sale):</span>
                  <span className="font-bold text-green-700">256.25%</span>
                  <span className="text-sm text-gray-500">($41,000 Profit / $16,000 Down Payment)</span>
                </div>
              </div>
            </div>

            {/* Rental Scenario */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-200 mb-8">
              <h4 className="text-xl md:text-2xl font-bold text-blue-700 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Rental Scenario (Hold) - After Refinance
              </h4>
              <div className="space-y-4 text-lg text-gray-700">
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">New Loan Amount (65% LTV of ARV):</span>
                  <span className="font-bold text-blue-700">$130,000</span>
                  <span className="text-sm text-gray-500">($200,000 ARV * 0.65)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Cash Out / (Cash In) at Refinance:</span>
                  <span className="font-bold text-red-600">($10,000)</span>
                  <span className="text-sm text-gray-500">(New Loan $130,000 - Initial Loan $140,000. This indicates a cash-in to reduce the loan balance.)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Monthly Mortgage Payment (7% interest, 30-yr fixed):</span>
                  <span className="font-bold text-red-600">$865.05</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Monthly Rental Income:</span>
                  <span className="font-bold text-green-700">$2,400</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Monthly Expenses (Post-Refinance):</span>
                  <span className="font-bold text-red-600">$1,455.05</span>
                  <span className="text-sm text-gray-500">(Mortgage $865.05 + Taxes $250 + Insurance $100 + Maint./Vacancy $240)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Monthly Profit (Cash Flow):</span>
                  <span className="font-bold text-green-700">$944.95</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated Annual Profit (Cash Flow):</span>
                  <span className="font-bold text-green-700">$11,339.40</span>
                  <span className="text-sm text-gray-500">($944.95 * 12 months)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Cash on Cash Return (Rental, Annual):</span>
                  <span className="font-bold text-green-700">70.87%</span>
                  <span className="text-sm text-gray-500">($11,339.40 Annual Profit / $16,000 Down Payment)</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                  <span className="font-medium text-gray-600">Estimated 5-Year Profit (Cash Flow):</span>
                  <span className="font-bold text-green-700">$56,697.00</span>
                  <span className="text-sm text-gray-500">($11,339.40 * 5 years)</span>
                </div>
                <div className="text-sm text-gray-500 mt-4 italic">
                  *Note: These calculations are approximations and do not include potential property appreciation, or other variable costs. Consult with a financial advisor for personalized projections.
                </div>
              </div>
            </div>
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