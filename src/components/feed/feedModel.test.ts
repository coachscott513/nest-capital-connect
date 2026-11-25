import { describe,it,expect } from 'vitest';
import { FEED_EDITIONS, businessIdentity, equivalentFeedTowns, feedTownHref, rowIdentity, chronologicalRows, eventRow, feedTownOptions, filterRows, isFeaturedListing, isNewListing, latestFinanceRow, listingRow, newRowCount, publicUrl, storyRow, type FeedRow, type ListingRecord } from './feedModel';
const row:FeedRow={id:'story:1',category:'local_news',title:'Town meeting',town:'Troy',townSlug:'troy',date:'2026-11-20T12:00:00Z',dateLabel:'Published',source:'Publisher',href:'https://example.org/story'};
describe('neutral feed source rules',()=>{
 it('maps verified Real Estate stories to Property and preserves Voorheesville, original date, summary and publisher link',()=>{
  const summary='Credits Lindsay Carr and Natalie Pinkham.';
  const property=storyRow({id:'db9c287f-8573-45b9-8e2d-b4ea3d7a296e',headline:'205 Deerfield Court listed at $250,000',town:'Voorheesville',category:'Real Estate',published_at:'2026-11-20T05:00:00Z',source_name:'BHHS Blake',source_article_url:'https://www.bhhsblakerealtors.com/ny/205-deerfield-court-voorheesville-12186/pid-442327547',approved:true,summary});
  expect(property).toMatchObject({category:'property',townSlug:'voorheesville',date:'2026-11-20T05:00:00Z',source:'BHHS Blake',summary,href:'https://www.bhhsblakerealtors.com/ny/205-deerfield-court-voorheesville-12186/pid-442327547'});
  expect(filterRows(property ? [property] : [],'voorheesville','property','Deerfield')).toHaveLength(1);
 });
 it('retains Finance survey date, source and individual-offer qualifications',()=>{
  const finance=storyRow({id:'6da78a76-2666-404c-be78-7d48e938f661',headline:'Freddie Mac weekly averages: 30-year 7.28%; 15-year 6.66%',town:null,category:'Finance',published_at:'2026-11-19T17:00:00Z',source_name:'Freddie Mac',source_article_url:'https://www.freddiemac.com/pmms',approved:true,summary:'National survey averages, not individual lender offers.'});
  expect(finance).toMatchObject({category:'finance',date:'2026-11-19T17:00:00Z',town:'Regional',href:'https://www.freddiemac.com/pmms',summary:'National survey averages, not individual lender offers.'});
 });
 it('selects the latest dated Finance row independently of input order, with an empty fallback',()=>{
  const older={...row,id:'finance:old',category:'finance' as const,date:'2026-11-12T17:00:00Z'};
  const latest={...older,id:'finance:new',date:'2026-11-19T17:00:00Z',href:'https://www.freddiemac.com/pmms'};
  expect(latestFinanceRow([older,row,latest])).toEqual(latest);
  expect(latestFinanceRow([row])).toBeUndefined();
 });
 it('includes only approved stories with dated publisher links',()=>{
  const s={id:'1',headline:'Town meeting',town:'Troy',source_name:'Publisher',source_article_url:row.href,published_at:row.date,approved:true,category:'news'};
  expect(storyRow(s)?.date).toBe('2026-11-20T12:00:00Z');
  expect(storyRow({...s,approved:false})).toBeNull();
  expect(storyRow({...s,source_article_url:null})).toBeNull();
 });
 it('never substitutes import time for a missing listing date',()=>{
  const l={id:'1',full_address:'Test address',city:'Troy',town_slug:'troy',list_date:null,list_price:123,public_listing_url:row.href,public_listing_url_approved:true,status:'A',listing_agent:'Credited agent',agency:null};
  expect(listingRow(l)).toBeNull();
 });
 it('requires approved public property provenance, retains sourced price and agent',()=>{
  const l={id:'1',full_address:'Test address',city:'Troy',town_slug:'troy',list_date:'2026-11-20',list_price:123,public_listing_url:row.href,public_listing_url_approved:true,status:'A',listing_agent:'Credited agent',agency:null};
  expect(listingRow({...l,public_listing_url_approved:false})).toBeNull();
  expect(listingRow(l)).toMatchObject({price:123,date:'2026-11-20',source:'Credited agent',href:row.href});
  expect(listingRow(l)?.connect).toBeUndefined();
 });
 it('labels scheduled event time instead of import/arrival time',()=>{
  expect(eventRow({id:'1',title:'Meeting',town_name:'Troy',town_slug:'troy',starts_at:row.date,cta_url:row.href,venue_name:'Venue',is_active:true})).toMatchObject({date:row.date,dateLabel:'Event starts'});
  expect(eventRow({id:'1',title:'Meeting',town_name:'Troy',town_slug:'troy',starts_at:row.date,cta_url:row.href,venue_name:'Venue',is_active:true})?.connect).toBeUndefined();
 });
 it('preserves chronological organic order and deduplicates sources',()=>{
  const newer={...row,id:'story:2',date:'2026-11-21T12:00:00Z',href:'https://example.org/newer'};
  expect(chronologicalRows([row,newer,{...row,id:'duplicate'}]).map(r=>r.date)).toEqual(['2026-11-21T12:00:00Z','2026-11-20T12:00:00Z']);
 });
 it('keeps scheduled events after dated news in agenda order rather than presenting future news',()=>{
  const event={...row,id:'event:1',category:'events' as const,date:'2026-12-01T12:00:00Z'};
  expect(chronologicalRows([event,row]).map(r=>r.id)).toEqual(['story:1','event:1']);
 });
 it('filters by town/category/text without rewriting underlying rows',()=>{
  expect(filterRows([row],'troy','local_news','meeting')).toEqual([row]);
  expect(filterRows([row],'albany','all','')).toEqual([]);
  expect(filterRows([row],'','sales','')).toEqual([]);
 });
 it('counts queued additions without mutating the reading snapshot',()=>{
  const current=[row];const next=[{...row,id:'story:2'},row];
  expect(newRowCount(current,next)).toBe(1);expect(current.map(r=>r.id)).toEqual(['story:1']);
 });
 it('keeps Orlando and Kingston nonlive rather than copying regional rows',()=>{
  expect(FEED_EDITIONS.find(e=>e.slug==='orlando')?.live).toBe(false);
  expect(FEED_EDITIONS.find(e=>e.slug==='kingston-ny')?.live).toBe(false);
  expect(FEED_EDITIONS.find(e=>e.slug==='capital-district')?.live).toBe(true);
 });
 it('rejects executable source URLs',()=>{expect(publicUrl('javascript:alert(1)')).toBeUndefined();});
});

const listing:ListingRecord={id:'structured',full_address:'98 Kent Street',city:'Albany',town_slug:'albany',list_date:'2026-11-23',list_price:340000,public_listing_url:'https://example.org/listing/98-kent',public_listing_url_approved:true,status:'A',listing_agent:'Sourced agent',agency:'Sourced brokerage'};
const checkTime=new Date('2026-11-24T15:02:00Z');
function actualListing(date: string) {
 const result=listingRow({...listing,list_date:date},checkTime);
 if (!result) throw new Error(`Expected a published listing on ${date}`);
 return result;
}
describe('structured listing event rules',()=>{
 it('carries only the supplied true featured flag without changing listing provenance or order',()=>{
  const ordinary=listingRow(listing,checkTime);
  const featured=listingRow({...listing,is_featured:true},checkTime);
  expect(featured).toEqual({...ordinary,featured:true});
  expect(featured && isFeaturedListing(featured)).toBe(true);
  expect(chronologicalRows([featured as FeedRow,{...actualListing('2026-11-24'),href:'https://example.org/newer'}]).map(r=>r.date)).toEqual(['2026-11-24','2026-11-23']);
  expect(listingRow({...listing,is_featured:true,status:'S'},checkTime)).toBeNull();
  expect(listingRow({...listing,is_featured:true,public_listing_url_approved:false},checkTime)).toBeNull();
 });
 it.each([undefined,null,false])('keeps absent or false featured flag %s ordinary',flag=>{
  const result=listingRow({...listing,is_featured:flag},checkTime);
  expect(result?.featured).toBe(false);
  expect(result && isFeaturedListing(result)).toBe(false);
 });
 it('never features a generic property story or a legacy unflagged snapshot',()=>{
  expect(isFeaturedListing({...row,category:'property',featured:true})).toBe(false);
  expect(isFeaturedListing(actualListing('2026-11-23'))).toBe(false);
 });
 it('marks today and the previous six Eastern calendar days new, but day seven listed',()=>{
  expect(isNewListing(actualListing('2026-11-24'),checkTime)).toBe(true);
  expect(isNewListing(actualListing('2026-11-18'),checkTime)).toBe(true);
  expect(isNewListing(actualListing('2026-11-17'),checkTime)).toBe(false);
 });
 it('uses Eastern midnight rather than UTC or elapsed 24-hour windows',()=>{
  const boundary=actualListing('2026-11-17');
  expect(isNewListing(boundary,new Date('2026-11-24T04:59:59Z'))).toBe(true);
  expect(isNewListing(boundary,new Date('2026-11-24T05:00:00Z'))).toBe(false);
 });
 it('counts calendar days across daylight saving changes',()=>{
  const candidate={...actualListing('2026-11-01'),date:'2026-10-27'};
  expect(isNewListing(candidate,new Date('2026-11-02T17:00:00Z'))).toBe(true);
  expect(isNewListing({...candidate,date:'2026-10-26'},new Date('2026-11-02T17:00:00Z'))).toBe(false);
 });
 it('excludes future and invalid listing dates from publication and new badges',()=>{
  expect(listingRow({...listing,list_date:'2026-11-25'},checkTime)).toBeNull();
  expect(listingRow({...listing,list_date:'2026-02-30'},checkTime)).toBeNull();
  expect(isNewListing({...actualListing('2026-11-23'),date:'2026-11-25'},checkTime)).toBe(false);
 });
 it('does not turn generic Real Estate headlines into actual listing events',()=>{
  const story=storyRow({id:'news',headline:'98 Kent Street: NEW LISTING',category:'Real Estate',town:'Albany',source_name:'Publisher',source_article_url:listing.public_listing_url,published_at:'2026-11-23T05:00:00Z',approved:true});
  expect(story?.category).toBe('property');
  expect(story?.kind).toBeUndefined();
  expect(story && isNewListing(story,checkTime)).toBe(false);
 });
 it('prefers a structured listing over its same full canonical URL/day story without changing the input snapshot',()=>{
  const actual=actualListing('2026-11-23');
  const story={...row,id:'story:matching',category:'property' as const,href:`${actual.href}/#photos`,date:'2026-11-23T05:00:00Z'};
  const snapshot=[story,actual];
  expect(chronologicalRows(snapshot).map(r=>r.id)).toEqual([actual.id]);
  expect(snapshot).toEqual([story,actual]);
 });
 it('retains distinct property events on another day and other listings on the same publisher domain',()=>{
  const actual=actualListing('2026-11-23');
  const laterNews={...row,id:'story:later',category:'property' as const,href:actual.href,date:'2026-11-24T05:00:00Z'};
  const otherListing={...actual,id:'listing:another',href:'https://example.org/listing/806-madison'};
  const distinctQuery={...laterNews,id:'story:query',date:'2026-11-23T05:00:00Z',href:`${actual.href}?event=price-change`};
  expect(chronologicalRows([actual,laterNews,otherListing,distinctQuery])).toHaveLength(4);
 });
 it('compares story publication days in Eastern time for duplicate handling',()=>{
  const actual=actualListing('2026-11-23');
  const late={...row,id:'story:late',category:'property' as const,href:actual.href,date:'2026-11-24T04:59:59Z'};
  expect(chronologicalRows([actual,late])).toEqual([actual]);
 });
 it('retains actual price, agent/brokerage and native facts without crediting the URL host as agent',()=>{
  expect(listingRow({...listing,bedrooms:4,bathrooms:2.5,sqft:2100},checkTime)).toMatchObject({kind:'listing',date:'2026-11-23',dateLabel:'Listed',price:340000,source:'Sourced agent · Sourced brokerage',facts:'4 beds · 2.5 baths · 2,100 sq ft',href:listing.public_listing_url});
  expect(listingRow({...listing,listing_agent:null,agency:null},checkTime)?.source).toBe('Approved listing source');
 });
 it.each([['Delmar / Bethlehem','delmar'],['Scotia / Glenville','scotia-glenville'],['Burnt Hills / Ballston Lake','burnt-hills-ballston-lake']])('filters the combined canonical community %s using %s',(city,slug)=>{
  const actual=listingRow({...listing,city,town_slug:null},checkTime);
  expect(actual?.townSlug).toBe(slug);
  expect(filterRows(actual ? [actual] : [],slug,'property','')).toHaveLength(1);
 });
 it('includes actual approved feed towns even when directory metadata lacks them, retaining directory labels',()=>{
  const actual=actualListing('2026-11-23');
  const options=feedTownOptions([{slug:'delmar',name:'Delmar / Bethlehem'}],[actual,{...actual,town:'Delmar',townSlug:'delmar'}]);
  expect(options).toEqual([{slug:'albany',name:'Albany'},{slug:'delmar',name:'Delmar / Bethlehem'}]);
  expect(options.some(t=>t.slug==='empty-town')).toBe(false);
 });
});

 describe('precise identities and equivalent town groups',()=>{
  it('uses factual subcategory before imported category without inventing announcements',()=>{
   expect(businessIdentity('Home Service','Event venue')).toBe('Event venue');
   expect(businessIdentity('Healthcare','Urgent care center')).toBe('Urgent care center');
   expect(businessIdentity('Accountant',null)).toBe('Accountant');
   expect(businessIdentity(null,null)).toBe('Local business');
  });
  it('keeps saved directory snapshots usable without an identity field',()=>{
   expect(rowIdentity({...row,date:'',category:'business',source:'Florist'})).toBe('Florist');
   expect(rowIdentity({...row,category:'property'})).toBe('Property update');
   expect(rowIdentity({...row,category:'finance'})).toBe('Finance update');
   expect(rowIdentity({...row,category:'events'})).toBe('Event');
  });
  it('queries original Bethlehem and Glenville slugs while matching structured listing groups',()=>{
   expect(equivalentFeedTowns('delmar')).toEqual(['delmar','bethlehem','delmar-bethlehem']);
   expect(equivalentFeedTowns('glenville')).toEqual(['glenville','scotia','scotia-glenville']);
   expect(filterRows([{...row,townSlug:'bethlehem'}],'delmar','all','')).toHaveLength(1);
   expect(filterRows([{...row,townSlug:'scotia-glenville'}],'glenville','all','')).toHaveLength(1);
  });
  it('uses real town routes without changing municipality labels or duplicating equivalent dropdowns',()=>{
   expect(feedTownHref('glenville')).toBe('/towns/glenville');
   expect(feedTownHref('scotia-glenville')).toBe('/towns/glenville');
   expect(feedTownHref('bethlehem')).toBe('/towns/bethlehem');
   expect(feedTownOptions([{slug:'delmar',name:'Delmar'},{slug:'bethlehem',name:'Bethlehem'},{slug:'glenville',name:'Glenville'},{slug:'scotia-glenville',name:'Scotia / Glenville'}],[])).toEqual([{slug:'delmar',name:'Delmar / Bethlehem'},{slug:'scotia-glenville',name:'Scotia / Glenville'}]);
  });
 });
