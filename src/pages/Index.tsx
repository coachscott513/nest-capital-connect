
import React from 'react';
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
  return (
    <div className="min-h-screen bg-white">
      <Header />
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
