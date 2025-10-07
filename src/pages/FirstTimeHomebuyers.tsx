import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Download, Home, FileText, Search, DollarSign, Key } from 'lucide-react';

const FirstTimeHomebuyers = () => {
  const howToGuideSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Capital District First-Time Homebuyer Process",
    "description": "Complete step-by-step guide for first-time homebuyers in Albany, Troy, Schenectady, and Saratoga Springs",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Get Pre-Approved for a Mortgage",
        "text": "Meet with local lenders to get pre-approved for a mortgage. This determines your budget and shows sellers you're a serious buyer."
      },
      {
        "@type": "HowToStep",
        "name": "Find a Real Estate Agent",
        "text": "Partner with an experienced Capital District agent who specializes in first-time homebuyers and knows available grant programs."
      },
      {
        "@type": "HowToStep",
        "name": "Start House Hunting",
        "text": "Search for properties in your target neighborhoods like Albany's Center Square, Troy's historic downtown, or Schenectady's Stockade."
      },
      {
        "@type": "HowToStep",
        "name": "Make an Offer",
        "text": "Your agent will help you craft a competitive offer based on market conditions and comparable sales in the area."
      },
      {
        "@type": "HowToStep",
        "name": "Complete the Closing Process",
        "text": "Finalize your mortgage, complete home inspection, and close on your new Capital District home."
      }
    ]
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(howToGuideSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Capital District First-Time Homebuyer 2025 Checklist & Resources</title>
        <meta name="description" content="Ultimate 2025 guide for first-time homebuyers in Albany, Troy, Schenectady & Saratoga Springs. Step-by-step checklist, grants, and properties for sale in the Capital District." />
        <meta name="keywords" content="first time homebuyers capital district, first time home buyer Albany NY, homebuyer checklist Troy, Schenectady first time buyer, Saratoga Springs homebuyer guide" />
        <link rel="canonical" href="https://capitaldistrictnest.com/first-time-homebuyers" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Capital District First-Time Homebuyer 2025 Checklist & Resources
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Your complete guide to buying your first home in Albany, Troy, Schenectady, or Saratoga Springs. 
              Follow our proven step-by-step process and access exclusive resources to make your homeownership dream a reality.
            </p>

            <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-12 flex items-start gap-4">
              <Download className="h-8 w-8 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">Free Download: Complete Homebuyer Checklist</h2>
                <p className="mb-4">Get our comprehensive PDF checklist covering every step from pre-approval to closing.</p>
                <Button variant="secondary" size="lg">
                  Download Free Checklist
                </Button>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <DollarSign className="h-8 w-8" />
                1. Getting Pre-Approved for Your Mortgage
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Why Pre-Approval Matters</CardTitle>
                  <CardDescription>Set your budget and strengthen your offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Pre-approval is the first critical step in your homebuying journey. Local Capital District lenders will review 
                      your income, credit score, and debts to determine how much you can borrow.
                    </p>
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Documents You'll Need:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>2 years of tax returns and W-2s</li>
                        <li>Recent pay stubs (last 30 days)</li>
                        <li>Bank statements (2-3 months)</li>
                        <li>Photo ID and Social Security number</li>
                      </ul>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Capital District Tip:</strong> Many Albany and Troy lenders offer special programs for first-time buyers. 
                      Ask about available homebuyer grants during your pre-approval meeting.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Home className="h-8 w-8" />
                2. Finding the Right Real Estate Agent
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Partner with Local Expertise</CardTitle>
                  <CardDescription>Choose an agent who knows the Capital District market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      An experienced agent is invaluable for first-time buyers navigating the Capital District market. 
                      They'll help you understand neighborhood nuances, negotiate offers, and access off-market properties.
                    </p>
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">What to Look For in an Agent:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Experience with first-time homebuyers</li>
                        <li>Deep knowledge of Albany, Troy, Schenectady, or Saratoga neighborhoods</li>
                        <li>Familiarity with local grant programs and down payment assistance</li>
                        <li>Strong communication and responsiveness</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Search className="h-8 w-8" />
                3. House Hunting in the Capital District
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Search Smart, Find Your Perfect Home</CardTitle>
                  <CardDescription>Explore properties for sale in top Capital District neighborhoods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      The Capital District offers diverse neighborhoods with varying price points. From historic Troy brownstones 
                      to modern Saratoga condos, there's something for every first-time buyer.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-secondary/20 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Popular First-Time Buyer Areas:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Albany: Pine Hills, Delaware Avenue</li>
                          <li>Troy: Downtown, Lansingburgh</li>
                          <li>Schenectady: Stockade, Hamilton Hill</li>
                          <li>Saratoga: Near Downtown</li>
                        </ul>
                      </div>
                      <div className="bg-secondary/20 rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Key Considerations:</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          <li>Proximity to work and amenities</li>
                          <li>School district quality</li>
                          <li>Property taxes and HOA fees</li>
                          <li>Future resale potential</li>
                        </ul>
                      </div>
                    </div>
                    <Button variant="outline" asChild className="w-full">
                      <Link to="/#investment-properties">
                        View Available Properties for Sale
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <FileText className="h-8 w-8" />
                4. Making a Competitive Offer
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Craft Winning Offers</CardTitle>
                  <CardDescription>Stand out in the Capital District market</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Your agent will help you analyze comparable sales and craft an offer that's competitive yet protects your interests. 
                      In hot markets like Saratoga Springs, you may face multiple offer situations.
                    </p>
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Offer Components:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li><strong>Purchase Price:</strong> Based on market analysis</li>
                        <li><strong>Earnest Money:</strong> Typically 1-3% of purchase price</li>
                        <li><strong>Contingencies:</strong> Inspection, financing, appraisal</li>
                        <li><strong>Closing Timeline:</strong> Usually 30-60 days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Key className="h-8 w-8" />
                5. The Closing Process
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Final Steps to Homeownership</CardTitle>
                  <CardDescription>Navigate closing with confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Once your offer is accepted, you'll enter the closing phase. This includes home inspection, 
                      appraisal, final mortgage approval, and the closing meeting where you'll sign documents and receive your keys.
                    </p>
                    <div className="bg-secondary/20 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Closing Timeline:</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span><strong>Week 1-2:</strong></span>
                          <span>Home inspection and appraisal</span>
                        </div>
                        <div className="flex justify-between">
                          <span><strong>Week 3-4:</strong></span>
                          <span>Final mortgage underwriting</span>
                        </div>
                        <div className="flex justify-between">
                          <span><strong>Week 5-6:</strong></span>
                          <span>Final walkthrough and closing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Homebuying Journey?</h2>
              <p className="text-lg mb-6">
                We specialize in helping first-time buyers find the perfect home in Albany, Troy, Schenectady, and Saratoga Springs. 
                Let's make your homeownership dream a reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/#contact">
                    Contact Us Today
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-primary-foreground/10 hover:bg-primary-foreground/20">
                  <Link to="/grants">
                    View Available Grants
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Additional Resources:</strong> Learn about{' '}
                <Link to="/grants" className="text-primary hover:underline">
                  available homebuyer grants
                </Link>{' '}
                in the Capital District, or explore our{' '}
                <Link to="/#investment-properties" className="text-primary hover:underline">
                  current properties for sale
                </Link>{' '}
                in Albany, Troy, Schenectady, and Saratoga Springs.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FirstTimeHomebuyers;