import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LiveConversationButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const PHONE_NUMBER = '5185227265';
const FORMATTED_PHONE = '(518) 522-7265';
const EMAIL = 'scott@capitaldistrictnest.com';

const REMAX_RED = '#DC1C2E';
const REMAX_BLUE = '#003DA5';

const LiveConversationButton: React.FC<LiveConversationButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  showLabel = true
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          style={variant === 'default' ? { backgroundColor: REMAX_RED, color: '#fff' } : undefined}
        >
          <MessageCircle className="h-4 w-4" />
          {showLabel && <span className="ml-2">Talk to Scott</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-2">
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: REMAX_RED }}
            >
              SA
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-sm text-foreground">Scott Alvarez</p>
              <p className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: REMAX_BLUE }}>
                RE/MAX Solutions
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href={`tel:+1${PHONE_NUMBER}`} className="flex items-center gap-3 cursor-pointer py-2">
            <Phone className="h-4 w-4 shrink-0" style={{ color: REMAX_RED }} />
            <div>
              <p className="font-medium text-sm">Call</p>
              <p className="text-xs text-muted-foreground">{FORMATTED_PHONE}</p>
            </div>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={`sms:+1${PHONE_NUMBER}`} className="flex items-center gap-3 cursor-pointer py-2">
            <MessageCircle className="h-4 w-4 shrink-0" style={{ color: REMAX_BLUE }} />
            <div>
              <p className="font-medium text-sm">Text</p>
              <p className="text-xs text-muted-foreground">{FORMATTED_PHONE}</p>
            </div>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 cursor-pointer py-2">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="font-medium text-sm">Email</p>
              <p className="text-xs text-muted-foreground truncate">{EMAIL}</p>
            </div>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LiveConversationButton;
