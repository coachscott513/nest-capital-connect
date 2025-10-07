import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Home, Wrench, DollarSign, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OpportunityCards = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const opportunities = [
    {
      icon: Building2,
      title: "Multi-Unit Properties",
      description: "Discover investment opportunities in duplexes, triplexes, and apartment buildings across the Capital District.",
      action: () => scrollToSection('investment-properties'),
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: Wrench,
      title: "Rehab & Fix-Flip",
      description: "Find properties with potential. Transform undervalued homes into profitable investments.",
      action: () => scrollToSection('rehab-properties'),
      gradient: "from-accent/10 to-accent/5"
    },
    {
      icon: Home,
      title: "Rental Properties",
      description: "Build passive income with turnkey rental properties in high-demand neighborhoods.",
      action: () => navigate('/rentals'),
      gradient: "from-secondary/10 to-secondary/5"
    },
    {
      icon: DollarSign,
      title: "Financing Solutions",
      description: "Access fix & flip loans, traditional mortgages, and investor-friendly financing options.",
      action: () => scrollToSection('financing'),
      gradient: "from-primary/10 to-primary/5"
    },
    {
      icon: MapPin,
      title: "Capital District Markets",
      description: "Explore opportunities in Albany, Troy, Schenectady, and Saratoga Springs.",
      action: () => navigate('/markets'),
      gradient: "from-accent/10 to-accent/5"
    },
    {
      icon: Users,
      title: "First-Time Buyers",
      description: "Start your real estate journey with expert guidance and first-time buyer resources.",
      action: () => scrollToSection('contact'),
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
              <div
                key={index}
                onClick={opportunity.action}
                className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OpportunityCards;
