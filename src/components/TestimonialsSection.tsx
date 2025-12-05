
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Finding my apartment through Capital District Nest was incredibly easy. The application process was smooth, and I felt supported every step of the way!",
      author: "Sarah L., Renter (Albany)"
    },
    {
      quote: "As an owner, their low fees and robust vetting saved me so much time and money. I quickly found a great tenant and the support was fantastic.",
      author: "Mark D., Property Owner (Troy)"
    },
    {
      quote: "I appreciate their unique approach – not just finding me a rental, but also giving me insights into homeownership for the future. Truly a game-changer!",
      author: "Jessica M., Renter (Schenectady)"
    }
  ];

  return (
    <section className="py-16 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2">
              <p className="text-muted-foreground italic mb-4">
                "{testimonial.quote}"
              </p>
              <p className="font-semibold text-foreground">
                - {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
