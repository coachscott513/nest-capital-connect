
const FinancingSection = () => {
  return (
    <section id="financing" className="py-16 relative">
      <div className="relative min-h-[450px] overflow-hidden rounded-lg mx-4 max-w-7xl lg:mx-auto">
        <img 
          src="https://img.kvcore.com/cdn-cgi/image/fit=scale-down,format=auto/https://dtzulyujzhqiu.cloudfront.net/kvcoredemo14/images/1594658722_YXYBlolB3pNcEOuHmf8KJPPpzrQZtnk99VIhIXq0.jpeg" 
          alt="picture of calculator"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-6">
            <h3 className="text-4xl font-semibold mb-4">Financing Solutions</h3>
            <p className="text-lg">Our partners offer competitive rates and expert guidance to help you navigate your financing options with confidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;
