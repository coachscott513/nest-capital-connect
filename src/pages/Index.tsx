
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NeighborhoodsSection from "@/components/NeighborhoodsSection";
import OwnersSection from "@/components/OwnersSection";
import RentersSection from "@/components/RentersSection";
import FirstTimeBuyersSection from "@/components/FirstTimeBuyersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MissionSection from "@/components/MissionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <NeighborhoodsSection />
      <OwnersSection />
      <RentersSection />
      <FirstTimeBuyersSection />
      <TestimonialsSection />
      <MissionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
