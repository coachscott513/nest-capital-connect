type MegaLink = { label: string; href: string; note?: string };
type MegaColumn = { title: string; links: MegaLink[] };
type MegaFeature = {
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
};
export type MegaSection = {
  key: string;
  label: string;
  href?: string;
  columns: MegaColumn[];
  feature?: MegaFeature;
};

export const SECTION_DEFS: MegaSection[] = [
  {
    key: "discover",
    label: "Discover",
    href: "/local",
    columns: [
      {
        title: "Food & Drink",
        links: [
          { label: "Restaurants", href: "/businesses/restaurants" },
          { label: "Coffee", href: "/businesses/coffee" },
          { label: "Breweries", href: "/businesses/breweries" },
          { label: "Wine & Cocktails", href: "/businesses/wine" },
        ],
      },
      {
        title: "Home & Property",
        links: [
          { label: "Contractors", href: "/businesses/contractors" },
          { label: "Roofing", href: "/businesses/roofing" },
          { label: "HVAC", href: "/businesses/hvac" },
          { label: "Plumbing", href: "/businesses/plumbing" },
          { label: "Interior Design", href: "/businesses/interior-design" },
        ],
      },
      {
        title: "Professional",
        links: [
          { label: "Mortgage", href: "/businesses/mortgage" },
          { label: "Insurance", href: "/businesses/insurance" },
          { label: "Legal", href: "/businesses/legal" },
          { label: "Accounting", href: "/businesses/accounting" },
        ],
      },
      {
        title: "Health & Wellness",
        links: [
          { label: "Medical", href: "/businesses/medical" },
          { label: "Dental", href: "/businesses/dental" },
          { label: "Fitness", href: "/businesses/fitness" },
          { label: "Salon & Spa", href: "/businesses/salon" },
        ],
      },
    ],
    feature: {
      eyebrow: "Featured this week",
      title: "Roosevelt Room",
      copy: "Dinner, craft cocktails, and live jazz in downtown Albany.",
      href: "/business/roosevelt-room",
      cta: "Read the story",
    },
  },
  {
    key: "homes",
    label: "Search Homes",
    href: "/homes",
    columns: [
      {
        title: "Search",
        links: [
          { label: "Smart Search", href: "/homes/search" },
          { label: "Property Boards", href: "/homes/listings" },
          { label: "Open Houses", href: "/homes/open-houses" },
          { label: "Rentals", href: "/rentals" },
        ],
      },
      {
        title: "Guides",
        links: [
          { label: "Neighborhood Guides", href: "/neighborhoods" },
          { label: "First-Time Buyers", href: "/first-time-buyers" },
          { label: "Buyer Roadmap", href: "/buyer-roadmap" },
          { label: "Financing", href: "/financing" },
        ],
      },
      {
        title: "Investors",
        links: [
          { label: "Investment Tools", href: "/investor-tools" },
          { label: "Multi-Family", href: "/investment-properties" },
          { label: "Land", href: "/land-buyers" },
          { label: "Analyzer", href: "/analyze-any-deal" },
        ],
      },
    ],
    feature: {
      eyebrow: "Analyze Any Deal",
      title: "Know if the deal works before you make it.",
      copy: "Payment, cash needed, financing, cash flow, returns, and the assumptions behind the result.",
      href: "/analyze-any-deal",
      cta: "Open Analyze Any Deal",
    },
  },
  {
    key: "businesses",
    label: "Local Businesses",
    href: "/businesses",
    columns: [
      {
        title: "The Registry",
        links: [
          { label: "Featured Businesses", href: "/businesses" },
          { label: "Browse Categories", href: "/local" },
          { label: "Browse Towns", href: "/communities" },
          { label: "Browse All", href: "/businesses" },
        ],
      },
      {
        title: "Spotlights",
        links: [
          { label: "Roosevelt Room", href: "/business/roosevelt-room" },
          { label: "Cassone", href: "/business/cassone" },
          { label: "All Business Stories", href: "/stories" },
        ],
      },
      {
        title: "Owners",
        links: [
          { label: "Claim Your Business", href: "/claim-business" },
          { label: "Request a Spotlight", href: "/for-businesses/apply" },
          { label: "Editorial Standards", href: "/editorial-policy" },
        ],
      },
    ],
  },
  {
    key: "communities",
    label: "Towns",
    href: "/communities",
    columns: [
      {
        title: "Albany County",
        links: [
          { label: "Albany", href: "/living-in/albany" },
          { label: "Delmar", href: "/living-in/delmar" },
          { label: "Guilderland", href: "/living-in/guilderland" },
          { label: "Voorheesville", href: "/living-in/voorheesville" },
        ],
      },
      {
        title: "Rensselaer & Schenectady",
        links: [
          { label: "Troy", href: "/living-in/troy" },
          { label: "Schenectady", href: "/living-in/schenectady" },
          { label: "Niskayuna", href: "/living-in/niskayuna" },
        ],
      },
      {
        title: "Saratoga & Beyond",
        links: [
          { label: "Saratoga Springs", href: "/living-in/saratoga-springs" },
          { label: "Clifton Park", href: "/living-in/clifton-park" },
          { label: "Queensbury", href: "/living-in/queensbury" },
          { label: "Browse All Communities", href: "/communities" },
        ],
      },
    ],
  },
  {
    key: "stories",
    label: "Stories",
    href: "/stories",
    columns: [
      {
        title: "Editorial",
        links: [
          { label: "Business Spotlights", href: "/stories" },
          { label: "Weekend Guide", href: "/weekly" },
          { label: "Food & Drink", href: "/businesses/restaurants" },
        ],
      },
      {
        title: "Places",
        links: [
          { label: "Neighborhoods", href: "/neighborhoods" },
          { label: "Communities", href: "/communities" },
          { label: "Living in Delmar", href: "/living-in/delmar" },
        ],
      },
      {
        title: "People & Homes",
        links: [
          { label: "The Editorial Team", href: "/about-editorial" },
          { label: "Homes", href: "/homes" },
        ],
      },
    ],
  },
  {
    key: "happening",
    label: "What's Happening",
    href: "/weekly",
    columns: [
      {
        title: "This Week",
        links: [
          { label: "Weekly Pulse", href: "/weekly" },
          { label: "This Weekend", href: "/weekly" },
          { label: "Submit an Event", href: "/submit-event" },
        ],
      },
      {
        title: "By Category",
        links: [
          { label: "Concerts", href: "/local" },
          { label: "Festivals", href: "/local" },
          { label: "Farm Markets", href: "/local" },
          { label: "Community Events", href: "/local" },
        ],
      },
    ],
  },
  {
    key: "forbusiness",
    label: "For Business",
    href: "/for-businesses",
    columns: [
      {
        title: "Grow with Nest",
        links: [
          { label: "Grow Your Business", href: "/for-businesses" },
          { label: "Pricing", href: "/pricing" },
          { label: "Request a Spotlight", href: "/for-businesses/apply" },
        ],
      },
      {
        title: "Manage",
        links: [
          { label: "Claim Your Business", href: "/claim-business" },
          { label: "Partner Sign-In", href: "/partner-auth" },
          { label: "Editorial Standards", href: "/editorial-policy" },
        ],
      },
    ],
    feature: {
      eyebrow: "Become part of the Capital District",
      title: "Tell your story",
      copy: "Editorial features, local search, and tools built for regional businesses.",
      href: "/for-businesses/apply",
      cta: "Apply for a Spotlight",
    },
  },
  {
    key: "analyze",
    label: "Analyze",
    href: "/analyze-any-deal",
    columns: [
      {
        title: "The products",
        links: [
          { label: "Deal Calculator — Analyze Any Deal", href: "/analyze-any-deal" },
          { label: "Property Intelligence — Analyze Any Property", href: "/analyze-any-property" },

          { label: "Financial console", href: "/finances" },
          { label: "Sample Report", href: "/reports" },
        ],
      },
      {
        title: "By property type",
        links: [
          { label: "Single Family", href: "/analyze/single-family" },
          { label: "Multi-Family", href: "/analyze/multifamily" },
          { label: "Rental", href: "/analyze/rental" },
          { label: "Land", href: "/analyze/land" },
        ],
      },
      {
        title: "By decision",
        links: [
          { label: "First Property", href: "/first-time-buyers" },
          { label: "Investment Tools", href: "/investor-tools" },
          { label: "Financing", href: "/financing" },
          { label: "Sample Report", href: "/reports" },
        ],
      },
    ],
    feature: {
      eyebrow: "Analyze Any Deal",
      title: "Know if the deal works before you make it.",
      copy: "Payment, cash needed, financing, cash flow, returns, and the assumptions behind the result.",
      href: "/analyze-any-deal",
      cta: "Open Analyze Any Deal",
    },
  },
  {
    key: "closingteam",
    label: "Closing Team",
    href: "/closing-team",
    columns: [
      {
        title: "The roles",
        links: [
          { label: "Financing", href: "/closing-team" },
          { label: "Real-estate attorneys", href: "/closing-team" },
          { label: "Home inspection", href: "/closing-team" },
          { label: "Insurance", href: "/closing-team" },
        ],
      },
      {
        title: "How it works",
        links: [
          { label: "Inclusion standards", href: "/closing-team" },
          { label: "Editorial standards", href: "/editorial-policy" },
        ],
      },
    ],
    feature: {
      eyebrow: "The Closing Team",
      title: "Inclusion is never sold",
      copy: "Providers are organized by the role they play — not by who paid to appear.",
      href: "/closing-team",
      cta: "See how it works",
    },
  },
  {
    key: "homeservices",
    label: "Home Services",
    href: "/home-services",
    columns: [
      {
        title: "Before closing",
        links: [
          { label: "Home inspection help", href: "/local?category=construction" },
          { label: "Roofing", href: "/local?category=roofing" },
          { label: "Plumbing", href: "/local?category=plumbing" },
          { label: "Electrical", href: "/local?category=electrician" },
        ],
      },
      {
        title: "After closing",
        links: [
          { label: "Cleaning & clean-outs", href: "/local?category=cleaning-services" },
          { label: "Landscaping", href: "/local?category=landscaping" },
          { label: "HVAC", href: "/local?category=hvac" },
          { label: "Property management", href: "/local?category=property-management" },
        ],
      },
    ],
    feature: {
      eyebrow: "Home Services",
      title: "Everything a property needs",
      copy: "Local service categories organized by where they fall in the property lifecycle.",
      href: "/home-services",
      cta: "Browse home services",
    },
  },
];

