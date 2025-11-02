const DelmarMarketHero = () => {
  return (
    <section 
      className="relative h-[70vh] flex items-center justify-center text-white"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600&h=900&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          Explore Delmar, NY Real Estate Market
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow">
          Live insights, school rankings, and neighborhood layers powered by Google Earth and RPR
        </p>
      </div>
    </section>
  );
};

export default DelmarMarketHero;
