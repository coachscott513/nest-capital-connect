import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Home, Wrench, DollarSign, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const OpportunityCards = () => {
  const opportunities = [
    {
      icon: Building2,
      title: "Multi-Unit Properties",
      description: "Discover investment opportunities in duplexes, triplexes, and apartment buildings across the Capital District.",
      link: "/investment-landing",
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: Wrench,
      title: "Rehab & Fix-Flip",
      description: "Find properties with potential. Transform undervalued homes into profitable investments.",
      link: "/investment-landing#rehab",
      gradient: "from-accent/10 to-accent/5"
    },
    {
      icon: Home,
      title: "Rental Properties",
      description: "Build passive income with turnkey rental properties in high-demand neighborhoods.",
      link: "/rentals",
      gradient: "from-secondary/10 to-secondary/5"
    },
    {
      icon: DollarSign,
      title: "Financing Solutions",
      description: "Access fix & flip loans, traditional mortgages, and investor-friendly financing options.",
      link: "/investment-landing#financing",
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: MapPin,
      title: "Capital District Markets",
      description: "Explore opportunities in Albany, Troy, Schenectady, and Saratoga Springs.",
      link: "/markets",
      gradient: "from-accent/10 to-accent/5"
    },
    {
      icon: Users,
      title: "First-Time Buyers",
      description: "Start your real estate journey with expert guidance and first-time buyer resources.",
      link: "/communities",
      gradient: "from-secondary/10 to-secondary/5"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Investment Opportunities
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore diverse real estate opportunities across the Capital District. 
            From multi-unit buildings to fix-and-flip projects, find your next investment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <Link
                key={index}
                to={opportunity.link}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${opportunity.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {opportunity.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold pt-2 group-hover:gap-3 gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OpportunityCards;
