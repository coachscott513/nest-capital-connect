import React from 'react';
import { Hammer, Calculator, ClipboardCheck, Home } from 'lucide-react';

const RehabPropertiesSection = () => {
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

          {/* Example Section */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
            <h4 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 flex items-center">
              <svg className="w-7 h-7 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
              Example Scenario
            </h4>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                <span className="font-medium text-gray-600">Purchase Price:</span>
                <span className="font-bold text-blue-700">$50,000</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                <span className="font-medium text-gray-600">After Repair Value (ARV):</span>
                <span className="font-bold text-blue-700">$200,000</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                <span className="font-medium text-gray-600">Required Down Payment (20%):</span>
                <span className="font-bold text-green-700">$10,000</span>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-600">Maximum Repairs Available (up to 70% of ARV):</span>
                  <span className="font-bold text-green-700">$90,000</span>
                </div>
                <p className="text-sm text-gray-500">
                  (Calculated as $200,000 * 0.70 = $140,000. Since we lend up to 100% of repairs, and the total loan including purchase price is $50,000 (purchase) + $90,000 (repairs) = $140,000, this fits the 70% ARV cap.)
                </p>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-gray-100">
                <span className="font-medium text-gray-600">Approximate Monthly Carrying Costs:</span>
                <span className="font-bold text-red-600">$500</span>
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
                Start Your Rehab Project
              </h4>
              <p className="text-slate-600 mb-6">
                Ready to transform a property into profit? Let's discuss your rehab investment goals.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RehabPropertiesSection;