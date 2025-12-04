import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { Search } from "lucide-react";

const pillCategories = [
  { label: "Multi-Units", href: "/albany-multi-unit" },
  { label: "Fix & Flip", href: "/investor-tools" },
  { label: "Land", href: "/albany-land" },
  { label: "Commercial", href: "/albany-investment-properties" },
  { label: "Condos", href: "/homes-for-sale" },
  { label: "Rentals", href: "/rentals" },
  { label: "Calculators", href: "/investor-tools" },
];

const locations = [
  { name: "Niskayuna", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/schenectady-real-estate" },
  { name: "Albany", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/albany-real-estate" },
  { name: "Schenectady", image: "https://images.unsplash.com/photo-1444723121867-c6001e34f543?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/schenectady-real-estate" },
  { name: "Troy", image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/troy-real-estate" },
  { name: "Saratoga", image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/saratoga-real-estate" },
];

const toolkitItems = [
  { label: "ROI Calculator", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/investor-tools" },
  { label: "2025 Market PDF", image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/markets" },
  { label: "Grant Guide", image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "/grants" },
  { label: "Join VIP List", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", href: "#contact" },
];

const multiFamilyListings = [
  { image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", badge: "98% Match", badgeColor: "text-green-400", location: "Albany", price: "$220k" },
  { image: "https://images.unsplash.com/photo-1570129477492-45f003f2df51?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", badge: "12% Cap", badgeColor: "text-green-400", location: "Troy", price: "$185k" },
  { image: "https://images.unsplash.com/photo-1600596542815-2495db98dada?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", badge: "New Listing", badgeColor: "text-white", location: "Schenectady", price: "$140k" },
];

const landCommercialListings = [
  { image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", badge: "Developed", badgeColor: "text-green-400", type: "4 Acres", price: "$90k" },
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", badge: "Retail", badgeColor: "text-green-400", type: "Downtown", price: "$450k" },
  { image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", badge: "Fixer", badgeColor: "text-white", type: "Mixed Use", price: "$110k" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#141414] text-[#e5e5e5] overflow-x-hidden">
      <SEOHead
        title="Capital District Nest | The Investor Hub"
        description="Access off-market deals, download local grant applications, and analyze ROI with custom tools for Albany, Troy, Schenectady & Saratoga real estate."
        keywords="Capital District real estate, Albany investment properties, Troy multi-family, Schenectady homes, investor tools"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-[4%] py-4 bg-black/90">
        <Link to="/" className="text-[#E50914] text-3xl font-black uppercase tracking-wide drop-shadow-lg">
          NEST
        </Link>
        <Search className="w-6 h-6 text-white cursor-pointer" />
      </nav>

      {/* Pill Navigation */}
      <div className="fixed top-[70px] left-[4%] right-[4%] z-[900] flex gap-4 overflow-x-auto pb-2 scrollbar-hide bg-black/80 py-3 -ml-[4%] pl-[4%] pr-[4%] w-full">
        {pillCategories.map((pill) => (
          <Link
            key={pill.label}
            to={pill.href}
            className="flex-shrink-0 px-4 py-2 text-sm text-white border border-white/50 bg-black/80 rounded-full whitespace-nowrap transition-all hover:bg-white hover:text-black hover:border-white font-medium"
          >
            {pill.label}
          </Link>
        ))}
      </div>

      {/* Hero Billboard */}
      <div
        className="relative h-[80vh] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/50 to-black/40 flex items-center pl-[4%]">
          <div className="max-w-[600px] mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              The Capital District<br />Investor Hub.
            </h1>
            <p className="text-lg md:text-xl mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Access off-market deals, download local grant applications, and analyze ROI with our custom tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/markets"
                className="inline-flex items-center px-6 py-3 bg-white text-black font-bold rounded transition-transform hover:scale-105"
              >
                ▶ Get Market Report
              </Link>
              <Link
                to="/first-time-homebuyers"
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur text-white font-bold rounded transition-transform hover:scale-105"
              >
                ℹ Financing Options
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Explore by Location */}
      <section className="py-5 pl-[4%]">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-medium">Explore by Location</h2>
          <Link to="/communities" className="text-sm text-gray-500 hover:text-white">View All &gt;</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 pr-[4%] scrollbar-hide">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              to={loc.href}
              className="flex-shrink-0 w-40 text-center transition-transform hover:scale-110 group"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="w-[140px] h-[140px] rounded-full object-cover mx-auto mb-2 border-[3px] border-transparent group-hover:border-white transition-all"
              />
              <span className="text-sm">{loc.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Investor Toolkit */}
      <section className="py-5 pl-[4%]">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-medium">Investor Toolkit</h2>
          <Link to="/investor-tools" className="text-sm text-gray-500 hover:text-white">Free Downloads &gt;</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 pr-[4%] scrollbar-hide">
          {toolkitItems.map((tool) => (
            <Link
              key={tool.label}
              to={tool.href}
              className="flex-shrink-0 w-40 h-60 relative rounded overflow-hidden cursor-pointer transition-transform hover:scale-110 hover:z-50 group"
            >
              <img
                src={tool.image}
                alt={tool.label}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute bottom-3 left-3 right-3 border-t-2 border-[#E50914] pt-2 text-center font-bold uppercase text-sm">
                {tool.label}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Multi-Family Opportunities */}
      <section className="py-5 pl-[4%]">
        <h2 className="text-xl font-medium mb-4">Multi-Family Opportunities</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 pr-[4%] scrollbar-hide">
          {multiFamilyListings.map((listing, idx) => (
            <Link
              key={idx}
              to="/albany-multi-unit"
              className="flex-shrink-0 w-[260px] h-[147px] relative rounded overflow-hidden cursor-pointer transition-transform hover:scale-[1.3] hover:z-[100] hover:shadow-2xl group bg-[#222]"
            >
              <img src={listing.image} alt="Property" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className={`font-bold ${listing.badgeColor}`}>{listing.badge}</span>
                <span className="text-white"> • {listing.location} • {listing.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Land & Commercial */}
      <section className="py-5 pl-[4%]">
        <h2 className="text-xl font-medium mb-4">Land & Commercial</h2>
        <div className="flex gap-3 overflow-x-auto pb-4 pr-[4%] scrollbar-hide">
          {landCommercialListings.map((listing, idx) => (
            <Link
              key={idx}
              to="/albany-land"
              className="flex-shrink-0 w-[260px] h-[147px] relative rounded overflow-hidden cursor-pointer transition-transform hover:scale-[1.3] hover:z-[100] hover:shadow-2xl group bg-[#222]"
            >
              <img src={listing.image} alt="Property" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <span className={`font-bold ${listing.badgeColor}`}>{listing.badge}</span>
                <span className="text-white"> • {listing.type} • {listing.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Chatbot Button */}
      <div className="fixed bottom-5 right-5 w-[60px] h-[60px] bg-[#E50914] rounded-full flex items-center justify-center text-3xl shadow-lg cursor-pointer z-[2000] transition-transform hover:scale-110">
        💬
      </div>

      {/* Footer */}
      <footer className="px-[4%] py-12 text-gray-500 text-sm">
        <div className="flex flex-wrap gap-5 mb-5">
          <Link to="/blog" className="hover:text-white">About</Link>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Social Media</a>
          <Link to="/privacy-policy" className="hover:text-white">Terms</Link>
          <a href="mailto:scott@remax.com" className="hover:text-white">Contact</a>
        </div>
        <div>© 2025 Capital District Nest.</div>
      </footer>
    </div>
  );
};

export default Index;
