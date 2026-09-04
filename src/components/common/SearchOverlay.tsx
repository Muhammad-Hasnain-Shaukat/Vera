import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { initialProducts } from '../../data/products';
import { articlesData } from '../../data/articles';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = cleanQuery
    ? initialProducts.filter(
        p =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.subtitle.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.concerns.some(c => c.toLowerCase().includes(cleanQuery)) ||
          p.keyActives.some(a => a.name.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchingArticles = cleanQuery
    ? articlesData.filter(
        a =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.subtitle.toLowerCase().includes(cleanQuery) ||
          a.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const quickCategories = [
    { label: 'Hydration', query: 'Dryness' },
    { label: 'Brightening', query: 'Dullness' },
    { label: 'Sensitized Skin', query: 'Sensitivity' },
    { label: 'Serums', query: 'Serum' },
    { label: 'Cleansers', query: 'Cleansing' },
    { label: 'Ceramides', query: 'Ceramides' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF7F2]/95 backdrop-blur-md transition-all duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* Top bar */}
        <div className="flex items-center justify-between pb-8 border-b border-[#E8E2D8]">
          <span className="font-serif text-2xl tracking-[0.25em] font-light text-[#1C1917]">
            VERA
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#57534E] hover:text-[#1C1917] transition-colors flex items-center gap-2 text-xs font-sans tracking-widest-editorial uppercase cursor-pointer"
          >
            <span>Close (ESC)</span>
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="pt-10 pb-6">
          <label htmlFor="search-input" className="block text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] mb-3">
            Intelligent Formulation Search
          </label>
          <div className="relative flex items-center border-b-2 border-[#1C1917]">
            <Search className="w-6 h-6 text-[#1C1917] mr-4" />
            <input
              id="search-input"
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What are you looking for? (e.g. Niacinamide, Barrier, SPF...)"
              className="w-full py-4 text-xl sm:text-2xl md:text-3xl font-serif text-[#1C1917] placeholder:text-[#A8A29E] bg-transparent focus:outline-hidden"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-2 text-[#78716C] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="py-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans text-[#78716C] mr-2">Suggested:</span>
          {quickCategories.map(cat => (
            <button
              key={cat.label}
              onClick={() => setQuery(cat.query)}
              className="px-3 py-1 rounded-full text-xs font-sans border border-[#E8E2D8] bg-[#F4EFE6] text-[#57534E] hover:bg-[#1C1917] hover:text-[#FAF7F2] hover:border-[#1C1917] transition-colors duration-200 cursor-pointer"
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="mt-8">
          {cleanQuery && matchingProducts.length === 0 && matchingArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-2xl text-[#1C1917] mb-2">No formulas found for "{query}"</p>
              <p className="text-sm font-sans text-[#78716C] max-w-md mx-auto mb-6">
                Try searching for specific active ingredients like ceramides, peptides, or skin concerns like dryness or dullness.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('/quiz');
                }}
                className="px-6 py-2.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-sans tracking-widest-editorial uppercase hover:bg-[#38332E] transition-colors"
              >
                Take the Skin Diagnostic Quiz
              </button>
            </div>
          )}

          {/* Product Results */}
          {matchingProducts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] pb-3 border-b border-[#E8E2D8] mb-6">
                Formulas ({matchingProducts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {matchingProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      onNavigate(`/product/${product.slug}`);
                    }}
                    className="group cursor-pointer bg-[#F4EFE6]/50 p-4 border border-[#E8E2D8] hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-[#FAF7F2] mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C]">
                        {product.category} • {product.size}
                      </span>
                      <h4 className="font-serif text-lg text-[#1C1917] font-medium mt-1 group-hover:text-[#C5A880] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-sans text-[#57534E] line-clamp-2 mt-1">
                        {product.shortDescription}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E8E2D8] flex items-center justify-between">
                      <span className="font-sans text-sm font-medium text-[#1C1917]">
                        ${product.price}
                      </span>
                      <span className="text-[11px] font-sans uppercase tracking-wider-editorial text-[#1C1917] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Ritual</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Journal Article Matches */}
          {matchingArticles.length > 0 && (
            <div>
              <h3 className="text-xs font-sans tracking-widest-editorial uppercase text-[#78716C] pb-3 border-b border-[#E8E2D8] mb-6">
                Editorial Journal Articles ({matchingArticles.length})
              </h3>
              <div className="space-y-4">
                {matchingArticles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onClose();
                      onNavigate(`/journal/${article.slug}`);
                    }}
                    className="p-4 bg-[#F4EFE6]/50 border border-[#E8E2D8] hover:border-[#1C1917] transition-colors cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#C5A880]">
                          {article.category}
                        </span>
                        <span className="text-xs text-[#A8A29E]">•</span>
                        <span className="text-[10px] font-sans text-[#78716C]">
                          {article.readTime}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-[#1C1917]">{article.title}</h4>
                      <p className="text-xs font-sans text-[#57534E] line-clamp-1 mt-0.5">
                        {article.subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-sans uppercase tracking-wider-editorial text-[#1C1917] flex items-center gap-1 shrink-0">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
