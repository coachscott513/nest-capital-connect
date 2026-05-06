import { Phone } from "lucide-react";
import AnalystCard from "@/components/AnalystCard";

/**
 * FloatingLiveAgent — bottom-right pill, every page.
 * Opens the AnalystCard sheet (Scott Alvarez · RE/MAX Solutions).
 */
const REMAX_RED = "#DC1C2E";

const FloatingLiveAgent = () => {
  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-[1500]">
      <AnalystCard>
        <button
          aria-label="Open Live Agent"
          className="group flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full text-white font-semibold text-sm shadow-[0_12px_30px_-8px_rgba(220,28,46,0.55)] hover:shadow-[0_18px_40px_-8px_rgba(220,28,46,0.7)] transition-all"
          style={{ backgroundColor: REMAX_RED }}
        >
          <span className="relative w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
            <Phone className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-[#DC1C2E] animate-pulse" />
          </span>
          Live Agent
        </button>
      </AnalystCard>
    </div>
  );
};

export default FloatingLiveAgent;
