import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LiveConversationButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const PHONE_NUMBER = '5186762347';
const FORMATTED_PHONE = '(518) 676-2347';

const LiveConversationButton: React.FC<LiveConversationButtonProps> = ({
  variant = 'default',
  size = 'default',
  className = '',
  showLabel = true
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <MessageCircle className="h-4 w-4" />
          {showLabel && <span className="ml-2">Start a Conversation</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a 
            href={`tel:+1${PHONE_NUMBER}`}
            className="flex items-center gap-3 cursor-pointer"
          >
            <Phone className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium">Call Now</p>
              <p className="text-xs text-muted-foreground">{FORMATTED_PHONE}</p>
            </div>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href={`sms:+1${PHONE_NUMBER}`}
            className="flex items-center gap-3 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            <div>
              <p className="font-medium">Send a Text</p>
              <p className="text-xs text-muted-foreground">{FORMATTED_PHONE}</p>
            </div>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LiveConversationButton;
