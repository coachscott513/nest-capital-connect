import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, DollarSign } from 'lucide-react';

const Grants = () => {
  const grantsPrograms = [
    {
      name: "NYS Mortgage Assistance Program",
      eligibility: "Albany, Rensselaer, Schenectady, Saratoga Counties",
      incomeLimits: "Up to 165% of area median income",
      benefit: "Up to $15,000 down payment assistance",
      applyUrl: "https://hcr.ny.gov/homebuyer-programs"
    },
    {
      name: "SONYMA Conventional Plus Program",
      eligibility: "Capital District - All first-time buyers",
      incomeLimits: "Varies by county (typically $150k-$175k)",
      benefit: "$3,000-$7,500 closing cost assistance",
      applyUrl: "https://www.nyhomes.org/"
    },
    {
      name: "Albany County Down Payment Assistance",
      eligibility: "Albany County residents only",
      incomeLimits: "Up to $95,000 household income",
      benefit: "Up to $10,000 down payment grant",
      applyUrl: "https://albanycounty.com/housing"
    },
    {
      name: "Schenectady Homeownership Program",
      eligibility: "Schenectady County buyers",
      incomeLimits: "Up to 80% AMI",
      benefit: "$5,000-$12,000 forgivable loan",
      applyUrl: "https://schenectadycounty.com"
    },
    {
      name: "Troy Community Land Bank Program",
      eligibility: "Troy city limits",
      incomeLimits: "Up to $85,000",
      benefit: "$8,000 down payment + closing assistance",
      applyUrl: "https://troyny.gov/departments/community-development/"
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What homebuyer grants are available in the Capital District?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Capital District homebuyers can access NYS Mortgage Assistance Program, SONYMA programs, and county-specific grants in Albany, Schenectady, Saratoga, and Rensselaer counties. These programs offer $3,000-$15,000 in down payment and closing cost assistance."
        }
      },
      {
        "@type": "Question",
        "name": "Who qualifies for Capital District homebuyer grants?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most programs require first-time homebuyer status and income limits ranging from $85,000-$175,000 depending on the county. Buyers must complete homebuyer education and meet credit score requirements."
        }
      },
      {
        "@type": "Question",
        "name": "How much down payment assistance can I get in Albany NY?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Albany County offers up to $10,000 in down payment assistance, while NYS programs provide up to $15,000. Combined programs may offer even more support for qualified buyers."
        }
      }
    ]
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Homebuyer Grants & Down Payment Assistance (2025 Guide)</title>
        <meta name="description" content="Complete 2025 guide to homebuyer grants in Albany, Troy, Schenectady & Saratoga Springs. Get up to $15,000 in down payment assistance for Capital District properties for sale." />
        <meta name="keywords" content="homebuyer grants capital district, down payment assistance Albany NY, first time homebuyer grants Troy NY, Schenectady homebuyer programs, Saratoga Springs grants" />
        <link rel="canonical" href="https://capitaldistrictnest.com/grants" />
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Capital District Homebuyer Grants & Down Payment Assistance (2025 Guide)
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Discover available homebuyer grants and down payment assistance programs in Albany, Troy, Schenectady, and Saratoga Springs. 
            Our comprehensive 2025 guide helps you access up to $15,000 in local down payment programs to make homeownership affordable.
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Quick Summary: Available Assistance
            </h2>
            <ul className="space-y-2 text-foreground">
              <li>✓ <strong>$3,000 - $15,000</strong> in down payment grants available</li>
              <li>✓ Programs for <strong>Albany, Schenectady, Saratoga, and Rensselaer Counties</strong></li>
              <li>✓ Income limits up to <strong>$175,000</strong> for some programs</li>
              <li>✓ Forgivable loans and grants (no repayment required)</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-foreground">Top 5 Capital District Homebuyer Grant Programs</h2>

          <div className="space-y-6 mb-12">
            {grantsPrograms.map((program, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <CardDescription>Benefit: {program.benefit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-foreground">Eligible Counties:</strong>
                      <p className="text-muted-foreground">{program.eligibility}</p>
                    </div>
                    <div>
                      <strong className="text-foreground">Income Limits:</strong>
                      <p className="text-muted-foreground">{program.incomeLimits}</p>
                    </div>
                    <Button variant="outline" asChild className="mt-4">
                      <a href={program.applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="bg-card border border-border rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">What homebuyer grants are available in the Capital District?</h3>
                <p className="text-muted-foreground">
                  Capital District homebuyers can access NYS Mortgage Assistance Program, SONYMA programs, and county-specific grants 
                  in Albany, Schenectady, Saratoga, and Rensselaer counties. These programs offer $3,000-$15,000 in down payment and 
                  closing cost assistance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Who qualifies for Capital District homebuyer grants?</h3>
                <p className="text-muted-foreground">
                  Most programs require first-time homebuyer status and income limits ranging from $85,000-$175,000 depending on the county. 
                  Buyers must complete homebuyer education and meet credit score requirements.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">How much down payment assistance can I get in Albany NY?</h3>
                <p className="text-muted-foreground">
                  Albany County offers up to $10,000 in down payment assistance, while NYS programs provide up to $15,000. 
                  Combined programs may offer even more support for qualified buyers.
                </p>
              </div>
            </div>
          </section>

          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Use Your Grant on a Capital District Property?</h2>
            <p className="mb-6">
              We specialize in helping grant-eligible buyers find <Link to="/" className="underline font-semibold">properties for sale</Link> in 
              Albany, Troy, Schenectady, and Saratoga Springs that qualify for these programs.
            </p>
            <Link 
              to="/first-time-homebuyers"
              className="inline-flex items-center bg-background text-foreground px-8 py-4 rounded-full font-extrabold hover:scale-105 transition-transform"
            >
              <FileText className="mr-2 h-5 w-5" />
              Contact Us Today
            </Link>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>
              <strong>Related Resources:</strong> Looking for more homebuyer guidance? Check out our{' '}
              <Link to="/first-time-homebuyers" className="text-primary hover:underline">
                First-Time Homebuyer 2025 Checklist
              </Link>{' '}
              or explore{' '}
              <Link to="/#investment-properties" className="text-primary hover:underline">
                investment properties for sale
              </Link>{' '}
              in the Capital District.
            </p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default Grants;
