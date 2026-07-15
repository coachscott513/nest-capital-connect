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
    id: "homeowners",
    theme: "Homeowners",
    hero: {
      title: "Everything for the home you love.",
      copy: "Mortgage, title, inspection, insurance, and the local pros who help you buy, sell, and take care of it.",
      to: "/homes",
      cta: "Explore Homeowners",
      image: heroOwners,
    },
    cards: [
      { eyebrow: "Real Estate", title: "Homes worth seeing", to: "/homes", image: categoryRealEstate },
      { eyebrow: "Mortgage", title: "Local lenders", to: "/businesses/finance", image: categoryFinance },
      { eyebrow: "Inspection", title: "Home inspectors", to: "/businesses/services", image: categoryServices },
      { eyebrow: "Contractors", title: "Trusted trades", to: "/businesses/contractors", image: categoryContractors },
      { eyebrow: "Insurance", title: "Coverage & agents", to: "/businesses/finance", image: heroBusiness },
      { eyebrow: "Neighborhoods", title: "Living in Delmar", to: "/living-in/delmar", image: heroDiscovery },
    ],
  },
  {
    id: "dining",
    theme: "Dining",
    hero: {
      title: "A week of very good tables.",
      copy: "Restaurants, coffee, cocktails, date nights, and the neighborhood spots worth the drive.",
      to: "/businesses/restaurant",
      cta: "Explore Dining",
      image: categoryRestaurants,
    },
    cards: [
      { eyebrow: "Restaurants", title: "Where to eat", to: "/businesses/restaurant", image: categoryRestaurants },
      { eyebrow: "Coffee", title: "Cafés & roasters", to: "/businesses/restaurant", image: wellnessBeauty },
      { eyebrow: "Cocktails", title: "Bars & lounges", to: "/business/roosevelt-room", image: heroEvents },
      { eyebrow: "Date Night", title: "Reservations we love", to: "/businesses/restaurant", image: eventFoodWine },
      { eyebrow: "Breakfast", title: "Morning spots", to: "/businesses/restaurant", image: wellnessCare },
      { eyebrow: "Guide", title: "This week in the Capital District", to: "/weekly", image: eventAliveAtFive },
    ],
  },
  {
    id: "home-improvement",
    theme: "Home Improvement",
    hero: {
      title: "Make it yours.",
      copy: "Roofing, HVAC, windows, painting, landscaping, remodeling — the pros trusted across the Capital District.",
      to: "/businesses/contractors",
      cta: "Explore Home Improvement",
      image: categoryContractors,
    },
    cards: [
      { eyebrow: "Roofing", title: "Local roofers", to: "/businesses/contractors", image: categoryContractors },
      { eyebrow: "HVAC", title: "Heating & cooling", to: "/businesses/contractors", image: categoryServices },
      { eyebrow: "Windows", title: "Windows & doors", to: "/businesses/contractors", image: heroOwners },
      { eyebrow: "Painting", title: "Interior & exterior", to: "/businesses/contractors", image: heroBusiness },
      { eyebrow: "Landscaping", title: "Yards & outdoor spaces", to: "/businesses/contractors", image: wellnessOutdoor },
      { eyebrow: "Industrial", title: "Cassone modular", to: "/business/cassone", image: categoryRetail },
    ],
  },
  {
    id: "health",
    theme: "Health",
    hero: {
      title: "Take care of you.",
      copy: "Dentists, doctors, fitness, physical therapy, chiropractic, and veterinary care — close to home.",
      to: "/businesses/wellness",
      cta: "Explore Health",
      image: wellnessCare,
    },
    cards: [
      { eyebrow: "Dental", title: "Dentists nearby", to: "/businesses/dental", image: wellnessCare },
      { eyebrow: "Healthcare", title: "Doctors & clinics", to: "/businesses/healthcare", image: wellnessRecovery },
      { eyebrow: "Fitness", title: "Gyms & studios", to: "/businesses/wellness", image: wellnessFitness },
      { eyebrow: "Recovery", title: "Physical therapy", to: "/businesses/wellness", image: wellnessRecovery },
      { eyebrow: "Beauty", title: "Salon & spa", to: "/businesses/wellness", image: wellnessBeauty },
      { eyebrow: "Outdoors", title: "Walks, parks, trails", to: "/communities", image: wellnessOutdoor },
    ],
  },
  {
    id: "weekend",
    theme: "This Weekend",
    hero: {
      title: "What's happening this weekend.",
      copy: "Concerts, farm markets, festivals, family events — the calendar worth clearing.",
      to: "/weekly",
      cta: "See the Weekend",
      image: eventAliveAtFive,
    },
    cards: [
      { eyebrow: "Concerts", title: "Live music", to: "/weekly", image: eventSaratoga },
      { eyebrow: "Markets", title: "Farm & makers", to: "/weekly", image: eventTroyMarket },
      { eyebrow: "Family", title: "Family weekend", to: "/weekly", image: eventFamily },
      { eyebrow: "Food & Wine", title: "Tastings & pop-ups", to: "/weekly", image: eventFoodWine },
      { eyebrow: "Downtown", title: "Alive at Five", to: "/weekly", image: eventAliveAtFive },
      { eyebrow: "Guide", title: "Weekly pulse", to: "/weekly", image: heroEvents },
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
