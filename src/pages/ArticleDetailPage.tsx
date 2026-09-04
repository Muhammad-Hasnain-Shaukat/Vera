import React from 'react';
import { ArrowLeft, Clock, Calendar, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { articlesData } from '../data/articles';

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug, onNavigate }) => {
  const article = articlesData.find(a => a.slug === slug) || articlesData[0];
  const relatedArticles = articlesData.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <article className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => onNavigate('/journal')}
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest-editorial uppercase text-[#57534E] hover:text-[#1C1917] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="flex items-center justify-center gap-3 text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880]">
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#1C1917] tracking-tight leading-[1.08]">
          {article.title}
        </h1>

        <p className="font-editorial italic text-2xl sm:text-3xl text-[#78716C] max-w-2xl mx-auto">
          {article.subtitle}
        </p>

        {/* Author Bio Bar */}
        <div className="pt-6 border-t border-[#E8E2D8] flex items-center justify-center gap-3">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-10 h-10 rounded-full object-cover border border-[#E8E2D8]"
          />
          <div className="text-left">
            <span className="text-xs font-sans font-medium text-[#1C1917] block">
              {article.author.name}
            </span>
            <span className="text-[11px] font-sans text-[#78716C] block">
              {article.author.role}  •  {article.date}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Visual */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <div className="aspect-16/9 overflow-hidden bg-[#F4EFE6] border border-[#E8E2D8] rounded-xs shadow-sm">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Reading Typography Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <p className="font-serif text-xl sm:text-2xl text-[#1C1917] font-light leading-relaxed border-l-2 border-[#C5A880] pl-6 italic">
          {article.content.lead}
        </p>

        <div className="space-y-8 text-base font-sans text-[#44403C] leading-[1.8]">
          {article.content.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal pt-4">
                {section.heading}
              </h2>
              <p>{section.body}</p>
              {section.quote && (
                <blockquote className="my-8 p-6 sm:p-8 bg-[#F4EFE6] border-l-4 border-[#1C1917] rounded-xs">
                  <p className="font-serif text-2xl text-[#1C1917] italic">
                    "{section.quote}"
                  </p>
                </blockquote>
              )}
            </section>
          ))}
        </div>

      </div>

      {/* Bottom Related Essays */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-[#E8E2D8]">
        <span className="text-xs font-sans tracking-widest-editorial uppercase text-[#C5A880] block mb-6 text-center">
          Further Reading
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {relatedArticles.map(rel => (
            <div
              key={rel.id}
              onClick={() => onNavigate(`/journal/${rel.slug}`)}
              className="p-6 bg-[#F4EFE6] border border-[#E8E2D8] hover:border-[#1C1917] rounded-xs cursor-pointer transition-colors"
            >
              <span className="text-[10px] font-sans tracking-widest-editorial uppercase text-[#78716C] block mb-1">
                {rel.category} • {rel.readTime}
              </span>
              <h3 className="font-serif text-xl text-[#1C1917]">
                {rel.title}
              </h3>
              <p className="text-xs font-sans text-[#57534E] line-clamp-2 mt-2">
                {rel.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>

    </article>
  );
};
