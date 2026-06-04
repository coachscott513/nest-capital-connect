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
  // PASS 1 — strong NAME + SUBCATEGORY signals only. The raw `category` column
  // is unreliable (many import-time mis-classifications), so name/subcategory
  // win when they unambiguously identify a vertical.
  const nameSub = `${name} ${subcategory ?? ""}`.toLowerCase();
  const testNS = (re: RegExp) => re.test(nameSub);

  // High-specificity professional verticals — check first.
  if (testNS(/\bcpa\b|\baccountant\b|\baccounting\b|\bbookkeep|\btax service/)) return "Accountant";
  if (testNS(/\bdental\b|\bdentist\b|\bdentistry\b|orthodont|endodont|periodont|oral surgeon/)) return "Dental";
  if (testNS(/\binsurance\b/)) return "Insurance";
  if (testNS(/\bmortgage\b|\blender\b/)) return "Mortgage Lender";
  if (testNS(/\bbank\b|credit union/)) return "Bank/Credit Union";
  if (testNS(/real estate attorney/)) return "Real Estate Attorney";
  if (testNS(/\battorney|\blaw firm|\blaw office|\blawyer|\blegal services\b|\bpllc\b|\bllp\b|\besq\b/)) return "Attorney";
  if (testNS(/\bmd\b|\bm\.d\.|physician|\bclinic\b|\bhospital\b|urgent care|pediatric|dermatolog|cardiolog|orthopedic|family medicine|primary care/)) return "Healthcare";
  if (testNS(/financial advisor|wealth management|\bplanner\b|primerica/)) return "Financial Advisor";

  // Trades / home services — strong name signals.
  if (testNS(/\bplumb/)) return "Plumber";
  if (testNS(/\broof/)) return "Roofer";
  if (testNS(/\bhvac\b|\bheating\b|\bcooling\b|furnace/)) return "HVAC";
  if (testNS(/\belectric|\belectrician/)) return "Electrician";
  if (testNS(/landscap|lawn care|tree service/)) return "Landscaper";
  if (testNS(/\bhandyman\b|handywoman/)) return "Handyman";
  if (testNS(/contractor|construction|remodel|builder|painting/)) return "Contractor";
  if (testNS(/inspector|inspection/)) return "Home Inspector";

  // Food / dining — only on strong name signals.
  if (testNS(/coffee|espresso|roaster/)) return "Coffee";
  if (testNS(/bakery|patisserie|donut|bagel|pastry/)) return "Bakery";
  if (testNS(/restaurant|pizz|deli|tavern|\bpub\b|bistro|diner|grill|eatery|sandwich|kitchen|steakhouse|sushi|brewery|\bbbq\b/)) return "Restaurant";

  // PASS 2 — broader signals across the raw category + tags + everything else.
  const hay = `${raw ?? ""} ${subcategory ?? ""} ${name} ${tags.join(" ")}`.toLowerCase();
  const test = (re: RegExp) => re.test(hay);

  if (test(/cafe|café/)) return "Coffee";
  if (test(/bakery|patisserie/)) return "Bakery";
  if (test(/cater/)) return "Restaurant";
  if (test(/restaurant|\bbar\b|pub|pizz|deli|diner|grill|eatery|sandwich|kitchen|bistro|food & beverage|food and beverage/)) return "Restaurant";
  if (test(/dental|dentist|orthodont|endodont|periodont|oral surgeon|tooth|teeth|braces|invisalign|cosmetic dentistry/)) return "Dental";
  if (test(/healthcare|health care|medical|doctor|physician|clinic|urgent care|pediatric|pediatrician|dermatolog|family medicine|primary care|chiropract|physical therapy|mental health|counseling|psycholog|psychiatr|optometr|cardiolog|orthopedic/)) return "Healthcare";
  if (test(/gym|fitness|crossfit/)) return "Gym";
  if (test(/salon|barber|nail|hair|beauty/)) return "Salon";
  if (test(/spa|massage|yoga|pilates|acupunct|holistic|meditation|nutrition|wellness coach|recovery|sauna|cryo|wellness/)) return "Wellness";
  if (test(/\bpet\b|\bvet\b|groom|kennel/)) return "Pet";
  if (test(/auto|mechanic|tire|car wash|oil change/)) return "Auto";
  if (test(/book|library/)) return "Bookstore";
  if (test(/mortgage|lender|loan/)) return "Mortgage Lender";
  if (test(/bank|credit union/)) return "Bank/Credit Union";
  if (test(/insurance/)) return "Insurance";
  if (test(/inspector|inspection/)) return "Home Inspector";
  if (test(/financial|advisor|planner|wealth|primerica/)) return "Financial Advisor";
  if (test(/accountant|\bcpa\b|\btax\b|bookkeep/)) return "Accountant";
  if (test(/real estate attorney/)) return "Real Estate Attorney";
  if (test(/attorney|lawyer|legal|\blaw\b/)) return "Attorney";
  if (test(/marketing|advertis|\bagency\b/)) return "Marketing";
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

/* Search synonym map — keys are normalized user inputs, values are
   additional ilike fragments that should also match. Keeps the directory
   feeling accurate when a customer types a common everyday term. */
const SEARCH_SYNONYMS: Record<string, string[]> = {
  restaurant: ["restaurant", "food", "dining", "cafe", "café", "coffee", "tavern", "bar", "pizza", "deli", "bakery", "bistro", "diner", "grill", "eatery", "brewery"],
  food: ["restaurant", "food", "dining", "cafe", "deli", "bakery"],
  dining: ["restaurant", "dining", "cafe", "bistro", "grill"],
  cafe: ["cafe", "café", "coffee", "bakery"],
  coffee: ["coffee", "cafe", "café", "espresso", "roaster"],
  pizza: ["pizza", "pizzeria", "italian", "restaurant"],
  tavern: ["tavern", "pub", "bar", "brewery"],
  bar: ["bar", "tavern", "pub", "brewery"],
  bakery: ["bakery", "patisserie", "pastry", "bread"],

  attorney: ["attorney", "lawyer", "law firm", "law office", "legal", "pllc", "llp", "esq"],
  lawyer: ["attorney", "lawyer", "law firm", "legal"],
  legal: ["attorney", "lawyer", "law firm", "legal"],
  law: ["attorney", "lawyer", "law firm", "legal"],

  cpa: ["cpa", "accountant", "accounting", "tax", "bookkeeping"],
  accountant: ["cpa", "accountant", "accounting", "tax", "bookkeeping"],
  accounting: ["cpa", "accountant", "accounting", "tax", "bookkeeping"],
  tax: ["cpa", "accountant", "accounting", "tax service", "tax prep"],
  bookkeeper: ["bookkeeping", "bookkeeper", "accountant"],

  insurance: ["insurance"],
  mortgage: ["mortgage", "lender", "loan"],
  bank: ["bank", "credit union"],
  financial: ["financial advisor", "wealth", "planner"],

  doctor: ["doctor", "physician", "medical", "healthcare", "clinic", "md"],
  physician: ["doctor", "physician", "medical", "healthcare", "clinic"],
  medical: ["doctor", "physician", "medical", "healthcare", "clinic"],
  healthcare: ["healthcare", "medical", "doctor", "physician", "clinic"],
  clinic: ["clinic", "medical", "doctor", "healthcare"],
  dentist: ["dental", "dentist", "dentistry", "orthodontic"],
  dental: ["dental", "dentist", "dentistry", "orthodontic"],

  contractor: ["contractor", "construction", "home improvement", "handyman", "builder", "remodel"],
  construction: ["contractor", "construction", "builder", "remodel"],
  plumber: ["plumber", "plumbing"],
  plumbing: ["plumber", "plumbing"],
  electrician: ["electrician", "electric", "electrical"],
  electric: ["electrician", "electric", "electrical"],
  hvac: ["hvac", "heating", "cooling", "furnace", "air conditioning"],
  heating: ["hvac", "heating", "furnace"],
  cooling: ["hvac", "cooling", "air conditioning"],
  roofing: ["roofing", "roofer", "roof"],
  roofer: ["roofing", "roofer", "roof"],
  landscaping: ["landscaping", "landscaper", "lawn", "tree service"],
  landscaper: ["landscaping", "landscaper", "lawn"],
  painter: ["painting", "painter"],
  painting: ["painting", "painter"],
  handyman: ["handyman", "handywoman", "home repair"],

  gym: ["gym", "fitness", "crossfit", "yoga", "pilates"],
  fitness: ["gym", "fitness", "crossfit", "yoga", "pilates"],
  yoga: ["yoga", "pilates", "fitness", "studio"],
  spa: ["spa", "med spa", "massage", "wellness"],
  salon: ["salon", "barber", "nail", "hair", "beauty"],
  pet: ["pet", "veterinary", "vet", "grooming"],
  vet: ["vet", "veterinary", "pet"],
  auto: ["auto", "mechanic", "tire", "car wash", "oil change"],
};

const expandSearchSynonyms = (raw: string): string[] => {
  const key = raw.toLowerCase().trim();
  const list = SEARCH_SYNONYMS[key];
  if (!list || list.length === 0) return [raw];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of [raw, ...list]) {
    const safe = escapeIlike(t);
    if (safe.length >= 2 && !seen.has(safe.toLowerCase())) {
      seen.add(safe.toLowerCase());
      out.push(safe);
    }
  }
  // Cap to avoid PostgREST URL bloat.
  return out.slice(0, 12);
};

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
        // Expand the user's keyword with category synonyms so e.g. "restaurant"
        // also matches "cafe", "tavern", "bakery"; "cpa" also matches "accounting"
        // etc. Each term is OR-matched across name/category/subcategory/desc/city.
        const terms = expandSearchSynonyms(safe);
        const orClause = terms
          .flatMap((t) => [
            `name.ilike.%${t}%`,
            `category.ilike.%${t}%`,
            `subcategory.ilike.%${t}%`,
            `description.ilike.%${t}%`,
            `tagline.ilike.%${t}%`,
            `city.ilike.%${t}%`,
          ])
          .join(",");
        q = q.or(orClause);
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
