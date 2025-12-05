import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import MainLayout from '@/components/MainLayout';
import SEOHead from '@/components/SEOHead';
import DOMPurify from 'dompurify';

// Sample blog post data - you can replace with real data from Supabase later
const blogPosts = {
  "351-oakland-avenue-schenectady-analysis": {
    id: 0,
    title: "Is 351 Oakland Ave in Schenectady, NY a Smart Buy at $224,900? (Quick Analysis)",
    slug: "351-oakland-avenue-schenectady-analysis",
    excerpt: "Explore 351 Oakland Ave, a beautifully updated 3-bed Ranch in Schenectady's desirable 12309 zip. See why this move-in ready home offers exceptional value.",
    content: `
      <div class="mb-8">
        <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop" alt="351 Oakland Avenue Schenectady Ranch home exterior" class="w-full h-64 object-cover rounded-lg mb-4" />
      </div>

      <h2 class="text-2xl font-bold mb-6">🏡 Property Snapshot: 351 Oakland Avenue, Schenectady, NY 12309</h2>
      
      <div class="bg-muted p-6 rounded-lg mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Address:</strong> 351 Oakland Avenue, Schenectady, NY 12309</p>
            <p><strong>Property Type:</strong> Single Family Residence (Ranch style)</p>
            <p><strong>List Price:</strong> $224,900</p>
            <p><strong>Bedrooms/Bathrooms:</strong> 3 Beds / 2 Full Baths</p>
          </div>
          <div>
            <p><strong>Square Footage:</strong> 1,382 sqft</p>
            <p><strong>Lot Size:</strong> 0.29 Acres</p>
            <p><strong>Year Built:</strong> 1970</p>
            <p><strong>Annual Taxes:</strong> $7,381</p>
          </div>
        </div>
        <div class="mt-4">
          <p><strong>Days on Market:</strong> Listed 07/11/2025 (Recently Listed!)</p>
          <p><strong>Neighborhood:</strong> Quiet dead-end street in a desirable Schenectady area.</p>
          <p><strong>Key Features:</strong> Hardwood floors, bright and open layout, first-floor laundry, central air, deck, attached garage.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-6">📊 Quick Value & Market Breakdown</h2>
      
      <p class="mb-4">This charming Ranch home presents compelling value, especially when compared to recent market trends in the 12309 ZIP code.</p>
      
      <h3 class="text-xl font-semibold mb-3">Price Analysis</h3>
      <p class="mb-4"><strong>Price per Square Foot (PPSF):</strong> At $224,900 for 1,382 sqft, the price per square foot is approximately $162.73/sqft.</p>
      
      <p class="mb-6"><strong>Market Context:</strong> This is a competitive price for a move-in ready home in a desirable Schenectady neighborhood, especially considering the updates.</p>
      
      <h3 class="text-xl font-semibold mb-3">Market Comparison (ZIP Code 12309 Averages)</h3>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Price:</strong> This home is listed at $224,900, significantly below the average price of $470,000 for single-family homes in 12309. This points to strong value.</li>
        <li><strong>Taxes:</strong> Annual taxes are $7,381, which is lower than the 12309 average of $9,210. This contributes to more affordable monthly carrying costs.</li>
        <li><strong>Year Built:</strong> Built in 1970, this home is newer than the average year built of 1961 for the area.</li>
      </ul>
      
      <h3 class="text-xl font-semibold mb-3">Condition & Key Amenities</h3>
      <p class="mb-4">The property description highlights it as "charming, beautifully updated, ranch," with "gleaming hardwood floors" and "tastefully updated" interiors. This suggests it's truly move-in ready, requiring minimal immediate effort from a new owner.</p>
      
      <p class="mb-6">Features like central air, a deck, and an attached garage add significant value and convenience.</p>
      
      <h2 class="text-2xl font-bold mb-4">🧠 Final Take: Exceptional Value in a Prime Location</h2>
      
      <p class="mb-4">351 Oakland Avenue stands out as a fantastic opportunity for homebuyers seeking a low-maintenance, updated homes Schenectady in a peaceful yet desirable Schenectady neighborhood. Its price point and lower taxes position it as a highly attractive option compared to the general <a href="/communities/schenectady" class="text-primary hover:underline">Schenectady market trends</a>.</p>
      
      <p class="mb-6">This is an ideal Ranch home Schenectady for those looking for easy, one-level living without the need for extensive renovations. Given its recent listing, it's unlikely to last long on the market for 3 bed 2 bath Schenectady properties.</p>
      
      <div class="bg-primary/10 p-6 rounded-lg">
        <h3 class="text-xl font-semibold mb-4">📞 Ready to See This Home or Discuss Your Schenectady Home Search?</h3>
        <p class="mb-4">Interested in viewing this property or exploring other <a href="/schenectady-rentals" class="text-primary hover:underline">Schenectady homes for sale</a>? Our team specializes in 12309 real estate value analysis and can help you find the perfect home.</p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/contact" class="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-center font-medium">Book a 15-minute consultation with Scott today!</a>
          <a href="/contact" class="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors text-center font-medium">Get notified about other move-in ready homes!</a>
        </div>
      </div>
    `,
    author: "Scott Rossi",
    publishedAt: "2025-01-12",
    readTime: "6 min read",
    category: "Property Analysis",
    tags: ["Schenectady", "Property Analysis", "Ranch Home", "Real Estate Value"],
    featured: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop"
  },
  "124-hamilton-st-albany-smart-buy-analysis": {
    id: 1,
    title: "Is 124 Hamilton St in Albany, NY a Smart Buy at $375,000? (Quick Analysis)",
    slug: "124-hamilton-st-albany-smart-buy-analysis",
    excerpt: "Dive into 124 Hamilton St, a 3-unit multi-family in Albany's Center Square. Is its $375K price tag a good deal for investors or owner-occupants? Get our quick analysis.",
    content: `
      <h2>🏡 Property Snapshot: 124 Hamilton St, Albany, NY 12207</h2>
      
      <p><strong>Address:</strong> 124 Hamilton St, Albany, NY 12207<br>
      <strong>Property Type:</strong> Multi-Family (3 Units)<br>
      <strong>List Price:</strong> $375,000<br>
      <strong>Bedrooms/Bathrooms:</strong> 6 Beds / 3.5 Baths<br>
      <strong>Square Footage:</strong> 4,584 sqft<br>
      <strong>Lot Size:</strong> 0.049 acre (approx. 2,134 sqft)<br>
      <strong>Year Built:</strong> 1846<br>
      <strong>Days on Market:</strong> 26 days<br>
      <strong>Neighborhood:</strong> Center Square, Albany</p>

      <h2>📊 Quick Investment & Value Breakdown</h2>
      
      <p>Let's look at the numbers to see if 124 Hamilton St presents a good opportunity in today's Albany market.</p>

      <h3>Price per Square Foot Analysis</h3>
      <p>At $375,000 for 4,584 sqft, the <strong>price per square foot is approximately $82/sqft</strong>.</p>
      
      <p><strong>Market Context:</strong> Recent data for Albany shows the median price per square foot for all homes around $179-$201. For Center Square specifically, the median listing PPSF is $184. While this property is multi-family and very large, $82/sqft suggests a strong value opportunity in terms of raw space, potentially indicating either a need for significant updates or simply a fantastic deal.</p>

      <h3>Estimated Rental Income Analysis</h3>
      <p>For a true multi-family analysis, we need to estimate rental income. Based on market averages for similar units in Center Square, we're estimating $1,100-$1,300 per unit for 1-2 bedroom apartments.</p>
      
      <p><strong>Conservative Estimate:</strong> $1,200 per unit<br>
      <strong>Monthly Gross Income:</strong> $1,200 × 3 units = $3,600/month<br>
      <strong>Annual Gross Rent:</strong> $3,600 × 12 = $43,200/year</p>

      <h3>Gross Rent Multiplier (GRM)</h3>
      <p>GRM = Purchase Price ÷ Gross Annual Rent<br>
      GRM = $375,000 ÷ $43,200 = <strong>8.68</strong></p>
      
      <p><strong>Verdict:</strong> A GRM under 10 is generally considered fair to good in many markets. For Albany, an 8.68 GRM suggests solid cash flow potential, especially if actual rents meet or exceed our estimate.</p>

      <h3>Cap Rate Calculation</h3>
      <p>To estimate Net Operating Income (NOI), we factor in typical multi-family expenses:</p>
      
      <ul>
        <li><strong>Property Taxes:</strong> $6,000/year (estimated at ~1.6% of purchase price)</li>
        <li><strong>Insurance:</strong> $2,500/year</li>
        <li><strong>Vacancy (5%):</strong> $2,160/year</li>
        <li><strong>Maintenance/Repairs (10%):</strong> $4,320/year</li>
        <li><strong>Utilities (Common Areas):</strong> $1,500/year</li>
      </ul>
      
      <p><strong>Total Estimated Expenses:</strong> $16,480/year<br>
      <strong>Net Operating Income (NOI):</strong> $43,200 - $16,480 = $26,720/year<br>
      <strong>Cap Rate:</strong> $26,720 ÷ $375,000 = <strong>7.12%</strong></p>

      <h3>Market Comparison</h3>
      <p>A 7.12% cap rate is very attractive for downtown Albany multi-family properties. Average cap rates for multi-family in the Northeast often hover in the 6-9% range, indicating strong potential return on investment.</p>

      <p>Similar 2-4 unit properties in Center Square typically range from $300K-$450K depending on size, condition, and number of units. The $375K price point for 4,584 sqft and 3 units appears competitive given the low price per square foot.</p>

      <h2>🧠 Final Take: Fairly Priced with Significant Upside</h2>
      
      <p>124 Hamilton St stands out due to its exceptionally low price per square foot for a multi-family property of this size in Center Square. The estimated <strong>7.12% Cap Rate</strong> and <strong>8.68 GRM</strong> point to a strong investment opportunity for cash flow.</p>

      <h3>For Investors</h3>
      <p>If the condition aligns with the price (i.e., doesn't require a full gut renovation), this property could be a consistent income generator with potential for value-add through strategic updates and rent optimization.</p>

      <h3>For Owner-Occupants</h3>
      <p>With 3 units, this property offers an excellent "house hacking" opportunity. You could live in one unit and use rental income from the other two to significantly offset your mortgage, potentially making homeownership in desirable Albany Center Square very affordable.</p>

      <p>The 26 days on market isn't excessive for a multi-family property, suggesting it's still actively being considered. Given its location and strong financial metrics, <strong>124 Hamilton St is certainly worth a closer look</strong>.</p>

      <h2>Key Investment Highlights</h2>
      <ul>
        <li>🏢 <strong>3 rental units</strong> in prime Center Square location</li>
        <li>💰 <strong>$82/sqft</strong> - well below market average</li>
        <li>📈 <strong>7.12% estimated cap rate</strong> - excellent for Albany market</li>
        <li>🏠 <strong>House hacking potential</strong> for owner-occupants</li>
        <li>🎯 <strong>Value-add opportunity</strong> through strategic improvements</li>
      </ul>

      <h2>Next Steps</h2>
      <p>Interested in this property or similar Albany multi-family investments? Here's what we recommend:</p>
      <ol>
        <li>Schedule a property showing to assess actual condition</li>
        <li>Review rent roll and actual expenses if available</li>
        <li>Get pre-approved for investment property financing</li>
        <li>Conduct professional property inspection</li>
        <li>Analyze comparable recent sales in Center Square</li>
      </ol>
    `,
    author: "Scott Alvarez",
    publishedAt: "2025-01-12",
    readTime: "6 min read",
    category: "Property Analysis",
    tags: ["Albany", "Center Square", "Multi-Family", "Investment Property", "Cap Rate Analysis", "124 Hamilton St", "Property Investment", "House Hacking"],
    featured: true,
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=450&fit=crop"
  },
  "albany-rental-market-2025-investment-opportunities": {
    id: 2,
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
    publishedAt: "2025-01-10",
    readTime: "5 min read",
    category: "Market Analysis",
    tags: ["Albany", "Real Estate Investing", "Rental Properties", "Market Analysis"],
    featured: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop"
  },
  "brrrr-strategy-capital-district-guide": {
    id: 3,
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
    publishedAt: "2025-01-08",
    readTime: "8 min read",
    category: "Investment Strategy",
    tags: ["BRRRR", "Real Estate Strategy", "Capital District", "Property Investment"],
    featured: false,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=450&fit=crop"
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
      
      <MainLayout>
        
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
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
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
                        <Button variant="outline" size="sm" asChild>
                          <a href="tel:+15186762347">Contact Scott</a>
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
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                      <a href="tel:+15186762347">Schedule Consultation</a>
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

      </MainLayout>
    </>
  );
};

export default BlogPost;