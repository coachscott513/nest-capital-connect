import { Link } from "react-router-dom";
import { MapPin, Trees, ArrowRight } from "lucide-react";

const FeaturedListingBanner = () => {
  return (
    <section className="py-16 px-[5%] bg-card/50 border-y border-border">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Featured Listing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Premium Property Spotlight</h2>
          </div>
          <Link 
            to="/homes-for-sale" 
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            View All Listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Featured Card */}
        <Link 
          to="/listings/1999-ridge-road-queensbury-ny"
          className="group block relative rounded-2xl overflow-hidden bg-background border border-border hover:border-primary/50 transition-all"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="lg:w-1/2 relative h-64 lg:h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"
                alt="1999 Ridge Road, Queensbury NY - 6.8 acres"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 lg:block hidden" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  New Listing
                </span>
                <span className="bg-background/80 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold border border-border">
                  6.8 Acres
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Queensbury, Warren County</span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                1999 Ridge Road
              </h3>
              
              <p className="text-4xl font-extrabold text-primary mb-4">
                $279,900
              </p>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Rare 6.8-acre property near Lake George with mature tree buffer and southern exposure. 
                Minutes to Adirondack recreation, shopping, and I-87 access.
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-foreground">
                  <Trees className="h-5 w-5 text-primary" />
                  <span className="font-medium">Private Acreage</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-medium">Lake George Area</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                View Property Intelligence <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </Link>

        {/* Mobile View All Link */}
        <div className="mt-6 text-center md:hidden">
          <Link 
            to="/homes-for-sale" 
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            View All Listings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListingBanner;