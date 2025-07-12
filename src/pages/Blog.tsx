import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, User, Search, Filter, ArrowRight, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

// Sample blog posts - you can replace with real data from Supabase later
const blogPosts = [
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
                          <Button variant="outline" size="sm" className="group">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
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
                        <Button variant="outline" size="sm" className="group">
                          Read
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
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