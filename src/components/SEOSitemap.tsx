
import { useEffect } from 'react';

// SEO Sitemap Generator - Creates and updates sitemap files for better search engine indexing
// Following SEO best practices for real estate websites

interface SitemapPage {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod: string;
}

const SEOSitemap = () => {
  const generateSitemap = (): string => {
    // Replace with your actual domain
    const baseUrl = 'https://your-domain.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Comprehensive sitemap following SEO best practices
    const pages: SitemapPage[] = [
      // High-priority landing pages
      { 
        url: '/', 
        changefreq: 'daily', 
        priority: '1.0',
        lastmod: currentDate
      },
      { 
        url: '/rentals', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/communities', 
        changefreq: 'weekly', 
        priority: '0.9',
        lastmod: currentDate
      },
      
      // Capital District Hub Pages
      { 
        url: '/albany-real-estate', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/troy-real-estate', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/schenectady-real-estate', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/saratoga-real-estate', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      
      // Section anchors for single-page navigation
      { 
        url: '/#neighborhoods', 
        changefreq: 'weekly', 
        priority: '0.8',
        lastmod: currentDate
      },
      { 
        url: '/#albany-rentals', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/#troy-rentals', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/#schenectady-rentals', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      { 
        url: '/#saratoga-rentals', 
        changefreq: 'daily', 
        priority: '0.9',
        lastmod: currentDate
      },
      
      // Service pages
      { 
        url: '/#renters', 
        changefreq: 'weekly', 
        priority: '0.8',
        lastmod: currentDate
      },
      { 
        url: '/#first-time-buyers', 
        changefreq: 'weekly', 
        priority: '0.8',
        lastmod: currentDate
      },
      { 
        url: '/#owners', 
        changefreq: 'monthly', 
        priority: '0.7',
        lastmod: currentDate
      },
      { 
        url: '/#investment-properties', 
        changefreq: 'weekly', 
        priority: '0.8',
        lastmod: currentDate
      },
      { 
        url: '/#rehab-properties', 
        changefreq: 'weekly', 
        priority: '0.8',
        lastmod: currentDate
      },
      { 
        url: '/#financing', 
        changefreq: 'monthly', 
        priority: '0.7',
        lastmod: currentDate
      },
      
      // Contact and company pages
      { 
        url: '/#contact', 
        changefreq: 'monthly', 
        priority: '0.6',
        lastmod: currentDate
      },
      { 
        url: '/#meet-the-team', 
        changefreq: 'monthly', 
        priority: '0.5',
        lastmod: currentDate
      },
      { 
        url: '/#mission', 
        changefreq: 'yearly', 
        priority: '0.4',
        lastmod: currentDate
      }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${page.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  };

  const generateRobotsTxt = (): string => {
    // Replace with your actual domain
    const baseUrl = 'https://your-domain.com';
    
    return `User-agent: *
Allow: /

# High priority pages for crawlers
Allow: /
Allow: /rentals
Allow: /communities
Allow: /investment-properties
Allow: /rehab-properties
Allow: /financing
Allow: /contact

# Allow anchor links for better indexing
Allow: /#albany-rentals
Allow: /#troy-rentals
Allow: /#schenectady-rentals
Allow: /#saratoga-rentals
Allow: /#investment-properties
Allow: /#rehab-properties
Allow: /#financing
Allow: /#renters
Allow: /#owners
Allow: /#first-time-buyers
Allow: /#contact

# Block crawling of admin or internal pages
Disallow: /admin/
Disallow: /private/
Disallow: /.git/
Disallow: /_*

# Major search engines - preferred crawling
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# Social media bots
User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

# Block aggressive crawlers
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: BLEXBot
Disallow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Request-rate limiting for general bots
Request-rate: 1/5s

# Host declaration
Host: ${baseUrl}`;
  };

  // Download sitemap and robots.txt for easy access
  const downloadSitemapFiles = () => {
    const sitemap = generateSitemap();
    const robots = generateRobotsTxt();
    
    // Create and download sitemap.xml
    const sitemapBlob = new Blob([sitemap], { type: 'application/xml' });
    const sitemapUrl = URL.createObjectURL(sitemapBlob);
    const sitemapLink = document.createElement('a');
    sitemapLink.href = sitemapUrl;
    sitemapLink.download = 'sitemap.xml';
    sitemapLink.click();
    URL.revokeObjectURL(sitemapUrl);
    
    // Create and download robots.txt
    const robotsBlob = new Blob([robots], { type: 'text/plain' });
    const robotsUrl = URL.createObjectURL(robotsBlob);
    const robotsLink = document.createElement('a');
    robotsLink.href = robotsUrl;
    robotsLink.download = 'robots.txt';
    robotsLink.click();
    URL.revokeObjectURL(robotsUrl);
  };

  useEffect(() => {
    // Log sitemaps for development purposes
    console.log('🔍 SEO Sitemap Generator Ready');
    console.log('📄 Generated sitemap:', generateSitemap());
    console.log('🤖 Generated robots.txt:', generateRobotsTxt());
    console.log('💡 Call downloadSitemapFiles() in console to download files');
    
    // Make download function available globally for development
    (window as any).downloadSitemapFiles = downloadSitemapFiles;
  }, []);
  
  return null;
};

export default SEOSitemap;
