import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Town configuration with RE/MAX search URLs
const TOWN_CONFIGS: Record<string, { name: string; url: string }> = {
  'clifton-park': {
    name: 'Clifton Park',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Clifton+Park&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DClifton+Park&sortby=listings.price+ASC&rtype=grid'
  },
  'albany': {
    name: 'Albany',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Albany&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DAlbany&sortby=listings.price+ASC&rtype=grid'
  },
  'troy': {
    name: 'Troy',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Troy&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DTroy&sortby=listings.price+ASC&rtype=grid'
  },
  'schenectady': {
    name: 'Schenectady',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Schenectady&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DSchenectady&sortby=listings.price+ASC&rtype=grid'
  },
  'saratoga-springs': {
    name: 'Saratoga Springs',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Saratoga+Springs&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DSaratoga+Springs&sortby=listings.price+ASC&rtype=grid'
  },
  'delmar': {
    name: 'Delmar',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Delmar&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DDelmar&sortby=listings.price+ASC&rtype=grid'
  },
  'niskayuna': {
    name: 'Niskayuna',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Niskayuna&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DNiskayuna&sortby=listings.price+ASC&rtype=grid'
  },
  'queensbury': {
    name: 'Queensbury',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Queensbury&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DQueensbury&sortby=listings.price+ASC&rtype=grid'
  },
  'voorheesville': {
    name: 'Voorheesville',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Voorheesville&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DVoorheesville&sortby=listings.price+ASC&rtype=grid'
  },
  'amsterdam': {
    name: 'Amsterdam',
    url: 'https://scottalvarez.remax.com/index.php?advanced=1&display=Amsterdam&min=0&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=31&types%5B%5D=5&types%5B%5D=3&types%5B%5D=12&types%5B%5D=15&statuses%5B%5D=0&minfootage=0&maxfootage=&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=City%3DAmsterdam&sortby=listings.price+ASC&rtype=grid'
  }
};

interface Listing {
  address: string;
  city: string;
  price: number;
  propertyType: string;
  sqft: number | null;
  beds: number | null;
  baths: number | null;
  url: string;
}

function parseListingsFromMarkdown(markdown: string): Listing[] {
  const listings: Listing[] = [];
  
  console.log('Starting parsing, markdown length:', markdown.length);
  
  // Strategy 1: Look for property URL patterns and extract surrounding data
  const propertyUrlRegex = /\[View Details\]\((https:\/\/scottalvarez\.remax\.com\/property\/[^\)]+)\)/gi;
  let match;
  const propertyUrls: string[] = [];
  
  while ((match = propertyUrlRegex.exec(markdown)) !== null) {
    propertyUrls.push(match[1]);
  }
  console.log('Found property URLs:', propertyUrls.length);
  
  // Strategy 2: Parse by looking for price patterns followed by property info
  // Pattern: $XXX,XXX followed by city name and property details
  const priceBlockRegex = /\$(\d{1,3}(?:,\d{3})+)\s*(?:\n|.*?)([A-Za-z\s]+),\s*NY/gi;
  
  // Strategy 3: Look for specific listing card patterns from the markdown
  // The format appears to be: [address](url) followed by city, price, type, details
  const lines = markdown.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Look for lines with property URLs
    const urlMatch = line.match(/\(https:\/\/scottalvarez\.remax\.com\/property\/[^\)]+\)/);
    if (!urlMatch) continue;
    
    const url = urlMatch[0].slice(1, -1);
    
    // Look around this line for price, address, and details
    const context = lines.slice(Math.max(0, i - 5), Math.min(lines.length, i + 15)).join(' ');
    
    // Extract price
    const priceMatch = context.match(/\$(\d{1,3}(?:,\d{3})+)/);
    if (!priceMatch) continue;
    
    const price = parseInt(priceMatch[1].replace(/,/g, ''));
    if (isNaN(price) || price < 10000) continue;
    
    // Extract address from URL or surrounding text
    // URL format: /property/155-202531202-23-northcrest-drive-clifton-park-NY-12065
    const urlParts = url.split('/').pop() || '';
    const addressFromUrl = urlParts.split('-').slice(2, -3).join(' ');
    
    // Try to find address in context
    const addressMatch = context.match(/(\d+[a-z]?\s+[\w\s'.-]+(?:Drive|Street|Avenue|Road|Lane|Way|Court|Circle|Place|Boulevard|Terrace|Trail|Path|Run|Rd|St|Ave|Ln|Dr|Ct|Cir|Pl|Blvd|Ter))/i);
    const address = addressMatch ? addressMatch[1].trim() : addressFromUrl;
    
    // Extract city from URL
    const cityFromUrl = urlParts.split('-').slice(-3, -2).join(' ');
    const city = cityFromUrl || 'Unknown';
    
    // Extract property type
    let propertyType = 'Single Family';
    if (/multi-?family|income/i.test(context)) propertyType = 'Multi-Family';
    else if (/condo/i.test(context)) propertyType = 'Condo';
    else if (/townhouse/i.test(context)) propertyType = 'Townhouse';
    else if (/\bland\b/i.test(context)) propertyType = 'Land';
    
    // Extract sqft - look for patterns like "2,122 SqFt" or "Size 2,122"
    const sqftMatch = context.match(/(?:Size\s*)?(\d{1,2},?\d{3})\s*SqFt/i);
    const sqft = sqftMatch ? parseInt(sqftMatch[1].replace(/,/g, '')) : null;
    
    // Extract beds and baths
    const bedsMatch = context.match(/(\d+)\s*Beds?/i);
    const bathsMatch = context.match(/(\d+\.?\d*)\s*Baths?/i);
    
    const beds = bedsMatch ? parseInt(bedsMatch[1]) : null;
    const baths = bathsMatch ? parseFloat(bathsMatch[1]) : null;
    
    // Avoid duplicates
    if (listings.some(l => l.url === url)) continue;
    
    listings.push({
      address,
      city,
      price,
      propertyType,
      sqft,
      beds,
      baths,
      url
    });
  }
  
  console.log('Parsed listings:', listings.length);
  return listings;
}

function calculateMarketStats(listings: Listing[]) {
  if (listings.length === 0) {
    return {
      active_listings: 0,
      median_price: null,
      avg_price: null,
      min_price: null,
      max_price: null,
      avg_sqft: null,
      avg_beds: null,
      avg_baths: null,
      listings_under_300k: 0,
      listings_300k_500k: 0,
      listings_500k_750k: 0,
      listings_over_750k: 0,
      single_family_count: 0,
      multi_family_count: 0,
      condo_count: 0,
      land_count: 0
    };
  }
  
  const prices = listings.map(l => l.price).sort((a, b) => a - b);
  const sqfts = listings.filter(l => l.sqft).map(l => l.sqft!);
  const bedsList = listings.filter(l => l.beds).map(l => l.beds!);
  const bathsList = listings.filter(l => l.baths).map(l => l.baths!);
  
  const medianPrice = prices.length > 0 
    ? prices[Math.floor(prices.length / 2)] 
    : null;
  
  const avgPrice = prices.length > 0 
    ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) 
    : null;
  
  const avgSqft = sqfts.length > 0 
    ? Math.round(sqfts.reduce((a, b) => a + b, 0) / sqfts.length) 
    : null;
  
  const avgBeds = bedsList.length > 0 
    ? Math.round((bedsList.reduce((a, b) => a + b, 0) / bedsList.length) * 10) / 10 
    : null;
  
  const avgBaths = bathsList.length > 0 
    ? Math.round((bathsList.reduce((a, b) => a + b, 0) / bathsList.length) * 10) / 10 
    : null;
  
  return {
    active_listings: listings.length,
    median_price: medianPrice,
    avg_price: avgPrice,
    min_price: prices.length > 0 ? prices[0] : null,
    max_price: prices.length > 0 ? prices[prices.length - 1] : null,
    avg_sqft: avgSqft,
    avg_beds: avgBeds,
    avg_baths: avgBaths,
    listings_under_300k: listings.filter(l => l.price < 300000).length,
    listings_300k_500k: listings.filter(l => l.price >= 300000 && l.price < 500000).length,
    listings_500k_750k: listings.filter(l => l.price >= 500000 && l.price < 750000).length,
    listings_over_750k: listings.filter(l => l.price >= 750000).length,
    single_family_count: listings.filter(l => l.propertyType === 'Single Family').length,
    multi_family_count: listings.filter(l => l.propertyType === 'Multi-Family').length,
    condo_count: listings.filter(l => l.propertyType === 'Condo' || l.propertyType === 'Townhouse').length,
    land_count: listings.filter(l => l.propertyType === 'Land').length
  };
}

async function scrapeTown(townSlug: string, config: { name: string; url: string }, firecrawlApiKey: string) {
  console.log(`Scraping ${config.name} from ${config.url}`);
  
  // Use JSON extraction with prompt for structured data extraction
  const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${firecrawlApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: config.url,
      formats: ['markdown'],
      onlyMainContent: false,
      waitFor: 3000,
    }),
  });
  
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    console.error(`Failed to scrape ${config.name}:`, data);
    throw new Error(`Firecrawl error: ${data.error || 'Unknown error'}`);
  }
  
  const markdown = data.data?.markdown || data.markdown || '';
  console.log(`Received ${markdown.length} characters of markdown for ${config.name}`);
  
  // Parse listings from markdown
  const listings = parseListingsFromMarkdown(markdown);
  console.log(`Parsed ${listings.length} listings for ${config.name}`);
  
  const stats = calculateMarketStats(listings);
  
  return {
    town_slug: townSlug,
    town_name: config.name,
    source_url: config.url,
    listings_data: listings,
    ...stats
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Try both possible secret names (connector uses FIRECRAWL_API_KEY_1)
    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY_1') || Deno.env.get('FIRECRAWL_API_KEY');
    if (!firecrawlApiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Parse request body
    let townSlug: string | null = null;
    let scrapeAll = false;
    
    try {
      const body = await req.json();
      townSlug = body.town_slug || null;
      scrapeAll = body.scrape_all || false;
    } catch {
      // No body or invalid JSON - scrape all towns
      scrapeAll = true;
    }
    
    const results: any[] = [];
    const errors: any[] = [];
    
    const townsToScrape = scrapeAll 
      ? Object.entries(TOWN_CONFIGS) 
      : townSlug && TOWN_CONFIGS[townSlug] 
        ? [[townSlug, TOWN_CONFIGS[townSlug]]] as [string, { name: string; url: string }][]
        : [];
    
    if (townsToScrape.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No valid town specified',
          available_towns: Object.keys(TOWN_CONFIGS)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Starting scrape for ${townsToScrape.length} towns`);
    
    for (const [slug, config] of townsToScrape) {
      try {
        const townData = await scrapeTown(slug, config, firecrawlApiKey);
        
        // Upsert into database
        const { error: upsertError } = await supabase
          .from('town_market_data')
          .upsert({
            ...townData,
            scraped_at: new Date().toISOString()
          }, {
            onConflict: 'town_slug'
          });
        
        if (upsertError) {
          console.error(`Error upserting ${slug}:`, upsertError);
          errors.push({ town: slug, error: upsertError.message });
        } else {
          results.push({ 
            town: slug, 
            name: config.name,
            listings_found: townData.active_listings,
            median_price: townData.median_price
          });
        }
        
        // Add delay between requests to avoid rate limiting
        if (scrapeAll && townsToScrape.indexOf([slug, config] as any) < townsToScrape.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (e) {
        console.error(`Error scraping ${slug}:`, e);
        errors.push({ town: slug, error: e instanceof Error ? e.message : 'Unknown error' });
      }
    }
    
    console.log(`Scrape complete. Success: ${results.length}, Errors: ${errors.length}`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        errors: errors.length > 0 ? errors : undefined,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in scrape-town-listings:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
