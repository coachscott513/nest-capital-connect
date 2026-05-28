import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Business, BusinessCategory } from "@/data/businesses";

/**
 * Maps a free-text Google Places category string to one of our
 * canonical BusinessCategory values so the row shows up in the
 * grouped directory. Falls back to "Home Service" (catch-all in
 * Home Services group) so nothing imported is silently dropped.
 */
const mapCategory = (
  raw: string | null,
  tags: string[] = [],
  name = "",
  subcategory: string | null = null,
): BusinessCategory => {
  const hay = `${raw ?? ""} ${subcategory ?? ""} ${name} ${tags.join(" ")}`.toLowerCase();
  const test = (re: RegExp) => re.test(hay);

  if (test(/coffee|espresso|cafe|café/)) return "Coffee";
  if (test(/bakery|patisserie|donut|bagel/)) return "Bakery";
  if (test(/restaurant|bar|pub|pizz|deli|diner|grill|food|eatery|sandwich/))
    return "Restaurant";

  // Dental — first-class vertical
  if (test(/dental|dentist|orthodont|endodont|periodont|oral surgeon|tooth|teeth|braces|invisalign|cosmetic dentistry/)) return "Dental";
  // Healthcare — medical/clinical providers
  if (test(/healthcare|health care|medical|doctor|physician|clinic|urgent care|pediatric|pediatrician|dermatolog|family medicine|primary care|chiropract|physical therapy|mental health|counseling|psycholog|psychiatr|optometr|cardiolog|orthopedic/)) return "Healthcare";
  if (test(/gym|fitness|crossfit/)) return "Gym";
  if (test(/salon|barber|nail|hair|beauty/)) return "Salon";
  if (test(/spa|massage|yoga|pilates|acupunct|holistic|meditation|nutrition|wellness coach|recovery|sauna|cryo|wellness/)) return "Wellness";
  if (test(/pet|vet|groom|kennel/)) return "Pet";
  if (test(/auto|mechanic|tire|car wash|oil change/)) return "Auto";
  if (test(/book|library/)) return "Bookstore";

  if (test(/mortgage|lender|loan/)) return "Mortgage Lender";
  if (test(/bank|credit union/)) return "Bank/Credit Union";
  if (test(/insurance/)) return "Insurance";
  if (test(/inspector|inspection/)) return "Home Inspector";
  if (test(/financial|advisor|planner|wealth|primerica/)) return "Financial Advisor";
  if (test(/accountant|cpa|tax|bookkeep/)) return "Accountant";

  if (test(/real estate attorney/)) return "Real Estate Attorney";
  if (test(/attorney|lawyer|legal|law/)) return "Attorney";
  if (test(/marketing|advertis|agency/)) return "Marketing";

  if (test(/roof/)) return "Roofer";
  if (test(/plumb/)) return "Plumber";
  if (test(/electric/)) return "Electrician";
  if (test(/hvac|heating|cooling|furnace/)) return "HVAC";
  if (test(/landscap|lawn|tree|garden/)) return "Landscaper";
  if (test(/clean/)) return "Cleaner";
  if (test(/handyman|handywoman/)) return "Handyman";
  if (test(/contractor|construction|remodel|builder/)) return "Contractor";

  if (test(/retail|shop|store|boutique|market/)) return "Retail";

  return "Home Service";
};

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
