import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Business, BusinessCategory } from "@/data/businesses";

/* ─────────────────────────────────────────────────────────────
   Paginated, server-filtered business directory.
   Initial load is capped (default 24). User pulls more on demand.
   All filters are applied in Supabase — no client-side scan of
   thousands of rows. Cards select ONLY light fields for the grid;
   heavy fields (long description, services, photos[]) are loaded
   in the detail modal.
   ───────────────────────────────────────────────────────────── */

const CARD_COLUMNS =
  "id,name,slug,town_slug,town_name,city,county,category,subcategory,tagline,phone,website,email,address,rating,review_count,hero_image_url,latitude,longitude,is_featured,is_claimed,is_verified,tags";

const mapCategory = (
  raw: string | null,
  tags: string[] = [],
  name = "",
  subcategory: string | null = null,
): BusinessCategory => {
  const hay = `${raw ?? ""} ${subcategory ?? ""} ${name} ${tags.join(" ")}`.toLowerCase();
  const test = (re: RegExp) => re.test(hay);
  if (test(/coffee|espresso|cafe|café|roaster/)) return "Coffee";
  if (test(/bakery|patisserie|donut|bagel|pastry/)) return "Bakery";
  if (test(/cater/)) return "Restaurant";
  if (test(/restaurant|bar|pub|pizz|deli|diner|grill|food|eatery|sandwich|kitchen|bistro/)) return "Restaurant";
  if (test(/gym|fitness|yoga|pilates|crossfit/)) return "Gym";
  if (test(/salon|barber|spa|nail|hair|beauty/)) return "Salon";
  if (test(/dental|dentist|orthodont|endodont|periodont|oral surgeon/)) return "Wellness";
  if (test(/medical|doctor|clinic|physician|urgent care|pediatric/)) return "Wellness";
  if (test(/wellness|chiropract|massage|acupunct|therap/)) return "Wellness";
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
  s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

const titleCase = (s: string) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/-/g, " ");

const mapRow = (r: any): Business => {
  const townSlug =
    r.town_slug && r.town_slug !== "unknown"
      ? r.town_slug
      : r.city ? slugify(r.city) : "capital-district";
  const townLabel = r.town_name || (r.city ? titleCase(r.city) : "Capital District");
  const tagsArr: string[] = Array.isArray(r.tags) ? r.tags : [];
  return {
    slug: slugify(r.slug || r.name || r.id),
    name: r.name,
    town: townSlug,
    city: r.city ?? undefined,
    county: r.county ?? undefined,
    townLabel,
    category: mapCategory(r.category, tagsArr),
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
};

export type TierFilter = "all" | "featured" | "claimed" | "standard";

export interface PaginatedBusinessOptions {
  townSlug?: string;
  search?: string;
  category?: string; // raw substring keyword applied to category column
  tier?: TierFilter;
  hasPhone?: boolean;
  hasWebsite?: boolean;
  pageSize?: number;
}

const escapeIlike = (v: string) => v.replace(/[%,()]/g, " ").trim();

export const usePaginatedBusinesses = (opts: PaginatedBusinessOptions) => {
  const {
    townSlug, search, category, tier = "all",
    hasPhone, hasWebsite, pageSize = 24,
  } = opts;

  const [rows, setRows] = useState<Business[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const reqId = useRef(0);

  const filterKey = useMemo(
    () => JSON.stringify({ townSlug, search, category, tier, hasPhone, hasWebsite, pageSize }),
    [townSlug, search, category, tier, hasPhone, hasWebsite, pageSize],
  );

  const buildQuery = useCallback((countMode: boolean) => {
    let q = supabase
      .from("businesses")
      .select(CARD_COLUMNS, countMode ? { count: "exact" } : undefined)
      .eq("is_active", true);

    if (townSlug && townSlug !== "capital-district") q = q.eq("town_slug", townSlug);

    if (category) {
      const safe = escapeIlike(category);
      // Match category column or tags array contains.
      q = q.or(`category.ilike.%${safe}%,subcategory.ilike.%${safe}%`);
    }

    if (search) {
      const safe = escapeIlike(search);
      if (safe.length >= 2) {
        q = q.or(
          `name.ilike.%${safe}%,category.ilike.%${safe}%,subcategory.ilike.%${safe}%,description.ilike.%${safe}%,city.ilike.%${safe}%`,
        );
      }
    }

    if (tier === "featured") q = q.eq("is_featured", true);
    else if (tier === "claimed") q = q.eq("is_claimed", true);
    else if (tier === "standard") q = q.eq("is_claimed", false).eq("is_featured", false);

    if (hasPhone) q = q.not("phone", "is", null).neq("phone", "");
    if (hasWebsite) q = q.not("website", "is", null).neq("website", "");

    return q
      .order("is_featured", { ascending: false })
      .order("is_claimed", { ascending: false })
      .order("name", { ascending: true });
  }, [townSlug, search, category, tier, hasPhone, hasWebsite]);

  // Reset & fetch page 0 whenever filters change.
  useEffect(() => {
    const id = ++reqId.current;
    setLoading(true);
    setRows([]);
    setPage(0);
    setHasMore(true);
    setTotal(null);

    (async () => {
      const q = buildQuery(true).range(0, pageSize - 1);
      const { data, error, count } = await q;
      if (id !== reqId.current) return;
      if (error) {
        setRows([]); setHasMore(false); setLoading(false); return;
      }
      const mapped = (data ?? []).map(mapRow);
      setRows(mapped);
      setTotal(count ?? null);
      setHasMore((data?.length ?? 0) === pageSize);
      setLoading(false);
    })();
  }, [filterKey, buildQuery, pageSize]);

  const loadMore = useCallback(async () => {
    if (loadingMore || loading || !hasMore) return;
    const id = reqId.current;
    setLoadingMore(true);
    const nextPage = page + 1;
    const from = nextPage * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await buildQuery(false).range(from, to);
    if (id !== reqId.current) return;
    if (error) {
      setLoadingMore(false);
      setHasMore(false);
      return;
    }
    const mapped = (data ?? []).map(mapRow);
    setRows((prev) => [...prev, ...mapped]);
    setPage(nextPage);
    setHasMore((data?.length ?? 0) === pageSize);
    setLoadingMore(false);
  }, [buildQuery, hasMore, loading, loadingMore, page, pageSize]);

  return { rows, loading, loadingMore, hasMore, loadMore, total };
};

/* Lightweight featured fetch — small, cached at component mount. */
export const useFeaturedBusinesses = (limit = 6) => {
  const [rows, setRows] = useState<Business[]>([]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("businesses")
        .select(CARD_COLUMNS)
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("name", { ascending: true })
        .limit(limit);
      if (cancelled) return;
      setRows((data ?? []).map(mapRow));
    })();
    return () => { cancelled = true; };
  }, [limit]);
  return rows;
};
