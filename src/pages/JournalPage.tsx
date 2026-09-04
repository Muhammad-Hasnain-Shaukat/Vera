import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { articlesData } from '../data/articles';
import { Article } from '../types';

interface JournalPageProps {
  onNavigate: (path: string) => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Skin Science', 'Rituals', 'Ingredients'];

  const filteredArticles = selectedCategory === 'All'
    ? articlesData
    : articlesData.filter(a => a.category === selectedCategory);

  const heroArticle = articlesData[0];

  // In phone view and across the page, do not duplicate heroArticle in the grid below
  const gridArticles = selectedCategory === 'All'
    ? filteredArticles.filter(a => a.id !== heroArticle.id)
    : filteredArticles;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Publication Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 pb-6 sm:pb-10 border-b border-[#E8E2D8]">
          <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
            THE EDITORIAL HOUSE
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl font-light text-[#1C1917] tracking-tight">
            The VERA Journal
          </h1>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base font-sans text-[#57534E] leading-relaxed">
            Essays on cellular dermatology, circadian skin biology, mindful rituals, and the art of intentional formulation.
          </p>
        </div>

        {/* Filter Categories — Placed at the Top of the Section in One Single Clean Line */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto no-scrollbar whitespace-nowrap py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xs text-[11px] sm:text-xs font-sans tracking-wider-editorial uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1C1917] text-[#FAF7F2] font-medium shadow-xs'
                  : 'bg-[#F4EFE6] text-[#57534E] hover:bg-[#FAF7F2] border border-[#E8E2D8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Featured Article (Magazine Style) */}
        {selectedCategory === 'All' && (
          <div
            onClick={() => onNavigate(`/journal/${heroArticle.slug}`)}
            className="group cursor-pointer mb-12 sm:mb-16 bg-[#F4EFE6] border border-[#E8E2D8] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center hover:border-[#1C1917] transition-all duration-300 rounded-xs"
          >
            <div className="lg:col-span-7 aspect-16/10 overflow-hidden bg-[#FAF7F2]">
              <img
                src={heroArticle.coverImage}
                alt={heroArticle.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
              />
            </div>

            <div className="lg:col-span-5 p-5 sm:p-12 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] font-sans tracking-widest-editorial uppercase text-[#C5A880]">
                <span>Cover Feature</span>
                <span>•</span>
                <span>{heroArticle.category}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#1C1917] font-light leading-snug group-hover:text-[#C5A880] transition-colors">
                {heroArticle.title}
              </h2>

              <p className="text-xs sm:text-sm font-sans text-[#57534E] leading-relaxed line-clamp-3 sm:line-clamp-none">
                {heroArticle.excerpt}
              </p>

              <div className="pt-3 sm:pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-sans">
                <span className="text-[#78716C]">{heroArticle.author.name} • {heroArticle.readTime}</span>
                <span className="text-[#1C1917] uppercase tracking-wider-editorial flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid (Excludes heroArticle so no article is shown twice) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {gridArticles.map(article => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}`)}
              className="group cursor-pointer flex flex-col justify-between rounded-xs"
            >
              <div>
                <div className="relative aspect-16/11 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] mb-5 rounded-xs">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <span className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-sans tracking-widest-editorial uppercase text-[#1C1917] border border-[#E8E2D8]">
                    {article.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-sans text-[#78716C] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] leading-snug group-hover:text-[#C5A880] transition-colors">
                  {article.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm font-sans text-[#57534E] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-sans">
                <span className="text-[#78716C]">By {article.author.name}</span>
                <span className="text-[#1C1917] uppercase tracking-wider-editorial flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
