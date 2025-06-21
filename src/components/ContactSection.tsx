
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useFirestore } from "@/hooks/useFirestore";

const ContactSection = () => {
  const { toast } = useToast();
  const { addLead, loading } = useFirestore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      await addLead({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        type: 'buyer' // Default to buyer for general contact
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-16 px-4 bg-slate-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">Contact Information</h3>
            <div className="space-y-4 text-lg">
              <p className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2 2A15.97 15.97 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.11 2.45L6.9 11.4A11 11 0 0 0 12.6 17.1l1.42-1.42a2 2 0 0 1 2.45-1.11c1.1.25 2.2.37 3.3.37a2 2 0 0 1 1.72 2z"></path>
                </svg>
                Phone: <a href="tel:518-555-1234" className="ml-2 text-blue-500 hover:underline">(518) 555-1234</a>
              </p>
              <p className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M22 7L12 13L2 7"></path>
                </svg>
                Email: <a href="mailto:info@capitaldistrictnest.com" className="ml-2 text-blue-500 hover:underline">info@capitaldistrictnest.com</a>
              </p>
              <p className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Office Hours: Mon-Fri, 9:00 AM - 5:00 PM EST
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800">Send Us a Message</h3>
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
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-slate-600 text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
