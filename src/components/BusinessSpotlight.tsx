import { useState } from "react";
import { X, ExternalLink, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface Business {
  id: string;
  name: string;
  logo: string;
  ownerPhoto: string;
  ownerName: string;
  story: string;
  offering: string;
  town: string;
  website?: string;
}

const featuredBusinesses: Business[] = [
  {
    id: "1",
    name: "Saratoga Coffee Traders",
    logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    ownerName: "Michael Chen",
    story: "Started in a small garage roasting beans for neighbors, Michael grew Saratoga Coffee Traders into the region's premier specialty roaster. Now serving 40+ cafes across the Capital District.",
    offering: "Specialty coffee roasting & wholesale distribution",
    town: "Saratoga Springs"
  },
  {
    id: "2",
    name: "Delmar Fitness Studio",
    logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
    ownerName: "Sarah Martinez",
    story: "After 15 years as a physical therapist, Sarah founded Delmar Fitness to bridge the gap between rehab and performance training for the community.",
    offering: "Boutique fitness & recovery services",
    town: "Delmar"
  },
  {
    id: "3",
    name: "Troy Brewing Co.",
    logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    ownerName: "James O'Brien",
    story: "A third-generation Troy native, James revived his grandfather's brewing recipes and opened Troy Brewing Co. in a renovated riverside warehouse.",
    offering: "Craft brewery & taproom experience",
    town: "Troy"
  },
  {
    id: "4",
    name: "Clifton Park Veterinary",
    logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    ownerName: "Dr. Emily Nguyen",
    story: "Dr. Nguyen brought cutting-edge veterinary care to Clifton Park after training at Cornell. Her clinic is now the go-to for pet families in the region.",
    offering: "Full-service veterinary care & pet wellness",
    town: "Clifton Park"
  },
  {
    id: "5",
    name: "Albany Tech Hub",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    ownerName: "David Park",
    story: "David left his Silicon Valley role to build a tech ecosystem in his hometown. Albany Tech Hub now supports 50+ startups and remote workers.",
    offering: "Coworking & startup incubator",
    town: "Albany"
  },
  {
    id: "6",
    name: "Niskayuna Gardens",
    logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80",
    ownerPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    ownerName: "Lisa Thompson",
    story: "Lisa transformed her family's 50-acre farm into a sustainable nursery and landscape design studio, becoming the region's authority on native plants.",
    offering: "Landscape design & native plant nursery",
    town: "Niskayuna"
  }
];

const BusinessSpotlight = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  return (
    <section className="py-20 px-[5%] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Local Partners</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
            Featured Local Partners
          </h2>
          <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto">
            Discover the businesses that make the Capital District thrive
          </p>
        </div>

        {/* Horizontal Scrolling Business Avatars */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {featuredBusinesses.map((business) => (
              <button
                key={business.id}
                onClick={() => setSelectedBusiness(business)}
                className="flex flex-col items-center gap-3 flex-shrink-0 snap-center group"
              >
                {/* Verified by Nest Border */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-primary to-primary/60 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    Verified by Nest
                  </div>
                </div>
                
                {/* Business Name */}
                <span className="text-sm font-medium text-[#1D1D1F] text-center max-w-[100px] leading-tight group-hover:text-primary transition-colors">
                  {business.name}
                </span>
              </button>
            ))}
          </div>
          
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Side Panel / Drawer */}
      <Sheet open={!!selectedBusiness} onOpenChange={() => setSelectedBusiness(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-white border-l border-gray-100">
          {selectedBusiness && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl font-bold text-[#1D1D1F]">
                  {selectedBusiness.name}
                </SheetTitle>
              </SheetHeader>

              {/* Owner Photo */}
              <div className="mb-6">
                <img
                  src={selectedBusiness.ownerPhoto}
                  alt={selectedBusiness.ownerName}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              {/* Owner Name & Town */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#1D1D1F]">{selectedBusiness.ownerName}</h3>
                  <p className="text-sm text-[#6E6E73]">Owner & Founder</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#6E6E73]">
                  <MapPin className="w-4 h-4" />
                  {selectedBusiness.town}
                </div>
              </div>

              {/* Story */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#1D1D1F] mb-2 uppercase tracking-wider">The Story</h4>
                <p className="text-[#6E6E73] leading-relaxed">{selectedBusiness.story}</p>
              </div>

              {/* Offering */}
              <div className="p-4 bg-[#F5F5F7] rounded-xl mb-6">
                <h4 className="text-sm font-semibold text-[#1D1D1F] mb-1">What They Offer</h4>
                <p className="text-[#6E6E73]">{selectedBusiness.offering}</p>
              </div>

              {/* CTA */}
              {selectedBusiness.website && (
                <a
                  href={selectedBusiness.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Visit Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default BusinessSpotlight;
