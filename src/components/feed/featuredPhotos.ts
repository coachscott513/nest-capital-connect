import jackPhoto from '@/assets/listings/jack-drive.webp.asset.json';
import skidmorePhoto from '@/assets/listings/skidmore-drive.webp.asset.json';
import { publicUrl, type FeedRow } from './feedModel';

// Approved imagery is keyed only by the immutable listing UUID, never address/town/brokerage text.
const references: Record<string, { photo: string; example?: boolean; mls: string }> = {
  'listing:c8c69f9d-81a5-4f8e-a658-abe08529e4f3': {
    photo: jackPhoto.url, example: true,
    mls: 'https://www.scottfilm.com/homes-for-sale/19-Jack-Drive-Mechanicville-NY-12118-442374277',
  },
  'listing:b3d47359-a2c3-4fcb-92be-46da150a0873': {
    photo: skidmorePhoto.url,
    mls: 'https://www.coldwellbankerprime.com/p/20-Skidmore-Drive-Saratoga-Springs-NY-12866/dmgid_190840344',
  },
};
export function featuredPhoto(row: FeedRow) {
  if (row.kind !== 'listing') return {};
  const reference = references[row.id];
  return {
    src: publicUrl(row.photoUrl) || reference?.photo,
    example: reference?.example === true,
    mls: reference?.mls,
  };
}