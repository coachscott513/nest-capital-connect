import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Search, Building2, Phone, MessageSquare, CalendarPlus, X,
} from 'lucide-react';

/**
 * MobileCtaBar — single compact floating dark-glass action button (mobile only).
 * Tap to open a dark-glass action hub. No bright blue, no IDX-style 3-tab bar.
 * Brand-locked: onyx + teal. Red is reserved for the actual Call icon only.
 */
const MobileCtaBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const items: Array<{
    label: string;
    sub: string;
    icon: typeof Search;
    href?: string;
    to?: string;
    iconColor?: string;
  }> = [
    { label: 'Search Local Directory',     sub: 'Businesses, towns, services',         icon: Search,        to: '/local' },
    { label: 'Stream a Business Special',  sub: 'Featured + DealDesk submissions',     icon: Building2,     to: '/claim-business' },
    { label: 'Connect with an Agent',      sub: 'Scott Alvarez, Licensed Real Estate Salesperson',    icon: Phone,         href: 'tel:+15185227265', iconColor: '#DC1C2E' },
    { label: 'Submit a Town Event',        sub: 'Add to this week\u2019s pulse',         icon: CalendarPlus,  to: '/contact?intent=add-event' },
  ];

  return (
    <>
      {/* Floating dark-glass button (mobile only) */}
      <div className="md:hidden fixed bottom-5 right-5 z-[1000] safe-area-inset-bottom">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Ask Local menu"
          className="inline-flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full text-white text-sm font-semibold border shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] active:scale-[0.98] transition"
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            backdropFilter: 'blur(16px) saturate(140%)',
            WebkitBackdropFilter: 'blur(16px) saturate(140%)',
            borderColor: 'rgba(94,234,212,0.30)',
          }}
        >
          <span
            className="w-7 h-7 rounded-full inline-flex items-center justify-center"
            style={{ backgroundColor: '#0d6e66' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <span>Ask Local</span>
        </button>
      </div>

      {/* Dark-glass action hub */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-[1100] flex items-end"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full rounded-t-3xl border-t p-5 pb-[max(env(safe-area-inset-bottom),20px)] animate-in slide-in-from-bottom duration-300"
            style={{
              backgroundColor: 'rgba(10, 10, 10, 0.92)',
              backdropFilter: 'blur(20px) saturate(150%)',
              WebkitBackdropFilter: 'blur(20px) saturate(150%)',
              borderTopColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: '#5eead4' }}>
                  Ask Local
                </p>
                <h3 className="mt-1 text-base font-semibold text-white">How can we help?</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full border border-white/15 text-white/80 inline-flex items-center justify-center hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ul className="space-y-4">
              {items.map((it) => {
                const Icon = it.icon;
                const inner = (
                  <span className="flex items-center gap-3 w-full px-3.5 py-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.10] transition">
                    <span
                      className="w-9 h-9 rounded-full inline-flex items-center justify-center shrink-0 border border-white/10"
                      style={{ backgroundColor: 'rgba(13,110,102,0.18)' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: it.iconColor ?? '#5eead4' }} />
                    </span>
                    <span className="flex-1 min-w-0 text-left">
                      <span className="block text-[14px] font-semibold text-white truncate">{it.label}</span>
                      <span className="block text-[11.5px] text-white/55 truncate">{it.sub}</span>
                    </span>
                  </span>
                );
                return (
                  <li key={it.label}>
                    {it.to ? (
                      <Link to={it.to} onClick={() => setOpen(false)} className="block">{inner}</Link>
                    ) : (
                      <a href={it.href} onClick={() => setOpen(false)} className="block">{inner}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileCtaBar;
