import React, { useEffect } from 'react';

interface AdSenseOptimizerProps {
  adClient?: string;
  adSlot?: string;
  adFormat?: string;
  className?: string;
  style?: React.CSSProperties;
}

const AdSenseOptimizer: React.FC<AdSenseOptimizerProps> = ({
  adClient = "ca-pub-XXXXXXXXXXXXXXXX", // Replace with your AdSense publisher ID
  adSlot = "XXXXXXXXXX", // Replace with your ad unit ID
  adFormat = "auto",
  className = "",
  style = {}
}) => {
  
  useEffect(() => {
    // Load AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
      
      window.adsbygoogle = window.adsbygoogle || [];
    }
    
    // Push ad configuration
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

// AdSense placement components for different sections
export const HeaderAd: React.FC = () => (
  <AdSenseOptimizer 
    className="header-ad mb-4"
    style={{ minHeight: '90px', textAlign: 'center' }}
    adFormat="horizontal"
  />
);

export const SidebarAd: React.FC = () => (
  <AdSenseOptimizer 
    className="sidebar-ad my-4"
    style={{ minHeight: '300px', width: '300px' }}
    adFormat="rectangle"
  />
);

export const ArticleAd: React.FC = () => (
  <AdSenseOptimizer 
    className="article-ad my-6"
    style={{ minHeight: '250px', textAlign: 'center' }}
    adFormat="auto"
  />
);

export const FooterAd: React.FC = () => (
  <AdSenseOptimizer 
    className="footer-ad mt-4"
    style={{ minHeight: '90px', textAlign: 'center' }}
    adFormat="horizontal"
  />
);

// AdSense policy compliance component
export const AdSenseCompliance: React.FC = () => {
  useEffect(() => {
    // Add AdSense policy compliance meta tags
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Content quality indicators for AdSense
    addMetaTag('content-type', 'Real Estate');
    addMetaTag('content-language', 'en-US');
    addMetaTag('content-rating', 'general');
    addMetaTag('ad-density', 'low');
    addMetaTag('content-freshness', 'updated-daily');
    
    // Privacy policy indicator
    addMetaTag('privacy-policy', 'https://your-domain.com/privacy-policy');
    addMetaTag('terms-of-service', 'https://your-domain.com/terms-of-service');
    
    // Content classification for ad targeting
    addMetaTag('content-category', 'Real Estate Investment');
    addMetaTag('target-audience', 'Property Investors');
    addMetaTag('page-value', 'high');
    
  }, []);

  return null;
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdSenseOptimizer;