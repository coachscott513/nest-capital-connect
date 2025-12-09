import { Phone, MessageSquare, BarChart3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileCtaBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnalyze = () => {
    if (location.pathname === '/') {
      // Scroll to the Due Diligence Engine section
      const element = document.getElementById('due-diligence-engine');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to homepage and scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('due-diligence-engine');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.3)] safe-area-inset-bottom">
      <div className="grid grid-cols-3 divide-x divide-border">
        {/* Call Button */}
        <a
          href="tel:+15186762347"
          className="flex flex-col items-center justify-center py-3 px-2 text-foreground hover:bg-muted/50 transition-colors active:bg-muted"
        >
          <Phone className="w-5 h-5 text-primary mb-1" />
          <span className="text-xs font-medium">Call Scott</span>
        </a>

        {/* Text Button */}
        <a
          href="sms:+15186762347?body=Hi%20Scott%2C%20I'd%20like%20to%20analyze%20this%20property%3A%20"
          className="flex flex-col items-center justify-center py-3 px-2 text-foreground hover:bg-muted/50 transition-colors active:bg-muted"
        >
          <MessageSquare className="w-5 h-5 text-primary mb-1" />
          <span className="text-xs font-medium">Text Address</span>
        </a>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          className="flex flex-col items-center justify-center py-3 px-2 text-foreground hover:bg-muted/50 transition-colors active:bg-muted"
        >
          <BarChart3 className="w-5 h-5 text-primary mb-1" />
          <span className="text-xs font-medium">Analyze a Deal</span>
        </button>
      </div>
    </div>
  );
};

export default MobileCtaBar;
