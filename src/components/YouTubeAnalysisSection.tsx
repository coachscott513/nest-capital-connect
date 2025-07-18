import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Youtube, Play, TrendingUp, Search, Video, Users } from "lucide-react";

const YouTubeAnalysisSection = () => {
  const benefits = [
    {
      icon: Search,
      title: "Google Search Visibility",
      description: "YouTube videos appear directly in Google Search results, often ranking above traditional web pages for property-related queries."
    },
    {
      icon: TrendingUp,
      title: "Video SEO Power",
      description: "As the second-largest search engine, YouTube provides a direct line to Google's video index for massive organic reach."
    },
    {
      icon: Users,
      title: "Enhanced Trust Building",
      description: "Video content builds instant personal connections and trust, crucial for real estate transactions."
    },
    {
      icon: Video,
      title: "Multi-Platform Reach",
      description: "One core video can be repurposed across YouTube, Instagram Reels, and embedded in blog posts for maximum impact."
    }
  ];

  const contentStrategy = [
    {
      step: "1",
      title: "Core Video Creation",
      description: "60-90 second property walkthroughs highlighting key features and investment potential"
    },
    {
      step: "2", 
      title: "YouTube Optimization",
      description: "Keyword-rich titles, detailed descriptions, strategic tags, and compelling thumbnails"
    },
    {
      step: "3",
      title: "Instagram Reels",
      description: "15-30 second clips with trending hashtags, now indexed by Google Search"
    },
    {
      step: "4",
      title: "Cross-Platform Integration",
      description: "Embed videos in blog posts and link back to full property analyses"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800 hover:bg-red-200">
            <Youtube className="w-4 h-4 mr-2" />
            Video SEO Strategy
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Amplifying Real Estate Insights Through Video
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging YouTube and Instagram Reels to dominate video search results 
            and build deeper connections with property investors across the Capital District.
          </p>
        </div>

        {/* YouTube Channel Showcase */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">@capitaldistrictnest</CardTitle>
              <p className="text-muted-foreground">
                Your go-to source for Capital District real estate video analysis
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                asChild 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <a 
                  href="https://youtube.com/@capitaldistrictnest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Visit Our YouTube Channel
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Video SEO Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Why Video is a Game-Changer for Real Estate SEO
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Content Strategy */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Our One-to-Many Content Strategy
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentStrategy.map((item, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Details */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Maximizing Cross-Platform Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-lg">For Every Property Analysis:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Record 60-90 second property walkthrough videos
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Upload to YouTube with keyword-optimized titles and descriptions
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Create 15-30 second Instagram Reels for broader reach
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Embed videos directly into corresponding blog posts
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Evergreen Content Strategy:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Quarterly market update videos for each major city
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Neighborhood tour guides and investment walkthroughs
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Educational content on Capital District investing
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Cross-link between video content and market guide pages
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4">
            Ready to Explore Video-Driven Real Estate Insights?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <a 
                href="https://youtube.com/@capitaldistrictnest" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Youtube className="w-4 h-4 mr-2" />
                Subscribe to Our Channel
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/blog" className="inline-flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Read Our Latest Analysis
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeAnalysisSection;