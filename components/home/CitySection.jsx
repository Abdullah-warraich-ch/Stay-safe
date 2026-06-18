import React from 'react';
import { featuredCities } from '../../data/featuredCities';
import { ArrowRight } from 'lucide-react';

const CitySection = () => {
  // Mapping layout classes to each city based on index

  const getGridClasses = (index) => {
    switch (index) {
      case 0: return "col-span-2 row-span-2 h-full"; // Large feature card (2x2)
      case 1: return "col-span-2 row-span-1 h-full"; // Wide card (2x1)
      case 2: return "col-span-1 row-span-1 h-full"; // Small card (1x1)
      case 3: return "col-span-1 row-span-1 h-full"; // Small card (1x1)
      default: return "col-span-1 h-full";
    }
  };

  return (
    <section className="py-12 md:py-24 px-3 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-4 h-[400px] sm:h-[500px] md:h-[650px]">
          {featuredCities.map((city, index) => (
            <div
              key={city.id}
              className={`group relative rounded-xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-2xl ${getGridClasses(index)}`}
            >
              {/* Background Image */}
              <img
                src={city.bgImage}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Refined Overlays */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

              {/* Card Content */}
              <div className="absolute inset-0 p-3 sm:p-5 md:p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className={`font-bold text-white tracking-tight leading-tight ${index === 0 ? 'text-xl sm:text-2xl md:text-4xl' : 'text-xs sm:text-sm md:text-2xl'}`}>
                      {city.name}
                    </h3>
                  </div>

                  <div className={`bg-white/90 backdrop-blur-sm text-black rounded-full transform transition-all duration-500 group-hover:bg-white group-hover:scale-110 flex items-center justify-center ${index === 0 ? 'p-1.5 sm:p-2 md:p-3' : 'p-1 md:p-3'}`}>
                    <ArrowRight size={index === 0 ? 20 : 12} className="md:w-6 md:h-6" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitySection;
