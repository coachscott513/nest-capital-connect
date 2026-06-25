// Hand-curated "Property Brief" featured properties.
// These are NOT MLS pulls. They are local property briefs built from
// publicly-visible facts, with the original listing source linked.
// Default status is unclaimed_preview until the listing source / agent
// confirms display and provides approved photos/contact info.

export type FeaturedProperty = {
  slug: string;
  townSlug: string;
  status: "unclaimed_preview" | "claimed";
  address: {
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  listingStatus: string; // Pending, Active, etc.
  price: number;
  propertyType: string;
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  lotSizeSqft: number;
  pricePerSqft: number;
  annualTaxes: number;
  taxAssessedValue?: number;
  projectedMonthlyRent?: number;
  annualSellerPaidUtilities?: number;
  garage?: string;
  parking?: string;
  heating?: string;
  cooling?: string;
  sewer?: string;
  water?: string;
  region: string;
  mls: { name: string; number: string };
  brokerage: { name: string; phone?: string };
  agent: { name: string; phone?: string; initials: string };
  source: { name: string; url: string };
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
  summary: string;
  details: {
    exterior?: string;
    roof?: string;
    foundation?: string;
    attachedStructure?: string;
  };
  interior: {
    fullBaths?: number;
    flooring?: string;
    basement?: string;
    fireplace?: string;
    laundry?: string;
  };
  financial: {
    ownership?: string;
    tenantPays?: string;
  };
  location: {
    nearby: string[];
  };
  schools: string[];
};

export const featuredProperties: FeaturedProperty[] = [
  {
    slug: "128-hamilton-street",
    townSlug: "albany",
    status: "unclaimed_preview",
    address: {
      line1: "128 Hamilton Street",
      city: "Albany",
      state: "NY",
      zip: "12207",
    },
    listingStatus: "Pending",
    price: 325000,
    propertyType: "Quadruplex / Multi-Family",
    beds: 5,
    baths: 4,
    sqft: 4352,
    yearBuilt: 1858,
    lotSizeSqft: 2613,
    pricePerSqft: 75,
    annualTaxes: 7591,
    taxAssessedValue: 288542,
    projectedMonthlyRent: 5500,
    annualSellerPaidUtilities: 3947.16,
    garage: "Oversized 2-car detached garage",
    parking: "2 spaces",
    heating: "Hot Water / Radiant",
    cooling: "None",
    sewer: "Public Sewer",
    water: "Public",
    region: "Albany",
    mls: { name: "Global MLS", number: "202614160" },
    brokerage: { name: "Coldwell Banker Prime Properties", phone: "518-439-9600" },
    agent: { name: "Michael Keefrider", phone: "518-423-0481", initials: "MK" },
    source: {
      name: "Zillow",
      url: "https://www.zillow.com/homedetails/128-Hamilton-St-Albany-NY-12207/29656240_zpid/",
    },
    walkScore: 93,
    transitScore: 67,
    bikeScore: 62,
    summary:
      "128 Hamilton Street is a pending Albany multi-family / quadruplex property listed at $325,000 with 5 beds, 4 baths, and 4,352 sqft. The listing notes projected rent potential up to $5,500/month and an oversized 2-car garage.",
    details: {
      exterior: "Brick",
      roof: "Rubber",
      foundation: "Brick / Mortar",
      attachedStructure: "Yes",
    },
    interior: {
      fullBaths: 4,
      flooring: "Wood, Ceramic Tile, Laminate",
      basement: "Apartment / Exterior Entry / Finished / Full / Heated",
      fireplace: "Yes",
      laundry: "None",
    },
    financial: {
      ownership: "LLC",
      tenantPays: "Other, Internet, Cable TV, Electricity, Gas",
    },
    location: {
      nearby: [
        "MVP Arena",
        "Empire State Plaza",
        "Albany Capital Center",
        "Cafe Capriccio",
        "I-87",
      ],
    },
    schools: [
      "Giffen Memorial Elementary School",
      "Stephen and Harriet Myers Middle School",
      "Albany High School",
    ],
  },
];

export const getFeaturedProperty = (
  townSlug?: string,
  slug?: string,
): FeaturedProperty | undefined =>
  featuredProperties.find((p) => p.townSlug === townSlug && p.slug === slug);

export const getFeaturedForTown = (townSlug?: string): FeaturedProperty[] =>
  featuredProperties.filter((p) => p.townSlug === townSlug);
