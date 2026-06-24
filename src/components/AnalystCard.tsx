import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Phone, MessageCircle, Mail, Calendar } from 'lucide-react';

/**
 * AnalystCard — Capital District Nest Local Concierge modal.
 * Neutral platform identity. Dark premium surface, teal accents,
 * red reserved strictly for the Call CTA.
 */

const PHONE_NUMBER = '5185227265';
const FORMATTED_PHONE = '(518) 522-7265';
const EMAIL = 'team@capitaldistrictnest.com';
const SMS_BODY = "Hi Capital District Nest, I have a question about a local listing.";

const RED_CALL = '#DC1C2E';   // strict: call button only
const TEAL = '#0d6e66';        // primary brand
const TEAL_BRIGHT = '#5eead4'; // on-dark accent
const CHARCOAL = '#0e0f12';    // dark surfaces
const SURFACE = '#1E2230';     // card surface on dark
const HAIRLINE = '#2D3748';    // hairline border on dark

interface AnalystCardProps {
  title?: string;
  description?: string;
  contextualDisclaimer?: string;
  /** kept for backward compat; visual style is now consistent */
  accentColor?: 'amber' | 'primary' | 'emerald' | 'orange' | 'green' | 'violet';
  children?: React.ReactNode;
}

const AnalystCard: React.FC<AnalystCardProps> = ({
  title = "Capital District Nest Local Concierge",
  description = "Questions about Capital District Nest, local search, business profiles, or partner placements? Contact our local concierge.",
  contextualDisclaimer,
  children,
}) => {
  const trigger = children ?? (
    <button
      className="group w-full text-left rounded-2xl bg-white border border-border p-7 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 relative tracking-wider"
          style={{ backgroundColor: TEAL }}
        >
          CDN
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent
        side="right"
        className="p-0 w-full sm:max-w-[440px] border-l-0 text-white"
        style={{ background: CHARCOAL }}
      >
        {/* Branded header band */}
        <div
          className="relative px-6 pt-8 pb-6"
          style={{ background: `linear-gradient(135deg, ${CHARCOAL} 0%, #1a1c22 100%)` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ring-4 ring-white/10 tracking-wider"
              style={{ backgroundColor: TEAL }}
            >
              CDN
            </div>
            <div className="leading-tight pt-1">
              <p className="text-xl font-bold tracking-tight text-white">{title}</p>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{description}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Online · usually replies in minutes
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="px-5 py-6 space-y-3">
          {/* Call — ONLY surface allowed to use red */}
          <a
            href={`tel:+1${PHONE_NUMBER}`}
            className="flex items-center gap-4 p-4 rounded-2xl text-white shadow-[0_10px_30px_-12px_rgba(220,28,46,0.6)] transition-transform active:scale-[0.99]"
            style={{ backgroundColor: RED_CALL }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Call Capital District Nest</p>
              <p className="text-sm text-white/95">{FORMATTED_PHONE}</p>
            </div>
          </a>

          {/* Text */}
          <a
            href={`sms:+1${PHONE_NUMBER}?body=${encodeURIComponent(SMS_BODY)}`}
            className="flex items-center gap-4 p-4 rounded-2xl transition hover:border-white/25"
            style={{ backgroundColor: SURFACE, border: `1px solid ${HAIRLINE}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(94,234,212,0.12)' }}
            >
              <MessageCircle className="w-5 h-5" style={{ color: TEAL_BRIGHT }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Text Us</p>
              <p className="text-sm text-white/75">Quick SMS conversation</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}?subject=Capital%20District%20Nest%20inquiry`}
            className="flex items-center gap-4 p-4 rounded-2xl transition hover:border-white/25"
            style={{ backgroundColor: SURFACE, border: `1px solid ${HAIRLINE}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'rgba(94,234,212,0.12)' }}
            >
              <Mail className="w-5 h-5" style={{ color: TEAL_BRIGHT }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white">Email the Team</p>
              <p className="text-sm text-white/75 truncate">{EMAIL}</p>
            </div>
          </a>

          {/* Schedule */}
          <a
            href={`mailto:${EMAIL}?subject=Schedule%20a%20call%20with%20Capital%20District%20Nest`}
            className="flex items-center gap-4 p-4 rounded-2xl text-white transition hover:bg-white/[0.06]"
            style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: `1px solid ${HAIRLINE}` }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Schedule a Call</p>
              <p className="text-sm text-white/75">Pick a time that works for you</p>
            </div>
          </a>
        </div>

        <p className="px-6 pb-6 text-xs text-center text-white/55 leading-relaxed">
          {contextualDisclaimer ? `${contextualDisclaimer} ` : ""}
          Capital District Nest is a local discovery, directory, and advertising platform.
        </p>
      </SheetContent>
    </Sheet>
  );
};

export default AnalystCard;
