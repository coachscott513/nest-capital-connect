import CityHomesTemplate from "@/components/CityHomesTemplate";

const AlbanyHomesForSale = () => {
  return (
    <CityHomesTemplate
      cityName="Albany"
      citySlug="albany"
      pageTitle="Albany Homes for Sale | Albany, NY Real Estate | Capital District Nest"
      metaDescription="Search Albany, NY homes for sale. Explore properties in Pine Hills, Center Square, Delaware Ave, and more. Local real estate experts serving New York's Capital City."
      keywords="Albany NY homes for sale, Albany real estate, Albany NY properties, Pine Hills homes, Center Square Albany, Albany housing market, homes for sale Albany New York"
      description="Albany, New York's capital city, offers an exceptional blend of historic neighborhoods, cultural attractions, and economic opportunity. From the tree-lined streets of Pine Hills near the University at Albany to the elegant brownstones of Center Square, Albany's diverse neighborhoods each have their own character and appeal. The city boasts world-class museums including the New York State Museum, a thriving restaurant scene on Lark Street, and easy access to major employers in government, healthcare, and education. With Washington Park, the Empire State Plaza, and numerous festivals year-round, Albany provides urban amenities with a strong sense of community. Housing options range from affordable starter homes to luxury estates, multi-unit investment properties to modern condos, making Albany ideal for first-time buyers, families, and investors."
      highlights={[
        "New York State capital",
        "Diverse neighborhoods & architecture",
        "Washington Park & cultural attractions",
        "Strong job market & universities",
        "Excellent dining & nightlife",
        "Central location in Capital District"
      ]}
      stats={{
        averagePrice: "$265,000",
        daysOnMarket: "28 days",
        totalListings: "250+"
      }}
    />
  );
};

export default AlbanyHomesForSale;
