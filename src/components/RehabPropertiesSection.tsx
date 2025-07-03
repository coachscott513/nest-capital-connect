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

        {/* Fix & Flip Loan Feature */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-xl shadow-lg text-white mb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              🔥 Fix & Flip Loan Program
            </h3>
            <p className="text-green-100 text-lg">
              The Fix & Flip is going to be a killer for investors. Fast funding, flexible terms, and maximum profit potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Loan Features</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>20% down first time, 15% second time, 10% after that</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>Up to 100% of repairs cost (up to 70% ARV)</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>Close in 2-3 weeks</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>No contractor required - DIY friendly</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>Interest only while flipping</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>No tax returns required</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-200 rounded-full mr-3"></div>
                  <span>Can purchase through LLC</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Example Deal</h4>
              <div className="space-y-3">
                <div className="border-b border-green-200/30 pb-2">
                  <span className="font-semibold">Purchase Price:</span>
                  <span className="float-right">$50,000</span>
                </div>
                <div className="border-b border-green-200/30 pb-2">
                  <span className="font-semibold">ARV:</span>
                  <span className="float-right">$200,000</span>
                </div>
                <div className="border-b border-green-200/30 pb-2">
                  <span className="font-semibold">Down Payment:</span>
                  <span className="float-right">$10,000</span>
                </div>
                <div className="border-b border-green-200/30 pb-2">
                  <span className="font-semibold">Repair Budget:</span>
                  <span className="float-right">$90,000</span>
                </div>
                <div className="pt-2">
                  <span className="font-semibold">Monthly Carrying:</span>
                  <span className="float-right">~$500</span>
                </div>
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