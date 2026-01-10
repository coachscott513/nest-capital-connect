import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Search, User, Mail, Phone, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const SearchAssistanceSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    searchCriteria: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Required Fields",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('leads').insert({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: `Search Assistance Request: ${formData.searchCriteria || 'No specific criteria provided'}`,
        type: 'search_assistance',
        location: 'Capital District',
        lead_type: "buyer",
      });

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "We'll help you build a personalized search plan. Expect to hear from us soon.",
      });
      
      setFormData({ name: '', email: '', phone: '', searchCriteria: '' });
      setIsOpen(false);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-primary/10">
            <Target className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
          Need help narrowing your search?
        </h2>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Capital District Nest helps buyers compare neighborhoods, understand price trends, 
          evaluate taxes, schools, and long-term value — and make confident decisions using real data.
        </p>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="h-12 px-8 text-base font-medium">
              <Search className="mr-2 h-5 w-5" />
              Build My Search Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-light">Build Your Search Plan</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="search-name" className="text-foreground font-medium">
                  Your Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-email" className="text-foreground font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-email"
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-phone" className="text-foreground font-medium">
                  Phone Number <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-phone"
                    type="tel"
                    placeholder="(518) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search-criteria" className="text-foreground font-medium">
                  What are you looking for? <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="search-criteria"
                  placeholder="Tell us about your ideal property: location, price range, features, timeline..."
                  value={formData.searchCriteria}
                  onChange={(e) => setFormData({ ...formData, searchCriteria: e.target.value })}
                  className="min-h-[100px] resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get My Search Plan'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default SearchAssistanceSection;
