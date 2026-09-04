import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Sparkles, RefreshCw, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { initialProducts } from '../data/products';
import { Product, SkinType, SkinConcern } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface QuizPageProps {
  onNavigate: (path: string) => void;
}

interface QuizState {
  skinType: SkinType;
  concern: SkinConcern;
  feelDuringDay: string;
  routineHabit: string;
  finishPreference: string;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const { saveQuizResult } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizState>({
    skinType: 'Balanced',
    concern: 'Dullness',
    feelDuringDay: 'Tight or dry by afternoon',
    routineHabit: 'Quick 2-step routine',
    finishPreference: 'Natural velvet cushion'
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAddedAll, setIsAddedAll] = useState(false);

  const questions = [
    {
      id: 1,
      title: "What is your primary skin type?",
      subtitle: "Observe your bare skin two hours after gentle morning cleansing.",
      field: 'skinType' as const,
      options: [
        { label: 'Balanced', desc: 'Comfortable, neither noticeably tight nor excessively oily.' },
        { label: 'Dry', desc: 'Frequent flaking, persistent tightness, lacking natural sebum.' },
        { label: 'Oily', desc: 'Pronounced sheen across T-zone and cheeks, enlarged pores.' },
        { label: 'Combination', desc: 'Oily forehead and nose, normal or dehydrated cheeks.' },
        { label: 'Sensitive', desc: 'Easily irritated, reactive to weather changes, prone to flushing.' }
      ]
    },
    {
      id: 2,
      title: "What is your chief skin concern?",
      subtitle: "The biological condition you wish to address most urgently.",
      field: 'concern' as const,
      options: [
        { label: 'Dullness', desc: 'Fatigued appearance, lack of crystalline light reflection.' },
        { label: 'Dryness', desc: 'Parched skin barrier, rough stratum corneum, tight discomfort.' },
        { label: 'Fine Lines', desc: 'Loss of firmness, mechanical expression creases, depleted bounce.' },
        { label: 'Texture', desc: 'Bumpy micro-congestion, uneven surface grain, enlarged pores.' },
        { label: 'Sensitivity', desc: 'Flushing erythema, reactive prickling, compromised lipid shield.' },
        { label: 'Uneven Tone', desc: 'Post-blemish marks, localized hyperpigmentation, sun damage.' }
      ]
    },
    {
      id: 3,
      title: "How does your skin feel throughout the day?",
      subtitle: "Midday evaluation under air conditioning or artificial environments.",
      field: 'feelDuringDay' as const,
      options: [
        { label: 'Tight or dry by afternoon', desc: 'Water evaporates quickly despite morning cream.' },
        { label: 'Excessively shiny and congested', desc: 'Sebum breaks through skincare layers before noon.' },
        { label: 'Comfortable and balanced', desc: 'Skin feels supple with minimal midday change.' },
        { label: 'Prone to sudden redness or heat', desc: 'Fluctuates rapidly in reaction to stress or temperature.' }
      ]
    },
    {
      id: 4,
      title: "What is your current ritual complexity?",
      subtitle: "Be honest about your morning and evening bandwidth.",
      field: 'routineHabit' as const,
      options: [
        { label: 'Minimalist (1 to 2 essentials)', desc: 'Cleanse, hydrate, and go. Speed and simplicity.' },
        { label: 'Moderate (3 to 4 coordinated steps)', desc: 'Balanced focus on cleansing, treating, and protecting.' },
        { label: 'Comprehensive (Dedicated 5-step ritual)', desc: 'Sensory self-care pause morning and night.' }
      ]
    },
    {
      id: 5,
      title: "What finish do you desire from your daily skincare?",
      subtitle: "The ultimate tactile and visual sensation on your skin.",
      field: 'finishPreference' as const,
      options: [
        { label: 'Natural velvet cushion', desc: 'Soft-focus, imperceptible, cashmere feel.' },
        { label: 'Luminous dewy glow', desc: 'Reflective glass-like radiance with healthy sheen.' },
        { label: 'Pure weightless matte', desc: 'Completely zero shine, ultra-breathable finish.' }
      ]
    }
  ];

  const handleSelectOption = (field: keyof QuizState, value: any) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateAndFinish();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Algorithm to compute customized routine
  const recommendedRoutine: Product[] = React.useMemo(() => {
    const cleanser = initialProducts.find(p => p.slug === 'gentle-cleansing-balm')!;
    
    // Choose Serum based on concern
    let serum = initialProducts.find(p => p.slug === 'renewal-serum')!;
    if (answers.concern === 'Uneven Tone' || answers.concern === 'Dullness') {
      serum = initialProducts.find(p => p.slug === 'vitamin-c-antioxidant-elixir') || serum;
    }

    // Choose Moisturizer
    let moisturizer = initialProducts.find(p => p.slug === 'barrier-creme')!;

    // Sunscreen
    const spf = initialProducts.find(p => p.slug === 'mineral-veil-spf')!;

    // Optional treatment oil or essence
    let extra: Product | null = null;
    if (answers.skinType === 'Dry' || answers.concern === 'Dryness') {
      extra = initialProducts.find(p => p.slug === 'luminous-botanical-oil') || null;
    } else if (answers.concern === 'Texture') {
      extra = initialProducts.find(p => p.slug === 'clarifying-essence') || null;
    }

    const list = [cleanser, serum, moisturizer, spf];
    if (extra) list.push(extra);
    return list;
  }, [answers]);

  const calculateAndFinish = () => {
    saveQuizResult(
      {
        skinType: answers.skinType,
        primaryConcern: answers.concern,
        skinFeeling: answers.feelDuringDay,
        currentRoutine: answers.routineHabit,
        preferredFinish: answers.finishPreference
      },
      recommendedRoutine
    );
    setIsCompleted(true);
  };

  const totalBundlePrice = recommendedRoutine.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscountedPrice = Math.round(totalBundlePrice * 0.85); // 15% discount for bundle

  const handleAddAllToCart = () => {
    recommendedRoutine.forEach(product => {
      addToCart(product, 1);
    });
    setIsAddedAll(true);
    setTimeout(() => setIsAddedAll(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
                SKIN DISCOVERY PROTOCOL
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917]">
                Find Your VERA
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-sans text-[#78716C] max-w-md mx-auto">
                Answer five diagnostic criteria to curate your personalized cellular skincare system.
              </p>

              {/* Progress Indicator */}
              <div className="mt-8 max-w-xs mx-auto">
                <div className="flex items-center justify-between text-[11px] font-sans text-[#78716C] mb-2">
                  <span>Question 0{currentStep} of 0{questions.length}</span>
                  <span>{Math.round((currentStep / questions.length) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-[#E8E2D8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1C1917] transition-all duration-300"
                    style={{ width: `${(currentStep / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Stage */}
            <div className="bg-[#F4EFE6] border border-[#E8E2D8] p-5 sm:p-12 rounded-xs shadow-xs">
              {questions.map((q) => {
                if (q.id !== currentStep) return null;

                const currentVal = answers[q.field];

                return (
                  <div key={q.id} className="space-y-6">
                    <div className="text-center sm:text-left">
                      <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917]">
                        {q.title}
                      </h2>
                      <p className="text-xs font-sans text-[#78716C] mt-1">
                        {q.subtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
                      {q.options.map((opt) => {
                        const isSelected = currentVal === opt.label;

                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleSelectOption(q.field, opt.label)}
                            className={`text-left p-4 sm:p-5 rounded-xs border transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'bg-[#FAF7F2] border-[#1C1917] shadow-xs'
                                : 'bg-[#FAF7F2]/60 border-[#E8E2D8] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-serif text-lg text-[#1C1917]">
                                {opt.label}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'border-[#1C1917] bg-[#1C1917]'
                                    : 'border-[#A8A29E]'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 text-[#FAF7F2]" />}
                              </div>
                            </div>
                            <p className="text-[11px] font-sans text-[#78716C] mt-1.5 leading-relaxed">
                              {opt.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t border-[#E8E2D8] flex items-center justify-between gap-3">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-4 sm:px-5 py-2.5 text-xs font-sans uppercase tracking-wider-editorial flex items-center gap-1.5 ${
                    currentStep === 1
                      ? 'opacity-0 pointer-events-none'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={nextStep}
                  className="px-5 sm:px-8 py-3 bg-[#1C1917] text-[#FAF7F2] text-[11px] sm:text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center gap-2 cursor-pointer shadow-sm text-center"
                >
                  <span>{currentStep === questions.length ? 'Reveal My VERA Ritual' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results Stage */
          <div className="space-y-12 animate-fadeIn">
            
            {/* Header Badge */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EFE6] border border-[#E8E2D8] text-[11px] font-sans tracking-widest-editorial text-[#57534E] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Diagnostic Prescription Complete</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#1C1917]">
                Your VERA Ritual
              </h1>
              <p className="text-sm font-sans text-[#57534E] max-w-xl mx-auto mt-2 leading-relaxed">
                Formulated specifically for your <strong className="text-[#1C1917]">{answers.skinType}</strong> skin with targeted focus on addressing <strong className="text-[#1C1917]">{answers.concern}</strong>.
              </p>
            </div>

            {/* Diagnostic Summary Bar */}
            <div className="p-5 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                  Skin Constitution
                </span>
                <span className="font-serif text-lg text-[#1C1917] mt-0.5 block">
                  {answers.skinType}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                  Chief Deficit
                </span>
                <span className="font-serif text-lg text-[#1C1917] mt-0.5 block">
                  {answers.concern}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                  Midday State
                </span>
                <span className="font-serif text-sm text-[#1C1917] mt-1 block">
                  {answers.feelDuringDay.split(' ')[0]}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                  Tactile Goal
                </span>
                <span className="font-serif text-sm text-[#1C1917] mt-1 block">
                  {answers.finishPreference}
                </span>
              </div>
            </div>

            {/* Recommended Products Sequence */}
            <div className="space-y-4">
              <h3 className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] pb-2 border-b border-[#E8E2D8]">
                Your Prescribed Daily Steps ({recommendedRoutine.length} Formulas)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedRoutine.map((product, idx) => (
                  <div
                    key={product.id}
                    onClick={() => onNavigate(`/product/${product.slug}`)}
                    className="p-5 bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#1C1917] transition-all rounded-xs cursor-pointer flex gap-4 items-center"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-24 object-cover rounded-xs border border-[#E8E2D8] bg-[#F4EFE6] shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880]">
                        Step 0{idx + 1} • {product.ritual.step}
                      </span>
                      <h4 className="font-serif text-xl text-[#1C1917] mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-xs font-sans text-[#78716C] line-clamp-1 mt-0.5">
                        {product.subtitle}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs font-sans">
                        <span className="font-medium text-[#1C1917]">${product.price}</span>
                        <span className="text-[#1C1917] underline text-[11px]">Inspect Formula</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete System Bundle Card */}
            <div className="p-8 bg-[#1C1917] text-[#FAF7F2] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-1">
                  COMPLETE RITUAL PRIVILEGE
                </span>
                <h3 className="font-serif text-3xl font-light">
                  Acquire Full Prescribed System
                </h3>
                <p className="text-xs font-sans text-[#A8A29E] mt-1 max-w-md">
                  Includes 15% comprehensive ritual courtesy, complimentary carbon-neutral shipping, and sample vials.
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-sans font-medium text-[#FAF7F2]">
                    ${bundleDiscountedPrice}
                  </span>
                  <span className="text-sm font-sans text-[#78716C] line-through">
                    ${totalBundlePrice}
                  </span>
                  <span className="text-xs font-sans text-[#7D8876] font-medium">
                    Save ${(totalBundlePrice - bundleDiscountedPrice).toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddAllToCart}
                  className="px-8 py-4 bg-[#FAF7F2] text-[#1C1917] hover:bg-[#FAF7F2]/90 text-xs font-sans tracking-widest-editorial uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
                >
                  {isAddedAll ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#7D8876]" />
                      <span>Ritual Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Build My Routine</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-4 border border-[#3E3832] text-xs font-sans tracking-wider-editorial uppercase text-[#A8A29E] hover:text-[#FAF7F2] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
