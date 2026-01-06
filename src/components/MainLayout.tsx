import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CleanHeader />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
