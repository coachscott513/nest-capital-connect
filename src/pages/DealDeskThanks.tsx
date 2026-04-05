import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Mail, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDelmarConfirmation } from "@/contexts/DelmarConfirmationContext";

const DealDeskThanks = () => {
  const navigate = useNavigate();
  const { setShowConfirmation } = useDelmarConfirmation();

  // Auto-redirect to Delmar town page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfirmation(true);
      navigate("/towns/delmar");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, setShowConfirmation]);

  const handleExploreDelmar = () => {
    setShowConfirmation(true);
    navigate("/towns/delmar");
  };

  return (
    <>
      <Helmet>
        <title>Request Received | Capital Deal Desk</title>
        <meta name="description" content="Your Investor Snapshot request has been received. You'll get an email shortly." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Request received ✅
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Your Investor Snapshot is being prepared and will be delivered same-day (typically within a few hours).
          </p>

          <div className="bg-[#111111] border border-border rounded-lg p-6 mb-8 text-left">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Check your inbox for a confirmation email.</span>
              </li>
              <li className="flex items-start gap-3">
                <Inbox className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">If you don't see it, check spam/promotions.</span>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Redirecting you to explore Delmar market insights...</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/">
              <Button className="w-full sm:w-auto bg-background hover:bg-secondary text-foreground font-semibold px-8">
                Return to Home
              </Button>
            </Link>
            <Button 
              onClick={handleExploreDelmar}
              variant="outline"
              className="w-full sm:w-auto border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
            >
              Explore Delmar Intelligence
            </Button>
          </div>

          <p className="text-muted-foreground text-sm">
            All reports are free & personalized • Same-day delivery on most requests
          </p>
        </div>
      </div>
    </>
  );
};

export default DealDeskThanks;
