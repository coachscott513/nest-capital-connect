// Expanded Routing System for Capital District Towns
// This component generates redirect routes for legacy town URLs
// Canonical URLs: /towns/:slug

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { capitalDistrictTowns } from './CapitalDistrictTowns';
import Rentals from '@/pages/Rentals';

// Generate redirect routes for legacy /{town}-real-estate URLs
// All redirect to canonical /towns/{slug}
export const generateTownRoutes = () => {
  return capitalDistrictTowns.map(town => (
    <Route 
      key={`${town.slug}-real-estate-redirect`}
      path={`/${town.slug}-real-estate`} 
      element={<Navigate to={`/towns/${town.slug}`} replace />} 
    />
  ));
};

// Generate rental routes for all towns
export const generateTownRentalRoutes = () => {
  return capitalDistrictTowns.map(town => (
    <Route 
      key={`${town.slug}-rentals`}
      path={`/${town.slug}-rentals`} 
      element={<Rentals />} 
    />
  ));
};