import { supabase } from "@/integrations/supabase/client";
import { isLikelyBot } from "@/lib/botDetection";

/**
 * First-party engagement logging (schema v2).
 *
 * Writes go through the `record-engagement` Edge Function — the browser has NO
 * direct INSERT privilege on `engagement_events` any more. The function
 * validates, sanitizes, classifies traffic, rate-limits, and inserts
 * idempotently with the service role.
 *
 * Client-side rules enforced here:
 *   - never blocks the user's action (fire-and-forget, errors swallowed)
 *   - never logs payloads to the console
 *   - never sends raw search text, form content, addresses, or contact details
 *   - one human action = one event_id (reused across retries and React
 *     Strict Mode double-effects)
 */

const REGION_SLUG = "capital-district";
const SCHEMA_VERSION = 2;

/** Regenerated on every real page load; used to scope view-event dedupe keys. */
const LOAD_ID =
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Math.random());

/**
 * Events fired from a mount/effect rather than a click. These MUST carry a
 * deterministic dedupe key so React Strict Mode's double-invoked effects (and
 * any remount) reuse one event_id and collapse to a single row server-side.
 */
const MOUNT_EVENTS = new Set([
  "town_page_view",
  "intelligence_report_view",
  "business_profile_view",
  "claim_started",
]);


/** dedupeKey -> event_id, so a repeated effect reuses the same id. */
const eventIdByKey = new Map<string, string>();
/** event_ids already accepted by the server (skip re-delivery). */
const delivered = new Set<string>();

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export type EngagementSubject = {
  business_id?: string | null;
  business_slug?: string | null;
};

export type EngagementDimensions = {
  town_slug?: string | null;
  service_slug?: string | null;
  result_count?: number | null;
  /** Optional explicit dedupe key (page views, retried submits). */
  dedupe_key?: string;
};

const isUuid = (v?: string | null) =>
  !!v && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

const slugify = (v?: string | null) =>
  v ? v.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) : null;

/** Strip query strings and fragments before anything leaves the browser. */
const safePath = () =>
  typeof window === "undefined" ? null : window.location.pathname.split("?")[0].split("#")[0];

/** Host only — never the full referrer URL. */
const referrerHost = () => {
  if (typeof document === "undefined" || !document.referrer) return null;
  try {
    return new URL(document.referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export function logEngagement(
  eventType: string,
  subject: EngagementSubject = {},
  metadata: Record<string, unknown> = {},
  dimensions: EngagementDimensions = {},
): void {
  if (typeof window === "undefined") return;
  if (!eventType) return;

  const dedupeKey =
    dimensions.dedupe_key ??
    (MOUNT_EVENTS.has(eventType)
      ? `${eventType}|${subject.business_slug || subject.business_id || ""}|${safePath()}|${LOAD_ID}`
      : undefined);

  let eventId: string;
  if (dedupeKey) {
    const existing = eventIdByKey.get(dedupeKey);
    if (existing && delivered.has(existing)) return; // already recorded this action
    eventId = existing ?? newId();
    eventIdByKey.set(dedupeKey, eventId);
  } else {
    eventId = newId();
  }

  const payload = {
    event_id: eventId,
    event_type: eventType,
    event_schema_version: SCHEMA_VERSION,
    region_slug: REGION_SLUG,
    business_id: isUuid(subject.business_id) ? subject.business_id : null,
    business_slug: subject.business_slug || null,
    town_slug: slugify(dimensions.town_slug),
    service_slug: slugify(dimensions.service_slug),
    route_path: safePath(),
    result_count:
      typeof dimensions.result_count === "number" ? dimensions.result_count : null,
    referrer_host: referrerHost(),
    // Signal only — the server makes the final traffic_class decision.
    client_bot_signal: isLikelyBot(),
    metadata,
  };

  void supabase.functions
    .invoke("record-engagement", { body: payload })
    .then(
      () => {
        delivered.add(eventId);
      },
      () => undefined,
    );
}

/**
 * Deliberately unexported helper contract:
 *   `user_agent` and `referrer` columns on engagement_events are DEPRECATED
 *   (schema v1) and are never written by this module.
 */
