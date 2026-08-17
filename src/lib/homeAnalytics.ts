import { logEngagement } from "@/lib/engagement";

/* =============================================================
   GLOBAL FLOW ANALYTICS — Premium UX v1
   Privacy contract:
   - no PII
   - no raw search query is ever recorded, only a length bucket
   - no free text of any kind leaves the client
   ============================================================= */

export type SearchMode = "homes" | "businesses" | "towns" | "services";

/** Buckets a raw query length so the query itself is never retained. */
export const queryLengthBucket = (q: string): "1-2" | "3-5" | "6-10" | "11+" => {
  const n = q.trim().length;
  if (n <= 2) return "1-2";
  if (n <= 5) return "3-5";
  if (n <= 10) return "6-10";
  return "11+";
};

export const regionalSearchModeSelect = (mode: SearchMode) =>
  logEngagement("regional_search_mode_select", {}, { mode });

export const regionalSearchSubmit = (args: {
  mode: SearchMode;
  intentType: string;
  rawQuery: string;
  resultCount?: number | null;
}) =>
  logEngagement(
    "regional_search_submit",
    {},
    {
      mode: args.mode,
      intent_type: args.intentType,
      query_length_bucket: queryLengthBucket(args.rawQuery),
      result_count: args.resultCount ?? null,
    },
  );

export const homepageChapterView = (chapterKey: string, position: number) =>
  logEngagement("homepage_chapter_view", {}, { chapter_key: chapterKey, position });

export const homepageChapterClick = (chapterKey: string, position: number) =>
  logEngagement("homepage_chapter_click", {}, { chapter_key: chapterKey, position });

export const propertyIntelligencePathClick = (
  pathKey: string,
  destinationType: "internal" | "external",
) =>
  logEngagement("property_intelligence_path_click", {}, {
    path_key: pathKey,
    destination_type: destinationType,
  });

export const closingTeamRoleClick = (roleKey: string) =>
  logEngagement("closing_team_role_click", {}, { role_key: roleKey });

export const businessCategoryClick = (categorySlug: string) =>
  logEngagement("business_category_click", {}, { category_slug: categorySlug });

export const navIntentClick = (intent: string, surface: "desktop" | "mobile") =>
  logEngagement("nav_intent_click", {}, { intent, surface });

/** Only fires when real, non-empty sponsored inventory exists. */
export const sponsoredSpotlightView = (placementId: string) =>
  logEngagement("sponsored_spotlight_view", {}, { placement_id: placementId });

export const sponsoredSpotlightClick = (placementId: string) =>
  logEngagement("sponsored_spotlight_click", {}, { placement_id: placementId });
