export type FeedCategory = 'all' | 'property' | 'sales' | 'price_changes' | 'business' | 'local_news' | 'finance' | 'events';
export interface FeedEdition { slug: string; label: string; live: boolean; }
export const FEED_EDITIONS: FeedEdition[] = [
  { slug: 'capital-district', label: 'Capital District, NY', live: true },
  { slug: 'orlando', label: 'Orlando — coming soon', live: false },
  { slug: 'kingston-ny', label: 'Kingston, NY — coming soon', live: false },
];
export interface FeedRow {
  id: string; category: FeedCategory; title: string; town: string; townSlug: string;
  date: string; dateLabel: string; source: string; href: string; connect?: string;
  price?: number; dateOnly?: boolean;
}
export const slugifyTown = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function publicUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}
export function validDate(value?: string | null): value is string { return !!value && Number.isFinite(Date.parse(value)); }
export function chronologicalRows(rows: FeedRow[]): FeedRow[] {
  const sorted = rows.filter(row => validDate(row.date)).sort((a,b) => {
    // Scheduled events are a separate chronological agenda, not future news.
    if ((a.category === 'events') !== (b.category === 'events')) return a.category === 'events' ? 1 : -1;
    const direction = a.category === 'events' ? 1 : -1;
    return direction * (Date.parse(a.date)-Date.parse(b.date)) || a.id.localeCompare(b.id);
  });
  const seen = new Set<string>();
  return sorted.filter(row => { const key = `${row.category}|${row.href}|${row.date}`; if (seen.has(key)) return false; seen.add(key); return true; });
}
export function filterRows(rows: FeedRow[], town: string, category: FeedCategory, query: string): FeedRow[] {
  const q = query.trim().toLowerCase();
  return rows.filter(row => (!town || row.townSlug === town) && (category === 'all' || row.category === category) && (!q || `${row.title} ${row.town} ${row.source}`.toLowerCase().includes(q)));
}
export interface StoryRecord { id: string; headline: string; town: string | null; source_name: string; source_article_url: string | null; published_at: string; approved: boolean; category: string; }
export function storyRow(s: StoryRecord): FeedRow | null {
  const href = publicUrl(s.source_article_url);
  if (!s.approved || !validDate(s.published_at) || !href || !s.source_name || Date.parse(s.published_at) > Date.now()) return null;
  return { id: `story:${s.id}`, category: /financ/i.test(s.category) ? 'finance' : /business/i.test(s.category) ? 'business' : 'local_news', title: s.headline, town: s.town || 'Regional', townSlug: slugifyTown(s.town || ''), date: s.published_at, dateLabel: 'Published', source: s.source_name, href };
}
export interface EventRecord { id: string; title: string; town_name: string | null; town_slug: string; starts_at: string; cta_url: string | null; venue_name: string | null; is_active: boolean; }
export function eventRow(e: EventRecord): FeedRow | null {
  const href = publicUrl(e.cta_url);
  if (!e.is_active || !validDate(e.starts_at) || !href) return null;
  return { id: `event:${e.id}`, category: 'events', title: e.title, town: e.town_name || e.town_slug, townSlug: e.town_slug, date: e.starts_at, dateLabel: 'Event starts', source: e.venue_name || 'Event organizer', href };
}
export interface ListingRecord { id: string; full_address: string | null; city: string; town_slug: string | null; list_date: string | null; list_price: number | null; public_listing_url: string | null; public_listing_url_approved: boolean; status: string; listing_agent: string | null; agency: string | null; }
export function listingRow(l: ListingRecord): FeedRow | null {
  const href = publicUrl(l.public_listing_url);
  if (l.status !== 'A' || !l.public_listing_url_approved || !href || !validDate(l.list_date)) return null;
  return { id: `listing:${l.id}`, category: 'property', title: l.full_address || 'Property listing', town: l.city, townSlug: l.town_slug || slugifyTown(l.city), date: l.list_date, dateOnly: true, dateLabel: 'Listed', source: [l.listing_agent,l.agency].filter(Boolean).join(' · ') || 'Credited listing source', href, price: l.list_price ?? undefined };
}
export const snapshotKey = (rows: FeedRow[]) => JSON.stringify(rows);
export function newRowCount(current: FeedRow[], next: FeedRow[]): number { const ids = new Set(current.map(r => r.id)); return next.filter(r => !ids.has(r.id)).length; }
