// Rental data for Capital District cities

export interface CollegeInfo {
  name: string;
  type: string;
  typicalRentRange: string;
  bestMonths: string;
}

export interface SchoolDistrictInfo {
  name: string;
  rating: string;
  rentalAvailability: string;
}

export interface CityRentalData {
  cityName: string;
  slug: string;
  tagline: string;
  description: string;
  marketSnapshot: {
    typicalRentRange: string;
    mostCommonUnits: string;
    avgDaysOnMarket: string;
    percentRentedUnder30Days: string;
    seasonalTrend: string;
    seasonalTrendDirection: "up" | "down" | "stable";
    studentVsNonStudent: string;
  };
  colleges: CollegeInfo[];
  schoolDistricts: SchoolDistrictInfo[];
  neighborhoods: string[];
  mlsSearchUrl: string;
  whyBetterThanCraigslist: string[];
}

export const albanyRentalData: CityRentalData = {
  cityName: "Albany",
  slug: "albany",
  tagline: "State capital with diverse rental options from downtown lofts to family homes.",
  description: "Albany offers a wide range of rental housing — from historic brownstones and downtown apartments to suburban family homes. Strong rental demand from state workers, students, and healthcare professionals.",
  marketSnapshot: {
    typicalRentRange: "$1,100 - $2,200/mo",
    mostCommonUnits: "2BR apartments, studio lofts",
    avgDaysOnMarket: "18 days",
    percentRentedUnder30Days: "72%",
    seasonalTrend: "Summer peak (May–Aug)",
    seasonalTrendDirection: "up",
    studentVsNonStudent: "35% student / 65% professional",
  },
  colleges: [
    {
      name: "University at Albany (SUNY)",
      type: "Public Research University",
      typicalRentRange: "$900 - $1,500/mo",
      bestMonths: "March–May for Fall semester",
    },
    {
      name: "Albany Medical College",
      type: "Medical School",
      typicalRentRange: "$1,200 - $1,800/mo",
      bestMonths: "April–June",
    },
    {
      name: "The College of Saint Rose",
      type: "Private Liberal Arts",
      typicalRentRange: "$1,000 - $1,400/mo",
      bestMonths: "April–July",
    },
    {
      name: "Albany Law School",
      type: "Law School",
      typicalRentRange: "$1,100 - $1,600/mo",
      bestMonths: "May–July",
    },
  ],
  schoolDistricts: [
    { name: "Albany City School District", rating: "Urban", rentalAvailability: "High" },
    { name: "Bethlehem Central", rating: "Suburban", rentalAvailability: "Moderate" },
    { name: "Guilderland Central", rating: "Suburban", rentalAvailability: "Moderate" },
  ],
  neighborhoods: ["Downtown Albany", "Pine Hills", "Center Square", "Delaware Avenue", "New Scotland", "Buckingham Pond"],
  mlsSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&types%5B%5D=12&sortby=listings.price+ASC&rtype=map&leadid=948",
  whyBetterThanCraigslist: [
    "No scam listings — every property is verified",
    "Real landlord contact information",
    "Local market knowledge and pricing context",
    "No repost spam or ghost listings",
    "Human follow-up if you have questions",
  ],
};

export const schenectadyRentalData: CityRentalData = {
  cityName: "Schenectady",
  slug: "schenectady",
  tagline: "Revitalized downtown with affordable rents and strong community character.",
  description: "Schenectady offers some of the most affordable rents in the Capital District. The downtown is experiencing significant revitalization, making it attractive for young professionals and families seeking value.",
  marketSnapshot: {
    typicalRentRange: "$900 - $1,600/mo",
    mostCommonUnits: "2BR apartments, 3BR homes",
    avgDaysOnMarket: "21 days",
    percentRentedUnder30Days: "68%",
    seasonalTrend: "Steady year-round",
    seasonalTrendDirection: "stable",
    studentVsNonStudent: "25% student / 75% professional",
  },
  colleges: [
    {
      name: "Union College",
      type: "Private Liberal Arts",
      typicalRentRange: "$1,100 - $1,600/mo",
      bestMonths: "March–May for Fall semester",
    },
    {
      name: "Schenectady County Community College",
      type: "Community College",
      typicalRentRange: "$800 - $1,200/mo",
      bestMonths: "June–August",
    },
  ],
  schoolDistricts: [
    { name: "Schenectady City School District", rating: "Urban", rentalAvailability: "High" },
    { name: "Niskayuna Central", rating: "Suburban", rentalAvailability: "Low" },
    { name: "Scotia-Glenville", rating: "Suburban", rentalAvailability: "Moderate" },
  ],
  neighborhoods: ["Downtown Schenectady", "Stockade District", "GE Plot", "Mont Pleasant", "Woodlawn", "Hamilton Hill"],
  mlsSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady&min=0&max=100000000&beds=&baths=&types%5B%5D=6&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DSchenectady&sortby=listings.price+ASC&rtype=map&leadid=948",
  whyBetterThanCraigslist: [
    "No scam listings — every property is verified",
    "Real landlord contact information",
    "Local market knowledge and pricing context",
    "No repost spam or ghost listings",
    "Human follow-up if you have questions",
  ],
};

export const troyRentalData: CityRentalData = {
  cityName: "Troy",
  slug: "troy",
  tagline: "Historic architecture, thriving arts scene, and strong student rental market.",
  description: "Troy combines Victorian architecture with a vibrant arts and food scene. Strong rental demand from RPI students and young professionals drawn to the downtown renaissance.",
  marketSnapshot: {
    typicalRentRange: "$1,000 - $1,800/mo",
    mostCommonUnits: "1BR apartments, studio lofts",
    avgDaysOnMarket: "15 days",
    percentRentedUnder30Days: "78%",
    seasonalTrend: "Summer surge (RPI turnover)",
    seasonalTrendDirection: "up",
    studentVsNonStudent: "45% student / 55% professional",
  },
  colleges: [
    {
      name: "Rensselaer Polytechnic Institute (RPI)",
      type: "Private Research University",
      typicalRentRange: "$1,200 - $1,800/mo",
      bestMonths: "February–April for Fall semester",
    },
    {
      name: "Russell Sage College",
      type: "Private College",
      typicalRentRange: "$900 - $1,400/mo",
      bestMonths: "April–June",
    },
    {
      name: "Hudson Valley Community College",
      type: "Community College",
      typicalRentRange: "$800 - $1,200/mo",
      bestMonths: "June–August",
    },
  ],
  schoolDistricts: [
    { name: "Troy City School District", rating: "Urban", rentalAvailability: "High" },
    { name: "Lansingburgh Central", rating: "Suburban", rentalAvailability: "High" },
    { name: "East Greenbush Central", rating: "Suburban", rentalAvailability: "Moderate" },
  ],
  neighborhoods: ["Downtown Troy", "South Troy", "North Central", "Lansingburgh", "Brunswick", "Frear Park"],
  mlsSearchUrl: "https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&types%5B%5D=12&sortby=listings.price+ASC&rtype=map&leadid=948",
  whyBetterThanCraigslist: [
    "No scam listings — every property is verified",
    "Real landlord contact information",
    "Local market knowledge and pricing context",
    "No repost spam or ghost listings",
    "Human follow-up if you have questions",
  ],
};

export const allCityRentalData: Record<string, CityRentalData> = {
  albany: albanyRentalData,
  schenectady: schenectadyRentalData,
  troy: troyRentalData,
};
