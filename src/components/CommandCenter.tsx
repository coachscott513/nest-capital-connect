import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, X } from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  // Listen for external open events
  useEffect(() => {
    const handleOpenCommand = () => setIsActive(true);
    window.addEventListener('openCommandCenter', handleOpenCommand);
    return () => window.removeEventListener('openCommandCenter', handleOpenCommand);
  }, []);

  const contactOptions = [
    {
      label: "Call Live Agent",
      subtitle: "Speak to a human",
      href: "tel:+15186762347",
      icon: <Phone className="w-6 h-6" />,
      bgColor: "bg-primary",
      textColor: "text-primary-foreground",
    },
    {
      label: "Text the Team",
      subtitle: "Avg response: 2 min",
      href: "sms:+15186762347",
      icon: <MessageCircle className="w-6 h-6" />,
      bgColor: "bg-[#0088CC]",
      textColor: "text-white",
    },
    {
      label: "Email Us",
      subtitle: "scott@capitaldistrictnest.com",
      href: "mailto:scott@capitaldistrictnest.com",
      icon: <Mail className="w-6 h-6" />,
      bgColor: "bg-muted",
      textColor: "text-foreground",
    },
    {
      label: "WhatsApp Scott",
      subtitle: "Chat on WhatsApp",
      href: "https://wa.me/15186762347",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      bgColor: "bg-[#25D366]",
      textColor: "text-white",
    },
  ];

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-manrope"
    >
      {/* Speed Dial Options */}
      <div 
        className={`mb-4 flex flex-col gap-3 transition-all duration-300 ease-out ${
          isActive 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-5 pointer-events-none'
        }`}
      >
        {contactOptions.map((option, index) => (
          <a 
            key={option.label}
            href={option.href}
            target={option.href.startsWith("http") ? "_blank" : undefined}
            rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="bg-card border border-border px-5 py-4 rounded-xl flex items-center gap-4 w-[280px] no-underline text-foreground transition-all duration-200 hover:-translate-x-2 hover:border-primary hover:shadow-lg"
            style={{ 
              animationDelay: `${index * 50}ms`,
            }}
          >
            <div className={`${option.bgColor} ${option.textColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
              {option.icon}
            </div>
            <div>
              <div className="font-bold text-base mb-0.5">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.subtitle}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Main FAB Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`border-none px-5 h-14 rounded-full font-bold text-sm cursor-pointer shadow-[0_10px_30px_rgba(16,185,129,0.4)] transition-all duration-200 flex items-center gap-2 hover:scale-105 ${
          isActive 
            ? 'bg-card border border-border text-foreground' 
            : 'bg-primary text-primary-foreground'
        }`}
        aria-label={isActive ? "Close contact menu" : "Open contact menu"}
      >
        {isActive ? (
          <>
            <X className="w-5 h-5" />
            <span>Close</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
            <span>Live Agent</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CommandCenter;
