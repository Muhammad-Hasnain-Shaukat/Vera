import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CampaignBannerProps {
  onNavigate: (path: string) => void;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden border-b border-[#E8E2D8]">
      
      {/* High-Fashion Editorial Background Visual */}
      <img
        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=90"
        alt="The Art of the Ritual"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
      />

      {/* Subtle Studio Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-[#1C1917]/30 to-[#1C1917]/20" />

      {/* Center Cinematic Editorial Typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-[#FAF7F2] space-y-6">
        
        <span className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#E8E0D5] block font-light">
          A slower approach to better skin.
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]">
          The Art of
          <br />
          <span className="font-editorial italic font-normal text-[#FAF7F2]">the Ritual</span>
        </h2>

        <p className="text-sm sm:text-base font-sans text-[#E8E2D8] max-w-lg mx-auto font-light leading-relaxed">
          Skincare as an intentional daily pause. When formulations harmonize with your circadian biological rhythms, transformation unfolds naturally.
        </p>

        <div className="pt-4">
          <button
            onClick={() => onNavigate('/journal')}
            data-cursor="READ"
            className="px-8 py-4 bg-[#FAF7F2] text-[#1C1917] hover:bg-[#FAF7F2]/90 text-xs font-sans tracking-widest-editorial uppercase transition-all duration-300 inline-flex items-center gap-3 cursor-pointer shadow-lg"
          >
            <span>Explore The Journal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
};
