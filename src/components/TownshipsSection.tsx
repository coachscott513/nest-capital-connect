import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Home, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { capitalDistrictTowns, getTownsByCounty, generateTownUrl } from '@/components/CapitalDistrictTowns';

const TownshipsSection = () => {
  const albanyCityTowns = getTownsByCounty('Albany');
  const schenectadyTowns = getTownsByCounty('Schenectady'); 
  const rensselaerTowns = getTownsByCounty('Rensselaer');
  const saratogaTowns = getTownsByCounty('Saratoga');

  const CountySection = ({ 
    county, 
    towns, 
    color 
  }: { 
    county: string; 
    towns: typeof capitalDistrictTowns; 
    color: string;
  }) => (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-2">
        <MapPin className={`h-6 w-6 ${color}`} />
        {county} County Communities
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {towns.map((town) => (
          <Card key={town.slug} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{town.name}</span>
                <Badge 
                  variant={town.priority === 'high' ? 'default' : town.priority === 'medium' ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {town.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                {town.description}
              </p>
              
              {town.neighborhoods && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-slate-500 mb-1">Key Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {town.neighborhoods.slice(0, 3).map((neighborhood) => (
                      <Badge key={neighborhood} variant="outline" className="text-xs">
                        {neighborhood}
                      </Badge>
                    ))}
                    {town.neighborhoods.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{town.neighborhoods.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button 
                  asChild 
                  size="sm" 
                  className="flex-1 text-xs"
                >
                  <Link to={generateTownUrl(town, 'rentals')}>
                    <Home className="h-3 w-3 mr-1" />
                    Rentals
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                >
                  <Link to={generateTownUrl(town, 'real-estate')}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Sales
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            Capital District Communities We Serve
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover rental opportunities and real estate investments across all Capital District townships, 
            villages, and cities. From urban centers to suburban communities, we know every neighborhood.
          </p>
        </div>

        <CountySection 
          county="Albany" 
          towns={albanyCityTowns} 
          color="text-blue-600"
        />
        
        <CountySection 
          county="Saratoga" 
          towns={saratogaTowns} 
          color="text-green-600"
        />
        
        <CountySection 
          county="Schenectady" 
          towns={schenectadyTowns} 
          color="text-purple-600"
        />
        
        <CountySection 
          county="Rensselaer" 
          towns={rensselaerTowns} 
          color="text-orange-600"
        />

        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-slate-800">
            Looking for Properties in a Specific Area?
          </h3>
          <p className="text-slate-600 mb-4">
            Our local expertise covers every corner of the Capital District. Get personalized recommendations 
            for your target neighborhood.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <MapPin className="h-4 w-4 mr-2" />
            Get Area-Specific Recommendations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TownshipsSection;