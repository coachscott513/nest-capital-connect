import CityHomesTemplate from "@/components/CityHomesTemplate";

const SaratogaHomesForSale = () => {
  return (
    <CityHomesTemplate
      cityName="Saratoga Springs"
      citySlug="saratoga-springs"
      pageTitle="Saratoga Springs Homes for Sale | Saratoga Springs, NY Real Estate"
      metaDescription="Luxury and historic homes for sale in Saratoga Springs, NY. Explore properties near the famous race track, downtown, and Saratoga Lake. Premium Capital District real estate."
      keywords="Saratoga Springs NY homes for sale, Saratoga real estate, Saratoga Springs properties, luxury homes Saratoga, Saratoga race track homes, downtown Saratoga, Saratoga Lake real estate"
      description="Saratoga Springs is the Capital District's premier luxury market, renowned for its world-class horse racing, natural mineral springs, and vibrant downtown. This historic spa city offers an unparalleled lifestyle with upscale dining on Broadway, the Saratoga Performing Arts Center (SPAC) summer concerts, and year-round cultural events. The architecture ranges from grand Victorian mansions near Congress Park to modern estates near Saratoga Lake, with charming neighborhoods throughout. Excellent schools, Skidmore College, and a strong sense of community make Saratoga ideal for families, while the thriving downtown and proximity to Lake George appeal to retirees and second-home buyers. The housing market is competitive, with properties ranging from downtown condos to sprawling estates, reflecting Saratoga's status as one of New York's most desirable communities."
      highlights={[
        "World-famous Saratoga Race Course",
        "Upscale Broadway shopping & dining",
        "SPAC concerts & cultural events",
        "Natural mineral springs & spas",
        "Top-rated schools & Skidmore College",
        "Saratoga Lake waterfront"
      ]}
      stats={{
        averagePrice: "$485,000",
        daysOnMarket: "22 days",
        totalListings: "160+"
      }}
    />
  );
};

export default SaratogaHomesForSale;
