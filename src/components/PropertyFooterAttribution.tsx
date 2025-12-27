import React from 'react';
import { ExternalLink } from 'lucide-react';

interface PropertyFooterAttributionProps {
  mlsUrl?: string;
  mlsId?: string;
}

const PropertyFooterAttribution: React.FC<PropertyFooterAttributionProps> = ({ 
  mlsUrl, 
  mlsId 
}) => {
  return (
    <div className="border-t border-border/50 pt-8 mt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* MLS Link - Subtle, secondary */}
          {mlsUrl && (
            <a
              href={mlsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View Official MLS Listing
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          
          {/* Agent Attribution - Very subtle disclosure */}
          <p className="text-xs text-muted-foreground/70">
            Listing marketed by{' '}
            <a 
              href="https://www.scottalvarez.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              Scott Alvarez
            </a>
            , Licensed Real Estate Salesperson, RE/MAX
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyFooterAttribution;
