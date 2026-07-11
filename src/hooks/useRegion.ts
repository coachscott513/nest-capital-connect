import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Region {
  id: string;
  slug: string;
  name: string;
  domain: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  tagline: string | null;
  default_hero_title: string | null;
  default_hero_subtitle: string | null;
  default_cta_label: string | null;
  default_cta_href: string | null;
  realscout_id: string | null;
  partner_pricing: Record<string, unknown>;
  launch_status: "draft" | "pilot" | "live" | "paused" | "archived";
  sort_order: number;
}

/**
 * Fallback used before the DB responds (or if the row is missing).
 * Matches the seeded `capital-district` row so first paint is stable.
 */
export const DEFAULT_REGION: Region = {
  id: "default-capital-district",
  slug: "capital-district",
  name: "Capital District Nest",
  domain: "www.capitaldistrictnest.com",
  logo_url: null,
  hero_image_url: null,
  primary_color: "#0d6e66",
  secondary_color: "#c9a449",
  font_family: "Inter",
  tagline: "The digital front door of the Capital District.",
  default_hero_title: "Capital District Nest",
  default_hero_subtitle:
    "The weekly pulse of real estate, local businesses, and life in the Capital District.",
  default_cta_label: "What's Happening This Week",
  default_cta_href: "/#weekly-feed",
  realscout_id: null,
  partner_pricing: {},
  launch_status: "live",
  sort_order: 1,
};

/**
 * Resolve the active Nest region.
 *
 * Resolution order:
 *   1. Exact match on `domain` = current hostname (production multi-region routing).
 *   2. Slug fallback: `capital-district` (Region #1).
 *   3. In-memory DEFAULT_REGION so the UI never renders blank.
 *
 * This hook is the single entry point for branding, tagline, hero copy, and
 * default CTAs. Every new surface should read from here instead of hardcoding.
 */
export function useRegion() {
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const host = typeof window !== "undefined" ? window.location.hostname : "";

      // 1. Try exact domain match
      if (host) {
        const { data: byDomain } = await supabase
          .from("regions")
          .select("*")
          .eq("domain", host)
          .maybeSingle();
        if (!cancelled && byDomain) {
          setRegion(byDomain as Region);
          setLoading(false);
          return;
        }
      }

      // 2. Slug fallback → Region #1
      const { data: bySlug } = await supabase
        .from("regions")
        .select("*")
        .eq("slug", "capital-district")
        .maybeSingle();

      if (!cancelled) {
        setRegion((bySlug as Region) ?? DEFAULT_REGION);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { region, loading };
}
