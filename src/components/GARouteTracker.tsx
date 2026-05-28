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
 *
 * Each helper accepts a structured payload OR a legacy string for
 * back-compat. Payloads are normalized + scrubbed before sending.
 */

type BizPayload = {
  business_id?: string;
  business_slug?: string;
  business_name?: string;
  category?: string;
  town?: string;
  tier?: string;
  source_location?: string;
};
type MediaPayload = {
  story_id?: string;
  headline?: string;
  category?: string;
  town?: string;
  source_name?: string;
  has_video?: boolean;
  video_provider?: string;
};
type SearchPayload = {
  query: string;
  town?: string;
  category?: string;
  source_location?: string;
};
type SourcePayload = { source_location?: string; email_domain?: string; page_path?: string };
type FinancePayload = { product_type?: string; source_location?: string; page_path?: string };


const send = (name: string, params: Record<string, unknown>) => {
  if (isLikelyBot()) return;
  if (typeof window === "undefined" || !window.gtag) return;
  // Strip undefined keys — GA4 doesn't like them.
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") clean[k] = v;
  }
  window.gtag("event", name, clean);
};

const normBiz = (p: BizPayload | string, fallbackTown?: string): BizPayload =>
  typeof p === "string" ? { business_slug: p, town: fallbackTown } : p;

const bizParams = (p: BizPayload) => ({
  event_category: "Local Directory",
  event_label: p.business_name || p.business_slug,
  business_id: p.business_id,
  business_slug: p.business_slug,
  business_name: p.business_name,
  business_category: p.category,
  town_name: p.town,
  tier: p.tier,
  source_location: p.source_location,
});

export const trackGAEvent = {
  // Town page views
  townPageView: (townName: string) =>
    send("town_page_view", {
      event_category: "Town Intelligence",
      event_label: townName,
      town_name: townName,
    }),

  // Continue search clicks
  continueSearchClick: (searchType: string, townName: string) =>
    send("continue_search_click", {
      event_category: "Navigation",
      event_label: `${searchType} - ${townName}`,
      search_type: searchType,
      town_name: townName,
    }),

  intelligenceReportView: (reportName: string, address?: string) =>
    send("intelligence_report_view", {
      event_category: "Property Intelligence",
      event_label: reportName,
      property_address: address,
    }),

  chatOpen: (source: string) =>
    send("chat_open", { event_category: "Engagement", event_label: source }),

  contactFormSubmit: (formType: string, location?: string) =>
    send("contact_form_submit", {
      event_category: "Lead Generation",
      event_label: formType,
      form_location: location,
    }),

  // ─── Active-interaction events (must only fire on real user clicks) ───
  businessProfileOpen: (p: BizPayload | string, town?: string) =>
    send("business_profile_open", bizParams(normBiz(p, town))),

  businessContactOpen: (p: BizPayload | string) =>
    send("business_contact_open", bizParams(normBiz(p))),

  callClick: (p: BizPayload | string) =>
    send("call_click", { ...bizParams(normBiz(p)), event_category: "Contact" }),

  textClick: (p: BizPayload | string) =>
    send("text_click", { ...bizParams(normBiz(p)), event_category: "Contact" }),

  emailClick: (p: BizPayload | string) =>
    send("email_click", { ...bizParams(normBiz(p)), event_category: "Contact" }),

  websiteClick: (p: BizPayload | string) =>
    send("website_click", { ...bizParams(normBiz(p)), event_category: "Outbound" }),

  directionsClick: (p: BizPayload | string) =>
    send("directions_click", { ...bizParams(normBiz(p)), event_category: "Outbound" }),

  claimProfileClick: (p: BizPayload | string) =>
    send("claim_profile_click", {
      ...bizParams(normBiz(p)),
      event_category: "Conversion",
    }),

  pricingClick: (p: SourcePayload | string) => {
    const payload = typeof p === "string" ? { source_location: p } : p;
    send("pricing_click", {
      event_category: "Conversion",
      event_label: payload.source_location,
      source_location: payload.source_location,
    });
  },

  mediaStoryClick: (p: MediaPayload | string) => {
    const payload = typeof p === "string" ? { headline: p } : p;
    send("media_story_click", {
      event_category: "Media Pulse",
      event_label: payload.headline,
      ...payload,
    });
  },

  videoCoverageClick: (p: MediaPayload | string) => {
    const payload = typeof p === "string" ? { headline: p } : p;
    send("video_coverage_click", {
      event_category: "Media Pulse",
      event_label: payload.headline,
      ...payload,
    });
  },

  newsletterSignup: (p: SourcePayload | string) => {
    const payload = typeof p === "string" ? { source_location: p } : p;
    send("newsletter_signup", {
      event_category: "Conversion",
      event_label: payload.source_location,
      source_location: payload.source_location,
    });
  },

  financialIntroSubmit: (p: FinancePayload | string) => {
    const payload = typeof p === "string" ? { source_location: p } : p;
    send("financial_intro_submit", {
      event_category: "Conversion",
      event_label: payload.product_type || payload.source_location,
      ...payload,
    });
  },

  searchSubmit: (p: SearchPayload | string, scope?: string) => {
    const payload =
      typeof p === "string" ? { query: p, source_location: scope } : p;
    const q = (payload.query || "").trim();
    if (q.length < 2) return;
    send("search_submit", {
      event_category: "Search",
      event_label: payload.source_location || scope || "global",
      search_term: q.slice(0, 80),
      town: payload.town,
      business_category: payload.category,
      source_location: payload.source_location || scope,
    });
  },
};

export default GARouteTracker;

