import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <>
      <Helmet>
        <title>Coming Soon — Capital District Nest Resource</title>
        <meta name="description" content="We're finalizing this resource to ensure it delivers real value. Request personalized guidance in the meantime." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <MainHeader />
        
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-primary" />
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Coming Soon — Capital District Nest Resource
            </h1>
            
            {/* Body */}
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              We're finalizing this resource to ensure it delivers real value.<br />
              In the meantime, request personalized guidance below.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link to="/vip-buyer-access">
                <Button size="lg" className="gap-2">
                  Get My Free Intelligence Report
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
            
            {/* Lead Form */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Request Personalized Guidance</h2>
              <p className="text-muted-foreground mb-6">
                Tell us what you're looking for and we'll get back to you with the information you need.
              </p>
              <LeadCaptureForm type="report" />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ComingSoon;
