import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/MainLayout";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    name: "Karen Lawson",
    tag: "Buy & Sell • Amsterdam, NY",
    date: "11/30/2025",
    dateISO: "2025-11-30",
    rating: 5,
    review: "Scott is an amazing realtor. His communication skills are outstanding... He also referred us to an excellent mortgage banker and closing attorney. Not only did Scott provide us a great home sale, he also sold the home we were living in without incident.",
  },
  {
    name: "Scout Isabella Hoff",
    tag: "Single Family • Pine Hills, Albany",
    date: "7/23/2024",
    dateISO: "2024-07-23",
    rating: 5,
    review: "I saw the house on Zillow Saturday night... We put in an offer. Offer got accepted THAT night. Then we closed in 22 days!!!! Scott is THAT good! I will continue to use him & recommend him to everyone looking to buy or sell in NY!",
  },
  {
    name: "jstickling0",
    tag: "Buyer & Seller",
    date: "10/16/2025",
    dateISO: "2025-10-16",
    rating: 5,
    review: "Working with Scott Alvarez was an amazing experience! ... Scott is not only knowledgeable and professional, but also incredibly genuine... By the end, Scott wasn't just my real estate agent — he became a friend.",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const Reviews = () => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Capital District Nest - Scott Alvarez Real Estate Team",
    "image": "https://capitaldistrictnest.com/lovable-uploads/85110425-79bb-4796-9796-22b5b647b1ee.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Albany",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "datePublished": r.dateISO,
      "reviewBody": r.review,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Client Reviews | Capital District Nest Real Estate</title>
        <meta
          name="description"
          content="Read real reviews from Albany, Amsterdam, and Pine Hills clients. See why investors and homeowners trust Capital District Nest for buying and selling homes in NY."
        />
        <link rel="canonical" href="https://capitaldistrictnest.com/reviews" />
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>

      <main className="py-20 px-[5%]">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Trusted by Capital District Investors & Homeowners
          </h1>
          <p className="text-xl text-muted-foreground">
            Real results from Albany, Amsterdam, and Pine Hills clients.
          </p>
        </section>

        {/* Testimonials Grid */}
        <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <Card key={review.name} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col h-full">
                <StarRating rating={review.rating} />
                
                <blockquote className="mt-4 flex-1">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{review.review}"
                  </p>
                </blockquote>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-bold text-foreground">{review.name}</p>
                  <p className="text-sm text-primary font-medium">{review.tag}</p>
                  <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* CTA Section */}
        <section className="text-center mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-muted-foreground mb-6">
            Join hundreds of satisfied Capital District clients who trusted us with their real estate journey.
          </p>
          <a
            href="tel:+15186762347"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Call (518) 676-2347
          </a>
        </section>
      </main>
    </MainLayout>
  );
};

export default Reviews;
