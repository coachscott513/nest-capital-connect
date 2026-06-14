import { Phone } from "lucide-react";
import AnalystCard from "@/components/AnalystCard";

/**
 * FloatingLiveAgent — bottom-right pill, every page (desktop).
 * Brand-locked: charcoal pill, teal accent dot. Red is reserved for
 * the actual Call button inside the modal.
 */
const CHARCOAL = "#0e0f12";
const TEAL = "#0d6e66";

const FloatingLiveAgent = () => {
  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[1500]">
      <AnalystCard>
        <button
          aria-label="Open Local Concierge"
          className="group flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full text-white font-semibold text-sm shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_20px_44px_-8px_rgba(94,234,212,0.35)] hover:scale-[1.03]"
          style={{ backgroundColor: CHARCOAL }}
        >
          <span
            className="relative w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: TEAL }}
          >
            <Phone className="w-4 h-4" />
            <span
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"
              style={{ boxShadow: `0 0 0 2px ${CHARCOAL}` }}
            />
          </span>
          <span className="whitespace-nowrap">Local Concierge</span>
        </button>
      </AnalystCard>
    </div>
  );
};

export default FloatingLiveAgent;
