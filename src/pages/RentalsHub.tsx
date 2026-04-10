import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Home, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const filterTowns = [
  { label: "All", value: "all" },
  { label: "Albany", value: "albany" },
  { label: "Troy", value: "troy" },
  { label: "Schenectady", value: "schenectady" },
  { label: "Saratoga Springs", value: "saratoga-springs" },
  { label: "Colonie", value: "colonie" },
  { label: "Cohoes", value: "cohoes" },
];

interface Rental {
  id: string;
  town_slug: string;
  address: string;
  rent_price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number | null;
  photos: string[] | null;
  description: string | null;
  available_date: string | null;
  pet_friendly: boolean | null;
  utilities_included: boolean | null;
  created_at: string;
}

const getMortgageEquivalent = (rent: number) => {
  // Rough: monthly payment → home price at ~6.5% 30yr
  const homePrice = Math.round((rent / 6.5) * 1000);
  return homePrice.toLocaleString();
};

const getDaysOld = (createdAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
};

const RentalsHub = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchRentals = async () => {
      setIsLoading(true);
      let query = supabase
        .from("rentals")
        .select("*")
        .eq("is_active", true)
        .order("featured_order", { ascending: true, nullsFirst: false })
        .order("rent_price", { ascending: true })
        .limit(12);

      if (activeFilter !== "all") {
        query = query.eq("town_slug", activeFilter);
      }

      const { data } = await query;
      setRentals((data as Rental[]) || []);
      setIsLoading(false);
    };

    fetchRentals();
  }, [activeFilter]);

  const maskAddress = (address: string) => {
    // Remove street number, keep street name
    return address.replace(/^\d+\s*/, "");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  // Placeholder cards for when DB is empty or loading
  const placeholderCards = Array.from({ length: 6 }, (_, i) => ({
    id: `placeholder-${i}`,
    type: ["APARTMENT", "TOWNHOME", "DUPLEX", "STUDIO", "APARTMENT", "TOWNHOME"][i],
    street: ["Elm Street", "State Street", "River Road", "Washington Ave", "Central Ave", "Congress Street"][i],
    rent: [1400, 1650, 1200, 950, 1800, 1500][i],
    beds: [2, 3, 1, 1, 3, 2][i],
    baths: [1, 1.5, 1, 1, 2, 1][i],
    isNew: i < 3,
    isToday: i === 0,
  }));

  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Rentals — Apartments & Homes for Rent | Capital District Nest</title>
        <meta name="description" content="Find apartments, townhomes and rental units across Albany, Troy, Schenectady, Saratoga Springs and beyond. Updated weekly from live MLS data." />
        <meta name="keywords" content="albany ny rentals, troy apartments, schenectady rentals, saratoga springs apartments, capital district rentals, homes for rent" />
        <link rel="canonical" href="https://capitaldistrictnest.com/rentals" />
      </Helmet>

      <main>
        {/* Hero Section — Navy */}
        <section className="bg-primary py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "hsl(38, 92%, 50%)" }}>
              CAPITAL DISTRICT RENTALS
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-5 tracking-tight">
              Find your next home in the Capital District
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10">
              Apartments, townhomes and rental units across Albany, Troy, Schenectady, Saratoga Springs and beyond. Updated weekly from live MLS data.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {filterTowns.map((town) => (
                <button
                  key={town.value}
                  onClick={() => setActiveFilter(town.value)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeFilter === town.value
                      ? "text-primary-foreground shadow-lg"
                      : "bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20"
                  }`}
                  style={activeFilter === town.value ? { backgroundColor: "hsl(38, 92%, 50%)", color: "hsl(220, 12%, 18%)" } : {}}
                >
                  {town.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Rental Feed Section — Light Gray */}
        <section className="bg-secondary py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2" style={{ color: "hsl(38, 92%, 50%)" }}>
                LIVE RENTAL FEED
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Available now across the Capital District
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-6 animate-pulse">
                    <div className="h-5 bg-muted rounded w-1/3 mb-4" />
                    <div className="h-6 bg-muted rounded w-2/3 mb-3" />
                    <div className="h-8 bg-muted rounded w-1/2 mb-3" />
                    <div className="h-4 bg-muted rounded w-1/3 mb-6" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentals.map((rental) => {
                  const daysOld = getDaysOld(rental.created_at);
                  const newBadge = daysOld <= 1 ? "NEW TODAY" : daysOld <= 7 ? "NEW THIS WEEK" : null;

                  return (
                    <div key={rental.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                            APARTMENT
                          </span>
                          {newBadge && (
                            <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full">
                              {newBadge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {maskAddress(rental.address)}
                        </h3>

                        <p className="text-2xl font-bold text-foreground mb-1">
                          {formatPrice(rental.rent_price)}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </p>

                        <p className="text-sm text-muted-foreground mb-4">
                          {rental.bedrooms} bed · {rental.bathrooms} bath
                          {rental.town_slug && (
                            <span className="ml-2 capitalize">· {rental.town_slug.replace("-", " ")}</span>
                          )}
                        </p>

                        <p className="text-xs text-muted-foreground italic mb-5">
                          This payment ≈ ${getMortgageEquivalent(rental.rent_price)} mortgage.{" "}
                          <Link to="/analyze" className="text-primary hover:underline not-italic font-medium">
                            Own instead? →
                          </Link>
                        </p>

                        <Button
                          className="w-full font-semibold"
                          style={{ backgroundColor: "hsl(38, 92%, 50%)", color: "hsl(220, 12%, 18%)" }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Showing
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Placeholder cards when no DB data */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderCards.map((card) => (
                  <div key={card.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                          {card.type}
                        </span>
                        {card.isNew && (
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-600 px-2.5 py-1 rounded-full">
                            {card.isToday ? "NEW TODAY" : "NEW THIS WEEK"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {card.street}
                      </h3>

                      <p className="text-2xl font-bold text-foreground mb-1">
                        ${card.rent.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </p>

                      <p className="text-sm text-muted-foreground mb-4">
                        {card.beds} bed · {card.baths} bath
                      </p>

                      <p className="text-xs text-muted-foreground italic mb-5">
                        This payment ≈ ${getMortgageEquivalent(card.rent)} mortgage.{" "}
                        <Link to="/analyze" className="text-primary hover:underline not-italic font-medium">
                          Own instead? →
                        </Link>
                      </p>

                      <Button
                        className="w-full font-semibold"
                        style={{ backgroundColor: "hsl(38, 92%, 50%)", color: "hsl(220, 12%, 18%)" }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Showing
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Conversion Section — Gold */}
        <section className="py-20 px-4" style={{ backgroundColor: "hsl(38, 92%, 50%)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "hsl(220, 12%, 18%)" }}>
              Renting in the Capital District? You might be closer to owning than you think.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(220, 12%, 25%)" }}>
              The median Capital District renter pays $1,700/month. That same payment covers a mortgage on a $300,000+ home. First-time buyer programs through NY State can cover your down payment — ask about $0 down options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 font-semibold"
                style={{ backgroundColor: "hsl(220, 12%, 18%)", color: "white" }}
              >
                <Link to="/search/single-family">
                  See homes under $300K
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-semibold border-2"
                style={{ borderColor: "hsl(220, 12%, 18%)", color: "hsl(220, 12%, 18%)", backgroundColor: "transparent" }}
              >
                <Link to="/contact">
                  Talk to Scott
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default RentalsHub;
