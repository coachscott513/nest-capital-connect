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
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-[#2563eb] shadow-[0_-4px_20px_rgba(0,0,0,0.4)] safe-area-inset-bottom">
      <div className="grid grid-cols-3 divide-x divide-white/20">
        {/* Call Button */}
        <a
          href="tel:+15186718048"
          className="flex flex-col items-center justify-center min-h-[56px] py-3 px-1 text-white hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <Phone className="w-5 h-5 text-white mb-1" />
          <span className="text-[10px] font-medium text-white text-center leading-tight">Call an Agent — Speak With an Analyst</span>
        </a>

        {/* Text Button */}
        <a
          href="sms:+15186718048?body=Hi%2C%20I'd%20like%20to%20analyze%20this%20property%3A%20"
          className="flex flex-col items-center justify-center min-h-[56px] py-3 px-1 text-white hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <MessageSquare className="w-5 h-5 text-white mb-1" />
          <span className="text-[10px] font-medium text-white text-center leading-tight">Text an Address — Get Rapid Analysis</span>
        </a>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          className="flex flex-col items-center justify-center min-h-[56px] py-3 px-1 text-white hover:bg-white/10 transition-colors active:bg-white/20"
        >
          <BarChart3 className="w-5 h-5 text-white mb-1" />
          <span className="text-[10px] font-medium text-white text-center leading-tight">Submit a Property — Get a Pro Report</span>
        </button>
      </div>
    </div>
  );
};

export default MobileCtaBar;
