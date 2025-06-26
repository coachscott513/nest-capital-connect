
import { Button } from "@/components/ui/button";

const TwoColumnSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Selling Column */}
          <div className="relative min-h-[450px] overflow-hidden">
            <img 
              src="https://img.kvcore.com/cdn-cgi/image/fit=scale-down,format=auto/https://dtzulyujzhqiu.cloudfront.net/kvcoredemo14/images/1581623655_Yn7zQ8YB6eDYFVLbIZBgeglsFP3bl3xwyYlVEPh6.jpeg" 
              alt="picture of house"
              className="absolute top-0 left-0 w-full h-full object-cover p-1 brightness-50"
            />
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center flex justify-center flex-col items-center text-white px-8">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4">Thinking of Selling?</h3>
              <p className="text-lg mb-6 max-w-md">Get your FREE Home Valuation complete with local comparables instantly.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Get Your Home Value
              </Button>
            </div>
          </div>

          {/* Purchasing Column */}
          <div className="relative min-h-[450px] overflow-hidden">
            <img 
              src="https://img.kvcore.com/cdn-cgi/image/fit=scale-down,format=auto/https://dtzulyujzhqiu.cloudfront.net/kvcoredemo14/images/1600729734_JGOaATnYWnm3uBVdmsGSRCSaiNDgLUtr8UazERjL.jpeg" 
              alt="picture of house"
              className="absolute top-0 left-0 w-full h-full object-cover p-1 brightness-50"
            />
            <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 text-center flex justify-center flex-col items-center text-white px-8">
              <h3 className="text-3xl md:text-4xl font-semibold mb-4">Looking to Purchase?</h3>
              <p className="text-lg mb-6 max-w-md">Search thousands of current listings directly from our local MLS.</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Start Your Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnSection;
