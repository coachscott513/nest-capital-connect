import { describe, it, expect } from 'vitest';
import { categoryParams, isActiveCategory, primaryCategories, allDirectoryLinks } from './categoryDirectory';
import { collectLatestWindow, latestSources, LATEST_PAGE_SIZE, type LatestFetcher } from './useBrowseInventory';
import { readBrowseState, updateBrowseState } from './browseState';
import { chronologicalRows, type FeedRow } from './feedModel';
import { directoryCategoryClause, directoryCategory } from '@/lib/directoryCategories';
const link=(label:string)=>{const l=allDirectoryLinks.find(c=>c.label===label);if(!l) throw new Error(label);return l;};
const row=(id:string,hour:number,category:FeedRow['category']='local_news',href=`https://example.com/${id}`):FeedRow=>({id,category,title:id,town:'Albany',townSlug:'albany',date:new Date(Date.UTC(2026,10,23)-hour*3600000).toISOString(),dateLabel:'',source:'Src',href});
describe('category directory',()=>{
  it('keeps the selected town and typed search, and opens a structured browse page',()=>{
    const next=categoryParams(new URLSearchParams('town=delmar&page_latest=2&search=pizza'),link('Restaurants'));
    expect(next.get('town')).toBe('delmar');expect(next.get('type')).toBe('business');expect(next.get('cat')).toBe('restaurants');
    expect(next.get('search')).toBe('pizza');expect(next.get('view')).toBe('browse');expect(next.has('page_latest')).toBe(false);
  });
  it('category links never use the loose free-text search',()=>{
    for(const l of allDirectoryLinks) expect(categoryParams(new URLSearchParams(),l).has('search')).toBe(false);
  });
  it('leaving businesses drops the business classification but keeps town',()=>{
    const next=categoryParams(new URLSearchParams('town=troy&type=business&view=browse&cat=contractors'),link('Homes for sale'));
    expect(next.get('town')).toBe('troy');expect(next.get('type')).toBe('property');expect(next.has('cat')).toBe(false);
  });
  it('searching keeps the category and resets only pages',()=>{
    const next=updateBrowseState(new URLSearchParams('town=albany&type=business&view=browse&cat=coffee&page_businesses=3'),{search:'stack'});
    expect(readBrowseState(next)).toMatchObject({town:'albany',category:'business',cat:'coffee',search:'stack'});expect(next.has('page_businesses')).toBe(false);
  });
  it('rejects unknown classifications from the URL',()=>{
    expect(readBrowseState(new URLSearchParams('type=business&cat=bogus')).cat).toBe('');
  });
  it('marks only the matching category link active',()=>{
    expect(isActiveCategory(link('Contractors'),'business','browse','contractors')).toBe(true);
    expect(isActiveCategory(link('Local businesses'),'business','browse','contractors')).toBe(false);
  });
  it('Restaurants matches restaurant classifications, never a bare "bar" substring',()=>{
    const clause=directoryCategoryClause('restaurants')!;
    expect(clause).not.toMatch(/name\.|description\.|"%bar%"/);
    expect(clause).toContain('subcategory.ilike."% restaurant%"');
  });
  it('compound labels cover both halves',()=>{
    expect(directoryCategory('salon-spa')!.subs).toEqual(expect.arrayContaining(['%salon%','spa','day spa']));
    expect(directoryCategory('health-wellness')!.subs).toEqual(expect.arrayContaining(['medical clinic','wellness center']));
  });
  it('broad imported categories apply only when no subcategory exists',()=>{
    expect(directoryCategoryClause('coffee')).toContain('and(or(subcategory.is.null,subcategory.eq.""),category.in.("Coffee","Coffee shop"))');
  });
  it('shows twelve primary links',()=>{expect(primaryCategories).toHaveLength(12);});
});

/** Fake server source: ordered raw records, an adapter that may reject some, and bounded ranges. */
function source(raw:(FeedRow|null)[],calls:number[]=[]):LatestFetcher {
  return async(from,size)=>{calls.push(size);const slice=raw.slice(from,from+size);
    return {rows:slice.filter((r):r is FeedRow=>r!==null),count:raw.length,fetched:slice.length};};
}
async function allPages(fetchers:()=>LatestFetcher[]) {
  const seen:string[]=[];const sizes:number[]=[];
  for(let page=0;page<50;page++){
    const w=await collectLatestWindow(fetchers(),page);
    sizes.push(w.rows.length);seen.push(...w.rows.map(r=>r.id));
    if(!w.hasNext) return {seen,sizes,pages:page+1};
  }
  throw new Error('never reached an end');
}
describe('six-row latest window',()=>{
  it('shows at most six rows total across sources',async()=>{
    expect(LATEST_PAGE_SIZE).toBe(6);
    const w=await collectLatestWindow([source(Array.from({length:9},(_,i)=>row(`n${i}`,i*2))),source(Array.from({length:7},(_,i)=>row(`h${i}`,i*2+1,'property')))],0);
    expect(w.rows).toHaveLength(6);expect(w.hasNext).toBe(true);
  });
  it('pages through mixed sources without losing or duplicating records',async()=>{
    const news=Array.from({length:9},(_,i)=>row(`n${i}`,i*2)),homes=Array.from({length:7},(_,i)=>row(`h${i}`,i*2+1,'property'));
    const r=await allPages(()=>[source(news),source(homes)]);
    expect(r.seen).toEqual(chronologicalRows([...news,...homes]).map(x=>x.id));expect(r.sizes).toEqual([6,6,4]);
  });
  it('fills full pages and ends when most raw records are rejected by the adapter',async()=>{
    // 60 raw news records, only every fifth is valid; the raw count can never equal valid rows.
    const raw=Array.from({length:60},(_,i)=>i%5===0 ? row(`v${i}`,i) : null);
    const homes=Array.from({length:4},(_,i)=>row(`h${i}`,i*7+3,'property'));
    const r=await allPages(()=>[source(raw),source(homes)]);
    const expected=chronologicalRows([...raw.filter((x):x is FeedRow=>!!x),...homes]).map(x=>x.id);
    expect(r.seen).toEqual(expected);expect(r.sizes.slice(0,-1).every(n=>n===6)).toBe(true);expect(r.sizes[r.sizes.length-1]).toBeGreaterThan(0);
  });
  it('duplicate-heavy sources never produce short middle pages or repeats',async()=>{
    // Each event is republished five times with the same source URL and date.
    const dupes=Array.from({length:50},(_,i)=>{const n=Math.floor(i/5);const r=row(`d${i}`,n);return {...r,href:`https://example.com/story-${n}`,date:row('x',n).date};});
    const other=Array.from({length:5},(_,i)=>row(`o${i}`,i+0.5));
    const r=await allPages(()=>[source(dupes),source(other)]);
    expect(new Set(r.seen).size).toBe(r.seen.length);
    expect(r.seen).toEqual(chronologicalRows([...dupes,...other]).map(x=>x.id));
    expect(r.seen).toHaveLength(15);expect(r.sizes).toEqual([6,6,3]);
  });
  it('reads bounded chunks instead of the whole source for the first page',async()=>{
    const calls:number[]=[];const big=Array.from({length:5000},(_,i)=>row(`b${i}`,i));
    const w=await collectLatestWindow([source(big,calls)],0);
    expect(w.rows).toHaveLength(6);expect(Math.max(...calls)).toBeLessThanOrEqual(200);expect(calls.reduce((a,b)=>a+b,0)).toBeLessThan(100);
  });
  it('rentals and unconnected sale histories never enter Latest updates',()=>{
    expect(latestSources('rentals')).toEqual([]);expect(latestSources('sales')).toEqual([]);
  });
});
