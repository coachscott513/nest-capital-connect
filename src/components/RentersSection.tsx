
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";

const RentersSection = () => {
  const { toast } = useToast();
  const { addLead, loading } = useSupabase();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bedrooms: '',
    priceRange: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and email address.",
        variant: "destructive"
      });
      return;
    }

    try {
      await addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Looking for rental: ${formData.bedrooms} bedrooms in ${formData.location}, price range: ${formData.priceRange}`,
        type: 'renter',
        location: formData.location,
        bedrooms: formData.bedrooms,
        price_range: formData.priceRange
      });

      toast({
        title: "Search Submitted!",
        description: "We've received your rental search criteria and will be in touch soon.",
      });
      
      setFormData({ name: '', email: '', phone: '', location: '', bedrooms: '', priceRange: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your search. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="renters" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          For Renters: Your Seamless Path Home
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <p className="text-lg mb-6">
              Searching for your next home in the Capital District? Capital District Nest provides an unparalleled experience, connecting you directly with quality multi-unit apartment rentals across Albany, Troy, Schenectady, and Saratoga.
            </p>
            <ul className="space-y-3 mb-8 text-lg">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14 9 11"></polyline>
                </svg>
                <span><strong>Vetted Listings:</strong> We ensure all properties meet high standards.</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8l4 4-4 4M8 12h8"></path>
                </svg>
                <span><strong>Easy Applications:</strong> Streamlined, modern online application and vetting process.</span>
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 15C3 15 3 3 12 3C21 3 21 15 21 15M3 15H21M3 15V21C3 21 3 21 6 21C9 21 15 21 18 21C21 21 21 21 21 21V15"></path>
                </svg>
                <span><strong>Path to Homeownership:</strong> Get exclusive guidance and resources when you're ready to buy your first home.</span>
              </li>
            </ul>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Start Your Rental Search
            </button>
          </div>
          <div className="bg-blue-50 p-8 rounded-xl shadow-inner">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">Find Your Perfect Rental</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-slate-600 text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-600 text-sm font-medium mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-slate-600 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-slate-600 text-sm font-medium mb-2">
                  Location (e.g., Albany, Troy, Schenectady, Saratoga)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter city or neighborhood"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="bedrooms" className="block text-slate-600 text-sm font-medium mb-2">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Any</option>
                  <option value="studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3+">3+ Bedrooms</option>
                </select>
              </div>
              <div>
                <label htmlFor="priceRange" className="block text-slate-600 text-sm font-medium mb-2">
                  Price Range
                </label>
                <input
                  type="text"
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  placeholder="e.g., $1000 - $2000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                {loading ? 'Submitting...' : 'Search Rentals'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentersSection;
