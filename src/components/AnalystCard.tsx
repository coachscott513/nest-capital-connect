import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Phone, MessageCircle, Mail, Calendar, X } from 'lucide-react';

/**
 * AnalystCard — Live Agent contact modal.
 * Branded for Scott Alvarez · RE/MAX Solutions · Capital District Nest.
 *
 * Props:
 *  - children: optional custom trigger. If omitted, renders a default branded card trigger.
 */

const PHONE_NUMBER = '5185227265';
const FORMATTED_PHONE = '(518) 522-7265';
const EMAIL = 'scott@capitaldistrictnest.com';
const SMS_BODY = "Hi Scott, I'd like help with a Capital District property.";
const WA_BODY = "Hi Scott, I'd like help with a Capital District property.";

const REMAX_RED = '#DC1C2E';
const REMAX_BLUE = '#003DA5';

interface AnalystCardProps {
  title?: string;
  description?: string;
  /** kept for backward compat; visual style is now consistent */
  accentColor?: 'amber' | 'primary' | 'emerald' | 'orange' | 'green' | 'violet';
  children?: React.ReactNode;
}

const AnalystCard: React.FC<AnalystCardProps> = ({
  title = "Talk to a Local Agent",
  description = "Scott Alvarez · RE/MAX Solutions · Capital District",
  children,
}) => {
  const trigger = children ?? (
    <button
      className="group w-full text-left rounded-2xl bg-white border border-border p-7 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-shadow"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 relative"
          style={{ backgroundColor: REMAX_RED }}
        >
          SA
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
        className="p-0 w-full sm:max-w-[440px] bg-[#fafafa] border-l border-border"
      >
        {/* Branded header band */}
        <div
          className="relative px-6 pt-8 pb-6 text-white"
          style={{ background: `linear-gradient(135deg, ${REMAX_BLUE} 0%, #002a78 100%)` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shrink-0 ring-4 ring-white/20 bg-white"
              style={{ color: REMAX_RED }}
            >
              SA
            </div>
            <div className="leading-tight pt-1">
              <p className="text-xl font-bold tracking-tight">Scott Alvarez</p>
              <p className="text-sm font-semibold text-white/90">RE/MAX Solutions</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live agent · usually replies in minutes
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="px-5 py-6 space-y-3">
          {/* Call — primary RE/MAX red */}
          <a
            href={`tel:+1${PHONE_NUMBER}`}
            className="flex items-center gap-4 p-4 rounded-2xl text-white shadow-sm transition-transform active:scale-[0.99]"
            style={{ backgroundColor: REMAX_RED }}
          >
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Call now</p>
              <p className="text-sm text-white/85">{FORMATTED_PHONE}</p>
            </div>
          </a>

          {/* Text */}
          <a
            href={`sms:+1${PHONE_NUMBER}?body=${encodeURIComponent(SMS_BODY)}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border hover:border-foreground/20 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" style={{ color: REMAX_BLUE }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Text</p>
              <p className="text-sm text-muted-foreground">Quick SMS conversation</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/1${PHONE_NUMBER}?text=${encodeURIComponent(WA_BODY)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border hover:border-foreground/20 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">WhatsApp</p>
              <p className="text-sm text-muted-foreground">Chat on WhatsApp</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${EMAIL}?subject=Capital%20District%20Nest%20inquiry`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border hover:border-foreground/20 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
              <Mail className="w-5 h-5 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">Email</p>
              <p className="text-sm text-muted-foreground truncate">{EMAIL}</p>
            </div>
          </a>

          {/* Schedule */}
          <a
            href={`mailto:${EMAIL}?subject=Schedule%20a%20consultation`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-foreground text-white hover:bg-foreground/90 transition"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Schedule</p>
              <p className="text-sm text-white/75">Book a consultation</p>
            </div>
          </a>
        </div>

        <p className="px-6 pb-6 text-xs text-center text-muted-foreground">
          Capital District Nest · Powered by RE/MAX Solutions
        </p>
      </SheetContent>
    </Sheet>
  );
};

export default AnalystCard;
