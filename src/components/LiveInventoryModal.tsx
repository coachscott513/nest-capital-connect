import React, { useState, useEffect } from 'react';
import { X, Search, Home, MapPin, BedDouble, Bath, Square, ExternalLink, Filter, TrendingUp, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface Property {
  id: string;
  address: string;
  city: string;
  price: number;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  photos: string[] | null;
  property_type: string | null;
  days_on_market: number | null;
  status: string | null;
  boldtrail_url: string | null;
}

interface LiveInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  townName: string;
  townSlug: string;
  searchUrl?: string;
}

const LiveInventoryModal: React.FC<LiveInventoryModalProps> = ({
  isOpen,
  onClose,
  townName,
  townSlug,
  searchUrl
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'single' | 'multi'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under300' | '300to500' | 'over500'>('all');

  useEffect(() => {
    if (isOpen) {
      fetchProperties();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, townSlug]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .ilike('city', `%${townName}%`)
        .eq('status', 'Active')
        .order('price', { ascending: false })
        .limit(20);

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProperties = properties.filter(p => {
    let passesFilter = true;
    
    if (filter === 'single') {
      passesFilter = p.property_type?.toLowerCase().includes('single') || 
                     p.property_type?.toLowerCase().includes('house') ||
                     !p.property_type?.toLowerCase().includes('multi');
    } else if (filter === 'multi') {
      passesFilter = p.property_type?.toLowerCase().includes('multi') ||
                     p.property_type?.toLowerCase().includes('duplex') ||
                     p.property_type?.toLowerCase().includes('triplex');
    }
    
    if (priceRange === 'under300') {
      passesFilter = passesFilter && p.price < 300000;
    } else if (priceRange === '300to500') {
      passesFilter = passesFilter && p.price >= 300000 && p.price <= 500000;
    } else if (priceRange === 'over500') {
      passesFilter = passesFilter && p.price > 500000;
    }
    
    return passesFilter;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Live Inventory</h2>
                    <p className="text-white/60 text-sm">{townName} Active Listings</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-background/5 hover:bg-background/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-white/50" />
                  <span className="text-sm text-white/50">Filter:</span>
                </div>
                
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'single', label: 'Single Family' },
                    { key: 'multi', label: 'Multi-Unit' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key as typeof filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === key
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background/5 text-white/70 hover:bg-background/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                
                <div className="h-6 w-px bg-background/10" />
                
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'Any Price' },
                    { key: 'under300', label: '<$300K' },
                    { key: '300to500', label: '$300K-$500K' },
                    { key: 'over500', label: '$500K+' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setPriceRange(key as typeof priceRange)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        priceRange === key
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-background/5 text-white/70 hover:bg-background/10'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-background/5 border border-white/10 rounded-xl p-4 animate-pulse">
                      <div className="h-40 bg-background/10 rounded-lg mb-4" />
                      <div className="h-6 bg-background/10 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-background/10 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-background/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                    >
                      {/* Image */}
                      <div className="relative h-40 bg-primary overflow-hidden">
                        {property.photos?.[0] ? (
                          <img
                            src={property.photos[0]}
                            alt={property.address}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-12 h-12 text-white/20" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs font-medium rounded-full">
                            Active
                          </span>
                        </div>
                        {property.days_on_market && (
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 bg-primary/60 text-white/80 text-xs font-medium rounded-full backdrop-blur-sm">
                              {property.days_on_market} days
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                            {formatPrice(property.price)}
                          </h3>
                          {property.property_type && (
                            <span className="text-xs text-white/50 bg-background/5 px-2 py-1 rounded">
                              {property.property_type}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-white/70 mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.address}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                          {property.beds && (
                            <span className="flex items-center gap-1">
                              <BedDouble className="w-4 h-4" />
                              {property.beds} beds
                            </span>
                          )}
                          {property.baths && (
                            <span className="flex items-center gap-1">
                              <Bath className="w-4 h-4" />
                              {property.baths} baths
                            </span>
                          )}
                          {property.sqft && (
                            <span className="flex items-center gap-1">
                              <Square className="w-4 h-4" />
                              {property.sqft.toLocaleString()} sqft
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Link
                            to="/intelligence"
                            className="flex-1 py-2 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-lg text-center hover:bg-primary/90 transition-colors"
                          >
                            Get Intel Report
                          </Link>
                          {property.boldtrail_url && (
                            <a
                              href={property.boldtrail_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3 bg-background/5 text-white/70 rounded-lg hover:bg-background/10 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Building2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Listings Found</h3>
                  <p className="text-white/60 mb-6 max-w-md mx-auto">
                    We don't have any properties matching your filters for {townName}. 
                    Try adjusting your search or view all available listings.
                  </p>
                  {searchUrl && (
                    <a
                      href={searchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
                    >
                      <Search className="w-5 h-5" />
                      View All {townName} Listings
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-between">
              <p className="text-sm text-white/50">
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
              {searchUrl && (
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-background/5 hover:bg-background/10 text-white font-medium rounded-lg transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Full MLS Search
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveInventoryModal;
