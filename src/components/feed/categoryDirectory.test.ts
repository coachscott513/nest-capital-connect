import { describe, it, expect } from 'vitest';
import { categoryParams, isActiveCategory, primaryCategories } from './categoryDirectory';
import { latestWindow, latestSources, latestFetchSize, LATEST_PAGE_SIZE } from './useBrowseInventory';
import { chronologicalRows, type FeedRow } from './feedModel';
const link=(label:string)=>{const l=primaryCategories.find(c=>c.label===label);if(!l || 'href' in l) throw new Error(label);return l;};
const row=(id:string,day:number,category:FeedRow['category']='local_news'):FeedRow=>({id,category,title:id,town:'Albany',townSlug:'albany',date:`2026-11-${String(day).padStart(2,'0')}T15:00:00Z`,dateLabel:'',source:'Src',href:`https://example.com/${id}`});
describe('category directory',()=>{
  it('keeps the selected town and opens a bounded browse page',()=>{
    const next=categoryParams(new URLSearchParams('town=delmar&page_latest=2'),link('Restaurants'));
    expect(next.get('town')).toBe('delmar');expect(next.get('type')).toBe('business');
    expect(next.get('search')).toBe('restaurant');expect(next.get('view')).toBe('browse');expect(next.has('page_latest')).toBe(false);
  });
  it('switching from a directory keyword to Homes clears the keyword but keeps town',()=>{
    const next=categoryParams(new URLSearchParams('town=troy&type=business&view=browse&search=contractor'),link('Homes for sale'));
    expect(next.get('town')).toBe('troy');expect(next.get('type')).toBe('property');expect(next.has('search')).toBe(false);
  });
  it('keeps a visitor-typed search when switching to a non-keyword category',()=>{
    expect(categoryParams(new URLSearchParams('search=Madison'),link('Homes for sale')).get('search')).toBe('Madison');
  });
  it('marks only the matching keyword link active',()=>{
    expect(isActiveCategory(link('Contractors'),'business','browse','contractor')).toBe(true);
    expect(isActiveCategory(link('Local businesses'),'business','browse','contractor')).toBe(false);
  });
});
describe('six-row latest window',()=>{
  const news=Array.from({length:9},(_,i)=>row(`n${i}`,20-i*2));
  const homes=Array.from({length:7},(_,i)=>row(`h${i}`,21-i*2,'property'));
  it('shows at most six rows total across sources',()=>{
    expect(LATEST_PAGE_SIZE).toBe(6);
    expect(latestWindow([{rows:news,count:9},{rows:homes,count:7}],0).rows).toHaveLength(6);
  });
  it('pages through mixed sources without losing or duplicating records',()=>{
    const seen:string[]=[];
    for(let page=0;page<3;page++){
      const n=latestFetchSize(page);
      const w=latestWindow([{rows:news.slice(0,n),count:9},{rows:homes.slice(0,n),count:7}],page);
      seen.push(...w.rows.map(r=>r.id));
      expect(w.hasNext).toBe(page<2);
    }
    expect(seen).toEqual(chronologicalRows([...news,...homes]).map(r=>r.id));
  });
  it('rentals and unconnected sale histories never enter Latest updates',()=>{
    expect(latestSources('rentals')).toEqual([]);expect(latestSources('sales')).toEqual([]);
  });
});
