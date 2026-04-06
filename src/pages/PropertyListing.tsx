import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PropertyListingTemplate from "@/components/PropertyListingTemplate";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { buildRealEstateListingSchema } from "@/utils/seoSchemas";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const PropertyListing = () => {
  const { mlsId } = useParams<{ mlsId: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!mlsId) {
        setError("No MLS ID provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("mls_id", mlsId)
          .eq("status", "active")
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setError("Property not found");
        } else {
          setProperty(data);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [mlsId]);

  if (loading) {
    return (
      <>
        <MainHeader />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-[500px] w-full" />
              <Skeleton className="h-[300px] w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <MainHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Property not found"}</AlertDescription>
          </Alert>
          <button
            onClick={() => navigate("/homes-for-sale")}
            className="mt-6 text-primary hover:underline"
          >
            ← Back to Listings
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <PropertyListingTemplate property={property} />
      <Footer />
    </>
  );
};

export default PropertyListing;
