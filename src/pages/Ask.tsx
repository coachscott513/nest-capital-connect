import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Ask = () => {
  const [formData, setFormData] = useState({
    question: "",
    name: "",
    contact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.contact.trim()) {
      toast.error("Please enter your question and email or phone");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        full_name: formData.name || "Question Submission",
        email: formData.contact.includes('@') ? formData.contact : `${formData.contact}@phone.placeholder`,
        phone: !formData.contact.includes('@') ? formData.contact : null,
        message: formData.question,
        type: 'question',
        location: 'Capital District',
        lead_type: "buyer",
      });

      if (error) throw error;
      
      setIsSubmitted(true);
      toast.success("Question received! We'll get back to you shortly.");
    } catch (error) {
      console.error('Question submission error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ask a Question | Capital District Nest</title>
        <meta name="description" content="Have a question about Capital District real estate? Ask anything about pricing, neighborhoods, taxes, rentals, or timelines. Get a clear, helpful answer." />
      </Helmet>

      <MainHeader />

      {/* Breadcrumb */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border py-3 px-4 md:px-[5%]">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <main className="px-[5%] py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          {isSubmitted ? (
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Got It!
                </h1>
                <p className="text-muted-foreground mb-6">
                  We'll review your question and get back to you with a clear, helpful answer — usually within a few hours.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/">
                    Return to Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Ask a Question
                  </h1>
                  <p className="text-muted-foreground">
                    Anything about Capital District real estate — pricing, neighborhoods, taxes, rentals, multifamily, timelines. You'll get a clear answer.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Textarea
                      placeholder="What's your question?"
                      value={formData.question}
                      onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                      className="min-h-[120px] resize-none"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Name (optional)"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Email or phone (so we can reply)"
                      value={formData.contact}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                      className="h-12"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg font-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send My Question"}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  No spam. No sales pressure. Just a helpful answer.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Ask;
