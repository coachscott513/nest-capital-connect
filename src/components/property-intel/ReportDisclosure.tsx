const ReportDisclosure = () => {
  return (
    <section className="py-16 md:py-20 bg-report-bg border-t border-report-border/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-report-text-muted mb-6 text-center">
          Disclosure
        </p>
        
        <div className="bg-report-card rounded-2xl shadow-[0_4px_24px_-4px_hsl(220_20%_10%/0.08)] border border-report-border/40 p-8 text-center space-y-4">
          <p className="text-sm text-report-text-body leading-relaxed">
            This Property Intelligence Report is prepared using publicly available data sources 
            including MLS records, tax assessor databases, and market analytics. It is intended 
            for informational purposes only and does not constitute professional appraisal, 
            legal advice, or a guarantee of accuracy.
          </p>
          
          <p className="text-sm text-report-text-body leading-relaxed">
            Market conditions change rapidly. Buyers should conduct independent due diligence 
            and consult with qualified professionals before making any real estate decisions.
          </p>
          
          <p className="text-xs text-report-text-muted mt-6">
            © {new Date().getFullYear()} Capital District Nest. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReportDisclosure;
