import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, X } from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleOpenCommand = () => setIsActive(true);
    window.addEventListener('openCommandCenter', handleOpenCommand);
    return () => window.removeEventListener('openCommandCenter', handleOpenCommand);
  }, []);

  const contactOptions = [
    {
      label: "Call",
      subtitle: "Speak to a human",
      href: "tel:+15186762347",
      icon: <Phone className="w-4 h-4" />,
    },
    {
      label: "Text",
      subtitle: "Avg response: 2 min",
      href: "sms:+15186762347",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      label: "Email",
      subtitle: "scott@capitaldistrictnest.com",
      href: "mailto:scott@capitaldistrictnest.com",
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[60] hidden md:flex flex-col items-end font-manrope pointer-events-auto mb-0">
      {/* Options */}
      <div
        className={`mb-3 flex flex-col gap-2 transition-all duration-300 ease-out ${
          isActive
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {contactOptions.map((option) => (
          <a
            key={option.label}
            href={option.href}
            className="bg-background border border-border px-5 py-3.5 rounded-2xl flex items-center gap-4 w-[260px] no-underline text-foreground transition-all duration-200 hover:shadow-lg hover:-translate-x-1"
          >
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-foreground">
              {option.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{option.label}</div>
              <div className="text-xs text-muted-foreground truncate">{option.subtitle}</div>
            </div>
          </a>
        ))}
      </div>

      {/* FAB — small, glass-like */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="border border-border h-11 px-4 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md bg-background text-foreground"
        aria-label={isActive ? "Close contact menu" : "Open contact menu"}
      >
        {isActive ? (
          <>
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span>Live Help</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CommandCenter;
