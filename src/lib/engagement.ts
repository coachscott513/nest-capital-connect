import { supabase } from "@/integrations/supabase/client";
import { isLikelyBot } from "@/lib/botDetection";

/**
 * First-party engagement logging.
 *
 * GA4 tells us aggregate behaviour but we cannot query it, attribute it to a
 * specific business row, or show it to a business owner. `engagement_events`
 * is our own append-only record of real consumer actions (profile opens,
 * calls, directions, website taps, searches) so that:
 *   - owners can be shown "your profile generated N calls this month"
 *   - unmet demand (zero-result searches) is measurable per town/category
 *
 * Rules:
 *   - never blocks the UI (fire-and-forget, errors swallowed)
 *   - bot sessions are dropped so the numbers we show owners are human
 *   - no PII: no names, emails, phone numbers, or raw IPs are written here
 */

const REGION_SLUG = "capital-district";

export type EngagementSubject = {
  business_id?: string | null;
  business_slug?: string | null;
};

export function logEngagement(
  eventType: string,
  subject: EngagementSubject = {},
  metadata: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  if (isLikelyBot()) return;
  if (!eventType) return;

  const isUuid = (v?: string | null) =>
    !!v && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

  const payload = {
    region_slug: REGION_SLUG,
    business_id: isUuid(subject.business_id) ? subject.business_id : null,
    business_slug: subject.business_slug || null,
    event_type: eventType,
    metadata: {
      ...metadata,
      page_path: window.location.pathname,
    },
    user_agent: navigator.userAgent?.slice(0, 500) || null,
    referrer: document.referrer ? document.referrer.slice(0, 500) : null,
  };

  void supabase
    .from("engagement_events")
    .insert(payload as never)
    .then(
      () => undefined,
      () => undefined,
    );
}
