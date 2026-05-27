import { Helmet } from "react-helmet-async";
import CleanHeader from "@/components/CleanHeader";
import Footer from "@/components/Footer";
import BusinessDirectory from "@/components/local/BusinessDirectory";

const LocalPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>Local Businesses | Capital District Nest</title>
      <meta
        name="description"
        content="The Capital District's Premier Local Media & Discovery Hub — search restaurants, contractors, lenders, salons, and 4,000+ local businesses across Albany, Saratoga, Troy, Schenectady, and every Capital District town."
      />
      <meta property="og:title" content="Local Businesses | Capital District Nest" />
      <meta property="og:description" content="The Capital District's Premier Local Media & Discovery Hub." />
      <link rel="canonical" href="https://www.capitaldistrictnest.com/local" />
    </Helmet>

    <CleanHeader />
    <BusinessDirectory />
    <Footer />
  </div>
);

export default LocalPage;
