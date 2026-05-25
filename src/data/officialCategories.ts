// Official 54-category source of truth used across /local search, filters,
// town pages, and business cards. DB rows may carry legacy/Google labels
// (e.g. "Home Service", "Bank/Credit Union", "Real estate agent") — the
// alias map below normalizes any of those into one of the 54 canonical
// categories. Keep this file as the single source of truth.

export const OFFICIAL_CATEGORIES = [
  "Accounting",
  "Advertising and Marketing",
  "Agriculture",
  "Architecture",
  "Automotive Repair",
  "Automotive Sales",
  "Banking and Finance",
  "Beauty and Personal Care",
  "Catering",
  "Cleaning Services",
  "Construction",
  "Consulting",
  "Dental",
  "Education",
  "Electrician",
  "Engineering",
  "Entertainment",
  "Fitness",
  "Florist",
  "Food and Beverage",
  "Graphic Design",
  "Healthcare",
  "Home Improvement",
  "Hospitality",
  "HVAC",
  "Information Technology",
  "Insurance",
  "Interior Design",
  "Janitorial Services",
  "Landscaping",
  "Legal Services",
  "Logistics",
  "Manufacturing",
  "Media and Publishing",
  "Nonprofit",
  "Painting",
  "Pest Control",
  "Pet Services",
  "Photography",
  "Plumbing",
  "Property Management",
  "Real Estate",
  "Restaurant",
  "Retail",
  "Roofing",
  "Salon and Spa",
  "Security Services",
  "Software",
  "Staffing and Recruiting",
  "Telecommunications",
  "Travel and Tourism",
  "Trucking",
  "Veterinary",
  "Wholesale",
] as const;

export type OfficialCategory = (typeof OFFICIAL_CATEGORIES)[number];

// Each official category → list of lowercase substrings that any of these
// fields can contain to count as a match: category, subcategory, tags,
// name, description. All comparisons are case-insensitive substring.
export const CATEGORY_ALIASES: Record<OfficialCategory, string[]> = {
  "Accounting": ["accountant", "accounting", "cpa", "bookkeep", "tax prep", "tax service"],
  "Advertising and Marketing": ["marketing", "advertising", "ad agency", "branding", "seo", "pr firm", "public relations"],
  "Agriculture": ["farm", "agriculture", "agricultural", "orchard", "vineyard", "ranch", "dairy"],
  "Architecture": ["architect", "architecture", "architectural"],
  "Automotive Repair": ["auto repair", "mechanic", "body shop", "tire", "muffler", "oil change", "transmission", "collision"],
  "Automotive Sales": ["car dealer", "auto dealer", "dealership", "used cars", "auto sales", "automotive sales"],
  "Banking and Finance": ["bank", "credit union", "mortgage", "lender", "loan", "finance", "financial", "investment advisor", "wealth"],
  "Beauty and Personal Care": ["beauty", "cosmetic", "skincare", "makeup", "barber", "waxing", "lash", "brow", "personal care"],
  "Catering": ["catering", "caterer", "private chef"],
  "Cleaning Services": ["cleaner", "cleaning", "maid", "housekeep", "carpet clean", "janitorial"],
  "Construction": ["construction", "contractor", "builder", "general contractor", "remodel", "renovation", "framing", "excavation"],
  "Consulting": ["consultant", "consulting", "advisory"],
  "Dental": ["dentist", "dental", "orthodont", "endodont", "periodont", "oral surgeon"],
  "Education": ["school", "academy", "tutor", "tutoring", "education", "preschool", "daycare", "learning center", "college", "university"],
  "Electrician": ["electric", "electrician", "electrical"],
  "Engineering": ["engineer", "engineering", "civil engineer", "structural"],
  "Entertainment": ["entertainment", "theater", "theatre", "cinema", "arcade", "bowling", "live music", "comedy"],
  "Fitness": ["gym", "fitness", "yoga", "pilates", "crossfit", "personal trainer", "martial arts"],
  "Florist": ["florist", "flowers", "flower shop", "bouquet"],
  "Food and Beverage": ["bakery", "coffee", "cafe", "café", "bar", "pub", "tavern", "brewery", "distillery", "winery", "deli", "grocery", "ice cream", "juice"],
  "Graphic Design": ["graphic design", "designer", "logo design", "branding studio"],
  "Healthcare": ["doctor", "physician", "medical", "clinic", "hospital", "urgent care", "pediatric", "chiropractor", "physical therapy", "dermatolog", "cardiolog"],
  "Home Improvement": ["home service", "home services", "home improvement", "handyman", "remodel", "kitchen", "bath", "deck", "window", "siding", "flooring", "cabinet"],
  "Hospitality": ["hotel", "motel", "inn", "bed and breakfast", "b&b", "resort", "lodging"],
  "HVAC": ["hvac", "heating", "cooling", "furnace", "air conditioning", "ac repair"],
  "Information Technology": ["it service", "it support", "computer repair", "managed services", "msp", "network", "cybersecurity"],
  "Insurance": ["insurance", "insurer", "underwriter"],
  "Interior Design": ["interior design", "interior decorator", "stager", "staging"],
  "Janitorial Services": ["janitor", "janitorial", "commercial cleaning"],
  "Landscaping": ["landscap", "lawn care", "lawn service", "tree service", "arborist", "hardscape", "snow removal"],
  "Legal Services": ["attorney", "lawyer", "law firm", "legal", "paralegal", "title agency", "title company"],
  "Logistics": ["logistics", "shipping", "freight", "warehousing", "fulfillment"],
  "Manufacturing": ["manufacturer", "manufacturing", "fabrication", "machine shop"],
  "Media and Publishing": ["newspaper", "magazine", "publisher", "publishing", "media company", "podcast studio"],
  "Nonprofit": ["nonprofit", "non-profit", "charity", "foundation", "community organization"],
  "Painting": ["painter", "painting", "house painter"],
  "Pest Control": ["pest", "exterminator", "termite"],
  "Pet Services": ["pet", "groomer", "grooming", "kennel", "doggy daycare", "dog walker", "pet store"],
  "Photography": ["photographer", "photography", "photo studio"],
  "Plumbing": ["plumb"],
  "Property Management": ["property management", "property manager"],
  "Real Estate": ["real estate", "realtor", "brokerage", "real estate agent", "real estate agency"],
  "Restaurant": ["restaurant", "diner", "grill", "bistro", "pizzeria", "steakhouse", "sushi", "thai", "chinese restaurant", "italian restaurant", "mexican restaurant", "indian restaurant", "japanese restaurant", "american restaurant", "irish pub", "eatery"],
  "Retail": ["retail", "shop", "store", "boutique", "bookstore", "gift shop"],
  "Roofing": ["roof", "roofer", "roofing"],
  "Salon and Spa": ["salon", "spa", "hair salon", "nail salon", "barbershop", "day spa", "med spa"],
  "Security Services": ["security", "alarm", "surveillance", "locksmith"],
  "Software": ["software", "saas", "app developer", "web developer", "development studio"],
  "Staffing and Recruiting": ["staffing", "recruit", "recruiter", "employment agency", "temp agency"],
  "Telecommunications": ["telecom", "internet provider", "isp", "wireless", "phone service"],
  "Travel and Tourism": ["travel agency", "tour", "tourism", "vacation", "cruise"],
  "Trucking": ["trucking", "freight hauling", "moving company", "movers"],
  "Veterinary": ["veterinar", "vet clinic", "animal hospital"],
  "Wholesale": ["wholesale", "distributor", "supply company"],
};

// Lowercased search words/phrases people type → which official category they
// should expand to. Powers the search box so "lender" hits Banking and Finance,
// "ac" hits HVAC, "lawyer" hits Legal Services, etc.
export const SEARCH_TERM_TO_CATEGORY: Record<string, OfficialCategory[]> = {
  "restaurant": ["Restaurant"], "restaurants": ["Restaurant"],
  "dining": ["Restaurant"], "eatery": ["Restaurant"], "diner": ["Restaurant"],
  "food": ["Restaurant", "Food and Beverage"], "drink": ["Food and Beverage"],
  "cafe": ["Food and Beverage"], "café": ["Food and Beverage"], "coffee": ["Food and Beverage"],
  "bar": ["Food and Beverage"], "pub": ["Food and Beverage"], "brewery": ["Food and Beverage"],
  "bakery": ["Food and Beverage"], "bakeries": ["Food and Beverage"],
  "pizza": ["Restaurant"], "pizzeria": ["Restaurant"],
  "mortgage": ["Banking and Finance"], "lender": ["Banking and Finance"],
  "bank": ["Banking and Finance"], "loan": ["Banking and Finance"],
  "finance": ["Banking and Finance"], "financial": ["Banking and Finance"],
  "credit union": ["Banking and Finance"],
  "attorney": ["Legal Services"], "attorneys": ["Legal Services"],
  "lawyer": ["Legal Services"], "lawyers": ["Legal Services"], "law": ["Legal Services"],
  "legal": ["Legal Services"], "closing attorney": ["Legal Services"],
  "contractor": ["Construction", "Home Improvement"], "contractors": ["Construction", "Home Improvement"],
  "construction": ["Construction"], "builder": ["Construction"], "renovation": ["Construction", "Home Improvement"],
  "handyman": ["Home Improvement"], "remodel": ["Home Improvement"],
  "roof": ["Roofing"], "roofer": ["Roofing"], "roofers": ["Roofing"], "roofing": ["Roofing"],
  "electric": ["Electrician"], "electrician": ["Electrician"], "electricians": ["Electrician"],
  "plumber": ["Plumbing"], "plumbers": ["Plumbing"], "plumbing": ["Plumbing"],
  "hvac": ["HVAC"], "heating": ["HVAC"], "cooling": ["HVAC"], "ac": ["HVAC"], "furnace": ["HVAC"],
  "doctor": ["Healthcare"], "medical": ["Healthcare"], "clinic": ["Healthcare"], "physician": ["Healthcare"],
  "dentist": ["Dental"], "dentists": ["Dental"], "dental": ["Dental"],
  "salon": ["Salon and Spa", "Beauty and Personal Care"], "salons": ["Salon and Spa"],
  "spa": ["Salon and Spa"], "hair": ["Salon and Spa"], "nails": ["Salon and Spa"], "nail": ["Salon and Spa"],
  "barber": ["Salon and Spa"], "beauty": ["Beauty and Personal Care"],
  "gym": ["Fitness"], "gyms": ["Fitness"], "fitness": ["Fitness"],
  "yoga": ["Fitness"], "pilates": ["Fitness"], "personal trainer": ["Fitness"],
  "insurance": ["Insurance"], "insurance agent": ["Insurance"],
  "accountant": ["Accounting"], "accountants": ["Accounting"], "cpa": ["Accounting"],
  "tax": ["Accounting"], "bookkeeper": ["Accounting"], "bookkeeping": ["Accounting"],
  "realtor": ["Real Estate"], "realtors": ["Real Estate"], "real estate": ["Real Estate"],
  "real estate agent": ["Real Estate"], "brokerage": ["Real Estate"],
  "property manager": ["Property Management"], "property management": ["Property Management"],
  "landscaping": ["Landscaping"], "landscaper": ["Landscaping"], "landscapers": ["Landscaping"],
  "lawn": ["Landscaping"], "tree service": ["Landscaping"],
  "cleaning": ["Cleaning Services"], "cleaner": ["Cleaning Services"], "cleaners": ["Cleaning Services"],
  "maid": ["Cleaning Services"], "janitor": ["Janitorial Services"], "janitorial": ["Janitorial Services"],
  "pet": ["Pet Services"], "groomer": ["Pet Services"], "grooming": ["Pet Services"],
  "vet": ["Veterinary"], "veterinarian": ["Veterinary"],
  "auto": ["Automotive Repair", "Automotive Sales"], "mechanic": ["Automotive Repair"],
  "car repair": ["Automotive Repair"], "body shop": ["Automotive Repair"],
  "car dealer": ["Automotive Sales"], "dealership": ["Automotive Sales"],
  "painter": ["Painting"], "painting": ["Painting"], "painters": ["Painting"],
  "pest": ["Pest Control"], "exterminator": ["Pest Control"],
  "florist": ["Florist"], "flowers": ["Florist"],
  "photographer": ["Photography"], "photography": ["Photography"],
  "marketing": ["Advertising and Marketing"], "advertising": ["Advertising and Marketing"],
  "ad agency": ["Advertising and Marketing"], "seo": ["Advertising and Marketing"],
  "graphic design": ["Graphic Design"], "designer": ["Graphic Design"],
  "interior design": ["Interior Design"], "interior decorator": ["Interior Design"],
  "architect": ["Architecture"], "architecture": ["Architecture"],
  "engineer": ["Engineering"], "engineering": ["Engineering"],
  "software": ["Software"], "developer": ["Software"], "web developer": ["Software"],
  "it": ["Information Technology"], "it support": ["Information Technology"],
  "computer repair": ["Information Technology"], "cybersecurity": ["Information Technology"],
  "hotel": ["Hospitality"], "motel": ["Hospitality"], "inn": ["Hospitality"], "bed and breakfast": ["Hospitality"],
  "school": ["Education"], "tutor": ["Education"], "tutoring": ["Education"], "daycare": ["Education"],
  "consultant": ["Consulting"], "consulting": ["Consulting"],
  "nonprofit": ["Nonprofit"], "charity": ["Nonprofit"],
  "shop": ["Retail"], "store": ["Retail"], "boutique": ["Retail"], "retail": ["Retail"], "bookstore": ["Retail"],
  "catering": ["Catering"], "caterer": ["Catering"],
  "security": ["Security Services"], "locksmith": ["Security Services"], "alarm": ["Security Services"],
  "staffing": ["Staffing and Recruiting"], "recruiter": ["Staffing and Recruiting"],
  "moving": ["Trucking"], "movers": ["Trucking"], "trucking": ["Trucking"],
  "wholesale": ["Wholesale"], "distributor": ["Wholesale"],
  "manufacturer": ["Manufacturing"], "manufacturing": ["Manufacturing"], "fabrication": ["Manufacturing"],
  "travel": ["Travel and Tourism"], "tourism": ["Travel and Tourism"], "tour": ["Travel and Tourism"],
  "telecom": ["Telecommunications"], "internet provider": ["Telecommunications"],
  "newspaper": ["Media and Publishing"], "publisher": ["Media and Publishing"], "media": ["Media and Publishing"],
  "farm": ["Agriculture"], "agriculture": ["Agriculture"],
  "entertainment": ["Entertainment"], "theater": ["Entertainment"], "theatre": ["Entertainment"],
};

/**
 * Build the searchable haystack for a row's "category soup" — what we test
 * substrings against when filtering by category or by free-text keywords.
 */
const haystackFor = (row: {
  category?: string | null;
  subcategory?: string | null;
  category_group?: string | null;
  tags?: string[] | null;
  name?: string | null;
  description?: string | null;
}) =>
  [
    row.category,
    row.subcategory,
    row.category_group,
    row.name,
    row.description,
    ...(row.tags ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

/**
 * Returns true if `row` belongs to `officialCategory` according to either its
 * literal category text or any of the category's substring aliases.
 */
export const matchesOfficialCategory = (
  row: Parameters<typeof haystackFor>[0],
  officialCategory: OfficialCategory,
): boolean => {
  const hay = haystackFor(row);
  if (!hay) return false;
  if (hay.includes(officialCategory.toLowerCase())) return true;
  const aliases = CATEGORY_ALIASES[officialCategory] ?? [];
  return aliases.some((a) => hay.includes(a));
};

/**
 * Normalize a free-text query into a list of alias substrings to substring-match
 * against the row haystack. Falls through to the raw lowercase word if nothing
 * matched, so unusual queries still work.
 */
export const expandSearchTerm = (raw: string): string[] => {
  const t = raw.trim().toLowerCase().replace(/[^\w\s&-]/g, "");
  if (!t) return [];
  const direct = SEARCH_TERM_TO_CATEGORY[t];
  if (direct) {
    const aliases = new Set<string>([t]);
    for (const cat of direct) {
      aliases.add(cat.toLowerCase());
      for (const a of CATEGORY_ALIASES[cat] ?? []) aliases.add(a);
    }
    return [...aliases];
  }
  // Plural → singular fallback
  if (t.endsWith("s") && t.length > 3) return [t, t.slice(0, -1)];
  return [t];
};
