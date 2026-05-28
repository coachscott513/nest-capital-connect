import { Phone, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * MobileCtaBar — dark frosted glass bottom bar (mobile only).
 * Brand-locked: onyx + teal accents. Red is reserved strictly for
 * the actual Call icon. No royal blue.
 */
const MobileCtaBar = () => {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[1000] safe-area-inset-bottom border-t"
      style={{
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        borderTopColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href="tel:+15185227265"
          className="flex flex-col items-center justify-center min-h-[56px] py-2.5 px-1 text-white/85 active:bg-white/5 transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5" style={{ color: '#DC1C2E' }} />
          <span className="text-[10px] font-medium leading-tight">Call</span>
        </a>

        <a
          href="sms:+15185227265"
          className="flex flex-col items-center justify-center min-h-[56px] py-2.5 px-1 text-white/85 active:bg-white/5 transition-colors"
        >
          <MessageSquare className="w-5 h-5 mb-0.5 text-white/85" />
          <span className="text-[10px] font-medium leading-tight">Text</span>
        </a>

        <Link
          to="/local"
          className="flex flex-col items-center justify-center min-h-[56px] py-2.5 px-1 active:bg-white/5 transition-colors"
          style={{ color: '#5eead4' }}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium leading-tight">Search Local</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileCtaBar;
