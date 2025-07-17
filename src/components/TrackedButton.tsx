import React from 'react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from './AnalyticsTracker';

interface TrackedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  trackingType: 'phone' | 'email' | 'form' | 'calendar' | 'document';
  trackingLabel: string;
  href?: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const TrackedButton: React.FC<TrackedButtonProps> = ({
  children,
  onClick,
  trackingType,
  trackingLabel,
  href,
  className,
  variant = 'default',
  size = 'default',
}) => {
  const { 
    trackPhoneClick, 
    trackEmailClick, 
    trackCalendarBooking,
    trackDocumentDownload,
    trackEvent 
  } = useAnalytics();

  const handleClick = () => {
    // Track the specific event based on type
    switch (trackingType) {
      case 'phone':
        trackPhoneClick(trackingLabel);
        break;
      case 'email':
        trackEmailClick(trackingLabel);
        break;
      case 'calendar':
        trackCalendarBooking(trackingLabel);
        break;
      case 'document':
        trackDocumentDownload(trackingLabel);
        break;
      case 'form':
        trackEvent({
          action: 'form_interaction',
          category: 'Lead Generation',
          label: trackingLabel,
          value: 50,
        });
        break;
    }

    // Execute the original onClick if provided
    if (onClick) {
      onClick();
    }

    // Handle href navigation
    if (href) {
      if (trackingType === 'phone' && href.startsWith('tel:')) {
        // Phone links are handled by the phone tracker
        window.location.href = href;
      } else if (trackingType === 'email' && href.startsWith('mailto:')) {
        // Email links are handled by the email tracker
        window.location.href = href;
      } else {
        // External links
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
    >
      {children}
    </Button>
  );
};

export default TrackedButton;