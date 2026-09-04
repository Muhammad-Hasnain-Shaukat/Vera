import React, { useState } from 'react';
import { ArrowRight, Sparkles, Activity, ShieldCheck, Atom } from 'lucide-react';
import { ingredientsData, IngredientDetail } from '../../data/ingredients';

interface IngredientsLabProps {
  onNavigate: (path: string) => void;
}

export const IngredientsLab: React.FC<IngredientsLabProps> = ({ onNavigate }) => {
  const [activeIngredient, setActiveIngredient] = useState<IngredientDetail>(ingredientsData[0]);

  return (
    <section className="py-24 sm:py-32 bg-[#F4EFE6] border-b border-[#E8E2D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
            THE FORMULATION LAB
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight">
            What goes into VERA matters.
          </h2>
          <p className="mt-4 text-sm font-sans text-[#57534E] leading-relaxed">
            Every molecule is selected for biomimetic affinity. We avoid trend-driven hype in favor of clinically proven cellular cofactors.
          </p>
        </div>

        {/* Interactive Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Ingredient Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {ingredientsData.map(ingredient => {
              const isSelected = activeIngredient.id === ingredient.id;
              return (
                <button
                  key={ingredient.id}
                  onClick={() => setActiveIngredient(ingredient)}
                  className={`w-full text-left p-5 rounded-xs border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF7F2] border-[#1C1917] shadow-xs translate-x-1'
                      : 'bg-[#FAF7F2]/50 border-[#E8E2D8] hover:bg-[#FAF7F2] hover:border-[#D5CCC0]'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                      {ingredient.category}
                    </span>
                    <h3 className="font-serif text-xl text-[#1C1917] mt-0.5">
                      {ingredient.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#57534E] hidden sm:inline">
                      {ingredient.concentrationUsed}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isSelected ? 'bg-[#C5A880] scale-125' : 'bg-transparent'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Interactive Molecular & Clinical Deep Dive Panel */}
          <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E8E2D8] p-8 sm:p-10 rounded-xs shadow-sm">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E2D8]">
              <div>
                <span className="text-[11px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                  Bio-Active Specification
                </span>
                <h3 className="font-serif text-3xl text-[#1C1917] mt-1 font-light">
                  {activeIngredient.name}
                </h3>
                <p className="text-xs font-mono text-[#78716C] mt-0.5">
                  INCI: {activeIngredient.chemicalName}
                </p>
              </div>

              <div className="px-3.5 py-1.5 bg-[#F4EFE6] border border-[#E8E2D8] rounded-full text-xs font-sans text-[#1C1917]">
                <Atom className="w-3.5 h-3.5 inline mr-1 text-[#C5A880]" />
                <span>{activeIngredient.concentrationUsed}</span>
              </div>
            </div>

            {/* Description & Biological Mechanism */}
            <div className="py-6 space-y-5">
              <div>
                <h4 className="text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] mb-1.5 font-medium">
                  Cellular Rationale:
                </h4>
                <p className="text-sm font-sans text-[#57534E] leading-relaxed">
                  {activeIngredient.description}
                </p>
              </div>

              <div className="p-4 bg-[#F4EFE6]/70 border border-[#E8E2D8] rounded-xs space-y-1">
                <span className="text-[11px] font-sans tracking-wider-editorial uppercase text-[#78716C] block flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#7D8876]" />
                  Biological Mechanism of Action
                </span>
                <p className="text-xs font-sans text-[#1C1917] leading-relaxed">
                  {activeIngredient.mechanism}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-[11px] font-sans tracking-wider-editorial uppercase text-[#78716C] block">
                    Observed Clinical Benefit
                  </span>
                  <p className="text-xs font-sans text-[#1C1917] mt-1 font-medium">
                    {activeIngredient.clinicalBenefit}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-sans tracking-wider-editorial uppercase text-[#78716C] block">
                    Extraction Purity
                  </span>
                  <p className="text-xs font-sans text-[#57534E] mt-1">
                    {activeIngredient.source}
                  </p>
                </div>
              </div>
            </div>

            {/* Target Skin Concerns Tags */}
            <div className="pt-6 border-t border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-sans text-[#78716C]">Ideal For:</span>
                {activeIngredient.idealFor.map(target => (
                  <span
                    key={target}
                    className="px-2.5 py-1 bg-[#F4EFE6] border border-[#E8E2D8] text-[10px] font-sans text-[#1C1917] rounded-xs"
                  >
                    {target}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onNavigate(`/shop`)}
                className="text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] hover:text-[#C5A880] flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>View Formulated Rituals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
