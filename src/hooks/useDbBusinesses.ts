import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Business, BusinessCategory } from "@/data/businesses";

/**
 * Maps a free-text Google Places category string to one of our
 * canonical BusinessCategory values so the row shows up in the
 * grouped directory. Falls back to "Home Service" (catch-all in
 * Home Services group) so nothing imported is silently dropped.
 */
const mapCategory = (raw: string | null, tags: string[] = []): BusinessCategory => {
  const hay = `${raw ?? ""} ${tags.join(" ")}`.toLowerCase();
  const test = (re: RegExp) => re.test(hay);

  if (test(/coffee|espresso|cafe|café/)) return "Coffee";
  if (test(/bakery|patisserie|donut|bagel/)) return "Bakery";
  if (test(/restaurant|bar|pub|pizz|deli|diner|grill|food|eatery|sandwich/))
    return "Restaurant";

  if (test(/gym|fitness|yoga|pilates|crossfit/)) return "Gym";
  if (test(/salon|barber|spa|nail|hair/)) return "Salon";
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
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

const titleCase = (s: string) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/-/g, " ");

export const useDbBusinesses = (townSlug?: string) => {
  const [rows, setRows] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pageSize = 1000;
      let from = 0;
      let data: any[] = [];
      let error: unknown = null;

      while (!cancelled) {
        let query = supabase
          .from("businesses")
          .select(
            "id,name,slug,town_slug,town_name,city,category,subcategory,tags,phone,website,email,address,rating,review_count,photos,hero_image_url,google_maps_url,latitude,longitude,is_featured,is_claimed,is_verified",
          )
          .eq("is_active", true);

        if (townSlug) query = query.eq("town_slug", townSlug);

        const { data: page, error: pageError } = await query
          .order("town_slug", { ascending: true })
          .order("name", { ascending: true })
          .range(from, from + pageSize - 1);

        if (pageError) {
          error = pageError;
          break;
        }

        data = data.concat(page ?? []);
        if (!page || page.length < pageSize) break;
        from += pageSize;
      }

      if (cancelled) return;
      if (error || !data) {
        setRows([]);
        setLoading(false);
        return;
      }

      const mapped: Business[] = data.map((r: any) => {
        const townSlug =
          r.town_slug && r.town_slug !== "unknown"
            ? r.town_slug
            : r.city
              ? slugify(r.city)
              : "capital-district";
        const townLabel = r.town_name || (r.city ? titleCase(r.city) : "Capital District");
        const tagsArr: string[] = Array.isArray(r.tags) ? r.tags : [];
        return {
          slug: r.slug || slugify(`${r.name}-${r.id}`),
          name: r.name,
          town: townSlug,
          townLabel,
          category: mapCategory(r.category, tagsArr),
          subcategory: r.subcategory ?? r.category ?? undefined,
          tagline: r.category || "Local business",
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
          image: r.hero_image_url || (Array.isArray(r.photos) ? r.photos[0] : undefined),
        } as Business;
      });

      setRows(mapped);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [townSlug]);

  return { rows, loading };
};
