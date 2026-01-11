import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Landmark, 
  FileText, 
  Users, 
  Phone, 
  ExternalLink,
  MapPin,
  Clock,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CivicEntry {
  id: string;
  category: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  office_name: string | null;
  contact_name: string | null;
  contact_title: string | null;
  contact_photo_url: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  office_hours: string | null;
  website_url: string | null;
  pdf_url: string | null;
}

interface CivicDirectorySectionProps {
  townSlug: string;
  townName: string;
}

const categoryConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  tax_assessor: { icon: FileText, label: "Tax & Assessor", color: "text-emerald-400" },
  code_enforcement: { icon: Building2, label: "Code Enforcement", color: "text-amber-400" },
  town_hall: { icon: Landmark, label: "Town Hall", color: "text-sky-400" },
  elected_official: { icon: Users, label: "Elected Officials", color: "text-violet-400" },
  school_board: { icon: Users, label: "School Board", color: "text-rose-400" },
  emergency_services: { icon: Phone, label: "Emergency Services", color: "text-red-400" },
};

const CivicDirectorySection = ({ townSlug, townName }: CivicDirectorySectionProps) => {
  const [entries, setEntries] = useState<CivicEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCivicData = async () => {
      const { data, error } = await supabase
        .from("town_civic_directory")
        .select("*")
        .eq("town_slug", townSlug)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setEntries(data);
      }
      setLoading(false);
    };

    fetchCivicData();
  }, [townSlug]);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (entries.length === 0) {
    return null;
  }

  // Group entries by category
  const groupedEntries = entries.reduce((acc, entry) => {
    const cat = entry.category || "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(entry);
    return acc;
  }, {} as Record<string, CivicEntry[]>);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Civic Infrastructure</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {townName} Government Directory
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Direct access to tax records, building permits, and elected officials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(groupedEntries).map(([category, items]) => {
            const config = categoryConfig[category] || { 
              icon: Building2, 
              label: category.replace(/_/g, " "), 
              color: "text-primary" 
            };
            const Icon = config.icon;
            const primaryEntry = items[0];

            return (
              <Card 
                key={category}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="p-6">
                  <div className={`inline-flex p-3 rounded-xl bg-muted/50 mb-4 ${config.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {config.label}
                  </h3>
                  
                  {primaryEntry.office_name && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {primaryEntry.office_name}
                    </p>
                  )}

                  {primaryEntry.contact_name && (
                    <div className="flex items-center gap-2 mb-3">
                      {primaryEntry.contact_photo_url ? (
                        <img 
                          src={primaryEntry.contact_photo_url} 
                          alt={primaryEntry.contact_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Users className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{primaryEntry.contact_name}</p>
                        {primaryEntry.contact_title && (
                          <p className="text-xs text-muted-foreground">{primaryEntry.contact_title}</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    {primaryEntry.phone && (
                      <a 
                        href={`tel:${primaryEntry.phone}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{primaryEntry.phone}</span>
                      </a>
                    )}
                    
                    {primaryEntry.address && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{primaryEntry.address}</span>
                      </div>
                    )}

                    {primaryEntry.office_hours && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{primaryEntry.office_hours}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50 flex gap-2">
                    {primaryEntry.website_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs"
                        asChild
                      >
                        <a href={primaryEntry.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    {primaryEntry.pdf_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs"
                        asChild
                      >
                        <a href={primaryEntry.pdf_url} target="_blank" rel="noopener noreferrer">
                          <FileText className="w-3 h-3 mr-1" />
                          Forms
                        </a>
                      </Button>
                    )}
                    {primaryEntry.email && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-xs"
                        asChild
                      >
                        <a href={`mailto:${primaryEntry.email}`}>
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CivicDirectorySection;
