import { Link } from "react-router-dom";
import { Play, Info } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const trendingListings = [
    { img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500", match: "98% Match", info: "3 Bed • $220k", badge: "ROI+" },
    { img: "https://images.unsplash.com/photo-1570129477492-45f003f2df51?w=500", match: "86% Match", info: "Duplex • $180k" },
    { img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?w=500", match: "New", info: "Fixer • $95k" },
    { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500", match: "91% Match", info: "4 Bed • $310k" },
    { img: "https://images.unsplash.com/photo-1600596542815-2495db98dada?w=500", match: "Hot", info: "Triplex • $299k" },
  ];

  const fixFlipListings = [
    { img: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=500", match: "High Yield", info: "Troy • $65k" },
    { img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500", match: "Cash Only", info: "Rehab • $45k" },
    { img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", match: "BRRRR", info: "Schenectady • $88k" },
    { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500", match: "New", info: "Albany • $120k" },
  ];

  const multiUnitListings = [
    { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500", match: "12% Cap", info: "4-Unit • $425k", badge: "Cash Flow" },
    { img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=500", match: "Turnkey", info: "Triplex • $299k" },
    { img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500", match: "Value Add", info: "Duplex • $175k" },
    { img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500", match: "New", info: "6-Unit • $580k" },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-[#e5e5e5] font-sans overflow-x-hidden">
      <SEOHead
        title="Capital District Nest | Streaming View | Upstate NY Real Estate"
        description="The Netflix of real estate. Browse Albany, Troy, Schenectady & Saratoga properties like never before. Investment analysis and market data."
        keywords="Capital District real estate, Albany NY homes, Troy investment properties, real estate streaming"
      />

      {/* Navigation */}
      <nav className="flex items-center justify-between px-[4%] py-5 fixed top-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent">
        <Link to="/" className="text-[#E50914] text-xl md:text-2xl font-bold uppercase tracking-widest">
          NEST
        </Link>
        <div className="hidden md:flex gap-5">
          <Link to="/" className="text-white text-sm hover:text-gray-300 transition">Home</Link>
          <Link to="/albany-multi-unit" className="text-white text-sm hover:text-gray-300 transition">Multi-Unit</Link>
          <Link to="/investor-tools" className="text-white text-sm hover:text-gray-300 transition">Fix & Flip</Link>
          <Link to="/investor-tools" className="text-white text-sm hover:text-gray-300 transition">My List</Link>
        </div>
      </nav>

      {/* Hero Billboard */}
      <div 
        className="h-[80vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1950&q=80')" }}
      >
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-center px-[4%]">
          <div className="max-w-lg mt-24">
            <span className="inline-block bg-white/20 px-3 py-1.5 text-xs font-bold rounded uppercase mb-4 backdrop-blur-sm">
              Featured Investment
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              The Washington Park Triplex
            </h1>
            <p className="text-base md:text-lg mb-6 drop-shadow-lg">
              A rare turnkey opportunity in the heart of Albany. 
              Fully occupied, 12% cap rate potential, and historic charm. 
              Watch the virtual tour now.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 md:px-6 md:py-3 rounded font-bold hover:bg-white/75 transition">
                <Play className="w-5 h-5 fill-current" />
                Play Tour
              </button>
              <Link 
                to="/investor-tools"
                className="flex items-center gap-2 bg-[#6d6d6e]/70 text-white px-5 py-2.5 md:px-6 md:py-3 rounded font-bold hover:bg-[#6d6d6e]/40 transition"
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <section className="px-[4%] py-5 relative z-10 -mt-24">
        <h3 className="text-lg md:text-xl font-medium text-[#e5e5e5] mb-3">Trending in Albany</h3>
        <div className="flex gap-2.5 overflow-x-auto pb-5 scrollbar-hide">
          {trendingListings.map((listing, i) => (
            <ListingCard key={i} {...listing} />
          ))}
        </div>
      </section>

      {/* Fix & Flip Section */}
      <section className="px-[4%] py-5">
        <h3 className="text-lg md:text-xl font-medium text-[#e5e5e5] mb-3">High ROI Fix & Flips</h3>
        <div className="flex gap-2.5 overflow-x-auto pb-5 scrollbar-hide">
          {fixFlipListings.map((listing, i) => (
            <ListingCard key={i} {...listing} />
          ))}
        </div>
      </section>

      {/* Multi-Unit Section */}
      <section className="px-[4%] py-5">
        <h3 className="text-lg md:text-xl font-medium text-[#e5e5e5] mb-3">Multi-Unit Investments</h3>
        <div className="flex gap-2.5 overflow-x-auto pb-5 scrollbar-hide">
          {multiUnitListings.map((listing, i) => (
            <ListingCard key={i} {...listing} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-[4%] py-16 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Access Investor Tools</h2>
        <p className="text-[#b3b3b3] mb-6">Cash flow calculators, amortization tables, and ROI analysis</p>
        <Link 
          to="/investor-tools"
          className="inline-block bg-[#E50914] text-white px-8 py-3 rounded font-bold hover:bg-[#f40612] transition"
        >
          Open Calculator Suite
        </Link>
      </section>

      {/* Simple Footer */}
      <footer className="px-[4%] py-8 border-t border-[#333] text-center text-sm text-[#808080]">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link to="/investor-tools" className="hover:text-white transition">Tools & Calculators</Link>
          <Link to="/homes-for-sale" className="hover:text-white transition">Homes for Sale</Link>
          <Link to="/rentals" className="hover:text-white transition">Rentals</Link>
          <Link to="/blog" className="hover:text-white transition">News</Link>
        </div>
        <p>© {new Date().getFullYear()} Capital District Nest. All rights reserved.</p>
      </footer>
    </div>
  );
};

const ListingCard = ({ img, match, info, badge }: { img: string; match: string; info: string; badge?: string }) => (
  <div className="flex-shrink-0 w-[200px] md:w-[250px] h-[112px] md:h-[140px] relative rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.3] hover:z-50 group bg-[#333] overflow-hidden shadow-lg hover:shadow-2xl">
    <img src={img} alt="Property" className="w-full h-full object-cover rounded" />
    <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="text-[#46d369] font-bold text-xs md:text-sm">{match}</div>
      <div className="text-[10px] md:text-xs text-[#b3b3b3] mt-1 flex items-center gap-2">
        <span>{info}</span>
        {badge && <span className="border border-[#b3b3b3] px-1 text-[9px] md:text-[10px] rounded">{badge}</span>}
      </div>
    </div>
  </div>
);

export default Index;
