import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const RentalMap = lazy(() => import("@/components/RentalMap"));

const filterTowns = [
  { label: "All", value: "all" },
  { label: "Albany", value: "albany" },
  { label: "Troy", value: "troy" },
  { label: "Schenectady", value: "schenectady" },
  { label: "Saratoga Springs", value: "saratoga-springs" },
  { label: "Colonie", value: "colonie" },
  { label: "Cohoes", value: "cohoes" },
];

const areaBrowse = [
  { name: "Albany", slug: "albany", note: "Downtown, Pine Hills, Center Square" },
  { name: "Troy", slug: "troy", note: "South Troy, Lansingburgh, RPI area" },
  { name: "Schenectady", slug: "schenectady", note: "Stockade, GE Realty Plot, Mont Pleasant" },
  { name: "Saratoga Springs", slug: "saratoga-springs", note: "Broadway, East Side, West Side" },
  { name: "Colonie", slug: "colonie", note: "Latham, Loudonville, Shaker" },
  { name: "Cohoes", slug: "cohoes", note: "Waterfront, downtown, Harmony Mills" },
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
  latitude: number | null;
  longitude: number | null;
  property_sub_type: string | null;
  days_on_market: number | null;
  pet_friendly: boolean | null;
  utilities_included: boolean | null;
  created_at: string;
}

const getMortgageEquivalent = (rent: number) => {
  const homePrice = Math.round((rent / 6.5) * 1000);
  return homePrice.toLocaleString();
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

const maskAddress = (address: string) => address.replace(/^\d+\s*/, "");

const RentalsHub = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
        .order("days_on_market", { ascending: true })
        .limit(60);

      if (activeFilter !== "all") {
        query = query.eq("town_slug", activeFilter);
      }

      const { data } = await query;
      setRentals((data as Rental[]) || []);
      setIsLoading(false);
    };

    fetchRentals();
  }, [activeFilter]);

  const handlePinClick = (id: string) => {
    setHighlightedId(id);
    const el = cardRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const mapPins = rentals
    .filter((r) => r.latitude && r.longitude)
    .map((r) => ({
      id: r.id,
      lat: r.latitude!,
      lng: r.longitude!,
      address: r.address,
      rent_price: r.rent_price,
      bedrooms: r.bedrooms,
      bathrooms: r.bathrooms,
      town_slug: r.town_slug,
    }));

  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Rentals — Apartments & Homes for Rent | Capital District Nest</title>
        <meta name="description" content="Curated rental opportunities across Albany, Troy, Schenectady, Saratoga Springs and beyond. Updated weekly with local market insight and ownership options." />
        <link rel="canonical" href="https://capitaldistrictnest.com/rentals" />
      </Helmet>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative bg-background overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-12 md:pt-40 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-6">
                Capital District Rentals
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground tracking-[-0.035em] leading-[1.08] mb-6">
                Find rentals across Albany,<br className="hidden md:block" /> Troy, Saratoga and beyond
              </h1>
              <p className="text-lg text-foreground/55 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                Updated rental opportunities across the Capital District, paired with local market insight and ownership options.
              </p>

              {/* Filter chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {filterTowns.map((town) => (
                  <button
                    key={town.value}
                    onClick={() => setActiveFilter(town.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === town.value
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                    }`}
                  >
                    {town.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── MAP ─── */}
        <section className="px-6 pb-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <Suspense
              fallback={
                <div className="h-[250px] md:h-[400px] rounded-2xl bg-secondary animate-pulse border border-border" />
              }
            >
              <RentalMap
                rentals={mapPins}
                activeFilter={activeFilter}
                highlightedId={highlightedId}
                onPinClick={handlePinClick}
              />
            </Suspense>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              {mapPins.length} rentals shown · Click a pin for details
            </p>
          </div>
        </section>

        {/* ─── RENTAL FEED ─── */}
        <section className="py-20 md:py-28 px-6 bg-secondary/40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-14">
              <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-4">Live Rental Feed</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.1]">
                Available now
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-background rounded-2xl border border-border p-7 animate-pulse">
                    <div className="h-3 bg-muted rounded w-1/4 mb-5" />
                    <div className="h-5 bg-muted rounded w-2/3 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/3 mb-5" />
                    <div className="h-8 bg-muted rounded w-1/2 mb-3" />
                    <div className="h-10 bg-muted rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentals.map((rental) => {
                  const dom = rental.days_on_market ?? 999;
                  const newBadge = dom <= 1 ? "New today" : dom <= 7 ? "New this week" : null;
                  const isHighlighted = highlightedId === rental.id;
                  const subType = rental.property_sub_type || "Apartment";

                  return (
                    <motion.div
                      key={rental.id}
                      ref={(el) => { cardRefs.current[rental.id] = el; }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={`group bg-background rounded-2xl border hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 ${
                        isHighlighted
                          ? "border-accent shadow-[0_0_0_2px_hsl(var(--accent)/0.3)]"
                          : "border-border hover:border-foreground/10"
                      }`}
                      onClick={() => setHighlightedId(rental.id)}
                    >
                      {/* Photo */}
                      {rental.photos && rental.photos[0] && (
                        <div className="h-40 overflow-hidden rounded-t-2xl bg-muted">
                          <img
                            src={rental.photos[0]}
                            alt={maskAddress(rental.address)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        {/* Tags */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                            {subType}
                          </span>
                          {newBadge && (
                            <>
                              <span className="text-muted-foreground/30">·</span>
                              <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-emerald-600">
                                {newBadge}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Address */}
                        <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">
                          {maskAddress(rental.address)}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 capitalize">
                          {rental.town_slug.replace(/-/g, " ")}
                        </p>

                        {/* Price */}
                        <p className="text-2xl font-bold text-foreground tracking-tight mb-1">
                          {formatPrice(rental.rent_price)}
                          <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
                        </p>

                        {/* Specs */}
                        <p className="text-sm text-muted-foreground mb-5">
                          {rental.bedrooms} bed · {rental.bathrooms} bath
                          {rental.sqft && ` · ${rental.sqft.toLocaleString()} sqft`}
                        </p>

                        {/* Mortgage line */}
                        <p className="text-xs text-muted-foreground/70 leading-relaxed mb-5">
                          ≈ ${getMortgageEquivalent(rental.rent_price)} home at current rates.{" "}
                          <Link to="/analyze" className="text-accent hover:text-foreground transition-colors font-medium">
                            Own instead? →
                          </Link>
                        </p>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <button className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-foreground/85 transition-colors">
                            View Rental
                          </button>
                          <Link
                            to="/first-time-homebuyers"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Ownership options →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {rentals.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No rentals found for this area.</p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-4 text-accent font-medium hover:underline"
                >
                  View all areas →
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── RENT VS OWN ─── */}
        <section className="py-28 md:py-36 px-6 bg-background">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">Rent vs. Own</p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-foreground tracking-tight leading-[1.1] mb-8">
                You might be closer to<br className="hidden md:block" /> owning than you think.
              </h2>
              <div className="space-y-5 text-foreground/60 text-lg font-light leading-relaxed mb-10">
                <p>
                  The median Capital District renter pays $1,700/month. That same payment covers a mortgage on a $300,000+ home with today's rates.
                </p>
                <p>
                  First-time buyer programs through NY State can cover your down payment. Many buyers in this region qualify for $0 down options — and never knew.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/search/single-family"
                  className="inline-flex items-center gap-2.5 bg-foreground text-background px-7 py-3.5 rounded-full font-semibold hover:bg-foreground/85 transition-colors text-sm"
                >
                  See homes under $300K <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm py-3.5"
                >
                  Talk to Scott →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── EXPLORE BY AREA ─── */}
        <section className="py-24 md:py-28 px-6 bg-secondary/40">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14">
              <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-4">Browse by Area</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.1]">
                Explore rentals by area
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {areaBrowse.map((area) => (
                <Link
                  key={area.slug}
                  to={`/rentals/${area.slug}`}
                  className="group bg-background rounded-xl border border-border hover:border-foreground/10 p-6 transition-all duration-300 hover:shadow-sm"
                >
                  <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">{area.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LOCAL INTELLIGENCE ─── */}
        <section className="py-28 md:py-36 px-6 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-medium text-muted-foreground tracking-[0.2em] uppercase mb-6">Local Intelligence</p>
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-bold text-foreground tracking-tight leading-[1.08] mb-8">
              This isn't a listing feed.<br className="hidden md:block" /> It's market context.
            </h2>
            <p className="text-lg text-foreground/55 max-w-xl mx-auto font-light leading-relaxed mb-14">
              Capital District Nest pairs rental availability with local insight — so you can understand where you're renting, what it costs to own nearby, and when it makes sense to make the move.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-3xl mx-auto mb-16">
              {[
                { title: "Rent Trends", desc: "Average rent by town and how it compares to mortgage payments in the same area." },
                { title: "Best Value Areas", desc: "Where renters get the most space, the best commutes, and the strongest neighborhoods." },
                { title: "Path to Ownership", desc: "First-time buyer programs, $0 down options, and how your current rent translates to a home." },
              ].map((item) => (
                <div key={item.title} className="text-center md:text-left">
                  <h3 className="font-semibold text-base text-foreground mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-2.5 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
              >
                Analyze a Property <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/first-time-homebuyers" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
                First-Time Buyers →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default RentalsHub;
