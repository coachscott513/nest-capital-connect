// Redirect Audit and Management Component
// This component helps identify and fix redirect issues for Google Search Console

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { capitalDistrictTowns } from './CapitalDistrictTowns';

interface RedirectIssue {
  url: string;
  issue: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

const RedirectAudit = () => {
  const [redirectIssues, setRedirectIssues] = useState<RedirectIssue[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);

  // Common redirect issues to check for
  const potentialRedirectIssues: RedirectIssue[] = [
    {
      url: '/investment-properties',
      issue: 'Route redirects to Index page instead of dedicated page',
      recommendation: 'Create dedicated Investment Properties page or use anchor link /#investment-properties',
      priority: 'high'
    },
    {
      url: '/rehab-properties', 
      issue: 'Route redirects to Index page instead of dedicated page',
      recommendation: 'Create dedicated Rehab Properties page or use anchor link /#rehab-properties',
      priority: 'high'
    },
    {
      url: '/financing',
      issue: 'Route redirects to Index page instead of dedicated page', 
      recommendation: 'Create dedicated Financing page or use anchor link /#financing',
      priority: 'high'
    },
    {
      url: '/contact',
      issue: 'Route redirects to Index page instead of dedicated page',
      recommendation: 'Create dedicated Contact page or use anchor link /#contact',
      priority: 'medium'
    },
    {
      url: '/about',
      issue: 'Route redirects to Index page instead of dedicated page',
      recommendation: 'Create dedicated About page or use anchor link /#about',
      priority: 'medium'
    }
  ];

  const auditInternalLinks = () => {
    setIsAuditing(true);
    const issues: RedirectIssue[] = [];

    // Check for anchor tag links that should be Link components
    const anchorLinks = document.querySelectorAll('a[href^="/"]');
    anchorLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('/#')) {
        issues.push({
          url: href,
          issue: 'Using anchor tag instead of React Router Link component',
          recommendation: 'Convert to <Link> component to prevent page reload and improve SEO',
          priority: 'medium'
        });
      }
    });

    // Add known redirect issues
    issues.push(...potentialRedirectIssues);

    setRedirectIssues(issues);
    setIsAuditing(false);
  };

  const generateSitemapWithCorrectUrls = () => {
    const baseUrl = 'https://capitaldistrictnest.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/rentals</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Town Real Estate Pages -->`;

    capitalDistrictTowns.forEach(town => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${town.slug}-real-estate</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${town.priority === 'high' ? '0.9' : town.priority === 'medium' ? '0.7' : '0.6'}</priority>
  </url>
  <url>
    <loc>${baseUrl}/${town.slug}-rentals</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${town.priority === 'high' ? '0.8' : town.priority === 'medium' ? '0.6' : '0.5'}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return sitemap;
  };

  const downloadCorrectSitemap = () => {
    const sitemap = generateSitemapWithCorrectUrls();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected-sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateRobotsTxt = () => {
    const baseUrl = 'https://capitaldistrictnest.com';
    
    let robots = `User-agent: *
Allow: /

# High priority pages for crawlers
Allow: /
Allow: /rentals
Allow: /blog

# Capital District town pages
`;

    capitalDistrictTowns.forEach(town => {
      robots += `Allow: /${town.slug}-real-estate
Allow: /${town.slug}-rentals
`;
    });

    robots += `
# Block unnecessary paths
Disallow: /admin/
Disallow: /private/
Disallow: /.git/
Disallow: /_*

# Major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Block aggressive crawlers
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host declaration
Host: ${baseUrl}`;

    return robots;
  };

  const downloadCorrectRobotsTxt = () => {
    const robots = generateRobotsTxt();
    const blob = new Blob([robots], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected-robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Auto-audit on component mount
    auditInternalLinks();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Capital District Nest - Redirect Audit & SEO Fixes</CardTitle>
          <CardDescription>
            Identify and resolve "Page with redirect" issues reported by Google Search Console
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Audit Actions */}
            <div className="flex gap-4 flex-wrap">
              <Button onClick={auditInternalLinks} disabled={isAuditing}>
                {isAuditing ? 'Auditing...' : 'Run Redirect Audit'}
              </Button>
              <Button onClick={downloadCorrectSitemap} variant="outline">
                Download Corrected Sitemap
              </Button>
              <Button onClick={downloadCorrectRobotsTxt} variant="outline">
                Download Corrected Robots.txt
              </Button>
            </div>

            {/* Redirect Issues */}
            {redirectIssues.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Identified Redirect Issues ({redirectIssues.length})</h3>
                {redirectIssues.map((issue, index) => (
                  <Alert key={index} variant={issue.priority === 'high' ? 'destructive' : 'default'}>
                    <AlertTitle className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-accent/15 text-blue-800'
                      }`}>
                        {issue.priority.toUpperCase()}
                      </span>
                      {issue.url}
                    </AlertTitle>
                    <AlertDescription>
                      <div className="mt-2">
                        <p><strong>Issue:</strong> {issue.issue}</p>
                        <p><strong>Recommendation:</strong> {issue.recommendation}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Town Coverage Summary */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Expanded Town Coverage Summary</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Albany', 'Schenectady', 'Rensselaer', 'Saratoga'].map(county => (
                  <Card key={county}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{county} County</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        {capitalDistrictTowns
                          .filter(town => town.county === county)
                          .slice(0, 5)
                          .map(town => (
                            <div key={town.slug} className="flex justify-between">
                              <span>{town.name}</span>
                              <span className={`px-1 rounded text-xs ${
                                town.priority === 'high' ? 'bg-emerald/15 text-green-800' :
                                town.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-secondary text-foreground'
                              }`}>
                                {town.priority}
                              </span>
                            </div>
                          ))}
                        {capitalDistrictTowns.filter(town => town.county === county).length > 5 && (
                          <div className="text-xs text-muted-foreground">
                            +{capitalDistrictTowns.filter(town => town.county === county).length - 5} more
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* SEO Implementation Guide */}
            <Alert>
              <AlertTitle>Next Steps for Google Search Console</AlertTitle>
              <AlertDescription>
                <ol className="list-decimal list-inside space-y-2 mt-2">
                  <li>Download and upload the corrected sitemap.xml to your domain root</li>
                  <li>Submit the new sitemap in Google Search Console</li>
                  <li>Update robots.txt with the corrected version</li>
                  <li>Use URL Inspection tool in GSC to test problematic URLs</li>
                  <li>Request re-indexing for affected pages</li>
                  <li>Monitor the "Pages" report for reduced redirect issues</li>
                </ol>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedirectAudit;