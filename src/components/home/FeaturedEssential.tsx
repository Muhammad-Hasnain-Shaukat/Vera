import React, { useState } from 'react';
import { ArrowRight, Check, Plus, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { initialProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface FeaturedEssentialProps {
  onNavigate: (path: string) => void;
}

export const FeaturedEssential: React.FC<FeaturedEssentialProps> = ({ onNavigate }) => {
  const heroProduct = initialProducts.find(p => p.slug === 'renewal-serum') || initialProducts[0];
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(heroProduct, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F4EFE6] border-b border-[#E8E2D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Large Product Visual & Editorial Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 overflow-hidden bg-[#FAF7F2] border border-[#E8E2D8] shadow-sm">
              <img
                src={heroProduct.images[0]}
                alt={heroProduct.name}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-103"
              />
              
              {/* Pill Overlay */}
              <div className="absolute bottom-6 left-6 bg-[#FAF7F2]/90 backdrop-blur-md px-4 py-2 rounded-xs border border-[#E8E2D8]">
                <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block">
                  Signature Formulation
                </span>
                <span className="font-serif text-sm text-[#1C1917]">
                  Cellular Restorative Formula 01
                </span>
              </div>
            </div>

            {/* Accent Floating Image */}
            <div className="absolute -bottom-8 -right-8 w-44 sm:w-56 aspect-square hidden sm:block border-4 border-[#F4EFE6] shadow-xl overflow-hidden rounded-xs">
              <img
                src={heroProduct.images[1]}
                alt="Detail texture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Product Specifications & Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
                THE ESSENTIAL
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1917] font-light leading-tight">
                VERA Renewal Serum
              </h2>
              <p className="font-editorial italic text-2xl text-[#78716C] mt-1">
                {heroProduct.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A880] text-[#C5A880]" />
                ))}
              </div>
              <span className="text-xs font-sans text-[#57534E]">
                <strong className="text-[#1C1917]">4.95 / 5</strong> ({heroProduct.reviewsCount} Verified Clinical Evaluations)
              </span>
            </div>

            <p className="text-sm sm:text-base font-sans text-[#57534E] leading-relaxed">
              {heroProduct.shortDescription}
            </p>

            {/* Key Active Ingredients Pills */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] block font-medium">
                Engineered Bio-Actives:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {heroProduct.keyActives.map(active => (
                  <div key={active.name} className="p-3 bg-[#FAF7F2] border border-[#E8E2D8] rounded-xs">
                    <span className="text-xs font-sans font-semibold text-[#1C1917] block">
                      {active.name}
                    </span>
                    <span className="text-[11px] font-sans text-[#78716C] block mt-0.5">
                      {active.purpose}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Concerns */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-sans text-[#78716C]">Target Concerns:</span>
              {heroProduct.concerns.map(c => (
                <span
                  key={c}
                  className="px-2.5 py-1 bg-[#FAF7F2] border border-[#E8E2D8] text-[11px] font-sans text-[#57534E] rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Price & Action Button */}
            <div className="pt-6 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-2xl sm:text-3xl font-sans font-medium text-[#1C1917] block">
                  ${heroProduct.price}
                </span>
                <span className="text-xs font-sans text-[#78716C]">
                  {heroProduct.size} • 60-day supply
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 sm:flex-none px-8 py-3.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#7D8876]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onNavigate(`/product/${heroProduct.slug}`)}
                  className="px-6 py-3.5 bg-[#FAF7F2] text-[#1C1917] border border-[#D5CCC0] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#FAF7F2]/80 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Discover Formula</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
