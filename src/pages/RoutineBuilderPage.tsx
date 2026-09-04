import React, { useState } from 'react';
import { 
  Sun, Moon, Plus, Check, ArrowRight, ShoppingBag, 
  Sparkles, RefreshCw, BookmarkCheck, CheckCircle2 
} from 'lucide-react';
import { initialProducts } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface RoutineBuilderPageProps {
  onNavigate: (path: string) => void;
}

interface StepConfig {
  stepNumber: string;
  stepName: string;
  category: string;
  defaultSlug: string;
  rationale: string;
}

export const RoutineBuilderPage: React.FC<RoutineBuilderPageProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const { saveCustomRoutine } = useAuth();

  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');
  const [isSaved, setIsSaved] = useState(false);
  const [isAddedAll, setIsAddedAll] = useState(false);

  // Morning Steps
  const morningStepConfigs: StepConfig[] = [
    {
      stepNumber: '01',
      stepName: 'Cleanse',
      category: 'Skin',
      defaultSlug: 'gentle-cleansing-balm',
      rationale: 'Purifies sleep oils and balances natural sebum without disrupting moisture barrier.'
    },
    {
      stepNumber: '02',
      stepName: 'Treat',
      category: 'Skin',
      defaultSlug: 'vitamin-c-antioxidant-elixir',
      rationale: 'Supplies lipid-soluble antioxidant defense against daylight pollution and free radicals.'
    },
    {
      stepNumber: '03',
      stepName: 'Hydrate',
      category: 'Skin',
      defaultSlug: 'barrier-creme',
      rationale: 'Installs physiological ceramides to seal water into deeper epidermal strata.'
    },
    {
      stepNumber: '04',
      stepName: 'Protect',
      category: 'Skin',
      defaultSlug: 'mineral-veil-spf',
      rationale: 'Deflects UV and blue light rays with weightless, non-nano transparent zinc.'
    }
  ];

  // Evening Steps
  const eveningStepConfigs: StepConfig[] = [
    {
      stepNumber: '01',
      stepName: 'Cleanse',
      category: 'Skin',
      defaultSlug: 'gentle-cleansing-balm',
      rationale: 'Melt water-resistant SPF and environmental particulates with botanical lipid dissolution.'
    },
    {
      stepNumber: '02',
      stepName: 'Treat',
      category: 'Skin',
      defaultSlug: 'renewal-serum',
      rationale: 'Deep cellular restorative peptides and tri-molecular hyaluronic acid support nocturnal repair.'
    },
    {
      stepNumber: '03',
      stepName: 'Hydrate',
      category: 'Skin',
      defaultSlug: 'barrier-creme',
      rationale: 'Cashmere-soft lipid repair halts nocturnal trans-epidermal water loss.'
    },
    {
      stepNumber: '04',
      stepName: 'Restore',
      category: 'Skin',
      defaultSlug: 'luminous-botanical-oil',
      rationale: '1% Phyto-bakuchiol and cold-pressed botanical lipids seal the circadian healing cycle.'
    }
  ];

  // Current selections
  const [morningPicks, setMorningPicks] = useState<{ [key: string]: Product }>(() => {
    const init: any = {};
    morningStepConfigs.forEach(s => {
      init[s.stepName] = initialProducts.find(p => p.slug === s.defaultSlug) || initialProducts[0];
    });
    return init;
  });

  const [eveningPicks, setEveningPicks] = useState<{ [key: string]: Product }>(() => {
    const init: any = {};
    eveningStepConfigs.forEach(s => {
      init[s.stepName] = initialProducts.find(p => p.slug === s.defaultSlug) || initialProducts[0];
    });
    return init;
  });

  // Modal for swapping products
  const [swapModalStep, setSwapModalStep] = useState<string | null>(null);

  const currentConfigs = activeTab === 'morning' ? morningStepConfigs : eveningStepConfigs;
  const currentPicks = activeTab === 'morning' ? morningPicks : eveningPicks;
  const setCurrentPicks = activeTab === 'morning' ? setMorningPicks : setEveningPicks;

  const currentRoutineList = Object.values(currentPicks);
  const totalRoutinePrice = currentRoutineList.reduce((acc, p) => acc + p.price, 0);

  const handleSwap = (stepName: string, product: Product) => {
    setCurrentPicks(prev => ({ ...prev, [stepName]: product }));
    setSwapModalStep(null);
  };

  const handleAddAll = () => {
    currentRoutineList.forEach(p => addToCart(p, 1));
    setIsAddedAll(true);
    setTimeout(() => setIsAddedAll(false), 2000);
  };

  const handleSaveToProfile = () => {
    saveCustomRoutine({
      morning: Object.values(morningPicks),
      evening: Object.values(eveningPicks)
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
            CIRCADIAN BIO-ARCHITECTURE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1917] tracking-tight">
            Routine Builder
          </h1>
          <p className="mt-3 text-sm sm:text-base font-sans text-[#57534E] leading-relaxed">
            Synchronize your skincare steps with human biological circadian rhythms. Curate morning defense and evening restoration.
          </p>

          {/* Morning / Evening Toggle Tabs */}
          <div className="mt-8 inline-flex items-center p-1 bg-[#F4EFE6] border border-[#E8E2D8] rounded-full max-w-full">
            <button
              onClick={() => setActiveTab('morning')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10.5px] sm:text-xs font-sans tracking-wider sm:tracking-widest-editorial uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'morning'
                  ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Morning Ritual</span>
            </button>

            <button
              onClick={() => setActiveTab('evening')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10.5px] sm:text-xs font-sans tracking-wider sm:tracking-widest-editorial uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'evening'
                  ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Evening Ritual</span>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentConfigs.map((step) => {
            const product = currentPicks[step.stepName];

            return (
              <div
                key={step.stepNumber}
                className="bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs p-6 flex flex-col justify-between hover:border-[#1C1917] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8] mb-4">
                    <span className="font-serif text-2xl text-[#C5A880]">
                      {step.stepNumber}
                    </span>
                    <span className="text-[11px] font-sans tracking-widest-editorial uppercase text-[#1C1917] font-medium">
                      {step.stepName}
                    </span>
                  </div>

                  {/* Product Visual */}
                  <div
                    onClick={() => onNavigate(`/product/${product.slug}`)}
                    className="relative aspect-4/5 overflow-hidden bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs cursor-pointer group mb-4"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[10px] font-sans text-[#FAF7F2] uppercase tracking-wider-editorial">
                        Inspect Formula
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-[#1C1917] leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs font-sans text-[#78716C] mt-1 line-clamp-1">
                    {product.subtitle}
                  </p>

                  <div className="mt-3 p-3 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs">
                    <span className="text-[10px] font-sans tracking-wider-editorial uppercase text-[#78716C] block">
                      Why it is prescribed:
                    </span>
                    <p className="text-[11px] font-sans text-[#57534E] mt-0.5 leading-relaxed">
                      {step.rationale}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8E2D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-base font-semibold text-[#1C1917]">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => setSwapModalStep(step.stepName)}
                      className="text-[11px] font-sans uppercase tracking-wider-editorial text-[#78716C] hover:text-[#1C1917] underline"
                    >
                      Swap Formula
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-2 bg-[#FAF7F2] hover:bg-[#1C1917] hover:text-[#FAF7F2] text-[#1C1917] border border-[#D5CCC0] text-[11px] font-sans tracking-wider-editorial uppercase transition-all duration-200"
                  >
                    + Add This Step
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Routine Summary & Bulk Action Bar */}
        <div className="p-8 bg-[#1C1917] text-[#FAF7F2] rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-1">
              {activeTab.toUpperCase()} RITUAL TOTAL
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-4xl font-light">
                ${totalRoutinePrice}
              </span>
              <span className="text-xs font-sans text-[#A8A29E]">
                4 Coordinated Formulations  •  Complimentary Delivery Included
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleSaveToProfile}
              className="w-full sm:w-auto px-6 py-3.5 border border-[#3E3832] hover:border-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase transition-colors flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#7D8876]" />
                  <span>Saved to Profile</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Save to Sanctuary</span>
                </>
              )}
            </button>

            <button
              onClick={handleAddAll}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] hover:bg-[#FAF7F2]/90 text-[#1C1917] text-xs font-sans tracking-widest-editorial uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              {isAddedAll ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#7D8876]" />
                  <span>Ritual Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Entire Routine to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Swap Product Modal */}
      {swapModalStep && (
        <div className="fixed inset-0 z-50 bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-2xl w-full p-8 rounded-xs border border-[#E8E2D8] shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8] mb-6">
              <div>
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block">
                  Select Alternative Formula
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917]">
                  Replace {swapModalStep} Formula
                </h3>
              </div>
              <button
                onClick={() => setSwapModalStep(null)}
                className="text-xs font-sans uppercase tracking-wider-editorial text-[#78716C] hover:text-[#1C1917]"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {initialProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => handleSwap(swapModalStep, p)}
                  className="p-3 bg-[#F4EFE6] border border-[#E8E2D8] hover:border-[#1C1917] rounded-xs cursor-pointer flex gap-3 items-center transition-colors"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-14 h-16 object-cover rounded-xs border border-[#E8E2D8] bg-[#FAF7F2]"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-base text-[#1C1917] leading-snug">
                      {p.name}
                    </h4>
                    <span className="text-xs font-sans text-[#78716C] block">
                      ${p.price} • {p.category}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-wider-editorial text-[#C5A880] mt-1 block">
                      Select This Formula
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
