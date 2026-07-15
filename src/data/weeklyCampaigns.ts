import heroOwners from "@/assets/hero-owners-wide.jpg";
import heroBusiness from "@/assets/hero-business-wide.jpg";
import heroDiscovery from "@/assets/hero-discovery-wide.jpg";
import heroEvents from "@/assets/hero-events-wide.jpg";
import categoryRealEstate from "@/assets/category-realestate.jpg";
import categoryRestaurants from "@/assets/category-restaurants.jpg";
import categoryContractors from "@/assets/category-contractors.jpg";
import categoryFinance from "@/assets/category-finance.jpg";
import categoryServices from "@/assets/category-services.jpg";
import categoryRetail from "@/assets/category-retail.jpg";
import wellnessFitness from "@/assets/wellness-fitness.jpg";
import wellnessCare from "@/assets/wellness-care.jpg";
import wellnessRecovery from "@/assets/wellness-recovery.jpg";
import wellnessBeauty from "@/assets/wellness-beauty.jpg";
import wellnessOutdoor from "@/assets/wellness-outdoor.jpg";
import eventAliveAtFive from "@/assets/event-alive-at-five.jpg";
import eventTroyMarket from "@/assets/event-troy-market.jpg";
import eventSaratoga from "@/assets/event-saratoga-concerts.jpg";
import eventFamily from "@/assets/event-family-weekend.jpg";
import eventFoodWine from "@/assets/event-food-wine.jpg";

export type CampaignCard = {
  title: string;
  eyebrow: string;
  to: string;
  image: string;
};

export type WeeklyCampaign = {
  id: string;
  theme: string;               // "HOMEOWNERS"
  hero: {
    title: string;             // "Everything for the home you love."
    copy: string;
    to: string;
    cta: string;
    image: string;
  };
  cards: CampaignCard[];       // 5-6 supporting cards
};

export const WEEKLY_CAMPAIGNS: WeeklyCampaign[] = [
  {
    id: "buying-a-home",
    theme: "Buying a Home",
    hero: {
      title: "Everything you need to buy a home here.",
      copy: "Homes, agents, mortgage, inspection, attorneys, title, insurance, and movers — the full ecosystem that gets you to the closing table.",
      to: "/homes",
      cta: "Explore Buying a Home",
      image: heroOwners,
    },
    cards: [
      { eyebrow: "Homes", title: "Homes worth seeing", to: "/homes", image: categoryRealEstate },
      { eyebrow: "Real Estate", title: "Local agents", to: "/businesses/real-estate", image: categoryRealEstate },
      { eyebrow: "Mortgage", title: "Local lenders", to: "/businesses/finance", image: categoryFinance },
      { eyebrow: "Inspection", title: "Home inspectors", to: "/businesses/services", image: categoryServices },
      { eyebrow: "Attorneys", title: "Real estate attorneys", to: "/businesses/professional", image: heroBusiness },
      { eyebrow: "Title", title: "Title companies", to: "/businesses/professional", image: categoryFinance },
      { eyebrow: "Insurance", title: "Coverage & agents", to: "/businesses/finance", image: heroBusiness },
      { eyebrow: "Movers", title: "Local moving crews", to: "/businesses/services", image: categoryServices },
    ],
  },
  {
    id: "dining",
    theme: "Dining",
    hero: {
      title: "A week of very good tables.",
      copy: "Restaurants, coffee, cocktails, breweries, breakfast, and desserts — the Capital District's dining ecosystem on one page.",
      to: "/businesses/restaurant",
      cta: "Explore Dining",
      image: categoryRestaurants,
    },
    cards: [
      { eyebrow: "Restaurants", title: "Where to eat", to: "/businesses/restaurant", image: categoryRestaurants },
      { eyebrow: "Coffee", title: "Cafés & roasters", to: "/businesses/restaurant", image: wellnessBeauty },
      { eyebrow: "Cocktails", title: "Bars & lounges", to: "/business/roosevelt-room", image: heroEvents },
      { eyebrow: "Breweries", title: "Local taprooms", to: "/businesses/restaurant", image: eventFoodWine },
      { eyebrow: "Breakfast", title: "Morning spots", to: "/businesses/restaurant", image: wellnessCare },
      { eyebrow: "Desserts", title: "Sweets & bakeries", to: "/businesses/restaurant", image: categoryRestaurants },
    ],
  },
  {
    id: "home-improvement",
    theme: "Home Improvement",
    hero: {
      title: "Make it yours.",
      copy: "Roofing, windows, HVAC, painting, landscaping, and remodeling — the trades trusted across the Capital District.",
      to: "/businesses/contractors",
      cta: "Explore Home Improvement",
      image: categoryContractors,
    },
    cards: [
      { eyebrow: "Roofing", title: "Local roofers", to: "/businesses/contractors", image: categoryContractors },
      { eyebrow: "Windows", title: "Windows & doors", to: "/businesses/contractors", image: heroOwners },
      { eyebrow: "HVAC", title: "Heating & cooling", to: "/businesses/contractors", image: categoryServices },
      { eyebrow: "Painting", title: "Interior & exterior", to: "/businesses/contractors", image: heroBusiness },
      { eyebrow: "Landscaping", title: "Yards & outdoor spaces", to: "/businesses/contractors", image: wellnessOutdoor },
      { eyebrow: "Remodeling", title: "Kitchens & baths", to: "/businesses/contractors", image: categoryRetail },
    ],
  },
  {
    id: "health-wellness",
    theme: "Health & Wellness",
    hero: {
      title: "Take care of you.",
      copy: "Doctors, dentists, fitness, physical therapy, veterinary, and wellness — close to home.",
      to: "/businesses/wellness",
      cta: "Explore Health & Wellness",
      image: wellnessCare,
    },
    cards: [
      { eyebrow: "Doctors", title: "Primary care & clinics", to: "/businesses/healthcare", image: wellnessRecovery },
      { eyebrow: "Dentists", title: "Dentists nearby", to: "/businesses/dental", image: wellnessCare },
      { eyebrow: "Fitness", title: "Gyms & studios", to: "/businesses/wellness", image: wellnessFitness },
      { eyebrow: "Physical Therapy", title: "Recovery & rehab", to: "/businesses/wellness", image: wellnessRecovery },
      { eyebrow: "Veterinary", title: "Vets & pet care", to: "/businesses/wellness", image: wellnessOutdoor },
      { eyebrow: "Wellness", title: "Spa, salon & self-care", to: "/businesses/wellness", image: wellnessBeauty },
    ],
  },
];


// ISO week number — rotates the featured campaign automatically each Monday.
function isoWeek(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((+date - +yearStart) / 86400000 + 1) / 7);
}

export function getCurrentCampaign(now: Date = new Date()): WeeklyCampaign {
  const week = isoWeek(now);
  return WEEKLY_CAMPAIGNS[week % WEEKLY_CAMPAIGNS.length];
}
