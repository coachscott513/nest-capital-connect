import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Video, Camera, Mic, BarChart3, ArrowRight, Play, CheckCircle } from 'lucide-react';

const PartnerSuccess = () => {
  const features = [
    {
      icon: Camera,
      title: 'Cinematic 4K B-Roll',
      description: 'Professional footage of your business, team, and workspace shot with cinema-grade equipment.',
    },
    {
      icon: Mic,
      title: 'Founder Interview',
      description: 'A compelling 60-second narrative where you share your origin story and vision.',
    },
    {
      icon: BarChart3,
      title: 'Nest Intelligence Integration',
      description: 'Your video featured on town pages alongside market data, reaching active buyers.',
    },
  ];

  const benefits = [
    'Featured placement on your town page',
    'Embedded in market intelligence reports',
    'Shareable across all social platforms',
    'Permanent homepage anchor position',
    'Included in buyer welcome packets',
    'Professional editing and color grading',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Building2 className="w-3 h-3 mr-1" />
              Business Partner Program
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Become a{' '}
              <span className="text-primary">Town Anchor</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Move from a blurred profile to a verified community leader. 
              Get discovered by every buyer searching your town.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/partner-auth">
                  Join the Program
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#video-example">
                  <Play className="mr-2 w-4 h-4" />
                  See Example
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Spotlight Section */}
      <section id="video-example" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Example: The Town Hero 60-Second Spotlight
              </h2>
              <p className="text-muted-foreground">
                See how we transform local businesses into community anchors
              </p>
            </div>

            {/* Video Placeholder */}
            <Card className="border-border/50 bg-card/50 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920')] bg-cover bg-center opacity-30" />
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-primary/30 transition-colors">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <p className="text-muted-foreground">
                    Video sample coming soon
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What's Included
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every Town Hero package delivers professional-grade content 
              designed to establish you as the go-to expert in your area
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="border-border/50 bg-card/50 text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-border/50 bg-card/50 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-1">
                <div className="bg-card rounded-t-lg p-8 text-center">
                  <Badge className="mb-4 bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Pilot Phase Pricing
                  </Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Town Hero Video Package
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Limited time offer for first businesses in our 11-county coverage area
                  </p>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-8">
                    <span className="text-5xl font-bold text-foreground">$150</span>
                    <span className="text-muted-foreground line-through">$450</span>
                    <Badge variant="secondary" className="ml-2">Save 67%</Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-left mb-8">
                    {benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/partner-auth">
                      Claim Your Spot
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  <p className="text-xs text-muted-foreground mt-4">
                    Limited to first 50 businesses per county
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Stand Out?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the businesses already growing their presence in the Capital District. 
            Your customers are searching—make sure they find you first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/partner-auth">
                Create Partner Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="mailto:scott@capitaldistrictnest.com">
                Contact an Agent
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Capital District Nest. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PartnerSuccess;
