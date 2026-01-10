import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Bed, Bath, MapPin, ArrowRight, Home, Calendar, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import RentalApplicationModal from "./RentalApplicationModal";

interface Rental {
  id: string;
  town_slug: string;
  address: string;
  rent_price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number | null;
  property_video_url: string | null;
  photos: string[] | null;
  description: string | null;
  available_date: string | null;
  pet_friendly: boolean;
  utilities_included: boolean;
}

interface RentalVaultProps {
  townSlug?: string;
  townName?: string;
  limit?: number;
  showTitle?: boolean;
}

const RentalVault = ({ townSlug, townName, limit = 4, showTitle = true }: RentalVaultProps) => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      setIsLoading(true);
      
      let query = supabase
        .from('rentals')
        .select('*')
        .eq('is_active', true)
        .order('featured_order', { ascending: true, nullsFirst: false })
        .order('rent_price', { ascending: true })
        .limit(limit);
      
      if (townSlug) {
        query = query.eq('town_slug', townSlug);
      }
      
      const { data, error } = await query;
      
      if (data && !error) {
        setRentals(data);
      }
      setIsLoading(false);
    };

    fetchRentals();
  }, [townSlug, limit]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleApplyClick = (rental: Rental) => {
    setSelectedRental(rental);
    setApplicationModalOpen(true);
  };

  if (isLoading) {
    return (
      <section className="section-massive px-[5%] bg-card">
        <div className="max-w-6xl mx-auto">
          {showTitle && (
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Rental Vault</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight">
                Loading rentals...
              </h2>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bento-card p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded w-2/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (rentals.length === 0) {
    return (
      <section className="section-massive px-[5%] bg-card">
        <div className="max-w-6xl mx-auto">
          {showTitle && (
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Rental Vault</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight">
                Available Rentals {townName ? `in ${townName}` : ''}
              </h2>
            </div>
          )}
          <div className="bento-card p-8 text-center max-w-md mx-auto">
            <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No rentals currently available{townName ? ` in ${townName}` : ''}.</p>
            <Link to="/rentals" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Browse All Rentals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-massive px-[5%] bg-card">
        <div className="max-w-6xl mx-auto">
          {showTitle && (
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Rental Vault</p>
                <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight">
                  Available Rentals {townName ? `in ${townName}` : ''}
                </h2>
              </div>
              <Link 
                to="/rentals" 
                className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentals.map((rental) => (
              <div 
                key={rental.id} 
                className="bento-card overflow-hidden hover-lift group"
              >
                {/* Video/Photo Hero */}
                <div className="relative h-56 bg-muted">
                  {rental.photos && rental.photos[0] ? (
                    <img 
                      src={rental.photos[0]} 
                      alt={rental.address}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-background">
                      <Home className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                  )}
                  
                  {/* Video Play Button Overlay */}
                  {rental.property_video_url && (
                    <a 
                      href={rental.property_video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center glow-primary">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-semibold text-white">
                        Virtual Nest Viewing
                      </span>
                    </a>
                  )}

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 glass-strong px-4 py-2 rounded-full">
                    <span className="text-xl font-bold text-primary text-glow">
                      {formatPrice(rental.rent_price)}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>

                  {/* Tags */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {rental.pet_friendly && (
                      <span className="glass text-xs font-semibold px-3 py-1 rounded-full text-foreground">
                        Pet Friendly
                      </span>
                    )}
                    {rental.utilities_included && (
                      <span className="glass text-xs font-semibold px-3 py-1 rounded-full text-foreground">
                        Utilities Included
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {rental.address}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span className="capitalize">{rental.town_slug.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Bed className="w-4 h-4 text-muted-foreground" />
                      <span>{rental.bedrooms} bed</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Bath className="w-4 h-4 text-muted-foreground" />
                      <span>{rental.bathrooms} bath</span>
                    </div>
                    {rental.sqft && (
                      <div className="flex items-center gap-1.5 text-foreground">
                        <span>{rental.sqft.toLocaleString()} sqft</span>
                      </div>
                    )}
                  </div>

                  {rental.available_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>Available {new Date(rental.available_date).toLocaleDateString()}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => handleApplyClick(rental)}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-[1.02] transition-transform glow-primary flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Apply to Rent
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View All Link */}
          <div className="mt-8 text-center md:hidden">
            <Link 
              to="/rentals" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              View All Rentals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <RentalApplicationModal 
        open={applicationModalOpen}
        onOpenChange={setApplicationModalOpen}
        rental={selectedRental}
      />
    </>
  );
};

export default RentalVault;