
import { Button } from "@/components/ui/button";

const ListingAlertsSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <img 
              src="https://img.kvcore.com/cdn-cgi/image/fit=scale-down,format=auto/https://kunversion-frontend-custom.s3.amazonaws.com/1assets/templates/2/listing-alerts.jpg" 
              alt="father and child looking at each other smiling while on laptop" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-slate-800">
              Instant Listing Alerts
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Subscribe and receive instant Listing alerts as soon as your Dream Home hits the market. Create a Free Account today and receive updated Market Reports surrounding highly desired communities.
            </p>
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingAlertsSection;
