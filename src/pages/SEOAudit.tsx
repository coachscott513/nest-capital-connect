import React from 'react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import RedirectAudit from '@/components/RedirectAudit';
import SEOHead from '@/components/SEOHead';

const SEOAudit = () => {
  return (
    <>
      <SEOHead
        title="SEO Audit Tool - Capital District Nest"
        description="Comprehensive SEO audit and redirect management tool for Capital District real estate"
        keywords="SEO audit, redirect management, Capital District SEO"
      />
      
      <div className="min-h-screen bg-background">
        <MainHeader />
        <main className="pt-20">
          <RedirectAudit />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SEOAudit;