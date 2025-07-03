import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import RealEstateSchema from '@/components/RealEstateSchema';
import { MapPin, TrendingUp, School, ShoppingCart, Car, Home } from 'lucide-react';

const Communities = () => {
  const { city } = useParams<{ city: string }>();
  
  const communityData: Record<string, any> = {
    albany: {
      name: "Albany",
      description: "New York's capital city offers historic charm, government job stability, and diverse investment opportunities from downtown lofts to suburban family homes.",
      population: "97,856",
      medianHomePrice: "$185,000",
      propertyTax: "2.3%",
      rentRange: "$1,200 - $2,500",
      keyFeatures: [
        "State government employment hub",
        "Historic downtown architecture", 
        "Strong rental demand from professionals",
        "Excellent highway access (I-87, I-90)",
        "Growing tech and healthcare sectors"
      ],
      neighborhoods: [
        { name: "Center Square", description: "Historic Victorian mansions converted to high-end apartments" },
        { name: "Pine Hills", description: "Student housing near UAlbany with strong rental returns" },
        { name: "New Scotland", description: "Family-friendly area with single-family investment properties" }
      ],
      schools: "Albany City School District, SUNY Albany nearby",
      amenities: ["Washington Park", "Empire State Plaza", "Palace Theatre", "Crossgates Mall"]
    },
    troy: {
      name: "Troy",
      description: "Historic riverfront city experiencing renaissance with RPI students, tech startups, and young professionals driving strong rental demand.",
      population: "49,974", 
      medianHomePrice: "$165,000",
      propertyTax: "2.8%",
      rentRange: "$1,000 - $2,200",
      keyFeatures: [
        "RPI student housing market",
        "Historic architecture rehabilitation opportunities",
        "Hudson River waterfront development",
        "Growing arts and culture scene",
        "Lower property prices, high rental yields"
      ],
      neighborhoods: [
        { name: "Downtown Troy", description: "Converted lofts and apartments near RPI campus" },
        { name: "Lansingburgh", description: "Affordable multi-family properties with renovation potential" },
        { name: "Wynantskill", description: "Suburban family rentals near RPI" }
      ],
      schools: "Troy City School District, RPI, Russell Sage College",
      amenities: ["Troy Farmers Market", "Frear Park", "Troy Music Hall", "Hudson River access"]
    },
    schenectady: {
      name: "Schenectady",
      description: "Affordable investment market with strong fundamentals, diverse employment, and significant renovation opportunities in historic properties.",
      population: "65,273",
      medianHomePrice: "$145,000", 
      propertyTax: "2.5%",
      rentRange: "$900 - $1,800",
      keyFeatures: [
        "Most affordable Capital District market",
        "GE heritage with diverse economy",
        "Union College student housing",
        "Stockade Historic District opportunities",
        "High cash-on-cash returns potential"
      ],
      neighborhoods: [
        { name: "Stockade District", description: "Historic area with renovation opportunities" },
        { name: "Mont Pleasant", description: "Diverse neighborhood with affordable multi-families" },
        { name: "Bellevue", description: "Family-oriented area near Union College" }
      ],
      schools: "Schenectady City School District, Union College",
      amenities: ["Central Park", "Proctors Theatre", "Mohawk Harbor", "Rivers Casino"]
    },
    saratoga: {
      name: "Saratoga Springs",
      description: "Premium market with seasonal tourism, SKIDMORE College, and historic racing creating year-round investment opportunities.",
      population: "28,491",
      medianHomePrice: "$425,000",
      propertyTax: "1.8%", 
      rentRange: "$1,800 - $4,500",
      keyFeatures: [
        "Premium tourist destination",
        "Saratoga Race Course seasonal demand",
        "SKIDMORE College student market",
        "Historic spa city charm",
        "Strong short-term rental potential"
      ],
      neighborhoods: [
        { name: "Historic Downtown", description: "Victorian homes ideal for vacation rentals" },
        { name: "West Side", description: "Student housing near Skidmore College" },
        { name: "East Side", description: "Family neighborhoods with stable rental demand" }
      ],
      schools: "Saratoga Springs City School District, Skidmore College",
      amenities: ["Saratoga Race Course", "Saratoga Spa State Park", "Congress Park", "Downtown shopping district"]
    }
  };

  const currentCommunity = communityData[city || 'albany'];
  
  if (!currentCommunity) {
    return <div>Community not found</div>;
  }

  const seoTitle = `${currentCommunity.name} Investment Properties & Real Estate Market Analysis | Capital District Nest`;
  const seoDescription = `Complete ${currentCommunity.name} real estate investment guide. Market analysis, property prices, rental rates, and investment opportunities in ${currentCommunity.name}, NY. Expert local knowledge from Capital District Nest.`;

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={`${currentCommunity.name} investment properties, ${currentCommunity.name} real estate market, ${currentCommunity.name} rental properties, ${currentCommunity.name} property investment, Capital District real estate`}
        canonical={`https://your-domain.com/communities/${city}`}
      />
      <RealEstateSchema type="agent" />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-6 text-foreground">
                {currentCommunity.name} Investment Properties
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                {currentCommunity.description}
              </p>
            </div>
            
            {/* Market Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center mb-3">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-card-foreground">Population</h3>
                </div>
                <p className="text-2xl font-bold text-primary">{currentCommunity.population}</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center mb-3">
                  <Home className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-card-foreground">Median Price</h3>
                </div>
                <p className="text-2xl font-bold text-primary">{currentCommunity.medianHomePrice}</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-card-foreground">Property Tax</h3>
                </div>
                <p className="text-2xl font-bold text-primary">{currentCommunity.propertyTax}</p>
              </div>
              
              <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                <div className="flex items-center mb-3">
                  <Car className="w-6 h-6 text-primary mr-3" />
                  <h3 className="font-semibold text-card-foreground">Rent Range</h3>
                </div>
                <p className="text-2xl font-bold text-primary">{currentCommunity.rentRange}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Why Invest in {currentCommunity.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCommunity.keyFeatures.map((feature: string, index: number) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border">
                  <p className="text-card-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhoods */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Investment Neighborhoods
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCommunity.neighborhoods.map((neighborhood: any, index: number) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border">
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{neighborhood.name}</h3>
                  <p className="text-muted-foreground">{neighborhood.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schools & Amenities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <School className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">Schools</h2>
                </div>
                <p className="text-lg text-muted-foreground">{currentCommunity.schools}</p>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <ShoppingCart className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">Local Amenities</h2>
                </div>
                <ul className="space-y-2">
                  {currentCommunity.amenities.map((amenity: string, index: number) => (
                    <li key={index} className="text-lg text-muted-foreground">• {amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Ready to Invest in {currentCommunity.name}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get detailed market analysis and view current investment opportunities in {currentCommunity.name}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href={`https://scottalvarez.remax.com/index.php?advanced=1&display=${currentCommunity.name}&min=0&max=100000000&beds=0&baths=0&types%5B%5D=3&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&sortby=listings.price+ASC&rtype=map`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View {currentCommunity.name} Properties
              </a>
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="bg-background hover:bg-muted text-foreground border border-border px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Market Analysis
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Communities;