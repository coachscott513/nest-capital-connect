
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from "@/hooks/useSupabase";
import { useAnalytics } from './AnalyticsTracker';
import { TrackedButton } from './TrackedButton';

const ContactSection = () => {
  const { toast } = useToast();
  const { addLead, loading } = useSupabase();
  const { trackLeadFormSubmission } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const submitContactForm = async (formData: any) => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.functions.invoke('submit-contact-form', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        return { success: true, data: data.data };
      } else {
        throw new Error(data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

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
      
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message,
        type: 'seller'
      };

      const result = await submitContactForm(submissionData);

      if (result.success) {
        // Track the lead form submission
        trackLeadFormSubmission('Seller Contact Form', 'Contact Section');

        // Track Google Ads conversion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-922988725/MCepCNv03PgaELXhjrgD',
            'value': 1.0,
            'currency': 'USD'
          });
        }
        
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. We'll get back to you soon.",
        });
        
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <section id="contact" className="py-12 text-center bg-card border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <span className="text-muted-foreground uppercase tracking-widest text-sm">Thinking of Selling?</span>
          <div className="w-24 h-px bg-border mx-auto my-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get your home sold fast and for Top Dollar!</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
            Listing your home doesn't have to be stressful or overwhelming! You can count on great service with years of experience through each transaction. Contact me today to determine the next steps in fulfilling this rewarding experience.
          </p>
          <a className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors" href="#contact-info">Contact Us</a>
        </div>
      </section>

      <section id="contact-info" className="py-16 bg-background border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-card p-8 rounded-xl border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-foreground text-center">Contact Information</h3>
            <div className="space-y-4 text-lg">
              <p className="flex items-center justify-center text-muted-foreground">
                <svg className="w-6 h-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2 2A15.97 15.97 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-1.11 2.45L6.9 11.4A11 11 0 0 0 12.6 17.1l1.42-1.42a2 2 0 0 1 2.45-1.11c1.1.25 2.2.37 3.3.37a2 2 0 0 1 1.72 2z"></path>
                </svg>
                Phone: 
                <TrackedButton
                  trackingType="phone"
                  trackingLabel="Contact Section Phone"
                  href="tel:+15186718048"
                  variant="link"
                  className="ml-2 text-primary hover:underline p-0 h-auto"
                >
                  (518) 671-8048
                </TrackedButton>
              </p>
              <p className="flex items-center justify-center text-muted-foreground">
                <svg className="w-6 h-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M22 7L12 13L2 7"></path>
                </svg>
                Email: 
                <TrackedButton
                  trackingType="email"
                  trackingLabel="Contact Section Email"
                  href="mailto:scott@capitaldistrictnest.com"
                  variant="link"
                  className="ml-2 text-primary hover:underline p-0 h-auto"
                >
                  scott@capitaldistrictnest.com
                </TrackedButton>
              </p>
              <p className="flex items-center justify-center text-muted-foreground">
                <svg className="w-6 h-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
