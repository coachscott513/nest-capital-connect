import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { MapPin, Home, TreePine, Sparkles } from "lucide-react";

const AlbanyLand = () => {
  return (
    <>
      <Helmet>
        <title>Albany Land For Sale | Buildable Lots & Development Opportunities</title>
        <meta name="description" content="Find land for sale in Albany County. Buildable lots, residential parcels, and development opportunities with zoning information and utility access." />
        <meta name="keywords" content="albany land for sale, buildable lots albany, albany ny land, residential lots albany county" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                    Albany County Land Opportunities
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    Buildable lots, residential parcels, and development opportunities throughout Albany County.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Home className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Residential Building Lots</h3>
                        <p className="text-sm text-muted-foreground">Cleared and buildable lots ready for construction</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TreePine className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Acreage & Wooded Parcels</h3>
                        <p className="text-sm text-muted-foreground">Privacy, recreation, and future development potential</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Subdivision Opportunities</h3>
                        <p className="text-sm text-muted-foreground">Large parcels suitable for multi-lot development</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <LeadCaptureForm 
                    type="land"
                    title="Get Albany land opportunities"
                    description="Receive new land listings with zoning details and development potential analysis"
                    buttonText="Get Albany land opportunities"
                    boldtrailTag="CDN_Land"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Property Types */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Types of Land Available</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border border-border rounded-lg">
                  <Home className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Single-Family Lots</h3>
                  <p className="text-muted-foreground">Cleared buildable lots in established neighborhoods with utilities</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <TreePine className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Acreage Parcels</h3>
                  <p className="text-muted-foreground">5-50+ acres for custom estates or recreational use</p>
                </div>
                <div className="p-6 border border-border rounded-lg">
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Development Sites</h3>
                  <p className="text-muted-foreground">Large parcels zoned for subdivision or multi-family development</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Find Your Perfect Parcel</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get notified of new land listings with zoning details, utility access, and development potential.
              </p>
              <LeadCaptureForm 
                type="land"
                title="Get Albany land opportunities"
                buttonText="Get Albany land opportunities"
                boldtrailTag="CDN_Land"
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AlbanyLand;
