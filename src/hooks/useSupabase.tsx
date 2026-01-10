
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Lead {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'renter' | 'owner' | 'buyer' | 'seller' | string;
  location?: string;
  bedrooms?: string;
  price_range?: string;
  origin_town?: string;
  lead_type?: string;
  assigned_agent_id?: string;
  created_at?: string;
}

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);

  const addLead = async (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data.id;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error in addLead function:', error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching leads:', error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addLead,
    fetchLeads
  };
};
