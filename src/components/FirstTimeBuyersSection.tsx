
import { DollarSign, FileText, CheckCircle, Home } from "lucide-react";

const FirstTimeBuyersSection = () => {
  const buyerResources = [
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Down Payment Assistance",
      description: "Explore grants and programs that help cover your down payment and closing costs.",
      features: ["FHA loans with 3.5% down", "VA loans for veterans", "USDA rural development loans", "State and local grant programs"]
    },
    {
      icon: <FileText className="w-8 h-8 text-blue-500" />,
      title: "Mortgage Pre-Approval",
      description: "Get pre-approved to understand your budget and show sellers you're serious.",
      features: ["Know your exact budget", "Competitive advantage", "Faster closing process", "Rate lock options"]
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
      title: "First-Time Buyer Programs",
      description: "Special programs designed specifically for first-time homebuyers.",
      features: ["Tax credits available", "Reduced interest rates", "Education workshops", "Closing cost assistance"]
    },
    {
      icon: <Home className="w-8 h-8 text-orange-500" />,
      title: "Homebuyer Education",
      description: "Learn the ins and outs of the home buying process from start to finish.",
      features: ["Free homebuyer courses", "Credit counseling", "Budget planning", "Home maintenance tips"]
    }
  ];

  return (
    <section id="first-time-buyers" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-slate-800">
            First-Time Homebuyer Resources
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Take the leap from renting to owning with our comprehensive first-time buyer programs. 
            We'll help you navigate financing options, grants, and get pre-approved for your mortgage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {buyerResources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                {resource.icon}
                <h3 className="text-xl font-semibold ml-3 text-slate-800">
                  {resource.title}
                </h3>
              </div>
              <p className="text-slate-600 mb-4">
                {resource.description}
              </p>
              <ul className="space-y-2">
                {resource.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4 text-slate-800">
            Ready to Start Your Homeownership Journey?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Let's discuss your goals and get you connected with the right financing options and first-time buyer programs. 
            Your dream home is within reach!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105"
            >
              Get Pre-Approved Today
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Learn About Grants
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <iframe 
            style={{ width: '960px', height: '300px' }} 
            src="https://scottalvarez.remax.com/wide.php" 
            allowTransparency={true} 
            frameBorder="0"
            className="max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default FirstTimeBuyersSection;
