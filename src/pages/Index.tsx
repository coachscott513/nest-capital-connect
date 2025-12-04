import { Link } from "react-router-dom";
import { Play, Info, MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const newsCards = [
    { img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500", title: "Top 5 Neighborhoods in Troy for 2024", meta: "Market Analysis • 5 min read" },
    { img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500", title: "Commercial Lending 101: What Investors Need to Know", meta: "Education • 8 min read" },
    { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500", title: "Albany's Emerging Arts District: Investment Hotspot", meta: "Opportunity • 4 min read" },
    { img: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=500", title: "First-Time Investor Success Story: From 0 to 4 Units", meta: "Case Study • 6 min read" },
  ];

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

  return (
    <div className="min-h-screen bg-[#141414] text-[#e5e5e5] font-sans overflow-x-hidden">
      <SEOHead
        title="Capital District Nest | The Resource | Upstate NY Real Estate"
        description="The Netflix of real estate. Browse Albany, Troy, Schenectady & Saratoga properties like never before. Investment analysis and market data."
        keywords="Capital District real estate, Albany NY homes, Troy investment properties, real estate streaming"
      />

      {/* Navigation */}
      <nav className="flex items-center justify-between px-[4%] py-5 fixed top-0 w-[92%] z-[1000] bg-gradient-to-b from-black/90 to-transparent">
        <Link to="/" className="text-[#E50914] text-[1.8rem] font-black uppercase tracking-wide">
          NEST
        </Link>
        <div className="hidden md:flex gap-5">
          <Link to="/" className="text-white text-sm opacity-80 hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/albany-multi-unit" className="text-white text-sm opacity-80 hover:opacity-100 transition-opacity">Multi-Unit</Link>
          <Link to="/investor-tools" className="text-white text-sm opacity-80 hover:opacity-100 transition-opacity">Fix & Flip</Link>
          <Link to="/investor-tools" className="text-white text-sm opacity-80 hover:opacity-100 transition-opacity">My List</Link>
        </div>
      </nav>

      {/* Hero Billboard */}
      <div 
        className="h-[85vh] w-full bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1950&q=80')" }}
      >
        {/* Stronger gradient overlay */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.4) 0%, #141414 100%), linear-gradient(to top, #141414 10%, transparent 60%)" }} />
        
        <div className="absolute inset-0 flex items-center px-[4%]">
          <div className="max-w-[600px] mt-[50px] z-10">
            <span className="inline-block bg-[#E50914] text-white px-3 py-1.5 text-xs font-bold rounded-sm uppercase tracking-wider mb-5">
              The Resource
            </span>
            <h1 className="text-3xl md:text-[3.5rem] font-extrabold leading-[1.1] mb-4">
              Capital District Nest
            </h1>
            <p className="text-base md:text-xl text-[#d1d1d1] mb-6 leading-relaxed drop-shadow-lg">
              Your streaming platform for real estate intelligence. Market analysis, investment tools, and property data for Albany, Troy, Schenectady & Saratoga.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-current" />
                Watch Overview
              </button>
              <Link 
                to="/investor-tools"
                className="flex items-center gap-2 bg-[#6d6d6e]/70 backdrop-blur text-white px-6 py-3 rounded font-bold hover:scale-105 transition-transform"
              >
                <Info className="w-5 h-5" />
                Investor Tools
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* News & Resources Section */}
      <section className="py-5 pl-[4%] relative z-20">
        <h3 className="text-xl md:text-[1.4rem] font-medium text-[#e5e5e5] mb-4 border-l-4 border-[#E50914] pl-3">
          Latest News & Resources
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-5 pr-[4%] scrollbar-hide scroll-smooth">
          {newsCards.map((card, i) => (
            <NewsCard key={i} {...card} />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-5 pl-[4%] relative z-20">
        <h3 className="text-xl md:text-[1.4rem] font-medium text-[#e5e5e5] mb-4 border-l-4 border-[#E50914] pl-3">
          Trending in Albany
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-5 pr-[4%] scrollbar-hide scroll-smooth">
          {trendingListings.map((listing, i) => (
            <ListingCard key={i} {...listing} />
          ))}
        </div>
      </section>

      {/* Fix & Flip Section */}
      <section className="py-5 pl-[4%] relative z-20">
        <h3 className="text-xl md:text-[1.4rem] font-medium text-[#e5e5e5] mb-4 border-l-4 border-[#E50914] pl-3">
          High ROI Fix & Flips
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-5 pr-[4%] scrollbar-hide scroll-smooth">
          {fixFlipListings.map((listing, i) => (
            <ListingCard key={i} {...listing} />
          ))}
        </div>
      </section>

      {/* Chatbot Button */}
      <div className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-[#E50914] rounded-full flex items-center justify-center shadow-lg cursor-pointer z-[2000] hover:scale-110 transition-transform">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>

      {/* Footer */}
      <footer className="mt-12 py-12 px-[4%] bg-black text-[#808080] text-sm">
        <div className="flex gap-5 mb-5">
          <a href="https://facebook.com" className="text-white text-2xl hover:text-[#E50914] transition-colors">f</a>
          <a href="https://instagram.com" className="text-white text-2xl hover:text-[#E50914] transition-colors">ig</a>
          <a href="https://youtube.com" className="text-white text-2xl hover:text-[#E50914] transition-colors">yt</a>
        </div>
        <div className="flex flex-wrap gap-5 mb-5">
          <Link to="/investor-tools" className="text-[#808080] hover:text-white transition-colors">Tools & Calculators</Link>
          <Link to="/homes-for-sale" className="text-[#808080] hover:text-white transition-colors">Homes for Sale</Link>
          <Link to="/rentals" className="text-[#808080] hover:text-white transition-colors">Rentals</Link>
          <Link to="/blog" className="text-[#808080] hover:text-white transition-colors">News</Link>
          <Link to="/privacy-policy" className="text-[#808080] hover:text-white transition-colors">Privacy</Link>
        </div>
        <p>© {new Date().getFullYear()} Capital District Nest. All rights reserved.</p>
      </footer>
    </div>
  );
};

// News Card Component (wider, different hover)
const NewsCard = ({ img, title, meta }: { img: string; title: string; meta: string }) => (
  <div className="flex-shrink-0 w-[280px] md:w-[350px] h-[180px] md:h-[200px] relative rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:z-50 group bg-[#222] overflow-hidden shadow-lg hover:shadow-2xl">
    <img src={img} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
    <div className="absolute bottom-0 left-0 p-5 w-full">
      <h4 className="text-sm md:text-[1.1rem] font-bold mb-1 leading-tight">{title}</h4>
      <p className="text-xs text-[#aaa]">{meta}</p>
    </div>
  </div>
);

// Listing Card Component (standard size, pop effect)
const ListingCard = ({ img, match, info, badge }: { img: string; match: string; info: string; badge?: string }) => (
  <div className="flex-shrink-0 w-[200px] md:w-[250px] h-[112px] md:h-[140px] relative rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.3] hover:z-50 group bg-[#333] overflow-hidden shadow-lg hover:shadow-2xl">
    <img src={img} alt="Property" className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="text-[#46d369] font-bold text-xs md:text-sm">{match}</div>
      <div className="text-[10px] md:text-xs text-[#b3b3b3] mt-1 flex items-center gap-2">
        <span>{info}</span>
        {badge && <span className="border border-[#b3b3b3] px-1 text-[9px] md:text-[10px] rounded">{badge}</span>}
      </div>
    </div>
  </div>
);

export default Index;
