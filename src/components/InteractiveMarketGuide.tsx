import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Home, 
  DollarSign, 
  Users, 
  Car, 
  GraduationCap, 
  ShoppingBag,
  Train,
  Star,
  Clock,
  BarChart3,
  Download
} from "lucide-react";
import { useAnalytics } from './AnalyticsTracker';
import LeadCaptureForm from './LeadCaptureForm';
import PriceTrendChart from './PriceTrendChart';

interface MarketGuideProps {
  neighborhood: string;
  city: string;
  state?: string;
}

const InteractiveMarketGuide = ({ 
  neighborhood, 
  city, 
  state = "NY" 
}: MarketGuideProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [downloadRequest, setDownloadRequest] = useState<string | null>(null);
  
  const { trackChartInteraction, trackDocumentDownload } = useAnalytics();

  // Mock market data - in real app, this would come from your data sources
  const marketData = {
    overview: {
      medianPrice: 485000,
      priceChange: 8.2,
      daysOnMarket: 23,
      inventory: 1.8,
      walkScore: 72,
      transitScore: 45,
      bikeScore: 68
    },
    demographics: {
      population: 18650,
      medianAge: 34,
      medianIncome: 78500,
      homeOwnership: 68,
      education: {
        highSchool: 92,
        bachelors: 45,
        graduate: 18
      }
    },
    amenities: {
      schools: [
        { name: "Albany High School", rating: 8, type: "Public" },
        { name: "St. Catherine's Elementary", rating: 9, type: "Private" },
        { name: "SUNY Albany", rating: 8, type: "University" }
      ],
      shopping: ["Crossgates Mall", "Delaware Plaza", "Stuyvesant Plaza"],
      dining: ["New World Bistro", "Cafe Capriccio", "The Citizen"],
      recreation: ["Washington Park", "Lincoln Park", "Empire State Plaza"]
    },
    investment: {
      appreciation: 6.8,
      rentalYield: 7.2,
      vacancyRate: 4.1,
      avgRent: 2100,
      capRate: 8.5,
      investmentGrade: "A-"
    }
  };

  const handleDownloadRequest = (reportType: string) => {
    trackDocumentDownload(`${neighborhood} ${reportType} Report`);
    setDownloadRequest(reportType);
    setShowLeadCapture(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    trackChartInteraction('market_guide_tab_view', neighborhood, { tab: value });
  };

  if (showLeadCapture) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Download Complete {neighborhood} Market Guide
            </CardTitle>
            <CardDescription>
              Get the full {downloadRequest || 'market'} report with detailed analysis, comparables, and investment projections
            </CardDescription>
          </CardHeader>
        </Card>
        <LeadCaptureForm 
          type="investment" 
          title={`${neighborhood} Complete Market Analysis`}
          description="Receive detailed market insights, investment analysis, and future projections via email"
          buttonText="Download Market Guide"
        />
        <Button 
          variant="outline" 
          onClick={() => setShowLeadCapture(false)}
          className="w-full"
        >
          ← Back to Market Guide
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">{neighborhood} Market Guide</h1>
          </div>
          <p className="text-muted-foreground">{city}, {state} • Updated Monthly</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Median Price</p>
              <p className="text-xl font-bold">${marketData.overview.medianPrice.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-sm text-green-600">+{marketData.overview.priceChange}%</span>
              </div>
            </div>
            
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Days on Market</p>
              <p className="text-xl font-bold">{marketData.overview.daysOnMarket}</p>
              <p className="text-sm text-muted-foreground">Fast market</p>
            </div>
            
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Walk Score</p>
              <p className="text-xl font-bold">{marketData.overview.walkScore}</p>
              <p className="text-sm text-muted-foreground">Very Walkable</p>
            </div>
            
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Investment Grade</p>
              <p className="text-xl font-bold">{marketData.investment.investmentGrade}</p>
              <p className="text-sm text-muted-foreground">Excellent</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="investment">Investment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PriceTrendChart neighborhood={neighborhood} showLeadCapture={false} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Market Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Market Inventory</span>
                    <span className="font-medium">{marketData.overview.inventory} months</span>
                  </div>
                  <Progress value={35} className="h-2" />
                  <p className="text-xs text-muted-foreground">Seller's market (below 3 months)</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Walkability</span>
                    <span className="font-medium">{marketData.overview.walkScore}/100</span>
                  </div>
                  <Progress value={marketData.overview.walkScore} className="h-2" />
                  <p className="text-xs text-muted-foreground">Very walkable - most errands can be accomplished on foot</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Transit Score</span>
                    <span className="font-medium">{marketData.overview.transitScore}/100</span>
                  </div>
                  <Progress value={marketData.overview.transitScore} className="h-2" />
                  <p className="text-xs text-muted-foreground">Some transit options available</p>
                </div>

                <Button 
                  onClick={() => handleDownloadRequest('market')} 
                  className="w-full mt-4"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Market Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Population
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{marketData.demographics.population.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Residents</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Median Age</span>
                    <span className="font-medium">{marketData.demographics.medianAge} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Home Ownership</span>
                    <span className="font-medium">{marketData.demographics.homeOwnership}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">${marketData.demographics.medianIncome.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Median Household Income</p>
                <div className="mt-4">
                  <Badge variant="secondary">Above NY Average</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">High School+</span>
                    <span className="font-medium">{marketData.demographics.education.highSchool}%</span>
                  </div>
                  <Progress value={marketData.demographics.education.highSchool} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Bachelor's+</span>
                    <span className="font-medium">{marketData.demographics.education.bachelors}%</span>
                  </div>
                  <Progress value={marketData.demographics.education.bachelors} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Graduate+</span>
                    <span className="font-medium">{marketData.demographics.education.graduate}%</span>
                  </div>
                  <Progress value={marketData.demographics.education.graduate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={() => handleDownloadRequest('demographics')} 
            className="w-full"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Demographics Report
          </Button>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Schools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {marketData.amenities.schools.map((school, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{school.name}</p>
                      <p className="text-sm text-muted-foreground">{school.type}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{school.rating}/10</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  Shopping & Dining
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Shopping Centers</h4>
                  <div className="space-y-1">
                    {marketData.amenities.shopping.map((place, index) => (
                      <Badge key={index} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Popular Restaurants</h4>
                  <div className="space-y-1">
                    {marketData.amenities.dining.map((place, index) => (
                      <Badge key={index} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recreation</h4>
                  <div className="space-y-1">
                    {marketData.amenities.recreation.map((place, index) => (
                      <Badge key={index} variant="outline">{place}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Car className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Commute Score</p>
                    <p className="text-sm text-muted-foreground">25 min to downtown</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Train className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Public Transit</p>
                    <p className="text-sm text-muted-foreground">CDTA Bus Lines</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Airport Access</p>
                    <p className="text-sm text-muted-foreground">15 min to ALB</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Appreciation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{marketData.investment.appreciation}%</p>
                <p className="text-sm text-muted-foreground mt-1">Annual Growth Rate</p>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-green-50 text-green-700">Above Market</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Rental Yield
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{marketData.investment.rentalYield}%</p>
                <p className="text-sm text-muted-foreground mt-1">Gross Rental Yield</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Monthly Rent</span>
                    <span className="font-medium">${marketData.investment.avgRent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vacancy Rate</span>
                    <span className="font-medium">{marketData.investment.vacancyRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Cap Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">{marketData.investment.capRate}%</p>
                <p className="text-sm text-muted-foreground mt-1">Capitalization Rate</p>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700">Strong ROI</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Investment Opportunity Analysis</CardTitle>
              <CardDescription>
                Based on current market conditions and historical data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Strengths</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Strong price appreciation trend
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      High rental demand from SUNY students
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Government employment stability
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Good walkability and amenities
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Considerations</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Property taxes above state average
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Limited inventory may increase competition
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Seasonal rental variations
                    </li>
                  </ul>
                </div>
              </div>

              <Button 
                onClick={() => handleDownloadRequest('investment')} 
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Get Detailed Investment Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveMarketGuide;