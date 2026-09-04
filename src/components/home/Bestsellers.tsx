import React from 'react';
import { ArrowRight } from 'lucide-react';
import { initialProducts } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

interface BestsellersProps {
  onNavigate: (path: string) => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({ onNavigate }) => {
  const bestsellers = initialProducts.filter(p => p.bestseller || p.featured).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight">
              The VERA Edit
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => onNavigate('/shop')}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] hover:text-[#C5A880] transition-colors group cursor-pointer"
            >
              <span>View All 8 Formulas</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Products Grid / Horizontal Scroll on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestsellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
