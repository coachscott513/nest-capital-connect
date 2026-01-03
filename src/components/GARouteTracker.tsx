import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

/**
 * GA4 Route Tracker for SPA
 * Fires page_view on every route change + provides key event tracking
 */
export const GARouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Fire page_view on every route change
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

/**
 * Key Event Tracking Functions
 * Use these throughout the app to track important user actions
 */
export const trackGAEvent = {
  // Town page views
  townPageView: (townName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'town_page_view', {
        event_category: 'Town Intelligence',
        event_label: townName,
        town_name: townName,
      });
    }
  },

  // Continue search clicks
  continueSearchClick: (searchType: string, townName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'continue_search_click', {
        event_category: 'Navigation',
        event_label: `${searchType} - ${townName}`,
        search_type: searchType,
        town_name: townName,
      });
    }
  },

  // Intelligence report views
  intelligenceReportView: (reportName: string, address?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'intelligence_report_view', {
        event_category: 'Property Intelligence',
        event_label: reportName,
        property_address: address,
      });
    }
  },

  // Chat/dialog opens
  chatOpen: (source: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_open', {
        event_category: 'Engagement',
        event_label: source,
      });
    }
  },

  // Contact form submissions
  contactFormSubmit: (formType: string, location?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_form_submit', {
        event_category: 'Lead Generation',
        event_label: formType,
        form_location: location,
      });
    }
  },
};

export default GARouteTracker;
