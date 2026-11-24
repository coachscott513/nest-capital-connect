import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function VerifiedEmailGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p role="status" className="text-sm text-muted-foreground">Checking sign-in…</p>;
  if (!user) {
    const returnTo = `${location.pathname}${location.search}${location.hash}`;
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Sign in with a confirmed email to receive this resource.</p>
        <Button asChild className="w-full">
          <Link to={`/auth?redirect=${encodeURIComponent(returnTo)}`}>Sign in to receive this resource</Link>
        </Button>
      </div>
    );
  }
  if (!user.email || !user.email_confirmed_at) {
    return <p role="status" className="text-sm text-muted-foreground">Confirm your account email before requesting this resource. Check your inbox for the confirmation link, then sign in again.</p>;
  }
  return <>{children}</>;
}