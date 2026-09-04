import React from 'react';
import { ArrowRight } from 'lucide-react';
import { concernsData } from '../../data/concerns';

interface ShopByConcernProps {
  onNavigate: (path: string) => void;
}

export const ShopByConcern: React.FC<ShopByConcernProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
              FIND YOUR RITUAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight">
              Formulated for your skin’s true condition.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm font-sans text-[#78716C] max-w-sm">
            Target specific biological deficits with clinically coordinated active complexes.
          </p>
        </div>

        {/* Concerns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {concernsData.map(concern => (
            <div
              key={concern.id}
              onClick={() => onNavigate(`/shop?concern=${encodeURIComponent(concern.id)}`)}
              data-cursor="EXPLORE"
              className="group cursor-pointer bg-[#F4EFE6] border border-[#E8E2D8] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#1C1917]"
            >
              {/* Image Aspect with Subtle 2% Zoom on Hover */}
              <div className="relative aspect-16/11 overflow-hidden bg-[#FAF7F2]">
                <img
                  src={concern.image}
                  alt={concern.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <span className="absolute bottom-3 left-3 text-[10px] font-sans tracking-widest-editorial uppercase text-[#FAF7F2] bg-[#1C1917]/70 backdrop-blur-xs px-2.5 py-1 rounded-xs">
                  {concern.id}
                </span>
              </div>

              {/* Minimal Editorial Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C1917] group-hover:text-[#C5A880] transition-colors leading-tight">
                    {concern.name}
                  </h3>
                  <p className="text-xs font-sans text-[#78716C] mt-2 leading-relaxed">
                    {concern.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[#A8A29E]">
                    Hero Active: <strong className="text-[#57534E] font-medium">{concern.keyIngredient}</strong>
                  </span>
                  <span className="text-[#1C1917] uppercase tracking-wider-editorial flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
