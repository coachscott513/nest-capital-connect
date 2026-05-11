import { Helmet } from "react-helmet-async";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BusinessDirectory from "@/components/local/BusinessDirectory";

const LocalPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Capital District Business Directory | Capital District Nest</title>
      <meta
        name="description"
        content="Search trusted local businesses across the Capital District — restaurants, lenders, attorneys, contractors, home services, and more — by town and category."
      />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/local" />
    </Helmet>

    <CleanHeader />
    <BusinessDirectory />
    <Footer />
  </div>
);

export default LocalPage;
