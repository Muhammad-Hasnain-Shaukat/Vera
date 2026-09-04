import React from 'react';
import { ShieldCheck, Sparkles, HeartHandshake, Leaf, Recycle, Award } from 'lucide-react';

export const SciencePillars: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-3">
            FORMULATION ETHOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#1C1917] tracking-tight">
            Beauty, backed by intention.
          </h2>
          <p className="mt-4 text-sm sm:text-base font-sans text-[#57534E] leading-relaxed">
            We operate at the convergence of Swiss clinical laboratory discipline, regenerative green chemistry, and tactile aesthetic pleasure.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          <div className="p-8 sm:p-10 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#1C1917]">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
              Pillar 01
            </span>
            <h3 className="font-serif text-2xl text-[#1C1917]">Effective</h3>
            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              Purposeful active ingredients formulated at bio-available percentages. We reject fairy-dusting marketing claims; every molecule in a VERA bottle serves a quantified biological purpose.
            </p>
          </div>

          <div className="p-8 sm:p-10 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#1C1917]">
              <Leaf className="w-5 h-5 stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
              Pillar 02
            </span>
            <h3 className="font-serif text-2xl text-[#1C1917]">Conscious</h3>
            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              Thoughtful formulation choices that respect human biology and planet boundaries. Leaping Bunny certified cruelty-free, 100% vegan, and devoid of bio-accumulative microplastics.
            </p>
          </div>

          <div className="p-8 sm:p-10 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8E2D8] flex items-center justify-center text-[#1C1917]">
              <Sparkles className="w-5 h-5 stroke-[1.5]" />
            </div>
            <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
              Pillar 03
            </span>
            <h3 className="font-serif text-2xl text-[#1C1917]">Elegant</h3>
            <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
              Textures and sensory rituals designed to be savored. Skincare should feel like a moment of sanctuary—effortless glide, instant absorption, and no heavy residue.
            </p>
          </div>

        </div>

        {/* Responsible Packaging & Material Stewardship Sub-Banner */}
        <div className="bg-[#FAF7F2] border border-[#E8E2D8] p-8 sm:p-12 rounded-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
                CIRCULAR PACKAGING COMMITMENT
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-light">
                Vessels engineered to endure.
              </h3>
              <p className="mt-3 text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed">
                We house our active formulas in ultraviolet-protective amber and frosted flint glass. 100% recyclable, inert, and shielded against photodegradation.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#E8E2D8] lg:pl-10">
              
              <div className="space-y-1">
                <Recycle className="w-4 h-4 text-[#7D8876]" />
                <h4 className="font-sans text-xs font-semibold text-[#1C1917] uppercase tracking-wider-editorial">
                  92% Glass &amp; Aluminum
                </h4>
                <p className="text-[11px] font-sans text-[#78716C]">
                  Minimal virgin plastics across total collection weight.
                </p>
              </div>

              <div className="space-y-1">
                <Award className="w-4 h-4 text-[#C5A880]" />
                <h4 className="font-sans text-xs font-semibold text-[#1C1917] uppercase tracking-wider-editorial">
                  FSC Certified Card
                </h4>
                <p className="text-[11px] font-sans text-[#78716C]">
                  Outer cartons printed with non-toxic vegetable inks.
                </p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <HeartHandshake className="w-4 h-4 text-[#7D8876]" />
                <h4 className="font-sans text-xs font-semibold text-[#1C1917] uppercase tracking-wider-editorial">
                  Empty Vessel Return
                </h4>
                <p className="text-[11px] font-sans text-[#78716C]">
                  Complimentary return label to recycle empty bottles with TerraCycle.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
