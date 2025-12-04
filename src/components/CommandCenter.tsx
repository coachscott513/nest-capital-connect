import React, { useState } from 'react';
import { TrackedButton } from './TrackedButton';

export const CommandCenter: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 flex flex-col items-end font-manrope ${isActive ? 'active' : ''}`}
    >
      {/* Pop-up Options */}
      <div 
        className={`mb-4 flex flex-col gap-3 transition-all duration-300 ease-out ${
          isActive 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        <a 
          href="sms:+15189282020?body=Hi%20Capital%20District%20Nest%2C%20I'm%20interested%20in%20an%20investment%20property."
          className="bg-card border border-border px-5 py-4 rounded-xl flex items-center justify-between w-[260px] no-underline text-foreground transition-all duration-200 hover:-translate-x-1 hover:border-primary"
        >
          <div>
            <div className="font-bold text-base mb-0.5">Text the Team</div>
            <div className="text-sm text-muted-foreground">Avg response: 2 min</div>
          </div>
          <div className="text-2xl">💬</div>
        </a>

        <a 
          href="tel:+15189282020"
          className="bg-card border border-border px-5 py-4 rounded-xl flex items-center justify-between w-[260px] no-underline text-foreground transition-all duration-200 hover:-translate-x-1 hover:border-primary"
        >
          <div>
            <div className="font-bold text-base mb-0.5">Call Live Agent</div>
            <div className="text-sm text-muted-foreground">Speak to a human</div>
          </div>
          <div className="text-2xl">📞</div>
        </a>
      </div>

      {/* Main FAB Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`border-none px-8 py-4 rounded-full font-extrabold text-base cursor-pointer shadow-[0_10px_30px_rgba(0,200,5,0.3)] transition-all duration-200 flex items-center justify-center hover:scale-105 ${
          isActive 
            ? 'bg-white text-black hover:bg-gray-100' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {isActive ? (
          <span>Close ✕</span>
        ) : (
          <span className="flex items-center">
            <span className="mr-2 text-xs">●</span> Live Agent
          </span>
        )}
      </button>
    </div>
  );
};

export default CommandCenter;
