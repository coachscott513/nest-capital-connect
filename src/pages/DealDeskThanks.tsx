import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DealDeskThanks = () => {
  return (
    <>
      <Helmet>
        <title>Request Received | Capital Deal Desk</title>
        <meta name="description" content="Your Investor Snapshot request has been received. You'll get an email shortly." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Request Received
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            You'll get an email shortly with your Investor Snapshot.
          </p>

          <p className="text-gray-500 text-sm mb-8">
            Most Snapshots are delivered same-day during business hours. Check your inbox (and spam folder) soon.
          </p>

          <Link to="/dealdesk">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Deal Desk
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DealDeskThanks;
