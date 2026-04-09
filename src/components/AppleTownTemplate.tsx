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
  Gauge,
  Lock,
  ToggleLeft,
  Instagram,
  Facebook,
  Twitter,
  Layers
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import IntelligenceGatekeeper from "@/components/IntelligenceGatekeeper";
import RentalVault from "@/components/RentalVault";
import MasterGatekeeperModal from "@/components/MasterGatekeeperModal";
import IntelligenceDashboard from "@/components/IntelligenceDashboard";
import CivicDirectorySection from "@/components/CivicDirectorySection";
import AcademicInstitutionsSection from "@/components/AcademicInstitutionsSection";
import FeaturedIntelSection from "@/components/FeaturedIntelSection";
import LiveInventoryModal from "@/components/LiveInventoryModal";
import RealEstateVendorDirectory from "@/components/RealEstateVendorDirectory";
import QuickMatchForm from "@/components/QuickMatchForm";
import TownHeroSection from "@/components/town/TownHeroSection";
import TownCommandMap from "@/components/town/TownCommandMap";
import SearchCommandModules from "@/components/town/SearchCommandModules";
import TownBentoGrid from "@/components/town/TownBentoGrid";
import { getTownSEOContent, getCountyForTown } from "@/data/townSEOContent";
import NearbyMarkets from "@/components/town/NearbyMarkets";

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

interface TownMarketData {
  avg_price: number | null;
  median_price: number | null;
  active_listings: number | null;
  avg_days_on_market: number | null;
  avg_sqft: number | null;
  avg_beds: number | null;
  avg_baths: number | null;
  single_family_count: number | null;
  multi_family_count: number | null;
  hero_landmark: string | null;
  target_yield: number | null;
  nest_score: number | null;
  region_category: string | null;
  map_center_lat: number | null;
  map_center_lng: number | null;
  default_zoom: number | null;
}

interface AppleTownTemplateProps {
  townSlug: string;
  townName: string;
  schoolDistrict?: string;
  avgYield?: string; // Now optional - will pull from DB
  marketVelocity?: "High" | "Medium" | "Low"; // Now optional - calculated from data
  searchUrl: string;
  heroImage?: string;
}

// Business type with social media
interface TownBusiness {
  id: string;
  name: string;
  logo: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

// Town-specific business fallbacks - each town shows its own local businesses with social links
const TOWN_BUSINESSES: Record<string, TownBusiness[]> = {
  "amsterdam": [
    { id: "1", name: "Amsterdam Brewing Co.", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Riverfront Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "3", name: "Amsterdam Hardware", logo: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "4", name: "Mohawk Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#", twitter: "#" },
    { id: "5", name: "Amsterdam Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "6", name: "Market Street Deli", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" },
    { id: "7", name: "Amsterdam Pet Care", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" }
  ],
  "delmar": [
    { id: "1", name: "Perfect Blend Café", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Delmar Fitness Studio", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "3", name: "Delmar Marketplace", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "4", name: "Four Corners Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" },
    { id: "5", name: "Delmar Wine & Spirits", logo: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "6", name: "Delmar Pet Supplies", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "7", name: "Delmar Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#", twitter: "#" }
  ],
  "albany": [
    { id: "1", name: "Albany Tech Hub", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80", twitter: "#", facebook: "#" },
    { id: "2", name: "Lark Street Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "3", name: "Albany Pump Station", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "4", name: "Capital Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "5", name: "Albany Urban Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "6", name: "Empire State Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" },
    { id: "7", name: "Albany Pet Hospital", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" }
  ],
  "troy": [
    { id: "1", name: "Troy Brewing Co.", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "River Street Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "3", name: "Troy Innovation Garage", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80", twitter: "#", facebook: "#" },
    { id: "4", name: "Troy Fitness Club", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "5", name: "Monument Square Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "6", name: "Troy Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "7", name: "Troy Animal Hospital", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" }
  ],
  "schenectady": [
    { id: "1", name: "Schenectady Provisions", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Electric City Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "3", name: "Proctors District Pub", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "4", name: "Electric City Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "5", name: "Schenectady Tech Hub", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80", twitter: "#", facebook: "#" },
    { id: "6", name: "Vale Park Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "7", name: "Schenectady Pet Care", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" }
  ],
  "saratoga-springs": [
    { id: "1", name: "Saratoga Coffee Traders", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#", twitter: "#" },
    { id: "2", name: "Saratoga Brewing", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "3", name: "Broadway Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "4", name: "Saratoga Spa Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "Saratoga Wine & Spirits", logo: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "6", name: "Saratoga Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "7", name: "Saratoga Pet Hospital", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" }
  ],
  "clifton-park": [
    { id: "1", name: "Clifton Park Coffee Co.", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Druthers Brewing Co.", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", website: "https://www.druthersbrewing.com/", instagram: "https://www.instagram.com/druthersbrewing/", facebook: "https://www.facebook.com/druthersbrewing/" },
    { id: "3", name: "Exit 9 Fitness Studio", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "4", name: "Clifton Park Veterinary", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "The Tech Collective CP", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80", twitter: "#", facebook: "#" },
    { id: "6", name: "Wheatfields Bakehouse", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "7", name: "Vischer Ferry Boutique", logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&q=80", instagram: "#" }
  ],
  "niskayuna": [
    { id: "1", name: "Niskayuna Gardens", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Niskayuna Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "3", name: "Mohawk Commons Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "4", name: "Niskayuna Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "Niskayuna Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" },
    { id: "6", name: "Niskayuna Pet Clinic", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "7", name: "Niskayuna Tech Labs", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80", twitter: "#", facebook: "#" }
  ],
  "guilderland": [
    { id: "1", name: "Crossgates Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Guilderland Brewing", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "3", name: "Guilderland Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
    { id: "4", name: "Altamont Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "Guilderland Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#", twitter: "#" },
    { id: "6", name: "Guilderland Pet Care", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "7", name: "Guilderland Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" }
  ],
  "voorheesville": [
    { id: "1", name: "Voorheesville Diner", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "2", name: "Voorheesville Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "3", name: "Indian Ladder Farms", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#", twitter: "#" },
    { id: "4", name: "Voorheesville Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "Helderberg Hardware", logo: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "6", name: "Voorheesville Pet Shop", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "7", name: "Village Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" }
  ],
  "queensbury": [
    { id: "1", name: "Queensbury Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "2", name: "Lake George Brewing", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#", twitter: "#" },
    { id: "3", name: "Aviation Mall Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "4", name: "Queensbury Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "Adirondack Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "6", name: "Queensbury Pet Care", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "7", name: "Glens Falls Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" }
  ],
  "mechanicville": [
    { id: "1", name: "Mechanicville Coffee", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "2", name: "Mechanicville Brewing", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
    { id: "3", name: "Mechanicville Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" },
    { id: "4", name: "Mechanicville Pharmacy", logo: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "5", name: "Hudson Falls Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "6", name: "Mechanicville Pet Shop", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
    { id: "7", name: "Mechanicville Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" }
  ]
};

// Default fallback for towns not in the map
const DEFAULT_BUSINESSES: TownBusiness[] = [
  { id: "1", name: "Local Coffee Shop", logo: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" },
  { id: "2", name: "Community Fitness", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=200&q=80", instagram: "#" },
  { id: "3", name: "Local Brewery", logo: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80", instagram: "#", twitter: "#" },
  { id: "4", name: "Town Veterinary", logo: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=200&q=80", facebook: "#" },
  { id: "5", name: "Local Tech Hub", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80", twitter: "#", facebook: "#" },
  { id: "6", name: "Local Market", logo: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80", facebook: "#" },
  { id: "7", name: "Town Florist", logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80", instagram: "#", facebook: "#" }
];

const AppleTownTemplate = ({
  townSlug,
  townName,
  schoolDistrict,
  avgYield: propAvgYield,
  marketVelocity: propMarketVelocity,
  searchUrl,
  heroImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80"
}: AppleTownTemplateProps) => {
  const [ledgerEntries, setLedgerEntries] = useState<TownLedgerEntry[]>([]);
  const [highYieldAssets, setHighYieldAssets] = useState<HighYieldAsset[]>([]);
  const [localVoices, setLocalVoices] = useState<LocalVoice[]>([]);
  const [townMarketData, setTownMarketData] = useState<TownMarketData | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<LocalVoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'owner-occupied' | 'investment'>('owner-occupied');
  
  // Master Gatekeeper state
  const [gatekeeperOpen, setGatekeeperOpen] = useState(false);
  
  // Live Inventory Modal state
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  
  // Regional average for Market Intelligence comparison (Capital District benchmark)
  const REGIONAL_AVG_PPSF = 165; // $/sqft regional benchmark
  const REGIONAL_AVG_DOM = 35; // days regional benchmark

  const handleSearchClick = () => {
    setGatekeeperOpen(true);
  };

  // Calculate market velocity from days on market
  const calculateVelocity = (avgDaysOnMarket: number | null): "High" | "Medium" | "Low" => {
    if (!avgDaysOnMarket) return "Medium";
    if (avgDaysOnMarket < 30) return "High";
    if (avgDaysOnMarket < 60) return "Medium";
    return "Low";
  };

  // Calculate avg yield from database target_yield or high-yield assets
  const calculateAvgYield = (): string => {
    // First priority: database target_yield
    if (townMarketData?.target_yield) {
      return `${townMarketData.target_yield}%`;
    }
    // Second priority: calculate from high-yield assets
    if (highYieldAssets.length > 0) {
      const avgCoC = highYieldAssets.reduce((sum, a) => sum + (a.cash_on_cash_return || 0), 0) / highYieldAssets.length;
      return `${avgCoC.toFixed(1)}%`;
    }
    return propAvgYield || "7.0%";
  };

  const marketVelocity = propMarketVelocity || calculateVelocity(townMarketData?.avg_days_on_market ?? null);
  const avgYield = calculateAvgYield();
  const nestScore = townMarketData?.nest_score || 5;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Fetch all data in parallel including town_market_data
      const [ledgerRes, assetsRes, voicesRes, marketRes] = await Promise.all([
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
          .order('cash_on_cash_return', { ascending: false })
          .limit(4),
      supabase
          .from('local_voices')
          .select('*')
          .eq('town_slug', townSlug)
          .order('display_order', { ascending: true })
          .limit(7), // Town pages show 7 businesses (homepage shows 12 for "Big Time" scale)
        supabase
          .from('town_market_data')
          .select('avg_price, median_price, active_listings, avg_days_on_market, avg_sqft, avg_beds, avg_baths, single_family_count, multi_family_count, hero_landmark, target_yield, nest_score, region_category, map_center_lat, map_center_lng, default_zoom')
          .eq('town_slug', townSlug)
          .order('scraped_at', { ascending: false })
          .maybeSingle()
      ]);

      if (ledgerRes.data) setLedgerEntries(ledgerRes.data);
      if (assetsRes.data) setHighYieldAssets(assetsRes.data);
      if (voicesRes.data) setLocalVoices(voicesRes.data);
      if (marketRes.data) setTownMarketData(marketRes.data);
      
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



  // Get hyper-local SEO content
  const seoContent = getTownSEOContent(townSlug, townName);
  const countyInfo = getCountyForTown(townSlug);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${townName}, NY Real Estate & Investment Properties | Capital District Nest`}
        description={seoContent.metaDescription}
        keywords={[...seoContent.focusKeywords, ...seoContent.civicKeywords, ...seoContent.lifestyleKeywords].join(', ')}
        canonical={`https://www.capitaldistrictnest.com/towns/${townSlug}`}
      />

      <CleanHeader />

      {/* Institutional Intelligence Dashboard */}
      <IntelligenceDashboard
        townName={townName}
        avgYield={avgYield}
        nestScore={nestScore}
        marketVelocity={marketVelocity}
        avgDaysOnMarket={townMarketData?.avg_days_on_market || 28}
      />

      {/* CINEMATIC HERO WITH STATS OVERLAY */}
      <TownHeroSection
        townName={townName}
        townSlug={townSlug}
        schoolDistrict={schoolDistrict}
        leadParagraph={seoContent.leadParagraph}
        countyInfo={countyInfo}
        heroImage={townMarketData?.hero_landmark || heroImage}
        avgYield={avgYield}
        marketVelocity={marketVelocity}
        medianPrice={townMarketData?.median_price}
        activeListings={townMarketData?.active_listings}
        avgDaysOnMarket={townMarketData?.avg_days_on_market}
        nestScore={nestScore}
        onSearchClick={handleSearchClick}
      />

      {/* FULL-WIDTH COMMAND CENTER MAP */}
      <TownCommandMap
        townSlug={townSlug}
        townName={townName}
        centerLat={townMarketData?.map_center_lat ?? undefined}
        centerLng={townMarketData?.map_center_lng ?? undefined}
        zoom={townMarketData?.default_zoom ?? undefined}
      />
      {/* BIG-SEARCH COMMAND MODULES — Intent-Based Navigation */}
      <SearchCommandModules
        townName={townName}
        townSlug={townSlug}
        onSearchClick={(category) => {
          setInventoryModalOpen(true);
        }}
      />

      {/* BENTO GRID — Schools · Local Flavor · Live Deals */}
      <TownBentoGrid
        townName={townName}
        townSlug={townSlug}
        schoolDistrict={schoolDistrict}
        nestScore={nestScore}
      />

      {/* TOWN LEDGER - Deep Space Bento Cards */}
      <section className="section-massive px-[5%] bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Town Ledger</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-foreground tracking-tight">
                What's Happening in {townName}
              </h2>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bento-card p-6 animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                  <div className="h-6 bg-muted rounded w-full mb-2" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : ledgerEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ledgerEntries.map((entry) => {
                const Icon = getCategoryIcon(entry.category);
                return (
                  <div key={entry.id} className="bento-card p-6 hover-lift group">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {entry.category}
                      </span>
                      {entry.is_featured && (
                        <span className="ml-auto text-xs font-semibold text-primary">Featured</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{entry.content}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bento-card p-8 text-center">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No ledger entries yet for {townName}.</p>
            </div>
          )}
        </div>
      </section>

      {/* HIGH-YIELD ASSETS / INVESTMENT VAULT - Gated Behind Authentication */}
      <IntelligenceGatekeeper
        yieldValue={avgYield}
        townName={townName}
        previewContent={
          <section className="section-massive px-[5%] bg-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Investment Vault</p>
                <h2 className="text-3xl md:text-4xl font-extralight text-foreground mb-4 tracking-tight">
                  High-Yield Assets in {townName}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto body-airy">
                  Cash-flowing properties with verified returns. Click any property to view virtual underwriting.
                </p>
              </div>
              {/* Preview placeholder cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bento-card p-6">
                    <div className="h-40 bg-muted/50 rounded-xl mb-4" />
                    <div className="h-6 bg-muted/50 rounded w-2/3 mb-2" />
                    <div className="h-4 bg-muted/50 rounded w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        }
      >
        <section className="section-massive px-[5%] bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">Investment Vault</p>
              <h2 className="text-3xl md:text-4xl font-extralight text-foreground mb-4 tracking-tight">
                High-Yield Assets in {townName}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto body-airy">
                Cash-flowing properties with verified returns. Click any property to view virtual underwriting.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bento-card p-6 animate-pulse">
                    <div className="h-40 bg-muted rounded-xl mb-4" />
                    <div className="h-6 bg-muted rounded w-2/3 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : highYieldAssets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {highYieldAssets.map((asset) => (
                  <Link
                    key={asset.id}
                    to="/dealdesk"
                    className="bento-card p-6 hover-lift group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{asset.property_type}</p>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {asset.address}
                        </h3>
                      </div>
                      <span className="text-2xl font-bold text-primary text-glow">{asset.price}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4 glass rounded-xl mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary text-glow">{asset.cash_on_cash_return}%</p>
                        <p className="text-xs text-muted-foreground">Cash-on-Cash</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="text-2xl font-bold text-foreground">{asset.cap_rate}%</p>
                        <p className="text-xs text-muted-foreground">Cap Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{asset.units}</p>
                        <p className="text-xs text-muted-foreground">Units</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Gross Rent: {asset.gross_rent}</span>
                      <span className="text-sm font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Numbers <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bento-card p-8 text-center">
                <Home className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No high-yield assets currently available in {townName}.</p>
                <Link to="/dealdesk" className="inline-flex items-center gap-2 text-primary font-semibold mt-4 hover:underline">
                  Submit an address for analysis <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </IntelligenceGatekeeper>

      {/* REAL ESTATE VENDOR DIRECTORY - Approved & Recommended Partners */}
      <RealEstateVendorDirectory townSlug={townSlug} />

      {/* THE NUMBERS BRIDGE - Professional Transition */}
      <section className="py-20 px-[5%] bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* The Bridge Visual */}
          <div className="flex flex-col items-center mb-16">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-primary" />
            <p className="text-sm font-extralight tracking-[0.4em] text-primary my-6">THE NUMBERS</p>
            <div className="w-px h-16 bg-gradient-to-b from-primary via-primary to-transparent" />
          </div>

          {/* Market Intelligence Badge + Investor Yield Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            {/* Market Intelligence Indicator */}
            {(() => {
              const townPPSF = townMarketData?.median_price && townMarketData?.avg_sqft 
                ? Math.round(townMarketData.median_price / townMarketData.avg_sqft) 
                : null;
              const ppsfDiff = townPPSF ? ((townPPSF - REGIONAL_AVG_PPSF) / REGIONAL_AVG_PPSF * 100) : 0;
              const domDiff = townMarketData?.avg_days_on_market 
                ? ((REGIONAL_AVG_DOM - townMarketData.avg_days_on_market) / REGIONAL_AVG_DOM * 100) 
                : 0;
              const marketScore = ppsfDiff < 0 ? 'Value Zone' : ppsfDiff > 15 ? 'Premium Market' : 'Market Rate';
              const marketColor = ppsfDiff < 0 ? 'bg-primary/20 text-primary' : ppsfDiff > 15 ? 'bg-amber-500/20 text-amber-400' : 'bg-accent/20 text-blue-400';
              
              return (
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${marketColor}`}>
                    <TrendingUp className="w-4 h-4" />
                    Market Status: {marketScore}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {ppsfDiff > 0 ? '+' : ''}{ppsfDiff.toFixed(0)}% vs Regional Avg
                  </span>
                </div>
              );
            })()}
            
            {/* Investor Yield Toggle */}
            <div className="flex items-center gap-2 glass rounded-full p-1">
              <button
                onClick={() => setViewMode('owner-occupied')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'owner-occupied' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Owner-Occupied
              </button>
              <button
                onClick={() => setViewMode('investment')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === 'investment' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                Investment
              </button>
            </div>
          </div>

          {/* Institutional Bento Grid - 4 Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Market Velocity */}
            <button
              onClick={handleSearchClick}
              className="bento-card p-6 hover-lift group text-left relative"
            >
              <Lock className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Market Velocity
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                {townMarketData?.avg_days_on_market || 28} <span className="text-lg font-normal text-muted-foreground">days</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Avg. Days on Market
              </p>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                  (townMarketData?.avg_days_on_market || 28) < 30 ? 'bg-primary/20 text-primary' :
                  (townMarketData?.avg_days_on_market || 28) < 60 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {(townMarketData?.avg_days_on_market || 28) < 30 ? 'High Velocity' : 
                   (townMarketData?.avg_days_on_market || 28) < 60 ? 'Moderate' : 'Low Velocity'}
                </span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            {/* Equity Anchor */}
            <button
              onClick={handleSearchClick}
              className="bento-card p-6 hover-lift group text-left relative"
            >
              <Lock className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Equity Anchor
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">
                ${townMarketData?.median_price ? (townMarketData.median_price / 1000).toFixed(0) : '---'}K
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Median Sale Price
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-semibold">
                  {townMarketData?.active_listings || 0} Active Listings
                </span>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            {/* Institutional Yield (PPSF) - Changes based on toggle */}
            <button
              onClick={handleSearchClick}
              className="bento-card p-6 hover-lift group text-left relative"
            >
              <Lock className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {viewMode === 'investment' ? 'Target Yield' : 'Institutional Yield'}
                </span>
              </div>
              {viewMode === 'investment' ? (
                <>
                  <p className="text-3xl font-bold text-primary text-glow mb-1">
                    {avgYield}
                    <span className="text-lg font-normal text-muted-foreground"> CoC</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cash-on-Cash Return
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {townMarketData?.multi_family_count || 0} Multi-Family
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    ${townMarketData?.median_price && townMarketData?.avg_sqft 
                      ? Math.round(townMarketData.median_price / townMarketData.avg_sqft)
                      : '---'}
                    <span className="text-lg font-normal text-muted-foreground">/sqft</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Price per Sq Ft
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Avg {townMarketData?.avg_sqft?.toLocaleString() || '---'} sqft
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </>
              )}
            </button>

            {/* Community Index */}
            <button
              onClick={handleSearchClick}
              className="bento-card p-6 hover-lift group text-left relative"
            >
              <Lock className="absolute top-4 right-4 w-4 h-4 text-muted-foreground/40" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Gauge className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Nest Score
                </span>
              </div>
              <p className="text-3xl font-bold text-primary text-glow mb-1">
                {nestScore}
                <span className="text-lg font-normal text-muted-foreground">/10</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Quality of Life Index
              </p>
              <div className="flex items-center justify-between">
                {schoolDistrict && (
                  <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                    {schoolDistrict}
                  </span>
                )}
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>

          {/* Live Inventory Tile - Full Width Feature */}
          <div className="mt-8">
            <button
              onClick={() => setInventoryModalOpen(true)}
              className="w-full bento-card p-8 hover-lift group text-left relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Layers className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      Live Inventory
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Browse active {townName} listings with dark-mode filters
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {townMarketData?.active_listings || '—'}
                      </div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary text-glow">
                        {townMarketData?.single_family_count || '—'}
                      </div>
                      <div className="text-xs text-muted-foreground">Single Family</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">
                        {townMarketData?.multi_family_count || '—'}
                      </div>
                      <div className="text-xs text-muted-foreground">Multi-Unit</div>
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          </div>

          {/* Deep Dive CTA */}
          <div className="text-center mt-12">
            <button
              onClick={handleSearchClick}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              <Lock className="w-4 h-4" />
              Deep Dive: Full Market Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Rental Vault for this town */}
      <RentalVault townSlug={townSlug} townName={townName} limit={4} />

      {/* Civic Directory - Government & Tax Offices */}
      <CivicDirectorySection townSlug={townSlug} townName={townName} />

      {/* Academic Institutions - Schools & Colleges */}
      <AcademicInstitutionsSection townSlug={townSlug} townName={townName} />

      {/* Featured Intel Section - Investment Opportunity Showcase */}
      <FeaturedIntelSection 
        townName={townName} 
        townSlug={townSlug}
        featuredAddress={highYieldAssets[0]?.address}
        featuredPrice={highYieldAssets[0]?.price}
        featuredYield={highYieldAssets[0] ? `${highYieldAssets[0].cash_on_cash_return}%` : undefined}
        featuredType={highYieldAssets[0]?.property_type}
      />

      {/* QUICK MATCH LEAD CAPTURE - VIP Property Access */}
      <section className="section-massive px-[5%] bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              VIP Access
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight text-foreground mb-4 tracking-tight">
              Get {townName} Listings First
            </h2>
            <p className="text-lg text-muted-foreground body-airy">
              Including off-market opportunities matched to your criteria.
            </p>
          </div>
          <QuickMatchForm townName={townName} />
        </div>
      </section>

      {/* CTA Section - Deep Space */}
      <section className="section-massive px-[5%] bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extralight text-foreground mb-4 tracking-tight">
            Ready to invest in <span className="text-primary text-glow">{townName}</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 body-airy">
            Submit any address for a custom property intelligence report.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dealdesk"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-transform glow-primary"
            >
              Request Property Intel
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={handleSearchClick}
              className="inline-flex items-center justify-center gap-2 glass border border-border text-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary/20 transition-all"
            >
              Browse All Listings
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Master Gatekeeper Modal */}
      <MasterGatekeeperModal
        isOpen={gatekeeperOpen}
        onClose={() => setGatekeeperOpen(false)}
        redirectUrl={searchUrl}
        townName={townName}
      />

      {/* Live Inventory Modal */}
      <LiveInventoryModal
        isOpen={inventoryModalOpen}
        onClose={() => setInventoryModalOpen(false)}
        townName={townName}
        townSlug={townSlug}
        searchUrl={searchUrl}
      />

      <NearbyMarkets townSlug={townSlug} townName={townName} />

      <Footer />

      {/* Local Voice Interview Side Panel with Blurred Narrative for Unverified */}
      <Sheet open={!!selectedVoice} onOpenChange={() => setSelectedVoice(null)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-l border-border overflow-y-auto">
          {selectedVoice && (
            <>
              <SheetHeader className="mb-6">
                <div className="flex items-center gap-2">
                  {selectedVoice.is_verified ? (
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                      Nest Verified
                    </span>
                  ) : (
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded-full">
                      Community Preview
                    </span>
                  )}
                </div>
                <SheetTitle className="text-2xl font-bold text-foreground mt-2">
                  {selectedVoice.business_name}
                </SheetTitle>
              </SheetHeader>

              {/* Owner Photo - Blurred if not verified */}
              <div className="mb-6 relative">
                <img
                  src={selectedVoice.owner_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVoice.owner_name)}&background=00F5FF&color=0B0B0B&size=400`}
                  alt={selectedVoice.owner_name}
                  className={`w-full h-64 object-cover rounded-2xl ${!selectedVoice.is_verified ? 'filter blur-[8px]' : ''}`}
                />
                {!selectedVoice.is_verified && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-strong rounded-full p-4">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                )}
              </div>

              {/* Owner Info */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedVoice.owner_name}</h3>
                  <p className="text-sm text-muted-foreground">Owner & Founder</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {townName}
                </div>
              </div>

              {/* Interview Sections - Blurred if not verified */}
              {selectedVoice.is_verified ? (
                <div className="space-y-6">
                  <div className="p-4 glass rounded-xl">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The Origin</h4>
                    <p className="text-sm text-foreground italic">"{selectedVoice.origin_story}"</p>
                  </div>
                  <div className="p-4 glass rounded-xl">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Market Insight</h4>
                    <p className="text-sm text-foreground italic">"{selectedVoice.alpha_insight}"</p>
                  </div>
                  <div className="p-4 glass rounded-xl">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Why {townName} is Big Time</h4>
                    <p className="text-sm text-foreground italic">"{selectedVoice.growth_vision}"</p>
                  </div>
                </div>
              ) : (
                /* Blurred Narrative with Verify CTA */
                <div className="relative">
                  <div className="space-y-6 filter blur-[6px] opacity-60 select-none pointer-events-none">
                    <div className="p-4 glass rounded-xl">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">The Origin</h4>
                      <p className="text-sm text-foreground italic">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore."</p>
                    </div>
                    <div className="p-4 glass rounded-xl">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Market Insight</h4>
                      <p className="text-sm text-foreground italic">"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."</p>
                    </div>
                    <div className="p-4 glass rounded-xl">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Why {townName} is Big Time</h4>
                      <p className="text-sm text-foreground italic">"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."</p>
                    </div>
                  </div>
                  
                  {/* Verification CTA Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedVoice(null);
                        setGatekeeperOpen(true);
                      }}
                      className="flex flex-col items-center gap-3 p-6 glass-strong rounded-2xl border border-primary/30 hover:border-primary/60 transition-colors group"
                    >
                      <Lock className="w-8 h-8 text-primary" />
                      <span className="text-lg font-semibold text-foreground">Owner: Claim Your Story</span>
                      <span className="text-sm text-muted-foreground text-center max-w-xs">
                        This listing is in Community Preview mode. Join our community to publish your story.
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        Get Started →
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Offering */}
              <div className="mt-6 p-4 border border-border rounded-xl">
                <h4 className="text-sm font-semibold text-foreground mb-1">What They Offer</h4>
                <p className="text-muted-foreground">{selectedVoice.primary_offering || "Details coming soon"}</p>
              </div>

              {/* CTA - Only show if verified and has website */}
              {selectedVoice.is_verified && selectedVoice.website_url && (
                <a
                  href={selectedVoice.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors mt-6 glow-primary"
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
