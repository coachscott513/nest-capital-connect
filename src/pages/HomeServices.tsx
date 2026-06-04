import HubRoom, { HubPanel } from "@/components/HubRoom";
import { Hammer, Wrench, Zap, Thermometer, Home as HomeIcon, Trees, Paintbrush, ClipboardCheck, Sparkles, Star } from "lucide-react";

const panels: HubPanel[] = [
  { key: "general", icon: Hammer, headline: "General Contractors", text: "Full-service contractors for renovations, additions, and new construction.", cta: "Find Contractors", href: "/local?category=general-contractor", trackCategory: "general_contractor" },
  { key: "plumbers", icon: Wrench, headline: "Plumbers", text: "Licensed plumbers for repairs, installations, and emergency service.", cta: "Find Plumbers", href: "/local?category=plumber", trackCategory: "plumber" },
  { key: "electricians", icon: Zap, headline: "Electricians", text: "Residential and commercial electrical work, panel upgrades, and rewires.", cta: "Find Electricians", href: "/local?category=electrician", trackCategory: "electrician" },
  { key: "hvac", icon: Thermometer, headline: "HVAC", text: "Heating, cooling, ductwork, and energy-efficient system installations.", cta: "Find HVAC", href: "/local?category=hvac", trackCategory: "hvac" },
  { key: "roofing", icon: HomeIcon, headline: "Roofing", text: "Roof repair, replacement, gutters, and storm damage specialists.", cta: "Find Roofers", href: "/local?category=roofing", trackCategory: "roofing" },
  { key: "landscaping", icon: Trees, headline: "Landscaping", text: "Lawn care, hardscaping, tree service, and seasonal property maintenance.", cta: "Find Landscapers", href: "/local?category=landscaping", trackCategory: "landscaping" },
  { key: "painting", icon: Paintbrush, headline: "Painting", text: "Interior and exterior painting, finishing, and surface prep professionals.", cta: "Find Painters", href: "/local?category=painting", trackCategory: "painting" },
  { key: "handyman", icon: ClipboardCheck, headline: "Handyman Services", text: "Repairs, small projects, assembly, and around-the-house help.", cta: "Find Handyman", href: "/local?category=handyman", trackCategory: "handyman" },
  { key: "maintenance", icon: Sparkles, headline: "Property Maintenance", text: "Ongoing maintenance for landlords, investors, and homeowners.", cta: "Find Maintenance", href: "/local?category=property-maintenance", trackCategory: "property_maintenance" },
  { key: "featured", icon: Star, headline: "Featured Home Service Providers", text: "Premier-tier contractors and home service pros across the Capital District.", cta: "See Featured", href: "/local?category=home-services&featured=true", trackCategory: "featured_home_services" },
];

const HomeServices = () => (
  <HubRoom
    route="/home-services"
    seoTitle="Contractors & Home Services | Capital District Nest"
    seoDescription="Trusted local contractors, plumbers, electricians, HVAC, roofers, landscapers, and home service providers across the Capital District."
    eyebrow="CONTRACTORS & HOME SERVICES"
    headline="Trusted local contractors, home improvement pros, and essential service providers."
    subhead="From major renovations to routine maintenance — find vetted professionals for every part of your home or investment property."
    primaryCta={{ label: "Find Home Services", href: "/local?category=home-services" }}
    secondaryCta={{ label: "Add Your Business", href: "/claim-business?category=home-services" }}
    panelsEyebrow="THE HOME SERVICES ROOM"
    panelsTitle="Every trade. Every project. One place to start."
    panels={panels}
    ownerEyebrow="FOR CONTRACTORS & TRADES"
    ownerHeadline="Run a trade, contracting, or home service business?"
    ownerText="Claim your listing or upgrade to Premier to reach Capital District homeowners, investors, and property managers."
    claimCategory="home-services"
    hubViewEvent="home_services_hub_view"
    categoryClickEvent="contractor_category_click"
  />
);

export default HomeServices;
