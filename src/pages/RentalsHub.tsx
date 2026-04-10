import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { ArrowRight, MapPin, Bed, Bath, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

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
  description: string | null;
  available_date: string | null;
  pet_friendly: boolean | null;
  utilities_included: boolean | null;
  created_at: string;
}

const getMortgageEquivalent = (rent: number) => {
  const homePrice = Math.round((rent / 6.5) * 1000);
  return homePrice.toLocaleString();
};

const getDaysOld = (createdAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
};

const placeholderCards = [
  { id: "p1", type: "Apartment", street: "Elm Street", town: "Albany", rent: 1400, beds: 2, baths: 1, daysOld: 0 },
  { id: "p2", type: "Townhome", street: "State Street", town: "Troy", rent: 1650, beds: 3, baths: 1.5, daysOld: 1 },
  { id: "p3", type: "Duplex", street: "River Road", town: "Schenectady", rent: 1200, beds: 1, baths: 1, daysOld: 3 },
  { id: "p4", type: "Studio", street: "Washington Ave", town: "Albany", rent: 950, beds: 1, baths: 1, daysOld: 5 },
  { id: "p5", type: "Apartment", street: "Central Ave", town: "Colonie", rent: 1800, beds: 3, baths: 2, daysOld: 10 },
  { id: "p6", type: "Townhome", street: "Congress Street", town: "Saratoga Springs", rent: 1500, beds: 2, baths: 1, daysOld: 2 },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

const maskAddress = (address: string) => address.replace(/^\d+\s*/, "");

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

  const renderCard = (
    key: string,
    type: string,
    street: string,
    town: string,
    rent: number,
    beds: number,
    baths: number,
    daysOld: number
  ) => {
    const newBadge = daysOld <= 1 ? "New today" : daysOld <= 7 ? "New this week" : null;

    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group bg-background rounded-2xl border border-border hover:border-foreground/10 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300"
      >
        <div className="p-7">
          {/* Tags row */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
              {type}
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

          {/* Street name */}
          <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">
            {street}
          </h3>

          {/* Location */}
          <p className="text-sm text-muted-foreground mb-5 capitalize">{town.replace("-", " ")}</p>

          {/* Price */}
          <p className="text-3xl font-bold text-foreground tracking-tight mb-1">
            {formatPrice(rent)}
            <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
          </p>

          {/* Specs */}
          <p className="text-sm text-muted-foreground mb-6">
            {beds} bed · {baths} bath
          </p>

          {/* Mortgage comparison — subtle */}
          <p className="text-xs text-muted-foreground/70 leading-relaxed mb-6">
            ≈ ${getMortgageEquivalent(rent)} home at current rates.{" "}
            <Link to="/analyze" className="text-accent hover:text-foreground transition-colors font-medium">
              Explore ownership →
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
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Capital District Rentals — Apartments & Homes for Rent | Capital District Nest</title>
        <meta name="description" content="Curated rental opportunities across Albany, Troy, Schenectady, Saratoga Springs and beyond. Updated weekly with local market insight and ownership options." />
        <meta name="keywords" content="albany ny rentals, troy apartments, schenectady rentals, saratoga springs apartments, capital district rentals" />
        <link rel="canonical" href="https://capitaldistrictnest.com/rentals" />
      </Helmet>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative bg-background overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-16 md:pt-40 md:pb-20">
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

              <p className="text-lg text-foreground/55 max-w-2xl mx-auto font-light leading-relaxed mb-12">
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

        {/* ─── RENTAL FEED ─── */}
        <section className="py-24 md:py-32 px-6 bg-secondary/40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
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
                    <div className="h-4 bg-muted rounded w-1/4 mb-6" />
                    <div className="h-10 bg-muted rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : rentals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentals.map((rental) =>
                  renderCard(
                    rental.id,
                    "Apartment",
                    maskAddress(rental.address),
                    rental.town_slug,
                    rental.rent_price,
                    rental.bedrooms,
                    rental.bathrooms,
                    getDaysOld(rental.created_at)
                  )
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderCards.map((card) =>
                  renderCard(card.id, card.type, card.street, card.town, card.rent, card.beds, card.baths, card.daysOld)
                )}
              </div>
            )}
          </div>
        </section>

        {/* ─── RENT VS OWN — EDITORIAL MODULE ─── */}
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
        <section className="py-24 md:py-32 px-6 bg-secondary/40">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
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

        {/* ─── LOCAL INTELLIGENCE TEASER ─── */}
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
