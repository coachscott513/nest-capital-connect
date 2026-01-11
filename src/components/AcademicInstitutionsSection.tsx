import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  School, 
  BookOpen,
  Users,
  TrendingUp,
  ExternalLink,
  Phone,
  MapPin
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AcademicInstitution {
  id: string;
  institution_type: string;
  name: string;
  short_name: string | null;
  logo_url: string | null;
  ranking_score: number | null;
  graduation_rate: number | null;
  student_teacher_ratio: number | null;
  enrollment: number | null;
  website_url: string | null;
  address: string | null;
  phone: string | null;
  description: string | null;
  is_featured: boolean;
}

interface AcademicInstitutionsSectionProps {
  townSlug: string;
  townName: string;
}

const typeConfig: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  university: { icon: GraduationCap, label: "University", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  college: { icon: GraduationCap, label: "College", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  community_college: { icon: BookOpen, label: "Community College", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  k12_district: { icon: School, label: "School District", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  private_school: { icon: School, label: "Private School", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  charter_school: { icon: School, label: "Charter School", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

const AcademicInstitutionsSection = ({ townSlug, townName }: AcademicInstitutionsSectionProps) => {
  const [institutions, setInstitutions] = useState<AcademicInstitution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      const { data, error } = await supabase
        .from("academic_institutions")
        .select("*")
        .eq("town_slug", townSlug)
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("display_order", { ascending: true });

      if (!error && data) {
        setInstitutions(data);
      }
      setLoading(false);
    };

    fetchInstitutions();
  }, [townSlug]);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-muted/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-64 animate-pulse bg-muted/20" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (institutions.length === 0) {
    return null;
  }

  // Separate higher ed from K-12
  const higherEd = institutions.filter(i => 
    ["university", "college", "community_college"].includes(i.institution_type)
  );
  const k12 = institutions.filter(i => 
    ["k12_district", "private_school", "charter_school"].includes(i.institution_type)
  );

  const renderInstitutionCard = (institution: AcademicInstitution) => {
    const config = typeConfig[institution.institution_type] || typeConfig.college;
    const Icon = config.icon;

    return (
      <Card 
        key={institution.id}
        className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
          institution.is_featured ? "ring-1 ring-primary/20" : ""
        }`}
      >
        {institution.is_featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
              Featured
            </Badge>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            {institution.logo_url ? (
              <img 
                src={institution.logo_url} 
                alt={institution.name}
                className="w-12 h-12 rounded-lg object-contain bg-white p-1"
              />
            ) : (
              <div className={`p-3 rounded-xl ${config.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Badge variant="outline" className={`text-xs mb-2 ${config.color}`}>
                {config.label}
              </Badge>
              <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                {institution.short_name || institution.name}
              </h3>
            </div>
          </div>

          {institution.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {institution.description}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {institution.ranking_score && (
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-primary" />
                <p className="text-lg font-bold text-foreground">{institution.ranking_score}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            )}
            {institution.graduation_rate && (
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <GraduationCap className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                <p className="text-lg font-bold text-foreground">{institution.graduation_rate}%</p>
                <p className="text-xs text-muted-foreground">Grad Rate</p>
              </div>
            )}
            {institution.student_teacher_ratio && (
              <div className="text-center p-2 rounded-lg bg-muted/30">
                <Users className="w-4 h-4 mx-auto mb-1 text-sky-400" />
                <p className="text-lg font-bold text-foreground">{institution.student_teacher_ratio}:1</p>
                <p className="text-xs text-muted-foreground">Ratio</p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm mb-4">
            {institution.address && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{institution.address}</span>
              </div>
            )}
            {institution.phone && (
              <a 
                href={`tel:${institution.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{institution.phone}</span>
              </a>
            )}
          </div>

          {institution.website_url && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href={institution.website_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                View District Intelligence
              </a>
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-muted/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Academic Yield</p>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {townName} Education Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            School district rankings, graduation rates, and institutional anchors that drive property values
          </p>
        </div>

        {higherEd.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Colleges & Universities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {higherEd.map(renderInstitutionCard)}
            </div>
          </div>
        )}

        {k12.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <School className="w-5 h-5 text-primary" />
              K-12 School Districts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {k12.map(renderInstitutionCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AcademicInstitutionsSection;
