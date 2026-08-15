import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isLikelyBot } from '@/lib/botDetection';
import { logEngagement } from '@/lib/engagement';
import { resolveSearchIntent } from '@/lib/searchIntent';


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
  result_count?: number;
};
type SourcePayload = { source_location?: string; email_domain?: string; page_path?: string };
type FinancePayload = { product_type?: string; source_location?: string; page_path?: string };
type ClaimPayload = {
  business_id?: string;
  business_slug?: string;
  town?: string;
  source_location?: string;
  claim_step?: string;
};

/* ------------------------------------------------------------------
   Two sinks, two contracts.

   GA4 keeps its existing payloads unchanged (including search_term).
   The first-party sink (engagement_events) receives ONLY the explicitly
   passed, privacy-safe dimensions below — never raw search text, form
   content, addresses, emails, phones, or names.
   ------------------------------------------------------------------ */

type FirstParty = {
  subject?: { business_id?: string | null; business_slug?: string | null };
  metadata?: Record<string, unknown>;
  dimensions?: {
    town_slug?: string | null;
    service_slug?: string | null;
    result_count?: number | null;
    dedupe_key?: string;
  };
};

const send = (name: string, params: Record<string, unknown>, fp?: FirstParty) => {
  // First-party: always attempted. Bot / internal-test classification is made
  // server-side in the record-engagement function, not trusted from here.
  logEngagement(name, fp?.subject ?? {}, fp?.metadata ?? {}, fp?.dimensions ?? {});

  if (isLikelyBot()) return;
  // Strip undefined keys — GA4 doesn't like them.
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") clean[k] = v;
  }
  if (typeof window === "undefined" || !window.gtag) return;
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

/** Privacy-safe first-party projection of a business payload. */
const bizFirstParty = (p: BizPayload): FirstParty => ({
  subject: { business_id: p.business_id ?? null, business_slug: p.business_slug ?? null },
  metadata: {
    business_category: p.category,
    tier: p.tier,
    source_location: p.source_location,
  },
  dimensions: { town_slug: p.town ?? null },
});

/* --------------------------- search classification ---------------------------
   The raw query is interpreted transiently and NEVER persisted — not even as a
   hash. Only coarse, non-reversible dimensions leave this function.
------------------------------------------------------------------------------ */

const PII_RE = /@|\b\+?\d[\d\s().-]{6,}\b|\b\d{1,6}\s+\w+\s+(st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|ct|court|way|pl|place)\b/i;

const lengthBucket = (n: number) => (n <= 10 ? "short" : n <= 25 ? "medium" : "long");

export type SafeSearchDimensions = {
  intent_type: string;
  category_slug?: string;
  town_slug?: string;
  query_length_bucket: string;
};

const classifySearch = (raw: string, town?: string, category?: string): SafeSearchDimensions => {
  const q = (raw || "").trim();
  const base = { query_length_bucket: lengthBucket(q.length) };
  if (!q || PII_RE.test(q)) {
    return { intent_type: "unclassified", ...base };
  }
  let intent_type = "unknown";
  let derivedTown: string | undefined;
  let derivedCategory: string | undefined;
  try {
    const result = resolveSearchIntent(q);
    intent_type = result.type || "unknown";
    derivedTown = result.town?.slug;
    derivedCategory = result.category;
  } catch {
    intent_type = "unclassified";
  }
  return {
    intent_type,
    category_slug: category || derivedCategory,
    town_slug: town || derivedTown,
    ...base,
  };
};

export const trackGAEvent = {
  // Town page views
  townPageView: (townName: string) =>
    send(
      "town_page_view",
      { event_category: "Town Intelligence", event_label: townName, town_name: townName },
      { dimensions: { town_slug: townName } },
    ),

  // Continue search clicks
  continueSearchClick: (searchType: string, townName: string) =>
    send(
      "continue_search_click",
      {
        event_category: "Navigation",
        event_label: `${searchType} - ${townName}`,
        search_type: searchType,
        town_name: townName,
      },
      { metadata: { search_type: searchType }, dimensions: { town_slug: townName } },
    ),

  intelligenceReportView: (reportName: string, address?: string) =>
    send(
      "intelligence_report_view",
      {
        event_category: "Property Intelligence",
        event_label: reportName,
        property_address: address,
      },
      // NOTE: property_address is deliberately NOT forwarded first-party.
      { metadata: { report_type: reportName } },
    ),

  chatOpen: (source: string) =>
    send(
      "chat_open",
      { event_category: "Engagement", event_label: source },
      { metadata: { source_location: source } },
    ),

  /** Records that a contact form was submitted — never its content. */
  contactFormSubmit: (formType: string, location?: string, success = true) =>
    send(
      "contact_form_submit",
      { event_category: "Lead Generation", event_label: formType, form_location: location },
      {
        metadata: {
          intent_category: formType,
          form_location: location,
          success,
        },
      },
    ),

  // ─── Active-interaction events (must only fire on real user clicks) ───

  /** Fires only after a real business row has resolved from the database. */
  businessProfileView: (p: BizPayload) =>
    p.business_id
      ? send("business_profile_view", bizParams(p), bizFirstParty(p))
      : undefined,

  businessProfileOpen: (p: BizPayload | string, town?: string) => {
    const b = normBiz(p, town);
    send("business_profile_open", bizParams(b), bizFirstParty(b));
  },

  businessContactOpen: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("business_contact_open", bizParams(b), bizFirstParty(b));
  },

  callClick: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("call_click", { ...bizParams(b), event_category: "Contact" }, bizFirstParty(b));
  },

  textClick: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("text_click", { ...bizParams(b), event_category: "Contact" }, bizFirstParty(b));
  },

  emailClick: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("email_click", { ...bizParams(b), event_category: "Contact" }, bizFirstParty(b));
  },

  websiteClick: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("website_click", { ...bizParams(b), event_category: "Outbound" }, bizFirstParty(b));
  },

  directionsClick: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("directions_click", { ...bizParams(b), event_category: "Outbound" }, bizFirstParty(b));
  },

  /** Intent only — never treat this as a completed claim. */
  claimProfileClick: (p: BizPayload | string) => {
    const b = normBiz(p);
    send("claim_profile_click", { ...bizParams(b), event_category: "Conversion" }, bizFirstParty(b));
  },

  claimStarted: (p: ClaimPayload = {}) =>
    send(
      "claim_started",
      {
        event_category: "Conversion",
        event_label: p.business_slug || p.source_location,
        business_id: p.business_id,
        business_slug: p.business_slug,
      },
      {
        subject: { business_id: p.business_id ?? null, business_slug: p.business_slug ?? null },
        metadata: { source_location: p.source_location, claim_step: p.claim_step || "started" },
        dimensions: { town_slug: p.town ?? null },
      },
    ),

  claimSubmitted: (p: ClaimPayload = {}) =>
    send(
      "claim_submitted",
      {
        event_category: "Conversion",
        event_label: p.business_slug || p.source_location,
        business_id: p.business_id,
        business_slug: p.business_slug,
      },
      {
        subject: { business_id: p.business_id ?? null, business_slug: p.business_slug ?? null },
        metadata: { source_location: p.source_location, claim_step: "submitted", success: true },
        dimensions: { town_slug: p.town ?? null },
      },
    ),

  pricingClick: (p: SourcePayload | string) => {
    const payload = typeof p === "string" ? { source_location: p } : p;
    send(
      "pricing_click",
      {
        event_category: "Conversion",
        event_label: payload.source_location,
        source_location: payload.source_location,
      },
      { metadata: { source_location: payload.source_location } },
    );
  },

  mediaStoryClick: (p: MediaPayload | string) => {
    const payload = typeof p === "string" ? { headline: p } : p;
    send(
      "media_story_click",
      { event_category: "Media Pulse", event_label: payload.headline, ...payload },
      {
        metadata: {
          story_id: payload.story_id,
          story_category: payload.category,
          has_video: payload.has_video,
          video_provider: payload.video_provider,
        },
        dimensions: { town_slug: payload.town ?? null },
      },
    );
  },

  videoCoverageClick: (p: MediaPayload | string) => {
    const payload = typeof p === "string" ? { headline: p } : p;
    send(
      "video_coverage_click",
      { event_category: "Media Pulse", event_label: payload.headline, ...payload },
      {
        metadata: {
          story_id: payload.story_id,
          story_category: payload.category,
          has_video: true,
          video_provider: payload.video_provider,
        },
        dimensions: { town_slug: payload.town ?? null },
      },
    );
  },

  newsletterSignup: (p: SourcePayload | string) => {
    const payload = typeof p === "string" ? { source_location: p } : p;
    send(
      "newsletter_signup",
      {
        event_category: "Conversion",
        event_label: payload.source_location,
        source_location: payload.source_location,
      },
      // email_domain is intentionally not forwarded first-party.
      { metadata: { source_location: payload.source_location, success: true } },
    );
  },

  financialIntroSubmit: (p: FinancePayload | string) => {
    const payload = typeof p === "string" ? { source_location: p } : p;
    send(
      "financial_intro_submit",
      {
        event_category: "Conversion",
        event_label: payload.product_type || payload.source_location,
        ...payload,
      },
      {
        metadata: {
          product_type: payload.product_type,
          source_location: payload.source_location,
          success: true,
        },
      },
    );
  },

  searchSubmit: (p: SearchPayload | string, scope?: string) => {
    const payload =
      typeof p === "string" ? { query: p, source_location: scope } : p;
    const q = (payload.query || "").trim();
    if (q.length < 2) return;
    const safe = classifySearch(q, payload.town, payload.category);
    send(
      "search_submit",
      {
        event_category: "Search",
        event_label: payload.source_location || scope || "global",
        search_term: q.slice(0, 80), // GA4 only — never persisted first-party
        town: payload.town,
        business_category: payload.category,
        source_location: payload.source_location || scope,
      },
      {
        metadata: {
          intent_type: safe.intent_type,
          category_slug: safe.category_slug,
          query_length_bucket: safe.query_length_bucket,
          source_location: payload.source_location || scope,
        },
        dimensions: {
          town_slug: safe.town_slug ?? null,
          result_count:
            typeof payload.result_count === "number" ? payload.result_count : null,
        },
      },
    );
  },

  /** Fired at the real no-results state so unmet demand is measurable. */
  searchZeroResult: (p: SearchPayload | string, scope?: string) => {
    const payload = typeof p === "string" ? { query: p, source_location: scope } : p;
    const q = (payload.query || "").trim();
    if (q.length < 2) return;
    const safe = classifySearch(q, payload.town, payload.category);
    send(
      "search_zero_result",
      {
        event_category: "Search",
        event_label: payload.source_location || scope || "global",
        search_term: q.slice(0, 80),
        town: payload.town,
        business_category: payload.category,
      },
      {
        metadata: {
          intent_type: safe.intent_type,
          category_slug: safe.category_slug,
          query_length_bucket: safe.query_length_bucket,
          zero_result: true,
          source_location: payload.source_location || scope,
        },
        dimensions: {
          town_slug: safe.town_slug ?? null,
          result_count: 0,
          // Dedupe key stays in the browser (never sent). It makes a settled
          // zero-result query idempotent under Strict Mode while still allowing
          // a genuinely different query to record its own demand signal.
          dedupe_key: `search_zero_result|${q.toLowerCase()}|${safe.town_slug ?? ""}|${safe.category_slug ?? ""}`,
        },
      },
    );
  },
};


export default GARouteTracker;

