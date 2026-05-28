import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isLikelyBot } from '@/lib/botDetection';

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
 * Use these throughout the app to track important user actions.
 * All custom events are suppressed for likely-bot sessions so GA4
 * conversions reflect real human interactions only.
 */

export const trackGAEvent = {
  // Town page views
  townPageView: (townName: string) => {
    if (isLikelyBot()) return;
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
    if (isLikelyBot()) return;
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
    if (isLikelyBot()) return;
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
    if (isLikelyBot()) return;
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'chat_open', {
        event_category: 'Engagement',
        event_label: source,
      });
    }
  },

  // Contact form submissions
  contactFormSubmit: (formType: string, location?: string) => {
    if (isLikelyBot()) return;
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_form_submit', {
        event_category: 'Lead Generation',
        event_label: formType,
        form_location: location,
      });
    }
  },

  // ─── Active-interaction events (must only fire on real user clicks) ───
  // Use these from onClick handlers — never from useEffect/mount.
  businessProfileOpen: (slug: string, town?: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'business_profile_open', {
      event_category: 'Local Directory', business_slug: slug, town_name: town,
    });
  },
  businessContactOpen: (slug: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'business_contact_open', {
      event_category: 'Local Directory', business_slug: slug,
    });
  },
  callClick: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'call_click', { event_category: 'Contact', event_label: source });
  },
  textClick: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'text_click', { event_category: 'Contact', event_label: source });
  },
  emailClick: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'email_click', { event_category: 'Contact', event_label: source });
  },
  websiteClick: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'website_click', { event_category: 'Outbound', event_label: source });
  },
  claimProfileClick: (slug?: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'claim_profile_click', { event_category: 'Conversion', business_slug: slug });
  },
  pricingClick: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'pricing_click', { event_category: 'Conversion', event_label: source });
  },
  mediaStoryClick: (headline: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'media_story_click', { event_category: 'Media Pulse', event_label: headline });
  },
  videoCoverageClick: (headline: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'video_coverage_click', { event_category: 'Media Pulse', event_label: headline });
  },
  newsletterSignup: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'newsletter_signup', { event_category: 'Conversion', event_label: source });
  },
  financialIntroSubmit: (source: string) => {
    if (isLikelyBot()) return;
    window.gtag?.('event', 'financial_intro_submit', { event_category: 'Conversion', event_label: source });
  },
  searchSubmit: (query: string, scope?: string) => {
    if (isLikelyBot()) return;
    if (!query || query.trim().length < 2) return;
    window.gtag?.('event', 'search_submit', {
      event_category: 'Search', event_label: scope ?? 'global', search_term: query.trim().slice(0, 80),
    });
  },
};

export default GARouteTracker;
