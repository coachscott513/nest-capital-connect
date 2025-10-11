import CityHomesTemplate from "@/components/CityHomesTemplate";

const SchenectadyHomesForSale = () => {
  return (
    <CityHomesTemplate
      cityName="Schenectady"
      citySlug="schenectady"
      pageTitle="Schenectady Homes for Sale | Schenectady, NY Real Estate | Capital District Nest"
      metaDescription="Discover Schenectady, NY homes for sale. Affordable properties in the Stockade, Mont Pleasant, and more. Your local guide to Schenectady real estate opportunities."
      keywords="Schenectady NY homes for sale, Schenectady real estate, Schenectady NY properties, Stockade homes, Schenectady housing market, affordable homes Schenectady, homes for sale Schenectady New York"
      description="Schenectady offers some of the Capital District's best value in real estate, combining affordability with quality neighborhoods and excellent amenities. The historic Stockade District features beautifully preserved colonial and Victorian homes along tree-lined streets, while neighborhoods like Mont Pleasant and Bellevue offer spacious family homes at attractive prices. Downtown Schenectady has undergone significant revitalization, with Proctors Theatre anchoring a growing entertainment and dining scene. The city is home to Union College and major employers including General Electric and the Schenectady County government. With highly-rated schools in certain districts, extensive parks including Central Park, and easy access to I-890 for commuting, Schenectady attracts families and first-time buyers seeking affordability without sacrificing quality of life."
      highlights={[
        "Most affordable Capital District city",
        "Historic Stockade neighborhood",
        "Downtown revitalization & Proctors Theatre",
        "Union College community",
        "Excellent schools in key districts",
        "Easy highway access"
      ]}
      stats={{
        averagePrice: "$195,000",
        daysOnMarket: "35 days",
        totalListings: "180+"
      }}
    />
  );
};

export default SchenectadyHomesForSale;
