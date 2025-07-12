import React, { useEffect } from 'react';
import { CheckCircle, Clock, DollarSign, Search, Calculator, Hammer, TrendingUp, FileText, Users, Home } from 'lucide-react';

const RehabInvestmentHowTo = () => {
  useEffect(() => {
    // Add HowTo structured data
    const howToScript = document.createElement('script');
    howToScript.type = 'application/ld+json';
    howToScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Successfully Invest in Rehab Properties",
      "description": "A comprehensive step-by-step guide to investing in rehabilitation properties in the Capital District area, from finding properties to maximizing returns.",
      "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
      "totalTime": "PT6M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "16000"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Down Payment (20% of purchase price)"
        },
        {
          "@type": "HowToSupply", 
          "name": "Renovation Budget (up to 100% financed)"
        },
        {
          "@type": "HowToSupply",
          "name": "Professional Property Assessment"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Real Estate Investment Calculator"
        },
        {
          "@type": "HowToTool",
          "name": "Property Analysis Tools"
        },
        {
          "@type": "HowToTool",
          "name": "Contractor Network Access"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Property Research and Market Analysis",
          "text": "Research the Capital District market to identify neighborhoods with strong appreciation potential and rental demand. Focus on areas like Albany, Troy, Schenectady, and Saratoga.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#property-research"
        },
        {
          "@type": "HowToStep",
          "name": "Find Distressed Properties",
          "text": "Identify properties that need renovation but have strong underlying value. Look for properties priced below market value due to needed repairs or dated finishes.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#find-properties"
        },
        {
          "@type": "HowToStep",
          "name": "Conduct Property Assessment",
          "text": "Perform a comprehensive evaluation including structural analysis, cost estimation, permit requirements, and timeline planning. Our team provides detailed assessments.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#assessment"
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Investment Returns",
          "text": "Analyze purchase price, renovation costs, after repair value (ARV), and potential rental income. Use the 70% rule and calculate your expected ROI before proceeding.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#investment-analysis"
        },
        {
          "@type": "HowToStep",
          "name": "Secure Financing",
          "text": "Apply for fix-and-flip financing with as little as 10-20% down. Our partner lenders offer up to 100% renovation cost financing with fast 2-3 week closings.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#financing"
        },
        {
          "@type": "HowToStep",
          "name": "Execute Renovation Plan",
          "text": "Work with our vetted contractor network to complete renovations on time and on budget. You can also perform work yourself to maximize returns.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#renovation"
        },
        {
          "@type": "HowToStep",
          "name": "Choose Your Exit Strategy",
          "text": "Decide whether to flip for immediate profit or hold as a rental property. We provide market timing advice and staging services for optimal returns.",
          "image": "/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
          "url": "https://scottalvarez.remax.com/#exit-strategy"
        }
      ]
    });
    document.head.appendChild(howToScript);

    // Cleanup function
    return () => {
      document.head.removeChild(howToScript);
    };
  }, []);

  const steps = [
    {
      number: 1,
      title: "Property Research & Market Analysis",
      icon: <Search className="w-6 h-6" />,
      duration: "30-60 minutes",
      description: "Research the Capital District market to identify neighborhoods with strong appreciation potential and rental demand.",
      details: [
        "Study neighborhood trends in Albany, Troy, Schenectady, and Saratoga",
        "Analyze comparable sales and rental rates",
        "Identify areas with upcoming development or infrastructure improvements",
        "Review local housing demand and employment growth"
      ],
      tips: "Focus on areas with good schools, low crime rates, and proximity to employment centers."
    },
    {
      number: 2,
      title: "Find Distressed Properties",
      icon: <Home className="w-6 h-6" />,
      duration: "Ongoing",
      description: "Identify properties that need renovation but have strong underlying value.",
      details: [
        "Search MLS for properties priced below market value",
        "Look for keywords like 'needs TLC', 'handyman special', or 'fixer-upper'",
        "Drive neighborhoods to spot vacant or poorly maintained properties",
        "Network with wholesalers and other investors"
      ],
      tips: "The best deals often come from motivated sellers who need to sell quickly."
    },
    {
      number: 3,
      title: "Conduct Property Assessment",
      icon: <FileText className="w-6 h-6" />,
      duration: "2-3 hours",
      description: "Perform a comprehensive evaluation including structural analysis and cost estimation.",
      details: [
        "Inspect foundation, roof, plumbing, and electrical systems",
        "Estimate renovation costs for each room and system",
        "Research permit requirements for planned improvements",
        "Create detailed scope of work and timeline"
      ],
      tips: "Always get a professional inspection for properties with potential structural issues."
    },
    {
      number: 4,
      title: "Calculate Investment Returns",
      icon: <Calculator className="w-6 h-6" />,
      duration: "1-2 hours",
      description: "Analyze all costs and potential returns to ensure profitability.",
      details: [
        "Use the 70% rule: ARV × 0.70 - Repair costs = Maximum offer",
        "Calculate total project cost including carrying costs",
        "Estimate after repair value (ARV) using comparable sales",
        "Project rental income and cash flow if holding"
      ],
      tips: "Be conservative with repair estimates and optimistic with your ARV calculations."
    },
    {
      number: 5,
      title: "Secure Financing",
      icon: <DollarSign className="w-6 h-6" />,
      duration: "2-3 weeks",
      description: "Apply for fix-and-flip financing with competitive terms.",
      details: [
        "Prepare financial documents and property analysis",
        "Apply with multiple lenders to compare terms",
        "Arrange for 20% down payment (15% for second project, 10% after that)",
        "Secure up to 100% renovation cost financing"
      ],
      tips: "Our partner lenders offer fast closings and competitive rates for qualified investors."
    },
    {
      number: 6,
      title: "Execute Renovation Plan",
      icon: <Hammer className="w-6 h-6" />,
      duration: "3-6 months",
      description: "Complete renovations on time and on budget using our contractor network.",
      details: [
        "Obtain necessary permits before starting work",
        "Coordinate with licensed contractors for major systems",
        "Perform DIY work where appropriate to save costs",
        "Regular progress inspections and budget monitoring"
      ],
      tips: "Focus on improvements that add the most value: kitchens, bathrooms, and curb appeal."
    },
    {
      number: 7,
      title: "Choose Your Exit Strategy",
      icon: <TrendingUp className="w-6 h-6" />,
      duration: "1-3 months",
      description: "Decide whether to flip for immediate profit or hold as a rental property.",
      details: [
        "Analyze current market conditions for optimal timing",
        "Consider tax implications of sale vs. rental",
        "Prepare property for sale with staging if flipping",
        "Set up property management if holding as rental"
      ],
      tips: "Market timing can significantly impact your returns - we help you make the right decision."
    }
  ];

  const keyMetrics = [
    {
      label: "Typical Project Timeline",
      value: "4-8 months",
      icon: <Clock className="w-5 h-5 text-blue-500" />
    },
    {
      label: "Minimum Down Payment", 
      value: "10-20%",
      icon: <DollarSign className="w-5 h-5 text-green-500" />
    },
    {
      label: "Expected ROI Range",
      value: "15-30%+",
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />
    },
    {
      label: "Renovation Financing",
      value: "Up to 100%",
      icon: <Calculator className="w-5 h-5 text-orange-500" />
    }
  ];

  return (
    <section id="rehab-howto" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">
            How to Successfully Invest in Rehab Properties
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Follow our proven 7-step process to identify, finance, renovate, and profit from 
            rehabilitation properties in the Capital District. This comprehensive guide covers 
            everything from market analysis to exit strategies.
          </p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-2">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-slate-800 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-blue-600">
                        {step.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {step.title}
                      </h3>
                      <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-4 text-lg">
                      {step.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Details */}
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Key Actions:</h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-slate-600 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Tips */}
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Pro Tip:</h4>
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <p className="text-slate-700 text-sm italic">
                            {step.tips}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Rehab Investment Journey?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Get a free investment analysis and personalized guidance from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Analysis
            </button>
            <a 
              href="tel:+15185227265"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RehabInvestmentHowTo;