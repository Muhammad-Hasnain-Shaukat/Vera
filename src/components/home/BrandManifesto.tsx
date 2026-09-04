import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BrandManifestoProps {
  onNavigate: (path: string) => void;
}

export const BrandManifesto: React.FC<BrandManifestoProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E8E2D8] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-4">
          The VERA Manifesto
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1917] leading-[1.15] tracking-tight max-w-4xl mx-auto">
          We reject the culture of 12-step overload and aggressive peeling acids. 
          We formulate for <span className="font-editorial italic font-normal text-[#C5A880]">cellular architecture</span>.
        </h2>

        <p className="mt-8 text-base sm:text-lg font-sans text-[#57534E] max-w-2xl mx-auto leading-relaxed">
          Your skin is not a surface to be aggressively stripped—it is a sophisticated, self-regulating biological ecosystem. VERA formulas provide bio-compatible building blocks that communicate with your cells rather than forcing artificial compliance.
        </p>

        <div className="mt-10">
          <button
            onClick={() => onNavigate('/about')}
            className="inline-flex items-center gap-2 text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] hover:text-[#C5A880] border-b border-[#1C1917] pb-1 transition-colors group cursor-pointer"
          >
            <span>Read Our Formulation Doctrine</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Core Architecture Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[#E8E2D8] pt-12">
          
          <div className="space-y-2">
            <span className="font-serif text-xl text-[#C5A880] block">01</span>
            <h3 className="font-serif text-xl text-[#1C1917]">Biomimetic Lipid Match</h3>
            <p className="text-xs font-sans text-[#78716C] leading-relaxed">
              Every moisturizer and serum mirrors human intercellular lipid geometry to absorb effortlessly without occlusive suffocating residues.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-xl text-[#C5A880] block">02</span>
            <h3 className="font-serif text-xl text-[#1C1917]">Tri-Strata Osmotic Delivery</h3>
            <p className="text-xs font-sans text-[#78716C] leading-relaxed">
              Active peptides and humectants are engineered in fractionated weights to hydrate across surface, epidermal, and deeper cellular layers.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-serif text-xl text-[#C5A880] block">03</span>
            <h3 className="font-serif text-xl text-[#1C1917]">Microbiome Intention</h3>
            <p className="text-xs font-sans text-[#78716C] leading-relaxed">
              Zero synthetic fragrances, essential oil sensitizers, or aggressive sulphates. Every formula respects the protective microbial mantle.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
