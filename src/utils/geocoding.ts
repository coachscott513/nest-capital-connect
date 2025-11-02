/**
 * Geocoding utility for converting addresses to coordinates
 * and generating Google Maps/Earth links
 */

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  coordinates: Coordinates;
  formattedAddress: string;
  precision: 'ROOFTOP' | 'RANGE_INTERPOLATED' | 'GEOMETRIC_CENTER' | 'APPROXIMATE';
}

/**
 * Geocode an address to get precise lat/long coordinates
 */
export const geocodeAddress = async (address: string): Promise<GeocodingResult | null> => {
  if (!GOOGLE_API_KEY) {
    console.error('Google Maps API key not configured');
    return null;
  }

  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0];
      return {
        coordinates: {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        },
        formattedAddress: result.formatted_address,
        precision: result.geometry.location_type,
      };
    }

    console.error('Geocoding failed:', data.status);
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

/**
 * Generate Google Earth link with optimized zoom for roofline view
 */
export const generateGoogleEarthLink = (latitude: number, longitude: number): string => {
  return `https://earth.google.com/web/@${latitude},${longitude},80a,0d,80y,0h,45t,0r`;
};

/**
 * Generate Google Street View embed URL
 */
export const generateStreetViewEmbedUrl = (latitude: number, longitude: number): string => {
  if (!GOOGLE_API_KEY) {
    console.error('Google Maps API key not configured');
    return '';
  }
  return `https://www.google.com/maps/embed/v1/streetview?key=${GOOGLE_API_KEY}&location=${latitude},${longitude}`;
};

/**
 * Generate Google Maps search URL
 */
export const generateMapsSearchUrl = (latitude: number, longitude: number): string => {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
};

/**
 * Determine if geocoding precision is high enough for Earth view
 */
export const isEarthPrecisionValid = (precision: string): boolean => {
  return precision === 'ROOFTOP' || precision === 'RANGE_INTERPOLATED';
};
