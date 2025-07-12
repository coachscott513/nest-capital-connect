import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

// Sample blog post data - you can replace with real data from Supabase later
const blogPosts = {
  "albany-rental-market-2025-investment-opportunities": {
    id: 1,
    title: "Albany Rental Market 2025: Top Investment Opportunities",
    slug: "albany-rental-market-2025-investment-opportunities",
    excerpt: "Discover the hottest neighborhoods in Albany for rental property investments and learn why the Capital District is attracting savvy investors.",
    content: `
      <h2>Why Albany is Hot for Rental Investments in 2025</h2>
      <p>The Albany rental market is experiencing unprecedented growth, driven by several key factors that make it an attractive destination for real estate investors. With a growing tech sector, expanding healthcare industry, and proximity to major metropolitan areas, Albany offers unique opportunities for savvy investors.</p>
      
      <h3>Top Neighborhoods for Rental Properties</h3>
      <p>Based on our analysis of cash flow, appreciation potential, and rental demand, here are the top Albany neighborhoods for rental investment:</p>
      
      <h4>1. Center Square Historic District</h4>
      <p>This vibrant neighborhood offers strong rental demand from young professionals and students. Properties here typically see 8-12% cap rates with excellent appreciation potential.</p>
      
      <h4>2. Pine Hills</h4>
      <p>Close to colleges and downtown, Pine Hills offers affordable entry points for investors. Multi-unit properties are abundant and often cash flow positive from day one.</p>
      
      <h4>3. Helderberg</h4>
      <p>Suburban rental market with strong family demand. Single-family homes rent quickly and maintain low vacancy rates.</p>
      
      <h3>Market Trends and Projections</h3>
      <p>Our analysis shows average rent growth of 4.2% annually over the past three years, with vacancy rates below 3% in prime areas. The introduction of new businesses and Amazon's expanded presence in the region continues to drive demand.</p>
      
      <h3>Investment Strategy Recommendations</h3>
      <p>For investors looking to enter the Albany market, we recommend:</p>
      <ul>
        <li>Focus on properties within 2 miles of downtown or major employers</li>
        <li>Consider multi-unit properties for better cash flow</li>
        <li>Budget for renovations to command premium rents</li>
        <li>Work with local property managers familiar with tenant laws</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>Ready to explore investment opportunities in Albany? Our team has access to off-market deals and can provide detailed cash flow analysis for any property you're considering.</p>
    `,
    author: "Scott Alvarez",
    publishedAt: "2025-01-12",
    readTime: "5 min read",
    category: "Market Analysis",
    tags: ["Albany", "Real Estate Investing", "Rental Properties", "Market Analysis"],
    featured: true,
    image: "/blog/albany-market-2025.jpg"
  },
  "brrrr-strategy-capital-district-guide": {
    id: 2,
    title: "Complete Guide to BRRRR Strategy in the Capital District",
    slug: "brrrr-strategy-capital-district-guide",
    excerpt: "Master the Buy, Rehab, Rent, Refinance, Repeat strategy with real examples from Troy, Schenectady, and Saratoga Springs properties.",
    content: `
      <h2>What is the BRRRR Strategy?</h2>
      <p>BRRRR stands for Buy, Rehab, Rent, Refinance, Repeat. It's a powerful real estate investment strategy that allows investors to acquire multiple properties using the same initial capital by refinancing out their money after adding value through renovations.</p>
      
      <h3>Why BRRRR Works in the Capital District</h3>
      <p>The Capital District is perfect for BRRRR investing due to:</p>
      <ul>
        <li>Abundant older properties with good bones needing cosmetic updates</li>
        <li>Strong rental demand from colleges and major employers</li>
        <li>Conservative property valuations that allow for significant value-add</li>
        <li>Local banks familiar with investment property financing</li>
      </ul>
      
      <h3>Step-by-Step BRRRR Process</h3>
      
      <h4>Step 1: Buy</h4>
      <p>Look for distressed properties 20-30% below market value. In our market, this typically means properties needing $15,000-$30,000 in renovations that you can purchase for $80,000-$120,000.</p>
      
      <h4>Step 2: Rehab</h4>
      <p>Focus on high-impact improvements:</p>
      <ul>
        <li>Kitchen updates (new cabinets, countertops, appliances)</li>
        <li>Bathroom renovations</li>
        <li>Flooring throughout</li>
        <li>Fresh paint and fixtures</li>
        <li>Mechanical systems if needed</li>
      </ul>
      
      <h4>Step 3: Rent</h4>
      <p>Market-rate rents in our target neighborhoods typically range from $1,200-$1,800 for 2-3 bedroom properties. Screen tenants carefully and consider offering slightly below market rent for longer lease terms.</p>
      
      <h4>Step 4: Refinance</h4>
      <p>After 6-12 months of rental history, refinance based on the new appraised value. Local banks typically lend up to 75-80% of appraised value on investment properties.</p>
      
      <h4>Step 5: Repeat</h4>
      <p>Use the refinanced cash to purchase your next BRRRR property. The goal is to leave little to no money in each deal.</p>
      
      <h3>Real Capital District BRRRR Example</h3>
      <p><strong>Troy Two-Family Property</strong></p>
      <p>Purchase Price: $95,000<br>
      Rehab Cost: $25,000<br>
      Total Investment: $120,000<br>
      Post-Rehab Value: $160,000<br>
      Refinance Amount (75%): $120,000<br>
      Cash Left in Deal: $0<br>
      Monthly Cash Flow: $450</p>
      
      <h3>Common Pitfalls to Avoid</h3>
      <ul>
        <li>Over-improving for the neighborhood</li>
        <li>Underestimating rehab costs</li>
        <li>Not having enough cash reserves</li>
        <li>Rushing the refinance process</li>
      </ul>
      
      <h3>Getting Started with BRRRR</h3>
      <p>Ready to implement the BRRRR strategy? We can help you identify suitable properties, connect with reliable contractors, and guide you through the entire process.</p>
    `,
    author: "Scott Alvarez",
    publishedAt: "2025-01-10",
    readTime: "8 min read",
    category: "Investment Strategy",
    tags: ["BRRRR", "Real Estate Strategy", "Capital District", "Property Investment"],
    featured: true,
    image: "/blog/brrrr-strategy-guide.jpg"
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
            <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} | Capital District Nest Blog`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        canonical={`https://your-domain.com/blog/${post.slug}`}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="mb-6">
                <Badge className="mb-4 bg-white/20 text-white border-white/30">{post.category}</Badge>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {post.title}
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white hover:text-primary">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="relative -mt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden shadow-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%23f3f4f6"/><text x="400" y="225" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial" font-size="24">Featured Article Image</text></svg>';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-content"
                />
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Author Bio */}
              <Card className="mt-12">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                      SA
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Scott Alvarez</h3>
                      <p className="text-muted-foreground mb-4">
                        Licensed Real Estate Professional and Investment Specialist with over 10 years of experience in the Capital District market. Scott has helped hundreds of investors build wealth through strategic property acquisitions and has personally completed over 50 investment property transactions.
                      </p>
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Scott
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Call to Action */}
              <Card className="mt-12 bg-primary text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
                  <p className="text-lg opacity-90 mb-6">
                    Get personalized investment advice and access to off-market deals in the Capital District.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                      Schedule Consultation
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      View Current Deals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;