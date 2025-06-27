
import React from 'react';

const MeetTheTeamSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Meet <span className="text-blue-600">the</span> Team
          </h1>
          <p className="text-xl text-slate-600 font-semibold">
            The Scott Alvarez Team
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            <a 
              href="https://scottalvarez.remax.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 p-6 text-center">
                <div className="mb-4">
                  <img 
                    src="https://img.boldtrail.com/H-Ms7cP2VxpNnFJ-pvDfSvZVHlxSzq5z9g1JhL8vMFg/rs:fit:500/plain/https://papiphotos.remax-im.com/Person/102119538/MainPhoto_cropped/MainPhoto_cropped.jpg" 
                    alt="Scott Alvarez"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Scott Alvarez
                </h3>
                <p className="text-sm text-slate-600 mb-1">
                  Licensed Real Estate Salesperson
                </p>
                <p className="text-xs text-slate-500">
                  10401354402, 40AL10849992
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;
