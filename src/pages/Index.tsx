
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RentersSection from "@/components/RentersSection";
import OwnersSection from "@/components/OwnersSection";
import NeighborhoodsSection from "@/components/NeighborhoodsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MissionSection from "@/components/MissionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <RentersSection />
      <OwnersSection />
      <NeighborhoodsSection />
      <TestimonialsSection />
      <MissionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
