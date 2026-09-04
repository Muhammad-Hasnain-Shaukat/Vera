import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] bg-[#FAF7F2] flex items-center justify-center py-24 px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
          ERROR 404  •  SANCTUARY
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
          This ritual doesn't exist.
        </h1>

        <p className="text-xs sm:text-sm font-sans text-[#78716C] leading-relaxed max-w-sm mx-auto">
          The formulation or page you are seeking has either been discontinued, archived in our laboratory, or relocated.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onNavigate('/')}
            className="px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Return Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate('/shop')}
            className="px-8 py-3.5 border border-[#D5CCC0] bg-[#FAF7F2] text-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#F4EFE6] transition-colors"
          >
            Explore Dispensary
          </button>
        </div>
      </div>
    </div>
  );
};
