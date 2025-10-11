
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rentals from "./pages/Rentals";
import Communities from "./pages/Communities";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AlbanyRealEstate from "./pages/AlbanyRealEstate";
import TroyRealEstate from "./pages/TroyRealEstate";
import SchenectadyRealEstate from "./pages/SchenectadyRealEstate";
import SaratogaRealEstate from "./pages/SaratogaRealEstate";
import InvestmentLanding from "./pages/InvestmentLanding";
import SEOAudit from "./pages/SEOAudit";
import Markets from "./pages/Markets";
import SingleFamilyMarket from "./pages/SingleFamilyMarket";
import Grants from "./pages/Grants";
import FirstTimeHomebuyers from "./pages/FirstTimeHomebuyers";
import AlbanyInvestmentProperties from "./pages/AlbanyInvestmentProperties";
import AlbanyMultiUnit from "./pages/AlbanyMultiUnit";
import AlbanyLand from "./pages/AlbanyLand";
import SellInvestmentProperty from "./pages/SellInvestmentProperty";
import CashFlowReport from "./pages/CashFlowReport";
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
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/first-time-homebuyers" element={<FirstTimeHomebuyers />} />
          <Route path="/first-time-buyer-programs-albany" element={<FirstTimeHomebuyers />} />
          <Route path="/albany-investment-properties" element={<AlbanyInvestmentProperties />} />
          <Route path="/albany-multi-unit" element={<AlbanyMultiUnit />} />
          <Route path="/albany-land" element={<AlbanyLand />} />
          <Route path="/sell-investment-property" element={<SellInvestmentProperty />} />
          <Route path="/cash-flow-report" element={<CashFlowReport />} />
          <Route path="/communities/:city" element={<Communities />} />
          <Route path="/investment-properties" element={<InvestmentLanding />} />
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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<PrivacyPolicy />} />
          
          {/* Capital District Hub Pages */}
          {/* Capital District Hub Pages - All Towns */}
          {generateTownRoutes()}
          
          {/* Capital District Rental Pages - All Towns */}
          {generateTownRentalRoutes()}
          
          {/* SEO Management */}
          <Route path="/seo-audit" element={<SEOAudit />} />
          
          {/* Markets Section */}
          <Route path="/markets" element={<Markets />} />
          <Route path="/markets/:town" element={<SingleFamilyMarket />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
