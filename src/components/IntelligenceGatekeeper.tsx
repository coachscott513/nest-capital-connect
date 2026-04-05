import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface IntelligenceGatekeeperProps {
  children: React.ReactNode;
  previewContent?: React.ReactNode;
  yieldValue?: string;
  townName?: string;
}

const IntelligenceGatekeeper = ({
  children,
  previewContent,
  yieldValue = "36%",
  townName = "this market",
}: IntelligenceGatekeeperProps) => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.href,
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Sign In Failed",
          description: error.message,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  // If user is authenticated, show the unlocked content with spring animation
  if (user && !loading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ filter: "blur(12px)", opacity: 0.8 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="relative">
        {previewContent || children}
        <div className="absolute inset-0 backdrop-blur-xl bg-[#0B0B0B]/60 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#00F5FF] animate-spin" />
        </div>
      </div>
    );
  }

  // Locked state - show blur overlay with "Liquid Glass" card
  return (
    <div className="relative">
      {/* Blurred preview content */}
      <div className="filter blur-[12px] pointer-events-none select-none">
        {previewContent || children}
      </div>

      {/* Liquid Glass Overlay Card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
          className="relative max-w-md w-full"
        >
          {/* Glow effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00F5FF]/30 via-[#00F5FF]/10 to-[#00F5FF]/30 rounded-3xl blur-xl opacity-60" />

          {/* Main card with glassmorphism */}
          <div className="relative bg-[#0B0B0B]/80 backdrop-blur-3xl border border-[#00F5FF]/20 rounded-3xl p-8 shadow-2xl">
            {/* Lock icon with teal glow */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-3 bg-[#00F5FF]/20 rounded-full blur-lg" />
                <div className="relative w-16 h-16 rounded-full bg-[#0B0B0B] border border-[#00F5FF]/30 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-[#00F5FF]" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-extralight text-white text-center mb-2 tracking-wide">
              Local Insider Access
            </h3>
            <p className="text-center text-white/60 text-sm font-light mb-2">
              Locked
            </p>

            {/* Yield highlight */}
            <div className="text-center mb-6">
              <span className="text-4xl font-extralight text-[#00F5FF]">
                {yieldValue}
              </span>
              <span className="text-white/60 text-sm font-light block mt-1">
                Yield Data for {townName}
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#00F5FF]/30 to-transparent mb-6" />

            {/* Sign in prompt */}
            <p className="text-center text-white/70 text-sm font-light mb-6">
              Access market pulse, comparable sales, and investment vault data
              with one tap.
            </p>

            {/* Google Sign In Button - Cupertino style */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="w-full h-14 bg-background hover:bg-background/90 text-[#0B0B0B] rounded-2xl font-medium text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isSigningIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>

            {/* Apple Sign In Button - Coming soon styling */}
            <Button
              disabled
              className="w-full h-14 bg-[#0B0B0B] hover:bg-[#1a1a1a] text-white border border-white/20 rounded-2xl font-medium text-base flex items-center justify-center gap-3 mt-3 transition-all duration-300 opacity-50 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple Sign In (Coming Soon)
            </Button>

            {/* Privacy note */}
            <p className="text-center text-white/40 text-xs font-light mt-6">
              Your data is protected. We never share your information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntelligenceGatekeeper;
