import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ChapterRail from "@/components/home/ChapterRail";
import { logEngagement } from "@/lib/engagement";

import imgContractors from "@/assets/category-contractors.jpg";
import imgServices from "@/assets/category-services.jpg";
import imgRealEstate from "@/assets/category-realestate.jpg";
import imgTowns from "@/assets/hero-towns-wide.jpg";
import imgOwners from "@/assets/hero-owners-wide.jpg";

const PLACEMENT = "homepage-home-services";

/**
 * Categories are canonical `/local?category=<slug>` deep links that already
 * resolve through `categoryDeepLink`. No protected slug is changed here.
 * Counts are deliberately omitted — a count is only shown when the query is
 * real and the number is accurate.
 */
const CATEGORIES = [
  {
    slug: "cleaning-services",
    title: "Cleaning & clean-outs",
    when: "Before listing photos, after a closing, and between tenants.",
    image: imgServices,
  },
  {
    slug: "landscaping",
    title: "Landscaping & tree service",
    when: "Curb appeal before a sale and storm cleanup after ownership.",
    image: imgTowns,
  },
  {
    slug: "construction",
    title: "Contractors & repairs",
    when: "Inspection repairs, renovations, and larger scoped projects.",
    image: imgContractors,
  },
  {
    slug: "home-improvement",
    title: "Handyman & home improvement",
    when: "Punch-list items between contract and closing.",
    image: imgOwners,
  },
  {
    slug: "roofing",
    title: "Roofing",
    when: "Roof condition is one of the first inspection findings to price.",
    image: imgContractors,
  },
  {
    slug: "hvac",
    title: "HVAC",
    when: "System age and service history shape the ownership budget.",
    image: imgServices,
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    when: "Supply lines, water heaters, and sewer questions at inspection.",
    image: imgServices,
  },
  {
    slug: "electrician",
    title: "Electrical",
    when: "Panel capacity and knob-and-tube questions in older housing stock.",
    image: imgContractors,
  },
  {
    slug: "property-management",
    title: "Property management",
    when: "After an investment purchase, when someone has to run the asset.",
    image: imgRealEstate,
  },
];

const HomeServicesRail = () => (
  <ChapterRail
    id="home-services"
    eyebrow="Home Services"
    title="Everything your property may need before and after closing."
    subtitle="Local service categories from the Capital District Nest directory, organized by where they fall in the property lifecycle."
    tone="dark"
    action={
      <Link
        to="/home-services"
        onClick={() => logEngagement("home_services_open", {}, { source_location: PLACEMENT })}
        className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border border-white/15 bg-white/[0.04] text-white text-[13px] font-semibold hover:bg-white/[0.09] transition"
      >
        All Home Services
      </Link>
    }
  >
    {CATEGORIES.map((c) => (
      <Link
        key={c.slug}
        to={`/local?category=${c.slug}`}
        onClick={() =>
          logEngagement("home_service_category_click", {}, {
            source_location: PLACEMENT,
            category_slug: c.slug,
          })
        }
        className="group snap-start shrink-0 w-[72vw] sm:w-[46vw] lg:w-[30%] rounded-[24px] overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#5eead4]/40 transition-colors"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={c.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,15,25,0.2) 0%, rgba(11,15,25,0.8) 100%)",
            }}
          />
        </div>
        <div className="p-6">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-white">{c.title}</h3>
          <p className="mt-2 text-[13.5px] text-white/60 font-light leading-relaxed">{c.when}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#5eead4] group-hover:gap-3 transition-all">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    ))}
  </ChapterRail>
);

export default HomeServicesRail;
