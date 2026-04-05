import React, { useEffect, useState } from 'react';
import { Search, TrendingUp, Users, MapPin, Star } from 'lucide-react';

interface SEOMetrics {
  pageLoadTime: number;
  contentWords: number;
  headings: number;
  images: number;
  internalLinks: number;
  externalLinks: number;
  keywordDensity: number;
}

const SEOAnalyzer: React.FC = () => {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Analyze page SEO metrics
    const analyzePageSEO = () => {
      const startTime = performance.now();
      
      // Simulate page analysis
      setTimeout(() => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        const contentWords = document.body.innerText.split(/\s+/).length;
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
        const images = document.querySelectorAll('img').length;
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]').length;
        const externalLinks = document.querySelectorAll('a[href^="http"]').length;
        
        // Calculate keyword density for "for sale" optimization targeting 95% ranking
        const forSaleKeywords = [
          'for sale', 'properties for sale', 'investment properties for sale', 
          'real estate for sale', 'homes for sale', 'capital district for sale',
          'albany for sale', 'troy for sale', 'schenectady for sale'
        ];
        const text = document.body.innerText.toLowerCase();
        let keywordCount = 0;
        forSaleKeywords.forEach(keyword => {
          keywordCount += (text.match(new RegExp(keyword.replace(/\s+/g, '\\s+'), 'g')) || []).length;
        });
        const keywordDensity = (keywordCount / contentWords) * 100;
        
        setMetrics({
          pageLoadTime: loadTime,
          contentWords,
          headings,
          images,
          internalLinks,
          externalLinks,
          keywordDensity
        });
      }, 1000);
    };

    analyzePageSEO();

    // Add structured data for better search engine understanding
    const addStructuredData = () => {
      const scriptId = 'seo-analyzer-structured-data';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": document.title,
          "description": document.querySelector('meta[name="description"]')?.getAttribute('content'),
          "url": window.location.href,
          "mainEntity": {
            "@type": "RealEstateAgent",
            "name": "Capital District Nest",
            "areaServed": "Capital District, NY",
            "serviceType": ["Investment Properties", "Multi-Unit Sales", "Property Management"]
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": window.location.origin
              }
            ]
          }
        });
        document.head.appendChild(script);
      }
    };

    addStructuredData();

    // Track user engagement for search rankings
    const trackEngagement = () => {
      let timeOnPage = 0;
      const startTime = Date.now();
      
      const trackScroll = () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 25) {
          gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: '25_percent',
            value: Math.round(scrollPercent)
          });
        }
      };

      const trackTimeOnPage = () => {
        timeOnPage = Date.now() - startTime;
        if (timeOnPage > 30000) { // 30 seconds
          gtag('event', 'time_on_page', {
            event_category: 'engagement',
            event_label: '30_seconds',
            value: timeOnPage
          });
        }
      };

      window.addEventListener('scroll', trackScroll, { passive: true });
      setTimeout(trackTimeOnPage, 30000);
      
      return () => {
        window.removeEventListener('scroll', trackScroll);
      };
    };

    const cleanup = trackEngagement();
    
    return cleanup;
  }, []);

  // Enhanced tracking for AdSense optimization
  useEffect(() => {
    // Track user interactions for better ad targeting
    const trackInteractions = () => {
      // Track button clicks
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.closest('button')) {
          gtag('event', 'click', {
            event_category: 'user_interaction',
            event_label: target.innerText || 'button_click'
          });
        }
      });

      // Track form submissions
      document.addEventListener('submit', (e) => {
        const form = e.target as HTMLFormElement;
        gtag('event', 'form_submit', {
          event_category: 'conversion',
          event_label: form.id || 'contact_form'
        });
      });
    };

    trackInteractions();
  }, []);

  if (!isVisible && import.meta.env.DEV) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-50"
        onMouseEnter={() => setIsVisible(true)}
      >
        <div className="bg-accent text-white p-2 rounded-full cursor-pointer shadow-lg">
          <Search className="w-5 h-5" />
        </div>
      </div>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-background rounded-2xl shadow-xl border border-border p-4 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-accent" />
          SEO Analysis
        </h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-muted-foreground"
        >
          ✕
        </button>
      </div>
      
      {metrics && (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Content Words:</span>
            <span className="font-medium text-green-600">{metrics.contentWords.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Headings:</span>
            <span className="font-medium">{metrics.headings}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Images:</span>
            <span className="font-medium">{metrics.images}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Internal Links:</span>
            <span className="font-medium text-accent">{metrics.internalLinks}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">"For Sale" Keywords:</span>
            <span className={`font-medium ${metrics.keywordDensity > 1 && metrics.keywordDensity < 3 ? 'text-green-600' : 'text-orange-600'}`}>
              {metrics.keywordDensity.toFixed(1)}%
            </span>
          </div>
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center text-xs text-muted-foreground">
              <Star className="w-3 h-3 mr-1" />
              <span>SEO Score: </span>
              <span className="ml-1 font-medium text-green-600">
                {Math.min(100, Math.round(
                  (metrics.contentWords > 300 ? 20 : 0) +
                  (metrics.headings > 3 ? 20 : 0) +
                  (metrics.internalLinks > 5 ? 20 : 0) +
                  (metrics.keywordDensity > 1 && metrics.keywordDensity < 3 ? 20 : 0) +
                  (metrics.images > 2 ? 20 : 0)
                ))}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          <span>Local SEO: Capital District NY</span>
        </div>
      </div>
    </div>
  );
};

// Global function declarations for tracking
declare global {
  function gtag(...args: any[]): void;
}

export default SEOAnalyzer;