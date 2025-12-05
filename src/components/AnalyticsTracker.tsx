import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const trackEvent = (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  };

  const trackKeyEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        // Mark as key event (conversion)
        send_to: 'G-BLCCLEJ3M0',
      });
    }
  };

  // Predefined tracking functions for common conversions
  const trackLeadFormSubmission = (formType: string, location?: string) => {
    trackKeyEvent('generate_lead', {
      event_category: 'Lead Generation',
      event_label: formType,
      location: location,
      value: 100, // Estimated lead value
    });
  };

  const trackPhoneClick = (source: string) => {
    trackKeyEvent('phone_call_intent', {
      event_category: 'Contact',
      event_label: `Phone Click - ${source}`,
      value: 50, // Estimated phone inquiry value
    });
  };

  const trackEmailClick = (source: string) => {
    trackKeyEvent('email_intent', {
      event_category: 'Contact',
      event_label: `Email Click - ${source}`,
      value: 25, // Estimated email inquiry value
    });
  };

  const trackHighValueEngagement = (pageTitle: string, timeSpent: number) => {
    if (timeSpent >= 60) { // 60+ seconds = high engagement
      trackKeyEvent('high_engagement', {
        event_category: 'Engagement',
        event_label: pageTitle,
        engagement_time: timeSpent,
        value: 10,
      });
    }
  };

  const trackPropertyInquiry = (propertyType: string, location: string) => {
    trackKeyEvent('property_inquiry', {
      event_category: 'Property Interest',
      event_label: `${propertyType} - ${location}`,
      value: 75,
    });
  };

  const trackCalendarBooking = (meetingType: string) => {
    trackKeyEvent('schedule_consultation', {
      event_category: 'Lead Generation',
      event_label: meetingType,
      value: 150, // High value for scheduled meetings
    });
  };

  const trackDocumentDownload = (documentName: string) => {
    trackKeyEvent('document_download', {
      event_category: 'Content Engagement',
      event_label: documentName,
      value: 20,
    });
  };

  const trackChartInteraction = (action: string, location: string, metadata?: Record<string, any>) => {
    trackKeyEvent('chart_interaction', {
      event_category: 'Market Data Engagement',
      event_label: `${action} - ${location}`,
      ...metadata,
      value: 30,
    });
  };

  return {
    trackEvent,
    trackKeyEvent,
    trackLeadFormSubmission,
    trackPhoneClick,
    trackEmailClick,
    trackHighValueEngagement,
    trackPropertyInquiry,
    trackCalendarBooking,
    trackDocumentDownload,
    trackChartInteraction,
  };
};

// High-value page engagement tracker
export const EngagementTracker = ({ pageTitle }: { pageTitle: string }) => {
  const { trackHighValueEngagement } = useAnalytics();

  useEffect(() => {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackHighValueEngagement(pageTitle, timeSpent);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackHighValueEngagement(pageTitle, timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pageTitle, trackHighValueEngagement]);

  return null;
};

export default EngagementTracker;