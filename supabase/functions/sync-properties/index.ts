import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Property {
  mls_id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  latitude: number;
  longitude: number;
  photos: string[];
  description?: string;
  property_type?: string;
  status: string;
  boldtrail_url?: string;
}

async function geocodeAddress(address: string, apiKey: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results[0]) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    console.error('Geocoding failed:', data.status);
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}

async function scrapeProperties(url: string, firecrawlKey: string): Promise<Property[]> {
  console.log('Starting property scraping...');
  
  try {
    // Use Firecrawl to get the page content
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        formats: ['markdown', 'html'],
      }),
    });

    if (!response.ok) {
      throw new Error(`Firecrawl API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Firecrawl response received');

    // Parse the markdown content to extract property data
    const markdown = data.data?.markdown || '';
    const properties: Property[] = [];

    // Extract property listings from markdown
    // Pattern: $XXX [Address](url)
    const listingPattern = /\$([0-9,]+)K?\s+\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = listingPattern.exec(markdown)) !== null) {
      const priceStr = match[1].replace(/,/g, '');
      // Prices are in format like "269K" or "739K"
      const price = parseFloat(priceStr) * 1000;
      const address = match[2].trim();
      const url = match[3];

      // Extract MLS ID from URL
      const mlsMatch = url.match(/property\/(\d+-\d+)/);
      const mls_id = mlsMatch ? mlsMatch[1] : `temp-${Date.now()}-${properties.length}`;

      // Parse address
      const addressParts = address.split(',');
      const street = addressParts[0]?.trim() || address;
      
      properties.push({
        mls_id,
        address: street,
        city: 'Delmar',
        state: 'NY',
        zip: '12054',
        price,
        beds: 3, // Default values - would need detailed scraping
        baths: 2,
        sqft: 1500,
        latitude: 42.6211, // Default Delmar coords
        longitude: -73.8368,
        photos: [],
        status: 'active',
        boldtrail_url: url,
      });
    }

    console.log(`Found ${properties.length} properties`);
    return properties;
  } catch (error) {
    console.error('Error scraping properties:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting property sync...');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const firecrawlKey = Deno.env.get('FIRECRAWL_API_KEY')!;
    const googleMapsKey = Deno.env.get('GOOGLE_MAPS_API_KEY');

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Scrape properties from RE/MAX site
    const remaxUrl = 'https://scottalvarez.remax.com/index.php?advanced=1&pak=zip%3A12054&areas%5B%5D=zip%3A12054%3Any&types%5B%5D=1&types%5B%5D=2&types%5B%5D=4&types%5B%5D=31&types%5B%5D=12&types%5B%5D=5&types%5B%5D=15&types%5B%5D=3&types%5B%5D=6&beds=0&baths=0&min=0&max=100000000&rtype=map';
    
    const properties = await scrapeProperties(remaxUrl, firecrawlKey);
    console.log(`Scraped ${properties.length} properties`);

    // Geocode addresses if Google Maps API key is available
    if (googleMapsKey) {
      console.log('Geocoding addresses...');
      for (const property of properties) {
        const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip}`;
        const coords = await geocodeAddress(fullAddress, googleMapsKey);
        if (coords) {
          property.latitude = coords.lat;
          property.longitude = coords.lng;
        }
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Insert or update properties
    let inserted = 0;
    let updated = 0;
    let errors = 0;

    for (const property of properties) {
      try {
        // Check if property exists
        const { data: existing } = await supabase
          .from('properties')
          .select('id')
          .eq('mls_id', property.mls_id)
          .maybeSingle();

        if (existing) {
          // Update existing property
          const { error } = await supabase
            .from('properties')
            .update(property)
            .eq('mls_id', property.mls_id);

          if (error) throw error;
          updated++;
        } else {
          // Insert new property
          const { error } = await supabase
            .from('properties')
            .insert([property]);

          if (error) throw error;
          inserted++;
        }
      } catch (error) {
        console.error(`Error processing property ${property.mls_id}:`, error);
        errors++;
      }
    }

    const result = {
      success: true,
      message: `Sync complete: ${inserted} inserted, ${updated} updated, ${errors} errors`,
      details: {
        inserted,
        updated,
        errors,
        total: properties.length,
      },
    };

    console.log(result.message);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in sync-properties function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
