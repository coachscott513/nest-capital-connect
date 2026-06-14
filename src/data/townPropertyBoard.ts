/* Town Property Board — curated sample data per town.
 * Delmar is fully populated as the flagship board.
 * Other towns return empty arrays and the page renders empty-state CTAs.
 */

export type PropertyLink = {
  id: string;
  price: number;
  address: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  propertyType: string; // Single Family, Condo, Multi-Family, Land, Rental
  agentName: string;
  brokerage: string;
  agentId?: string;
  listingUrl: string;
  listedAt?: string; // ISO date
};

export type RentalLink = {
  id: string;
  price: number; // monthly
  address: string;
  beds?: number;
  baths?: number;
  propertyType: string;
  agentName: string;
  brokerage: string;
  listingUrl: string;
};

export type OpenHouse = {
  id: string;
  address: string;
  price: number;
  date: string; // human readable e.g. "Sun Jun 15, 1–3pm"
  agentName: string;
  brokerage: string;
  listingUrl: string;
};

export type SoldRecord = {
  id: string;
  address: string;
  soldPrice: number;
  soldDate: string; // ISO
  agentName: string;
  brokerage: string;
  side: "list" | "buy";
};

export type TownAgent = {
  id: string;
  name: string;
  brokerage: string;
  activeCount: number;
  soldLast12: number;
  featured?: boolean;
  photoUrl?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  youtube?: string;
  activeAddresses?: string[];
  recentSold?: string[];
  profileUrl?: string;
};

export type LocalService = {
  category: string;
  name: string;
  href: string;
};

export type TownPropertyBoard = {
  updatedAt: string; // human readable
  listings: PropertyLink[];
  rentals: RentalLink[];
  openHouses: OpenHouse[];
  agents: TownAgent[];
  sold: SoldRecord[];
  services: LocalService[];
};

const EMPTY_BOARD: TownPropertyBoard = {
  updatedAt: "",
  listings: [],
  rentals: [],
  openHouses: [],
  agents: [],
  sold: [],
  services: [],
};

const DELMAR: TownPropertyBoard = {
  updatedAt: "Updated daily",
  listings: [
    { id: "d1", price: 449000, address: "616 Kenwood Avenue", beds: 4, baths: 2, sqft: 2100, propertyType: "Single Family", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", agentId: "scott-alvarez", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d2", price: 389000, address: "42 Lavery Drive", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", agentId: "scott-alvarez", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d3", price: 525000, address: "137A Elsmere Avenue", beds: 4, baths: 3, sqft: 2450, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d4", price: 299000, address: "88 Adams Street", beds: 3, baths: 1, propertyType: "Single Family", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d5", price: 615000, address: "21 Salisbury Road", beds: 5, baths: 3, sqft: 3100, propertyType: "Single Family", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d6", price: 259000, address: "14 Murray Avenue", beds: 2, baths: 1, propertyType: "Condo", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d7", price: 749000, address: "9 Tamarack Lane", beds: 5, baths: 4, sqft: 3800, propertyType: "Single Family", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d8", price: 339000, address: "57 Fernbank Avenue", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d9", price: 199000, address: "104 Delaware Avenue #3", beds: 2, baths: 1, propertyType: "Condo", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", agentId: "scott-alvarez", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d10", price: 469000, address: "33 Wellington Drive", beds: 4, baths: 2, propertyType: "Single Family", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d11", price: 875000, address: "5 Orchard Lane", beds: 5, baths: 4, sqft: 4200, propertyType: "Single Family", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "d12", price: 359000, address: "212 Cherry Avenue", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "https://scottalvarez.remax.com/" },
  ],
  rentals: [
    { id: "dr1", price: 2200, address: "18 Hudson Avenue", beds: 2, baths: 1, propertyType: "Apartment", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "dr2", price: 2750, address: "44 Salisbury Road", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "dr3", price: 1850, address: "104 Delaware Avenue #5", beds: 1, baths: 1, propertyType: "Condo", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "https://scottalvarez.remax.com/" },
  ],
  openHouses: [
    { id: "doh1", address: "616 Kenwood Avenue", price: 449000, date: "Sun, 1–3pm", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", listingUrl: "https://scottalvarez.remax.com/" },
    { id: "doh2", address: "21 Salisbury Road", price: 615000, date: "Sat, 12–2pm", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "https://scottalvarez.remax.com/" },
  ],
  agents: [
    {
      id: "scott-alvarez",
      name: "Scott Alvarez",
      brokerage: "RE/MAX Solutions",
      activeCount: 3,
      soldLast12: 14,
      featured: true,
      phone: "(518) 522-7265",
      email: "scott@capitaldistrictnest.com",
      website: "https://scottalvarez.remax.com/",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      linkedin: "https://linkedin.com/",
      activeAddresses: ["616 Kenwood Avenue", "42 Lavery Drive", "104 Delaware Avenue #3"],
      recentSold: ["28 Adams Place", "9 Berkshire Boulevard", "71 Fernbank Avenue"],
    },
    { id: "jane-patel", name: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", activeCount: 3, soldLast12: 9 },
    { id: "mark-russo", name: "Mark Russo", brokerage: "Howard Hanna", activeCount: 3, soldLast12: 7 },
    { id: "linda-chen", name: "Linda Chen", brokerage: "Coldwell Banker Prime", activeCount: 3, soldLast12: 11 },
  ],
  sold: [
    { id: "s1", address: "28 Adams Place", soldPrice: 412000, soldDate: "2026-05-20", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", side: "list" },
    { id: "s2", address: "71 Fernbank Avenue", soldPrice: 355000, soldDate: "2026-05-08", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", side: "list" },
    { id: "s3", address: "9 Berkshire Boulevard", soldPrice: 489000, soldDate: "2026-04-22", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", side: "list" },
    { id: "s4", address: "55 Murray Avenue", soldPrice: 325000, soldDate: "2026-04-11", agentName: "Mark Russo", brokerage: "Howard Hanna", side: "list" },
    { id: "s5", address: "12 Orchard Lane", soldPrice: 705000, soldDate: "2026-03-28", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", side: "list" },
    { id: "s6", address: "118 Delaware Avenue", soldPrice: 268000, soldDate: "2026-03-15", agentName: "Scott Alvarez", brokerage: "RE/MAX Solutions", side: "list" },
  ],
  services: [
    { category: "Mortgage Lender", name: "Local Lenders in Delmar", href: "/local?category=mortgage&town=delmar" },
    { category: "Real Estate Attorney", name: "Delmar Closing Attorneys", href: "/local?category=attorney&town=delmar" },
    { category: "Home Inspector", name: "Delmar Inspectors", href: "/local?category=home-inspector&town=delmar" },
    { category: "Title Company", name: "Title & Escrow", href: "/local?category=title&town=delmar" },
    { category: "Contractors", name: "Delmar Contractors", href: "/local?category=contractor&town=delmar" },
    { category: "Movers", name: "Capital District Movers", href: "/local?category=movers&town=delmar" },
  ],
};

const ALBANY: TownPropertyBoard = {
  updatedAt: "Updated during launch",
  listings: [],
  rentals: [],
  openHouses: [],
  agents: [],
  sold: [],
  services: [
    { category: "Mortgage & Lending", name: "Albany Mortgage Lenders", href: "/local?category=mortgage&town=albany" },
    { category: "Insurance", name: "Albany Insurance Agents", href: "/local?category=insurance&town=albany" },
    { category: "Real Estate Attorneys", name: "Albany Closing Attorneys", href: "/local?category=attorney&town=albany" },
    { category: "Inspectors", name: "Albany Home Inspectors", href: "/local?category=home-inspector&town=albany" },
    { category: "Contractors", name: "Albany Contractors", href: "/local?category=contractor&town=albany" },
    { category: "Property Management", name: "Albany Property Managers", href: "/local?category=property-management&town=albany" },
    { category: "Appraisers", name: "Albany Appraisers", href: "/local?category=appraiser&town=albany" },
    { category: "Moving & Storage", name: "Albany Movers & Storage", href: "/local?category=movers&town=albany" },
  ],
};

const BOARDS: Record<string, TownPropertyBoard> = {
  delmar: DELMAR,
  albany: ALBANY,
};

export function getTownBoard(slug?: string): TownPropertyBoard {
  if (!slug) return EMPTY_BOARD;
  return BOARDS[slug] ?? EMPTY_BOARD;
}

export function uniqueBrokerages(board: TownPropertyBoard): number {
  const set = new Set<string>();
  board.agents.forEach((a) => set.add(a.brokerage));
  board.listings.forEach((l) => set.add(l.brokerage));
  return set.size;
}
