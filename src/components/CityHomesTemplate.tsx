import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import MainLayout from "@/components/MainLayout";
import LeadCaptureForm from "@/components/LeadCaptureForm";

interface CityHomesTemplateProps {
  cityName: string;
  citySlug: string;
  description: string;
  pageTitle: string;
  metaDescription: string;
  keywords: string;
  highlights?: string[];
  stats?: {
    averagePrice?: string;
    daysOnMarket?: string;
    totalListings?: string;
  };
}

const CityHomesTemplate = ({
  cityName,
  citySlug,
  description,
  pageTitle,
  metaDescription,
  keywords,
  highlights = [],
  stats
}: CityHomesTemplateProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={`https://capitaldistrictnest.com/homes-for-sale/${citySlug}`}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-background py-16 px-4 border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {cityName}, NY Homes for Sale
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted local resource for {cityName} real estate
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6 text-muted-foreground">{description}</p>
            </div>

            {highlights.length > 0 && (
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                {highlights.map((highlight, index) => (
                  <Card key={index} className="bg-background border-border">
                    <CardContent className="pt-6">
                      <p className="text-center font-medium text-foreground">{highlight}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Market Stats Section */}
        {stats && (
          <section className="py-12 px-4 bg-background border-b border-border">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
                {cityName} Market Overview
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {stats.averagePrice && (
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-center text-foreground">{stats.averagePrice}</CardTitle>
                      <CardDescription className="text-center">Average Sale Price</CardDescription>
                    </CardHeader>
                  </Card>
                )}
                {stats.daysOnMarket && (
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-center text-foreground">{stats.daysOnMarket}</CardTitle>
                      <CardDescription className="text-center">Avg. Days on Market</CardDescription>
                    </CardHeader>
                  </Card>
                )}
                {stats.totalListings && (
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-center text-foreground">{stats.totalListings}</CardTitle>
                      <CardDescription className="text-center">Active Listings</CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Property Listings Section */}
        <section className="py-12 px-4 bg-card border-b border-border">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
              Current {cityName} Properties
            </h2>
            
            {/* Embedded Property Search for this city */}
            <div className="w-full max-w-[960px] mx-auto mb-8">
              <iframe 
                className="w-full h-[600px] border-0"
                src={`https://scottalvarez.remax.com/wide.php?city=${encodeURIComponent(cityName)}`}
                title={`${cityName} Property Listings`}
              />
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">
                Looking for properties in a specific neighborhood?
              </p>
              <Button size="lg" variant="outline">
                Browse by Neighborhood
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-background border-b border-border">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              See a Home You Like?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Schedule a showing today and let our local experts guide you
            </p>
            <div className="max-w-md mx-auto">
              <LeadCaptureForm type="investment" variant="inline" />
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default CityHomesTemplate;
