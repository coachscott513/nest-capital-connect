import { findTownInDirectory } from '@/data/capitalDistrictCounties';
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
  price?: number; dateOnly?: boolean; summary?: string; kind?: 'listing';
  facts?: string; identity?: string;
}
export const slugifyTown = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Directory contracts use these combined community names, not their literal slugs.
export function canonicalFeedTown(value: string): string {
  const slug = slugifyTown(value);
  return ({ 'delmar-bethlehem': 'delmar', bethlehem:'delmar', glenville:'scotia-glenville', scotia:'scotia-glenville' } as Record<string,string>)[slug] || slug;
}
export function equivalentFeedTowns(value: string): string[] {
  const slug=canonicalFeedTown(value);
  if (slug==='delmar') return ['delmar','bethlehem','delmar-bethlehem'];
  if (slug==='scotia-glenville') return ['glenville','scotia','scotia-glenville'];
  return [slug];
}
export function feedTownHref(value: string): string {
  const slug=slugifyTown(value);
  const routeSlug=slug==='scotia-glenville' ? 'glenville' : slug==='delmar-bethlehem' ? 'delmar' : slug;
  return `/towns/${findTownInDirectory(routeSlug)?.slug || routeSlug}`;
}
export function businessIdentity(category?: string | null, subcategory?: string | null): string {
  return subcategory?.trim() || category?.trim() || 'Local business';
}
export function rowIdentity(row: FeedRow): string {
  if (row.identity) return row.identity;
  if (!row.date) return row.source || 'Local business';
  return ({property:'Property update',finance:'Finance update',events:'Event',business:'Business update',local_news:'Local update',sales:'Sale update',price_changes:'Price change',all:'Local update'})[row.category];
}
export function feedTownOptions(towns: {slug:string;name:string}[], rows: FeedRow[]) {
  const options = new Map(towns.map(t => [canonicalFeedTown(t.slug), t.name]));
  for (const row of rows) {
    const slug = canonicalFeedTown(row.townSlug);
    if (slug && !options.has(slug)) options.set(slug, row.town);
  }
  if (options.has('delmar')) options.set('delmar','Delmar / Bethlehem');
  if (options.has('scotia-glenville')) options.set('scotia-glenville','Scotia / Glenville');
  return Array.from(options, ([slug,name]) => ({slug,name})).sort((a,b) => a.name.localeCompare(b.name));
}
export function easternDay(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}
function calendarDay(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && validDate(value) && new Date(`${value}T00:00:00Z`).toISOString().slice(0,10) === value;
}
export function isNewListing(row: FeedRow, now = new Date()): boolean {
  if (row.kind !== 'listing' || !calendarDay(row.date)) return false;
  const days = (Date.parse(easternDay(now)) - Date.parse(row.date)) / 86400000;
  return days >= 0 && days <= 6;
}
export function publicUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}
export function validDate(value?: string | null): value is string { return !!value && Number.isFinite(Date.parse(value)); }
export function canonicalSourceUrl(value: string): string {
  try { const url = new URL(value); url.hash = ''; url.pathname = url.pathname.replace(/\/$/, '') || '/'; url.searchParams.sort(); return url.href; } catch { return value; }
}
function sourceDay(row: FeedRow): string {
  return row.dateOnly ? row.date : easternDay(new Date(row.date));
}
export function chronologicalRows(rows: FeedRow[]): FeedRow[] {
  const dated = rows.filter(row => validDate(row.date));
  // Match the full listing URL and original Eastern calendar day, not a publisher domain.
  const listings = new Set(dated.filter(row => row.kind === 'listing').map(row => `${canonicalSourceUrl(row.href)}|${sourceDay(row)}`));
  const sorted = dated.filter(row => !(row.kind !== 'listing' && row.id.startsWith('story:') && row.category === 'property' && listings.has(`${canonicalSourceUrl(row.href)}|${sourceDay(row)}`))).sort((a,b) => {
    // Scheduled events are a separate chronological agenda, not future news.
    if ((a.category === 'events') !== (b.category === 'events')) return a.category === 'events' ? 1 : -1;
    const direction = a.category === 'events' ? 1 : -1;
    const timestamp = (row: FeedRow) => Date.parse(row.dateOnly ? `${row.date}T12:00:00Z` : row.date);
    return direction * (timestamp(a)-timestamp(b)) || a.id.localeCompare(b.id);
  });
  const seen = new Set<string>();
  return sorted.filter(row => { const key = `${row.category}|${canonicalSourceUrl(row.href)}|${row.date}`; if (seen.has(key)) return false; seen.add(key); return true; });
}
export function filterRows(rows: FeedRow[], town: string, category: FeedCategory, query: string): FeedRow[] {
  const q = query.trim().toLowerCase();
  return rows.filter(row => (!town || canonicalFeedTown(row.townSlug) === canonicalFeedTown(town)) && (category === 'all' || row.category === category) && (!q || `${row.title} ${row.town} ${row.source}`.toLowerCase().includes(q)));
}
export interface StoryRecord { id: string; headline: string; town: string | null; source_name: string; source_article_url: string | null; published_at: string; approved: boolean; category: string; summary?: string | null; }
export function storyRow(s: StoryRecord): FeedRow | null {
  const href = publicUrl(s.source_article_url);
  if (!s.approved || !validDate(s.published_at) || !href || !s.source_name || Date.parse(s.published_at) > Date.now()) return null;
  return { id: `story:${s.id}`, identity:/financ/i.test(s.category) ? 'Finance update' : /real\s*estate/i.test(s.category) ? 'Property update' : /business/i.test(s.category) ? 'Business update' : 'Local update', category: /financ/i.test(s.category) ? 'finance' : /real\s*estate/i.test(s.category) ? 'property' : /business/i.test(s.category) ? 'business' : 'local_news', title: s.headline, town: s.town || 'Regional', townSlug: canonicalFeedTown(s.town || ''), date: s.published_at, dateLabel: 'Published', source: s.source_name, href, summary: s.summary || undefined };
}
export function latestFinanceRow(rows: FeedRow[]): FeedRow | undefined {
  return chronologicalRows(rows.filter(row => row.category === 'finance'))[0];
}
export interface EventRecord { id: string; title: string; town_name: string | null; town_slug: string; starts_at: string; cta_url: string | null; venue_name: string | null; is_active: boolean; }
export function eventRow(e: EventRecord): FeedRow | null {
  const href = publicUrl(e.cta_url);
  if (!e.is_active || !validDate(e.starts_at) || !href) return null;
  return { id: `event:${e.id}`, identity:'Event', category: 'events', title: e.title, town: e.town_name || e.town_slug, townSlug: e.town_slug, date: e.starts_at, dateLabel: 'Event starts', source: e.venue_name || 'Event organizer', href };
}
export interface ListingRecord { id: string; full_address: string | null; city: string; town_slug: string | null; list_date: string | null; list_price: number | null; public_listing_url: string | null; public_listing_url_approved: boolean; status: string; listing_agent: string | null; agency: string | null; bedrooms?: number | null; bathrooms?: number | null; sqft?: number | null; }
export function listingRow(l: ListingRecord, now = new Date()): FeedRow | null {
  const href = publicUrl(l.public_listing_url);
  if (l.status !== 'A' || !l.public_listing_url_approved || !href || !l.list_date || !calendarDay(l.list_date) || l.list_date > easternDay(now)) return null;
  const facts = [[l.bedrooms,'beds'],[l.bathrooms,'baths'],[l.sqft,'sq ft']].filter(([value]) => typeof value === 'number' && Number.isFinite(value) && value > 0).map(([value,label]) => `${Number(value).toLocaleString('en-US')} ${label}`).join(' · ');
  return { id: `listing:${l.id}`, identity:'Property listing', kind:'listing', category: 'property', title: l.full_address || 'Property listing', town: l.city, townSlug: canonicalFeedTown(l.town_slug || l.city), date: l.list_date, dateOnly: true, dateLabel: 'Listed', source: [l.listing_agent,l.agency].filter(Boolean).join(' · ') || 'Approved listing source', href, price: l.list_price ?? undefined, facts: facts || undefined };
}
export const snapshotKey = (rows: FeedRow[]) => JSON.stringify(rows);
export function newRowCount(current: FeedRow[], next: FeedRow[]): number { const ids = new Set(current.map(r => r.id)); return next.filter(r => !ids.has(r.id)).length; }
