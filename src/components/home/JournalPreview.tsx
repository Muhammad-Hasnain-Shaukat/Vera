import React from 'react';
import { ArrowRight } from 'lucide-react';
import { articlesData } from '../../data/articles';

interface JournalPreviewProps {
  onNavigate: (path: string) => void;
}

export const JournalPreview: React.FC<JournalPreviewProps> = ({ onNavigate }) => {
  const featuredArticles = articlesData.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E8E2D8]">
          <div>
            <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-2">
              THE VERA JOURNAL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1917] tracking-tight">
              Essays in skin science &amp; ritual.
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => onNavigate('/journal')}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-widest-editorial uppercase text-[#1C1917] hover:text-[#C5A880] transition-colors group cursor-pointer"
            >
              <span>Explore All Essays</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {featuredArticles.map(article => (
            <article
              key={article.id}
              onClick={() => onNavigate(`/journal/${article.slug}`)}
              data-cursor="READ"
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/11 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] mb-5">
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

                <h3 className="font-serif text-2xl text-[#1C1917] leading-snug group-hover:text-[#C5A880] transition-colors">
                  {article.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm font-sans text-[#57534E] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-sans">
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
    </section>
  );
};
