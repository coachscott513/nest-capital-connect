
import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MobileCtaBar from "@/components/MobileCtaBar";
import FloatingLiveAgent from "@/components/FloatingLiveAgent";
import BuyerToolsDock from "@/components/buyer/BuyerToolsDock";

import RouteFade from "@/components/RouteFade";
import GARouteTracker from "@/components/GARouteTracker";
import { DelmarConfirmationProvider } from "@/contexts/DelmarConfirmationContext";
import Index from "./pages/Index";
import AdminMediaStories from "./pages/AdminMediaStories";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTowns from "./pages/admin/AdminTowns";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminPartnerInquiries from "./pages/admin/AdminPartnerInquiries";
import AdminPartnerPlacements from "./pages/admin/AdminPartnerPlacements";
import AdminListingClaims from "./pages/admin/AdminListingClaims";
import AdminPropertyListings from "./pages/admin/AdminPropertyListings";
import AdminBusinessAudit from "./pages/admin/AdminBusinessAudit";
import AdminDataHealth from "./pages/admin/AdminDataHealth";
import AdminSEOManifest from "./pages/admin/AdminSEOManifest";
import AdminPreviews from "./pages/admin/AdminPreviews";
import AdminMissionControl from "./pages/admin/AdminMissionControl";
import AdminAnswerPilot from "./pages/admin/AdminAnswerPilot";
import AdminAskNest from "./pages/admin/AdminAskNest";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminLaunchDashboard from "./pages/admin/AdminLaunchDashboard";
import AdminOutreach from "./pages/admin/AdminOutreach";
import GoRedirect from "./pages/GoRedirect";
import HomesPage from "./pages/HomesPage";
import HomesHub from "./pages/homes/HomesHub";
import TownListings from "./pages/homes/TownListings";
import AddListing from "./pages/homes/AddListing";
import HomesRentals from "./pages/homes/HomesRentals";
import OpenHouses from "./pages/homes/OpenHouses";
import HomesPartners from "./pages/homes/HomesPartners";
import PartnerInquiry from "./pages/homes/PartnerInquiry";
import ClaimListing from "./pages/homes/ClaimListing";
import AgentProfile from "./pages/homes/AgentProfile";
import ListingPreview from "./pages/homes/ListingPreview";
import PropertyBrief from "./pages/homes/PropertyBrief";
import BuyerTownSearch from "./pages/homes/BuyerTownSearch";
import SearchHub from "./pages/homes/SearchHub";
import BusinessLanding from "./pages/BusinessLanding";
import RooseveltRoom from "./pages/business/RooseveltRoom";
import BusinessPreviewPage from "./pages/business/BusinessPreviewPage";
import Cassone from "./pages/business/Cassone";
import SpotlightIntake from "./pages/business/SpotlightIntake";
import ForBusinesses from "./pages/business/ForBusinesses";
import ForBusinessesApply from "./pages/business/Apply";
import BusinessesHub from "./pages/businesses/BusinessesHub";
import BusinessCategoryPage from "./pages/businesses/BusinessCategoryPage";
import StoriesHub from "./pages/StoriesHub";
import MarketReport from "./pages/MarketReport";
import MarketReportsIndex from "./pages/MarketReportsIndex";
import { featuredProperties } from "./data/featuredProperties";
import RealEstateHub from "./pages/RealEstateHub";
import Restaurants from "./pages/Restaurants";
import HomeServices from "./pages/HomeServices";
import Wellness from "./pages/Wellness";
import ProfessionalServices from "./pages/ProfessionalServices";
import LocalPage from "./pages/LocalPage";
import ContactPage from "./pages/ContactPage";
import InvestorTools from "./pages/InvestorTools";
import Rentals from "./pages/Rentals";
import RentalsHub from "./pages/RentalsHub";
import CityRentalPage from "./pages/CityRentalPage";
import FirstTimeBuyerHub from "./pages/FirstTimeBuyerHub";
import Communities from "./pages/Communities";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AboutEditorial from "./pages/AboutEditorial";
import ClosingTeamPage from "./pages/ClosingTeamPage";
import AlbanyRealEstate from "./pages/AlbanyRealEstate";
import TroyRealEstate from "./pages/TroyRealEstate";
import SchenectadyRealEstate from "./pages/SchenectadyRealEstate";
import SchenectadyCountyIntelligence from "./pages/SchenectadyCountyIntelligence";
import SaratogaRealEstate from "./pages/SaratogaRealEstate";
import InvestmentLanding from "./pages/InvestmentLanding";
import FinancialConsole from "./pages/FinancialConsole";
import InvestmentProperties from "./pages/InvestmentProperties";
import SEOAudit from "./pages/SEOAudit";
import Markets from "./pages/Markets";
import SingleFamilyMarket from "./pages/SingleFamilyMarket";
import Grants from "./pages/Grants";
import FirstTimeHomebuyers from "./pages/FirstTimeHomebuyers";
import FirstTimeBuyerGuide from "./pages/FirstTimeBuyerGuide";
import AlbanyInvestmentProperties from "./pages/AlbanyInvestmentProperties";
import AlbanyMultiUnit from "./pages/AlbanyMultiUnit";
import SchenectadyMultiUnit from "./pages/SchenectadyMultiUnit";
import TroyMultiUnit from "./pages/TroyMultiUnit";
import AlbanyLand from "./pages/AlbanyLand";
import LandBuyers from "./pages/LandBuyers";
import SellInvestmentProperty from "./pages/SellInvestmentProperty";
import CashFlowReport from "./pages/CashFlowReport";
import Financing from "./pages/Financing";
import HomesForSale from "./pages/HomesForSale";
import TroyHomesForSale from "./pages/TroyHomesForSale";
import AlbanyHomesForSale from "./pages/AlbanyHomesForSale";
import SchenectadyHomesForSale from "./pages/SchenectadyHomesForSale";
import SaratogaHomesForSale from "./pages/SaratogaHomesForSale";
import PineHillsAlbany from "./pages/PineHillsAlbany";
import DelmarHomesForSale from "./pages/DelmarHomesForSale";
import DelmarMarketInsights from "./pages/DelmarMarketInsights";

import DelmarIntelligence from "./pages/DelmarIntelligence";
import LivingInTown from "./pages/LivingInTown";
import CommunityUpdates from "./pages/CommunityUpdates";
import CommunityUpdatesTown from "./pages/CommunityUpdatesTown";
import MicroNeighborhood from "./pages/MicroNeighborhood";
import NeighborhoodsHub from "./pages/NeighborhoodsHub";
import NeighborhoodDetail from "./pages/NeighborhoodDetail";
import DynamicTownIntelligence from "./pages/DynamicTownIntelligence";
import NiskayunaIntelligence from "./pages/NiskayunaIntelligence";
import VoorheesvilleIntelligence from "./pages/VoorheesvilleIntelligence";
import VoorheesvilleHomesForSale from "./pages/VoorheesvilleHomesForSale";
import CliftonParkIntelligence from "./pages/CliftonParkIntelligence";
import AmsterdamIntelligence from "./pages/AmsterdamIntelligence";
import TroyIntelligence from "./pages/TroyIntelligence";
import SaratogaIntelligence from "./pages/SaratogaIntelligence";
import SchenectadyIntelligence from "./pages/SchenectadyIntelligence";
import QueensburyIntelligence from "./pages/QueensburyIntelligence";
import AlbanyIntelligence from "./pages/AlbanyIntelligence";
import GuilderlandIntelligence from "./pages/GuilderlandIntelligence";
import MechanicvilleIntelligence from "./pages/MechanicvilleIntelligence";
import TroyHomesForSalePage from "./pages/TroyHomesForSalePage";
import NiskayunaHomesForSale from "./pages/NiskayunaHomesForSale";
import SaratogaHomesForSalePage from "./pages/SaratogaHomesForSalePage";
import CliftonParkHomesForSale from "./pages/CliftonParkHomesForSale";
import SchenectadyHomesForSalePage from "./pages/SchenectadyHomesForSalePage";
import AmsterdamHomesForSale from "./pages/AmsterdamHomesForSale";
import QueensburyHomesForSale from "./pages/QueensburyHomesForSale";
import PropertyListing from "./pages/PropertyListing";
import ElsmereProperty from "./pages/137AElsmereAve";
import RidgeRoadQueensbury from "./pages/RidgeRoadQueensbury";
import LaveryDriveDelmar from "./pages/LaveryDriveDelmar";
import RidgeRoadIntelReport from "./pages/reports/RidgeRoadIntelReport";
import RidgeRoadIntelligenceReport from "./pages/reports/RidgeRoadIntelligenceReport";
import ReportTemplate from "./pages/reports/ReportTemplate";
import SamplePropertyIntelligenceReport from "./pages/SamplePropertyIntelligenceReport";
import RidgeRoadPropertyIntel from "./pages/intel/RidgeRoadPropertyIntel";
import Reviews from "./pages/Reviews";
import MarketPage from "./pages/MarketPage";
import StrategyPage from "./pages/StrategyPage";
import MarketInsights from "./pages/MarketInsights";
import NycToAlbanyPlaybook from "./pages/NycToAlbanyPlaybook";
import AlbanyMultiUnitMarket from "./pages/AlbanyMultiUnitMarket";
import AnalyzeMultifamily from "./pages/AnalyzeMultifamily";
import Exchange1031Playbook from "./pages/Exchange1031Playbook";
import BestNeighborhoodsCashFlow from "./pages/BestNeighborhoodsCashFlow";
import SaratogaMultiUnitMarket from "./pages/SaratogaMultiUnitMarket";
import FultonMontgomeryMultiUnitMarket from "./pages/FultonMontgomeryMultiUnitMarket";
import VipBuyerAccess from "./pages/VipBuyerAccess";
import DealDesk from "./pages/DealDesk";
import DealDeskThanks from "./pages/DealDeskThanks";
import VendorHub from "./pages/VendorHub";
import BuyerRoadmap from "./pages/BuyerRoadmap";
import InvestorJourney from "./pages/buyer-journey/InvestorJourney";
import FirstTimeBuyerJourney from "./pages/buyer-journey/FirstTimeBuyerJourney";
import LandBuyerJourney from "./pages/buyer-journey/LandBuyerJourney";
import FinancingJourney from "./pages/buyer-journey/FinancingJourney";
import InvestmentAnalyzer from "./pages/InvestmentAnalyzer";
import PropertyAnalyzer from "./pages/homes/PropertyAnalyzer";
import YieldHome from "./pages/YieldHome";
import LoanTypes from "./pages/LoanTypes";
import Reports from "./pages/Reports";
import ComingSoon from "./pages/ComingSoon";
import LancasterStreetCaseStudy from "./pages/LancasterStreetCaseStudy";
import IntelligenceHub from "./pages/IntelligenceHub";
import MarketReportThanks from "./pages/MarketReportThanks";
import Ask from "./pages/Ask";
import SiteIndex from "./pages/SiteIndex";
import Pricing from "./pages/Pricing";
import ClaimBusiness from "./pages/ClaimBusiness";
import BizPage from "./pages/biz/BizPage";
import PartnerAuth from "./pages/PartnerAuth";
import ResetPassword from "./pages/ResetPassword";
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerSuccess from "./pages/PartnerSuccess";
import { generateTownRoutes, generateTownRentalRoutes } from "./components/ExpandedRoutingSystem";
import ScrollToTop from "./components/ScrollToTop";
import SingleFamilyHub from "./pages/search/SingleFamilyHub";
import InvestorsHub from "./pages/search/InvestorsHub";
import ForeclosuresHub from "./pages/search/ForeclosuresHub";
import LandHub from "./pages/search/LandHub";
import RentalsSearchHub from "./pages/search/RentalsSearchHub";
import SouthFlorida from "./pages/SouthFlorida";
import AnalyzeHub from "./pages/AnalyzeHub";
import AnalyzeAnyDealHome from "./pages/AnalyzeAnyDealHome";
import AnalyzeCondo from "./pages/analyze/AnalyzeCondo";
import AnalyzeSingleFamily from "./pages/analyze/AnalyzeSingleFamily";
import AnalyzeRental from "./pages/analyze/AnalyzeRental";
import AnalyzeMultifamilyNew from "./pages/analyze/AnalyzeMultifamily";
import AnalyzeLuxury from "./pages/analyze/AnalyzeLuxury";
import AnalyzeCommercial from "./pages/analyze/AnalyzeCommercial";
import AnalyzeLand from "./pages/analyze/AnalyzeLand";
import AnalyzeAnyHome from "./pages/AnalyzeAnyHome";
import AnalyzeAnyProperty from "./pages/AnalyzeAnyProperty";
import International from "./pages/International";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const PrerenderReadySignal = () => {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const signalReady = () => {
      document.dispatchEvent(new Event("render-complete"));
    };

    const timeoutId = window.setTimeout(signalReady, 3000);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
};

// /towns/:slug is now the dedicated Town Pulse local-engagement dashboard
// (real estate lives at /living-in/:slug and global /homes routes).
import TownPulse from "./pages/TownPulse";
import WeeklyPulse from "./pages/WeeklyPulse";
import LocalMedia from "./pages/LocalMedia";
import SubmitEvent from "./pages/SubmitEvent";

const NotFoundOrLegacyTown = () => {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/living-in-([a-z0-9-]+)\/?$/i);

  if (match?.[1]) {
    return <LivingInTown slugOverride={match[1].toLowerCase()} />;
  }

  return <NotFound />;
};

const App = () => {

  return (
    <HelmetProvider>
      {/* Default robots directive. Managed by Helmet (not index.html) so a page
          that sets noindex REPLACES this tag instead of conflicting with it. */}
      <Helmet>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      </Helmet>
      <AuthProvider>
        <DelmarConfirmationProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <GARouteTracker />
              <PrerenderReadySignal />
            <RouteFade>
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/go/:slug" element={<GoRedirect />} />
          <Route path="/admin/outreach" element={<AdminOutreach />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/towns" element={<AdminTowns />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/partner-inquiries" element={<AdminPartnerInquiries />} />
          <Route path="/admin/partner-placements" element={<AdminPartnerPlacements />} />
          <Route path="/admin/listing-claims" element={<AdminListingClaims />} />
          <Route path="/admin/property-listings" element={<AdminPropertyListings />} />
          <Route path="/admin/business-audit" element={<AdminBusinessAudit />} />
          <Route path="/admin/data-health" element={<AdminDataHealth />} />
          <Route path="/admin/seo-manifest" element={<AdminSEOManifest />} />
          <Route path="/admin/previews" element={<AdminPreviews />} />
          <Route path="/admin/mission-control" element={<AdminMissionControl />} />
          <Route path="/admin/answer-pilot" element={<AdminAnswerPilot />} />
          <Route path="/admin/ask-nest" element={<AdminAskNest />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />
          <Route path="/admin/media-stories" element={<AdminMediaStories />} />
          <Route path="/launch-dashboard" element={<AdminLaunchDashboard />} />
          <Route path="/admin/launch-dashboard" element={<AdminLaunchDashboard />} />

          <Route path="/investor-tools" element={<InvestorTools />} />
          <Route path="/finances" element={<FinancialConsole />} />
          <Route path="/financial-console" element={<FinancialConsole />} />
          <Route path="/invest" element={<FinancialConsole />} />
          <Route path="/rentals" element={<RentalsHub />} />
          <Route path="/rentals/:city" element={<CityRentalPage />} />
          <Route path="/old-rentals" element={<Rentals />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/first-time-buyers" element={<FirstTimeBuyerHub />} />
          <Route path="/first-time-homebuyers" element={<FirstTimeHomebuyers />} />
          <Route path="/first-time-home-buyers" element={<FirstTimeBuyerGuide />} />
          <Route path="/first-time-buyer-programs-albany" element={<FirstTimeHomebuyers />} />
          <Route path="/albany-investment-properties" element={<AlbanyInvestmentProperties />} />
          <Route path="/albany-multi-unit" element={<AlbanyMultiUnit />} />
          <Route path="/schenectady-multi-unit" element={<SchenectadyMultiUnit />} />
          <Route path="/troy-multi-unit" element={<TroyMultiUnit />} />
          <Route path="/albany-land" element={<AlbanyLand />} />
          <Route path="/land-buyers" element={<LandBuyers />} />
          <Route path="/sell-investment-property" element={<SellInvestmentProperty />} />
          <Route path="/cash-flow-report" element={<CashFlowReport />} />
          <Route path="/communities/:city" element={<Communities />} />
          <Route path="/investment-properties" element={<InvestmentProperties />} />
          <Route path="/investment-landing" element={<InvestmentLanding />} />
          <Route path="/rehab-properties" element={<Index />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/albany-rentals" element={<Navigate to="/living-in/albany" replace />} />
          <Route path="/troy-rentals" element={<Navigate to="/living-in/troy" replace />} />
          <Route path="/schenectady-rentals" element={<Navigate to="/living-in/schenectady" replace />} />
          <Route path="/saratoga-rentals" element={<Navigate to="/living-in/saratoga-springs" replace />} />
          {/* /contact handled below by ContactPage */}
          <Route path="/about" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/article/:slug" element={<BlogArticle />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<PrivacyPolicyPage />} />
          <Route path="/about-editorial" element={<AboutEditorial />} />
          {/* Preview-only, noindex until founder approval */}
          <Route path="/closing-team" element={<ClosingTeamPage />} />
          <Route path="/editorial" element={<AboutEditorial />} />
          <Route path="/editorial-policy" element={<AboutEditorial />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* City Real Estate Redirects - canonical URLs are /living-in/:slug */}
          <Route path="/albany-real-estate" element={<Navigate to="/living-in/albany" replace />} />
          <Route path="/troy-real-estate" element={<Navigate to="/living-in/troy" replace />} />
          <Route path="/schenectady-real-estate" element={<Navigate to="/living-in/schenectady" replace />} />
          <Route path="/saratoga-real-estate" element={<Navigate to="/living-in/saratoga-springs" replace />} />
          
          {/* Communities base route - Regional Command Center */}
          <Route path="/communities" element={<Communities />} />
          <Route path="/south-florida" element={<SouthFlorida />} />
          
          {/* Analyzer Hub */}
          <Route path="/analyze" element={<FinancialConsole />} />
          <Route path="/analyze-hub-legacy" element={<AnalyzeHub />} />
          <Route path="/analyze-any-deal" element={<AnalyzeAnyDealHome />} />
          <Route path="/analyze/condo" element={<AnalyzeCondo />} />
          <Route path="/analyze/single-family" element={<AnalyzeSingleFamily />} />
          <Route path="/analyze/rental" element={<AnalyzeRental />} />
          <Route path="/analyze/multifamily" element={<AnalyzeMultifamilyNew />} />
          <Route path="/analyze/luxury" element={<AnalyzeLuxury />} />
          <Route path="/analyze/commercial" element={<AnalyzeCommercial />} />
          <Route path="/analyze/land" element={<AnalyzeLand />} />
          
          {/* Market insights alias */}
          <Route path="/market-insights" element={<MarketInsights />} />
          <Route path="/single-family-market" element={<SingleFamilyMarket />} />
          
          {/* Buyer Journey Routes */}
          <Route path="/buyer-roadmap" element={<BuyerRoadmap />} />
          <Route path="/buyer-journey/first-time-buyer" element={<FirstTimeBuyerJourney />} />
          <Route path="/buyer-journey/financing" element={<FinancingJourney />} />
          <Route path="/buyer-journey/investor" element={<InvestorJourney />} />
          <Route path="/buyer-journey/land-buyer" element={<LandBuyerJourney />} />
          
          {/* Coming Soon placeholder */}
          <Route path="/coming-soon" element={<ComingSoon />} />
          
          {/* Intelligence Hub */}
          <Route path="/intelligence" element={<IntelligenceHub />} />
          
          {/* Hyperlocal SEO Pages - Redirect legacy /homes-for-sale/ to canonical town pages */}
          <Route path="/homes-for-sale" element={<Navigate to="/communities" replace />} />
          <Route path="/homes-for-sale/troy" element={<Navigate to="/living-in/troy" replace />} />
          <Route path="/homes-for-sale/albany" element={<Navigate to="/living-in/albany" replace />} />
          <Route path="/homes-for-sale/schenectady" element={<Navigate to="/living-in/schenectady" replace />} />
          <Route path="/schenectady-county-real-estate" element={<SchenectadyCountyIntelligence />} />
          <Route path="/homes-for-sale/saratoga-springs" element={<Navigate to="/living-in/saratoga-springs" replace />} />
          <Route path="/homes-for-sale/albany/pine-hills" element={<Navigate to="/living-in/albany" replace />} />
          <Route path="/delmar-homes-for-sale" element={<Navigate to="/living-in/delmar" replace />} />
          <Route path="/delmar-market-insights" element={<Navigate to="/living-in/delmar" replace />} />
          <Route path="/delmar" element={<Navigate to="/living-in/delmar" replace />} />
          {/* Town pages — UNIFIED. /living-in/:townSlug renders the master template or a coming-soon fallback. */}
          <Route path="/living-in/:townSlug" element={<LivingInTown />} />
          <Route path="/living-in/:townSlug/:neighborhoodSlug" element={<MicroNeighborhood />} />
          <Route path="/app/living-in/:townSlug" element={<LivingInTown />} />
          <Route path="/community-updates" element={<CommunityUpdates />} />
          <Route path="/community-updates/:townSlug" element={<CommunityUpdatesTown />} />
          <Route path="/towns/:slug" element={<TownPulse />} />
          {/* Neighborhood Explorer — canonical hub + micro-district pages */}
          <Route path="/neighborhoods" element={<NeighborhoodsHub />} />
          <Route path="/neighborhoods/:slug" element={<NeighborhoodDetail />} />
          {/* Simplified canonical destinations from main nav */}
          <Route path="/homes" element={<HomesHub />} />
          <Route path="/homes/search" element={<SearchHub />} />
          <Route path="/homes/search/:townSlug" element={<BuyerTownSearch />} />
          <Route path="/homes/listings/:townSlug/:addressSlug" element={<ListingPreview />} />
          {featuredProperties.map((p) => (
            <Route
              key={`${p.townSlug}-${p.slug}`}
              path={`/homes/listings/${p.townSlug}/${p.slug}`}
              element={<PropertyBrief />}
            />
          ))}
          <Route path="/homes/listings/:city" element={<TownListings />} />
          <Route path="/homes/listings" element={<TownListings />} />
          <Route path="/homes/agents/:agentSlug" element={<AgentProfile />} />
          <Route path="/homes/rentals" element={<HomesRentals />} />
          <Route path="/homes/open-houses" element={<OpenHouses />} />
          <Route path="/homes/add-listing" element={<AddListing />} />
          <Route path="/homes/partners" element={<HomesPartners />} />
          <Route path="/homes/partner-inquiry" element={<PartnerInquiry />} />
          <Route path="/homes/claim-listing" element={<ClaimListing />} />
          <Route path="/homes/mortgage" element={<HomesPartners />} />
          <Route path="/homes/insurance" element={<HomesPartners />} />
          <Route path="/homes/attorneys" element={<HomesPartners />} />
          <Route path="/homes/contractors" element={<HomesPartners />} />
          <Route path="/homes/inspectors" element={<HomesPartners />} />
          <Route path="/homes/property-management" element={<HomesPartners />} />
          <Route path="/real-estate" element={<RealEstateHub />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/home-services" element={<HomeServices />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/professional-services" element={<ProfessionalServices />} />
          <Route path="/housing" element={<Navigate to="/real-estate" replace />} />
          <Route path="/local" element={<LocalPage />} />
          <Route path="/weekly" element={<WeeklyPulse />} />
          <Route path="/events" element={<WeeklyPulse />} />
          <Route path="/this-week" element={<WeeklyPulse />} />
          <Route path="/media" element={<LocalMedia />} />
          <Route path="/submit-event" element={<SubmitEvent />} />
          <Route path="/add-event" element={<Navigate to="/submit-event" replace />} />
          <Route path="/add-profile" element={<Navigate to="/claim-business" replace />} />
          <Route path="/add-business" element={<Navigate to="/claim-business" replace />} />
          <Route path="/list-your-business" element={<Navigate to="/claim-business" replace />} />
          <Route path="/contact" element={<ContactPage />} />

          
          {/* Market Report Thank You Pages */}
          <Route path="/towns/:townSlug/report-request-thanks" element={<MarketReportThanks />} />
          
          {/* Town Homes for Sale Pages - Redirect to canonical town pages */}
          <Route path="/voorheesville-homes-for-sale" element={<Navigate to="/living-in/voorheesville" replace />} />
          <Route path="/troy-homes-for-sale" element={<Navigate to="/living-in/troy" replace />} />
          <Route path="/niskayuna-homes-for-sale" element={<Navigate to="/living-in/niskayuna" replace />} />
          <Route path="/saratoga-springs-homes-for-sale" element={<Navigate to="/living-in/saratoga-springs" replace />} />
          <Route path="/clifton-park-homes-for-sale" element={<Navigate to="/living-in/clifton-park" replace />} />
          <Route path="/schenectady-homes-for-sale" element={<Navigate to="/living-in/schenectady" replace />} />
          <Route path="/amsterdam-homes-for-sale" element={<Navigate to="/living-in/amsterdam" replace />} />
          <Route path="/queensbury-homes-for-sale" element={<Navigate to="/living-in/queensbury" replace />} />
          
          {/* Capital District Hub Pages */}
          {/* Capital District Hub Pages - All Towns */}
          {generateTownRoutes()}
          
          {/* Capital District Rental Pages - All Towns */}
          {generateTownRentalRoutes()}
          
          {/* SEO Management */}
          <Route path="/seo-audit" element={<SEOAudit />} />
          
          {/* Property Listings */}
          <Route path="/listings/:mlsId" element={<PropertyListing />} />
          <Route path="/listings/137a-elsmere-ave-delmar-ny" element={<ElsmereProperty />} />
          <Route path="/listings/1999-ridge-road-queensbury-ny" element={<RidgeRoadQueensbury />} />
          <Route path="/listings/22-lavery-drive-delmar-ny" element={<LaveryDriveDelmar />} />
          
          {/* Intelligence Reports */}
          <Route path="/reports/1999-ridge-road-queensbury-ny" element={<RidgeRoadIntelligenceReport />} />
          <Route path="/reports/template" element={<ReportTemplate />} />
          <Route path="/reports/sample-property-intelligence" element={<SamplePropertyIntelligenceReport />} />
          <Route path="/reports/old/1999-ridge-road-queensbury-ny" element={<RidgeRoadIntelReport />} />
          
          {/* Case Studies */}
          <Route path="/case-studies/177-lancaster-albany" element={<LancasterStreetCaseStudy />} />
          
          {/* New Apple-style Property Intelligence Reports */}
          <Route path="/intel/1999-ridge-road-queensbury-ny" element={<RidgeRoadPropertyIntel />} />
          
          {/* Markets Section */}
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:town" element={<SingleFamilyMarket />} />
          
          {/* SEO Market Pages */}
          <Route path="/market/:town" element={<MarketPage />} />
          
          {/* SEO Strategy Pages */}
          <Route path="/strategy/:asset" element={<StrategyPage />} />
          
          {/* Market Insights */}
          <Route path="/insights" element={<MarketInsights />} />
          
          {/* Investor Cornerstone Pages */}
          <Route path="/investor/nyc-to-albany-roi" element={<NycToAlbanyPlaybook />} />
          <Route path="/investor/albany-multi-unit-market" element={<AlbanyMultiUnitMarket />} />
          <Route path="/investor/analyze-multifamily" element={<AnalyzeMultifamily />} />
          <Route path="/investor/1031-nyc-to-albany" element={<Exchange1031Playbook />} />
          <Route path="/investor/best-neighborhoods-cash-flow-capital-district" element={<BestNeighborhoodsCashFlow />} />
          <Route path="/investor/saratoga-multi-unit-market" element={<SaratogaMultiUnitMarket />} />
          <Route path="/investor/fulton-montgomery-multi-unit-market" element={<FultonMontgomeryMultiUnitMarket />} />
          
          {/* Investment Analyzer & Yield Platform */}
          <Route path="/analyzer" element={<InvestmentAnalyzer />} />
          <Route path="/investment-analyzer" element={<PropertyAnalyzer />} />
          <Route path="/homes/analyze" element={<PropertyAnalyzer />} />
          <Route path="/yield" element={<YieldHome />} />
          <Route path="/loan-types" element={<LoanTypes />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* VIP Buyer Access */}
          <Route path="/vip-buyer-access" element={<VipBuyerAccess />} />

          {/* Deal Desk - Redirects to Intelligence Hub */}
          <Route path="/dealdesk" element={<Navigate to="/intelligence" replace />} />
          <Route path="/deal-desk" element={<Navigate to="/intelligence" replace />} />
          <Route path="/dealdesk/thanks" element={<DealDeskThanks />} />
          
          {/* Ask a Question */}
          <Route path="/ask" element={<Ask />} />
          
          {/* Site Index */}
          <Route path="/site-index" element={<SiteIndex />} />
          
          {/* Local Business Solutions — pricing & upgrade */}
          <Route path="/pricing" element={<Pricing />} />
          {/* Concierge inquiry form for Featured / Spotlight upgrades (pilot mode) */}
          <Route path="/claim-business" element={<ClaimBusiness />} />
          <Route path="/get-listed" element={<ClaimBusiness />} />
          <Route path="/business" element={<BusinessLanding />} />
          <Route path="/for-businesses" element={<ForBusinesses />} />
          <Route path="/for-businesses/apply" element={<ForBusinessesApply />} />
          <Route path="/business/the-roosevelt-room" element={<RooseveltRoom />} />
          <Route path="/business/cassone" element={<Cassone />} />
          <Route path="/business-spotlight-intake" element={<SpotlightIntake />} />
          <Route path="/business/:slug" element={<BusinessPreviewPage />} />
          <Route path="/businesses" element={<BusinessesHub />} />
          <Route path="/businesses/:categorySlug" element={<BusinessCategoryPage />} />
          <Route path="/stories" element={<StoriesHub />} />
          <Route path="/biz/:slug" element={<BizPage />} />
          
          {/* Partner Dashboard */}
          <Route path="/partner-auth" element={<PartnerAuth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/dashboard" element={<PartnerDashboard />} />
          <Route path="/partner-success" element={<PartnerSuccess />} />
          <Route path="/business-login" element={<Navigate to="/partner-auth" replace />} />
          
          {/* Vendor Intelligence Hub */}
          <Route path="/vendors" element={<VendorHub />} />
          <Route path="/partners" element={<VendorHub />} />
          
          {/* Analyzer Domain Pages */}
          <Route path="/analyze-home" element={<AnalyzeAnyHome />} />
          <Route path="/analyze-any-property" element={<AnalyzeAnyProperty />} />
          <Route path="/international" element={<International />} />

          {/* Tailored Search Hubs */}
          <Route path="/search/single-family" element={<SingleFamilyHub />} />
          <Route path="/search/investors" element={<InvestorsHub />} />
          <Route path="/search/foreclosures" element={<ForeclosuresHub />} />
          <Route path="/search/land" element={<LandHub />} />
          <Route path="/search/rentals" element={<RentalsSearchHub />} />

          {/* Market Reports (open-access authority assets) */}
          <Route path="/market-reports" element={<MarketReportsIndex />} />
          <Route path="/market-reports/:town" element={<MarketReport />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundOrLegacyTown />} />
          </Routes>
          </RouteFade>
          {/* Global Mobile CTA Bar - shows on mobile only (route-aware: Buyer tools / Ask Local) */}
          <MobileCtaBar />
          {/* Desktop persistent Buyer Tools dock — buyer/property routes only */}
          <BuyerToolsDock />
          {/* Global Floating Live Agent — local/business routes (desktop). SINGLE source of truth. */}
          <FloatingLiveAgent />

        </BrowserRouter>
        </QueryClientProvider>
      </DelmarConfirmationProvider>
    </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
