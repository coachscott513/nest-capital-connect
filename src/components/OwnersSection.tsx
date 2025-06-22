
import RealEstateAnalyzer from './RealEstateAnalyzer';

const OwnersSection = () => {
  return (
    <section id="owners" className="py-16 px-4 bg-slate-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          For Owners: List Smarter, Sell Easier
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">
              Why List with Capital District Nest?
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span><strong>Lower Listing Costs:</strong> Significant savings compared to traditional platforms.</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span><strong>Advanced Vetting Technology:</strong> Secure and efficient tenant screening for peace of mind.</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span><strong>Dedicated Support:</strong> Experienced team to assist you through the entire rental process.</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span><strong>Future Sales Opportunity:</strong> Build a relationship with a team ready to help you sell your property when the time is right.</span>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">How It Works:</h3>
            <ol className="space-y-4 text-lg mb-8">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold text-2xl mr-3">1.</span>
                <p><strong>Create Your Listing:</strong> Easily add property details and high-quality photos/videos.</p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold text-2xl mr-3">2.</span>
                <p><strong>Attract Vetted Tenants:</strong> Our platform and marketing reach qualified prospects.</p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold text-2xl mr-3">3.</span>
                <p><strong>Seamless Management:</strong> Utilize our tools for applications, leases, and communication.</p>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold text-2xl mr-3">4.</span>
                <p><strong>Future Sales:</strong> When you're ready, we'll connect you with serious buyers – many of whom are our successfully placed tenants.</p>
              </li>
            </ol>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              List Your Property Now
            </button>
          </div>
        </div>
        
        {/* Real Estate Analyzer */}
        <RealEstateAnalyzer />
      </div>
    </section>
  );
};

export default OwnersSection;
