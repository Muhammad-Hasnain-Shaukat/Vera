import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, X, ArrowUpDown, Sparkles } from 'lucide-react';
import { initialProducts } from '../data/products';
import { ProductCategory, SkinConcern, SkinType } from '../types';
import { ProductCard } from '../components/product/ProductCard';

interface ShopPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: ProductCategory | 'All';
  initialConcern?: SkinConcern;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onNavigate,
  initialCategory = 'All',
  initialConcern
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(initialCategory);
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | 'All'>(initialConcern || 'All');
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | 'All'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Sync category state whenever navigation prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories: (ProductCategory | 'All')[] = ['All', 'Skin', 'Body', 'Sets'];
  const concerns: SkinConcern[] = ['Dryness', 'Dullness', 'Texture', 'Sensitivity', 'Fine Lines', 'Uneven Tone'];
  const skinTypes: SkinType[] = ['Balanced', 'Dry', 'Oily', 'Sensitive', 'Combination'];

  // Editorial Section Headings based on active category
  const categoryHeaders: Record<ProductCategory | 'All', { eyebrow: string; title: string; desc: string }> = {
    All: {
      eyebrow: 'The Complete Dispensary',
      title: 'All Formulations',
      desc: 'Intelligent, biomimetic rituals developed to respect the acid mantle, reverse environmental stress, and amplify radiant skin health.'
    },
    Skin: {
      eyebrow: 'Facial Integrity & Cellular Restoration',
      title: 'Skin Care Formulations',
      desc: 'Targeted clinical serums, barrier-repair crèmes, gentle cleansers, and biomimetic hydrators engineered for radiant epidermal health.'
    },
    Body: {
      eyebrow: 'Facial-Grade Silhouette Treatments',
      title: 'Body Care Rituals',
      desc: 'High-performance body serums, firming botanical elixirs, and lipid-rich crèmes designed to restore toned resilience and cashmere-soft finish.'
    },
    Rituals: {
      eyebrow: 'Curated Regimen Systems',
      title: 'The Ritual Formulations',
      desc: 'Step-by-step harmonious collections curated for comprehensive morning and evening skin longevity with specialized savings.'
    },
    Sets: {
      eyebrow: 'Curated Regimen Systems',
      title: 'The Ritual Sets',
      desc: 'Complete harmonious collections curated for comprehensive morning and evening skin longevity with specialized savings.'
    }
  };

  const currentHeader = categoryHeaders[selectedCategory] || categoryHeaders['All'];

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter(product => {
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        if (selectedConcern !== 'All' && !product.concerns.includes(selectedConcern)) {
          return false;
        }
        if (selectedSkinType !== 'All' && !product.skinTypes.includes(selectedSkinType) && !product.skinTypes.includes('All')) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, selectedConcern, selectedSkinType, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedConcern !== 'All' ? 1 : 0) +
    (selectedSkinType !== 'All' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedConcern('All');
    setSelectedSkinType('All');
    onNavigate('/shop');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 sm:py-14">
      <div className="max-w-[1540px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Dynamic Editorial Header */}
        <div className="pb-8 border-b border-[#E8E2D8] mb-8">
          <span className="text-[11px] font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2 font-medium">
            {currentHeader.eyebrow}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight">
            {currentHeader.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base font-sans text-[#57534E] max-w-2xl leading-relaxed">
            {currentHeader.desc}
          </p>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#E8E2D8]">
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  onNavigate(cat === 'All' ? '/shop' : `/shop/${cat}`);
                }}
                className={`px-4 sm:px-5 py-2 text-xs font-sans tracking-wider-editorial uppercase rounded-xs transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1C1917] text-[#FAF7F2] font-semibold shadow-xs'
                    : 'bg-[#F4EFE6] text-[#57534E] hover:bg-[#FAF7F2] border border-[#E8E2D8]'
                }`}
              >
                {cat === 'All' ? 'All Formulas' : cat === 'Sets' ? 'Ritual Sets' : `${cat} Care`}
              </button>
            ))}
          </div>

          {/* Controls: Filter Button & Sort Selector */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            
            <button
              onClick={() => setIsFilterDrawerOpen(prev => !prev)}
              className="flex items-center gap-2 px-3.5 py-2 border border-[#E8E2D8] bg-[#F4EFE6] rounded-xs text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] hover:border-[#1C1917] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-sans text-[#57534E]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-[#F4EFE6] border border-[#E8E2D8] py-2 px-3 rounded-xs text-xs font-sans text-[#1C1917] focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Collapsible Filter Tray */}
        {isFilterDrawerOpen && (
          <div className="p-6 my-6 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs animate-fadeIn space-y-6">
            
            {/* Filter by Skin Concern */}
            <div>
              <span className="text-[11px] font-sans tracking-widest-editorial uppercase text-[#78716C] block mb-3">
                Target Concern
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedConcern('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                    selectedConcern === 'All'
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'bg-[#FAF7F2] text-[#57534E] border border-[#E8E2D8]'
                  }`}
                >
                  All Concerns
                </button>
                {concerns.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedConcern(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                      selectedConcern === c
                        ? 'bg-[#1C1917] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] text-[#57534E] border border-[#E8E2D8] hover:border-[#1C1917]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Skin Type */}
            <div>
              <span className="text-[11px] font-sans tracking-widest-editorial uppercase text-[#78716C] block mb-3">
                Skin Compatibility
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSkinType('All')}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                    selectedSkinType === 'All'
                      ? 'bg-[#1C1917] text-[#FAF7F2]'
                      : 'bg-[#FAF7F2] text-[#57534E] border border-[#E8E2D8]'
                  }`}
                >
                  All Skin Types
                </button>
                {skinTypes.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedSkinType(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-sans transition-colors ${
                      selectedSkinType === st
                        ? 'bg-[#1C1917] text-[#FAF7F2]'
                        : 'bg-[#FAF7F2] text-[#57534E] border border-[#E8E2D8] hover:border-[#1C1917]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Action */}
            {activeFiltersCount > 0 && (
              <div className="pt-2 border-t border-[#E8E2D8] flex justify-end">
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-sans tracking-wider-editorial uppercase text-[#1C1917] underline hover:text-[#C5A880]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="py-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-sans text-[#78716C]">Active Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EFE6] border border-[#E8E2D8] rounded-full text-xs font-sans text-[#1C1917]">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedConcern !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EFE6] border border-[#E8E2D8] rounded-full text-xs font-sans text-[#1C1917]">
                Concern: {selectedConcern}
                <button onClick={() => setSelectedConcern('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSkinType !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EFE6] border border-[#E8E2D8] rounded-full text-xs font-sans text-[#1C1917]">
                Skin: {selectedSkinType}
                <button onClick={() => setSelectedSkinType('All')}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs font-sans text-[#78716C] underline hover:text-[#1C1917] ml-2"
            >
              Reset
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs font-sans text-[#78716C] mb-6">
            <span>Showing {filteredProducts.length} formulated rituals</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs">
              <Sparkles className="w-8 h-8 text-[#A8A29E] mx-auto mb-3" />
              <h3 className="font-serif text-2xl text-[#1C1917] mb-2">
                No matching formulations found
              </h3>
              <p className="text-xs font-sans text-[#78716C] max-w-sm mx-auto mb-6">
                Try widening your concern or skin-type criteria to explore the full collection.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors"
              >
                View All Formulations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
