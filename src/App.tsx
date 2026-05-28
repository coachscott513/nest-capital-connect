
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MobileCtaBar from "@/components/MobileCtaBar";
import FloatingLiveAgent from "@/components/FloatingLiveAgent";
import RouteFade from "@/components/RouteFade";
import GARouteTracker from "@/components/GARouteTracker";
import { DelmarConfirmationProvider } from "@/contexts/DelmarConfirmationContext";
import Index from "./pages/Index";
import HomesPage from "./pages/HomesPage";
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
          <Route path="/investor-tools" element={<InvestorTools />} />
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
          <Route path="/analyze" element={<AnalyzeHub />} />
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
          <Route path="/app/living-in/:townSlug" element={<LivingInTown />} />
          <Route path="/towns/:slug" element={<TownPulse />} />
          {/* Simplified canonical destinations from main nav */}
          <Route path="/homes" element={<HomesPage />} />
          <Route path="/local" element={<LocalPage />} />
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
          <Route path="/biz/:slug" element={<BizPage />} />
          
          {/* Partner Dashboard */}
          <Route path="/partner-auth" element={<PartnerAuth />} />
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

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundOrLegacyTown />} />
          </Routes>
          </RouteFade>
          {/* Global Mobile CTA Bar - shows on mobile only */}
          <MobileCtaBar />
          {/* Global Floating Live Agent — bottom right, every page (desktop). SINGLE source of truth. */}
          <FloatingLiveAgent />
        </BrowserRouter>
        </QueryClientProvider>
      </DelmarConfirmationProvider>
    </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
