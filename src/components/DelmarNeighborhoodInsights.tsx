import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Coffee, Train, ShoppingBag, Trees } from "lucide-react";

const DelmarNeighborhoodInsights = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Delmar Living
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A charming Albany suburb combining small-town character with urban
            convenience
          </p>
        </div>

        {/* Main Insights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-green-100 hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Trees className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Walkable & Green
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Delmar boasts tree-lined streets, sidewalks throughout most
                neighborhoods, and easy access to the Albany County Rail Trail — a
                9-mile paved path perfect for biking, jogging, and family outings.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">Walkability Score:</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                  74/100
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Coffee className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Four Corners Village Center
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The heart of Delmar features locally-owned shops, cafés, restaurants,
                and services. Stroll to Hidden Café, Perfect Blend, or browse the
                farmers market on summer Saturdays.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="bg-blue-50 px-2 py-1 rounded">Dining</span>
                <span className="bg-blue-50 px-2 py-1 rounded">Shopping</span>
                <span className="bg-blue-50 px-2 py-1 rounded">Services</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <Train className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Commuter-Friendly Location
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Just 15 minutes to downtown Albany via Delaware Avenue or I-87. Easy
                access to state offices, hospitals, universities, and Tech Valley.
                Many residents also work remotely from home.
              </p>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Commute Times:</span>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Downtown Albany: 15 min</li>
                  <li>• Albany Int'l Airport: 20 min</li>
                  <li>• Saratoga Springs: 35 min</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <ShoppingBag className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Shopping & Amenities
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Delaware Plaza offers grocery (Price Chopper, Hannaford), retail, and
                dining options. Nearby Stuyvesant Plaza features upscale boutiques and
                restaurants in a beautiful outdoor setting.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="bg-orange-50 px-2 py-1 rounded">Groceries</span>
                <span className="bg-orange-50 px-2 py-1 rounded">Retail</span>
                <span className="bg-orange-50 px-2 py-1 rounded">Dining</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Street View Embed */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold mb-1">
                    Virtual Tour: Four Corners
                  </h3>
                  <p className="text-red-50">
                    Explore Delmar's charming village center via Google Street View
                  </p>
                </div>
              </div>
            </div>
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1sCAoSLEFGMVFpcE4xYjNLZ0JhRzROQWpFaEVCWFo3ejRnZThzRVhCX3BaOEZrSkdx!2m2!1d42.6217!2d-73.8326!3f210!4f0!5f0.7820865974627469"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Community Highlights */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Active Community Life
              </h3>
              <p className="text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed">
                Delmar residents enjoy year-round activities including summer concerts
                at Elm Avenue Park, winter ice skating, youth sports leagues, and
                strong parent-teacher organizations. The tight-knit community hosts
                annual events like the Delmar Dash 5K and Fourth of July parade.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="bg-white px-4 py-2 rounded-full text-gray-700 font-medium">
                  🎵 Summer Concerts
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-gray-700 font-medium">
                  ⛸️ Ice Skating
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-gray-700 font-medium">
                  🏃 Community Events
                </span>
                <span className="bg-white px-4 py-2 rounded-full text-gray-700 font-medium">
                  🎨 Arts Programs
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DelmarNeighborhoodInsights;
