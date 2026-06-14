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
  units?: number;
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
    { id: "d1", price: 449000, address: "616 Kenwood Avenue", beds: 4, baths: 2, sqft: 2100, propertyType: "Single Family", agentName: "Listing Agent", brokerage: "Brokerage Pending", listingUrl: "" },
    { id: "d2", price: 389000, address: "42 Lavery Drive", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Listing Agent", brokerage: "Brokerage Pending", listingUrl: "" },
    { id: "d3", price: 525000, address: "137A Elsmere Avenue", beds: 4, baths: 3, sqft: 2450, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "" },
    { id: "d4", price: 299000, address: "88 Adams Street", beds: 3, baths: 1, propertyType: "Single Family", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "" },
    { id: "d5", price: 615000, address: "21 Salisbury Road", beds: 5, baths: 3, sqft: 3100, propertyType: "Single Family", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "" },
    { id: "d6", price: 259000, address: "14 Murray Avenue", beds: 2, baths: 1, propertyType: "Condo", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "" },
    { id: "d7", price: 749000, address: "9 Tamarack Lane", beds: 5, baths: 4, sqft: 3800, propertyType: "Single Family", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "" },
    { id: "d8", price: 339000, address: "57 Fernbank Avenue", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "" },
    { id: "d9", price: 199000, address: "104 Delaware Avenue #3", beds: 2, baths: 1, propertyType: "Condo", agentName: "Listing Agent", brokerage: "Brokerage Pending", listingUrl: "" },
    { id: "d10", price: 469000, address: "33 Wellington Drive", beds: 4, baths: 2, propertyType: "Single Family", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "" },
    { id: "d11", price: 875000, address: "5 Orchard Lane", beds: 5, baths: 4, sqft: 4200, propertyType: "Single Family", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "" },
    { id: "d12", price: 359000, address: "212 Cherry Avenue", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "" },
  ],
  rentals: [
    { id: "dr1", price: 2200, address: "18 Hudson Avenue", beds: 2, baths: 1, propertyType: "Apartment", agentName: "Listing Agent", brokerage: "Brokerage Pending", listingUrl: "" },
    { id: "dr2", price: 2750, address: "44 Salisbury Road", beds: 3, baths: 2, propertyType: "Single Family", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", listingUrl: "" },
    { id: "dr3", price: 1850, address: "104 Delaware Avenue #5", beds: 1, baths: 1, propertyType: "Condo", agentName: "Mark Russo", brokerage: "Howard Hanna", listingUrl: "" },
  ],
  openHouses: [
    { id: "doh1", address: "616 Kenwood Avenue", price: 449000, date: "Sun, 1–3pm", agentName: "Listing Agent", brokerage: "Brokerage Pending", listingUrl: "" },
    { id: "doh2", address: "21 Salisbury Road", price: 615000, date: "Sat, 12–2pm", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", listingUrl: "" },
  ],
  agents: [
    { id: "listing-agent-tbd", name: "Listing Agent", brokerage: "Brokerage Pending", activeCount: 3, soldLast12: 0 },
    { id: "jane-patel", name: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", activeCount: 3, soldLast12: 9 },
    { id: "mark-russo", name: "Mark Russo", brokerage: "Howard Hanna", activeCount: 3, soldLast12: 7 },
    { id: "linda-chen", name: "Linda Chen", brokerage: "Coldwell Banker Prime", activeCount: 3, soldLast12: 11 },
  ],
  sold: [
    { id: "s1", address: "28 Adams Place", soldPrice: 412000, soldDate: "2026-05-20", agentName: "Listing Agent", brokerage: "Brokerage Pending", side: "list" },
    { id: "s2", address: "71 Fernbank Avenue", soldPrice: 355000, soldDate: "2026-05-08", agentName: "Listing Agent", brokerage: "Brokerage Pending", side: "list" },
    { id: "s3", address: "9 Berkshire Boulevard", soldPrice: 489000, soldDate: "2026-04-22", agentName: "Linda Chen", brokerage: "Coldwell Banker Prime", side: "list" },
    { id: "s4", address: "55 Murray Avenue", soldPrice: 325000, soldDate: "2026-04-11", agentName: "Mark Russo", brokerage: "Howard Hanna", side: "list" },
    { id: "s5", address: "12 Orchard Lane", soldPrice: 705000, soldDate: "2026-03-28", agentName: "Jane Patel", brokerage: "Berkshire Hathaway HomeServices", side: "list" },
    { id: "s6", address: "118 Delaware Avenue", soldPrice: 268000, soldDate: "2026-03-15", agentName: "Listing Agent", brokerage: "Brokerage Pending", side: "list" },
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
  updatedAt: "Property links updated during launch · Agent public links being added",
  listings: [
    { id: "202614666", price: 79000, address: "450 Hudson Avenue", beds: 4, baths: 2.0, sqft: 1200, units: 1, propertyType: "Single Family", agentName: "Eileen Buonome", brokerage: "Coldwell Banker Prime Properties", agentId: "eileen-buonome", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614535", price: 225000, address: "26 Link Street", beds: 3, baths: 1.0, sqft: 1134, units: 1, propertyType: "Single Family", agentName: "June Bartlett", brokerage: "Howard Hanna Capital Inc", agentId: "june-bartlett", listingUrl: "", listedAt: "2026-04-07" },
    { id: "202614330", price: 275000, address: "82 Crestwood Terrace", beds: 4, baths: 3.0, sqft: 1476, units: 1, propertyType: "Condo", agentName: "Scott P Varley", brokerage: "KW Platform", agentId: "scott-p-varley", listingUrl: "", listedAt: "2026-04-02" },
    { id: "202614354", price: 299000, address: "2 Glenwood Street", beds: 3, baths: 2.0, sqft: 1824, units: 1, propertyType: "Single Family", agentName: "Patrick Hartman", brokerage: "Field Realty", agentId: "patrick-hartman", listingUrl: "", listedAt: "2026-04-02" },
    { id: "202614480", price: 185000, address: "39 Orlando Avenue", beds: 2, baths: 1.0, sqft: 672, units: 1, propertyType: "Single Family", agentName: "Samantha M Curry", brokerage: "New Scotland Realty", agentId: "samantha-m-curry", listingUrl: "", listedAt: "2026-04-04" },
    { id: "202614378", price: 181000, address: "196 Morton Avenue", beds: 1, baths: 1.0, sqft: 1050, units: 1, propertyType: "Condo", agentName: "Carole Amy Pisinski", brokerage: "Howard Hanna Capital Inc", agentId: "carole-amy-pisinski", listingUrl: "", listedAt: "2026-04-01" },
    { id: "202614679", price: 260000, address: "181 Milner Avenue", beds: 2, baths: 1.0, sqft: 906, units: 1, propertyType: "Single Family", agentName: "Melissa Matey", brokerage: "Miranda Real Estate Group Inc", agentId: "melissa-matey", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614409", price: 179900, address: "7 Carroll Terrace", beds: 3, baths: 2.0, sqft: 2116, units: 1, propertyType: "Single Family", agentName: "Carmella Richards", brokerage: "Venture Fox Realty Group LLC", agentId: "carmella-richards", listingUrl: "", listedAt: "2026-04-02" },
    { id: "202614447", price: 109000, address: "12 Quail Street", beds: 2, baths: 1.0, sqft: 966, units: 1, propertyType: "Single Family", agentName: "Ana Zairy Castillo Penalo", brokerage: "Kastle Realty LLC", agentId: "ana-zairy-castillo-penalo", listingUrl: "", listedAt: "2026-04-03" },
    { id: "202614479", price: 575000, address: "165 Lancaster Street", beds: 4, baths: 3.0, sqft: 2712, units: 1, propertyType: "Single Family", agentName: "Eileen L Faist", brokerage: "Old Albany Real Estate LLC", agentId: "eileen-l-faist", listingUrl: "", listedAt: "2026-04-04" },
    { id: "202614610", price: 199900, address: "80 Crestwood Terrace", beds: 2, baths: 2.0, sqft: 1084, units: 1, propertyType: "Townhouse", agentName: "Jason D Young", brokerage: "Real Broker NY LLC", agentId: "jason-d-young", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614710", price: 289900, address: "21 Hopewell Street", beds: 4, baths: 1.0, sqft: 1220, units: 1, propertyType: "Single Family", agentName: "Donna Z Goldslager", brokerage: "Howard Hanna Capital Inc", agentId: "donna-z-goldslager", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614617", price: 199000, address: "555 Delaware Avenue", beds: 2, baths: 1.0, sqft: 1170, units: 1, propertyType: "Single Family", agentName: "Christy L Gillespie-Quinn", brokerage: "Country Boy Realty", agentId: "christy-l-gillespie-quinn", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614609", price: 70000, address: "57 O Connell Street", beds: 3, baths: 2.0, sqft: 1584, units: 1, propertyType: "Single Family", agentName: "Michael A Bryan", brokerage: "Coldwell Banker Prime Properties", agentId: "michael-a-bryan", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614333", price: 359900, address: "447 Ontario Street", beds: 6, sqft: 2200, units: 2, propertyType: "Duplex", agentName: "Michael A Giuffre", brokerage: "Miranda Real Estate Group Inc", agentId: "michael-a-giuffre", listingUrl: "", listedAt: "2026-04-02" },
    { id: "202614498", price: 499800, address: "261 New Scotland Avenue", baths: 5.0, units: 1, propertyType: "Mixed Use", agentName: "Daniel Grebert", brokerage: "Gucciardo Real Estate LLC", agentId: "daniel-grebert", listingUrl: "", listedAt: "2026-04-06" },
    { id: "202614554", price: 419999, address: "97 Henry Johnson Boulevard", units: 1, propertyType: "Mixed Use", agentName: "Stephen Gray", brokerage: "KW Platform", agentId: "stephen-gray", listingUrl: "", listedAt: "2026-04-07" },
    { id: "202614748", price: 399000, address: "370 Clinton Avenue", beds: 5, sqft: 2652, units: 3, propertyType: "Triple", agentName: "Colin McDonald", brokerage: "McDonald Real Estate Comp LLC", agentId: "colin-mcdonald", listingUrl: "", listedAt: "2026-04-09" },
    { id: "202614749", price: 399000, address: "372 Clinton Avenue", beds: 5, sqft: 1466, units: 3, propertyType: "Triple", agentName: "Colin McDonald", brokerage: "McDonald Real Estate Comp LLC", agentId: "colin-mcdonald", listingUrl: "", listedAt: "2026-04-09" },
    { id: "202614424", price: 299900, address: "538 New Scotland Avenue", beds: 5, sqft: 1720, units: 2, propertyType: "Duplex", agentName: "Steve Duggan", brokerage: "RE/MAX Capital", agentId: "steve-duggan", listingUrl: "", listedAt: "2026-04-03" },
    { id: "202614397", price: 174990, address: "73 Dana Avenue", beds: 6, sqft: 1812, units: 2, propertyType: "Duplex", agentName: "Armando Valdes", brokerage: "All in 1 Realty LLC", agentId: "armando-valdes", listingUrl: "", listedAt: "2026-03-30" },
    { id: "202614399", price: 124990, address: "619 3rd Street", beds: 4, sqft: 2116, units: 2, propertyType: "Duplex", agentName: "Armando Valdes", brokerage: "All in 1 Realty LLC", agentId: "armando-valdes", listingUrl: "", listedAt: "2026-03-30" },
    { id: "202614449", price: 199000, address: "796 Livingston Avenue", beds: 4, sqft: 1672, units: 2, propertyType: "Duplex", agentName: "Ana Zairy Castillo Penalo", brokerage: "Kastle Realty LLC", agentId: "ana-zairy-castillo-penalo", listingUrl: "", listedAt: "2026-04-03" },
    { id: "202614547", price: 145000, address: "501 2nd Street", beds: 3, sqft: 1540, units: 2, propertyType: "Duplex", agentName: "Natalie Pinkham", brokerage: "Berkshire Hathaway HomeServices Blake, REALTORS", agentId: "natalie-pinkham", listingUrl: "", listedAt: "2026-04-07" },
    { id: "202614522", price: 285000, address: "74 Philip Street", beds: 4, sqft: 2340, units: 3, propertyType: "Triple", agentName: "Andrea Tallman", brokerage: "KW Platform", agentId: "andrea-tallman", listingUrl: "", listedAt: "2026-04-06" },
    { id: "202614496", price: 324900, address: "20 Delaware Terrace", beds: 6, sqft: 2432, units: 2, propertyType: "Duplex", agentName: "Samuel J Thompson", brokerage: "Thompson Real Estate Team", agentId: "samuel-j-thompson", listingUrl: "", listedAt: "2026-04-06" },
    { id: "202614559", price: 265000, address: "346-348 Leedale Street", beds: 6, sqft: 2592, units: 2, propertyType: "Duplex", agentName: "Christopher Maley", brokerage: "Miranda Real Estate Group Inc", agentId: "christopher-maley", listingUrl: "", listedAt: "2026-04-07" },
    { id: "202614635", price: 790000, address: "29 Dove Street", beds: 5, sqft: 3193, units: 3, propertyType: "Triple", agentName: "John Alund", brokerage: "Lincoln House Realty", agentId: "john-alund", listingUrl: "", listedAt: "2026-04-07" },
    { id: "202614614", price: 419999, address: "97 Henry Johnson Boulevard", beds: 6, sqft: 3666, units: 2, propertyType: "Duplex", agentName: "Stephen Gray", brokerage: "KW Platform", agentId: "stephen-gray", listingUrl: "", listedAt: "2026-04-07" },
    { id: "202614643", price: 369900, address: "290 Morton Avenue", beds: 6, sqft: 2020, units: 4, propertyType: "Quad", agentName: "Kevin Clancy", brokerage: "Clancy Real Estate", agentId: "kevin-clancy", listingUrl: "", listedAt: "2026-04-08" },
    { id: "202614742", price: 172904, address: "382 1st Street", beds: 4, sqft: 1960, units: 2, propertyType: "Duplex", agentName: "Kaile White", brokerage: "KW Platform", agentId: "kaile-white", listingUrl: "", listedAt: "2026-04-09" },
  ],
  rentals: [],
  openHouses: [],
  agents: [
    { id: "stephen-gray", name: "Stephen Gray", brokerage: "KW Platform", activeCount: 2, soldLast12: 0 },
    { id: "colin-mcdonald", name: "Colin McDonald", brokerage: "McDonald Real Estate Comp LLC", activeCount: 2, soldLast12: 0 },
    { id: "armando-valdes", name: "Armando Valdes", brokerage: "All in 1 Realty LLC", activeCount: 2, soldLast12: 0 },
    { id: "ana-zairy-castillo-penalo", name: "Ana Zairy Castillo Penalo", brokerage: "Kastle Realty LLC", activeCount: 2, soldLast12: 0 },
    { id: "eileen-buonome", name: "Eileen Buonome", brokerage: "Coldwell Banker Prime Properties", activeCount: 1, soldLast12: 0 },
    { id: "june-bartlett", name: "June Bartlett", brokerage: "Howard Hanna Capital Inc", activeCount: 1, soldLast12: 0 },
    { id: "michael-a-giuffre", name: "Michael A Giuffre", brokerage: "Miranda Real Estate Group Inc", activeCount: 1, soldLast12: 0 },
    { id: "scott-p-varley", name: "Scott P Varley", brokerage: "KW Platform", activeCount: 1, soldLast12: 0 },
    { id: "daniel-grebert", name: "Daniel Grebert", brokerage: "Gucciardo Real Estate LLC", activeCount: 1, soldLast12: 0 },
    { id: "patrick-hartman", name: "Patrick Hartman", brokerage: "Field Realty", activeCount: 1, soldLast12: 0 },
    { id: "samantha-m-curry", name: "Samantha M Curry", brokerage: "New Scotland Realty", activeCount: 1, soldLast12: 0 },
    { id: "carole-amy-pisinski", name: "Carole Amy Pisinski", brokerage: "Howard Hanna Capital Inc", activeCount: 1, soldLast12: 0 },
    { id: "steve-duggan", name: "Steve Duggan", brokerage: "RE/MAX Capital", activeCount: 1, soldLast12: 0 },
    { id: "melissa-matey", name: "Melissa Matey", brokerage: "Miranda Real Estate Group Inc", activeCount: 1, soldLast12: 0 },
    { id: "carmella-richards", name: "Carmella Richards", brokerage: "Venture Fox Realty Group LLC", activeCount: 1, soldLast12: 0 },
    { id: "natalie-pinkham", name: "Natalie Pinkham", brokerage: "Berkshire Hathaway HomeServices Blake, REALTORS", activeCount: 1, soldLast12: 0 },
    { id: "andrea-tallman", name: "Andrea Tallman", brokerage: "KW Platform", activeCount: 1, soldLast12: 0 },
    { id: "samuel-j-thompson", name: "Samuel J Thompson", brokerage: "Thompson Real Estate Team", activeCount: 1, soldLast12: 0 },
    { id: "christopher-maley", name: "Christopher Maley", brokerage: "Miranda Real Estate Group Inc", activeCount: 1, soldLast12: 0 },
    { id: "eileen-l-faist", name: "Eileen L Faist", brokerage: "Old Albany Real Estate LLC", activeCount: 1, soldLast12: 0 },
    { id: "jason-d-young", name: "Jason D Young", brokerage: "Real Broker NY LLC", activeCount: 1, soldLast12: 0 },
    { id: "donna-z-goldslager", name: "Donna Z Goldslager", brokerage: "Howard Hanna Capital Inc", activeCount: 1, soldLast12: 0 },
    { id: "john-alund", name: "John Alund", brokerage: "Lincoln House Realty", activeCount: 1, soldLast12: 0 },
    { id: "christy-l-gillespie-quinn", name: "Christy L Gillespie-Quinn", brokerage: "Country Boy Realty", activeCount: 1, soldLast12: 0 },
    { id: "michael-a-bryan", name: "Michael A Bryan", brokerage: "Coldwell Banker Prime Properties", activeCount: 1, soldLast12: 0 },
    { id: "kevin-clancy", name: "Kevin Clancy", brokerage: "Clancy Real Estate", activeCount: 1, soldLast12: 0 },
    { id: "kaile-white", name: "Kaile White", brokerage: "KW Platform", activeCount: 1, soldLast12: 0 },
  ],
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
