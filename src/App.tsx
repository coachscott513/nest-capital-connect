
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileCtaBar from "@/components/MobileCtaBar";
import CommandCenter from "@/components/CommandCenter";
import Index from "./pages/Index";
import InvestorTools from "./pages/InvestorTools";
import Rentals from "./pages/Rentals";
import Communities from "./pages/Communities";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AlbanyRealEstate from "./pages/AlbanyRealEstate";
import TroyRealEstate from "./pages/TroyRealEstate";
import SchenectadyRealEstate from "./pages/SchenectadyRealEstate";
import SaratogaRealEstate from "./pages/SaratogaRealEstate";
import InvestmentLanding from "./pages/InvestmentLanding";
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
import SellInvestmentProperty from "./pages/SellInvestmentProperty";
import CashFlowReport from "./pages/CashFlowReport";
import HomesForSale from "./pages/HomesForSale";
import TroyHomesForSale from "./pages/TroyHomesForSale";
import AlbanyHomesForSale from "./pages/AlbanyHomesForSale";
import SchenectadyHomesForSale from "./pages/SchenectadyHomesForSale";
import SaratogaHomesForSale from "./pages/SaratogaHomesForSale";
import PineHillsAlbany from "./pages/PineHillsAlbany";
import DelmarHomesForSale from "./pages/DelmarHomesForSale";
import DelmarMarketInsights from "./pages/DelmarMarketInsights";
import PropertyListing from "./pages/PropertyListing";
import ElsmereProperty from "./pages/137AElsmereAve";
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
import BuyerRoadmap from "./pages/BuyerRoadmap";
import InvestorJourney from "./pages/buyer-journey/InvestorJourney";
import FirstTimeBuyerJourney from "./pages/buyer-journey/FirstTimeBuyerJourney";
import LandBuyerJourney from "./pages/buyer-journey/LandBuyerJourney";
import FinancingJourney from "./pages/buyer-journey/FinancingJourney";
import { generateTownRoutes, generateTownRentalRoutes } from "./components/ExpandedRoutingSystem";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const App = () => {

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/investor-tools" element={<InvestorTools />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/first-time-homebuyers" element={<FirstTimeHomebuyers />} />
          <Route path="/first-time-home-buyers" element={<FirstTimeBuyerGuide />} />
          <Route path="/first-time-buyer-programs-albany" element={<FirstTimeHomebuyers />} />
          <Route path="/albany-investment-properties" element={<AlbanyInvestmentProperties />} />
          <Route path="/albany-multi-unit" element={<AlbanyMultiUnit />} />
          <Route path="/schenectady-multi-unit" element={<SchenectadyMultiUnit />} />
          <Route path="/troy-multi-unit" element={<TroyMultiUnit />} />
          <Route path="/albany-land" element={<AlbanyLand />} />
          <Route path="/sell-investment-property" element={<SellInvestmentProperty />} />
          <Route path="/cash-flow-report" element={<CashFlowReport />} />
          <Route path="/communities/:city" element={<Communities />} />
          <Route path="/investment-properties" element={<InvestmentProperties />} />
          <Route path="/investment-landing" element={<InvestmentLanding />} />
          <Route path="/rehab-properties" element={<Index />} />
          <Route path="/financing" element={<Index />} />
          <Route path="/albany-rentals" element={<Rentals />} />
          <Route path="/troy-rentals" element={<Rentals />} />
          <Route path="/schenectady-rentals" element={<Rentals />} />
          <Route path="/saratoga-rentals" element={<Rentals />} />
          <Route path="/contact" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/article/:slug" element={<BlogArticle />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<PrivacyPolicyPage />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* Hyperlocal SEO Pages - Homes for Sale */}
          <Route path="/homes-for-sale" element={<HomesForSale />} />
          <Route path="/homes-for-sale/troy" element={<TroyHomesForSale />} />
          <Route path="/homes-for-sale/albany" element={<AlbanyHomesForSale />} />
          <Route path="/homes-for-sale/schenectady" element={<SchenectadyHomesForSale />} />
          <Route path="/homes-for-sale/saratoga-springs" element={<SaratogaHomesForSale />} />
          <Route path="/homes-for-sale/albany/pine-hills" element={<PineHillsAlbany />} />
          <Route path="/delmar-homes-for-sale" element={<DelmarHomesForSale />} />
          <Route path="/delmar-market-insights" element={<DelmarMarketInsights />} />
          
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
          
          {/* VIP Buyer Access */}
          <Route path="/vip-buyer-access" element={<VipBuyerAccess />} />

          {/* Deal Desk */}
          <Route path="/dealdesk" element={<DealDesk />} />
          <Route path="/dealdesk/thanks" element={<DealDeskThanks />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Global Mobile CTA Bar - shows on mobile only */}
          <MobileCtaBar />
          {/* Global Command Center - shows on desktop only */}
          <CommandCenter />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
