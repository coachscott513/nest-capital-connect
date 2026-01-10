import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Building2, 
  Zap, 
  MapPin, 
  ArrowRight, 
  ExternalLink,
  Search,
  Store,
  Newspaper,
  Construction,
  Home,
  Users,
  ChevronRight,
  Gauge
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface TownLedgerEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  published_at: string;
  is_featured: boolean;
}

interface HighYieldAsset {
  id: string;
  address: string;
  price: string;
  property_type: string;
  cash_on_cash_return: number;
  cap_rate: number;
  units: number;
  gross_rent: string;
  thumbnail_url: string;
}

interface LocalVoice {
  id: string;
  business_name: string;
  owner_name: string;
  owner_photo_url: string;
  business_logo_url: string;
  origin_story: string;
  alpha_insight: string;
  growth_vision: string;
  primary_offering: string;
  website_url: string;
  is_verified: boolean;
}

interface AppleTownTemplateProps {
  townSlug: string;
  townName: string;
  schoolDistrict?: string;
  avgYield: string;
  marketVelocity: "High" | "Medium" | "Low";
  searchUrl: string;
  heroImage?: string;
}

const AppleTownTemplate = ({
  townSlug,
  townName,
  schoolDistrict,
  avgYield,
  marketVelocity,
  searchUrl,
  heroImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80"
}: AppleTownTemplateProps) => {
  const [ledgerEntries, setLedgerEntries] = useState<TownLedgerEntry[]>([]);
  const [highYieldAssets, setHighYieldAssets] = useState<HighYieldAsset[]>([]);
  const [localVoices, setLocalVoices] = useState<LocalVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<LocalVoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Fetch all data in parallel
      const [ledgerRes, assetsRes, voicesRes] = await Promise.all([
        supabase
          .from('town_ledger')
          .select('*')
          .eq('town_slug', townSlug)
          .order('published_at', { ascending: false })
          .limit(6),
        supabase
          .from('high_yield_assets')
          .select('*')
          .eq('town_slug', townSlug)
          .eq('is_active', true)
          .order('featured_order', { ascending: true })
          .limit(4),
        supabase
          .from('local_voices')
          .select('*')
          .eq('town_slug', townSlug)
          .eq('is_verified', true)
          .order('display_order', { ascending: true })
          .limit(8)
      ]);

      if (ledgerRes.data) setLedgerEntries(ledgerRes.data);
      if (assetsRes.data) setHighYieldAssets(assetsRes.data);
      if (voicesRes.data) setLocalVoices(voicesRes.data);
      
      setIsLoading(false);
    };

    fetchData();
  }, [townSlug]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'business': return Store;
      case 'zoning': return Building2;
      case 'infrastructure': return Construction;
      case 'market': return TrendingUp;
      case 'community': return Users;
      default: return Newspaper;
    }
  };

  const getVelocityColor = (velocity: string) => {
    switch (velocity) {
      case 'High': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${townName} Real Estate Intelligence | Capital District Nest`}
        description={`Live market intelligence for ${townName} NY. Yield data, local business insights, and investment opportunities.`}
        keywords={`${townName} real estate, ${townName} investment properties, ${townName} market data`}
        canonical={`https://capitaldistrictnest.com/towns/${townSlug}`}
      />

      <CleanHeader />

      {/* CINEMATIC HERO with Floating Intelligence Gauge */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Floating Nest Intelligence Gauge - Top Right */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
          <div className="glass-strong rounded-2xl p-6 min-w-[200px]">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-[#1D1D1F]">Nest Intelligence</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#6E6E73] mb-1">Average Town Yield</p>
                <p className="text-3xl font-bold text-primary">{avgYield}</p>
              </div>
              <div>
                <p className="text-xs text-[#6E6E73] mb-1">Market Velocity</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getVelocityColor(marketVelocity)}`}>
                  {marketVelocity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="max-w-2xl">
            {schoolDistrict && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">{schoolDistrict}</span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {townName} Intelligence
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Real-time market data, investment opportunities, and local insights — 
              all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                <Search className="w-5 h-5" />
                Search {townName} Homes
              </a>
              <Link
                to="/dealdesk"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Request Property Intel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOWN LEDGER - Apple News Feed Style */}
      <section className="py-20 px-[5%] bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Town Ledger</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">
                What's Happening in {townName}
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="apple-card p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : ledgerEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ledgerEntries.map((entry) => {
                const Icon = getCategoryIcon(entry.category);
                return (
                  <div key={entry.id} className="apple-card p-6 hover-lift group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-[#6E6E73] uppercase tracking-wider">
                        {entry.category}
                      </span>
                      {entry.is_featured && (
                        <span className="ml-auto text-xs font-semibold text-primary">Featured</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2 group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-[#6E6E73] line-clamp-2">{entry.content}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="apple-card p-8 text-center">
              <Newspaper className="w-12 h-12 text-[#6E6E73] mx-auto mb-4" />
              <p className="text-[#6E6E73]">No ledger entries yet for {townName}.</p>
            </div>
          )}
        </div>
      </section>

      {/* HIGH-YIELD ASSETS / INVESTMENT VAULT */}
      <section className="py-20 px-[5%] bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Investment Vault</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
              High-Yield Assets in {townName}
            </h2>
            <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto">
              Cash-flowing properties with verified returns. Click any property to view virtual underwriting.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="apple-card p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : highYieldAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highYieldAssets.map((asset) => (
                <Link
                  key={asset.id}
                  to="/dealdesk"
                  className="apple-card p-6 hover-lift group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-[#6E6E73] uppercase tracking-wider mb-1">{asset.property_type}</p>
                      <h3 className="text-xl font-bold text-[#1D1D1F] group-hover:text-primary transition-colors">
                        {asset.address}
                      </h3>
                    </div>
                    <span className="text-2xl font-bold text-primary">{asset.price}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-[#F5F5F7] rounded-xl mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{asset.cash_on_cash_return}%</p>
                      <p className="text-xs text-[#6E6E73]">Cash-on-Cash</p>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <p className="text-2xl font-bold text-[#1D1D1F]">{asset.cap_rate}%</p>
                      <p className="text-xs text-[#6E6E73]">Cap Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1D1D1F]">{asset.units}</p>
                      <p className="text-xs text-[#6E6E73]">Units</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6E6E73]">Gross Rent: {asset.gross_rent}</span>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Underwriting <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="apple-card p-8 text-center">
              <Home className="w-12 h-12 text-[#6E6E73] mx-auto mb-4" />
              <p className="text-[#6E6E73]">No high-yield assets currently available in {townName}.</p>
              <Link to="/dealdesk" className="inline-flex items-center gap-2 text-primary font-semibold mt-4 hover:underline">
                Submit an address for analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* LOCAL VOICES - Horizontal Avatar Tray */}
      <section className="py-20 px-[5%] bg-[#F5F5F7] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Local Voices</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
              The People Building {townName}
            </h2>
            <p className="text-lg text-[#6E6E73] max-w-2xl mx-auto">
              Hear from verified local business owners about the town's growth and opportunities.
            </p>
          </div>

          {isLoading ? (
            <div className="flex gap-8 justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-gray-200" />
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </div>
              ))}
            </div>
          ) : localVoices.length > 0 ? (
            <div className="relative">
              <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory justify-start md:justify-center">
                {localVoices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice)}
                    className="flex flex-col items-center gap-3 flex-shrink-0 snap-center group"
                  >
                    {/* Verified Border */}
                    <div className="relative">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full p-[3px] bg-gradient-to-br from-primary to-primary/60 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
                          <img
                            src={voice.owner_photo_url || voice.business_logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(voice.owner_name)}&background=10b981&color=fff`}
                            alt={voice.owner_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                      {voice.is_verified && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                          Verified
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <span className="text-sm font-semibold text-[#1D1D1F] group-hover:text-primary transition-colors block">
                        {voice.owner_name}
                      </span>
                      <span className="text-xs text-[#6E6E73] block max-w-[120px] truncate">
                        {voice.business_name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-[#F5F5F7] to-transparent pointer-events-none md:hidden" />
              <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-[#F5F5F7] to-transparent pointer-events-none md:hidden" />
            </div>
          ) : (
            <div className="apple-card p-8 text-center max-w-md mx-auto">
              <Users className="w-12 h-12 text-[#6E6E73] mx-auto mb-4" />
              <p className="text-[#6E6E73]">Local business spotlights coming soon for {townName}.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-[5%] bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
            Ready to invest in {townName}?
          </h2>
          <p className="text-lg text-[#6E6E73] mb-8">
            Submit any address for a custom property intelligence report.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dealdesk"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Request Property Intel
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#1D1D1F]/20 text-[#1D1D1F] px-8 py-4 rounded-xl font-semibold hover:bg-[#1D1D1F] hover:text-white transition-all"
            >
              Browse All Listings
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Local Voice Interview Side Panel */}
      <Sheet open={!!selectedVoice} onOpenChange={() => setSelectedVoice(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-white border-l border-gray-100 overflow-y-auto">
          {selectedVoice && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-2">
                  {selectedVoice.is_verified && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                      Nest Verified
                    </span>
                  )}
                </div>
                <SheetTitle className="text-2xl font-bold text-[#1D1D1F] mt-2">
                  {selectedVoice.business_name}
                </SheetTitle>
              </SheetHeader>

              {/* Owner Photo */}
              <div className="mb-6">
                <img
                  src={selectedVoice.owner_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVoice.owner_name)}&background=10b981&color=fff&size=400`}
                  alt={selectedVoice.owner_name}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              {/* Owner Info */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#1D1D1F]">{selectedVoice.owner_name}</h3>
                  <p className="text-sm text-[#6E6E73]">Owner & Founder</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-[#6E6E73]">
                  <MapPin className="w-4 h-4" />
                  {townName}
                </div>
              </div>

              {/* Interview Sections */}
              <div className="space-y-6">
                {/* The Origin */}
                <div className="p-4 bg-[#F5F5F7] rounded-xl">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The Origin</h4>
                  <p className="text-sm text-[#1D1D1F] italic">"{selectedVoice.origin_story}"</p>
                </div>

                {/* The Alpha */}
                <div className="p-4 bg-[#F5F5F7] rounded-xl">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Market Alpha</h4>
                  <p className="text-sm text-[#1D1D1F] italic">"{selectedVoice.alpha_insight}"</p>
                </div>

                {/* The Vision */}
                <div className="p-4 bg-[#F5F5F7] rounded-xl">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Why {townName} is Big Time</h4>
                  <p className="text-sm text-[#1D1D1F] italic">"{selectedVoice.growth_vision}"</p>
                </div>
              </div>

              {/* Primary Offering */}
              <div className="mt-6 p-4 border border-gray-200 rounded-xl">
                <h4 className="text-sm font-semibold text-[#1D1D1F] mb-1">What They Offer</h4>
                <p className="text-[#6E6E73]">{selectedVoice.primary_offering}</p>
              </div>

              {/* CTA */}
              {selectedVoice.website_url && (
                <a
                  href={selectedVoice.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors mt-6"
                >
                  Visit Website <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AppleTownTemplate;
