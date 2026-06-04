import HubRoom, { HubPanel } from "@/components/HubRoom";
import { Scale, Shield, Calculator, TrendingUp, Briefcase, Stethoscope, Smile, Building2, Star } from "lucide-react";

const panels: HubPanel[] = [
  { key: "attorneys", icon: Scale, headline: "Attorneys", text: "Real estate, business, family, estate planning, and litigation attorneys.", cta: "Find Attorneys", href: "/local?category=legal-services", trackCategory: "attorneys" },
  { key: "insurance", icon: Shield, headline: "Insurance", text: "Home, auto, life, business, and investment property insurance providers.", cta: "Find Insurance", href: "/local?category=insurance", trackCategory: "insurance" },
  { key: "accountants", icon: Calculator, headline: "Accountants & Tax", text: "CPAs, tax preparers, bookkeepers, and small-business accounting.", cta: "Find Accountants", href: "/local?category=accounting", trackCategory: "accountants" },
  { key: "financial", icon: TrendingUp, headline: "Financial Advisors", text: "Wealth management, retirement planning, and personal finance guidance.", cta: "Find Advisors", href: "/local?category=financial-advisor", trackCategory: "financial_advisors" },
  { key: "consultants", icon: Briefcase, headline: "Consultants", text: "Business, marketing, operations, and strategy consultants serving the region.", cta: "Find Consultants", href: "/local?category=consultant", trackCategory: "consultants" },
  { key: "healthcare", icon: Stethoscope, headline: "Healthcare", text: "Primary care, specialists, mental health, and healthcare professionals.", cta: "Find Healthcare", href: "/local?category=healthcare", trackCategory: "healthcare" },
  { key: "dental", icon: Smile, headline: "Dental", text: "General dentists, orthodontics, cosmetic, and pediatric dental providers.", cta: "Find Dental", href: "/local?category=dental", trackCategory: "dental" },
  { key: "business-services", icon: Building2, headline: "Business Services", text: "IT, HR, payroll, legal compliance, and business support providers.", cta: "Find Business Services", href: "/local?category=business-services", trackCategory: "business_services" },
  { key: "featured", icon: Star, headline: "Featured Professional Partners", text: "Premier-tier professional service providers across the Capital District.", cta: "See Featured", href: "/local?category=professional-services&featured=true", trackCategory: "featured_professional" },
];

const ProfessionalServices = () => (
  <HubRoom
    route="/professional-services"
    seoTitle="Professional Services | Capital District Nest"
    seoDescription="Attorneys, accountants, financial advisors, insurance agents, consultants, healthcare, dental, and business service providers across the Capital District."
    eyebrow="PROFESSIONAL SERVICES"
    headline="Local experts, advisors, and trusted professionals across the Capital District."
    subhead="Attorneys, accountants, advisors, insurance agents, healthcare providers, and the experts you call when it matters."
    primaryCta={{ label: "Find Professionals", href: "/local?category=professional-services" }}
    secondaryCta={{ label: "Request Premier Profile", href: "/claim-business?tier=premier&category=professional-services" }}
    panelsEyebrow="THE EXPERTS ROOM"
    panelsTitle="The professionals you'll actually call."
    panels={panels}
    ownerEyebrow="FOR PROFESSIONAL FIRMS"
    ownerHeadline="Run a professional services firm?"
    ownerText="Claim your listing or upgrade to Premier to reach Capital District clients searching for trusted experts."
    claimCategory="professional-services"
    hubViewEvent="professional_services_hub_view"
    categoryClickEvent="professional_services_click"
  />
);

export default ProfessionalServices;
