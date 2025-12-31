import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";

const MarketReportThanks = () => {
  const { townSlug } = useParams<{ townSlug: string }>();
  
  // Convert slug to display name (e.g., "clifton-park" → "Clifton Park")
  const townName = townSlug
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Your Town';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Request Received | Capital District Nest</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <MainHeader />

      <main className="px-[5%] py-20 md:py-28">
        <div className="max-w-lg mx-auto">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-8 md:p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Thanks — We'll Send Your Summary Shortly
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8">
                You'll receive the full list and a short explanation of what's changing in {townName} via email.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1 h-12" asChild>
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Return to Home
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex-1 h-12" asChild>
                  <Link to={`/towns/${townSlug}`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to {townName}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MarketReportThanks;
