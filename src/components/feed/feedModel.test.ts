import { describe,it,expect } from 'vitest';
import { FEED_EDITIONS, chronologicalRows, eventRow, filterRows, listingRow, newRowCount, publicUrl, storyRow, type FeedRow } from './feedModel';
const row:FeedRow={id:'story:1',category:'local_news',title:'Town meeting',town:'Troy',townSlug:'troy',date:'2026-11-20T12:00:00Z',dateLabel:'Published',source:'Publisher',href:'https://example.org/story'};
describe('neutral feed source rules',()=>{
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
