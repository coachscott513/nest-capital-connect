// Editorial placements that connect a business to the broader
// Capital District Nest ecosystem. Only real, published placements
// (or approved coming-soon placements) live here — never invent one.
//
// This shape mirrors a future `business_features` table so it can be
// migrated to the database without changing the UI contract.

export type BusinessFeatureType =
  | "story"
  | "category"
  | "town_guide"
  | "weekend_guide"
  | "event"
  | "seasonal_guide"
  | "dining_guide"
  | "neighborhood_guide"
  | "community_feature"
  | "business_collection";

export type BusinessFeatureStatus =
  | "published"
  | "coming_soon"
  | "draft"
  | "hidden";

export interface BusinessFeature {
  id: string;
  business_slug: string;
  feature_type: BusinessFeatureType;
  title: string;
  excerpt: string;
  image_url?: string;
  destination_url?: string;
  status: BusinessFeatureStatus;
  publish_date?: string;
  sort_order?: number;
}

export const FEATURE_TYPE_LABEL: Record<BusinessFeatureType, string> = {
  story: "Story",
  category: "Category",
  town_guide: "Town Guide",
  weekend_guide: "Weekend Guide",
  event: "Event",
  seasonal_guide: "Seasonal Guide",
  dining_guide: "Dining Guide",
  neighborhood_guide: "Neighborhood Guide",
  community_feature: "Community Feature",
  business_collection: "Business Collection",
};

export const FEATURE_TYPE_CTA: Record<BusinessFeatureType, string> = {
  story: "Read Story",
  category: "View Collection",
  town_guide: "Explore Guide",
  weekend_guide: "Explore Guide",
  event: "View Event",
  seasonal_guide: "Explore Guide",
  dining_guide: "Explore Guide",
  neighborhood_guide: "Explore Guide",
  community_feature: "Read Feature",
  business_collection: "View Collection",
};

export const BUSINESS_FEATURES: BusinessFeature[] = [
  // The Roosevelt Room — real placements only.
  {
    id: "rr-cat-restaurants",
    business_slug: "the-roosevelt-room",
    feature_type: "category",
    title: "Dining, Drinks & Cafés",
    excerpt:
      "Part of the Capital District Nest restaurants collection — the region's chef-driven kitchens, cocktail rooms, and neighborhood favorites.",
    image_url:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=70",
    destination_url: "/businesses/restaurants",
    status: "published",
    sort_order: 1,
  },
  {
    id: "rr-town-troy",
    business_slug: "the-roosevelt-room",
    feature_type: "town_guide",
    title: "Living in Troy",
    excerpt:
      "The Roosevelt Room is one of the destinations shaping Troy's evolving dining and nightlife scene along the Hudson.",
    image_url:
      "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=1200&q=70",
    destination_url: "/living-in/troy",
    status: "published",
    sort_order: 2,
  },
  {
    id: "rr-story-comingsoon",
    business_slug: "the-roosevelt-room",
    feature_type: "story",
    title: "Stories from The Roosevelt Room",
    excerpt:
      "Original interviews, seasonal updates, and behind-the-scenes features are being prepared.",
    status: "coming_soon",
    sort_order: 10,
  },
];

export function getFeaturesForBusiness(
  businessSlug: string,
  opts: { currentPath?: string; showComingSoon?: boolean; maxItems?: number } = {},
): BusinessFeature[] {
  const { currentPath, showComingSoon = true, maxItems = 6 } = opts;
  const items = BUSINESS_FEATURES.filter((f) => f.business_slug === businessSlug)
    .filter((f) => f.status === "published" || (showComingSoon && f.status === "coming_soon"))
    .filter((f) => !currentPath || f.destination_url !== currentPath)
    .sort((a, b) => {
      // published first, then by sort_order
      const aP = a.status === "published" ? 0 : 1;
      const bP = b.status === "published" ? 0 : 1;
      if (aP !== bP) return aP - bP;
      return (a.sort_order ?? 999) - (b.sort_order ?? 999);
    });
  return items.slice(0, maxItems);
}
