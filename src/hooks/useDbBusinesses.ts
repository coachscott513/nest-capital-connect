import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Business, BusinessCategory } from "@/data/businesses";
import { canonicalCategory } from "@/lib/canonicalCategory";

/**
 * Maps an imported business row to our canonical BusinessCategory.
 * Delegates to `canonicalCategory` so name signals (e.g. "Law Group, P.C.",
 * "CPA", "MD") override stale/wrong imported category text (e.g. Google
 * Places tagging a law firm as "Restaurant"). Single source of truth shared
 * with TownPulse, search, and filtering so cards never contradict the eyebrow.
 */
const mapCategory = (
  raw: string | null,
  tags: string[] = [],
  name = "",
  subcategory: string | null = null,
): BusinessCategory => canonicalCategory(name, raw, subcategory, tags);

const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

const titleCase = (s: string) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/-/g, " ");

const normalize = (value: string | null | undefined) =>
  (value ?? "").trim().toLowerCase();

const normalizeSlug = (value: string | null | undefined) =>
  normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const townMatches = (row: any, requestedTown: string) => {
  if (!requestedTown) return true;
  const town = normalizeSlug(requestedTown.replace(/\bny\b|\bcounty\b/g, ""));
  if (!town || town === "capital-district") return true;
  const label = town.replace(/-/g, " ");
  const isCountyQuery = /county/i.test(requestedTown);
  const county = label.replace(/ county$/, "");
  const rowTown = row.town_slug ?? row.town;
  const rowTownName = row.town_name ?? row.townLabel;
  return (
    normalizeSlug(rowTown) === town ||
    normalizeSlug(rowTownName) === town ||
    normalizeSlug(row.city) === town ||
    normalize(row.address).includes(label) ||
    (isCountyQuery && normalize(row.county).replace(/ county$/, "") === county)
  );
};

export interface UseDbBusinessesOptions {
  /** Restrict server-side to a single town slug (e.g. "delmar"). */
  townSlug?: string;
  /** Restrict server-side to is_featured = true. */
  featuredOnly?: boolean;
  /** Hard cap on rows returned. Default 200 — never fetch the full table. */
  limit?: number;
}

/**
 * SECURITY / PERFORMANCE NOTE
 * --------------------------------------------------
 * This hook used to page through the ENTIRE `businesses` table on every
 * mount (5,000+ rows). That made it cheap to scrape and bloated GA4 with
 * heavy initial loads. It now enforces a hard server-side cap (default
 * 200 rows) and pushes town / featured filters into Supabase so we never
 * pull the whole directory client-side. For full search/browse, use
 * `usePaginatedBusinesses` which serves 24 rows per page on demand.
 */
export const useDbBusinesses = (options: UseDbBusinessesOptions = {}) => {
  const { townSlug, featuredOnly, limit = 200 } = options;
  const [rows, setRows] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  // Hard ceiling — never let a caller pull more than 500 rows through this hook.
  const safeLimit = Math.min(Math.max(limit, 1), 500);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      let query = supabase
        .from("businesses")
        .select(
          // Card-only columns. Heavy fields (long_description, photos[],
          // social URLs, hours, services) are intentionally excluded —
          // they belong in the detail modal, not in a list fetch.
          "id,name,slug,town_slug,town_name,city,county,category,subcategory,tagline,tags,phone,website,email,address,rating,review_count,hero_image_url,latitude,longitude,is_featured,is_claimed,is_verified",
        )
        .eq("is_active", true);

      if (townSlug && townSlug !== "capital-district") {
        query = query.eq("town_slug", townSlug);
      }
      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }

      const { data, error } = await query
        .order("is_featured", { ascending: false })
        .order("town_slug", { ascending: true })
        .order("name", { ascending: true })
        .range(0, safeLimit - 1);

      if (cancelled) return;
      if (error || !data) {
        setRows([]);
        setLoading(false);
        return;
      }

      const mapped: Business[] = data.map((r: any) => {
        const ts =
          r.town_slug && r.town_slug !== "unknown"
            ? r.town_slug
            : r.city
              ? slugify(r.city)
              : "capital-district";
        const townLabel = r.town_name || (r.city ? titleCase(r.city) : "Capital District");
        const tagsArr: string[] = Array.isArray(r.tags) ? r.tags : [];
        return {
          slug: slugify(r.slug || r.name || r.id),
          name: r.name,
          town: ts,
          city: r.city ?? undefined,
          county: r.county ?? undefined,
          townLabel,
          category: mapCategory(r.category, tagsArr, r.name, r.subcategory),
          subcategory: r.subcategory ?? r.category ?? undefined,
          tagline: r.tagline || r.category || "Local business",
          about: undefined,
          phone: r.phone ?? undefined,
          email: r.email ?? undefined,
          website: r.website ?? undefined,
          address: r.address ?? undefined,
          lat: r.latitude ? Number(r.latitude) : undefined,
          lng: r.longitude ? Number(r.longitude) : undefined,
          claimed: Boolean(r.is_claimed || r.is_verified),
          verified: Boolean(r.is_verified),
          featured: Boolean(r.is_featured),
          tags: tagsArr,
          image: r.hero_image_url ?? undefined,
        } as Business;
      });

      setRows(mapped);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [townSlug, featuredOnly, safeLimit]);

  return { rows, loading };
};


export { townMatches };
