import CityHomesTemplate from "@/components/CityHomesTemplate";

const TroyHomesForSale = () => {
  return (
    <CityHomesTemplate
      cityName="Troy"
      citySlug="troy"
      pageTitle="Troy Homes for Sale | Troy, NY Real Estate | Capital District Nest"
      metaDescription="Find your dream home in Troy, NY. Browse current Troy real estate listings, historic Victorian homes, and waterfront properties. Expert local guidance from Capital District Nest."
      keywords="Troy NY homes for sale, Troy real estate, Troy NY properties, Victorian homes Troy, Troy waterfront, homes for sale Troy New York, Troy housing market"
      description="Troy, NY offers a unique blend of historic charm and modern revival. Known for its stunning Victorian architecture, vibrant farmers market, and riverside location along the Hudson, Troy has become one of the Capital District's most desirable places to live. The city's walkable downtown features an eclectic mix of locally-owned restaurants, craft breweries, and boutique shops. With a thriving arts scene centered around Troy Savings Bank Music Hall and numerous galleries, plus excellent schools and proximity to Albany and Saratoga Springs, Troy attracts young professionals, families, and investors alike. The housing stock ranges from meticulously restored Victorians in neighborhoods like Lansingburgh to modern condos and affordable starter homes."
      highlights={[
        "Historic Victorian architecture",
        "Troy Farmers Market & downtown scene",
        "Hudson River waterfront access",
        "Growing arts & culture hub",
        "Walkable neighborhoods",
        "20 minutes to Albany & Saratoga"
      ]}
      stats={{
        averagePrice: "$235,000",
        daysOnMarket: "32 days",
        totalListings: "120+"
      }}
    />
  );
};

export default TroyHomesForSale;
