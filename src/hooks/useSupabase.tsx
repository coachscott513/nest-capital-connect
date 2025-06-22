
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'renter' | 'owner' | 'buyer' | 'seller';
  location?: string;
  bedrooms?: string;
  price_range?: string;
  created_at?: string;
}

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);

  const addLead = async (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    try {
      setLoading(true);
      console.log('Attempting to add lead:', leadData);
      
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }

      console.log('Lead added successfully:', data);
      return data.id;
    } catch (error) {
      console.error('Error in addLead function:', error);
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
        console.error('Error fetching leads:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching leads:', error);
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
