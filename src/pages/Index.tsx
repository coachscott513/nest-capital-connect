
import React from 'react';
import HeroSection from '@/components/HeroSection';
import NeighborhoodsSection from '@/components/NeighborhoodsSection';
import RentersSection from '@/components/RentersSection';
import FirstTimeBuyersSection from '@/components/FirstTimeBuyersSection';
import FinancingSection from '@/components/FinancingSection';
import OwnersSection from '@/components/OwnersSection';
import MissionSection from '@/components/MissionSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <NeighborhoodsSection />
      <RentersSection />
      <FirstTimeBuyersSection />
      <FinancingSection />
      <OwnersSection />
      <MissionSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
