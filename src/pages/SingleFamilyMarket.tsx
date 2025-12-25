import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getTownBySlug } from '@/components/CapitalDistrictTowns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, Building, School, MapPin, Calendar, DollarSign, BedDouble, Ruler } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SEOInternalLinking from '@/components/SEOInternalLinking';

// Mock data for single-family home markets
const marketData: Record<string, any> = {
  'albany': {
    averagePrice: '$325,000',
    medianDaysOnMarket: 14,
    pricePerSqFt: '$185',
    inventory: '1.8 months',
    yearOverYearChange: '+4.7%',
    commonStyles: ['Colonial', 'Victorian', 'Craftsman', 'Ranch', 'Cape Cod'],
    neighborhoods: [
      {
        name: 'Pine Hills',
        description: 'Historic neighborhood with tree-lined streets and a mix of single-family homes, particularly popular among faculty and staff from nearby universities.',
        averagePrice: '$295,000',
      },
      {
        name: 'New Scotland/Helderberg',
        description: 'Desirable area with excellent schools, larger lot sizes, and well-maintained single-family homes close to St. Peter\'s Hospital.',
        averagePrice: '$380,000',
      },
      {
        name: 'Buckingham Pond/Crestwood',
        description: 'Quiet residential area with mid-century homes surrounding a scenic pond, offering a suburban feel within the city.',
        averagePrice: '$340,000',
      },
      {
        name: 'Center Square/Hudson Park',
        description: 'Historic brownstones and townhomes near downtown, offering urban living with character and walkability.',
        averagePrice: '$315,000',
      },
    ],
    marketTrends: 'Albany\'s single-family home market continues to show resilience with steady appreciation despite limited inventory. The most competitive price points are in the $250,000-$350,000 range, where homes often receive multiple offers. Higher-end properties above $450,000 typically stay on the market longer, creating opportunities for buyers willing to invest in Albany\'s premium neighborhoods.',
    schoolDistricts: 'The City School District of Albany serves most neighborhoods, with several elementary schools, middle schools, and Albany High School. Some areas may fall within neighboring districts like Bethlehem or Guilderland, which are highly rated and often a draw for families moving to the area.',
    economicFactors: 'Albany\'s position as the state capital provides employment stability through government jobs, while the growing tech sector anchored by the SUNY Polytechnic Institute has created increased demand for single-family homes in convenient locations. Healthcare expansion around Albany Medical Center and St. Peter\'s Hospital continues to drive demand in surrounding neighborhoods.'
  },
  'schenectady': {
    averagePrice: '$210,000',
    medianDaysOnMarket: 21,
    pricePerSqFt: '$135',
    inventory: '2.1 months',
    yearOverYearChange: '+6.2%',
    commonStyles: ['Colonial', 'Victorian', 'Craftsman', 'Bungalow', 'Ranch'],
    neighborhoods: [
      {
        name: 'GE Plot',
        description: 'Historic district with stately homes originally built for GE executives, featuring tree-lined streets and architectural charm.',
        averagePrice: '$280,000',
      },
      {
        name: 'Upper Union Street',
        description: 'Popular neighborhood with well-maintained homes and walkable access to shopping and dining on Union Street.',
        averagePrice: '$245,000',
      },
      {
        name: 'Woodlawn',
        description: 'Affordable area with mid-century homes on larger lots, popular with first-time homebuyers and young families.',
        averagePrice: '$185,000',
      },
      {
        name: 'Bellevue',
        description: 'Established neighborhood with solid housing stock, convenient to highways and shopping centers.',
        averagePrice: '$175,000',
      },
    ],
    marketTrends: 'Schenectady\'s single-family home market offers exceptional value compared to other Capital District communities, with steady appreciation as revitalization efforts continue downtown. Investors and first-time homebuyers are particularly active in Schenectady, drawn by affordable price points and renovation opportunities.',
    schoolDistricts: 'The Schenectady City School District serves most neighborhoods, while some areas may fall within Niskayuna or Rotterdam districts, which are often sought after by families.',
    economicFactors: 'Schenectady\'s economy has diversified beyond its GE roots, with Mohawk Harbor development and Rivers Casino providing economic stimulus. The growing downtown scene with Proctors Theatre and new restaurants has increased interest in nearby residential neighborhoods.'
  },
  'troy': {
    averagePrice: '$235,000',
    medianDaysOnMarket: 18,
    pricePerSqFt: '$145',
    inventory: '1.9 months',
    yearOverYearChange: '+5.8%',
    commonStyles: ['Victorian', 'Brownstone', 'Colonial', 'Row Houses', 'Greek Revival'],
    neighborhoods: [
      {
        name: 'Eastside',
        description: 'Highly desirable neighborhood with historic homes, tree-lined streets, and close proximity to Emma Willard School.',
        averagePrice: '$320,000',
      },
      {
        name: 'Brunswick/Hillside',
        description: 'Suburban area with newer construction and larger lots, popular with families seeking Troy schools with a more suburban feel.',
        averagePrice: '$275,000',
      },
      {
        name: 'Washington Park',
        description: 'Historic district surrounding the park with impressive Victorian architecture and brick row houses.',
        averagePrice: '$290,000',
      },
      {
        name: 'South Troy',
        description: 'Up-and-coming area with more affordable single-family options and close proximity to downtown.',
        averagePrice: '$185,000',
      },
    ],
    marketTrends: 'Troy\'s single-family home market has seen significant appreciation as the city\'s renaissance continues. Historic homes in walkable neighborhoods near downtown command premium prices, while areas further from the core offer better value for buyers seeking more space.',
    schoolDistricts: 'The Troy City School District serves the majority of Troy, with several elementary schools feeding into Troy Middle School and Troy High School.',
    economicFactors: 'Troy\'s tech corridor has grown with connections to RPI, while the vibrant downtown with farmer\'s markets, restaurants, and shops has increased the city\'s appeal to young professionals and families alike. The waterfront development continues to enhance Troy\'s desirability.'
  },
  'saratoga-springs': {
    averagePrice: '$525,000',
    medianDaysOnMarket: 10,
    pricePerSqFt: '$275',
    inventory: '1.5 months',
    yearOverYearChange: '+7.2%',
    commonStyles: ['Victorian', 'Colonial', 'Craftsman', 'Contemporary', 'Carriage House'],
    neighborhoods: [
      {
        name: 'Broadway Historic District',
        description: 'Grand historic homes near downtown with Victorian architecture and walking distance to all amenities.',
        averagePrice: '$850,000',
      },
      {
        name: 'West Side',
        description: 'Mix of historic and newer homes with a neighborhood feel, close to downtown and Skidmore College.',
        averagePrice: '$450,000',
      },
      {
        name: 'East Side',
        description: 'Desirable area with larger lots, established neighborhoods, and proximity to Saratoga Lake.',
        averagePrice: '$575,000',
      },
      {
        name: 'Geyser Crest',
        description: 'More affordable neighborhood with mid-century homes, popular with first-time buyers wanting access to Saratoga schools.',
        averagePrice: '$375,000',
      },
    ],
    marketTrends: 'Saratoga Springs maintains its position as the Capital District\'s premier real estate market, with strong demand and limited inventory creating a competitive environment for buyers. The seasonal influence of track season creates cyclical patterns in the market, with spring and summer seeing the most activity.',
    schoolDistricts: 'The Saratoga Springs City School District is highly rated and a major draw for families moving to the area.',
    economicFactors: 'Saratoga\'s diverse economy spans tourism, healthcare, education, and technology. The presence of SPAC, Skidmore College, and the famous race track, along with a thriving downtown, drives consistent demand for housing at all price points.'
  },
};

// Add data for more towns as needed

const SingleFamilyMarket = () => {
  const { town } = useParams<{ town: string }>();
  
  // Extract the base town slug from the URL parameter
  // Example: "albany-single-family-homes" -> "albany"
  const baseTownSlug = town ? town.replace('-single-family-homes', '') : '';
  
  // Get town data from CapitalDistrictTowns
  const townData = getTownBySlug(baseTownSlug);
  
  // Get market data from our mock data or provide defaults
  const market = marketData[baseTownSlug] || {
    averagePrice: 'Contact for details',
    medianDaysOnMarket: 'Contact for details',
    pricePerSqFt: 'Contact for details',
    inventory: 'Contact for details',
    yearOverYearChange: 'Contact for details',
    commonStyles: ['Various styles available'],
    neighborhoods: [],
    marketTrends: 'Contact us for the latest market trends in this area.',
    schoolDistricts: 'Contact us for information about local school districts.',
    economicFactors: 'Contact us for insights about local economic factors affecting this market.'
  };
  
  if (!townData) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainHeader />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Market Not Found</h1>
          <p className="mb-4">Sorry, we couldn't find information for the requested market area.</p>
          <Button asChild>
            <Link to="/markets">Return to Markets</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const townName = townData.name;
  const pageTitle = `${townName} Single-Family Homes: Market Guide & Analysis`;
  const pageDescription = `Explore ${townName}'s single-family home market with current trends, average prices, and neighborhood insights. Find your dream home in ${townName}, NY.`;
  
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        keywords={`${townName.toLowerCase()} single family homes, ${townName.toLowerCase()} real estate market, ${townName.toLowerCase()} housing, ${townName.toLowerCase()} neighborhoods, ${townData.county} county homes, capital district real estate, new york single family homes`}
        canonical={`https://capitaldistrictnest.com/markets/${baseTownSlug}-single-family-homes`}
      />
      
      <MainHeader />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link to="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link to="/markets" className="hover:text-primary">Markets</Link>
                <span>/</span>
                <span className="text-foreground">{townName} Homes</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {townName} Single-Family Homes
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Your comprehensive guide to the {townName} single-family home market,
                with current trends, neighborhood insights, and expert analysis.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <a href="#contact">
                    Get Market Analysis
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#neighborhoods">
                    Explore Neighborhoods
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Snapshot */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {townName} Market Snapshot
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="text-lg font-medium mb-1">Average Price</h3>
                <p className="text-2xl font-bold">{market.averagePrice}</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="text-lg font-medium mb-1">Days on Market</h3>
                <p className="text-2xl font-bold">{market.medianDaysOnMarket}</p>
              </Card>
              
              <Card className="p-6 text-center">
                <Ruler className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="text-lg font-medium mb-1">Price Per Sq.Ft.</h3>
                <p className="text-2xl font-bold">{market.pricePerSqFt}</p>
              </Card>
              
              <Card className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
                <h3 className="text-lg font-medium mb-1">Annual Change</h3>
                <p className="text-2xl font-bold">{market.yearOverYearChange}</p>
              </Card>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold mb-4">Current Market Conditions</h3>
              <p className="text-lg text-muted-foreground mb-6">
                {market.marketTrends}
              </p>
              
              <h4 className="text-xl font-semibold mb-3">Common Home Styles in {townName}</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {market.commonStyles.map((style: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-muted rounded-full text-sm">
                    {style}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-3 flex items-center">
                    <School className="h-5 w-5 mr-2 text-primary" />
                    School Districts
                  </h4>
                  <p className="text-muted-foreground">
                    {market.schoolDistricts}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-primary" />
                    Economic Factors
                  </h4>
                  <p className="text-muted-foreground">
                    {market.economicFactors}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Neighborhoods Section */}
        <section id="neighborhoods" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              {townName} Neighborhoods
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Explore the distinct neighborhoods and areas that make up {townName}'s single-family home market
            </p>
            
            {market.neighborhoods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {market.neighborhoods.map((neighborhood: any, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        {neighborhood.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {neighborhood.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Average Price</span>
                        <span className="text-lg font-bold">{neighborhood.averagePrice}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground">
                  Contact us for detailed information about {townName} neighborhoods.
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Buyer's Guide */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                Buyer's Guide to {townName} Single-Family Homes
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Best Time to Buy</h3>
                  <p className="text-muted-foreground">
                    While the {townName} market remains competitive year-round, the early spring and fall often 
                    see slight increases in inventory. Winter months typically have fewer buyers, potentially 
                    offering more negotiating leverage despite reduced selection.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Financing Considerations</h3>
                  <p className="text-muted-foreground">
                    Most single-family homes in {townName} qualify for conventional financing. FHA loans are 
                    popular options for first-time buyers in moderately priced neighborhoods. In certain areas, 
                    USDA rural development loans may be available with no down payment requirements.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Property Taxes</h3>
                  <p className="text-muted-foreground">
                    Property taxes in {townName} vary by neighborhood and assessment. The average effective 
                    tax rate for the area is approximately 2.3% of assessed value. Homes in certain school 
                    districts may have higher rates, which should be factored into your monthly payment calculations.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Home Inspection Tips</h3>
                  <p className="text-muted-foreground">
                    Given the age of many homes in {townName}, we recommend thorough inspections with particular 
                    attention to foundation, roof condition, and electrical systems. For homes built before 1978, 
                    lead paint inspections should be considered, especially for families with young children.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Listings */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              Latest {townName} Single-Family Home Listings
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Browse our recently analyzed single-family home listings in {townName}
            </p>
            
            <div className="text-center mb-8">
              <p className="text-muted-foreground mb-4">
                Check back soon for our latest property analyses, or contact us for current listings.
              </p>
              <Button asChild>
                <Link to="/blog">View All Property Analyses</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get a Personalized {townName} Market Analysis
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Looking to buy or sell a single-family home in {townName}? Our team can provide you with a 
                detailed market analysis customized to your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/contact">
                    Request Market Analysis
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/blog">
                    Read Our Latest Market Updates
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Internal Linking Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <Separator className="mb-12" />
            <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
            <SEOInternalLinking 
              currentPage={`/markets/${baseTownSlug}-single-family-homes`}
              maxLinks={6}
              showCategories={true}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SingleFamilyMarket;