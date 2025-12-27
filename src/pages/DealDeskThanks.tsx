import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const DealDeskThanks = () => {
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
          
          <p className="text-xl text-gray-400 mb-8">
            Your Investor Snapshot is being prepared and will be delivered same-day (typically within a few hours).
          </p>

          <div className="bg-[#111111] border border-gray-800 rounded-lg p-6 mb-8 text-left">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Check your inbox for a confirmation email.</span>
              </li>
              <li className="flex items-start gap-3">
                <Inbox className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">If you don't see it, check spam/promotions.</span>
              </li>
              <li className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">You can submit another property anytime.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/dealdesk">
              <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6">
                Submit Another Address
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-gray-800">
                Back to Home
              </Button>
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            All reports are free & personalized • Same-day delivery on most requests
          </p>
        </div>
      </div>
    </>
  );
};

export default DealDeskThanks;
