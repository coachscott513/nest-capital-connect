
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";

const ContactSection = () => {
  const { toast } = useToast();
  const { addLead, loading } = useSupabase();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    console.log('Form data:', formData);
    
    if (!formData.name || !formData.email || !formData.message) {
      console.log('Validation failed - missing required fields');
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('Submitting contact form with data:', formData);
      
      await addLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        type: 'seller'
      });

      console.log('Contact form submitted successfully');
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Input changed:', e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .widgetWrapper.col-sm-6 ~ .p-t-3.p-b-3.m-t-1.m-b-1.center {
            clear: both;
          }
          
          .kv-content-section span {
            text-transform: uppercase;
            font-weight: 400;
            letter-spacing: 2px;
          }
          
          .kv-content-section span:after {
            content: "";
            display: block;
            margin-top: 1rem;
            max-width: 100px;
            margin: 1rem auto;
            height: 1px;
            background-color: #444;
          }
          
          .kv-content-section h2 {
            font-weight: bold;
            font-size: 2.5rem;
            margin-bottom: 1.3rem;
          }
          
          .kv-content-section p {
            font-size: 1.1rem;
            max-width: 750px;
            margin: 0 auto 2rem;
          }
          
          @media only screen and (max-width: 544px) {
            .kv-content-section h2 {
              font-size: 2rem;
            }
            .kv-content-section p {
              font-size: 1rem;
            }
          }
          
          .p-t-3 { padding-top: 3rem; }
          .p-b-3 { padding-bottom: 3rem; }
          .center { text-align: center; }
          .fw-600 { font-weight: 600; }
          .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            margin-top: 1rem;
            text-decoration: none;
            border-radius: 0.375rem;
            font-weight: 600;
            transition: all 0.2s ease;
          }
          .btn-primary {
            background-color: #3b82f6;
            color: white;
          }
          .btn-primary:hover {
            background-color: #2563eb;
          }
        `
      }} />
      
      <section id="contact" className="kv-content-section p-t-3 p-b-3 center bg-slate-200">
        <div className="container max-w-5xl mx-auto px-4">
          <span className="text-slate-600">Thinking of Selling?</span>
          <h2 className="fw-600 text-slate-800">Get your home sold fast and for Top Dollar!</h2>
          <p className="text-slate-600">
            Listing your home doesn't have to be stressful or overwhelming! You can count on great service with years of experience through each transaction. Contact me today to determine the next steps in fulfilling this rewarding experience.
          </p>
          <a className="btn btn-primary" href="#contact-info">Contact Us</a>
        </div>
      </section>

      <section id="contact-info" className="py-16 bg-white">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-slate-800 text-center">Contact Information</h3>
            <div className="space-y-4 text-lg">
              <p className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2 2A15.97 15.97 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.11 2.45L6.9 11.4A11 11 0 0 0 12.6 17.1l1.42-1.42a2 2 0 0 1 2.45-1.11c1.1.25 2.2.37 3.3.37a2 2 0 0 1 1.72 2z"></path>
                </svg>
                Phone: <a href="tel:518-676-8480" className="ml-2 text-blue-500 hover:underline">(518) 676-8480</a>
              </p>
              <p className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M22 7L12 13L2 7"></path>
                </svg>
                Email: <a href="mailto:capitaldistrictnest@gmail.com" className="ml-2 text-blue-500 hover:underline">capitaldistrictnest@gmail.com</a>
              </p>
              <p className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Office Hours: Mon-Fri, 9:00 AM - 5:00 PM EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
