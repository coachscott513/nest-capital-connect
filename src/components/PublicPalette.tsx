import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '@/styles/publicPalette.css';

export function isPublicPaletteRoute(pathname: string): boolean {
  return !/^\/(?:admin|auth|login|reset-password|dashboard|partner-dashboard|partner-auth|partner-login|vendor|reports|intel)(?:\/|$)/.test(pathname);
}

/** Color-only route mode; no page wrappers, geometry or navigation changes. */
export default function PublicPalette() {
  const { pathname } = useLocation();
  useEffect(() => {
    const root=document.documentElement;
    const apply=()=>{
      let dark=false;
      try { dark=JSON.parse(localStorage.getItem('nest-feed-dark') || 'false')===true; } catch { /* Default light. */ }
      root.classList.toggle('nest-public-palette',isPublicPaletteRoute(pathname));
      root.classList.toggle('nest-public-dark',isPublicPaletteRoute(pathname) && dark);
    };
    apply();
    window.addEventListener('nest-palette-change',apply);
    window.addEventListener('storage',apply);
    return ()=>{
      window.removeEventListener('nest-palette-change',apply);
      window.removeEventListener('storage',apply);
      root.classList.remove('nest-public-palette','nest-public-dark');
    };
  },[pathname]);
  return null;
}