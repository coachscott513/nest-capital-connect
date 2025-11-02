import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Star, MapPin, ExternalLink } from "lucide-react";

const DelmarSchoolDistrict = () => {
  const schools = [
    {
      name: "Eagle Elementary School",
      rating: 8,
      distance: "0.7 miles",
      grades: "K-5",
      type: "Public",
    },
    {
      name: "Bethlehem Central Middle School",
      rating: 9,
      distance: "1.4 miles",
      grades: "6-8",
      type: "Public",
    },
    {
      name: "Bethlehem Central High School",
      rating: 9,
      distance: "1.6 miles",
      grades: "9-12",
      type: "Public",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Bethlehem Central School District
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Delmar homes are served by the highly-rated Bethlehem Central School
            District, consistently recognized as one of New York's top public school
            systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {schools.map((school, index) => (
            <Card
              key={index}
              className="border-blue-100 hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {school.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{school.grades}</p>
                    <p className="text-xs text-gray-500">{school.type}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-green-700 fill-green-700" />
                    <span className="font-bold text-green-700">{school.rating}/10</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{school.distance} from center</span>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-2">GreatSchools Rating</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${school.rating * 10}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional District Info */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Bethlehem Central?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>
                      Consistently ranked among the top 5% of NY school districts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>95%+ graduation rate with strong college placement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>
                      Comprehensive AP and honors programs for advanced learners
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>
                      Award-winning athletics, arts, and extracurricular programs
                    </span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <a
                    href="https://www.bethlehem.k12.ny.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Full District Report
                  </a>
                </Button>
                <p className="text-sm text-gray-600 mt-4">
                  Source: GreatSchools.org & NY State Education Dept.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DelmarSchoolDistrict;
