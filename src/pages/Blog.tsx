import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, Filter, ArrowRight, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import troyQuadruplexImage from '@/assets/troy-quadruplex-45-south-lake.jpg';

// Sample blog posts - you can replace with real data from Supabase later
const blogPosts = [
  {
    id: 0,
    title: "Is 351 Oakland Ave in Schenectady, NY a Smart Buy at $224,900? (Quick Analysis)",
    slug: "351-oakland-avenue-schenectady-analysis",
    excerpt: "Explore 351 Oakland Ave, a beautifully updated 3-bed Ranch in Schenectady's desirable 12309 zip. See why this move-in ready home offers exceptional value.",
    content: "Full content would go here...",
    author: "Scott Rossi",
    publishedAt: "2025-01-12",
    readTime: "6 min read",
    category: "Property Analysis",
    tags: ["Schenectady", "Property Analysis", "Ranch Home", "Real Estate Value"],
    featured: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop"
  },
  {
    id: 1,
    title: "Is 124 Hamilton St in Albany, NY a Smart Buy at $375,000? (Quick Analysis)",
    slug: "124-hamilton-st-albany-smart-buy-analysis", 
    excerpt: "Dive into 124 Hamilton St, a 3-unit multi-family in Albany's Center Square. Is its $375K price tag a good deal for investors or owner-occupants? Get our quick analysis.",
    content: "Full content would go here...",
    author: "Scott Alvarez",
    publishedAt: "2025-01-12",
    readTime: "6 min read",
    category: "Property Analysis",
    tags: ["Albany", "Center Square", "Multi-Family", "Investment Property", "Cap Rate Analysis", "124 Hamilton St", "Property Investment", "House Hacking"],
    featured: true,
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=450&fit=crop"
  },
  {
    id: 2,
    title: "Albany Rental Market 2025: Top Investment Opportunities",
    slug: "albany-rental-market-2025-investment-opportunities",
    excerpt: "Discover the hottest neighborhoods in Albany for rental property investments and learn why the Capital District is attracting savvy investors.",
    content: "Full content would go here...",
    author: "Scott Alvarez",
    publishedAt: "2025-01-10",
    readTime: "5 min read",
    category: "Market Analysis",
    tags: ["Albany", "Real Estate Investing", "Rental Properties", "Market Analysis"],
    featured: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop"
  },
  {
    id: 3,
    title: "Complete Guide to BRRRR Strategy in the Capital District",
    slug: "brrrr-strategy-capital-district-guide",
    excerpt: "Master the Buy, Rehab, Rent, Refinance, Repeat strategy with real examples from Troy, Schenectady, and Saratoga Springs properties.",
    content: "Full content would go here...",
    author: "Scott Alvarez",
    publishedAt: "2025-01-08",
    readTime: "8 min read",
    category: "Investment Strategy",
    tags: ["BRRRR", "Real Estate Strategy", "Capital District", "Property Investment"],
    featured: false,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=450&fit=crop"
  },
  {
    id: 4,
    title: "First-Time Home Buyer Programs in New York State 2025",
    slug: "first-time-home-buyer-programs-ny-2025",
    excerpt: "Everything you need to know about down payment assistance, grants, and special loan programs available to first-time buyers in NY.",
    content: "Full content would go here...",
    author: "Scott Alvarez",
    publishedAt: "2025-01-05", 
    readTime: "6 min read",
    category: "Home Buying",
    tags: ["First Time Buyers", "NY Programs", "Down Payment Assistance", "Home Buying"],
    featured: false,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=450&fit=crop"
  },
  {
    id: 5,
    title: "Multi-Unit Property Analysis: 3 Recent Deals in Troy",
    slug: "multi-unit-property-analysis-troy-deals",
    excerpt: "See how we analyzed and acquired three profitable multi-unit properties in Troy, including cash flow projections and ROI calculations.",
    content: "Full content would go here...",
    author: "Scott Alvarez",
    publishedAt: "2025-01-03",
    readTime: "7 min read", 
    category: "Case Studies",
    tags: ["Multi-Unit", "Troy", "Cash Flow Analysis", "Property Analysis"],
    featured: false,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=450&fit=crop"
  },
  {
    id: 6,
    title: "Rehab Property Red Flags: What to Avoid in the Capital District",
    slug: "rehab-property-red-flags-capital-district",
    excerpt: "Learn the common mistakes that can turn a profitable flip into a money pit, with specific examples from our local market experience.",
    content: "Full content would go here...",
    author: "Scott Alvarez",
    publishedAt: "2025-01-01",
    readTime: "5 min read",
    category: "Rehab & Flipping",
    tags: ["Rehab Properties", "Fix and Flip", "Real Estate Mistakes", "Property Inspection"],
    featured: false,
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=450&fit=crop"
  },
  {
    id: 7,
    title: "Cash-Flow Machine: 4-Unit Quadruplex at 45 South Lake Avenue, Troy NY",
    slug: "45-south-lake-avenue-troy-quadruplex-investment",
    excerpt: "Discover this exceptional 4-unit investment property generating over $72,000 annually. Located in Troy's quiet residential area, perfect for students and long-term tenants.",
    content: `
      <div class="max-w-4xl mx-auto prose prose-lg">
        <p class="lead">A "cash-flow machine" in Troy, NY, is on the market! This 4-unit quadruplex at 45 South Lake Avenue, Troy, NY 12180, offers an incredible investment opportunity.</p>
        
        <h2>Property Highlights That Set This Investment Apart</h2>
        
        <h3>💰 Exceptional Income Generation</h3>
        <p><strong>High Income:</strong> Generates over $6,000 in monthly rent with all leases in place, totaling <strong>$72,000 annually</strong>. With current market rents, this property demonstrates strong cash flow potential from day one.</p>
        
        <h3>🏠 Spacious & Well-Designed Units</h3>
        <p><strong>Spacious Units:</strong> The property boasts 22 total rooms, 10 bedrooms, and 4 full bathrooms. The first-floor unit is exceptionally large, offering premium rental potential for families or professionals seeking more space.</p>
        
        <h3>✨ Attractive Features & Recent Upgrades</h3>
        <ul>
          <li><strong>Covered Porches:</strong> Huge, covered porches on both levels add tremendous curb appeal and provide valuable outdoor living space for tenants</li>
          <li><strong>Recent Renovations:</strong> Two units have been recently remodeled, and new kitchen cabinets installed in another unit, reducing immediate capital expenditure needs</li>
          <li><strong>Ample Parking:</strong> Off-street parking in the rear accommodates at least 6-7 vehicles - a rare find in Troy that tenants will pay premium for</li>
        </ul>
        
        <h3>📍 Prime Location Advantages</h3>
        <p><strong>Strategic Location:</strong> Situated in a quiet area with a strong rental history, attracting students from RPI and Hudson Valley Community College. This built-in tenant pipeline ensures consistent demand and reduced vacancy periods.</p>
        
        <h2>Financial Analysis</h2>
        
        <div class="bg-gray-50 p-6 rounded-lg my-6">
          <h3 class="text-xl font-bold mb-4">Key Financial Metrics</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>List Price:</strong> $470,000</p>
              <p><strong>Annual Gross Rent:</strong> $72,000</p>
              <p><strong>Gross Rent Multiplier:</strong> 6.5</p>
              <p><strong>Annual Taxes:</strong> $13,058</p>
            </div>
            <div>
              <p><strong>Square Footage:</strong> 4,483 sq ft</p>
              <p><strong>Price per Sq Ft:</strong> $105</p>
              <p><strong>Lot Size:</strong> 0.25 acres</p>
              <p><strong>Built:</strong> 1910 (Historic charm)</p>
            </div>
          </div>
        </div>
        
        <h2>Investment Potential Analysis</h2>
        
        <h3>Why This Property Works for Investors</h3>
        <ol>
          <li><strong>Immediate Cash Flow:</strong> With $6,000+ monthly income and reasonable expenses, this property should generate positive cash flow from acquisition</li>
          <li><strong>Built-in Tenant Base:</strong> Troy's student population from RPI and HVCC creates consistent rental demand</li>
          <li><strong>Value-Add Opportunities:</strong> Recent upgrades show the property's potential, with room for additional improvements to increase rents</li>
          <li><strong>Historic Character:</strong> Built in 1910, this property offers the charm and character that tenants seek in Troy's rental market</li>
        </ol>
        
        <h2>Property Infrastructure & Systems</h2>
        
        <h3>Utilities & Systems</h3>
        <ul>
          <li><strong>Separate Metering:</strong> Individual meters for electric, gas, and heat - tenants pay their own utilities, reducing owner expenses</li>
          <li><strong>Heating System:</strong> Forced Air, Natural Gas - efficient and cost-effective</li>
          <li><strong>Water/Sewer:</strong> Public systems - reliable municipal services</li>
          <li><strong>School District:</strong> Troy School District</li>
        </ul>
        
        <h2>Market Context: Why Troy Makes Sense</h2>
        
        <p>Troy continues to attract investors due to its:</p>
        <ul>
          <li>Proximity to major educational institutions (RPI, HVCC)</li>
          <li>Historic architecture and character</li>
          <li>Growing downtown revitalization efforts</li>
          <li>Affordable entry point compared to Albany</li>
          <li>Strong rental demand from students and young professionals</li>
        </ul>
        
        <h2>Investment Considerations</h2>
        
        <h3>Strengths</h3>
        <ul>
          <li>Strong existing cash flow with $72K annual income</li>
          <li>Recent renovations reduce immediate capex needs</li>
          <li>Separate utilities minimize owner expenses</li>
          <li>Ample parking adds tenant value</li>
          <li>Proven rental history in desirable area</li>
        </ul>
        
        <h3>Due Diligence Items</h3>
        <ul>
          <li>Review current lease terms and renewal likelihood</li>
          <li>Inspect property systems (HVAC, electrical, plumbing)</li>
          <li>Analyze local comparable rents for upside potential</li>
          <li>Understand any deferred maintenance requirements</li>
        </ul>
        
        <h2>The Bottom Line</h2>
        
        <p>At $470,000 with $72,000 in annual income, this Troy quadruplex represents a compelling investment opportunity. The combination of strong existing cash flow, recent improvements, and Troy's growing rental market make this a property worth serious consideration for both new and experienced investors.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h3 class="text-xl font-bold mb-2">Ready to Learn More?</h3>
          <p>For more information or to schedule a showing, contact Scott J Alvarez with RE/MAX Solutions. Don't miss out on this fantastic investment property!</p>
        </div>
        
        <p><em>This analysis is based on information provided and should be verified through professional inspection and due diligence. Real estate investments carry risk, and past performance doesn't guarantee future results.</em></p>
      </div>
    `,
    author: "Scott Alvarez",
    publishedAt: "2025-01-22",
    readTime: "8 min read",
    category: "Property Analysis",
    tags: ["Troy", "Multi-Unit", "Investment Property", "Cash Flow", "4-Unit", "Quadruplex", "RPI Students", "HVCC", "45 South Lake Avenue"],
    featured: true,
    image: troyQuadruplexImage
  },
  {
    id: 8,
    title: "Investment Gold Mine: 4 New Scotland Avenue Albany - Near Medical Center Expansion",
    slug: "4-new-scotland-avenue-albany-medical-center-investment",
    excerpt: "Discover this versatile triplex at 4 New Scotland Avenue, Albany, positioned perfectly near Albany Medical Center's billion-dollar expansion. Commercial and residential potential.",
    content: `
      <div class="max-w-4xl mx-auto prose prose-lg">
        <p class="lead">Prime Investment Opportunity: 4 New Scotland Avenue, Albany, NY 12208!</p>
        
        <p>Looking for a versatile property in a rapidly developing area? This triplex at 4 New Scotland Avenue, Albany, NY 12208, offers an exceptional opportunity for both residential and commercial use!</p>
        
        <h2>Location Advantages That Set This Apart</h2>
        
        <h3>🏥 Medical Center Proximity</h3>
        <p><strong>Strategic Location:</strong> Situated near Albany Medical Center's billion-dollar expansion, positioning this property in the heart of Albany's largest economic development project. This expansion will bring thousands of new jobs and increased demand for nearby housing.</p>
        
        <h3>🏪 Commercial Hub</h3>
        <p><strong>Retail Ecosystem:</strong> The property benefits from proximity to the new YMCA, CVS, Baldini's, Chipotle, Starbucks, and Panera - creating a thriving commercial corridor that attracts residents and workers.</p>
        
        <h3>🏢 Market Validation</h3>
        <p><strong>Rent Comparables:</strong> With 365 new apartments across the street commanding premium rents, this property is positioned to benefit from the area's rental market strength and growing demand.</p>
        
        <h2>Property Specifications</h2>
        
        <div class="bg-gray-50 p-6 rounded-lg my-6">
          <h3 class="text-xl font-bold mb-4">Key Details</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>List Price:</strong> $299,000</p>
              <p><strong>Above Grade Area:</strong> 1,680 sq ft</p>
              <p><strong>Below Grade Area:</strong> 240 sq ft</p>
              <p><strong>Total Living Area:</strong> 1,920 sq ft</p>
            </div>
            <div>
              <p><strong>Configuration:</strong> 12 rooms, 6 bedrooms, 3 baths</p>
              <p><strong>Lot Size:</strong> 0.03 acres</p>
              <p><strong>Annual Taxes:</strong> $6,559 (estimated)</p>
              <p><strong>Built:</strong> 1930</p>
            </div>
          </div>
        </div>
        
        <h2>Investment Analysis</h2>
        
        <h3>Financial Metrics</h3>
        <ul>
          <li><strong>Price per Square Foot:</strong> $156 - competitive for the area</li>
          <li><strong>Tax Rate:</strong> Approximately 2.2% of purchase price</li>
          <li><strong>Market Time:</strong> 402 days on market indicates motivated seller</li>
        </ul>
        
        <h3>Revenue Potential</h3>
        <p>Based on area rental comps and proximity to major employers:</p>
        <ul>
          <li><strong>Unit 1 (2BR):</strong> Estimated $1,400-1,600/month</li>
          <li><strong>Unit 2 (2BR):</strong> Estimated $1,400-1,600/month</li>
          <li><strong>Unit 3 (2BR):</strong> Estimated $1,400-1,600/month</li>
          <li><strong>Total Monthly:</strong> $4,200-4,800</li>
          <li><strong>Annual Gross Rent:</strong> $50,400-57,600</li>
        </ul>
        
        <h2>Why This Location Works</h2>
        
        <h3>Medical District Growth</h3>
        <p>Albany Medical Center's expansion represents one of the largest healthcare investments in the region, creating:</p>
        <ul>
          <li>Thousands of new healthcare jobs</li>
          <li>Increased demand for nearby housing</li>
          <li>Long-term stability and growth potential</li>
          <li>Higher-income professional tenants</li>
        </ul>
        
        <h3>Commercial Development</h3>
        <p>The surrounding commercial growth creates a walkable environment that attracts quality tenants who value:</p>
        <ul>
          <li>Convenience to daily services</li>
          <li>Reduced transportation costs</li>
          <li>Urban lifestyle amenities</li>
        </ul>
        
        <h2>Investment Strategies</h2>
        
        <h3>Residential Strategy</h3>
        <ul>
          <li>Target medical professionals and hospital staff</li>
          <li>Market proximity to work as key benefit</li>
          <li>Consider furnished units for traveling nurses</li>
        </ul>
        
        <h3>Mixed-Use Potential</h3>
        <ul>
          <li>Ground floor commercial conversion possibility</li>
          <li>Professional office space demand from medical expansion</li>
          <li>Retail opportunity given foot traffic</li>
        </ul>
        
        <h2>Due Diligence Considerations</h2>
        
        <h3>Property Inspection Items</h3>
        <ul>
          <li>HVAC systems and efficiency</li>
          <li>Electrical capacity for modern needs</li>
          <li>Plumbing condition and water pressure</li>
          <li>Roof condition and remaining life</li>
        </ul>
        
        <h3>Market Research</h3>
        <ul>
          <li>Verify rental comps in immediate area</li>
          <li>Research Albany Medical Center expansion timeline</li>
          <li>Analyze parking regulations and availability</li>
          <li>Review zoning for mixed-use potential</li>
        </ul>
        
        <h2>Investment Outlook</h2>
        
        <p>This property represents a unique opportunity to capitalize on Albany's medical district expansion. The combination of:</p>
        <ul>
          <li>Strategic location near major economic driver</li>
          <li>Versatile use options (residential/commercial)</li>
          <li>Growing commercial corridor</li>
          <li>Competitive pricing at $299,000</li>
        </ul>
        
        <p>Makes this an attractive proposition for both new and experienced investors.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h3 class="text-xl font-bold mb-2">Ready to Explore This Opportunity?</h3>
          <p>The combination of location, timing, and development activity makes this property worth serious consideration. Contact us for a detailed market analysis and property tour.</p>
        </div>
        
        <p><em>Investment analysis based on current market data and development plans. All figures should be verified through independent research and professional inspection.</em></p>
      </div>
    `,
    author: "Scott Alvarez",
    publishedAt: "2025-01-20",
    readTime: "7 min read",
    category: "Property Analysis",
    tags: ["Albany", "New Scotland Avenue", "Medical Center", "Triplex", "Mixed Use", "Investment Property", "Albany Medical Center"],
    featured: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop"
  },
  {
    id: 9,
    title: "Historic Stockade District Investment: 18 Ingersoll Avenue Schenectady Analysis",
    slug: "18-ingersoll-avenue-schenectady-stockade-district-investment",
    excerpt: "Rare opportunity in Schenectady's prestigious Stockade Historic District. This duplex at 18 Ingersoll Avenue offers historic charm with modern investment potential.",
    content: `
      <div class="max-w-4xl mx-auto prose prose-lg">
        <p class="lead">Historic Stockade District Duplex: 18 Ingersoll Avenue, Schenectady, NY 12305!</p>
        
        <p>Don't miss this rare opportunity to own a beautifully maintained two-family property at 18 Ingersoll Avenue, Schenectady, NY 12305, located in the prestigious Stockade Historic District! This distinctive home blends historic character with modern updates.</p>
        
        <h2>The Stockade District Advantage</h2>
        
        <h3>🏛️ Historic Prestige</h3>
        <p><strong>Prime Location:</strong> Situated in one of the Capital Region's most charming neighborhoods, the Stockade District is known for its:</p>
        <ul>
          <li>Historic significance and preserved architecture</li>
          <li>Tree-lined streets and walkable community</li>
          <li>Strong property values and investment stability</li>
          <li>Desirable rental market for professionals and students</li>
        </ul>
        
        <h3>🌊 Waterfront Proximity</h3>
        <p><strong>Lifestyle Amenities:</strong> Just steps from the Mohawk River, Riverside Park, and downtown Schenectady's restaurants, shops, and Proctors Theatre, offering tenants an enviable lifestyle that commands premium rents.</p>
        
        <h2>Property Analysis</h2>
        
        <div class="bg-gray-50 p-6 rounded-lg my-6">
          <h3 class="text-xl font-bold mb-4">Property Specifications</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>List Price:</strong> $296,000</p>
              <p><strong>Living Area:</strong> 1,654 sq ft</p>
              <p><strong>Configuration:</strong> 8 rooms, 2 bedrooms, 2 baths</p>
              <p><strong>Lot Size:</strong> 0.06 acres</p>
            </div>
            <div>
              <p><strong>Annual Taxes:</strong> $2,134 (estimated)</p>
              <p><strong>Built:</strong> 1900 (Historic charm)</p>
              <p><strong>Days on Market:</strong> 84</p>
              <p><strong>Parking:</strong> 2-car garage + off-street</p>
            </div>
          </div>
        </div>
        
        <h3>Unit Breakdown</h3>
        <p>Each unit features:</p>
        <ul>
          <li>Kitchen with modern updates</li>
          <li>Living room with period details</li>
          <li>Laundry hookups for convenience</li>
          <li>Separate entrances for privacy</li>
        </ul>
        
        <h2>Financial Analysis</h2>
        
        <h3>Revenue Potential</h3>
        <p>Based on Stockade District rental comps:</p>
        <ul>
          <li><strong>Unit 1:</strong> Estimated $1,500-1,700/month</li>
          <li><strong>Unit 2:</strong> Estimated $1,500-1,700/month</li>
          <li><strong>Total Monthly:</strong> $3,000-3,400</li>
          <li><strong>Annual Gross Rent:</strong> $36,000-40,800</li>
        </ul>
        
        <h3>Key Metrics</h3>
        <ul>
          <li><strong>Price per Square Foot:</strong> $179</li>
          <li><strong>Gross Rent Multiplier:</strong> 7.3-8.2 (reasonable for historic area)</li>
          <li><strong>Cap Rate Estimate:</strong> 8-10% (after expenses)</li>
          <li><strong>Tax Rate:</strong> Low at 0.7% of purchase price</li>
        </ul>
        
        <h2>Market Advantages</h2>
        
        <h3>Stockade Rental Market</h3>
        <p>The Stockade District attracts high-quality tenants:</p>
        <ul>
          <li><strong>Union College Faculty/Staff:</strong> Stable, long-term tenants</li>
          <li><strong>Downtown Professionals:</strong> Walking distance to offices</li>
          <li><strong>Healthcare Workers:</strong> Proximity to area hospitals</li>
          <li><strong>Graduate Students:</strong> Quality housing near campus</li>
        </ul>
        
        <h3>Neighborhood Stability</h3>
        <ul>
          <li>Historic designation protects property values</li>
          <li>Active neighborhood association</li>
          <li>Ongoing downtown revitalization efforts</li>
          <li>Cultural attractions (Proctors Theatre, restaurants)</li>
        </ul>
        
        <h2>Investment Strategies</h2>
        
        <h3>Owner-Occupant Strategy</h3>
        <ul>
          <li>Live in one unit, rent the other</li>
          <li>Mortgage assistance from rental income</li>
          <li>Build equity while enjoying historic charm</li>
          <li>Tax benefits of owner-occupied investment</li>
        </ul>
        
        <h3>Pure Investment Strategy</h3>
        <ul>
          <li>Target professional tenants for stability</li>
          <li>Market historic character as premium feature</li>
          <li>Leverage low taxes for better cash flow</li>
          <li>Consider short-term rental potential for events</li>
        </ul>
        
        <h2>Due Diligence Considerations</h2>
        
        <h3>Historic Property Factors</h3>
        <ul>
          <li>Research any historic preservation requirements</li>
          <li>Verify condition of period features</li>
          <li>Assess efficiency of heating/cooling systems</li>
          <li>Understand any renovation restrictions</li>
        </ul>
        
        <h3>Market Research</h3>
        <ul>
          <li>Verify Stockade rental comparables</li>
          <li>Research seasonal demand patterns</li>
          <li>Analyze Union College housing needs</li>
          <li>Review downtown development plans</li>
        </ul>
        
        <h2>Competitive Analysis</h2>
        
        <h3>Why This Property Stands Out</h3>
        <ul>
          <li><strong>Location:</strong> Prime Stockade address with river proximity</li>
          <li><strong>Condition:</strong> Well-maintained with modern updates</li>
          <li><strong>Parking:</strong> Garage plus off-street (rare in historic district)</li>
          <li><strong>Price:</strong> Competitive at $296K for the location</li>
        </ul>
        
        <h2>Investment Outlook</h2>
        
        <p>This property represents an excellent opportunity to enter the prestigious Stockade District market. The combination of:</p>
        <ul>
          <li>Historic charm with modern functionality</li>
          <li>Strong rental market fundamentals</li>
          <li>Low taxes and reasonable pricing</li>
          <li>Multiple investment strategies possible</li>
        </ul>
        
        <p>Makes this suitable for both first-time investors and those looking to add a premium property to their portfolio.</p>
        
        <div class="bg-blue-50 p-6 rounded-lg my-6">
          <h3 class="text-xl font-bold mb-2">Stockade District Opportunity</h3>
          <p>Properties in the Stockade rarely come available. The combination of location, condition, and pricing makes this worth immediate consideration. Contact us for a detailed analysis and property tour.</p>
        </div>
        
        <p><em>Analysis based on current market conditions and comparable sales. Historic properties may have unique considerations requiring specialized expertise.</em></p>
      </div>
    `,
    author: "Scott Alvarez",
    publishedAt: "2025-01-18",
    readTime: "6 min read",
    category: "Property Analysis",
    tags: ["Schenectady", "Stockade District", "Historic Property", "Duplex", "Ingersoll Avenue", "Union College", "Investment Property"],
    featured: false,
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=800&h=400&fit=crop"
  }
];

const categories = ["All", "Property Analysis", "Market Analysis", "Investment Strategy", "Home Buying", "Case Studies", "Rehab & Flipping"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <SEOHead 
        title="Real Estate Blog - Capital District Investment Insights | Capital District Nest"
        description="Expert insights on Albany, Troy, Schenectady real estate investing. BRRRR strategy, market analysis, first-time buyer guides, and investment opportunities in the Capital District."
        keywords="real estate blog, Albany investment, Troy properties, Capital District real estate, BRRRR strategy, property analysis, real estate market"
        canonical="https://your-domain.com/blog"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <BookOpen className="w-12 h-12" />
                <h1 className="text-4xl md:text-6xl font-bold">Real Estate Blog</h1>
              </div>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Expert insights, market analysis, and investment strategies for the Capital District
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-lg">
                  Get the latest real estate trends, investment opportunities, and proven strategies
                  from our experienced team in Albany, Troy, Schenectady, and Saratoga Springs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search articles, topics, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className="text-sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Articles</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"><rect width="400" height="225" fill="%23f3f4f6"/><text x="200" y="112" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial" font-size="14">Featured Article Image</text></svg>';
                          }}
                        />
                        <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{post.author}</span>
                            </div>
                            <Link to={`/blog/${post.slug}`}>
                              <Button variant="outline" size="sm" className="group">
                                Read More
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow group">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225"><rect width="400" height="225" fill="%23f3f4f6"/><text x="200" y="112" text-anchor="middle" dy=".3em" fill="%236b7280" font-family="Arial" font-size="14">Article Image</text></svg>';
                        }}
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm" className="group">
                            Read
                            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated with Market Insights</h2>
              <p className="text-lg opacity-90 mb-8">
                Get weekly real estate insights, investment opportunities, and market analysis delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white text-black flex-1"
                />
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm opacity-75 mt-3">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;