
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'renter' | 'owner' | 'buyer';
  location?: string;
  bedrooms?: string;
  priceRange?: string;
  createdAt: Date;
}

export interface Property {
  id?: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  imageUrl?: string;
  ownerId: string;
  createdAt: Date;
}

export const useFirestore = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'leads'), {
        ...leadData,
        createdAt: new Date()
      });
      console.log('Lead added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding lead: ', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, 'properties'), {
        ...propertyData,
        createdAt: new Date()
      });
      console.log('Property added with ID: ', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding property: ', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async (filters?: { location?: string; maxPrice?: number; bedrooms?: number }) => {
    try {
      setLoading(true);
      let q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      
      if (filters?.location) {
        q = query(q, where('location', '>=', filters.location), where('location', '<=', filters.location + '\uf8ff'));
      }
      
      const querySnapshot = await getDocs(q);
      const propertiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
      
      setProperties(propertiesData);
      return propertiesData;
    } catch (error) {
      console.error('Error fetching properties: ', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      
      setLeads(leadsData);
      return leadsData;
    } catch (error) {
      console.error('Error fetching leads: ', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    properties,
    leads,
    loading,
    addLead,
    addProperty,
    fetchProperties,
    fetchLeads
  };
};
