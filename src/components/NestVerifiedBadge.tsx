import { motion } from "framer-motion";

interface NestVerifiedBadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

/**
 * Capital District Nest Verified Badge
 * 
 * Apple-style minimalist badge for exclusive partners.
 * Creates scarcity and premium positioning for the Preferred Partner network.
 */
const NestVerifiedBadge = ({ 
  size = "md", 
  showText = true,
  className = ""
}: NestVerifiedBadgeProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm"
  };

  return (
    <motion.div 
      className={`inline-flex items-center gap-1.5 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* The Badge Icon - Minimalist Apple-style */}
      <div 
        className={`${sizeClasses[size]} relative flex items-center justify-center`}
      >
        {/* Outer ring */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-full h-full"
          fill="none"
        >
          {/* Shield shape */}
          <path 
            d="M12 2L3 7v6c0 5.25 3.85 10.15 9 11 5.15-.85 9-5.75 9-11V7l-9-5z"
            fill="currentColor"
            className="text-foreground"
          />
          {/* Inner white checkmark */}
          <path 
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-background"
          />
        </svg>
      </div>
      
      {showText && (
        <span className={`${textSizeClasses[size]} font-semibold tracking-tight text-foreground`}>
          Nest Verified
        </span>
      )}
    </motion.div>
  );
};

export default NestVerifiedBadge;
