import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { weeklyFeed, type WeeklyFeedItem } from "@/data/weeklyFeed";

/**
 * Loads approved media_stories from Supabase and merges them with the
 * hand-curated weeklyFeed media items. Featured first, then newest.
 */

interface DbStory {
  id: string;
  headline: string;
  summary: string | null;
  category: string;
  town: string | null;
  source_name: string;
  source_short_name: string | null;
  source_article_url: string | null;
  video_embed_url: string | null;
  has_video: boolean;
  featured: boolean;
  published_at: string;
}

function dbToFeedItem(s: DbStory): WeeklyFeedItem {
  return {
    title: s.headline,
    description: s.summary || "",
    summary: s.summary || undefined,
    type: "news",
    date: new Date(s.published_at).toLocaleDateString(),
    scope: "region",
    town: s.town || undefined,
    source_name: s.source_name,
    external_article_url: s.source_article_url || undefined,
    original_url: s.source_article_url || undefined,
    published_at: s.published_at,
    categoryBadgeOverride: `${s.category.toUpperCase()} // LOCAL NEWS`,
    has_video: s.has_video,
    video_embed_url: s.video_embed_url || undefined,
    featured: s.featured,
  };
}

function isMediaItem(item: WeeklyFeedItem): boolean {
  if (!item.source_name) return false;
  const hasLink =
    item.external_article_url || item.original_url || item.video_embed_url;
  return !!hasLink;
}

export function useMediaStories(): WeeklyFeedItem[] {
  return useMediaStoriesWithState().stories;
}

export function useMediaStoriesWithState(): {
  stories: WeeklyFeedItem[];
  loading: boolean;
} {
  const [dbItems, setDbItems] = useState<WeeklyFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await (supabase as any)
        .from("media_stories")
        .select(
          "id, headline, summary, category, town, source_name, source_short_name, source_article_url, video_embed_url, has_video, featured, published_at",
        )
        .eq("approved", true)
        .order("featured", { ascending: false })
        .order("published_at", { ascending: false })
        .limit(60);
      if (cancelled) return;
      setDbItems(((data as DbStory[]) || []).map(dbToFeedItem));
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const curated = weeklyFeed.filter(isMediaItem);
  const merged = [...dbItems, ...curated];
  const stories = merged.sort((a, b) => {
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return (b.published_at || "").localeCompare(a.published_at || "");
  });

  return { stories, loading: loading && dbItems.length === 0 && curated.length === 0 };
}

