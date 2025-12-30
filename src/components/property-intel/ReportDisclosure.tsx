const ReportDisclosure = () => {
  return (
    <section className="py-12 md:py-16 bg-report-section-light border-t border-report-border">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-muted mb-4 text-center">
          Disclosure
        </p>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-report-muted leading-relaxed">
            This Property Intelligence Report is prepared using publicly available data sources 
            including MLS records, tax assessor databases, and market analytics. It is intended 
            for informational purposes only and does not constitute professional appraisal, 
            legal advice, or a guarantee of accuracy.
          </p>
          
          <p className="text-sm text-report-muted leading-relaxed">
            Market conditions change rapidly. Buyers should conduct independent due diligence 
            and consult with qualified professionals before making any real estate decisions.
          </p>
          
          <p className="text-xs text-report-muted/60 mt-6">
            © {new Date().getFullYear()} Capital District Nest. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReportDisclosure;
