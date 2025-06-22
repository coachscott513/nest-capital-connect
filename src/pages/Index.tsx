
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import UserProfile from '@/components/UserProfile';
import HeroSection from '@/components/HeroSection';
import NeighborhoodsSection from '@/components/NeighborhoodsSection';
import RentersSection from '@/components/RentersSection';
import OwnersSection from '@/components/OwnersSection';
import FirstTimeBuyersSection from '@/components/FirstTimeBuyersSection';
import FinancingSection from '@/components/FinancingSection';
import MissionSection from '@/components/MissionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Index = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    // Show welcome message for newly confirmed users
    if (user && !hasShownWelcome) {
      toast({
        title: "Welcome!",
        description: "Your account has been confirmed successfully.",
      });
      setHasShownWelcome(true);
    }
  }, [user, hasShownWelcome, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Authentication Status Section */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          {user ? (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
              <UserProfile />
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
              <p className="text-gray-600">Sign in or create an account to access all features</p>
              <Button asChild size="lg">
                <Link to="/auth">Sign In / Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <HeroSection />
      <NeighborhoodsSection />
      <RentersSection />
      <OwnersSection />
      <FirstTimeBuyersSection />
      <FinancingSection />
      <MissionSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
