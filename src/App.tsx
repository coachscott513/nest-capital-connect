
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rentals from "./pages/Rentals";
import Communities from "./pages/Communities";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create QueryClient inside the component to avoid initialization issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/communities/:city" element={<Communities />} />
            <Route path="/investment-properties" element={<Index />} />
            <Route path="/rehab-properties" element={<Index />} />
            <Route path="/financing" element={<Index />} />
            <Route path="/albany-rentals" element={<Rentals />} />
            <Route path="/troy-rentals" element={<Rentals />} />
            <Route path="/schenectady-rentals" element={<Rentals />} />
            <Route path="/saratoga-rentals" element={<Rentals />} />
            <Route path="/contact" element={<Index />} />
            <Route path="/about" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
