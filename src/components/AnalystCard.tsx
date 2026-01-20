import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const PHONE_NUMBER = '5186762347';
const FORMATTED_PHONE = '(518) 676-2347';

interface AnalystCardProps {
  title?: string;
  description?: string;
  accentColor?: 'amber' | 'primary' | 'emerald' | 'orange' | 'green' | 'violet';
}

const AnalystCard: React.FC<AnalystCardProps> = ({
  title = "Speak with an Analyst",
  description = "Get personalized guidance from our local experts",
  accentColor = 'amber'
}) => {
  const colorMap = {
    amber: {
      gradient: 'from-amber-500/20 to-amber-600/10',
      iconBg: 'bg-amber-500/10',
      iconText: 'text-amber-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]',
      borderGlow: 'hover:border-amber-500/30'
    },
    primary: {
      gradient: 'from-primary/20 to-primary/10',
      iconBg: 'bg-primary/10',
      iconText: 'text-primary',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]',
      borderGlow: 'hover:border-primary/30'
    },
    emerald: {
      gradient: 'from-emerald-500/20 to-emerald-600/10',
      iconBg: 'bg-emerald-500/10',
      iconText: 'text-emerald-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      borderGlow: 'hover:border-emerald-500/30'
    },
    orange: {
      gradient: 'from-orange-500/20 to-orange-600/10',
      iconBg: 'bg-orange-500/10',
      iconText: 'text-orange-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]',
      borderGlow: 'hover:border-orange-500/30'
    },
    green: {
      gradient: 'from-green-500/20 to-green-600/10',
      iconBg: 'bg-green-500/10',
      iconText: 'text-green-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
      borderGlow: 'hover:border-green-500/30'
    },
    violet: {
      gradient: 'from-violet-500/20 to-violet-600/10',
      iconBg: 'bg-violet-500/10',
      iconText: 'text-violet-400',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      borderGlow: 'hover:border-violet-500/30'
    }
  };

  const colors = colorMap[accentColor];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`glass-strong rounded-2xl p-8 text-left transition-all duration-300 hover:scale-[1.02] group bg-gradient-to-br ${colors.gradient} border border-transparent ${colors.borderGlow} ${colors.hoverGlow}`}
          style={{ backdropFilter: 'blur(30px)' }}
        >
          <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative`}>
            <Phone className={`w-7 h-7 ${colors.iconText}`} />
            {/* Live indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-background" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground font-light">{description}</p>
          
          {/* Hover hint */}
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Tap for instant contact options
          </div>
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="bottom" 
        className="rounded-t-3xl border-t border-border/50"
        style={{ 
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(25px)'
        }}
      >
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Live Analyst Available
          </SheetTitle>
          <p className="text-muted-foreground text-center font-light">
            Connect directly with Scott for personalized market intelligence
          </p>
        </SheetHeader>
        
        <div className="space-y-4 pb-8">
          {/* Text Option */}
          <a
            href={`sms:+1${PHONE_NUMBER}?body=Hi Scott, I'm interested in getting market analysis for a property in the Capital District.`}
            className="flex items-center gap-4 p-5 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">Text an Analyst</p>
              <p className="text-sm text-muted-foreground">Quick response • Usually within minutes</p>
            </div>
          </a>
          
          {/* Call Option */}
          <a
            href={`tel:+1${PHONE_NUMBER}`}
            className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">Call Live</p>
              <p className="text-sm text-muted-foreground">{FORMATTED_PHONE} • Available now</p>
            </div>
          </a>
          
          {/* WhatsApp Option */}
          <a
            href={`https://wa.me/1${PHONE_NUMBER}?text=Hi Scott, I'm interested in getting market analysis for a property in the Capital District.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all group"
          >
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">WhatsApp Scott</p>
              <p className="text-sm text-muted-foreground">International friendly • End-to-end encrypted</p>
            </div>
          </a>
        </div>
        
        {/* Schedule Option */}
        <div className="border-t border-border/30 pt-6">
          <Button 
            variant="outline" 
            className="w-full h-14 rounded-xl text-lg font-medium"
            onClick={() => window.open('mailto:scott@capitaldistrictnest.com?subject=Schedule%20Analysis%20Call', '_blank')}
          >
            Schedule a Consultation
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AnalystCard;
