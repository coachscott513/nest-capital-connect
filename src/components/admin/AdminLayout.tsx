import { ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loader2, LogOut, ShieldAlert } from "lucide-react";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/launch-dashboard", label: "Launch" },
  { to: "/admin/towns", label: "Towns" },
  { to: "/admin/partner-inquiries", label: "Inquiries" },
  { to: "/admin/partners", label: "Partners" },
  { to: "/admin/partner-placements", label: "Placements" },
  { to: "/admin/listing-claims", label: "Listing Claims" },
  { to: "/admin/property-listings", label: "Property Listings" },
  { to: "/admin/business-audit", label: "Business Audit" },
  { to: "/admin/data-health", label: "Data Health" },
  { to: "/admin/seo-manifest", label: "SEO Manifest" },
  { to: "/admin/previews", label: "Previews" },
  { to: "/admin/answer-pilot", label: "Answer Pilot" },
  { to: "/admin/revenue", label: "Revenue" },
];

export default function AdminLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading } = useIsAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-[#5eead4]" />
      </div>
    );
  }

  if (!user) {
    return (
      <Gate
        title="Admin sign-in required"
        body="Please sign in with an admin account to access the Capital District Nest admin console."
        cta="Sign in"
        onCta={() => navigate("/partner-auth?next=/admin")}
      />
    );
  }

  if (!isAdmin) {
    return (
      <Gate
        title="No admin access"
        body="Your account is signed in but does not have admin privileges. Contact the Capital District Nest team to request access."
        cta="Sign out"
        onCta={async () => {
          await supabase.auth.signOut();
          navigate("/partner-auth?next=/admin");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title} · CDN Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="border-b border-white/10 bg-[#0B0F19]/95 sticky top-0 z-30">
        <div className="px-[5%] py-3 flex items-center justify-between gap-4">
          <Link to="/admin" className="text-sm font-semibold text-white">
            CDN <span className="text-[#5eead4]">Admin</span>
          </Link>
          <div className="text-xs text-white/55 hidden md:block">{user.email}</div>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/");
            }}
            className="text-white/70 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-1" /> Sign out
          </Button>
        </div>
        <nav className="px-[5%] pb-2 flex flex-wrap gap-1 text-sm">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${
                  isActive
                    ? "bg-[#5eead4]/15 text-[#5eead4]"
                    : "text-white/65 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="px-[5%] py-8 max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="text-white/60 text-sm mt-1">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}

function Gate({
  title,
  body,
  cta,
  onCta,
}: {
  title: string;
  body: string;
  cta: string;
  onCta: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <Helmet>
        <title>Admin · Capital District Nest</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-[#1E2230] p-8 text-center">
        <ShieldAlert className="w-10 h-10 text-[#5eead4] mx-auto mb-4" />
        <h1 className="text-xl font-semibold mb-2">{title}</h1>
        <p className="text-white/65 text-sm mb-6">{body}</p>
        <Button onClick={onCta} className="bg-[#5eead4] text-[#0B0F19] hover:bg-[#5eead4]/90">
          {cta}
        </Button>
      </div>
    </div>
  );
}
