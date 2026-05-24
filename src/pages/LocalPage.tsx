import { Helmet } from "react-helmet-async";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BusinessDirectory from "@/components/local/BusinessDirectory";

const LocalPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Capital District Local Businesses | Capital District Nest</title>
      <meta
        name="description"
        content="Curated profiles of cafés, lenders, attorneys, contractors and home services across the Capital District — cinematic, hand-picked, by town."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/local" />
    </Helmet>

    <CleanHeader />
    <BusinessDirectory />
    <Footer />
  </div>
);

export default LocalPage;
