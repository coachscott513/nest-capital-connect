import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DelmarMarketHero from "@/components/DelmarMarketHero";
import DelmarMetricsGrid from "@/components/DelmarMetricsGrid";
import DelmarInteractiveMap from "@/components/DelmarInteractiveMap";
import DelmarSchoolInsights from "@/components/DelmarSchoolInsights";
import DelmarDemographics from "@/components/DelmarDemographics";
import DelmarBusinessCarousel from "@/components/DelmarBusinessCarousel";
import DelmarSafetyMap from "@/components/DelmarSafetyMap";
import DelmarSearchCTA from "@/components/DelmarSearchCTA";
import DelmarTrendFooter from "@/components/DelmarTrendFooter";

const DelmarMarketInsights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Delmar NY Homes for Sale | Market Insights & Google Earth View</title>
        <meta 
          name="description" 
          content="Explore homes for sale in Delmar, NY — complete with interactive Google Earth views, RPR school data, and live neighborhood analytics from Capital District Nest." 
        />
        <meta 
          name="keywords" 
          content="Delmar homes for sale, Bethlehem Central School District, Albany County real estate, Delmar market trends, Scott Alvarez RE/MAX" 
        />
      </Helmet>

      <Header />
      
      <main>
        {/* Hero with Google Earth Background */}
        <DelmarMarketHero />
        
        {/* Large Market Metrics */}
        <DelmarMetricsGrid />
        
        {/* Interactive Map with Layers */}
        <DelmarInteractiveMap />
        
        {/* RPR School Insights */}
        <DelmarSchoolInsights />
        
        {/* Demographics & Charts */}
        <DelmarDemographics />
        
        {/* Business Carousel */}
        <DelmarBusinessCarousel />
        
        {/* Crime & Safety */}
        <DelmarSafetyMap />
        
        {/* Search CTA */}
        <DelmarSearchCTA />
        
        {/* Trend Charts & Lead Capture */}
        <DelmarTrendFooter />
      </main>

      <Footer />
    </div>
  );
};

export default DelmarMarketInsights;
