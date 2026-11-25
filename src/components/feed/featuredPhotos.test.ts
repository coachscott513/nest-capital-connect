import { describe, expect, it } from 'vitest';
import { featuredPhoto } from './featuredPhotos';
import { listingRow, type FeedRow } from './feedModel';
const row: FeedRow = {id:'listing:c8c69f9d-81a5-4f8e-a658-abe08529e4f3',kind:'listing',category:'property',title:'19 Jack Drive',town:'Halfmoon',townSlug:'halfmoon',date:'2026-11-23',dateLabel:'Listed',source:'John W Mesko',href:'https://john-mesko.coldwellbankerprime.com/'};
describe('approved featured imagery', () => {
  it('uses Jack Drive imagery only for the supplied exact UUID and marks examples', () => {
    expect(featuredPhoto(row).src).toContain('jack-drive-example-finishes.webp');
    expect(featuredPhoto(row).example).toBe(true);
    expect(featuredPhoto(row).mls).toBe('https://www.scottfilm.com/homes-for-sale/19-Jack-Drive-Mechanicville-NY-12118-442374277');
    expect(featuredPhoto({...row,id:'listing:another'}).src).toBeUndefined();
  });
  it('uses the exact Skidmore UUID without describing its photo as examples', () => {
    const photo=featuredPhoto({...row,id:'listing:b3d47359-a2c3-4fcb-92be-46da150a0873'});
    expect(photo.src).toContain('skidmore-drive-exterior.webp');
    expect(photo.example).toBe(false);
    expect(photo.mls).toBe('https://www.coldwellbankerprime.com/p/20-Skidmore-Drive-Saratoga-Springs-NY-12866/dmgid_190840344');
  });
  it('prefers supplied public HTTP(S) images and rejects executable image URLs', () => {
    expect(featuredPhoto({...row,photoUrl:'https://example.org/current.jpg'}).src).toBe('https://example.org/current.jpg');
    expect(featuredPhoto({...row,id:'listing:unknown',photoUrl:'javascript:alert(1)'}).src).toBeUndefined();
    expect(featuredPhoto({...row,id:'listing:unknown',photoUrl:'http://example.org/photo.jpg'}).src).toBe('http://example.org/photo.jpg');
  });
  it('adapts only a safe live photo URL without altering approved listing destination', () => {
    const record={id:'one',full_address:'Address',city:'Halfmoon',town_slug:'halfmoon',list_date:'2026-11-23',list_price:123,public_listing_url:row.href,public_listing_url_approved:true,status:'A',listing_agent:'Agent',agency:'Agency',photo_url:'https://example.org/live.jpg'};
    expect(listingRow(record,new Date('2026-11-25T23:29:00Z'))).toMatchObject({photoUrl:record.photo_url,href:row.href});
    expect(listingRow({...record,photo_url:'data:image/png;base64,not-public'},new Date('2026-11-25T23:29:00Z'))?.photoUrl).toBeUndefined();
  });
});