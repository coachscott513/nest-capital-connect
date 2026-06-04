import HubRoom, { HubPanel } from "@/components/HubRoom";
import { Dumbbell, Sparkles, HeartPulse, Salad, Stethoscope, Trees, Star, Plus } from "lucide-react";

const panels: HubPanel[] = [
  { key: "fitness", icon: Dumbbell, headline: "Fitness Studios", text: "Gyms, yoga, pilates, strength studios, and group fitness across the region.", cta: "Find Fitness", href: "/local?category=fitness", trackCategory: "fitness" },
  { key: "medspa", icon: Sparkles, headline: "Med Spas & Beauty", text: "Med spas, aesthetics, skincare, salons, and beauty professionals.", cta: "Find Med Spas", href: "/local?category=med-spa", trackCategory: "med_spa" },
  { key: "recovery", icon: HeartPulse, headline: "Recovery & Wellness", text: "Massage, chiropractic, physical therapy, cryotherapy, and recovery centers.", cta: "Find Recovery", href: "/local?category=recovery-wellness", trackCategory: "recovery" },
  { key: "dining", icon: Salad, headline: "Healthy Dining", text: "Restaurants and cafés focused on healthy, plant-based, and clean eating.", cta: "Find Healthy Dining", href: "/local?category=healthy-dining", trackCategory: "healthy_dining" },
  { key: "healthcare", icon: Stethoscope, headline: "Healthcare & Wellness Pros", text: "Doctors, dentists, mental health, and wellness practitioners.", cta: "Find Healthcare", href: "/local?category=healthcare", trackCategory: "healthcare" },
  { key: "outdoor", icon: Trees, headline: "Outdoor Wellness", text: "Hiking, parks, trails, paddling, cycling, and outdoor activities.", cta: "Find Outdoor", href: "/local?category=outdoor-wellness", trackCategory: "outdoor_wellness" },
  { key: "featured", icon: Star, headline: "Featured Wellness Providers", text: "Premier wellness, fitness, and health partners across the Capital District.", cta: "See Featured", href: "/local?category=health-wellness&featured=true", trackCategory: "featured_wellness" },
  { key: "add", icon: Plus, headline: "Add Your Wellness Business", text: "Run a studio, practice, or wellness brand? Get listed and discovered.", cta: "Add Your Business", href: "/claim-business?category=wellness", trackCategory: "add_wellness_business" },
];

const Wellness = () => (
  <HubRoom
    route="/wellness"
    seoTitle="Health, Fitness & Wellness | Capital District Nest"
    seoDescription="Fitness studios, med spas, recovery centers, healthcare providers, healthy dining, and wellness experiences across the Capital District."
    eyebrow="LIVE WELL"
    headline="Health, fitness & wellness across the Capital District."
    subhead="Studios, practitioners, recovery centers, and clean-eating destinations to help you live better — all in one room."
    primaryCta={{ label: "Explore Wellness Providers", href: "/local?category=health-wellness" }}
    secondaryCta={{ label: "Add Your Business", href: "/claim-business?category=wellness" }}
    panelsEyebrow="THE WELLNESS ROOM"
    panelsTitle="Every part of feeling good, indexed locally."
    panels={panels}
    ownerEyebrow="FOR WELLNESS BUSINESSES"
    ownerHeadline="Run a wellness, fitness, or health business?"
    ownerText="Claim your listing or upgrade to Premier to reach Capital District residents looking for healthier living."
    claimCategory="wellness"
    hubViewEvent="wellness_hub_view"
    categoryClickEvent="wellness_category_click"
  />
);

export default Wellness;
