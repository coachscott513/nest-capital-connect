import {
  UtensilsCrossed,
  Home,
  Briefcase,
  HeartPulse,
  Car,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import type { OfficialCategory } from "@/data/officialCategories";

export interface BusinessCategoryGroup {
  id: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
  categories: OfficialCategory[];
}

export const BUSINESS_CATEGORY_GROUPS: BusinessCategoryGroup[] = [
  {
    id: "food-drink",
    label: "Food & Drink",
    blurb: "Restaurants, cafés, breweries, and the places locals return to.",
    icon: UtensilsCrossed,
    categories: ["Restaurant", "Food and Beverage", "Catering", "Hospitality"],
  },
  {
    id: "home-property",
    label: "Home & Property",
    blurb: "Contractors, tradespeople, and everyone who keeps the house running.",
    icon: Home,
    categories: [
      "Construction",
      "Home Improvement",
      "HVAC",
      "Plumbing",
      "Electrician",
      "Roofing",
      "Landscaping",
      "Painting",
      "Cleaning Services",
      "Janitorial Services",
      "Pest Control",
      "Property Management",
      "Interior Design",
      "Architecture",
    ],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    blurb: "Attorneys, accountants, advisors, and the people behind the paperwork.",
    icon: Briefcase,
    categories: [
      "Accounting",
      "Legal Services",
      "Insurance",
      "Banking and Finance",
      "Consulting",
      "Advertising and Marketing",
      "Staffing and Recruiting",
      "Real Estate",
      "Engineering",
      "Information Technology",
    ],
  },
  {
    id: "health-wellness",
    label: "Health & Wellness",
    blurb: "Doctors, dentists, studios, and salons that care for people and pets.",
    icon: HeartPulse,
    categories: [
      "Healthcare",
      "Dental",
      "Fitness",
      "Beauty and Personal Care",
      "Salon and Spa",
      "Veterinary",
      "Pet Services",
    ],
  },
  {
    id: "automotive-transportation",
    label: "Automotive & Transportation",
    blurb: "Repair, sales, and everything that moves across the Capital District.",
    icon: Car,
    categories: [
      "Automotive Repair",
      "Automotive Sales",
      "Logistics",
      "Trucking",
      "Travel and Tourism",
    ],
  },
  {
    id: "shopping-creative-community",
    label: "Shopping, Creative & Community",
    blurb: "Shops, studios, and the community organizations that shape local life.",
    icon: ShoppingBag,
    categories: [
      "Retail",
      "Florist",
      "Photography",
      "Entertainment",
      "Media and Publishing",
      "Graphic Design",
      "Education",
      "Nonprofit",
      "Security Services",
      "Telecommunications",
      "Software",
      "Manufacturing",
      "Wholesale",
      "Agriculture",
    ],
  },
];

export const findGroupForCategory = (
  cat: OfficialCategory,
): BusinessCategoryGroup | undefined =>
  BUSINESS_CATEGORY_GROUPS.find((g) => g.categories.includes(cat));
