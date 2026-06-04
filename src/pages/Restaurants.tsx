import HubRoom, { HubPanel } from "@/components/HubRoom";
import { UtensilsCrossed, Beer, Coffee, Music, Tag, MapPin, Star, Plus } from "lucide-react";

const panels: HubPanel[] = [
  { key: "featured", icon: Star, headline: "Featured Dining", text: "Premier restaurants, taverns, and dining destinations across the region.", cta: "Explore Featured", href: "/local?category=restaurant&featured=true", trackCategory: "featured_dining" },
  { key: "restaurants", icon: UtensilsCrossed, headline: "Restaurants", text: "From farm-to-table to neighborhood institutions, discover Capital District kitchens.", cta: "Find Restaurants", href: "/local?category=restaurant", trackCategory: "restaurants" },
  { key: "taverns", icon: Beer, headline: "Taverns & Pubs", text: "Local taverns, craft beer bars, and neighborhood pubs.", cta: "Find Taverns", href: "/local?category=tavern", trackCategory: "taverns" },
  { key: "cafes", icon: Coffee, headline: "Cafés & Coffee", text: "Independent coffee shops, bakeries, and breakfast spots.", cta: "Find Cafés", href: "/local?category=cafe", trackCategory: "cafes" },
  { key: "live-music", icon: Music, headline: "Live Music / Dining Events", text: "Restaurants and venues hosting live music, themed nights, and dining events.", cta: "See Dining Events", href: "/weekly?rail=dining", trackCategory: "dining_events" },
  { key: "specials", icon: Tag, headline: "Specials", text: "Happy hours, prix fixe, restaurant week deals, and limited-time menus.", cta: "Explore Specials", href: "/local?category=restaurant&filter=specials", trackCategory: "specials" },
  { key: "by-town", icon: MapPin, headline: "By Town", text: "Dining guides for Albany, Saratoga, Troy, Schenectady, Delmar, and more.", cta: "Browse Towns", href: "/communities", trackCategory: "by_town" },
  { key: "submit-event", icon: Plus, headline: "Submit a Dining Event", text: "Hosting a tasting, wine night, or pop-up? Add it to the weekly events feed.", cta: "Submit Dining Event", href: "/submit-event?category=dining", trackCategory: "submit_dining_event" },
];

const Restaurants = () => (
  <HubRoom
    route="/restaurants"
    seoTitle="Restaurants & Taverns | Capital District Nest"
    seoDescription="Discover restaurants, taverns, cafés, and neighborhood dining favorites across the Capital District."
    eyebrow="RESTAURANTS & TAVERNS"
    headline="Dining, drinks, cafés, and neighborhood favorites across the Capital District."
    subhead="Find the best places to eat, drink, and gather — from craft taverns to chef-driven kitchens, morning cafés to late-night bites."
    primaryCta={{ label: "Explore Dining", href: "/local?category=restaurant" }}
    secondaryCta={{ label: "Submit Dining Event", href: "/submit-event?category=dining" }}
    panelsEyebrow="THE DINING ROOM"
    panelsTitle="Every kitchen, tavern, and café — in one place."
    panels={panels}
    ownerEyebrow="FOR RESTAURANT OWNERS"
    ownerHeadline="Own a restaurant, tavern, or café?"
    ownerText="Claim your listing, share your menu, promote dining events, and reach Capital District diners."
    claimCategory="restaurant"
    hubViewEvent="restaurant_hub_view"
    categoryClickEvent="restaurant_category_click"
  />
);

export default Restaurants;
